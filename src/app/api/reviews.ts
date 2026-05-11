import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

export interface Review {
  id: string;
  courseId: string;
  userId: string;
  rating: number;
  comment: string | null;
}

export interface ReviewInput {
  courseId: string;
  userId: string;
  rating: number;
  comment?: string | null;
}

export interface UpdateReviewInput {
  id: string;
  rating: number;
  comment?: string | null;
}

export const REVIEW_FIELDS = gql`
  fragment ReviewFields on Review {
    id
    courseId
    userId
    rating
    comment
  }
`;

export const GET_COURSE_REVIEWS = gql`
  query GetCourseReviews($courseId: String!) {
    reviews(where: { courseId: { eq: $courseId } }, order: [{ rating: DESC }]) {
      nodes {
        ...ReviewFields
      }
    }
  }
  ${REVIEW_FIELDS}
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      courseId
      userId
      rating
      comment
    }
  }
`;

export const UPDATE_REVIEW = gql`
  mutation UpdateReview($input: UpdateReviewInput!) {
    updateReview(input: $input) {
      id
      rating
      comment
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($id: String!) {
    deleteReview(id: $id)
  }
`;

interface CourseReviewsData {
  reviews: {
    nodes: Review[];
  } | null;
}

export function useCourseReviews(courseId: string | undefined) {
  return useQuery<CourseReviewsData>(GET_COURSE_REVIEWS, {
    variables: { courseId: courseId ?? "" },
    skip: !courseId,
    fetchPolicy: "cache-and-network",
  });
}
