import { AlertTriangle } from 'lucide-react';
import { BarChart } from './BarChart';
import { LineChart } from './LineChart';

export function ComplaintPatternDetection() {
  const categoryData = [
    { label: 'Waste Management', labelMs: 'Pengurusan Sisa', value: 89 },
    { label: 'Road Maintenance', labelMs: 'Penyelenggaraan Jalan', value: 67 },
    { label: 'Licensing Issues', labelMs: 'Isu Pelesenan', value: 45 },
    { label: 'Counter Service', labelMs: 'Perkhidmatan Kaunter', value: 34 }
  ];

  const trendData = [
    { label: 'Jan', value: 45 },
    { label: 'Feb', value: 52 },
    { label: 'Mar', value: 67 },
    { label: 'Apr', value: 71 },
    { label: 'May', value: 89 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl text-[#1B2A4A] mb-2">Complaint Pattern Detection</h2>
        <p className="text-xl text-slate-600">Pengesanan Corak Aduan</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <BarChart
          title="Complaint Category Breakdown"
          titleMs="Pecahan Kategori Aduan"
          data={categoryData}
        />
        <LineChart
          title="Complaint Trend Timeline"
          titleMs="Garis Masa Trend Aduan"
          data={trendData}
          color="#ef4444"
        />
      </div>

      {/* Emerging Trends Panel */}
      <div className="bg-red-50 border-2 border-red-200 rounded-[16px] p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-8 h-8 text-red-600" />
          <div>
            <h3 className="text-2xl text-red-900">Emerging Trends Alert</h3>
            <p className="text-lg text-red-700">Amaran Trend Baru Muncul</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="bg-white rounded-[16px] p-4">
            <p className="text-lg text-red-800 mb-2">🔴 Waste Management complaints increased 34% this month</p>
            <p className="text-sm text-slate-600">Keywords: "uncollected", "overflow", "delay"</p>
          </div>
          <div className="bg-white rounded-[16px] p-4">
            <p className="text-lg text-amber-800 mb-2">🟡 Road Maintenance issues rising in Zone B</p>
            <p className="text-sm text-slate-600">Keywords: "pothole", "traffic light", "signage"</p>
          </div>
        </div>
      </div>

      {/* Keyword Frequency */}
      <div className="bg-white border-2 border-slate-200 rounded-[16px] p-6 shadow-lg">
        <h3 className="text-2xl text-[#1B2A4A] mb-6">Top Keywords / Kata Kunci Teratas</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { word: 'uncollected', count: 45 },
            { word: 'delay', count: 38 },
            { word: 'pothole', count: 29 },
            { word: 'overflow', count: 24 },
            { word: 'broken', count: 21 },
            { word: 'waiting', count: 18 }
          ].map((keyword, index) => (
            <div
              key={index}
              className="px-5 py-3 bg-red-100 text-red-700 rounded-[16px] border-2 border-red-200"
            >
              <span className="text-lg">{keyword.word}</span>
              <span className="ml-2 text-sm">({keyword.count})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
