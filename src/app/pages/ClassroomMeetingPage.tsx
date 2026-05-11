import { useParams, useSearchParams } from "react-router";
import { Calendar, Clock, ListChecks, Video } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { getMockClassroomData } from "../data/classroomContent";

export default function ClassroomMeetingPage() {
  const { courseId, itemId } = useParams();
  const [searchParams] = useSearchParams();
  const batchId = searchParams.get("batch") ?? `${courseId ?? "course"}-batch-a`;
  const { items } = getMockClassroomData(courseId, batchId);
  const item = items.find((entry) => entry.id === itemId && entry.kind === "meeting");

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
          <Badge className="border-0 bg-[#E8EEF9] text-[#21416B]">Pertemuan</Badge>
          <Badge className="border-0 bg-[#0A1B45]/8 text-[#0A1B45]">{item.sectionTitle}</Badge>
        </div>
        <h2 className="mt-4 text-3xl font-bold text-[#0A1B45]">{item.title}</h2>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[#476074]">
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {item.meta}
          </span>

        </div>
        <p className="max-w-3xl text-sm leading-7 text-[#476074]">{item.description}</p>
        <div >
          <Button className="bg-[#21416B] text-white hover:bg-[#0A1B45]">
            Meeting detail
          </Button>
        </div>
      </Card>

    </div>
  );
}
