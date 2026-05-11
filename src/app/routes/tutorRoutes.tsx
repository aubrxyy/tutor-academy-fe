import type { RouteObject } from "react-router";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import TutorDashboardPage from "../pages/tutor/TutorDashboardPage";

export const tutorRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute allowRoles={["tutor"]} />,
    children: [
      {
        path: "/tutor-dashboard",
        Component: TutorDashboardPage,
      },
    ],
  },
];
