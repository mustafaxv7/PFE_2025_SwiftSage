# SwiftSage

**Crowdsourcing-based decision making for crisis management**

SwiftSage is a full-stack SaaS platform that enables communities to report, track, and respond to crisis situations (earthquakes, floods, fires) in real-time. Admins manage alerts, monitor reports on an interactive map, and coordinate emergency response.

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      Client (React 19 + Vite)                │
│  Lazy-loaded routes · i18n (EN/FR/AR) · Google Maps · Recharts│
├──────────────────────────────────────────────────────────────┤
│                        Express.js API                        │
│  Modular monolith: auth · reports · alerts · users · feedback│
│  Middleware: JWT auth · RBAC · rate limiting · validation     │
├──────────────────────────────────────────────────────────────┤
│              PostgreSQL (Neon)  ·  PostGIS                    │
│              DigitalOcean Spaces (S3-compatible)              │
└──────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 6, Tailwind CSS 4, React Router 7 |
| Backend | Node.js 22, Express 4, ES Modules |
| Database | PostgreSQL 17 + PostGIS (Neon serverless) |
| Storage | DigitalOcean Spaces (S3-compatible) |
| Auth | JWT (httpOnly cookies), bcryptjs, RBAC |
| Testing | Jest 29 (unit), Playwright (E2E) |
| Linting | ESLint 9 (zero warnings) |
| Deployment | Render (auto-deploy from GitHub) |

## Quick Start

### Prerequisites
- Node.js 22+
- PostgreSQL database (or Neon account)

### 1. Clone & Install

```bash
git clone https://github.com/mustafaxv7/PFE_2025_SwiftSage.git
cd PFE_2025_SwiftSage
npm install
npm install --prefix client
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your credentials. Required variables:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret for access tokens (min 32 chars) |
| `JWT_REFRESH_SECRET` | Secret for refresh tokens (min 32 chars) |
| `DO_SPACES_KEY` | DigitalOcean Spaces access key |
| `DO_SPACES_SECRET` | DigitalOcean Spaces secret key |
| `DO_SPACES_BUCKET` | Spaces bucket name |
| `SPACES_ENDPOINT` | Spaces endpoint URL |

Generate secure secrets:
```bash
npm run generate-secrets
```

### 3. Start Development

```bash
npm run dev          # Starts server on port 5030
```

In a separate terminal:
```bash
cd client && npm run dev  # Starts Vite dev server on port 5173
```

### 4. Build & Run Production

```bash
npm run build        # Installs deps + builds client
npm start            # Starts production server
```

## Docker (One-Command)

```bash
docker compose up --build
```

This starts the app at `http://localhost:5030`.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot-reload |
| `npm run build` | Build client for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint (zero warnings enforced) |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run test` | Run unit tests (53 tests) |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run generate-secrets` | Generate new JWT secrets |
| `npm run check-env` | Validate environment variables |

## API Endpoints

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | No | Register new user |
| POST | `/auth/login` | No | Login (sets httpOnly cookies) |
| POST | `/auth/refresh` | Cookie | Refresh access token |
| POST | `/auth/logout` | No | Clear session cookies |
| GET | `/auth/me` | Yes | Get current user profile |

### Reports
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/reports` | Yes | List all reports |
| POST | `/api/reports` | Yes | Create report (multipart/form-data) |
| GET | `/api/reports/:id` | Yes | Get report details (admin) |
| GET | `/api/reports/:id/user` | Yes | Get report details (user) |
| PATCH | `/api/reports/:id/edit` | Yes | Edit report description |
| PATCH | `/api/reports/:id/status` | Yes | Update report status |

### Alerts (Admin only)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/alerts` | Admin | List all alerts |
| POST | `/api/alerts` | Admin | Create alert |
| PATCH | `/api/alerts/:id` | Admin | Update alert |
| DELETE | `/api/alerts/:id` | Admin | Delete alert |

### Users (Admin only)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/users` | Admin | List all users |
| PATCH | `/api/users/:id` | Admin | Update user |
| DELETE | `/api/users/:id` | Admin | Delete user |

### Feedback
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/feedback` | Yes | Submit feedback |
| GET | `/api/feedback` | Admin | List all feedback |

## Project Structure

```
PFE_2025_SwiftSage/
├── client/                    # React frontend
│   └── src/
│       ├── components/
│       │   ├── auth/           # Login, Signup
│       │   ├── dashboard/      # User dashboard
│       │   │   └── admin/      # Admin panel
│       │   ├── landingpage/
│       │   └── layout/
│       ├── i18n/               # Translations (EN/FR/AR)
│       └── utils/              # API wrapper
│
├── server/src/                 # Express backend
│   ├── core/                   # Shared infrastructure
│   │   ├── config/             # DB, env, storage
│   │   ├── errors/             # Error class hierarchy
│   │   ├── middleware/          # Auth, validation, logging
│   │   └── utils/              # Logger, response helpers
│   ├── modules/                # Feature modules
│   │   ├── auth/               # Registration, login, JWT
│   │   ├── reports/            # Crisis reports CRUD
│   │   ├── alerts/             # Emergency alerts CRUD
│   │   ├── users/              # User management
│   │   └── feedback/           # User feedback
│   ├── app.js                  # Express app factory
│   └── server.js               # Entry point
│
├── e2e/                        # Playwright E2E tests
├── .env.example                # Environment template
├── Dockerfile                  # Multi-stage Docker build
├── docker-compose.yml          # Local development stack
└── playwright.config.js        # E2E test configuration
```

## Deployment (Render)

1. Push to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Connect your GitHub repo
4. Set build command: `npm run build`
5. Set start command: `npm start`
6. Add all environment variables from `.env`
7. Deploy — Render auto-deploys on every push to `main`

## Security Features

- JWT authentication with httpOnly cookies
- Role-based access control (admin/user)
- Rate limiting on auth (20/15min) and API (100/15min)
- CSP headers, CORS whitelist, secure cookie flags
- Input validation (Joi schemas) on all endpoints
- Structured error handling — no stack traces in production
- Request ID correlation for debugging
- SQL injection prevention (parameterized queries)

## Testing

```bash
# Unit tests (53 tests, 6 suites)
npm run test

# E2E tests (17 tests, Chromium)
npm run test:e2e

# Lint (zero warnings)
npm run lint
```

## License

ISC — Nadour Moustafa & Hasbellaoui Mehdi (PFE 2025)
