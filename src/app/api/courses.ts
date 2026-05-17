import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useEffect, useMemo, useState } from "react";

export type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type CourseStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface Course {
  id: string;
  tutorId: string[];
  title: string;
  slug: string;
  thumbnailUrl?: string | null;
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

export interface CourseInput {
  tutorId: string[];
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  level: CourseLevel;
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
  tutorIds: string[];
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
    tutorId
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
      nodes {
        ...CourseFields
      }
    }
  }
  ${COURSE_FIELDS}
`;

export const CREATE_COURSE = gql`
  mutation CreateCourse($input: CreateCourseInput!) {
    createCourse(input: $input) {
      __typename
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation UpdateCourse($id: String!, $input: UpdateCourseInput!) {
    updateCourse(id: $id, input: $input) {
      __typename
    }
  }
`;

export const DELETE_COURSE = gql`
  mutation DeleteCourse($id: String!) {
    deleteCourse(id: $id)
  }
`;

export const GET_COURSE_BY_ID = gql`
  query GetCourseById($courseId: String!) {
    courses(where: { id: { eq: $courseId } }) {
      nodes {
        ...CourseFields
      }
    }
  }
  ${COURSE_FIELDS}
`;

interface CoursesData {
  courses: {
    nodes: Course[];
  } | null;
}

const COURSES_CACHE_KEY = "tutoring-academy.published-courses";

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
    image: course.thumbnailUrl ?? "",
    featured: course.level === "ADVANCED",
    duration: formatDuration(course.totalDuration),
  };
}

export function mapCourseToDetail(course: Course): CourseDetailView {
  return {
    ...mapCourseToCard(course),
    tutorIds: course.tutorId,
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

  const liveCourses = useMemo(
    () => (data?.courses?.nodes ?? []).map(mapCourseToCard),
    [data?.courses?.nodes],
  );
  const [cachedCourses, setCachedCourses] = useState<CourseCardView[]>([]);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") {
      return;
    }

    try {
      const raw = window.localStorage.getItem(COURSES_CACHE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw) as CourseCardView[];
      if (Array.isArray(parsed)) {
        setCachedCourses(parsed);
      }
    } catch {
      window.localStorage.removeItem(COURSES_CACHE_KEY);
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled || typeof window === "undefined" || liveCourses.length === 0) {
      return;
    }

    setCachedCourses(liveCourses);
    window.localStorage.setItem(COURSES_CACHE_KEY, JSON.stringify(liveCourses));
  }, [enabled, liveCourses]);

  return {
    courses: liveCourses.length > 0 ? liveCourses : cachedCourses,
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

  const course = data?.courses?.nodes?.[0];

  return {
    course: course ? mapCourseToDetail(course) : null,
    loading,
    error,
    refetch,
  };
}
