import { useEffect, useMemo, useState } from "react";
import { BarChart3, BookOpen, CheckCircle2, FileText, HelpCircle, Video } from "lucide-react";
import { toast } from "sonner";

import DashboardSidebar from "../../components/navigation/DashboardSidebar";
import { Card } from "../../components/ui/card";
import { useAuth } from "../../auth/AuthContext";
import { useTutorPanelCourses } from "../../api/admin";
import { AnalyticsSection } from "./dashboard/AnalyticsSection";
import {
  createEmptyQuizDraft,
  createQuizOptionDraft,
  createQuizQuestionDraft,
  createTutorStats,
  initialAssignedClasses,
  initialClassMaterials,
  initialSessionAttendanceData,
  initialStudentEngagementData,
  initialTutorQuizzes,
  initialUpcomingSessions,
  tutorSectionCopy,
} from "./dashboard/data";
import { MaterialsSection } from "./dashboard/MaterialsSection";
import { MeetingsSection } from "./dashboard/MeetingsSection";
import { OverviewSection } from "./dashboard/OverviewSection";
import { QuizzesSection } from "./dashboard/QuizzesSection";
import type {
  TutorAssignedClassCard,
  TutorDashboardView,
  TutorMaterialTrack,
  TutorQuizDraft,
  TutorQuizQuestionDraft,
  TutorQuizQuestionType,
  TutorQuizStatus,
} from "./dashboard/types";

