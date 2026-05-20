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
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0A1B45]">Assigned Class Portfolio</h2>
          <p className="text-[#476074]">Semua class yang sedang kamu handle tampil di satu overview.</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {assignedClassCards.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden border-[#D9E6EA] bg-white p-5 shadow-[0_18px_40px_rgba(10,27,69,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#308279] hover:shadow-[0_24px_48px_rgba(10,27,69,0.12)] sm:p-6"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="rounded-2xl border border-[#D8E5E9] bg-[#F9FCFD] px-4 py-3">
                <h3 className="mt-2 text-xl font-bold text-[#0A1B45]">{item.title}</h3>
                <div className="mt-1 text-sm font-medium text-[#476074]">Teaching {item.batches} batches</div>
                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => onOpenMeetings(String(item.id))}
                    className="flex size-12 cursor-pointer items-center justify-center rounded-2xl bg-[#0A1B45] text-white shadow-[0_10px_24px_rgba(10,27,69,0.18)] transition hover:-translate-y-0.5"
                    aria-label={`Open live meetings for ${item.title}`}
                  >
                    <Video className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenMaterials(String(item.id))}
                    className="flex size-12 cursor-pointer items-center justify-center rounded-2xl bg-[#308279] text-white shadow-[0_10px_24px_rgba(48,130,121,0.22)] transition hover:-translate-y-0.5"
                    aria-label={`Open materials for ${item.title}`}
                  >
                    <FileText className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenQuizzes(String(item.id))}
                    className="flex size-12 cursor-pointer items-center justify-center rounded-2xl bg-[#FCEFC7] text-[#7A5A00] shadow-[0_10px_24px_rgba(245,228,168,0.35)] transition hover:-translate-y-0.5"
                    aria-label={`Open quizzes for ${item.title}`}
                  >
                    <CheckCircle2 className="size-5" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#E5EEF1] bg-[#F3F8FA] p-4">
                  <div className="text-xs uppercase tracking-[0.16em] text-[#476074]">Students</div>
                  <div className="mt-2 text-2xl font-bold text-[#0A1B45]">{item.students}</div>
                </div>
                <div className="rounded-2xl border border-[#E5EEF1] bg-[#F3F8FA] p-4">
                  <div className="text-xs uppercase tracking-[0.16em] text-[#476074]">Materials</div>
                  <div className="mt-2 text-2xl font-bold text-[#0A1B45]">{item.tutorDocs}</div>
                </div>
                <div className="rounded-2xl border border-[#E5EEF1] bg-[#F3F8FA] p-4 sm:w-[12rem]">
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
