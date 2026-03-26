import { Link } from "react-router";
import { 
  BookOpen, TrendingUp, Clock, Target, PlayCircle, 
  Award, Calendar, Eye, ChevronRight, Download, 
  Sparkles, ArrowRight
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { useAuth } from "../auth/AuthContext";
import { toast } from "sonner";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts";

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const firstName = user?.name.split(" ")[0] ?? "Ahmad";

  const stats = [
    { icon: BookOpen, label: "Classes Enrolled", value: "8", color: "from-[#308279] to-[#92B7B0]" },
    { icon: Target, label: "Completed", value: "3", color: "from-[#0A1B45] to-[#308279]" },
    { icon: Clock, label: "Learning Hours", value: "42h", color: "from-[#92B7B0] to-[#476074]" },
    { icon: Award, label: "Certificates", value: "3", color: "from-[#308279] to-[#0A1B45]" },
  ];

  const ongoingCourses = [
    {
      id: 1,
      title: "Data Structures & Algorithms",
      instructor: "Raka Pratama",
      progress: 45,
      nextLesson: "Two Pointer Technique",
      duration: "25:10",
      thumbnail: "from-[#308279] to-[#0A1B45]",
    },
    {
      id: 2,
      title: "Database Management & SQL",
      instructor: "Andi Wijaya",
      progress: 60,
      nextLesson: "SQL Joins & Subqueries",
      duration: "30:20",
      thumbnail: "from-[#0A1B45] to-[#476074]",
    },
    {
      id: 3,
      title: "Human Computer Interaction",
      instructor: "Denny Kusuma",
      progress: 30,
      nextLesson: "Usability Testing Methods",
      duration: "22:45",
      thumbnail: "from-[#92B7B0] to-[#308279]",
    },
  ];

  const recentPurchases = [
    {
      id: 1,
      title: "Marketing Principles Cheat Sheet",
      type: "PDF",
      price: "Rp 13.000",
      date: "2 hari lalu",
    },
    {
      id: 2,
      title: "Financial Accounting Guide",
      type: "PDF + Video",
      price: "Rp 10.000",
      date: "5 hari lalu",
    },
  ];

  const focusStats = {
    weeklyAverage: 87,
    todayScore: 92,
    totalSessions: 24,
    improvement: "+5%",
  };

  const learningProgressData = [
    { day: "Sen", hours: 3.5 },
    { day: "Sel", hours: 4.2 },
    { day: "Rab", hours: 2.8 },
    { day: "Kam", hours: 5.1 },
    { day: "Jum", hours: 3.9 },
    { day: "Sab", hours: 6.3 },
    { day: "Min", hours: 4.7 },
  ];

  return (
    <div className="bg-[#F3F8FA]">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#071735] via-[#0A1B45] to-[#308279] text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute -right-12 top-0 h-64 w-64 rounded-full bg-[#92B7B0]/20 blur-3xl" />
        <div className="absolute left-0 top-24 h-40 w-40 rounded-full bg-[#308279]/20 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="flex flex-col gap-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/85 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-[#92B7B0]" />
                Student workspace for {firstName}
              </div>
              <div className="mt-5 max-w-3xl">
                <div>
                  <h1 className="text-3xl font-bold tracking-[-0.03em] mb-2 sm:text-4xl">
                    Welcome back, {firstName}
                  </h1>
                  <p className="max-w-2xl text-white/80 text-base leading-7">
                    Fokus kamu lagi bagus minggu ini. Tinggal lanjutkan class aktif,
                    review progress, dan kejar sertifikat berikutnya.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link to="/classroom/1">
                  <Button className="rounded-xl bg-white text-[#0A1B45] hover:bg-[#F3F8FA]">
                    Continue Learning
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/marketplace">
                  <Button
                    variant="outline"
                    className="rounded-xl border-white/30 bg-white/10 text-white hover:bg-white/15 hover:text-white"
                  >
                    Explore New Classes
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/15 p-5 shadow-lg hover:-translate-y-1 transition-all">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-3xl font-bold mb-1 tracking-[-0.03em] text-white">{stat.value}</div>
                <div className="text-sm text-white/75">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Ongoing Classes */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#0A1B45]">My Classes</h2>
                  <p className="text-[#476074]">Lanjutkan pembelajaran dari terakhir kali</p>
                </div>
                <Link to="/marketplace">
                  <Button variant="outline" className="border-[#308279] text-[#308279]">
                    Browse Classes
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {ongoingCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-all group border-2 hover:border-[#308279]">
                    <div className="flex flex-col sm:flex-row">
                      {/* Thumbnail */}
                      <div className={`w-full sm:w-48 h-40 sm:h-auto bg-gradient-to-br ${course.thumbnail} flex items-center justify-center`}>
                        <PlayCircle className="w-16 h-16 text-white/80" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-[#0A1B45] mb-1 group-hover:text-[#308279] transition-colors">
                              {course.title}
                            </h3>
                            <p className="text-sm text-[#476074]">oleh {course.instructor}</p>
                          </div>
                          <Badge className="bg-[#308279]/10 text-[#308279] border-0">
                            {course.progress}%
                          </Badge>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <Progress value={course.progress} className="h-2" />
                        </div>

                        {/* Next Lesson */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-[#476074]">
                            <Clock className="w-4 h-4" />
                            <span>Next: {course.nextLesson}</span>
                            <span>•</span>
                            <span>{course.duration}</span>
                          </div>
                          <Link to={`/classroom/${course.id}`}>
                            <Button size="sm" className="bg-[#308279] hover:bg-[#308279]/90 text-white">
                              Lanjutkan
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Eye Tracking Stats */}
            <section>
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-[#308279] to-[#92B7B0] p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Eye className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Eye-Tracking Focus Analytics</h3>
                      <Badge variant="outline" className="border-white text-white mt-1">Beta Feature</Badge>
                    </div>
                  </div>
                  <p className="text-white/90 text-sm">
                    Pantau dan tingkatkan tingkat fokus kamu saat belajar dengan AI technology
                  </p>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-[#F3F8FA] rounded-lg">
                      <div className="text-3xl font-bold text-[#308279] mb-1">{focusStats.weeklyAverage}%</div>
                      <div className="text-xs text-[#476074]">Weekly Average</div>
                    </div>
                    <div className="text-center p-4 bg-[#F3F8FA] rounded-lg">
                      <div className="text-3xl font-bold text-[#0A1B45] mb-1">{focusStats.todayScore}%</div>
                      <div className="text-xs text-[#476074]">Today's Score</div>
                    </div>
                    <div className="text-center p-4 bg-[#F3F8FA] rounded-lg">
                      <div className="text-3xl font-bold text-[#0A1B45] mb-1">{focusStats.totalSessions}</div>
                      <div className="text-xs text-[#476074]">Total Sessions</div>
                    </div>
                    <div className="text-center p-4 bg-[#F3F8FA] rounded-lg">
                      <div className="text-3xl font-bold text-[#308279] mb-1">{focusStats.improvement}</div>
                      <div className="text-xs text-[#476074]">Improvement</div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-[#308279]/5 rounded-lg border border-[#308279]/20">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-[#308279] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-[#0A1B45] mb-1">Great Progress!</p>
                        <p className="text-sm text-[#476074]">
                          Focus score kamu meningkat 5% minggu ini. Terus pertahankan konsistensi belajar!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* Learning Progress Chart */}
            <section>
              <Card className="p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[#0A1B45] mb-1">Progress Belajar Mingguan</h3>
                  <p className="text-sm text-[#476074]">Jam belajar kamu dalam 7 hari terakhir</p>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={learningProgressData}>
                      <defs>
                        <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#308279" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#308279" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#92B7B0" opacity={0.3} />
                      <XAxis dataKey="day" stroke="#476074" />
                      <YAxis stroke="#476074" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #308279",
                          borderRadius: "8px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="hours"
                        stroke="#308279"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorHours)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 p-3 bg-[#F3F8FA] rounded-lg flex items-center justify-between">
                  <div className="text-sm text-[#476074]">Total minggu ini</div>
                  <div className="text-xl font-bold text-[#308279]">
                    {learningProgressData.reduce((acc, d) => acc + d.hours, 0).toFixed(1)}h
                  </div>
                </div>
              </Card>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Learning Streak */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#308279] to-[#92B7B0] flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0A1B45]">Learning Streak</h3>
                  <p className="text-2xl font-bold text-[#308279]">7 Days </p>
                </div>
              </div>
              <p className="text-sm text-[#476074] mb-4">
                Kamu sudah belajar 7 hari berturut-turut! Keep it up!
              </p>
              <div className="flex gap-2">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="flex-1 h-2 rounded-full bg-[#308279]"></div>
                ))}
              </div>
            </Card>

            {/* Recent Purchases */}
            <Card className="p-6">
              <h3 className="font-bold text-[#0A1B45] mb-4 flex items-center gap-2">
                <Download className="w-5 h-5" />
                Pembelian Terakhir
              </h3>
              <div className="space-y-3">
                {recentPurchases.map((item) => (
                  <div key={item.id} className="p-3 bg-[#F3F8FA] rounded-lg hover:bg-[#308279]/5 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#308279] to-[#0A1B45] flex items-center justify-center flex-shrink-0">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-[#0A1B45] text-sm mb-1">{item.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-[#476074]">
                          <Badge variant="outline" className="text-xs">{item.type}</Badge>
                          <span>•</span>
                          <span>{item.date}</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-[#308279] hover:bg-[#308279]/10"
                        onClick={() =>
                          toast.success(`Membuka ${item.title}`, {
                            description: "Nanti bisa dihubungkan ke file download atau preview materi.",
                          })
                        }
                      >
                        Open
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/marketplace">
                <Button variant="outline" className="w-full mt-4 border-[#308279] text-[#308279]">
                  Browse Marketplace
                </Button>
              </Link>
            </Card>

            <Card className="overflow-hidden border-[#D9E6EA]">
              <div className="bg-gradient-to-r from-[#0A1B45] to-[#308279] p-5 text-white">
                <h3 className="text-lg font-bold">Need a quick reset?</h3>
                <p className="mt-2 text-sm text-white/80">
                  Review kelas aktif atau kunjungi pusat bantuan dari sidebar kiri kapan saja.
                </p>
              </div>
              <div className="p-5">
                <Link to="/classroom/1">
                  <Button className="w-full rounded-xl bg-[#0A1B45] text-white hover:bg-[#308279]">
                    Continue current class
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
