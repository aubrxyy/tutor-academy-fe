import { Award, ClipboardList, HelpCircle, LayoutDashboard, UserRound } from "lucide-react";
import { Outlet } from "react-router";
import DashboardSidebar from "../components/DashboardSidebar";

const studentNavItems = [
  { label: "Dashboard", to: "/student-dashboard", icon: LayoutDashboard, exact: true },
  { label: "Profile", to: "/student-profile", icon: UserRound, exact: true },
  { label: "Quizzes", to: "/student-quizzes", icon: ClipboardList, exact: true },
  { label: "Certificates", to: "/student-certificates", icon: Award, exact: true },
  { label: "Help Center", to: "/help-faq?role=student", icon: HelpCircle, exact: true },
];

export default function StudentPortalLayout() {
  return (
    <div className="min-h-screen bg-[#F3F8FA] lg:flex">
      <DashboardSidebar roleLabel="Student" navItems={studentNavItems} />
      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
