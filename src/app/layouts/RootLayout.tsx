import { Outlet } from "react-router";
import ScrollToTop from "../components/layout/ScrollToTop";

export default function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}
