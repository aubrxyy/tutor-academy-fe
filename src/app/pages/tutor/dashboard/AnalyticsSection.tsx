import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import {
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";

import type { TutorAttendancePoint, TutorChartPoint } from "./types";

type AnalyticsSectionProps = {
  sessionAttendanceData: TutorAttendancePoint[];
  studentEngagementData: TutorChartPoint[];
};

export function AnalyticsSection({
  sessionAttendanceData,
  studentEngagementData,
}: AnalyticsSectionProps) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-[#0A1B45]">Teaching Analytics</h2>
        <p className="text-[#476074]">Ringkasan performa live teaching dan engagement students</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-bold text-[#0A1B45]">Student Growth</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={studentEngagementData}>
                <CartesianGrid stroke="#92B7B0" strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="week" stroke="#476074" />
                <YAxis stroke="#476074" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #308279",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="students"
                  stroke="#308279"
                  strokeWidth={3}
                  dot={{ fill: "#308279", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 text-lg font-bold text-[#0A1B45]">Meeting Attendance Rate</h3>
          <div className="flex h-64 items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sessionAttendanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {sessionAttendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 rounded-lg bg-[#308279]/5 p-4">
            <p className="text-sm text-[#476074]">
              <span className="font-bold text-[#308279]">85%</span> students rata-rata hadir di
              pertemuan batch kamu minggu ini.
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="mb-4 text-lg font-bold text-[#0A1B45]">Performance Summary</h3>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-lg bg-[#F3F8FA] p-4">
            <div className="mb-1 text-2xl font-bold text-[#308279]">4.9</div>
            <div className="text-sm text-[#476074]">Rata-rata Rating</div>
          </div>
          <div className="rounded-lg bg-[#F3F8FA] p-4">
            <div className="mb-1 text-2xl font-bold text-[#0A1B45]">18</div>
            <div className="text-sm text-[#476074]">Dokumen Aktif</div>
          </div>
          <div className="rounded-lg bg-[#F3F8FA] p-4">
            <div className="mb-1 text-2xl font-bold text-[#0A1B45]">19</div>
            <div className="text-sm text-[#476074]">Completed Meetings</div>
          </div>
          <div className="rounded-lg bg-[#F3F8FA] p-4">
            <div className="mb-1 text-2xl font-bold text-[#308279]">Rp 5.700.000</div>
            <div className="text-sm text-[#476074]">Projected Session Payroll</div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Link to="/help-faq?role=tutor">
            <Button
              variant="outline"
              className="border-[#308279] text-[#308279]"
            >
              Open tutor help center
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Card>
    </section>
  );
}
