import type { RouteObject } from "react-router";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminDashboardPage from "../pages/AdminDashboardPage";

export const adminRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute allowRoles={["admin", "founder", "co-founder"]} />,
    children: [
      {
        path: "/admin-dashboard",
        Component: AdminDashboardPage,
      },
    ],
  },
];
