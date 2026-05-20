import { Link, NavLink, Outlet, useLocation, useParams, useSearchParams } from "react-router";
import { ChevronLeft, LayoutGrid, PlayCircle, Target, Video } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import ClassroomCurriculumRail from "../components/classroom/ClassroomCurriculumRail";
import { buildClassroomItemHref, getMockClassroomData } from "../data/classroomContent";

export default function ClassroomLayout() {
  const { courseId } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const batchId = searchParams.get("batch") ?? `${courseId ?? "course"}-batch-a`;
  const { course, selectedBatch, items } = getMockClassroomData(courseId, batchId);
  const isQuizAttemptPage = /^\/class\/[^/]+\/quiz\/[^/]+$/.test(location.pathname);
  const sectionItem =
    items.find((item) => item.kind === "video") ??
    items.find((item) => item.kind === "material");
  const quizItem = items.find((item) => item.kind === "quiz");
  const meetingItem = items.find((item) => item.kind === "meeting");
  const classroomTabs = [
    {
      key: "overview",
      label: "Overview",
      icon: LayoutGrid,
      to: `/classroom/${courseId}?batch=${batchId}`,
      isActive:
        location.pathname === `/classroom/${courseId}` ||
        location.pathname === `/classroom/${courseId}/`,
    },
    sectionItem
      ? {
          key: "sections",
          label: "Materials & Videos",
          icon: PlayCircle,
          to: buildClassroomItemHref(courseId ?? "course", sectionItem, batchId),
          isActive:
            location.pathname.includes("/videos/") || location.pathname.includes("/materials/"),
        }
      : null,
    quizItem
      ? {
          key: "quizzes",
          label: "Quizzes",
          icon: Target,
          to: buildClassroomItemHref(courseId ?? "course", quizItem, batchId),
          isActive: location.pathname.includes("/quizzes/"),
        }
      : null,
    meetingItem
      ? {
          key: "meetings",
          label: "Live Meetings",
          icon: Video,
          to: buildClassroomItemHref(courseId ?? "course", meetingItem, batchId),
          isActive: location.pathname.includes("/meetings/"),
        }
      : null,
  ].filter(Boolean);

  return (
    <div className="flex min-h-screen flex-col bg-[#F3F8FA] lg:h-screen lg:overflow-hidden">
      <header className="z-30 shrink-0 border-b border-[#D8E5E9] bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-[1600px] px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <Link to="/student-dashboard">
                <Button variant="ghost" size="sm" className="hover:cursor-pointer">
                  <ChevronLeft className="mr-1 h-4 w-4" />

                </Button>
              </Link>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-bold text-[#0A1B45]">{course.title}</h1>
                  <Badge className="border-0 bg-[#0A1B45]/8 text-[#0A1B45]">
                    {selectedBatch.batchCode}
                  </Badge>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-[#476074]">
                  <span>{selectedBatch.periodLabel}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="text-right">
                <div className="font-bold text-[#308279]">
                  {course.completedItems}/{course.totalItems} item • {course.progress}%
                </div>
              </div>
              <div className="w-36">
                <Progress value={course.progress} className="h-2" />
              </div>
            </div>
          </div>

          {isQuizAttemptPage ? null : (
            <div className="mt-4 flex gap-2 overflow-x-auto border-t border-[#E5EEF1] pt-4">
              {classroomTabs.map((tab) => {
                if (!tab) return null;
                const TabIcon = tab.icon;

                return (
                  <NavLink
                    key={tab.key}
                    to={tab.to}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                      tab.isActive
                        ? "border-[#308279] bg-[#308279] text-white shadow-sm"
                        : "border-[#D8E5E9] bg-[#F9FCFD] text-[#476074] hover:border-[#A8C6C0] hover:bg-white hover:text-[#0A1B45]"
                    }`}
                  >
                    <TabIcon className="h-4 w-4" />
                    {tab.label}
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1600px] flex-1 px-4 py-4 sm:px-6 sm:py-6 lg:min-h-0">
        <div
          className={`w-full gap-6 lg:min-h-0 ${
            isQuizAttemptPage ? "block" : "grid xl:grid-cols-[330px_minmax(0,1fr)]"
          }`}
        >
          {isQuizAttemptPage ? null : (
            <div className="mb-4 max-h-[360px] overflow-y-auto pr-2 xl:mb-0 xl:min-h-0 xl:max-h-none">
              <ClassroomCurriculumRail />
            </div>
          )}
          <main className="min-w-0 lg:min-h-0 lg:overflow-y-auto">
          <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
