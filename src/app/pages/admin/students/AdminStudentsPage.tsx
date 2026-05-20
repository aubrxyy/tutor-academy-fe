import { Search } from "lucide-react";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import type { ManagedStudent } from "../shared/types";

type AdminStudentsPageProps = {
  students: ManagedStudent[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  getStatusBadgeClassName: (status: ManagedStudent["status"]) => string;
  toggleStudentStatus: (studentId: string) => void;
};

export default function AdminStudentsPage({
  students,
  searchQuery,
  setSearchQuery,
  getStatusBadgeClassName,
  toggleStudentStatus,
}: AdminStudentsPageProps) {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="app-page-header">
        <div>
          <h2 className="text-3xl font-bold text-[#0A1B45]">Students Management</h2>
          <p className="mt-2 text-[#476074]">View and manage all students</p>
        </div>
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#476074]" />
          <Input
            placeholder="Search students..."
            className="w-full pl-10"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {students.map((student) => (
          <Card
            key={student.id}
            className="overflow-hidden border-[#D8E5E9] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#308279] hover:shadow-[0_20px_46px_rgba(10,27,69,0.09)]"
          >
            <div className="bg-gradient-to-br from-[#0A1B45] via-[#16625C] to-[#308279] p-6 text-white">
              <Avatar className="mb-4 h-16 w-16 border-4 border-white/20">
                <AvatarFallback className="bg-white/20 text-xl text-white">
                  {student.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-bold">{student.name}</h3>
              <p className="text-sm text-white/80">{student.nim}</p>
            </div>
            <div className="space-y-3 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#476074]">Major:</span>
                <span className="font-medium text-[#0A1B45]">{student.major}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#476074]">Semester:</span>
                <span className="font-medium text-[#0A1B45]">{student.semester}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#476074]">Enrolled:</span>
                <span className="font-medium text-[#308279]">{student.enrolledClasses} classes</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#476074]">Completed:</span>
                <span className="font-medium text-[#0A1B45]">{student.completedClasses} classes</span>
              </div>
              <div className="flex items-center justify-between border-t pt-3">
                <Badge className={getStatusBadgeClassName(student.status)}>{student.status}</Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#D8E5E9] text-[#0A1B45] hover:bg-[#F3F8FA]"
                  onClick={() => toggleStudentStatus(student.id)}
                >
                  {student.status === "Active" ? "Deactivate" : "Reactivate"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
