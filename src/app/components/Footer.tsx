import { Link } from "react-router";
import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A1B45] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#308279] to-[#92B7B0] flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Tutoring Academy</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Platform belajar peer-to-peer untuk mahasiswa BINUS. Belajar bareng, sukses bareng.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-[#308279] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-sm text-gray-300 hover:text-[#308279] transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/student-dashboard" className="text-sm text-gray-300 hover:text-[#308279] transition-colors">
                  Student Login
                </Link>
              </li>
              <li>
                <Link to="/tutor-dashboard" className="text-sm text-gray-300 hover:text-[#308279] transition-colors">
                  Tutor Portal
                </Link>
              </li>
              <li>
                <Link to="/admin-dashboard" className="text-sm text-gray-300 hover:text-[#308279] transition-colors">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-[#308279] transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-[#308279] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-[#308279] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-[#308279] transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <Mail className="w-4 h-4 mt-0.5 text-[#308279]" />
                <span>support@tutoringacademy.id</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <Phone className="w-4 h-4 mt-0.5 text-[#308279]" />
                <span>+62 21 1234 5678</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4 mt-0.5 text-[#308279]" />
                <span>BINUS University, Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-center text-sm text-gray-400">
            © 2026 Tutoring Academy - BINUS University. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}