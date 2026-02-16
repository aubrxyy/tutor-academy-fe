import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft, Star, Users, Clock, Video, FileText, Award,
  Calendar, Play, Download, CheckCircle, MessageSquare, BookOpen,
  Target, Zap, TrendingUp, Shield, Layers, Code, Brain, Trophy
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const [selectedTab, setSelectedTab] = useState("overview");

  const course = {
    id: courseId,
    title: "Data Structures & Algorithms",
    subtitle: "Master the fundamentals of DSA for technical interviews and software development",
    tutor: {
      name: "Raka Pratama",
      title: "Computer Science • GPA 3.95",
      avatar: "RP",
      rating: 4.9,
      students: 450,
      courses: 3,
      description: "Experienced software engineer with 3+ years of experience and passionate about teaching DSA concepts.",
    },
    thumbnail: "from-[#308279] to-[#0A1B45]",
    rating: 4.9,
    totalReviews: 234,
    students: 450,
    duration: "12 weeks",
    level: "Intermediate",
    language: "Bahasa Indonesia",
    lastUpdated: "February 2026",
    pricing: {
      monthly: 150000,
      annual: 1500000,
      discount: 20,
    },
    features: [
      "24 Live Zoom Sessions",
      "15 PDF Materials & Cheat Sheets",
      "8 Practice Quizzes",
      "Lifetime Access to Materials",
      "Certificate of Completion",
      "Direct Q&A with Tutor",
      "Private Discord Community",
      "Weekly Study Groups",
    ],
    description: `Course ini dirancang khusus untuk mahasiswa BINUS yang ingin menguasai Data Structures & Algorithms dengan pendekatan praktis dan interaktif. Kamu akan belajar langsung dari tutor berpengalaman melalui live Zoom sessions, dengan materi yang disesuaikan untuk persiapan technical interview dan project development.

Setiap sesi live akan mencakup teori, praktik coding, dan diskusi interaktif. Kamu juga akan mendapatkan akses ke materials eksklusif, practice quizzes, dan sertifikat resmi setelah menyelesaikan course ini.`,
    requirements: [
      "Basic understanding of programming concepts",
      "Familiarity with at least one programming language (Python, Java, or C++)",
      "Laptop with stable internet connection",
      "Willingness to practice and solve problems regularly",
    ],
    syllabus: [
      {
        week: "Week 1-2",
        title: "Arrays & Linked Lists",
        topics: ["Array operations", "Dynamic arrays", "Singly/Doubly linked lists", "Two pointer technique"],
      },
      {
        week: "Week 3-4",
        title: "Stacks & Queues",
        topics: ["Stack implementation", "Queue variants", "Monotonic stack/queue", "Applications"],
      },
      {
        week: "Week 5-6",
        title: "Trees & Graphs",
        topics: ["Binary trees", "BST operations", "Tree traversals", "Graph representations", "DFS/BFS"],
      },
      {
        week: "Week 7-8",
        title: "Sorting & Searching",
        topics: ["Sorting algorithms", "Binary search variants", "Search optimization", "Time complexity analysis"],
      },
      {
        week: "Week 9-10",
        title: "Dynamic Programming",
        topics: ["DP fundamentals", "Memoization", "Tabulation", "Classic DP problems"],
      },
      {
        week: "Week 11-12",
        title: "Advanced Topics & Interview Prep",
        topics: ["Advanced algorithms", "System design basics", "Mock interviews", "Problem-solving strategies"],
      },
    ],
    upcomingSessions: [
      {
        id: 1,
        title: "Two Pointer Technique & Sliding Window",
        date: "Senin, 17 Feb 2026",
        time: "14:00 - 15:30",
        status: "upcoming",
        zoomLink: "https://zoom.us/j/example1",
        description: "Learn efficient array manipulation techniques using two pointers and sliding window patterns.",
        attendees: 124,
      },
      {
        id: 2,
        title: "Binary Search Deep Dive",
        date: "Rabu, 19 Feb 2026",
        time: "16:00 - 17:30",
        status: "upcoming",
        zoomLink: "https://zoom.us/j/example2",
        description: "Master binary search and its variations for solving complex search problems.",
        attendees: 118,
      },
      {
        id: 3,
        title: "Dynamic Programming Basics",
        date: "Jumat, 21 Feb 2026",
        time: "13:00 - 14:30",
        status: "upcoming",
        zoomLink: "https://zoom.us/j/example3",
        description: "Introduction to dynamic programming with memoization and tabulation approaches.",
        attendees: 132,
      },
      {
        id: 4,
        title: "Tree Traversal Techniques",
        date: "Senin, 24 Feb 2026",
        time: "14:00 - 15:30",
        status: "scheduled",
        zoomLink: "https://zoom.us/j/example4",
        description: "Explore various tree traversal methods: inorder, preorder, postorder, and level-order.",
        attendees: 98,
      },
    ],
    pastSessions: [
      {
        id: 1,
        title: "Introduction to Data Structures",
        date: "Kamis, 13 Feb 2026",
        recording: "https://example.com/recording1",
        duration: "1h 30m",
      },
      {
        id: 2,
        title: "Array Fundamentals",
        date: "Sabtu, 15 Feb 2026",
        recording: "https://example.com/recording2",
        duration: "1h 45m",
      },
    ],
    materials: [
      {
        id: 1,
        title: "Array & Linked List Fundamentals",
        type: "PDF",
        size: "2.5 MB",
        downloads: 432,
        category: "Cheat Sheet",
      },
      {
        id: 2,
        title: "Tree & Graph Algorithms",
        type: "PDF",
        size: "3.1 MB",
        downloads: 398,
        category: "Study Guide",
      },
      {
        id: 3,
        title: "Dynamic Programming Cheat Sheet",
        type: "PDF",
        size: "1.8 MB",
        downloads: 456,
        category: "Cheat Sheet",
      },
      {
        id: 4,
        title: "Big O Complexity Guide",
        type: "PDF",
        size: "1.2 MB",
        downloads: 389,
        category: "Reference",
      },
      {
        id: 5,
        title: "Interview Practice Problems",
        type: "PDF",
        size: "2.8 MB",
        downloads: 412,
        category: "Practice",
      },
    ],
    quizzes: [
      {
        id: 1,
        title: "Array & Linked List Quiz",
        questions: 15,
        duration: 30,
        difficulty: "Medium",
        status: "available",
        description: "Test your understanding of array and linked list operations.",
        bestScore: 85,
        attempts: 2,
      },
      {
        id: 2,
        title: "Tree & Graph Quiz",
        questions: 20,
        duration: 45,
        difficulty: "Hard",
        status: "available",
        description: "Challenge yourself with advanced tree and graph problems.",
        bestScore: null,
        attempts: 0,
      },
      {
        id: 3,
        title: "Sorting & Searching Quiz",
        questions: 12,
        duration: 25,
        difficulty: "Easy",
        status: "available",
        description: "Master the basics of sorting and searching algorithms.",
        bestScore: 92,
        attempts: 1,
      },
      {
        id: 4,
        title: "Dynamic Programming Quiz",
        questions: 18,
        duration: 40,
        difficulty: "Hard",
        status: "locked",
        description: "Unlock by completing previous quizzes.",
        bestScore: null,
        attempts: 0,
      },
    ],
    reviews: [
      {
        id: 1,
        student: "Ahmad Wijaya",
        studentInitials: "AW",
        rating: 5,
        date: "2 hari lalu",
        helpful: 24,
        comment: "Course terbaik yang pernah saya ikuti! Penjelasan tutor sangat jelas dan materinya sangat aplikatif. Setelah mengikuti course ini, saya berhasil lolos technical interview di startup ternama. Highly recommended!",
      },
      {
        id: 2,
        student: "Siti Nurhaliza",
        studentInitials: "SN",
        rating: 5,
        date: "5 hari lalu",
        helpful: 18,
        comment: "Live sessions nya sangat interaktif dan tutor selalu siap menjawab pertanyaan. Practice quizzes nya juga challenging dan membantu untuk memahami materi lebih dalam. Worth every penny!",
      },
      {
        id: 3,
        student: "Budi Santoso",
        studentInitials: "BS",
        rating: 4,
        date: "1 minggu lalu",
        helpful: 12,
        comment: "Materi bagus dan comprehensive, tapi pace nya agak cepat untuk pemula. Mungkin perlu lebih banyak contoh praktis. Overall still recommended untuk yang serius belajar DSA!",
      },
      {
        id: 4,
        student: "Rina Kusuma",
        studentInitials: "RK",
        rating: 5,
        date: "2 minggu lalu",
        helpful: 31,
        comment: "Tutor Raka sangat membantu dan responsive. Materials nya sangat lengkap dan Discord community nya active. Saya merasa progress belajar saya sangat cepat setelah join course ini.",
      },
      {
        id: 5,
        student: "Denny Kurniawan",
        studentInitials: "DK",
        rating: 5,
        date: "3 minggu lalu",
        helpful: 15,
        comment: "Sebagai mahasiswa CS, course ini sangat membantu untuk complement dengan kuliah. Penjelasannya lebih praktis dan applicable. Certificate nya juga bisa di-include ke CV!",
      },
    ],
    stats: {
      completionRate: 87,
      averageProgress: 65,
      jobPlacementRate: 73,
    },
  };

  const discountedMonthly = course.pricing.monthly * (1 - course.pricing.discount / 100);
  const discountedAnnual = course.pricing.annual * (1 - course.pricing.discount / 100);

  return (
    <div className="min-h-screen bg-[#F3F8FA]">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0A1B45] to-[#308279] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link to="/marketplace">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-6">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Courses
            </Button>
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left - Course Info (2 cols) */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-white/20 text-white border-0">{course.level}</Badge>
                <Badge className="bg-white/20 text-white border-0">
                  <Star className="w-3 h-3 mr-1" />
                  {course.rating} ({course.totalReviews} reviews)
                </Badge>
                <Badge className="bg-green-500/20 text-white border-0">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Bestseller
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-white/90 mb-6">{course.subtitle}</p>

              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{course.students} students enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  <span>{course.language}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>Updated {course.lastUpdated}</span>
                </div>
              </div>

              {/* Tutor Card */}
              <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16 border-4 border-white/20">
                    <AvatarFallback className="bg-[#308279] text-white text-lg">
                      {course.tutor.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-bold text-lg mb-1">{course.tutor.name}</div>
                    <div className="text-white/80 text-sm mb-2">{course.tutor.title}</div>
                    <p className="text-white/70 text-sm mb-3">{course.tutor.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-white" />
                        {course.tutor.rating} rating
                      </span>
                      <span>•</span>
                      <span>{course.tutor.students} students</span>
                      <span>•</span>
                      <span>{course.tutor.courses} courses</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20 text-center">
                  <Trophy className="w-8 h-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold mb-1">{course.stats.completionRate}%</div>
                  <div className="text-xs text-white/70">Completion Rate</div>
                </Card>
                <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20 text-center">
                  <Target className="w-8 h-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold mb-1">{course.stats.averageProgress}%</div>
                  <div className="text-xs text-white/70">Avg Progress</div>
                </Card>
                <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20 text-center">
                  <Award className="w-8 h-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold mb-1">{course.stats.jobPlacementRate}%</div>
                  <div className="text-xs text-white/70">Job Placement</div>
                </Card>
              </div>
            </div>

            {/* Right - Pricing Card (1 col, sticky) */}
            <div className="lg:col-span-1">
              <Card className="p-6 bg-white sticky top-24">
                <div className="mb-6">
                  {course.pricing.discount > 0 && (
                    <Badge className="bg-red-500 text-white border-0 mb-3 animate-pulse">
                      🔥 {course.pricing.discount}% OFF - Limited Time!
                    </Badge>
                  )}
                  <div className="space-y-3">
                    <div className="p-4 border-2 border-[#308279] rounded-lg bg-[#308279]/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-[#0A1B45] text-sm">Monthly</span>
                        <Badge className="bg-[#308279] text-white border-0 text-xs">Popular</Badge>
                      </div>
                      <div className="flex items-baseline gap-2">
                        {course.pricing.discount > 0 && (
                          <span className="text-lg text-[#476074] line-through">
                            Rp {course.pricing.monthly.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-[#308279]">
                          Rp {discountedMonthly.toLocaleString()}
                        </span>
                        <span className="text-sm text-[#476074]">/month</span>
                      </div>
                    </div>

                    <div className="p-4 border-2 border-[#92B7B0]/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-[#0A1B45] text-sm">Annual</span>
                        <Badge variant="outline" className="text-[#308279] border-[#308279] text-xs">
                          Save 17%
                        </Badge>
                      </div>
                      <div className="flex items-baseline gap-2">
                        {course.pricing.discount > 0 && (
                          <span className="text-base text-[#476074] line-through">
                            Rp {course.pricing.annual.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-[#0A1B45]">
                          Rp {discountedAnnual.toLocaleString()}
                        </span>
                        <span className="text-sm text-[#476074]">/year</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-[#308279] hover:bg-[#308279]/90 text-white mb-3 h-12 text-lg">
                  Enroll Now
                </Button>
                <Button variant="outline" className="w-full border-[#308279] text-[#308279] hover:bg-[#308279]/10 mb-4">
                  Try Free Preview
                </Button>

                <div className="space-y-2 pt-4 border-t">
                  <div className="text-sm font-medium text-[#0A1B45] mb-3">
                    This course includes:
                  </div>
                  {course.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-[#476074]">
                      <CheckCircle className="w-4 h-4 text-[#308279] flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center justify-center gap-4 text-sm text-[#476074]">
                    <Shield className="w-4 h-4" />
                    <span>30-day money-back guarantee</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full max-w-4xl grid-cols-6 mb-8 h-auto">
            <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
            <TabsTrigger value="syllabus" className="text-sm">Syllabus</TabsTrigger>
            <TabsTrigger value="sessions" className="text-sm">Sessions</TabsTrigger>
            <TabsTrigger value="materials" className="text-sm">Materials</TabsTrigger>
            <TabsTrigger value="quizzes" className="text-sm">Quizzes</TabsTrigger>
            <TabsTrigger value="reviews" className="text-sm">Reviews</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-[#0A1B45] mb-4">About This Course</h2>
              <div className="prose max-w-none">
                {course.description.split('\n\n').map((para, idx) => (
                  <p key={idx} className="text-[#476074] leading-relaxed mb-4">{para}</p>
                ))}
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold text-[#0A1B45] mb-6">What You'll Learn</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: Code, text: "Master fundamental data structures" },
                  { icon: Brain, text: "Solve complex algorithm problems" },
                  { icon: Target, text: "Prepare for technical interviews" },
                  { icon: Zap, text: "Optimize code performance" },
                  { icon: Layers, text: "Understand time & space complexity" },
                  { icon: Trophy, text: "Build real-world applications" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-[#F3F8FA] rounded-lg hover:shadow-md transition-all">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#308279] to-[#0A1B45] flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#0A1B45] font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold text-[#0A1B45] mb-6">Requirements</h3>
              <ul className="space-y-3">
                {course.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#476074]">
                    <CheckCircle className="w-5 h-5 text-[#308279] flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </TabsContent>

          {/* Syllabus Tab */}
          <TabsContent value="syllabus" className="space-y-4">
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-[#0A1B45] mb-6">Course Syllabus</h2>
              <div className="space-y-4">
                {course.syllabus.map((section, idx) => (
                  <div key={idx} className="p-6 bg-[#F3F8FA] rounded-lg hover:shadow-md transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#308279] to-[#0A1B45] flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="border-[#308279] text-[#308279]">
                            {section.week}
                          </Badge>
                          <h3 className="text-xl font-bold text-[#0A1B45]">{section.title}</h3>
                        </div>
                        <ul className="space-y-2 mt-3">
                          {section.topics.map((topic, topicIdx) => (
                            <li key={topicIdx} className="flex items-center gap-2 text-[#476074]">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#308279]"></div>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-6">
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-[#0A1B45] mb-6">Upcoming Live Sessions</h2>
              <div className="space-y-4">
                {course.upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-6 bg-[#F3F8FA] rounded-lg hover:shadow-lg transition-all border-2 border-transparent hover:border-[#308279]"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#308279] to-[#0A1B45] flex items-center justify-center flex-shrink-0">
                          <Video className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-[#0A1B45] mb-2">{session.title}</h3>
                          <p className="text-sm text-[#476074] mb-3">{session.description}</p>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-[#476074]">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {session.date}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {session.time}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {session.attendees} registered
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button className="bg-[#308279] hover:bg-[#308279]/90 text-white">
                        <Play className="w-4 h-4 mr-2" />
                        Join Session
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-3xl font-bold text-[#0A1B45] mb-6">Past Sessions</h2>
              <div className="space-y-3">
                {course.pastSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 bg-[#F3F8FA] rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Play className="w-5 h-5 text-[#308279]" />
                      <div>
                        <h3 className="font-medium text-[#0A1B45]">{session.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-[#476074] mt-1">
                          <span>{session.date}</span>
                          <span>•</span>
                          <span>{session.duration}</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-[#308279] text-[#308279]">
                      Watch Recording
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Materials Tab */}
          <TabsContent value="materials" className="space-y-4">
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-[#0A1B45] mb-6">Course Materials</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {course.materials.map((material) => (
                  <div
                    key={material.id}
                    className="p-5 bg-[#F3F8FA] rounded-lg hover:shadow-lg transition-all border-2 border-transparent hover:border-[#308279]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#92B7B0] to-[#308279] flex items-center justify-center flex-shrink-0">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <Badge variant="outline" className="mb-2 text-xs border-[#308279] text-[#308279]">
                            {material.category}
                          </Badge>
                          <h3 className="font-bold text-[#0A1B45] mb-2">{material.title}</h3>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#476074]">
                            <span>{material.type}</span>
                            <span>•</span>
                            <span>{material.size}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Download className="w-3 h-3" />
                              {material.downloads}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" className="bg-[#308279] hover:bg-[#308279]/90 text-white">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Quizzes Tab */}
          <TabsContent value="quizzes" className="space-y-4">
            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-[#0A1B45]">Practice Quizzes</h2>
                <Link to={`/student/quizzes`}>
                  <Button variant="outline" className="border-[#308279] text-[#308279]">
                    View All Quizzes
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {course.quizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="p-6 bg-[#F3F8FA] rounded-lg hover:shadow-lg transition-all border-2 border-transparent hover:border-[#308279]"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-[#0A1B45]">{quiz.title}</h3>
                          <Badge
                            variant="outline"
                            className={
                              quiz.difficulty === "Hard"
                                ? "border-red-500 text-red-500"
                                : quiz.difficulty === "Medium"
                                ? "border-[#308279] text-[#308279]"
                                : "border-green-500 text-green-500"
                            }
                          >
                            {quiz.difficulty}
                          </Badge>
                          {quiz.bestScore && (
                            <Badge className="bg-[#308279]/10 text-[#308279] border-0">
                              Best: {quiz.bestScore}%
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-[#476074] mb-3">{quiz.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-[#476074]">
                          <span>{quiz.questions} questions</span>
                          <span>•</span>
                          <span>{quiz.duration} minutes</span>
                          {quiz.attempts > 0 && (
                            <>
                              <span>•</span>
                              <span>{quiz.attempts} attempt{quiz.attempts > 1 ? 's' : ''}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <Link to={`/course/${courseId}/quiz/${quiz.id}`}>
                        <Button
                          disabled={quiz.status === "locked"}
                          className="bg-[#308279] hover:bg-[#308279]/90 disabled:opacity-50"
                        >
                          {quiz.status === "locked" ? "🔒 Locked" : quiz.bestScore ? "Retake Quiz" : "Start Quiz"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <Card className="p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-[#0A1B45] mb-3">Student Reviews</h2>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-[#308279] text-[#308279]" />
                      ))}
                    </div>
                    <span className="text-3xl font-bold text-[#0A1B45]">{course.rating}</span>
                    <span className="text-[#476074]">({course.totalReviews} reviews)</span>
                  </div>
                </div>
                <Link to={`/course/${courseId}/review`}>
                  <Button className="bg-[#308279] hover:bg-[#308279]/90 h-12">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Write a Review
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {course.reviews.map((review) => (
                  <div key={review.id} className="p-6 bg-[#F3F8FA] rounded-lg hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-gradient-to-br from-[#308279] to-[#0A1B45] text-white">
                            {review.studentInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold text-[#0A1B45]">{review.student}</div>
                          <div className="text-sm text-[#476074]">{review.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#308279] text-[#308279]" />
                        ))}
                      </div>
                    </div>
                    <p className="text-[#476074] leading-relaxed mb-4">{review.comment}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <button className="flex items-center gap-1 text-[#476074] hover:text-[#308279] transition-colors">
                        <CheckCircle className="w-4 h-4" />
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline" className="border-[#308279] text-[#308279]">
                  Load More Reviews
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
