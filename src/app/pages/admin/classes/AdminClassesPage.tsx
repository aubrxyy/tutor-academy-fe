import { Link } from "react-router";
import { BookOpen, Plus, Trash2 } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import type { ManagedClass } from "../shared/types";

type AdminClassesPageProps = {
  classes: ManagedClass[];
  isLoading: boolean;
  errorMessage?: string;
  onCreateClass: () => void;
  onDeleteClass: (courseId: string) => void;
  isDeletingClass: boolean;
  getClassStatusBadgeClassName: (status: ManagedClass["status"]) => string;
  getCourseStatusLabel: (status: ManagedClass["status"]) => string;
};

export default function AdminClassesPage({
  classes,
  isLoading,
  errorMessage,
  onCreateClass,
  onDeleteClass,
  isDeletingClass,
  getClassStatusBadgeClassName,
  getCourseStatusLabel,
}: AdminClassesPageProps) {
  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#0A1B45]">Classes Management</h2>
          <p className="mt-2 text-[#476074]">
            Admin creates classes, assigns tutors, and uploads lesson videos
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-[#308279] hover:bg-[#308279]/90" onClick={onCreateClass}>
            <Plus className="mr-2 h-4 w-4" />
            New Class
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading && (
          <Card className="border-[#D8E5E9] bg-white p-6 text-[#476074]">
            Loading backend classes...
          </Card>
        )}
        {!isLoading && errorMessage && (
          <Card className="border-[#F2B8B5] bg-[#FDECEC] p-6 text-[#B42318]">
            Unable to load backend classes: {errorMessage}
          </Card>
        )}
        {!isLoading && !errorMessage && classes.length === 0 && (
          <Card className="border-[#D8E5E9] bg-white p-6 text-[#476074]">
            No classes found in the backend yet.
          </Card>
        )}
        {classes.map((item) => (
          <Card
            key={item.id}
            className="relative overflow-hidden border-2 transition-all hover:border-[#308279] hover:shadow-lg"
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 w-[92%] bg-[linear-gradient(to_right,#0A1B45_0%,rgba(10,27,69,0.92)_28%,rgba(48,130,121,0.72)_58%,rgba(48,130,121,0.28)_78%,transparent_100%)]" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-[70%] bg-[radial-gradient(circle_at_24%_35%,rgba(255,255,255,0.34),transparent_28%)]" />
            <div className="flex flex-col gap-5 p-5 xl:flex-row xl:items-center xl:justify-between">
              <div className="relative min-w-0 flex-1 rounded-xl px-4 py-3 text-white xl:max-w-md">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge className={getClassStatusBadgeClassName(item.status)}>
                    {getCourseStatusLabel(item.status)}
                  </Badge>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
                    Tutor: {item.tutor}
                  </span>
                </div>
                <h3 className="text-lg font-bold leading-snug text-white drop-shadow-sm">{item.title}</h3>
              </div>
              <div className="relative grid grid-cols-3 gap-3 sm:grid-cols-6 xl:w-[560px]">
                <ClassMetric label="Students" value={item.students} />
                <ClassMetric label="Videos" value={item.videos} />
                <ClassMetric label="Sessions" value={item.sessions} />
                <ClassMetric label="Materials" value={item.docs} />
                <ClassMetric label="Quizzes" value={item.quizzes} />
                <div className="flex items-center justify-end gap-2 sm:col-span-1">
                  <Button
                    variant="ghost"
                    className="text-[#B42318] hover:bg-[#FDECEC] hover:text-[#B42318]"
                    disabled={isDeletingClass}
                    onClick={() => onDeleteClass(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="relative flex flex-col gap-2 sm:flex-row xl:w-[260px]">
                <Link to={`/admin/classes/${item.id}/edit`} className="flex-1">
                  <Button className="w-full bg-[#0A1B45] hover:bg-[#0A1B45]/90">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </Link>
                <Link to={`/admin/classes/${item.id}/edit?tab=quizzes`} className="flex-1">
                  <Button variant="outline" className="w-full border-[#308279] text-[#308279]">
                    Quizzes
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ClassMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-[#F3F8FA] p-3 text-center">
      <div className="text-lg font-bold text-[#0A1B45]">{value}</div>
      <div className="text-xs text-[#476074]">{label}</div>
    </div>
  );
}
