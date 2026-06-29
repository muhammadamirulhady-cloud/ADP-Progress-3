import { useState } from 'react';
import { FileText, Download, FileSpreadsheet, CheckCircle, X } from 'lucide-react';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'info';
}

let toastCounter = 0;

export function ManagementReporting() {
  const [reports, setReports] = useState([
    { id: 'RPT001', name: 'Monthly Performance Report',   date: '2026-05-01', status: 'Ready'      },
    { id: 'RPT002', name: 'Service Usage Summary',        date: '2026-05-02', status: 'Ready'      },
    { id: 'RPT003', name: 'Customer Feedback Analysis',   date: '2026-05-03', status: 'Processing' },
  ]);

  const [reportType, setReportType]   = useState('Performance Summary');
  const [dateRange, setDateRange]     = useState('Last 30 Days');
  const [toasts, setToasts]           = useState<Toast[]>([]);
  const [generating, setGenerating]   = useState(false);

  function addToast(message: string, type: Toast['type'] = 'success') {
    const id = ++toastCounter;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }

  function dismissToast(id: number) {
    setToasts(prev => prev.filter(t => t.id !== id));
  }

  function handleGenerate() {
    setGenerating(true);
    setTimeout(() => {
      const newId = `RPT${String(reports.length + 1).padStart(3, '0')}`;
      const today = new Date().toISOString().slice(0, 10);
      setReports(prev => [
        ...prev,
        { id: newId, name: reportType, date: today, status: 'Ready' },
      ]);
      setGenerating(false);
      addToast('Success! Management Report has been dynamically compiled and generated.');
    }, 1200);
  }

  function handleDownloadPDF(reportName: string) {
    addToast(`PDF downloaded successfully — "${reportName}"`);
  }

  function handleExportExcel(reportName: string) {
    addToast(`Excel spreadsheet exported successfully — "${reportName}"`);
  }

  return (
    <div className="space-y-6 relative">

      {/* Toast stack */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className="flex items-start gap-3 bg-[#1B2A4A] text-white px-5 py-4 rounded-[16px] shadow-2xl max-w-sm pointer-events-auto animate-in slide-in-from-bottom-4 duration-300"
          >
            <CheckCircle className="w-5 h-5 text-[#C9A84C] flex-shrink-0 mt-0.5" />
            <p className="text-base flex-1 leading-snug">{toast.message}</p>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-white/60 hover:text-white flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

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
            <select
              value={reportType}
              onChange={e => setReportType(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C]"
            >
              <option>Performance Summary</option>
              <option>Service Analytics</option>
              <option>Customer Insights</option>
              <option>Operational Metrics</option>
            </select>
          </div>
          <div>
            <label className="block text-lg text-slate-700 mb-2">Date Range / Julat Tarikh</label>
            <select
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C]"
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last Quarter</option>
              <option>Custom Range</option>
            </select>
          </div>
        </div>
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="w-full bg-[#C9A84C] hover:bg-[#B8973B] disabled:opacity-60 text-white py-4 rounded-[16px] transition-colors flex items-center justify-center gap-3"
        >
          {generating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              <span className="text-lg">Generating… / Menjana…</span>
            </>
          ) : (
            <>
              <FileText className="w-6 h-6" />
              <span className="text-lg">Generate Report / Jana Laporan</span>
            </>
          )}
        </button>
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
              {reports.map((report, index) => (
                <tr
                  key={report.id}
                  className={index !== reports.length - 1 ? 'border-b border-slate-200' : ''}
                >
                  <td className="px-6 py-4 text-lg text-slate-800">{report.id}</td>
                  <td className="px-6 py-4 text-lg text-slate-800">{report.name}</td>
                  <td className="px-6 py-4 text-lg text-slate-600">{report.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      report.status === 'Ready'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDownloadPDF(report.name)}
                        disabled={report.status !== 'Ready'}
                        className="bg-[#C9A84C] hover:bg-[#B8973B] disabled:opacity-40 text-white px-4 py-2 rounded-[16px] text-sm transition-colors flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        PDF
                      </button>
                      <button
                        onClick={() => handleExportExcel(report.name)}
                        disabled={report.status !== 'Ready'}
                        className="bg-green-600 hover:bg-green-700 disabled:opacity-40 text-white px-4 py-2 rounded-[16px] text-sm transition-colors flex items-center gap-2"
                      >
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
