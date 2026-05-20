import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  GraduationCap,
  Star,
  TrendingUp,
  Users,
  Video
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router";
import { useCourseDetail } from "../../../api/courses";
import { useCourseReviews } from "../../../api/reviews";
import Footer from "../../../components/layout/Footer";
import Navbar from "../../../components/navigation/Navbar";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { getCoursePackagesForDetail } from "../../../data/batches";

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const { course, loading, error, refetch } = useCourseDetail(courseId);
  const { data: reviewsData, loading: isReviewsLoading } = useCourseReviews(courseId);
  const [selectedBatchByPackage, setSelectedBatchByPackage] = useState<Record<string, string>>({});
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

  const packages = getCoursePackagesForDetail({
    courseId,
    alaCartePrice: course.pricing.alaCarte,
    tutorPackagePrice: course.pricing.tutorPackage,
    isFree: course.pricing.monthly <= 0,
  });

  return (
    <div className="min-h-screen bg-[#F3F8FA] font-sans selection:bg-[#308279] selection:text-white">
      <Navbar />

      <div className="relative overflow-hidden border-b border-[#D8E5E9] bg-white pb-20 pt-12">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D8E5E9] to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
          <Link to="/marketplace">
            <Button variant="ghost" className="mb-8 font-bold text-[#0A1B45] hover:bg-[#F3F8FA]">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Catalog
            </Button>
          </Link>

          <div className="space-y-8">
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
              <p className="mb-8 max-w-3xl text-xl font-medium leading-relaxed text-[#476074]">
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
                  <GraduationCap className="h-5 w-5 text-[#308279]" />
                  <span>{course.major}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-[#D8E5E9] bg-white p-8 shadow-[0_24px_54px_rgba(10,27,69,0.08)]">
              <div className="mb-6 rounded-[1.25rem] border border-[#D8E5E9] bg-[#F7FAFB] p-5">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#476074]">
                  Enrollment packages
                </div>
                <div className="mt-2 text-2xl font-black text-[#0A1B45]">
                  Pilih package enrollment
                </div>
                <p className="mt-3 text-sm leading-5 text-[#476074]">
                  Pilih ala carte untuk akses video saja atau article saja. Bundle menggabungkan
                  video dan article, sementara package live session menambahkan tutor dan wajib
                  memilih batch.
                </p>
              </div>

              <div className="grid gap-5 xl:grid-cols-2">
                {packages.map((pkg) => {
                  const selectedBatch =
                    pkg.batches.find((batch) => batch.id === selectedBatchByPackage[pkg.id]) ??
                    pkg.batches[0] ??
                    null;

                  return (
                    <div
                      key={pkg.id}
                      className="rounded-[1.25rem] border border-[#D8E5E9] bg-white p-5 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-lg font-bold text-[#0A1B45]">{pkg.name}</div>
                          <div className="mt-1 text-sm text-[#476074]">{pkg.description}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#476074]">
                            Package fee
                          </div>
                          <div className="text-2xl font-black text-[#0A1B45]">{pkg.priceLabel}</div>
                        </div>
                      </div>

                      <div className="mt-4 space-y-3">
                        {pkg.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3 text-sm font-medium text-[#0A1B45]">
                            <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-[#308279]/10">
                              <CheckCircle className="h-3 w-3 text-[#308279]" />
                            </div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {!pkg.requiresBatch ? (
                        <div className="mt-5 border-t border-[#E5EEF1] pt-5">
                          <div className="rounded-[1rem] border border-[#D8E5E9] bg-[#FCFEFE] p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="text-base font-bold text-[#0A1B45]">
                                  Self-paced access
                                </div>
                                <div className="mt-1 text-sm text-[#476074]">
                                  No batch needed. Students can start this package right after
                                  enrollment.
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 space-y-2 text-sm text-[#476074]">
                              <div className="flex items-center gap-2">
                                <Video className="h-4 w-4 text-[#308279]" />
                                <span>{pkg.accessLabel}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-[#308279]" />
                                <span>Learn on your own schedule</span>
                              </div>
                            </div>
                            <div className="mt-5 flex items-center justify-between gap-3">
                              <Link to={`/classroom/${courseId}?package=${pkg.id}`}>
                                <Button className="bg-[#0A1B45] text-white hover:bg-[#308279]">
                                  <ArrowRight className="ml-2 h-4 w-4" /> Choose Package
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ) : selectedBatch ? (
                        <div className="mt-5 border-t border-[#E5EEF1] pt-5">
                          <div className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#476074]">
                            Choose batch
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {pkg.batches.map((batch) => {
                              const isActive = batch.id === selectedBatch.id;

                              return (
                                <button
                                  key={batch.id}
                                  type="button"
                                  onClick={() =>
                                    setSelectedBatchByPackage((current) => ({
                                      ...current,
                                      [pkg.id]: batch.id,
                                    }))
                                  }
                                  className={`rounded-xl border px-3 py-2 text-sm font-semibold cursor-pointer transition ${
                                    isActive
                                      ? "border-[#308279] bg-[#308279] text-white"
                                      : "border-[#D8E5E9] bg-[#F9FCFD] text-[#476074] hover:border-[#A8C6C0] hover:bg-white hover:text-[#0A1B45]"
                                  }`}
                                >
                                  {batch.batchCode}
                                </button>
                              );
                            })}
                          </div>

                          <div className="mt-4 rounded-[1rem] border border-[#D8E5E9] bg-[#FCFEFE] p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="text-base font-bold text-[#0A1B45]">{selectedBatch.name}</div>
                                <div className="mt-1 text-sm text-[#476074]">{selectedBatch.periodLabel}</div>
                              </div>
                              <Badge className="border-0 bg-[#308279]/10 text-[#1F6D66]">
                                {selectedBatch.seatsLeft}/{selectedBatch.totalSeats} seats
                              </Badge>
                            </div>
                            <div className="mt-4 space-y-2 text-sm text-[#476074]">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-[#308279]" />
                                <span>Enroll before {selectedBatch.enrollmentDeadline}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-[#308279]" />
                                <span>{selectedBatch.intakeWindow}</span>
                              </div>
                            </div>
                            <div className="mt-5 flex items-center justify-between gap-3">
                              <Link to={`/classroom/${courseId}?package=${pkg.id}&batch=${selectedBatch.id}`}>
                                <Button className="bg-[#0A1B45] text-white hover:bg-[#308279]">
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                  Choose Batch
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="gap-6 lg:items-start">
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

                <div className="rounded-[1.75rem] border border-[#D8E5E9] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFD_100%)] p-8 shadow-[0_18px_42px_rgba(10,27,69,0.08)]">
                  <div className="flex flex-col gap-3 border-b border-[#E5EEF1] pb-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <div className="text-xs font-black uppercase tracking-widest text-[#476074]">
                        Included In This Course
                      </div>
                      <h3 className="mt-2 text-2xl font-black text-[#0A1B45]">
                        What you get when you enroll
                      </h3>
                    </div>
                    <p className="max-w-xl text-sm leading-6 text-[#476074]">
                      Everything below is included in the package structure for this class, arranged
                      to support both self-paced study and tutor-guided learning.
                    </p>
                  </div>

                  <div className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                    {course.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 border-b border-[#EEF4F6] pb-4 text-sm font-medium text-[#0A1B45] last:border-b-0"
                      >
                        <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#308279]/10">
                          <CheckCircle className="h-3.5 w-3.5 text-[#308279]" />
                        </div>
                        <span className="leading-6">{feature}</span>
                      </div>
                    ))}
                  </div>
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
