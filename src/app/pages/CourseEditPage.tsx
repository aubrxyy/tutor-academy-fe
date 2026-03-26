import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Upload,
  Video,
  Calendar,
  FileText,
  BookOpen,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";

export default function CourseEditPage() {
  const { courseId } = useParams();
  const [classData, setClassData] = useState({
    title: "Data Structures & Algorithms",
    subtitle: "Master the fundamentals of DSA",
    description: "Kelas intensif untuk mahasiswa BINUS yang ingin memahami DSA lewat video lesson, live Zoom session, dan materi PDF pendukung.",
    level: "Intermediate",
    category: "Computer Science",
    language: "Bahasa Indonesia",
    duration: "12 weeks",
    tutor: "Raka Pratama",
  });

  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "Class Overview & Learning Path",
      duration: "15:30",
      status: "Published",
    },
    {
      id: 2,
      title: "Array Fundamentals",
      duration: "27:10",
      status: "Published",
    },
  ]);

  const [sessions, setSessions] = useState([
    {
      id: 1,
      title: "Two Pointer Technique",
      date: "2026-02-17",
      time: "14:00",
      tutor: "Raka Pratama",
    },
  ]);

  const [materials, setMaterials] = useState([
    {
      id: 1,
      title: "Array & Linked List Fundamentals",
      type: "PDF",
      owner: "Tutor upload",
    },
  ]);

  const [isAddVideoOpen, setIsAddVideoOpen] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: "",
    duration: "",
    status: "Draft",
  });

  const handleAddVideo = () => {
    if (!newVideo.title || !newVideo.duration) {
      toast.error("Please fill in the video title and duration");
      return;
    }

    setVideos((current) => [
      ...current,
      {
        id: current.length + 1,
        title: newVideo.title,
        duration: newVideo.duration,
        status: newVideo.status,
      },
    ]);
    setNewVideo({ title: "", duration: "", status: "Draft" });
    setIsAddVideoOpen(false);
    toast.success("Video added successfully!");
  };

  const handleDeleteVideo = (id: number) => {
    setVideos((current) => current.filter((video) => video.id !== id));
    toast.success("Video removed");
  };

  const handleSaveChanges = () => {
    toast.success("Class changes saved", {
      description: `Konfigurasi class #${courseId ?? "1"} berhasil diperbarui.`,
    });
  };

  return (
    <div className="min-h-screen bg-[#F3F8FA]">
      <header className="bg-gradient-to-r from-[#0A1B45] to-[#308279] text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Link to="/admin-dashboard">
            <Button variant="ghost" className="mb-6 text-white hover:bg-white/10">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Admin Dashboard
            </Button>
          </Link>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Edit Class</h1>
              <p className="mt-2 text-white/80">
                Kelola struktur class, tutor assignment, dan video lesson yang dipublikasikan admin.
              </p>
            </div>
            <Button className="bg-white text-[#308279] hover:bg-white/90" onClick={handleSaveChanges}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="mb-8 grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card className="p-8">
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

                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <Label htmlFor="level">Level</Label>
                    <select
                      id="level"
                      value={classData.level}
                      onChange={(event) => setClassData({ ...classData, level: event.target.value })}
                      className="w-full rounded-md border p-2"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      value={classData.category}
                      onChange={(event) => setClassData({ ...classData, category: event.target.value })}
                      className="w-full rounded-md border p-2"
                    >
                      <option>Computer Science</option>
                      <option>Business</option>
                      <option>Marketing</option>
                      <option>Accounting</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Input
                      id="language"
                      value={classData.language}
                      onChange={(event) => setClassData({ ...classData, language: event.target.value })}
                    />
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

                <div className="space-y-2">
                  <Label htmlFor="tutor">Assigned Tutor</Label>
                  <Input
                    id="tutor"
                    value={classData.tutor}
                    onChange={(event) => setClassData({ ...classData, tutor: event.target.value })}
                  />
                </div>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="videos">
            <Card className="p-8">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#0A1B45]">Video Library</h2>
                  <p className="mt-2 text-[#476074]">Admin uploads and sequences the on-demand videos for this class</p>
                </div>
                <Dialog open={isAddVideoOpen} onOpenChange={setIsAddVideoOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#308279] hover:bg-[#308279]/90">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Video
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xl">
                    <DialogHeader>
                      <DialogTitle>Add Lesson Video</DialogTitle>
                      <DialogDescription>
                        Tambahkan video baru ke library class ini.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="video-title">Video Title</Label>
                        <Input
                          id="video-title"
                          value={newVideo.title}
                          onChange={(event) => setNewVideo({ ...newVideo, title: event.target.value })}
                          placeholder="e.g., Binary Search Deep Dive"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="video-duration">Duration</Label>
                          <Input
                            id="video-duration"
                            value={newVideo.duration}
                            onChange={(event) => setNewVideo({ ...newVideo, duration: event.target.value })}
                            placeholder="e.g., 18:20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="video-status">Status</Label>
                          <select
                            id="video-status"
                            value={newVideo.status}
                            onChange={(event) => setNewVideo({ ...newVideo, status: event.target.value })}
                            className="w-full rounded-md border p-2"
                          >
                            <option>Draft</option>
                            <option>Published</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="video-file">Upload Video File</Label>
                        <Input id="video-file" type="file" />
                      </div>
                      <Button className="w-full bg-[#308279] hover:bg-[#308279]/90" onClick={handleAddVideo}>
                        <Upload className="mr-2 h-4 w-4" />
                        Add to Library
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {videos.map((video) => (
                  <div key={video.id} className="rounded-2xl border bg-white p-5">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0A1B45]/10 text-[#0A1B45]">
                          <Video className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="text-lg font-bold text-[#0A1B45]">{video.title}</div>
                          <div className="mt-1 text-sm text-[#476074]">Duration {video.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="border-0 bg-[#308279]/10 text-[#308279]">{video.status}</Badge>
                        <Button
                          variant="outline"
                          className="border-[#308279] text-[#308279]"
                          onClick={() =>
                            toast.message("Video file updated", {
                              description: `${video.title} siap menerima revisi file video.`,
                            })
                          }
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Replace File
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteVideo(video.id)}>
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="operations">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#308279]/10 text-[#308279]">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#0A1B45]">Tutor Live Sessions</h2>
                    <p className="text-[#476074]">Tutor-managed Zoom schedule for this class</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div key={session.id} className="rounded-2xl bg-[#F3F8FA] p-4">
                      <div className="font-bold text-[#0A1B45]">{session.title}</div>
                      <div className="mt-1 text-sm text-[#476074]">
                        {session.date} • {session.time}
                      </div>
                      <div className="mt-1 text-sm text-[#476074]">Tutor: {session.tutor}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0A1B45]/10 text-[#0A1B45]">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#0A1B45]">Tutor Documents</h2>
                    <p className="text-[#476074]">PDF and document materials attached by the tutor</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {materials.map((material) => (
                    <div key={material.id} className="rounded-2xl bg-[#F3F8FA] p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="font-bold text-[#0A1B45]">{material.title}</div>
                          <div className="mt-1 text-sm text-[#476074]">
                            {material.type} • {material.owner}
                          </div>
                        </div>
                        <Badge className="border-0 bg-[#0A1B45]/10 text-[#0A1B45]">Tutor owned</Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-dashed border-[#308279]/30 bg-[#308279]/5 p-4 text-sm text-[#476074]">
                  Admin dapat meninjau kelengkapan tutor materials dari sini, tetapi upload dokumen tetap dilakukan lewat tutor dashboard.
                </div>
              </Card>

              <Card className="p-8 lg:col-span-2">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#92B7B0]/20 text-[#0A1B45]">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#0A1B45]">Operational Notes</h2>
                    <p className="text-[#476074]">Ownership split for this class after the revamp</p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-[#0A1B45] p-5 text-white">
                    <div className="text-xs uppercase tracking-[0.18em] text-white/60">Admin responsibility</div>
                    <ul className="mt-3 space-y-2 text-sm text-white/85">
                      <li>Create and structure the class</li>
                      <li>Assign tutor and pricing</li>
                      <li>Upload and organize lesson videos</li>
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-[#308279] p-5 text-white">
                    <div className="text-xs uppercase tracking-[0.18em] text-white/60">Tutor responsibility</div>
                    <ul className="mt-3 space-y-2 text-sm text-white/85">
                      <li>Schedule live Zoom sessions</li>
                      <li>Upload PDF and document materials</li>
                      <li>Deliver synchronous teaching support</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
