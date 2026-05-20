import {
  BookOpen, CreditCard,
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  Search,
  Shield,
  Sparkles,
  Users,
  Video
} from "lucide-react";
import { motion, type Variants } from "motion/react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/navigation/Navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";

export default function HelpFAQPage() {
  const [searchParams] = useSearchParams();
  const userRole = searchParams.get("role") || "student";
  const [searchQuery, setSearchQuery] = useState("");

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", bounce: 0.25, duration: 0.85 },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

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
      category: "Class & Pembelajaran",
      icon: BookOpen,
      questions: [
        {
          q: "Bagaimana cara mendaftar class?",
          a: "Kunjungi halaman Marketplace, buka course yang diinginkan, pilih batch yang masih terbuka, lalu selesaikan pembayaran. Batch yang berhasil kamu ambil akan muncul di dashboard.",
        },
        {
          q: "Apakah class memiliki batas waktu akses?",
          a: "Ya. Setiap batch berjalan dalam periode tertentu, misalnya 3 bulan. Selama batch aktif, kamu mengikuti cohort yang sama dari awal sampai akhir pembelajaran.",
        },
        {
          q: "Bagaimana cara mengikuti live session?",
          a: "Buka classroom batch kamu, lihat jadwal pertemuan yang tersedia, lalu klik 'Join' pada sesi yang sedang berlangsung. Jika tutor menambahkan link Zoom, kamu akan diarahkan ke meeting tersebut.",
        },
        {
          q: "Apakah saya bisa download materi class?",
          a: "Ya, semua PDF dan materi pendukung dapat didownload. Video class dapat ditonton secara streaming tetapi tidak bisa didownload untuk menjaga kualitas konten.",
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
          a: "Sistem akan mengirimkan notifikasi 7 hari sebelum subscription berakhir. Klik link di notifikasi atau kunjungi halaman class dan pilih 'Renew Subscription'.",
        },
        {
          q: "Apakah ada refund policy?",
          a: "Refund dapat dilakukan dalam 7 hari pertama jika kamu belum mengakses lebih dari 20% materi class. Hubungi support untuk proses refund.",
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
      category: "Live Session & Materi Tutor",
      icon: BookOpen,
      questions: [
        {
          q: "Apakah tutor bisa membuat class baru?",
          a: "Tidak. Pembuatan class dilakukan admin. Tutor akan menerima class yang sudah aktif lalu mengelola live Zoom session dan materi dokumen di dalamnya.",
        },
        {
          q: "Siapa yang mengunggah video pembelajaran?",
          a: "Video lesson diunggah dan diatur oleh admin melalui class editor. Tutor fokus pada pengajaran sinkron dan dokumen pendukung.",
        },
        {
          q: "Apakah saya bisa update materi setelah class publish?",
          a: "Ya. Tutor bisa memperbarui materi PDF atau dokumen kapan saja dari tutor dashboard. Admin tetap bisa meninjau kelengkapan materi pada panel class.",
        },
        {
          q: "Format file apa saja yang didukung untuk materi?",
          a: "PDF, DOCX, dan file presentasi untuk dokumen belajar. Upload video lesson dilakukan admin, bukan tutor.",
        },
      ],
    },
    {
      category: "Live Sessions & Zoom",
      icon: Video,
      questions: [
        {
          q: "Bagaimana cara menambahkan pertemuan batch?",
          a: "Di Tutor Dashboard, buka menu 'Pertemuan', lalu isi judul pertemuan, kelas/batch, jam mulai-selesai, topik, absensi, dan link Zoom jika ada.",
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
          a: "Kompensasi tutor dihitung per sesi/pertemuan yang selesai diajar. Rekap absensi dan status pertemuan akan dipakai sebagai dasar perhitungan financial analytics dan payroll.",
        },
        {
          q: "Kapan gaji dibayarkan?",
          a: "Jadwal pembayaran payroll akan mengikuti rekap sesi yang selesai di periode berjalan. Detail tanggal final masih akan mengikuti kebijakan finance platform.",
        },
        {
          q: "Apakah ada bonus untuk tutor?",
          a: "Ya, ada bonus untuk rating tinggi (>4.8), jumlah students banyak (>100), dan completion rate tinggi (>80%).",
        },
      ],
    },
  ];

  const currentFAQs = userRole === "student" ? studentFAQs : tutorFAQs;

  const filteredFAQs = currentFAQs.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (q) =>
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.questions.length > 0);

  const roleSummary =
    userRole === "student"
      ? "Jawaban cepat untuk course, batch, pembayaran, quiz, sertifikat, dan focus mode."
      : "Panduan tutor untuk pertemuan batch, materi dokumen, dan operasional kelas yang dikelola admin.";

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F8FBFB_0%,#F3F8FA_38%,#F3F8FA_100%)]">
      <Navbar />

      <section className="relative overflow-hidden pb-10 pt-32">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D8E5E9] to-transparent" />

        <motion.div
          className="relative z-10 mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUpVariants} className="rounded-3xl border border-[#D8E5E9] bg-white p-6 shadow-[0_20px_52px_rgba(10,27,69,0.08)] sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EBF3F1] px-4 py-2 text-sm font-medium text-[#308279]">
              <Sparkles className="h-4 w-4" />
              {userRole === "student" ? "Student Help Desk" : "Tutor Help Desk"}
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-[-0.04em] text-[#0A1B45] sm:text-5xl">
              Pusat Bantuan
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#476074] sm:text-lg">
              {roleSummary}
            </p>

            <Tabs value={userRole} className="mt-8">
              <TabsList className="grid w-full max-w-md grid-cols-2 rounded-2xl bg-[#F3F8FA] p-1">
                <TabsTrigger value="student" asChild className="rounded-xl">
                  <Link to="/help-faq?role=student">FAQ Student</Link>
                </TabsTrigger>
                <TabsTrigger value="tutor" asChild className="rounded-xl">
                  <Link to="/help-faq?role=tutor">FAQ Tutor</Link>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          <motion.div variants={fadeUpVariants}>
          <Card className="rounded-3xl border border-[#D9E6EA] bg-white p-5 shadow-[0_18px_42px_rgba(10,27,69,0.06)] sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0A1B45] to-[#308279] text-white">
                <HelpCircle className="h-6 w-6" />
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#308279]">
                  Search help
                </div>
                <div className="text-lg font-bold text-[#0A1B45]">Find an answer fast</div>
              </div>
            </div>

            <div className="relative mt-6">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#476074]" />
              <Input
                placeholder="Cari pertanyaan atau topik..."
                className="h-12 rounded-xl border-[#D9E6EA] pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-[#F8FBFB] p-4">
                <div className="text-sm font-semibold text-[#0A1B45]">Topik aktif</div>
                <div className="mt-1 text-sm text-[#476074]">
                  {userRole === "student" ? "Class access, payment, certificate" : "Scheduling, materials, tutor ops"}
                </div>
              </div>
              <div className="rounded-2xl bg-[#F8FBFB] p-4">
                <div className="text-sm font-semibold text-[#0A1B45]">Support hours</div>
                <div className="mt-1 text-sm text-[#476074]">Senin - Jumat, 09.00 - 17.00 WIB</div>
              </div>
            </div>
          </Card>
          </motion.div>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-16 sm:px-6 lg:px-8">
        <motion.div
          className="space-y-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
        >
          <motion.div variants={fadeUpVariants}>
          <Card className="rounded-[1.75rem] border-[#D9E6EA] bg-white p-6 shadow-[0_18px_40px_rgba(10,27,69,0.05)]">
            <div className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#308279]">
              Frequently asked topics
            </div>
            <h2 className="text-2xl font-bold text-[#0A1B45]">
              {userRole === "student" ? "Jawaban untuk perjalanan belajarmu" : "Jawaban untuk alur kerja tutor"}
            </h2>
          </Card>
          </motion.div>

          {filteredFAQs.map((category, idx) => (
            <motion.div key={idx} variants={fadeUpVariants}>
            <Card className="overflow-hidden rounded-[1.75rem] border-[#D9E6EA] shadow-[0_18px_40px_rgba(10,27,69,0.05)]">
              <div className="border-b border-[#E3ECEF] bg-gradient-to-r from-[#F8FBFB] to-white p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#308279] to-[#0A1B45]">
                    <category.icon className="h-6 w-6 text-white" />
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
            </motion.div>
          ))}

          {filteredFAQs.length === 0 && (
            <motion.div variants={fadeUpVariants}>
            <Card className="rounded-[1.75rem] border-[#D9E6EA] p-12 text-center">
              <HelpCircle className="w-16 h-16 text-[#92B7B0] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#0A1B45] mb-2">
                Tidak Ada Hasil
              </h3>
              <p className="text-[#476074]">
                Coba kata kunci lain atau hubungi support kami
              </p>
            </Card>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
        <Card className="mt-8 overflow-hidden rounded-[1.75rem] border-[#D9E6EA] shadow-[0_18px_40px_rgba(10,27,69,0.05)]">
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
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
