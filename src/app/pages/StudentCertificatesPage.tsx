import { useState } from "react";
import { Award, Calendar, CheckCircle, Download, Eye } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog";
import jsPDF from "jspdf";

export default function StudentCertificatesPage() {
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const certificates = [
    {
      id: 1,
      courseName: "Data Structures & Algorithms",
      instructor: "Raka Pratama",
      completionDate: "15 Januari 2026",
      issueDate: "16 Januari 2026",
      certificateId: "CERT-DSA-2026-001234",
      score: 95,
      duration: "40 jam",
    },
    {
      id: 2,
      courseName: "Database Management & SQL",
      instructor: "Andi Wijaya",
      completionDate: "8 Februari 2026",
      issueDate: "9 Februari 2026",
      certificateId: "CERT-DB-2026-001235",
      score: 88,
      duration: "35 jam",
    },
    {
      id: 3,
      courseName: "Human Computer Interaction",
      instructor: "Denny Kusuma",
      completionDate: "1 Februari 2026",
      issueDate: "2 Februari 2026",
      certificateId: "CERT-HCI-2026-001236",
      score: 92,
      duration: "30 jam",
    },
  ];

  const handleDownloadPDF = (cert: any) => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    // Background
    doc.setFillColor(243, 248, 250);
    doc.rect(0, 0, 297, 210, "F");

    // Border
    doc.setDrawColor(48, 130, 121);
    doc.setLineWidth(3);
    doc.rect(10, 10, 277, 190);

    // Header decoration
    doc.setFillColor(10, 27, 69);
    doc.rect(0, 0, 297, 30, "F");

    // Logo area (placeholder)
    doc.setFillColor(48, 130, 121);
    doc.circle(148.5, 15, 8, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text("TA", 148.5, 17, { align: "center" });

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("TUTORING ACADEMY", 148.5, 50, { align: "center" });

    // Certificate heading
    doc.setTextColor(10, 27, 69);
    doc.setFontSize(32);
    doc.text("Certificate of Completion", 148.5, 70, { align: "center" });

    // Subtitle
    doc.setFontSize(14);
    doc.setTextColor(71, 96, 116);
    doc.text("This is to certify that", 148.5, 85, { align: "center" });

    // Student name
    doc.setFontSize(28);
    doc.setTextColor(48, 130, 121);
    doc.text("Ahmad Wijaya", 148.5, 100, { align: "center" });

    // Class completion text
    doc.setFontSize(14);
    doc.setTextColor(71, 96, 116);
    doc.text("has successfully completed the class", 148.5, 112, { align: "center" });

    // Class name
    doc.setFontSize(20);
    doc.setTextColor(10, 27, 69);
    doc.text(cert.courseName, 148.5, 125, { align: "center" });

    // Details
    doc.setFontSize(11);
    doc.setTextColor(71, 96, 116);
    doc.text(`Instructor: ${cert.instructor}`, 148.5, 138, { align: "center" });
    doc.text(`Duration: ${cert.duration} | Score: ${cert.score}%`, 148.5, 145, { align: "center" });
    doc.text(`Completion Date: ${cert.completionDate}`, 148.5, 152, { align: "center" });

    // Certificate ID
    doc.setFontSize(9);
    doc.setTextColor(146, 183, 176);
    doc.text(`Certificate ID: ${cert.certificateId}`, 148.5, 165, { align: "center" });

    // Signature lines
    doc.setDrawColor(71, 96, 116);
    doc.setLineWidth(0.5);
    doc.line(50, 180, 100, 180);
    doc.line(197, 180, 247, 180);

    doc.setFontSize(10);
    doc.setTextColor(71, 96, 116);
    doc.text("Instructor Signature", 75, 188, { align: "center" });
    doc.text("Platform Director", 222, 188, { align: "center" });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(146, 183, 176);
    doc.text("Tutoring Academy - BINUS University", 148.5, 200, { align: "center" });
    doc.text("Belajar Bareng, Sukses Bareng di BINUS", 148.5, 205, { align: "center" });

    doc.save(`Certificate-${cert.courseName.replace(/\s+/g, "-")}.pdf`);
  };

  const handlePreview = (cert: any) => {
    setSelectedCertificate(cert);
    setIsPreviewOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F3F8FA]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#0A1B45] to-[#308279] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Sertifikat Saya</h1>
              <p className="text-white/80 mt-2">
                Koleksi sertifikat dari class yang telah kamu selesaikan
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="text-sm text-white/80">Total Sertifikat</div>
              <div className="text-2xl font-bold">{certificates.length}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="text-sm text-white/80">Rata-rata Nilai</div>
              <div className="text-2xl font-bold">
                {Math.round(certificates.reduce((acc, c) => acc + c.score, 0) / certificates.length)}%
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <Card
              key={cert.id}
              className="overflow-hidden hover:shadow-xl transition-all border-2 hover:border-[#308279]"
            >
              {/* Certificate Header */}
              <div className="bg-gradient-to-br from-[#0A1B45] to-[#308279] p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <Award className="w-8 h-8" />
                    <Badge className="bg-white/20 text-white border-0">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{cert.courseName}</h3>
                  <p className="text-white/80 text-sm">oleh {cert.instructor}</p>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#476074]">Selesai pada:</span>
                    <span className="font-medium text-[#0A1B45] flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {cert.completionDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#476074]">Nilai:</span>
                    <span className="font-bold text-[#308279]">{cert.score}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#476074]">Durasi:</span>
                    <span className="font-medium text-[#0A1B45]">{cert.duration}</span>
                  </div>
                </div>

                <div className="pt-4 border-t text-xs text-[#476074]">
                  ID: {cert.certificateId}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => handlePreview(cert)}
                    variant="outline"
                    className="flex-1 border-[#308279] text-[#308279] hover:bg-[#308279]/5"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Lihat
                  </Button>
                  <Button
                    onClick={() => handleDownloadPDF(cert)}
                    className="flex-1 bg-[#308279] hover:bg-[#308279]/90 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {certificates.length === 0 && (
          <Card className="p-12 text-center">
            <Award className="w-16 h-16 text-[#92B7B0] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#0A1B45] mb-2">
              Belum Ada Sertifikat
            </h3>
            <p className="text-[#476074] mb-6">
              Selesaikan class untuk mendapatkan sertifikat kamu
            </p>
            <Link to="/marketplace">
              <Button className="bg-[#308279] hover:bg-[#308279]/90">
                Browse Classes
              </Button>
            </Link>
          </Card>
        )}
      </div>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Preview Sertifikat</DialogTitle>
            <DialogDescription>
              Lihat detail sertifikat kamu sebelum mendownloadnya.
            </DialogDescription>
          </DialogHeader>
          {selectedCertificate && (
            <div className="bg-[#F3F8FA] p-8 rounded-lg">
              <div className="bg-white p-12 rounded-lg border-4 border-[#308279] aspect-[297/210] flex flex-col justify-center items-center relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-[#0A1B45] to-[#308279]"></div>
                
                {/* Logo */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#308279] flex items-center justify-center text-white font-bold z-10">
                  TA
                </div>

                {/* Content */}
                <div className="relative z-10 text-center space-y-3 mt-8">
                  <h2 className="text-3xl font-bold text-[#0A1B45] mb-6">
                    Certificate of Completion
                  </h2>
                  <p className="text-[#476074]">This is to certify that</p>
                  <h3 className="text-3xl font-bold text-[#308279]">Ahmad Wijaya</h3>
                  <p className="text-[#476074]">has successfully completed the class</p>
                  <h4 className="text-2xl font-bold text-[#0A1B45] py-2">
                    {selectedCertificate.courseName}
                  </h4>
                  <p className="text-sm text-[#476074]">
                    Instructor: {selectedCertificate.instructor}
                  </p>
                  <p className="text-sm text-[#476074]">
                    Duration: {selectedCertificate.duration} | Score: {selectedCertificate.score}%
                  </p>
                  <p className="text-sm text-[#476074]">
                    Completion Date: {selectedCertificate.completionDate}
                  </p>
                  <p className="text-xs text-[#92B7B0] pt-4">
                    Certificate ID: {selectedCertificate.certificateId}
                  </p>
                </div>

                {/* Footer */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-around px-12">
                  <div className="text-center">
                    <div className="border-t-2 border-[#476074] w-32 mb-2"></div>
                    <p className="text-xs text-[#476074]">Instructor Signature</p>
                  </div>
                  <div className="text-center">
                    <div className="border-t-2 border-[#476074] w-32 mb-2"></div>
                    <p className="text-xs text-[#476074]">Platform Director</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center gap-3">
                <Button
                  onClick={() => handleDownloadPDF(selectedCertificate)}
                  className="bg-[#308279] hover:bg-[#308279]/90"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsPreviewOpen(false)}
                  className="border-[#476074]/30"
                >
                  Tutup
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
