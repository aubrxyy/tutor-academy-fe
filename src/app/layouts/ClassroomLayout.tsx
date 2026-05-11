import { Link, Outlet, useLocation, useParams, useSearchParams } from "react-router";
import { ChevronLeft } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import ClassroomCurriculumRail from "../components/classroom/ClassroomCurriculumRail";
import { getMockClassroomData } from "../data/classroomContent";

export default function ClassroomLayout() {
  const { courseId } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const batchId = searchParams.get("batch") ?? `${courseId ?? "course"}-batch-a`;
  const { course, selectedBatch } = getMockClassroomData(courseId, batchId);
  const isQuizAttemptPage = /^\/class\/[^/]+\/quiz\/[^/]+$/.test(location.pathname);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#F3F8FA]">
      <header className="z-30 shrink-0 border-b border-[#D8E5E9] bg-white">
        <div className="mx-auto max-w-[1600px] px-6 py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <Link to="/student-dashboard">
                <Button variant="ghost" size="sm" className="hover:cursor-pointer">
                  <ChevronLeft className="mr-1 h-4 w-4" />

                </Button>
              </Link>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-bold text-[#0A1B45]">{course.title}</h1>
                  <Badge className="border-0 bg-[#0A1B45]/8 text-[#0A1B45]">
                    {selectedBatch.batchCode}
                  </Badge>
                  <Badge
                    className={
                      selectedBatch.admissionStatus === "Approved"
                        ? "border-0 bg-[#308279]/10 text-[#308279]"
                        : selectedBatch.admissionStatus === "Pending Review"
                          ? "border-0 bg-[#FCEFC7] text-[#7A5A00]"
                          : "border-0 bg-[#E8EEF9] text-[#21416B]"
                    }
                  >
                    {selectedBatch.admissionStatus}
                  </Badge>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-[#476074]">
                  <span>{selectedBatch.name}</span>
                  <span>•</span>
                  <span>{selectedBatch.periodLabel}</span>
                  <span>•</span>
                  <span>Tutor: {course.instructor}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-[#476074]">Progress cohort</div>
                <div className="font-bold text-[#308279]">
                  {course.completedItems}/{course.totalItems} item • {course.progress}%
                </div>
              </div>
              <div className="w-36">
                <Progress value={course.progress} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 px-6 py-6">
        <div
          className={`min-h-0 w-full gap-6 ${
            isQuizAttemptPage ? "block" : "grid xl:grid-cols-[330px_minmax(0,1fr)]"
          }`}
        >
          {isQuizAttemptPage ? null : (
            <div className="min-h-0 overflow-y-auto pr-2">
              <ClassroomCurriculumRail />
            </div>
          )}
          <main className="min-w-0 min-h-0 overflow-y-auto">
          <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
