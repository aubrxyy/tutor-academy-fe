import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { COURSE_FIELDS, type Course } from "./courses";

export type BackendUserRole = "ADMIN" | "USER" | "TUTOR";

export interface BackendUser {
  id: string;
  name: string;
  username: string;
  avatarUrl: string | null;
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
    avatarUrl
    email
    role
    contact
    enrolledCourses
    teachingCourses
  }
`;

export const GET_ADMIN_PANEL_DATA = gql`
  query GetAdminPanelData {
    users(order: [{ name: ASC }]) {
      ...UserFields
    }
    courses(order: [{ title: ASC }]) {
      ...CourseFields
    }
  }
  ${USER_FIELDS}
  ${COURSE_FIELDS}
`;

export const GET_TUTOR_PANEL_DATA = gql`
  query GetTutorPanelData($courseIds: [String!]) {
    courses(where: { id: { in: $courseIds } }, order: [{ title: ASC }]) {
      ...CourseFields
    }
  }
  ${COURSE_FIELDS}
`;

interface AdminPanelData {
  users: BackendUser[];
  courses: Course[];
}

interface TutorPanelData {
  courses: Course[];
}

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
