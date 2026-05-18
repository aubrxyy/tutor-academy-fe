import type { RouteObject } from "react-router";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import AdminDashboardPage from "../pages/admin/dashboard/AdminDashboardPage";
import CourseCreateWizard from "../pages/admin/classes/CourseCreateWizard";
import CourseEditPage from "../pages/admin/classes/CourseEditPage";

export const adminRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute allowRoles={["admin"]} />,
    children: [
      {
        path: "/admin-dashboard",
        Component: AdminDashboardPage,
      },
      {
        path: "/admin/courses/create",
        Component: CourseCreateWizard,
      },
      {
        path: "/admin/classes/:courseId/edit",
        Component: CourseEditPage,
      },
      {
        path: "/course/:courseId/edit",
        Component: CourseEditPage,
      },
    ],
  },
];
