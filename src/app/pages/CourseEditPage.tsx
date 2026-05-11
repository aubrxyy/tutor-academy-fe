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
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import {
  ArrowLeft,
  ClipboardCheck,
  FileText,
  Pencil,
  Plus,
  Save,
  Trash2,
  Video,
} from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Textarea } from "../components/ui/textarea";
import { toast } from "sonner";
import { useTutorUsers } from "../api/admin";
import {
  CREATE_COURSE,
  GET_COURSE_BY_ID,
  UPDATE_COURSE,
  type Course,
  type CourseInput,
  type CourseLevel,
  type CourseStatus,
} from "../api/courses";

type EditorTab = "basic" | "curriculum" | "quizzes";
type CurriculumItemType = "video" | "material";
type CurriculumSourceType = "upload" | "link" | "editor";

type CurriculumItem = {
  id: number;
  title: string;
  type: CurriculumItemType;
  description: string;
  sourceType: CurriculumSourceType;
  sourceValue: string;
  status: "Published" | "Draft";
};

type CurriculumSection = {
  id: number;
  title: string;
  summary: string;
  items: CurriculumItem[];
};

type SectionDraft = {
  title: string;
  summary: string;
};

type ItemDraft = {
  title: string;
  type: CurriculumItemType;
  description: string;
  sourceType: CurriculumSourceType;
  sourceValue: string;
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
  durationValue: string;
  durationUnit: "week" | "month";
  totalBatches: string;
  totalDuration: string;
  price: string;
  isFree: boolean;
  level: CourseLevel;
  tutorIds: string[];
  status: CourseStatus;
};

const emptySectionDraft: SectionDraft = {
  title: "",
  summary: "",
};

