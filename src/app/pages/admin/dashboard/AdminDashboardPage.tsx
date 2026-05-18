import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client/react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { jsPDF } from "jspdf";
import Swal from "sweetalert2";
import {
  DollarSign,
  FileText,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { GET_ADMIN_PANEL_DATA, useAdminPanelData, type BackendUser } from "../../../api/admin";
import type { Batch } from "../../../api/batches";
import { DELETE_COURSE, type Course, type CourseStatus } from "../../../api/courses";
import { useAuth } from "../../../auth/AuthContext";
import { confirmLogout } from "../../../components/feedback/confirmLogout";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { AdminView, ManagedClass, ManagedStudent, ManagedTutor, NewTutorDraft, TutorApplication } from "../shared/types";
import AdminClassesPage from "../classes/AdminClassesPage";
import AdminFinancialsPage from "../financials/AdminFinancialsPage";
import AdminOverviewPage from "./AdminOverviewPage";
import AdminStudentsPage from "../students/AdminStudentsPage";
import AdminTutorsPage from "../tutors/AdminTutorsPage";

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
    contact: "+62 812-1111-1111",
    major: "Computer Science",
    angkatan: "2019",
    username: "raka.pratama",
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
    contact: "+62 813-2222-2222",
    major: "Information Systems",
    angkatan: "2018",
    username: "andi.wijaya",
    assignedClassNames: ["Database Management & SQL", "UI/UX Design Fundamentals"],
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
    contact: "+62 814-3333-3333",
    major: "Visual Communication Design",
    angkatan: "2017",
    username: "denny.kusuma",
    assignedClassNames: ["HCI Design Principles", "Design Systems Essentials"],
    assignedClasses: 2,
    students: 280,
    rating: 4.9,
    responsibility: "Live sessions & PDF materials",
    status: "Active",
  },
];

const initialTutorApplications: TutorApplication[] = [
  {
    id: "app-1",
    name: "Maya Prasetyo",
    email: "maya.prasetyo@gmail.com",
    contact: "+62 812-4444-4444",
    major: "Computer Science",
    angkatan: "2020",
    expertise: "Frontend engineering and UI systems",
    motivation: "Ingin bantu live class React dan review project student berbasis frontend.",
    requestedClassNames: ["UI/UX Design Fundamentals", "Design Systems Essentials"],
    status: "Pending",
  },
  {
    id: "app-2",
    name: "Bagas Aditya",
    email: "bagas.aditya@gmail.com",
    contact: "+62 811-5555-5555",
    major: "Information Systems",
    angkatan: "2019",
    expertise: "SQL and database optimization",
    motivation: "Tertarik jadi tutor guest untuk kelas database intensive batch akhir pekan.",
    requestedClassNames: ["Database Management & SQL"],
    status: "Pending",
  },
];

const initialNewTutorDraft: NewTutorDraft = {
  name: "",
  email: "",
  contact: "",
  major: "",
  angkatan: "",
  username: "",
  password: "",
  assignedClassNames: [],
};

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

const registrationStatsData = [
  { day: "12 Feb", registrants: 6 },
  { day: "13 Feb", registrants: 9 },
  { day: "14 Feb", registrants: 7 },
  { day: "15 Feb", registrants: 11 },
  { day: "16 Feb", registrants: 14 },
  { day: "17 Feb", registrants: 18 },
  { day: "18 Feb", registrants: 22 },
];

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "classes", label: "Classes", icon: FolderKanban },
  { id: "students", label: "Students", icon: GraduationCap },
  { id: "tutors", label: "Tutors", icon: Users },
  { id: "financials", label: "Financials", icon: DollarSign },
] as const;

function getUniqueTutorIds(course: Course, batches: Batch[]) {
  const tutorIds = batches
    .filter((batch) => batch.courseId === course.id)
    .map((batch) => batch.tutorId)
    .filter(Boolean);

  const fallbackTutorIds = course.tutorId ?? [];
  return Array.from(new Set(tutorIds.length > 0 ? tutorIds : fallbackTutorIds));
}

