import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Sparkles,
  UserRound
} from "lucide-react";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { useCourses } from "../../api/courses";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/navigation/Navbar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";

const TUTOR_APPLICATIONS_STORAGE_KEY = "tutoring-academy.tutor-applications";
const inputClassName =
  "h-12 rounded-xl border-[#B8CDD3] bg-[#FCFEFE] shadow-[0_1px_2px_rgba(10,27,69,0.06)] focus-visible:border-[#308279] focus-visible:bg-white focus-visible:ring-[#308279]/25";
const textareaClassName =
  "rounded-xl border-[#B8CDD3] bg-[#FCFEFE] shadow-[0_1px_2px_rgba(10,27,69,0.06)] focus-visible:border-[#308279] focus-visible:bg-white focus-visible:ring-[#308279]/25";
const selectClassName =
  "h-12 w-full rounded-xl border border-[#B8CDD3] bg-[#FCFEFE] px-3 text-sm text-[#0A1B45] shadow-[0_1px_2px_rgba(10,27,69,0.06)] outline-none transition focus:border-[#308279] focus:bg-white focus:ring-[3px] focus:ring-[#308279]/25";

type TutorApplicationDraft = {
  fullName: string;
  email: string;
  phone: string;
  studentId: string;
  major: string;
  cohortYear: string;
  expertise: string;
  targetClass: string;
  supportingClass: string;
  teachingExperience: string;
  availability: string;
  motivation: string;
  portfolioUrl: string;
};

const initialDraft: TutorApplicationDraft = {
  fullName: "",
  email: "",
  phone: "",
  studentId: "",
  major: "",
  cohortYear: "",
  expertise: "",
  targetClass: "",
  supportingClass: "",
  teachingExperience: "",
  availability: "",
  motivation: "",
  portfolioUrl: "",
};

function saveTutorApplication(draft: TutorApplicationDraft) {
  if (typeof window === "undefined") return;

  const existingRaw = window.localStorage.getItem(TUTOR_APPLICATIONS_STORAGE_KEY);
  const existing = existingRaw ? (JSON.parse(existingRaw) as TutorApplicationDraft[]) : [];

  window.localStorage.setItem(
    TUTOR_APPLICATIONS_STORAGE_KEY,
    JSON.stringify([
      ...existing,
      {
        ...draft,
        submittedAt: new Date().toISOString(),
      },
    ]),
  );
}

