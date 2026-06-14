---
name: docker-deployment
description: "Deploy the resume-fathaV2 React + Vite app using Docker and Docker Compose. Use when containerizing the frontend, setting up Nginx to serve the built app, writing Dockerfile and docker-compose.yml, configuring environment variables for production, or deploying to a VPS. Covers multi-stage Docker builds, Nginx config, HTTPS setup, and production deployment workflow."
argument-hint: 'What to set up (e.g. "Dockerfile", "docker-compose", "nginx config", "deploy to VPS", "HTTPS with certbot")'
---

# Docker Deployment — resume-fathaV2

## Stack

- **Frontend:** React 19 + Vite (static build output in `dist/`)
- **Server:** Nginx (serves static files)
- **Container:** Docker + Docker Compose
- **Target:** VPS (Ubuntu) or any Docker-compatible host

---

## Folder Structure

```
resume-fathaV2/
├── Dockerfile
├── docker-compose.yml
├── nginx/
│   └── default.conf
├── .env.production
├── dist/                  ← built by Vite
└── src/
```

---

## Dockerfile (Multi-stage Build)

```dockerfile
# Stage 1 — Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2 — Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## Nginx Config (`nginx/default.conf`)

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # SPA fallback — all routes serve index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "strict-origin-when-cross-origin";

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_min_length 1000;
}
```

---

## docker-compose.yml

```yaml
version: "3.9"

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: resume-fathav2
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf:ro
      # Uncomment after certbot setup:
      # - /etc/letsencrypt:/etc/letsencrypt:ro
    environment:
      - NGINX_HOST=yourdomain.com
```

---

## .env.production

```env
VITE_API_URL=https://api.yourdomain.com/api
```

> Vite embeds env vars at build time — rebuild image after changing `.env.production`.

---

## Build & Run Commands

```bash
# Build image and start container
docker compose up -d --build

# View logs
docker compose logs -f web

# Stop
docker compose down

# Rebuild after code changes
docker compose up -d --build --force-recreate
```

---

## Deploy to VPS (Ubuntu)

### 1. Install Docker on VPS

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
```

### 2. Copy project to VPS

```bash
# From local machine
scp -r ./resume-fathaV2 user@your-vps-ip:/home/user/
```

Or use Git:

```bash
git clone https://github.com/FathaAdillah/resume-fathaV2.git
cd resume-fathaV2
```

### 3. Start the container

```bash
docker compose up -d --build
```

### 4. Point domain DNS A record → VPS IP

---

## HTTPS with Certbot (Let's Encrypt)

```bash
# Install certbot on VPS
sudo apt install certbot

# Stop nginx temporarily
docker compose down

# Get certificate
sudo certbot certonly --standalone -d yourdomain.com

# Update nginx/default.conf to add HTTPS server block
# Uncomment certbot volume in docker-compose.yml
docker compose up -d --build
```

### HTTPS Nginx block to add in `default.conf`:

```nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}

# Redirect HTTP → HTTPS
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$host$request_uri;
}
```

---

## Update Deployment Workflow

```bash
# 1. Pull latest changes
git pull origin main

# 2. Rebuild and redeploy (zero downtime)
docker compose up -d --build --force-recreate

# 3. Verify
docker ps
curl -I http://localhost
```

---

## Troubleshooting

| Problem                    | Fix                                                      |
| -------------------------- | -------------------------------------------------------- |
| Port 80 already in use     | `sudo lsof -i :80` → kill process or change port mapping |
| Build fails                | Run `npm run build` locally first to catch errors        |
| React routes return 404    | Ensure `try_files $uri /index.html` is in nginx config   |
| Env vars not applied       | Rebuild image — Vite bakes env vars at build time        |
| Container keeps restarting | `docker compose logs web` to see error                   |

---

## CI/CD (Optional — GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy to VPS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /home/user/resume-fathaV2
            git pull origin main
            docker compose up -d --build --force-recreate
```

Secrets to add in GitHub repo settings:

- `VPS_HOST` — your VPS IP
- `VPS_USER` — SSH username
- `VPS_SSH_KEY` — private SSH key
