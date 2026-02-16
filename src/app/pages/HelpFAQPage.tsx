import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import {
  HelpCircle, ArrowLeft, Search, BookOpen, CreditCard, Video,
  Shield, Users, MessageCircle, Mail, Phone
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export default function HelpFAQPage() {
  const [searchParams] = useSearchParams();
  const userRole = searchParams.get("role") || "student";
  const [searchQuery, setSearchQuery] = useState("");

  const studentFAQs = [
    {
      category: "Akun & Profil",
      icon: Users,
      questions: [
        {
          q: "Bagaimana cara mengubah profil saya?",
          a: "Buka halaman Profil dari dashboard, klik tombol 'Edit Profil', lakukan perubahan yang diinginkan, dan klik 'Simpan Perubahan'.",
        },
        {
          q: "Bagaimana cara mengganti password?",
          a: "Di halaman Edit Profil, scroll ke bagian 'Ubah Password', masukkan password lama dan password baru, kemudian simpan perubahan.",
        },
        {
          q: "Bisakah saya mengubah NIM saya?",
          a: "Tidak, NIM adalah identitas unik yang tidak dapat diubah. Jika ada kesalahan, hubungi admin melalui support@tutoringacademy.com",
        },
      ],
    },
    {
      category: "Course & Pembelajaran",
      icon: BookOpen,
      questions: [
        {
          q: "Bagaimana cara mendaftar course?",
          a: "Kunjungi halaman Marketplace, pilih course yang diinginkan, klik 'Enroll Now', dan selesaikan pembayaran. Course akan langsung muncul di dashboard kamu.",
        },
        {
          q: "Apakah course memiliki batas waktu akses?",
          a: "Tergantung paket yang kamu pilih. Paket monthly berlaku 30 hari, sedangkan paket annual berlaku 365 hari. Setelah itu, kamu perlu perpanjang subscription.",
        },
        {
          q: "Bagaimana cara mengikuti live session?",
          a: "Buka course di dashboard, klik 'Join Live Session' pada jadwal yang tersedia. Kamu akan diarahkan ke Zoom meeting dengan link yang disediakan tutor.",
        },
        {
          q: "Apakah saya bisa download materi course?",
          a: "Ya, semua PDF dan materi pendukung dapat didownload. Video dapat ditonton secara streaming tetapi tidak bisa didownload untuk menjaga kualitas konten.",
        },
      ],
    },
    {
      category: "Pembayaran & Subscription",
      icon: CreditCard,
      questions: [
        {
          q: "Metode pembayaran apa saja yang tersedia?",
          a: "Kami menerima pembayaran melalui Gopay, OVO, Dana, Transfer Bank (BCA, Mandiri, BNI), dan Kartu Kredit/Debit via Midtrans.",
        },
        {
          q: "Bagaimana cara perpanjang subscription?",
          a: "Sistem akan mengirimkan notifikasi 7 hari sebelum subscription berakhir. Klik link di notifikasi atau kunjungi halaman course dan pilih 'Renew Subscription'.",
        },
        {
          q: "Apakah ada refund policy?",
          a: "Refund dapat dilakukan dalam 7 hari pertama jika kamu belum mengakses lebih dari 20% materi course. Hubungi support untuk proses refund.",
        },
        {
          q: "Bagaimana cara mendapatkan invoice pembayaran?",
          a: "Invoice otomatis dikirim ke email setelah pembayaran berhasil. Kamu juga bisa download dari dashboard di bagian 'Riwayat Transaksi'.",
        },
      ],
    },
    {
      category: "Eye-Tracking & Focus Mode",
      icon: Video,
      questions: [
        {
          q: "Apa itu Eye-Tracking Focus Mode?",
          a: "Fitur Beta yang menggunakan webcam untuk memantau fokus kamu saat belajar. Sistem akan memberikan alert jika kamu tidak fokus pada layar.",
        },
        {
          q: "Apakah data webcam saya disimpan?",
          a: "Tidak, semua pemrosesan dilakukan secara real-time di browser kamu. Kami tidak menyimpan atau mengirim rekaman webcam ke server.",
        },
        {
          q: "Bagaimana cara mengaktifkan Eye-Tracking?",
          a: "Di halaman Classroom, klik tombol 'Enable Focus Mode'. Browser akan meminta izin akses webcam. Setujui, dan fitur akan aktif.",
        },
        {
          q: "Apakah Eye-Tracking wajib digunakan?",
          a: "Tidak, ini adalah fitur opsional untuk membantu kamu meningkatkan fokus belajar. Kamu tetap bisa mengakses semua materi tanpa fitur ini.",
        },
      ],
    },
    {
      category: "Quiz & Sertifikat",
      icon: Shield,
      questions: [
        {
          q: "Berapa kali saya bisa mengulang quiz?",
          a: "Setiap quiz dapat diulang maksimal 3 kali. Nilai tertinggi yang akan direkam sebagai nilai akhir kamu.",
        },
        {
          q: "Bagaimana cara mendapatkan sertifikat?",
          a: "Selesaikan semua modul dan quiz dengan nilai minimal 70%. Sertifikat akan otomatis tersedia di halaman 'Sertifikat Saya'.",
        },
        {
          q: "Apakah sertifikat bisa diverifikasi?",
          a: "Ya, setiap sertifikat memiliki ID unik yang dapat diverifikasi oleh pihak ketiga melalui sistem kami.",
        },
      ],
    },
  ];

  const tutorFAQs = [
    {
      category: "Menjadi Tutor",
      icon: Users,
      questions: [
        {
          q: "Bagaimana cara menjadi tutor?",
          a: "Hubungi admin melalui email recruitment@tutoringacademy.com dengan CV, transkrip nilai, dan portofolio mengajar. Tim kami akan review dan menghubungi kamu untuk interview.",
        },
        {
          q: "Apa saja persyaratan menjadi tutor?",
          a: "IPK minimal 3.5, pengalaman mengajar (formal/informal), komunikasi yang baik, dan menguasai materi yang akan diajarkan.",
        },
        {
          q: "Apakah ada training untuk tutor baru?",
          a: "Ya, semua tutor baru akan mengikuti onboarding training selama 2 minggu untuk memahami platform dan best practices mengajar.",
        },
      ],
    },
    {
      category: "Mengelola Course",
      icon: BookOpen,
      questions: [
        {
          q: "Bagaimana cara membuat course baru?",
          a: "Di Tutor Dashboard, klik 'Create New Course', isi informasi course (judul, deskripsi, materi), dan submit untuk review admin.",
        },
        {
          q: "Berapa lama review course oleh admin?",
          a: "Proses review biasanya 2-3 hari kerja. Kamu akan mendapat notifikasi email jika course disetujui atau perlu revisi.",
        },
        {
          q: "Apakah saya bisa update materi setelah course publish?",
          a: "Ya, kamu bisa update materi kapan saja. Perubahan besar perlu review ulang, sedangkan perubahan kecil langsung terpublikasi.",
        },
        {
          q: "Format file apa saja yang didukung untuk materi?",
          a: "PDF untuk dokumen, MP4 untuk video (max 500MB per file), dan JPG/PNG untuk gambar. Pastikan kualitas file baik.",
        },
      ],
    },
    {
      category: "Live Sessions & Zoom",
      icon: Video,
      questions: [
        {
          q: "Bagaimana cara schedule live session?",
          a: "Di halaman Course Management, pilih 'Schedule Session', masukkan tanggal, waktu, durasi, dan Zoom link. Sistem akan notifikasi students otomatis.",
        },
        {
          q: "Apakah saya perlu Zoom account sendiri?",
          a: "Ya, tutor perlu memiliki Zoom account (gratis atau berbayar) untuk create meeting. Pastikan link meeting valid sebelum schedule.",
        },
        {
          q: "Berapa lama durasi maksimal live session?",
          a: "Disarankan 1-2 jam per session untuk menjaga efektivitas pembelajaran. Kamu bisa schedule multiple sessions untuk materi yang panjang.",
        },
        {
          q: "Bagaimana jika ada technical issue saat live session?",
          a: "Hubungi support melalui WhatsApp +62 812-3456-7890 untuk bantuan real-time. Kami juga menyediakan backup room jika diperlukan.",
        },
      ],
    },
    {
      category: "Kompensasi & Earning",
      icon: CreditCard,
      questions: [
        {
          q: "Bagaimana sistem kompensasi untuk tutor?",
          a: "Tutor menerima gaji tetap bulanan dari platform berdasarkan jumlah students dan rating. Detail kompensasi dibahas saat kontrak.",
        },
        {
          q: "Kapan gaji dibayarkan?",
          a: "Gaji dibayarkan setiap tanggal 1 setiap bulan via transfer bank. Pastikan data rekening kamu sudah terupdate di profil.",
        },
        {
          q: "Apakah ada bonus untuk tutor?",
          a: "Ya, ada bonus untuk rating tinggi (>4.8), jumlah students banyak (>100), dan completion rate tinggi (>80%).",
        },
      ],
    },
  ];

  const currentFAQs = userRole === "student" ? studentFAQs : tutorFAQs;
  const backLink = userRole === "student" ? "/student-dashboard" : "/tutor-dashboard";

  const filteredFAQs = currentFAQs.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (q) =>
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-[#F3F8FA]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#0A1B45] to-[#308279] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link to={backLink}>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Kembali
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Pusat Bantuan</h1>
              <p className="text-white/80 mt-2">
                Temukan jawaban untuk pertanyaan kamu
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <Card className="p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#476074]" />
            <Input
              placeholder="Cari pertanyaan atau topik..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </Card>

        {/* Role Toggle */}
        <Tabs value={userRole} className="mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="student" asChild>
              <Link to="/help-faq?role=student">FAQ Student</Link>
            </TabsTrigger>
            <TabsTrigger value="tutor" asChild>
              <Link to="/help-faq?role=tutor">FAQ Tutor</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* FAQ Categories */}
        <div className="space-y-6">
          {filteredFAQs.map((category, idx) => (
            <Card key={idx} className="overflow-hidden">
              <div className="bg-gradient-to-r from-[#308279]/10 to-[#92B7B0]/10 p-6 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#308279] to-[#0A1B45] flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-[#0A1B45]">{category.category}</h2>
                </div>
              </div>

              <div className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item, qIdx) => (
                    <AccordionItem key={qIdx} value={`item-${idx}-${qIdx}`}>
                      <AccordionTrigger className="text-left hover:text-[#308279]">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-[#476074]">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </Card>
          ))}

          {filteredFAQs.length === 0 && (
            <Card className="p-12 text-center">
              <HelpCircle className="w-16 h-16 text-[#92B7B0] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#0A1B45] mb-2">
                Tidak Ada Hasil
              </h3>
              <p className="text-[#476074]">
                Coba kata kunci lain atau hubungi support kami
              </p>
            </Card>
          )}
        </div>

        {/* Contact Support */}
        <Card className="mt-8 overflow-hidden">
          <div className="bg-gradient-to-r from-[#0A1B45] to-[#308279] p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Masih butuh bantuan?</h3>
            <p className="text-white/80">Hubungi tim support kami untuk bantuan lebih lanjut</p>
          </div>
          <div className="p-6 grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-[#F3F8FA] rounded-lg">
              <div className="w-10 h-10 rounded-full bg-[#308279] flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-[#476074]">Email</div>
                <div className="font-medium text-[#0A1B45] text-sm">support@ta.com</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-[#F3F8FA] rounded-lg">
              <div className="w-10 h-10 rounded-full bg-[#308279] flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-[#476074]">WhatsApp</div>
                <div className="font-medium text-[#0A1B45] text-sm">+62 812-3456-7890</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-[#F3F8FA] rounded-lg">
              <div className="w-10 h-10 rounded-full bg-[#308279] flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-[#476074]">Live Chat</div>
                <div className="font-medium text-[#0A1B45] text-sm">Senin - Jumat 9-17</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
