import { useState } from 'react';
import { LineChart } from './LineChart';
import { BarChart } from './BarChart';

// Seed data per "period" so Apply Filter visibly changes everything
const DATA_SETS: Record<string, {
  dailyTrend: { label: string; value: number }[];
  serviceCategory: { label: string; labelMs: string; value: number }[];
  totalVisitors: number;
  avgDaily: number;
  peakDay: string;
  highDemand: { level: string; label: string; desc: string }[];
}> = {
  '7': {
    dailyTrend: [
      { label: 'Mon', value: 180 }, { label: 'Tue', value: 210 },
      { label: 'Wed', value: 245 }, { label: 'Thu', value: 198 },
      { label: 'Fri', value: 320 }, { label: 'Sat', value: 110 }, { label: 'Sun', value: 90 },
    ],
    serviceCategory: [
      { label: 'Counter Services',    labelMs: 'Perkhidmatan Kaunter',  value: 310 },
      { label: 'Self-Service Kiosk',  labelMs: 'Kiosk Layan Diri',      value: 274 },
      { label: 'Information Inquiry', labelMs: 'Pertanyaan Maklumat',   value: 195 },
      { label: 'Document Submission', labelMs: 'Penghantaran Dokumen',  value: 88  },
    ],
    totalVisitors: 1353, avgDaily: 193, peakDay: 'Friday',
    highDemand: [
      { level: 'CRITICAL', label: 'Friday 10AM–12PM',   desc: '320+ visitors expected' },
      { level: 'HIGH',     label: 'Wednesday 2PM–4PM',  desc: '245+ visitors expected' },
      { level: 'NORMAL',   label: 'Sunday All Day',     desc: '90–110 visitors'        },
    ],
  },
  '30': {
    dailyTrend: [
      { label: 'Wk 1', value: 1123 }, { label: 'Wk 2', value: 1345 },
      { label: 'Wk 3', value: 1567 }, { label: 'Wk 4', value: 1289 },
    ],
    serviceCategory: [
      { label: 'Counter Services',    labelMs: 'Perkhidmatan Kaunter',  value: 1890 },
      { label: 'Self-Service Kiosk',  labelMs: 'Kiosk Layan Diri',      value: 1456 },
      { label: 'Information Inquiry', labelMs: 'Pertanyaan Maklumat',   value: 987  },
      { label: 'Document Submission', labelMs: 'Penghantaran Dokumen',  value: 543  },
    ],
    totalVisitors: 5324, avgDaily: 177, peakDay: 'Fridays',
    highDemand: [
      { level: 'CRITICAL', label: 'Every Friday 10AM–12PM', desc: '400+ visitors expected' },
      { level: 'HIGH',     label: 'Month-end Wed 2PM–4PM', desc: '300+ visitors expected' },
      { level: 'NORMAL',   label: 'Weekends',              desc: '100–150 visitors'        },
    ],
  },
  '90': {
    dailyTrend: [
      { label: 'Apr', value: 4501 }, { label: 'May', value: 5234 }, { label: 'Jun', value: 4890 },
    ],
    serviceCategory: [
      { label: 'Counter Services',    labelMs: 'Perkhidmatan Kaunter',  value: 5812 },
      { label: 'Self-Service Kiosk',  labelMs: 'Kiosk Layan Diri',      value: 4623 },
      { label: 'Information Inquiry', labelMs: 'Pertanyaan Maklumat',   value: 2901 },
      { label: 'Document Submission', labelMs: 'Penghantaran Dokumen',  value: 1289 },
    ],
    totalVisitors: 14625, avgDaily: 163, peakDay: 'May (month-end)',
    highDemand: [
      { level: 'CRITICAL', label: 'May 29–31 (month-end)', desc: '600+ daily visitors'  },
      { level: 'HIGH',     label: 'All Fridays 10AM–12PM', desc: '400+ visitors'        },
      { level: 'NORMAL',   label: 'Weekends',              desc: '80–130 visitors'      },
    ],
  },
  'custom': {
    dailyTrend: [
      { label: 'Day 1', value: 95 },  { label: 'Day 2', value: 143 },
      { label: 'Day 3', value: 201 }, { label: 'Day 4', value: 178 },
      { label: 'Day 5', value: 267 },
    ],
    serviceCategory: [
      { label: 'Counter Services',    labelMs: 'Perkhidmatan Kaunter',  value: 412 },
      { label: 'Self-Service Kiosk',  labelMs: 'Kiosk Layan Diri',      value: 336 },
      { label: 'Information Inquiry', labelMs: 'Pertanyaan Maklumat',   value: 214 },
      { label: 'Document Submission', labelMs: 'Penghantaran Dokumen',  value: 122 },
    ],
    totalVisitors: 884, avgDaily: 177, peakDay: 'Day 5',
    highDemand: [
      { level: 'CRITICAL', label: 'Day 5 (peak)',       desc: '267 visitors'  },
      { level: 'HIGH',     label: 'Day 3 (mid-period)', desc: '201 visitors'  },
      { level: 'NORMAL',   label: 'Day 1 (start)',      desc: '95 visitors'   },
    ],
  },
};

const DEMAND_COLORS: Record<string, string> = {
  CRITICAL: 'bg-red-50 border-red-200 text-red-600 text-red-700',
  HIGH:     'bg-amber-50 border-amber-200 text-amber-600 text-amber-700',
  NORMAL:   'bg-green-50 border-green-200 text-green-600 text-green-700',
};

