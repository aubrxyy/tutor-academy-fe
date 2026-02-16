import { useState } from "react";
import { Link } from "react-router";
import {
  Users, Video, BookOpen, Calendar, TrendingUp, Plus,
  Edit, Eye, Download, Star, Clock, MoreVertical, Copy, HelpCircle, Trash2
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "../components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

export default function TutorDashboardPage() {
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [isCourseDialogOpen, setIsCourseDialogOpen] = useState(false);

  const stats = [
    { icon: Users, label: "Total Students", value: "450", change: "+12%", color: "from-[#308279] to-[#92B7B0]" },
    { icon: Video, label: "Live Sessions", value: "24", change: "+8", color: "from-[#0A1B45] to-[#308279]" },
    { icon: BookOpen, label: "Active Courses", value: "12", change: "+2", color: "from-[#92B7B0] to-[#476074]" },
    { icon: Calendar, label: "Upcoming Sessions", value: "6", change: "This Week", color: "from-[#308279] to-[#0A1B45]" },
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: "Data Structures Q&A Session",
      course: "Data Structures & Algorithms",
      date: "Senin, 17 Feb 2026",
      time: "14:00 - 15:30",
      students: 45,
      zoomLink: "https://zoom.us/j/123456789",
    },
    {
      id: 2,
      title: "Algorithm Workshop - Live Coding",
      course: "Data Structures & Algorithms",
      date: "Rabu, 19 Feb 2026",
      time: "16:00 - 18:00",
      students: 52,
      zoomLink: "https://zoom.us/j/987654321",
    },
    {
      id: 3,
      title: "Database Design Fundamentals",
      course: "Database Management & SQL",
      date: "Jumat, 21 Feb 2026",
      time: "13:00 - 14:30",
      students: 38,
      zoomLink: "https://zoom.us/j/456789123",
    },
  ];

  const courses = [
    {
      id: 1,
      title: "Data Structures & Algorithms",
      status: "Active",
      students: 234,
      rating: 4.9,
      liveSessions: 12,
      materials: 15,
      quizzes: 8,
    },
    {
      id: 2,
      title: "Database Management & SQL",
      status: "Active",
      students: 178,
      rating: 4.8,
      liveSessions: 10,
      materials: 12,
      quizzes: 6,
    },
    {
      id: 3,
      title: "HCI Design Principles",
      status: "Active",
      students: 145,
      rating: 4.9,
      liveSessions: 8,
      materials: 10,
      quizzes: 5,
    },
  ];

  const studentEngagementData = [
    { week: "Week 1", students: 380 },
    { week: "Week 2", students: 400 },
    { week: "Week 3", students: 420 },
    { week: "Week 4", students: 450 },
  ];

  const sessionAttendanceData = [
    { name: "Hadir", value: 85, color: "#308279" },
    { name: "Tidak Hadir", value: 15, color: "#92B7B0" },
  ];

  return (
    <div className="min-h-screen bg-[#F3F8FA]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#0A1B45] to-[#308279] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Tutor Dashboard</h1>
              <p className="text-white/80 mt-2">Kelola courses dan live sessions kamu</p>
            </div>
            <Link to="/help-faq?role=tutor">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <HelpCircle className="w-5 h-5 mr-2" />
                Bantuan
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
                <div className="text-xs text-white/60 mt-1">{stat.change}</div>
              </Card>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="sessions" className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-3 mb-8">
            <TabsTrigger value="sessions">Live Sessions</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Live Sessions Tab */}
          <TabsContent value="sessions" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#0A1B45]">Upcoming Live Sessions</h2>
                <p className="text-[#476074]">Zoom meetings yang sudah dijadwalkan</p>
              </div>
              <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#308279] hover:bg-[#308279]/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule Session
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Schedule New Live Session</DialogTitle>
                    <DialogDescription>
                      Buat sesi live baru dengan mudah dan cepat
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="session-title">Session Title</Label>
                      <Input id="session-title" placeholder="e.g., Data Structures Q&A Session" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course-select">Course</Label>
                      <select id="course-select" className="w-full p-2 border rounded-md">
                        <option>Data Structures & Algorithms</option>
                        <option>Database Management & SQL</option>
                        <option>HCI Design Principles</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="session-date">Tanggal</Label>
                        <Input id="session-date" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="session-time">Waktu</Label>
                        <Input id="session-time" type="time" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="session-duration">Durasi (menit)</Label>
                      <Input id="session-duration" type="number" placeholder="90" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zoom-link">Zoom Meeting Link</Label>
                      <Input id="zoom-link" placeholder="https://zoom.us/j/..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="session-description">Deskripsi (Opsional)</Label>
                      <Textarea
                        id="session-description"
                        placeholder="Tambahkan deskripsi atau topik yang akan dibahas..."
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button type="submit" className="bg-[#308279] hover:bg-[#308279]/90">
                        Schedule Session
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsScheduleDialogOpen(false)}
                      >
                        Batal
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {upcomingSessions.map((session) => (
                <Card key={session.id} className="overflow-hidden hover:shadow-lg transition-all border-2 hover:border-[#308279]">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#308279] to-[#0A1B45] flex items-center justify-center flex-shrink-0">
                          <Video className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#0A1B45] mb-1">{session.title}</h3>
                          <p className="text-sm text-[#476074] mb-2">{session.course}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1 text-[#476074]">
                              <Calendar className="w-4 h-4" />
                              <span>{session.date}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[#476074]">
                              <Clock className="w-4 h-4" />
                              <span>{session.time}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[#476074]">
                              <Users className="w-4 h-4" />
                              <span>{session.students} students</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Session
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Cancel Session
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="p-4 bg-[#F3F8FA] rounded-lg border border-[#308279]/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-[#476074] mb-1">Zoom Meeting Link:</p>
                          <code className="text-sm text-[#0A1B45] font-mono">{session.zoomLink}</code>
                        </div>
                        <Button size="sm" variant="outline" className="border-[#308279] text-[#308279]">
                          Copy Link
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#0A1B45]">My Courses</h2>
                <p className="text-[#476074]">Kelola courses dan materials</p>
              </div>
              <Dialog open={isCourseDialogOpen} onOpenChange={setIsCourseDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#308279] hover:bg-[#308279]/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Course
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Course</DialogTitle>
                    <DialogDescription>
                      Buat course baru dengan mudah dan cepat
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-bold text-[#0A1B45]">Basic Information</h3>
                      <div className="space-y-2">
                        <Label htmlFor="course-title">Course Title</Label>
                        <Input id="course-title" placeholder="e.g., Data Structures & Algorithms" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="course-description">Description</Label>
                        <Textarea
                          id="course-description"
                          placeholder="Deskripsikan course kamu..."
                          rows={4}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="course-category">Category</Label>
                          <select id="course-category" className="w-full p-2 border rounded-md">
                            <option>Computer Science</option>
                            <option>Business</option>
                            <option>Marketing</option>
                            <option>Accounting</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="course-level">Level</Label>
                          <select id="course-level" className="w-full p-2 border rounded-md">
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="font-bold text-[#0A1B45]">Course Content</h3>
                      <div className="p-4 bg-[#F3F8FA] rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-[#0A1B45]">Live Sessions Schedule</p>
                          <Button size="sm" variant="outline">
                            <Plus className="w-3 h-3 mr-1" />
                            Add Session
                          </Button>
                        </div>
                        <p className="text-xs text-[#476074]">
                          Schedule Zoom sessions for live interactive classes
                        </p>
                      </div>

                      <div className="p-4 bg-[#F3F8FA] rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-[#0A1B45]">Course Materials</p>
                          <Button size="sm" variant="outline">
                            <Plus className="w-3 h-3 mr-1" />
                            Upload Materials
                          </Button>
                        </div>
                        <p className="text-xs text-[#476074]">
                          Upload PDF, cheat sheets, atau materi pendukung lainnya
                        </p>
                      </div>

                      <div className="p-4 bg-[#F3F8FA] rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-[#0A1B45]">Quizzes</p>
                          <Button size="sm" variant="outline">
                            <Plus className="w-3 h-3 mr-1" />
                            Create Quiz
                          </Button>
                        </div>
                        <p className="text-xs text-[#476074]">
                          Buat quiz untuk mengetes pemahaman students
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t">
                      <Button type="submit" className="bg-[#308279] hover:bg-[#308279]/90">
                        Create Course
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsCourseDialogOpen(false)}
                      >
                        Batal
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-all border-2 hover:border-[#308279]">
                  <div className="bg-gradient-to-br from-[#0A1B45] to-[#308279] p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-white/20 text-white border-0">
                        {course.status}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <span className="text-xl font-bold">{course.rating}</span>
                        <span className="text-white/80">⭐</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{course.title}</h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <Users className="w-4 h-4" />
                      <span>{course.students} students</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 bg-[#F3F8FA] rounded">
                        <div className="text-lg font-bold text-[#308279]">{course.liveSessions}</div>
                        <div className="text-xs text-[#476074]">Sessions</div>
                      </div>
                      <div className="p-2 bg-[#F3F8FA] rounded">
                        <div className="text-lg font-bold text-[#0A1B45]">{course.materials}</div>
                        <div className="text-xs text-[#476074]">Materials</div>
                      </div>
                      <div className="p-2 bg-[#F3F8FA] rounded">
                        <div className="text-lg font-bold text-[#0A1B45]">{course.quizzes}</div>
                        <div className="text-xs text-[#476074]">Quizzes</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link to={`/course/${course.id}/edit`} className="flex-1">
                        <Button variant="outline" className="w-full border-[#308279] text-[#308279]">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </Link>
                      <Link to={`/course/${course.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#0A1B45] mb-2">Teaching Analytics</h2>
              <p className="text-[#476074]">Insights tentang performa mengajar kamu</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Student Growth Chart */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-[#0A1B45] mb-4">Student Growth</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={studentEngagementData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#92B7B0" opacity={0.3} />
                      <XAxis dataKey="week" stroke="#476074" />
                      <YAxis stroke="#476074" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #308279",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="students"
                        stroke="#308279"
                        strokeWidth={3}
                        dot={{ fill: "#308279", r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Session Attendance */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-[#0A1B45] mb-4">Session Attendance Rate</h3>
                <div className="h-64 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sessionAttendanceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {sessionAttendanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 p-4 bg-[#308279]/5 rounded-lg">
                  <p className="text-sm text-[#476074]">
                    <span className="font-bold text-[#308279]">85%</span> students rata-rata menghadiri live sessions kamu
                  </p>
                </div>
              </Card>
            </div>

            {/* Performance Summary */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-[#0A1B45] mb-4">Performance Summary</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-4 bg-[#F3F8FA] rounded-lg">
                  <div className="text-2xl font-bold text-[#308279] mb-1">4.9</div>
                  <div className="text-sm text-[#476074]">Rata-rata Rating</div>
                </div>
                <div className="p-4 bg-[#F3F8FA] rounded-lg">
                  <div className="text-2xl font-bold text-[#0A1B45] mb-1">92%</div>
                  <div className="text-sm text-[#476074]">Completion Rate</div>
                </div>
                <div className="p-4 bg-[#F3F8FA] rounded-lg">
                  <div className="text-2xl font-bold text-[#0A1B45] mb-1">85%</div>
                  <div className="text-sm text-[#476074]">Attendance Rate</div>
                </div>
                <div className="p-4 bg-[#F3F8FA] rounded-lg">
                  <div className="text-2xl font-bold text-[#308279] mb-1">234</div>
                  <div className="text-sm text-[#476074]">Total Reviews</div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}