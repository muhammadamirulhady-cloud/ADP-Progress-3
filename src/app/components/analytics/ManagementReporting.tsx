import { FileText, Download, FileSpreadsheet } from 'lucide-react';

export function ManagementReporting() {
  const generatedReports = [
    { id: 'RPT001', name: 'Monthly Performance Report', date: '2026-05-01', status: 'Ready' },
    { id: 'RPT002', name: 'Service Usage Summary', date: '2026-05-02', status: 'Ready' },
    { id: 'RPT003', name: 'Customer Feedback Analysis', date: '2026-05-03', status: 'Processing' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl text-[#1B2A4A] mb-2">Management Reporting System</h2>
        <p className="text-xl text-slate-600">Sistem Pelaporan Pengurusan</p>
      </div>

      {/* Report Generation Form */}
      <div className="bg-white border-2 border-slate-200 rounded-[16px] p-6 shadow-lg">
        <h3 className="text-2xl text-[#1B2A4A] mb-6">Generate New Report / Jana Laporan Baharu</h3>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-lg text-slate-700 mb-2">Report Type / Jenis Laporan</label>
            <select className="w-full px-4 py-3 border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C]">
              <option>Performance Summary</option>
              <option>Service Analytics</option>
              <option>Customer Insights</option>
              <option>Operational Metrics</option>
            </select>
          </div>
          <div>
            <label className="block text-lg text-slate-700 mb-2">Date Range / Julat Tarikh</label>
            <select className="w-full px-4 py-3 border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C]">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last Quarter</option>
              <option>Custom Range</option>
            </select>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="flex-1 bg-[#C9A84C] hover:bg-[#B8973B] text-white py-4 rounded-[16px] transition-colors flex items-center justify-center gap-3">
            <FileText className="w-6 h-6" />
            <span className="text-lg">Generate Report / Jana Laporan</span>
          </button>
        </div>
      </div>

      {/* Generated Reports Table */}
      <div className="bg-white border-2 border-slate-200 rounded-[16px] overflow-hidden shadow-lg">
        <div className="bg-slate-100 px-6 py-4 border-b-2 border-slate-200">
          <h3 className="text-2xl text-[#1B2A4A]">Generated Reports / Laporan Yang Dijana</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-lg text-slate-700">Report ID</th>
                <th className="px-6 py-4 text-left text-lg text-slate-700">Report Name</th>
                <th className="px-6 py-4 text-left text-lg text-slate-700">Generated Date</th>
                <th className="px-6 py-4 text-left text-lg text-slate-700">Status</th>
                <th className="px-6 py-4 text-left text-lg text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {generatedReports.map((report, index) => (
                <tr key={report.id} className={index !== generatedReports.length - 1 ? 'border-b border-slate-200' : ''}>
                  <td className="px-6 py-4 text-lg text-slate-800">{report.id}</td>
                  <td className="px-6 py-4 text-lg text-slate-800">{report.name}</td>
                  <td className="px-6 py-4 text-lg text-slate-600">{report.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      report.status === 'Ready' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="bg-[#C9A84C] hover:bg-[#B8973B] text-white px-4 py-2 rounded-[16px] text-sm transition-colors flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        PDF
                      </button>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-[16px] text-sm transition-colors flex items-center gap-2">
                        <FileSpreadsheet className="w-4 h-4" />
                        Excel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
