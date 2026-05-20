import type { Dispatch, SetStateAction } from "react";
import { ChevronDown, Plus, Search, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import type {
  ManagedClass,
  ManagedTutor,
  NewTutorDraft,
  TutorApplication,
} from "../shared/types";

type AdminTutorsPageProps = {
  tutors: ManagedTutor[];
  tutorApplications: TutorApplication[];
  pendingTutorApplicationsCount: number;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  isApplicationsPanelOpen: boolean;
  setIsApplicationsPanelOpen: Dispatch<SetStateAction<boolean>>;
  isAddTutorOpen: boolean;
  setIsAddTutorOpen: Dispatch<SetStateAction<boolean>>;
  newTutor: NewTutorDraft;
  setNewTutor: Dispatch<SetStateAction<NewTutorDraft>>;
  classes: ManagedClass[];
  handleAddTutor: () => void;
  applicationCredentials: Record<string, { username: string; password: string }>;
  handleApplicationCredentialChange: (
    applicationId: string,
    field: "username" | "password",
    value: string,
  ) => void;
  handleApproveTutorApplication: (applicationId: string) => void;
  handleRejectTutorApplication: (applicationId: string) => void;
  handleCreateTutorFromApplication: (applicationId: string) => void;
  getStatusBadgeClassName: (status: ManagedTutor["status"]) => string;
  toggleTutorStatus: (tutorId: string) => void;
};

export default function AdminTutorsPage({
  tutors,
  tutorApplications,
  pendingTutorApplicationsCount,
  searchQuery,
  setSearchQuery,
  isApplicationsPanelOpen,
  setIsApplicationsPanelOpen,
  isAddTutorOpen,
  setIsAddTutorOpen,
  newTutor,
  setNewTutor,
  classes,
  handleAddTutor,
  applicationCredentials,
  handleApplicationCredentialChange,
  handleApproveTutorApplication,
  handleRejectTutorApplication,
  handleCreateTutorFromApplication,
  getStatusBadgeClassName,
  toggleTutorStatus,
}: AdminTutorsPageProps) {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="app-page-header">
        <div>
          <h2 className="text-3xl font-bold text-[#0A1B45]">Tutors Management</h2>
          <p className="mt-2 text-[#476074]">
            Manage active tutors and add tutor accounts manually when needed.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
          <Button
            variant="outline"
            className="border-[#308279] text-[#308279]"
            onClick={() => setIsApplicationsPanelOpen((current) => !current)}
          >
            Review Applications ({pendingTutorApplicationsCount})
            <ChevronDown
              className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                isApplicationsPanelOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
          <Button
            className="bg-[#0A1B45] hover:bg-[#0A1B45]/90"
            onClick={() => setIsAddTutorOpen((current) => !current)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Tutor
          </Button>
          <div className="relative w-full sm:w-48">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#476074]" />
            <Input
              placeholder="Search tutors..."
              className="w-full pl-10"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
        </div>
      </div>

      <div
        className={`mb-8 grid overflow-hidden transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isApplicationsPanelOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <div
            className={`rounded-3xl border border-[#D8E5E9] bg-white p-5 shadow-[0_20px_40px_rgba(10,27,69,0.08)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-6 ${
              isApplicationsPanelOpen ? "translate-y-0" : "-translate-y-8"
            }`}
          >
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#0A1B45]">Tutor Applications</h3>
                <p className="mt-1 text-sm text-[#476074]">
                  Hidden review tray for applicants. Approve first, then create tutor credentials.
                </p>
              </div>
              <Badge className="border-0 bg-[#FCEFC7] px-3 py-2 text-[#7A5A00]">
                {pendingTutorApplicationsCount} pending
              </Badge>
            </div>

            <div className="space-y-5">
              {tutorApplications.map((application) => {
                const credentials = applicationCredentials[application.id] ?? {
                  username: "",
                  password: "",
                };

                return (
                  <Card key={application.id} className="overflow-hidden border border-[#D8E5E9] shadow-none">
                    <div className="grid lg:grid-cols-[320px_minmax(0,1fr)]">
                      <div className="bg-gradient-to-br from-[#0A1B45] to-[#308279] p-6 text-white">
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <Avatar className="h-16 w-16 border-4 border-white/20">
                            <AvatarFallback className="bg-white/20 text-xl text-white">
                              {application.name
                                .split(" ")
                                .map((name) => name[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <Badge
                            className={
                              application.status === "Pending"
                                ? "border-0 bg-[#FCEFC7] text-[#7A5A00]"
                                : application.status === "Approved"
                                  ? "border-0 bg-white/15 text-white"
                                  : "border-0 bg-[#FDECEC] text-[#B42318]"
                            }
                          >
                            {application.status}
                          </Badge>
                        </div>
                        <h4 className="text-lg font-bold">{application.name}</h4>
                        <p className="mt-1 text-sm text-white/80">{application.email}</p>
                        <p className="mt-2 text-sm text-white/80">Contact: {application.contact}</p>
                      </div>

                      <div className="space-y-4 p-6">
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                          <div>
                            <div className="text-xs uppercase tracking-[0.14em] text-[#476074]">Major</div>
                            <p className="mt-2 text-sm text-[#0A1B45]">{application.major}</p>
                          </div>
                          <div>
                            <div className="text-xs uppercase tracking-[0.14em] text-[#476074]">Angkatan</div>
                            <p className="mt-2 text-sm text-[#0A1B45]">{application.angkatan}</p>
                          </div>
                          <div>
                            <div className="text-xs uppercase tracking-[0.14em] text-[#476074]">Expertise</div>
                            <p className="mt-2 text-sm text-[#0A1B45]">{application.expertise}</p>
                          </div>
                          <div>
                            <div className="text-xs uppercase tracking-[0.14em] text-[#476074]">Requested classes</div>
                            <p className="mt-2 text-sm text-[#0A1B45]">
                              {application.requestedClassNames.join(", ")}
                            </p>
                          </div>
                          <div>
                            <div className="text-xs uppercase tracking-[0.14em] text-[#476074]">Motivation</div>
                            <p className="mt-2 text-sm leading-6 text-[#476074]">{application.motivation}</p>
                          </div>
                        </div>

                        {application.status === "Approved" ? (
                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-[#0A1B45]">Username</label>
                              <Input
                                placeholder="Create tutor username"
                                value={credentials.username}
                                onChange={(event) =>
                                  handleApplicationCredentialChange(
                                    application.id,
                                    "username",
                                    event.target.value,
                                  )
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-[#0A1B45]">Password</label>
                              <Input
                                type="password"
                                placeholder="Create tutor password"
                                value={credentials.password}
                                onChange={(event) =>
                                  handleApplicationCredentialChange(
                                    application.id,
                                    "password",
                                    event.target.value,
                                  )
                                }
                              />
                            </div>
                          </div>
                        ) : null}

                        <div className="flex flex-wrap gap-3 border-t pt-4">
                          {application.status === "Pending" ? (
                            <>
                              <Button
                                className="bg-[#308279] hover:bg-[#308279]/90"
                                onClick={() => handleApproveTutorApplication(application.id)}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                className="border-[#D8E5E9] text-[#B42318] hover:bg-[#FDECEC]"
                                onClick={() => handleRejectTutorApplication(application.id)}
                              >
                                Reject
                              </Button>
                            </>
                          ) : null}

                          {application.status === "Approved" ? (
                            <Button
                              className="bg-[#0A1B45] hover:bg-[#0A1B45]/90"
                              onClick={() => handleCreateTutorFromApplication(application.id)}
                            >
                              Create Tutor Account
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {isAddTutorOpen ? (
        <Card className="mb-8 rounded-[1.75rem] border-[#D8E5E9] bg-white p-6 shadow-[0_16px_36px_rgba(10,27,69,0.06)]">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-[#0A1B45]">Add New Tutor</h3>
              <p className="mt-1 text-sm text-[#476074]">
                Create a tutor account entry so the admin can assign them to classes.
              </p>
            </div>
            <Button
              variant="ghost"
              className="text-[#476074] hover:bg-[#F3F8FA] hover:text-[#0A1B45]"
              onClick={() => setIsAddTutorOpen(false)}
            >
              Cancel
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#0A1B45]">Tutor name</label>
              <Input
                placeholder="e.g. Maya Prasetyo"
                value={newTutor.name}
                onChange={(event) =>
                  setNewTutor((current) => ({ ...current, name: event.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#0A1B45]">Contact</label>
              <Input
                placeholder="+62 812 0000 0000"
                value={newTutor.contact}
                onChange={(event) =>
                  setNewTutor((current) => ({ ...current, contact: event.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#0A1B45]">Email</label>
              <Input
                placeholder="maya.prasetyo@binus.ac.id"
                value={newTutor.email}
                onChange={(event) =>
                  setNewTutor((current) => ({ ...current, email: event.target.value }))
                }
              />
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#0A1B45]">Major</label>
              <Input
                placeholder="e.g. Computer Science"
                value={newTutor.major}
                onChange={(event) =>
                  setNewTutor((current) => ({ ...current, major: event.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#0A1B45]">Angkatan</label>
              <Input
                placeholder="e.g. 2020"
                value={newTutor.angkatan}
                onChange={(event) =>
                  setNewTutor((current) => ({ ...current, angkatan: event.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#0A1B45]">Username</label>
              <Input
                placeholder="maya.prasetyo"
                value={newTutor.username}
                onChange={(event) =>
                  setNewTutor((current) => ({ ...current, username: event.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#0A1B45]">Password</label>
              <Input
                type="password"
                placeholder="Set initial password"
                value={newTutor.password}
                onChange={(event) =>
                  setNewTutor((current) => ({ ...current, password: event.target.value }))
                }
              />
            </div>
          </div>

          <div className="mt-4 grid gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#0A1B45]">Assigned classes</label>
              <div className="rounded-2xl border border-[#D8E5E9] bg-[#F9FCFD] p-3">
                <div className="grid gap-2">
                  {classes.map((item) => {
                    const checked = newTutor.assignedClassNames.includes(item.title);
                    return (
                      <label
                        key={item.id}
                        className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-[#0A1B45] hover:bg-white"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(event) =>
                            setNewTutor((current) => ({
                              ...current,
                              assignedClassNames: event.target.checked
                                ? [...current.assignedClassNames, item.title]
                                : current.assignedClassNames.filter((title) => title !== item.title),
                            }))
                          }
                          className="h-4 w-4 rounded border-[#C7DCE0] text-[#308279] focus:ring-[#308279]"
                        />
                        <span>{item.title}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <Button className="bg-[#308279] hover:bg-[#308279]/90" onClick={handleAddTutor}>
              <Plus className="mr-2 h-4 w-4" />
              Save Tutor
            </Button>
          </div>
        </Card>
      ) : null}

      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-[#0A1B45]">Active Tutors</h3>
          <p className="mt-1 text-sm text-[#476074]">
            Tutors that have already been approved or added manually.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tutors.map((tutor) => (
          <Card
            key={tutor.id}
            className="overflow-hidden border-[#D8E5E9] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#308279] hover:shadow-[0_20px_46px_rgba(10,27,69,0.09)]"
          >
            <div className="bg-gradient-to-br from-[#0A1B45] to-[#476074] p-6 text-white">
              <div className="mb-4 flex items-center justify-between">
                <Avatar className="h-16 w-16 border-4 border-white/20">
                  <AvatarFallback className="bg-white/20 text-xl text-white">
                    {tutor.name
                      .split(" ")
                      .map((name) => name[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-right">
                  <div className="text-2xl font-bold">{tutor.rating}</div>
                  <div className="text-sm text-white/80">Rating</div>
                </div>
              </div>
              <h3 className="text-lg font-bold">{tutor.name}</h3>
              <p className="text-sm text-white/80">
                {tutor.assignedClassNames.length > 0
                  ? tutor.assignedClassNames.join(", ")
                  : "No classes assigned yet"}
              </p>
            </div>
            <div className="space-y-3 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#476074]">Username:</span>
                <span className="font-medium text-[#0A1B45]">{tutor.username}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#476074]">Contact:</span>
                <span className="font-medium text-[#0A1B45]">{tutor.contact}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#476074]">Major:</span>
                <span className="font-medium text-[#0A1B45]">{tutor.major}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#476074]">Angkatan:</span>
                <span className="font-medium text-[#0A1B45]">{tutor.angkatan}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#476074]">Assigned classes:</span>
                <span className="font-medium text-[#0A1B45]">{tutor.assignedClasses}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#476074]">Students:</span>
                <span className="font-medium text-[#308279]">{tutor.students}</span>
              </div>
              <div className="rounded-lg bg-[#F3F8FA] p-3 text-sm text-[#476074]">
                {tutor.responsibility}
              </div>
              <div className="flex items-center justify-between border-t pt-3">
                <Badge className={getStatusBadgeClassName(tutor.status)}>{tutor.status}</Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#D8E5E9] text-[#0A1B45] hover:bg-[#F3F8FA]"
                  onClick={() => toggleTutorStatus(tutor.id)}
                >
                  {tutor.status === "Active" ? "Deactivate" : "Reactivate"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
