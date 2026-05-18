import { CheckCircle2, FileText, Video } from "lucide-react";

import { Card } from "../../../components/ui/card";

import type { TutorAssignedClassCard } from "./types";

type OverviewSectionProps = {
  assignedClassCards: TutorAssignedClassCard[];
  onOpenMeetings: (courseId: string) => void;
  onOpenMaterials: (courseId: string) => void;
  onOpenQuizzes: (courseId: string) => void;
};

export function OverviewSection({
  assignedClassCards,
  onOpenMeetings,
  onOpenMaterials,
  onOpenQuizzes,
}: OverviewSectionProps) {
  return (
    <section className="mb-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0A1B45]">Assigned Class Portfolio</h2>
          <p className="text-[#476074]">Semua class yang sedang kamu handle tampil di satu overview.</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {assignedClassCards.map((item) => (
          <Card
            key={item.id}
            className="relative overflow-hidden border-[#D9E6EA] bg-white p-6 shadow-[0_18px_40px_rgba(10,27,69,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(10,27,69,0.12)]"
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 w-80 bg-gradient-to-r from-[#0A1B45] to-[#308279] opacity-90" />
            <div className="pointer-events-none absolute inset-y-0 left-56 w-40 bg-gradient-to-r from-[#308279] to-transparent" />
            <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="rounded-xl px-4 py-3 text-white">
                <h3 className="mt-2 text-xl font-bold text-white drop-shadow-sm">{item.title}</h3>
                <div className="mt-1 text-sm font-medium text-white/80">Teaching {item.batches} batches</div>
                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => onOpenMeetings(String(item.id))}
                    className="flex size-12 cursor-pointer items-center justify-center rounded-2xl bg-white/15 text-white shadow-[0_10px_24px_rgba(10,27,69,0.18)] transition hover:-translate-y-0.5"
                    aria-label={`Open live meetings for ${item.title}`}
                  >
                    <Video className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenMaterials(String(item.id))}
                    className="flex size-12 cursor-pointer items-center justify-center rounded-2xl bg-white/15 text-white shadow-[0_10px_24px_rgba(48,130,121,0.22)] transition hover:-translate-y-0.5"
                    aria-label={`Open materials for ${item.title}`}
                  >
                    <FileText className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenQuizzes(String(item.id))}
                    className="flex size-12 cursor-pointer items-center justify-center rounded-2xl bg-white/90 text-[#0A1B45] shadow-[0_10px_24px_rgba(245,228,168,0.35)] transition hover:-translate-y-0.5"
                    aria-label={`Open quizzes for ${item.title}`}
                  >
                    <CheckCircle2 className="size-5" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-[#F3F8FA] p-4">
                  <div className="text-xs uppercase tracking-[0.16em] text-[#476074]">Students</div>
                  <div className="mt-2 text-2xl font-bold text-[#0A1B45]">{item.students}</div>
                </div>
                <div className="rounded-2xl bg-[#F3F8FA] p-4">
                  <div className="text-xs uppercase tracking-[0.16em] text-[#476074]">Materials</div>
                  <div className="mt-2 text-2xl font-bold text-[#0A1B45]">{item.tutorDocs}</div>
                </div>
                <div className="rounded-2xl bg-[#F3F8FA] p-4 w-[12rem]">
                  <div className="text-xs uppercase tracking-[0.16em] text-[#476074]">Next Live</div>
                  <div className="mt-2 text-sm font-semibold text-[#0A1B45]">{item.nextLive}</div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
