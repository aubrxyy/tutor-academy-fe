import { Clock } from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { getMockClassroomData } from "../../../data/classroomContent";

export default function ClassroomQuizPage() {
  const { courseId, itemId } = useParams();
  const [searchParams] = useSearchParams();
  const batchId = searchParams.get("batch") ?? `${courseId ?? "course"}-batch-a`;
  const { items } = getMockClassroomData(courseId, batchId);
  const item = items.find((entry) => entry.id === itemId && entry.kind === "quiz");

  if (!item) {
    return (
      <Card className="rounded-[1.75rem] border-[#D8E5E9] bg-white p-10">
        <h2 className="text-2xl font-bold text-[#0A1B45]">Quiz not found</h2>
        <p className="mt-3 text-[#476074]">The selected quiz is not available in this curriculum.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="rounded-[1.75rem] border-[#D8E5E9] bg-white p-8 shadow-[0_18px_42px_rgba(10,27,69,0.06)]">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="border-0 bg-[#FCEFC7] text-[#7A5A00]">Quiz</Badge>
          <Badge className="border-0 bg-[#0A1B45]/8 text-[#0A1B45]">{item.sectionTitle}</Badge>
        </div>
        <h2 className="text-3xl font-bold text-[#0A1B45]">{item.title}</h2>
        <p className="text-sm text-[#476074]">{item.meta}</p>
        <p className="max-w-3xl text-sm leading-7 text-[#476074]">{item.description}</p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-[#F3F8FA] p-4">
            <div className="flex items-center gap-2 text-sm text-[#476074]">
              <Clock className="h-4 w-4" />
              Estimated time
            </div>
            <div className="mt-2 text-lg font-medium text-[#0A1B45]">{item.meta}</div>
          </div>
        </div>

        <Link to={`/class/${courseId}/quiz/${item.id.replace("quiz-", "")}`}>
              <Button className="bg-[#0A1B45] text-white hover:bg-[#308279]">Start quiz attempt</Button>
            </Link>

      </Card>
    </div>
  );
}
