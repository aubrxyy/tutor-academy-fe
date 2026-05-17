import {
  BarChart3,
  BookOpen,
  FileText,
  Users,
  Video,
} from "lucide-react";

import type {
  TutorAssignedClassCard,
  TutorAttendancePoint,
  TutorChartPoint,
  TutorClassMaterial,
  TutorMeetingSession,
  TutorQuiz,
  TutorQuizDraft,
  TutorQuizQuestionDraft,
  TutorQuizQuestionOption,
  TutorSectionCopy,
  TutorStat,
} from "./types";

export const createQuizOptionDraft = (id: number): TutorQuizQuestionOption => ({
  id,
  text: "",
  isCorrect: false,
});

export const createQuizQuestionDraft = (id: number): TutorQuizQuestionDraft => ({
  id,
  prompt: "",
  type: "multiple_answer",
  explanation: "",
  options: [createQuizOptionDraft(1), createQuizOptionDraft(2)],
  acceptedAnswersText: "",
});

export const createTutorStats = (
  assignedClassesValue: string,
): TutorStat[] => [
  {
    icon: Users,
    label: "Students teaching",
    value: "450",
    change: "+12%",
    color: "from-[#308279] to-[#92B7B0]",
  },
  {
    icon: Video,
    label: "Scheduled meeting this week",
    value: "24",
    color: "from-[#0A1B45] to-[#308279]",
  },
  {
    icon: FileText,
    label: "Materials",
    value: "18",
    color: "from-[#92B7B0] to-[#476074]",
  },
  {
    icon: BookOpen,
    label: "Assigned batches",
    value: "5",
    color: "from-[#308279] to-[#0A1B45]",
  },
];

export const initialUpcomingSessions: TutorMeetingSession[] = [
  {
    id: 1,
    classId: 1,
    title: "Pertemuan 04 - Data Structures & Algo",
    className: "Data Structures & Algorithms",
    batchName: "Batch T1",
    batchWindow: "17 Feb - 28 Mar 2026",
    enrolledStudents: 45,
    sortDateTime: "2026-02-17T14:00:00",
    date: "Senin, 17 Feb 2026",
    startTime: "14:00",
    endTime: "15:30",
    attendance: 45,
    topic: "Diskusi linked list, array traversal, dan latihan soal.",
    zoomLink: "https://zoom.us/j/123456789",
    zoomOwner: "Admin membagikan link Zoom ke tutor dan students.",
    status: "Completed",
  },
  {
    id: 2,
    classId: 1,
    title: "Pertemuan 05 - Algorithm Workshop",
    className: "Data Structures & Algorithms",
    batchName: "Batch T2",
    batchWindow: "17 Feb - 28 Mar 2026",
    enrolledStudents: 45,
    sortDateTime: "2026-02-19T16:00:00",
    date: "Rabu, 19 Feb 2026",
    startTime: "16:00",
    endTime: "18:00",
    attendance: 0,
    topic: "Live coding two-pointer dan sliding window.",
    zoomLink: "https://zoom.us/j/987654321",
    zoomOwner: "Admin membagikan link Zoom ke tutor dan students.",
    status: "Scheduled",
  },
  {
    id: 3,
    classId: 2,
    title: "Pertemuan 03 - Database Design Fundamentals",
    className: "Database Management & SQL",
    batchName: "Batch T3",
    batchWindow: "21 Feb - 18 Apr 2026",
    enrolledStudents: 38,
    sortDateTime: "2026-02-21T13:00:00",
    date: "Jumat, 21 Feb 2026",
    startTime: "13:00",
    endTime: "14:30",
    attendance: 38,
    topic: "Normalisasi, ERD, dan checkpoint tugas batch.",
    zoomLink: "",
    zoomOwner: "Link masih menunggu admin share.",
    status: "Completed",
  },
];

