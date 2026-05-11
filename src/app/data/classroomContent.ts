import { getMockBatchesForCourse } from "./batches";

export type ClassroomContentKind = "video" | "material" | "quiz" | "meeting";

export type ClassroomContentItem = {
  id: string;
  kind: ClassroomContentKind;
  title: string;
  sectionId: string;
  sectionTitle: string;
  meta: string;
  description: string;
  completed?: boolean;
  downloadable?: boolean;
  actionLabel: string;
  duration?: string;
  htmlContent?: string;
  sourceLabel?: string;
  sourceUrl?: string;
  attachmentName?: string;
  meetingNotes?: string[];
  objectives?: string[];
};

export type ClassroomSection = {
  id: string;
  title: string;
  items: ClassroomContentItem[];
};

export function buildClassroomItemHref(
  courseId: string,
  item: ClassroomContentItem,
  batchId?: string,
) {
  const search = batchId ? `?batch=${batchId}` : "";

  switch (item.kind) {
    case "video":
      return `/classroom/${courseId}/videos/${item.id}${search}`;
    case "material":
      return `/classroom/${courseId}/materials/${item.id}${search}`;
    case "quiz":
      return `/classroom/${courseId}/quizzes/${item.id}${search}`;
    case "meeting":
      return `/classroom/${courseId}/meetings/${item.id}${search}`;
  }
}

