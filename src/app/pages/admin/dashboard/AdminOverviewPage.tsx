import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "../../../components/ui/badge";
import { Card } from "../../../components/ui/card";
import type { AdminView } from "../shared/types";

type AdminStat = {
  icon: LucideIcon;
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  color: string;
  view: AdminView;
};

type RevenuePoint = {
  month: string;
  revenue: number;
};

type UserGrowthPoint = {
  week: string;
  students: number;
  tutors: number;
};

type ClassPerformancePoint = {
  className: string;
  completion: number;
  students: number;
};

type AdminOverviewPageProps = {
  stats: AdminStat[];
  revenueData: RevenuePoint[];
  userGrowthData: UserGrowthPoint[];
  classPerformanceData: ClassPerformancePoint[];
  setAdminView: (view: AdminView) => void;
};

export default function AdminOverviewPage({
  stats,
  revenueData,
  userGrowthData,
  classPerformanceData,
  setAdminView,
}: AdminOverviewPageProps) {
  return (
    <div className="p-8">
      <div className="mb-8 rounded-[2rem] bg-gradient-to-r from-[#0A1B45] via-[#123061] to-[#308279] p-8 text-white shadow-[0_24px_60px_rgba(10,27,69,0.14)]">
        <div>
          <h2 className="mt-5 text-4xl font-bold tracking-[-0.04em]">
            im craving some chinese and its not food
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-white/75">
            Tutor sekarang fokus pada live session dan dokumen belajar. Admin memegang
            workflow pembuatan class, struktur video, pricing, dan monitoring transaksi.
          </p>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <button
            key={stat.label}
            type="button"
            onClick={() => setAdminView(stat.view)}
            className="text-left"
          >
            <Card className="cursor-pointer border-2 p-6 transition-all hover:border-[#308279] hover:shadow-lg">
              <div className="mb-4 flex items-start justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${stat.color}`}
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-5 w-5 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-5 w-5 text-red-500" />
                )}
              </div>
              <div className="mb-2 text-3xl font-bold text-[#0A1B45]">{stat.value}</div>
              <div className="mb-2 text-sm text-[#476074]">{stat.label}</div>
              <div className="text-xs font-medium text-green-600">{stat.change} data</div>
            </Card>
          </button>
        ))}
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#0A1B45]">Revenue Growth Trend</h3>
            <Badge className="border-0 bg-green-100 text-green-700">+15% Growth</Badge>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#308279" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#308279" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#92B7B0" strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" stroke="#476074" />
                <YAxis
                  stroke="#476074"
                  label={{ value: "Juta Rp", angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #308279",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#308279"
                  strokeWidth={3}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#0A1B45]">User Growth Tracking</h3>
            <Badge className="border-0 bg-[#308279]/20 text-[#308279]">Last 4 Weeks</Badge>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData}>
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
                  name="Students"
                />
                <Line
                  type="monotone"
                  dataKey="tutors"
                  stroke="#0A1B45"
                  strokeWidth={3}
                  dot={{ fill: "#0A1B45", r: 5 }}
                  name="Tutors"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#0A1B45]">Top Class Performance</h3>
          <Badge className="border-0 bg-[#0A1B45]/10 text-[#0A1B45]">WIP</Badge>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={classPerformanceData}>
              <CartesianGrid stroke="#92B7B0" strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="className" stroke="#476074" />
              <YAxis stroke="#476074" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #308279",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="completion" fill="#308279" radius={[8, 8, 0, 0]} name="Completion %" />
              <Bar dataKey="students" fill="#0A1B45" radius={[8, 8, 0, 0]} name="Students" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