export const initialClassMaterials: TutorClassMaterial[] = [
  {
    id: 1,
    classId: 1,
    title: "Array & Linked List Live Session Deck",
    className: "Data Structures & Algorithms",
    sectionLabel: "Section 2",
    sectionTitle: "Linear Data Structures",
    type: "tutor-led",
    format: "Material",
    owner: "Admin",
    support: "Dipakai tutor saat live session 04 untuk breakdown traversal, linked list, dan latihan soal.",
    tutorFocus: "Tekankan pointer update, reverse linked list, dan error yang sering muncul saat traversal.",
    lastUpdated: "2 jam lalu",
    status: "Published",
    tutorNoteStatus: "Updated after session",
    tutorNotes: "Tambahkan recap reverse linked list dan common mistake saat students menulis pointer update.",
    relatedSession: "Pertemuan 04 - Data Structures Q&A",
    sessionPhase: "Dipakai saat live session",
    adminAsset: "Materi pertemuan 4.pdf",
    tutorAsset: "Pembahasan pertemuan 4.pdf",
    tutorAssetStatus: "Uploaded",
  },
  {
    id: 2,
    classId: 1,
    title: "Mock Interview Worksheet",
    className: "Data Structures & Algorithms",
    sectionLabel: "Section 5",
    sectionTitle: "Interview Practice",
    type: "self-study",
    format: "Worksheet",
    owner: "Admin",
    support: "Worksheet mandiri setelah students menonton modul problem solving dan simulasi interview.",
    tutorFocus: "Cek apakah perlu dibahas ulang saat session review berikutnya.",
    lastUpdated: "Kemarin",
    status: "Published",
    tutorNoteStatus: "No tutor note yet",
    tutorNotes: "",
    relatedSession: "Belum dikaitkan ke sesi live",
    sessionPhase: "Dipelajari sendiri",
    adminAsset: "Worksheet practice · PDF",
    tutorAsset: "",
    tutorAssetStatus: "Not needed",
  },
  {
    id: 3,
    classId: 2,
    title: "SQL Query Patterns",
    className: "Database Management & SQL",
    sectionLabel: "Section 3",
    sectionTitle: "Core Query Patterns",
    type: "tutor-led",
    format: "Material",
    owner: "Admin",
    support: "Materi utama untuk sesi normalisasi, ERD, dan pattern query dasar sebelum praktik live.",
    tutorFocus: "Tambahkan recap error query yang paling sering dan contoh normalisasi yang dibahas live.",
    lastUpdated: "3 hari lalu",
    status: "Needs tutor notes",
    tutorNoteStatus: "Pending recap",
    tutorNotes: "Belum ada rangkuman sesi dan daftar error query yang paling sering muncul.",
    relatedSession: "Pertemuan 03 - Database Design Fundamentals",
    sessionPhase: "Dipakai saat live session",
    adminAsset: "Query pattern deck.pdf",
    tutorAsset: "",
    tutorAssetStatus: "Needs upload",
  },
  {
    id: 4,
    classId: 3,
    title: "Heuristic Evaluation Checklist",
    className: "HCI Design Principles",
    sectionLabel: "Section 4",
    sectionTitle: "Usability Review",
    type: "self-study",
    format: "Checklist",
    owner: "Admin",
    support: "Checklist evaluasi mandiri untuk students setelah membaca Nielsen heuristics.",
    tutorFocus: "Tambahkan contoh critique singkat kalau nanti dibahas di live feedback session.",
    lastUpdated: "4 hari lalu",
    status: "Published",
    tutorNoteStatus: "Optional note",
    tutorNotes: "Bisa dipakai tutor untuk menambahkan contoh hasil critique di pertemuan berikutnya.",
    relatedSession: "Belum dikaitkan ke sesi live",
    sessionPhase: "Dipelajari sendiri",
    adminAsset: "Checklist template · PDF",
    tutorAsset: "Optional critique example · PDF",
    tutorAssetStatus: "Optional",
  },
];

