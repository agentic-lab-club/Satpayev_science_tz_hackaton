# Architecture

## Architecture Diagram

## C4 Diagram (Container Diagram)

![](docs/images/architecture/c4-container-diagram.png)

---

```plantuml
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

LAYOUT_WITH_LEGEND()

title InVisionU ATS - Overall Architecture (Container Diagram)

Person(applicant, "Applicant", "Registers, verifies email, uploads files, submits application, checks status")
Person(admin, "Admin Reviewer", "Reviews candidates, updates review stage and decision")

System_Boundary(ats, "InVisionU ATS Platform") {
  Container(frontend, "Frontend", "Next.js / Web App", "Applicant and admin UI")

  Container(backend, "Backend API", "Go + Fiber", "Auth, programs, uploads, personality test, applications, candidates")

  ContainerDb(postgres, "PostgreSQL", "PostgreSQL", "Users, auth_codes, refresh_sessions, programs, applications, files, tests, scoring_runs")

  Container(minio, "MinIO", "S3-compatible Object Storage", "Applicant uploaded files and derived media artifacts")

  Container(rabbitmq, "RabbitMQ", "AMQP Broker", "Domain events and async processing entrypoint")

  Container(llm, "LLM Scoring Service", "Python / FastAPI / Workers", "Consumes application pipeline events, transcription/scoring pipeline, writes scoring results")
}

System_Ext(smtp, "SMTP Provider", "Used only in production for email verification delivery")

Rel(applicant, frontend, "Uses", "HTTPS")
Rel(admin, frontend, "Uses", "HTTPS")

Rel(frontend, backend, "Calls REST API", "HTTPS / JSON")

Rel(backend, postgres, "Reads/Writes domain data", "SQL")
Rel(backend, minio, "Stores and retrieves files", "S3 API")
Rel(backend, rabbitmq, "Publishes domain events", "AMQP")
Rel(backend, smtp, "Sends verification emails", "SMTP (production only)")

Rel(llm, rabbitmq, "Consumes and publishes async events", "AMQP")
Rel(llm, minio, "Reads media files / writes derived artifacts", "S3 API")
Rel(llm, postgres, "Persists scoring results and processing state", "SQL")

BiRel(frontend, minio, "No direct access in current backend-first flow", "n/a")

note right of backend
Modular monolith:
- auth
- programs
- uploads
- personalitytest
- applications
- candidates

Infrastructure adapters:
- internal/platform/email
- internal/platform/storage
- internal/platform/messaging
end note

note bottom of rabbitmq
Current event focus:
- application.submitted

Planned pipeline events:
- application.audio_ready
- application.transcribed
- scoring.completed
end note

@enduml
```

## ERD (Entity Relationship Diagram)

![](docs/images/architecture/erd-database-tables-schema.png)

---

```plantuml

hide circle
skinparam linetype ortho

entity "users" as users {
  *id : uuid <<PK>>
  --
  email : varchar <<UNIQUE>>
  password_hash : varchar
  role : varchar
  is_email_verified : boolean
  first_name : varchar
  last_name : varchar
  phone_number : varchar
  created_at : timestamptz
  updated_at : timestamptz
}

entity "auth_codes" as auth_codes {
  *id : uuid <<PK>>
  --
  user_id : uuid <<FK>>
  purpose : varchar
  code_hash : varchar
  expires_at : timestamptz
  consumed_at : timestamptz
  created_at : timestamptz
}

entity "programs" as programs {
  *id : int <<PK>>
  --
  level : varchar
  code : varchar <<UNIQUE>>
  name : varchar
  is_active : boolean
  sort_order : int
}

entity "applications" as applications {
  *id : uuid <<PK>>
  --
  user_id : uuid <<FK>>
  program_id : int <<FK>>
  review_stage : varchar
  decision : varchar
  video_file_id : uuid <<FK>>
  video_audio_file_id : uuid <<FK>>
  video_transcript : text
  screening_error : text
  submitted_at : timestamptz
  created_at : timestamptz
  updated_at : timestamptz
}

entity "application_files" as application_files {
  *id : uuid <<PK>>
  --
  uploaded_by_user_id : uuid <<FK>>
  application_id : uuid <<FK>> <<NULL>>
  file_type : varchar
  bucket_name : varchar
  object_key : varchar
  original_filename : varchar
  content_type : varchar
  size_bytes : bigint
  etag : varchar
  created_at : timestamptz
}

entity "personality_tests" as personality_tests {
  *id : uuid <<PK>>
  --
  code : varchar <<UNIQUE>>
  title : varchar
  is_active : boolean
  created_at : timestamptz
}

entity "personality_test_questions" as pt_questions {
  *id : uuid <<PK>>
  --
  test_id : uuid <<FK>>
  question_order : int
  question_text : text
  is_active : boolean
}

entity "personality_test_options" as pt_options {
  *id : uuid <<PK>>
  --
  question_id : uuid <<FK>>
  option_order : int
  option_key : varchar
  option_text : text
}

entity "application_test_answers" as app_test_answers {
  *id : uuid <<PK>>
  --
  application_id : uuid <<FK>>
  question_id : uuid <<FK>>
  option_id : uuid <<FK>>
  created_at : timestamptz
}

entity "scoring_runs" as scoring_runs {
  *id : uuid <<PK>>
  --
  application_id : uuid <<FK>>
  model_name : varchar
  result_json : jsonb
  recommendation : varchar
  created_at : timestamptz
}

users ||--o{ auth_codes : has
users ||--o{ applications : submits
users ||--o{ application_files : uploads

programs ||--o{ applications : selected_for

applications ||--o{ application_files : attaches
applications ||--o{ app_test_answers : has
applications ||--o{ scoring_runs : has

personality_tests ||--o{ pt_questions : contains
pt_questions ||--o{ pt_options : contains
pt_questions ||--o{ app_test_answers : answered_in
pt_options ||--o{ app_test_answers : selected_in
```

## IaC Cloud Architecture Diagram (Terraform, AWS)

![](docs/images/architecture/iac-cloud-architecture-diagram.png)

```plantuml

```
