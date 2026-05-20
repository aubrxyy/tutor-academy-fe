import type { RouteObject } from "react-router";
import AboutPage from "../pages/public/AboutPage";
import ContactPage from "../pages/public/ContactPage";
import CourseDetailPage from "../pages/shared/course/CourseDetailPage";
import HelpFAQPage from "../pages/public/HelpFAQPage";
import HomePage from "../pages/public/HomePage";
import LoginPage from "../pages/public/LoginPage";
import RegisterPage from "../pages/public/RegisterPage";
import TutorApplicationPage from "../pages/public/TutorApplicationPage";
import MarketplacePage from "../pages/public/MarketplacePage";
import NotFoundPage from "../pages/public/NotFoundPage";

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/marketplace",
    Component: MarketplacePage,
  },
  {
    path: "/class/:courseId",
    Component: CourseDetailPage,
  },
  {
    path: "/course/:courseId",
    Component: CourseDetailPage,
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
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/register/tutor",
    Component: TutorApplicationPage,
  },
  {
    path: "/404",
    Component: NotFoundPage,
  },
];
