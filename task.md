# LMS Frontend Implementation Roadmap

This roadmap tracks **real implementation**, not just imported UI screens. The repository already contains many route-level designs from Figma, so each phase below focuses on turning those pages into working product flows.

## Current Baseline

- [x] Vite + React frontend repository exists
- [x] Tailwind-based styling foundation exists
- [x] Public marketing and dashboard-style pages are imported from Figma
- [x] Route-level pages are wired in [`src/app/routes.ts`](./src/app/routes.ts)
- [ ] Authentication and session handling exist
- [ ] RBAC and permission guards exist
- [ ] Backend/API integration exists
- [ ] Midtrans payment workflow exists
- [ ] Enrollment-based content access exists

## Delivery Rules

- UI import progress does **not** count as feature completion
- Shared domain models should be defined before deep page-by-page implementation
- Public marketing flows and protected LMS flows should be built separately
- Financial features must support restricted access for `founder` and `co-founder`

## Phase 1: Product And Domain Foundation

- [ ] Define the main entities:
  - `User`
  - `Role`
  - `Course`
  - `ClassPackage`
  - `Module`
  - `Chapter`
  - `Enrollment`
  - `Payment`
  - `Transaction`
  - `Quiz`
  - `Submission`
  - `Certificate`
  - `ActivityLog`
- [ ] Define the route groups:
  - public marketing routes
  - student routes
  - tutor routes
  - admin routes
- [ ] Create the role and permission matrix:
  - `student`
  - `tutor`
  - `admin`
  - `founder`
  - `co-founder`
- [ ] Decide the frontend data strategy for each phase:
  - static mocks
  - local fake API
  - real API integration
- [ ] Identify which imported pages will be kept, merged, or replaced

## Phase 2: Frontend Architecture Cleanup

- [ ] Normalize project metadata and repository conventions
- [ ] Add and document TypeScript project configuration
- [ ] Separate route definitions by domain instead of one large route file
- [ ] Create app-level shells for:
  - public layout
  - student layout
  - tutor layout
  - admin layout
- [ ] Add loading, empty, error, and unauthorized states
- [ ] Create a shared mock data layer only for temporary frontend progress
- [ ] Add a shared API client boundary so backend integration can replace mocks cleanly

## Phase 3: Authentication And Access Control

- [ ] Build student registration flow
- [ ] Build login flow
- [ ] Build logout flow
- [ ] Build password reset flow
- [ ] Implement session persistence
- [ ] Implement `ProtectedRoute`
- [ ] Implement RBAC route guards
- [ ] Implement feature-level permission checks for financial views and admin-only actions
- [ ] Add unauthorized and session-expired UX states

## Phase 4: Public Marketing And Conversion

- [x] Landing page UI imported
- [x] Marketplace page UI imported
- [x] Course detail page UI imported
- [x] About, contact, and FAQ pages imported
- [ ] Connect marketing pages to consistent course and tutor data
- [ ] Define course cards, tutor cards, and package cards as reusable components
- [ ] Add CTA paths from marketing pages into registration and checkout
- [ ] Add SEO-ready metadata strategy for public pages
- [ ] Ensure responsive quality for the promotion funnel

## Phase 5: Commerce And Enrollment

- [ ] Model class packages and pricing rules
- [ ] Build checkout flow for students
- [ ] Build Midtrans / QRIS payment method UI
- [ ] Implement transaction status states:
  - pending
  - successful
  - failed
- [ ] Define webhook-driven unlock rules with the backend
- [ ] Reflect payment status clearly in the frontend
- [ ] Unlock material access only after confirmed successful payment
- [ ] Add purchase history and enrollment state handling

## Phase 6: Student LMS Experience

- [ ] Build student dashboard from real enrollment data
- [ ] Build enrolled course view and module navigation
- [ ] Build chapter experience for on-demand videos
- [ ] Add cheat note download flow
- [ ] Track and display learning progress
- [ ] Build evaluation quiz flow
- [ ] Build assignment upload flow if included in scope
- [ ] Implement digital certificate issue and download states
- [ ] Add Eye Tracking toggle UI and summary display
- [ ] Protect all LMS content behind enrollment and role checks

## Phase 7: Tutor Workspace

- [x] Tutor dashboard UI imported
- [x] Course edit / builder style UI imported
- [ ] Connect tutor dashboard to tutor-owned data
- [ ] Build module and chapter management
- [ ] Build video upload flow
- [ ] Build cheat note upload flow
- [ ] Build quiz creation flow:
  - multiple choice
  - assignment submission
- [ ] Build student progress views
- [ ] Build grade summary views
- [ ] Build anonymous Eye Tracking analytics summary

## Phase 8: Admin Operations

- [x] Admin dashboard UI imported
- [ ] Build student account management
- [ ] Build tutor account management
- [ ] Support view, edit, and deactivate actions
- [ ] Build class creation and management
- [ ] Build pricing and package management
- [ ] Build transaction monitoring
- [ ] Build real-time metrics dashboard integration
- [ ] Build income reporting per class
- [ ] Build troubleshooting tools:
  - password reset
  - material deletion
- [ ] Restrict financial data and actions to `founder` and `co-founder` permissions

## Phase 9: Activity History And Auditability

- [ ] Define activity events that matter in the frontend
- [ ] Display transaction history to the correct roles
- [ ] Display learning and submission history where relevant
- [ ] Surface admin action history if the backend supports it
- [ ] Add audit-friendly UX around sensitive actions

## Phase 10: Stabilization And Release Readiness

- [ ] Review responsive behavior across all core pages
- [ ] Validate critical flows end to end:
  - register -> browse -> buy -> unlock -> learn -> quiz -> certificate
  - tutor creates content -> student consumes content
  - admin manages users and transactions
- [ ] Reduce bundle size by code-splitting route pages
- [ ] Add automated quality gates when tooling is introduced:
  - lint
  - typecheck
  - smoke tests
- [ ] Remove placeholder data that should not ship
- [ ] Prepare environment variable strategy for frontend/backend integration

## MVP Suggestion

If you want a focused first release, prioritize this order:

1. Public marketing pages
2. Student auth
3. Course catalog and detail data wiring
4. Checkout + Midtrans status flow
5. Enrollment-gated student course access
6. Tutor content upload basics
7. Admin user and transaction management

Everything else can be layered on after the purchase-to-learning flow works reliably.
