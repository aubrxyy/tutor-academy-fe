import { useEffect, useMemo, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Alignment,
  Autoformat,
  BlockQuote,
  Bold,
  ClassicEditor,
  Code,
  CodeBlock,
  type EditorConfig,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalLine,
  Indent,
  Italic,
  Link as CKEditorLink,
  List,
  ListProperties,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  SelectAll,
  ShowBlocks,
  SourceEditing,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Style,
  Subscript,
  Superscript,
  Table,
  TableCellProperties,
  TableProperties,
  TableToolbar,
  TodoList,
  Underline,
  Undo,
  WordCount,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import "./course-edit-ckeditor.css";
import { useMutation, useQuery } from "@apollo/client/react";
import { CombinedGraphQLErrors } from "@apollo/client/errors";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import {
  ArrowLeft,
  CalendarDays,
  ClipboardCheck,
  FileText,
  Pencil,
  Plus,
  Save,
  Trash2,
  Upload,
  Video,
} from "lucide-react";
import AdminSidebar from "../../../components/navigation/AdminSidebar";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Textarea } from "../../../components/ui/textarea";
import { toast } from "sonner";
import { useTutorUsers } from "../../../api/admin";
import { CREATE_BATCH, useCourseBatches, type Batch } from "../../../api/batches";
import {
  CREATE_COURSE,
  GET_COURSE_BY_ID,
  UPDATE_COURSE,
  getCoursePackagePricing,
  setCoursePackagePricing,
  type Course,
  type CourseInput,
  type CourseLevel,
  type CourseStatus,
} from "../../../api/courses";
import {
  CREATE_LECTURE,
  CREATE_SECTION,
  DELETE_LECTURE,
  DELETE_SECTION,
  GET_COURSE_CURRICULUM,
  UPDATE_LECTURE,
  UPDATE_SECTION,
  useCourseCurriculum,
  type Lecture,
  type Section,
} from "../../../api/curriculum";

type EditorTab = "basic" | "curriculum" | "pricing" | "batches" | "quizzes" | "live";
type CurriculumItemType = "video" | "material";
type CurriculumSourceType = "upload" | "link" | "editor";

type CurriculumItem = {
  id: string;
  title: string;
  type: CurriculumItemType;
  description: string;
  sourceType: CurriculumSourceType;
  sourceValue: string;
  duration: string;
  status: "Published" | "Draft";
};

type CurriculumSection = {
  id: string;
  title: string;
  backendType: "VIDEO" | "ARTICLE";
  items: CurriculumItem[];
};

type SectionDraft = {
  title: string;
};

type ItemDraft = {
  title: string;
  type: CurriculumItemType;
  description: string;
  sourceType: CurriculumSourceType;
  sourceValue: string;
  duration: string;
};

type QuizQuestionType = "multiple_answer" | "fill_answer";
type QuizStatus = "Published" | "Draft";

type QuizQuestionOption = {
  id: number;
  text: string;
  isCorrect: boolean;
};

type QuizQuestion = {
  id: number;
  prompt: string;
  type: QuizQuestionType;
  options: QuizQuestionOption[];
  acceptedAnswers: string[];
  explanation: string;
};

type CourseQuiz = {
  id: number;
  title: string;
  description: string;
  status: QuizStatus;
  assignedBatches: string[];
  opensAt: string;
  closesAt: string;
  questions: QuizQuestion[];
};

type QuizQuestionDraft = {
  id: number;
  prompt: string;
  type: QuizQuestionType;
  options: QuizQuestionOption[];
  acceptedAnswersText: string;
  explanation: string;
};

type QuizDraft = {
  title: string;
  description: string;
  status: QuizStatus;
  assignedBatches: string[];
  opensAt: string;
  closesAt: string;
  questions: QuizQuestionDraft[];
};

const courseStatusOptions: Array<{ value: CourseStatus; label: string }> = [
  { value: "DRAFT", label: "Draft" },
  { value: "PUBLISHED", label: "Published" },
  { value: "ARCHIVED", label: "Archived" },
];

const courseLevelOptions: Array<{ value: CourseLevel; label: string }> = [
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "ADVANCED", label: "Advanced" },
];

type CourseByIdData = {
  courses: {
    nodes: Course[];
  } | null;
};

type CourseFormState = {
  title: string;
  subtitle: string;
  description: string;
  totalDuration: string;
  price: string;
  alaCartePrice: string;
  isFree: boolean;
  level: CourseLevel;
  status: CourseStatus;
};

type CourseExtraFormState = {
  category: string;
  thumbnail: string;
};

type BatchDurationUnit = "day" | "week" | "month";

type BatchDraft = {
  id: string;
  tutorId: string;
  startDate: string;
  durationValue: string;
  durationUnit: BatchDurationUnit;
  capacity: string;
};

type EditBatchGenerator = {
  firstBatchStartDate: string;
  numberOfBatches: string;
  intervalValue: string;
  intervalUnit: "day" | "week";
  quotaPerBatch: string;
};

type LiveSessionDraft = {
  id: number;
  batchName: string;
  tutorId: string;
  sessionDate: string;
  startsAt: string;
  endsAt: string;
  platform: "Zoom" | "Google Meet" | "LMS Meeting Room";
  meetingLink: string;
  topic: string;
};

type QuizComposerStep = "setup" | "questions";

const emptySectionDraft: SectionDraft = {
  title: "",
};

const emptyItemDraft: ItemDraft = {
  title: "",
  type: "video",
  description: "",
  sourceType: "link",
  sourceValue: "",
  duration: "15",
};

const createOptionDraft = (id: number): QuizQuestionOption => ({
  id,
  text: "",
  isCorrect: false,
});

const createQuestionDraft = (id: number): QuizQuestionDraft => ({
  id,
  prompt: "",
  type: "multiple_answer",
  options: [createOptionDraft(id + 1), createOptionDraft(id + 2)],
  acceptedAnswersText: "",
  explanation: "",
});

const emptyQuizDraft = (): QuizDraft => ({
  title: "",
  description: "",
  status: "Draft",
  assignedBatches: [],
  opensAt: "",
  closesAt: "",
  questions: [createQuestionDraft(Date.now())],
});

const demoCourseExtra: CourseExtraFormState = {
  category: "Computer Science",
  thumbnail: "Data Structures cohort thumbnail",
};

const materialEditorConfig: EditorConfig = {
  licenseKey: "GPL",
  plugins: [
    Essentials,
    Paragraph,
    Heading,
    Style,
    Autoformat,
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Subscript,
    Superscript,
    Code,
    FontFamily,
    FontSize,
    FontColor,
    FontBackgroundColor,
    Alignment,
    Indent,
    BlockQuote,
    CodeBlock,
    CKEditorLink,
    List,
    ListProperties,
    TodoList,
    HorizontalLine,
    Table,
    TableProperties,
    TableCellProperties,
    TableToolbar,
    MediaEmbed,
    PasteFromOffice,
    Highlight,
    FindAndReplace,
    RemoveFormat,
    SelectAll,
    ShowBlocks,
    SourceEditing,
    SpecialCharacters,
    SpecialCharactersEssentials,
    SpecialCharactersArrows,
    SpecialCharactersText,
    SpecialCharactersMathematical,
    SpecialCharactersLatin,
    SpecialCharactersCurrency,
    WordCount,
    Undo,
  ],
  toolbar: {
    items: [
      "undo",
      "redo",
      "|",
      "findAndReplace",
      "selectAll",
      "showBlocks",
      "|",
      "heading",
      "style",
      "|",
      "fontFamily",
      "fontSize",
      "fontColor",
      "fontBackgroundColor",
      "highlight",
      "|",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "subscript",
      "superscript",
      "code",
      "removeFormat",
      "|",
      "alignment",
      "|",
      "numberedList",
      "bulletedList",
      "todoList",
      "outdent",
      "indent",
      "|",
      "link",
      "insertTable",
      "mediaEmbed",
      "blockQuote",
      "codeBlock",
      "horizontalLine",
      "specialCharacters",
      "|",
      "sourceEditing",
    ],
    shouldNotGroupWhenFull: true,
  },
  menuBar: {
    isVisible: true,
  },
  heading: {
    options: [
      { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
      { model: "heading1", view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
      { model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
      { model: "heading3", view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
    ],
  },
  fontFamily: {
    options: [
      "default",
      "Arial, Helvetica, sans-serif",
      "Georgia, serif",
      "Inter, sans-serif",
      "Merriweather, serif",
      "Poppins, sans-serif",
      "Roboto, sans-serif",
    ],
    supportAllValues: true,
  },
  fontSize: {
    options: [10, 12, 14, "default", 18, 20, 24, 30, 36],
    supportAllValues: true,
  },
  style: {
    definitions: [
      {
        name: "Lead paragraph",
        element: "p",
        classes: ["material-lead"],
      },
      {
        name: "Info callout",
        element: "p",
        classes: ["material-callout"],
      },
      {
        name: "Data table",
        element: "table",
        classes: ["material-table"],
      },
    ],
  },
  list: {
    properties: {
      styles: true,
      startIndex: true,
      reversed: true,
    },
  },
  table: {
    contentToolbar: [
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "toggleTableCaption",
      "tableProperties",
      "tableCellProperties",
    ],
  },
  mediaEmbed: {
    previewsInData: true,
  },
};

function getPlainTextFromHtml(value: string) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function sanitizePriceInput(value: string) {
  return value.replace(/\D/g, "");
}

function formatPriceInput(value: string) {
  const digits = sanitizePriceInput(value);
  if (!digits) return "";

  return Number(digits).toLocaleString("id-ID");
}

function extractYouTubeVideoId(value: string) {
  const trimmed = value.trim();

  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);

    if (url.hostname.includes("youtu.be")) {
      return url.pathname.split("/").filter(Boolean)[0] ?? null;
    }

    if (url.hostname.includes("youtube.com")) {
      if (url.pathname === "/watch") {
        return url.searchParams.get("v");
      }

      const parts = url.pathname.split("/").filter(Boolean);
      const embedIndex = parts.findIndex((part) => part === "embed" || part === "shorts");

      if (embedIndex >= 0) {
        return parts[embedIndex + 1] ?? null;
      }
    }
  } catch {
    return /^[a-zA-Z0-9_-]{11}$/.test(trimmed) ? trimmed : null;
  }

  return /^[a-zA-Z0-9_-]{11}$/.test(trimmed) ? trimmed : null;
}

function buildYouTubeUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

function durationToIso8601(minutes: number): string {
  if (minutes <= 0) return "PT1M";
  return `PT${Math.round(minutes)}M`;
}

function iso8601ToDurationMinutes(iso: string): string {
  if (!iso) return "15";
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "15";
  const hours = match[1] ? parseInt(match[1], 10) : 0;
  const mins = match[2] ? parseInt(match[2], 10) : 0;
  const secs = match[3] ? parseInt(match[3], 10) : 0;
  const totalMinutes = hours * 60 + mins + (secs > 0 ? 1 : 0);
  return String(totalMinutes);
}

function itemTypeToSectionType(type: CurriculumItemType) {
  return type === "video" ? ("VIDEO" as const) : ("ARTICLE" as const);
}

function sectionTypeToItemType(type: Section["type"]): CurriculumItemType {
  return type === "VIDEO" ? "video" : "material";
}

function mapBackendCurriculum(sections: Section[], lectures: Lecture[]): CurriculumSection[] {
  return sections.map((section) => {
    const sectionItemType = sectionTypeToItemType(section.type);
    const items = lectures
      .filter((lecture) => lecture.sectionId === section.id)
      .sort((first, second) => first.order - second.order)
      .map<CurriculumItem>((lecture) => {
        const itemType: CurriculumItemType = lecture.youtubeEmbedId ? "video" : sectionItemType;

        return {
          id: lecture.id,
          title: lecture.title,
          type: itemType,
          description: lecture.content,
          sourceType: itemType === "material" ? "editor" : "link",
          sourceValue: itemType === "material" ? lecture.content : lecture.youtubeEmbedId,
          duration: iso8601ToDurationMinutes(lecture.duration),
          status: "Published",
        };
      });

    return {
      id: section.id,
      title: section.title,
      backendType: section.type === "VIDEO" ? "VIDEO" : "ARTICLE",
      items,
    };
  });
}

function getItemBadge(type: CurriculumItemType) {
  switch (type) {
    case "video":
      return {
        label: "Video",
        className: "border-0 bg-[#0A1B45]/8 text-[#0A1B45]",
        icon: Video,
      };
    case "material":
      return {
        label: "Material",
        className: "border-0 bg-[#308279]/10 text-[#308279]",
        icon: FileText,
      };
  }
}

function createEmptyBatchDraft(index = 0): BatchDraft {
  return {
    id: `local-batch-${Date.now()}-${index}`,
    tutorId: "",
    startDate: "",
    durationValue: "1",
    durationUnit: "week",
    capacity: "20",
  };
}

function addDurationToDate(startDate: string, value: number, unit: BatchDurationUnit) {
  const date = new Date(`${startDate}T00:00:00`);

  if (unit === "day") {
    date.setDate(date.getDate() + value);
  } else if (unit === "week") {
    date.setDate(date.getDate() + value * 7);
  } else {
    date.setMonth(date.getMonth() + value);
  }

  return date.toISOString();
}

function formatDateInputValue(value: string) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

function mapBatchToDraft(batch: Batch, fallbackTutorId = ""): BatchDraft {
  const startDate = formatDateInputValue(batch.startDate);
  const start = new Date(batch.startDate);
  const end = new Date(batch.endDate);
  const durationInDays = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86_400_000));

  return {
    id: batch.id,
    tutorId: batch.tutorId ?? fallbackTutorId,
    startDate,
    durationValue: String(durationInDays),
    durationUnit: "day",
    capacity: String(batch.capacity),
  };
}

