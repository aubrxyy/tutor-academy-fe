import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import {
  ArrowRight,
  CalendarDays,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import Navbar from "../../components/navigation/Navbar";
import Footer from "../../components/layout/Footer";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { getDefaultDashboardPath, useAuth } from "../../auth/AuthContext";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Login failed. Please check your username and password.";
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { isAuthenticated, user, login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(
        searchParams.get("redirect") || getDefaultDashboardPath(user.role),
        { replace: true },
      );
    }
  }, [isAuthenticated, navigate, searchParams, user]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const loggedInUser = await login({
        username: username.trim(),
        password,
      });

      navigate(
        searchParams.get("redirect") ||
          getDefaultDashboardPath(loggedInUser.role),
        { replace: true },
      );
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F8FA] selection:bg-[#308279] selection:text-white">
      <Navbar />

      <main className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* LEFT HERO SECTION */}
          <section className="rounded-[2rem] bg-gradient-to-br from-[#0A1B45] via-[#153063] to-[#308279] p-8 text-white shadow-[0_30px_80px_rgba(10,27,69,0.18)] sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">
              <ShieldCheck className="h-4 w-4 text-[#92B7B0]" />
              Belajar Bareng Mahasiswa BINUS
            </div>

            <h1 className="mt-8 max-w-[12ch] text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl">
              Masuk ke Tutoring Academy.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
              Platform peer-to-peer tutoring untuk mahasiswa BINUS.
              Cari tutor, jadwalkan sesi belajar, dan tingkatkan pemahaman
              mata kuliah bersama mahasiswa lain yang sudah berpengalaman.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {/* CARD 1 */}
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                    <UserRound className="h-5 w-5 text-[#92B7B0]" />
                  </div>

                  <div>
                    <div className="text-lg font-semibold">
                      Cari Tutor
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-white/75">
                  Temukan tutor yang sesuai dengan kebutuhan belajar kamu.
                </p>
              </div>

              {/* CARD 2 */}
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                    <CalendarDays className="h-5 w-5 text-[#92B7B0]" />
                  </div>

                  <div>
                    <div className="text-lg font-semibold">
                      Jadwal Fleksibel
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-white/75">
                  Atur sesi belajar sesuai waktu luangmu secara online.
                </p>
              </div>
            </div>
          </section>

          {/* LOGIN CARD */}
          <section className="flex flex-col rounded-[2rem] border border-white bg-white p-7 shadow-[0_22px_60px_rgba(10,27,69,0.08)] sm:p-8">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#308279]">
                Sign In
              </div>

              <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[#0A1B45]">
                Username dan password
              </h2>

              <p className="mt-3 text-base leading-7 text-[#476074]">
                Masuk untuk mengakses marketplace tutor, course,
                dan dashboard pembelajaranmu.
              </p>
            </div>

            <form
              className="mt-8 flex flex-1 flex-col"
              onSubmit={handleSubmit}
            >
              <div className="space-y-5">
                {/* USERNAME */}
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>

                  <Input
                    id="username"
                    autoComplete="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                    placeholder="username"
                    className="h-12 rounded-xl"
                  />
                </div>

                {/* PASSWORD */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>

                  <Input
                    id="password"
                    autoComplete="current-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    placeholder="password"
                    className="h-12 rounded-xl"
                  />
                </div>

                {/* ERROR */}
                {errorMessage ? (
                  <div className="rounded-2xl border border-[#F3B7B7] bg-[#FFF5F5] p-4 text-sm font-medium text-[#A33A3A]">
                    {errorMessage}
                  </div>
                ) : null}
              </div>

              {/* BUTTONS */}
              <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 flex-1 rounded-xl bg-[#0A1B45] text-white hover:bg-[#308279]"
                >
                  {isSubmitting ? "Signing in..." : "Continue"}

                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Link to="/" className="sm:flex-1">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 w-full rounded-xl border-[#0A1B45] text-[#0A1B45] hover:bg-[#F3F8FA]"
                  >
                    Back to homepage
                  </Button>
                </Link>
              </div>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
