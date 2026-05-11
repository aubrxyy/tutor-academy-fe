# Components Hierarchy

`components/ui/` is the primitive layer.
Everything outside `ui/` should be organized by app responsibility.

## Structure

- `ui/`
  Reusable design-system primitives such as buttons, cards, inputs, dialogs, and tabs.
- `navigation/`
  Navigation shells and role sidebars.
  - `Navbar.tsx`
  - `DashboardSidebar.tsx`
  - `AdminSidebar.tsx`
- `layout/`
  Layout-adjacent shared pieces.
  - `Footer.tsx`
  - `ScrollToTop.tsx`
- `auth/`
  Route and auth-guard helpers.
  - `ProtectedRoute.tsx`
- `feedback/`
  User confirmation and feedback helpers.
  - `confirmLogout.ts`
- `classroom/`
  Classroom-specific shared UI.
  - `ClassroomCurriculumRail.tsx`
- `media/`
  Media rendering helpers.
  - `ImageWithFallback.tsx`
- `payments/`
  Payment-specific components.
- `analytics/`
  Analytics or tracking-related components.

## Placement rule

1. If the component is a generic visual primitive, put it in `ui/`.
2. If the component belongs to one product area, put it in that domain folder.
3. If the component is shared but app-specific, group it by responsibility rather than leaving it flat.

Examples:

- A reusable modal shell belongs in `ui/`.
- A classroom progress rail belongs in `classroom/`.
- A logout confirmation helper belongs in `feedback/`.
- A role sidebar belongs in `navigation/`.
