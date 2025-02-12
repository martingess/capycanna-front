# Capycanna Next.js Project

This project is a containerized Next.js application with separate Docker Compose configurations for production and development. The Docker setup is split into two Dockerfiles, one for development and one for production.

## Overview

- **Production**: Uses an Nginx container as a reverse proxy with HTTPS support. SSL certificates are mounted from the host (`/etc/letsencrypt`).
- **Development**: Runs the Next.js application with hot reload on port 3000.

## Key Files for Deployment

- **Dockerfile.dev**: Builds the Next.js application container for development. It installs all dependencies (including dev dependencies) and starts the development server with hot reloading.
- **Dockerfile.prod**: Builds the Next.js application container for production. It installs only production dependencies, builds the application, and starts the app using PM2.
- **docker-compose.prod.yml**: Production Docker Compose configuration with Nginx.
- **docker-compose.dev.yml**: Development Docker Compose configuration.

## Usage

### Production
1. Ensure SSL certificates are available on the host at `/etc/letsencrypt`.
2. Run the production containers:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```
3. Access the application via your domain on ports 80/443.

### Development
1. Run the development containers:
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```
2. Access the application at [http://localhost:3000](http://localhost:3000) with hot reloading enabled.