# Terraform AWS Baseline

This directory contains the Terraform implementation for the EC2-based demo environment.

Layout:

- `envs/dev` - root composition for the `dev` environment
- `modules/vpc`
- `modules/security_group`
- `modules/iam`
- `modules/ec2`
- `modules/s3`
- `modules/secrets`
- `modules/cloudfront_frontend`

Notes:

- Terraform state is local for now.
- Terraform creates two deploy-time runtime secret containers:
  - root `.env.prod`
  - `backend/config/config.prod.yaml`
- Terraform does not write real production secret values into those secrets.
- Local development uses the MinIO service from the root local Docker Compose stack.
- AWS EC2 deployment uses the Terraform-created AWS S3 bucket, configured through the `backend/config/config.prod.yaml` secret.
- CloudFront uses the EC2 frontend service as the origin and returns a generic `*.cloudfront.net` URL.
- This layer provisions infrastructure and deploy prerequisites; the actual container deploy is done by scripts in `infrastructure/scripts`.
