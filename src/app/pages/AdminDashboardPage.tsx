import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { jsPDF } from "jspdf";
import {
  Users,
  FileText,
  DollarSign,
  Activity,
  Search,
  LayoutDashboard,
  GraduationCap,
  Video,
  TrendingUp,
  Settings,
  LogOut,
  BookOpen,
  Calendar,
  Clock,
  Award,
  ShieldCheck,
  Plus,
  Upload,
  PlayCircle,
  ArrowUpRight,
  ArrowDownRight,
  FolderKanban,
  Download,
  Book,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { confirmLogout } from "../components/confirmLogout";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useAuth } from "../auth/AuthContext";
import { toast } from "sonner";
import { useAdminPanelData, type BackendUser } from "../api/admin";
import type { Course, CourseLevel, CourseStatus } from "../api/courses";

type AdminView = "dashboard" | "classes" | "students" | "tutors" | "financials";
type AccountStatus = "Active" | "Inactive";
type ManagedClass = {
  id: string;
  title: string;
  level: CourseLevel;
  tutor: string;
  students: number;
  videos: number;
  sessions: number;
  docs: number;
  quizzes: number;
  status: CourseStatus;
};
type ManagedStudent = {
  id: string;
  name: string;
  nim: string;
  email: string;
  major: string;
  semester: number;
  enrolledClasses: number;
  completedClasses: number;
  status: AccountStatus;
};
type ManagedTutor = {
  id: string;
  name: string;
  email: string;
  assignedClassNames: string[];
  assignedClasses: number;
  students: number;
  rating: number;
  responsibility: string;
  status: AccountStatus;
};

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { logout, user } = useAuth();
  const { data: adminData, loading: isAdminDataLoading, error: adminDataError } = useAdminPanelData();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    const confirmed = await confirmLogout();

    if (!confirmed) return;

    await logout();
    navigate("/login");
  };

  const selectedView = (() => {
    const view = searchParams.get("view");
    return view === "dashboard" ||
      view === "classes" ||
      view === "students" ||
      view === "tutors" ||
      view === "financials"
      ? view
      : "dashboard";
  })();

  const setAdminView = (view: AdminView) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("view", view);
    setSearchParams(nextParams);
  };

  const initialClasses: ManagedClass[] = [
    {
      id: "1",
      title: "Data Structures & Algorithms",
      level: "BEGINNER",
      tutor: "Raka Pratama",
      students: 234,
      videos: 18,
      sessions: 12,
      docs: 15,
      quizzes: 4,
      status: "PUBLISHED",
    },
    {
      id: "2",
      title: "Database Management & SQL",
      level: "INTERMEDIATE",
      tutor: "Andi Wijaya",
      students: 178,
      videos: 14,
      sessions: 10,
      docs: 12,
      quizzes: 3,
      status: "PUBLISHED",
    },
    {
      id: "3",
      title: "HCI Design Principles",
      level: "ADVANCED",
      tutor: "Denny Kusuma",
      students: 145,
      videos: 11,
      sessions: 8,
      docs: 10,
      quizzes: 2,
      status: "DRAFT",
    },
  ];

  const initialStudents: ManagedStudent[] = [
    {
      id: "1",
      name: "Ahmad Wijaya",
      nim: "2540120123",
      email: "ahmad.wijaya@binus.ac.id",
      major: "Computer Science",
      semester: 6,
      enrolledClasses: 5,
      completedClasses: 2,
      status: "Active",
    },
    {
      id: "2",
      name: "Siti Nurhaliza",
      nim: "2540120124",
      email: "siti.nurhaliza@binus.ac.id",
      major: "Information Systems",
      semester: 4,
      enrolledClasses: 4,
      completedClasses: 1,
      status: "Active",
    },
    {
      id: "3",
      name: "Budi Santoso",
      nim: "2540120125",
      email: "budi.santoso@binus.ac.id",
      major: "Business",
      semester: 5,
      enrolledClasses: 3,
      completedClasses: 2,
      status: "Active",
    },
    {
      id: "4",
      name: "Lisa Amanda",
      nim: "2540120126",
      email: "lisa.amanda@binus.ac.id",
      major: "Marketing",
      semester: 3,
      enrolledClasses: 6,
      completedClasses: 1,
      status: "Active",
    },
  ];

  const initialTutors: ManagedTutor[] = [
    {
      id: "1",
      name: "Raka Pratama",
      email: "raka.pratama@binus.ac.id",
      assignedClassNames: [
        "Data Structures & Algorithms",
        "Machine Learning Basics",
        "Algorithmic Thinking Bootcamp",
      ],
      assignedClasses: 3,
      students: 450,
      rating: 4.9,
      responsibility: "Live sessions & PDF materials",
      status: "Active",
    },
    {
      id: "2",
      name: "Andi Wijaya",
      email: "andi.wijaya@binus.ac.id",
      assignedClassNames: [
        "Database Management & SQL",
        "UI/UX Design Fundamentals",
      ],
      assignedClasses: 2,
      students: 320,
      rating: 4.8,
      responsibility: "Live sessions & PDF materials",
      status: "Active",
    },
    {
      id: "3",
      name: "Denny Kusuma",
      email: "denny.kusuma@binus.ac.id",
      assignedClassNames: [
        "HCI Design Principles",
        "Design Systems Essentials",
      ],
      assignedClasses: 2,
      students: 280,
      rating: 4.9,
      responsibility: "Live sessions & PDF materials",
      status: "Active",
    },
  ];

  const classFinancials = [
    {
      id: 1,
      className: "Data Structures & Algorithms",
      tutor: "Raka Pratama",
      totalStudents: 234,
      totalBatches: 6,
      revenuePerBatch: "Rp 2.600.000",
      annualRevenue: "Rp 187.200.000",
    },
    {
      id: 2,
      className: "Database Management & SQL",
      tutor: "Andi Wijaya",
      totalStudents: 178,
      totalBatches: 4,
      revenuePerBatch: "Rp 3.050.000",
      annualRevenue: "Rp 146.400.000",
    },
    {
      id: 3,
      className: "HCI Design Principles",
      tutor: "Denny Kusuma",
      totalStudents: 145,
      totalBatches: 3,
      revenuePerBatch: "Rp 3.500.000",
      annualRevenue: "Rp 126.000.000",
    },
  ];

  const revenueData = [
    { month: "Sep", revenue: 28 },
    { month: "Oct", revenue: 32 },
    { month: "Nov", revenue: 35 },
    { month: "Dec", revenue: 38 },
    { month: "Jan", revenue: 42 },
    { month: "Feb", revenue: 45 },
  ];

  const userGrowthData = [
    { week: "Week 1", students: 2380, tutors: 42 },
    { week: "Week 2", students: 2520, tutors: 44 },
    { week: "Week 3", students: 2680, tutors: 46 },
    { week: "Week 4", students: 2847, tutors: 48 },
  ];

  const classPerformanceData = [
    { className: "DSA", completion: 85, students: 234 },
    { className: "Database", completion: 78, students: 178 },
    { className: "HCI", completion: 82, students: 145 },
  ];

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "classes", label: "Classes", icon: FolderKanban },
    { id: "students", label: "Students", icon: GraduationCap },
    { id: "tutors", label: "Tutors", icon: Users },
    { id: "financials", label: "Financials", icon: DollarSign },
  ] as const;

  const mapCourseToManagedClass = (course: Course): ManagedClass => ({
    id: course.id,
    title: course.title,
    level: course.level,
    tutor: "Unassigned",
    students: 0,
    videos: course.totalLectures,
    sessions: 0,
    docs: course.totalSections,
    quizzes: 0,
    status: course.status,
  });

  const mapUserToStudent = (backendUser: BackendUser): ManagedStudent => ({
    id: backendUser.id,
    name: backendUser.name,
    nim: backendUser.username,
    email: backendUser.email,
    major: "Tutoring Academy",
    semester: 0,
    enrolledClasses: backendUser.enrolledCourses.length,
    completedClasses: 0,
    status: "Active",
  });

  const mapUserToTutor = (backendUser: BackendUser): ManagedTutor => ({
    id: backendUser.id,
    name: backendUser.name,
    email: backendUser.email,
    assignedClassNames:
      adminData?.courses?.nodes
        .filter((course) => backendUser.teachingCourses.includes(course.id))
        .map((course) => course.title) ?? [],
    assignedClasses: backendUser.teachingCourses.length,
    students: 0,
    rating: 0,
    responsibility: "Live sessions & PDF materials",
    status: "Active",
  });

  const [classes, setClasses] = useState(initialClasses);
  const [students, setStudents] = useState(initialStudents);
  const [tutors, setTutors] = useState(initialTutors);
  const [isAddTutorOpen, setIsAddTutorOpen] = useState(false);
  const [newTutor, setNewTutor] = useState({
    name: "",
    email: "",
    assignedClassNames: [] as string[],
  });

  useEffect(() => {
    if (!adminData) return;

    const backendCourses = adminData.courses?.nodes ?? [];
    const backendUsers = adminData.users?.nodes ?? [];

    setClasses(backendCourses.map(mapCourseToManagedClass));
    setStudents(
      backendUsers
        .filter((backendUser) => backendUser.role === "USER")
        .map(mapUserToStudent),
    );
    setTutors(
      backendUsers
        .filter((backendUser) => backendUser.role === "TUTOR")
        .map(mapUserToTutor),
    );
  }, [adminData]);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.nim.includes(searchQuery) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredTutors = tutors.filter(
    (tutor) =>
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.assignedClassNames.join(" ").toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusBadgeClassName = (status: AccountStatus) =>
    status === "Active"
      ? "border-0 bg-[#308279] text-white"
      : "border-0 bg-[#FDECEC] text-[#B42318]";

  const getCourseLevelLabel = (level: CourseLevel) => {
    switch (level) {
      case "BEGINNER":
        return "Beginner";
      case "INTERMEDIATE":
        return "Intermediate";
      case "ADVANCED":
        return "Advanced";
    }
  };

  const getCourseStatusLabel = (status: CourseStatus) => {
    switch (status) {
      case "DRAFT":
        return "Draft";
      case "PUBLISHED":
        return "Published";
      case "ARCHIVED":
        return "Archived";
    }
  };

  const getClassStatusBadgeClassName = (status: CourseStatus) =>
    status === "PUBLISHED"
      ? "border-0 bg-white/20 text-white"
      : status === "DRAFT"
        ? "border-0 bg-[#FCEFC7] text-[#7A5A00]"
        : "border-0 bg-white/15 text-white/75";

  const toggleStudentStatus = (studentId: string) => {
    const targetStudent = students.find((student) => student.id === studentId);
    if (!targetStudent) return;

    const nextStatus: AccountStatus =
      targetStudent.status === "Active" ? "Inactive" : "Active";

    setStudents((current) =>
      current.map((student) =>
        student.id === studentId ? { ...student, status: nextStatus } : student,
      ),
    );

    toast.success(
      nextStatus === "Inactive"
        ? `${targetStudent.name} has been deactivated.`
        : `${targetStudent.name} has been reactivated.`,
    );
  };

  const toggleTutorStatus = (tutorId: string) => {
    const targetTutor = tutors.find((tutor) => tutor.id === tutorId);
    if (!targetTutor) return;

    const nextStatus: AccountStatus =
      targetTutor.status === "Active" ? "Inactive" : "Active";

    setTutors((current) =>
      current.map((tutor) =>
        tutor.id === tutorId ? { ...tutor, status: nextStatus } : tutor,
      ),
    );

    toast.success(
      nextStatus === "Inactive"
        ? `${targetTutor.name} has been deactivated.`
        : `${targetTutor.name} has been reactivated.`,
    );
  };

  const handleAddTutor = () => {
    if (
      !newTutor.name.trim() ||
      !newTutor.email.trim() ||
      newTutor.assignedClassNames.length === 0
    ) {
      toast.error("Please complete the tutor name, email, and assign at least one class.");
      return;
    }

    setTutors((current) => [
      ...current,
      {
        id: `local-${Date.now()}`,
        name: newTutor.name.trim(),
        email: newTutor.email.trim(),
        assignedClassNames: newTutor.assignedClassNames,
        assignedClasses: newTutor.assignedClassNames.length,
        students: 0,
        rating: 0,
        responsibility: "Live sessions & PDF materials",
        status: "Active" as AccountStatus,
      },
    ]);

    toast.success("Tutor added", {
      description: `${newTutor.name.trim()} is now available for class assignment.`,
    });
    setNewTutor({ name: "", email: "", assignedClassNames: [] });
    setIsAddTutorOpen(false);
  };

  const downloadBlob = (content: BlobPart, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadFinancialSpreadsheet = () => {
    const rows = [
      [
        "Class Name",
        "Tutor",
        "Total Students",
        "Total Batches",
        "Revenue Per Batch",
        "Annual Revenue",
      ],
      ...classFinancials.map((item) => [
        item.className,
        item.tutor,
        String(item.totalStudents),
        String(item.totalBatches),
        item.revenuePerBatch,
        item.annualRevenue,
      ]),
    ];

    const csv = rows
      .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
      .join("\n");

    downloadBlob(csv, "admin-financial-report.csv", "text/csv;charset=utf-8;");
    toast.success("Spreadsheet downloaded", {
      description: "Financial report exported as CSV.",
    });
  };

  const handleDownloadFinancialPdf = () => {
    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    let y = 48;

    pdf.setFontSize(18);
    pdf.text("Admin Financial Report", 40, y);
    y += 24;

    pdf.setFontSize(11);
    pdf.text("Monthly Revenue: Rp 45jt", 40, y);
    y += 18;
    pdf.text("Active Subscriptions: 557", 40, y);
    y += 28;

    classFinancials.forEach((item) => {
      pdf.setFontSize(12);
      pdf.text(item.className, 40, y);
      y += 16;

      pdf.setFontSize(10);
      pdf.text(`Tutor: ${item.tutor}`, 52, y);
      y += 14;
      pdf.text(`Total Students: ${item.totalStudents}`, 52, y);
      y += 14;
      pdf.text(`Total Batches: ${item.totalBatches}`, 52, y);
      y += 14;
      pdf.text(`Revenue Per Batch: ${item.revenuePerBatch}`, 52, y);
      y += 14;
      pdf.text(`Annual Revenue: ${item.annualRevenue}`, 52, y);
      y += 22;

      if (y > 760) {
        pdf.addPage();
        y = 48;
      }
    });

    pdf.save("admin-financial-report.pdf");
    toast.success("PDF downloaded", {
      description: "Financial report exported as PDF.",
    });
  };

  const stats = [
    {
      icon: GraduationCap,
      label: "Total Students",
      value: String(students.length),
      change: isAdminDataLoading ? "Syncing" : "Backend",
      trend: "up" as const,
      color: "from-[#308279] to-[#92B7B0]",
      view: "students" as const,
    },
    {
      icon: Users,
      label: "Total Tutors",
      value: String(tutors.length),
      change: isAdminDataLoading ? "Syncing" : "Backend",
      trend: "up" as const,
      color: "from-[#0A1B45] to-[#308279]",
      view: "tutors" as const,
    },
    {
      icon: FileText,
      label: "Total Classes",
      value: String(classes.length),
      change: isAdminDataLoading ? "Syncing" : "Backend",
      trend: "up" as const,
      color: "from-[#92B7B0] to-[#476074]",
      view: "classes" as const,
    },
    {
      icon: DollarSign,
      label: "Revenue (Month)",
      value: "Rp 45jt",
      change: "Static",
      trend: "up" as const,
      color: "from-[#308279] to-[#0A1B45]",
      view: "financials" as const,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F3F8FA]">
      <aside className="sticky top-0 h-screen w-72 bg-gradient-to-b from-[#081734] to-[#308279] text-white shadow-[18px_0_40px_rgba(10,27,69,0.12)]">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white shadow-md backdrop-blur-sm">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.38em] text-[#92B7B0]">
                Admin
              </div>
              <div className="text-lg font-bold tracking-[-0.02em] text-white">
                Tutoring Academy
              </div>
            </div>
          </Link>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white/75">
            <ShieldCheck className="h-3.5 w-3.5 text-[#92B7B0]" />
            secure ops
          </div>
        </div>

        <nav className="px-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setAdminView(item.id)}
              className={`mb-2 flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                selectedView === item.id ? "bg-white/20 backdrop-blur-sm" : "hover:bg-white/10"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-white/20 p-4">
          <div className="mb-4 rounded-2xl bg-white/10 p-4">
            <div className="text-sm font-semibold">{user?.name ?? "Ops Admin"}</div>
            <div className="mt-1 text-xs uppercase tracking-[0.16em] text-white/65">
              {user?.role ?? "admin"}
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-white/10"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        {selectedView === "dashboard" && (
          <div className="p-8">
            <div className="mb-8 rounded-[2rem] bg-gradient-to-r from-[#0A1B45] via-[#123061] to-[#308279] p-8 text-white shadow-[0_24px_60px_rgba(10,27,69,0.14)]">
              <div>
                <h2 className="mt-5 text-4xl font-bold tracking-[-0.04em]">
                  im craving some chinese and its not food
                </h2>
                <p className="mt-3 max-w-2xl text-white/75 leading-7">
                  Tutor sekarang fokus pada live session dan dokumen belajar. Admin memegang
                  workflow pembuatan class, struktur video, pricing, dan monitoring transaksi.
                </p>
              </div>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <button
                  key={stat.label}
                  type="button"
                  onClick={() => setAdminView(stat.view)}
                  className="text-left"
                >
                  <Card className="border-2 p-6 transition-all hover:border-[#308279] hover:shadow-lg cursor-pointer">
                    <div className="mb-4 flex items-start justify-between">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${stat.color}`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-5 w-5 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div className="mb-2 text-3xl font-bold text-[#0A1B45]">{stat.value}</div>
                    <div className="mb-2 text-sm text-[#476074]">{stat.label}</div>
                    <div className="text-xs font-medium text-green-600">{stat.change} data</div>
                  </Card>
                </button>
              ))}
            </div>

            <div className="mb-8 grid gap-6 lg:grid-cols-2">
              <Card className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#0A1B45]">Revenue Growth Trend</h3>
                  <Badge className="border-0 bg-green-100 text-green-700">+15% Growth</Badge>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#308279" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#308279" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#92B7B0" strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="month" stroke="#476074" />
                      <YAxis stroke="#476074" label={{ value: "Juta Rp", angle: -90, position: "insideLeft" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #308279",
                          borderRadius: "8px",
                        }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#308279" strokeWidth={3} fill="url(#colorRevenue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#0A1B45]">User Growth Tracking</h3>
                  <Badge className="border-0 bg-[#308279]/20 text-[#308279]">Last 4 Weeks</Badge>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userGrowthData}>
                      <CartesianGrid stroke="#92B7B0" strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="week" stroke="#476074" />
                      <YAxis stroke="#476074" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #308279",
                          borderRadius: "8px",
                        }}
                      />
                      <Line type="monotone" dataKey="students" stroke="#308279" strokeWidth={3} dot={{ fill: "#308279", r: 5 }} name="Students" />
                      <Line type="monotone" dataKey="tutors" stroke="#0A1B45" strokeWidth={3} dot={{ fill: "#0A1B45", r: 5 }} name="Tutors" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#0A1B45]">Top Class Performance</h3>
                <Badge className="border-0 bg-[#0A1B45]/10 text-[#0A1B45]">Ops overview</Badge>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={classPerformanceData}>
                    <CartesianGrid stroke="#92B7B0" strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="className" stroke="#476074" />
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
            </Card>
          </div>
        )}

        {selectedView === "classes" && (
          <div className="p-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-[#0A1B45]">Classes Management</h2>
                <p className="mt-2 text-[#476074]">Admin creates classes, assigns tutors, and uploads lesson videos</p>
              </div>
              <div className="flex gap-3">
                <Button
                  className="bg-[#308279] hover:bg-[#308279]/90"
                  onClick={() => navigate("/admin/classes/new/edit")}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Class
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {classes.map((item) => (
                <Card
                  key={item.id}
                  className="flex h-full flex-col overflow-hidden border-2 transition-all hover:border-[#308279] hover:shadow-lg"
                >
                  <div className="bg-gradient-to-br from-[#0A1B45] to-[#308279] p-6 text-white">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <Badge className={getClassStatusBadgeClassName(item.status)}>
                        {getCourseStatusLabel(item.status)}
                      </Badge>
                      <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white/75">
                        class
                      </div>
                    </div>
                    <div className="min-h-[88px]">
                      <h3 className="text-lg font-bold leading-snug">{item.title}</h3>
                      <p className="mt-3 text-sm text-white/80">Tutor: {item.tutor}</p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-[#F3F8FA] p-3">
                        <div className="text-xs uppercase tracking-[0.14em] text-[#476074]">Students</div>
                        <div className="mt-2 text-2xl font-bold text-[#0A1B45]">{item.students}</div>
                      </div>
                      <div className="rounded-xl bg-[#F3F8FA] p-3">
                        <div className="text-xs uppercase tracking-[0.14em] text-[#476074]">Quizzes</div>
                        <div className="mt-2 text-2xl font-bold text-[#308279]">{item.quizzes}</div>
                      </div>
                    </div>
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="rounded-lg bg-[#F3F8FA] p-3">
                          <div className="text-lg font-bold text-[#0A1B45]">{item.videos}</div>
                          <div className="text-xs text-[#476074]">Videos</div>
                        </div>
                        <div className="rounded-lg bg-[#F3F8FA] p-3">
                          <div className="text-lg font-bold text-[#308279]">{item.sessions}</div>
                          <div className="text-xs text-[#476074]">Sessions</div>
                        </div>
                        <div className="rounded-lg bg-[#F3F8FA] p-3">
                          <div className="text-lg font-bold text-[#0A1B45]">{item.docs}</div>
                          <div className="text-xs text-[#476074]">Docs</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                      <Link to={`/admin/classes/${item.id}/edit`} className="flex-1">
                        <Button className="w-full bg-[#0A1B45] hover:bg-[#0A1B45]/90">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Edit Class
                        </Button>
                      </Link>
                      <Link to={`/admin/classes/${item.id}/edit?tab=videos`} className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full border-[#308279] text-[#308279]"
                        >
                          Add materials
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {selectedView === "students" && (
          <div className="p-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-[#0A1B45]">Students Management</h2>
                <p className="mt-2 text-[#476074]">View and manage all students</p>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#476074]" />
                <Input
                  placeholder="Search students..."
                  className="w-80 pl-10"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredStudents.map((student) => (
                <Card key={student.id} className="overflow-hidden border-2 transition-all hover:border-[#308279] hover:shadow-lg">
                  <div className="bg-gradient-to-br from-[#308279] to-[#92B7B0] p-6 text-white">
                    <Avatar className="mb-4 h-16 w-16 border-4 border-white/20">
                      <AvatarFallback className="bg-white/20 text-xl text-white">
                        {student.name
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-bold">{student.name}</h3>
                    <p className="text-sm text-white/80">{student.nim}</p>
                  </div>
                  <div className="space-y-3 p-4">
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
                      <span className="font-medium text-[#308279]">{student.enrolledClasses} classes</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#476074]">Completed:</span>
                      <span className="font-medium text-[#0A1B45]">{student.completedClasses} classes</span>
                    </div>
                    <div className="flex items-center justify-between border-t pt-3">
                      <Badge className={getStatusBadgeClassName(student.status)}>{student.status}</Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#D8E5E9] text-[#0A1B45] hover:bg-[#F3F8FA]"
                        onClick={() => toggleStudentStatus(student.id)}
                      >
                        {student.status === "Active" ? "Deactivate" : "Reactivate"}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {selectedView === "tutors" && (
          <div className="p-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-[#0A1B45]">Tutors Management</h2>
                <p className="mt-2 text-[#476074]">Tutors deliver sessions and documents inside admin-managed classes</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  className="bg-[#0A1B45] hover:bg-[#0A1B45]/90"
                  onClick={() => setIsAddTutorOpen((current) => !current)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Tutor
                </Button>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#476074]" />
                  <Input
                    placeholder="Search tutors..."
                    className="w-80 pl-10"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />
                </div>
              </div>
            </div>

            {isAddTutorOpen ? (
              <Card className="mb-8 rounded-[1.75rem] border-[#D8E5E9] bg-white p-6 shadow-[0_16px_36px_rgba(10,27,69,0.06)]">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#0A1B45]">Add New Tutor</h3>
                    <p className="mt-1 text-sm text-[#476074]">
                      Create a tutor account entry so the admin can assign them to classes.
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-[#476074] hover:bg-[#F3F8FA] hover:text-[#0A1B45]"
                    onClick={() => setIsAddTutorOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#0A1B45]">Tutor name</label>
                    <Input
                      placeholder="e.g. Maya Prasetyo"
                      value={newTutor.name}
                      onChange={(event) =>
                        setNewTutor((current) => ({ ...current, name: event.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#0A1B45]">Email</label>
                    <Input
                      placeholder="maya.prasetyo@binus.ac.id"
                      value={newTutor.email}
                      onChange={(event) =>
                        setNewTutor((current) => ({ ...current, email: event.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#0A1B45]">Assigned classes</label>
                    <div className="rounded-2xl border border-[#D8E5E9] bg-[#F9FCFD] p-3">
                      <div className="grid gap-2">
                        {classes.map((item) => {
                          const checked = newTutor.assignedClassNames.includes(item.title);
                          return (
                            <label
                              key={item.id}
                              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-[#0A1B45] hover:bg-white"
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={(event) =>
                                  setNewTutor((current) => ({
                                    ...current,
                                    assignedClassNames: event.target.checked
                                      ? [...current.assignedClassNames, item.title]
                                      : current.assignedClassNames.filter((title) => title !== item.title),
                                  }))
                                }
                                className="h-4 w-4 rounded border-[#C7DCE0] text-[#308279] focus:ring-[#308279]"
                              />
                              <span>{item.title}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex justify-end">
                  <Button className="bg-[#308279] hover:bg-[#308279]/90" onClick={handleAddTutor}>
                    <Plus className="mr-2 h-4 w-4" />
                    Save Tutor
                  </Button>
                </div>
              </Card>
            ) : null}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTutors.map((tutor) => (
                <Card key={tutor.id} className="overflow-hidden border-2 transition-all hover:border-[#308279] hover:shadow-lg">
                  <div className="bg-gradient-to-br from-[#0A1B45] to-[#476074] p-6 text-white">
                    <div className="mb-4 flex items-center justify-between">
                      <Avatar className="h-16 w-16 border-4 border-white/20">
                        <AvatarFallback className="bg-white/20 text-xl text-white">
                          {tutor.name
                            .split(" ")
                            .map((name) => name[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{tutor.rating}</div>
                        <div className="text-sm text-white/80">Rating</div>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold">{tutor.name}</h3>
                    <p className="text-sm text-white/80">
                      {tutor.assignedClassNames.length > 0
                        ? tutor.assignedClassNames.join(", ")
                        : "No classes assigned yet"}
                    </p>
                  </div>
                  <div className="space-y-3 p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#476074]">Assigned classes:</span>
                      <span className="font-medium text-[#0A1B45]">{tutor.assignedClasses}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#476074]">Students:</span>
                      <span className="font-medium text-[#308279]">{tutor.students}</span>
                    </div>
                    <div className="rounded-lg bg-[#F3F8FA] p-3 text-sm text-[#476074]">
                      {tutor.responsibility}
                    </div>
                    <div className="flex items-center justify-between border-t pt-3">
                      <Badge className={getStatusBadgeClassName(tutor.status)}>{tutor.status}</Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#D8E5E9] text-[#0A1B45] hover:bg-[#F3F8FA]"
                        onClick={() => toggleTutorStatus(tutor.id)}
                      >
                        {tutor.status === "Active" ? "Deactivate" : "Reactivate"}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {selectedView === "financials" && (
          <div className="p-8">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-[#0A1B45]">Financial Reports</h2>
                <p className="mt-2 text-[#476074]">Revenue, subscriptions, and income per class</p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-[#308279] text-[#308279]"
                  onClick={handleDownloadFinancialSpreadsheet}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Spreadsheet
                </Button>
                <Button
                  className="bg-[#0A1B45] hover:bg-[#0A1B45]/90"
                  onClick={handleDownloadFinancialPdf}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>

            <Card className="mb-6 p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-gradient-to-br from-[#308279] to-[#92B7B0] p-4 text-white">
                  <div className="text-sm">Monthly Revenue</div>
                  <div className="mt-2 text-3xl font-bold">Rp 45jt</div>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-[#92B7B0] to-[#476074] p-4 text-white">
                  <div className="text-sm">Active Subscriptions</div>
                  <div className="mt-2 text-3xl font-bold">557</div>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="border-b bg-gradient-to-r from-[#308279]/10 to-[#92B7B0]/10 p-6">
                <h3 className="text-xl font-bold text-[#0A1B45]">Class Revenue Breakdown</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F3F8FA]">
                    <tr>
                      <th className="p-4 text-left text-[#0A1B45]">Class Name</th>
                      <th className="p-4 text-left text-[#0A1B45]">Tutor</th>
                      <th className="p-4 text-center text-[#0A1B45]">Total Students</th>
                      <th className="p-4 text-center text-[#0A1B45]">Total Batches</th>
                      <th className="p-4 text-right text-[#0A1B45]">Revenue Per Batch</th>
                      <th className="p-4 text-right text-[#0A1B45]">Annual Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classFinancials.map((item) => (
                      <tr key={item.id} className="border-t hover:bg-[#F3F8FA]/50">
                        <td className="p-4">
                          <div className="font-medium text-[#0A1B45]">{item.className}</div>
                        </td>
                        <td className="p-4 text-[#476074]">{item.tutor}</td>
                        <td className="p-4 text-center font-medium text-[#308279]">{item.totalStudents}</td>
                        <td className="p-4 text-center font-medium text-[#0A1B45]">{item.totalBatches}</td>
                        <td className="p-4 text-right font-medium text-[#0A1B45]">{item.revenuePerBatch}</td>
                        <td className="p-4 text-right font-medium text-[#0A1B45]">{item.annualRevenue}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-[#F3F8FA] font-bold">
                    <tr>
                      <td colSpan={2} className="p-4 text-[#0A1B45]">Total</td>
                      <td className="p-4 text-center text-[#308279]">557</td>
                      <td className="p-4 text-center text-[#0A1B45]">13</td>
                      <td className="p-4 text-right text-[#0A1B45]">Rp 9.150.000</td>
                      <td className="p-4 text-right text-[#0A1B45]">Rp 459.600.000</td>
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