export function getMockClassroomData(courseId: string | undefined, batchId?: string) {
  const safeCourseId = courseId ?? "course";
  const course = {
    id: safeCourseId,
    title: "Data Structures & Algorithms Complete Guide",
    instructor: "Raka Pratama",
    progress: 45,
    totalItems: 19,
    completedItems: 8,
  };

  const batches = getMockBatchesForCourse(courseId, course.instructor, 499000);
  const selectedBatch = batches.find((batch) => batch.id === batchId) ?? batches[0];

  const items: ClassroomContentItem[] = [
    {
      id: "video-1",
      kind: "video",
      title: "Class Overview & Learning Path",
      sectionId: "intro",
      sectionTitle: "Introduction & Fundamentals",
      meta: "15:30 • Video lesson",
      description:
        "Gambaran alur belajar cohort, ekspektasi batch, dan milestone utama selama periode berjalan.",
      completed: true,
      actionLabel: "Watch Video",
      duration: "15:30",
      sourceLabel: "Hosted lesson",
      sourceUrl: "https://example.com/videos/class-overview",
      objectives: [
        "Memahami struktur cohort dan milestone batch",
        "Mengetahui ekspektasi tugas dan ritme pertemuan",
        "Mengenal bagaimana video, material, dan quiz saling terhubung",
      ],
    },
    {
      id: "material-1",
      kind: "material",
      title: "Big O Notation Cheat Sheet",
      sectionId: "intro",
      sectionTitle: "Introduction & Fundamentals",
      meta: "PDF • 5 pages • 2.3 MB",
      description:
        "Ringkasan notasi kompleksitas yang dipakai sepanjang course untuk referensi cepat saat belajar.",
      completed: true,
      downloadable: true,
      actionLabel: "Read Material",
      attachmentName: "big-o-cheat-sheet.pdf",
      htmlContent: `
        <h2>Cheat Sheet Overview</h2>
        <p>Materi ini disusun sebagai versi HTML yang siap dirender dari output WYSIWYG seperti CKEditor. Tutor atau admin nantinya dapat menulis konten berformat lengkap tanpa mengubah struktur halaman student.</p>
        <h3>Core Concepts</h3>
        <ul>
          <li><strong>O(1)</strong> untuk akses langsung atau lookup konstan.</li>
          <li><strong>O(log n)</strong> untuk pendekatan divide and conquer seperti binary search.</li>
          <li><strong>O(n)</strong> untuk traversal linear.</li>
          <li><strong>O(n²)</strong> untuk nested iteration yang belum dioptimalkan.</li>
        </ul>
        <blockquote>Gunakan cheat sheet ini saat membaca video atau sebelum quiz untuk mengingat pola kompleksitas.</blockquote>
        <p>Setelah memahami tabel kompleksitas, lanjutkan ke section arrays agar kamu bisa melihat penerapannya di contoh nyata.</p>
      `,
    },
    {
      id: "video-2",
      kind: "video",
      title: "Array Basics & Operations",
      sectionId: "arrays",
      sectionTitle: "Arrays & Strings",
      meta: "25:10 • Video lesson",
      description:
        "Konsep dasar array, operasi umum, serta contoh implementasi yang dipakai sebelum pertemuan batch berikutnya.",
      completed: true,
      actionLabel: "Watch Video",
      duration: "25:10",
      sourceLabel: "Hosted lesson",
      sourceUrl: "https://example.com/videos/array-basics",
      objectives: [
        "Memahami memory model array",
        "Mengenali operasi insert, delete, dan lookup",
        "Menyiapkan pemahaman untuk pertemuan live batch",
      ],
    },
    {
      id: "material-2",
      kind: "material",
      title: "Array & String Patterns",
      sectionId: "arrays",
      sectionTitle: "Arrays & Strings",
      meta: "PDF • 8 pages • 3.1 MB",
      description:
        "Materi downloadable untuk pola problem solving array dan string yang sering keluar di latihan batch.",
      completed: false,
      downloadable: true,
      actionLabel: "Read Material",
      attachmentName: "array-string-patterns.pdf",
      htmlContent: `
        <h2>Patterns for Fast Problem Solving</h2>
        <p>Dokumen ini memetakan beberapa pola yang sering dipakai pada soal arrays dan strings. Konten ini diasumsikan ditulis oleh tutor atau admin melalui editor rich text.</p>
        <h3>Patterns Covered</h3>
        <ol>
          <li>Two pointers for sorted and unsorted arrays</li>
          <li>Sliding window for substring or subarray problems</li>
          <li>Frequency map for counting and matching characters</li>
        </ol>
        <p>Gunakan materi ini bersama video terkait dan bawa catatan ini ke pertemuan batch supaya diskusi live lebih efektif.</p>
      `,
    },
    {
      id: "meeting-1",
      kind: "meeting",
      title: "Pertemuan 04 - Two Pointer Technique",
      sectionId: "meetings",
      sectionTitle: "Live Meetings",
      meta: "Senin, 17 Feb 2026 • 14:00 - 15:30",
      description:
        "Sesi live cohort untuk membahas two pointer, review latihan batch, dan Q&A dengan tutor.",
      completed: true,
      actionLabel: "Open Meeting",
      meetingNotes: [
        "Review soal latihan batch sebelumnya",
        "Bahas strategi two pointers pada array sorted",
        "Kumpulkan pertanyaan untuk sesi Q&A 15 menit terakhir",
      ],
      sourceLabel: "Zoom recap",
      sourceUrl: "https://zoom.us/j/example1",
    },
    {
      id: "meeting-2",
      kind: "meeting",
      title: "Pertemuan 05 - Binary Search Deep Dive",
      sectionId: "meetings",
      sectionTitle: "Live Meetings",
      meta: "Rabu, 19 Feb 2026 • 16:00 - 17:30",
      description:
        "Pertemuan berikutnya untuk live coding dan diskusi soal binary search pada cohort ini.",
      completed: false,
      actionLabel: "Open Meeting",
      meetingNotes: [
        "Live coding binary search template",
        "Debugging pola off-by-one",
        "Checkpoint kehadiran dan latihan batch",
      ],
    },
    {
      id: "quiz-1",
      kind: "quiz",
      title: "Array & Linked List Quiz",
      sectionId: "evaluation",
      sectionTitle: "Class Evaluation",
      meta: "15 questions • 30 minutes",
      description:
        "Quiz umum tingkat course untuk mengukur pemahaman awal sebelum lanjut ke section berikutnya.",
      completed: true,
      actionLabel: "Open Quiz",
      objectives: [
        "Menguji pemahaman array basics",
        "Mengecek readiness untuk linked list section",
        "Memberi checkpoint sebelum pertemuan cohort berikutnya",
      ],
    },
    {
      id: "video-3",
      kind: "video",
      title: "Sliding Window Problems",
      sectionId: "arrays",
      sectionTitle: "Arrays & Strings",
      meta: "28:15 • Video lesson",
      description:
        "Pembahasan langkah demi langkah untuk pattern sliding window yang dipakai di latihan dan quiz class.",
      completed: false,
      actionLabel: "Watch Video",
      duration: "28:15",
      sourceLabel: "Hosted lesson",
      sourceUrl: "https://example.com/videos/sliding-window",
      objectives: [
        "Memahami kapan sliding window cocok dipakai",
        "Membaca perubahan window kiri dan kanan",
        "Menyiapkan diri untuk latihan cohort",
      ],
    },
    {
      id: "quiz-2",
      kind: "quiz",
      title: "Tree & Graph Quiz",
      sectionId: "evaluation",
      sectionTitle: "Class Evaluation",
      meta: "20 questions • 45 minutes",
      description:
        "Evaluasi class-level untuk memastikan progres kamu siap lanjut ke topik graph dan tree.",
      completed: false,
      actionLabel: "Open Quiz",
      objectives: [
        "Mengukur readiness sebelum tree & graph",
        "Mengidentifikasi konsep yang masih lemah",
        "Memberi sinyal apakah perlu review ulang material sebelumnya",
      ],
    },
  ];

  const sectionsMap = new Map<string, ClassroomSection>();
  for (const item of items) {
    if (!sectionsMap.has(item.sectionId)) {
      sectionsMap.set(item.sectionId, {
        id: item.sectionId,
        title: item.sectionTitle,
        items: [],
      });
    }
    sectionsMap.get(item.sectionId)?.items.push(item);
  }

  const sections = Array.from(sectionsMap.values());

  return {
    course,
    batches,
    selectedBatch,
    items,
    sections,
  };
}
