import { useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Save, Plus, Trash2, Upload, Video, FileText, ClipboardList } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "../components/ui/dialog";
import { toast } from "sonner";

export default function CourseEditPage() {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState({
    title: "Data Structures & Algorithms",
    subtitle: "Master the fundamentals of DSA",
    description: "Comprehensive course on data structures and algorithms...",
    level: "Intermediate",
    category: "Computer Science",
    language: "Bahasa Indonesia",
    duration: "12 weeks",
  });

  const [sessions, setSessions] = useState([
    {
      id: 1,
      title: "Two Pointer Technique",
      date: "2026-02-17",
      time: "14:00",
      duration: 90,
      zoomLink: "https://zoom.us/j/123456789",
      description: "Learn advanced two pointer techniques",
    },
  ]);

  const [materials, setMaterials] = useState([
    {
      id: 1,
      title: "Array & Linked List Fundamentals",
      type: "PDF",
      description: "Complete guide to arrays and linked lists",
    },
  ]);

  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      title: "Array & Linked List Quiz",
      questions: 15,
      duration: 30,
      difficulty: "Medium",
    },
  ]);

  // New session dialog state
  const [isAddSessionOpen, setIsAddSessionOpen] = useState(false);
  const [newSession, setNewSession] = useState({
    title: "",
    date: "",
    time: "",
    duration: 90,
    zoomLink: "",
    description: "",
  });

  // New material dialog state
  const [isAddMaterialOpen, setIsAddMaterialOpen] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    title: "",
    type: "PDF",
    description: "",
  });

  // New quiz dialog state
  const [isAddQuizOpen, setIsAddQuizOpen] = useState(false);
  const [newQuiz, setNewQuiz] = useState({
    title: "",
    questions: 10,
    duration: 30,
    difficulty: "Medium",
  });

  // Handlers for sessions
  const handleAddSession = () => {
    if (!newSession.title || !newSession.date || !newSession.time) {
      toast.error("Please fill in all required fields");
      return;
    }
    const session = {
      id: sessions.length + 1,
      ...newSession,
    };
    setSessions([...sessions, session]);
    setNewSession({ title: "", date: "", time: "", duration: 90, zoomLink: "", description: "" });
    setIsAddSessionOpen(false);
    toast.success("Session added successfully!");
  };

  const handleDeleteSession = (id: number) => {
    setSessions(sessions.filter((s) => s.id !== id));
    toast.success("Session deleted");
  };

  const handleUpdateSession = (id: number, field: string, value: string | number) => {
    setSessions(sessions.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  // Handlers for materials
  const handleAddMaterial = () => {
    if (!newMaterial.title) {
      toast.error("Please enter a material title");
      return;
    }
    const material = {
      id: materials.length + 1,
      ...newMaterial,
    };
    setMaterials([...materials, material]);
    setNewMaterial({ title: "", type: "PDF", description: "" });
    setIsAddMaterialOpen(false);
    toast.success("Material added successfully!");
  };

  const handleDeleteMaterial = (id: number) => {
    setMaterials(materials.filter((m) => m.id !== id));
    toast.success("Material deleted");
  };

  const handleUpdateMaterial = (id: number, field: string, value: string) => {
    setMaterials(materials.map((m) => (m.id === id ? { ...m, [field]: value } : m)));
  };

  // Handlers for quizzes
  const handleAddQuiz = () => {
    if (!newQuiz.title) {
      toast.error("Please enter a quiz title");
      return;
    }
    const quiz = {
      id: quizzes.length + 1,
      ...newQuiz,
    };
    setQuizzes([...quizzes, quiz]);
    setNewQuiz({ title: "", questions: 10, duration: 30, difficulty: "Medium" });
    setIsAddQuizOpen(false);
    toast.success("Quiz added successfully!");
  };

  const handleDeleteQuiz = (id: number) => {
    setQuizzes(quizzes.filter((q) => q.id !== id));
    toast.success("Quiz deleted");
  };

  const handleUpdateQuiz = (id: number, field: string, value: string | number) => {
    setQuizzes(quizzes.map((q) => (q.id === id ? { ...q, [field]: value } : q)));
  };

  // Save all changes
  const handleSaveChanges = () => {
    toast.success("All changes saved successfully!");
  };

  return (
    <div className="min-h-screen bg-[#F3F8FA]">
      <header className="bg-gradient-to-r from-[#0A1B45] to-[#308279] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link to="/tutor-dashboard">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-6">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Edit Course</h1>
              <p className="text-white/80 mt-2">Update course information and content</p>
            </div>
            <Button 
              className="bg-white text-[#308279] hover:bg-white/90"
              onClick={handleSaveChanges}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-4 mb-8">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-[#0A1B45] mb-6">Course Information</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Course Title</Label>
                    <Input
                      id="title"
                      value={courseData.title}
                      onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Input
                      id="subtitle"
                      value={courseData.subtitle}
                      onChange={(e) => setCourseData({ ...courseData, subtitle: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={courseData.description}
                    onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                    rows={6}
                  />
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="level">Level</Label>
                    <select
                      id="level"
                      value={courseData.level}
                      onChange={(e) => setCourseData({ ...courseData, level: e.target.value })}
                      className="w-full p-2 border rounded-md"
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
                      value={courseData.category}
                      onChange={(e) => setCourseData({ ...courseData, category: e.target.value })}
                      className="w-full p-2 border rounded-md"
                    >
                      <option>Computer Science</option>
                      <option>Business</option>
                      <option>Marketing</option>
                      <option>Accounting</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <select
                      id="language"
                      value={courseData.language}
                      onChange={(e) => setCourseData({ ...courseData, language: e.target.value })}
                      className="w-full p-2 border rounded-md"
                    >
                      <option>Bahasa Indonesia</option>
                      <option>English</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={courseData.duration}
                      onChange={(e) => setCourseData({ ...courseData, duration: e.target.value })}
                    />
                  </div>
                </div>
              </form>
            </Card>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions">
            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#0A1B45]">Live Sessions</h2>
                <Dialog open={isAddSessionOpen} onOpenChange={setIsAddSessionOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#308279] hover:bg-[#308279]/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Session
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Session</DialogTitle>
                      <DialogDescription>Create a new live session for this course</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-session-title">Session Title</Label>
                        <Input
                          id="new-session-title"
                          value={newSession.title}
                          onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
                          placeholder="e.g., Two Pointer Technique"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="new-session-date">Date</Label>
                          <Input
                            id="new-session-date"
                            type="date"
                            value={newSession.date}
                            onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-session-time">Time</Label>
                          <Input
                            id="new-session-time"
                            type="time"
                            value={newSession.time}
                            onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-session-duration">Duration (minutes)</Label>
                        <Input
                          id="new-session-duration"
                          type="number"
                          value={newSession.duration}
                          onChange={(e) => setNewSession({ ...newSession, duration: parseInt(e.target.value) })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-session-zoom">Zoom Link</Label>
                        <Input
                          id="new-session-zoom"
                          value={newSession.zoomLink}
                          onChange={(e) => setNewSession({ ...newSession, zoomLink: e.target.value })}
                          placeholder="https://zoom.us/j/..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-session-description">Description</Label>
                        <Textarea
                          id="new-session-description"
                          value={newSession.description}
                          onChange={(e) => setNewSession({ ...newSession, description: e.target.value })}
                          rows={3}
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button onClick={handleAddSession} className="bg-[#308279] hover:bg-[#308279]/90">
                          Add Session
                        </Button>
                        <Button variant="outline" onClick={() => setIsAddSessionOpen(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {sessions.map((session) => (
                  <Card key={session.id} className="p-6 border-2">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#308279] to-[#0A1B45] flex items-center justify-center">
                          <Video className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 space-y-4">
                          <Input 
                            value={session.title} 
                            onChange={(e) => handleUpdateSession(session.id, "title", e.target.value)}
                            placeholder="Session Title" 
                          />
                          <div className="grid grid-cols-3 gap-4">
                            <Input 
                              type="date" 
                              value={session.date}
                              onChange={(e) => handleUpdateSession(session.id, "date", e.target.value)}
                            />
                            <Input 
                              type="time" 
                              value={session.time}
                              onChange={(e) => handleUpdateSession(session.id, "time", e.target.value)}
                            />
                            <Input 
                              type="number" 
                              value={session.duration} 
                              onChange={(e) => handleUpdateSession(session.id, "duration", parseInt(e.target.value))}
                              placeholder="Duration (min)" 
                            />
                          </div>
                          <Input 
                            value={session.zoomLink}
                            onChange={(e) => handleUpdateSession(session.id, "zoomLink", e.target.value)}
                            placeholder="Zoom Link" 
                          />
                          <Textarea 
                            value={session.description}
                            onChange={(e) => handleUpdateSession(session.id, "description", e.target.value)}
                            placeholder="Description" 
                            rows={2} 
                          />
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500"
                        onClick={() => handleDeleteSession(session.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
                {sessions.length === 0 && (
                  <div className="text-center py-12 text-[#476074]">
                    <Video className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No sessions yet. Click "Add Session" to create your first one.</p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Materials Tab */}
          <TabsContent value="materials">
            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#0A1B45]">Course Materials</h2>
                <Dialog open={isAddMaterialOpen} onOpenChange={setIsAddMaterialOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#308279] hover:bg-[#308279]/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Upload Material
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Material</DialogTitle>
                      <DialogDescription>Upload a new learning material for this course</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-material-title">Material Title</Label>
                        <Input
                          id="new-material-title"
                          value={newMaterial.title}
                          onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                          placeholder="e.g., Array & Linked List Fundamentals"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-material-type">Type</Label>
                        <select
                          id="new-material-type"
                          value={newMaterial.type}
                          onChange={(e) => setNewMaterial({ ...newMaterial, type: e.target.value })}
                          className="w-full p-2 border rounded-md"
                        >
                          <option>PDF</option>
                          <option>Video</option>
                          <option>Image</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-material-description">Description</Label>
                        <Textarea
                          id="new-material-description"
                          value={newMaterial.description}
                          onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                          rows={3}
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button onClick={handleAddMaterial} className="bg-[#308279] hover:bg-[#308279]/90">
                          Add Material
                        </Button>
                        <Button variant="outline" onClick={() => setIsAddMaterialOpen(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {materials.map((material) => (
                  <Card key={material.id} className="p-6 border-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#92B7B0] to-[#308279] flex items-center justify-center">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 space-y-4">
                          <Input 
                            value={material.title}
                            onChange={(e) => handleUpdateMaterial(material.id, "title", e.target.value)}
                            placeholder="Material Title" 
                          />
                          <select 
                            className="w-full p-2 border rounded-md"
                            value={material.type}
                            onChange={(e) => handleUpdateMaterial(material.id, "type", e.target.value)}
                          >
                            <option>PDF</option>
                            <option>Video</option>
                            <option>Image</option>
                          </select>
                          <Textarea 
                            value={material.description}
                            onChange={(e) => handleUpdateMaterial(material.id, "description", e.target.value)}
                            placeholder="Description" 
                            rows={2} 
                          />
                          <Button variant="outline" size="sm">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload File
                          </Button>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500"
                        onClick={() => handleDeleteMaterial(material.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
                {materials.length === 0 && (
                  <div className="text-center py-12 text-[#476074]">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No materials yet. Click "Upload Material" to add your first one.</p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Quizzes Tab */}
          <TabsContent value="quizzes">
            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#0A1B45]">Quizzes</h2>
                <Dialog open={isAddQuizOpen} onOpenChange={setIsAddQuizOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#308279] hover:bg-[#308279]/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Quiz
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Quiz</DialogTitle>
                      <DialogDescription>Add a new quiz to test student knowledge</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-quiz-title">Quiz Title</Label>
                        <Input
                          id="new-quiz-title"
                          value={newQuiz.title}
                          onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                          placeholder="e.g., Array & Linked List Quiz"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="new-quiz-questions">Number of Questions</Label>
                          <Input
                            id="new-quiz-questions"
                            type="number"
                            value={newQuiz.questions}
                            onChange={(e) => setNewQuiz({ ...newQuiz, questions: parseInt(e.target.value) })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-quiz-duration">Duration (minutes)</Label>
                          <Input
                            id="new-quiz-duration"
                            type="number"
                            value={newQuiz.duration}
                            onChange={(e) => setNewQuiz({ ...newQuiz, duration: parseInt(e.target.value) })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-quiz-difficulty">Difficulty</Label>
                        <select
                          id="new-quiz-difficulty"
                          value={newQuiz.difficulty}
                          onChange={(e) => setNewQuiz({ ...newQuiz, difficulty: e.target.value })}
                          className="w-full p-2 border rounded-md"
                        >
                          <option>Easy</option>
                          <option>Medium</option>
                          <option>Hard</option>
                        </select>
                      </div>
                      <div className="flex gap-3">
                        <Button onClick={handleAddQuiz} className="bg-[#308279] hover:bg-[#308279]/90">
                          Create Quiz
                        </Button>
                        <Button variant="outline" onClick={() => setIsAddQuizOpen(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {quizzes.map((quiz) => (
                  <Card key={quiz.id} className="p-6 border-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#476074] to-[#0A1B45] flex items-center justify-center">
                          <ClipboardList className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 space-y-4">
                          <Input 
                            value={quiz.title}
                            onChange={(e) => handleUpdateQuiz(quiz.id, "title", e.target.value)}
                            placeholder="Quiz Title" 
                          />
                          <div className="grid grid-cols-3 gap-4">
                            <Input 
                              type="number" 
                              value={quiz.questions}
                              onChange={(e) => handleUpdateQuiz(quiz.id, "questions", parseInt(e.target.value))}
                              placeholder="Questions" 
                            />
                            <Input 
                              type="number" 
                              value={quiz.duration}
                              onChange={(e) => handleUpdateQuiz(quiz.id, "duration", parseInt(e.target.value))}
                              placeholder="Duration (min)" 
                            />
                            <select 
                              className="p-2 border rounded-md"
                              value={quiz.difficulty}
                              onChange={(e) => handleUpdateQuiz(quiz.id, "difficulty", e.target.value)}
                            >
                              <option>Easy</option>
                              <option>Medium</option>
                              <option>Hard</option>
                            </select>
                          </div>
                          <Button variant="outline" size="sm">
                            Edit Questions
                          </Button>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500"
                        onClick={() => handleDeleteQuiz(quiz.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
                {quizzes.length === 0 && (
                  <div className="text-center py-12 text-[#476074]">
                    <ClipboardList className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No quizzes yet. Click "Create Quiz" to add your first one.</p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}