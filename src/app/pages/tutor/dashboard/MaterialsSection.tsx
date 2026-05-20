import { ArrowLeft, BookOpen, CheckCircle2, Download, Edit, FileText, Presentation, StickyNote } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";

import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";

import type { TutorAssignedClassCard, TutorClassMaterial, TutorMaterialTrack } from "./types";

type MaterialSectionGroup = {
  key: string;
  sectionLabel: string;
  sectionTitle: string;
  materials: TutorClassMaterial[];
};

type MaterialsSectionProps = {
  activeMaterialCourse: string | null;
  activeMaterialTrack: TutorMaterialTrack;
  assignedClassCards: TutorAssignedClassCard[];
  classMaterials: TutorClassMaterial[];
  isMaterialDialogOpen: boolean;
  visibleMaterials: TutorClassMaterial[];
  visibleMaterialsBySection: MaterialSectionGroup[];
  onBackToClasses: () => void;
  onMaterialCourseChange: (courseId: string) => void;
  onMaterialDialogChange: (open: boolean) => void;
  onMaterialSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onMaterialTrackChange: (track: TutorMaterialTrack) => void;
};

export function MaterialsSection({
  activeMaterialCourse,
  activeMaterialTrack,
  assignedClassCards,
  classMaterials,
  isMaterialDialogOpen,
  visibleMaterials,
  visibleMaterialsBySection,
  onBackToClasses,
  onMaterialCourseChange,
  onMaterialDialogChange,
  onMaterialSubmit,
  onMaterialTrackChange,
}: MaterialsSectionProps) {
  return (
    <section className="space-y-6">
      {activeMaterialCourse === null ? (
        <>
          <div>
            <h2 className="text-2xl font-bold text-[#0A1B45]">Pilih Class</h2>
            <p className="max-w-3xl text-[#476074]">Masuk ke halaman materials per class untuk review bahan admin, recap tutor, dan file hasil pembahasan.</p>
          </div>

          <div className="space-y-4">
            {assignedClassCards.map((item) => {
              const courseMaterials = classMaterials.filter((material) => material.classId === item.id);
              const liveMaterials = courseMaterials.filter((material) => material.type === "tutor-led").length;
              const selfStudyCount = courseMaterials.filter((material) => material.type === "self-study").length;

              return (
                <Card
                  key={item.id}
                  className="border-[#D9E6EA] bg-white p-5 shadow-[0_18px_40px_rgba(10,27,69,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#308279] hover:shadow-[0_24px_48px_rgba(10,27,69,0.12)]"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                        <h3 className="mt-2 text-xl font-bold text-[#0A1B45]">{item.title}</h3>
                        <Button className="w-fit bg-[#308279] text-white hover:bg-[#256366] cursor-pointer" onClick={() => onMaterialCourseChange(String(item.id))}>
                          <BookOpen className="mr-2 h-4 w-4" />
                          Open class
                        </Button>
                      </div>
                      <p className="mt-2 text-sm text-[#476074]">{item.nextLive}</p>
                    </div>
                    <div className="flex flex-col gap-3 lg:min-w-[360px]">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-[#F7FAFB] p-4">
                          <div className="text-[11px] uppercase tracking-[0.16em] text-[#476074]">Live session materials</div>
                          <div className="mt-1 text-2xl font-bold text-[#0A1B45]">{liveMaterials}</div>
                        </div>
                        <div className="rounded-2xl bg-[#F7FAFB] p-4">
                          <div className="text-[11px] uppercase tracking-[0.16em] text-[#476074]">Self study materials</div>
                          <div className="mt-1 text-2xl font-bold text-[#0A1B45]">{selfStudyCount}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <button
                type="button"
                onClick={onBackToClasses}
                className="mb-3 border-b-1 border-transparent hover:border-b-1 hover:border-[#308279] cursor-pointer inline-flex items-center gap-2 text-sm font-semibold text-[#308279]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to classes
              </button>
              <h2 className="text-2xl font-bold text-[#0A1B45]">
                {assignedClassCards.find((item) => String(item.id) === activeMaterialCourse)?.title ?? "Materials"}
              </h2>
              <p className="max-w-3xl text-[#476074]">Review material per section, cek sesi terkait, lalu tambahkan recap tutor atau file hasil pembahasan.</p>
            </div>
            <div className="inline-flex rounded-2xl border border-[#D8E5E9] bg-white p-1 shadow-sm">
              {([
                { value: "tutor-led", label: "Pembahasan Live Session" },
                { value: "self-study", label: "Self Study" },
              ] as const).map((option) => {
                const isActive = activeMaterialTrack === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onMaterialTrackChange(option.value)}
                    className={`rounded-[0.9rem] px-4 py-2.5 text-sm font-semibold transition ${
                      isActive
                        ? "bg-[#0A1B45] text-white shadow-[0_10px_24px_rgba(10,27,69,0.14)]"
                        : "text-[#476074] hover:bg-[#F3F8FA] hover:text-[#0A1B45]"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      <Dialog open={isMaterialDialogOpen} onOpenChange={onMaterialDialogChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tambah bahan tutor</DialogTitle>
            <DialogDescription>
              Hubungkan ke materi admin, pilih sesi, lalu tambahkan recap atau file hasil catatan tutor.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={onMaterialSubmit}>
            <div className="space-y-2">
              <Label htmlFor="material-class">Class</Label>
              <select id="material-class" className="w-full">
                {assignedClassCards.map((item) => (
                  <option key={item.id}>{item.title}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="material-reference">Admin Material</Label>
              <select id="material-reference" className="w-full">
                {visibleMaterials.map((material) => (
                  <option key={material.id}>{material.title}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="material-title">Judul bahan tutor</Label>
              <Input id="material-title" placeholder="e.g., Recap sesi 04 + common mistakes" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="material-annotated">File hasil catatan</Label>
              <Input id="material-annotated" placeholder="Upload ulang PDF/PPT yang sudah diberi catatan atau paste internal asset link" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="material-notes">Recap tutor</Label>
              <Textarea
                id="material-notes"
                placeholder="Tuliskan poin yang dibahas, miskonsepsi umum, atau tindak lanjut setelah sesi..."
                rows={5}
              />
            </div>
            <div className="rounded-2xl border border-dashed border-[#D8E5E9] bg-[#F7FAFB] p-4 text-sm leading-6 text-[#476074]">
              Base material tetap dari admin. Tambahan dari tutor dipakai untuk recap sesi atau versi bahan yang sudah diberi catatan.
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="bg-[#308279] hover:bg-[#308279]/90">
                Simpan Catatan
              </Button>
              <Button type="button" variant="outline" onClick={() => onMaterialDialogChange(false)}>
                Batal
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {activeMaterialCourse !== null ? (
        <div className="space-y-6">
          {visibleMaterialsBySection.map((section) => (
            <div key={section.key} className="space-y-4">
              <div className="rounded-[1.6rem] border border-[#D9E6EA] bg-white px-5 py-4 shadow-[0_14px_30px_rgba(10,27,69,0.05)]">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#308279]">{section.sectionLabel}</div>
                <h3 className="mt-1 text-xl font-bold text-[#0A1B45]">{section.sectionTitle}</h3>
                <p className="mt-1 text-sm text-[#476074]">{section.materials.length} material ditampilkan di section ini.</p>
              </div>

              {section.materials.map((material) => (
                <Card
                  key={material.id}
                  className="h-full border-[#D9E6EA] p-4 shadow-[0_18px_40px_rgba(10,27,69,0.06)] transition-all hover:border-[#308279] hover:shadow-[0_24px_48px_rgba(10,27,69,0.10)]"
                >
                  <div className="grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)]">
                    <div className="min-w-0 flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#308279]/10 text-[#308279]">
                        {material.type === "tutor-led" ? <Presentation className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
                      </div>
                      <div className="min-w-0">
                        <h3 className="mt-2 text-lg font-bold text-[#0A1B45]">{material.title}</h3>
                        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm text-[#476074]">
                          <span className="font-medium text-[#308279]">{material.className}</span>
                          <span>{material.sessionPhase}</span>
                        </div>
                        <p className="mt-2 text-sm leading-6 italic text-[#476074]">{material.support}</p>
                        <p className="mt-2 text-sm font-medium text-[#0A1B45]">Fokus tutor: {material.tutorFocus}</p>
                      </div>
                    </div>
                    <div className="grid gap-2 text-sm text-[#476074]">
                      <div className="rounded-2xl bg-[#F7FAFB] px-4 py-3">
                        <div className="text-[11px] uppercase tracking-[0.16em] text-[#476074]">Dipakai untuk</div>
                        <div className="mt-1 font-semibold text-[#0A1B45]">{material.relatedSession}</div>
                      </div>

                      <div className="rounded-2xl bg-[#F7FAFB] px-4 py-3">
                        <div className="text-[11px] uppercase tracking-[0.16em] text-[#476074]">Status</div>
                        <div className="mt-1 font-semibold text-[#0A1B45]">{material.status}</div>
                      </div>
                      <div className="rounded-[1.2rem] border border-[#D9E6EA] bg-[#FCFEFE] p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#476074]">Admin material</div>
                            <div className="mt-1 text-sm font-semibold text-[#0A1B45]">{material.adminAsset}</div>
                          </div>
                          <Button variant="outline" className="border-[#D8E5E9]">
                            <Download className="mr-2 h-4 w-4" />
                            Open
                          </Button>
                        </div>
                      </div>
                      <div className="rounded-[1.2rem] border border-[#D9E6EA] bg-white p-4">
                        <div>
                          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#476074]">File tutor</div>
                          <div className="mt-1 text-sm font-semibold text-[#0A1B45]">{material.tutorAsset || "Belum ada file tutor"}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
                    <div className="rounded-2xl border border-dashed border-[#D8E5E9] bg-white p-4">
                      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#476074]">
                        <StickyNote className="h-3.5 w-3.5" />
                        Recap tutor
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[#476074]">
                        {material.tutorNotes || "Belum ada recap tutor untuk material ini."}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                      <Button
                        variant="outline"
                        className="border-[#308279] text-[#308279]"
                        onClick={() =>
                          toast.message("Tutor note editor", {
                            description: `Catatan untuk ${material.title} bisa dilanjutkan dari panel tutor notes.`,
                          })
                        }
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Tambah recap tutor
                      </Button>
                      <Link to={`/class/${material.classId}`}>
                        <Button variant="outline" className="w-full">
                          Buka class
                        </Button>
                      </Link>
                      {material.tutorAsset ? (
                        <Button variant="outline" className="border-[#D8E5E9]">
                          <CheckCircle2 className="mr-2 h-4 w-4 text-[#308279]" />
                          Lihat file tutor
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
