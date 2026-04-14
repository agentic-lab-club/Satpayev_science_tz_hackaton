# Infrastructure Plan

This folder is the source of truth for the current AWS demo deployment shape.

## Current Reality

- The AWS target is one EC2 host for the full demo stack.
- Runtime orchestration is the root `docker-compose.prod.yml`.
- The frontend is available through both:
  - direct EC2 access on port `3000`
  - a generated CloudFront URL
- Backend routes are exposed through the frontend reverse proxy path `/backend/*`.
- AI service routes are not exposed through the frontend. Backend is the only service that should call AI service over Docker-internal networking.
- Runtime configuration is rendered from two Secrets Manager secrets into files on EC2.

## Provisioning Scope

Terraform in `infrastructure/terraform` provisions:

- VPC with one public subnet
- Internet Gateway and public routing
- security group
- EC2 instance with Elastic IP
- IAM role and instance profile
- private S3 uploads bucket
- CloudFront distribution for the frontend
- Secrets Manager secret containers for:
  - root `.env.prod`
  - `backend/config/config.prod.yaml`

Local development keeps using MinIO from the root local Docker Compose stack.
AWS EC2 uses the Terraform-created S3 bucket through the production backend config stored in Secrets Manager.

## Deployment Scope

Deployment from EC2 is handled by scripts in `infrastructure/scripts`:

1. fetch `.env.prod` from Secrets Manager
2. fetch `backend/config/config.prod.yaml` from Secrets Manager
3. write both files into `/opt/satpayevtz/runtime`
4. run `docker compose -f docker-compose.prod.yml up -d --build`

## Accepted Risks

- The stack is still a single-host demo deployment.
- CloudFront fronts the EC2 frontend origin directly and is not locked down behind a private origin yet.
- Real CI/CD is still out of scope.