function formatTutorNames(tutorIds: string[], users: BackendUser[]) {
  if (tutorIds.length === 0) return "Unassigned";

  const usersById = new Map(users.map((backendUser) => [backendUser.id, backendUser]));
  const tutorNames = tutorIds.map((tutorId) => usersById.get(tutorId)?.name ?? tutorId);

  return tutorNames.join(", ");
}

function mapCourseToManagedClass(
  course: Course,
  users: BackendUser[],
  batches: Batch[],
): ManagedClass {
  const tutorIds = getUniqueTutorIds(course, batches);

  return {
    id: course.id,
    title: course.title,
    level: course.level,
    tutor: formatTutorNames(tutorIds, users),
    students: 0,
    videos: course.totalLectures,
    sessions: 0,
    docs: course.totalSections,
    quizzes: 0,
    status: course.status,
  };
}

function mapUserToStudent(backendUser: BackendUser): ManagedStudent {
  return {
    id: backendUser.id,
    name: backendUser.name,
    nim: backendUser.username,
    email: backendUser.email,
    major: "Tutoring Academy",
    semester: 0,
    enrolledClasses: backendUser.enrolledCourses.length,
    completedClasses: 0,
    status: "Active",
  };
}

function getAssignedClassNames(
  backendUser: BackendUser,
  courses: Course[],
  batches: Batch[],
) {
  const assignedCourseIds = new Set([
    ...backendUser.teachingCourses,
    ...batches
      .filter((batch) => batch.tutorId === backendUser.id)
      .map((batch) => batch.courseId),
  ]);

  return courses
    .filter((course) => assignedCourseIds.has(course.id))
    .map((course) => course.title);
}

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { logout, user } = useAuth();
  const { data: adminData, loading: isAdminDataLoading } = useAdminPanelData();
  const [deleteCourse, { loading: isDeletingClass }] = useMutation(DELETE_COURSE);
  const [searchQuery, setSearchQuery] = useState("");
  const [classes, setClasses] = useState(initialClasses);
  const [students, setStudents] = useState(initialStudents);
  const [tutors, setTutors] = useState(initialTutors);
  const [tutorApplications, setTutorApplications] = useState(initialTutorApplications);
  const [isAddTutorOpen, setIsAddTutorOpen] = useState(false);
  const [isApplicationsPanelOpen, setIsApplicationsPanelOpen] = useState(false);
  const [newTutor, setNewTutor] = useState<NewTutorDraft>(initialNewTutorDraft);
  const [applicationCredentials, setApplicationCredentials] = useState<
    Record<string, { username: string; password: string }>
  >(() =>
    Object.fromEntries(
      initialTutorApplications.map((application) => [
        application.id,
        { username: "", password: "" },
      ]),
    ),
  );

  const handleLogout = async () => {
    const confirmed = await confirmLogout();
    if (!confirmed) return;

    await logout();
    navigate("/login");
  };

  const confirmDeleteClass = async (classTitle: string) => {
    const result = await Swal.fire({
      title: "Delete class?",
      text: `${classTitle} will be removed from the course catalog.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete class",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#B42318",
      cancelButtonColor: "#308279",
      reverseButtons: true,
      background: "#FFFFFF",
      color: "#0A1B45",
      iconColor: "#B42318",
      customClass: {
        popup:
          "rounded-[1.5rem] border border-[#D8E5E9] shadow-[0_24px_64px_rgba(10,27,69,0.18)]",
        title: "text-[#0A1B45]",
        htmlContainer: "text-[#476074]",
        confirmButton: "rounded-xl px-5 py-2.5 font-semibold",
        cancelButton: "rounded-xl px-5 py-2.5 font-semibold text-white",
      },
    });

    return result.isConfirmed;
  };

  const handleDeleteClass = async (courseId: string) => {
    const targetClass = classes.find((item) => item.id === courseId);
    if (!targetClass) return;

    const confirmed = await confirmDeleteClass(targetClass.title);
    if (!confirmed) return;

    try {
      await deleteCourse({
        variables: { id: courseId },
        refetchQueries: [GET_ADMIN_PANEL_DATA, "GetPublishedCourses"],
        awaitRefetchQueries: true,
      });
      toast.success("Class deleted", {
        description: `${targetClass.title} has been removed.`,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Please try again.";
      toast.error("Unable to delete class", { description: message });
    }
  };

  const selectedView = (() => {
    const view = searchParams.get("view");
    if (view === "tutor-applications") return "tutors" as AdminView;
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

  useEffect(() => {
    if (!adminData) return;

    const backendCourses = adminData.courses?.nodes ?? [];
    const backendUsers = adminData.users?.nodes ?? [];
    const backendBatches = adminData.batches?.nodes ?? [];

    setClasses(
      backendCourses.map((course) =>
        mapCourseToManagedClass(course, backendUsers, backendBatches),
      ),
    );
    setStudents(
      backendUsers
        .filter((backendUser) => backendUser.role === "USER")
        .map(mapUserToStudent),
    );
    setTutors(
      backendUsers
        .filter((backendUser) => backendUser.role === "TUTOR")
        .map((backendUser) => {
          const assignedClassNames = getAssignedClassNames(
            backendUser,
            backendCourses,
            backendBatches,
          );

          return {
            id: backendUser.id,
            name: backendUser.name,
            email: backendUser.email,
            contact: backendUser.contact ?? "-",
            major: "-",
            angkatan: "-",
            username: backendUser.username,
            assignedClassNames,
            assignedClasses: assignedClassNames.length,
            students: 0,
            rating: 0,
            responsibility: "Live sessions & PDF materials",
            status: "Active",
          };
        }),
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
      tutor.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.assignedClassNames.join(" ").toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredTutorApplications = tutorApplications.filter(
    (application) =>
      application.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.expertise.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.requestedClassNames.join(" ").toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const pendingTutorApplicationsCount = tutorApplications.filter(
    (application) => application.status === "Pending",
  ).length;

  const getStatusBadgeClassName = (status: ManagedStudent["status"]) =>
    status === "Active"
      ? "border-0 bg-[#308279] text-white"
      : "border-0 bg-[#FDECEC] text-[#B42318]";

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

    const nextStatus = targetStudent.status === "Active" ? "Inactive" : "Active";
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

    const nextStatus = targetTutor.status === "Active" ? "Inactive" : "Active";
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
      !newTutor.contact.trim() ||
      !newTutor.major.trim() ||
      !newTutor.angkatan.trim() ||
      !newTutor.username.trim() ||
      !newTutor.password.trim() ||
      newTutor.assignedClassNames.length === 0
    ) {
      toast.error(
        "Please complete tutor name, contact, major, angkatan, username, password, and assign at least one class.",
      );
      return;
    }

    setTutors((current) => [
      ...current,
      {
        id: `local-${Date.now()}`,
        name: newTutor.name.trim(),
        email: newTutor.email.trim(),
        contact: newTutor.contact.trim(),
        major: newTutor.major.trim(),
        angkatan: newTutor.angkatan.trim(),
        username: newTutor.username.trim(),
        assignedClassNames: newTutor.assignedClassNames,
        assignedClasses: newTutor.assignedClassNames.length,
        students: 0,
        rating: 0,
        responsibility: "Live sessions & PDF materials",
        status: "Active",
      },
    ]);

    toast.success("Tutor added", {
      description: `${newTutor.name.trim()} is now available for class assignment.`,
    });
    setNewTutor(initialNewTutorDraft);
    setIsAddTutorOpen(false);
  };

  const handleApplicationCredentialChange = (
    applicationId: string,
    field: "username" | "password",
    value: string,
  ) => {
    setApplicationCredentials((current) => ({
      ...current,
      [applicationId]: {
        ...current[applicationId],
        [field]: value,
      },
    }));
  };

  const handleApproveTutorApplication = (applicationId: string) => {
    const application = tutorApplications.find((entry) => entry.id === applicationId);
    if (!application) return;

    setTutorApplications((current) =>
      current.map((entry) =>
        entry.id === applicationId ? { ...entry, status: "Approved" } : entry,
      ),
    );

    toast.success("Application approved", {
      description: `Set username and password to finalize ${application.name}'s tutor account.`,
    });
  };

  const handleCreateTutorFromApplication = (applicationId: string) => {
    const application = tutorApplications.find((entry) => entry.id === applicationId);
    const credentials = applicationCredentials[applicationId];
    if (!application) return;

    if (!credentials?.username.trim() || !credentials?.password.trim()) {
      toast.error("Create username and password before finalizing this tutor account.");
      return;
    }

    setTutors((current) => [
      ...current,
      {
        id: `approved-${application.id}`,
        name: application.name,
        email: application.email,
        contact: application.contact,
        major: application.major,
        angkatan: application.angkatan,
        username: credentials.username.trim(),
        assignedClassNames: application.requestedClassNames,
        assignedClasses: application.requestedClassNames.length,
        students: 0,
        rating: 0,
        responsibility: "Live sessions & PDF materials",
        status: "Active",
      },
    ]);
    setTutorApplications((current) => current.filter((entry) => entry.id !== applicationId));
    setApplicationCredentials((current) => {
      const next = { ...current };
      delete next[applicationId];
      return next;
    });

    toast.success("Tutor approved", {
      description: `${application.name} has been added to the tutor roster.`,
    });
  };

  const handleRejectTutorApplication = (applicationId: string) => {
    const application = tutorApplications.find((entry) => entry.id === applicationId);
    if (!application) return;

    setTutorApplications((current) =>
      current.map((entry) =>
        entry.id === applicationId ? { ...entry, status: "Rejected" } : entry,
      ),
    );

    toast.success("Application rejected", {
      description: `${application.name}'s tutor application has been marked as rejected.`,
    });
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

  const renderSelectedView = () => {
    switch (selectedView) {
      case "dashboard":
        return (
          <AdminOverviewPage
            stats={stats}
            revenueData={revenueData}
            userGrowthData={userGrowthData}
            registrationStatsData={registrationStatsData}
            setAdminView={setAdminView}
          />
        );
      case "classes":
        return (
          <AdminClassesPage
            classes={classes}
            onCreateClass={() => navigate("/admin/courses/create")}
            onDeleteClass={handleDeleteClass}
            isDeletingClass={isDeletingClass}
            getClassStatusBadgeClassName={getClassStatusBadgeClassName}
            getCourseStatusLabel={getCourseStatusLabel}
          />
        );
      case "students":
        return (
          <AdminStudentsPage
            students={filteredStudents}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            getStatusBadgeClassName={getStatusBadgeClassName}
            toggleStudentStatus={toggleStudentStatus}
          />
        );
      case "tutors":
      case "tutor-applications":
        return (
          <AdminTutorsPage
            tutors={filteredTutors}
            tutorApplications={filteredTutorApplications}
            pendingTutorApplicationsCount={pendingTutorApplicationsCount}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isApplicationsPanelOpen={isApplicationsPanelOpen}
            setIsApplicationsPanelOpen={setIsApplicationsPanelOpen}
            isAddTutorOpen={isAddTutorOpen}
            setIsAddTutorOpen={setIsAddTutorOpen}
            newTutor={newTutor}
            setNewTutor={setNewTutor}
            classes={classes}
            handleAddTutor={handleAddTutor}
            applicationCredentials={applicationCredentials}
            handleApplicationCredentialChange={handleApplicationCredentialChange}
            handleApproveTutorApplication={handleApproveTutorApplication}
            handleRejectTutorApplication={handleRejectTutorApplication}
            handleCreateTutorFromApplication={handleCreateTutorFromApplication}
            getStatusBadgeClassName={getStatusBadgeClassName}
            toggleTutorStatus={toggleTutorStatus}
          />
        );
      case "financials":
        return (
          <AdminFinancialsPage
            classFinancials={classFinancials}
            handleDownloadFinancialSpreadsheet={handleDownloadFinancialSpreadsheet}
            handleDownloadFinancialPdf={handleDownloadFinancialPdf}
          />
        );
    }
  };

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

      <main className="flex-1 overflow-auto">{renderSelectedView()}</main>
    </div>
  );
}
