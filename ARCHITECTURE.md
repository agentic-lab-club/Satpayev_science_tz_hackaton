# Architecture

Satpayev Science TZ is an AI-assisted system for analyzing and improving technical specifications for scientific projects.

The architecture follows one main rule:

**Core Backend owns workflow and data. AI Service owns intelligence. Frontend talks only to Core Backend.**

## C4 Container Diagram

```plantuml
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

LAYOUT_WITH_LEGEND()

title Satpayev Science TZ - C4 Container Diagram

Person(client, "Client / Researcher", "Uploads scientific TZ documents, reviews AI analysis, improves drafts, chats with assistant, submits final version")
Person(admin, "Admin / Expert", "Reviews submitted projects, edits final evaluation scorecard, writes feedback, exports approved projects")

System_Boundary(system, "Satpayev Science TZ") {
  Container(frontend, "Frontend", "Next.js / React", "Client and Admin UI for upload, analysis, chat, review, and report download")

  Container(backend, "Core Backend", "Go / Fiber", "System of record: auth, projects, document versions, analysis persistence, scoring, chat, reviews, reports")

  Container(ai, "AI Service", "Python / FastAPI", "Stateless intelligence engine for document analysis, score drafting, recommendations, rewrites, and chat responses")

  ContainerDb(postgres, "PostgreSQL", "PostgreSQL", "Users, projects, document versions, analysis runs, scorecards, chat, reviews, report exports")

  Container(storage, "Object Storage", "MinIO locally / AWS S3 in cloud", "Original uploaded documents and generated report artifacts")

  Container(reporting, "Report Generator", "Backend module", "Builds downloadable reports and XLSX exports from persisted backend data")
}

System_Ext(llm_provider, "External LLM Provider", "Optional OpenAI/Groq-compatible API used by AI Service when API keys are configured")
System_Ext(email, "SMTP Provider", "Optional production email delivery for auth verification")

Rel(client, frontend, "Uses", "HTTPS")
Rel(admin, frontend, "Uses", "HTTPS")

Rel(frontend, backend, "Calls REST API", "HTTPS / JSON")

Rel(backend, postgres, "Reads/writes business data", "SQL")
Rel(backend, storage, "Stores and retrieves uploaded files and generated reports", "S3 API")
Rel(backend, ai, "Requests analysis and chat responses", "HTTP / JSON")
Rel(backend, reporting, "Invokes report generation", "In-process call")
Rel(backend, email, "Sends auth emails in production", "SMTP")

Rel(ai, llm_provider, "Generates analysis/recommendations/chat when enabled", "HTTPS")

Rel(reporting, postgres, "Reads approved review and scorecard data", "SQL")
Rel(reporting, storage, "Writes report artifacts", "S3 API")

note right of backend
Backend is the only system of record.
AI Service has no direct Core Postgres access.
Frontend never talks directly to AI Service or object storage.
end note

note bottom of ai
AI Service must support heuristic fallback
for demos without external LLM keys.
end note

@enduml
```

## Core Data Model ERD

