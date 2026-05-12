import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

export type BatchStatus = "OPEN" | "CLOSED" | "CANCELLED";

export interface Batch {
  id: string;
  courseId: string;
  tutorId?: string | null;
  startDate: string;
  endDate: string;
  capacity: number;
  status: BatchStatus;
}

export interface CreateBatchInput {
  courseId: string;
  tutorId: string;
  startDate: string;
  endDate: string;
  capacity: number;
}

const BATCH_FIELDS = gql`
  fragment BatchFields on Batch {
    id
    courseId
    startDate
    endDate
    capacity
    status
  }
`;

export const GET_COURSE_BATCHES = gql`
  query GetCourseBatches($courseId: String!) {
    batches(where: { courseId: { eq: $courseId } }, order: [{ startDate: ASC }]) {
      nodes {
        ...BatchFields
      }
    }
  }
  ${BATCH_FIELDS}
`;

export const CREATE_BATCH = gql`
  mutation CreateBatch($input: CreateBatchInput!) {
    createBatch(input: $input) {
      __typename
    }
  }
`;

interface CourseBatchesData {
  batches: {
    nodes: Batch[];
  } | null;
}

export function useCourseBatches(courseId: string | undefined) {
  return useQuery<CourseBatchesData>(GET_COURSE_BATCHES, {
    variables: { courseId: courseId ?? "" },
    skip: !courseId,
    fetchPolicy: "cache-and-network",
  });
}
