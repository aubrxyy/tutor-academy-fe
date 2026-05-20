import { AlertCircle, ArrowLeft, CheckCircle, Clock, Target, Trophy, XCircle } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import Footer from "../../../components/layout/Footer";
import Navbar from "../../../components/navigation/Navbar";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Progress } from "../../../components/ui/progress";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";

export default function CourseQuizPage() {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds

  const isClassroomAttempt = location.pathname.startsWith("/class/");
  const backHref = isClassroomAttempt ? `/classroom/${courseId}` : `/class/${courseId}`;

  const quiz = {
    id: quizId,
    title: "Array & Linked List Quiz",
    course: "Data Structures & Algorithms",
    duration: 30,
    questions: [
      {
        id: 1,
        question: "What is the time complexity of accessing an element in an array by index?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        correctAnswer: "O(1)",
        explanation:
          "Array elements are stored in contiguous memory locations, so accessing by index takes constant time O(1).",
      },
      {
        id: 2,
        question: "Which data structure is better for frequent insertions and deletions at the beginning?",
        options: ["Array", "Linked List", "Both are equally efficient", "Neither is suitable"],
        correctAnswer: "Linked List",
        explanation:
          "Linked lists allow O(1) insertion/deletion at the beginning, while arrays require O(n) time to shift elements.",
      },
      {
        id: 3,
        question: "What is the space complexity of a singly linked list with n elements?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctAnswer: "O(n)",
        explanation:
          "Each node requires memory for data and a pointer, resulting in O(n) space for n nodes.",
      },
      {
        id: 4,
        question: "Which operation is more efficient in a linked list compared to an array?",
        options: ["Random access", "Sequential access", "Insertion at beginning", "Binary search"],
        correctAnswer: "Insertion at beginning",
        explanation:
          "Linked lists can insert at the beginning in O(1) time, while arrays need O(n) to shift elements.",
      },
      {
        id: 5,
        question: "What is the main disadvantage of arrays compared to linked lists?",
        options: [
          "Slower random access",
          "Fixed size (in static arrays)",
          "Higher memory usage",
          "Complex implementation",
        ],
        correctAnswer: "Fixed size (in static arrays)",
        explanation:
          "Static arrays have fixed size determined at compile time, while linked lists can grow dynamically.",
      },
    ],
    passingScore: 70,
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAnswerSelect = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setQuizCompleted(true);
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / quiz.questions.length) * 100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const renderWithShell = (content: ReactNode) => (
    <div className="min-h-screen bg-[#F3F8FA]">
      {isClassroomAttempt ? null : <Navbar />}
      {content}
      {isClassroomAttempt ? null : <Footer />}
    </div>
  );

  const score = quizCompleted ? calculateScore() : 0;
  const passed = score >= quiz.passingScore;

  if (!quizStarted) {
    return renderWithShell(
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to={backHref}>
          <Button variant="ghost" className="text-[#476074] hover:bg-[#308279]/10 mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Class
          </Button>
        </Link>

        <Card className="p-8 md:p-12">
          <div className="text-center mb-8">
            <Badge className="bg-[#308279]/10 text-[#308279] border-0 mb-4">{quiz.course}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-[#0A1B45] mb-3">{quiz.title}</h1>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-[#F3F8FA] border-2 border-[#308279]/20 text-center">
              <Target className="w-8 h-8 text-[#308279] mx-auto mb-3" />
              <div className="text-2xl font-bold text-[#0A1B45] mb-1">{quiz.questions.length}</div>
              <div className="text-sm text-[#476074]">Questions</div>
            </Card>
            <Card className="p-6 bg-[#F3F8FA] border-2 border-[#308279]/20 text-center">
              <Clock className="w-8 h-8 text-[#308279] mx-auto mb-3" />
              <div className="text-2xl font-bold text-[#0A1B45] mb-1">{quiz.duration} min</div>
              <div className="text-sm text-[#476074]">Time Limit</div>
            </Card>
            <Card className="p-6 bg-[#F3F8FA] border-2 border-[#308279]/20 text-center">
              <Trophy className="w-8 h-8 text-[#308279] mx-auto mb-3" />
              <div className="text-2xl font-bold text-[#0A1B45] mb-1">{quiz.passingScore}%</div>
              <div className="text-sm text-[#476074]">To Pass</div>
            </Card>
          </div>

          <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-lg mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-[#0A1B45] mb-3">Quiz Instructions</h3>
                <ul className="space-y-2 text-sm text-[#476074]">
                  <li>• You have {quiz.duration} minutes to complete all questions</li>
                  <li>• Each question has only one correct answer</li>
                  <li>• You can navigate between questions using Next/Previous buttons</li>
                  <li>• You must score at least {quiz.passingScore}% to pass</li>
                  <li>• Your progress is saved automatically</li>
                  <li>• Click "Submit Quiz" when you&apos;re done</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={handleStartQuiz}
              className="bg-[#308279] hover:bg-[#308279]/90 text-white h-14 px-12 text-lg"
            >
              Start Quiz
            </Button>
          </div>
        </Card>
      </div>,
    );
  }

  if (quizCompleted) {
    return renderWithShell(
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="p-8 md:p-12">
          <div className="text-center mb-8">
            <div
              className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
                passed ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {passed ? (
                <Trophy className="w-12 h-12 text-green-500" />
              ) : (
                <XCircle className="w-12 h-12 text-red-500" />
              )}
            </div>
            <h1 className="text-4xl font-bold text-[#0A1B45] mb-3">
              {passed ? "Congratulations! 🎉" : "Keep Trying!"}
            </h1>
            <p className="text-xl text-[#476074]">
              {passed ? "You've successfully passed the quiz!" : "You didn't pass this time, but don't give up!"}
            </p>
          </div>

          <Card
            className={`p-8 mb-8 ${
              passed
                ? "bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200"
                : "bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200"
            }`}
          >
            <div className="text-center">
              <div className="text-6xl font-bold mb-2" style={{ color: passed ? "#10b981" : "#ef4444" }}>
                {score}%
              </div>
              <div className="text-lg text-[#476074] mb-4">Your Score</div>
              <Progress value={score} className="h-3 mb-4" />
              <div className="text-sm text-[#476074]">
                You answered {Object.keys(answers).length} out of {quiz.questions.length} questions
              </div>
            </div>
          </Card>

          <div className="space-y-4 mb-8">
            <h2 className="text-2xl font-bold text-[#0A1B45] mb-4">Review Your Answers</h2>
            {quiz.questions.map((q, idx) => {
              const userAnswer = answers[idx];
              const isCorrect = userAnswer === q.correctAnswer;

              return (
                <Card
                  key={q.id}
                  className={`p-6 border-2 ${
                    isCorrect ? "border-green-200 bg-green-50/50" : "border-red-200 bg-red-50/50"
                  }`}
                >
                  <div className="flex items-start gap-3 mb-4">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-[#0A1B45] mb-3">
                        Question {idx + 1}: {q.question}
                      </h3>
                      <div className="space-y-2 mb-4">
                        <div
                          className={`p-3 rounded-lg ${
                            userAnswer === q.correctAnswer
                              ? "bg-green-100 border-2 border-green-300"
                              : userAnswer
                                ? "bg-red-100 border-2 border-red-300"
                                : "bg-gray-100"
                          }`}
                        >
                          <div className="font-medium text-sm text-[#476074] mb-1">Your Answer:</div>
                          <div className="text-[#0A1B45]">{userAnswer || "Not answered"}</div>
                        </div>
                        {!isCorrect && (
                          <div className="p-3 rounded-lg bg-green-100 border-2 border-green-300">
                            <div className="font-medium text-sm text-[#476074] mb-1">Correct Answer:</div>
                            <div className="text-[#0A1B45]">{q.correctAnswer}</div>
                          </div>
                        )}
                      </div>
                      <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                        <div className="font-medium text-sm text-[#0A1B45] mb-1">Explanation:</div>
                        <div className="text-sm text-[#476074]">{q.explanation}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {!passed && (
              <Button
                onClick={() => {
                  setQuizStarted(false);
                  setQuizCompleted(false);
                  setCurrentQuestion(0);
                  setAnswers({});
                  setTimeRemaining(quiz.duration * 60);
                }}
                className="flex-1 bg-[#308279] hover:bg-[#308279]/90 text-white h-12"
              >
                Retake Quiz
              </Button>
            )}
            <Button
              onClick={() => navigate(backHref)}
              variant="outline"
              className="flex-1 border-[#308279] text-[#308279] hover:bg-[#308279]/10 h-12"
            >
              Back to Class
            </Button>
          </div>
        </Card>
      </div>,
    );
  }

  const currentQ = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return renderWithShell(
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className={`p-6 mb-6 sticky z-10 bg-white shadow-lg ${isClassroomAttempt ? "top-6" : "top-20"}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="text-sm text-[#476074] mb-2">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                timeRemaining < 300 ? "bg-red-100 text-red-600" : "bg-[#308279]/10 text-[#308279]"
              }`}
            >
              <Clock className="w-5 h-5" />
              <span className="font-bold">{formatTime(timeRemaining)}</span>
            </div>
            <Badge className="bg-[#308279]/10 text-[#308279] border-0">
              {Object.keys(answers).length} / {quiz.questions.length} answered
            </Badge>
          </div>
        </div>
      </Card>

      <Card className="p-8 md:p-12 mb-6">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A1B45] mb-6">{currentQ.question}</h2>

          <RadioGroup
            value={answers[currentQuestion] || ""}
            onValueChange={handleAnswerSelect}
            className="space-y-4"
          >
            {currentQ.options.map((option, idx) => (
              <div
                key={idx}
                className={`flex items-start p-5 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  answers[currentQuestion] === option
                    ? "border-[#308279] bg-[#308279]/5"
                    : "border-[#92B7B0]/30 hover:border-[#308279]/50"
                }`}
              >
                <RadioGroupItem value={option} id={`option-${idx}`} className="mt-0.5" />
                <Label htmlFor={`option-${idx}`} className="ml-4 flex-1 cursor-pointer text-[#0A1B45] text-lg">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0}
          variant="outline"
          className="flex-1 border-[#308279] text-[#308279] hover:bg-[#308279]/10 h-12 disabled:opacity-50"
        >
          Previous
        </Button>

        {currentQuestion === quiz.questions.length - 1 ? (
          <Button onClick={handleSubmitQuiz} className="flex-1 bg-green-500 hover:bg-green-600 text-white h-12">
            Submit Quiz
          </Button>
        ) : (
          <Button onClick={handleNextQuestion} className="flex-1 bg-[#308279] hover:bg-[#308279]/90 text-white h-12">
            Next
          </Button>
        )}
      </div>

      <Card className="p-6 mt-6">
        <h3 className="font-semibold text-[#0A1B45] mb-4">Question Navigator</h3>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {quiz.questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentQuestion(idx)}
              className={`w-full aspect-square rounded-lg font-semibold transition-all ${
                idx === currentQuestion
                  ? "bg-[#308279] text-white shadow-lg"
                  : answers[idx]
                    ? "bg-green-100 text-green-700 border-2 border-green-300"
                    : "bg-gray-100 text-[#476074] border-2 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </Card>
    </div>,
  );
}
