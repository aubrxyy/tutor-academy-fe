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

function formatPrice(price: number) {
  if (price <= 0) {
    return "Free";
  }

  return `Rp ${price.toLocaleString("id-ID")}`;
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
