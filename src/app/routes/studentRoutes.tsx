import type { RouteObject } from "react-router";
import ProtectedRoute from "../components/ProtectedRoute";
import StudentPortalLayout from "../layouts/StudentPortalLayout";
import ClassroomPage from "../pages/ClassroomPage";
import CourseQuizPage from "../pages/CourseQuizPage";
import CourseReviewPage from "../pages/CourseReviewPage";
import StudentCertificatesPage from "../pages/StudentCertificatesPage";
import StudentDashboardPage from "../pages/StudentDashboardPage";
import StudentProfilePage from "../pages/StudentProfilePage";
import StudentQuizzesPage from "../pages/StudentQuizzesPage";

export const studentRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute allowRoles={["student"]} />,
    children: [
      {
        element: <StudentPortalLayout />,
        children: [
          {
            path: "/student-dashboard",
            Component: StudentDashboardPage,
          },
          {
            path: "/student-profile",
            Component: StudentProfilePage,
          },
          {
            path: "/student-certificates",
            Component: StudentCertificatesPage,
          },
          {
            path: "/student-quizzes",
            Component: StudentQuizzesPage,
          },
        ],
      },
      {
        path: "/classroom/:courseId",
        Component: ClassroomPage,
      },
      {
        path: "/class/:courseId/review",
        Component: CourseReviewPage,
      },
      {
        path: "/class/:courseId/quiz/:quizId",
        Component: CourseQuizPage,
      },
      {
        path: "/course/:courseId/review",
        Component: CourseReviewPage,
      },
      {
        path: "/course/:courseId/quiz/:quizId",
        Component: CourseQuizPage,
      },
    ],
  },
];