export default function TutorApplicationPage() {
  const { courses, loading: isCoursesLoading } = useCourses();
  const [draft, setDraft] = useState<TutorApplicationDraft>(initialDraft);
  const [activeStep, setActiveStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const courseOptions = useMemo(
    () => courses.map((course) => ({ id: course.id, title: course.title })),
    [courses],
  );

  const updateDraft = <Key extends keyof TutorApplicationDraft>(
    key: Key,
    value: TutorApplicationDraft[Key],
  ) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const validateProfileStep = () => {
    if (!draft.fullName.trim() || !draft.email.trim() || !draft.phone.trim()) {
      return "Complete your name, email, and phone number.";
    }

    if (!draft.studentId.trim() || !draft.major.trim() || !draft.cohortYear.trim()) {
      return "Complete your student ID, major, and cohort year.";
    }

    return null;
  };

  const validateTutorFitStep = () => {
    if (!draft.expertise.trim() || !draft.targetClass.trim()) {
      return "Add your expertise and the class you want to apply for.";
    }

    if (draft.motivation.trim().length < 40) {
      return "Motivation must be at least 40 characters.";
    }

    return null;
  };

  const handleContinue = () => {
    const validationError = validateProfileStep();

    if (validationError) {
      toast.error("Profile incomplete", { description: validationError });
      return;
    }

    setActiveStep(2);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationError = validateProfileStep() ?? validateTutorFitStep();

    if (validationError) {
      toast.error("Application incomplete", { description: validationError });
      return;
    }

    setIsSubmitting(true);

    try {
      saveTutorApplication(draft);
      setIsSubmitted(true);
      setActiveStep(1);
      setDraft(initialDraft);
      toast.success("Tutor application submitted", {
        description: "Your application has been saved for admin review.",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Please try again.";
      toast.error("Unable to submit application", { description: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F8FA] selection:bg-[#308279] selection:text-white">
      <Navbar />

      <main className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <section className="rounded-3xl bg-gradient-to-br from-[#0A1B45] via-[#153063] to-[#308279] p-6 text-white shadow-[0_24px_64px_rgba(10,27,69,0.16)] sm:p-10">

            <h1 className=" max-w-[13ch] text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl">
              Apply to teach at Tutoring Academy.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
              Tell us what you can teach, which class you want to support, and why
              you are ready to guide other students.
            </p>

            <div className="mt-10 grid gap-4">
              <InfoCard
                icon={BookOpen}
                title="Class fit"
                description="Pick the course you want to apply for and list supporting classes you can teach."
              />
              <InfoCard
                icon={CalendarDays}
                title="Availability"
                description="Share your weekly teaching availability so admins can match you with batches."
              />
              <InfoCard
                icon={Sparkles}
                title="Motivation"
                description="Explain your teaching style, goals, and why students should learn with you."
              />
            </div>
          </section>

          <section className="rounded-3xl border border-[#D8E5E9] bg-white p-6 shadow-[0_18px_42px_rgba(10,27,69,0.08)] sm:p-8">
            <div className="flex flex-col gap-5 border-b border-[#E5EEF1] pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#308279]">
                  Register as tutor
                </div>
                <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[#0A1B45]">
                  Tutor application form
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-[#476074]">
                  This application is separate from student registration and helps
                  admins review tutor readiness before granting tutor access.
                </p>
              </div>
              {isSubmitted ? (
                <div className="flex items-center gap-2 rounded-2xl border border-[#BFE3D9] bg-[#EFFAF7] px-4 py-3 text-sm font-semibold text-[#1F6D66]">
                  <CheckCircle2 className="h-4 w-4" />
                  Submitted
                </div>
              ) : null}
            </div>

            <form className="mt-8 space-y-8" onSubmit={handleSubmit}>

              {activeStep === 1 ? (
                <>
                  <FormSection title="Personal information">
                    <Field label="Full name" htmlFor="fullName">
                      <Input
                        id="fullName"
                        value={draft.fullName}
                        onChange={(event) => updateDraft("fullName", event.target.value)}
                        required
                        placeholder="Matthew Anugrah Siahaan"
                        className={inputClassName}
                      />
                    </Field>
                    <Field label="Email" htmlFor="email">
                      <Input
                        id="email"
                        type="email"
                        value={draft.email}
                        onChange={(event) => updateDraft("email", event.target.value)}
                        required
                        placeholder="name@student.ac.id"
                        className={inputClassName}
                      />
                    </Field>
                    <Field label="Phone / WhatsApp" htmlFor="phone">
                      <Input
                        id="phone"
                        value={draft.phone}
                        onChange={(event) => updateDraft("phone", event.target.value)}
                        required
                        placeholder="+62 812 0000 0000"
                        className={inputClassName}
                      />
                    </Field>
                    <Field label="Student ID" htmlFor="studentId">
                      <Input
                        id="studentId"
                        value={draft.studentId}
                        onChange={(event) => updateDraft("studentId", event.target.value)}
                        required
                        placeholder="2600000000"
                        className={inputClassName}
                      />
                    </Field>
                  </FormSection>

                  <FormSection title="Academic profile">
                    <Field label="Major" htmlFor="major">
                      <Input
                        id="major"
                        value={draft.major}
                        onChange={(event) => updateDraft("major", event.target.value)}
                        required
                        placeholder="Computer Science"
                        className={inputClassName}
                      />
                    </Field>
                    <Field label="Cohort Year" htmlFor="cohortYear">
                      <Input
                        id="cohortYear"
                        value={draft.cohortYear}
                        onChange={(event) => updateDraft("cohortYear", event.target.value)}
                        required
                        placeholder="2024"
                        className={inputClassName}
                      />
                    </Field>
                  </FormSection>
                </>
              ) : (
                <>
                  <FormSection title="Tutor fit">
                    <Field label="Expertise" htmlFor="expertise" className="sm:col-span-2">
                      <Textarea
                        id="expertise"
                        value={draft.expertise}
                        onChange={(event) => updateDraft("expertise", event.target.value)}
                        required
                        placeholder="Data structures, calculus, accounting, UI/UX research, public speaking..."
                        className={`min-h-28 ${textareaClassName}`}
                      />
                    </Field>
                    <Field label="Class you want to apply for" htmlFor="targetClass">
                      <select
                        id="targetClass"
                        value={draft.targetClass}
                        onChange={(event) => updateDraft("targetClass", event.target.value)}
                        required
                        className={selectClassName}
                      >
                        <option value="">
                          {isCoursesLoading ? "Loading classes..." : "Select a class"}
                        </option>
                        {courseOptions.map((course) => (
                          <option key={course.id} value={course.title}>
                            {course.title}
                          </option>
                        ))}
                        <option value="Other class">Other class</option>
                      </select>
                    </Field>
                    <Field label="Other classes you can support" htmlFor="supportingClass">
                      <Input
                        id="supportingClass"
                        value={draft.supportingClass}
                        onChange={(event) => updateDraft("supportingClass", event.target.value)}
                        placeholder="Calculus, Algorithm Design, Accounting..."
                        className={inputClassName}
                      />
                    </Field>
                    <Field label="Teaching experience" htmlFor="teachingExperience" className="sm:col-span-2">
                      <Textarea
                        id="teachingExperience"
                        value={draft.teachingExperience}
                        onChange={(event) => updateDraft("teachingExperience", event.target.value)}
                        placeholder="Assistant roles, peer tutoring, study group leadership, competition mentoring..."
                        className={`min-h-28 ${textareaClassName}`}
                      />
                    </Field>
                    <Field label="Weekly availability" htmlFor="availability" className="sm:col-span-2">
                      <Textarea
                        id="availability"
                        value={draft.availability}
                        onChange={(event) => updateDraft("availability", event.target.value)}
                        placeholder="Example: Monday and Wednesday 19:00-21:00, Saturday morning"
                        className={`min-h-24 ${textareaClassName}`}
                      />
                    </Field>
                    <Field label="Portfolio / proof link" htmlFor="portfolioUrl" className="sm:col-span-2">
                      <Input
                        id="portfolioUrl"
                        type="url"
                        value={draft.portfolioUrl}
                        onChange={(event) => updateDraft("portfolioUrl", event.target.value)}
                        placeholder="Google Drive, LinkedIn, GitHub, certificate folder, or notes sample"
                        className={inputClassName}
                      />
                    </Field>
                  </FormSection>

                  <div className="space-y-2">
                    <Label htmlFor="motivation">Motivation</Label>
                    <Textarea
                      id="motivation"
                      value={draft.motivation}
                      onChange={(event) => updateDraft("motivation", event.target.value)}
                      required
                      placeholder="Tell us why you want to become a tutor, how you explain difficult topics, and what kind of learning experience you want to create."
                      className={`min-h-36 ${textareaClassName}`}
                    />
                    <p className="text-xs font-medium text-[#476074]">
                      Minimum 40 characters. Current: {draft.motivation.trim().length}
                    </p>
                  </div>
                </>
              )}

              <div className="flex flex-col gap-3 border-t border-[#E5EEF1] pt-6 sm:flex-row">
                {activeStep === 1 ? (
                  <Button
                    type="button"
                    onClick={handleContinue}
                    className="h-12 flex-1 rounded-xl bg-[#0A1B45] text-white hover:bg-[#308279]"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveStep(1)}
                      className="h-12 flex-1 rounded-xl border-[#0A1B45] text-[#0A1B45]"
                    >
                      Back to profile
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-12 flex-1 rounded-xl bg-[#0A1B45] text-white hover:bg-[#308279]"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </>
                )}
                <Link to="/register" className={activeStep === 1 ? "sm:flex-1" : "hidden"}>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 w-full rounded-xl border-[#0A1B45] text-[#0A1B45]"
                  >
                    Register as student
                  </Button>
                </Link>
              </div>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof UserRound;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
          <Icon className="h-5 w-5 text-[#92B7B0]" />
        </div>
        <div className="text-lg font-semibold">{title}</div>
      </div>
      <p className="mt-4 text-sm leading-6 text-white/75">{description}</p>
    </div>
  );
}

function StepIndicator({ activeStep }: { activeStep: 1 | 2 }) {
  const steps = [
    { number: 1, label: "Profile", description: "Personal and academic information" },
    { number: 2, label: "Tutor fit", description: "Expertise, class fit, and motivation" },
  ] as const;

  ;
}

function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="text-lg font-bold text-[#0A1B45]">{title}</h3>
      <div className="mt-4 grid gap-5 sm:grid-cols-2">{children}</div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className ? `space-y-2 ${className}` : "space-y-2"}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
