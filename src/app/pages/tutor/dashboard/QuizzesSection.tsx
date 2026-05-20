import { ArrowLeft, CheckCircle2, Edit, Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";

import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";

import type {
    TutorAssignedClassCard,
    TutorMeetingSession,
    TutorQuiz,
    TutorQuizDraft,
    TutorQuizQuestionDraft,
    TutorQuizQuestionType,
} from "./types";

type QuizCourseCard = TutorAssignedClassCard & {
  totalQuizzes: number;
};

type QuizzesSectionProps = {
  activeQuizCourse: string | null;
  assignedClassCards: TutorAssignedClassCard[];
  editingQuizId: number | null;
  isQuizComposerOpen: boolean;
  quizDraft: TutorQuizDraft;
  quizzesByCourse: QuizCourseCard[];
  upcomingSessions: TutorMeetingSession[];
  visibleQuizzes: TutorQuiz[];
  onBackToClasses: () => void;
  onDeleteQuiz: (quizId: number) => void;
  onEditQuiz: (quizId: number) => void;
  onOpenCourse: (courseId: string) => void;
  onOpenQuizComposer: () => void;
  onQuizDraftChange: (draft: TutorQuizDraft) => void;
  onQuizQuestionChange: (
    questionId: number,
    updater: (question: TutorQuizQuestionDraft) => TutorQuizQuestionDraft,
  ) => void;
  onQuizQuestionTypeChange: (questionId: number, nextType: TutorQuizQuestionType) => void;
  onAddQuizQuestion: () => void;
  onRemoveQuizQuestion: (questionId: number) => void;
  onAddQuizQuestionOption: (questionId: number) => void;
  onRemoveQuizQuestionOption: (questionId: number, optionId: number) => void;
  onQuizSubmit: () => void;
  onResetQuizDraft: () => void;
};

export function QuizzesSection({
  activeQuizCourse,
  assignedClassCards,
  editingQuizId,
  isQuizComposerOpen,
  quizDraft,
  quizzesByCourse,
  upcomingSessions,
  visibleQuizzes,
  onBackToClasses,
  onDeleteQuiz,
  onEditQuiz,
  onOpenCourse,
  onOpenQuizComposer,
  onQuizDraftChange,
  onQuizQuestionChange,
  onQuizQuestionTypeChange,
  onAddQuizQuestion,
  onRemoveQuizQuestion,
  onAddQuizQuestionOption,
  onRemoveQuizQuestionOption,
  onQuizSubmit,
  onResetQuizDraft,
}: QuizzesSectionProps) {
  const [quizComposerStep, setQuizComposerStep] = useState<"setup" | "questions">("setup");

  const handleContinueToQuestions = () => {
    if (!quizDraft.title.trim() || !quizDraft.description.trim()) {
      return;
    }
    setQuizComposerStep("questions");
  };

  const handleResetQuizDraft = () => {
    setQuizComposerStep("setup");
    onResetQuizDraft();
  };

  return (
    <section className="space-y-6">
      {activeQuizCourse === null ? (
        <>
          <div>
            <h2 className="text-2xl font-bold text-[#0A1B45]">Pilih Class</h2>
            <p className="max-w-3xl text-[#476074]">Masuk ke halaman quiz per class untuk create, edit, publish, atau hapus quiz.</p>
          </div>

          <div className="space-y-4">
            {quizzesByCourse.map((item) => (
              <Card
                key={item.id}
                className="border-[#D9E6EA] bg-white p-5 shadow-[0_18px_40px_rgba(10,27,69,0.06)] hover:shadow-[0_24px_48px_rgba(10,27,69,0.12)]"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex flex-row gap-6">
                      <h3 className="mt-2 text-xl font-bold text-[#0A1B45]">{item.title}</h3>
                      <Button className="w-fit bg-[#0A1B45] text-white hover:bg-[#081633] cursor-pointer" onClick={() => onOpenCourse(String(item.id))}>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Open class
                      </Button>
                    </div>
                    <p className="mt-2 text-sm text-[#476074]">{item.nextLive}</p>
                  </div>
                  <div className="flex flex-col gap-3 lg:min-w-[360px]">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-[#F7FAFB] p-4">
                        <div className="text-[11px] uppercase tracking-[0.16em] text-[#476074]">Total quizzes</div>
                        <div className="mt-1 text-2xl font-bold text-[#0A1B45]">{item.totalQuizzes}</div>
                      </div>
                      <div className="rounded-2xl bg-[#F7FAFB] p-4">
                        <div className="text-[11px] uppercase tracking-[0.16em] text-[#476074]">Batches</div>
                        <div className="mt-1 text-2xl font-bold text-[#0A1B45]">{item.batches}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <button
                type="button"
                onClick={isQuizComposerOpen ? onResetQuizDraft : onBackToClasses}
                className="mb-3 cursor-pointer inline-flex items-center gap-2 text-sm font-semibold text-[#308279]"
              >
                <ArrowLeft className="h-4 w-4" />
                {isQuizComposerOpen ? "Back to quizzes" : "Back to classes"}
              </button>
              <h2 className="text-2xl font-bold text-[#0A1B45]">
                {assignedClassCards.find((item) => String(item.id) === activeQuizCourse)?.title ?? "Quizzes"}
              </h2>
              <p className="max-w-3xl text-[#476074]">Kelola quiz class, tentukan batch assignment, status publish, dan window waktu quiz.</p>
            </div>
            {!isQuizComposerOpen ? (
              <Button className="bg-[#308279] hover:bg-[#308279]/90" onClick={onOpenQuizComposer}>
                <Plus className="mr-2 h-4 w-4" />
                Create quiz
              </Button>
            ) : null}
          </div>

          {isQuizComposerOpen ? (
            <Card className="rounded-[1.5rem] border-[#D8E5E9] bg-white p-8 shadow-[0_18px_42px_rgba(10,27,69,0.07)]">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-[#0A1B45]">
                      {editingQuizId ? "Edit Quiz" : "Create New Quiz"}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#476074]">
                      Compose quiz metadata, then add questions below. Multiple answer questions can have more than one correct option.
                    </p>
                  </div>
                  <Button variant="outline" className="border-[#D8E5E9]" onClick={handleResetQuizDraft}>
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
                    onClick={handleContinueToQuestions}
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
                      onChange={(event) => onQuizDraftChange({ ...quizDraft, title: event.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quiz-status">Status</Label>
                    <select
                      id="quiz-status"
                      value={quizDraft.status}
                      onChange={(event) => onQuizDraftChange({ ...quizDraft, status: event.target.value as "Published" | "Draft" })}
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
                      onChange={(event) => onQuizDraftChange({ ...quizDraft, description: event.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quiz-batches">Batches assigned for</Label>
                    <select
                      id="quiz-batches"
                      multiple
                      value={quizDraft.assignedBatches}
                      onChange={(event) =>
                        onQuizDraftChange({
                          ...quizDraft,
                          assignedBatches: Array.from(event.target.selectedOptions).map((option) => option.value),
                        })
                      }
                      className="min-h-24 w-full rounded-md border border-[#D8E5E9] bg-white p-2"
                    >
                      {upcomingSessions
                        .filter((session) => String(session.classId) === activeQuizCourse)
                        .map((session) => (
                          <option key={session.batchName} value={session.batchName}>
                            {session.batchName}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quiz-opened-at">Opened time</Label>
                    <Input
                      id="quiz-opened-at"
                      type="datetime-local"
                      value={quizDraft.opensAt}
                      onChange={(event) => onQuizDraftChange({ ...quizDraft, opensAt: event.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quiz-closed-at">Closed time</Label>
                    <Input
                      id="quiz-closed-at"
                      type="datetime-local"
                      value={quizDraft.closesAt}
                      onChange={(event) => onQuizDraftChange({ ...quizDraft, closesAt: event.target.value })}
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
                    <Button variant="outline" className="border-[#D8E5E9]" onClick={onAddQuizQuestion}>
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
                              {question.type === "multiple_answer" ? "Multiple Answer" : "Fill Answer"}
                            </h5>
                          </div>
                          <Button
                            variant="ghost"
                            className="text-[#B42318] hover:bg-[#FDECEC] hover:text-[#B42318]"
                            onClick={() => onRemoveQuizQuestion(question.id)}
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
                                onQuizQuestionChange(question.id, (current) => ({
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
                                onQuizQuestionTypeChange(
                                  question.id,
                                  event.target.value as TutorQuizQuestionType,
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
                                onQuizQuestionChange(question.id, (current) => ({
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
                                onClick={() => onAddQuizQuestionOption(question.id)}
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
                                      onQuizQuestionChange(question.id, (current) => ({
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
                                        onQuizQuestionChange(question.id, (current) => ({
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
                                    onClick={() => onRemoveQuizQuestionOption(question.id, option.id)}
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
                                onQuizQuestionChange(question.id, (current) => ({
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
                    <Button className="bg-[#308279] hover:bg-[#308279]/90" onClick={handleContinueToQuestions}>
                      Continue to Questions
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" className="border-[#D8E5E9]" onClick={() => setQuizComposerStep("setup")}>
                        Back to Setup
                      </Button>
                      <Button className="bg-[#308279] hover:bg-[#308279]/90" onClick={onQuizSubmit}>
                        <Save className="mr-2 h-4 w-4" />
                        {editingQuizId ? "Save Quiz" : "Create Quiz"}
                      </Button>
                    </>
                  )}
                  <Button variant="outline" className="border-[#D8E5E9]" onClick={handleResetQuizDraft}>
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {visibleQuizzes.map((quiz) => (
                <Card
                  key={quiz.id}
                  className="border-[#D9E6EA] bg-white p-5 shadow-[0_18px_40px_rgba(10,27,69,0.06)]"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className="border-0 bg-[#FCEFC7] text-[#7A5A00]">Quiz</Badge>
                        <Badge className={quiz.status === "Published" ? "border-0 bg-[#308279]/10 text-[#308279]" : "border-0 bg-[#F3F8FA] text-[#476074]"}>
                          {quiz.status}
                        </Badge>
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-[#0A1B45]">{quiz.title}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#476074]">{quiz.description}</p>
                      <div className="mt-3 flex flex-wrap gap-3 text-sm text-[#476074]">
                        <span>{quiz.questionCount} questions</span>
                        <span>Batches: {quiz.assignedBatches.join(", ")}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-3 text-sm text-[#476074]">
                        <span>Opens: {new Date(quiz.opensAt).toLocaleString("id-ID")}</span>
                        <span>Closes: {new Date(quiz.closesAt).toLocaleString("id-ID")}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                      <Button variant="outline" className="border-[#308279] text-[#308279]" onClick={() => onEditQuiz(quiz.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit quiz
                      </Button>
                      <Button variant="outline" className="border-[#D8E5E9]" onClick={() => onDeleteQuiz(quiz.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
              {visibleQuizzes.length === 0 ? (
                <Card className="border-dashed border-[#D8E5E9] bg-[#FCFEFE] p-8 text-center text-[#476074]">
                  Belum ada quiz untuk class ini.
                </Card>
              ) : null}
            </div>
          )}
        </>
      )}
    </section>
  );
}
