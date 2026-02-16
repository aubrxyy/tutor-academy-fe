import { useState } from "react";
import { Link, useParams } from "react-router";
import { 
  Play, Pause, Volume2, Maximize, Settings, ChevronLeft, 
  FileText, Download, Clock, CheckCircle, Circle, Eye, Star,
  Video, Calendar, Users, MessageSquare, Trophy, Target, BookOpen,
  AlertCircle, Award, TrendingUp
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Switch } from "../components/ui/switch";
import { Progress } from "../components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { EyeTrackingOverlay, FocusAlertModal, WebcamPreview } from "../components/EyeTrackingComponents";

export default function ClassroomPage() {
  const { courseId } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [eyeTrackingEnabled, setEyeTrackingEnabled] = useState(false);
  const [showFocusAlert, setShowFocusAlert] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(1);

  // Mock course data
  const courseData = {
    id: courseId,
    title: "Data Structures & Algorithms Complete Guide",
    instructor: "Raka Pratama",
    instructorGPA: "3.95",
    progress: 45,
    totalVideos: 12,
    completedVideos: 5,
    rating: 4.9,
    totalReviews: 234,
  };

  const curriculum = [
    {
      section: "Introduction & Fundamentals",
      videos: [
        { id: 1, title: "Course Overview & Learning Path", duration: "15:30", completed: true },
        { id: 2, title: "Time & Space Complexity", duration: "22:45", completed: true },
        { id: 3, title: "Big O Notation Explained", duration: "18:20", completed: true },
      ],
    },
    {
      section: "Arrays & Strings",
      videos: [
        { id: 4, title: "Array Basics & Operations", duration: "25:10", completed: true },
        { id: 5, title: "Two Pointer Technique", duration: "20:35", completed: true },
        { id: 6, title: "Sliding Window Problems", duration: "28:15", completed: false },
      ],
    },
    {
      section: "Linked Lists",
      videos: [
        { id: 7, title: "Singly Linked List Implementation", duration: "30:20", completed: false },
        { id: 8, title: "Doubly Linked List", duration: "22:50", completed: false },
        { id: 9, title: "Linked List Interview Problems", duration: "35:40", completed: false },
      ],
    },
    {
      section: "Trees & Graphs",
      videos: [
        { id: 10, title: "Binary Trees Fundamentals", duration: "28:30", completed: false },
        { id: 11, title: "Tree Traversal Techniques", duration: "32:15", completed: false },
        { id: 12, title: "Graph Algorithms", duration: "40:25", completed: false },
      ],
    },
  ];

  const cheatNotes = [
    { id: 1, title: "Big O Notation Cheat Sheet", pages: 5, size: "2.3 MB", category: "Reference" },
    { id: 2, title: "Array & String Patterns", pages: 8, size: "3.1 MB", category: "Study Guide" },
    { id: 3, title: "Linked List Quick Reference", pages: 6, size: "2.7 MB", category: "Cheat Sheet" },
    { id: 4, title: "Tree & Graph Algorithms", pages: 12, size: "4.5 MB", category: "Study Guide" },
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: "Two Pointer Technique & Sliding Window",
      date: "Senin, 17 Feb 2026",
      time: "14:00 - 15:30",
      zoomLink: "https://zoom.us/j/example1",
      attendees: 124,
      status: "upcoming",
    },
    {
      id: 2,
      title: "Binary Search Deep Dive",
      date: "Rabu, 19 Feb 2026",
      time: "16:00 - 17:30",
      zoomLink: "https://zoom.us/j/example2",
      attendees: 118,
      status: "upcoming",
    },
    {
      id: 3,
      title: "Dynamic Programming Basics",
      date: "Jumat, 21 Feb 2026",
      time: "13:00 - 14:30",
      zoomLink: "https://zoom.us/j/example3",
      attendees: 132,
      status: "upcoming",
    },
  ];

  const quizzes = [
    {
      id: 1,
      title: "Array & Linked List Quiz",
      questions: 15,
      duration: 30,
      difficulty: "Medium",
      status: "available",
      bestScore: 85,
      attempts: 2,
    },
    {
      id: 2,
      title: "Tree & Graph Quiz",
      questions: 20,
      duration: 45,
      difficulty: "Hard",
      status: "available",
      bestScore: null,
      attempts: 0,
    },
    {
      id: 3,
      title: "Sorting & Searching Quiz",
      questions: 12,
      duration: 25,
      difficulty: "Easy",
      status: "available",
      bestScore: 92,
      attempts: 1,
    },
  ];

  const reviews = [
    {
      id: 1,
      student: "Ahmad Wijaya",
      studentInitials: "AW",
      rating: 5,
      date: "2 hari lalu",
      helpful: 24,
      comment: "Course terbaik yang pernah saya ikuti! Penjelasan tutor sangat jelas dan materinya sangat aplikatif.",
    },
    {
      id: 2,
      student: "Siti Nurhaliza",
      studentInitials: "SN",
      rating: 5,
      date: "5 hari lalu",
      helpful: 18,
      comment: "Live sessions nya sangat interaktif dan tutor selalu siap menjawab pertanyaan. Worth it!",
    },
    {
      id: 3,
      student: "Budi Santoso",
      studentInitials: "BS",
      rating: 4,
      date: "1 minggu lalu",
      helpful: 12,
      comment: "Materi bagus, tapi pace nya agak cepat untuk pemula. Overall recommended!",
    },
  ];

  // Simulate unfocused detection
  const handleEyeTrackingToggle = (enabled: boolean) => {
    setEyeTrackingEnabled(enabled);
    if (enabled) {
      // Simulate detection after 10 seconds
      setTimeout(() => {
        if (enabled) {
          setShowFocusAlert(true);
          setIsPlaying(false);
        }
      }, 10000);
    }
  };

  const handleResumeFocus = () => {
    setShowFocusAlert(false);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-[#F3F8FA]">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-[1920px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/student-dashboard">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Kembali
                </Button>
              </Link>
              <div>
                <h1 className="font-bold text-[#0A1B45]">{courseData.title}</h1>
                <div className="flex items-center gap-3 text-sm text-[#476074]">
                  <span>oleh {courseData.instructor}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#308279] text-[#308279]" />
                    <span>{courseData.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-[#476074]">Progress Kamu</div>
                <div className="font-bold text-[#308279]">
                  {courseData.completedVideos}/{courseData.totalVideos} videos • {courseData.progress}%
                </div>
              </div>
              <div className="w-32">
                <Progress value={courseData.progress} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1920px] mx-auto p-6">
        <div className="grid lg:grid-cols-[1fr_450px] gap-6">
          {/* Main Video Section */}
          <div className="space-y-6">
            {/* Video Player */}
            <Card className="overflow-hidden relative">
              {/* Eye Tracking Overlay */}
              <EyeTrackingOverlay isActive={eyeTrackingEnabled && isPlaying} onDismiss={() => {}} />

              {/* Video Container */}
              <div className="relative bg-black aspect-video">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0A1B45] to-[#308279]">
                  <div className="text-center text-white">
                    <Play className="w-20 h-20 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Video Player Placeholder</p>
                  </div>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center gap-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/20"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </Button>
                    <div className="flex-1">
                      <Progress value={35} className="h-1" />
                    </div>
                    <span className="text-white text-sm">8:45 / 25:10</span>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Volume2 className="w-5 h-5" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Settings className="w-5 h-5" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Maximize className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Eye Tracking Toggle */}
              <div className="p-6 border-t bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#308279] to-[#92B7B0] flex items-center justify-center">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#0A1B45]">Focus Mode (Eye Tracking)</span>
                        <Badge variant="outline" className="border-[#308279] text-[#308279]">Beta</Badge>
                      </div>
                      <p className="text-sm text-[#476074]">
                        AI akan memantau fokus kamu dan memberikan notifikasi jika terdeteksi tidak fokus
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={eyeTrackingEnabled}
                    onCheckedChange={handleEyeTrackingToggle}
                    className="data-[state=checked]:bg-[#308279]"
                  />
                </div>

                {eyeTrackingEnabled && (
                  <div className="mt-4 p-4 bg-[#308279]/5 rounded-lg border border-[#308279]/20">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-[#0A1B45]">92%</div>
                        <div className="text-xs text-[#476074]">Focus Score</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-[#308279]">3x</div>
                        <div className="text-xs text-[#476074]">Unfocused</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-[#0A1B45]">24m</div>
                        <div className="text-xs text-[#476074]">Active Time</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Video Info Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 h-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="sessions">Live Sessions</TabsTrigger>
                <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-6">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold text-[#0A1B45] mb-2">
                    Array Basics & Operations
                  </h2>
                  <p className="text-[#476074] leading-relaxed mb-4">
                    Dalam video ini, kita akan mempelajari konsep dasar array, operasi-operasi yang bisa dilakukan pada array, dan implementasinya. Materi ini sangat penting untuk memahami data structures lebih lanjut.
                  </p>
                  <div className="flex items-center gap-6 text-sm text-[#476074] mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>25:10 menit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>1,234 views</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#308279]" />
                      <span>Completed</span>
                    </div>
                  </div>

                  {/* Key Learning Points */}
                  <div className="border-t pt-6">
                    <h3 className="font-bold text-[#0A1B45] mb-4">What You'll Learn:</h3>
                    <ul className="space-y-2">
                      {[
                        "Understanding array data structure and memory allocation",
                        "Common array operations: insertion, deletion, search",
                        "Time and space complexity analysis",
                        "Practical coding examples and exercises",
                      ].map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-[#476074]">
                          <CheckCircle className="w-5 h-5 text-[#308279] flex-shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </TabsContent>

              {/* Live Sessions Tab */}
              <TabsContent value="sessions" className="mt-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-[#0A1B45] mb-1">Upcoming Live Sessions</h2>
                      <p className="text-sm text-[#476074]">Join interactive Zoom sessions with your tutor</p>
                    </div>
                    <Badge className="bg-[#308279]/10 text-[#308279] border-0">
                      {upcomingSessions.length} scheduled
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <div
                        key={session.id}
                        className="p-5 bg-[#F3F8FA] rounded-lg hover:shadow-md transition-all border-2 border-transparent hover:border-[#308279]"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#308279] to-[#0A1B45] flex items-center justify-center flex-shrink-0">
                              <Video className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-[#0A1B45] mb-2">{session.title}</h3>
                              <div className="flex flex-wrap items-center gap-3 text-sm text-[#476074]">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {session.date}
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {session.time}
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {session.attendees} joined
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button className="bg-[#308279] hover:bg-[#308279]/90 text-white">
                            <Play className="w-4 h-4 mr-2" />
                            Join Now
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Quizzes Tab */}
              <TabsContent value="quizzes" className="mt-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-[#0A1B45] mb-1">Practice Quizzes</h2>
                      <p className="text-sm text-[#476074]">Test your knowledge and track your progress</p>
                    </div>
                    <Link to="/student-quizzes">
                      <Button variant="outline" className="border-[#308279] text-[#308279]">
                        View All
                      </Button>
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {quizzes.map((quiz) => (
                      <div
                        key={quiz.id}
                        className="p-5 bg-[#F3F8FA] rounded-lg hover:shadow-md transition-all border-2 border-transparent hover:border-[#308279]"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-bold text-[#0A1B45]">{quiz.title}</h3>
                              <Badge
                                variant="outline"
                                className={
                                  quiz.difficulty === "Hard"
                                    ? "border-red-500 text-red-500"
                                    : quiz.difficulty === "Medium"
                                    ? "border-[#308279] text-[#308279]"
                                    : "border-green-500 text-green-500"
                                }
                              >
                                {quiz.difficulty}
                              </Badge>
                              {quiz.bestScore && (
                                <Badge className="bg-[#308279]/10 text-[#308279] border-0">
                                  Best: {quiz.bestScore}%
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-[#476074]">
                              <span className="flex items-center gap-1">
                                <Target className="w-4 h-4" />
                                {quiz.questions} questions
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {quiz.duration} minutes
                              </span>
                              {quiz.attempts > 0 && (
                                <>
                                  <span>•</span>
                                  <span>{quiz.attempts} attempt{quiz.attempts > 1 ? 's' : ''}</span>
                                </>
                              )}
                            </div>
                          </div>
                          <Link to={`/course/${courseId}/quiz/${quiz.id}`}>
                            <Button className="bg-[#308279] hover:bg-[#308279]/90 text-white">
                              {quiz.bestScore ? "Retake" : "Start Quiz"}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="mt-6">
                <Card className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-[#0A1B45] mb-3">Student Reviews</h2>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-[#308279] text-[#308279]" />
                          ))}
                        </div>
                        <span className="text-2xl font-bold text-[#0A1B45]">{courseData.rating}</span>
                        <span className="text-[#476074]">({courseData.totalReviews} reviews)</span>
                      </div>
                    </div>
                    <Link to={`/course/${courseId}/review`}>
                      <Button className="bg-[#308279] hover:bg-[#308279]/90 text-white">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Write Review
                      </Button>
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="p-5 bg-[#F3F8FA] rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-gradient-to-br from-[#308279] to-[#0A1B45] text-white text-sm">
                                {review.studentInitials}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-bold text-[#0A1B45]">{review.student}</div>
                              <div className="text-sm text-[#476074]">{review.date}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-[#308279] text-[#308279]" />
                            ))}
                          </div>
                        </div>
                        <p className="text-[#476074] leading-relaxed mb-3">{review.comment}</p>
                        <button className="flex items-center gap-1 text-sm text-[#476074] hover:text-[#308279] transition-colors">
                          <CheckCircle className="w-4 h-4" />
                          Helpful ({review.helpful})
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <Button variant="outline" className="border-[#308279] text-[#308279]">
                      Load More Reviews
                    </Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Stats Card */}
            <Card className="p-6 bg-gradient-to-br from-[#308279] to-[#0A1B45] text-white">
              <h3 className="font-bold text-lg mb-4">Your Progress</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Trophy className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{courseData.progress}%</div>
                  <div className="text-xs text-white/80">Completed</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Award className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">
                    {quizzes.filter(q => q.bestScore).length}/{quizzes.length}
                  </div>
                  <div className="text-xs text-white/80">Quizzes Taken</div>
                </div>
              </div>
            </Card>

            {/* Main Tabs */}
            <Tabs defaultValue="curriculum" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-12">
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="materials">Materials</TabsTrigger>
              </TabsList>

              <TabsContent value="curriculum" className="mt-6">
                <Card className="overflow-hidden max-h-[calc(100vh-450px)] overflow-y-auto">
                  <Accordion type="single" collapsible defaultValue="item-1">
                    {curriculum.map((section, sectionIndex) => (
                      <AccordionItem key={sectionIndex} value={`item-${sectionIndex}`}>
                        <AccordionTrigger className="px-6 hover:bg-[#F3F8FA]">
                          <div className="text-left">
                            <div className="font-bold text-[#0A1B45]">{section.section}</div>
                            <div className="text-xs text-[#476074]">
                              {section.videos.filter(v => v.completed).length}/{section.videos.length} completed
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-1">
                            {section.videos.map((video) => (
                              <button
                                key={video.id}
                                onClick={() => setCurrentVideo(video.id)}
                                className={`w-full text-left px-6 py-3 hover:bg-[#F3F8FA] transition-colors ${
                                  currentVideo === video.id ? 'bg-[#308279]/10 border-l-4 border-[#308279]' : ''
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  {video.completed ? (
                                    <CheckCircle className="w-5 h-5 text-[#308279] flex-shrink-0 mt-0.5" />
                                  ) : (
                                    <Circle className="w-5 h-5 text-[#92B7B0] flex-shrink-0 mt-0.5" />
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-[#0A1B45] mb-1">{video.title}</div>
                                    <div className="text-xs text-[#476074]">{video.duration}</div>
                                  </div>
                                  {currentVideo === video.id && (
                                    <Badge className="bg-[#308279] text-white text-xs">Playing</Badge>
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Card>
              </TabsContent>

              <TabsContent value="materials" className="mt-6">
                <Card className="p-4 space-y-3 max-h-[calc(100vh-450px)] overflow-y-auto">
                  {cheatNotes.map((note) => (
                    <div
                      key={note.id}
                      className="flex items-center gap-3 p-4 border rounded-lg hover:border-[#308279] hover:bg-[#F3F8FA] transition-all cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#308279] to-[#0A1B45] flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Badge variant="outline" className="text-xs border-[#308279] text-[#308279] mb-1">
                          {note.category}
                        </Badge>
                        <h4 className="font-medium text-[#0A1B45] mb-1">{note.title}</h4>
                        <p className="text-xs text-[#476074]">{note.pages} pages • {note.size}</p>
                      </div>
                      <Button size="sm" variant="ghost" className="text-[#308279] hover:text-[#308279] hover:bg-[#308279]/10">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Eye Tracking Components */}
      <WebcamPreview isActive={eyeTrackingEnabled && isPlaying} />
      <FocusAlertModal isOpen={showFocusAlert} onResume={handleResumeFocus} />
    </div>
  );
}