const emptyItemDraft: ItemDraft = {
  title: "",
  type: "video",
  description: "",
  sourceType: "link",
  sourceValue: "",
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

function parseDurationParts(value: string) {
  const match = value.trim().match(/^(\d+)\s*(week|weeks|month|months)$/i);

  if (!match) {
    return {
      durationValue: value.trim(),
      durationUnit: "week" as "week" | "month",
    };
  }

  return {
    durationValue: match[1],
    durationUnit: match[2].toLowerCase().startsWith("month") ? ("month" as const) : ("week" as const),
  };
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

export default function CourseEditPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const wordCountContainersRef = useRef<Record<number, HTMLDivElement | null>>({});
  const isNewClass = courseId === "new";
  const initialTab = searchParams.get("tab");
  const activeTab: EditorTab =
    initialTab === "curriculum" || initialTab === "videos"
      ? "curriculum"
      : initialTab === "quizzes"
        ? "quizzes"
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
  const [createCourse, { loading: isCreatingCourse }] = useMutation(CREATE_COURSE);
  const [updateCourse, { loading: isUpdatingCourse }] = useMutation(UPDATE_COURSE);
  const tutorOptions = tutorUsersData?.users?.nodes ?? [];
  const isSavingCourse = isCreatingCourse || isUpdatingCourse;

  const [classData, setClassData] = useState<CourseFormState>({
    title: "",
    subtitle: "",
    description: "",
    durationValue: "",
    durationUnit: "week",
    totalBatches: "1",
    totalDuration: "",
    price: "",
    isFree: false,
    level: "BEGINNER",
    tutorIds: [],
    status: "DRAFT",
  });
  const batchCount = Math.max(1, Number.parseInt(classData.totalBatches, 10) || 1);
  const batchOptions = Array.from({ length: batchCount }, (_, index) => `Batch ${index + 1}`);

  const [sections, setSections] = useState<CurriculumSection[]>(
    isNewClass
      ? []
      : [
          {
            id: 1,
            title: "Introduction & Fundamentals",
            summary:
              "Pondasi course, learning path, dan konsep dasar complexity yang dibutuhkan sebelum masuk ke latihan cohort.",
            items: [
              {
                id: 1,
                title: "Class Overview & Learning Path",
                type: "video",
                description:
                  "Video pembuka untuk menjelaskan struktur pembelajaran, target capaian, dan ritme cohort.",
                sourceType: "link",
                sourceValue: "https://example.com/class-overview",
                status: "Published",
              },
              {
                id: 2,
                title: "Big O Notation Cheat Sheet",
                type: "material",
                description: "PDF reference untuk notasi kompleksitas yang dipakai di seluruh class.",
                sourceType: "editor",
                sourceValue:
                  "<h2>Big O Notation Cheat Sheet</h2><p>Ringkasan kompleksitas waktu dan ruang untuk operasi array, linked list, stack, queue, dan tree yang dipakai sepanjang class.</p><ul><li>Access array: O(1)</li><li>Insert linked list head: O(1)</li><li>Binary search: O(log n)</li></ul>",
                status: "Published",
              },
            ],
          },
          {
            id: 2,
            title: "Arrays & Strings",
            summary:
              "Section yang menampung video core arrays, materi pendukung, dan quiz class-level untuk checkpoint awal.",
            items: [
              {
                id: 3,
                title: "Array Fundamentals",
                type: "video",
                description:
                  "Konsep dasar array, operasi umum, dan problem framing sebelum live cohort dimulai.",
                sourceType: "link",
                sourceValue: "dQw4w9WgXcQ",
                status: "Published",
              },
            ],
          },
        ],
  );
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

  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(sections[0]?.id ?? null);
  const [editingSectionId, setEditingSectionId] = useState<number | null>(null);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editingQuizId, setEditingQuizId] = useState<number | null>(null);
  const [isCreatingSection, setIsCreatingSection] = useState(isNewClass);
  const [sectionDraft, setSectionDraft] = useState<SectionDraft>(emptySectionDraft);
  const [itemDraft, setItemDraft] = useState<ItemDraft>(emptyItemDraft);
  const [quizDraft, setQuizDraft] = useState<QuizDraft>(emptyQuizDraft);
  const [isItemComposerOpen, setIsItemComposerOpen] = useState(false);
  const [isQuizComposerOpen, setIsQuizComposerOpen] = useState(isNewClass);
  const [isUploadDragActive, setIsUploadDragActive] = useState(false);

  useEffect(() => {
    const course = courseData?.courses?.nodes?.[0];
    if (!course || isNewClass) return;
    const parsedDuration = parseDurationParts(`${course.totalDuration} weeks`);

    setClassData({
      title: course.title,
      subtitle: course.shortDescription,
      description: course.description,
      durationValue: parsedDuration.durationValue,
      durationUnit: parsedDuration.durationUnit,
      totalBatches: "1",
      totalDuration: String(course.totalDuration),
      price: String(course.price),
      isFree: course.isFree,
      level: course.level,
      tutorIds: course.tutorId,
      status: course.status,
    });
  }, [courseData, isNewClass]);

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
  };

  const openNewQuizComposer = () => {
    setEditingQuizId(null);
    setQuizDraft(emptyQuizDraft());
    setIsQuizComposerOpen(true);
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

  const renderQuizComposer = () => (
    <Card className="rounded-[1.5rem] border-[#D8E5E9] bg-white p-8 shadow-[0_18px_42px_rgba(10,27,69,0.07)]">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h3 className="text-2xl font-bold text-[#0A1B45]">
              {editingQuizId ? "Edit Quiz" : "Create New Quiz"}
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#476074]">
              Compose quiz metadata, then add questions below. Multiple answer
              questions can have more than one correct option.
            </p>
          </div>
          <Button variant="outline" className="border-[#D8E5E9]" onClick={resetQuizDraft}>
            Cancel
          </Button>
        </div>

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

        <div className="flex flex-wrap gap-3">
          <Button className="bg-[#308279] hover:bg-[#308279]/90" onClick={handleQuizSubmit}>
            <Save className="mr-2 h-4 w-4" />
            {editingQuizId ? "Save Quiz" : "Create Quiz"}
          </Button>
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

  const handleSectionSubmit = () => {
    if (!sectionDraft.title.trim() || !sectionDraft.summary.trim()) {
      toast.error("Please complete the section title and summary.");
      return;
    }

    if (editingSectionId) {
      setSections((current) =>
        current.map((section) =>
          section.id === editingSectionId
            ? {
                ...section,
                title: sectionDraft.title.trim(),
                summary: sectionDraft.summary.trim(),
              }
            : section,
        ),
      );
      toast.success("Section updated");
    } else {
      const nextId = Date.now();
      setSections((current) => [
        ...current,
        {
          id: nextId,
          title: sectionDraft.title.trim(),
          summary: sectionDraft.summary.trim(),
          items: [],
        },
      ]);
      setSelectedSectionId(nextId);
      toast.success("Section created");
    }

    resetSectionDraft();
  };

  const handleEditSection = (section: CurriculumSection) => {
    setSelectedSectionId(section.id);
    setEditingSectionId(section.id);
    setIsCreatingSection(false);
    setSectionDraft({
      title: section.title,
      summary: section.summary,
    });
  };

  const handleCancelSectionEdit = () => {
    resetSectionDraft();
  };

  const handleDeleteSection = (sectionId: number) => {
    const remaining = sections.filter((section) => section.id !== sectionId);
    setSections(remaining);

    if (selectedSectionId === sectionId) {
      setSelectedSectionId(remaining[0]?.id ?? null);
    }
    if (editingSectionId === sectionId) {
      resetSectionDraft();
    }
    if (remaining.length === 0) {
      setIsCreatingSection(true);
    }

    toast.success("Section deleted");
  };

  const handleItemTypeChange = (type: CurriculumItemType) => {
    setItemDraft((current) => ({
      ...current,
      type,
      sourceType: type === "material" ? "editor" : "link",
      sourceValue: current.type === "material" && type !== "material" ? "" : current.sourceValue,
    }));
  };

  const handleItemSubmit = () => {
    if (!selectedSectionId) {
      toast.error("Create or select a section first.");
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

    const normalizedVideoId =
      itemDraft.type === "video" ? extractYouTubeVideoId(itemDraft.sourceValue) : null;

    if (itemDraft.type === "video" && !normalizedVideoId) {
      toast.error("Please paste a valid YouTube video URL or 11-character video ID.");
      return;
    }

    if (editingItemId) {
      setSections((current) =>
        current.map((section) =>
          section.id !== selectedSectionId
            ? section
            : {
                ...section,
                items: section.items.map((item) =>
                  item.id === editingItemId
                    ? {
                        ...item,
                        title: itemDraft.title.trim(),
                        type: itemDraft.type,
                        description: itemDraft.description.trim(),
                        sourceType: itemDraft.type === "material" ? "editor" : "link",
                        sourceValue:
                          itemDraft.type === "material"
                            ? itemDraft.sourceValue.trim()
                            : normalizedVideoId ?? itemDraft.sourceValue.trim(),
                      }
                    : item,
                ),
              },
        ),
      );
      toast.success("Curriculum item updated");
    } else {
      const nextId = Date.now();
      setSections((current) =>
        current.map((section) =>
          section.id !== selectedSectionId
            ? section
            : {
                ...section,
                items: [
                  ...section.items,
                  {
                    id: nextId,
                    title: itemDraft.title.trim(),
                    type: itemDraft.type,
                    description: itemDraft.description.trim(),
                    sourceType: itemDraft.type === "material" ? "editor" : "link",
                    sourceValue:
                      itemDraft.type === "material"
                        ? itemDraft.sourceValue.trim()
                        : normalizedVideoId ?? itemDraft.sourceValue.trim(),
                    status: "Draft",
                  },
                ],
              },
        ),
      );
      toast.success("Curriculum item created");
    }

    resetItemDraft();
  };

  const handleEditItem = (sectionId: number, item: CurriculumItem) => {
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
      });
  };

  const handleDeleteItem = (sectionId: number, itemId: number) => {
    setSections((current) =>
      current.map((section) =>
        section.id !== sectionId
          ? section
          : {
              ...section,
              items: section.items.filter((item) => item.id !== itemId),
            },
      ),
    );

    if (editingItemId === itemId) {
      resetItemDraft();
    }

    toast.success("Curriculum item deleted");
  };

  const buildCourseInput = (): CourseInput | null => {
    const totalDurationValue = classData.totalDuration.trim() || classData.durationValue.trim();
    const totalDuration = Number(totalDurationValue);
    const price = classData.isFree ? 0 : Number(classData.price);

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

    if (classData.tutorIds.length === 0) {
      toast.error("Assign at least one tutor before saving.");
      return null;
    }

    return {
      tutorId: classData.tutorIds,
      title: classData.title.trim(),
      description: classData.description.trim(),
      shortDescription: classData.subtitle.trim(),
      price,
      level: classData.level,
      isFree: classData.isFree,
      status: classData.status,
      totalSections: sections.length,
      totalLectures: curriculumSummary.totalVideos + curriculumSummary.totalMaterials + curriculumSummary.totalQuizzes,
      totalDuration,
    };
  };

  const handleSaveChanges = async () => {
    const input = buildCourseInput();
    if (!input) return;

    try {
      if (isNewClass) {
        await createCourse({
          variables: { input },
          refetchQueries: ["GetAdminPanelData", "GetPublishedCourses"],
        });
        toast.success("New class created", {
          description: `${input.title} has been saved as ${input.status.toLowerCase()}.`,
        });
        navigate("/admin-dashboard?view=classes");
        return;
      }

      await updateCourse({
        variables: { id: courseId, input },
        refetchQueries: ["GetAdminPanelData", "GetPublishedCourses", "GetCourseById"],
      });
      toast.success("Class changes saved", {
        description: `${input.title} has been updated.`,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Please try again.";
      toast.error("Unable to save class", { description: message });
    }
  };

  const openNewItemComposer = (sectionId: number) => {
    setSelectedSectionId(sectionId);
    setEditingItemId(null);
    setItemDraft(emptyItemDraft);
    setIsItemComposerOpen(true);
  };

  return (
    <div className="bg-[#F3F8FA] lg:flex">
      <AdminSidebar activeView="classes" />

      <main className="min-w-0 flex-1">
        <div className="border-b border-[#D8E5E9] bg-gradient-to-r from-[#0A1B45] via-[#123061] to-[#308279] text-white">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
            <Link to="/admin-dashboard?view=classes">
              <Button variant="ghost" className="mb-6 text-white hover:bg-white/10">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Classes
              </Button>
            </Link>

            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="mt-5 text-4xl font-bold tracking-[-0.03em]">
                  {isNewClass ? "Create New Class" : "Edit Class"}
                </h1>
                <p className="mt-3 max-w-3xl text-white/80">
                  Manage class details, build section-based curriculum for videos and materials,
                  and keep quizzes in a separate class-level workflow.
                </p>
              </div>

              <div className="flex flex-col gap-4 lg:items-end">
                {activeTab === "curriculum" ? (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-2xl border border-white/15 bg-white/10 px-2 py-3 backdrop-blur-sm">
                      <div className="text-[10px] uppercase tracking-[0.14em] text-white/65">Sections</div>
                      <div className="mt-1 text-2xl font-bold text-white">{curriculumSummary.totalSections}</div>
                    </div>
                    <div className="rounded-2xl border border-white/15 bg-white/10 px-2 py-3 backdrop-blur-sm">
                      <div className="text-[10px] uppercase tracking-[0.14em] text-white/65">Videos</div>
                      <div className="mt-1 text-2xl font-bold text-white">{curriculumSummary.totalVideos}</div>
                    </div>
                    <div className="rounded-2xl border border-white/15 bg-white/10 px-2 py-3 backdrop-blur-sm">
                      <div className="text-[10px] uppercase tracking-[0.14em] text-white/65">Materials</div>
                      <div className="mt-1 text-2xl font-bold text-white">{curriculumSummary.totalMaterials}</div>
                    </div>
                    <div className="rounded-2xl border border-white/15 bg-white/10 px-2 py-3 backdrop-blur-sm">
                      <div className="text-[10px] uppercase tracking-[0.14em] text-white/65">Quizzes</div>
                      <div className="mt-1 text-2xl font-bold text-white">{curriculumSummary.totalQuizzes}</div>
                    </div>
                  </div>
                ) : null}
                <Button
                  className="bg-white text-[#0A1B45] hover:bg-white/90"
                  onClick={handleSaveChanges}
                  disabled={isSavingCourse || isCourseLoading}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isSavingCourse ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
          <Tabs value={activeTab} onValueChange={(value) => setTab(value as EditorTab)} className="w-full">
            <TabsList className="mb-8 grid w-full max-w-3xl grid-cols-3 rounded-2xl border border-[#D8E5E9] bg-white p-1">
              <TabsTrigger
                value="basic"
                className="rounded-xl font-semibold text-[#476074] data-[state=active]:border-[#0A1B45]/10 data-[state=active]:bg-[#0A1B45] data-[state=active]:text-white"
              >
                Class Information
              </TabsTrigger>
              <TabsTrigger
                value="curriculum"
                className="rounded-xl font-semibold text-[#476074] data-[state=active]:border-[#0A1B45]/10 data-[state=active]:bg-[#0A1B45] data-[state=active]:text-white"
              >
                Curriculum Builder
              </TabsTrigger>
              <TabsTrigger
                value="quizzes"
                className="rounded-xl font-semibold text-[#476074] data-[state=active]:border-[#0A1B45]/10 data-[state=active]:bg-[#0A1B45] data-[state=active]:text-white"
              >
                Quizzes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <Card className="rounded-[1.75rem] border-[#D8E5E9] bg-white p-8 shadow-[0_18px_42px_rgba(10,27,69,0.07)]">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-[#0A1B45]">Class Information</h2>
                    <p className="mt-2 text-sm text-[#476074]">
                      Batch setup is waiting for backend support. This form saves the core class data.
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
                      <Label htmlFor="title">Class Title</Label>
                      <Input
                        id="title"
                        value={classData.title}
                        onChange={(event) => setClassData({ ...classData, title: event.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subtitle">Subtitle</Label>
                      <Input
                        id="subtitle"
                        value={classData.subtitle}
                        onChange={(event) => setClassData({ ...classData, subtitle: event.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={classData.description}
                      onChange={(event) => setClassData({ ...classData, description: event.target.value })}
                      rows={6}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-5">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (Rp)</Label>
                      <Input
                        id="price"
                        type="number"
                        min="0"
                        value={classData.price}
                        onChange={(event) => setClassData({ ...classData, price: event.target.value })}
                        disabled={classData.isFree}
                        placeholder="499000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <div className="grid grid-cols-[minmax(0,1fr)_120px] gap-3">
                        <Input
                          id="duration"
                          type="number"
                          min="1"
                          value={classData.durationValue}
                          onChange={(event) =>
                            setClassData({ ...classData, durationValue: event.target.value })
                          }
                          placeholder="12"
                        />
                        <select
                          aria-label="Duration unit"
                          value={classData.durationUnit}
                          onChange={(event) =>
                            setClassData({
                              ...classData,
                              durationUnit: event.target.value as "week" | "month",
                            })
                          }
                          className="w-full rounded-md border border-[#D8E5E9] bg-white p-2"
                        >
                          <option value="week">Week</option>
                          <option value="month">Month</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="total-batches">Total Batches</Label>
                      <Input
                        id="total-batches"
                        type="number"
                        min="1"
                        value={classData.totalBatches}
                        onChange={(event) =>
                          setClassData({ ...classData, totalBatches: event.target.value })
                        }
                        placeholder="3"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="totalDuration">Course Duration Estimate</Label>
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
                    <div className="space-y-2">
                      <Label htmlFor="level">Level</Label>
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
                      <Label htmlFor="status">Publishing Status</Label>
                      <select
                        id="status"
                        value={classData.status}
                        onChange={(event) =>
                          setClassData({
                            ...classData,
                            status: event.target.value as CourseStatus,
                          })
                        }
                        className="w-full rounded-md border border-[#D8E5E9] bg-white p-2"
                      >
                        {courseStatusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="isFree">Pricing Type</Label>
                      <select
                        id="isFree"
                        value={classData.isFree ? "free" : "paid"}
                        onChange={(event) =>
                          setClassData({
                            ...classData,
                            isFree: event.target.value === "free",
                            price: event.target.value === "free" ? "0" : classData.price,
                          })
                        }
                        className="w-full rounded-md border border-[#D8E5E9] bg-white p-2"
                      >
                        <option value="paid">Paid</option>
                        <option value="free">Free</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tutors">Assigned Tutors</Label>
                      <select
                        id="tutors"
                        multiple
                        value={classData.tutorIds}
                        onChange={(event) =>
                          setClassData({
                            ...classData,
                            tutorIds: Array.from(event.target.selectedOptions).map(
                              (option) => option.value,
                            ),
                          })
                        }
                        className="min-h-24 w-full rounded-md border border-[#D8E5E9] bg-white p-2"
                        disabled={isTutorUsersLoading}
                      >
                        {tutorOptions.map((tutor) => (
                          <option key={tutor.id} value={tutor.id}>
                            {tutor.name} ({tutor.username})
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-[#476074]">
                        Course-level tutor assignment only. Batch assignment will be added when the Batch API is ready.
                      </p>
                    </div>
                  </div>
                </form>
              </Card>
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
                                <Textarea
                                  rows={3}
                                  value={sectionDraft.summary}
                                  onChange={(event) =>
                                    setSectionDraft({ ...sectionDraft, summary: event.target.value })
                                  }
                                  placeholder="Section summary"
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
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedSectionId(section.id);
                                    setIsCreatingSection(false);
                                  }}
                                  className="block w-full max-w-3xl text-left"
                                >
                                  <div className="inline-flex items-start gap-2 border-b border-dashed border-[#C7DCE0] pb-1">
                                    <p className="text-sm leading-6 text-[#476074]">{section.summary}</p>
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
                                      className="mt-1 inline-flex shrink-0 cursor-pointer text-[#92A4AE] transition hover:text-[#0A1B45]"
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
                                <Button className="bg-[#0A1B45] hover:bg-[#308279]" onClick={handleSectionSubmit}>
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
                                    <Button className="flex-1 bg-[#308279] hover:bg-[#308279]/90" onClick={handleItemSubmit}>
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
                          Section menjadi wadah utama untuk video dan material. Mulai dari
                          judul dan ringkasan dulu, nanti setelah section dibuat kamu bisa langsung
                          menambahkan item pembelajaran di card yang sama.
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
                          <div className="space-y-2">
                            <Label htmlFor="section-summary">Summary</Label>
                            <Textarea
                              id="section-summary"
                              rows={5}
                              placeholder="Summarize the purpose of this section..."
                              value={sectionDraft.summary}
                              onChange={(event) =>
                                setSectionDraft({ ...sectionDraft, summary: event.target.value })
                              }
                            />
                          </div>
                          <div className="flex gap-3">
                            <Button className="bg-[#0A1B45] hover:bg-[#308279]" onClick={handleSectionSubmit}>
                              <Plus className="mr-2 h-4 w-4" />
                              Add Section
                            </Button>
                            {(sectionDraft.title || sectionDraft.summary || sections.length > 0) && (
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
