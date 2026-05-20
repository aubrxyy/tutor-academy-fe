export interface CourseBatchView {
  id: string;
  batchCode: string;
  name: string;
  periodLabel: string;
  enrollmentDeadline: string;
  sessionPattern: string;
  seatsLeft: number;
  totalSeats: number;
  tutorName: string;
  priceLabel: string;
  admissionStatus: "Pending Review" | "Approved" | "Closed";
  intakeWindow: string;
}

export interface CoursePackageBatchView {
  id: string;
  batchCode: string;
  name: string;
  periodLabel: string;
  enrollmentDeadline: string;
  seatsLeft: number;
  totalSeats: number;
  admissionStatus: "Pending Review" | "Approved" | "Closed";
  intakeWindow: string;
}

export interface CoursePackageDetailView {
  id: "video-only" | "article-only" | "video-article" | "video-article-live";
  name: string;
  description: string;
  priceLabel: string;
  accessLabel: string;
  features: string[];
  requiresBatch: boolean;
  batches: CoursePackageBatchView[];
}

function formatPrice(price: number) {
  if (price <= 0) {
    return "Free";
  }

  return `Rp ${price.toLocaleString("id-ID")}`;
}

function formatDateLabel(value: Date) {
  return value.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function addDays(base: Date, days: number) {
  const next = new Date(base);
  next.setDate(base.getDate() + days);
  return next;
}

function buildWeeklyBatches(args: {
  courseId: string | undefined;
  packagePrefix: "A" | "T" | "L";
  packageName: string;
  seats: number;
  baseOffsetDays: number;
}): CoursePackageBatchView[] {
  const baseId = args.courseId ?? "course";
  const startDate = addDays(new Date("2026-05-19T00:00:00+07:00"), args.baseOffsetDays);

  return Array.from({ length: 3 }, (_, index) => {
    const windowStart = addDays(startDate, index * 7);
    const windowEnd = addDays(windowStart, 6);
    const deadline = addDays(windowStart, -1);

    return {
      id: `${baseId}-${args.packagePrefix.toLowerCase()}-${index + 1}`,
      batchCode: `${args.packagePrefix}${index + 1}`,
      name: `${args.packageName} • Week ${index + 1}`,
      periodLabel: `${formatDateLabel(windowStart)} - ${formatDateLabel(windowEnd)}`,
      enrollmentDeadline: formatDateLabel(deadline),
      seatsLeft: Math.max(args.seats - (index + 1) * 4, 3),
      totalSeats: args.seats,
      admissionStatus: index === 0 ? "Approved" : index === 1 ? "Pending Review" : "Closed",
      intakeWindow:
        index === 2
          ? "Enrollment window is closed for this batch."
          : "Enrollment is open until 1 day before the batch starts.",
    };
  });
}

export function getMockBatchesForCourse(
  courseId: string | undefined,
  tutorName: string,
  price: number,
): CourseBatchView[] {
  const baseId = courseId ?? "course";
  const priceLabel = formatPrice(price);

  return [
    {
      id: `${baseId}-batch-a`,
      batchCode: "#49",
      name: "Batch Reguler A",
      periodLabel: "12 Mei 2026 - 2 Agustus 2026",
      enrollmentDeadline: "11 Mei 2026",
      sessionPattern: "Selasa & Kamis • 19:00 WIB",
      seatsLeft: 12,
      totalSeats: 30,
      tutorName,
      priceLabel,
      admissionStatus: "Approved",
      intakeWindow: "Registrasi ditutup 1 hari sebelum batch dimulai",
    },
    {
      id: `${baseId}-batch-b`,
      batchCode: "#50",
      name: "Batch Weekend",
      periodLabel: "17 Mei 2026 - 9 Agustus 2026",
      enrollmentDeadline: "15 Mei 2026",
      sessionPattern: "Sabtu • 10:00 WIB",
      seatsLeft: 7,
      totalSeats: 25,
      tutorName,
      priceLabel,
      admissionStatus: "Pending Review",
      intakeWindow: "Registrasi dipantau manual oleh admin 1-3 hari sebelum mulai",
    },
    {
      id: `${baseId}-batch-c`,
      batchCode: "#51",
      name: "Batch Intensif",
      periodLabel: "1 Juni 2026 - 24 Agustus 2026",
      enrollmentDeadline: "28 Mei 2026",
      sessionPattern: "Senin, Rabu, Jumat • 18:30 WIB",
      seatsLeft: 4,
      totalSeats: 20,
      tutorName,
      priceLabel,
      admissionStatus: "Closed",
      intakeWindow: "Batch penuh dan pendaftaran sudah ditutup",
    },
  ];
}

export function getCoursePackagesForDetail(args: {
  courseId: string | undefined;
  alaCartePrice: number;
  tutorPackagePrice: number;
  isFree?: boolean;
}): CoursePackageDetailView[] {
  const alaCartePrice = args.isFree ? 0 : args.alaCartePrice;
  const tutorPackagePrice = args.isFree ? 0 : args.tutorPackagePrice;
  const bundlePrice = args.isFree ? 0 : args.tutorPackagePrice;

  return [
    {
      id: "video-only",
      name: "Video only",
      description: "Ala carte access for video lessons only.",
      priceLabel: formatPrice(alaCartePrice),
      accessLabel: "Video lessons only",
      features: [
        "On-demand learning videos",
        "Self-paced access without a batch",
        "Best for students who prefer guided visual lessons",
      ],
      requiresBatch: false,
      batches: [],
    },
    {
      id: "article-only",
      name: "Article only",
      description: "Ala carte access for article lessons and references only.",
      priceLabel: formatPrice(alaCartePrice),
      accessLabel: "Article lessons only",
      features: [
        "Written article lessons and templates",
        "Self-paced access without a batch",
        "Best for students who prefer reading-based study",
      ],
      requiresBatch: false,
      batches: [],
    },
    {
      id: "video-article",
      name: "Video + article",
      description: "Bundle access for all asynchronous course content.",
      priceLabel: formatPrice(bundlePrice),
      accessLabel: "Video and article lessons",
      features: [
        "All on-demand video lessons",
        "All article lessons and references",
        "Complete self-paced access without live sessions",
      ],
      requiresBatch: false,
      batches: [],
    },
    {
      id: "video-article-live",
      name: "Video + article + live sessions",
      description: "Full package with course content and tutor-led live sessions.",
      priceLabel: formatPrice(tutorPackagePrice),
      accessLabel: "Video, article, and tutor live sessions",
      features: [
        "Everything in Video + article",
        "Tutor-led live sessions",
        "Structured cohort support during the selected batch",
      ],
      requiresBatch: true,
      batches: buildWeeklyBatches({
        courseId: args.courseId,
        packagePrefix: "L",
        packageName: "Live session package",
        seats: 24,
        baseOffsetDays: 7,
      }),
    },
  ];
}
