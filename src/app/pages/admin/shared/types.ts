import type { CourseLevel, CourseStatus } from "../../../api/courses";

export type AdminView =
  | "dashboard"
  | "classes"
  | "students"
  | "tutors"
  | "tutor-applications"
  | "financials";

export type AccountStatus = "Active" | "Inactive";

export type ManagedClass = {
  id: string;
  title: string;
  level: CourseLevel;
  tutor: string;
  students: number;
  videos: number;
  sessions: number;
  docs: number;
  quizzes: number;
  status: CourseStatus;
};

export type ManagedStudent = {
  id: string;
  name: string;
  nim: string;
  email: string;
  major: string;
  semester: number;
  enrolledClasses: number;
  completedClasses: number;
  status: AccountStatus;
};

export type ManagedTutor = {
  id: string;
  name: string;
  email: string;
  contact: string;
  username: string;
  assignedClassNames: string[];
  assignedClasses: number;
  students: number;
  rating: number;
  responsibility: string;
  status: AccountStatus;
};

export type TutorApplicationStatus = "Pending" | "Approved" | "Rejected";

export type TutorApplication = {
  id: string;
  name: string;
  email: string;
  contact: string;
  expertise: string;
  motivation: string;
  requestedClassNames: string[];
  status: TutorApplicationStatus;
};

export type NewTutorDraft = {
  name: string;
  email: string;
  contact: string;
  username: string;
  password: string;
  assignedClassNames: string[];
};
