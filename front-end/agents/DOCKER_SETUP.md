# Docker Setup Guide - TZ·AI

## Quick Start

### Build and run with Docker Compose (Recommended)

```bash
# Build image and start container
docker-compose up --build

# Access the application
http://localhost:3000
```

### Build manually

```bash
# Build the image
docker build -t tzai-app:latest .

# Run the container
docker run -p 3000:3000 tzai-app:latest
```

## Commands

### Development mode with Docker Compose

```bash
# Create .env.local with dev settings
echo "NODE_ENV=development" > .env.local

# Update docker-compose.yml to use dev command:
# 1. Uncomment volumes section
# 2. Uncomment command: npm run dev
# 3. Comment out the production command

docker-compose up --build
```

### Production mode

```bash
# Build and run
docker-compose up --build -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f app

# Rebuild without cache
docker-compose build --no-cache
```

### Manual Docker commands

```bash
# Build image
docker build -t tzai-app:1.0 .

# List images
docker images

# Run container
docker run -d -p 3000:3000 --name tzai tzai-app:1.0

# View logs
docker logs -f tzai

# Stop container
docker stop tzai

# Remove container
docker rm tzai

# Push to registry (if needed)
docker tag tzai-app:1.0 your-registry/tzai-app:1.0
docker push your-registry/tzai-app:1.0
```

## Environment Variables

Create `.env.local` file:

```
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Health Check

The container includes a health check that:
- Runs every 30 seconds
- Waits 5 seconds before first check
- Retries 3 times
- Fails if timeout exceeds 3 seconds

Check status:
```bash
docker ps
# STATUS column will show: Up X seconds (healthy)
```

## Troubleshooting

### Container exits immediately
```bash
docker logs tzai
# Check logs for errors
```

### Port already in use
```bash
# Use different port
docker run -d -p 3001:3000 tzai-app:1.0
```

### Build fails
```bash
# Rebuild without cache
docker build --no-cache -t tzai-app:latest .
```

## File Structure

```
Dockerfile          - Multi-stage build for production
docker-compose.yml  - Orchestration config
.dockerignore      - Files to exclude from build
```

## Performance Tips

- Image size: ~500MB compressed
- Build time: ~2-3 minutes (first build)
- Memory: ~200MB per container
- CPU: 1 core minimum

## Security

- Non-root user (nextjs:1001)
- dumb-init for proper signal handling
- No secrets in image layers
- Health checks enabled
- No sudo or package managers in runtime

## Deployment

### Vercel (Recommended for Next.js)
```bash
vercel deploy
```

### Docker Hub
```bash
docker build -t yourusername/tzai-app:latest .
docker push yourusername/tzai-app:latest
```

### AWS ECS
```bash
docker tag tzai-app:latest 123456789.dkr.ecr.us-east-1.amazonaws.com/tzai-app:latest
docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/tzai-app:latest
```

### Google Cloud Run
```bash
gcloud builds submit --tag gcr.io/PROJECT-ID/tzai-app
gcloud run deploy tzai-app --image gcr.io/PROJECT-ID/tzai-app
```

## Cleanup

```bash
# Remove unused containers
docker container prune

# Remove unused images
docker image prune

# Remove unused volumes
docker volume prune

# Remove everything
docker system prune -a
```

## Support

For more info:
- [Next.js Docker Deployment](https://nextjs.org/docs/deployment/docker)
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
