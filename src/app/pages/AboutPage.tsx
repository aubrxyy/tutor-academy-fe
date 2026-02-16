import { Link } from "react-router";
import { Target, Users, Award, TrendingUp, Heart, Shield } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Student-Centric",
      description: "By students, for students. Kami memahami kebutuhan belajar mahasiswa BINUS.",
    },
    {
      icon: Users,
      title: "Peer-to-Peer Learning",
      description: "Belajar dari kakak tingkat yang sudah melewati tantangan yang sama.",
    },
    {
      icon: Award,
      title: "Quality Content",
      description: "Materi berkualitas tinggi yang sudah terbukti efektif.",
    },
    {
      icon: TrendingUp,
      title: "Continuous Improvement",
      description: "Kami terus berinovasi untuk memberikan pengalaman belajar terbaik.",
    },
    {
      icon: Heart,
      title: "Community First",
      description: "Membangun komunitas belajar yang suportif dan kolaboratif.",
    },
    {
      icon: Shield,
      title: "Trusted Platform",
      description: "Platform aman dan terpercaya untuk pembelajaran online.",
    },
  ];

  const stats = [
    { value: "2,847", label: "Active Students" },
    { value: "145", label: "Courses Available" },
    { value: "50+", label: "Expert Tutors" },
    { value: "4.9/5", label: "Average Rating" },
  ];

  return (
    <div className="min-h-screen bg-[#F3F8FA]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0A1B45] to-[#308279] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About Tutoring Academy</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Belajar Bareng, Sukses Bareng di BINUS
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-12 bg-gradient-to-br from-white to-[#F3F8FA]">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-[#0A1B45] mb-6">Our Mission</h2>
              <p className="text-lg text-[#476074] leading-relaxed mb-6">
                Tutoring Academy adalah platform pembelajaran peer-to-peer yang dirancang khusus untuk mahasiswa BINUS University. Kami percaya bahwa belajar paling efektif adalah ketika sesama mahasiswa saling berbagi pengetahuan dan pengalaman.
              </p>
              <p className="text-lg text-[#476074] leading-relaxed">
                Misi kami adalah membuat pendidikan berkualitas lebih accessible, affordable, dan engaging melalui live interactive sessions, comprehensive learning materials, dan komunitas yang suportif.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0A1B45] text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold text-[#308279] mb-2">{stat.value}</div>
                <div className="text-[#476074]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0A1B45] text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#308279] to-[#0A1B45] flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0A1B45] mb-2">{value.title}</h3>
                <p className="text-[#476074]">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0A1B45] text-center mb-12">Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Dr. Sarah Johnson", role: "Platform Director", expertise: "EdTech Innovation" },
              { name: "Michael Chen", role: "Head of Tutors", expertise: "Computer Science" },
              { name: "Priya Sharma", role: "Student Success Lead", expertise: "Learning Design" },
            ].map((member, idx) => (
              <Card key={idx} className="p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#308279] to-[#0A1B45] mx-auto mb-4"></div>
                <h3 className="font-bold text-lg text-[#0A1B45]">{member.name}</h3>
                <p className="text-[#476074] text-sm mb-1">{member.role}</p>
                <p className="text-[#92B7B0] text-sm">{member.expertise}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#308279] to-[#0A1B45] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl text-white/90 mb-8">
            Start your learning journey with thousands of BINUS students today
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/marketplace">
              <Button className="bg-white text-[#308279] hover:bg-white/90 text-lg px-8 py-6">
                Browse Courses
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
