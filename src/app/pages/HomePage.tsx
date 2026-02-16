import { Link } from "react-router";
import { Users, BookCheck, Eye, Star, ArrowRight, FileText, Video, TrendingUp, Zap, Award, Target, Clock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import promoImage from "figma:asset/ee6e081d69dcaafcb5871385542c2cbef29a8c23.png";

export default function HomePage() {
  const courses = [
    {
      id: 1,
      title: "Data Structures & Algorithms",
      major: "Computer Science",
      price: "Rp 150.000",
      priceLabel: "/month",
      rating: 4.9,
      reviews: 234,
      students: 450,
      tutor: "Raka Pratama",
      liveSessions: 12,
      materials: 15,
    },
    {
      id: 2,
      title: "Business Strategy & Management",
      major: "Business Administration",
      price: "Rp 140.000",
      priceLabel: "/month",
      rating: 4.8,
      reviews: 189,
      students: 320,
      tutor: "Siti Nurhaliza",
      liveSessions: 10,
      materials: 12,
    },
    {
      id: 3,
      title: "Financial Accounting",
      major: "Accounting",
      price: "Rp 135.000",
      priceLabel: "/month",
      rating: 4.7,
      reviews: 156,
      students: 280,
      tutor: "Budi Santoso",
      liveSessions: 8,
      materials: 10,
    },
    {
      id: 4,
      title: "Digital Marketing Mastery",
      major: "Marketing",
      price: "Rp 145.000",
      priceLabel: "/month",
      rating: 4.9,
      reviews: 201,
      students: 380,
      tutor: "Lisa Amanda",
      liveSessions: 10,
      materials: 14,
    },
  ];

  const topTutors = [
    {
      id: 1,
      name: "Raka Pratama",
      major: "Computer Science",
      gpa: "3.95",
      courses: 12,
      students: 450,
      rating: 4.9,
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      major: "Business Administration",
      gpa: "3.87",
      courses: 8,
      students: 320,
      rating: 4.8,
    },
    {
      id: 3,
      name: "Budi Santoso",
      major: "Accounting",
      gpa: "3.92",
      courses: 10,
      students: 380,
      rating: 4.9,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F3F8FA] via-white to-[#F3F8FA] pt-20 pb-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <Badge className="bg-[#308279]/10 text-[#308279] hover:bg-[#308279]/20 border-0">
                Platform Belajar Peer-to-Peer BINUS
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold text-[#0A1B45] leading-tight">
                Belajar Bareng, <br />
                <span className="text-[#308279]">Sukses Bareng</span> <br />
                di BINUS.
              </h1>
              <p className="text-lg text-[#476074] max-w-xl">
                Platform belajar inklusif dimana kamu bisa jadi murid atau tutor. Akses ribuan materi, video pembelajaran, dan cheat notes dari sesama mahasiswa BINUS.
              </p>
              
              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link to="/marketplace">
                  <Button size="lg" className="bg-[#308279] hover:bg-[#308279]/90 text-white h-12 px-8">
                    Cari Materi
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/tutor-dashboard">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-[#308279] text-[#308279] hover:bg-[#308279]/10 h-12 px-8"
                  >
                    Daftar Jadi Tutor
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-8">
                <div>
                  <div className="text-3xl font-bold text-[#0A1B45]">2,500+</div>
                  <div className="text-sm text-[#476074]">Mahasiswa Aktif</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#0A1B45]">150+</div>
                  <div className="text-sm text-[#476074]">Tutor Terverifikasi</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#0A1B45]">500+</div>
                  <div className="text-sm text-[#476074]">Materi Premium</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#308279]/20 to-[#92B7B0]/20 rounded-3xl blur-3xl"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758270705641-acf09b68a91f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdW5pdmVyc2l0eSUyMHN0dWRlbnRzJTIwc3R1ZHlpbmclMjB0b2dldGhlciUyMGNhbXB1c3xlbnwxfHx8fDE3NzExNzczNjd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Students studying together"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apple-like Grid Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-[#308279]/10 text-[#308279] hover:bg-[#308279]/20 border-0 mb-4">
              Why Choose Us
            </Badge>
            <h2 className="text-4xl font-bold text-[#0A1B45] mb-4">
              All-Powered Learning Path
            </h2>
            <p className="text-lg text-[#476074] max-w-2xl mx-auto">
              Everything you need to succeed in your academic journey
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-12 gap-4 auto-rows-[200px]">
            {/* Large Card - AI Powered Learning */}
            <Card className="col-span-12 md:col-span-5 row-span-2 overflow-hidden group hover:shadow-2xl transition-all border-2 hover:border-[#308279] relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#F3F8FA] to-white p-6 flex flex-col justify-between">
                <div>
                  <Badge className="bg-[#308279]/10 text-[#308279] border-0 mb-3">
                    Powered by AI
                  </Badge>
                  <h3 className="text-2xl font-bold text-[#0A1B45] mb-2">
                    AI-Powered Learning Path
                  </h3>
                  <p className="text-[#476074] text-sm">
                    Adaptive learning algorithms that personalize your study experience based on your progress and learning style.
                  </p>
                </div>
                <div className="mt-auto">
                  <img 
                    src={promoImage} 
                    alt="Learning environment" 
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              </div>
            </Card>

            {/* Medium Card - 70% Discount */}
            <Card className="col-span-12 md:col-span-4 row-span-1 overflow-hidden bg-gradient-to-br from-[#0A1B45] to-[#308279] text-white group hover:shadow-2xl transition-all relative">
              <div className="p-6 h-full flex flex-col justify-between">
                <div>
                  <Badge className="bg-white/20 text-white border-0 mb-2 backdrop-blur-sm">
                    Limited Time
                  </Badge>
                  <div className="text-6xl font-bold mb-2">70%</div>
                  <p className="text-white/90 text-sm">Off on annual subscriptions</p>
                </div>
                <Link to="/marketplace" className="self-start">
                  <Button variant="outline" className="bg-white text-[#0A1B45] hover:bg-white/90 border-0">
                    Claim Deal
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Medium Card - Collaborative Learning */}
            <Card className="col-span-12 md:col-span-3 row-span-1 overflow-hidden group hover:shadow-2xl transition-all border-2 hover:border-[#308279]">
              <div className="p-6 h-full flex flex-col justify-between bg-gradient-to-br from-[#F3F8FA] to-white">
                <div>
                  <Zap className="w-8 h-8 text-[#308279] mb-2" />
                  <h3 className="font-bold text-[#0A1B45] mb-1">
                    Collaborative Learning Environment
                  </h3>
                  <p className="text-xs text-[#476074]">
                    Study groups and peer discussions
                  </p>
                </div>
              </div>
            </Card>

            {/* Small Card - 40% Off */}
            <Card className="col-span-6 md:col-span-3 row-span-1 overflow-hidden bg-gradient-to-br from-[#92B7B0] to-[#308279] text-white group hover:shadow-2xl transition-all">
              <div className="p-6 h-full flex flex-col justify-center items-center text-center">
                <div className="text-5xl font-bold mb-1">40%</div>
                <p className="text-white/90 text-xs">Off first month</p>
              </div>
            </Card>

            {/* Small Card - 80% Success Rate */}
            <Card className="col-span-6 md:col-span-3 row-span-1 overflow-hidden bg-gradient-to-br from-[#0A1B45] to-[#476074] text-white group hover:shadow-2xl transition-all">
              <div className="p-6 h-full flex flex-col justify-center items-center text-center">
                <div className="text-5xl font-bold mb-1">80%</div>
                <p className="text-white/90 text-xs">Success rate improvement</p>
              </div>
            </Card>

            {/* Medium Card - Analytics */}
            <Card className="col-span-12 md:col-span-3 row-span-1 overflow-hidden group hover:shadow-2xl transition-all border-2 hover:border-[#308279]">
              <div className="p-6 h-full flex flex-col justify-between bg-gradient-to-br from-[#F3F8FA] to-white">
                <div>
                  <Target className="w-8 h-8 text-[#308279] mb-2" />
                  <h3 className="font-bold text-[#0A1B45] mb-1">
                    Actionable Analytics & Insights
                  </h3>
                  <p className="text-xs text-[#476074]">
                    Track your progress in real-time
                  </p>
                </div>
              </div>
            </Card>

            {/* Large Card - Image */}
            <Card className="col-span-12 md:col-span-3 row-span-2 overflow-hidden group hover:shadow-2xl transition-all border-0">
              <div className="relative h-full">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                  alt="Students collaborating"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="font-bold mb-1">Real-time Collaboration</h3>
                    <p className="text-sm text-white/90">Connect with peers instantly</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Medium Card - 75% Productivity */}
            <Card className="col-span-12 md:col-span-4 row-span-1 overflow-hidden group hover:shadow-2xl transition-all border-2 hover:border-[#308279]">
              <div className="p-6 h-full flex items-center justify-between bg-gradient-to-br from-[#F3F8FA] to-white">
                <div>
                  <h3 className="text-4xl font-bold text-[#0A1B45] mb-1">75%</h3>
                  <p className="text-sm text-[#476074]">Increased productivity</p>
                </div>
                <Award className="w-16 h-16 text-[#308279]/20" />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Limited Time Promo Banner */}
      <section className="py-12 bg-gradient-to-r from-[#0A1B45] via-[#308279] to-[#0A1B45]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="bg-red-500 text-white border-0 mb-4 animate-pulse">
              🔥 LIMITED TIME OFFER
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              New Year Special: Up to 70% OFF
            </h2>
            <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
              Subscribe to any course before February 28th and get massive discounts on annual plans!
            </p>
            <div className="flex flex-wrap gap-4 justify-center items-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold text-white">03</div>
                <div className="text-sm text-white/80">Days</div>
              </div>
              <div className="text-white text-2xl">:</div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold text-white">14</div>
                <div className="text-sm text-white/80">Hours</div>
              </div>
              <div className="text-white text-2xl">:</div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold text-white">27</div>
                <div className="text-sm text-white/80">Minutes</div>
              </div>
            </div>
            <Link to="/marketplace">
              <Button size="lg" className="bg-white text-[#0A1B45] hover:bg-white/90 h-12 px-8">
                Explore Courses
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-[#308279]/10 text-[#308279] hover:bg-[#308279]/20 border-0 mb-4">
              Kenapa Pilih Kami
            </Badge>
            <h2 className="text-4xl font-bold text-[#0A1B45] mb-4">
              Belajar Lebih Efektif dengan Tutoring Academy
            </h2>
            <p className="text-lg text-[#476074] max-w-2xl mx-auto">
              Platform yang dirancang khusus untuk mahasiswa BINUS, oleh mahasiswa BINUS.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="p-8 border-2 hover:border-[#308279] transition-all hover:shadow-xl">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-[#308279] to-[#92B7B0] flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#0A1B45] mb-3">Peer Learning</h3>
              <p className="text-[#476074] leading-relaxed">
                Belajar dari dan dengan sesama mahasiswa BINUS. Metode pembelajaran yang lebih relatable dan efektif.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="p-8 border-2 hover:border-[#308279] transition-all hover:shadow-xl">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-[#308279] to-[#92B7B0] flex items-center justify-center mb-6">
                <BookCheck className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#0A1B45] mb-3">Verified Tutors</h3>
              <p className="text-[#476074] leading-relaxed">
                Semua tutor telah diverifikasi dengan GPA minimal 3.5 dan track record mengajar yang baik.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="p-8 border-2 hover:border-[#308279] transition-all hover:shadow-xl">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-[#308279] to-[#92B7B0] flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#0A1B45] mb-3">Eye-Tracking Focus Mode</h3>
              <p className="text-[#476074] leading-relaxed">
                Teknologi AI yang membantu kamu tetap fokus saat belajar dengan monitoring perhatian real-time.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Premium Cheat Notes Section */}
      <section className="py-20 bg-[#F3F8FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <Badge className="bg-[#308279]/10 text-[#308279] hover:bg-[#308279]/20 border-0 mb-4">
                Featured Courses
              </Badge>
              <h2 className="text-4xl font-bold text-[#0A1B45] mb-2">
                Popular Courses
              </h2>
              <p className="text-lg text-[#476074]">
                Join thousands of students learning from top BINUS tutors
              </p>
            </div>
            <Link to="/marketplace">
              <Button variant="outline" className="border-[#308279] text-[#308279] hover:bg-[#308279]/10">
                Lihat Semua
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-xl transition-all group cursor-pointer border-2 hover:border-[#308279]">
                <div className="bg-gradient-to-br from-[#308279] to-[#0A1B45] h-40 flex items-center justify-center relative overflow-hidden">
                  <FileText className="w-16 h-16 text-white/20 absolute" />
                  <div className="relative z-10 text-center">
                    <Video className="w-12 h-12 text-white mx-auto mb-2" />
                    <Badge className="bg-white/20 text-white border-0">Live Sessions</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <Badge variant="outline" className="mb-3 text-xs border-[#92B7B0] text-[#476074]">
                    {course.major}
                  </Badge>
                  <h3 className="font-bold text-[#0A1B45] mb-3 line-clamp-2 group-hover:text-[#308279] transition-colors">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-4 text-sm text-[#476074]">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[#308279] text-[#308279]" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{course.reviews} reviews</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div>
                      <div className="text-xl font-bold text-[#308279]">{course.price}</div>
                      <div className="text-xs text-[#476074]">{course.priceLabel}</div>
                    </div>
                    <Link to={`/course/${course.id}`}>
                      <Button size="sm" className="bg-[#308279] hover:bg-[#308279]/90 text-white">
                        View Course
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Tutors Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-[#308279]/10 text-[#308279] hover:bg-[#308279]/20 border-0 mb-4">
              Tutor Terbaik Kami
            </Badge>
            <h2 className="text-4xl font-bold text-[#0A1B45] mb-4">
              Belajar dari Mahasiswa Berprestasi
            </h2>
            <p className="text-lg text-[#476074] max-w-2xl mx-auto">
              Tutor kami adalah mahasiswa BINUS dengan GPA tinggi dan pengalaman mengajar yang terbukti.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {topTutors.map((tutor) => (
              <Card key={tutor.id} className="overflow-hidden hover:shadow-xl transition-all group border-2 hover:border-[#308279]">
                <div className="h-48 bg-gradient-to-br from-[#308279] to-[#0A1B45] relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm border-4 border-white/50 flex items-center justify-center">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1511629091441-ee46146481b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdHVkZW50JTIwdHV0b3IlMjB0ZWFjaGluZ3xlbnwxfHx8fDE3NzExNzg4MDN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt={tutor.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <Badge className="absolute top-4 right-4 bg-white/20 text-white border-0">
                    <Star className="w-3 h-3 fill-white mr-1" />
                    {tutor.rating}
                  </Badge>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0A1B45] mb-1">{tutor.name}</h3>
                  <p className="text-[#476074] mb-4">{tutor.major}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#476074]">GPA:</span>
                      <span className="font-bold text-[#308279]">{tutor.gpa}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#476074]">Courses:</span>
                      <span className="font-medium text-[#0A1B45]">{tutor.courses}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#476074]">Students:</span>
                      <span className="font-medium text-[#0A1B45]">{tutor.students}+</span>
                    </div>
                  </div>
                  <Button className="w-full bg-[#308279] hover:bg-[#308279]/90 text-white">
                    Lihat Profile
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0A1B45] to-[#308279]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <TrendingUp className="w-16 h-16 text-white/80 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Siap Meningkatkan Prestasi Akademik Kamu?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Bergabung dengan ribuan mahasiswa BINUS yang sudah merasakan manfaat belajar dengan Tutoring Academy.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/student-dashboard">
              <Button size="lg" className="bg-white text-[#0A1B45] hover:bg-white/90 h-12 px-8">
                Mulai Belajar Sekarang
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/tutor-dashboard">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white/10 h-12 px-8"
              >
                Daftar Jadi Tutor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
