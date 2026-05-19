import { gql } from "@apollo/client";

export type EnrollmentStatus = "PENDING" | "APPROVED" | "CANCELLED" | "REJECTED";

export interface EnrollInput {
  courseId: string;
  batchId: string;
  userId: string;
}

export interface EnrollResponse {
  id: string;
  courseId: string;
  userId: string;
  enrollmentDate: string;
  status: EnrollmentStatus;
  midtransUrl: string;
}

export interface EnrollData {
  enroll: EnrollResponse;
}

export const ENROLL = gql`
  mutation Enroll($input: EnrollInput!) {
    enroll(input: $input) {
      id
      courseId
      userId
      enrollmentDate
      status
      midtransUrl
    }
  }
`;
