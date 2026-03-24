import { createBrowserRouter, type RouteObject } from "react-router";
import RootLayout from "./layouts/RootLayout";
import NotFoundPage from "./pages/NotFoundPage";
import { adminRoutes } from "./routes/adminRoutes";
import { publicRoutes } from "./routes/publicRoutes";
import { studentRoutes } from "./routes/studentRoutes";
import { tutorRoutes } from "./routes/tutorRoutes";

const routes: RouteObject[] = [
  {
    Component: RootLayout,
    children: [
      ...publicRoutes,
      ...studentRoutes,
      ...tutorRoutes,
      ...adminRoutes,
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
