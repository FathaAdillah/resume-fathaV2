# Getting Started

<cite>
**Referenced Files in This Document**
- [package.json](file://package.json)
- [vite.config.ts](file://vite.config.ts)
- [index.html](file://index.html)
- [src/main.tsx](file://src/main.tsx)
- [src/App.tsx](file://src/App.tsx)
- [src/router/index.tsx](file://src/router/index.tsx)
- [README.md](file://README.md)
- [.gitignore](file://.gitignore)
- [Dockerfile](file://Dockerfile)
- [docker-compose.yml](file://docker-compose.yml)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Project Structure Overview](#project-structure-overview)
5. [Running the Development Server](#running-the-development-server)
6. [Environment Configuration](#environment-configuration)
7. [Common Setup Issues and Solutions](#common-setup-issues-and-solutions)
8. [Next Steps](#next-steps)

## Introduction
This guide helps you set up and run the Resume Portfolio Application locally. You will learn the required tools, how to install dependencies, configure your environment, start the development server, and understand the initial project layout. The instructions are beginner-friendly but include enough technical detail for experienced developers to get up and running quickly.

## Prerequisites
Before installing and running the application, ensure your machine meets the following requirements:
- Node.js: Install a recent LTS version (recommended). Verify with node -v.
- npm or yarn: Comes bundled with Node.js, or install yarn separately if preferred.
- Git: For cloning the repository. Verify with git --version.
- A modern browser for testing the app.
- Optional: Docker and docker-compose for containerized runs.

Tip: If you use nvm (Node Version Manager), pinning a specific Node.js version ensures consistent builds across environments.

[No sources needed since this section provides general guidance]

## Installation
Follow these steps to clone the repository, install dependencies, and prepare the project for development.

1. Clone the repository
   - Use Git to clone the project into your local workspace:
     - git clone <repository-url>
     - cd resume-fathaV2

2. Install dependencies
   - Using npm:
     - npm install
   - Using yarn:
     - yarn install

3. Verify installation
   - Ensure the node_modules directory is created and scripts are available:
     - npm run dev
     - yarn dev

What happens during installation:
- Dependencies listed in package.json are installed.
- Vite and TypeScript tooling are prepared.
- Scripts defined in package.json become available for development and build tasks.

**Section sources**
- [package.json:1-200](file://package.json#L1-L200)

## Project Structure Overview
The project follows a standard React + Vite structure with TypeScript. Key directories and files:
- src/: Source code for the application
  - components/: Reusable UI components and page sections
  - data/: Static data used by the app
  - hooks/: Custom React hooks
  - layouts/: Layout wrappers (e.g., admin layout)
  - pages/: Top-level pages (landing, login, admin pages)
  - router/: Routing configuration
  - services/: API client utilities
  - store/: State management modules
  - main.tsx: Application entry point
  - App.tsx: Root component
  - index.css: Global styles
- public/: Static assets served as-is
- vite.config.ts: Vite configuration
- index.html: HTML template
- package.json: Project metadata, scripts, and dependencies
- .gitignore: Git ignore rules
- Dockerfile and docker-compose.yml: Containerization setup

How the app boots:
- index.html loads the bundle.
- src/main.tsx initializes the React application.
- src/App.tsx composes the root component tree.
- src/router/index.tsx defines routes and navigation.

**Section sources**
- [index.html:1-200](file://index.html#L1-L200)
- [src/main.tsx:1-200](file://src/main.tsx#L1-L200)
- [src/App.tsx:1-200](file://src/App.tsx#L1-L200)
- [src/router/index.tsx:1-200](file://src/router/index.tsx#L1-L200)

## Running the Development Server
Start the development server to view and edit the application live.

- Using npm:
  - npm run dev
- Using yarn:
  - yarn dev

What to expect:
- Vite starts a local development server with hot module replacement.
- Open the URL shown in the terminal (commonly http://localhost:5173).
- Changes to source files refresh automatically in the browser.

Development workflow tips:
- Keep the terminal open while developing.
- Use the browser’s developer tools to debug issues.
- If port conflicts occur, stop other processes using the same port or change the port in vite.config.ts.

**Section sources**
- [package.json:1-200](file://package.json#L1-L200)
- [vite.config.ts:1-200](file://vite.config.ts#L1-L200)

## Environment Configuration
Environment variables can be used to configure behavior such as API endpoints or feature flags.

Where to define variables:
- Local development: Create a file named .env in the project root.
- Build-time variables: Configure via vite.config.ts if needed.

Common patterns:
- Variables prefixed with VITE_ are exposed to the client-side code in Vite projects.
- Server-only variables should not be prefixed with VITE_.

Example variable names (adapt to your needs):
- VITE_API_BASE_URL
- VITE_APP_TITLE

Notes:
- Restart the development server after adding or changing .env variables.
- Do not commit sensitive values; they are ignored by default via .gitignore.

**Section sources**
- [vite.config.ts:1-200](file://vite.config.ts#L1-L200)
- [.gitignore:1-200](file://.gitignore#L1-L200)

## Common Setup Issues and Solutions
- Port already in use
  - Symptom: Error indicating the port is already occupied.
  - Solution: Stop the conflicting process or change the port in vite.config.ts.

- Node.js version mismatch
  - Symptom: Build or script errors due to incompatible Node.js version.
  - Solution: Install an LTS version matching the project’s requirements.

- Dependency installation failures
  - Symptom: Errors when running npm install or yarn install.
  - Solution: Clear caches and reinstall:
    - Remove node_modules and lock files, then reinstall.
    - Ensure network access and registry availability.

- Missing environment variables
  - Symptom: Runtime errors referencing undefined variables.
  - Solution: Add required variables to .env and restart the dev server.

- Docker-related issues (if using containers)
  - Symptom: Build or compose errors.
  - Solution: Ensure Docker and docker-compose are installed and running; rebuild images as needed.

**Section sources**
- [package.json:1-200](file://package.json#L1-L200)
- [vite.config.ts:1-200](file://vite.config.ts#L1-L200)
- [.gitignore:1-200](file://.gitignore#L1-L200)
- [Dockerfile:1-200](file://Dockerfile#L1-L200)
- [docker-compose.yml:1-200](file://docker-compose.yml#L1-L200)

## Next Steps
- Explore the pages and components under src/ to understand the structure.
- Customize content in data/ and components/sections/.
- Configure routing in src/router/index.tsx to add or modify pages.
- Integrate APIs via src/services/api.ts and environment variables.
- Build for production using the provided scripts in package.json.

[No sources needed since this section provides general guidance]