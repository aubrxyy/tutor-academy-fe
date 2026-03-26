import type { RouteObject } from "react-router";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import CourseEditPage from "../pages/CourseEditPage";

export const adminRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute allowRoles={["admin"]} />,
    children: [
      {
        path: "/admin-dashboard",
        Component: AdminDashboardPage,
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
