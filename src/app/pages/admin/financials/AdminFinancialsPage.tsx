import { Download } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";

type ClassFinancial = {
  id: number;
  className: string;
  tutor: string;
  totalStudents: number;
  totalBatches: number;
  revenuePerBatch: string;
  annualRevenue: string;
};

type AdminFinancialsPageProps = {
  classFinancials: ClassFinancial[];
  handleDownloadFinancialSpreadsheet: () => void;
  handleDownloadFinancialPdf: () => void;
};

export default function AdminFinancialsPage({
  classFinancials,
  handleDownloadFinancialSpreadsheet,
  handleDownloadFinancialPdf,
}: AdminFinancialsPageProps) {
  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[#0A1B45]">Financial Reports</h2>
          <p className="mt-2 text-[#476074]">Revenue, subscriptions, and income per class</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-[#308279] text-[#308279]"
            onClick={handleDownloadFinancialSpreadsheet}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Spreadsheet
          </Button>
          <Button className="bg-[#0A1B45] hover:bg-[#0A1B45]/90" onClick={handleDownloadFinancialPdf}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <Card className="mb-6 p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-gradient-to-br from-[#308279] to-[#92B7B0] p-4 text-white">
            <div className="text-sm">Monthly Revenue</div>
            <div className="mt-2 text-3xl font-bold">Rp 45jt</div>
          </div>
          <div className="rounded-lg bg-gradient-to-br from-[#92B7B0] to-[#476074] p-4 text-white">
            <div className="text-sm">Active Subscriptions</div>
            <div className="mt-2 text-3xl font-bold">557</div>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="border-b bg-gradient-to-r from-[#308279]/10 to-[#92B7B0]/10 p-6">
          <h3 className="text-xl font-bold text-[#0A1B45]">Class Revenue Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F3F8FA]">
              <tr>
                <th className="p-4 text-left text-[#0A1B45]">Class Name</th>
                <th className="p-4 text-left text-[#0A1B45]">Tutor</th>
                <th className="p-4 text-center text-[#0A1B45]">Total Students</th>
                <th className="p-4 text-center text-[#0A1B45]">Total Batches</th>
                <th className="p-4 text-right text-[#0A1B45]">Revenue Per Batch</th>
                <th className="p-4 text-right text-[#0A1B45]">Annual Revenue</th>
              </tr>
            </thead>
            <tbody>
              {classFinancials.map((item) => (
                <tr key={item.id} className="border-t hover:bg-[#F3F8FA]/50">
                  <td className="p-4">
                    <div className="font-medium text-[#0A1B45]">{item.className}</div>
                  </td>
                  <td className="p-4 text-[#476074]">{item.tutor}</td>
                  <td className="p-4 text-center font-medium text-[#308279]">{item.totalStudents}</td>
                  <td className="p-4 text-center font-medium text-[#0A1B45]">{item.totalBatches}</td>
                  <td className="p-4 text-right font-medium text-[#0A1B45]">{item.revenuePerBatch}</td>
                  <td className="p-4 text-right font-medium text-[#0A1B45]">{item.annualRevenue}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-[#F3F8FA] font-bold">
              <tr>
                <td colSpan={2} className="p-4 text-[#0A1B45]">Total</td>
                <td className="p-4 text-center text-[#308279]">557</td>
                <td className="p-4 text-center text-[#0A1B45]">13</td>
                <td className="p-4 text-right text-[#0A1B45]">Rp 9.150.000</td>
                <td className="p-4 text-right text-[#0A1B45]">Rp 459.600.000</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
    </div>
  );
}
