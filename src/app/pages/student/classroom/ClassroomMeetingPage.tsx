import { useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { Calendar, Copy, ExternalLink, Star } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Textarea } from "../../../components/ui/textarea";
import { getMockClassroomData } from "../../../data/classroomContent";

export default function ClassroomMeetingPage() {
  const { courseId, itemId } = useParams();
  const [searchParams] = useSearchParams();
  const batchId = searchParams.get("batch") ?? `${courseId ?? "course"}-batch-a`;
  const { items } = getMockClassroomData(courseId, batchId);
  const item = items.find((entry) => entry.id === itemId && entry.kind === "meeting");
  const zoomLink = item?.sourceUrl?.trim() ?? "";
  const [tutorRating, setTutorRating] = useState(0);
  const [classRating, setClassRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);

  const handleCopyLink = async () => {
    if (!zoomLink) return;

    try {
      await navigator.clipboard.writeText(zoomLink);
      toast.success("Zoom link copied");
    } catch {
      toast.error("Unable to copy link");
    }
  };

  const handleSubmitRating = () => {
    if (!tutorRating || !classRating) {
      toast.error("Please rate the tutor and class first.");
      return;
    }

    setIsRatingSubmitted(true);
    toast.success("Thanks for your feedback");
  };

  if (!item) {
    return (
      <Card className="rounded-[1.75rem] border-[#D8E5E9] bg-white p-10">
        <h2 className="text-2xl font-bold text-[#0A1B45]">Meeting not found</h2>
        <p className="mt-3 text-[#476074]">The selected meeting is not available in this curriculum.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="rounded-[1.75rem] border-[#D8E5E9] bg-white p-8 shadow-[0_18px_42px_rgba(10,27,69,0.06)]">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="border-0 bg-[#0A1B45]/8 text-[#0A1B45]">{item.sectionTitle}</Badge>
        </div>
        <h2 className="mt-4 text-3xl font-bold text-[#0A1B45]">{item.title}</h2>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[#476074]">
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {item.meta}
          </span>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[#476074]">{item.description}</p>

        <div className="mt-6 rounded-[1.4rem] border border-[#D8E5E9] bg-[#F7FAFB] p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="text-[11px] uppercase tracking-[0.18em] text-[#476074]">
                Zoom Link
              </div>
              {zoomLink ? (
                <a
                  href={zoomLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block break-all text-sm font-medium text-[#21416B] underline decoration-[#B7C9D6] underline-offset-4"
                >
                  {zoomLink}
                </a>
              ) : (
                <p className="mt-2 text-sm font-medium text-[#476074]">
                  Waiting for link from admin.
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {zoomLink ? (
                <>
                  <Button
                    className="bg-[#21416B] text-white hover:bg-[#0A1B45]"
                    onClick={() => window.open(zoomLink, "_blank", "noopener,noreferrer")}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Join meeting
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#D8E5E9] text-[#21416B] hover:text-[#21416B] hover:bg-[#E8EEF9]"
                    onClick={handleCopyLink}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy link
                  </Button>
                </>
              ) : (
                <Button variant="outline" disabled className="border-[#D8E5E9] text-[#476074]">
                  Waiting for link
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      {item.completed ? (
        <Card className="rounded-[1.75rem] border-[#D8E5E9] bg-white p-8 shadow-[0_18px_42px_rgba(10,27,69,0.06)]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Badge className="border-0 bg-[#EAF6F4] text-[#308279]">Post-session feedback</Badge>
              <h3 className="mt-4 text-2xl font-bold text-[#0A1B45]">
                Rate the tutor and class
              </h3>
              <p className="mt-2 text-sm leading-7 text-[#476074]">
                Beri penilaian singkat setelah live session selesai supaya kualitas tutor dan
                kelas bisa terus diperbaiki.
              </p>
            </div>
            {isRatingSubmitted ? (
              <Badge className="border-0 bg-[#308279] px-3 py-2 text-white">Submitted</Badge>
            ) : null}
          </div>

          {isRatingSubmitted ? (
            <div className="mt-6 rounded-[1.4rem] border border-[#D8E5E9] bg-[#F7FAFB] p-5 text-sm text-[#476074]">
              Feedback kamu sudah dikirim. Tutor rating:{" "}
              <span className="font-semibold text-[#0A1B45]">{tutorRating}/5</span>, class
              rating: <span className="font-semibold text-[#0A1B45]">{classRating}/5</span>.
            </div>
          ) : (
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <div className="rounded-[1.4rem] border border-[#D8E5E9] bg-[#F7FAFB] p-5">
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#476074]">
                  Tutor rating
                </div>
                <p className="mt-2 text-sm text-[#476074]">How was the tutor during this session?</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isActive = star <= tutorRating;
                    return (
                      <button
                        key={`tutor-${star}`}
                        type="button"
                        onClick={() => setTutorRating(star)}
                        className={`rounded-full border p-2 transition ${
                          isActive
                            ? "border-[#F4B740] bg-[#FFF7E2] text-[#F4B740]"
                            : "border-[#D8E5E9] bg-white text-[#9AAEBC] hover:border-[#F4B740]"
                        }`}
                        aria-label={`Rate tutor ${star} stars`}
                      >
                        <Star className={`h-5 w-5 ${isActive ? "fill-current" : ""}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[1.4rem] border border-[#D8E5E9] bg-[#F7FAFB] p-5">
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#476074]">
                  Class rating
                </div>
                <p className="mt-2 text-sm text-[#476074]">
                  How useful was this live class for your learning?
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isActive = star <= classRating;
                    return (
                      <button
                        key={`class-${star}`}
                        type="button"
                        onClick={() => setClassRating(star)}
                        className={`rounded-full border p-2 transition ${
                          isActive
                            ? "border-[#21416B] bg-[#E8EEF9] text-[#21416B]"
                            : "border-[#D8E5E9] bg-white text-[#9AAEBC] hover:border-[#21416B]"
                        }`}
                        aria-label={`Rate class ${star} stars`}
                      >
                        <Star className={`h-5 w-5 ${isActive ? "fill-current" : ""}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-2 rounded-[1.4rem] border border-[#D8E5E9] bg-[#F7FAFB] p-5">
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#476074]">
                  Optional feedback
                </div>
                <Textarea
                  value={feedback}
                  onChange={(event) => setFeedback(event.target.value)}
                  placeholder="Tulis catatan singkat tentang tutor, penjelasan materi, atau jalannya live session."
                  className="mt-3 min-h-28 border-[#D8E5E9] bg-white"
                />
                <div className="mt-4 flex justify-end">
                  <Button
                    className="bg-[#308279] text-white hover:bg-[#2B746C]"
                    onClick={handleSubmitRating}
                  >
                    Submit feedback
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>
      ) : null}
    </div>
  );
}
