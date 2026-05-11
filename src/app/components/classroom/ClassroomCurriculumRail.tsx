import { NavLink, useLocation, useParams, useSearchParams } from "react-router";
import {
  Calendar,
  CheckCircle,
  Circle,
  FileText,
  PlayCircle,
  Target,
  Video,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import {
  buildClassroomItemHref,
  getMockClassroomData,
  type ClassroomContentItem,
  type ClassroomContentKind,
} from "../../data/classroomContent";

function getKindBadge(kind: ClassroomContentKind) {
  switch (kind) {
    case "video":
      return {
        label: "Video",
        className: "border-0 bg-[#0A1B45]/8 text-[#0A1B45]",
        icon: PlayCircle,
      };
    case "material":
      return {
        label: "Material",
        className: "border-0 bg-[#308279]/10 text-[#308279]",
        icon: FileText,
      };
    case "quiz":
      return {
        label: "Quiz",
        className: "border-0 bg-[#FCEFC7] text-[#7A5A00]",
        icon: Target,
      };
    case "meeting":
      return {
        label: "Meeting",
        className: "border-0 bg-[#E8EEF9] text-[#21416B]",
        icon: Video,
      };
  }
}

function RailItem({
  item,
  batchId,
}: {
  item: ClassroomContentItem;
  batchId?: string;
}) {
  const { courseId } = useParams();
  const href = buildClassroomItemHref(courseId ?? "course", item, batchId);
  const badge = getKindBadge(item.kind);
  const Icon = badge.icon;

  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `block rounded-xl border px-3 py-3 transition-all ${
          isActive
            ? "border-[#308279] bg-[#F4FAF8] shadow-sm"
            : "border-[#D8E5E9] bg-[#FCFEFE] hover:border-[#A8C6C0] hover:bg-white"
        }`
      }
    >
      {({ isActive }) => (
        <div className="flex items-start gap-3">
          <div
            className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${
              item.kind === "video"
                ? "bg-[#0A1B45] text-white"
                : item.kind === "material"
                  ? "bg-[#308279] text-white"
                  : item.kind === "quiz"
                    ? "bg-[#FCEFC7] text-[#7A5A00]"
                    : "bg-[#E8EEF9] text-[#21416B]"
            }`}
          >
            <Icon className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <div className="truncate text-sm font-semibold text-[#0A1B45]">{item.title}</div>
              <Badge className={badge.className}>{badge.label}</Badge>
            </div>
            <div className="mt-1 text-xs text-[#476074]">{item.meta}</div>
            <div className="mt-2 flex items-center gap-2 text-xs">
              {item.completed ? (
                <CheckCircle className="h-3.5 w-3.5 text-[#308279]" />
              ) : (
                <Circle className="h-3.5 w-3.5 text-[#92B7B0]" />
              )}
              <span className={isActive ? "text-[#0A1B45]" : "text-[#476074]"}>
                {item.completed ? "Completed" : "Open item"}
              </span>
            </div>
          </div>
        </div>
      )}
    </NavLink>
  );
}

export default function ClassroomCurriculumRail() {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const batchId = searchParams.get("batch") ?? `${courseId ?? "course"}-batch-a`;
  const { selectedBatch, sections, course } = getMockClassroomData(courseId, batchId);

  return (
    <aside className="space-y-4">
      <Card className="rounded-[1.5rem] border-[#D8E5E9] bg-white p-5 shadow-[0_18px_42px_rgba(10,27,69,0.06)]">
        <div className="flex flex-wrap items-center gap-2">
          <div className="text-sm font-bold text-[#0A1B45]">{course.title}</div>
          <Badge className="border-0 bg-[#0A1B45]/8 text-[#0A1B45]">
            {selectedBatch.batchCode}
          </Badge>
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs text-[#476074]">
          <Calendar className="h-3.5 w-3.5" />
          <span>{selectedBatch.periodLabel}</span>
        </div>
        <div className="mt-3 rounded-xl bg-[#F3F8FA] px-3 py-3 text-xs leading-5 text-[#476074]">
          <span className="font-semibold text-[#0A1B45]">Status:</span>{" "}
          {selectedBatch.admissionStatus}. Admin masih memantau peserta batch ini secara manual.
        </div>
      </Card>

      <Card className="rounded-[1.5rem] border-[#D8E5E9] bg-white p-4 shadow-[0_18px_42px_rgba(10,27,69,0.06)]">
        <div className="mb-4 flex items-center justify-between gap-3 px-2">
          <div>
            <h2 className="text-lg font-bold text-[#0A1B45]">Curriculum Rail</h2>
            <p className="text-xs text-[#476074]">
              Compact list visible across all learning pages.
            </p>
          </div>
          <Badge className="border-0 bg-[#308279]/10 text-[#308279]">
            {sections.reduce((total, section) => total + section.items.length, 0)} items
          </Badge>
        </div>

        <div className="space-y-4">
          {sections.map((section) => (
            <section key={section.id}>
              <div className="mb-2 px-2 text-xs font-bold uppercase tracking-[0.14em] text-[#92A4AE]">
                {section.title}
              </div>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <RailItem key={item.id} item={item} batchId={batchId} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {!location.pathname.endsWith(`/classroom/${courseId}`) && (
          <div className="mt-5 border-t border-[#E5EEF1] pt-4">
            <NavLink
              to={`/classroom/${courseId}?batch=${batchId}`}
              className="text-sm font-semibold text-[#308279] hover:text-[#0A1B45]"
            >
              Back to classroom overview
            </NavLink>
          </div>
        )}
      </Card>
    </aside>
  );
}
