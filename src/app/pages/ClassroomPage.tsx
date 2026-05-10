import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import {
  Calendar,
  CheckCircle,
  ChevronLeft,
  Circle,
  Clock,
  Download,
  Eye,
  FileText,
  PlayCircle,
  Target,
  Users,
  Video,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Switch } from "../components/ui/switch";
import {
  EyeTrackingOverlay,
  FocusAlertModal,
  WebcamPreview,
} from "../components/EyeTrackingComponents";
import { getMockBatchesForCourse } from "../data/batches";

type ContentKind = "video" | "material" | "quiz" | "meeting";

type ContentItem = {
  id: string;
  kind: ContentKind;
  title: string;
  section: string;
  meta: string;
  description: string;
  completed?: boolean;
  actionLabel: string;
  actionHref?: string;
  downloadable?: boolean;
};

function getKindBadge(kind: ContentKind) {
  switch (kind) {
    case "video":
      return {
        label: "Video",
        className: "border-0 bg-[#0A1B45]/8 text-[#0A1B45]",
      };
    case "material":
      return {
        label: "Material",
        className: "border-0 bg-[#308279]/10 text-[#308279]",
      };
    case "quiz":
      return {
        label: "Quiz",
        className: "border-0 bg-[#FCEFC7] text-[#7A5A00]",
      };
    case "meeting":
      return {
        label: "Pertemuan",
        className: "border-0 bg-[#E8EEF9] text-[#21416B]",
      };
  }
}

