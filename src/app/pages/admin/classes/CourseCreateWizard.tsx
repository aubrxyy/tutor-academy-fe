import { useEffect, useMemo, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { CombinedGraphQLErrors } from "@apollo/client/errors";
import { useMutation, useQuery } from "@apollo/client/react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Bold,
  ClassicEditor,
  Essentials,
  Heading,
  Italic,
  Link as CKEditorLink,
  List,
  Paragraph,
  Undo,
  type EditorConfig,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ClipboardCheck,
  FileText,
  Pencil,
  Plus,
  Save,
  Trash2,
  Upload,
  Video,
} from "lucide-react";
import { toast } from "sonner";
import { useTutorUsers } from "../../../api/admin";
import { CREATE_BATCH, useCourseBatches, type Batch as BackendBatch, type CreateBatchInput } from "../../../api/batches";
import {
  CREATE_COURSE,
  GET_COURSE_BY_ID,
  UPDATE_COURSE,
  getCoursePackagePricing,
  setCoursePackagePricing,
  type Course,
  type CourseInput,
  type CourseLevel,
  type CourseStatus as BackendCourseStatus,
} from "../../../api/courses";
import AdminSidebar from "../../../components/navigation/AdminSidebar";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import "./course-edit-ckeditor.css";

type CurriculumItemType = "video" | "article";
type PackageType = "video_only" | "article_only" | "video_article" | "video_article_live";
type WizardCourseStatus = "draft" | "published";
type BatchStatus = "open" | "closed";
type IntervalUnit = "days" | "weeks";

type CurriculumItem = {
  id: string;
  type: CurriculumItemType;
  title: string;
  youtubeUrl: string;
  articleContent: string;
};

type CurriculumSection = {
  id: string;
  title: string;
  items: CurriculumItem[];
};

type CoursePackage = {
  id: PackageType;
  name: string;
  description: string;
  enabled: boolean;
  price: number | "";
};

type Batch = {
  id: string;
  name: string;
  enrollmentStart: string;
  enrollmentEnd: string;
  classStart: string;
  classEnd: string;
  quota: number;
  tutorId: string;
  status: BatchStatus;
};

type CourseDraft = {
  title: string;
  subtitle: string;
  category: string;
  description: string;
  thumbnail: string;
  difficulty: string;
  estimatedDuration: string;
  curriculum: CurriculumSection[];
  packages: CoursePackage[];
  batches: Batch[];
  status: WizardCourseStatus;
};

type BatchGenerator = {
  firstBatchStartDate: string;
  numberOfBatches: number | "";
  intervalValue: number | "";
  intervalUnit: IntervalUnit;
  quotaPerBatch: number | "";
  enrollmentOpenBeforeValue: number | "";
  enrollmentOpenBeforeUnit: IntervalUnit;
  enrollmentCloseBeforeValue: number | "";
  enrollmentCloseBeforeUnit: IntervalUnit;
};

type ItemDraft = {
  id?: string;
  sectionId: string;
  type: CurriculumItemType;
  title: string;
  youtubeUrl: string;
  articleContent: string;
};

type CourseByIdData = {
  courses: {
    nodes: Course[];
  } | null;
};

const packageDefaults: CoursePackage[] = [
  {
    id: "video_only",
    name: "Video only",
    description: "Students can access video lessons from the curriculum.",
    enabled: false,
    price: "",
  },
  {
    id: "article_only",
    name: "Article only",
    description: "Students can access written article lessons and templates.",
    enabled: false,
    price: "",
  },
  {
    id: "video_article",
    name: "Video + article",
    description: "Students can access all asynchronous video and article content.",
    enabled: false,
    price: "",
  },
  {
    id: "video_article_live",
    name: "Video + article + live sessions",
    description: "Students get course content plus tutor-led live batch sessions.",
    enabled: false,
    price: "",
  },
];

const initialDraft: CourseDraft = {
  title: "",
  subtitle: "",
  category: "",
  description: "",
  thumbnail: "",
  difficulty: "Beginner",
  estimatedDuration: "",
  curriculum: [
    {
      id: "section-1",
      title: "Introduction",
      items: [
        {
          id: "item-1",
          type: "video",
          title: "Intro to UI/UX",
          youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          articleContent: "",
        },
        {
          id: "item-2",
          type: "article",
          title: "UI/UX Basics Article",
          youtubeUrl: "",
          articleContent: "<p>Introduce core UI/UX concepts, user goals, and product context.</p>",
        },
      ],
    },
  ],
  packages: packageDefaults,
  batches: [],
  status: "draft",
};

const baseSteps = ["Course Info", "Curriculum Builder", "Package & Pricing", "Batch Setup", "Review & Publish"];

const editorConfig: EditorConfig = {
  licenseKey: "GPL",
  plugins: [Essentials, Paragraph, Heading, Bold, Italic, List, CKEditorLink, Undo],
  toolbar: ["undo", "redo", "|", "heading", "|", "bold", "italic", "link", "|", "bulletedList", "numberedList"],
};

const emptyItemDraft = (sectionId: string, type: CurriculumItemType): ItemDraft => ({
  sectionId,
  type,
  title: "",
  youtubeUrl: "",
  articleContent: "",
});

const formatCurrency = (price: number | "") =>
  price === "" ? "No price set" : `Rp ${price.toLocaleString("id-ID")}`;

const toDateInput = (date: Date) => date.toISOString().slice(0, 10);

function addDays(dateString: string, days: number) {
  const date = new Date(`${dateString}T00:00:00`);
  date.setDate(date.getDate() + days);
  return toDateInput(date);
}

