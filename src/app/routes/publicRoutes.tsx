import type { RouteObject } from "react-router";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import CourseDetailPage from "../pages/CourseDetailPage";
import HelpFAQPage from "../pages/HelpFAQPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MarketplacePage from "../pages/MarketplacePage";
import NotFoundPage from "../pages/NotFoundPage";

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
    path: "/404",
    Component: NotFoundPage,
  },
];
