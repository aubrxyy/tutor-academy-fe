import { GraduationCap, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-[#0A1B45] text-white pt-24 pb-8 border-t border-white/10 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-[#308279]/20 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-4 max-w-md">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#308279] to-[#92b7b0] flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight">Tutoring <span className="font-light text-[#92B7B0]">Academy</span></span>
            </Link>
            <p className="text-[#92B7B0] leading-relaxed mb-8 text-sm">
              Platform pembelajaran kolaboratif premium untuk mahasiswa BINUS. Kami memfasilitasi transfer pengetahuan peer-to-peer dengan standar kualitas tinggi untuk kesuksesan akademik.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#92B7B0] hover:bg-[#308279] hover:text-white transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-white font-semibold mb-6 tracking-wide">Platform</h3>
            <ul className="space-y-4">
              <li><Link to="/marketplace" className="text-[#92B7B0] hover:text-white transition-colors text-sm">Course Catalog</Link></li>
              <li><Link to="/tutor-dashboard" className="text-[#92B7B0] hover:text-white transition-colors text-sm">Become a Tutor</Link></li>
              <li><Link to="/student-dashboard" className="text-[#92B7B0] hover:text-white transition-colors text-sm">Student Dashboard</Link></li>
              <li><Link to="#" className="text-[#92B7B0] hover:text-white transition-colors text-sm">Pricing Plans</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-6 tracking-wide">Company</h3>
            <ul className="space-y-4">
              <li><Link to="#" className="text-[#92B7B0] hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link to="#" className="text-[#92B7B0] hover:text-white transition-colors text-sm">Careers</Link></li>
              <li><Link to="#" className="text-[#92B7B0] hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to="#" className="text-[#92B7B0] hover:text-white transition-colors text-sm">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold mb-6 tracking-wide">Contact Us</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 text-[#92B7B0] hover:text-white transition-colors group">
                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-[#308279]/20 transition-colors">
                  <MapPin className="w-5 h-5 text-[#308279]" />
                </div>
                <span className="text-sm leading-relaxed pt-1">BINUS University, Anggrek Campus<br />Jakarta Barat, 11480</span>
              </li>
              <li className="flex items-center gap-4 text-[#92B7B0] hover:text-white transition-colors group">
                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-[#308279]/20 transition-colors">
                  <Phone className="w-5 h-5 text-[#308279]" />
                </div>
                <span className="text-sm">+62 21 5369 6969</span>
              </li>
              <li className="flex items-center gap-4 text-[#92B7B0] hover:text-white transition-colors group">
                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-[#308279]/20 transition-colors">
                  <Mail className="w-5 h-5 text-[#308279]" />
                </div>
                <span className="text-sm">hello@tutoringacademy.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#476074] text-sm">
            © {new Date().getFullYear()} Tutoring Academy BINUS. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[#476074] text-sm">
            <Link to="#" className="hover:text-[#92B7B0] transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-[#92B7B0] transition-colors">Terms</Link>
            <Link to="#" className="hover:text-[#92B7B0] transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}