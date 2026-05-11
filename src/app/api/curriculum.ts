import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

export type SectionType = "VIDEO" | "QUIZ" | "ARTICLE";

export interface Section {
  id: string;
  courseId: string;
  title: string;
  type: SectionType;
  order: number;
}

export interface Lecture {
  id: string;
  courseId: string;
  sectionId: string;
  title: string;
  youtubeEmbedId: string;
  duration: string;
  content: string;
  order: number;
}

export interface SectionInput {
  courseId: string;
  title: string;
  type: SectionType;
  order: number;
}

export interface UpdateSectionInput extends SectionInput {
  id: string;
}

export interface LectureInput {
  courseId: string;
  sectionId: string;
  title: string;
  youtubeEmbedId: string;
  duration: string;
  content: string;
  order: number;
}

export interface UpdateLectureInput extends LectureInput {
  id: string;
}

export const SECTION_FIELDS = gql`
  fragment SectionFields on Section {
    id
    courseId
    title
    type
    order
  }
`;

export const LECTURE_FIELDS = gql`
  fragment LectureFields on Lecture {
    id
    courseId
    sectionId
    title
    youtubeEmbedId
    duration
    content
    order
  }
`;

export const GET_COURSE_CURRICULUM = gql`
  query GetCourseCurriculum($courseId: String!) {
    sections(where: { courseId: { eq: $courseId } }, order: [{ order: ASC }]) {
      nodes {
        ...SectionFields
      }
    }
    lectures(where: { courseId: { eq: $courseId } }, order: [{ order: ASC }]) {
      nodes {
        ...LectureFields
      }
    }
  }
  ${SECTION_FIELDS}
  ${LECTURE_FIELDS}
`;

export const CREATE_SECTION = gql`
  mutation CreateSection($input: CreateSectionInput!) {
    createSection(input: $input) {
      courseId
      title
      type
      order
    }
  }
`;

export const UPDATE_SECTION = gql`
  mutation UpdateSection($input: UpdateSectionInput!) {
    updateSection(input: $input) {
      id
      title
      type
      order
    }
  }
`;

export const DELETE_SECTION = gql`
  mutation DeleteSection($sectionId: String!) {
    deleteSection(sectionId: $sectionId)
  }
`;

export const CREATE_LECTURE = gql`
  mutation CreateLecture($input: CreateLectureInput!) {
    createLecture(input: $input) {
      id
      courseId
      sectionId
      title
      youtubeEmbedId
      duration
      content
      order
    }
  }
`;

export const UPDATE_LECTURE = gql`
  mutation UpdateLecture($input: UpdateLectureInput!) {
    updateLecture(input: $input) {
      id
      courseId
      sectionId
      title
      youtubeEmbedId
      duration
      content
      order
    }
  }
`;

export const DELETE_LECTURE = gql`
  mutation DeleteLecture($lectureId: String!) {
    deleteLecture(lectureId: $lectureId)
  }
`;

interface CourseCurriculumData {
  sections: {
    nodes: Section[];
  } | null;
  lectures: {
    nodes: Lecture[];
  } | null;
}

export function useCourseCurriculum(courseId: string | undefined) {
  return useQuery<CourseCurriculumData>(GET_COURSE_CURRICULUM, {
    variables: { courseId: courseId ?? "" },
    skip: !courseId,
    fetchPolicy: "cache-and-network",
  });
}
