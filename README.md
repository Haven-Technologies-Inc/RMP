# VitalWatch AI - Remote Patient Monitoring Platform

> **Haven Technologies Inc** — Bank-grade secure, HIPAA-compliant remote patient monitoring with AI-powered clinical insights.

---

## Monorepo Structure

```
vitalwatch-monorepo/
├── vitalwatch-frontend/     # Next.js 14 + TypeScript + TailwindCSS
├── vitalwatch-backend/      # NestJS + TypeScript + Prisma + TypeORM
├── docker-compose.yml       # Development infrastructure
├── docker-compose.prod.yml  # Production deployment
├── package.json             # Workspace root (npm workspaces)
├── tsconfig.base.json       # Shared TypeScript config
├── .env.example             # All environment variables
├── .editorconfig            # Editor consistency
├── .prettierrc              # Code formatting
└── .gitignore               # Unified ignore rules
```

## Tech Stack

| Layer          | Technology                                          |
| -------------- | --------------------------------------------------- |
| **Frontend**   | Next.js 14, React 19, TailwindCSS, Radix UI, Zustand |
| **Backend**    | NestJS 11, Prisma, TypeORM, Passport.js             |
| **Databases**  | PostgreSQL 15, Redis 7, InfluxDB 2.7                |
| **Auth**       | NextAuth.js, JWT, OAuth (Google, Microsoft, Apple)  |
| **Payments**   | Stripe (subscriptions, invoices, CPT billing)       |
| **AI/ML**      | OpenAI GPT-4, Grok AI (clinical insights)           |
| **Devices**    | Tenovi (remote monitoring hardware)                 |
| **Messaging**  | Twilio (SMS/2FA), Zoho SMTP (email)                 |
| **Real-time**  | Socket.io, WebRTC (video consultations)             |
| **Infra**      | Docker, Coturn TURN server                          |

## Quick Start

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9
- **Docker** & **Docker Compose** (for databases)

### 1. Clone & Install

```bash
git clone <repo-url> vitalwatch
cd vitalwatch
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env
# Edit .env with your credentials
```

### 3. Start Infrastructure (PostgreSQL, Redis, InfluxDB)

```bash
npm run docker:dev
```

### 4. Run Database Migrations

```bash
npm run db:push
```

### 5. Start Development Servers

```bash
# Start both frontend and backend
npm run dev

# Or start individually
npm run dev:frontend   # http://localhost:3000
npm run dev:backend    # http://localhost:3001
```

### 6. Full Docker Stack (optional)

```bash
npm run docker:dev:full   # Starts infra + backend + frontend in Docker
```

## Available Scripts

| Command                  | Description                              |
| ------------------------ | ---------------------------------------- |
| `npm run dev`            | Start frontend + backend in dev mode     |
| `npm run dev:frontend`   | Start Next.js dev server (port 3000)     |
| `npm run dev:backend`    | Start NestJS dev server (port 3001)      |
| `npm run build`          | Build all workspaces                     |
| `npm run lint`           | Lint all workspaces                      |
| `npm run test`           | Run backend tests                        |
| `npm run db:migrate`     | Run Prisma migrations                    |
| `npm run db:studio`      | Open Prisma Studio                       |
| `npm run docker:dev`     | Start dev infrastructure                 |
| `npm run docker:dev:down`| Stop dev infrastructure                  |
| `npm run clean`          | Remove all node_modules                  |

## Workspaces

| Package                  | Path                    | Port  |
| ------------------------ | ----------------------- | ----- |
| `@vitalwatch/frontend`  | `vitalwatch-frontend/`  | 3000  |
| `@vitalwatch/backend`   | `vitalwatch-backend/`   | 3001  |

## API Documentation

Once the backend is running, Swagger docs are available at:

```
http://localhost:3001/api/docs
```

## Key Integrations

- **Stripe** — Subscription billing with CPT code support (99453, 99454, 99457, 99458)
- **Tenovi** — Remote patient monitoring device webhooks
- **OpenAI** — AI-powered clinical insights and risk prediction
- **Grok AI** — Real-time vital sign analysis
- **Twilio** — SMS notifications and 2FA
- **Zoho SMTP** — Transactional email delivery
- **WebRTC** — Secure video consultations with TURN relay

## User Roles

| Role          | Access                                              |
| ------------- | --------------------------------------------------- |
| **Patient**   | View vitals, medications, appointments, AI insights |
| **Provider**  | Manage patients, alerts, care plans, billing        |
| **Admin**     | Organization management, analytics, devices         |
| **SuperAdmin**| Full platform control, AI model management          |

## License

Proprietary — Haven Technologies Inc. All rights reserved.
