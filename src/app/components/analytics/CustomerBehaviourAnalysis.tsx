import { TrendingUp, Users, Target } from 'lucide-react';
import { BarChart } from './BarChart';

export function CustomerBehaviourAnalysis() {
  const completionRateData = [
    { label: 'Queue Number', labelMs: 'Nombor Giliran', value: 92 },
    { label: 'Appointments', labelMs: 'Temu Janji', value: 87 },
    { label: 'Ask Question', labelMs: 'Tanya Soalan', value: 95 },
    { label: 'Complaints', labelMs: 'Aduan', value: 78 },
    { label: 'Feedback', labelMs: 'Maklum Balas', value: 65 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl text-[#1B2A4A] mb-2">Customer Behaviour Analysis</h2>
        <p className="text-xl text-slate-600">Analisis Tingkah Laku Pelanggan</p>
      </div>

      {/* Behaviour Trend Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white border-2 border-slate-200 rounded-[16px] p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-[#C9A84C]" />
            <div>
              <p className="text-lg text-slate-600">Completion Rate</p>
              <p className="text-sm text-slate-500">Kadar Penyiapan</p>
            </div>
          </div>
          <p className="text-4xl text-[#1B2A4A] mb-2">84.2%</p>
          <p className="text-sm text-green-600">↑ 5.3% from last month</p>
        </div>
        <div className="bg-white border-2 border-slate-200 rounded-[16px] p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-8 h-8 text-[#C9A84C]" />
            <div>
              <p className="text-lg text-slate-600">Return Visitors</p>
              <p className="text-sm text-slate-500">Pelawat Berulang</p>
            </div>
          </div>
          <p className="text-4xl text-[#1B2A4A] mb-2">56.7%</p>
          <p className="text-sm text-green-600">↑ 8.1% from last month</p>
        </div>
        <div className="bg-white border-2 border-slate-200 rounded-[16px] p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-[#C9A84C]" />
            <div>
              <p className="text-lg text-slate-600">Task Success Rate</p>
              <p className="text-sm text-slate-500">Kadar Kejayaan Tugas</p>
            </div>
          </div>
          <p className="text-4xl text-[#1B2A4A] mb-2">91.5%</p>
          <p className="text-sm text-green-600">↑ 3.2% from last month</p>
        </div>
      </div>

      <BarChart
        title="Service Completion Rate"
        titleMs="Kadar Penyiapan Perkhidmatan"
        data={completionRateData}
      />

      {/* Common Navigation Paths */}
      <div className="bg-white border-2 border-slate-200 rounded-[16px] p-6 shadow-lg">
        <h3 className="text-2xl text-[#1B2A4A] mb-4">Common Navigation Paths</h3>
        <p className="text-lg text-slate-600 mb-6">Laluan Navigasi Biasa</p>
        <div className="space-y-4">
          {[
            { path: 'Home → Queue Number → Complete', percentage: 68 },
            { path: 'Home → Ask Question → Queue Number', percentage: 42 },
            { path: 'Home → Appointment → Complete', percentage: 35 },
            { path: 'Home → Ask Question → Complete', percentage: 28 }
          ].map((item, index) => (
            <div key={index}>
              <div className="flex justify-between mb-2">
                <p className="text-lg text-slate-800">{item.path}</p>
                <p className="text-lg text-[#1B2A4A]">{item.percentage}%</p>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-[#C9A84C]"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Improvements */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-[16px] p-6">
        <h3 className="text-xl text-blue-900 mb-4">💡 Suggested Improvements / Penambahbaikan Dicadangkan</h3>
        <ul className="space-y-2">
          <li className="text-lg text-blue-800">• Simplify queue number flow to reduce drop-offs</li>
          <li className="text-lg text-blue-800">• Add quick shortcuts on home screen for frequent tasks</li>
          <li className="text-lg text-blue-800">• Improve chatbot responses for licensing inquiries</li>
        </ul>
      </div>
    </div>
  );
}