function formatDisplayDate(dateString: string) {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day} / ${month} / ${year}`;
}

function durationToDays(value: number | "", unit: IntervalUnit) {
  const safeValue = value || 0;
  return unit === "weeks" ? safeValue * 7 : safeValue;
}

function getIntervalDays(generator: BatchGenerator) {
  return durationToDays(generator.intervalValue || 1, generator.intervalUnit);
}

function getLastBatchEndDate(generator: BatchGenerator) {
  if (!generator.firstBatchStartDate || !generator.numberOfBatches) return "";
  const lastStartOffset = (generator.numberOfBatches - 1) * getIntervalDays(generator);
  return addDays(generator.firstBatchStartDate, lastStartOffset + 27);
}

function getEnabledLivePackage(draft: CourseDraft) {
  return draft.packages.some((coursePackage) => coursePackage.id === "video_article_live" && coursePackage.enabled);
}

function getPackagePrice(draft: CourseDraft, packageId: PackageType) {
  const price = draft.packages.find((coursePackage) => coursePackage.id === packageId)?.price;
  return typeof price === "number" && Number.isFinite(price) ? price : 0;
}

function getBackendCourseLevel(difficulty: string): CourseLevel {
  const normalized = difficulty.toUpperCase();
  if (normalized === "INTERMEDIATE") return "INTERMEDIATE";
  if (normalized === "ADVANCED") return "ADVANCED";
  return "BEGINNER";
}

function getWizardDifficulty(level: CourseLevel) {
  if (level === "INTERMEDIATE") return "Intermediate";
  if (level === "ADVANCED") return "Advanced";
  return "Beginner";
}

function parseDurationMinutes(value: string) {
  const directValue = Number(value);
  if (Number.isFinite(directValue)) return directValue;

  const matchedNumber = value.match(/\d+/)?.[0];
  return matchedNumber ? Number(matchedNumber) : Number.NaN;
}

function getBackendCourseStatus(status: WizardCourseStatus): BackendCourseStatus {
  return status === "published" ? "PUBLISHED" : "DRAFT";
}

function mapBackendBatchToWizardBatch(batch: BackendBatch, index: number): Batch {
  return {
    id: batch.id,
    name: `Batch ${index + 1}`,
    enrollmentStart: formatDisplayDate(batch.startDate) ? toDateInput(new Date(batch.startDate)) : "",
    enrollmentEnd: formatDisplayDate(batch.startDate) ? toDateInput(new Date(batch.startDate)) : "",
    classStart: toDateInput(new Date(batch.startDate)),
    classEnd: toDateInput(new Date(batch.endDate)),
    quota: batch.capacity,
    tutorId: batch.tutorId ?? "",
    status: batch.status === "OPEN" ? "open" : "closed",
  };
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
    const maybeGraphQLErrors = (error as { graphQLErrors?: unknown }).graphQLErrors;
    if (Array.isArray(maybeGraphQLErrors) && maybeGraphQLErrors.length > 0) {
      return maybeGraphQLErrors.map((entry) => formatGraphQLError(entry as Parameters<typeof formatGraphQLError>[0])).join("; ");
    }

    const maybeNetworkError = (error as { networkError?: { message?: string } }).networkError;
    if (maybeNetworkError?.message) {
      return `Network error: ${maybeNetworkError.message}`;
    }
  }

  return error instanceof Error ? error.message : "Please try again.";
}

export default function CourseCreateWizard() {
  const { courseId } = useParams();
  const isEditMode = Boolean(courseId);
  const [persistedCourseId, setPersistedCourseId] = useState<string | null>(courseId ?? null);
  const [currentStep, setCurrentStep] = useState(0);
  const [draft, setDraft] = useState<CourseDraft>(initialDraft);
  const [courseTutorIds, setCourseTutorIds] = useState<string[]>([]);
  const [savedBatchIds, setSavedBatchIds] = useState<Set<string>>(new Set());
  const [sectionTitle, setSectionTitle] = useState("");
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editingSectionTitle, setEditingSectionTitle] = useState("");
  const [itemDraft, setItemDraft] = useState<ItemDraft | null>(null);
  const [batchGenerator, setBatchGenerator] = useState<BatchGenerator>({
    firstBatchStartDate: "",
    numberOfBatches: 2,
    intervalValue: 1,
    intervalUnit: "weeks",
    quotaPerBatch: "",
    enrollmentOpenBeforeValue: 2,
    enrollmentOpenBeforeUnit: "weeks",
    enrollmentCloseBeforeValue: 1,
    enrollmentCloseBeforeUnit: "days",
  });
  const { data: tutorUsersData, loading: isTutorUsersLoading } = useTutorUsers();
  const tutorOptions = tutorUsersData?.users?.nodes ?? [];
  const { data: courseData, loading: isCourseLoading } = useQuery<CourseByIdData>(
    GET_COURSE_BY_ID,
    {
      variables: { courseId: courseId ?? "" },
      skip: !courseId,
      fetchPolicy: "cache-and-network",
    },
  );
  const { data: batchData, loading: isBatchesLoading } = useCourseBatches(courseId);
  const [createCourse, { loading: isCreatingCourse }] = useMutation(CREATE_COURSE);
  const [updateCourse, { loading: isUpdatingCourse }] = useMutation(UPDATE_COURSE);
  const [createBatch, { loading: isCreatingBatch }] = useMutation(CREATE_BATCH);
  const isSaving = isCreatingCourse || isUpdatingCourse || isCreatingBatch;

  const livePackageEnabled = getEnabledLivePackage(draft);
  const steps = baseSteps;
  const activeStepName = steps[Math.min(currentStep, steps.length - 1)] ?? steps[0];
  const hasVideo = draft.curriculum.some((section) =>
    section.items.some((item) => item.type === "video"),
  );
  const hasArticle = draft.curriculum.some((section) =>
    section.items.some((item) => item.type === "article"),
  );
  const estimatedLastBatchEndDate = useMemo(
    () => formatDisplayDate(getLastBatchEndDate(batchGenerator)),
    [batchGenerator],
  );

  useEffect(() => {
    const course = courseData?.courses?.nodes?.[0];
    if (!course || !isEditMode) return;

    const packagePricing = getCoursePackagePricing(course.id, course);
    const backendBatches = batchData?.batches?.nodes ?? [];

    setPersistedCourseId(course.id);
    setCourseTutorIds(course.tutorId ?? []);
    setDraft((current) => ({
      ...current,
      title: course.title,
      subtitle: course.shortDescription,
      category: current.category || "General",
      description: course.description,
      difficulty: getWizardDifficulty(course.level),
      estimatedDuration: String(course.totalDuration),
      status: course.status === "PUBLISHED" ? "published" : "draft",
      packages: current.packages.map((coursePackage) => {
        if (coursePackage.id === "video_only" || coursePackage.id === "article_only") {
          return {
            ...coursePackage,
            enabled: packagePricing.alaCartePrice > 0,
            price: packagePricing.alaCartePrice,
          };
        }

        if (coursePackage.id === "video_article_live") {
          return {
            ...coursePackage,
            enabled: backendBatches.length > 0,
            price: packagePricing.tutorPackagePrice,
          };
        }

        return {
          ...coursePackage,
          enabled: packagePricing.tutorPackagePrice > 0,
          price: packagePricing.tutorPackagePrice,
        };
      }),
    }));
  }, [batchData, courseData, isEditMode]);

  useEffect(() => {
    if (!isEditMode || isBatchesLoading || !batchData) return;

    const backendBatches = batchData.batches?.nodes ?? [];
    setSavedBatchIds(new Set(backendBatches.map((batch) => batch.id)));

    if (backendBatches.length > 0) {
      setDraft((current) => ({
        ...current,
        batches: backendBatches.map(mapBackendBatchToWizardBatch),
      }));
    }
  }, [batchData, isBatchesLoading, isEditMode]);

  const updateDraft = <Key extends keyof CourseDraft>(key: Key, value: CourseDraft[Key]) => {
    setDraft((current) => ({ ...current, [key]: value, status: "draft" }));
  };

  const buildCourseInput = (status: WizardCourseStatus): CourseInput | null => {
    const courseInfoError = validateCourseInfo();
    if (courseInfoError) {
      toast.error(courseInfoError);
      return null;
    }

    const totalDuration = parseDurationMinutes(draft.estimatedDuration);
    if (!Number.isFinite(totalDuration) || totalDuration < 0) {
      toast.error("Estimated duration must include a valid number.");
      return null;
    }

    const tutorIds = Array.from(new Set(courseTutorIds.filter(Boolean)));
    if (tutorIds.length === 0) {
      toast.error("Assign at least one course tutor in Batch Setup.");
      return null;
    }
    const alaCartePrice = Math.max(getPackagePrice(draft, "video_only"), getPackagePrice(draft, "article_only"));
    const fullPackagePrice =
      getPackagePrice(draft, "video_article_live") ||
      getPackagePrice(draft, "video_article") ||
      alaCartePrice;

    return {
      tutorId: tutorIds,
      title: draft.title.trim(),
      description: draft.description.trim(),
      shortDescription: draft.subtitle.trim(),
      price: fullPackagePrice,
      level: getBackendCourseLevel(draft.difficulty),
      isFree: fullPackagePrice <= 0 && alaCartePrice <= 0,
      status: getBackendCourseStatus(status),
      totalSections: draft.curriculum.length,
      totalLectures: draft.curriculum.reduce((total, section) => total + section.items.length, 0),
      totalDuration,
    };
  };

  const buildBatchInputs = (resolvedCourseId: string): Array<{ draftId: string; input: CreateBatchInput }> => {
    if (!livePackageEnabled) return [];
    const fallbackTutorId = courseTutorIds[0] ?? "";

    return draft.batches
      .filter((batch) => !savedBatchIds.has(batch.id))
      .map((batch) => {
        const input: CreateBatchInput = {
          courseId: resolvedCourseId,
          tutorId: batch.tutorId || fallbackTutorId || null,
          startDate: new Date(`${batch.classStart}T00:00:00`).toISOString(),
          endDate: new Date(`${batch.classEnd}T00:00:00`).toISOString(),
          capacity: batch.quota,
        };

        return { draftId: batch.id, input };
      });
  };

  const persistCourse = async (status: WizardCourseStatus) => {
    const input = buildCourseInput(status);
    if (!input) return;

    try {
      let resolvedCourseId = persistedCourseId;

      if (resolvedCourseId) {
        await updateCourse({
          variables: { id: resolvedCourseId, input },
        });
      } else {
        const result = await createCourse({
          variables: { input },
        });
        resolvedCourseId =
          "data" in result && result.data && typeof result.data === "object"
            ? (result.data as { createCourse?: { id?: string } | null }).createCourse?.id ?? null
            : null;

        if (!resolvedCourseId) {
          throw new Error("Course was created, but the backend did not return a course ID.");
        }
        setPersistedCourseId(resolvedCourseId);
      }

      const batchInputs = buildBatchInputs(resolvedCourseId);
      const createdBatchIds: string[] = [];

      await Promise.all(
        batchInputs.map(async ({ draftId, input: batchInput }) => {
          const result = await createBatch({
            variables: { input: batchInput },
          });
          const createdBatchId =
            "data" in result && result.data && typeof result.data === "object"
              ? (result.data as { createBatch?: { id?: string } | null }).createBatch?.id
              : undefined;
          createdBatchIds.push(draftId);
          if (createdBatchId) createdBatchIds.push(createdBatchId);
        }),
      );

      if (createdBatchIds.length > 0) {
        setSavedBatchIds((current) => new Set([...current, ...createdBatchIds]));
      }

      const alaCartePrice = Math.max(getPackagePrice(draft, "video_only"), getPackagePrice(draft, "article_only"));
      const tutorPackagePrice =
        getPackagePrice(draft, "video_article_live") ||
        getPackagePrice(draft, "video_article") ||
        alaCartePrice;

      setCoursePackagePricing(resolvedCourseId, {
        alaCartePrice,
        tutorPackagePrice,
      });

      setDraft((current) => ({ ...current, status }));
      toast.success(status === "published" ? "Course published" : "Draft saved", {
        description: `${input.title} has been saved to the backend.`,
      });
    } catch (error) {
      const message = formatSaveError(error);
      toast.error("Unable to save course", { description: message });
    }
  };

  const saveDraft = () => {
    void persistCourse("draft");
  };

  const getPackageUnavailableReason = (packageType: PackageType) => {
    if (packageType === "video_only" && !hasVideo) return "Add at least one video first.";
    if (packageType === "article_only" && !hasArticle) return "Add at least one article first.";
    if ((packageType === "video_article" || packageType === "video_article_live") && (!hasVideo || !hasArticle)) {
      return "Add both video and article content first.";
    }
    return "";
  };

  const handlePackageToggle = (packageId: PackageType) => {
    if (getPackageUnavailableReason(packageId)) return;

    setDraft((current) => {
      const nextPackages = current.packages.map((coursePackage) =>
        coursePackage.id === packageId
          ? { ...coursePackage, enabled: !coursePackage.enabled }
          : coursePackage,
      );
      const nextDraft = { ...current, packages: nextPackages, status: "draft" as const };
      return getEnabledLivePackage(nextDraft) ? nextDraft : { ...nextDraft, batches: [] };
    });
  };

  const updatePackagePrice = (packageId: PackageType, value: string) => {
    const price = value === "" ? "" : Number(value);
    setDraft((current) => ({
      ...current,
      packages: current.packages.map((coursePackage) =>
        coursePackage.id === packageId ? { ...coursePackage, price } : coursePackage,
      ),
      status: "draft",
    }));
  };

  const addSection = () => {
    if (!sectionTitle.trim()) {
      toast.error("Please add a section title.");
      return;
    }
    updateDraft("curriculum", [
      ...draft.curriculum,
      { id: `section-${Date.now()}`, title: sectionTitle.trim(), items: [] },
    ]);
    setSectionTitle("");
  };

  const startEditSection = (section: CurriculumSection) => {
    setEditingSectionId(section.id);
    setEditingSectionTitle(section.title);
  };

  const saveSectionTitle = (sectionId: string) => {
    if (!editingSectionTitle.trim()) {
      toast.error("Section title cannot be empty.");
      return;
    }
    updateDraft(
      "curriculum",
      draft.curriculum.map((section) =>
        section.id === sectionId ? { ...section, title: editingSectionTitle.trim() } : section,
      ),
    );
    setEditingSectionId(null);
    setEditingSectionTitle("");
  };

  const removeSection = (sectionId: string) => {
    updateDraft(
      "curriculum",
      draft.curriculum.filter((section) => section.id !== sectionId),
    );
    if (itemDraft?.sectionId === sectionId) setItemDraft(null);
  };

  const saveCurriculumItem = () => {
    if (!itemDraft) return;
    if (!itemDraft.title.trim()) {
      toast.error("Please add an item title.");
      return;
    }
    if (itemDraft.type === "video" && !itemDraft.youtubeUrl.trim()) {
      toast.error("Please add a YouTube link for the video.");
      return;
    }
    if (itemDraft.type === "article" && !itemDraft.articleContent.trim()) {
      toast.error("Please add article content.");
      return;
    }

    updateDraft(
      "curriculum",
      draft.curriculum.map((section) => {
        if (section.id !== itemDraft.sectionId) return section;
        const nextItem: CurriculumItem = {
          id: itemDraft.id ?? `item-${Date.now()}`,
          type: itemDraft.type,
          title: itemDraft.title.trim(),
          youtubeUrl: itemDraft.youtubeUrl.trim(),
          articleContent: itemDraft.articleContent,
        };
        return {
          ...section,
          items: itemDraft.id
            ? section.items.map((item) => (item.id === itemDraft.id ? nextItem : item))
            : [...section.items, nextItem],
        };
      }),
    );
    toast.success(itemDraft.id ? "Curriculum item updated" : "Curriculum item created");
    setItemDraft(null);
  };

  const removeCurriculumItem = (sectionId: string, itemId: string) => {
    updateDraft(
      "curriculum",
      draft.curriculum.map((section) =>
        section.id === sectionId
          ? { ...section, items: section.items.filter((item) => item.id !== itemId) }
          : section,
      ),
    );
    if (itemDraft?.id === itemId) setItemDraft(null);
  };

  const generateBatches = () => {
    const message = validateBatchSetup();
    if (message) {
      toast.error(message);
      return;
    }

    const intervalDays = getIntervalDays(batchGenerator);
    const openBeforeDays = durationToDays(
      batchGenerator.enrollmentOpenBeforeValue,
      batchGenerator.enrollmentOpenBeforeUnit,
    );
    const closeBeforeDays = durationToDays(
      batchGenerator.enrollmentCloseBeforeValue,
      batchGenerator.enrollmentCloseBeforeUnit,
    );

    const nextBatches = Array.from({ length: Number(batchGenerator.numberOfBatches) }, (_, index) => {
      const classStart = addDays(batchGenerator.firstBatchStartDate, index * intervalDays);
      return {
        id: `batch-${Date.now()}-${index}`,
        name: `Batch ${index + 1}`,
        enrollmentStart: addDays(classStart, -openBeforeDays),
        enrollmentEnd: addDays(classStart, -closeBeforeDays),
        classStart,
        classEnd: addDays(classStart, 27),
        quota: Number(batchGenerator.quotaPerBatch),
        tutorId: "",
        status: closeBeforeDays > 0 ? "closed" as const : "open" as const,
      };
    });

    updateDraft("batches", nextBatches);
    toast.success("Batches generated.");
  };

  const updateCourseTutors = (nextTutorIds: string[]) => {
    setCourseTutorIds(nextTutorIds);
    setDraft((current) => ({ ...current, status: "draft" }));
  };

  const removeBatch = (batchId: string) => {
    updateDraft(
      "batches",
      draft.batches.filter((batch) => batch.id !== batchId),
    );
  };

  const updateBatchTutor = (batchId: string, tutorId: string) => {
    updateDraft(
      "batches",
      draft.batches.map((batch) => (batch.id === batchId ? { ...batch, tutorId } : batch)),
    );
  };

  const validateCourseInfo = () => {
    if (!draft.title.trim() || !draft.subtitle.trim() || !draft.category.trim() || !draft.description.trim()) {
      return "Complete the course title, subtitle, category, and description.";
    }
    if (!draft.estimatedDuration.trim()) {
      return "Complete estimated duration.";
    }
    return "";
  };

  const validateCurriculum = () => {
    if (draft.curriculum.length === 0) return "Add at least one section.";
    if (draft.curriculum.every((section) => section.items.length === 0)) {
      return "Add at least one curriculum item.";
    }
    return "";
  };

  const validatePackagePricing = () => {
    const enabledPackages = draft.packages.filter((coursePackage) => coursePackage.enabled);
    if (enabledPackages.length === 0) return "Enable at least one package.";
    if (enabledPackages.some((coursePackage) => coursePackage.price === "" || coursePackage.price <= 0)) {
      return "Every enabled package needs a price greater than zero.";
    }
    return "";
  };

  const validateBatchSetup = () => {
    if (courseTutorIds.length === 0) return "Assign at least one course tutor.";
    if (!livePackageEnabled) return "";
    if (!batchGenerator.firstBatchStartDate || !batchGenerator.numberOfBatches || !batchGenerator.quotaPerBatch) {
      return "Complete the batch start date, number of batches, and quota.";
    }
    if (!batchGenerator.intervalValue || batchGenerator.intervalValue <= 0) {
      return "Batch interval must be greater than zero.";
    }
    if (!batchGenerator.enrollmentOpenBeforeValue || batchGenerator.enrollmentOpenBeforeValue <= 0) {
      return "Enrollment open window must be greater than zero.";
    }
    if (batchGenerator.enrollmentCloseBeforeValue === "" || batchGenerator.enrollmentCloseBeforeValue < 0) {
      return "Enrollment close window cannot be empty or negative.";
    }
    const openBeforeDays = durationToDays(batchGenerator.enrollmentOpenBeforeValue, batchGenerator.enrollmentOpenBeforeUnit);
    const closeBeforeDays = durationToDays(batchGenerator.enrollmentCloseBeforeValue, batchGenerator.enrollmentCloseBeforeUnit);
    if (openBeforeDays <= closeBeforeDays) {
      return "Enrollment must open before it closes.";
    }
    return "";
  };

  const getCurrentStepError = () => {
    if (activeStepName === "Course Info") return validateCourseInfo();
    if (activeStepName === "Curriculum Builder") return validateCurriculum();
    if (activeStepName === "Package & Pricing") return validatePackagePricing();
    if (activeStepName === "Batch Setup") {
      const batchError = validateBatchSetup();
      if (batchError) return batchError;
      if (livePackageEnabled && draft.batches.length === 0) return "Generate at least one batch before continuing.";
    }
    return "";
  };

  const goNext = () => {
    const message = getCurrentStepError();
    if (message) {
      toast.error(message);
      return;
    }
    setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
  };

  const selectStep = (index: number) => {
    if (index <= currentStep) {
      setCurrentStep(index);
      return;
    }

    toast.error("Complete the current step before moving forward.");
  };

  const publishCourse = () => {
    const message =
      validateCourseInfo() ||
      validateCurriculum() ||
      validatePackagePricing() ||
      (courseTutorIds.length === 0 ? "Assign at least one course tutor." : "") ||
      (livePackageEnabled && draft.batches.length === 0 ? "Generate at least one batch." : "");
    if (message) {
      toast.error(message);
      return;
    }

    void persistCourse("published");
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
                Back to classes
              </Link>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold text-[#0A1B45]">{isEditMode ? "Edit Course" : "Create Course"}</h1>
                <Badge className={draft.status === "published" ? "bg-[#DDF8EA] text-[#16834D]" : "bg-[#FFF4D8] text-[#9A6700]"}>
                  {draft.status === "published" ? "Published" : "Draft"}
                </Badge>
              </div>
              <p className="mt-2 max-w-3xl text-[#476074]">
                Build a course with sections, video/article curriculum, package pricing, batches, and review.
              </p>
            </div>
            <Button variant="outline" className="border-[#308279] text-[#308279]" onClick={saveDraft} disabled={isSaving || isCourseLoading}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save Draft"}
            </Button>
          </div>

          <Card className="mb-6 border-[#D8E5E9] bg-white p-4 shadow-sm">
            <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-5">
              {steps.map((step, index) => (
                <button
                  key={step}
                  type="button"
                  onClick={() => selectStep(index)}
                  className={`rounded-lg border p-3 text-left transition ${
                    index === currentStep
                      ? "border-[#308279] bg-[#EAF5F3]"
                      : index < currentStep
                        ? "border-[#D8E5E9] bg-[#F7FBFC]"
                        : "border-[#D8E5E9] bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                      index <= currentStep ? "bg-[#308279] text-white" : "bg-[#E8EFF2] text-[#476074]"
                    }`}>
                      {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
                    </span>
                    <span className="text-sm font-semibold text-[#0A1B45]">{step}</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {activeStepName === "Course Info" && <CourseInfoStep draft={draft} updateDraft={updateDraft} />}
          {activeStepName === "Curriculum Builder" && (
            <CurriculumStep
              sections={draft.curriculum}
              sectionTitle={sectionTitle}
              setSectionTitle={setSectionTitle}
              editingSectionId={editingSectionId}
              editingSectionTitle={editingSectionTitle}
              setEditingSectionTitle={setEditingSectionTitle}
              itemDraft={itemDraft}
              setItemDraft={setItemDraft}
              addSection={addSection}
              startEditSection={startEditSection}
              saveSectionTitle={saveSectionTitle}
              removeSection={removeSection}
              saveCurriculumItem={saveCurriculumItem}
              removeCurriculumItem={removeCurriculumItem}
            />
          )}
          {activeStepName === "Package & Pricing" && (
            <PackagePricingStep
              packages={draft.packages}
              getPackageUnavailableReason={getPackageUnavailableReason}
              handlePackageToggle={handlePackageToggle}
              updatePackagePrice={updatePackagePrice}
            />
          )}
          {activeStepName === "Batch Setup" && (
            <BatchSetupStep
              batchGenerator={batchGenerator}
              setBatchGenerator={setBatchGenerator}
              estimatedLastBatchEndDate={estimatedLastBatchEndDate}
              batches={draft.batches}
              tutorOptions={tutorOptions}
              isTutorUsersLoading={isTutorUsersLoading}
              courseTutorIds={courseTutorIds}
              updateCourseTutors={updateCourseTutors}
              livePackageEnabled={livePackageEnabled}
              generateBatches={generateBatches}
              removeBatch={removeBatch}
              updateBatchTutor={updateBatchTutor}
            />
          )}
          {activeStepName === "Review & Publish" && (
            <ReviewPublishStep
              draft={draft}
              publishCourse={publishCourse}
              livePackageEnabled={livePackageEnabled}
              courseTutorIds={courseTutorIds}
              tutorOptions={tutorOptions}
              isSaving={isSaving}
            />
          )}

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Button
              variant="outline"
              className="border-[#D8E5E9]"
              onClick={() => setCurrentStep((step) => Math.max(step - 1, 0))}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="outline" className="border-[#308279] text-[#308279]" onClick={saveDraft} disabled={isSaving || isCourseLoading}>
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? "Saving..." : "Save Draft"}
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button className="bg-[#308279] hover:bg-[#308279]/90" onClick={goNext}>
                  Next
                </Button>
              ) : (
                <Button className="bg-[#308279] hover:bg-[#308279]/90" onClick={publishCourse} disabled={isSaving || isCourseLoading}>
                  <ClipboardCheck className="mr-2 h-4 w-4" />
                  {isSaving ? "Saving..." : "Publish"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function CourseInfoStep({
  draft,
  updateDraft,
}: {
  draft: CourseDraft;
  updateDraft: <Key extends keyof CourseDraft>(key: Key, value: CourseDraft[Key]) => void;
}) {
  return (
    <Card className="border-[#D8E5E9] bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#0A1B45]">Course Info</h2>
        <p className="mt-2 text-sm text-[#476074]">Set the draft basics before adding curriculum and commercial options.</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Field label="Course title">
          <Input value={draft.title} onChange={(event) => updateDraft("title", event.target.value)} placeholder="Human Computer Interaction Bootcamp" />
        </Field>
        <Field label="Subtitle">
          <Input value={draft.subtitle} onChange={(event) => updateDraft("subtitle", event.target.value)} placeholder="Practical UI/UX foundations with guided projects" />
        </Field>
        <Field label="Category">
          <Input value={draft.category} onChange={(event) => updateDraft("category", event.target.value)} placeholder="Design / Computer Science" />
        </Field>
        <Field label="Description" className="lg:col-span-2">
          <Textarea rows={5} value={draft.description} onChange={(event) => updateDraft("description", event.target.value)} placeholder="Describe outcomes, learning scope, and course expectations." />
        </Field>
        <Field label="Thumbnail" className="lg:col-span-2">
          <div className="flex min-h-32 w-full items-center justify-center rounded-lg border border-dashed border-[#B8CDD3] bg-[#F7FBFC] p-5 text-center">
            <div className="w-full max-w-2xl">
              <Upload className="mx-auto h-5 w-5 text-[#308279]" />
              <p className="mt-2 text-sm font-semibold text-[#0A1B45]">
                {draft.thumbnail || "Upload class thumbnail here"}
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-3 border-[#308279] text-[#308279]"
                onClick={() => updateDraft("thumbnail", "thumbnail-preview.jpg")}
              >
                Choose thumbnail
              </Button>
            </div>
          </div>
        </Field>
        <Field label="Difficulty level">
          <select value={draft.difficulty} onChange={(event) => updateDraft("difficulty", event.target.value)} className="w-full rounded-md border border-[#D8E5E9] bg-white p-2">
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </Field>
        <Field label="Estimated duration">
          <Input value={draft.estimatedDuration} onChange={(event) => updateDraft("estimatedDuration", event.target.value)} placeholder="6 weeks" />
        </Field>
      </div>
    </Card>
  );
}

function CurriculumStep({
  sections,
  sectionTitle,
  setSectionTitle,
  editingSectionId,
  editingSectionTitle,
  setEditingSectionTitle,
  itemDraft,
  setItemDraft,
  addSection,
  startEditSection,
  saveSectionTitle,
  removeSection,
  saveCurriculumItem,
  removeCurriculumItem,
}: {
  sections: CurriculumSection[];
  sectionTitle: string;
  setSectionTitle: (value: string) => void;
  editingSectionId: string | null;
  editingSectionTitle: string;
  setEditingSectionTitle: (value: string) => void;
  itemDraft: ItemDraft | null;
  setItemDraft: Dispatch<SetStateAction<ItemDraft | null>>;
  addSection: () => void;
  startEditSection: (section: CurriculumSection) => void;
  saveSectionTitle: (sectionId: string) => void;
  removeSection: (sectionId: string) => void;
  saveCurriculumItem: () => void;
  removeCurriculumItem: (sectionId: string, itemId: string) => void;
}) {
  return (
    <Card className="border-[#D8E5E9] bg-white p-6 shadow-sm">
      <div>
        <div>
          <h2 className="text-2xl font-bold text-[#0A1B45]">Curriculum Builder</h2>
          <p className="mt-2 text-sm text-[#476074]">Create sections and add video or article lessons.</p>
        </div>
      </div>

      <div className="space-y-4">
        

        {sections.map((section, index) => {
          const isEditingSection = editingSectionId === section.id;
          const activeDraft = itemDraft?.sectionId === section.id ? itemDraft : null;

          return (
            <div key={section.id} className="rounded-xl border border-[#D8E5E9] bg-[#FAFCFD] p-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#92A4AE]">Section {index + 1}</div>
                  {isEditingSection ? (
                    <div className="mt-2 flex gap-2">
                      <Input value={editingSectionTitle} onChange={(event) => setEditingSectionTitle(event.target.value)} />
                      <Button className="bg-[#308279] hover:bg-[#308279]/90" onClick={() => saveSectionTitle(section.id)}>
                        Save
                      </Button>
                    </div>
                  ) : (
                    <h3 className="mt-1 text-lg font-bold text-[#0A1B45]">{section.title}</h3>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" className="border-[#308279] text-[#308279]" onClick={() => setItemDraft(emptyItemDraft(section.id, "video"))}>
                    <Video className="mr-2 h-4 w-4" />
                    Video
                  </Button>
                  <Button variant="outline" className="border-[#308279] text-[#308279]" onClick={() => setItemDraft(emptyItemDraft(section.id, "article"))}>
                    <FileText className="mr-2 h-4 w-4" />
                    Article
                  </Button>
                  <Button variant="outline" className="border-[#D8E5E9]" onClick={() => startEditSection(section)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" className="text-[#B42318] hover:bg-[#FDECEC] hover:text-[#B42318]" onClick={() => removeSection(section.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                {section.items.length === 0 ? (
                  <div className="rounded-lg bg-white p-4 text-sm text-[#476074]">No lessons yet.</div>
                ) : (
                  section.items.map((item) => (
                    <div key={item.id} className="rounded-lg bg-white p-3">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                          {item.type === "video" ? <Video className="h-4 w-4 text-[#308279]" /> : <FileText className="h-4 w-4 text-[#0A1B45]" />}
                          <div>
                            <div className="font-semibold text-[#0A1B45]">{item.title}</div>
                            <div className="text-xs uppercase tracking-[0.14em] text-[#476074]">{item.type === "video" ? "Video" : "Article"}</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" className="border-[#D8E5E9]" onClick={() => setItemDraft({ ...item, sectionId: section.id })}>
                            Edit
                          </Button>
                          <Button variant="ghost" className="text-[#B42318] hover:bg-[#FDECEC] hover:text-[#B42318]" onClick={() => removeCurriculumItem(section.id, item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {activeDraft && (
                <div className="mt-5 rounded-xl border border-[#D8E5E9] bg-white p-5">
                  <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#92A4AE]">
                        {activeDraft.id ? "Edit lesson" : "Create lesson"}
                      </div>
                      <h4 className="mt-1 text-lg font-bold text-[#0A1B45]">{activeDraft.type === "video" ? "Video" : "Article"}</h4>
                    </div>
                    <Button variant="outline" className="border-[#D8E5E9]" onClick={() => setItemDraft(null)}>
                      Cancel
                    </Button>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <Field label="Lesson type">
                      <select
                        value={activeDraft.type}
                        onChange={(event) => setItemDraft((current) => current ? { ...current, type: event.target.value as CurriculumItemType } : current)}
                        className="w-full rounded-md border border-[#D8E5E9] bg-white p-2"
                      >
                        <option value="video">Video</option>
                        <option value="article">Article</option>
                      </select>
                    </Field>
                    <Field label="Title">
                      <Input value={activeDraft.title} onChange={(event) => setItemDraft((current) => current ? { ...current, title: event.target.value } : current)} placeholder="Lesson title" />
                    </Field>
                    {activeDraft.type === "video" ? (
                      <>
                        <Field label="YouTube link" className="lg:col-span-2">
                          <Input value={activeDraft.youtubeUrl} onChange={(event) => setItemDraft((current) => current ? { ...current, youtubeUrl: event.target.value } : current)} placeholder="https://www.youtube.com/watch?v=..." />
                        </Field>
                        <div className="rounded-lg border border-[#D8E5E9] bg-[#F7FBFC] p-4 text-sm leading-6 text-[#476074] lg:col-span-2">
                          <div className="font-semibold text-[#0A1B45]">Unlisted video guide</div>
                          <ol className="mt-2 list-decimal space-y-1 pl-5">
                            <li>Upload the video in YouTube Studio.</li>
                            <li>Open Visibility and choose Unlisted.</li>
                            <li>Finish upload processing before sharing.</li>
                            <li>Copy the full YouTube watch URL and paste it here.</li>
                            <li>Do not set it to Private, because students cannot access private videos.</li>
                          </ol>
                        </div>
                      </>
                    ) : (
                      <Field label="Article content" className="lg:col-span-2">
                        <div className="rounded-lg border border-[#D8E5E9] bg-white">
                          <CKEditor
                            editor={ClassicEditor}
                            config={editorConfig}
                            data={activeDraft.articleContent}
                            onChange={(_, editor) =>
                              setItemDraft((current) =>
                                current ? { ...current, articleContent: editor.getData() } : current,
                              )
                            }
                          />
                        </div>
                      </Field>
                    )}
                  </div>
                  <Button className="mt-4 bg-[#308279] hover:bg-[#308279]/90" onClick={saveCurriculumItem}>
                    Save lesson
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="rounded-[1.5rem] border border-[#D8E5E9] bg-white p-6">
          <h3 className="text-2xl font-bold text-[#0A1B45]">
            {sections.length === 0 ? "Create first section" : "Create another section"}
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#476074]">
            Section menjadi wadah utama untuk video dan article. Setelah section dibuat,
            kamu bisa langsung menambahkan item pembelajaran di card yang sama.
          </p>
          <div className="mt-5 space-y-2">
            <Label>Section title</Label>
            <Input value={sectionTitle} onChange={(event) => setSectionTitle(event.target.value)} placeholder="e.g. Arrays & Strings" />
          </div>
          <Button className="mt-4 bg-[#0A1B45] hover:bg-[#0A1B45]/90" onClick={addSection}>
            <Plus className="mr-2 h-4 w-4" />
            Add Section
          </Button>
        </div>
    </Card>
  );
}

function PackagePricingStep({
  packages,
  getPackageUnavailableReason,
  handlePackageToggle,
  updatePackagePrice,
}: {
  packages: CoursePackage[];
  getPackageUnavailableReason: (packageType: PackageType) => string;
  handlePackageToggle: (packageId: PackageType) => void;
  updatePackagePrice: (packageId: PackageType, value: string) => void;
}) {
  return (
    <Card className="border-[#D8E5E9] bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-2xl font-bold text-[#0A1B45]">Package & Pricing Setup</h2>
        <p className="mt-2 text-sm text-[#476074]">Enable packages only when matching curriculum content exists.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {packages.map((coursePackage) => {
          const reason = getPackageUnavailableReason(coursePackage.id);
          return (
            <div key={coursePackage.id} className={`rounded-xl border p-5 ${reason ? "border-[#D8E5E9] bg-[#F4F7F8] opacity-75" : "border-[#D8E5E9] bg-[#FAFCFD]"}`}>
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  checked={coursePackage.enabled}
                  disabled={Boolean(reason)}
                  onChange={() => handlePackageToggle(coursePackage.id)}
                  className="mt-1 h-4 w-4 accent-[#308279]"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-[#0A1B45]">{coursePackage.name}</h3>
                  <p className="mt-1 text-sm text-[#476074]">{coursePackage.description}</p>
                  {reason && <p className="mt-2 text-sm font-semibold text-[#B42318]">{reason}</p>}
                  <div className="mt-4">
                    <Label>Price</Label>
                    <Input
                      type="number"
                      min="0"
                      value={coursePackage.price}
                      disabled={!coursePackage.enabled || Boolean(reason)}
                      onChange={(event) => updatePackagePrice(coursePackage.id, event.target.value)}
                      placeholder="499000"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function BatchSetupStep({
  batchGenerator,
  setBatchGenerator,
  estimatedLastBatchEndDate,
  batches,
  tutorOptions,
  isTutorUsersLoading,
  courseTutorIds,
  updateCourseTutors,
  livePackageEnabled,
  generateBatches,
  removeBatch,
  updateBatchTutor,
}: {
  batchGenerator: BatchGenerator;
  setBatchGenerator: Dispatch<SetStateAction<BatchGenerator>>;
  estimatedLastBatchEndDate: string;
  batches: Batch[];
  tutorOptions: Array<{ id: string; name: string; username: string }>;
  isTutorUsersLoading: boolean;
  courseTutorIds: string[];
  updateCourseTutors: (tutorIds: string[]) => void;
  livePackageEnabled: boolean;
  generateBatches: () => void;
  removeBatch: (batchId: string) => void;
  updateBatchTutor: (batchId: string, tutorId: string) => void;
}) {
  const primaryCourseTutorId = courseTutorIds[0] ?? "";

  return (
    <Card className="border-[#D8E5E9] bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#0A1B45]">Tutor & Batch Setup</h2>
        <p className="mt-2 text-sm text-[#476074]">
          Assign the course tutor required for saving. Generate batches only when the live package is enabled.
        </p>
      </div>
      <div className="mb-6 rounded-xl border border-[#D8E5E9] bg-[#FAFCFD] p-4">
        <Field label="Course tutor">
          <select
            value={primaryCourseTutorId}
            onChange={(event) => updateCourseTutors(event.target.value ? [event.target.value] : [])}
            className="w-full rounded-md border border-[#D8E5E9] bg-white p-2"
            disabled={isTutorUsersLoading}
          >
            <option value="">Select a tutor</option>
            {tutorOptions.map((tutor) => (
              <option key={tutor.id} value={tutor.id}>{tutor.name} ({tutor.username})</option>
            ))}
          </select>
        </Field>
      </div>
      {!livePackageEnabled && (
        <div className="rounded-lg border border-[#D8E5E9] bg-[#F3F8FA] p-4 text-sm text-[#476074]">
          Batch generation is optional for the selected packages. Saving this course only requires the course tutor above.
        </div>
      )}
      {livePackageEnabled && <div className="grid gap-5 lg:grid-cols-3">
        <Field label="First batch start date">
          <Input type="date" value={batchGenerator.firstBatchStartDate} onChange={(event) => setBatchGenerator((current) => ({ ...current, firstBatchStartDate: event.target.value }))} />
        </Field>
        <Field label="Number of batches">
          <Input type="number" min="1" value={batchGenerator.numberOfBatches} onChange={(event) => setBatchGenerator((current) => ({ ...current, numberOfBatches: event.target.value === "" ? "" : Number(event.target.value) }))} />
        </Field>
        <Field label="Interval">
          <div className="grid grid-cols-[1fr_120px] gap-2">
            <Input type="number" min="1" value={batchGenerator.intervalValue} onChange={(event) => setBatchGenerator((current) => ({ ...current, intervalValue: event.target.value === "" ? "" : Number(event.target.value) }))} />
            <select value={batchGenerator.intervalUnit} onChange={(event) => setBatchGenerator((current) => ({ ...current, intervalUnit: event.target.value as IntervalUnit }))} className="rounded-md border border-[#D8E5E9] bg-white p-2">
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
            </select>
          </div>
        </Field>
        <Field label="Enrollment opens before class">
          <div className="grid grid-cols-[1fr_120px] gap-2">
            <Input type="number" min="1" value={batchGenerator.enrollmentOpenBeforeValue} onChange={(event) => setBatchGenerator((current) => ({ ...current, enrollmentOpenBeforeValue: event.target.value === "" ? "" : Number(event.target.value) }))} />
            <select value={batchGenerator.enrollmentOpenBeforeUnit} onChange={(event) => setBatchGenerator((current) => ({ ...current, enrollmentOpenBeforeUnit: event.target.value as IntervalUnit }))} className="rounded-md border border-[#D8E5E9] bg-white p-2">
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
            </select>
          </div>
        </Field>
        <Field label="Enrollment closes before class">
          <div className="grid grid-cols-[1fr_120px] gap-2">
            <Input type="number" min="0" value={batchGenerator.enrollmentCloseBeforeValue} onChange={(event) => setBatchGenerator((current) => ({ ...current, enrollmentCloseBeforeValue: event.target.value === "" ? "" : Number(event.target.value) }))} />
            <select value={batchGenerator.enrollmentCloseBeforeUnit} onChange={(event) => setBatchGenerator((current) => ({ ...current, enrollmentCloseBeforeUnit: event.target.value as IntervalUnit }))} className="rounded-md border border-[#D8E5E9] bg-white p-2">
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
            </select>
          </div>
        </Field>
        <Field label="Quota per batch">
          <Input type="number" min="1" value={batchGenerator.quotaPerBatch} onChange={(event) => setBatchGenerator((current) => ({ ...current, quotaPerBatch: event.target.value === "" ? "" : Number(event.target.value) }))} />
        </Field>
        <Field label="Estimated last batch end date">
          <Input value={estimatedLastBatchEndDate || "Complete date, batches, and interval"} readOnly className="bg-[#F3F8FA]" />
        </Field>
      </div>}
      {livePackageEnabled && (
        <Button className="mt-5 bg-[#308279] hover:bg-[#308279]/90" onClick={generateBatches}>
          <CalendarDays className="mr-2 h-4 w-4" />
          Generate Batches
        </Button>
      )}
      {batches.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded-xl border border-[#D8E5E9]">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="bg-[#F3F8FA] text-xs uppercase tracking-[0.14em] text-[#476074]">
              <tr>
                <th className="p-3">Batch</th>
                <th className="p-3">Enrollment</th>
                <th className="p-3">Class window</th>
                <th className="p-3">Quota</th>
                <th className="p-3">Tutor</th>
                <th className="p-3">Status</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {batches.map((batch) => (
                <tr key={batch.id} className="border-t border-[#D8E5E9]">
                  <td className="p-3 font-semibold text-[#0A1B45]">{batch.name}</td>
                  <td className="p-3 text-[#476074]">{formatDisplayDate(batch.enrollmentStart)} to {formatDisplayDate(batch.enrollmentEnd)}</td>
                  <td className="p-3 text-[#476074]">{formatDisplayDate(batch.classStart)} to {formatDisplayDate(batch.classEnd)}</td>
                  <td className="p-3 text-[#476074]">{batch.quota}</td>
                  <td className="p-3">
                    <select
                      value={batch.tutorId}
                      onChange={(event) => updateBatchTutor(batch.id, event.target.value)}
                      className="w-full rounded-md border border-[#D8E5E9] bg-white p-2"
                      disabled={isTutorUsersLoading}
                    >
                      <option value="">Use course tutor</option>
                      {tutorOptions.map((tutor) => (
                        <option key={tutor.id} value={tutor.id}>{tutor.name} ({tutor.username})</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3"><Badge className={batch.status === "open" ? "bg-[#DDF8EA] text-[#16834D]" : "bg-[#EEF3F5] text-[#476074]"}>{batch.status}</Badge></td>
                  <td className="p-3 text-right">
                    <Button variant="ghost" className="text-[#B42318] hover:bg-[#FDECEC] hover:text-[#B42318]" onClick={() => removeBatch(batch.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

function ReviewPublishStep({
  draft,
  publishCourse,
  livePackageEnabled,
  courseTutorIds,
  tutorOptions,
  isSaving,
}: {
  draft: CourseDraft;
  publishCourse: () => void;
  livePackageEnabled: boolean;
  courseTutorIds: string[];
  tutorOptions: Array<{ id: string; name: string; username: string }>;
  isSaving: boolean;
}) {
  const itemCount = draft.curriculum.reduce((total, section) => total + section.items.length, 0);
  const videoCount = draft.curriculum.reduce((total, section) => total + section.items.filter((item) => item.type === "video").length, 0);
  const articleCount = itemCount - videoCount;
  const enabledPackages = draft.packages.filter((coursePackage) => coursePackage.enabled);
  const courseTutorNames = courseTutorIds
    .map((tutorId) => tutorOptions.find((tutor) => tutor.id === tutorId)?.name ?? tutorId)
    .join(", ");

  return (
    <Card className="border-[#D8E5E9] bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0A1B45]">Review & Publish</h2>
          <p className="mt-2 text-sm text-[#476074]">Confirm the course setup before publishing it.</p>
        </div>
        <Button className="bg-[#308279] hover:bg-[#308279]/90" onClick={publishCourse} disabled={isSaving}>
          <ClipboardCheck className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Publish"}
        </Button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <SummaryCard title="Course Info">
          <p className="font-semibold text-[#0A1B45]">{draft.title || "Untitled course"}</p>
          <p className="text-sm text-[#476074]">{draft.subtitle || "No subtitle"}</p>
          <p className="text-sm text-[#476074]">{draft.category || "No category"} · {draft.difficulty}</p>
          <p className="mt-2 text-sm text-[#476074]">{draft.description || "No description yet."}</p>
          <p className="text-sm text-[#476074]">Duration: {draft.estimatedDuration || "Not set"}</p>
        </SummaryCard>
        <SummaryCard title="Curriculum">
          <p className="text-sm text-[#476074]">{draft.curriculum.length} sections · {itemCount} lessons</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Metric label="Videos" value={videoCount} />
            <Metric label="Articles" value={articleCount} />
          </div>
        </SummaryCard>
        <SummaryCard title="Packages">
          {enabledPackages.length === 0 ? (
            <p className="text-sm text-[#B42318]">No packages enabled.</p>
          ) : (
            <div className="space-y-3">
              {enabledPackages.map((coursePackage) => (
                <div key={coursePackage.id} className="rounded-lg bg-[#F3F8FA] p-3">
                  <div className="font-semibold text-[#0A1B45]">{coursePackage.name}</div>
                  <div className="text-sm text-[#476074]">{formatCurrency(coursePackage.price)}</div>
                </div>
              ))}
            </div>
          )}
        </SummaryCard>
        <SummaryCard title="Tutor Assignment">
          <p className="text-sm text-[#476074]">
            {courseTutorNames || "No course tutor assigned."}
          </p>
        </SummaryCard>
        {livePackageEnabled && (
          <SummaryCard title="Batches">
            <p className="text-sm text-[#476074]">{draft.batches.length} generated batches</p>
            <div className="mt-3 space-y-2">
              {draft.batches.slice(0, 4).map((batch) => (
                <div key={batch.id} className="rounded-lg bg-[#F3F8FA] p-3 text-sm text-[#476074]">
                  <span className="font-semibold text-[#0A1B45]">{batch.name}</span> - starts {formatDisplayDate(batch.classStart)} - quota {batch.quota} - tutor {tutorOptions.find((tutor) => tutor.id === (batch.tutorId || courseTutorIds[0]))?.name ?? "Unassigned"}
                </div>
              ))}
            </div>
          </SummaryCard>
        )}
      </div>
    </Card>
  );
}

function Field({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function SummaryCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-[#D8E5E9] bg-[#FAFCFD] p-5">
      <h3 className="mb-3 text-lg font-bold text-[#0A1B45]">{title}</h3>
      {children}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-white p-3">
      <div className="text-2xl font-bold text-[#0A1B45]">{value}</div>
      <div className="text-xs uppercase tracking-[0.14em] text-[#476074]">{label}</div>
    </div>
  );
}
