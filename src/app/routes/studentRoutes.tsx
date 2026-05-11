import type { RouteObject } from "react-router";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import ClassroomLayout from "../layouts/ClassroomLayout";
import StudentPortalLayout from "../layouts/StudentPortalLayout";
import ClassroomPage from "../pages/student/classroom/ClassroomPage";
import ClassroomMaterialPage from "../pages/student/classroom/ClassroomMaterialPage";
import ClassroomMeetingPage from "../pages/student/classroom/ClassroomMeetingPage";
import ClassroomQuizPage from "../pages/student/classroom/ClassroomQuizPage";
import ClassroomVideoPage from "../pages/student/classroom/ClassroomVideoPage";
import CourseQuizPage from "../pages/shared/course/CourseQuizPage";
import CourseReviewPage from "../pages/shared/course/CourseReviewPage";
import StudentCertificatesPage from "../pages/student/portal/StudentCertificatesPage";
import StudentDashboardPage from "../pages/student/portal/StudentDashboardPage";
import StudentProfilePage from "../pages/student/portal/StudentProfilePage";
import StudentQuizzesPage from "../pages/student/portal/StudentQuizzesPage";

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
        element: <ClassroomLayout />,
        children: [
          {
            index: true,
            Component: ClassroomPage,
          },
          {
            path: "videos/:itemId",
            Component: ClassroomVideoPage,
          },
          {
            path: "materials/:itemId",
            Component: ClassroomMaterialPage,
          },
          {
            path: "quizzes/:itemId",
            Component: ClassroomQuizPage,
          },
          {
            path: "meetings/:itemId",
            Component: ClassroomMeetingPage,
          },
        ],
      },
      {
        element: <ClassroomLayout />,
        children: [
          {
            path: "/class/:courseId/quiz/:quizId",
            Component: CourseQuizPage,
          },
        ],
      },
      {
        path: "/class/:courseId/review",
        Component: CourseReviewPage,
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
