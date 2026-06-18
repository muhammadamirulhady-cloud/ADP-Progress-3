import { LineChart } from './LineChart';
import { TrendingUp } from 'lucide-react';

export function ServiceDemandForecasting() {
  const forecastData = [
    { label: 'Jun', value: 1234 },
    { label: 'Jul', value: 1398 },
    { label: 'Aug', value: 1456 },
    { label: 'Sep', value: 1589 },
    { label: 'Oct', value: 1712 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl text-[#1B2A4A] mb-2">Government Service Demand Forecasting</h2>
        <p className="text-xl text-slate-600">Ramalan Permintaan Perkhidmatan Kerajaan</p>
      </div>

      <LineChart
        title="Forecasted Service Volume"
        titleMs="Ramalan Jumlah Perkhidmatan"
        data={forecastData}
        color="#10b981"
      />

      {/* Seasonal Trend Analysis */}
      <div className="bg-white border-2 border-slate-200 rounded-[16px] p-6 shadow-lg">
        <h3 className="text-2xl text-[#1B2A4A] mb-6">Seasonal Trend Analysis</h3>
        <p className="text-lg text-slate-600 mb-6">Analisis Trend Bermusim</p>
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-[16px]">
            <p className="text-sm text-blue-600 mb-2">Q1 (Jan-Mar)</p>
            <p className="text-2xl text-blue-700 mb-1">High</p>
            <p className="text-sm text-slate-600">License renewals peak</p>
          </div>
          <div className="p-4 bg-green-50 border-2 border-green-200 rounded-[16px]">
            <p className="text-sm text-green-600 mb-2">Q2 (Apr-Jun)</p>
            <p className="text-2xl text-green-700 mb-1">Medium</p>
            <p className="text-sm text-slate-600">Moderate activity</p>
          </div>
          <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-[16px]">
            <p className="text-sm text-amber-600 mb-2">Q3 (Jul-Sep)</p>
            <p className="text-2xl text-amber-700 mb-1">Medium</p>
            <p className="text-sm text-slate-600">Summer requests</p>
          </div>
          <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-[16px]">
            <p className="text-sm text-purple-600 mb-2">Q4 (Oct-Dec)</p>
            <p className="text-2xl text-purple-700 mb-1">High</p>
            <p className="text-sm text-slate-600">Year-end rush</p>
          </div>
        </div>
      </div>

      {/* Service Popularity Projection */}
      <div className="bg-white border-2 border-slate-200 rounded-[16px] p-6 shadow-lg">
        <h3 className="text-2xl text-[#1B2A4A] mb-6">Service Popularity Projection</h3>
        <p className="text-lg text-slate-600 mb-6">Unjuran Populariti Perkhidmatan</p>
        <div className="space-y-4">
          {[
            { service: 'Queue Number', serviceMs: 'Nombor Giliran', current: 1234, forecast: 1589, confidence: 94 },
            { service: 'Licensing', serviceMs: 'Pelesenan', current: 987, forecast: 1256, confidence: 91 },
            { service: 'Appointments', serviceMs: 'Temu Janji', current: 756, forecast: 945, confidence: 88 },
            { service: 'Ask Question', serviceMs: 'Tanya Soalan', current: 654, forecast: 812, confidence: 85 }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-[16px]">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <p className="text-lg text-slate-800">{item.service}</p>
                  <p className="text-sm text-slate-600">/ {item.serviceMs}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-600">Current: {item.current}</span>
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">Forecast: {item.forecast}</span>
                  <span className="text-sm text-blue-600">Confidence: {item.confidence}%</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-green-100 px-3 py-2 rounded-full">
                <TrendingUp className="w-5 h-5 text-green-700" />
                <span className="text-lg text-green-700">+{Math.round(((item.forecast - item.current) / item.current) * 100)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Operational Actions */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-[16px] p-6">
        <h3 className="text-2xl text-blue-900 mb-4">🎯 Suggested Operational Actions</h3>
        <p className="text-lg text-blue-800 mb-4">Tindakan Operasi Dicadangkan</p>
        <ul className="space-y-2">
          <li className="text-lg text-blue-800">• Increase queue number kiosks from 2 to 4 units by September</li>
          <li className="text-lg text-blue-800">• Hire 2 additional licensing officers for Q4 peak period</li>
          <li className="text-lg text-blue-800">• Launch appointment pre-booking system to manage demand</li>
          <li className="text-lg text-blue-800">• Expand chatbot knowledge base for common licensing questions</li>
        </ul>
      </div>
    </div>
  );
}
