import type { RouteObject } from "react-router";
import ProtectedRoute from "../components/ProtectedRoute";
import TutorDashboardPage from "../pages/TutorDashboardPage";

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
