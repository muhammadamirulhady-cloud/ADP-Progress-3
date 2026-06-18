import { DateRangeFilter } from './DateRangeFilter';
import { LineChart } from './LineChart';
import { BarChart } from './BarChart';

export function VisitorTrackingAnalytics() {
  const dailyTrendData = [
    { label: 'Mon', value: 234 },
    { label: 'Tue', value: 289 },
    { label: 'Wed', value: 312 },
    { label: 'Thu', value: 278 },
    { label: 'Fri', value: 401 },
    { label: 'Sat', value: 156 },
    { label: 'Sun', value: 123 }
  ];

  const serviceCategoryData = [
    { label: 'Counter Services', labelMs: 'Perkhidmatan Kaunter', value: 456 },
    { label: 'Self-Service Kiosk', labelMs: 'Kiosk Layan Diri', value: 389 },
    { label: 'Information Inquiry', labelMs: 'Pertanyaan Maklumat', value: 267 },
    { label: 'Document Submission', labelMs: 'Penghantaran Dokumen', value: 145 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl text-[#1B2A4A] mb-2">Visitor Tracking Analytics</h2>
        <p className="text-xl text-slate-600">Analitik Penjejakan Pelawat</p>
      </div>

      <DateRangeFilter />

      <div className="grid grid-cols-2 gap-6">
        <LineChart
          title="Daily Visitor Trend"
          titleMs="Trend Pelawat Harian"
          data={dailyTrendData}
        />
        <BarChart
          title="Service Category Breakdown"
          titleMs="Pecahan Kategori Perkhidmatan"
          data={serviceCategoryData}
        />
      </div>

      {/* High Demand Period Detection */}
      <div className="bg-white border-2 border-slate-200 rounded-[16px] p-6 shadow-lg">
        <h3 className="text-2xl text-[#1B2A4A] mb-4">High Demand Period Detection</h3>
        <p className="text-lg text-slate-600 mb-6">Pengesanan Tempoh Permintaan Tinggi</p>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-red-50 border-2 border-red-200 rounded-[16px]">
            <p className="text-sm text-red-600 mb-1">CRITICAL</p>
            <p className="text-2xl text-red-700 mb-2">Friday 10AM-12PM</p>
            <p className="text-sm text-slate-600">400+ visitors expected</p>
          </div>
          <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-[16px]">
            <p className="text-sm text-amber-600 mb-1">HIGH</p>
            <p className="text-2xl text-amber-700 mb-2">Wednesday 2PM-4PM</p>
            <p className="text-sm text-slate-600">300+ visitors expected</p>
          </div>
          <div className="p-4 bg-green-50 border-2 border-green-200 rounded-[16px]">
            <p className="text-sm text-green-600 mb-1">NORMAL</p>
            <p className="text-2xl text-green-700 mb-2">Sunday All Day</p>
            <p className="text-sm text-slate-600">100-150 visitors</p>
          </div>
        </div>
      </div>
    </div>
  );
}
