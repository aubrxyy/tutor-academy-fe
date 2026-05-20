import { Link, useParams, useSearchParams } from "react-router";
import { ArrowRight, Calendar, FileText, PlayCircle, Target, Video } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { getMockClassroomData, buildClassroomItemHref } from "../../../data/classroomContent";

export default function ClassroomPage() {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const batchId = searchParams.get("batch") ?? `${courseId ?? "course"}-batch-a`;
  const { course, selectedBatch, items } = getMockClassroomData(courseId, batchId);

  const featuredVideo = items.find((item) => item.kind === "video");
  const featuredMaterial = items.find((item) => item.kind === "material");
  const nextMeeting = items.find((item) => item.kind === "meeting" && !item.completed);
  const nextQuiz = items.find((item) => item.kind === "quiz" && !item.completed);

  return (
    <div className="space-y-6">
      <Card className="rounded-3xl border-[#D8E5E9] bg-white p-5 shadow-[0_18px_42px_rgba(10,27,69,0.06)] sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D8E5E9] bg-[#F9FCFD] px-4 py-2 text-xs uppercase tracking-[0.14em] text-[#476074]">
              Cohort workspace
            </div>
            <h2 className="mt-5 text-2xl font-bold tracking-[-0.02em] text-[#0A1B45] sm:text-3xl">
              Selamat datang di kelas {course.title} Batch {selectedBatch.batchCode}
            </h2>
            <p className="mt-3 max-w-3xl text-[#476074] leading-7">
              Semua detail video, material, quiz, dan pertemuan sekarang dibuka lewat halaman
              terpisah, sementara curriculum rail di kiri tetap menjadi pusat navigasi kamu.
            </p>
          </div>
        </div>
      </Card>

      {featuredVideo || featuredMaterial ? (
        <Card className="rounded-3xl border-[#D8E5E9] bg-white p-5 shadow-[0_18px_42px_rgba(10,27,69,0.06)] sm:p-7">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Badge className="border-0 bg-[#0A1B45]/8 text-[#0A1B45]">Sections</Badge>
                <h3 className="mt-3 text-2xl font-bold text-[#0A1B45]">Video & Material</h3>
                <p className="mt-2 text-sm leading-6 text-[#476074]">
                  Semua konten belajar inti untuk section aktif dibuka dari area yang sama.
                </p>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              {featuredVideo ? (
                <div className="rounded-[1.25rem] border border-[#D8E5E9] bg-[#F9FCFD] p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0A1B45] text-white">
                      <PlayCircle className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <Badge className="border-0 bg-[#0A1B45]/8 text-[#0A1B45]">Video</Badge>
                      <h4 className="mt-3 text-xl font-bold text-[#0A1B45]">{featuredVideo.title}</h4>
                      <p className="mt-2 text-sm text-[#476074]">{featuredVideo.meta}</p>
                      <p className="mt-3 text-sm leading-6 text-[#476074]">{featuredVideo.description}</p>
                      <Link to={buildClassroomItemHref(course.id, featuredVideo, batchId)}>
                        <Button className="mt-5 bg-[#0A1B45] text-white hover:bg-[#308279]">
                          Open video page
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : null}

              {featuredMaterial ? (
                <div className="rounded-[1.25rem] border border-[#D8E5E9] bg-[#F9FCFD] p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#308279] text-white">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <Badge className="border-0 bg-[#308279]/10 text-[#308279]">Material</Badge>
                      <h4 className="mt-3 text-xl font-bold text-[#0A1B45]">{featuredMaterial.title}</h4>
                      <p className="mt-2 text-sm text-[#476074]">{featuredMaterial.meta}</p>
                      <p className="mt-3 text-sm leading-6 text-[#476074]">{featuredMaterial.description}</p>
                      <Link to={buildClassroomItemHref(course.id, featuredMaterial, batchId)}>
                        <Button className="mt-5 bg-[#308279] text-white hover:bg-[#308279]/90">
                          Open material page
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </Card>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-2">
        {nextMeeting ? (
          <Card className="rounded-[1.75rem] border-[#D8E5E9] bg-white p-6 shadow-[0_18px_42px_rgba(10,27,69,0.06)]">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8EEF9] text-[#21416B]">
                <Video className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <Badge className="border-0 bg-[#E8EEF9] text-[#21416B]">Pertemuan</Badge>
                <h3 className="mt-3 text-xl font-bold text-[#0A1B45]">{nextMeeting.title}</h3>
                <div className="mt-2 flex items-center gap-2 text-sm text-[#476074]">
                  <Calendar className="h-4 w-4" />
                  <span>{nextMeeting.meta}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#476074]">{nextMeeting.description}</p>
                <Link to={buildClassroomItemHref(course.id, nextMeeting, batchId)}>
                  <Button variant="outline" className="mt-5 border-[#21416B] text-[#21416B] hover:bg-[#E8EEF9]">
                    Open meeting page
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ) : null}

        {nextQuiz ? (
          <Card className="rounded-[1.75rem] border-[#D8E5E9] bg-white p-6 shadow-[0_18px_42px_rgba(10,27,69,0.06)]">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FCEFC7] text-[#7A5A00]">
                <Target className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <Badge className="border-0 bg-[#FCEFC7] text-[#7A5A00]">Quiz</Badge>
                <h3 className="mt-3 text-xl font-bold text-[#0A1B45]">{nextQuiz.title}</h3>
                <p className="mt-2 text-sm text-[#476074]">{nextQuiz.meta}</p>
                <p className="mt-3 text-sm leading-6 text-[#476074]">{nextQuiz.description}</p>
                <Link to={buildClassroomItemHref(course.id, nextQuiz, batchId)}>
                  <Button variant="outline" className="mt-5 border-[#7A5A00] text-[#7A5A00] hover:bg-[#FCEFC7]/50">
                    Open quiz page
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
