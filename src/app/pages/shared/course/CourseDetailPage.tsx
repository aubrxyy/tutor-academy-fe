import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  Calendar,
  Star,
  Users,
  Clock,
  Video,
  CheckCircle,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import Navbar from "../../../components/navigation/Navbar";
import Footer from "../../../components/layout/Footer";
import { useCourseDetail } from "../../../api/courses";
import { useCourseReviews } from "../../../api/reviews";
import { getMockBatchesForCourse } from "../../../data/batches";

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const { course, loading, error, refetch } = useCourseDetail(courseId);
  const { data: reviewsData, loading: isReviewsLoading } = useCourseReviews(courseId);
  const reviews = reviewsData?.reviews?.nodes ?? [];
  const reviewCount = reviews.length;
  const averageRating =
    reviewCount > 0
      ? reviews.reduce((total, review) => total + review.rating, 0) / reviewCount
      : course?.rating ?? 0;
  const displayRating = averageRating.toFixed(1);

  if (loading && !course) {
    return (
      <div className="min-h-screen bg-[#F3F8FA] font-sans">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 pt-32 sm:px-6 lg:px-8">
          <div className="h-[34rem] animate-pulse rounded-[2rem] bg-white" />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F3F8FA] font-sans">
        <Navbar />
        <main className="mx-auto max-w-2xl px-4 pt-32 text-center sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#F3B7B7] bg-white p-10 shadow-sm">
            <h1 className="text-3xl font-bold text-[#0A1B45]">Unable to load class</h1>
            <p className="mt-3 text-[#476074]">{error.message}</p>
            <Button className="mt-6 bg-[#0A1B45] text-white hover:bg-[#308279]" onClick={() => refetch()}>
              Try again
            </Button>
          </div>
        </main>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#F3F8FA] font-sans">
        <Navbar />
        <main className="mx-auto max-w-2xl px-4 pt-32 text-center sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#D8E5E9] bg-white p-10 shadow-sm">
            <h1 className="text-3xl font-bold text-[#0A1B45]">Class not found</h1>
            <p className="mt-3 text-[#476074]">
              The backend did not return a class for this route.
            </p>
            <Link to="/marketplace">
              <Button className="mt-6 bg-[#0A1B45] text-white hover:bg-[#308279]">
                Back to catalog
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const discountedMonthly =
    course.pricing.monthly * (1 - course.pricing.discount / 100);
  const tutor = {
    name: course.tutor,
    title: `${course.major} mentor`,
    avatar: "TA",
    rating: displayRating,
    description:
      "Tutor assignment details are not exposed by the current course schema yet.",
  };
  const batches = getMockBatchesForCourse(courseId, tutor.name, discountedMonthly);

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
                  {displayRating} <span className="text-[#476074]">({reviewCount})</span>
                </div>
                {course.featured ? (
                  <Badge className="border-none bg-[#308279] font-bold text-white shadow-sm">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    Advanced
                  </Badge>
                ) : null}
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
                  <span>{course.major}</span>
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
                      {tutor.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="mb-1 text-xl font-bold text-[#0A1B45]">{tutor.name}</div>
                    <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#308279]">
                      {tutor.title}
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-[#476074]">
                      {tutor.description}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-xs font-bold uppercase tracking-wide text-[#0A1B45]">
                      <span className="flex items-center gap-1 rounded-full bg-[#F3F8FA] px-2.5 py-1">
                        <Star className="h-3 w-3 fill-[#0A1B45] text-[#0A1B45]" />
                        {tutor.rating}
                      </span>
                      <span>Verified tutor</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="sticky top-24 rounded-[1.75rem] border border-[#D8E5E9] bg-white p-8 shadow-[0_24px_54px_rgba(10,27,69,0.08)]">
                <div className="mb-6 rounded-[1.25rem] border border-[#D8E5E9] bg-[#F7FAFB] p-5">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#476074]">
                    Cohort-based enrollment
                  </div>
                  <div className="mt-2 text-2xl font-black text-[#0A1B45]">
                    Pilih batch untuk ikut course ini
                  </div>
                  <p className="mt-3 text-sm leading-5 text-[#476074]">
                    Setiap course dibuka dalam beberapa batch. Kamu akan belajar bersama cohort
                    yang sama dari awal sampai akhir periode.
                  </p>
                </div>

                <div className="mb-6 space-y-4">
                  {batches.map((batch) => (
                    <div
                      key={batch.id}
                      className="rounded-[1.25rem] border border-[#D8E5E9] bg-white p-5 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-lg font-bold text-[#0A1B45]">{batch.name}</div>
                          <div className="mt-1 text-sm text-[#476074]">{batch.periodLabel}</div>
                        </div>
                        <Badge className="border-0 bg-[#308279]/10 text-[#1F6D66]">
                          {batch.seatsLeft}/{batch.totalSeats} seats
                        </Badge>
                      </div>
                      <div className="mt-4 space-y-2 text-sm text-[#476074]">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#308279]" />
                          <span>Daftar sebelum {batch.enrollmentDeadline}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-[#308279]" />
                          <span>{batch.sessionPattern}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-[#308279]" />
                          <span>Tutor batch: {batch.tutorName}</span>
                        </div>
                      </div>
                      <div className="mt-5 flex items-center justify-between gap-3">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#476074]">
                            Batch fee
                          </div>
                          <div className="text-xl font-black text-[#0A1B45]">{batch.priceLabel}</div>
                        </div>
                        <Link to={`/classroom/${courseId}?batch=${batch.id}`}>
                          <Button className="bg-[#0A1B45] text-white hover:bg-[#308279]">
                            Pilih Batch
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-gray-100 pt-6">
                  <div className="mb-4 text-xs font-black uppercase tracking-widest text-[#476074]">
                    Included In This Course
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
                  <span className="text-3xl font-bold text-[#0A1B45]">{displayRating}</span>
                  <span className="text-[#476074]">
                    {isReviewsLoading ? "Loading reviews..." : `(${reviewCount} reviews)`}
                  </span>
                </div>
              </div>
              <Link to={`/class/${courseId}/review`}>
                <Button className="h-12 bg-[#308279] hover:bg-[#308279]/90">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Write a Review
                </Button>
              </Link>
            </div>

            {reviewCount === 0 ? (
              <div className="rounded-lg bg-[#F3F8FA] p-6 text-center">
                <p className="font-medium text-[#476074]">
                  No reviews yet. Be the first student to share feedback for this class.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.slice(0, 5).map((review) => (
                  <div
                    key={review.id}
                    className="rounded-2xl border border-[#D8E5E9] bg-[#F9FCFD] p-5"
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating
                                ? "fill-[#308279] text-[#308279]"
                                : "text-[#C7DCE0]"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#476074]">
                        Student review
                      </span>
                    </div>
                    <p className="text-sm leading-6 text-[#476074]">
                      {review.comment || "No written comment provided."}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
