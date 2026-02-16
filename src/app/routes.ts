import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import MarketplacePage from "./pages/MarketplacePage";
import StudentDashboardPage from "./pages/StudentDashboardPage";
import StudentProfilePage from "./pages/StudentProfilePage";
import StudentCertificatesPage from "./pages/StudentCertificatesPage";
import StudentQuizzesPage from "./pages/StudentQuizzesPage";
import ClassroomPage from "./pages/ClassroomPage";
import TutorDashboardPage from "./pages/TutorDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import HelpFAQPage from "./pages/HelpFAQPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import CourseReviewPage from "./pages/CourseReviewPage";
import CourseQuizPage from "./pages/CourseQuizPage";
import CourseEditPage from "./pages/CourseEditPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/marketplace",
    Component: MarketplacePage,
  },
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
  {
    path: "/classroom/:courseId",
    Component: ClassroomPage,
  },
  {
    path: "/course/:courseId",
    Component: CourseDetailPage,
  },
  {
    path: "/course/:courseId/review",
    Component: CourseReviewPage,
  },
  {
    path: "/course/:courseId/quiz/:quizId",
    Component: CourseQuizPage,
  },
  {
    path: "/course/:courseId/edit",
    Component: CourseEditPage,
  },
  {
    path: "/tutor-dashboard",
    Component: TutorDashboardPage,
  },
  {
    path: "/admin-dashboard",
    Component: AdminDashboardPage,
  },
  {
    path: "/help-faq",
    Component: HelpFAQPage,
  },
  {
    path: "/about",
    Component: AboutPage,
  },
  {
    path: "/contact",
    Component: ContactPage,
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);