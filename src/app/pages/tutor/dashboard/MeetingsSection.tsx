import { Calendar, Clock, Video } from "lucide-react";

import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";

import type { TutorMeetingSession } from "./types";

type CourseOption = {
  id: string;
  title: string;
};

type MeetingsSectionProps = {
  activeMeetingCourse: "all" | string;
  meetingCourseOptions: CourseOption[];
  visibleMeetings: TutorMeetingSession[];
  onMeetingCourseChange: (value: "all" | string) => void;
};

export function MeetingsSection({
  activeMeetingCourse,
  meetingCourseOptions,
  visibleMeetings,
  onMeetingCourseChange,
}: MeetingsSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0A1B45]">Daftar Live Meetings</h2>
          <p className="text-[#476074]">Filter per class dan lihat sesi terbaru lebih dulu.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <select
            value={activeMeetingCourse}
            onChange={(event) => onMeetingCourseChange(event.target.value)}
            className="rounded-2xl border border-[#D8E5E9] bg-white px-4 py-3 text-sm font-medium text-[#0A1B45] shadow-sm outline-none transition focus:border-[#308279]"
          >
            <option value="all">All classes</option>
            {meetingCourseOptions.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        {visibleMeetings.map((session) => (
          <Card
            key={session.id}
            className="overflow-hidden border-[#D9E6EA] transition-all hover:border-[#308279] hover:shadow-lg"
          >
            <div className="p-6">
              <div className="grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,0.9fr)_auto] xl:items-start">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#308279] to-[#0A1B45]">
                    <Video className="h-7 w-7 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="border-0 bg-[#0A1B45]/8 text-[#0A1B45]">{session.batchName}</Badge>
                      <Badge
                        className={
                          session.status === "Scheduled"
                            ? "border-0 bg-[#308279]/10 text-[#308279]"
                            : "border-0 bg-[#F3F8FA] text-[#476074]"
                        }
                      >
                        {session.status}
                      </Badge>
                    </div>
                    <h3 className="mt-2 text-xl font-bold text-[#0A1B45]">{session.title}</h3>
                    <p className="mt-1 text-md text-[#476074]">{session.className}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-[#476074]">
                        <Calendar className="h-4 w-4" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#476074]">
                        <Clock className="h-4 w-4" />
                        <span>
                          {session.startTime} - {session.endTime}
                        </span>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[#476074]">{session.topic}</p>
                  </div>
                </div>
                <div className="grid gap-3 text-sm text-[#476074]">
                  <div className="rounded-2xl bg-[#F7FAFB] px-4 py-3">
                    <div className="text-[11px] uppercase tracking-[0.16em] text-[#476074]">Batch period</div>
                    <div className="mt-1 font-semibold text-[#0A1B45]">{session.batchWindow}</div>
                  </div>
                  <div className="rounded-2xl bg-[#F7FAFB] px-4 py-3">
                    <div className="text-[11px] uppercase tracking-[0.16em] text-[#476074]">Students enrolled</div>
                    <div className="mt-1 font-semibold text-[#0A1B45]">{session.enrolledStudents} students</div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 xl:min-w-[190px]">
                  {session.zoomLink ? (
                    <Button
                      className="bg-[#308279] hover:bg-[#308279]/90"
                      onClick={() => window.open(session.zoomLink, "_blank", "noopener,noreferrer")}
                    >
                      Join meeting
                    </Button>
                  ) : (
                    <Button variant="outline" disabled>
                      Waiting for admin link
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
