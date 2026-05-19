import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { COURSE_FIELDS, type Course } from "./courses";
import type { Batch } from "./batches";

export type BackendUserRole = "ADMIN" | "USER" | "TUTOR";

export interface BackendUser {
  id: string;
  name: string;
  username: string;
  avatarUrl?: string | null;
  email: string;
  role: BackendUserRole;
  contact: string | null;
  enrolledCourses: string[];
  teachingCourses: string[];
}

const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    name
    username
    email
    role
    contact
    enrolledCourses
    teachingCourses
  }
`;

const ADMIN_BATCH_FIELDS = gql`
  fragment AdminBatchFields on Batch {
    id
    courseId
    tutorId
    startDate
    endDate
    capacity
    status
  }
`;

export const GET_ADMIN_PANEL_DATA = gql`
  query GetAdminPanelData {
    users(order: [{ name: ASC }]) {
      nodes {
        ...UserFields
      }
    }
    courses(order: [{ title: ASC }]) {
      nodes {
        ...CourseFields
      }
    }
    batches(order: [{ startDate: ASC }]) {
      nodes {
        ...AdminBatchFields
      }
    }
  }
  ${USER_FIELDS}
  ${COURSE_FIELDS}
  ${ADMIN_BATCH_FIELDS}
`;

export const GET_TUTOR_PANEL_DATA = gql`
  query GetTutorPanelData($courseIds: [String!]) {
    courses(where: { id: { in: $courseIds } }, order: [{ title: ASC }]) {
      nodes {
        ...CourseFields
      }
    }
  }
  ${COURSE_FIELDS}
`;

export const GET_TUTOR_USERS = gql`
  query GetTutorUsers {
    users(where: { role: { eq: TUTOR } }, order: [{ name: ASC }]) {
      nodes {
        ...UserFields
      }
    }
  }
  ${USER_FIELDS}
`;

interface AdminPanelData {
  users: {
    nodes: BackendUser[];
  } | null;
  courses: {
    nodes: Course[];
  } | null;
  batches: {
    nodes: Batch[];
  } | null;
}

interface TutorPanelData {
  courses: {
    nodes: Course[];
  } | null;
}

interface TutorUsersData {
  users: {
    nodes: BackendUser[];
  } | null;
}

export const GET_TUTORS_BY_IDS = gql`
  query GetTutorsByIds($ids: [String!]) {
    users(where: { id: { in: $ids }, role: { eq: TUTOR } }, order: [{ name: ASC }]) {
      nodes {
        ...UserFields
      }
    }
  }
  ${USER_FIELDS}
`;

export function useAdminPanelData() {
  return useQuery<AdminPanelData>(GET_ADMIN_PANEL_DATA, {
    fetchPolicy: "cache-and-network",
  });
}

export function useTutorPanelCourses(courseIds: string[]) {
  return useQuery<TutorPanelData>(GET_TUTOR_PANEL_DATA, {
    variables: { courseIds },
    skip: courseIds.length === 0,
    fetchPolicy: "cache-and-network",
  });
}

export function useTutorUsers() {
  return useQuery<TutorUsersData>(GET_TUTOR_USERS, {
    fetchPolicy: "cache-and-network",
  });
}

export function useTutorsByIds(ids: string[]) {
  return useQuery<TutorUsersData>(GET_TUTORS_BY_IDS, {
    variables: { ids },
    skip: ids.length === 0,
    fetchPolicy: "cache-and-network",
  });
}
