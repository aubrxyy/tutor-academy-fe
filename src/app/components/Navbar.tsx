import { Link, useLocation } from "react-router";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname.includes('dashboard') || location.pathname.includes('classroom');

  if (isDashboard) return null; // Dashboard has its own navigation

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-[rgba(146,183,176,0.2)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#308279] to-[#0A1B45] flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-[#0A1B45]">Tutoring Academy</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="text-sm font-medium text-[#476074] hover:text-[#308279] transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/marketplace" 
              className="text-sm font-medium text-[#476074] hover:text-[#308279] transition-colors"
            >
              Courses
            </Link>
            <Link 
              to="/about" 
              className="text-sm font-medium text-[#476074] hover:text-[#308279] transition-colors"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-sm font-medium text-[#476074] hover:text-[#308279] transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/student-dashboard">
              <Button variant="outline" className="border-[#308279] text-[#308279] hover:bg-[#308279]/10">
                Login
              </Button>
            </Link>
            <Link to="/tutor-dashboard">
              <Button className="bg-[#308279] hover:bg-[#308279]/90 text-white">
                Daftar Jadi Tutor
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#0A1B45]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[rgba(146,183,176,0.2)]">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-sm font-medium text-[#476074] hover:text-[#308279] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/marketplace" 
                className="text-sm font-medium text-[#476074] hover:text-[#308279] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Courses
              </Link>
              <Link 
                to="/about" 
                className="text-sm font-medium text-[#476074] hover:text-[#308279] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-sm font-medium text-[#476074] hover:text-[#308279] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/student-dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-[#308279] text-[#308279]">
                    Login
                  </Button>
                </Link>
                <Link to="/tutor-dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-[#308279] hover:bg-[#308279]/90 text-white">
                    Daftar Jadi Tutor
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}