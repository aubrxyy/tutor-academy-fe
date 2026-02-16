import { Search, Filter, BookOpen, Star, TrendingUp, Video, Users, Clock, Award, Target, Zap } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const courses = [
    {
      id: 1,
      title: "Data Structures & Algorithms",
      category: "Computer Science",
      price: "Rp 150.000",
      priceLabel: "/month",
      rating: 4.9,
      reviews: 234,
      students: 450,
      tutor: "Raka Pratama",
      tutorGPA: "3.95",
      description: "Master the fundamentals of DSA for technical interviews and software development with hands-on practice.",
      liveSessions: 12,
      materials: 15,
      quizzes: 8,
      duration: "12 weeks",
      featured: true,
      badge: "Most Popular",
      color: "from-[#FEE2F8] to-[#FCE7F6]",
      accentColor: "from-[#E879F9] to-[#C026D3]",
      icon: "💻",
      progress: 0,
    },
    {
      id: 2,
      title: "Business Strategy & Management",
      category: "Business Administration",
      price: "Rp 140.000",
      priceLabel: "/month",
      rating: 4.8,
      reviews: 189,
      students: 320,
      tutor: "Siti Nurhaliza",
      tutorGPA: "3.87",
      description: "Complete guide to business strategy, management theories, and case studies with real-world applications.",
      liveSessions: 10,
      materials: 12,
      quizzes: 6,
      duration: "10 weeks",
      featured: true,
      badge: "Trending",
      color: "from-[#DBEAFE] to-[#BFDBFE]",
      accentColor: "from-[#60A5FA] to-[#3B82F6]",
      icon: "📊",
      progress: 0,
    },
    {
      id: 3,
      title: "Financial Accounting",
      category: "Accounting",
      price: "Rp 135.000",
      priceLabel: "/month",
      rating: 4.7,
      reviews: 156,
      students: 280,
      tutor: "Budi Santoso",
      tutorGPA: "3.92",
      description: "Comprehensive financial accounting course with journal entries, financial statements, and exam preparation.",
      liveSessions: 8,
      materials: 10,
      quizzes: 5,
      duration: "8 weeks",
      featured: false,
      badge: "New",
      color: "",
      accentColor: "",
      icon: "💰",
      progress: 0,
    },
    {
      id: 4,
      title: "Digital Marketing Mastery",
      category: "Marketing",
      price: "Rp 145.000",
      priceLabel: "/month",
      rating: 4.9,
      reviews: 201,
      students: 380,
      tutor: "Lisa Amanda",
      tutorGPA: "3.89",
      description: "Complete guide to marketing principles and digital marketing strategies with real case studies from top brands.",
      liveSessions: 10,
      materials: 14,
      quizzes: 7,
      duration: "10 weeks",
      featured: true,
      badge: "Best Rated",
      color: "from-[#FEF9C3] to-[#FEF08A]",
      accentColor: "from-[#FACC15] to-[#EAB308]",
      icon: "📱",
      progress: 0,
    },
    {
      id: 5,
      title: "Database Management & SQL",
      category: "Computer Science",
      price: "Rp 140.000",
      priceLabel: "/month",
      rating: 4.8,
      reviews: 178,
      students: 320,
      tutor: "Andi Wijaya",
      tutorGPA: "3.93",
      description: "Complete guide to database design, normalization, and SQL queries from basic to advanced level.",
      liveSessions: 10,
      materials: 12,
      quizzes: 6,
      duration: "10 weeks",
      featured: false,
      badge: "",
      color: "",
      accentColor: "",
      icon: "🗄️",
      progress: 0,
    },
    {
      id: 6,
      title: "Statistics for Business Analytics",
      category: "Business Administration",
      price: "Rp 135.000",
      priceLabel: "/month",
      rating: 4.7,
      reviews: 145,
      students: 260,
      tutor: "Maya Putri",
      tutorGPA: "3.85",
      description: "Statistics course focused on business applications with SPSS tutorials and data interpretation techniques.",
      liveSessions: 8,
      materials: 10,
      quizzes: 5,
      duration: "8 weeks",
      featured: false,
      badge: "",
      color: "",
      accentColor: "",
      icon: "📈",
      progress: 0,
    },
    {
      id: 7,
      title: "Human Computer Interaction Design",
      category: "Computer Science",
      price: "Rp 145.000",
      priceLabel: "/month",
      rating: 4.9,
      reviews: 167,
      students: 290,
      tutor: "Denny Kusuma",
      tutorGPA: "3.91",
      description: "Complete guide to HCI principles, usability testing, and UI/UX design with Figma design systems.",
      liveSessions: 9,
      materials: 11,
      quizzes: 6,
      duration: "9 weeks",
      featured: true,
      badge: "Recommended",
      color: "from-[#D1FAE5] to-[#A7F3D0]",
      accentColor: "from-[#34D399] to-[#10B981]",
      icon: "🎨",
      progress: 0,
    },
    {
      id: 8,
      title: "Corporate Finance & Investment",
      category: "Business Administration",
      price: "Rp 140.000",
      priceLabel: "/month",
      rating: 4.8,
      reviews: 134,
      students: 240,
      tutor: "Rina Wijayanti",
      tutorGPA: "3.88",
      description: "Complete corporate finance and investment analysis course with financial modeling and Excel tools.",
      liveSessions: 9,
      materials: 11,
      quizzes: 6,
      duration: "9 weeks",
      featured: false,
      badge: "",
      color: "",
      accentColor: "",
      icon: "💼",
      progress: 0,
    },
  ];

  const categories = ["all", "Computer Science", "Business Administration", "Accounting", "Marketing"];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredCourses = filteredCourses.filter(course => course.featured);
  const regularCourses = filteredCourses.filter(course => !course.featured);

  return (
    <div className="min-h-screen bg-[#F3F8FA]">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-[#0A1B45] via-[#0A1B45] to-[#308279] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#308279] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#92B7B0] rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-white mb-8">
            <Badge className="bg-white/20 text-white border-0 mb-4 backdrop-blur-sm">
              <TrendingUp className="w-3 h-3 mr-1" />
              500+ Premium Courses Available
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Your Next <span className="text-[#92B7B0]">Learning Adventure</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join thousands of BINUS students learning from top tutors with live Zoom sessions
            </p>
          </div>

          {/* Limited Time Promo Banner */}
          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <Badge className="bg-red-500 text-white border-0 mb-2 animate-pulse">
                  🔥 LIMITED TIME OFFER
                </Badge>
                <h3 className="text-2xl font-bold text-white mb-1">Up to 70% OFF</h3>
                <p className="text-white/80 text-sm">Subscribe before Feb 28th!</p>
              </div>
              <div className="flex gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
                  <div className="text-2xl font-bold text-white">03</div>
                  <div className="text-xs text-white/80">Days</div>
                </div>
                <div className="text-white text-xl self-center">:</div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
                  <div className="text-2xl font-bold text-white">14</div>
                  <div className="text-xs text-white/80">Hours</div>
                </div>
                <div className="text-white text-xl self-center">:</div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
                  <div className="text-2xl font-bold text-white">27</div>
                  <div className="text-xs text-white/80">Min</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="bg-white border-b py-6 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#476074]" />
              <Input
                placeholder="Search courses, subjects, or topics..."
                className="pl-10 h-12 border-[#92B7B0]/30 focus:border-[#308279]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-64 h-12 border-[#92B7B0]/30">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-6 text-sm text-[#476074]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#308279]"></div>
              <span className="font-medium text-[#0A1B45]">{filteredCourses.length}</span> courses found
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#308279]" />
              <span>Trending this month</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#308279]" />
              <span>Certified by BINUS tutors</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses - Big Cards */}
      {featuredCourses.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#0A1B45] mb-2">Featured Courses</h2>
              <p className="text-[#476074]">Most popular and highly-rated courses from top BINUS tutors</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {featuredCourses.map((course) => (
                <Link key={course.id} to={`/course/${course.id}`}>
                  <Card className={`relative overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer border-0 h-full bg-gradient-to-br ${course.color}`}>
                    {/* Badge */}
                    <div className="absolute top-6 left-6 z-10">
                      <Badge className="bg-white/90 text-[#0A1B45] border-0 shadow-lg">
                        {course.badge}
                      </Badge>
                    </div>

                    {/* Large Icon/Emoji */}
                    <div className="absolute top-6 right-6 text-6xl opacity-30 group-hover:opacity-40 transition-opacity">
                      {course.icon}
                    </div>

                    <div className="p-8">
                      {/* Course Info */}
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-[#0A1B45] mb-3 group-hover:text-[#308279] transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-[#476074] mb-4 line-clamp-2">
                          {course.description}
                        </p>
                        <Badge variant="outline" className="border-[#0A1B45]/20 text-[#0A1B45] bg-white/50">
                          {course.category}
                        </Badge>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg bg-white/60 backdrop-blur-sm flex items-center justify-center">
                            <Video className="w-5 h-5 text-[#0A1B45]" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-[#0A1B45]">{course.liveSessions}</div>
                            <div className="text-xs text-[#476074]">Sessions</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg bg-white/60 backdrop-blur-sm flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-[#0A1B45]" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-[#0A1B45]">{course.materials}</div>
                            <div className="text-xs text-[#476074]">Materials</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg bg-white/60 backdrop-blur-sm flex items-center justify-center">
                            <Star className="w-5 h-5 text-[#FACC15] fill-[#FACC15]" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-[#0A1B45]">{course.rating}</div>
                            <div className="text-xs text-[#476074]">{course.reviews} reviews</div>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-[#476074]">Enrollment Progress</span>
                          <span className="text-sm font-bold text-[#0A1B45]">{Math.round((course.students / 500) * 100)}%</span>
                        </div>
                        <div className="w-full bg-white/60 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full bg-gradient-to-r ${course.accentColor} transition-all duration-500`}
                            style={{ width: `${Math.round((course.students / 500) * 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-6 border-t border-[#0A1B45]/10">
                        <div>
                          <div className="text-sm text-[#476074] mb-1">Starting from</div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-[#0A1B45]">{course.price}</span>
                            <span className="text-sm text-[#476074]">{course.priceLabel}</span>
                          </div>
                        </div>
                        <Button size="lg" className="bg-[#0A1B45] hover:bg-[#0A1B45]/90 text-white shadow-lg">
                          Enroll Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Courses - Standard Grid */}
      {regularCourses.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#0A1B45] mb-2">All Courses</h2>
              <p className="text-[#476074]">Browse our complete catalog of premium courses</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularCourses.map((course) => (
                <Link key={course.id} to={`/course/${course.id}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all group cursor-pointer border-2 border-transparent hover:border-[#308279] h-full flex flex-col bg-white">
                    {/* Course Header */}
                    <div className="bg-gradient-to-br from-[#308279] to-[#0A1B45] p-6 text-white relative">
                      {course.badge && (
                        <Badge className="absolute top-4 right-4 bg-white/20 text-white border-0 backdrop-blur-sm">
                          {course.badge}
                        </Badge>
                      )}
                      <div className="text-4xl mb-3">{course.icon}</div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[#92B7B0] transition-colors">
                        {course.title}
                      </h3>
                      <Badge variant="outline" className="border-white/40 text-white/90">
                        {course.category}
                      </Badge>
                    </div>

                    {/* Course Details */}
                    <div className="p-6 flex-1 flex flex-col">
                      <p className="text-sm text-[#476074] mb-4 line-clamp-2 flex-grow">
                        {course.description}
                      </p>

                      {/* Tutor Info */}
                      <div className="flex items-center gap-2 mb-4 p-3 bg-[#F3F8FA] rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#308279] to-[#0A1B45] flex items-center justify-center text-white text-xs font-bold">
                          {course.tutor.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-[#0A1B45]">{course.tutor}</div>
                          <div className="text-xs text-[#476074]">GPA: {course.tutorGPA}</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-[#FACC15] text-[#FACC15]" />
                          <span className="text-sm font-bold text-[#0A1B45]">{course.rating}</span>
                        </div>
                      </div>

                      {/* Course Stats */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="text-center p-2 bg-[#F3F8FA] rounded-lg">
                          <Video className="w-4 h-4 text-[#308279] mx-auto mb-1" />
                          <div className="text-xs font-medium text-[#0A1B45]">{course.liveSessions}</div>
                          <div className="text-xs text-[#476074]">Sessions</div>
                        </div>
                        <div className="text-center p-2 bg-[#F3F8FA] rounded-lg">
                          <BookOpen className="w-4 h-4 text-[#0A1B45] mx-auto mb-1" />
                          <div className="text-xs font-medium text-[#0A1B45]">{course.materials}</div>
                          <div className="text-xs text-[#476074]">Materials</div>
                        </div>
                        <div className="text-center p-2 bg-[#F3F8FA] rounded-lg">
                          <Clock className="w-4 h-4 text-[#476074] mx-auto mb-1" />
                          <div className="text-xs font-medium text-[#0A1B45]">{course.duration}</div>
                        </div>
                      </div>

                      {/* Reviews & Students */}
                      <div className="flex items-center gap-3 text-xs text-[#476074] mb-4 pb-4 border-b">
                        <span>{course.reviews} reviews</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {course.students} students
                        </span>
                      </div>

                      {/* Price and CTA */}
                      <div className="flex justify-between items-center mt-auto">
                        <div>
                          <div className="text-2xl font-bold text-[#308279]">{course.price}</div>
                          <div className="text-xs text-[#476074]">{course.priceLabel}</div>
                        </div>
                        <Button size="sm" className="bg-[#308279] hover:bg-[#308279]/90 text-white">
                          View Course
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* No Results */}
      {filteredCourses.length === 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <BookOpen className="w-16 h-16 text-[#476074]/50 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#0A1B45] mb-2">No courses found</h3>
              <p className="text-[#476074] mb-6">Try adjusting your search or filter criteria</p>
              <Button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="bg-[#308279] hover:bg-[#308279]/90"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}