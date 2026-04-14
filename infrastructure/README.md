# Infrastructure

AWS infrastructure and deployment helpers for the monorepo live here.

Current target:

- one Ubuntu EC2 host for the full demo stack
- Docker Compose deployment from the monorepo root (docker-compose.prod.yml)
- frontend available both on direct EC2 port `3000` and a generated CloudFront URL
- backend API reached through the frontend reverse proxy path `/backend/*`
- AI service is not exposed through the frontend; backend calls it over Docker-internal networking
- runtime secrets rendered from AWS Secrets Manager into files on the host

## Quickstart

1. Prepare `infrastructure/terraform/envs/dev/terraform.tfvars` from `terraform.tfvars.example`.
    To get public/external IP of your machine/PC for aws_security_group SSH Allow CIDR's range do (on changes do `terraform apply`):
      - Powershell/Windows: `"$((Invoke-RestMethod -Uri 'https://checkip.amazonaws.com').Trim())/32"`
      - Bash/Linux: `printf '%s/32\n' "$(curl -s https://checkip.amazonaws.com)"`
2. Run Terraform from `infrastructure/terraform/envs/dev`:

```bash
terraform init
terraform fmt -check -recursive
terraform validate
terraform plan -var-file="terraform.tfvars"
terraform apply -var-file="terraform.tfvars"
```

3. After apply, note these outputs first and save them somewhere:
   - `ec2_public_ip`
   - `frontend_cloudfront_url`
   - `uploads_bucket_name`
   - `uploads_bucket_endpoint`
   - `uploads_bucket_regional_domain_name`
   - `compose_env_secret_name`
   - `backend_config_secret_name`
4. Prepare the production backend YAML for AWS S3:
   - start from [`backend/config/config.prod.yaml`](/workspaces/Satpayev_science_tz_hackaton/backend/config/config.prod.yaml)
   - set `storage.bucket` = `uploads_bucket_name`
   - set `storage.endpoint` = `uploads_bucket_endpoint`
   - set `storage.region` = your Terraform AWS region
   - set `storage.credential_source` = `iam`
   - keep `storage.access_key` and `storage.secret_key` empty
   - set `storage.use_ssl` = `true`
5. In AWS Secrets Manager, add the runtime file secret values:
   - `compose_env_secret_name`: full contents of root `.env.prod`
   - `backend_config_secret_name`: full contents of `backend/config/config.prod.yaml`
6. SSH to the EC2 host and clone the repo into `/opt/satpayevtz/app`.
7. Export the runtime variables on the EC2 host:

```bash
export AWS_REGION="your-region"
export COMPOSE_ENV_SECRET_NAME="satpayevtz/dev/.env.prod"
export BACKEND_CONFIG_SECRET_NAME="satpayevtz/dev/backend/config.prod.yaml"
```

8. Deploy the stack:

```bash
cd /opt/satpayevtz/app
./infrastructure/scripts/deploy_compose.sh
```

9. To destroy the Infrastructure: `terraform destroy`

## SSH Key Pair

Terraform currently expects an existing AWS EC2 key pair via `key_pair_name`.
It does not generate a `.pem` file in this repository.

To connect:

```bash
ssh -i /path/to/your-existing-keypair.pem ubuntu@<ec2_public_ip>
```

If you created the key pair in AWS Console, AWS only lets you download the `.pem` at creation time. If that file is lost, create a new key pair and update `key_pair_name` in `terraform.tfvars`.

## If User Data Did Not Run On An Existing EC2

If the EC2 instance was already created before the fixed `user_data` was applied, Terraform will not magically rerun the old first-boot cloud-init logic on that same machine.

Use one of these two recovery paths:

### Fastest: bootstrap the current EC2 manually

SSH into the existing host, clone the repo if needed, then run:

```bash
cd /opt/satpayevtz/app
sudo bash infrastructure/scripts/bootstrap_existing_ec2.sh
```

Then verify:

```bash
docker --version
docker compose version
git --version
ohmyzsh
```

### Cleanest: recreate the EC2 so cloud-init runs again

From `infrastructure/terraform/envs/dev`:

```bash
terraform apply -replace="module.ec2.aws_instance.this" -var-file="terraform.tfvars"
```

This recreates the EC2 instance and reruns `user_data` on first boot. The Terraform module is now configured with `user_data_replace_on_change = true`, so future `user_data` changes will trigger instance replacement instead of silently doing nothing.

## What Terraform Provisions

- VPC with one public subnet
- Internet Gateway and public route table
- security group with SSH allowlist and public frontend origin port
- EC2 instance with Elastic IP
- EC2 bootstrap via `user_data`
- IAM role and instance profile
- private S3 uploads bucket
- two runtime Secrets Manager containers
- CloudFront distribution for the frontend origin on EC2

Local development uses MinIO from the local Docker Compose stack. AWS EC2 uses the Terraform-created S3 bucket through the production backend YAML stored in Secrets Manager.

## Runtime Secret Model

The AWS runtime now uses two deploy-time secrets:

- `satpayevtz/dev/.env.prod`
  - one file for `docker-compose.prod.yml`
  - shared by the frontend/backend Compose stack variables
- `satpayevtz/dev/backend/config.prod.yaml`
  - one file for the backend production YAML config

Terraform creates the secret containers only. It does not write the real production values into them.

## S3 Backend Config Wiring

Local development and AWS deployment intentionally use different object storage:

- Local development: MinIO from the root local Docker Compose stack.
- AWS EC2: the Terraform-created AWS S3 bucket.

Before you deploy the backend to EC2, make sure the backend production config secret contains AWS S3 values.

Order:

1. run Terraform and save the S3 outputs
2. prepare the real `backend/config/config.prod.yaml` content for AWS S3
3. use the Terraform outputs for `storage.bucket`, `storage.endpoint`, and `storage.region`
4. set `storage.credential_source` to `iam` and keep `storage.access_key` / `storage.secret_key` empty
5. upload that final YAML file content into `backend_config_secret_name`

Important:

- the actual backend config file in this repo is `backend/config/config.prod.yaml`
- if you were thinking of `config.prod.env`, use the YAML file instead because that is what the backend currently loads
- local MinIO uses `credential_source: static` and requires `access_key` / `secret_key`
- AWS EC2 uses `credential_source: iam`; the backend gets temporary credentials from the EC2 instance profile

## Scripts

Scripts for the EC2 deployment flow live under [`infrastructure/scripts`](./scripts):

- `render_runtime_secrets.sh` fetches the two Secrets Manager values and writes runtime files under `/opt/satpayevtz/runtime`
- `deploy_compose.sh` renders secrets and runs the root `docker-compose.prod.yml`

## Notes

- The EC2 bootstrap (user_data) installs Docker, Docker Compose, Git, Zsh, and Oh My Zsh.
- CloudFront uses the EC2 frontend service as an HTTP origin and exposes a generic `*.cloudfront.net` URL.
- This is a pragmatic demo stack, not a hardened production platform yet.