function getDerivedCourseTutorIds(batchDrafts: BatchDraft[]): string[] {
  return Array.from(new Set(batchDrafts.map((batch) => batch.tutorId).filter(Boolean)));
}

function formatCourseTutors(tutorIds: string[], tutorOptions: Array<{ id: string; name: string; username: string }>): string {
  if (tutorIds.length === 0) return "No tutors assigned";
  
  const tutorNames = tutorIds
    .map((id) => tutorOptions.find((t) => t.id === id)?.name || "Unknown")
    .filter(Boolean);
  
  return tutorNames.join(", ");
}

function formatSaveError(error: unknown) {
  const formatGraphQLError = (entry: {
    message?: string;
    extensions?: Record<string, unknown> | null;
    path?: readonly (string | number)[] | null;
  }) => {
    const code = typeof entry.extensions?.code === "string" ? entry.extensions.code : "NO_CODE";
    const path = entry.path?.length ? ` path: ${entry.path.join(".")}` : "";
    return `[${code}] ${entry.message ?? "GraphQL error"}${path}`;
  };

  if (CombinedGraphQLErrors.is(error)) {
    return error.errors.map(formatGraphQLError).join("; ");
  }

  if (error && typeof error === "object") {
    const maybeApolloError = error as {
      graphQLErrors?: Array<{
        message?: string;
        extensions?: Record<string, unknown> | null;
        path?: readonly (string | number)[] | null;
      }>;
      networkError?: {
        message?: string;
        result?: {
          errors?: Array<{
            message?: string;
            extensions?: Record<string, unknown> | null;
            path?: readonly (string | number)[] | null;
          }>;
        };
      };
      cause?: unknown;
    };

    if (maybeApolloError.graphQLErrors?.length) {
      return maybeApolloError.graphQLErrors.map(formatGraphQLError).join("; ");
    }

    if (maybeApolloError.networkError?.result?.errors?.length) {
      return maybeApolloError.networkError.result.errors.map(formatGraphQLError).join("; ");
    }

    if (maybeApolloError.networkError?.message) {
      return maybeApolloError.networkError.message;
    }

    if (maybeApolloError.cause && maybeApolloError.cause !== error) {
      return formatSaveError(maybeApolloError.cause);
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Please try again.";
}

export default function CourseEditPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const wordCountContainersRef = useRef<Record<string, HTMLDivElement | null>>({});
  const isNewClass = courseId === "new";
  const initialTab = searchParams.get("tab");
  const activeTab: EditorTab =
    initialTab === "curriculum" || initialTab === "videos"
      ? "curriculum"
      : initialTab === "quizzes"
        ? "quizzes"
        : initialTab === "live"
          ? "live"
          : initialTab === "pricing"
            ? "pricing"
            : initialTab === "batches"
              ? "batches"
              : "basic";
  const { data: tutorUsersData, loading: isTutorUsersLoading } = useTutorUsers();
  const { data: courseData, loading: isCourseLoading } = useQuery<CourseByIdData>(
    GET_COURSE_BY_ID,
    {
      variables: { courseId: courseId ?? "" },
      skip: isNewClass || !courseId,
      fetchPolicy: "cache-and-network",
    },
  );
  const {
    data: curriculumData,
    loading: isCurriculumLoading,
    refetch: refetchCurriculum,
  } = useCourseCurriculum(isNewClass ? undefined : courseId);
  const { data: batchData, loading: isBatchesLoading } = useCourseBatches(isNewClass ? undefined : courseId);
  const [createCourse, { loading: isCreatingCourse }] = useMutation(CREATE_COURSE);
  const [updateCourse, { loading: isUpdatingCourse }] = useMutation(UPDATE_COURSE);
  const [createBatch, { loading: isCreatingBatch }] = useMutation(CREATE_BATCH);
  const [createSection, { loading: isCreatingSectionRequest }] = useMutation(CREATE_SECTION);
  const [updateSection, { loading: isUpdatingSectionRequest }] = useMutation(UPDATE_SECTION);
  const [deleteSection, { loading: isDeletingSectionRequest }] = useMutation(DELETE_SECTION);
  const [createLecture, { loading: isCreatingLectureRequest }] = useMutation(CREATE_LECTURE);
  const [updateLecture, { loading: isUpdatingLectureRequest }] = useMutation(UPDATE_LECTURE);
  const [deleteLecture, { loading: isDeletingLectureRequest }] = useMutation(DELETE_LECTURE);
  const tutorOptions = tutorUsersData?.users?.nodes ?? [];
  const isSavingCourse = isCreatingCourse || isUpdatingCourse || isCreatingBatch;
  const isSavingSection =
    isCreatingSectionRequest || isUpdatingSectionRequest || isDeletingSectionRequest;
  const isSavingLecture =
    isCreatingLectureRequest || isUpdatingLectureRequest || isDeletingLectureRequest;

  const [classData, setClassData] = useState<CourseFormState>({
    title: isNewClass ? "" : "Data Structures Intensive",
    subtitle: isNewClass ? "" : "Interview-ready algorithms and live mentoring",
    description: isNewClass
      ? ""
      : "A practical class covering arrays, linked lists, recursion, and problem-solving patterns with guided tutor sessions.",
    totalDuration: isNewClass ? "" : "120",
    price: isNewClass ? "" : "499000",
    alaCartePrice: "",
    isFree: false,
    level: "BEGINNER",
    status: "DRAFT",
  });
  const [courseExtra, setCourseExtra] = useState<CourseExtraFormState>(demoCourseExtra);
  const [batchDrafts, setBatchDrafts] = useState<BatchDraft[]>([createEmptyBatchDraft()]);
  const [editBatchGenerator, setEditBatchGenerator] = useState<EditBatchGenerator>({
    firstBatchStartDate: "",
    numberOfBatches: "2",
    intervalValue: "1",
    intervalUnit: "week",
    quotaPerBatch: "20",
  });
  const batchOptions = batchDrafts.map((batch, index) => `Batch ${index + 1}`);


  const [quizzes, setQuizzes] = useState<CourseQuiz[]>(
    isNewClass
      ? []
      : [
          {
            id: 1,
            title: "Array & Linked List Quiz",
            description: "Quiz umum untuk memastikan pemahaman siswa siap lanjut ke section berikutnya.",
            status: "Draft",
            assignedBatches: ["Batch 1"],
            opensAt: "2026-05-12T09:00",
            closesAt: "2026-05-15T21:00",
            questions: [
              {
                id: 1,
                prompt: "Manakah struktur data yang mendukung insert di head dalam O(1)?",
                type: "multiple_answer",
                options: [
                  { id: 11, text: "Linked list", isCorrect: true },
                  { id: 12, text: "Array statis", isCorrect: false },
                  { id: 13, text: "Stack", isCorrect: true },
                ],
                acceptedAnswers: [],
                explanation: "Linked list dan stack sama-sama bisa insert di head/top dalam O(1).",
              },
              {
                id: 2,
                prompt: "Isi istilah untuk kompleksitas binary search.",
                type: "fill_answer",
                options: [],
                acceptedAnswers: ["o(log n)", "log n", "logarithmic"],
                explanation: "Binary search memiliki kompleksitas waktu logaritmik.",
              },
            ],
          },
        ],
  );

  const [sections, setSections] = useState<CurriculumSection[]>([]);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingQuizId, setEditingQuizId] = useState<number | null>(null);
  const [isCreatingSection, setIsCreatingSection] = useState(isNewClass);
  const [sectionDraft, setSectionDraft] = useState<SectionDraft>(emptySectionDraft);
  const [itemDraft, setItemDraft] = useState<ItemDraft>(emptyItemDraft);
  const [quizDraft, setQuizDraft] = useState<QuizDraft>(emptyQuizDraft);
  const [isItemComposerOpen, setIsItemComposerOpen] = useState(false);
  const [isQuizComposerOpen, setIsQuizComposerOpen] = useState(isNewClass);
  const [quizComposerStep, setQuizComposerStep] = useState<QuizComposerStep>("setup");
  const [liveSessions, setLiveSessions] = useState<LiveSessionDraft[]>([
    {
      id: 1,
      batchName: "Batch 1",
      tutorId: "",
      sessionDate: "",
      startsAt: "",
      endsAt: "",
      platform: "Zoom",
      meetingLink: "",
      topic: "",
    },
  ]);
  const [editPackageEnabled, setEditPackageEnabled] = useState({
    videoOnly: true,
    articleOnly: true,
    videoArticle: true,
    live: true,
  });
  const [isUploadDragActive, setIsUploadDragActive] = useState(false);
  const tutorPackagePrice = classData.isFree ? 0 : Number(sanitizePriceInput(classData.price)) || 0;
  const alaCartePrice = classData.isFree ? 0 : Number(sanitizePriceInput(classData.alaCartePrice)) || 0;
  const isLiveSessionActive = !classData.isFree && tutorPackagePrice > 0 && batchDrafts.some((batch) => batch.tutorId);

  useEffect(() => {
    const course = courseData?.courses?.nodes?.[0];
    if (!course || isNewClass) return;
    const packagePricing = getCoursePackagePricing(course.id, course);

    setClassData({
      title: course.title,
      subtitle: course.shortDescription,
      description: course.description,
      totalDuration: String(course.totalDuration),
      price: String(packagePricing.tutorPackagePrice),
      alaCartePrice: String(packagePricing.alaCartePrice),
      isFree: course.isFree,
      level: course.level,
      status: course.status,
    });
  }, [courseData, isNewClass]);

  useEffect(() => {
    if (isNewClass || isBatchesLoading || !batchData) return;

    const backendBatches = batchData.batches?.nodes ?? [];
    const fallbackTutorId = courseData?.courses?.nodes?.[0]?.tutorId?.[0] ?? "";
    setBatchDrafts(
      backendBatches.length > 0
        ? backendBatches.map((batch) => mapBatchToDraft(batch, fallbackTutorId))
        : [createEmptyBatchDraft()],
    );
  }, [batchData, courseData, isBatchesLoading, isNewClass]);

  useEffect(() => {
    if (isNewClass || isCurriculumLoading || !curriculumData) return;

    const backendSections = curriculumData.sections?.nodes ?? [];
    const backendLectures = curriculumData.lectures?.nodes ?? [];
    const mappedSections = mapBackendCurriculum(backendSections, backendLectures);

    setSections(mappedSections);
    setSelectedSectionId(mappedSections[0]?.id ?? null);
    setIsCreatingSection(mappedSections.length === 0);
    resetItemDraft();
    resetSectionDraft();
  }, [curriculumData, isCurriculumLoading, isNewClass]);

  const selectedSection =
    sections.find((section) => section.id === selectedSectionId) ?? sections[0] ?? null;

  const curriculumSummary = useMemo(() => {
    let videoCount = 0;
    let materialCount = 0;

    sections.forEach((section) => {
      section.items.forEach((item) => {
        if (item.type === "video") videoCount += 1;
        if (item.type === "material") materialCount += 1;
      });
    });

    return {
      totalSections: sections.length,
      totalVideos: videoCount,
      totalMaterials: materialCount,
      totalQuizzes: quizzes.length,
    };
  }, [quizzes.length, sections]);

  const setTab = (tab: EditorTab) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("tab", tab);
    setSearchParams(nextParams);
  };

  const resetSectionDraft = () => {
    setSectionDraft(emptySectionDraft);
    setEditingSectionId(null);
    setIsCreatingSection(false);
  };

  const resetItemDraft = () => {
    setItemDraft(emptyItemDraft);
    setEditingItemId(null);
    setIsItemComposerOpen(false);
  };

  const resetQuizDraft = () => {
    setQuizDraft(emptyQuizDraft());
    setEditingQuizId(null);
    setIsQuizComposerOpen(false);
    setQuizComposerStep("setup");
  };

  const openNewQuizComposer = () => {
    setEditingQuizId(null);
    setQuizDraft(emptyQuizDraft());
    setIsQuizComposerOpen(true);
    setQuizComposerStep("setup");
  };

  const mapQuizToDraft = (quiz: CourseQuiz): QuizDraft => ({
    title: quiz.title,
    description: quiz.description,
    status: quiz.status,
    assignedBatches: quiz.assignedBatches,
    opensAt: quiz.opensAt,
    closesAt: quiz.closesAt,
    questions: quiz.questions.map((question) => ({
      id: question.id,
      prompt: question.prompt,
      type: question.type,
      options:
        question.type === "multiple_answer"
          ? question.options.map((option) => ({ ...option }))
          : [],
      acceptedAnswersText: question.acceptedAnswers.join(", "),
      explanation: question.explanation,
    })),
  });

  const handleEditQuiz = (quiz: CourseQuiz) => {
    setEditingQuizId(quiz.id);
    setQuizDraft(mapQuizToDraft(quiz));
    setIsQuizComposerOpen(true);
    setQuizComposerStep("setup");
  };

  const handleDeleteQuiz = (quizId: number) => {
    setQuizzes((current) => current.filter((quiz) => quiz.id !== quizId));

    if (editingQuizId === quizId) {
      resetQuizDraft();
    }

    toast.success("Quiz deleted");
  };

  const addDraftQuestion = () => {
    setQuizDraft((current) => ({
      ...current,
      questions: [...current.questions, createQuestionDraft(Date.now())],
    }));
  };

  const updateDraftQuestion = (
    questionId: number,
    updater: (question: QuizQuestionDraft) => QuizQuestionDraft,
  ) => {
    setQuizDraft((current) => ({
      ...current,
      questions: current.questions.map((question) =>
        question.id === questionId ? updater(question) : question,
      ),
    }));
  };

  const removeDraftQuestion = (questionId: number) => {
    setQuizDraft((current) => ({
      ...current,
      questions:
        current.questions.length === 1
          ? current.questions
          : current.questions.filter((question) => question.id !== questionId),
    }));
  };

  const addQuestionOption = (questionId: number) => {
    updateDraftQuestion(questionId, (question) => ({
      ...question,
      options: [...question.options, createOptionDraft(Date.now())],
    }));
  };

  const removeQuestionOption = (questionId: number, optionId: number) => {
    updateDraftQuestion(questionId, (question) => ({
      ...question,
      options:
        question.options.length <= 2
          ? question.options
          : question.options.filter((option) => option.id !== optionId),
    }));
  };

  const handleQuizQuestionTypeChange = (questionId: number, nextType: QuizQuestionType) => {
    updateDraftQuestion(questionId, (question) => ({
      ...question,
      type: nextType,
      options:
        nextType === "multiple_answer"
          ? question.options.length > 0
            ? question.options
            : [createOptionDraft(Date.now()), createOptionDraft(Date.now() + 1)]
          : [],
      acceptedAnswersText:
        nextType === "fill_answer" ? question.acceptedAnswersText : "",
    }));
  };

  const handleQuizSubmit = () => {
    if (!quizDraft.title.trim() || !quizDraft.description.trim()) {
      toast.error("Please complete the quiz title and description.");
      return;
    }

    if (quizDraft.assignedBatches.length === 0) {
      toast.error("Assign at least one batch for this quiz.");
      return;
    }

    if (!quizDraft.opensAt || !quizDraft.closesAt) {
      toast.error("Please complete both opened and closed time.");
      return;
    }

    if (new Date(quizDraft.opensAt).getTime() >= new Date(quizDraft.closesAt).getTime()) {
      toast.error("Closed time must be later than opened time.");
      return;
    }

    if (quizDraft.questions.length === 0) {
      toast.error("Add at least one question.");
      return;
    }

    const normalizedQuestions: QuizQuestion[] = [];

    for (const question of quizDraft.questions) {
      if (!question.prompt.trim()) {
        toast.error("Each question must have a prompt.");
        return;
      }

      if (question.type === "multiple_answer") {
        const normalizedOptions = question.options
          .map((option) => ({ ...option, text: option.text.trim() }))
          .filter((option) => option.text.length > 0);

        if (normalizedOptions.length < 2) {
          toast.error("Multiple answer questions need at least two filled options.");
          return;
        }

        if (!normalizedOptions.some((option) => option.isCorrect)) {
          toast.error("Mark at least one correct option for each multiple answer question.");
          return;
        }

        normalizedQuestions.push({
          id: question.id,
          prompt: question.prompt.trim(),
          type: question.type,
          options: normalizedOptions,
          acceptedAnswers: [],
          explanation: question.explanation.trim(),
        });
        continue;
      }

      const acceptedAnswers = question.acceptedAnswersText
        .split(",")
        .map((answer) => answer.trim())
        .filter(Boolean);

      if (acceptedAnswers.length === 0) {
        toast.error("Fill answer questions need at least one accepted answer.");
        return;
      }

      normalizedQuestions.push({
        id: question.id,
        prompt: question.prompt.trim(),
        type: question.type,
        options: [],
        acceptedAnswers,
        explanation: question.explanation.trim(),
      });
    }

    const payload: CourseQuiz = {
      id: editingQuizId ?? Date.now(),
      title: quizDraft.title.trim(),
      description: quizDraft.description.trim(),
      status: quizDraft.status,
      assignedBatches: quizDraft.assignedBatches,
      opensAt: quizDraft.opensAt,
      closesAt: quizDraft.closesAt,
      questions: normalizedQuestions,
    };

    if (editingQuizId) {
      setQuizzes((current) =>
        current.map((quiz) => (quiz.id === editingQuizId ? payload : quiz)),
      );
      toast.success("Quiz updated");
    } else {
      setQuizzes((current) => [...current, payload]);
      toast.success("Quiz created");
    }

    resetQuizDraft();
  };

  const goToQuizQuestions = () => {
    if (!quizDraft.title.trim() || !quizDraft.description.trim()) {
      toast.error("Please complete the quiz title and description.");
      return;
    }

    if (quizDraft.assignedBatches.length === 0) {
      toast.error("Assign at least one batch for this quiz.");
      return;
    }

    if (!quizDraft.opensAt || !quizDraft.closesAt) {
      toast.error("Please complete both opened and closed time.");
      return;
    }

    if (new Date(quizDraft.opensAt).getTime() >= new Date(quizDraft.closesAt).getTime()) {
      toast.error("Closed time must be later than opened time.");
      return;
    }

    setQuizComposerStep("questions");
  };

  const addLiveSession = () => {
    setLiveSessions((current) => [
      ...current,
      {
        id: Date.now(),
        batchName: batchOptions[0] ?? "Batch 1",
        tutorId: batchDrafts[0]?.tutorId ?? "",
        sessionDate: "",
        startsAt: "",
        endsAt: "",
        platform: "Zoom",
        meetingLink: "",
        topic: "",
      },
    ]);
  };

  const updateLiveSession = (
    sessionId: number,
    updater: (session: LiveSessionDraft) => LiveSessionDraft,
  ) => {
    setLiveSessions((current) =>
      current.map((session) => (session.id === sessionId ? updater(session) : session)),
    );
  };

  const removeLiveSession = (sessionId: number) => {
    setLiveSessions((current) =>
      current.length <= 1 ? current : current.filter((session) => session.id !== sessionId),
    );
  };

  const renderQuizComposer = () => (
    <Card className="rounded-[1.5rem] border-[#D8E5E9] bg-white p-8 shadow-[0_18px_42px_rgba(10,27,69,0.07)]">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h3 className="text-2xl font-bold text-[#0A1B45]">
              {editingQuizId ? "Edit Quiz" : "Create New Quiz"}
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#476074]">
              Step 1 defines quiz metadata and batch assignment. Step 2 manages the questions.
            </p>
          </div>
          <Button variant="outline" className="border-[#D8E5E9]" onClick={resetQuizDraft}>
            Cancel
          </Button>
        </div>

        <div className="grid gap-2 rounded-2xl border border-[#D8E5E9] bg-[#F7FAFB] p-1 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setQuizComposerStep("setup")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold ${
              quizComposerStep === "setup" ? "bg-[#0A1B45] text-white" : "text-[#476074]"
            }`}
          >
            Quiz Setup
          </button>
          <button
            type="button"
            onClick={goToQuizQuestions}
            className={`rounded-xl px-4 py-2 text-sm font-semibold ${
              quizComposerStep === "questions" ? "bg-[#0A1B45] text-white" : "text-[#476074]"
            }`}
          >
            Questions
          </button>
        </div>

        {quizComposerStep === "setup" ? (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="quiz-title">Quiz title</Label>
            <Input
              id="quiz-title"
              placeholder="e.g. Arrays checkpoint"
              value={quizDraft.title}
              onChange={(event) =>
                setQuizDraft((current) => ({ ...current, title: event.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quiz-status">Status</Label>
            <select
              id="quiz-status"
              value={quizDraft.status}
              onChange={(event) =>
                setQuizDraft((current) => ({
                  ...current,
                  status: event.target.value as QuizStatus,
                }))
              }
              className="w-full rounded-md border border-[#D8E5E9] bg-white p-2"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="quiz-description">Description</Label>
            <Textarea
              id="quiz-description"
              rows={4}
              placeholder="Briefly explain what this quiz measures."
              value={quizDraft.description}
              onChange={(event) =>
                setQuizDraft((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quiz-batches">Batches assigned for</Label>
            <select
              id="quiz-batches"
              multiple
              value={quizDraft.assignedBatches}
              onChange={(event) =>
                setQuizDraft((current) => ({
                  ...current,
                  assignedBatches: Array.from(event.target.selectedOptions).map(
                    (option) => option.value,
                  ),
                }))
              }
              className="min-h-24 w-full rounded-md border border-[#D8E5E9] bg-white p-2"
            >
              {batchOptions.map((batch) => (
                <option key={batch} value={batch}>
                  {batch}
                </option>
              ))}
            </select>
            <p className="text-xs text-[#476074]">
              Batch options follow the current Total Batches value in basic settings.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quiz-opened-at">Opened time</Label>
            <Input
              id="quiz-opened-at"
              type="datetime-local"
              value={quizDraft.opensAt}
              onChange={(event) =>
                setQuizDraft((current) => ({
                  ...current,
                  opensAt: event.target.value,
                }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quiz-closed-at">Closed time</Label>
            <Input
              id="quiz-closed-at"
              type="datetime-local"
              value={quizDraft.closesAt}
              onChange={(event) =>
                setQuizDraft((current) => ({
                  ...current,
                  closesAt: event.target.value,
                }))
              }
            />
          </div>
        </div>
        ) : null}

        {quizComposerStep === "questions" ? (
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h4 className="text-lg font-semibold text-[#0A1B45]">Questions</h4>
              <p className="text-sm text-[#476074]">
                Build each question directly in the quiz editor.
              </p>
            </div>
            <Button variant="outline" className="border-[#D8E5E9]" onClick={addDraftQuestion}>
              <Plus className="mr-2 h-4 w-4" />
              Add Question
            </Button>
          </div>

          {quizDraft.questions.map((question, index) => (
            <div
              key={question.id}
              className="rounded-[1.25rem] border border-[#D8E5E9] bg-[#FAFCFD] p-5"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#92A4AE]">
                      Question {index + 1}
                    </div>
                    <h5 className="mt-1 text-lg font-semibold text-[#0A1B45]">
                      {question.type === "multiple_answer"
                        ? "Multiple Answer"
                        : "Fill Answer"}
                    </h5>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-[#B42318] hover:bg-[#FDECEC] hover:text-[#B42318]"
                    onClick={() => removeDraftQuestion(question.id)}
                    disabled={quizDraft.questions.length === 1}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <Label>Prompt</Label>
                    <Textarea
                      rows={3}
                      placeholder="Write the question prompt..."
                      value={question.prompt}
                      onChange={(event) =>
                        updateDraftQuestion(question.id, (current) => ({
                          ...current,
                          prompt: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Answer model</Label>
                    <select
                      value={question.type}
                      onChange={(event) =>
                        handleQuizQuestionTypeChange(
                          question.id,
                          event.target.value as QuizQuestionType,
                        )
                      }
                      className="w-full rounded-md border border-[#D8E5E9] bg-white p-2"
                    >
                      <option value="multiple_answer">Multiple answer</option>
                      <option value="fill_answer">Fill answer</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Explanation</Label>
                    <Input
                      placeholder="Optional explanation for review mode"
                      value={question.explanation}
                      onChange={(event) =>
                        updateDraftQuestion(question.id, (current) => ({
                          ...current,
                          explanation: event.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                {question.type === "multiple_answer" ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Options</Label>
                      <Button
                        variant="outline"
                        className="border-[#D8E5E9]"
                        onClick={() => addQuestionOption(question.id)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Option
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={option.id}
                          className="grid gap-3 rounded-xl border border-[#E6EEF1] bg-white p-3 md:grid-cols-[minmax(0,1fr)_auto_auto]"
                        >
                          <Input
                            placeholder={`Option ${optionIndex + 1}`}
                            value={option.text}
                            onChange={(event) =>
                              updateDraftQuestion(question.id, (current) => ({
                                ...current,
                                options: current.options.map((entry) =>
                                  entry.id === option.id
                                    ? { ...entry, text: event.target.value }
                                    : entry,
                                ),
                              }))
                            }
                          />
                          <label className="flex items-center gap-2 text-sm text-[#476074]">
                            <input
                              type="checkbox"
                              checked={option.isCorrect}
                              onChange={(event) =>
                                updateDraftQuestion(question.id, (current) => ({
                                  ...current,
                                  options: current.options.map((entry) =>
                                    entry.id === option.id
                                      ? { ...entry, isCorrect: event.target.checked }
                                      : entry,
                                  ),
                                }))
                              }
                              className="h-4 w-4 rounded border-[#C7DCE0] text-[#308279] focus:ring-[#308279]"
                            />
                            Correct
                          </label>
                          <Button
                            variant="ghost"
                            className="text-[#B42318] hover:bg-[#FDECEC] hover:text-[#B42318]"
                            onClick={() => removeQuestionOption(question.id, option.id)}
                            disabled={question.options.length <= 2}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label>Accepted answers</Label>
                    <Textarea
                      rows={3}
                      placeholder="Comma-separated answers, e.g. O(log n), log n, logarithmic"
                      value={question.acceptedAnswersText}
                      onChange={(event) =>
                        updateDraftQuestion(question.id, (current) => ({
                          ...current,
                          acceptedAnswersText: event.target.value,
                        }))
                      }
                    />
                    <p className="text-xs text-[#476074]">
                      Separate equivalent accepted answers with commas.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          {quizComposerStep === "setup" ? (
            <Button className="bg-[#308279] hover:bg-[#308279]/90" onClick={goToQuizQuestions}>
              Continue to Questions
            </Button>
          ) : (
            <>
              <Button variant="outline" className="border-[#D8E5E9]" onClick={() => setQuizComposerStep("setup")}>
                Back to Setup
              </Button>
              <Button className="bg-[#308279] hover:bg-[#308279]/90" onClick={handleQuizSubmit}>
                <Save className="mr-2 h-4 w-4" />
                {editingQuizId ? "Save Quiz" : "Create Quiz"}
              </Button>
            </>
          )}
          <Button variant="outline" className="border-[#D8E5E9]" onClick={resetQuizDraft}>
            Cancel
          </Button>
        </div>
      </div>
    </Card>
  );

  const startCreateSection = () => {
    setIsCreatingSection(true);
    setEditingSectionId(null);
    setSectionDraft(emptySectionDraft);
    resetItemDraft();
  };

  const handleSectionSubmit = async () => {
    if (!sectionDraft.title.trim()) {
      toast.error("Please complete the section title.");
      return;
    }

    if (isNewClass || !courseId) {
      toast.error("Save the class before editing backend curriculum.");
      return;
    }

    try {
      if (editingSectionId) {
        const currentSection = sections.find((section) => section.id === editingSectionId);

        await updateSection({
          variables: {
            input: {
              id: editingSectionId,
              courseId,
              title: sectionDraft.title.trim(),
              type: currentSection?.backendType ?? "ARTICLE",
              order: Math.max(1, sections.findIndex((section) => section.id === editingSectionId) + 1),
            },
          },
          refetchQueries: [GET_COURSE_CURRICULUM],
          awaitRefetchQueries: true,
        });
        toast.success("Section updated");
      } else {
        await createSection({
          variables: {
            input: {
              courseId,
              title: sectionDraft.title.trim(),
              type: "ARTICLE",
              order: sections.length + 1,
            },
          },
          refetchQueries: [GET_COURSE_CURRICULUM],
          awaitRefetchQueries: true,
        });
        toast.success("Section created");
      }

      await refetchCurriculum();
      resetSectionDraft();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Please try again.";
      toast.error("Unable to save section", { description: message });
    }
  };

  const handleEditSection = (section: CurriculumSection) => {
    setSelectedSectionId(section.id);
    setEditingSectionId(section.id);
    setIsCreatingSection(false);
    setSectionDraft({
      title: section.title,
    });
  };

  const handleCancelSectionEdit = () => {
    resetSectionDraft();
  };

  const handleDeleteSection = async (sectionId: string) => {
    if (isNewClass) {
      toast.error("Save the class before editing backend curriculum.");
      return;
    }

    try {
      await deleteSection({
        variables: { sectionId },
        refetchQueries: [GET_COURSE_CURRICULUM],
        awaitRefetchQueries: true,
      });
      await refetchCurriculum();
      toast.success("Section deleted");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Please try again.";
      toast.error("Unable to delete section", { description: message });
    }
  };

  const handleItemTypeChange = (type: CurriculumItemType) => {
    setItemDraft((current) => ({
      ...current,
      type,
      sourceType: type === "material" ? "editor" : "link",
      sourceValue: current.type === "material" && type !== "material" ? "" : current.sourceValue,
    }));
  };

  const handleItemSubmit = async () => {
    if (!selectedSectionId) {
      toast.error("Create or select a section first.");
      return;
    }

    if (isNewClass || !courseId) {
      toast.error("Save the class before editing backend curriculum.");
      return;
    }

    const hasItemSource =
      itemDraft.type === "material"
        ? getPlainTextFromHtml(itemDraft.sourceValue).length > 0
        : itemDraft.sourceValue.trim().length > 0;

    if (!itemDraft.title.trim() || !itemDraft.description.trim() || !hasItemSource) {
      toast.error("Please complete the item title, description, and source.");
      return;
    }

    const durationMinutes = Number(itemDraft.duration);
    if (!Number.isFinite(durationMinutes) || durationMinutes <= 0) {
      toast.error("Lecture duration must be greater than zero.");
      return;
    }

    const normalizedVideoId =
      itemDraft.type === "video" ? extractYouTubeVideoId(itemDraft.sourceValue) : null;

    if (itemDraft.type === "video" && !normalizedVideoId) {
      toast.error("Please paste a valid YouTube video URL or 11-character video ID.");
      return;
    }

    const targetSection = sections.find((section) => section.id === selectedSectionId);
    const nextSectionType = itemTypeToSectionType(itemDraft.type);
    const lectureContent =
      itemDraft.type === "material" ? itemDraft.sourceValue.trim() : itemDraft.description.trim();
    const lectureYoutubeId = itemDraft.type === "video" ? normalizedVideoId ?? "" : "";
    const existingItemIndex = targetSection?.items.findIndex((item) => item.id === editingItemId) ?? -1;
    const isoDuration = durationToIso8601(durationMinutes);

    try {
      if (targetSection?.backendType !== nextSectionType && targetSection?.items.length === 0) {
        await updateSection({
          variables: {
            input: {
              id: targetSection.id,
              courseId,
              title: targetSection.title,
              type: nextSectionType,
              order: Math.max(1, sections.findIndex((section) => section.id === targetSection.id) + 1),
            },
          },
        });
      }

      if (editingItemId) {
        await updateLecture({
          variables: {
            input: {
              id: editingItemId,
              courseId,
              sectionId: selectedSectionId,
              title: itemDraft.title.trim(),
              youtubeEmbedId: lectureYoutubeId,
              duration: isoDuration,
              content: lectureContent,
              order: Math.max(1, existingItemIndex + 1),
            },
          },
          refetchQueries: [GET_COURSE_CURRICULUM],
          awaitRefetchQueries: true,
        });
        toast.success("Curriculum item updated");
      } else {
        await createLecture({
          variables: {
            input: {
              courseId,
              sectionId: selectedSectionId,
              title: itemDraft.title.trim(),
              youtubeEmbedId: lectureYoutubeId,
              duration: isoDuration,
              content: lectureContent,
              order: (targetSection?.items.length ?? 0) + 1,
            },
          },
          refetchQueries: [GET_COURSE_CURRICULUM],
          awaitRefetchQueries: true,
        });
        toast.success("Curriculum item created");
      }

      await refetchCurriculum();
      resetItemDraft();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Please try again.";
      toast.error("Unable to save curriculum item", { description: message });
    }
  };

  const handleEditItem = (sectionId: string, item: CurriculumItem) => {
    setSelectedSectionId(sectionId);
    setEditingItemId(item.id);
    setIsCreatingSection(false);
    setIsItemComposerOpen(true);
      setItemDraft({
        title: item.title,
        type: item.type,
        description: item.description,
        sourceType: item.type === "material" ? "editor" : item.sourceType,
        sourceValue: item.type === "video" ? buildYouTubeUrl(item.sourceValue) : item.sourceValue,
        duration: item.duration,
      });
  };

  const handleDeleteItem = async (_sectionId: string, itemId: string) => {
    if (isNewClass) {
      toast.error("Save the class before editing backend curriculum.");
      return;
    }

    try {
      await deleteLecture({
        variables: { lectureId: itemId },
        refetchQueries: [GET_COURSE_CURRICULUM],
        awaitRefetchQueries: true,
      });
      await refetchCurriculum();

      if (editingItemId === itemId) {
        resetItemDraft();
      }

      toast.success("Curriculum item deleted");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Please try again.";
      toast.error("Unable to delete curriculum item", { description: message });
    }
  };

  const buildCourseInput = (): CourseInput | null => {
    const totalDurationValue = classData.totalDuration.trim() || "0";
    const totalDuration = Number(totalDurationValue);
    const price = classData.isFree ? 0 : Number(sanitizePriceInput(classData.price));
    const alaCartePrice = classData.isFree ? 0 : Number(sanitizePriceInput(classData.alaCartePrice));
    const tutorIds = Array.from(
      new Set(batchDrafts.map((batch) => batch.tutorId).filter(Boolean)),
    );

    if (!classData.title.trim() || !classData.subtitle.trim() || !classData.description.trim()) {
      toast.error("Please complete the class title, subtitle, and description.");
      return null;
    }

    if (!Number.isFinite(totalDuration) || totalDuration < 0) {
      toast.error("Course duration estimate must be a valid number.");
      return null;
    }

    if (!Number.isFinite(price) || price < 0) {
      toast.error("Price must be a valid number.");
      return null;
    }

    if (!Number.isFinite(alaCartePrice) || alaCartePrice < 0) {
      toast.error("Ala carte price must be a valid number.");
      return null;
    }

    if (!classData.isFree && alaCartePrice > price) {
      toast.error("Ala carte price cannot be higher than Tutor package price.");
      return null;
    }

    if (tutorIds.length === 0) {
      toast.error("Assign at least one tutor to each batch.");
      return null;
    }

    return {
      tutorId: tutorIds,
      title: classData.title.trim(),
      description: classData.description.trim(),
      shortDescription: classData.subtitle.trim(),
      price,
      level: classData.level,
      isFree: classData.isFree,
      status: classData.status,
      totalSections: sections.length,
      totalLectures: curriculumSummary.totalVideos + curriculumSummary.totalMaterials,
      totalDuration,
    };
  };

  const buildBatchInputs = () => {
    if (isNewClass || !courseId) return [];

    return batchDrafts.map((batch, index) => {
      const durationValue = Number(batch.durationValue);
      const capacity = Number(batch.capacity);

      if (!batch.tutorId) {
        throw new Error(`Assign a tutor for Batch ${index + 1}.`);
      }

      if (!batch.startDate) {
        throw new Error(`Set a start date for Batch ${index + 1}.`);
      }

      if (!Number.isFinite(durationValue) || durationValue <= 0) {
        throw new Error(`Set a valid duration for Batch ${index + 1}.`);
      }

      if (!Number.isFinite(capacity) || capacity <= 0) {
        throw new Error(`Set a valid capacity for Batch ${index + 1}.`);
      }

      return {
        courseId,
        tutorId: batch.tutorId,
        startDate: new Date(`${batch.startDate}T00:00:00`).toISOString(),
        endDate: addDurationToDate(batch.startDate, durationValue, batch.durationUnit),
        capacity,
      };
    });
  };

  const handleSaveChanges = async () => {
    const input = buildCourseInput();
    if (!input) return;

    if (!isNewClass && !courseId) {
      toast.error("Course ID is missing - check your route configuration.");
      return;
    }

    try {
      const batchInputs = buildBatchInputs();

      if (isNewClass) {
        const result = await createCourse({
          variables: { input },
        });
        const createdCourseId =
          "data" in result && result.data && typeof result.data === "object"
            ? (result.data as { createCourse?: { id?: string } | null }).createCourse?.id
            : undefined;

        if (createdCourseId) {
          setCoursePackagePricing(createdCourseId, {
            alaCartePrice:
              classData.isFree ? 0 : Number(sanitizePriceInput(classData.alaCartePrice)),
            tutorPackagePrice: classData.isFree ? 0 : Number(sanitizePriceInput(classData.price)),
          });
        }
        toast.success("New class created", {
          description: `${input.title} has been saved as ${input.status.toLowerCase()}.`,
        });
        navigate("/admin-dashboard?view=classes");
        return;
      }

      await updateCourse({
        variables: { id: courseId, input },
      });

      setCoursePackagePricing(courseId, {
        alaCartePrice:
          classData.isFree ? 0 : Number(sanitizePriceInput(classData.alaCartePrice)),
        tutorPackagePrice:
          classData.isFree ? 0 : Number(sanitizePriceInput(classData.price)),
      });

      const existingBatchIds = new Set((batchData?.batches?.nodes ?? []).map((batch) => batch.id));
      const newBatchInputs = batchInputs.filter((_, index) => !existingBatchIds.has(batchDrafts[index]?.id));

      await Promise.all(
        newBatchInputs.map((batchInput) =>
          createBatch({
            variables: { input: batchInput },
          }),
        ),
      );

      toast.success("Class changes saved", {
        description: `${input.title} has been updated.`,
      });
    } catch (error) {
      console.error("Unable to save class", error);
      const message = formatSaveError(error);
      toast.error("Unable to save class", { description: message });
    }
  };

  const openNewItemComposer = (sectionId: string) => {
    setSelectedSectionId(sectionId);
    setEditingItemId(null);
    setItemDraft(emptyItemDraft);
    setIsItemComposerOpen(true);
  };

  const renderEditBatchSetup = () => (
    <Card className="rounded-[1.75rem] border-[#D8E5E9] bg-white p-8 shadow-[0_18px_42px_rgba(10,27,69,0.07)]">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0A1B45]">Batch Generator</h2>
          <p className="mt-2 text-sm text-[#476074]">Generate live-session batches and assign tutors per batch.</p>
        </div>
        <Button
          type="button"
          className="bg-[#308279] hover:bg-[#308279]/90"
          onClick={() => setBatchDrafts((current) => [...current, createEmptyBatchDraft(current.length)])}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add batch
        </Button>
      </div>

      <div className="mb-8 grid gap-5 lg:grid-cols-3">
        <div className="space-y-2">
          <Label>First batch start date</Label>
          <Input
            type="date"
            value={editBatchGenerator.firstBatchStartDate}
            onChange={(event) =>
              setEditBatchGenerator((current) => ({
                ...current,
                firstBatchStartDate: event.target.value,
              }))
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Number of batches</Label>
          <Input
            type="number"
            min="1"
            value={editBatchGenerator.numberOfBatches}
            onChange={(event) =>
              setEditBatchGenerator((current) => ({
                ...current,
                numberOfBatches: event.target.value,
              }))
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Interval</Label>
          <div className="grid grid-cols-[1fr_120px] gap-2">
            <Input
              type="number"
              min="1"
              value={editBatchGenerator.intervalValue}
              onChange={(event) =>
                setEditBatchGenerator((current) => ({
                  ...current,
                  intervalValue: event.target.value,
                }))
              }
            />
            <select
              value={editBatchGenerator.intervalUnit}
              onChange={(event) =>
                setEditBatchGenerator((current) => ({
                  ...current,
                  intervalUnit: event.target.value as EditBatchGenerator["intervalUnit"],
                }))
              }
              className="rounded-md border border-[#D8E5E9] bg-white p-2"
            >
              <option value="day">Days</option>
              <option value="week">Weeks</option>
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Quota per batch</Label>
          <Input
            type="number"
            min="1"
            value={editBatchGenerator.quotaPerBatch}
            onChange={(event) =>
              setEditBatchGenerator((current) => ({
                ...current,
                quotaPerBatch: event.target.value,
              }))
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Estimated last batch end date</Label>
          <Input
            readOnly
            className="bg-[#F3F8FA]"
            value={
              editBatchGenerator.firstBatchStartDate
                ? formatDateInputValue(
                    addDurationToDate(
                      editBatchGenerator.firstBatchStartDate,
                      (Number(editBatchGenerator.numberOfBatches || 1) - 1) *
                        Number(editBatchGenerator.intervalValue || 1) +
                        4,
                      editBatchGenerator.intervalUnit,
                    ),
                  )
                : "Complete date, batches, and interval"
            }
          />
        </div>
        <div className="flex items-end">
          <Button
            type="button"
            className="w-full bg-[#308279] hover:bg-[#308279]/90"
            onClick={() => {
              if (!editBatchGenerator.firstBatchStartDate) {
                toast.error("Set the first batch start date.");
                return;
              }

              const intervalCount = Number(editBatchGenerator.intervalValue || 1);
              const intervalDays = editBatchGenerator.intervalUnit === "week" ? intervalCount * 7 : intervalCount;
              const firstStart = new Date(`${editBatchGenerator.firstBatchStartDate}T00:00:00`);

              setBatchDrafts(
                Array.from({ length: Number(editBatchGenerator.numberOfBatches || 1) }, (_, index) => {
                  const start = new Date(firstStart);
                  start.setDate(firstStart.getDate() + index * intervalDays);

                  return {
                    id: `local-batch-${Date.now()}-${index}`,
                    tutorId: "",
                    startDate: start.toISOString().slice(0, 10),
                    durationValue: "4",
                    durationUnit: "week" as const,
                    capacity: editBatchGenerator.quotaPerBatch || "20",
                  };
                }),
              );
            }}
          >
            <CalendarDays className="mr-2 h-4 w-4" />
            Generate Batches
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {batchDrafts.map((batch, index) => {
          const isPersistedBatch = !batch.id.startsWith("local-batch-");

          return (
            <div
              key={batch.id}
              className="grid gap-4 rounded-2xl border border-[#D8E5E9] bg-[#FAFCFD] p-4 lg:grid-cols-[1.2fr_1fr_1fr_1fr_auto]"
            >
              <div className="space-y-2">
                <Label htmlFor={`batch-tutor-tab-${batch.id}`}>Batch {index + 1} tutor</Label>
                <select
                  id={`batch-tutor-tab-${batch.id}`}
                  value={batch.tutorId}
                  onChange={(event) =>
                    setBatchDrafts((current) =>
                      current.map((item) =>
                        item.id === batch.id ? { ...item, tutorId: event.target.value } : item,
                      ),
                    )
                  }
                  className="w-full rounded-md border border-[#D8E5E9] bg-white p-2"
                  disabled={isTutorUsersLoading || isPersistedBatch}
                >
                  <option value="">Select tutor</option>
                  {tutorOptions.map((tutor) => (
                    <option key={tutor.id} value={tutor.id}>
                      {tutor.name} ({tutor.username})
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`batch-start-tab-${batch.id}`}>Start date</Label>
                <Input
                  id={`batch-start-tab-${batch.id}`}
                  type="date"
                  value={batch.startDate}
                  disabled={isPersistedBatch}
                  onChange={(event) =>
                    setBatchDrafts((current) =>
                      current.map((item) =>
                        item.id === batch.id ? { ...item, startDate: event.target.value } : item,
                      ),
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`batch-duration-tab-${batch.id}`}>Batch duration</Label>
                <div className="grid grid-cols-[minmax(0,1fr)_112px] gap-2">
                  <Input
                    id={`batch-duration-tab-${batch.id}`}
                    type="number"
                    min="1"
                    value={batch.durationValue}
                    disabled={isPersistedBatch}
                    onChange={(event) =>
                      setBatchDrafts((current) =>
                        current.map((item) =>
                          item.id === batch.id ? { ...item, durationValue: event.target.value } : item,
                        ),
                      )
                    }
                  />
                  <select
                    aria-label="Batch duration unit"
                    value={batch.durationUnit}
                    disabled={isPersistedBatch}
                    onChange={(event) =>
                      setBatchDrafts((current) =>
                        current.map((item) =>
                          item.id === batch.id
                            ? { ...item, durationUnit: event.target.value as BatchDurationUnit }
                            : item,
                        ),
                      )
                    }
                    className="w-full rounded-md border border-[#D8E5E9] bg-white p-2"
                  >
                    <option value="day">Hari</option>
                    <option value="week">Minggu</option>
                    <option value="month">Bulan</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`batch-capacity-tab-${batch.id}`}>Capacity</Label>
                <Input
                  id={`batch-capacity-tab-${batch.id}`}
                  type="number"
                  min="1"
                  value={batch.capacity}
                  disabled={isPersistedBatch}
                  onChange={(event) =>
                    setBatchDrafts((current) =>
                      current.map((item) =>
                        item.id === batch.id ? { ...item, capacity: event.target.value } : item,
                      ),
                    )
                  }
                />
              </div>
              <div className="flex items-end">
                <Button
                  type="button"
                  variant="ghost"
                  className="text-[#B42318] hover:bg-[#FDECEC] hover:text-[#B42318]"
                  disabled={batchDrafts.length === 1 || isPersistedBatch}
                  onClick={() => setBatchDrafts((current) => current.filter((item) => item.id !== batch.id))}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );

  const renderEditPackagePricing = () => {
    const packages = [
      {
        key: "videoOnly" as const,
        name: "Video only",
        description: "Students can access video lessons from the curriculum.",
        value: classData.alaCartePrice,
        onChange: (value: string) => setClassData({ ...classData, alaCartePrice: sanitizePriceInput(value) }),
      },
      {
        key: "articleOnly" as const,
        name: "Article only",
        description: "Students can access written article lessons and templates.",
        value: classData.alaCartePrice,
        onChange: (value: string) => setClassData({ ...classData, alaCartePrice: sanitizePriceInput(value) }),
      },
      {
        key: "videoArticle" as const,
        name: "Video + article",
        description: "Students can access all asynchronous video and article content.",
        value: classData.price,
        onChange: (value: string) => setClassData({ ...classData, price: sanitizePriceInput(value) }),
      },
      {
        key: "live" as const,
        name: "Video + article + live sessions",
        description: "Students get course content plus tutor-led live batch sessions.",
        value: classData.price,
        onChange: (value: string) => setClassData({ ...classData, price: sanitizePriceInput(value) }),
      },
    ];

    return (
      <Card className="rounded-[1.75rem] border-[#D8E5E9] bg-white p-8 shadow-[0_18px_42px_rgba(10,27,69,0.07)]">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#0A1B45]">Package & Pricing Setup</h2>
          <p className="mt-2 text-sm text-[#476074]">Enable packages only when matching curriculum content exists.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {packages.map((coursePackage) => (
            <div key={coursePackage.key} className="rounded-xl border border-[#D8E5E9] bg-[#FAFCFD] p-5">
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  checked={editPackageEnabled[coursePackage.key]}
                  onChange={(event) =>
                    setEditPackageEnabled((current) => ({
                      ...current,
                      [coursePackage.key]: event.target.checked,
                    }))
                  }
                  className="mt-1 h-4 w-4 accent-[#308279]"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-[#0A1B45]">{coursePackage.name}</h3>
                  <p className="mt-1 text-sm text-[#476074]">{coursePackage.description}</p>
                  <div className="mt-4">
                    <Label>Price</Label>
                    <Input
                      type="number"
                      min="0"
                      value={coursePackage.value}
                      disabled={!editPackageEnabled[coursePackage.key] || classData.isFree}
                      onChange={(event) => coursePackage.onChange(event.target.value)}
                      placeholder="499000"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#F3F8FA]">
      <AdminSidebar activeView="classes" />

      <main className="min-w-0 flex-1 p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Link to="/admin-dashboard?view=classes" className="mb-3 inline-flex items-center text-sm font-semibold text-[#308279]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Classes
              </Link>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold text-[#0A1B45]">
                  {isNewClass ? "Create Course" : "Edit Course"}
                </h1>
                <Badge
                  className={
                    classData.status === "PUBLISHED"
                      ? "bg-[#DDF8EA] text-[#16834D]"
                      : "bg-[#FFF4D8] text-[#9A6700]"
                  }
                >
                  {classData.status === "PUBLISHED" ? "Published" : "Draft"}
                </Badge>
              </div>
              <p className="mt-2 max-w-3xl text-[#476074]">
                Update course info, curriculum, package batches, live sessions, and quizzes in the same builder flow used for creation.
              </p>
            </div>
            <Button
              variant="outline"
              className="border-[#308279] text-[#308279]"
              onClick={handleSaveChanges}
              disabled={isSavingCourse || isCourseLoading}
            >
              <Save className="mr-2 h-4 w-4" />
              {isSavingCourse ? "Saving..." : "Save Changes"}
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={(value) => setTab(value as EditorTab)} className="w-full">
            <TabsList className="mb-6 grid h-auto w-full gap-3 rounded-xl border border-[#D8E5E9] bg-white p-4 shadow-sm md:grid-cols-2 xl:grid-cols-6">
              <TabsTrigger
                value="basic"
                className="h-auto justify-start rounded-lg border border-[#D8E5E9] bg-white p-3 text-left font-semibold text-[#0A1B45] data-[state=active]:border-[#308279] data-[state=active]:bg-[#EAF5F3] data-[state=active]:text-[#0A1B45]"
              >
                Class Information
              </TabsTrigger>
              <TabsTrigger
                value="curriculum"
                className="h-auto justify-start rounded-lg border border-[#D8E5E9] bg-white p-3 text-left font-semibold text-[#0A1B45] data-[state=active]:border-[#308279] data-[state=active]:bg-[#EAF5F3] data-[state=active]:text-[#0A1B45]"
              >
                Curriculum Builder
              </TabsTrigger>
              <TabsTrigger
                value="pricing"
                className="h-auto justify-start rounded-lg border border-[#D8E5E9] bg-white p-3 text-left font-semibold text-[#0A1B45] data-[state=active]:border-[#308279] data-[state=active]:bg-[#EAF5F3] data-[state=active]:text-[#0A1B45]"
              >
                Package Pricing
              </TabsTrigger>
              <TabsTrigger
                value="batches"
                className="h-auto justify-start rounded-lg border border-[#D8E5E9] bg-white p-3 text-left font-semibold text-[#0A1B45] data-[state=active]:border-[#308279] data-[state=active]:bg-[#EAF5F3] data-[state=active]:text-[#0A1B45]"
              >
                Batch Setup
              </TabsTrigger>
              <TabsTrigger
                value="quizzes"
                className="h-auto justify-start rounded-lg border border-[#D8E5E9] bg-white p-3 text-left font-semibold text-[#0A1B45] data-[state=active]:border-[#308279] data-[state=active]:bg-[#EAF5F3] data-[state=active]:text-[#0A1B45]"
              >
                Quizzes
              </TabsTrigger>
              <TabsTrigger
                value="live"
                className="h-auto justify-start rounded-lg border border-[#D8E5E9] bg-white p-3 text-left font-semibold text-[#0A1B45] data-[state=active]:border-[#308279] data-[state=active]:bg-[#EAF5F3] data-[state=active]:text-[#0A1B45]"
              >
                Live Sessions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <div className="space-y-6">
              <Card className="rounded-[1.75rem] border-[#D8E5E9] bg-white p-8 shadow-[0_18px_42px_rgba(10,27,69,0.07)]">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-[#0A1B45]">Course Info</h2>
                    <p className="mt-2 text-sm text-[#476074]">
                      Set the draft basics before adding curriculum and commercial options.
                    </p>
                  </div>
                  {isCourseLoading ? (
                    <Badge className="w-fit border-0 bg-[#0A1B45]/8 text-[#0A1B45]">
                      Loading class
                    </Badge>
                  ) : null}
                </div>
                <form className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">Course title</Label>
                      <Input
                        id="title"
                        placeholder="e.g. Data Structures Intensive"
                        value={classData.title}
                        onChange={(event) => setClassData({ ...classData, title: event.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subtitle">Subtitle</Label>
                      <Input
                        id="subtitle"
                        placeholder="Short summary shown on the class card"
                        value={classData.subtitle}
                        onChange={(event) => setClassData({ ...classData, subtitle: event.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        placeholder="Design / Computer Science"
                        value={courseExtra.category}
                        onChange={(event) => setCourseExtra({ ...courseExtra, category: event.target.value })}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe what students will learn, prerequisites, and class outcomes."
                        value={classData.description}
                        onChange={(event) => setClassData({ ...classData, description: event.target.value })}
                        rows={6}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="thumbnail">Thumbnail</Label>
                      <div className="flex min-h-32 w-full items-center justify-center rounded-lg border border-dashed border-[#B8CDD3] bg-[#F7FBFC] p-5 text-center">
                        <div className="w-full max-w-2xl">
                          <Upload className="mx-auto h-5 w-5 text-[#308279]" />
                          <p className="mt-2 text-sm font-semibold text-[#0A1B45]">
                            {courseExtra.thumbnail || "Upload class thumbnail here"}
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            className="mt-3 border-[#308279] text-[#308279]"
                            onClick={() => setCourseExtra({ ...courseExtra, thumbnail: "thumbnail-preview.jpg" })}
                          >
                            Choose thumbnail
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="level">Difficulty level</Label>
                      <select
                        id="level"
                        value={classData.level}
                        onChange={(event) =>
                          setClassData({ ...classData, level: event.target.value as CourseLevel })
                        }
                        className="w-full rounded-md border border-[#D8E5E9] bg-white p-2"
                      >
                        {courseLevelOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="totalDuration">Estimated duration</Label>
                      <Input
                        id="totalDuration"
                        type="number"
                        min="0"
                        value={classData.totalDuration}
                        onChange={(event) =>
                          setClassData({ ...classData, totalDuration: event.target.value })
                        }
                        placeholder="e.g. 120"
                      />
                    </div>
                  </div>
                </form>
              </Card>

              <Card className="hidden rounded-[1.75rem] border-[#D8E5E9] bg-white p-8 shadow-[0_18px_42px_rgba(10,27,69,0.07)]">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-[#0A1B45]">Tutor package batches</h3>
                        <p className="mt-1 text-sm text-[#476074]">
                          Batch hanya dipakai untuk Tutor package. Ala carte tidak memakai batch dan
                          langsung memberi akses ke learning materials.
                        </p>
                      </div>
                      <Button
                        type="button"
                        className="bg-[#308279] hover:bg-[#308279]/90"
                        onClick={() =>
                          setBatchDrafts((current) => [...current, createEmptyBatchDraft(current.length)])
                        }
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add batch
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {batchDrafts.map((batch, index) => {
                        const isPersistedBatch = !batch.id.startsWith("local-batch-");

                        return (
                          <div
                            key={batch.id}
                            className="grid gap-4 rounded-2xl border border-[#D8E5E9] bg-white p-4 lg:grid-cols-[1.2fr_1fr_1fr_1fr_auto]"
                          >
                          <div className="space-y-2">
                            <Label htmlFor={`batch-tutor-${batch.id}`}>
                              Batch {index + 1} tutor
                              {isPersistedBatch ? " (saved)" : ""}
                            </Label>
                            <select
                              id={`batch-tutor-${batch.id}`}
                              value={batch.tutorId}
                              onChange={(event) =>
                                setBatchDrafts((current) =>
                                  current.map((item) =>
                                    item.id === batch.id ? { ...item, tutorId: event.target.value } : item,
                                  ),
                                )
                              }
                              className="w-full rounded-md border border-[#D8E5E9] bg-white p-2"
                              disabled={isTutorUsersLoading || isPersistedBatch}
                            >
                              <option value="">Select tutor</option>
                              {tutorOptions.map((tutor) => (
                                <option key={tutor.id} value={tutor.id}>
                                  {tutor.name} ({tutor.username})
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`batch-start-${batch.id}`}>Start date</Label>
                            <Input
                              id={`batch-start-${batch.id}`}
                              type="date"
                              value={batch.startDate}
                              disabled={isPersistedBatch}
                              placeholder="Select start date"
                              onChange={(event) =>
                                setBatchDrafts((current) =>
                                  current.map((item) =>
                                    item.id === batch.id ? { ...item, startDate: event.target.value } : item,
                                  ),
                                )
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`batch-duration-${batch.id}`}>Batch duration</Label>
                            <div className="grid grid-cols-[minmax(0,1fr)_112px] gap-2">
                              <Input
                                id={`batch-duration-${batch.id}`}
                                type="number"
                                min="1"
                                placeholder="1"
                                value={batch.durationValue}
                                disabled={isPersistedBatch}
                                onChange={(event) =>
                                  setBatchDrafts((current) =>
                                    current.map((item) =>
                                      item.id === batch.id
                                        ? { ...item, durationValue: event.target.value }
                                        : item,
                                    ),
                                  )
                                }
                              />
                              <select
                                aria-label="Batch duration unit"
                                value={batch.durationUnit}
                                disabled={isPersistedBatch}
                                onChange={(event) =>
                                  setBatchDrafts((current) =>
                                    current.map((item) =>
                                      item.id === batch.id
                                        ? {
                                            ...item,
                                            durationUnit: event.target.value as BatchDurationUnit,
                                          }
                                        : item,
                                    ),
                                  )
                                }
                                className="w-full rounded-md border border-[#D8E5E9] bg-white p-2"
                              >
                                <option value="day">Hari</option>
                                <option value="week">Minggu</option>
                                <option value="month">Bulan</option>
                              </select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`batch-capacity-${batch.id}`}>Capacity</Label>
                            <Input
                              id={`batch-capacity-${batch.id}`}
                              type="number"
                              min="1"
                              placeholder="20"
                              value={batch.capacity}
                              disabled={isPersistedBatch}
                              onChange={(event) =>
                                setBatchDrafts((current) =>
                                  current.map((item) =>
                                    item.id === batch.id ? { ...item, capacity: event.target.value } : item,
                                  ),
                                )
                              }
                            />
                          </div>
                          <div className="flex items-end">
                            <Button
                              type="button"
                              variant="ghost"
                              className="text-[#B42318] hover:bg-[#FDECEC] hover:text-[#B42318]"
                              disabled={batchDrafts.length === 1 || isPersistedBatch}
                              onClick={() =>
                                setBatchDrafts((current) => current.filter((item) => item.id !== batch.id))
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          {isPersistedBatch ? (
                            <div className="lg:col-span-5 text-xs text-[#476074]">
                              Backend currently supports creating batches only; saved batch edits are disabled.
                            </div>
                          ) : null}
                        </div>
                        );
                      })}
                    </div>
              </Card>

              </div>
            </TabsContent>

            <TabsContent value="pricing">
              {renderEditPackagePricing()}
            </TabsContent>

            <TabsContent value="batches">
              {renderEditBatchSetup()}
            </TabsContent>

            <TabsContent value="curriculum">
              <div className="space-y-6">
                  {sections.map((section, index) => {
                    const isEditingSection = editingSectionId === section.id;
                    const isActiveComposer = isItemComposerOpen && selectedSectionId === section.id;

                    return (
                      <Card
                        key={section.id}
                        className={`rounded-[1.5rem] border bg-white p-6 shadow-[0_18px_42px_rgba(10,27,69,0.07)] ${
                          selectedSectionId === section.id && !isCreatingSection
                            ? "border-[#308279]"
                            : "border-[#D8E5E9]"
                        }`}
                      >
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                          <div>
                            {isEditingSection ? (
                              <div className="space-y-3">
                                <Input
                                  value={sectionDraft.title}
                                  onChange={(event) =>
                                    setSectionDraft({ ...sectionDraft, title: event.target.value })
                                  }
                                  placeholder="Section title"
                                />
                              </div>
                            ) : (
                              <div className="space-y-3">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedSectionId(section.id);
                                    setIsCreatingSection(false);
                                  }}
                                  className="block w-full text-left"
                                >
                                  <div className="inline-flex items-center gap-2 border-b border-dashed border-[#92A4AE] pb-1">
                                    <h3 className="text-2xl font-bold text-[#0A1B45]">{section.title}</h3>
                                    <span
                                      role="button"
                                      tabIndex={0}
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        handleEditSection(section);
                                      }}
                                      onKeyDown={(event) => {
                                        if (event.key === "Enter" || event.key === " ") {
                                          event.preventDefault();
                                          handleEditSection(section);
                                        }
                                      }}
                                      className="inline-flex cursor-pointer text-[#92A4AE] transition hover:text-[#0A1B45]"
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </span>
                                  </div>
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {isEditingSection ? (
                              <>
                                <Button
                                  className="bg-[#0A1B45] hover:bg-[#308279]"
                                  onClick={handleSectionSubmit}
                                  disabled={isSavingSection}
                                >
                                  Save
                                </Button>
                                <Button variant="outline" className="border-[#D8E5E9]" onClick={handleCancelSectionEdit}>
                                  Cancel
                                </Button>
                              </>
                            ) : null}
                            <Button
                              variant="ghost"
                              className="text-[#B42318] hover:bg-[#FDECEC] hover:text-[#B42318]"
                              onClick={() => handleDeleteSection(section.id)}
                              disabled={isSavingSection}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-4">

                          {section.items.length > 0 &&
                            section.items.map((item) => {
                              const badge = getItemBadge(item.type);
                              const ItemIcon = badge.icon;

                              return (
                                <div
                                  key={item.id}
                                  className="flex flex-col gap-4 rounded-[1.25rem] border border-[#D8E5E9] bg-[#F9FCFD] p-5 lg:flex-row lg:items-start lg:justify-between"
                                >
                                  <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0A1B45] text-white">
                                      <ItemIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                      <div className="flex flex-wrap items-center gap-2">
                                        <div className="font-semibold text-[#0A1B45]">{item.title}</div>
                                        <Badge className={badge.className}>{badge.label}</Badge>
                                        <Badge
                                          className={
                                            item.status === "Published"
                                              ? "border-0 bg-[#308279]/10 text-[#308279]"
                                              : "border-0 bg-[#FCEFC7] text-[#7A5A00]"
                                          }
                                        >
                                          {item.status}
                                        </Badge>
                                      </div>
                                      <p className="mt-2 max-w-3xl text-sm leading-6 text-[#476074]">
                                        {item.description}
                                      </p>
                                      <div className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-[#92A4AE]">
                                        {item.sourceType === "editor"
                                          ? "Material content"
                                          : "YouTube video ID"}
                                        :{" "}
                                        {item.sourceType === "editor"
                                          ? getPlainTextFromHtml(item.sourceValue).slice(0, 120) ||
                                            "Rich text material"
                                          : item.sourceValue}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="outline"
                                      className="border-[#D8E5E9] text-[#0A1B45] hover:bg-[#F3F8FA]"
                                      onClick={() => handleEditItem(section.id, item)}
                                    >
                                      <Pencil className="mr-2 h-4 w-4" />
                                      Edit
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      className="text-[#B42318] hover:bg-[#FDECEC] hover:text-[#B42318]"
                                      onClick={() => handleDeleteItem(section.id, item.id)}
                                      disabled={isSavingLecture}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </Button>
                                  </div>
                                </div>
                              );
                            })}

                          <div className="rounded-[1.25rem] border border-dashed border-[#D8E5E9] bg-[#FCFEFE] p-4">
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <div className="font-semibold text-[#0A1B45]">
                                  {editingItemId ? "Edit item" : "Add section item"}
                                </div>
                                <div className="text-sm text-[#476074]">
                                  Video dan material ditambahkan langsung ke section ini.
                                </div>
                              </div>
                              <Button
                                variant={isActiveComposer ? "outline" : "default"}
                                className={isActiveComposer ? "border-[#D8E5E9]" : "bg-[#308279] hover:bg-[#308279]/90"}
                                onClick={() => {
                                  if (isActiveComposer) {
                                    resetItemDraft();
                                  } else {
                                    openNewItemComposer(section.id);
                                  }
                                }}
                              >
                                <Plus className="mr-2 h-4 w-4" />
                                {isActiveComposer ? "Close" : "Add item"}
                              </Button>
                            </div>

                            {isActiveComposer && (
                              <div className="mt-4 rounded-2xl border border-[#D8E5E9] bg-white p-5 shadow-sm">
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <Label htmlFor={`item-title-${section.id}`}>Item title</Label>
                                    <Input
                                      id={`item-title-${section.id}`}
                                      placeholder="e.g. Array Fundamentals"
                                      value={itemDraft.title}
                                      onChange={(event) =>
                                        setItemDraft({ ...itemDraft, title: event.target.value })
                                      }
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label>Item type</Label>
                                    <div className="relative inline-flex w-full rounded-2xl border border-[#D8E5E9] bg-[#F7FAFB] p-1">
                                      <div
                                        aria-hidden="true"
                                        className={`absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-[0.9rem] bg-[#0A1B45] transition-transform duration-300 ease-out ${
                                          itemDraft.type === "video" ? "translate-x-0" : "translate-x-full"
                                        }`}
                                      />
                                      {([
                                        { value: "video", label: "Video" },
                                        { value: "material", label: "Material" },
                                      ] as const).map((option) => {
                                        const isActive = itemDraft.type === option.value;

                                        return (
                                          <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => handleItemTypeChange(option.value)}
                                            className={`relative z-10 flex-1 rounded-[0.9rem] px-4 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                                              isActive
                                                ? "text-white"
                                                : "text-[#476074] hover:bg-transparent hover:text-[#0A1B45]"
                                            }`}
                                          >
                                            {option.label}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor={`item-description-${section.id}`}>Item description</Label>
                                    <Textarea
                                      id={`item-description-${section.id}`}
                                      rows={3}
                                      placeholder="Explain how this item is used in the class..."
                                      value={itemDraft.description}
                                      onChange={(event) =>
                                        setItemDraft({ ...itemDraft, description: event.target.value })
                                      }
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor={`item-duration-${section.id}`}>Duration (minutes)</Label>
                                    <Input
                                      id={`item-duration-${section.id}`}
                                      type="number"
                                      min="1"
                                      placeholder="e.g. 15"
                                      value={itemDraft.duration}
                                      onChange={(event) =>
                                        setItemDraft({ ...itemDraft, duration: event.target.value })
                                      }
                                    />
                                  </div>

                                  {itemDraft.type === "material" ? (
                                    <div className="space-y-2">
                                      <Label>Material content</Label>
                                      <div className="material-editor-shell overflow-hidden rounded-[1.25rem] border border-[#D8E5E9] bg-white shadow-sm">
                                        <CKEditor
                                          editor={ClassicEditor}
                                          config={materialEditorConfig}
                                          data={itemDraft.sourceValue}
                                          onReady={(editor) => {
                                            const wordCountPlugin = editor.plugins.get("WordCount") as {
                                              wordCountContainer?: HTMLElement;
                                            };
                                            const container = wordCountContainersRef.current[section.id];

                                            if (container && wordCountPlugin.wordCountContainer) {
                                              container.innerHTML = "";
                                              container.appendChild(wordCountPlugin.wordCountContainer);
                                            }
                                          }}
                                          onChange={(_, editor) =>
                                            setItemDraft((current) => ({
                                              ...current,
                                              sourceType: "editor",
                                              sourceValue: editor.getData(),
                                            }))
                                          }
                                        />
                                        <div
                                          ref={(node) => {
                                            wordCountContainersRef.current[section.id] = node;
                                          }}
                                          className="material-editor-wordcount border-t border-[#E5EEF1] bg-[#FAFCFD] px-4 py-2"
                                        />
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="space-y-2">
                                      <Label htmlFor={`item-source-value-${section.id}`}>YouTube URL</Label>
                                      <div className="rounded-2xl border border-[#D8E5E9] bg-[#F9FCFD] p-4">
                                        <div className="mb-3 text-sm font-semibold text-[#0A1B45]">
                                          Upload video materi ke YouTube
                                        </div>
                                        <p className="mb-4 text-sm leading-6 text-[#476074]">
                                          Upload video dengan visibility <span className="font-semibold text-[#0A1B45]">unlisted</span>
                                          , kemudian cantumkan URL video di sini.
                                        </p>
                                      <Input
                                        id={`item-source-value-${section.id}`}
                                        placeholder="https://www.youtube.com/watch?v=... atau https://youtu.be/..."
                                        value={itemDraft.sourceValue}
                                        onChange={(event) =>
                                          setItemDraft({ ...itemDraft, sourceValue: event.target.value })
                                        }
                                      />
                                      </div>
                                    </div>
                                  )}

                                  <div className="flex gap-3">
                                    <Button
                                      className="flex-1 bg-[#308279] hover:bg-[#308279]/90"
                                      onClick={handleItemSubmit}
                                      disabled={isSavingLecture}
                                    >
                                      <Plus className="mr-2 h-4 w-4" />
                                      {editingItemId ? "Save Item" : "Add Item"}
                                    </Button>
                                    <Button variant="outline" className="border-[#D8E5E9]" onClick={resetItemDraft}>
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}

                  {isCreatingSection || sections.length === 0 ? (
                    <Card className="rounded-[1.5rem] border-[#D8E5E9] bg-white p-8 shadow-[0_18px_42px_rgba(10,27,69,0.07)]">
                      <div className="max-w-3xl">
                        <h3 className="mt-5 text-3xl font-bold text-[#0A1B45]">
                          {sections.length === 0 ? "Create first section" : "Create another section"}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-[#476074]">
                          Section menjadi wadah utama untuk video dan material. Setelah section
                          dibuat, kamu bisa langsung menambahkan item pembelajaran di card yang sama.
                        </p>
                      </div>

                      <div className="grid gap-8">
                        <div className="space-y-5">
                          <div className="space-y-2">
                            <Label htmlFor="section-title">Section title</Label>
                            <Input
                              id="section-title"
                              placeholder="e.g. Arrays & Strings"
                              value={sectionDraft.title}
                              onChange={(event) =>
                                setSectionDraft({ ...sectionDraft, title: event.target.value })
                              }
                            />
                          </div>
                          <div className="flex gap-3">
                            <Button
                              className="bg-[#0A1B45] hover:bg-[#308279]"
                              onClick={handleSectionSubmit}
                              disabled={isSavingSection}
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add Section
                            </Button>
                            {(sectionDraft.title || sections.length > 0) && (
                              <Button variant="outline" className="border-[#D8E5E9]" onClick={resetSectionDraft}>
                                Reset
                              </Button>
                            )}
                            
                          </div>
                        </div>
                      </div>
                    </Card>
                  ) : (
                    <button
                      type="button"
                      onClick={startCreateSection}
                      className="flex w-full items-center justify-center gap-2 rounded-[1.25rem] border border-dashed border-[#D8E5E9] bg-[#FAFCFD] px-5 py-5 text-sm font-semibold text-[#476074] transition hover:border-[#308279] hover:bg-[#F4FAF8] hover:text-[#0A1B45]"
                    >
                      <Plus className="h-4 w-4" />
                      Add another section
                    </button>
                  )}
              </div>
            </TabsContent>

            <TabsContent value="live">
              <Card className="rounded-[1.75rem] border-[#D8E5E9] bg-white p-8 shadow-[0_18px_42px_rgba(10,27,69,0.07)]">
                <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-[#0A1B45]">Live Session Schedule</h2>
                    <p className="mt-2 max-w-3xl text-sm leading-7 text-[#476074]">
                      Add session dates, assigned tutors, platform, and meeting links after the live-session package is active.
                    </p>
                  </div>
                  <Button className="bg-[#308279] hover:bg-[#308279]/90" onClick={addLiveSession}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Session
                  </Button>
                </div>

                  <div className="space-y-4">
                    {liveSessions.map((session, index) => (
                      <div key={session.id} className="rounded-2xl border border-[#D8E5E9] bg-[#FAFCFD] p-5">
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#92A4AE]">
                              Session {index + 1}
                            </div>
                            <h3 className="mt-1 text-lg font-bold text-[#0A1B45]">
                              {session.topic || "Untitled live session"}
                            </h3>
                          </div>
                          <Button
                            variant="ghost"
                            className="text-[#B42318] hover:bg-[#FDECEC] hover:text-[#B42318]"
                            onClick={() => removeLiveSession(session.id)}
                            disabled={liveSessions.length === 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                          <div className="space-y-2">
                            <Label>Topic</Label>
                            <Input
                              value={session.topic}
                              onChange={(event) =>
                                updateLiveSession(session.id, (current) => ({
                                  ...current,
                                  topic: event.target.value,
                                }))
                              }
                              placeholder="e.g. Research critique"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Batch</Label>
                            <select
                              value={session.batchName}
                              onChange={(event) =>
                                updateLiveSession(session.id, (current) => ({
                                  ...current,
                                  batchName: event.target.value,
                                }))
                              }
                              className="w-full rounded-md border border-[#D8E5E9] bg-white p-2"
                            >
                              {batchOptions.map((batch) => (
                                <option key={batch} value={batch}>
                                  {batch}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label>Assigned tutor</Label>
                            <select
                              value={session.tutorId}
                              onChange={(event) =>
                                updateLiveSession(session.id, (current) => ({
                                  ...current,
                                  tutorId: event.target.value,
                                }))
                              }
                              className="w-full rounded-md border border-[#D8E5E9] bg-white p-2"
                            >
                              <option value="">Select tutor</option>
                              {tutorOptions.map((tutor) => (
                                <option key={tutor.id} value={tutor.id}>
                                  {tutor.name} ({tutor.username})
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label>Date</Label>
                            <Input
                              type="date"
                              value={session.sessionDate}
                              onChange={(event) =>
                                updateLiveSession(session.id, (current) => ({
                                  ...current,
                                  sessionDate: event.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Start time</Label>
                            <Input
                              type="time"
                              value={session.startsAt}
                              onChange={(event) =>
                                updateLiveSession(session.id, (current) => ({
                                  ...current,
                                  startsAt: event.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>End time</Label>
                            <Input
                              type="time"
                              value={session.endsAt}
                              onChange={(event) =>
                                updateLiveSession(session.id, (current) => ({
                                  ...current,
                                  endsAt: event.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Platform</Label>
                            <select
                              value={session.platform}
                              onChange={(event) =>
                                updateLiveSession(session.id, (current) => ({
                                  ...current,
                                  platform: event.target.value as LiveSessionDraft["platform"],
                                }))
                              }
                              className="w-full rounded-md border border-[#D8E5E9] bg-white p-2"
                            >
                              <option>Zoom</option>
                              <option>Google Meet</option>
                              <option>LMS Meeting Room</option>
                            </select>
                          </div>
                          <div className="space-y-2 xl:col-span-2">
                            <Label>Meeting link</Label>
                            <Input
                              value={session.meetingLink}
                              onChange={(event) =>
                                updateLiveSession(session.id, (current) => ({
                                  ...current,
                                  meetingLink: event.target.value,
                                }))
                              }
                              placeholder="https://zoom.us/j/..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
              </Card>
            </TabsContent>

            <TabsContent value="quizzes">
              <div className="space-y-6">

                {isQuizComposerOpen && !editingQuizId ? renderQuizComposer() : null}

                {quizzes.map((quiz) => (
                  editingQuizId === quiz.id ? (
                    <div key={quiz.id}>{renderQuizComposer()}</div>
                  ) : (
                    <Card
                      key={quiz.id}
                      className="rounded-[1.5rem] border-[#D8E5E9] bg-white p-6 shadow-[0_18px_42px_rgba(10,27,69,0.07)]"
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FCEFC7] text-[#7A5A00]">
                            <ClipboardCheck className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-lg font-semibold text-[#0A1B45]">{quiz.title}</h3>
                              <Badge className="border-0 bg-[#FCEFC7] text-[#7A5A00]">Quiz</Badge>
                              <Badge
                                className={
                                  quiz.status === "Published"
                                    ? "border-0 bg-[#308279]/10 text-[#308279]"
                                    : "border-0 bg-[#FCEFC7] text-[#7A5A00]"
                                }
                              >
                                {quiz.status}
                              </Badge>
                            </div>
                            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#476074]">
                              {quiz.description}
                            </p>
                            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-[#92A4AE]">
                              <span>{quiz.questions.length} question{quiz.questions.length === 1 ? "" : "s"}</span>
                              <span>•</span>
                              <span>
                                {quiz.questions.filter((question) => question.type === "multiple_answer").length} multiple
                                {" "}answer
                              </span>
                              <span>•</span>
                              <span>
                                {quiz.questions.filter((question) => question.type === "fill_answer").length} fill
                                {" "}answer
                              </span>
                            </div>
                            <div className="mt-3 space-y-1 text-xs font-medium uppercase tracking-[0.14em] text-[#92A4AE]">
                              <div>
                                Batches assigned for: {quiz.assignedBatches.join(", ")}
                              </div>
                              <div>
                                Opens: {new Date(quiz.opensAt).toLocaleString("id-ID")}
                              </div>
                              <div>
                                Closes: {new Date(quiz.closesAt).toLocaleString("id-ID")}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button
                            variant="outline"
                            className="border-[#D8E5E9] text-[#0A1B45] hover:bg-[#F3F8FA]"
                            onClick={() => handleEditQuiz(quiz)}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Quiz
                          </Button>
                          <Button
                            variant="ghost"
                            className="text-[#B42318] hover:bg-[#FDECEC] hover:text-[#B42318]"
                            onClick={() => handleDeleteQuiz(quiz.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )
                ))}
                {quizzes.length === 0 && !isQuizComposerOpen ? (
                  <button
                    type="button"
                    onClick={openNewQuizComposer}
                    className="flex w-full items-center justify-center gap-2 rounded-[1.25rem] border border-dashed border-[#D8E5E9] bg-[#FAFCFD] px-5 py-6 text-sm font-semibold text-[#476074] transition hover:border-[#308279] hover:bg-[#F4FAF8] hover:text-[#0A1B45]"
                  >
                    <Plus className="h-4 w-4" />
                    Create your first quiz
                  </button>
                ) : null}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
