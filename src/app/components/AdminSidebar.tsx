import { Link, useNavigate } from "react-router";
import {
  DollarSign,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "../auth/AuthContext";

export type AdminView = "dashboard" | "classes" | "students" | "tutors" | "financials";

const navItems: Array<{
  id: AdminView;
  label: string;
  icon: typeof LayoutDashboard;
}> = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "classes", label: "Classes", icon: FolderKanban },
  { id: "students", label: "Students", icon: GraduationCap },
  { id: "tutors", label: "Tutors", icon: Users },
  { id: "financials", label: "Financials", icon: DollarSign },
];

type AdminSidebarProps = {
  activeView: AdminView;
};

export default function AdminSidebar({ activeView }: AdminSidebarProps) {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  return (
    <aside className="sticky top-0 h-screen w-72 bg-gradient-to-b from-[#081734] to-[#308279] text-white shadow-[18px_0_40px_rgba(10,27,69,0.12)]">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white shadow-md backdrop-blur-sm">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.38em] text-[#92B7B0]">
              Admin
            </div>
            <div className="text-lg font-bold tracking-[-0.02em] text-white">
              Tutoring Academy
            </div>
          </div>
        </Link>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white/75">
          <ShieldCheck className="h-3.5 w-3.5 text-[#92B7B0]" />
          secure ops
        </div>
      </div>

      <nav className="px-3">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={`/admin-dashboard?view=${item.id}`}
            className={`mb-2 flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all ${
              activeView === item.id ? "bg-white/20 backdrop-blur-sm" : "hover:bg-white/10"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 border-t border-white/20 p-4">
        <div className="mb-4 rounded-2xl bg-white/10 p-4">
          <div className="text-sm font-semibold">{user?.name ?? "Ops Admin"}</div>
          <div className="mt-1 text-xs uppercase tracking-[0.16em] text-white/65">
            {user?.role ?? "admin"}
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-white hover:bg-white/10"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
