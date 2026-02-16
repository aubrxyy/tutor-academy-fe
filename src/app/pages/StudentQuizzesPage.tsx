import { Link } from "react-router";
import { ClipboardList, Clock, CheckCircle, XCircle, ArrowLeft, Play, Trophy, TrendingUp } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export default function StudentQuizzesPage() {
  const availableQuizzes = [
    {
      id: 1,
      courseName: "Data Structures & Algorithms",
      quizTitle: "Array & Linked List Quiz",
      questions: 15,
      duration: 30,
      difficulty: "Medium",
      attempts: 2,
      maxAttempts: 3,
    },
    {
      id: 2,
      courseName: "Database Management & SQL",
      quizTitle: "SQL Joins & Subqueries",
      questions: 20,
      duration: 45,
      difficulty: "Hard",
      attempts: 0,
      maxAttempts: 3,
    },
    {
      id: 3,
      courseName: "Human Computer Interaction",
      quizTitle: "Usability Testing Methods",
      questions: 12,
      duration: 25,
      difficulty: "Easy",
      attempts: 1,
      maxAttempts: 3,
    },
  ];

  const completedQuizzes = [
    {
      id: 4,
      courseName: "Data Structures & Algorithms",
      quizTitle: "Two Pointer Technique Quiz",
      score: 85,
      maxScore: 100,
      correctAnswers: 13,
      totalQuestions: 15,
      completedDate: "10 Februari 2026",
      duration: 28,
      passed: true,
    },
    {
      id: 5,
      courseName: "Database Management & SQL",
      quizTitle: "Database Normalization",
      score: 92,
      maxScore: 100,
      correctAnswers: 18,
      totalQuestions: 20,
      completedDate: "5 Februari 2026",
      duration: 40,
      passed: true,
    },
    {
      id: 6,
      courseName: "Human Computer Interaction",
      quizTitle: "HCI Principles",
      score: 70,
      maxScore: 100,
      correctAnswers: 8,
      totalQuestions: 12,
      completedDate: "1 Februari 2026",
      duration: 22,
      passed: true,
    },
  ];

  const quizStats = {
    totalCompleted: completedQuizzes.length,
    averageScore: Math.round(
      completedQuizzes.reduce((acc, q) => acc + q.score, 0) / completedQuizzes.length
    ),
    totalAvailable: availableQuizzes.length,
    passRate: 100,
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-[#92B7B0]/20 text-[#308279] border-[#308279]/20";
      case "Medium":
        return "bg-[#308279]/20 text-[#0A1B45] border-[#308279]/30";
      case "Hard":
        return "bg-[#0A1B45]/20 text-[#0A1B45] border-[#0A1B45]/30";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F8FA]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#0A1B45] to-[#308279] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/student-dashboard">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Kembali
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <ClipboardList className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Quiz & Assessment</h1>
              <p className="text-white/80 mt-2">
                Test pengetahuan kamu dan track progress belajar
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-white" />
                <div>
                  <div className="text-2xl font-bold">{quizStats.totalCompleted}</div>
                  <div className="text-xs text-white/80">Selesai</div>
                </div>
              </div>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-white" />
                <div>
                  <div className="text-2xl font-bold">{quizStats.averageScore}%</div>
                  <div className="text-xs text-white/80">Rata-rata</div>
                </div>
              </div>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
              <div className="flex items-center gap-3">
                <ClipboardList className="w-8 h-8 text-white" />
                <div>
                  <div className="text-2xl font-bold">{quizStats.totalAvailable}</div>
                  <div className="text-xs text-white/80">Tersedia</div>
                </div>
              </div>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-white" />
                <div>
                  <div className="text-2xl font-bold">{quizStats.passRate}%</div>
                  <div className="text-xs text-white/80">Pass Rate</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="available" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="available">Quiz Tersedia</TabsTrigger>
            <TabsTrigger value="completed">Riwayat</TabsTrigger>
          </TabsList>

          {/* Available Quizzes */}
          <TabsContent value="available" className="space-y-4">
            {availableQuizzes.map((quiz) => (
              <Card
                key={quiz.id}
                className="overflow-hidden hover:shadow-lg transition-all border-2 hover:border-[#308279]"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#308279] to-[#0A1B45] flex items-center justify-center">
                          <ClipboardList className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-[#0A1B45]">{quiz.quizTitle}</h3>
                          <p className="text-sm text-[#476074]">{quiz.courseName}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mt-4">
                        <Badge variant="outline" className={getDifficultyColor(quiz.difficulty)}>
                          {quiz.difficulty}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-[#476074]">
                          <ClipboardList className="w-4 h-4" />
                          <span>{quiz.questions} pertanyaan</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-[#476074]">
                          <Clock className="w-4 h-4" />
                          <span>{quiz.duration} menit</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-[#476074]">
                          <Play className="w-4 h-4" />
                          <span>
                            {quiz.attempts}/{quiz.maxAttempts} percobaan
                          </span>
                        </div>
                      </div>

                      {quiz.attempts > 0 && (
                        <div className="mt-3 p-3 bg-[#308279]/5 rounded-lg border border-[#308279]/20">
                          <p className="text-sm text-[#476074]">
                            Kamu masih punya <span className="font-bold text-[#308279]">
                              {quiz.maxAttempts - quiz.attempts} percobaan
                            </span> lagi untuk quiz ini
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex md:flex-col gap-2">
                      <Button className="bg-[#308279] hover:bg-[#308279]/90 w-full md:w-auto">
                        <Play className="w-4 h-4 mr-2" />
                        Mulai Quiz
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {availableQuizzes.length === 0 && (
              <Card className="p-12 text-center">
                <ClipboardList className="w-16 h-16 text-[#92B7B0] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#0A1B45] mb-2">
                  Tidak Ada Quiz Tersedia
                </h3>
                <p className="text-[#476074]">
                  Semua quiz sudah diselesaikan atau belum ada quiz baru
                </p>
              </Card>
            )}
          </TabsContent>

          {/* Completed Quizzes */}
          <TabsContent value="completed" className="space-y-4">
            {completedQuizzes.map((quiz) => (
              <Card
                key={quiz.id}
                className="overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            quiz.passed
                              ? "bg-gradient-to-br from-[#308279] to-[#92B7B0]"
                              : "bg-gradient-to-br from-[#476074] to-[#92B7B0]"
                          }`}
                        >
                          {quiz.passed ? (
                            <CheckCircle className="w-6 h-6 text-white" />
                          ) : (
                            <XCircle className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-[#0A1B45]">{quiz.quizTitle}</h3>
                          <p className="text-sm text-[#476074]">{quiz.courseName}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[#476074]">Nilai</span>
                          <span className="text-2xl font-bold text-[#308279]">
                            {quiz.score}/{quiz.maxScore}
                          </span>
                        </div>
                        <Progress value={quiz.score} className="h-2" />
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#476074]">
                            Benar: {quiz.correctAnswers}/{quiz.totalQuestions}
                          </span>
                          <span className="text-[#476074]">
                            Waktu: {quiz.duration} menit
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-[#476074]">
                          <Clock className="w-3 h-3" />
                          <span>Diselesaikan pada {quiz.completedDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex md:flex-col gap-2">
                      <Button
                        variant="outline"
                        className="border-[#308279] text-[#308279] hover:bg-[#308279]/5"
                      >
                        Lihat Detail
                      </Button>
                      {quiz.passed && (
                        <Badge className="bg-[#308279] text-white border-0 justify-center">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Lulus
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {completedQuizzes.length === 0 && (
              <Card className="p-12 text-center">
                <ClipboardList className="w-16 h-16 text-[#92B7B0] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#0A1B45] mb-2">
                  Belum Ada Quiz yang Diselesaikan
                </h3>
                <p className="text-[#476074] mb-6">
                  Mulai quiz untuk melihat riwayat dan progress kamu
                </p>
                <Link to="/student-dashboard">
                  <Button className="bg-[#308279] hover:bg-[#308279]/90">
                    Kembali ke Dashboard
                  </Button>
                </Link>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
