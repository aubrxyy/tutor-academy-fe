import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { ArrowRight, GraduationCap, ShieldCheck, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import {
  availableRoles,
  getDefaultDashboardPath,
  getRoleLabel,
  type AppRole,
  useAuth,
} from "../auth/AuthContext";

const roleDescriptions: Record<AppRole, string> = {
  student: "Browse classes, unlock paid content, track progress, and earn certificates.",
  tutor: "Manage modules, upload learning materials, and review student outcomes.",
  admin: "Monitor users, class operations, and transaction visibility across the platform.",
  founder: "Access executive-level financial controls and platform-wide reporting.",
  "co-founder": "Access restricted finance views and shared operational oversight tools.",
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, user, loginAs } = useAuth();

  const requestedRole = searchParams.get("role");
  const initialRole = availableRoles.includes(requestedRole as AppRole)
    ? (requestedRole as AppRole)
    : "student";

  const [selectedRole, setSelectedRole] = useState<AppRole>(initialRole);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(getDefaultDashboardPath(user.role), { replace: true });
    }
  }, [isAuthenticated, navigate, user]);

  const redirectTarget =
    searchParams.get("redirect") || getDefaultDashboardPath(selectedRole);

  const handleMockLogin = () => {
    loginAs(selectedRole);
    navigate(redirectTarget, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#F3F8FA] selection:bg-[#308279] selection:text-white">
      <Navbar />

      <main className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[2rem] bg-gradient-to-br from-[#0A1B45] via-[#153063] to-[#308279] p-8 text-white shadow-[0_30px_80px_rgba(10,27,69,0.18)] sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-[#92B7B0]" />
              Frontend access gateway
            </div>

            <h1 className="mt-8 max-w-[12ch] text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl">
              Masuk ke alur LMS sesuai peranmu.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
              Backend auth belum dihubungkan, jadi halaman ini memakai mock session
              agar kita bisa lanjut mengimplementasikan flow student, tutor, admin,
              founder, dan co-founder di frontend.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                    <GraduationCap className="h-5 w-5 text-[#92B7B0]" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold">What this unlocks</div>
                    <div className="text-sm text-white/60">Role-aware route guards</div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-white/75">
                  Existing dashboard pages now sit behind protected route groups,
                  which gives us a real frontend foundation for RBAC.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                    <ShieldCheck className="h-5 w-5 text-[#92B7B0]" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold">Why it matters</div>
                    <div className="text-sm text-white/60">Safer implementation path</div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-white/75">
                  We can now build public, student, tutor, and admin flows without
                  leaving navigation and permissions undefined.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white bg-white p-7 shadow-[0_22px_60px_rgba(10,27,69,0.08)] sm:p-8">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#308279]">
                Demo Sign In
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[#0A1B45]">
                Choose a role to continue
              </h2>
              <p className="mt-3 text-base leading-7 text-[#476074]">
                Pick the experience you want to test right now. We can replace this
                page with the real auth provider later without changing the route
                guards.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              {availableRoles.map((role) => {
                const isSelected = selectedRole === role;

                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`w-full rounded-2xl border p-5 text-left transition-all ${
                      isSelected
                        ? "border-[#308279] bg-[#EBF3F1] shadow-[0_10px_25px_rgba(48,130,121,0.12)]"
                        : "border-[#E4ECEF] bg-white hover:border-[#92B7B0] hover:bg-[#F8FBFB]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-lg font-semibold text-[#0A1B45]">
                          {getRoleLabel(role)}
                        </div>
                        <div className="mt-1 text-sm leading-6 text-[#476074]">
                          {roleDescriptions[role]}
                        </div>
                      </div>
                      <div
                        className={`mt-1 h-5 w-5 rounded-full border-2 ${
                          isSelected
                            ? "border-[#308279] bg-[#308279]"
                            : "border-[#92B7B0]"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 rounded-2xl bg-[#F3F8FA] p-5">
              <div className="text-sm font-semibold text-[#0A1B45]">
                Redirect after login
              </div>
              <div className="mt-1 break-all text-sm text-[#476074]">
                {redirectTarget}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={handleMockLogin}
                className="h-12 flex-1 rounded-xl bg-[#0A1B45] text-white hover:bg-[#308279]"
              >
                Continue as {getRoleLabel(selectedRole)}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link to="/" className="sm:flex-1">
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-xl border-[#0A1B45] text-[#0A1B45] hover:bg-[#F3F8FA]"
                >
                  Back to homepage
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
