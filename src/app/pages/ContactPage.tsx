import { Mail, Phone, MessageCircle, MapPin, Clock, Send } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "support@tutoringacademy.com",
      description: "Kami akan merespons dalam 24 jam",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+62 812-3456-7890",
      description: "Senin - Jumat, 9:00 - 17:00 WIB",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "+62 812-3456-7890",
      description: "Fast response untuk urgent inquiries",
    },
    {
      icon: MapPin,
      title: "Office",
      value: "BINUS University Alam Sutera",
      description: "Jl. Jalur Sutera Barat, Tangerang",
    },
  ];

  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "Bagaimana cara mendaftar di Tutoring Academy?",
          a: "Klik tombol 'Sign Up' di homepage, isi data diri kamu dengan email BINUS, verifikasi email, dan akun kamu siap digunakan!",
        },
        {
          q: "Apakah platform ini resmi dari BINUS?",
          a: "Tutoring Academy adalah platform independent yang dibuat oleh dan untuk mahasiswa BINUS. Kami berkolaborasi dengan berbagai student organization di BINUS.",
        },
        {
          q: "Apakah ada biaya pendaftaran?",
          a: "Tidak ada biaya pendaftaran. Kamu hanya perlu membayar untuk class yang ingin kamu ikuti dengan sistem subscription.",
        },
      ],
    },
    {
      category: "Payment & Subscription",
      questions: [
        {
          q: "Metode pembayaran apa saja yang tersedia?",
          a: "Kami menerima Gopay, OVO, Dana, Transfer Bank (BCA, Mandiri, BNI), dan Kartu Kredit/Debit via Midtrans.",
        },
        {
          q: "Apakah subscription bisa di-cancel?",
          a: "Ya, kamu bisa cancel subscription kapan saja. Akses class akan tetap berlaku sampai akhir periode subscription yang sudah dibayar.",
        },
        {
          q: "Bagaimana cara mendapatkan refund?",
          a: "Refund bisa dilakukan dalam 7 hari pertama jika belum mengakses lebih dari 20% materi. Hubungi support untuk proses refund.",
        },
      ],
    },
    {
      category: "Classes & Learning",
      questions: [
        {
          q: "Berapa lama akses class berlaku?",
          a: "Monthly subscription berlaku 30 hari, annual subscription 365 hari. Kamu bisa perpanjang setelah periode berakhir.",
        },
        {
          q: "Apakah bisa akses class offline?",
          a: "PDF materials bisa didownload untuk akses offline. Video class hanya bisa streaming online untuk menjaga kualitas konten.",
        },
        {
          q: "Bagaimana jika tidak bisa join live session?",
          a: "Recording session akan tersedia 24 jam setelah session berakhir. Kamu tetap bisa belajar dari recording.",
        },
      ],
    },
    {
      category: "Technical Support",
      questions: [
        {
          q: "Website tidak bisa dibuka / error?",
          a: "Coba clear browser cache, gunakan browser lain, atau hubungi support dengan screenshot error yang kamu alami.",
        },
        {
          q: "Video tidak bisa diputar?",
          a: "Pastikan koneksi internet stabil (min 5 Mbps). Coba gunakan browser lain atau update browser ke versi terbaru.",
        },
        {
          q: "Lupa password, bagaimana reset?",
          a: "Klik 'Forgot Password' di login page, masukkan email BINUS kamu, dan ikuti instruksi reset password via email.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F3F8FA]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0A1B45] to-[#308279] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Ada pertanyaan? Tim kami siap membantu kamu!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-all text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#308279] to-[#0A1B45] flex items-center justify-center mx-auto mb-4">
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg text-[#0A1B45] mb-2">{method.title}</h3>
                <p className="text-[#308279] font-medium mb-2">{method.value}</p>
                <p className="text-sm text-[#476074]">{method.description}</p>
              </Card>
            ))}
          </div>

          {/* Contact Form & Office Hours */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-[#0A1B45] mb-6">Send us a Message</h2>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your.email@binus.ac.id" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What is this about?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell us more..." rows={6} />
                </div>
                <Button className="w-full bg-[#308279] hover:bg-[#308279]/90">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Office Hours & Info */}
            <div className="space-y-6">
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#308279] to-[#0A1B45] flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#0A1B45]">Office Hours</h3>
                    <p className="text-sm text-[#476074]">When you can reach us</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-[#476074]">Monday - Friday</span>
                    <span className="font-medium text-[#0A1B45]">9:00 - 17:00 WIB</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-[#476074]">Saturday</span>
                    <span className="font-medium text-[#0A1B45]">10:00 - 14:00 WIB</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#476074]">Sunday</span>
                    <span className="font-medium text-[#476074]">Closed</span>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-[#308279] to-[#0A1B45] text-white">
                <h3 className="font-bold text-xl mb-4">Need Immediate Help?</h3>
                <p className="text-white/90 mb-6">
                  For urgent technical issues or support during live sessions, contact us via WhatsApp for fastest response.
                </p>
                <Button className="w-full bg-white text-[#308279] hover:bg-white/90">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Us
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0A1B45] mb-4">Frequently Asked Questions</h2>
            <p className="text-[#476074]">Temukan jawaban cepat untuk pertanyaan umum</p>
          </div>

          <div className="space-y-6">
            {faqs.map((category, catIdx) => (
              <Card key={catIdx} className="overflow-hidden">
                <div className="bg-gradient-to-r from-[#308279]/10 to-[#92B7B0]/10 p-6 border-b">
                  <h3 className="text-xl font-bold text-[#0A1B45]">{category.category}</h3>
                </div>
                <div className="p-6">
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, qIdx) => (
                      <AccordionItem key={qIdx} value={`item-${catIdx}-${qIdx}`}>
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
          </div>
        </div>
      </section>

      {/* Map Section (Optional) */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden">
            <div className="h-96 bg-[#F3F8FA] flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-[#308279] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#0A1B45] mb-2">Visit Our Office</h3>
                <p className="text-[#476074]">BINUS University Alam Sutera Campus</p>
                <p className="text-[#476074]">Jl. Jalur Sutera Barat, Tangerang 15143</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
