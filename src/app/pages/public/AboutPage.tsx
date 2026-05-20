import { Link } from "react-router";
import {
  BookOpen,
  GraduationCap,
  Handshake,
  LibraryBig,
  Sparkles,
  Users,
} from "lucide-react";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/navigation/Navbar";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";

const focusAreas = [
  {
    icon: Users,
    title: "Sesi tutoring online",
    description:
      "Menghubungkan mahasiswa dengan tutor sebaya agar materi akademik dapat dipahami dengan lebih terarah.",
  },
  {
    icon: LibraryBig,
    title: "Produk belajar digital",
    description:
      "Menyediakan materi pembelajaran digital yang membantu mahasiswa mengulang konsep penting di luar kelas reguler.",
  },
  {
    icon: Handshake,
    title: "Dukungan akademik antar mahasiswa",
    description:
      "Membangun ruang belajar yang memungkinkan mahasiswa saling membantu, berdiskusi, dan berkembang bersama.",
  },
];

const founders = [
  {
    name: "Matthew Anugrah Siahaan",
    role: "Founder",
    initials: "MS",
  },
  {
    name: "Althaf Faizulhaq Aleyandra",
    role: "Co-Founder",
    initials: "AA",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F3F8FA] selection:bg-[#308279] selection:text-white">
      <Navbar />

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-[#071735] via-[#0A1B45] to-[#308279] px-4 pb-16 pt-32 text-white sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/15" />
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.65fr)] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90">
                  <GraduationCap className="h-4 w-4 text-[#92B7B0]" />
                  Ekosistem belajar mahasiswa
                </div>
                <h1 className="mt-8 max-w-4xl text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                  About Tutoring Academy
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-white/80 sm:text-lg">
                  Tutoring Academy adalah EdTech LMS untuk sesi tutoring online dan
                  produk pembelajaran digital. Platform ini membantu mahasiswa mendapatkan
                  dukungan akademik sekaligus memberi ruang bagi mahasiswa yang mampu
                  mengajar untuk berkembang sebagai tutor.
                </p>
                <div className="mt-8">
                  <Link to="/marketplace">
                    <Button className="bg-white text-[#0A1B45] hover:bg-[#F3F8FA]">
                      Explore Classes
                    </Button>
                  </Link>
                </div>
              </div>

              <Card className="border-white/15 bg-white/10 p-6 text-white shadow-[0_24px_60px_rgba(10,27,69,0.18)]">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#308279]">
                    <Sparkles className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="text-4xl font-bold tracking-[-0.04em]">300+</div>
                    <div className="text-sm font-medium text-white/75">
                      Students Served
                    </div>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-7 text-white/75">
                  Pencapaian ini dibangun melalui sesi tutoring online dan produk belajar
                  digital yang dirancang untuk kebutuhan mahasiswa.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#308279]">
                  Company identity
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[#0A1B45]">
                  Platform belajar yang menempatkan mahasiswa sebagai learner dan tutor.
                </h2>
              </div>
              <Card className="bg-white p-6 sm:p-8">
                <p className="text-base leading-8 text-[#476074]">
                  Tutoring Academy berfokus membangun ekosistem belajar tempat mahasiswa
                  dapat menjadi peserta belajar sekaligus tutor. Platform ini bukan hanya
                  ruang untuk menemukan layanan tutoring atau produk pembelajaran digital,
                  tetapi juga tempat mahasiswa melatih kemampuan mengajar, berbagi
                  pemahaman, dan belajar bersama secara lebih terstruktur.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6 sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF6F4] text-[#308279]">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h2 className="mt-6 text-2xl font-bold text-[#0A1B45]">
                  Mengapa Tutoring Academy dibuat
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#476074] sm:text-base">
                  Banyak mahasiswa kesulitan memahami materi kuliah jika hanya
                  mengandalkan kelas reguler. Di saat yang sama, mahasiswa yang memiliki
                  kemampuan mengajar sering tidak memiliki ruang yang tepat untuk
                  bertumbuh sebagai tutor.
                </p>
              </Card>

              <Card className="p-6 sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF3F5] text-[#0A1B45]">
                  <Users className="h-6 w-6" />
                </div>
                <h2 className="mt-6 text-2xl font-bold text-[#0A1B45]">
                  Masalah yang ingin diselesaikan
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#476074] sm:text-base">
                  Tutoring Academy hadir untuk menghubungkan mahasiswa, tutor, kelas
                  online, dan materi belajar digital dalam satu platform agar proses
                  belajar terasa lebih dekat, praktis, dan relevan dengan kebutuhan
                  akademik mahasiswa.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#308279]">
                What we do
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[#0A1B45]">
                Dukungan belajar yang dirancang untuk kebutuhan mahasiswa.
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {focusAreas.map((item) => (
                <Card
                  key={item.title}
                  className="p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#308279]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#308279] to-[#0A1B45] text-white">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-[#0A1B45]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#476074]">
                    {item.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Card className="overflow-hidden">
              <div className="grid lg:grid-cols-[0.7fr_1.3fr]">
                <div className="bg-gradient-to-br from-[#0A1B45] to-[#308279] p-8 text-white sm:p-10">
                  <div className="text-5xl font-bold tracking-[-0.04em]">300+</div>
                  <div className="mt-3 text-lg font-semibold">Students Served</div>
                </div>
                <div className="p-8 sm:p-10">
                  <h2 className="text-2xl font-bold text-[#0A1B45]">
                    Dampak saat ini
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-8 text-[#476074]">
                    Tutoring Academy telah melayani lebih dari 300 mahasiswa melalui
                    pendekatan utama berupa sesi tutoring online dan produk pembelajaran
                    digital.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#308279]">
                Founders
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[#0A1B45]">
                Dibangun oleh mahasiswa untuk mahasiswa.
              </h2>
            </div>
            <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
              {founders.map((founder) => (
                <Card key={founder.name} className="p-6 text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-[#308279] to-[#0A1B45] text-2xl font-bold text-white">
                    {founder.initials}
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-[#0A1B45]">
                    {founder.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-[#308279]">
                    {founder.role}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0A1B45] px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#92B7B0]">
              Founders' vision
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
              Menjadi ekosistem belajar terpercaya untuk mahasiswa.
            </h2>
            <p className="mx-auto mt-6 max-w-4xl text-base leading-8 text-white/78 sm:text-lg">
              Para founder ingin Tutoring Academy menjadi ekosistem belajar yang
              membantu mahasiswa menemukan dukungan akademik, mengakses materi belajar
              yang lebih terstruktur, mengikuti sesi tutoring, dan memberi ruang bagi
              mahasiswa yang mampu mengajar untuk berkembang sebagai tutor.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
