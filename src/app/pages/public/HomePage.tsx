import imagebinus from "@/assets/imagebinus.png";
import { ArrowRight, CheckCircle2, Clock, Eye, Star, Target, TrendingUp, Video } from "lucide-react";
import { motion, useScroll, useTransform, Variants } from "motion/react";
import { useState } from "react";
import { Link } from "react-router";
import { useCourses } from "../../api/courses";
import Footer from "../../components/layout/Footer";
import { ImageWithFallback } from "../../components/media/ImageWithFallback";
import Navbar from "../../components/navigation/Navbar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

export default function HomePage() {
  const { courses, loading, error, refetch } = useCourses();
  const categories = [
    "All",
    ...Array.from(new Set(courses.map((course) => course.major))),
  ];
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
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D8E5E9] to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
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
                Platform Belajar Peer-to-Peer
              </motion.span>

              <motion.h1
                variants={fadeUpVariants}
                className="mt-7 max-w-[10ch] text-5xl font-bold leading-[1.08] tracking-[-0.04em] text-[#0A1B45] sm:text-6xl lg:text-[4.75rem]"
              >
                Belajar Bareng,
                <br />
                <span className="text-[#0A8F89]">Sukses Bareng</span>
              </motion.h1>

              <motion.p
                variants={fadeUpVariants}
                className="mt-8 max-w-[34rem] text-lg leading-[1.56] text-[#476074]"
              >
                Platform belajar inklusif dimana kamu bisa jadi murid atau tutor.
                Akses ribuan materi, video kelas, dan cheat notes dari
                sesama mahasiswa.
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
                <Link to="/register" className="w-full sm:w-auto">
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
              <div className="rounded-3xl border border-white bg-white p-2 shadow-[0_25px_50px_-12px_rgba(10,27,69,0.22)]">
                <img
                  src={imagebinus}
                  alt="Mahasiswa belajar bersama"
                  className="h-[20rem] w-full rounded-xl object-cover sm:h-[26rem] lg:h-[31.25rem]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section className="relative z-20 rounded-t-[2rem] border-t border-white bg-white py-20 shadow-[0_-20px_40px_rgba(0,0,0,0.02)] sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <motion.h2 variants={fadeUpVariants} className="mb-6 text-4xl font-bold tracking-tight text-[#0A1B45] md:text-5xl">
              A smarter way to study
            </motion.h2>
            <motion.p variants={fadeUpVariants} className="text-lg text-[#476074]">
              Everything you need to excel in your classes, meticulously designed into an intuitive, seamless learning ecosystem.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid auto-rows-auto grid-cols-1 gap-6 md:grid-cols-12 md:auto-rows-[280px]"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Big Feature: Interactive Live Classes */}
            <motion.div variants={fadeUpVariants} className="group relative col-span-1 row-span-2 flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-[#0A1B45] via-[#1a3a6b] to-[#308279] p-6 text-white transition-all duration-700 hover:shadow-2xl hover:shadow-[#0A1B45]/20 sm:p-10 md:col-span-8">
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
            <motion.div variants={fadeUpVariants} className="group relative col-span-1 row-span-1 flex flex-col justify-between overflow-hidden rounded-3xl border border-[#D8E5E9] bg-white p-8 shadow-lg shadow-[#0A1B45]/5 transition-transform hover:-translate-y-0.5 md:col-span-4">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[#EBF3F1] flex text-[#308279] items-center justify-center mb-6">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0A1B45] mb-2">Focus Mode AI</h3>
                <p className="text-[#476074] text-sm leading-relaxed">Advanced visual tracking ensures complete attention during live sessions, maximizing your study efficiency.</p>
              </div>
            </motion.div>

            {/* Small Feature: Analytics */}
            <motion.div variants={fadeUpVariants} className="group col-span-1 row-span-1 flex flex-col justify-between rounded-3xl border border-[#D8E5E9] bg-white p-8 shadow-lg shadow-[#0A1B45]/5 transition-transform hover:-translate-y-0.5 md:col-span-4">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#EBF3F1] flex text-[#308279] items-center justify-center mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0A1B45] mb-2">Deep Analytics</h3>
                <p className="text-[#476074] text-sm leading-relaxed">Track your comprehension rates, module progress, and estimated grade outcomes in real-time.</p>
              </div>
            </motion.div>

            {/* Wide Feature: Peer Communities */}
            <motion.div variants={fadeUpVariants} className="group relative col-span-1 row-span-1 flex items-center justify-between overflow-hidden rounded-3xl border border-white bg-[#F3F8FA] p-8 text-[#0A1B45] shadow-lg shadow-[#0A1B45]/5 md:col-span-6 md:p-10">
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
            <motion.div variants={fadeUpVariants} className="group relative col-span-1 row-span-1 flex items-center gap-6 overflow-hidden rounded-3xl bg-[#308279] p-8 text-white shadow-xl shadow-[#308279]/20 md:col-span-6 md:p-10">
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
                The most sought-after classes taught by top-performers.
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

          <>
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

              {loading && courses.length === 0 ? (
                <motion.div
                  className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={staggerContainer}
                >
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className="h-[26rem] animate-pulse rounded-[1.5rem] border border-[#D7E5E9] bg-white"
                    />
                  ))}
                </motion.div>
              ) : error ? (
                <motion.div
                  className="rounded-3xl border border-[#F3B7B7] bg-white p-8 text-center shadow-sm sm:p-10"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeUpVariants}
                >
                  <h3 className="text-2xl font-bold text-[#0A1B45]">
                    Unable to load classes
                  </h3>
                  <p className="mt-3 text-[#476074]">{error.message}</p>
                  <Button className="mt-6 bg-[#0A1B45] text-white hover:bg-[#308279]" onClick={() => refetch()}>
                    Try again
                  </Button>
                </motion.div>
              ) : filteredCourses.length === 0 ? (
                <motion.div
                  className="rounded-3xl border border-[#D7E5E9] bg-white p-8 text-center shadow-sm sm:p-10"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeUpVariants}
                >
                  <h3 className="text-2xl font-bold text-[#0A1B45]">
                    No classes available
                  </h3>
                  <p className="mt-3 text-[#476074]">
                    The backend did not return published classes for this filter.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={staggerContainer}
                  key={activeCategory}
                >
                  {filteredCourses.map((course) => (
                    <motion.div
                      key={course.id}
                      variants={fadeUpVariants}
                      className="group flex cursor-pointer flex-col rounded-2xl border border-[#D7E5E9] bg-white p-5 shadow-[0_16px_36px_rgba(10,27,69,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#308279] hover:shadow-[0_22px_48px_rgba(10,27,69,0.12)]"
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
              )}
          </>
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
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#D8E5E9] bg-white shadow-xl shadow-[#0A1B45]/5 transition-all duration-500 hover:-translate-y-0.5 hover:border-[#308279] hover:shadow-2xl hover:shadow-[#308279]/10"
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
      <section className="relative mt-10 overflow-hidden rounded-t-[2rem] bg-[#0A1B45] py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#92B7B0]/50 to-transparent" />

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
            Join thousands of students who have proven that collaborative peer learning is the key to academic success.
          </motion.p>

          <motion.div variants={fadeUpVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/student-dashboard" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-14 bg-white text-[#0A1B45] hover:bg-[#F3F8FA] rounded-full px-10 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                Start Learning Now
              </Button>
            </Link>
            <div className="text-white/40 text-sm hidden sm:block px-2">or</div>
            <Link to="/register/tutor" className="w-full sm:w-auto">
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
