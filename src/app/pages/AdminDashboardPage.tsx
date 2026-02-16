import { useState } from "react";
import { Link } from "react-router";
import {
  Users, FileText, DollarSign, Activity, Search, LayoutDashboard,
  GraduationCap, Video, TrendingUp, Settings, LogOut, BookOpen,
  Calendar, BarChart3, Clock, Award, Target, Zap, AlertCircle, CheckCircle2, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area
} from "recharts";

export default function AdminDashboardPage() {
  const [selectedView, setSelectedView] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const stats = [
    { icon: Users, label: "Total Users", value: "2,847", change: "+12%", trend: "up", color: "from-[#308279] to-[#92B7B0]" },
    { icon: FileText, label: "Total Courses", value: "145", change: "+8", trend: "up", color: "from-[#0A1B45] to-[#308279]" },
    { icon: DollarSign, label: "Revenue (Month)", value: "Rp 45jt", change: "+15%", trend: "up", color: "from-[#92B7B0] to-[#476074]" },
    { icon: Activity, label: "Active Sessions", value: "156", change: "+5%", trend: "up", color: "from-[#308279] to-[#0A1B45]" },
  ];

  const detailedMetrics = [
    { icon: GraduationCap, label: "Active Students", value: "2,450", change: "+8.3%", trend: "up", subtext: "Last 30 days" },
    { icon: Users, label: "Active Tutors", value: "48", change: "+2", trend: "up", subtext: "12 new this month" },
    { icon: Video, label: "Live Sessions Today", value: "23", change: "+5", trend: "up", subtext: "178 this week" },
    { icon: BookOpen, label: "Course Completion", value: "78%", change: "+3.2%", trend: "up", subtext: "557 completed" },
    { icon: Award, label: "Avg. Student Rating", value: "4.8", change: "+0.2", trend: "up", subtext: "Based on 1,234 reviews" },
    { icon: Target, label: "Retention Rate", value: "88%", change: "+2.5%", trend: "up", subtext: "Monthly subscriptions" },
    { icon: Clock, label: "Avg. Session Duration", value: "87 min", change: "-3 min", trend: "down", subtext: "Across all courses" },
    { icon: Zap, label: "Platform Uptime", value: "99.8%", change: "+0.1%", trend: "up", subtext: "Last 30 days" },
  ];

  const students = [
    {
      id: 1,
      name: "Ahmad Wijaya",
      nim: "2540120123",
      email: "ahmad.wijaya@binus.ac.id",
      major: "Computer Science",
      semester: 6,
      enrolledCourses: 5,
      completedCourses: 2,
      status: "Active",
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      nim: "2540120124",
      email: "siti.nurhaliza@binus.ac.id",
      major: "Information Systems",
      semester: 4,
      enrolledCourses: 4,
      completedCourses: 1,
      status: "Active",
    },
    {
      id: 3,
      name: "Budi Santoso",
      nim: "2540120125",
      email: "budi.santoso@binus.ac.id",
      major: "Business",
      semester: 5,
      enrolledCourses: 3,
      completedCourses: 2,
      status: "Active",
    },
    {
      id: 4,
      name: "Lisa Amanda",
      nim: "2540120126",
      email: "lisa.amanda@binus.ac.id",
      major: "Marketing",
      semester: 3,
      enrolledCourses: 6,
      completedCourses: 1,
      status: "Active",
    },
  ];

  const tutors = [
    {
      id: 1,
      name: "Raka Pratama",
      email: "raka.pratama@binus.ac.id",
      specialty: "Computer Science",
      courses: 3,
      students: 450,
      rating: 4.9,
      status: "Active",
    },
    {
      id: 2,
      name: "Andi Wijaya",
      email: "andi.wijaya@binus.ac.id",
      specialty: "Database",
      courses: 2,
      students: 320,
      rating: 4.8,
      status: "Active",
    },
    {
      id: 3,
      name: "Denny Kusuma",
      email: "denny.kusuma@binus.ac.id",
      specialty: "HCI Design",
      courses: 2,
      students: 280,
      rating: 4.9,
      status: "Active",
    },
  ];

  const courseFinancials = [
    {
      id: 1,
      courseName: "Data Structures & Algorithms",
      tutor: "Raka Pratama",
      students: 234,
      monthlyRevenue: "Rp 15.600.000",
      annualRevenue: "Rp 187.200.000",
      avgSubscription: "Rp 150.000",
    },
    {
      id: 2,
      courseName: "Database Management & SQL",
      tutor: "Andi Wijaya",
      students: 178,
      monthlyRevenue: "Rp 12.200.000",
      annualRevenue: "Rp 146.400.000",
      avgSubscription: "Rp 140.000",
    },
    {
      id: 3,
      courseName: "HCI Design Principles",
      tutor: "Denny Kusuma",
      students: 145,
      monthlyRevenue: "Rp 10.500.000",
      annualRevenue: "Rp 126.000.000",
      avgSubscription: "Rp 145.000",
    },
  ];

  const revenueData = [
    { month: "Sep", revenue: 28, students: 380, sessions: 120 },
    { month: "Oct", revenue: 32, students: 420, sessions: 135 },
    { month: "Nov", revenue: 35, students: 480, sessions: 145 },
    { month: "Dec", revenue: 38, students: 520, sessions: 152 },
    { month: "Jan", revenue: 42, students: 580, sessions: 168 },
    { month: "Feb", revenue: 45, students: 650, sessions: 178 },
  ];

  const enrollmentData = [
    { name: "Computer Science", value: 450, color: "#308279" },
    { name: "Business", value: 320, color: "#0A1B45" },
    { name: "Marketing", value: 280, color: "#92B7B0" },
    { name: "Accounting", value: 180, color: "#476074" },
    { name: "Other", value: 117, color: "#92B7B0" },
  ];

  const userGrowthData = [
    { week: "Week 1", students: 2380, tutors: 42 },
    { week: "Week 2", students: 2520, tutors: 44 },
    { week: "Week 3", students: 2680, tutors: 46 },
    { week: "Week 4", students: 2847, tutors: 48 },
  ];

  const coursePerformanceData = [
    { course: "DSA", rating: 4.9, completion: 85, students: 234 },
    { course: "Database", rating: 4.8, completion: 78, students: 178 },
    { course: "HCI", rating: 4.9, completion: 82, students: 145 },
    { course: "Marketing", rating: 4.7, completion: 75, students: 120 },
    { course: "Business", rating: 4.6, completion: 70, students: 98 },
  ];

  const sessionAttendanceData = [
    { day: "Mon", attendance: 85, sessions: 28 },
    { day: "Tue", attendance: 88, sessions: 32 },
    { day: "Wed", attendance: 82, sessions: 30 },
    { day: "Thu", attendance: 90, sessions: 35 },
    { day: "Fri", attendance: 86, sessions: 29 },
    { day: "Sat", attendance: 78, sessions: 24 },
  ];

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "students", label: "Students", icon: GraduationCap },
    { id: "tutors", label: "Tutors", icon: Users },
    { id: "financials", label: "Financials", icon: DollarSign },
  ];

  return (
    <div className="flex min-h-screen bg-[#F3F8FA]">
      {/* Left Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-[#0A1B45] to-[#308279] text-white sticky top-0 h-screen">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">Admin Panel</h1>
          <p className="text-white/80 text-sm">Tutoring Academy</p>
        </div>

        <nav className="px-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                selectedView === item.id
                  ? "bg-white/20 backdrop-blur-sm"
                  : "hover:bg-white/10"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20">
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Dashboard View - Enhanced with All Analytics */}
        {selectedView === "dashboard" && (
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#0A1B45]">Comprehensive Analytics Dashboard</h2>
              <p className="text-[#476074] mt-2">Real-time insights into platform performance and user engagement</p>
            </div>

            {/* Primary Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-all border-2 hover:border-[#308279]">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-5 h-5 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div className="text-3xl font-bold text-[#0A1B45] mb-2">{stat.value}</div>
                  <div className="text-sm text-[#476074] mb-2">{stat.label}</div>
                  <div className={`text-xs font-medium flex items-center gap-1 ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}>
                    {stat.change} this month
                  </div>
                </Card>
              ))}
            </div>

            {/* Detailed Metrics Grid */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#0A1B45] mb-4">Detailed Metrics Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {detailedMetrics.map((metric, index) => (
                  <Card key={index} className="p-4 hover:shadow-md transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#308279]/10 flex items-center justify-center">
                        <metric.icon className="w-5 h-5 text-[#308279]" />
                      </div>
                      <div className="flex-1">
                        <div className="text-2xl font-bold text-[#0A1B45]">{metric.value}</div>
                      </div>
                    </div>
                    <div className="text-sm text-[#476074] mb-1">{metric.label}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#476074]/80">{metric.subtext}</span>
                      <span className={`text-xs font-medium ${
                        metric.trend === "up" ? "text-green-600" : "text-orange-600"
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Revenue & Growth Analytics */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#0A1B45]">Revenue Growth Trend</h3>
                  <Badge className="bg-green-100 text-green-700 border-0">+15% Growth</Badge>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#308279" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#308279" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#92B7B0" opacity={0.3} />
                      <XAxis dataKey="month" stroke="#476074" />
                      <YAxis stroke="#476074" label={{ value: 'Juta Rp', angle: -90, position: 'insideLeft' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #308279",
                          borderRadius: "8px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#308279"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#0A1B45]">User Growth Tracking</h3>
                  <Badge className="bg-[#308279]/20 text-[#308279] border-0">Last 4 Weeks</Badge>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userGrowthData}>
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
                        name="Students"
                      />
                      <Line
                        type="monotone"
                        dataKey="tutors"
                        stroke="#0A1B45"
                        strokeWidth={3}
                        dot={{ fill: "#0A1B45", r: 5 }}
                        name="Tutors"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            {/* Course Performance & Engagement */}
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              <Card className="p-6">
                <h3 className="text-lg font-bold text-[#0A1B45] mb-4">Student Distribution by Major</h3>
                <div className="h-72 flex items-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={enrollmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={90}
                        dataKey="value"
                      >
                        {enrollmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {enrollmentData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-[#476074]">{item.name}</span>
                      </div>
                      <span className="font-medium text-[#0A1B45]">{item.value} students</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 lg:col-span-2">
                <h3 className="text-lg font-bold text-[#0A1B45] mb-4">Top Course Performance</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={coursePerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#92B7B0" opacity={0.3} />
                      <XAxis dataKey="course" stroke="#476074" />
                      <YAxis stroke="#476074" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #308279",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="completion" fill="#308279" radius={[8, 8, 0, 0]} name="Completion %" />
                      <Bar dataKey="students" fill="#0A1B45" radius={[8, 8, 0, 0]} name="Students" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="p-3 bg-[#F3F8FA] rounded-lg">
                    <div className="text-xs text-[#476074] mb-1">Highest Rated</div>
                    <div className="font-bold text-[#0A1B45]">DSA & HCI (4.9⭐)</div>
                  </div>
                  <div className="p-3 bg-[#F3F8FA] rounded-lg">
                    <div className="text-xs text-[#476074] mb-1">Most Enrolled</div>
                    <div className="font-bold text-[#0A1B45]">DSA (234 students)</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Session Analytics */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              <Card className="p-6">
                <h3 className="text-lg font-bold text-[#0A1B45] mb-4">Weekly Session Attendance</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sessionAttendanceData}>
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
                      <Bar dataKey="attendance" fill="#308279" radius={[8, 8, 0, 0]} name="Attendance %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold text-[#0A1B45] mb-4">Platform Health Metrics</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="font-bold text-green-900">System Status: Operational</span>
                    </div>
                    <p className="text-sm text-green-700">All services running smoothly</p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 bg-[#F3F8FA] rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[#476074]">Average Response Time</span>
                        <span className="font-bold text-[#308279]">245ms</span>
                      </div>
                      <div className="w-full bg-[#92B7B0]/30 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                      </div>
                    </div>

                    <div className="p-4 bg-[#F3F8FA] rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[#476074]">Student Engagement Rate</span>
                        <span className="font-bold text-[#308279]">84%</span>
                      </div>
                      <div className="w-full bg-[#92B7B0]/30 rounded-full h-2">
                        <div className="bg-[#308279] h-2 rounded-full" style={{ width: "84%" }}></div>
                      </div>
                    </div>

                    <div className="p-4 bg-[#F3F8FA] rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[#476074]">Course Satisfaction Score</span>
                        <span className="font-bold text-[#308279]">4.8/5.0</span>
                      </div>
                      <div className="w-full bg-[#92B7B0]/30 rounded-full h-2">
                        <div className="bg-[#308279] h-2 rounded-full" style={{ width: "96%" }}></div>
                      </div>
                    </div>

                    <div className="p-4 bg-[#F3F8FA] rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[#476074]">Monthly Retention Rate</span>
                        <span className="font-bold text-[#308279]">88%</span>
                      </div>
                      <div className="w-full bg-[#92B7B0]/30 rounded-full h-2">
                        <div className="bg-[#308279] h-2 rounded-full" style={{ width: "88%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Financial Summary */}
            <Card className="p-6 mb-8">
              <h3 className="text-lg font-bold text-[#0A1B45] mb-4">Financial Summary</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-4 bg-gradient-to-br from-[#308279] to-[#92B7B0] rounded-lg text-white">
                  <div className="text-sm mb-2 opacity-90">Monthly Revenue</div>
                  <div className="text-3xl font-bold mb-1">Rp 45jt</div>
                  <div className="text-xs opacity-80">+15% from last month</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-[#0A1B45] to-[#308279] rounded-lg text-white">
                  <div className="text-sm mb-2 opacity-90">Annual Projection</div>
                  <div className="text-3xl font-bold mb-1">Rp 540jt</div>
                  <div className="text-xs opacity-80">Based on current growth</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-[#92B7B0] to-[#476074] rounded-lg text-white">
                  <div className="text-sm mb-2 opacity-90">Active Subscriptions</div>
                  <div className="text-3xl font-bold mb-1">557</div>
                  <div className="text-xs opacity-80">Across all courses</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-[#476074] to-[#0A1B45] rounded-lg text-white">
                  <div className="text-sm mb-2 opacity-90">Avg. Revenue/Student</div>
                  <div className="text-3xl font-bold mb-1">Rp 145k</div>
                  <div className="text-xs opacity-80">Per month</div>
                </div>
              </div>
            </Card>

            {/* Recent Activity & Alerts */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold text-[#0A1B45] mb-4">Recent Platform Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-[#F3F8FA] rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#0A1B45]">12 new students enrolled today</p>
                      <p className="text-xs text-[#476074]">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#F3F8FA] rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Video className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#0A1B45]">3 live sessions completed successfully</p>
                      <p className="text-xs text-[#476074]">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#F3F8FA] rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Award className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#0A1B45]">45 certificates issued this week</p>
                      <p className="text-xs text-[#476074]">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#F3F8FA] rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#0A1B45]">Revenue increased by 15% this month</p>
                      <p className="text-xs text-[#476074]">2 days ago</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold text-[#0A1B45] mb-4">System Alerts & Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-900">All systems operational</p>
                      <p className="text-xs text-green-700">Platform running smoothly with 99.8% uptime</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-900">6 sessions scheduled for tomorrow</p>
                      <p className="text-xs text-blue-700">Prepare resources and materials</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <Target className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-purple-900">Monthly goal: 85% achieved</p>
                      <p className="text-xs text-purple-700">Target: 2,500 active students</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <Calendar className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-orange-900">Quarter review meeting in 3 days</p>
                      <p className="text-xs text-orange-700">Prepare Q1 performance reports</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Students View */}
        {selectedView === "students" && (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-[#0A1B45]">Students Management</h2>
                <p className="text-[#476074] mt-2">View and manage all students</p>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#476074]" />
                <Input
                  placeholder="Search students..."
                  className="pl-10 w-80"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {students.filter(s => 
                s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.nim.includes(searchQuery) ||
                s.email.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((student) => (
                <Card
                  key={student.id}
                  className="overflow-hidden hover:shadow-lg transition-all cursor-pointer border-2 hover:border-[#308279]"
                  onClick={() => setSelectedStudent(student)}
                >
                  <div className="bg-gradient-to-br from-[#308279] to-[#92B7B0] p-6 text-white">
                    <Avatar className="w-16 h-16 mb-4 border-4 border-white/20">
                      <AvatarFallback className="bg-white/20 text-white text-xl">
                        {student.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-lg mb-1">{student.name}</h3>
                    <p className="text-white/80 text-sm">{student.nim}</p>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#476074]">Major:</span>
                      <span className="font-medium text-[#0A1B45]">{student.major}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#476074]">Semester:</span>
                      <span className="font-medium text-[#0A1B45]">{student.semester}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#476074]">Enrolled:</span>
                      <span className="font-medium text-[#308279]">{student.enrolledCourses} courses</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#476074]">Completed:</span>
                      <span className="font-medium text-[#0A1B45]">{student.completedCourses} courses</span>
                    </div>
                    <div className="pt-2 border-t">
                      <Badge className={`${
                        student.status === "Active" 
                          ? "bg-[#308279] text-white" 
                          : "bg-[#476074] text-white"
                      } border-0`}>
                        {student.status}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Student Detail Modal would go here */}
            {selectedStudent && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedStudent(null)}>
                <Card className="w-full max-w-2xl m-4" onClick={(e) => e.stopPropagation()}>
                  <div className="bg-gradient-to-r from-[#0A1B45] to-[#308279] p-6 text-white">
                    <h3 className="text-2xl font-bold">{selectedStudent.name}</h3>
                    <p className="text-white/80">{selectedStudent.email}</p>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-[#0A1B45] mb-4">Enrolled Courses</h4>
                    <div className="space-y-3">
                      <div className="p-4 bg-[#F3F8FA] rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-[#0A1B45]">Data Structures & Algorithms</h5>
                            <p className="text-sm text-[#476074]">Progress: 45%</p>
                          </div>
                          <Badge className="bg-[#308279]/20 text-[#308279] border-0">In Progress</Badge>
                        </div>
                      </div>
                      <div className="p-4 bg-[#F3F8FA] rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-[#0A1B45]">Database Management</h5>
                            <p className="text-sm text-[#476074]">Progress: 100%</p>
                          </div>
                          <Badge className="bg-green-100 text-green-700 border-0">Completed</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                      <Button onClick={() => setSelectedStudent(null)}>Close</Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* Tutors View */}
        {selectedView === "tutors" && (
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#0A1B45]">Tutors Management</h2>
              <p className="text-[#476074] mt-2">View and manage all tutors</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutors.map((tutor) => (
                <Card key={tutor.id} className="overflow-hidden hover:shadow-lg transition-all border-2 hover:border-[#308279]">
                  <div className="bg-gradient-to-br from-[#0A1B45] to-[#476074] p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <Avatar className="w-16 h-16 border-4 border-white/20">
                        <AvatarFallback className="bg-white/20 text-white text-xl">
                          {tutor.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{tutor.rating}</div>
                        <div className="text-white/80 text-sm">Rating</div>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-1">{tutor.name}</h3>
                    <p className="text-white/80 text-sm">{tutor.specialty}</p>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#476074]">Courses:</span>
                      <span className="font-medium text-[#0A1B45]">{tutor.courses}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#476074]">Students:</span>
                      <span className="font-medium text-[#308279]">{tutor.students}</span>
                    </div>
                    <div className="pt-2 border-t">
                      <Badge className="bg-[#308279] text-white border-0">{tutor.status}</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Financials View */}
        {selectedView === "financials" && (
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#0A1B45]">Financial Reports</h2>
              <p className="text-[#476074] mt-2">Revenue and income per course</p>
            </div>

            <Card className="mb-6 p-6">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="p-4 bg-gradient-to-br from-[#308279] to-[#92B7B0] rounded-lg text-white">
                  <div className="text-sm mb-2">Monthly Revenue</div>
                  <div className="text-3xl font-bold">Rp 45jt</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-[#0A1B45] to-[#308279] rounded-lg text-white">
                  <div className="text-sm mb-2">Annual Projection</div>
                  <div className="text-3xl font-bold">Rp 540jt</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-[#92B7B0] to-[#476074] rounded-lg text-white">
                  <div className="text-sm mb-2">Active Subscriptions</div>
                  <div className="text-3xl font-bold">557</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-[#476074] to-[#0A1B45] rounded-lg text-white">
                  <div className="text-sm mb-2">Avg. Revenue/Student</div>
                  <div className="text-3xl font-bold">Rp 145k</div>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-[#308279]/10 to-[#92B7B0]/10 p-6 border-b">
                <h3 className="text-xl font-bold text-[#0A1B45]">Course Revenue Breakdown</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F3F8FA]">
                    <tr>
                      <th className="text-left p-4 text-[#0A1B45]">Course Name</th>
                      <th className="text-left p-4 text-[#0A1B45]">Tutor</th>
                      <th className="text-center p-4 text-[#0A1B45]">Students</th>
                      <th className="text-right p-4 text-[#0A1B45]">Monthly Revenue</th>
                      <th className="text-right p-4 text-[#0A1B45]">Annual Revenue</th>
                      <th className="text-right p-4 text-[#0A1B45]">Avg/Student</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseFinancials.map((course) => (
                      <tr key={course.id} className="border-t hover:bg-[#F3F8FA]/50">
                        <td className="p-4">
                          <div className="font-medium text-[#0A1B45]">{course.courseName}</div>
                        </td>
                        <td className="p-4 text-[#476074]">{course.tutor}</td>
                        <td className="p-4 text-center font-medium text-[#308279]">{course.students}</td>
                        <td className="p-4 text-right font-medium text-[#0A1B45]">{course.monthlyRevenue}</td>
                        <td className="p-4 text-right font-medium text-[#0A1B45]">{course.annualRevenue}</td>
                        <td className="p-4 text-right text-[#476074]">{course.avgSubscription}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-[#F3F8FA] font-bold">
                    <tr>
                      <td colSpan={2} className="p-4 text-[#0A1B45]">Total</td>
                      <td className="p-4 text-center text-[#308279]">557</td>
                      <td className="p-4 text-right text-[#0A1B45]">Rp 38.300.000</td>
                      <td className="p-4 text-right text-[#0A1B45]">Rp 459.600.000</td>
                      <td className="p-4 text-right text-[#0A1B45]">Rp 145.000</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
