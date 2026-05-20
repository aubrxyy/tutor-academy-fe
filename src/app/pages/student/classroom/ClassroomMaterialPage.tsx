import { useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { Download, FileText } from "lucide-react";
import jsPDF from "jspdf";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { getMockClassroomData } from "../../../data/classroomContent";

function getPdfFileName(title: string, attachmentName?: string) {
  if (attachmentName?.toLowerCase().endsWith(".pdf")) {
    return attachmentName;
  }

  return `${title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "material"}.pdf`;
}

export default function ClassroomMaterialPage() {
  const { courseId, itemId } = useParams();
  const [searchParams] = useSearchParams();
  const batchId = searchParams.get("batch") ?? `${courseId ?? "course"}-batch-a`;
  const { items } = getMockClassroomData(courseId, batchId);
  const item = items.find((entry) => entry.id === itemId && entry.kind === "material");
  const materialContentRef = useRef<HTMLDivElement | null>(null);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const handleDownloadPdf = async () => {
    if (!item?.htmlContent || !materialContentRef.current) {
      return;
    }

    setIsExportingPdf(true);

    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      await doc.html(materialContentRef.current, {
        margin: [40, 40, 40, 40],
        autoPaging: "text",
        html2canvas: {
          scale: 0.7,
        },
        width: 515,
        windowWidth: materialContentRef.current.scrollWidth,
      });

      doc.save(getPdfFileName(item.title, item.attachmentName));
    } finally {
      setIsExportingPdf(false);
    }
  };

  if (!item) {
    return (
      <Card className="rounded-[1.75rem] border-[#D8E5E9] bg-white p-10">
        <h2 className="text-2xl font-bold text-[#0A1B45]">Material not found</h2>
        <p className="mt-3 text-[#476074]">The selected material is not available in this curriculum.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="rounded-3xl border-[#D8E5E9] bg-white p-5 shadow-[0_18px_42px_rgba(10,27,69,0.06)] sm:p-8">
        <div className="flex flex-wrap items-center gap-1">
          <Badge className="border-0 bg-[#308279]/10 text-[#308279]">Material</Badge>
          <Badge className="border-0 bg-[#0A1B45]/8 text-[#0A1B45]">{item.sectionTitle}</Badge>
          {item.downloadable ? (
            <Badge className="border-0 bg-[#E8EEF9] text-[#21416B]">Downloadable</Badge>
          ) : null}
        </div>
        <h2 className="text-2xl font-bold tracking-[-0.02em] text-[#0A1B45] sm:text-3xl">{item.title}</h2>
        <p className="text-sm text-[#476074]">{item.meta}</p>
        <p className="max-w-3xl text-sm leading-7 text-[#476074]">{item.description}</p>
      </Card>

      <Card className="rounded-3xl border-[#D8E5E9] bg-white p-5 shadow-[0_18px_42px_rgba(10,27,69,0.06)] sm:p-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#308279] text-white">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#0A1B45]">Material Content</h3>
            <p className="text-sm text-[#476074]">Rich text content prepared by the tutor.</p>
          </div>
        </div>

        {item.htmlContent ? (
          <div ref={materialContentRef} className="bg-white">
            <article
              className="prose prose-slate max-w-none prose-headings:text-[#0A1B45] prose-p:text-[#476074] prose-li:text-[#476074] prose-strong:text-[#0A1B45] prose-blockquote:border-l-[#308279] prose-blockquote:text-[#476074]"
              dangerouslySetInnerHTML={{ __html: item.htmlContent }}
            />
          </div>
        ) : (
          <div className="rounded-2xl bg-[#F3F8FA] px-4 py-3 text-sm text-[#476074]">
            No material content has been published yet.
          </div>
        )}
      </Card>
    </div>
  );
}
