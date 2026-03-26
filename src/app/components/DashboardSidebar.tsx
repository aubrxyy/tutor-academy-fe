import { Link, useLocation, useNavigate } from "react-router";
import { GraduationCap, LogOut, type LucideIcon } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { cn } from "./ui/utils";

export interface DashboardNavItem {
  label: string;
  icon: LucideIcon;
  to?: string;
  onClick?: () => void;
  active?: boolean;
  exact?: boolean;
}

interface DashboardSidebarProps {
  roleLabel: string;
  navItems: DashboardNavItem[];
}

function isActivePath(pathname: string, to: string, exact = false) {
  const path = to.split("?")[0];

  if (path === "/") {
    return pathname === "/";
  }

  if (exact) {
    return pathname === path;
  }

  return pathname === path || pathname.startsWith(`${path}/`);
}

export default function DashboardSidebar({ roleLabel, navItems }: DashboardSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <aside className="w-full border-b border-[#D9E6EA] bg-white/95 backdrop-blur-md lg:sticky lg:top-0 lg:h-screen lg:w-[280px] lg:flex-shrink-0 lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col p-4 sm:p-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0A1B45] to-[#308279] text-white shadow-md">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#308279]">
              {roleLabel}
            </div>
            <div className="text-lg font-bold tracking-[-0.02em] text-[#0A1B45]">
              Tutoring Academy
            </div>
          </div>
        </Link>
        <nav className="mt-6 space-y-1.5">
          {navItems.map((item) => {
            const active =
              item.active ?? (item.to ? isActivePath(location.pathname, item.to, item.exact) : false);

            const itemClassName = cn(
              "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-all",
              active
                ? "bg-[#0A1B45] text-white shadow-[0_14px_30px_rgba(10,27,69,0.16)]"
                : "text-[#476074] hover:bg-[#F3F8FA] hover:text-[#0A1B45]",
            );

            const iconClassName = cn("h-4 w-4", active ? "text-[#92B7B0]" : "text-[#308279]");

            if (item.to) {
              return (
                <Link key={item.label} to={item.to} className={itemClassName}>
                  <item.icon className={iconClassName} />
                  <span>{item.label}</span>
                </Link>
              );
            }

            return (
              <button key={item.label} type="button" onClick={item.onClick} className={itemClassName}>
                <item.icon className={iconClassName} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-2xl border border-[#D9E6EA] bg-white px-4 py-3 text-sm font-semibold text-[#0A1B45] transition-colors hover:border-[#308279] hover:bg-[#F3F8FA]"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          <LogOut className="h-4 w-4 text-[#308279]" />
          Logout
        </button>
      </div>
    </aside>
  );
}