export const initialTutorQuizzes: TutorQuiz[] = [
  {
    id: 1,
    classId: 1,
    title: "Array & Linked List Quiz",
    description: "Quiz umum untuk memastikan students siap lanjut ke section berikutnya.",
    status: "Published",
    assignedBatches: ["Batch T1", "Batch T2"],
    opensAt: "2026-02-20T09:00",
    closesAt: "2026-02-25T21:00",
    questionCount: 12,
    questions: [
      {
        id: 1,
        prompt: "Manakah operasi linked list yang membutuhkan pointer update?",
        type: "multiple_answer",
        explanation: "Pointer update dibutuhkan saat insert, delete, dan reverse traversal tertentu.",
        options: [
          { id: 1, text: "Insert node", isCorrect: true },
          { id: 2, text: "Delete node", isCorrect: true },
          { id: 3, text: "Read node value", isCorrect: false },
        ],
        acceptedAnswersText: "",
      },
    ],
  },
  {
    id: 2,
    classId: 2,
    title: "SQL Core Query Quiz",
    description: "Cek pemahaman students pada query patterns, joins, dan subqueries dasar.",
    status: "Draft",
    assignedBatches: ["Batch T3"],
    opensAt: "2026-02-22T08:00",
    closesAt: "2026-02-28T22:00",
    questionCount: 10,
    questions: [
      {
        id: 1,
        prompt: "Tuliskan keyword untuk mengambil semua baris yang cocok dari dua tabel.",
        type: "fill_answer",
        explanation: "JOIN adalah konsep umum, tapi expected answer bisa INNER JOIN tergantung konteks soal.",
        options: [],
        acceptedAnswersText: "JOIN, INNER JOIN",
      },
    ],
  },
];

export const createEmptyQuizDraft = (): TutorQuizDraft => ({
  title: "",
  description: "",
  status: "Draft",
  assignedBatches: [],
  opensAt: "",
  closesAt: "",
  questionCount: "10",
  questions: [createQuizQuestionDraft(1)],
});

export const initialStudentEngagementData: TutorChartPoint[] = [
  { week: "Week 1", students: 380 },
  { week: "Week 2", students: 400 },
  { week: "Week 3", students: 420 },
  { week: "Week 4", students: 450 },
];

export const initialSessionAttendanceData: TutorAttendancePoint[] = [
  { name: "Hadir", value: 85, color: "#308279" },
  { name: "Tidak Hadir", value: 15, color: "#92B7B0" },
];

export const initialAssignedClasses: TutorAssignedClassCard[] = [
  {
    id: 1,
    title: "Data Structures & Algorithms",
    students: 234,
    batches: 2,
    nextLive: "Senin, 17 Feb • 14:00",
    tutorDocs: 7,
    adminVideos: 18,
  },
  {
    id: 2,
    title: "Database Management & SQL",
    students: 178,
    batches: 1,
    nextLive: "Jumat, 21 Feb • 13:00",
    tutorDocs: 6,
    adminVideos: 14,
  },
  {
    id: 3,
    title: "HCI Design Principles",
    students: 145,
    batches: 1,
    nextLive: "Belum ada jadwal baru",
    tutorDocs: 5,
    adminVideos: 11,
  },
];

export const tutorSectionCopy: TutorSectionCopy = {
  overview: {
    title: "Tutor Dashboard",
    description:
      "Lihat ringkasan batch yang kamu pegang sebelum masuk ke alur pertemuan, dokumen materi, dan analytics.",
  },
  meetings: {
    title: "Live Meetings",
    description:
      "Lihat detail batch, jadwal sesi, dan join meeting yang link Zoom-nya dibagikan admin.",
  },
  materials: {
    title: "Tutor Material Review",
    description:
      "Lihat materi per sesi, tambahkan recap tutor, dan upload versi bahan yang sudah diberi catatan setelah live session.",
  },
  quizzes: {
    title: "Quiz Management",
    description:
      "Pilih class lalu kelola quiz, batch assignment, status publish, dan jadwal buka-tutup quiz.",
  },
  analytics: {
    title: "Teaching Analytics",
    description:
      "Pantau engagement, attendance, dan indikator payroll per sesi dalam satu halaman yang lebih fokus.",
  },
};