```plantuml
@startuml
hide circle
skinparam linetype ortho

entity "users" as users {
  *id : uuid <<PK>>
  --
  email : text <<UNIQUE>>
  password_hash : text
  role : text
  is_email_verified : boolean
  first_name : text
  last_name : text
  phone_number : text
  created_at : timestamptz
  updated_at : timestamptz
}

entity "auth_codes" as auth_codes {
  *id : uuid <<PK>>
  --
  user_id : uuid <<FK>>
  purpose : text
  code_hash : text
  expires_at : timestamptz
  consumed_at : timestamptz
  created_at : timestamptz
}

entity "refresh_sessions" as refresh_sessions {
  *id : uuid <<PK>>
  --
  user_id : uuid <<FK>>
  token_hash : text
  expires_at : timestamptz
  revoked_at : timestamptz
  user_agent : text
  ip_address : text
  created_at : timestamptz
  updated_at : timestamptz
}

entity "projects" as projects {
  *id : uuid <<PK>>
  --
  owner_user_id : uuid <<FK>>
  title : text
  organization_name : text
  status : text
  active_version_id : uuid <<FK nullable>>
  final_version_id : uuid <<FK nullable>>
  created_at : timestamptz
  updated_at : timestamptz
}

entity "document_versions" as document_versions {
  *id : uuid <<PK>>
  --
  project_id : uuid <<FK>>
  uploaded_by_user_id : uuid <<FK>>
  version_number : int
  original_file_id : uuid <<FK>>
  original_filename : text
  content_type : text
  extracted_text : text
  extraction_status : text
  created_at : timestamptz
}

entity "application_files" as files {
  *id : uuid <<PK>>
  --
  uploaded_by_user_id : uuid <<FK>>
  file_type : text
  bucket_name : text
  object_key : text
  original_filename : text
  content_type : text
  size_bytes : bigint
  etag : text
  created_at : timestamptz
}

entity "analysis_runs" as analysis_runs {
  *id : uuid <<PK>>
  --
  document_version_id : uuid <<FK>>
  status : text
  model_name : text
  prompt_version : text
  error_message : text
  started_at : timestamptz
  completed_at : timestamptz
  created_at : timestamptz
}

entity "analysis_sections" as sections {
  *id : uuid <<PK>>
  --
  analysis_run_id : uuid <<FK>>
  section_key : text
  title : text
  content_excerpt : text
  is_required : boolean
  is_present : boolean
  confidence : numeric
}

entity "analysis_findings" as findings {
  *id : uuid <<PK>>
  --
  analysis_run_id : uuid <<FK>>
  finding_type : text
  severity : text
  section_key : text
  quote : text
  explanation : text
  recommendation : text
}

entity "analysis_recommendations" as recommendations {
  *id : uuid <<PK>>
  --
  analysis_run_id : uuid <<FK>>
  category : text
  title : text
  description : text
  priority : int
}

entity "scorecards" as scorecards {
  *id : uuid <<PK>>
  --
  analysis_run_id : uuid <<FK nullable>>
  review_submission_id : uuid <<FK nullable>>
  score_type : text
  total_score : numeric
  max_total_score : numeric
  created_by_user_id : uuid <<FK nullable>>
  created_at : timestamptz
}

entity "scorecard_items" as scorecard_items {
  *id : uuid <<PK>>
  --
  scorecard_id : uuid <<FK>>
  item_key : text
  label : text
  score : numeric
  max_score : numeric
  explanation : text
}

entity "generated_artifacts" as artifacts {
  *id : uuid <<PK>>
  --
  analysis_run_id : uuid <<FK>>
  artifact_type : text
  title : text
  content_text : text
  file_id : uuid <<FK nullable>>
  created_at : timestamptz
}

entity "chat_sessions" as chat_sessions {
  *id : uuid <<PK>>
  --
  project_id : uuid <<FK>>
  document_version_id : uuid <<FK>>
  analysis_run_id : uuid <<FK nullable>>
  created_by_user_id : uuid <<FK>>
  title : text
  created_at : timestamptz
}

entity "chat_messages" as chat_messages {
  *id : uuid <<PK>>
  --
  chat_session_id : uuid <<FK>>
  role : text
  content : text
  metadata_json : jsonb
  created_at : timestamptz
}

entity "review_submissions" as submissions {
  *id : uuid <<PK>>
  --
  project_id : uuid <<FK>>
  document_version_id : uuid <<FK>>
  submitted_by_user_id : uuid <<FK>>
  status : text
  submitted_at : timestamptz
}

entity "admin_reviews" as reviews {
  *id : uuid <<PK>>
  --
  review_submission_id : uuid <<FK>>
  reviewed_by_user_id : uuid <<FK>>
  decision : text
  review_feedback : text
  expert_report_comment : text
  final_scorecard_id : uuid <<FK>>
  reviewed_at : timestamptz
}

entity "report_exports" as exports {
  *id : uuid <<PK>>
  --
  created_by_user_id : uuid <<FK>>
  export_type : text
  status : text
  file_id : uuid <<FK nullable>>
  created_at : timestamptz
  completed_at : timestamptz
}

entity "report_export_items" as export_items {
  *id : uuid <<PK>>
  --
  report_export_id : uuid <<FK>>
  review_submission_id : uuid <<FK>>
}

users ||--o{ auth_codes : has
users ||--o{ refresh_sessions : has
users ||--o{ projects : owns
users ||--o{ files : uploads

projects ||--o{ document_versions : versions
projects ||--o{ chat_sessions : has
projects ||--o{ submissions : submits

files ||--o{ document_versions : original_file
files ||--o{ artifacts : artifact_file
files ||--o{ exports : export_file

document_versions ||--o{ analysis_runs : analyzed_by
document_versions ||--o{ chat_sessions : discussed_in
document_versions ||--o{ submissions : submitted_as

analysis_runs ||--o{ sections : detects
analysis_runs ||--o{ findings : finds
analysis_runs ||--o{ recommendations : recommends
analysis_runs ||--o{ scorecards : scores
analysis_runs ||--o{ artifacts : generates
analysis_runs ||--o{ chat_sessions : grounds

scorecards ||--o{ scorecard_items : contains
submissions ||--o{ scorecards : final_or_draft_scores
submissions ||--o| reviews : reviewed_by
scorecards ||--o| reviews : final_score

chat_sessions ||--o{ chat_messages : contains

exports ||--o{ export_items : contains
submissions ||--o{ export_items : exported_in

@enduml
```

