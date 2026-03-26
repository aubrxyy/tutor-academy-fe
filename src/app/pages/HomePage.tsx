import { Link } from "react-router";
import { Eye, Star, ArrowRight, TrendingUp, Clock, Target, CheckCircle2, Video } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { motion, useScroll, useTransform, Variants } from "motion/react";
import { useState } from "react";

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
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
    {
      id: 2,
      title: "Business Strategy",
      major: "Business Admin",
      price: "Rp 140.000",
      priceLabel: "/month",
      rating: 4.8,
      reviews: 189,
      students: 320,
      tutor: "Siti Nurhaliza",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
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
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
    {
      id: 4,
      title: "Digital Marketing",
      major: "Marketing",
      price: "Rp 145.000",
      priceLabel: "/month",
      rating: 4.9,
      reviews: 201,
      students: 380,
      tutor: "Lisa Amanda",
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
  ];

  const categories = ["All", "Computer Science", "Business Admin", "Accounting", "Marketing"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCourses = activeCategory === "All"
    ? courses
    : courses.filter(course => course.major === activeCategory);

  const topTutors = [
    {
      id: 1,
      name: "Raka Pratama",
      major: "Computer Science",
      gpa: "3.95",
      courses: 12,
      students: 450,
      rating: 4.9,
      description: "Specializing in advanced data structures and competitive programming, Raka breaks down complex algorithms into easily digestible logic flows.",
      image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      major: "Business Admin",
      gpa: "3.87",
      courses: 8,
      students: 320,
      rating: 4.8,
      description: "With a focus on real-world case studies, Siti brings corporate strategy to life. Her classes often involve interactive business simulations.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
    {
      id: 3,
      name: "Budi Santoso",
      major: "Accounting",
      gpa: "3.92",
      courses: 10,
      students: 380,
      rating: 4.9,
      description: "Budi has a talent for demystifying balance sheets and cash flow statements, ensuring his students are perfectly prepared for finals.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
  ];

  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 1 } },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const heroStats = [
    { value: "2,500+", label: "Mahasiswa Aktif" },
    { value: "150+", label: "Tutor Terverifikasi" },
    { value: "500+", label: "Materi Premium" },
  ];

  const heroImage =
    "https://www.figma.com/api/mcp/asset/d62191c8-7d46-41e8-8d68-545086956c3e";

  return (
    <div className="min-h-screen bg-[#F3F8FA] overflow-hidden selection:bg-[#308279] selection:text-white font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F3F8FA] via-white to-[#F3F8FA]">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(146, 183, 176, 0.1) 0%, rgba(0, 0, 0, 0) 0%), linear-gradient(180deg, rgba(146, 183, 176, 0.1) 0.12422%, rgba(0, 0, 0, 0) 0.12422%)",
          }}
        />
        <div className="absolute inset-y-0 right-0 w-[55%] pointer-events-none">
          <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#308279]/20 to-[#92B7B0]/20 blur-[72px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid items-center gap-14 pb-20 pt-14 lg:grid-cols-[minmax(0,584px)_minmax(0,584px)] lg:justify-between lg:min-h-[calc(100vh-80px)] lg:pt-20">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="flex flex-col items-start text-left"
            >
              <motion.span
                variants={fadeUpVariants}
                className="inline-flex items-center justify-center rounded-full bg-[#308279]/10 px-3 py-1 text-xs font-medium text-[#308279]"
              >
                Platform Belajar Peer-to-Peer BINUS
              </motion.span>

              <motion.h1
                variants={fadeUpVariants}
                className="mt-7 max-w-[10ch] text-5xl font-bold leading-[1.08] tracking-[-0.04em] text-[#0A1B45] sm:text-6xl lg:text-[4.75rem]"
              >
                Belajar Bareng,
                <br />
                <span className="text-[#0A8F89]">Sukses Bareng</span>
                <br />
                di BINUS.
              </motion.h1>

              <motion.p
                variants={fadeUpVariants}
                className="mt-8 max-w-[34rem] text-lg leading-[1.56] text-[#476074]"
              >
                Platform belajar inklusif dimana kamu bisa jadi murid atau tutor.
                Akses ribuan materi, video kelas, dan cheat notes dari
                sesama mahasiswa BINUS.
              </motion.p>

              <motion.div
                variants={fadeUpVariants}
                className="mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
              >
                <Link to="/marketplace" className="w-full sm:w-auto">
                  <Button className="h-12 w-full rounded-[10px] bg-[#308279] px-6 text-sm font-medium text-white shadow-none transition-colors duration-300 hover:bg-[#267068] sm:w-auto">
                    Cari Class
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="h-12 w-full rounded-[10px] border-2 border-[#308279] bg-[#F3F8FA] px-6 text-sm font-medium text-[#308279] shadow-none transition-colors duration-300 hover:bg-[#E8F3F1] hover:text-[#267068] sm:w-auto"
                  >
                    Daftar
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                variants={fadeUpVariants}
                className="mt-14 grid w-full max-w-[25rem] grid-cols-3 gap-6 border-t border-transparent pt-1"
              >
                {heroStats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-[2.05rem] font-bold leading-none tracking-[-0.04em] text-[#0A1B45]">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm leading-5 text-[#476074]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="relative mx-auto w-full max-w-[36.5rem]"
              initial={{ opacity: 0, scale: 0.97, x: 28 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.9, type: "spring", bounce: 0.18 }}
            >
              <div className="rounded-2xl border-8 border-white bg-transparent p-2 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
                <img
                  src={heroImage}
                  alt="Mahasiswa BINUS belajar bersama"
                  className="h-[20rem] w-full rounded-xl object-cover sm:h-[26rem] lg:h-[31.25rem]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section className="py-24 bg-white relative z-20 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.02)] border-t border-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <motion.h2 variants={fadeUpVariants} className="text-4xl md:text-5xl font-bold text-[#0A1B45] tracking-tight mb-6">
              A smarter way to study
            </motion.h2>
            <motion.p variants={fadeUpVariants} className="text-lg text-[#476074]">
              Everything you need to excel in your classes, meticulously designed into an intuitive, seamless learning ecosystem.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[280px]"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Big Feature: Interactive Live Classes */}
            <motion.div variants={fadeUpVariants} className="col-span-1 md:col-span-8 row-span-2 rounded-[2rem] bg-gradient-to-br from-[#0A1B45] via-[#1a3a6b] to-[#308279] text-white p-10 flex flex-col justify-between overflow-hidden relative group hover:shadow-2xl hover:shadow-[#0A1B45]/20 transition-all duration-700">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1510519138101-570d1dca3d66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')] bg-cover bg-center mix-blend-overlay opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>

              <div className="relative z-10 max-w-xl self-end text-right">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-white/20 ml-auto group-hover:scale-110 transition-transform duration-500">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-4xl font-bold tracking-tight mb-4 group-hover:text-[#92B7B0] transition-colors duration-500">Immersive Live Sessions</h3>
                <p className="text-white/80 leading-relaxed text-lg font-light">
                  Join HD video rooms engineered for pure academic focus. Share screens, collaborate on digital whiteboards, and engage with peers directly inside the browser. No external apps needed, just pure collaboration.
                </p>
              </div>

              <div className="relative z-10 mt-10 p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 max-w-sm">
                <div className="flex items-center gap-4">
                  <div className="bg-red-500 w-3 h-3 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold tracking-wider text-white uppercase mt-1">Live Right Now</span>
                </div>
                <div className="text-xl font-bold mt-2">Data Structures Midterm Prep</div>
                <div className="text-sm text-white/70 mt-1">45 students joined</div>
              </div>
            </motion.div>

            {/* Small Feature: AI Tracking */}
            <motion.div variants={fadeUpVariants} className="col-span-1 md:col-span-4 row-span-1 rounded-[2rem] bg-white border border-[#F3F8FA] shadow-lg shadow-[#0A1B45]/5 p-8 flex flex-col justify-between group overflow-hidden relative transition-transform hover:-translate-y-2">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[#EBF3F1] flex text-[#308279] items-center justify-center mb-6">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0A1B45] mb-2">Focus Mode AI</h3>
                <p className="text-[#476074] text-sm leading-relaxed">Advanced visual tracking ensures complete attention during live sessions, maximizing your study efficiency.</p>
              </div>
            </motion.div>

            {/* Small Feature: Analytics */}
            <motion.div variants={fadeUpVariants} className="col-span-1 md:col-span-4 row-span-1 rounded-[2rem] bg-white border border-[#F3F8FA] shadow-lg shadow-[#0A1B45]/5 p-8 flex flex-col justify-between group transition-transform hover:-translate-y-2">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#EBF3F1] flex text-[#308279] items-center justify-center mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0A1B45] mb-2">Deep Analytics</h3>
                <p className="text-[#476074] text-sm leading-relaxed">Track your comprehension rates, module progress, and estimated grade outcomes in real-time.</p>
              </div>
            </motion.div>

            {/* Wide Feature: Peer Communities */}
            <motion.div variants={fadeUpVariants} className="col-span-1 md:col-span-6 row-span-1 rounded-[2rem] bg-[#F3F8FA] text-[#0A1B45] p-8 md:p-10 border border-white shadow-lg shadow-[#0A1B45]/5 flex items-center justify-between overflow-hidden relative group">
              <div className="relative z-10 max-w-sm">
                <div className="flex -space-x-3 mb-4">
                  {[4, 5, 2, 7].map((i) => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i}`} alt="user" className="w-10 h-10 rounded-full border-2 border-[#F3F8FA] z-10" />
                  ))}
                  <div className="w-10 h-10 rounded-full bg-[#0A1B45] text-white flex items-center justify-center text-xs font-bold z-0 border-2 border-[#F3F8FA]">+99</div>
                </div>
                <h3 className="text-2xl font-bold mb-2">Live Peer Sync</h3>
                <p className="text-[#476074] leading-relaxed text-sm">Instantly connect with classmates for impromptu study groups and collaborative note-taking sessions.</p>
              </div>
            </motion.div>

            {/* Small Feature: Always Available */}
            <motion.div variants={fadeUpVariants} className="col-span-1 md:col-span-6 row-span-1 rounded-[2rem] bg-[#308279] text-white shadow-xl shadow-[#308279]/20 p-8 md:p-10 flex items-center gap-6 group overflow-hidden relative">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <Clock className="w-8 h-8 mb-4 group-hover:-rotate-90 transition-transform duration-500" />
                <h3 className="text-xl font-bold mb-2 text-white">On-Demand Library</h3>
                <p className="text-white/80 text-sm leading-relaxed">Access hundreds of premium cheat notes and recorded sessions 24/7 before your midterms.</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Popular Classes Section */}
      <section className="py-32 bg-[#F3F8FA] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUpVariants} className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0A1B45] tracking-tight mb-4">
                Popular Classes
              </h2>
              <p className="text-lg text-[#476074]">
                The most sought-after classes taught by BINUS top-performers.
              </p>
            </motion.div>
            <motion.div variants={fadeUpVariants}>
              <Link to="/marketplace">
                <Button variant="ghost" className="text-[#0A1B45] hover:text-[#308279] hover:bg-white rounded-full font-medium pr-2">
                  View All Classes
                  <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center ml-3">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Categories Tab Bar */}
          <motion.div
            className="flex items-center gap-3 overflow-x-auto pb-6 mb-8 no-scrollbar"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === category
                    ? "bg-[#0A1B45] text-white shadow-md"
                    : "bg-white text-[#476074] hover:bg-[#F3F8FA] hover:text-[#0A1B45] border border-gray-100"
                  }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            key={activeCategory} // Force re-render for animation on category change
          >
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                variants={fadeUpVariants}
                className="group flex cursor-pointer flex-col rounded-[1.5rem] border border-[#D7E5E9] bg-white p-5 shadow-[0_16px_36px_rgba(10,27,69,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(10,27,69,0.12)]"
              >
                <div className="relative mb-5 h-48 w-full overflow-hidden rounded-[1.25rem]">
                  <ImageWithFallback
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="rounded-full border-none bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0A1B45] shadow-sm backdrop-blur-sm">
                      {course.major}
                    </Badge>
                  </div>
                </div>

                <div className="px-1 flex flex-col flex-1">
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 fill-[#0A1B45] text-[#0A1B45]" />
                    <span className="font-bold text-sm text-[#0A1B45]">{course.rating}</span>
                    <span className="text-xs text-[#476074] font-medium ml-1">({course.reviews} reviews)</span>
                  </div>

                  <h3 className="mb-2 text-lg font-bold leading-snug text-[#0A1B45] transition-colors group-hover:text-[#308279]">
                    {course.title}
                  </h3>

                  <p className="text-sm font-medium text-[#476074] mb-6">
                    By <span className="font-bold text-[#0A1B45] border-b-2 border-transparent group-hover:border-[#0A1B45]">{course.tutor}</span>
                  </p>

                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                    <div>
                      <div className="font-bold text-[#0A1B45] text-lg">{course.price}</div>
                      <div className="text-[10px] font-bold text-[#92B7B0] uppercase tracking-wider">{course.priceLabel}</div>
                    </div>
                    <Link to={`/class/${course.id}`}>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A1B45] text-white transition-colors duration-300 group-hover:bg-[#308279]">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Tutors Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Abstract Background Element */}
        <motion.div
          style={{ y: y1 }}
          className="absolute -left-[20%] top-0 w-[60%] h-[120%] bg-gradient-to-r from-[#F3F8FA] to-transparent rounded-r-[100%] opacity-50 pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-20"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeUpVariants} className="text-4xl md:text-5xl font-bold text-[#0A1B45] tracking-tight mb-4">
              Featured Tutors
            </motion.h2>
            <motion.p variants={fadeUpVariants} className="text-lg text-[#476074]">
              Meet the exceptional students leading our top-rated classes. They don't just teach, they mentor, guide, and ensure you truly understand the material.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid lg:grid-cols-3 gap-8 px-4 md:px-0"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {topTutors.map((tutor) => (
              <motion.div
                key={tutor.id}
                variants={fadeUpVariants}
                className="bg-white rounded-[2rem] shadow-xl shadow-[#0A1B45]/5 border border-[#F3F8FA] group overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-[#308279]/10 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image Section */}
                <div className="relative h-64 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1B45] to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  <ImageWithFallback
                    src={tutor.image}
                    alt={tutor.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <Badge className="bg-white/90 text-[#0A1B45] hover:bg-white border-none px-3 py-1 font-semibold backdrop-blur-md">
                      <Star className="w-3 h-3 fill-[#f59e0b] text-[#f59e0b] mr-1" />
                      {tutor.rating}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-6 z-20">
                    <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">{tutor.name}</h3>
                    <p className="text-[#92B7B0] text-sm font-medium">{tutor.major}</p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-[#476074] leading-relaxed mb-8 flex-1">
                    "{tutor.description}"
                  </p>

                  <div className="grid grid-cols-2 gap-4 w-full border-t border-gray-100 pt-6">
                    <div className="flex flex-col items-center justify-center p-3 bg-[#F3F8FA] rounded-xl group-hover:bg-[#308279] group-hover:text-white transition-colors duration-300">
                      <div className="text-xl font-bold mb-1">{tutor.gpa}</div>
                      <div className="text-[10px] text-inherit uppercase tracking-wider font-semibold opacity-70">Verified GPA</div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 bg-[#F3F8FA] rounded-xl group-hover:bg-[#0A1B45] group-hover:text-white transition-colors duration-300">
                      <div className="text-xl font-bold mb-1">{tutor.students}+</div>
                      <div className="text-[10px] text-inherit uppercase tracking-wider font-semibold opacity-70">Students</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Elegant CTA Section */}
      <section className="py-24 relative overflow-hidden bg-[#0A1B45] rounded-t-[3rem] mt-10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-[-50%] left-[-10%] w-[70%] h-[150%] bg-[#308279]/20 rounded-full blur-[100px]"
            animate={{
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUpVariants} className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/20">
            <TrendingUp className="w-8 h-8 text-[#92B7B0]" />
          </motion.div>
          <motion.h2 variants={fadeUpVariants} className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            Ready to upgrade your GPA?
          </motion.h2>
          <motion.p variants={fadeUpVariants} className="text-xl text-white/70 font-light mb-12 max-w-2xl mx-auto">
            Join thousands of BINUS students who have proven that collaborative peer learning is the key to academic success.
          </motion.p>

          <motion.div variants={fadeUpVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/student-dashboard" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-14 bg-white text-[#0A1B45] hover:bg-[#F3F8FA] rounded-full px-10 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                Start Learning Now
              </Button>
            </Link>
            <div className="text-white/40 text-sm hidden sm:block px-2">or</div>
            <Link to="/tutor-dashboard" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto h-14 bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white rounded-full px-10 text-lg font-medium transition-all duration-300">
                Apply as a Tutor
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={fadeUpVariants} className="mt-12 flex items-center justify-center gap-2 text-[#92B7B0] text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>No credit card required for basic access</span>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
