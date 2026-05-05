import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

export type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type CourseStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface Course {
  id: string;
  title: string;
  slug: string;
  thumbnailUrl: string;
  description: string;
  shortDescription: string;
  level: CourseLevel;
  price: number;
  isFree: boolean;
  status: CourseStatus;
  totalSections: number;
  totalLectures: number;
  totalDuration: number;
}

export interface CourseCardView {
  id: string;
  title: string;
  major: string;
  price: string;
  priceLabel: string;
  rating: number;
  reviews: number;
  students: number;
  tutor: string;
  image: string;
  featured: boolean;
  duration: string;
}

export interface CourseDetailView extends CourseCardView {
  subtitle: string;
  description: string;
  pricing: {
    monthly: number;
    discount: number;
  };
  features: string[];
}

export const COURSE_FIELDS = gql`
  fragment CourseFields on Course {
    id
    title
    slug
    thumbnailUrl
    description
    shortDescription
    level
    price
    isFree
    status
    totalSections
    totalLectures
    totalDuration
  }
`;

export const GET_PUBLISHED_COURSES = gql`
  query GetPublishedCourses {
    courses(where: { status: { eq: PUBLISHED } }, order: [{ title: ASC }]) {
      ...CourseFields
    }
  }
  ${COURSE_FIELDS}
`;

export const GET_COURSE_BY_ID = gql`
  query GetCourseById($courseId: String!) {
    courses(where: { id: { eq: $courseId } }) {
      ...CourseFields
    }
  }
  ${COURSE_FIELDS}
`;

interface CoursesData {
  courses: Course[];
}

function formatPrice(course: Course) {
  if (course.isFree || course.price <= 0) {
    return "Free";
  }

  return `Rp ${course.price.toLocaleString("id-ID")}`;
}

function formatDuration(totalDuration: number) {
  if (totalDuration <= 0) {
    return "Self-paced";
  }

  if (totalDuration < 60) {
    return `${totalDuration} min`;
  }

  const hours = Math.round(totalDuration / 60);
  return `${hours} hour${hours > 1 ? "s" : ""}`;
}

function formatLevel(level: CourseLevel) {
  switch (level) {
    case "BEGINNER":
      return "Beginner";
    case "INTERMEDIATE":
      return "Intermediate";
    case "ADVANCED":
      return "Advanced";
  }
}

export function mapCourseToCard(course: Course): CourseCardView {
  return {
    id: course.id,
    title: course.title,
    major: formatLevel(course.level),
    price: formatPrice(course),
    priceLabel: course.isFree ? "included" : "/month",
    rating: 4.8,
    reviews: 0,
    students: 0,
    tutor: "Tutoring Academy",
    image: course.thumbnailUrl,
    featured: course.level === "ADVANCED",
    duration: formatDuration(course.totalDuration),
  };
}

export function mapCourseToDetail(course: Course): CourseDetailView {
  return {
    ...mapCourseToCard(course),
    subtitle: course.shortDescription,
    description: course.description,
    pricing: {
      monthly: course.price,
      discount: 0,
    },
    features: [
      `${course.totalSections} sections`,
      `${course.totalLectures} lectures`,
      `${formatDuration(course.totalDuration)} of content`,
      `${formatLevel(course.level)} level`,
      course.isFree ? "Free access" : "Paid course access",
    ],
  };
}

export function useCourses(options: { enabled?: boolean } = {}) {
  const enabled = options.enabled ?? true;
  const { data, loading, error, refetch } = useQuery<CoursesData>(
    GET_PUBLISHED_COURSES,
    {
      fetchPolicy: "cache-and-network",
      skip: !enabled,
    },
  );

  return {
    courses: (data?.courses ?? []).map(mapCourseToCard),
    loading: enabled ? loading : false,
    error,
    refetch,
  };
}

export function useCourseDetail(courseId: string | undefined) {
  const { data, loading, error, refetch } = useQuery<CoursesData>(
    GET_COURSE_BY_ID,
    {
      variables: { courseId: courseId ?? "" },
      skip: !courseId,
      fetchPolicy: "cache-and-network",
    },
  );

  const course = data?.courses?.[0];

  return {
    course: course ? mapCourseToDetail(course) : null,
    loading,
    error,
    refetch,
  };
}
