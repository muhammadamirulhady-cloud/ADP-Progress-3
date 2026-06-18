import { TrendingUp, TrendingDown } from 'lucide-react';
import { BarChart } from './BarChart';

export function ServiceRequestAnalysis() {
  const demandData = [
    { label: 'Queue Number', labelMs: 'Nombor Giliran', value: 1234 },
    { label: 'Ask Question', labelMs: 'Tanya Soalan', value: 987 },
    { label: 'Appointments', labelMs: 'Temu Janji', value: 756 },
    { label: 'Complaints', labelMs: 'Aduan', value: 543 },
    { label: 'Feedback', labelMs: 'Maklum Balas', value: 321 }
  ];

  const departmentData = [
    { label: 'Licensing', labelMs: 'Pelesenan', value: 45 },
    { label: 'Assessment & Tax', labelMs: 'Taksiran & Cukai', value: 28 },
    { label: 'Engineering', labelMs: 'Kejuruteraan', value: 18 },
    { label: 'Health & Environment', labelMs: 'Kesihatan & Alam', value: 9 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl text-[#1B2A4A] mb-2">Service Request Analysis</h2>
        <p className="text-xl text-slate-600">Analisis Permintaan Perkhidmatan</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <BarChart
          title="Service Demand Ranking"
          titleMs="Kedudukan Permintaan Perkhidmatan"
          data={demandData}
        />
        <div className="bg-white border-2 border-slate-200 rounded-[16px] p-6 shadow-lg">
          <h3 className="text-2xl text-[#1B2A4A] mb-6">Department Usage Breakdown</h3>
          <p className="text-lg text-slate-600 mb-6">Pecahan Penggunaan Jabatan</p>
          <div className="space-y-4">
            {departmentData.map((dept, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <div>
                    <p className="text-lg text-slate-800">{dept.label}</p>
                    <p className="text-sm text-slate-600">{dept.labelMs}</p>
                  </div>
                  <p className="text-xl text-[#1B2A4A]">{dept.value}%</p>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full bg-[#C9A84C]"
                    style={{ width: `${dept.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demand Classification */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-green-50 border-2 border-green-200 rounded-[16px] p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <p className="text-xl text-green-900">High Demand</p>
          </div>
          <p className="text-3xl text-green-700 mb-2">3 Services</p>
          <p className="text-sm text-slate-600">Queue, Questions, Appointments</p>
        </div>
        <div className="bg-amber-50 border-2 border-amber-200 rounded-[16px] p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-amber-600" />
            <p className="text-xl text-amber-900">Medium Demand</p>
          </div>
          <p className="text-3xl text-amber-700 mb-2">1 Service</p>
          <p className="text-sm text-slate-600">Complaints</p>
        </div>
        <div className="bg-slate-50 border-2 border-slate-200 rounded-[16px] p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingDown className="w-8 h-8 text-slate-600" />
            <p className="text-xl text-slate-900">Low Demand</p>
          </div>
          <p className="text-3xl text-slate-700 mb-2">1 Service</p>
          <p className="text-sm text-slate-600">Feedback</p>
        </div>
      </div>

      {/* Resource Allocation Insights */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-[16px] p-6">
        <h3 className="text-2xl text-blue-900 mb-4">💡 Resource Allocation Insights</h3>
        <p className="text-lg text-blue-800 mb-4">Pandangan Peruntukan Sumber</p>
        <ul className="space-y-2">
          <li className="text-lg text-blue-800">• Allocate 3 additional staff to Licensing counter during peak hours</li>
          <li className="text-lg text-blue-800">• Consider adding self-service kiosk for queue number generation</li>
          <li className="text-lg text-blue-800">• Promote online appointment booking to reduce walk-in congestion</li>
        </ul>
      </div>
    </div>
  );
}
