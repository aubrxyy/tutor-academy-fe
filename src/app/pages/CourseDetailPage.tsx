import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  Star,
  Users,
  Clock,
  Video,
  CheckCircle,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CourseDetailPage() {
  const { courseId } = useParams();

  const course = {
    id: courseId,
    title: "Data Structures & Algorithms",
    subtitle: "Master the fundamentals of DSA for technical interviews and software development",
    tutor: {
      name: "Raka Pratama",
      title: "Computer Science • GPA 3.95",
      avatar: "RP",
      rating: 4.9,
      description:
        "Experienced software engineer with 3+ years of experience and passionate about teaching DSA concepts.",
    },
    rating: 4.9,
    totalReviews: 234,
    students: 450,
    duration: "12 weeks",
    pricing: {
      monthly: 150000,
      discount: 20,
    },
    features: [
      "24 live Zoom sessions",
      "15 PDF materials and cheat sheets",
      "8 practice quizzes",
      "Certificate of completion",
      "Class discussion support",
    ],
    description: `Class ini dirancang khusus untuk mahasiswa BINUS yang ingin menguasai Data Structures & Algorithms dengan pendekatan praktis dan interaktif. Kamu akan belajar langsung dari tutor berpengalaman melalui live Zoom sessions, dengan materi yang disesuaikan untuk persiapan technical interview dan project development.

Setiap sesi live akan mencakup teori, praktik coding, dan diskusi interaktif. Kamu juga akan mendapatkan akses ke materials eksklusif, practice quizzes, dan sertifikat resmi setelah menyelesaikan class ini.`,
    reviews: [
      {
        id: 1,
        student: "Ahmad Wijaya",
        studentInitials: "AW",
        rating: 5,
        date: "2 hari lalu",
        helpful: 24,
        comment:
          "Class terbaik yang pernah saya ikuti! Penjelasan tutor sangat jelas dan materinya sangat aplikatif. Setelah mengikuti class ini, saya berhasil lolos technical interview di startup ternama. Highly recommended!",
      },
      {
        id: 2,
        student: "Siti Nurhaliza",
        studentInitials: "SN",
        rating: 5,
        date: "5 hari lalu",
        helpful: 18,
        comment:
          "Live sessions nya sangat interaktif dan tutor selalu siap menjawab pertanyaan. Worth every penny!",
      },
      {
        id: 3,
        student: "Budi Santoso",
        studentInitials: "BS",
        rating: 4,
        date: "1 minggu lalu",
        helpful: 12,
        comment:
          "Materi bagus dan comprehensive, tapi pace nya agak cepat untuk pemula. Overall still recommended untuk yang serius belajar DSA!",
      },
      {
        id: 4,
        student: "Rina Kusuma",
        studentInitials: "RK",
        rating: 5,
        date: "2 minggu lalu",
        helpful: 31,
        comment:
          "Tutor Raka sangat membantu dan responsive. Saya merasa progress belajar saya sangat cepat setelah join class ini.",
      },
    ],
  };

  const discountedMonthly = course.pricing.monthly * (1 - course.pricing.discount / 100);

  return (
    <div className="min-h-screen bg-[#F3F8FA] font-sans selection:bg-[#308279] selection:text-white">
      <Navbar />

      <div className="relative overflow-hidden border-b border-[#D8E5E9] bg-white pt-12 pb-20">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -right-24 top-0 h-[26rem] w-[26rem] rounded-full bg-gradient-to-b from-[#92B7B0]/18 to-[#308279]/8 blur-[90px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
          <Link to="/marketplace">
            <Button variant="ghost" className="mb-8 font-bold text-[#0A1B45] hover:bg-[#F3F8FA]">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Catalog
            </Button>
          </Link>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-full bg-[#F3F8FA] px-3 py-1 font-bold text-[#0A1B45]">
                  <Star className="h-4 w-4 fill-[#0A1B45] text-[#0A1B45]" />
                  {course.rating} <span className="text-[#476074]">({course.totalReviews})</span>
                </div>
                <Badge className="border-none bg-[#308279] font-bold text-white shadow-sm">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  Bestseller
                </Badge>
              </div>

              <h1 className="mb-6 text-5xl font-black leading-tight text-[#0A1B45] md:text-6xl">
                {course.title}
              </h1>
              <p className="mb-8 max-w-2xl text-xl font-medium leading-relaxed text-[#476074]">
                {course.subtitle}
              </p>

              <div className="mb-8 flex flex-wrap items-center gap-5 text-sm font-semibold text-[#0A1B45]">
                <div className="flex items-center gap-2 rounded-full bg-[#F3F8FA] px-4 py-2">
                  <Users className="h-5 w-5 text-[#308279]" />
                  <span>{course.students} Students</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-[#F3F8FA] px-4 py-2">
                  <Clock className="h-5 w-5 text-[#308279]" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-[#F3F8FA] px-4 py-2">
                  <Video className="h-5 w-5 text-[#308279]" />
                  <span>Zoom Live Sessions</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-[1.75rem] border border-[#D8E5E9] bg-white p-8 shadow-[0_18px_42px_rgba(10,27,69,0.08)]">
                  <h2 className="mb-6 text-3xl font-black uppercase tracking-tight text-[#0A1B45]">
                    About This Class
                  </h2>
                  <div className="space-y-5 text-lg">
                    {course.description.split("\n\n").map((para, idx) => (
                      <p key={idx} className="font-medium leading-relaxed text-[#476074]">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-5 rounded-[1.75rem] border border-[#D8E5E9] bg-[#FCFEFE] p-6 shadow-[0_16px_36px_rgba(10,27,69,0.06)]">
                  <Avatar className="h-16 w-16 border border-[#D8E5E9]">
                    <AvatarFallback className="bg-[#92B7B0] text-2xl font-black text-[#0A1B45]">
                      {course.tutor.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="mb-1 text-xl font-bold text-[#0A1B45]">{course.tutor.name}</div>
                    <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#308279]">
                      {course.tutor.title}
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-[#476074]">
                      {course.tutor.description}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-xs font-bold uppercase tracking-wide text-[#0A1B45]">
                      <span className="flex items-center gap-1 rounded-full bg-[#F3F8FA] px-2.5 py-1">
                        <Star className="h-3 w-3 fill-[#0A1B45] text-[#0A1B45]" />
                        {course.tutor.rating}
                      </span>
                      <span>Verified tutor</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div>
              <div className="sticky top-24 rounded-[1.75rem] border border-[#D8E5E9] bg-white p-8 shadow-[0_24px_54px_rgba(10,27,69,0.08)]">
                <div className="mb-8">
                  {course.pricing.discount > 0 && (
                    <Badge className="mb-4 border-none bg-[#308279] px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-sm">
                      {course.pricing.discount}% off this month
                    </Badge>
                  )}
                  <div className="rounded-[1.25rem] border border-[#D8E5E9] bg-[#F7FAFB] p-5">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#476074]">
                      Monthly access
                    </div>
                    <div className="mt-3 text-sm font-semibold text-[#92B7B0] line-through">
                      Rp {course.pricing.monthly.toLocaleString()}
                    </div>
                    <div className="mt-1 flex items-end gap-2">
                      <span className="text-4xl font-black text-[#0A1B45]">
                        <span className="text-lg">Rp</span> {discountedMonthly.toLocaleString()}
                      </span>
                      <span className="pb-1 text-sm font-semibold text-[#476074]">/ month</span>
                    </div>
                    <p className="mt-3 text-sm leading-5 text-[#476074]">
                      Akses video class, live session schedule, PDF materials, dan quiz selama 30 hari.
                    </p>
                  </div>
                </div>

                <Button className="mb-3 h-14 w-full bg-[#0A1B45] text-base font-bold text-white shadow-sm transition-all hover:bg-[#308279]">
                  Enroll Now
                </Button>
                <Button
                  variant="outline"
                  className="mb-6 h-12 w-full border-[#D8E5E9] bg-white font-semibold text-[#0A1B45] hover:bg-[#F3F8FA]"
                >
                  Preview Materials
                </Button>

                <div className="space-y-3 border-t border-gray-100 pt-6">
                  <div className="mb-4 text-xs font-black uppercase tracking-widest text-[#476074]">
                    Included In This Class
                  </div>
                  {course.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm font-medium text-[#0A1B45]">
                      <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-[#308279]/10">
                        <CheckCircle className="h-3 w-3 text-[#308279]" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <Card className="p-8">
            <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="mb-3 text-3xl font-bold text-[#0A1B45]">Student Reviews</h2>
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 fill-[#308279] text-[#308279]" />
                    ))}
                  </div>
                  <span className="text-3xl font-bold text-[#0A1B45]">{course.rating}</span>
                  <span className="text-[#476074]">({course.totalReviews} reviews)</span>
                </div>
              </div>
              <Link to={`/class/${courseId}/review`}>
                <Button className="h-12 bg-[#308279] hover:bg-[#308279]/90">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Write a Review
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {course.reviews.map((review) => (
                <div key={review.id} className="rounded-lg bg-[#F3F8FA] p-6 transition-all hover:shadow-md">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-br from-[#308279] to-[#0A1B45] text-white">
                          {review.studentInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-bold text-[#0A1B45]">{review.student}</div>
                        <div className="text-sm text-[#476074]">{review.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#308279] text-[#308279]" />
                      ))}
                    </div>
                  </div>
                  <p className="mb-4 leading-relaxed text-[#476074]">{review.comment}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <button className="flex items-center gap-1 text-[#476074] transition-colors hover:text-[#308279]">
                      <CheckCircle className="h-4 w-4" />
                      Helpful ({review.helpful})
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button variant="outline" className="border-[#308279] text-[#308279]">
                Load More Reviews
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
