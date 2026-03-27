import { useState } from "react";
import { Search, Filter, Star, Clock, ArrowRight } from "lucide-react";
import { motion, type Variants } from "motion/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link } from "react-router";

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", bounce: 0.28, duration: 0.9 },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const categories = ["All", "Computer Science", "Business Admin", "Accounting", "Marketing", "Design"];

  const courses = [
    {
      id: 1,
      title: "Data Structures & Algorithms",
      major: "Computer Science",
      price: "Rp 150.000",
      rating: 4.9,
      reviews: 234,
      students: 450,
      tutor: "Raka Pratama",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      featured: true,
      duration: "12 Weeks"
    },
    {
      id: 2,
      title: "Business Strategy",
      major: "Business Admin",
      price: "Rp 140.000",
      rating: 4.8,
      reviews: 189,
      students: 320,
      tutor: "Siti Nurhaliza",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      featured: false,
      duration: "8 Weeks"
    },
    {
      id: 3,
      title: "Financial Accounting",
      major: "Accounting",
      price: "Rp 135.000",
      rating: 4.7,
      reviews: 156,
      students: 280,
      tutor: "Budi Santoso",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      featured: true,
      duration: "10 Weeks"
    },
    {
      id: 4,
      title: "Digital Marketing",
      major: "Marketing",
      price: "Rp 145.000",
      rating: 4.9,
      reviews: 201,
      students: 380,
      tutor: "Lisa Amanda",
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      featured: false,
      duration: "8 Weeks"
    },
    {
      id: 5,
      title: "Machine Learning Basics",
      major: "Computer Science",
      price: "Rp 180.000",
      rating: 4.9,
      reviews: 145,
      students: 210,
      tutor: "Raka Pratama",
      image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      featured: false,
      duration: "14 Weeks"
    },
    {
      id: 6,
      title: "UI/UX Design Fundamentals",
      major: "Design",
      price: "Rp 160.000",
      rating: 4.8,
      reviews: 167,
      students: 340,
      tutor: "Andi Wijaya",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      featured: true,
      duration: "10 Weeks"
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === "All" || course.major === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tutor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F3F8FA] font-sans selection:bg-[#308279] selection:text-white">
      <Navbar />

      {/* Header Section */}
      <section className="pt-32 pb-16 bg-white relative overflow-hidden shadow-sm">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute -top-40 -right-40 w-96 h-96 bg-[#92B7B0]/20 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUpVariants} className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0A1B45] tracking-tight mb-6">
              Explore Top <span className="text-[#308279]">Classes</span>
            </h1>
            <p className="text-lg text-[#476074]">
              Find the perfect class taught by high-achieving peers to boost your GPA.
            </p>
          </motion.div>

          {/* Search and Filter Bar */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-12 bg-white rounded-2xl p-4 shadow-lg border border-gray-100 flex flex-col md:flex-row gap-4 max-w-4xl mx-auto relative z-20"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for classes, tutors, or topics..."
                className="w-full h-14 pl-12 pr-4 rounded-xl bg-[#F3F8FA] border-none focus:ring-2 focus:ring-[#308279] focus:bg-white transition-all text-[#0A1B45] font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="h-14 px-6 rounded-xl bg-[#0A1B45] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#308279] transition-colors shadow-md">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Content Section */}
      <motion.section
        className="pt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
      >

        {/* Categories */}
        <motion.div variants={fadeUpVariants} className="flex items-center gap-3 overflow-x-auto pb-6 mb-8 no-scrollbar">
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

        {/* Results Grid */}
        {filteredCourses.length > 0 ? (
          <motion.div variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                variants={fadeUpVariants}
                className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-[#D7E5E9] bg-white shadow-[0_18px_40px_rgba(10,27,69,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_54px_rgba(10,27,69,0.14)]"
              >
                {/* Image Section */}
                <div className="relative h-52 w-full overflow-hidden border-b border-[#E5EEF1]">
                  <ImageWithFallback
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {course.featured && (
                      <Badge className="rounded-full border-0 bg-[#308279] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
                        Best Seller
                      </Badge>
                    )}
                    <Badge className="rounded-full border border-white/80 bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0A1B45] shadow-sm">
                      {course.major}
                    </Badge>
                  </div>
                </div>

                {/* Meta Tags */}
                <div className="flex items-center gap-4 border-b border-gray-100 px-5 pb-3 pt-5 text-xs font-semibold text-[#476074]">
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Star className="w-4 h-4 fill-[#0A1B45] text-[#0A1B45]" />
                    <span className="font-bold text-sm text-[#0A1B45]">{course.rating}</span>
                    <span className="text-xs text-[#476074] font-medium">({course.reviews} reviews)</span>
                  </div>

                  <h3 className="mb-2 text-xl font-bold leading-snug text-[#0A1B45] transition-colors group-hover:text-[#308279]">
                    {course.title}
                  </h3>

                  <p className="text-sm font-medium text-[#476074] mb-6">
                    By <span className="font-bold text-[#0A1B45] border-b-2 border-transparent group-hover:border-[#0A1B45] transition-colors">{course.tutor}</span>
                  </p>

                  {/* Action Bar */}
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-[#92B7B0] uppercase tracking-wider mb-0.5">Subscription</div>
                      <div className="font-black text-[#0A1B45] text-xl">{course.price}<span className="text-sm font-bold text-[#476074]">/mo</span></div>
                    </div>
                    <Link to={`/class/${course.id}`}>
                      <button className="rounded-full bg-[#0A1B45] p-3 text-white shadow-sm transition-colors hover:bg-[#308279]">
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div variants={fadeUpVariants} className="bg-white rounded-2xl p-16 text-center border border-gray-100 shadow-sm max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-[#F3F8FA] rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-[#92B7B0]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0A1B45] mb-2">No classes found</h3>
            <p className="text-[#476074]">We couldn't find any classes matching your search "{searchQuery}" in the {activeCategory} category.</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
              className="mt-6 px-6 py-2 bg-[#F3F8FA] text-[#0A1B45] font-semibold rounded-full hover:bg-[#EBF3F1] transition-colors"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </motion.section>

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}
