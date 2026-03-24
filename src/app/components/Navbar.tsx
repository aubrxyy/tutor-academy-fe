import { Link, useLocation } from "react-router";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { getDefaultDashboardPath, useAuth } from "../auth/AuthContext";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();
  const isDashboard = location.pathname.includes('dashboard') || location.pathname.includes('classroom');
  const dashboardHref = user ? getDefaultDashboardPath(user.role) : "/login";

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Marketplace", to: "/marketplace" },
    { label: "FAQ", to: "/help-faq" },
    ...(isAuthenticated ? [{ label: "Dashboard", to: dashboardHref }] : []),
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDashboard) return null;

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A1B45] to-[#308279] flex items-center justify-center text-white shadow-lg"
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <GraduationCap className="w-5 h-5" />
            </motion.div>
            <span className="text-xl font-bold text-[#0A1B45] tracking-tight">Tutoring <span className="text-[#308279] font-light">Academy</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="text-sm font-medium text-[#476074] hover:text-[#0A1B45] transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#308279] transition-all duration-300 group-hover:w-full rounded-full opacity-0 group-hover:opacity-100"></span>
              </Link>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated && user ? (
              <>
                <Link to={dashboardHref}>
                  <Button variant="ghost" className="text-[#0A1B45] hover:text-[#308279] hover:bg-[#F3F8FA] rounded-full font-medium px-6">
                    {user.name.split(" ")[0]}'s Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="rounded-full border-[#0A1B45] px-6 text-[#0A1B45] hover:bg-[#F3F8FA]"
                  onClick={logout}
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-[#0A1B45] hover:text-[#308279] hover:bg-[#F3F8FA] rounded-full font-medium px-6">
                    Log in
                  </Button>
                </Link>
                <Link to="/login?role=tutor">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-[#0A1B45] hover:bg-[#308279] text-white rounded-full font-medium px-6 shadow-lg hover:shadow-xl hover:shadow-[#308279]/20 transition-all duration-300">
                      Daftar Jadi Tutor
                    </Button>
                  </motion.div>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#0A1B45] hover:text-[#308279] focus:outline-none p-2"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }}>
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="block px-3 py-4 text-base font-medium text-[#476074] hover:text-[#0A1B45] hover:bg-[#F3F8FA] rounded-xl transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                {isAuthenticated ? (
                  <>
                    <Link to={dashboardHref} onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-center rounded-xl border-[#0A1B45] text-[#0A1B45]">
                        Open Dashboard
                      </Button>
                    </Link>
                    <Button
                      className="w-full justify-center rounded-xl bg-[#0A1B45] text-white"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-center rounded-xl border-[#0A1B45] text-[#0A1B45]">
                        Log in
                      </Button>
                    </Link>
                    <Link to="/login?role=tutor" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full justify-center rounded-xl bg-[#0A1B45] text-white">
                        Daftar Jadi Tutor
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
