# Tutoring Academy Frontend

Frontend application for an LMS + course marketplace used by students, tutors, and admins. The current repository should be treated as the frontend foundation: many pages have already been imported from Figma, but the product logic is still being implemented.

## Current Status

- Single Vite + React frontend repo
- Imported marketing and dashboard page designs are already wired into routing
- Real implementation work is still pending for auth, RBAC, payments, enrollment, content management, and backend integration
- This repo is best used as the frontend app, with a separate backend repo or service for APIs, storage, payments, and business logic

## Product Scope

The website has two jobs:

1. Public marketing and course promotion
2. Authenticated LMS experiences for `student`, `tutor`, and `admin`

Key functional areas:

- Public landing page, marketplace, course detail, FAQ, about, contact
- Student authentication, checkout, learning progress, quizzes, certificates, eye-tracking toggle
- Tutor dashboard, course builder, module management, quiz creation, student progress views
- Admin dashboard, user management, class pricing, transactions, financial reporting, troubleshooting

## Recommended Repository Strategy

- Keep this repository for the frontend
- Use a separate backend repository or service for:
  - RBAC and authentication
  - centralized data storage
  - Midtrans integration and webhook handling
  - enrollment and material unlocking
  - activity history and audit logs
  - certificate issuance rules

## Getting Started

### Requirements

- Node.js `>=20`
- npm `>=10`

### Install

```bash
npm install
```

### Run the app

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Project Structure

```text
src/
  app/
    components/   shared UI and feature components
    pages/        route-level screens imported and adapted from Figma
    routes.ts     central route map
  styles/         global styling and theme files
```

## Working Agreement For This Repo

- Treat imported Figma screens as UI starting points, not finished features
- Track UI completion separately from functional implementation
- Build business rules behind stable route groups and shared domain models
- Prefer role-aware flows over page-by-page isolated work

## Next Implementation Focus

- Add auth and RBAC foundations
- Define the shared domain model and API contracts
- Separate public marketing routes from protected LMS routes
- Implement checkout and payment status flow
- Add backend integration for enrollment, progress, and content access

Detailed execution steps live in [`task.md`](./task.md).