export default function TutorDashboardPage() {
  const { user } = useAuth();
  const teachingCourseIds = user?.teachingCourses ?? [];
  const { data: tutorCourseData, loading: isTutorCourseLoading } =
    useTutorPanelCourses(teachingCourseIds);

  const [activeView, setActiveView] = useState<TutorDashboardView>("overview");
  const [isMaterialDialogOpen, setIsMaterialDialogOpen] = useState(false);
  const [activeMaterialTrack, setActiveMaterialTrack] = useState<TutorMaterialTrack>("tutor-led");
  const [activeMaterialCourse, setActiveMaterialCourse] = useState<string | null>(null);
  const [activeMeetingCourse, setActiveMeetingCourse] = useState<"all" | string>("all");
  const [activeQuizCourse, setActiveQuizCourse] = useState<string | null>(null);
  const [isQuizComposerOpen, setIsQuizComposerOpen] = useState(false);
  const [editingQuizId, setEditingQuizId] = useState<number | null>(null);
  const [quizzes, setQuizzes] = useState(initialTutorQuizzes);
  const [quizDraft, setQuizDraft] = useState<TutorQuizDraft>(createEmptyQuizDraft());

  const stats = useMemo(
    () =>
      createTutorStats(
        isTutorCourseLoading
          ? "..."
          : String(tutorCourseData?.courses?.nodes.length ?? teachingCourseIds.length),
      ),
    [isTutorCourseLoading, teachingCourseIds.length, tutorCourseData],
  );

  const backendAssignedClasses = useMemo<TutorAssignedClassCard[]>(
    () =>
      (tutorCourseData?.courses?.nodes ?? []).map((course) => ({
        id: Number(course.id),
        title: course.title,
        students: 0,
        batches: 1,
        nextLive: "Belum ada jadwal baru",
        tutorDocs: course.totalSections,
        adminVideos: course.totalLectures,
      })),
    [tutorCourseData],
  );

  const assignedClassCards =
    backendAssignedClasses.length > 0 ? backendAssignedClasses : initialAssignedClasses;

  const tutorLedMaterials = useMemo(
    () => initialClassMaterials.filter((material) => material.type === "tutor-led"),
    [],
  );
  const selfStudyMaterials = useMemo(
    () => initialClassMaterials.filter((material) => material.type === "self-study"),
    [],
  );

  const visibleTrackMaterials =
    activeMaterialTrack === "tutor-led" ? tutorLedMaterials : selfStudyMaterials;
  const visibleMaterials =
    activeMaterialCourse === null
      ? visibleTrackMaterials
      : visibleTrackMaterials.filter((material) => String(material.classId) === activeMaterialCourse);

  const visibleMaterialsBySection = useMemo(() => {
    const sectionMap = new Map<
      string,
      {
        key: string;
        sectionLabel: string;
        sectionTitle: string;
        materials: typeof visibleMaterials;
      }
    >();

    visibleMaterials.forEach((material) => {
      const key = `${material.sectionLabel}-${material.sectionTitle}`;
      const existing = sectionMap.get(key);

      if (existing) {
        existing.materials.push(material);
        return;
      }

      sectionMap.set(key, {
        key,
        sectionLabel: material.sectionLabel,
        sectionTitle: material.sectionTitle,
        materials: [material],
      });
    });

    return Array.from(sectionMap.values());
  }, [visibleMaterials]);

  const meetingCourseOptions = useMemo(
    () =>
      Array.from(
        new Map(
          initialUpcomingSessions.map((session) => [
            String(session.classId),
            { id: String(session.classId), title: session.className },
          ]),
        ).values(),
      ),
    [],
  );

  const visibleMeetings = useMemo(() => {
    const filtered =
      activeMeetingCourse === "all"
        ? initialUpcomingSessions
        : initialUpcomingSessions.filter((session) => String(session.classId) === activeMeetingCourse);

    return [...filtered].sort(
      (left, right) => new Date(right.sortDateTime).getTime() - new Date(left.sortDateTime).getTime(),
    );
  }, [activeMeetingCourse]);

  const visibleQuizzes =
    activeQuizCourse === null
      ? quizzes
      : quizzes.filter((quiz) => String(quiz.classId) === activeQuizCourse);

  const quizzesByCourse = useMemo(
    () =>
      assignedClassCards.map((item) => ({
        ...item,
        totalQuizzes: quizzes.filter((quiz) => quiz.classId === item.id).length,
      })),
    [assignedClassCards, quizzes],
  );

  const resetQuizDraft = () => {
    setQuizDraft(createEmptyQuizDraft());
    setEditingQuizId(null);
    setIsQuizComposerOpen(false);
  };

  const handleEditQuiz = (quizId: number) => {
    const quiz = quizzes.find((entry) => entry.id === quizId);
    if (!quiz) return;

    setEditingQuizId(quiz.id);
    setQuizDraft({
      title: quiz.title,
      description: quiz.description,
      status: quiz.status,
      assignedBatches: quiz.assignedBatches,
      opensAt: quiz.opensAt,
      closesAt: quiz.closesAt,
      questionCount: String(quiz.questionCount),
      questions: quiz.questions,
    });
    setIsQuizComposerOpen(true);
  };
  const updateQuizQuestion = (
    questionId: number,
    updater: (question: TutorQuizQuestionDraft) => TutorQuizQuestionDraft,
  ) => {
    setQuizDraft((current) => ({
      ...current,
      questions: current.questions.map((question) =>
        question.id === questionId ? updater(question) : question,
      ),
    }));
  };
  const addQuizQuestion = () => {
    setQuizDraft((current) => ({
      ...current,
      questions: [...current.questions, createQuizQuestionDraft(Date.now())],
    }));
  };
  const removeQuizQuestion = (questionId: number) => {
    setQuizDraft((current) => ({
      ...current,
      questions:
        current.questions.length === 1
          ? current.questions
          : current.questions.filter((question) => question.id !== questionId),
    }));
  };
  const handleQuizQuestionTypeChange = (questionId: number, nextType: TutorQuizQuestionType) => {
    updateQuizQuestion(questionId, (question) => ({
      ...question,
      type: nextType,
      options:
        nextType === "multiple_answer"
          ? question.options.length > 0
            ? question.options
            : [createQuizOptionDraft(1), createQuizOptionDraft(2)]
          : [],
      acceptedAnswersText: nextType === "fill_answer" ? question.acceptedAnswersText : "",
    }));
  };
  const addQuizQuestionOption = (questionId: number) => {
    updateQuizQuestion(questionId, (question) => ({
      ...question,
      options: [...question.options, createQuizOptionDraft(Date.now())],
    }));
  };
  const removeQuizQuestionOption = (questionId: number, optionId: number) => {
    updateQuizQuestion(questionId, (question) => ({
      ...question,
      options:
        question.options.length <= 2
          ? question.options
          : question.options.filter((option) => option.id !== optionId),
    }));
  };

  const handleDeleteQuiz = (quizId: number) => {
    setQuizzes((current) => current.filter((quiz) => quiz.id !== quizId));
    if (editingQuizId === quizId) {
      resetQuizDraft();
    }
    toast.success("Quiz deleted");
  };

  const handleQuizSubmit = () => {
    if (!activeQuizCourse) {
      toast.error("Choose a class first.");
      return;
    }
    if (!quizDraft.title.trim() || !quizDraft.description.trim()) {
      toast.error("Complete the quiz title and description.");
      return;
    }
    if (quizDraft.assignedBatches.length === 0) {
      toast.error("Assign at least one batch.");
      return;
    }
    if (!quizDraft.opensAt || !quizDraft.closesAt) {
      toast.error("Set opened and closed time.");
      return;
    }
    if (quizDraft.questions.length === 0) {
      toast.error("Add at least one question.");
      return;
    }

    const payload = {
      id: editingQuizId ?? Date.now(),
      classId: Number(activeQuizCourse),
      title: quizDraft.title.trim(),
      description: quizDraft.description.trim(),
      status: quizDraft.status,
      assignedBatches: quizDraft.assignedBatches,
      opensAt: quizDraft.opensAt,
      closesAt: quizDraft.closesAt,
      questionCount: quizDraft.questions.length,
      questions: quizDraft.questions,
    };

    if (editingQuizId) {
      setQuizzes((current) => current.map((quiz) => (quiz.id === editingQuizId ? payload : quiz)));
      toast.success("Quiz updated");
    } else {
      setQuizzes((current) => [...current, payload]);
      toast.success("Quiz created");
    }

    resetQuizDraft();
  };

  const handleMaterialSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsMaterialDialogOpen(false);
    toast.success("Tutor note added", {
      description: "Catatan tutor berhasil ditambahkan ke materi yang dikelola admin.",
    });
  };

  useEffect(() => {
    if (activeView === "materials") return;
    setActiveMaterialCourse(null);
  }, [activeView]);

  useEffect(() => {
    if (activeView === "meetings") return;
    setActiveMeetingCourse("all");
  }, [activeView]);

  useEffect(() => {
    if (activeView === "quizzes") return;
    setActiveQuizCourse(null);
    resetQuizDraft();
  }, [activeView]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeView]);

  const tutorNavItems = [
    { label: "Overview", icon: BookOpen, active: activeView === "overview", onClick: () => setActiveView("overview") },
    { label: "Live meetings", icon: Video, active: activeView === "meetings", onClick: () => setActiveView("meetings") },
    { label: "Materials", icon: FileText, active: activeView === "materials", onClick: () => setActiveView("materials") },
    { label: "Quizzes", icon: CheckCircle2, active: activeView === "quizzes", onClick: () => setActiveView("quizzes") },
    { label: "Analytics", icon: BarChart3, active: activeView === "analytics", onClick: () => setActiveView("analytics") },
    { label: "Help Center", to: "/help-faq?role=tutor", icon: HelpCircle, exact: true },
  ];

  return (
    <div className="min-h-screen bg-[#F3F8FA] lg:flex">
      <DashboardSidebar roleLabel="Tutor" navItems={tutorNavItems} />

      <main className="min-w-0 flex-1">
        <header className="relative overflow-hidden bg-gradient-to-br from-[#071735] via-[#0A1B45] to-[#308279] text-white">
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-white/15" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8">
              <div className="mt-5 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
                  {tutorSectionCopy[activeView].title}
                </h1>
                <p className="mt-3 max-w-2xl leading-7 text-white/80">
                  {tutorSectionCopy[activeView].description}
                </p>
              </div>
            </div>

            {activeView === "overview" ? (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                {stats.map((stat) => (
                  <Card
                    key={stat.label}
                    className="border-white/15 bg-white/10 p-5 shadow-lg backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <div
                      className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}
                    >
                      <stat.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="mb-1 text-3xl font-bold tracking-[-0.03em] text-white">{stat.value}</div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                    {stat.change ? <div className="mt-1 text-xs text-white/60">{stat.change}</div> : null}
                  </Card>
                ))}
              </div>
            ) : null}
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {activeView === "overview" ? (
            <OverviewSection
              assignedClassCards={assignedClassCards}
              onOpenMeetings={(courseId) => {
                setActiveView("meetings");
                setActiveMeetingCourse(courseId);
              }}
              onOpenMaterials={(courseId) => {
                setActiveView("materials");
                setActiveMaterialCourse(courseId);
              }}
              onOpenQuizzes={(courseId) => {
                setActiveView("quizzes");
                setActiveQuizCourse(courseId);
              }}
            />
          ) : null}

          {activeView === "meetings" ? (
            <MeetingsSection
              activeMeetingCourse={activeMeetingCourse}
              meetingCourseOptions={meetingCourseOptions}
              visibleMeetings={visibleMeetings}
              onMeetingCourseChange={setActiveMeetingCourse}
            />
          ) : null}

          {activeView === "materials" ? (
            <MaterialsSection
              activeMaterialCourse={activeMaterialCourse}
              activeMaterialTrack={activeMaterialTrack}
              assignedClassCards={assignedClassCards}
              classMaterials={initialClassMaterials}
              isMaterialDialogOpen={isMaterialDialogOpen}
              visibleMaterials={visibleMaterials}
              visibleMaterialsBySection={visibleMaterialsBySection}
              onBackToClasses={() => setActiveMaterialCourse(null)}
              onMaterialCourseChange={setActiveMaterialCourse}
              onMaterialDialogChange={setIsMaterialDialogOpen}
              onMaterialSubmit={handleMaterialSubmit}
              onMaterialTrackChange={setActiveMaterialTrack}
            />
          ) : null}

          {activeView === "quizzes" ? (
            <QuizzesSection
              activeQuizCourse={activeQuizCourse}
              assignedClassCards={assignedClassCards}
              editingQuizId={editingQuizId}
              isQuizComposerOpen={isQuizComposerOpen}
              quizDraft={quizDraft}
              quizzesByCourse={quizzesByCourse}
              upcomingSessions={initialUpcomingSessions}
              visibleQuizzes={visibleQuizzes}
              onBackToClasses={() => {
                setActiveQuizCourse(null);
                resetQuizDraft();
              }}
              onDeleteQuiz={handleDeleteQuiz}
              onEditQuiz={handleEditQuiz}
              onOpenCourse={setActiveQuizCourse}
              onOpenQuizComposer={() => {
                setEditingQuizId(null);
                setQuizDraft(createEmptyQuizDraft());
                setIsQuizComposerOpen(true);
              }}
              onQuizDraftChange={setQuizDraft}
              onQuizQuestionChange={updateQuizQuestion}
              onQuizQuestionTypeChange={handleQuizQuestionTypeChange}
              onAddQuizQuestion={addQuizQuestion}
              onRemoveQuizQuestion={removeQuizQuestion}
              onAddQuizQuestionOption={addQuizQuestionOption}
              onRemoveQuizQuestionOption={removeQuizQuestionOption}
              onQuizSubmit={handleQuizSubmit}
              onResetQuizDraft={resetQuizDraft}
            />
          ) : null}

          {activeView === "analytics" ? (
            <AnalyticsSection
              sessionAttendanceData={initialSessionAttendanceData}
              studentEngagementData={initialStudentEngagementData}
            />
          ) : null}
        </div>
      </main>
    </div>
  );
}