export function VisitorTrackingAnalytics() {
  const [periodKey, setPeriodKey] = useState('30');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activeData, setActiveData] = useState(DATA_SETS['30']);
  const [lastApplied, setLastApplied] = useState('Last 30 Days');

  function handleApplyFilter() {
    const key = periodKey === 'custom' && startDate && endDate ? 'custom' : periodKey;
    const next = DATA_SETS[key] ?? DATA_SETS['30'];

    // Apply service-category filter by scaling values
    const scaleFactor: Record<string, number> = {
      all: 1, counter: 1.4, kiosk: 0.7, inquiry: 0.5, document: 0.25,
    };
    const scale = scaleFactor[serviceFilter] ?? 1;

    setActiveData({
      ...next,
      serviceCategory: next.serviceCategory.map(item => ({
        ...item,
        value: Math.round(item.value * scale),
      })),
      totalVisitors: Math.round(next.totalVisitors * scale),
      avgDaily: Math.round(next.avgDaily * scale),
    });

    const periodLabel: Record<string, string> = {
      '7': 'Last 7 Days', '30': 'Last 30 Days', '90': 'Last 90 Days', custom: `${startDate} → ${endDate}`,
    };
    setLastApplied(periodLabel[periodKey] ?? periodLabel['30']);
  }

  const highDemand = activeData.highDemand;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl text-[#1B2A4A] mb-2">Visitor Tracking Analytics</h2>
        <p className="text-xl text-slate-600">Analitik Penjejakan Pelawat</p>
      </div>

      {/* Filter Panel */}
      <div className="bg-white border-2 border-slate-200 rounded-[16px] p-6 shadow-lg">
        <h3 className="text-xl text-[#1B2A4A] mb-4">Filter / Penapis</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-base text-slate-600 mb-2">Period / Tempoh</label>
            <select
              value={periodKey}
              onChange={e => setPeriodKey(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C] text-base"
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <div>
            <label className="block text-base text-slate-600 mb-2">Service Type / Jenis Perkhidmatan</label>
            <select
              value={serviceFilter}
              onChange={e => setServiceFilter(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C] text-base"
            >
              <option value="all">All Services</option>
              <option value="counter">Counter Services Only</option>
              <option value="kiosk">Self-Service Kiosk Only</option>
              <option value="inquiry">Information Inquiry Only</option>
              <option value="document">Document Submission Only</option>
            </select>
          </div>
        </div>

        {periodKey === 'custom' && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-base text-slate-600 mb-2">Start Date / Tarikh Mula</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C]"
              />
            </div>
            <div>
              <label className="block text-base text-slate-600 mb-2">End Date / Tarikh Tamat</label>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C]"
              />
            </div>
          </div>
        )}

        <button
          onClick={handleApplyFilter}
          className="bg-[#C9A84C] hover:bg-[#B8973B] text-white px-8 py-3 rounded-[16px] transition-colors text-base active:scale-95"
        >
          Apply Filter / Guna Penapis
        </button>

        {lastApplied && (
          <p className="mt-3 text-sm text-slate-500">
            Showing: <span className="text-[#1B2A4A] font-medium">{lastApplied}</span>
            {serviceFilter !== 'all' && (
              <> · Service: <span className="text-[#1B2A4A] font-medium">
                {serviceFilter.charAt(0).toUpperCase() + serviceFilter.slice(1)}
              </span></>
            )}
          </p>
        )}
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border-2 border-slate-200 rounded-[16px] p-5 shadow-lg text-center">
          <p className="text-base text-slate-500 mb-1">Total Visitors / Jumlah Pelawat</p>
          <p className="text-4xl text-[#C9A84C]">{activeData.totalVisitors.toLocaleString()}</p>
        </div>
        <div className="bg-white border-2 border-slate-200 rounded-[16px] p-5 shadow-lg text-center">
          <p className="text-base text-slate-500 mb-1">Daily Average / Purata Harian</p>
          <p className="text-4xl text-[#1B2A4A]">{activeData.avgDaily}</p>
        </div>
        <div className="bg-white border-2 border-slate-200 rounded-[16px] p-5 shadow-lg text-center">
          <p className="text-base text-slate-500 mb-1">Peak Day / Hari Puncak</p>
          <p className="text-2xl text-[#1B2A4A]">{activeData.peakDay}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <LineChart
          title="Visitor Trend"
          titleMs="Trend Pelawat"
          data={activeData.dailyTrend}
        />
        <BarChart
          title="Service Category Breakdown"
          titleMs="Pecahan Kategori Perkhidmatan"
          data={activeData.serviceCategory}
        />
      </div>

      {/* High Demand Period Detection */}
      <div className="bg-white border-2 border-slate-200 rounded-[16px] p-6 shadow-lg">
        <h3 className="text-2xl text-[#1B2A4A] mb-2">High Demand Period Detection</h3>
        <p className="text-lg text-slate-600 mb-6">Pengesanan Tempoh Permintaan Tinggi</p>
        <div className="grid grid-cols-3 gap-4">
          {highDemand.map(item => {
            const classes = DEMAND_COLORS[item.level] ?? DEMAND_COLORS['NORMAL'];
            const [bg, border, labelColor, textColor] = classes.split(' ');
            return (
              <div key={item.level} className={`p-4 ${bg} border-2 ${border} rounded-[16px]`}>
                <p className={`text-sm ${labelColor} mb-1`}>{item.level}</p>
                <p className={`text-xl ${textColor} mb-2`}>{item.label}</p>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
