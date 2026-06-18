import { Clock, AlertTriangle, Users } from 'lucide-react';

export function PeakHourPrediction() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl text-[#1B2A4A] mb-2">Peak Hour Prediction</h2>
        <p className="text-xl text-slate-600">Ramalan Waktu Puncak</p>
      </div>

      {/* Hourly Demand Heatmap */}
      <div className="bg-white border-2 border-slate-200 rounded-[16px] p-6 shadow-lg">
        <h3 className="text-2xl text-[#1B2A4A] mb-6">Hourly Demand Heatmap / Peta Haba Permintaan Setiap Jam</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-3 text-left text-sm text-slate-600">Day</th>
                {Array.from({ length: 9 }, (_, i) => i + 8).map(hour => (
                  <th key={hour} className="p-3 text-center text-sm text-slate-600">{hour}:00</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, dayIndex) => (
                <tr key={day}>
                  <td className="p-3 text-slate-800">{day}</td>
                  {Array.from({ length: 9 }, (_, hourIndex) => {
                    const intensity = Math.random();
                    const bgColor = intensity > 0.7 ? 'bg-red-500' : intensity > 0.4 ? 'bg-amber-400' : 'bg-green-300';
                    return (
                      <td key={hourIndex} className="p-1">
                        <div className={`${bgColor} h-10 rounded`}></div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-300 rounded"></div>
            <span className="text-sm text-slate-600">Low Traffic</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-amber-400 rounded"></div>
            <span className="text-sm text-slate-600">Medium Traffic</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-slate-600">High Traffic</span>
          </div>
        </div>
      </div>

      {/* Staffing Recommendation */}
      <div className="bg-white border-2 border-slate-200 rounded-[16px] p-6 shadow-lg">
        <h3 className="text-2xl text-[#1B2A4A] mb-6">Staffing Recommendation Panel</h3>
        <p className="text-lg text-slate-600 mb-6">Panel Cadangan Kakitangan</p>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-red-50 border-2 border-red-200 rounded-[16px]">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <p className="text-lg text-red-900">Peak Hours</p>
            </div>
            <p className="text-2xl text-red-700 mb-2">10AM - 12PM</p>
            <p className="text-sm text-slate-600 mb-3">Friday</p>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-red-600" />
              <p className="text-lg text-red-700">Recommend: 8 staff</p>
            </div>
          </div>
          <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-[16px]">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-6 h-6 text-amber-600" />
              <p className="text-lg text-amber-900">Medium Hours</p>
            </div>
            <p className="text-2xl text-amber-700 mb-2">2PM - 4PM</p>
            <p className="text-sm text-slate-600 mb-3">Mon-Thu</p>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-600" />
              <p className="text-lg text-amber-700">Recommend: 5 staff</p>
            </div>
          </div>
          <div className="p-4 bg-green-50 border-2 border-green-200 rounded-[16px]">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-6 h-6 text-green-600" />
              <p className="text-lg text-green-900">Low Hours</p>
            </div>
            <p className="text-2xl text-green-700 mb-2">8AM - 9AM</p>
            <p className="text-sm text-slate-600 mb-3">Weekends</p>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              <p className="text-lg text-green-700">Recommend: 2 staff</p>
            </div>
          </div>
        </div>
      </div>

      {/* High Traffic Alert */}
      <div className="bg-red-50 border-2 border-red-200 rounded-[16px] p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-8 h-8 text-red-600" />
          <div>
            <h3 className="text-2xl text-red-900">High Traffic Alert</h3>
            <p className="text-lg text-red-700">Amaran Trafik Tinggi</p>
          </div>
        </div>
        <p className="text-lg text-red-800 mb-3">🔴 Expected high traffic this Friday 10AM-12PM (400+ visitors)</p>
        <p className="text-lg text-slate-700">Action: Deploy additional 3 staff members to counters and kiosk assistance</p>
      </div>
    </div>
  );
}
