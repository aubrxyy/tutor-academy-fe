import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  Users,
  Video,
  BookOpen,
  Calendar,
  Plus,
  Edit,
  Clock,
  HelpCircle,
  Trash2,
  ArrowRight,
  Sparkles,
  FileText,
  Upload,
  BarChart3,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import DashboardSidebar from "../components/DashboardSidebar";
import { useAuth } from "../auth/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { toast } from "sonner";

export default function TutorDashboardPage() {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState<"overview" | "sessions" | "materials" | "analytics">("overview");
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [isMaterialDialogOpen, setIsMaterialDialogOpen] = useState(false);
  const firstName = user?.name.split(" ")[0] ?? "Raka";

  const stats = [
    {
      icon: Users,
      label: "Students Supported",
      value: "450",
      change: "+12%",
      color: "from-[#308279] to-[#92B7B0]",
    },
    {
      icon: Video,
      label: "Live Sessions",
      value: "24",
      change: "+8",
      color: "from-[#0A1B45] to-[#308279]",
    },
    {
      icon: FileText,
      label: "PDF Materials",
      value: "18",
      change: "+4",
      color: "from-[#92B7B0] to-[#476074]",
    },
    {
      icon: BookOpen,
      label: "Assigned Classes",
      value: "3",
      change: "Admin managed",
      color: "from-[#308279] to-[#0A1B45]",
    },
  ];

  const upcomingSessions = [
    {
      id: 1,
      classId: 1,
      title: "Data Structures Q&A Session",
      className: "Data Structures & Algorithms",
      date: "Senin, 17 Feb 2026",
      time: "14:00 - 15:30",
      students: 45,
      zoomLink: "https://zoom.us/j/123456789",
    },
    {
      id: 2,
      classId: 1,
      title: "Algorithm Workshop - Live Coding",
      className: "Data Structures & Algorithms",
      date: "Rabu, 19 Feb 2026",
      time: "16:00 - 18:00",
      students: 52,
      zoomLink: "https://zoom.us/j/987654321",
    },
    {
      id: 3,
      classId: 2,
      title: "Database Design Fundamentals",
      className: "Database Management & SQL",
      date: "Jumat, 21 Feb 2026",
      time: "13:00 - 14:30",
      students: 38,
      zoomLink: "https://zoom.us/j/456789123",
    },
  ];

  const classMaterials = [
    {
      id: 1,
      classId: 1,
      title: "Array & Linked List Cheat Notes",
      className: "Data Structures & Algorithms",
      format: "PDF",
      size: "2.5 MB",
      downloads: 324,
      lastUpdated: "2 jam lalu",
      status: "Published",
    },
    {
      id: 2,
      classId: 1,
      title: "Mock Interview Worksheet",
      className: "Data Structures & Algorithms",
      format: "DOCX",
      size: "1.1 MB",
      downloads: 196,
      lastUpdated: "Kemarin",
      status: "Published",
    },
    {
      id: 3,
      classId: 2,
      title: "SQL Query Patterns",
      className: "Database Management & SQL",
      format: "PDF",
      size: "3.2 MB",
      downloads: 241,
      lastUpdated: "3 hari lalu",
      status: "Needs review",
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

  const assignedClasses = [
    {
      id: 1,
      title: "Data Structures & Algorithms",
      students: 234,
      nextLive: "Senin, 17 Feb • 14:00",
      tutorDocs: 7,
      adminVideos: 18,
    },
    {
      id: 2,
      title: "Database Management & SQL",
      students: 178,
      nextLive: "Jumat, 21 Feb • 13:00",
      tutorDocs: 6,
      adminVideos: 14,
    },
    {
      id: 3,
      title: "HCI Design Principles",
      students: 145,
      nextLive: "Belum ada jadwal baru",
      tutorDocs: 5,
      adminVideos: 11,
    },
  ];

  const tutorNavItems = [
    { label: "Overview", icon: BookOpen, active: activeView === "overview", onClick: () => setActiveView("overview") },
    { label: "Live Sessions", icon: Video, active: activeView === "sessions", onClick: () => setActiveView("sessions") },
    { label: "Materials", icon: FileText, active: activeView === "materials", onClick: () => setActiveView("materials") },
    { label: "Analytics", icon: BarChart3, active: activeView === "analytics", onClick: () => setActiveView("analytics") },
    { label: "Help Center", to: "/help-faq?role=tutor", icon: HelpCircle, exact: true },
  ];

  const handleCopyLink = async (zoomLink: string) => {
    try {
      await navigator.clipboard.writeText(zoomLink);
      toast.success("Zoom link copied", {
        description: "Meeting link berhasil disalin ke clipboard.",
      });
    } catch {
      toast.error("Copy failed", {
        description: "Clipboard belum tersedia di browser ini.",
      });
    }
  };

  const handleScheduleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsScheduleDialogOpen(false);
    toast.success("Session scheduled", {
      description: "Jadwal Zoom baru sudah ditambahkan ke class yang dipilih.",
    });
  };

  const handleMaterialSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsMaterialDialogOpen(false);
    toast.success("Material uploaded", {
      description: "Dokumen tutor berhasil ditambahkan dan menunggu sinkronisasi storage.",
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeView]);

  const sectionCopy = {
    overview: {
      badge: `Tutor overview for ${firstName}`,
      title: "Tutor Dashboard",
      description:
        "Lihat ringkasan class yang kamu pegang sebelum masuk ke alur live session, dokumen materi, dan analytics.",
    },
    sessions: {
      badge: `Live sessions by ${firstName}`,
      title: "Live Sessions",
      description:
        "Kelola jadwal Zoom untuk semua class yang sudah diassign admin tanpa distraksi dari overview dashboard.",
    },
    materials: {
      badge: `Materials by ${firstName}`,
      title: "Class Materials",
      description:
        "Fokus pada dokumen tutor, revisi PDF, dan file pendukung yang dibutuhkan students di tiap class.",
    },
    analytics: {
      badge: `Analytics for ${firstName}`,
      title: "Teaching Analytics",
      description:
        "Pantau engagement, attendance, dan performa pengajaran dalam satu halaman yang lebih fokus.",
    },
  } as const;

  return (
    <div className="min-h-screen bg-[#F3F8FA] lg:flex">
      <DashboardSidebar roleLabel="Tutor" navItems={tutorNavItems} />

      <main className="min-w-0 flex-1">
      <header className="relative overflow-hidden bg-gradient-to-br from-[#071735] via-[#0A1B45] to-[#308279] text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#92B7B0]/15 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col gap-8 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/85 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-[#92B7B0]" />
                {sectionCopy[activeView].badge}
              </div>
              <div className="mt-5 max-w-3xl">
                <div>
                  <h1 className="text-4xl font-bold tracking-[-0.03em]">{sectionCopy[activeView].title}</h1>
                  <p className="text-white/80 mt-3 max-w-2xl leading-7">
                    {sectionCopy[activeView].description}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {activeView !== "analytics" ? (
                  <Button
                    className="bg-white text-[#0A1B45] hover:bg-[#F3F8FA]"
                    onClick={() => setIsScheduleDialogOpen(true)}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Session
                  </Button>
                ) : null}
                {activeView !== "sessions" ? (
                  <Button
                    variant="outline"
                    className="border-white/30 bg-white/10 text-white hover:bg-white/15 hover:text-white"
                    onClick={() => setIsMaterialDialogOpen(true)}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Material
                  </Button>
                ) : null}
              </div>
            </div>
          </div>

          <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/75 inline-flex">
            Last sync: 2 minutes ago
          </div>

          {activeView === "overview" ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mt-6">
              {stats.map((stat) => (
                <Card
                  key={stat.label}
                  className="border-white/15 bg-white/10 p-5 shadow-lg backdrop-blur-md transition-all hover:-translate-y-1"
                >
                  <div
                    className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}
                  >
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="mb-1 text-3xl font-bold tracking-[-0.03em] text-white">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                  <div className="mt-1 text-xs text-white/60">{stat.change}</div>
                </Card>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {activeView === "overview" ? (
          <section className="mb-8">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-[#0A1B45]">Assigned Class Portfolio</h2>
                <p className="text-[#476074]">Semua class yang sedang kamu handle tampil di satu overview.</p>
              </div>
              <Badge className="border-0 bg-[#308279]/10 px-3 py-1.5 text-[#308279]">
                {assignedClasses.length} active classes
              </Badge>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {assignedClasses.map((item) => (
                <Card
                  key={item.id}
                  className="border-[#D9E6EA] bg-white p-6 shadow-[0_18px_40px_rgba(10,27,69,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(10,27,69,0.12)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium text-[#308279]">Class #{item.id}</div>
                      <h3 className="mt-2 text-xl font-bold text-[#0A1B45]">{item.title}</h3>
                    </div>
                    <Link to={`/class/${item.id}`}>
                      <Button variant="ghost" size="sm" className="text-[#308279] hover:bg-[#308279]/10">
                        Open
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-[#F3F8FA] p-4">
                      <div className="text-xs uppercase tracking-[0.16em] text-[#476074]">Students</div>
                      <div className="mt-2 text-2xl font-bold text-[#0A1B45]">{item.students}</div>
                    </div>
                    <div className="rounded-2xl bg-[#F3F8FA] p-4">
                      <div className="text-xs uppercase tracking-[0.16em] text-[#476074]">Tutor Docs</div>
                      <div className="mt-2 text-2xl font-bold text-[#0A1B45]">{item.tutorDocs}</div>
                    </div>
                    <div className="rounded-2xl bg-[#F3F8FA] p-4">
                      <div className="text-xs uppercase tracking-[0.16em] text-[#476074]">Admin Videos</div>
                      <div className="mt-2 text-2xl font-bold text-[#0A1B45]">{item.adminVideos}</div>
                    </div>
                    <div className="rounded-2xl bg-[#F3F8FA] p-4">
                      <div className="text-xs uppercase tracking-[0.16em] text-[#476074]">Next Live</div>
                      <div className="mt-2 text-sm font-semibold text-[#0A1B45]">{item.nextLive}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ) : null}

        {activeView === "sessions" ? (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#0A1B45]">Upcoming Live Sessions</h2>
                <p className="text-[#476074]">Jadwal Zoom class yang kamu pegang minggu ini</p>
              </div>
              <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#308279] hover:bg-[#308279]/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule Session
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Schedule New Live Session</DialogTitle>
                    <DialogDescription>
                      Tambahkan jadwal Zoom baru untuk class yang sudah aktif.
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-4" onSubmit={handleScheduleSubmit}>
                    <div className="space-y-2">
                      <Label htmlFor="session-title">Session Title</Label>
                      <Input id="session-title" placeholder="e.g., Data Structures Q&A Session" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="class-select">Class</Label>
                      <select id="class-select" className="w-full rounded-md border p-2">
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
                      <Label htmlFor="session-description">Agenda Singkat</Label>
                      <Textarea
                        id="session-description"
                        placeholder="Jelaskan topik utama yang akan dibahas di sesi ini..."
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button type="submit" className="bg-[#308279] hover:bg-[#308279]/90">
                        Schedule Session
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
                        Batal
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {upcomingSessions.map((session) => (
                <Card
                  key={session.id}
                  className="overflow-hidden border-2 transition-all hover:border-[#308279] hover:shadow-lg"
                >
                  <div className="p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#308279] to-[#0A1B45]">
                          <Video className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <h3 className="mb-1 text-xl font-bold text-[#0A1B45]">{session.title}</h3>
                          <p className="mb-2 text-sm text-[#476074]">{session.className}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1 text-[#476074]">
                              <Calendar className="h-4 w-4" />
                              <span>{session.date}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[#476074]">
                              <Clock className="h-4 w-4" />
                              <span>{session.time}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[#476074]">
                              <Users className="h-4 w-4" />
                              <span>{session.students} students</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onSelect={() => {
                              toast.success("Session editor opened", {
                                description: `Kamu bisa lanjutkan edit untuk ${session.title}.`,
                              });
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Session
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onSelect={() => {
                              toast.error("Session cancelled", {
                                description: `${session.title} ditandai sebagai dibatalkan.`,
                              });
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Cancel Session
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="rounded-lg border border-[#308279]/20 bg-[#F3F8FA] p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="mb-1 text-xs text-[#476074]">Zoom Meeting Link:</p>
                          <code className="text-sm font-mono text-[#0A1B45]">{session.zoomLink}</code>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#308279] text-[#308279]"
                          onClick={() => handleCopyLink(session.zoomLink)}
                        >
                          Copy Link
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ) : null}

        {activeView === "materials" ? (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#0A1B45]">Class Materials</h2>
                <p className="text-[#476074]">Upload PDF, DOCX, cheat notes, dan dokumen pendukung lainnya</p>
              </div>
              <Dialog open={isMaterialDialogOpen} onOpenChange={setIsMaterialDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#308279] hover:bg-[#308279]/90">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Material
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Upload Tutor Material</DialogTitle>
                    <DialogDescription>
                      Tambahkan dokumen pembelajaran ke class yang sudah dikelola admin.
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-4" onSubmit={handleMaterialSubmit}>
                    <div className="space-y-2">
                      <Label htmlFor="material-title">Document Title</Label>
                      <Input id="material-title" placeholder="e.g., SQL Query Patterns" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="material-class">Class</Label>
                        <select id="material-class" className="w-full rounded-md border p-2">
                          <option>Data Structures & Algorithms</option>
                          <option>Database Management & SQL</option>
                          <option>HCI Design Principles</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="material-type">Format</Label>
                        <select id="material-type" className="w-full rounded-md border p-2">
                          <option>PDF</option>
                          <option>DOCX</option>
                          <option>PPTX</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="material-file">File</Label>
                      <Input id="material-file" type="file" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="material-notes">Description</Label>
                      <Textarea
                        id="material-notes"
                        placeholder="Jelaskan isi dokumen atau cara menggunakannya untuk students..."
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button type="submit" className="bg-[#308279] hover:bg-[#308279]/90">
                        Upload Material
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setIsMaterialDialogOpen(false)}>
                        Batal
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {classMaterials.map((material) => (
                <Card
                  key={material.id}
                  className="border-2 p-6 transition-all hover:border-[#308279] hover:shadow-lg"
                >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#308279]/10 text-[#308279]">
                      <FileText className="h-6 w-6" />
                    </div>
                    <Badge
                      className={
                        material.status === "Published"
                          ? "border-0 bg-[#308279]/10 text-[#308279]"
                          : "border-0 bg-[#0A1B45]/10 text-[#0A1B45]"
                      }
                    >
                      {material.status}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#308279]">{material.className}</div>
                    <h3 className="mt-2 text-lg font-bold text-[#0A1B45]">{material.title}</h3>
                    <p className="mt-2 text-sm text-[#476074]">
                      {material.format} • {material.size} • {material.downloads} downloads
                    </p>
                    <p className="mt-1 text-sm text-[#476074]">Updated {material.lastUpdated}</p>
                  </div>
                  <div className="mt-6 flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 border-[#308279] text-[#308279]"
                      onClick={() =>
                        toast.message("Revision flow", {
                          description: `Revisi untuk ${material.title} akan diarahkan ke uploader dokumen.`,
                        })
                      }
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Revise
                    </Button>
                    <Link to={`/class/${material.classId}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        Open Class
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ) : null}

        {activeView === "analytics" ? (
          <section className="space-y-6">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-[#0A1B45]">Teaching Analytics</h2>
              <p className="text-[#476074]">Ringkasan performa live teaching dan engagement students</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-bold text-[#0A1B45]">Student Growth</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={studentEngagementData}>
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

              <Card className="p-6">
                <h3 className="mb-4 text-lg font-bold text-[#0A1B45]">Session Attendance Rate</h3>
                <div className="flex h-64 items-center justify-center">
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
                <div className="mt-4 rounded-lg bg-[#308279]/5 p-4">
                  <p className="text-sm text-[#476074]">
                    <span className="font-bold text-[#308279]">85%</span> students rata-rata hadir di
                    live session kamu minggu ini.
                  </p>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="mb-4 text-lg font-bold text-[#0A1B45]">Performance Summary</h3>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="rounded-lg bg-[#F3F8FA] p-4">
                  <div className="mb-1 text-2xl font-bold text-[#308279]">4.9</div>
                  <div className="text-sm text-[#476074]">Rata-rata Rating</div>
                </div>
                <div className="rounded-lg bg-[#F3F8FA] p-4">
                  <div className="mb-1 text-2xl font-bold text-[#0A1B45]">18</div>
                  <div className="text-sm text-[#476074]">Dokumen Aktif</div>
                </div>
                <div className="rounded-lg bg-[#F3F8FA] p-4">
                  <div className="mb-1 text-2xl font-bold text-[#0A1B45]">85%</div>
                  <div className="text-sm text-[#476074]">Attendance Rate</div>
                </div>
                <div className="rounded-lg bg-[#F3F8FA] p-4">
                  <div className="mb-1 text-2xl font-bold text-[#308279]">234</div>
                  <div className="text-sm text-[#476074]">Total Reviews</div>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Link to="/help-faq?role=tutor">
                  <Button
                    variant="outline"
                    className="border-[#308279] text-[#308279]"
                  >
                    Open tutor help center
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          </section>
        ) : null}
      </div>
      </main>
    </div>
  );
}
