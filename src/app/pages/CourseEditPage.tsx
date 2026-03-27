import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import {
  ArrowLeft,
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

type EditorTab = "basic" | "videos";

type ManagedVideo = {
  id: number;
  title: string;
  description: string;
  sourceType: "upload" | "link";
  sourceValue: string;
  status: "Published" | "Draft";
};

export default function CourseEditPage() {
  const { courseId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab");
  const activeTab: EditorTab = initialTab === "videos" ? "videos" : "basic";
  const tutorOptions = ["Raka Pratama", "Andi Wijaya", "Denny Kusuma"];
  const isNewClass = courseId === "new";

  const [classData, setClassData] = useState({
    title: isNewClass ? "" : "Data Structures & Algorithms",
    subtitle: isNewClass ? "" : "Master the fundamentals of DSA",
    description: isNewClass
      ? ""
      : "Kelas intensif untuk mahasiswa BINUS yang ingin memahami DSA lewat video lesson, live Zoom session, dan materi PDF pendukung.",
    category: isNewClass ? "Computer Science" : "Computer Science",
    duration: isNewClass ? "" : "12 weeks",
    tutor: isNewClass ? tutorOptions[0] : "Raka Pratama",
    status: "Active",
  });

  const [videos, setVideos] = useState<ManagedVideo[]>(
    isNewClass
      ? []
      : [
          {
            id: 1,
            title: "Class Overview & Learning Path",
            description: "Ringkasan struktur pembelajaran, target capaian, dan roadmap class untuk mahasiswa baru bergabung.",
            sourceType: "link",
            sourceValue: "https://zoom.us/rec/share/class-overview",
            status: "Published",
          },
          {
            id: 2,
            title: "Array Fundamentals",
            description: "Penjelasan dasar array, operasi umum, dan studi kasus yang akan dipakai di live session berikutnya.",
            sourceType: "upload",
            sourceValue: "array-fundamentals.mp4",
            status: "Published",
          },
        ],
  );

  const [newVideo, setNewVideo] = useState({
    title: "",
    description: "",
    sourceType: "upload" as const,
    sourceValue: "",
  });
  const [isUploadDragActive, setIsUploadDragActive] = useState(false);

  const setTab = (tab: EditorTab) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("tab", tab);
    setSearchParams(nextParams);
  };

  const handleAddVideo = () => {
    if (
      !newVideo.title.trim() ||
      !newVideo.description.trim() ||
      !newVideo.sourceValue.trim()
    ) {
      toast.error("Please complete the video title, description, and source.");
      return;
    }

    setVideos((current) => [
      ...current,
      {
        id: current.length + 1,
        title: newVideo.title.trim(),
        description: newVideo.description.trim(),
        sourceType: newVideo.sourceType,
        sourceValue: newVideo.sourceValue.trim(),
        status: "Draft",
      },
    ]);
    setNewVideo({ title: "", description: "", sourceType: "upload", sourceValue: "" });
    toast.success("Video added successfully!");
  };

  const handleDeleteVideo = (id: number) => {
    setVideos((current) => current.filter((video) => video.id !== id));
    toast.success("Video removed");
  };

  const handleVideoFileSelect = (file: File | null) => {
    if (!file) return;
    setNewVideo((current) => ({
      ...current,
      sourceType: "upload",
      sourceValue: file.name,
    }));
    setIsUploadDragActive(false);
  };

  const handleSaveChanges = () => {
    toast.success(isNewClass ? "New class created" : "Class changes saved", {
      description: isNewClass
        ? `Draft for ${classData.title || "untitled class"} is ready for publishing.`
        : `Konfigurasi class #${courseId ?? "1"} berhasil diperbarui.`,
    });
  };

  return (
    <div className="min-h-screen bg-[#F3F8FA] lg:flex">
      <AdminSidebar activeView="classes" />

      <main className="min-w-0 flex-1">
        <div className="border-b border-[#D8E5E9] bg-gradient-to-r from-[#0A1B45] via-[#123061] to-[#308279] text-white">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10">
            <Link to="/admin-dashboard?view=classes">
              <Button variant="ghost" className="mb-6 text-white hover:bg-white/10">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Classes
              </Button>
            </Link>

            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/75">
                  Class workspace
                </div>
                <h1 className="mt-5 text-4xl font-bold tracking-[-0.03em]">
                  {isNewClass ? "Create New Class" : "Edit Class"}
                </h1>
                <p className="mt-3 max-w-2xl text-white/80">
                  Manage class details, publish on-demand videos, and review the tutor-managed support materials.
                </p>
              </div>

              <Button className="bg-white text-[#0A1B45] hover:bg-white/90" onClick={handleSaveChanges}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10">
          <Tabs value={activeTab} onValueChange={(value) => setTab(value as EditorTab)} className="w-full">
            <TabsList className="mb-8 grid w-full max-w-xl grid-cols-2 rounded-2xl border border-[#D8E5E9] bg-white p-1">
              <TabsTrigger
                value="basic"
                className="rounded-xl font-semibold text-[#476074] data-[state=active]:border-[#0A1B45]/10 data-[state=active]:bg-[#0A1B45] data-[state=active]:text-white"
              >
                Basic Info
              </TabsTrigger>
              <TabsTrigger
                value="videos"
                className="rounded-xl font-semibold text-[#476074] data-[state=active]:border-[#0A1B45]/10 data-[state=active]:bg-[#0A1B45] data-[state=active]:text-white"
              >
                Video Library
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <Card className="rounded-[1.75rem] border-[#D8E5E9] bg-white p-8 shadow-[0_18px_42px_rgba(10,27,69,0.07)]">
                <h2 className="mb-6 text-2xl font-bold text-[#0A1B45]">Class Information</h2>
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

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <select
                        id="category"
                        value={classData.category}
                        onChange={(event) => setClassData({ ...classData, category: event.target.value })}
                        className="w-full rounded-md border border-[#D8E5E9] bg-white p-2"
                      >
                        <option>Computer Science</option>
                        <option>Business</option>
                        <option>Marketing</option>
                        <option>Accounting</option>
                        <option>Design</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        value={classData.duration}
                        onChange={(event) => setClassData({ ...classData, duration: event.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="tutor">Assigned Tutor</Label>
                      <select
                        id="tutor"
                        value={classData.tutor}
                        onChange={(event) => setClassData({ ...classData, tutor: event.target.value })}
                        className="w-full rounded-md border border-[#D8E5E9] bg-white p-2"
                      >
                        {tutorOptions.map((tutor) => (
                          <option key={tutor}>{tutor}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Publishing Status</Label>
                      <select
                        id="status"
                        value={classData.status}
                        onChange={(event) => setClassData({ ...classData, status: event.target.value })}
                        className="w-full rounded-md border border-[#D8E5E9] bg-white p-2"
                      >
                        <option>Active</option>
                        <option>Updating</option>
                      </select>
                    </div>
                  </div>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="videos">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
                <Card className="rounded-[1.75rem] border-[#D8E5E9] bg-white p-8 shadow-[0_18px_42px_rgba(10,27,69,0.07)]">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-[#0A1B45]">Video Library</h2>
                      <p className="mt-2 text-[#476074]">
                        Admin uploads and sequences the on-demand videos for this class.
                      </p>
                    </div>
                    <Badge className="border-0 bg-[#308279]/10 text-[#1F6D66]">
                      {videos.length} total videos
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    {videos.map((video) => (
                      <div
                        key={video.id}
                        className="flex flex-col gap-4 rounded-[1.25rem] border border-[#D8E5E9] bg-[#F9FCFD] p-5 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex size-12 items-center justify-center rounded-full bg-[#0A1B45] text-white">
                            <Video className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-semibold text-[#0A1B45]">{video.title}</div>
                            <div className="mt-1 text-sm leading-6 text-[#476074]">{video.description}</div>
                            <div className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-[#92A4AE]">
                              {video.sourceType === "upload" ? "Uploaded file" : "Video link"}: {video.sourceValue}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Badge
                            className={
                              video.status === "Published"
                                ? "border-0 bg-[#308279]/12 text-[#1F6D66]"
                                : "border-0 bg-[#FCEFC7] text-[#7A5A00]"
                            }
                          >
                            {video.status}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-[#B42318] hover:bg-[#FDECEC] hover:text-[#B42318]"
                            onClick={() => handleDeleteVideo(video.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="rounded-[1.75rem] border-[#D8E5E9] bg-white p-8 shadow-[0_18px_42px_rgba(10,27,69,0.07)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#308279] text-white">
                      <Upload className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0A1B45]">Add New Video</h3>
                      <p className="text-sm text-[#476074]">Publish a new lesson to this class.</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="video-title">Video title</Label>
                      <Input
                        id="video-title"
                        placeholder="e.g. Graph Traversal Fundamentals"
                        value={newVideo.title}
                        onChange={(event) => setNewVideo({ ...newVideo, title: event.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="video-description">Description</Label>
                      <Textarea
                        id="video-description"
                        placeholder="Summarize what students will learn from this video..."
                        rows={5}
                        value={newVideo.description}
                        onChange={(event) => setNewVideo({ ...newVideo, description: event.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="video-source-type">Video Source</Label>
                      <select
                        id="video-source-type"
                        value={newVideo.sourceType}
                        onChange={(event) =>
                          setNewVideo({
                            ...newVideo,
                            sourceType: event.target.value as "upload" | "link",
                            sourceValue: "",
                          })
                        }
                        className="w-full rounded-md border border-[#D8E5E9] bg-white p-2"
                      >
                        <option value="upload">Upload Video</option>
                        <option value="link">Add Video Link</option>
                      </select>
                    </div>
                    {newVideo.sourceType === "upload" ? (
                      <div className="space-y-2">
                        <Label htmlFor="video-file-upload">Video Upload</Label>
                        <label
                          htmlFor="video-file-upload"
                          onDragOver={(event) => {
                            event.preventDefault();
                            setIsUploadDragActive(true);
                          }}
                          onDragLeave={() => setIsUploadDragActive(false)}
                          onDrop={(event) => {
                            event.preventDefault();
                            handleVideoFileSelect(event.dataTransfer.files?.[0] ?? null);
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
                            Drag and drop your video here
                          </div>
                          <div className="mt-2 text-sm leading-6 text-[#476074]">
                            or click to browse a local video file for this class library.
                          </div>
                          <div className="mt-4 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#308279] shadow-sm">
                            {newVideo.sourceValue || "Choose video file"}
                          </div>
                          <input
                            id="video-file-upload"
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={(event) =>
                              handleVideoFileSelect(event.target.files?.[0] ?? null)
                            }
                          />
                        </label>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="video-source-value">Video link</Label>
                        <Input
                          id="video-source-value"
                          placeholder="https://example.com/video"
                          value={newVideo.sourceValue}
                          onChange={(event) => setNewVideo({ ...newVideo, sourceValue: event.target.value })}
                        />
                      </div>
                    )}

                    <Button className="w-full bg-[#308279] hover:bg-[#308279]/90" onClick={handleAddVideo}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Video
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
