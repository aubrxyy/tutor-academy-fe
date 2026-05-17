import type { LucideIcon } from "lucide-react";

export type TutorDashboardView =
  | "overview"
  | "meetings"
  | "materials"
  | "quizzes"
  | "analytics";

export type TutorMaterialTrack = "tutor-led" | "self-study";
export type TutorQuizStatus = "Published" | "Draft";
export type TutorQuizQuestionType = "multiple_answer" | "fill_answer";

export type TutorStat = {
  icon: LucideIcon;
  label: string;
  value: string;
  change?: string;
  color: string;
};

export type TutorMeetingSession = {
  id: number;
  classId: number;
  title: string;
  className: string;
  batchName: string;
  batchWindow: string;
  enrolledStudents: number;
  sortDateTime: string;
  date: string;
  startTime: string;
  endTime: string;
  attendance: number;
  topic: string;
  zoomLink: string;
  zoomOwner: string;
  status: "Completed" | "Scheduled";
};

export type TutorClassMaterial = {
  id: number;
  classId: number;
  title: string;
  className: string;
  sectionLabel: string;
  sectionTitle: string;
  type: TutorMaterialTrack;
  format: string;
  owner: string;
  support: string;
  tutorFocus: string;
  lastUpdated: string;
  status: string;
  tutorNoteStatus: string;
  tutorNotes: string;
  relatedSession: string;
  sessionPhase: string;
  adminAsset: string;
  tutorAsset: string;
  tutorAssetStatus: string;
};

export type TutorQuiz = {
  id: number;
  classId: number;
  title: string;
  description: string;
  status: TutorQuizStatus;
  assignedBatches: string[];
  opensAt: string;
  closesAt: string;
  questionCount: number;
  questions: TutorQuizQuestionDraft[];
};

export type TutorQuizQuestionOption = {
  id: number;
  text: string;
  isCorrect: boolean;
};

export type TutorQuizQuestionDraft = {
  id: number;
  prompt: string;
  type: TutorQuizQuestionType;
  explanation: string;
  options: TutorQuizQuestionOption[];
  acceptedAnswersText: string;
};

export type TutorQuizDraft = {
  title: string;
  description: string;
  status: TutorQuizStatus;
  assignedBatches: string[];
  opensAt: string;
  closesAt: string;
  questionCount: string;
  questions: TutorQuizQuestionDraft[];
};

export type TutorAssignedClassCard = {
  id: number;
  title: string;
  students: number;
  batches: number;
  nextLive: string;
  tutorDocs: number;
  adminVideos: number;
};

export type TutorChartPoint = {
  week: string;
  students: number;
};

export type TutorAttendancePoint = {
  name: string;
  value: number;
  color: string;
};

export type TutorSectionCopy = Record<
  TutorDashboardView,
  {
    title: string;
    description: string;
  }
>;
