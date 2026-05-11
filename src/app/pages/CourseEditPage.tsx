import { useEffect, useMemo, useState } from "react";
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
  Upload,
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

type EditorTab = "basic" | "curriculum";
type CurriculumItemType = "video" | "material" | "quiz";
type CurriculumSourceType = "upload" | "link";

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
  courses: Course[];
};

type CourseFormState = {
  title: string;
  subtitle: string;
  description: string;
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
  sourceType: "upload",
  sourceValue: "",
};

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
    case "quiz":
      return {
        label: "Quiz",
        className: "border-0 bg-[#FCEFC7] text-[#7A5A00]",
        icon: ClipboardCheck,
      };
  }
}

export default function CourseEditPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isNewClass = courseId === "new";
  const initialTab = searchParams.get("tab");
  const activeTab: EditorTab =
    initialTab === "curriculum" || initialTab === "videos" ? "curriculum" : "basic";
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
  const tutorOptions = tutorUsersData?.users ?? [];
  const isSavingCourse = isCreatingCourse || isUpdatingCourse;

  const [classData, setClassData] = useState<CourseFormState>({
    title: "",
    subtitle: "",
    description: "",
    totalDuration: "",
    price: "",
    isFree: false,
    level: "BEGINNER",
    tutorIds: [],
    status: "DRAFT",
  });

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
                description: "Video pembuka untuk menjelaskan struktur pembelajaran, target capaian, dan ritme cohort.",
                sourceType: "link",
                sourceValue: "https://example.com/class-overview",
                status: "Published",
              },
              {
                id: 2,
                title: "Big O Notation Cheat Sheet",
                type: "material",
                description: "PDF reference untuk notasi kompleksitas yang dipakai di seluruh class.",
                sourceType: "upload",
                sourceValue: "big-o-cheat-sheet.pdf",
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
                description: "Konsep dasar array, operasi umum, dan problem framing sebelum live cohort dimulai.",
                sourceType: "upload",
                sourceValue: "array-fundamentals.mp4",
                status: "Published",
              },
              {
                id: 4,
                title: "Array & Linked List Quiz",
                type: "quiz",
                description: "Quiz umum untuk memastikan pemahaman siswa siap lanjut ke section berikutnya.",
                sourceType: "link",
                sourceValue: "Quiz managed from evaluation service",
                status: "Draft",
              },
            ],
          },
        ],
  );

  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(sections[0]?.id ?? null);
  const [editingSectionId, setEditingSectionId] = useState<number | null>(null);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [sectionDraft, setSectionDraft] = useState<SectionDraft>(emptySectionDraft);
  const [itemDraft, setItemDraft] = useState<ItemDraft>(emptyItemDraft);
  const [isUploadDragActive, setIsUploadDragActive] = useState(false);

  useEffect(() => {
    const course = courseData?.courses?.[0];
    if (!course || isNewClass) return;

    setClassData({
      title: course.title,
      subtitle: course.shortDescription,
      description: course.description,
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
    let quizCount = 0;

    sections.forEach((section) => {
      section.items.forEach((item) => {
        if (item.type === "video") videoCount += 1;
        if (item.type === "material") materialCount += 1;
        if (item.type === "quiz") quizCount += 1;
      });
    });

    return {
      totalSections: sections.length,
      totalVideos: videoCount,
      totalMaterials: materialCount,
      totalQuizzes: quizCount,
    };
  }, [sections]);

  const setTab = (tab: EditorTab) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("tab", tab);
    setSearchParams(nextParams);
  };

  const resetSectionDraft = () => {
    setSectionDraft(emptySectionDraft);
    setEditingSectionId(null);
  };

  const resetItemDraft = () => {
    setItemDraft(emptyItemDraft);
    setEditingItemId(null);
    setIsUploadDragActive(false);
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
    setSectionDraft({
      title: section.title,
      summary: section.summary,
    });
  };

  const handleDeleteSection = (sectionId: number) => {
    setSections((current) => current.filter((section) => section.id !== sectionId));
    if (selectedSectionId === sectionId) {
      const remaining = sections.filter((section) => section.id !== sectionId);
      setSelectedSectionId(remaining[0]?.id ?? null);
    }
    if (editingSectionId === sectionId) {
      resetSectionDraft();
    }
    toast.success("Section deleted");
  };

  const handleItemFileSelect = (file: File | null) => {
    if (!file) return;
    setItemDraft((current) => ({
      ...current,
      sourceType: "upload",
      sourceValue: file.name,
    }));
    setIsUploadDragActive(false);
  };

  const handleItemSubmit = () => {
    if (!selectedSectionId) {
      toast.error("Create or select a section first.");
      return;
    }

    if (
      !itemDraft.title.trim() ||
      !itemDraft.description.trim() ||
      !itemDraft.sourceValue.trim()
    ) {
      toast.error("Please complete the item title, description, and source.");
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
                        sourceType: itemDraft.sourceType,
                        sourceValue: itemDraft.sourceValue.trim(),
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
                    sourceType: itemDraft.sourceType,
                    sourceValue: itemDraft.sourceValue.trim(),
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
    setItemDraft({
      title: item.title,
      type: item.type,
      description: item.description,
      sourceType: item.sourceType,
      sourceValue: item.sourceValue,
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
    const totalDuration = Number(classData.totalDuration);
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

  return (
    <div className="min-h-screen bg-[#F3F8FA] lg:flex">
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
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/75">
                  Curriculum workspace
                </div>
                <h1 className="mt-5 text-4xl font-bold tracking-[-0.03em]">
                  {isNewClass ? "Create New Class" : "Edit Class"}
                </h1>
                <p className="mt-3 max-w-3xl text-white/80">
                  Manage class details and build the full curriculum structure: sections, videos,
                  downloadable materials, and class-level quizzes.
                </p>
              </div>

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

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
          <Tabs value={activeTab} onValueChange={(value) => setTab(value as EditorTab)} className="w-full">
            <TabsList className="mb-8 grid w-full max-w-2xl grid-cols-2 rounded-2xl border border-[#D8E5E9] bg-white p-1">
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

                  <div className="grid gap-4 md:grid-cols-3">
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
                      <Label htmlFor="price">Harga</Label>
                      <Input
                        id="price"
                        type="number"
                        min="0"
                        value={classData.price}
                        onChange={(event) => setClassData({ ...classData, price: event.target.value })}
                        disabled={classData.isFree}
                        placeholder="e.g. 499000"
                      />
                    </div>
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
              <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_380px]">
                <div className="space-y-6">
                  <Card className="rounded-[1.75rem] border-[#D8E5E9] bg-white p-8 shadow-[0_18px_42px_rgba(10,27,69,0.07)]">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-[#0A1B45]">Curriculum Structure</h2>
                        <p className="mt-2 text-[#476074]">
                          Build the class from top to bottom: section first, then attach videos,
                          materials, or class-level quizzes inside each section.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="border-0 bg-[#0A1B45]/8 text-[#0A1B45]">
                          {curriculumSummary.totalSections} sections
                        </Badge>
                        <Badge className="border-0 bg-[#308279]/10 text-[#308279]">
                          {curriculumSummary.totalVideos} videos
                        </Badge>
                        <Badge className="border-0 bg-[#308279]/10 text-[#308279]">
                          {curriculumSummary.totalMaterials} materials
                        </Badge>
                        <Badge className="border-0 bg-[#FCEFC7] text-[#7A5A00]">
                          {curriculumSummary.totalQuizzes} quizzes
                        </Badge>
                      </div>
                    </div>
                  </Card>

                  {sections.length === 0 ? (
                    <Card className="rounded-[1.75rem] border border-dashed border-[#C7DCE0] bg-[#FCFEFE] p-10 text-center shadow-[0_18px_42px_rgba(10,27,69,0.04)]">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0A1B45] text-white">
                        <Plus className="h-6 w-6" />
                      </div>
                      <h3 className="mt-5 text-xl font-bold text-[#0A1B45]">No curriculum section yet</h3>
                      <p className="mt-2 text-[#476074]">
                        Start by creating the first section on the right side, then add videos,
                        materials, and quizzes into that section.
                      </p>
                    </Card>
                  ) : (
                    sections.map((section) => (
                      <Card
                        key={section.id}
                        className={`rounded-[1.75rem] border bg-white p-8 shadow-[0_18px_42px_rgba(10,27,69,0.07)] transition-all ${
                          selectedSectionId === section.id
                            ? "border-[#308279] ring-1 ring-[#308279]/20"
                            : "border-[#D8E5E9]"
                        }`}
                      >
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                          <div>
                            <button
                              type="button"
                              onClick={() => setSelectedSectionId(section.id)}
                              className="text-left"
                            >
                              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-[#308279]">
                                Section {section.id}
                              </div>
                              <h3 className="mt-2 text-2xl font-bold text-[#0A1B45]">{section.title}</h3>
                            </button>
                            <p className="mt-3 max-w-3xl text-sm leading-6 text-[#476074]">
                              {section.summary}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              className="border-[#D8E5E9] text-[#0A1B45] hover:bg-[#F3F8FA]"
                              onClick={() => handleEditSection(section)}
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </Button>
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

                        <div className="mt-6 space-y-4">
                          {section.items.length === 0 ? (
                            <div className="rounded-[1.25rem] border border-dashed border-[#D8E5E9] bg-[#FCFEFE] px-5 py-6 text-sm text-[#476074]">
                              No curriculum item inside this section yet.
                            </div>
                          ) : (
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
                                        {item.sourceType === "upload" ? "Uploaded file" : "Linked resource"}:{" "}
                                        {item.sourceValue}
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
                            })
                          )}
                        </div>
                      </Card>
                    ))
                  )}
                </div>

                <div className="space-y-6">
                  <Card className="rounded-[1.75rem] border-[#D8E5E9] bg-white p-8 shadow-[0_18px_42px_rgba(10,27,69,0.07)]">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-bold text-[#0A1B45]">
                          {editingSectionId ? "Edit Section" : "Create Section"}
                        </h3>
                        <p className="mt-1 text-sm text-[#476074]">
                          Section adalah grouping utama untuk video, material, dan quiz.
                        </p>
                      </div>
                      {editingSectionId ? (
                        <Badge className="border-0 bg-[#0A1B45]/8 text-[#0A1B45]">
                          Editing
                        </Badge>
                      ) : null}
                    </div>

                    <div className="mt-6 space-y-4">
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
                          rows={4}
                          placeholder="Summarize the purpose of this section..."
                          value={sectionDraft.summary}
                          onChange={(event) =>
                            setSectionDraft({ ...sectionDraft, summary: event.target.value })
                          }
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button className="flex-1 bg-[#0A1B45] hover:bg-[#308279]" onClick={handleSectionSubmit}>
                          <Plus className="mr-2 h-4 w-4" />
                          {editingSectionId ? "Save Section" : "Add Section"}
                        </Button>
                        {(editingSectionId || sectionDraft.title || sectionDraft.summary) && (
                          <Button variant="outline" className="border-[#D8E5E9]" onClick={resetSectionDraft}>
                            Reset
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>

                  <Card className="rounded-[1.75rem] border-[#D8E5E9] bg-white p-8 shadow-[0_18px_42px_rgba(10,27,69,0.07)]">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-bold text-[#0A1B45]">
                          {editingItemId ? "Edit Curriculum Item" : "Add Curriculum Item"}
                        </h3>
                        <p className="mt-1 text-sm text-[#476074]">
                          Attach video, material, or class-level quiz into the selected section.
                        </p>
                      </div>
                      {selectedSection ? (
                        <Badge className="border-0 bg-[#308279]/10 text-[#308279]">
                          {selectedSection.title}
                        </Badge>
                      ) : null}
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="curriculum-section">Target section</Label>
                        <select
                          id="curriculum-section"
                          value={selectedSectionId ?? ""}
                          onChange={(event) => setSelectedSectionId(Number(event.target.value))}
                          className="w-full rounded-md border border-[#D8E5E9] bg-white p-2"
                        >
                          <option value="" disabled>
                            Select section
                          </option>
                          {sections.map((section) => (
                            <option key={section.id} value={section.id}>
                              {section.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="item-title">Item title</Label>
                        <Input
                          id="item-title"
                          placeholder="e.g. Array Fundamentals"
                          value={itemDraft.title}
                          onChange={(event) =>
                            setItemDraft({ ...itemDraft, title: event.target.value })
                          }
                        />
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="item-type">Item type</Label>
                          <select
                            id="item-type"
                            value={itemDraft.type}
                            onChange={(event) =>
                              setItemDraft({
                                ...itemDraft,
                                type: event.target.value as CurriculumItemType,
                              })
                            }
                            className="w-full rounded-md border border-[#D8E5E9] bg-white p-2"
                          >
                            <option value="video">Video</option>
                            <option value="material">Material</option>
                            <option value="quiz">Quiz</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="item-source-type">Source type</Label>
                          <select
                            id="item-source-type"
                            value={itemDraft.sourceType}
                            onChange={(event) =>
                              setItemDraft({
                                ...itemDraft,
                                sourceType: event.target.value as CurriculumSourceType,
                                sourceValue: "",
                              })
                            }
                            className="w-full rounded-md border border-[#D8E5E9] bg-white p-2"
                          >
                            <option value="upload">Upload file</option>
                            <option value="link">Use link / external source</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="item-description">Description</Label>
                        <Textarea
                          id="item-description"
                          rows={4}
                          placeholder="Explain how this item is used in the class..."
                          value={itemDraft.description}
                          onChange={(event) =>
                            setItemDraft({ ...itemDraft, description: event.target.value })
                          }
                        />
                      </div>

                      {itemDraft.sourceType === "upload" ? (
                        <div className="space-y-2">
                          <Label htmlFor="item-file-upload">Upload source</Label>
                          <label
                            htmlFor="item-file-upload"
                            onDragOver={(event) => {
                              event.preventDefault();
                              setIsUploadDragActive(true);
                            }}
                            onDragLeave={() => setIsUploadDragActive(false)}
                            onDrop={(event) => {
                              event.preventDefault();
                              handleItemFileSelect(event.dataTransfer.files?.[0] ?? null);
                            }}
                            className={`flex cursor-pointer flex-col items-center justify-center rounded-[1.25rem] border-2 border-dashed px-5 py-8 text-center transition ${
                              isUploadDragActive
                                ? "border-[#308279] bg-[#EBF3F1]"
                                : "border-[#C7DCE0] bg-[#F9FCFD] hover:border-[#308279]/60 hover:bg-[#F4FAF8]"
                            }`}
                          >
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#308279] text-white shadow-sm">
                              <Upload className="h-6 w-6" />
                            </div>
                            <div className="mt-4 text-base font-semibold text-[#0A1B45]">
                              Drag and drop a curriculum file here
                            </div>
                            <div className="mt-2 text-sm leading-6 text-[#476074]">
                              Works for video uploads, downloadable material, or supporting files.
                            </div>
                            <div className="mt-4 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#308279] shadow-sm">
                              {itemDraft.sourceValue || "Choose file"}
                            </div>
                            <input
                              id="item-file-upload"
                              type="file"
                              className="hidden"
                              onChange={(event) =>
                                handleItemFileSelect(event.target.files?.[0] ?? null)
                              }
                            />
                          </label>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Label htmlFor="item-source-value">Source value</Label>
                          <Input
                            id="item-source-value"
                            placeholder={
                              itemDraft.type === "quiz"
                                ? "e.g. Quiz managed from evaluation service"
                                : "https://example.com/resource"
                            }
                            value={itemDraft.sourceValue}
                            onChange={(event) =>
                              setItemDraft({ ...itemDraft, sourceValue: event.target.value })
                            }
                          />
                        </div>
                      )}

                      <div className="flex gap-3">
                        <Button className="flex-1 bg-[#308279] hover:bg-[#308279]/90" onClick={handleItemSubmit}>
                          <Plus className="mr-2 h-4 w-4" />
                          {editingItemId ? "Save Item" : "Add Item"}
                        </Button>
                        {(editingItemId ||
                          itemDraft.title ||
                          itemDraft.description ||
                          itemDraft.sourceValue) && (
                          <Button variant="outline" className="border-[#D8E5E9]" onClick={resetItemDraft}>
                            Reset
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
