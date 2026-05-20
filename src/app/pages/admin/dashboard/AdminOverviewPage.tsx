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
import { useAuth } from "../../../auth/AuthContext";
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

type RegistrationStatsPoint = {
  day: string;
  registrants: number;
};

type AdminOverviewPageProps = {
  stats: AdminStat[];
  revenueData: RevenuePoint[];
  userGrowthData: UserGrowthPoint[];
  registrationStatsData: RegistrationStatsPoint[];
  setAdminView: (view: AdminView) => void;
};

export default function AdminOverviewPage({
  
  stats,
  revenueData,
  userGrowthData,
  registrationStatsData,
  setAdminView,
  
}: AdminOverviewPageProps) {
  const { logout, user } = useAuth();
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <section className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#0A1B45] via-[#123061] to-[#308279] p-6 text-white shadow-[0_24px_60px_rgba(10,27,69,0.14)] sm:p-8">
        <div>
          <h2 className="text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
            Welcome, {user?.name ?? "Ops Admin"}!
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-white/75">
            Tutor sekarang fokus pada live session dan dokumen belajar. Admin memegang
            workflow pembuatan class, struktur video, pricing, dan monitoring transaksi.
          </p>
        </div>
      </section>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <button
            key={stat.label}
            type="button"
            onClick={() => setAdminView(stat.view)}
            className="rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#308279]/40 focus-visible:ring-offset-2"
          >
            <Card className="h-full cursor-pointer border-[#D8E5E9] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#308279] hover:shadow-[0_20px_46px_rgba(10,27,69,0.1)]">
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
              <div className="mb-2 text-3xl font-bold tracking-[-0.03em] text-[#0A1B45]">{stat.value}</div>
              <div className="mb-2 text-sm text-[#476074]">{stat.label}</div>
              <div className="text-xs font-medium text-green-600">{stat.change} data</div>
            </Card>
          </button>
        ))}
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-5 sm:p-6">
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

        <Card className="p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#0A1B45]">User Growth Tracking</h3>
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
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#0A1B45]">Students Enrolled</h3>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={registrationStatsData}>
              <CartesianGrid stroke="#92B7B0" strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="day" stroke="#476074" />
              <YAxis stroke="#476074" />
              <Tooltip
                formatter={(value, name) => {
                  return [value, "Pendaftar"];
                }}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #308279",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="registrants" fill="#308279" radius={[8, 8, 0, 0]} name="Registrants" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
