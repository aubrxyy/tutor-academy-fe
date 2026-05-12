import { Link } from "react-router";
import { BookOpen, Plus } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import type { ManagedClass } from "../shared/types";

type AdminClassesPageProps = {
  classes: ManagedClass[];
  onCreateClass: () => void;
  getClassStatusBadgeClassName: (status: ManagedClass["status"]) => string;
  getCourseStatusLabel: (status: ManagedClass["status"]) => string;
};

export default function AdminClassesPage({
  classes,
  onCreateClass,
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

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {classes.map((item) => (
          <Card
            key={item.id}
            className="flex h-full flex-col overflow-hidden border-2 transition-all hover:border-[#308279] hover:shadow-lg"
          >
            <div className="bg-gradient-to-br from-[#0A1B45] to-[#308279] p-6 text-white">
              <div className="mb-4 flex items-start justify-between gap-3">
                <Badge className={getClassStatusBadgeClassName(item.status)}>
                  {getCourseStatusLabel(item.status)}
                </Badge>
                <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white/75">
                  class
                </div>
              </div>
              <div className="min-h-[88px]">
                <h3 className="text-lg font-bold leading-snug">{item.title}</h3>
                <p className="mt-3 text-sm text-white/80">Tutor: {item.tutor}</p>
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-between p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[#F3F8FA] p-3">
                    <div className="text-xs uppercase tracking-[0.14em] text-[#476074]">Students</div>
                    <div className="mt-2 text-2xl font-bold text-[#0A1B45]">{item.students}</div>
                  </div>
                  <div className="rounded-xl bg-[#F3F8FA] p-3">
                    <div className="text-xs uppercase tracking-[0.14em] text-[#476074]">Quizzes</div>
                    <div className="mt-2 text-2xl font-bold text-[#308279]">{item.quizzes}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-lg bg-[#F3F8FA] p-3">
                    <div className="text-lg font-bold text-[#0A1B45]">{item.videos}</div>
                    <div className="text-xs text-[#476074]">Videos</div>
                  </div>
                  <div className="rounded-lg bg-[#F3F8FA] p-3">
                    <div className="text-lg font-bold text-[#308279]">{item.sessions}</div>
                    <div className="text-xs text-[#476074]">Sessions</div>
                  </div>
                  <div className="rounded-lg bg-[#F3F8FA] p-3">
                    <div className="text-lg font-bold text-[#0A1B45]">{item.docs}</div>
                    <div className="text-xs text-[#476074]">Docs</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                <Link to={`/admin/classes/${item.id}/edit`} className="flex-1">
                  <Button className="w-full bg-[#0A1B45] hover:bg-[#0A1B45]/90">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Edit Class
                  </Button>
                </Link>
                <Link to={`/admin/classes/${item.id}/edit?tab=videos`} className="flex-1">
                  <Button variant="outline" className="w-full border-[#308279] text-[#308279]">
                    Add materials
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