## Scoring Model

The system stores three scorecard types.

### AI Document Analysis Scorecard

Diagnostic score shown to Client and Admin:

- `structure`: `0..100`
- `completeness`: `0..100`
- `clarity`: `0..100`
- `kpi_results`: `0..100`
- `consistency`: `0..100`

The total is the rounded average unless a future document explicitly defines weights.

### AI Preliminary Evaluation Scorecard

AI draft score using the official Excel rubric:

- `strategic_relevance`: `0..20`
- `goals_and_tasks`: `0..10`
- `scientific_novelty`: `0..15`
- `practical_applicability`: `0..20`
- `expected_results`: `0..15`
- `socio_economic_effect`: `0..10`
- `feasibility`: `0..10`

The total is the sum and must be `0..100`.

### Final Reviewed Evaluation Scorecard

Admin/expert score using the same official Excel rubric. The Admin edits categories; the backend computes the total.

This scorecard is used for official approved XLSX export.

## Chat Architecture

Chat is document-aware and project-bound.

For each chat request, Core Backend loads:

- project metadata;
- active document version;
- extracted text snapshot;
- latest completed analysis;
- AI document analysis scorecard;
- AI preliminary evaluation scorecard;
- findings and recommendations;
- prior chat messages;
- optional latest admin feedback.

The Backend sends this compact context to AI Service. AI Service returns an assistant answer. Backend persists both user and assistant messages.

Chat can propose rewrites and explain scores, but it must not modify the stored document version. A rewrite becomes official only through a separate upload/version action.

## IaC Cloud Architecture Diagram

The current cloud architecture is an EC2 + Docker Compose demo platform managed by Terraform.

```plantuml
@startuml
skinparam linetype ortho
skinparam componentStyle rectangle

title Satpayev Science TZ - AWS Demo Infrastructure

cloud "AWS Account" {
  package "VPC 10.20.0.0/16" as vpc {
    node "Public Subnet" as subnet {
      component "EC2 Ubuntu Host\nDocker Compose" as ec2
      component "Elastic IP" as eip
    }

    component "Internet Gateway" as igw
    component "Public Route Table" as rt
    component "Security Group\nSSH allowlist\nFrontend 3000\nBackend 8080\nScraper legacy 9432" as sg
  }

  component "Private S3 Uploads Bucket\nversioning + SSE + public block" as s3

  package "Secrets Manager" as secrets {
    component "root .env.prod secret" as env_secret
    component "backend config.prod.yaml secret" as backend_secret
    component "local S3 access secret" as local_s3_secret
  }

  component "IAM Role + Instance Profile" as iam
  component "CloudFront Distribution\nfrontend origin: EC2:3000" as cf
}

actor "User / Judge" as user
actor "Developer" as dev

package "Docker Compose Stack" as compose {
  component "frontend container\nNext.js :3000" as frontend
  component "backend container\nGo/Fiber :8080" as backend
  database "postgres container\nlocal compose DB" as postgres
  component "minio container\nlocal object storage" as minio
  component "llm container\nplanned FastAPI service" as llm
}

user --> cf : HTTPS frontend
cf --> frontend : HTTP origin on EC2:3000
user --> backend : HTTP API on EC2:8080
dev --> ec2 : SSH

igw --> rt
rt --> subnet
sg --> ec2
eip --> ec2
ec2 --> compose : runs

backend --> postgres : SQL in local compose
backend --> minio : S3 API locally
backend --> s3 : S3 API in cloud config
backend --> llm : HTTP / JSON

ec2 --> secrets : render runtime files
iam --> ec2 : attached to
iam --> secrets : read runtime secrets
iam --> s3 : read/write uploads

local_s3_secret --> s3 : local dev credentials

note bottom of ec2
Terraform provisions infrastructure and prerequisites.
Deployment script renders secrets and runs docker-compose.prod.yml.
end note

note right of cf
CloudFront uses the EC2 frontend service
as an HTTP origin with default certificate.
end note

@enduml
```

## Deployment Notes

Local development currently uses:

- root `docker-compose.yml`;
- PostgreSQL container;
- MinIO container;
- Go backend container;
- Next.js frontend container.

AWS demo deployment currently uses:

- Terraform under `infrastructure/terraform/envs/dev`;
- one public EC2 instance;
- Docker Compose from `docker-compose.prod.yml`;
- AWS Secrets Manager runtime files;
- AWS S3 uploads bucket;
- CloudFront for frontend access.

The AI service container is planned and should be added only after the backend AI client and Python service are implemented.
