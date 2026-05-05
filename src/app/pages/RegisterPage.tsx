import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowRight, LockKeyhole, ShieldCheck, UserRound } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { getDefaultDashboardPath, useAuth } from "../auth/AuthContext";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Registration failed. Please check your information and try again.";
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user, register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(getDefaultDashboardPath(user.role), { replace: true });
    }
  }, [isAuthenticated, navigate, user]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    // Validate password match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      setIsSubmitting(false);
      return;
    }

    try {
      const registeredUser = await register({
        name: name.trim(),
        email: email.trim(),
        username: username.trim(),
        password,
      });

      navigate(getDefaultDashboardPath(registeredUser.role), {
        replace: true,
      });
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
          <section className="rounded-[2rem] bg-gradient-to-br from-[#0A1B45] via-[#153063] to-[#308279] p-8 text-white shadow-[0_30px_80px_rgba(10,27,69,0.18)] sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">
              <ShieldCheck className="h-4 w-4 text-[#92B7B0]" />
              GraphQL backend connected
            </div>

            <h1 className="mt-8 max-w-[12ch] text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl">
              Daftar ke Tutoring Academy.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
              Buat akun baru melalui backend GraphQL. Setelah pendaftaran berhasil,
              frontend akan memuat profil dan role akun untuk menentukan dashboard
              student, tutor, atau admin.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                    <LockKeyhole className="h-5 w-5 text-[#92B7B0]" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold">Token session</div>
                    <div className="text-sm text-white/60">Stored locally</div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-white/75">
                  Authenticated requests send the backend token as a bearer
                  authorization header through Apollo Client.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                    <UserRound className="h-5 w-5 text-[#92B7B0]" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold">Role routing</div>
                    <div className="text-sm text-white/60">Backend driven</div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-white/75">
                  Backend roles are mapped into the existing student, tutor, and
                  admin route guards.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white bg-white p-7 shadow-[0_22px_60px_rgba(10,27,69,0.08)] sm:p-8">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#308279]">
                Sign Up
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[#0A1B45]">
                Buat akun baru
              </h2>
              <p className="mt-3 text-base leading-7 text-[#476074]">
                Isi form di bawah untuk membuat akun baru. Setelah login,
                kamu bisa mengakses marketplace dan course detail dengan data
                personal kamu.
              </p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  placeholder="John Doe"
                  className="h-12 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  placeholder="john@example.com"
                  className="h-12 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  autoComplete="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                  placeholder="johndoe"
                  className="h-12 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  placeholder="••••••••"
                  className="h-12 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                  placeholder="••••••••"
                  className="h-12 rounded-xl"
                />
              </div>

              {errorMessage ? (
                <div className="rounded-2xl border border-[#F3B7B7] bg-[#FFF5F5] p-4 text-sm font-medium text-[#A33A3A]">
                  {errorMessage}
                </div>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 flex-1 rounded-xl bg-[#0A1B45] text-white hover:bg-[#308279]"
                >
                  {isSubmitting ? "Creating account..." : "Register"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Link to="/login" className="sm:flex-1">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 w-full rounded-xl border-[#0A1B45] text-[#0A1B45] hover:bg-[#F3F8FA]"
                  >
                    Already have account?
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