export default function ClassroomPage() {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const [eyeTrackingEnabled, setEyeTrackingEnabled] = useState(false);
  const [showFocusAlert, setShowFocusAlert] = useState(false);
  const batchId = searchParams.get("batch") ?? `${courseId ?? "course"}-batch-a`;
  const selectedInfoRef = useRef<HTMLDivElement | null>(null);

  const courseData = {
    id: courseId,
    title: "Data Structures & Algorithms Complete Guide",
    instructor: "Raka Pratama",
    progress: 45,
    totalItems: 19,
    completedItems: 8,
  };

  const batches = useMemo(
    () => getMockBatchesForCourse(courseId, courseData.instructor, 499000),
    [courseData.instructor, courseId],
  );
  const selectedBatch = batches.find((batch) => batch.id === batchId) ?? batches[0];

  const contentItems = useMemo<ContentItem[]>(
    () => [
      {
        id: "video-1",
        kind: "video",
        title: "Class Overview & Learning Path",
        section: "Introduction & Fundamentals",
        meta: "15:30 • Video lesson",
        description: "Gambaran alur belajar cohort, ekspektasi batch, dan milestone utama selama periode berjalan.",
        completed: true,
        actionLabel: "Open Video",
      },
      {
        id: "material-1",
        kind: "material",
        title: "Big O Notation Cheat Sheet",
        section: "Introduction & Fundamentals",
        meta: "PDF • 5 pages • 2.3 MB",
        description: "Ringkasan notasi kompleksitas yang dipakai sepanjang course untuk referensi cepat saat belajar.",
        completed: true,
        actionLabel: "Download",
        downloadable: true,
      },
      {
        id: "video-2",
        kind: "video",
        title: "Array Basics & Operations",
        section: "Arrays & Strings",
        meta: "25:10 • Video lesson",
        description: "Konsep dasar array, operasi umum, serta contoh implementasi yang dipakai sebelum pertemuan batch berikutnya.",
        completed: true,
        actionLabel: "Open Video",
      },
      {
        id: "material-2",
        kind: "material",
        title: "Array & String Patterns",
        section: "Arrays & Strings",
        meta: "PDF • 8 pages • 3.1 MB",
        description: "Materi downloadable untuk pola problem solving array dan string yang sering keluar di latihan batch.",
        completed: false,
        actionLabel: "Download",
        downloadable: true,
      },
      {
        id: "meeting-1",
        kind: "meeting",
        title: "Pertemuan 04 - Two Pointer Technique",
        section: "Live Meetings",
        meta: "Senin, 17 Feb 2026 • 14:00 - 15:30",
        description: "Sesi live cohort untuk membahas two pointer, review latihan batch, dan Q&A dengan tutor.",
        completed: true,
        actionLabel: "Open Meeting",
      },
      {
        id: "meeting-2",
        kind: "meeting",
        title: "Pertemuan 05 - Binary Search Deep Dive",
        section: "Live Meetings",
        meta: "Rabu, 19 Feb 2026 • 16:00 - 17:30",
        description: "Pertemuan berikutnya untuk live coding dan diskusi soal binary search pada cohort ini.",
        completed: false,
        actionLabel: "Join When Live",
      },
      {
        id: "quiz-1",
        kind: "quiz",
        title: "Array & Linked List Quiz",
        section: "Class Evaluation",
        meta: "15 questions • 30 minutes",
        description: "Quiz umum tingkat course untuk mengukur pemahaman awal sebelum lanjut ke section berikutnya.",
        completed: true,
        actionLabel: "Retake Quiz",
        actionHref: `/class/${courseId}/quiz/1`,
      },
      {
        id: "video-3",
        kind: "video",
        title: "Sliding Window Problems",
        section: "Arrays & Strings",
        meta: "28:15 • Video lesson",
        description: "Pembahasan langkah demi langkah untuk pattern sliding window yang dipakai di latihan dan quiz class.",
        completed: false,
        actionLabel: "Open Video",
      },
      {
        id: "quiz-2",
        kind: "quiz",
        title: "Tree & Graph Quiz",
        section: "Class Evaluation",
        meta: "20 questions • 45 minutes",
        description: "Evaluasi class-level untuk memastikan progres kamu siap lanjut ke topik graph dan tree.",
        completed: false,
        actionLabel: "Start Quiz",
        actionHref: `/class/${courseId}/quiz/2`,
      },
    ],
    [courseId, selectedBatch.batchCode],
  );

  const [selectedContentId, setSelectedContentId] = useState(contentItems[0]?.id ?? "");

  const selectedContent =
    contentItems.find((item) => item.id === selectedContentId) ?? contentItems[0];

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth >= 1280) return;

    selectedInfoRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [selectedContentId]);

  const groupedItems = useMemo(() => {
    const groups = new Map<string, ContentItem[]>();

    for (const item of contentItems) {
      const current = groups.get(item.section) ?? [];
      current.push(item);
      groups.set(item.section, current);
    }

    return Array.from(groups.entries());
  }, [contentItems]);

  const handleFocusToggle = (enabled: boolean) => {
    setEyeTrackingEnabled(enabled);
    if (enabled) {
      setTimeout(() => {
        if (enabled) {
          setShowFocusAlert(true);
        }
      }, 10000);
    }
  };

  const handleResumeFocus = () => {
    setShowFocusAlert(false);
  };

  return (
    <div className="min-h-screen bg-[#F3F8FA]">
      <EyeTrackingOverlay isActive={eyeTrackingEnabled} onDismiss={() => {}} />

      <header className="sticky top-0 z-30 border-b border-[#D8E5E9] bg-white">
        <div className="mx-auto max-w-[1600px] px-6 py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <Link to="/student-dashboard">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Kembali
                </Button>
              </Link>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-bold text-[#0A1B45]">{courseData.title}</h1>
                  <Badge className="border-0 bg-[#0A1B45]/8 text-[#0A1B45]">
                    {selectedBatch.batchCode}
                  </Badge>
                  <Badge
                    className={
                      selectedBatch.admissionStatus === "Approved"
                        ? "border-0 bg-[#308279]/10 text-[#308279]"
                        : selectedBatch.admissionStatus === "Pending Review"
                          ? "border-0 bg-[#FCEFC7] text-[#7A5A00]"
                          : "border-0 bg-[#E8EEF9] text-[#21416B]"
                    }
                  >
                    {selectedBatch.admissionStatus}
                  </Badge>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-[#476074]">
                  <span>{selectedBatch.name}</span>
                  <span>•</span>
                  <span>{selectedBatch.periodLabel}</span>
                  <span>•</span>
                  <span>Tutor: {courseData.instructor}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-[#476074]">Progress cohort</div>
                <div className="font-bold text-[#308279]">
                  {courseData.completedItems}/{courseData.totalItems} item • {courseData.progress}%
                </div>
              </div>
              <div className="w-36">
                <Progress value={courseData.progress} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] gap-6 px-6 py-6 xl:grid-cols-[minmax(0,1.1fr)_420px]">
        <div className="space-y-6 self-start">
          <Card
            className="rounded-[1.75rem] border-[#D8E5E9] bg-white p-6 shadow-[0_18px_42px_rgba(10,27,69,0.06)]"
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#0A1B45]">Learning Workspace</h2>
                <p className="mt-2 max-w-3xl text-[#476074]">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem dolor reiciendis quae magnam! Magni, officia, deleniti autem doloribus odit, nemo atque eum sapiente iste vero vitae? Necessitatibus, nulla. Expedita repellendus sunt eveniet tenetur harum temporibus inventore sint assumenda. Voluptates, fugiat.
                </p>
              </div>
              <div className="rounded-2xl border border-[#D8E5E9] bg-[#F9FCFD] px-4 py-3 text-sm text-[#476074]">
                <span className="font-semibold text-[#0A1B45]">Catatan batch:</span> {selectedBatch.intakeWindow}
              </div>
            </div>
          </Card>

          <Card className="rounded-[1.75rem] border-[#D8E5E9] bg-white shadow-[0_18px_42px_rgba(10,27,69,0.06)]">
            <div className="border-b border-[#D8E5E9] px-6 py-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#0A1B45]">Daftar Konten Kelas</h2>
                  <p className="mt-1 text-sm text-[#476074]">
                    Materi pembelajaran, quiz, video, dan pertemuan.
                  </p>
                </div>
                <Badge className="border-0 bg-[#308279]/10 text-[#308279]">
                  {contentItems.length} items
                </Badge>
              </div>
            </div>

            <div className="space-y-6 px-6 py-6">
              {groupedItems.map(([section, items]) => (
                <section key={section}>
                  <div className="mb-3 flex items-center gap-3">
                    <h3 className="text-lg font-bold text-[#0A1B45]">{section}</h3>
                    <div className="h-px flex-1 bg-[#E5EEF1]" />
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#92A4AE]">
                      {items.length} items
                    </span>
                  </div>

                  <div className="space-y-3">
                    {items.map((item) => {
                      const badge = getKindBadge(item.kind);
                      return (
                        <button
                          key={item.id}
                          onClick={() => setSelectedContentId(item.id)}
                          className={`w-full rounded-[1.25rem] border p-4 text-left transition-all ${
                            selectedContentId === item.id
                              ? "border-[#308279] bg-[#F4FAF8] shadow-sm"
                              : "border-[#D8E5E9] bg-[#FCFEFE] hover:border-[#A8C6C0] hover:bg-white"
                          }`}
                        >
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div className="flex items-start gap-4">
                              <div
                                className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl ${
                                  item.kind === "video"
                                    ? "bg-[#0A1B45] text-white"
                                    : item.kind === "material"
                                      ? "bg-[#308279] text-white"
                                      : item.kind === "quiz"
                                        ? "bg-[#FCEFC7] text-[#7A5A00]"
                                        : "bg-[#E8EEF9] text-[#21416B]"
                                }`}
                              >
                                {item.kind === "video" ? (
                                  <PlayCircle className="h-5 w-5" />
                                ) : item.kind === "material" ? (
                                  <FileText className="h-5 w-5" />
                                ) : item.kind === "quiz" ? (
                                  <Target className="h-5 w-5" />
                                ) : (
                                  <Video className="h-5 w-5" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <div className="font-semibold text-[#0A1B45]">{item.title}</div>
                                  <Badge className={badge.className}>{badge.label}</Badge>
                                  {item.completed ? (
                                    <Badge className="border-0 bg-[#308279]/10 text-[#308279]">
                                      Selesai
                                    </Badge>
                                  ) : null}
                                </div>
                                <div className="mt-1 text-sm text-[#476074]">{item.meta}</div>
                                <p className="mt-2 text-sm leading-6 text-[#476074]">{item.description}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 lg:pl-6">
                              {item.completed ? (
                                <CheckCircle className="h-5 w-5 text-[#308279]" />
                              ) : (
                                <Circle className="h-5 w-5 text-[#92B7B0]" />
                              )}
                              <span className="text-sm font-semibold text-[#0A1B45]">
                                {item.actionLabel}
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="space-y-6 self-start xl:sticky xl:top-28">
          <Card
            ref={selectedInfoRef}
            className="rounded-[1.75rem] border-[#D8E5E9] bg-white p-6 shadow-[0_18px_42px_rgba(10,27,69,0.06)]"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#92A4AE]">
                  Selected Item
                </div>
                <h2 className="mt-2 text-2xl font-bold text-[#0A1B45]">{selectedContent.title}</h2>
              </div>
              <Badge className={getKindBadge(selectedContent.kind).className}>
                {getKindBadge(selectedContent.kind).label}
              </Badge>
            </div>

            <div className="mt-5 space-y-4">
              <div className="rounded-2xl bg-[#F3F8FA] p-4">
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#92A4AE]">
                  Location
                </div>
                <div className="mt-2 text-sm font-semibold text-[#0A1B45]">
                  {selectedContent.section}
                </div>
              </div>
              <div className="rounded-2xl bg-[#F3F8FA] p-4">
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#92A4AE]">
                  Info
                </div>
                <div className="mt-2 text-sm font-semibold text-[#0A1B45]">
                  {selectedContent.meta}
                </div>
              </div>
              <div className="rounded-2xl bg-[#FCFEFE] p-4">
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#92A4AE]">
                  Description
                </div>
                <p className="mt-2 text-sm leading-6 text-[#476074]">
                  {selectedContent.description}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {selectedContent.actionHref ? (
                <Link to={selectedContent.actionHref}>
                  <Button className="w-full bg-[#0A1B45] text-white hover:bg-[#308279]">
                    {selectedContent.actionLabel}
                  </Button>
                </Link>
              ) : (
                <Button className="w-full bg-[#0A1B45] text-white hover:bg-[#308279]">
                  {selectedContent.actionLabel}
                </Button>
              )}

              {selectedContent.downloadable ? (
                <Button
                  variant="outline"
                  className="w-full border-[#308279] text-[#308279] hover:bg-[#308279]/5"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Resource
                </Button>
              ) : null}
            </div>
          </Card>

          <Card className="rounded-[1.75rem] border-[#D8E5E9] bg-white p-6 shadow-[0_18px_42px_rgba(10,27,69,0.06)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-[#0A1B45]">Batch Access Info</h3>
                <p className="mt-2 text-sm leading-6 text-[#476074]">
                  Admin masih memantau peserta secara manual. Pastikan kamu hanya memakai batch
                  yang terdaftar dan menunggu approval jika status belum aktif.
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0A1B45] text-white">
                <Users className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-[#F3F8FA] px-4 py-3">
                <span className="text-sm text-[#476074]">Batch code</span>
                <span className="font-semibold text-[#0A1B45]">{selectedBatch.batchCode}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-[#F3F8FA] px-4 py-3">
                <span className="text-sm text-[#476074]">Admission</span>
                <span className="font-semibold text-[#0A1B45]">{selectedBatch.admissionStatus}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-[#F3F8FA] px-4 py-3">
                <span className="text-sm text-[#476074]">Enrollment deadline</span>
                <span className="font-semibold text-[#0A1B45]">{selectedBatch.enrollmentDeadline}</span>
              </div>
              <div className="rounded-xl border border-dashed border-[#D8E5E9] bg-[#FCFEFE] px-4 py-3 text-sm leading-6 text-[#476074]">
                Jika ada murid yang belum terverifikasi, akses batch bisa ditahan sampai admin
                menerima peserta tersebut satu per satu.
              </div>
            </div>
          </Card>
          

          <Card className="rounded-[1.75rem] border-[#D8E5E9] bg-white p-6 shadow-[0_18px_42px_rgba(10,27,69,0.06)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#308279] to-[#92B7B0]">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#0A1B45]">Focus Mode</span>
                    <Badge variant="outline" className="border-[#308279] text-[#308279]">
                      Beta
                    </Badge>
                  </div>
                  <p className="text-sm text-[#476074]">
                    Pantau fokus belajar saat membuka konten video atau materi.
                  </p>
                </div>
              </div>
              <Switch
                checked={eyeTrackingEnabled}
                onCheckedChange={handleFocusToggle}
                className="data-[state=checked]:bg-[#308279]"
              />
            </div>

            {eyeTrackingEnabled ? (
              <div className="mt-4 rounded-lg border border-[#308279]/20 bg-[#308279]/5 p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[#0A1B45]">92%</div>
                    <div className="text-xs text-[#476074]">Focus Score</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#308279]">3x</div>
                    <div className="text-xs text-[#476074]">Alert</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0A1B45]">24m</div>
                    <div className="text-xs text-[#476074]">Tracked</div>
                  </div>
                </div>
              </div>
            ) : null}
          </Card>
          </div>
        </div>
      </div>

      <WebcamPreview isActive={eyeTrackingEnabled} />
      <FocusAlertModal isOpen={showFocusAlert} onResume={handleResumeFocus} />
    </div>
  );
}
