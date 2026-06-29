import { useState, useEffect, ReactNode } from 'react';
import {
  Building2, Home, ChevronDown, ChevronUp,
  UserCheck, Users, FileBarChart2,
  Brain, AlertCircle, ClipboardList,
  TrendingUp, Clock, BarChart3,
} from 'lucide-react';

import { UserActivityDashboard }      from './UserActivityDashboard';
import { VisitorTrackingAnalytics }   from './VisitorTrackingAnalytics';
import { ManagementReporting }        from './ManagementReporting';
import { CustomerBehaviourAnalysis }  from './CustomerBehaviourAnalysis';
import { ComplaintPatternDetection }  from './ComplaintPatternDetection';
import { ServiceRequestAnalysis }     from './ServiceRequestAnalysis';
import { FAQTrendForecasting }        from './FAQTrendForecasting';
import { PeakHourPrediction }         from './PeakHourPrediction';
import { ServiceDemandForecasting }   from './ServiceDemandForecasting';

interface AnalyticsDashboardProps {
  onClose: () => void;
  onBackToKiosk: () => void;
  /** When true: shows only User Statistics, stacked accordion, no tab bar */
  queueManagerMode?: boolean;
}

// ── Reusable collapsible subsystem card ──────────────────────
function SubsystemCard({
  title, titleMs, icon: Icon, defaultExpanded = false, children,
}: {
  title: string;
  titleMs: string;
  icon: React.ElementType;
  defaultExpanded?: boolean;
  children: ReactNode;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="bg-white border-2 border-slate-200 rounded-[16px] shadow overflow-hidden">
      <button
        onClick={() => setExpanded(v => !v)}
        className="flex items-center justify-between w-full px-6 py-4 bg-[#1B2A4A] text-white hover:bg-[#243561] transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-[#C9A84C] flex-shrink-0" strokeWidth={1.5} />
          <div>
            <p className="text-base leading-tight">{title}</p>
            <p className="text-xs text-white/60 leading-tight">{titleMs}</p>
          </div>
        </div>
        {expanded
          ? <ChevronUp  className="w-5 h-5 text-white/70 flex-shrink-0" />
          : <ChevronDown className="w-5 h-5 text-white/70 flex-shrink-0" />
        }
      </button>

      {expanded && (
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {children}
        </div>
      )}
    </div>
  );
}

// ── Main dashboard ────────────────────────────────────────────
type MainTab = 'user-statistics' | 'pattern-recognition' | 'predictive-forecasting';

const TABS: { id: MainTab; label: string; labelMs: string }[] = [
  { id: 'user-statistics',        label: 'User Statistics',        labelMs: 'Statistik Pengguna'   },
  { id: 'pattern-recognition',    label: 'Pattern Recognition',    labelMs: 'Pengecaman Corak'     },
  { id: 'predictive-forecasting', label: 'Predictive Forecasting', labelMs: 'Ramalan Prediktif'    },
];

export function AnalyticsDashboard({
  onClose,
  onBackToKiosk,
  queueManagerMode = false,
}: AnalyticsDashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab]     = useState<MainTab>('user-statistics');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (d: Date) =>
    d.toLocaleDateString('en-MY', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  // ── Queue Manager mode: compact stacked accordion ──────────
  if (queueManagerMode) {
    return (
      <div className="size-full bg-slate-50 flex flex-col">
        {/* Slim header */}
        <header className="bg-[#1B2A4A] text-white py-5 px-8 shadow-lg flex-shrink-0">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-[16px]">
                <Building2 className="w-8 h-8 text-[#C9A84C]" />
              </div>
              <div>
                <h1 className="text-2xl tracking-wide">AI-FrontDesk MPS</h1>
                <p className="text-sm text-[#C9A84C]">User Statistics — Analytics</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs">{formatDate(currentTime)}</p>
                <p className="text-lg text-[#C9A84C] tracking-wider">{formatTime(currentTime)}</p>
              </div>
              <button
                onClick={onBackToKiosk}
                className="bg-slate-600 hover:bg-slate-700 p-3 rounded-[16px] transition-colors active:scale-95"
                title="Back to Kiosk"
              >
                <Home className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Back link */}
        <div className="bg-white border-b-2 border-slate-200 px-8 py-3 flex-shrink-0">
          <button
            onClick={onClose}
            className="text-sm text-[#C9A84C] hover:underline"
          >
            ← Back to Queue Manager / Kembali ke Pengurus Giliran
          </button>
        </div>

        {/* Stacked accordion cards */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="mb-4">
              <h2 className="text-xl text-[#1B2A4A]">User Statistics</h2>
              <p className="text-sm text-slate-500">Statistik Pengguna</p>
            </div>

            <SubsystemCard title="User Activity" titleMs="Aktiviti Pengguna" icon={UserCheck} defaultExpanded>
              <UserActivityDashboard />
            </SubsystemCard>

            <SubsystemCard title="Visitor Tracking" titleMs="Penjejakan Pelawat" icon={Users} defaultExpanded>
              <VisitorTrackingAnalytics />
            </SubsystemCard>

            <SubsystemCard title="Management Reports" titleMs="Laporan Pengurusan" icon={FileBarChart2} defaultExpanded>
              <ManagementReporting />
            </SubsystemCard>
          </div>
        </main>
      </div>
    );
  }

  // ── Full mode: 3-tab side-by-side grid (for standalone analytics) ──
  return (
    <div className="size-full bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-[#1B2A4A] text-white py-5 px-8 shadow-lg flex-shrink-0">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 w-56">
            <div className="bg-white/10 p-3 rounded-[16px]">
              <Building2 className="w-10 h-10 text-[#C9A84C]" />
            </div>
          </div>
          <div className="text-center flex-1">
            <h1 className="text-3xl tracking-wide">AI-FrontDesk MPS</h1>
            <p className="text-base text-[#C9A84C]">Analytics & Insight Dashboard</p>
          </div>
          <div className="w-56 flex items-center justify-end gap-3">
            <div className="text-right">
              <p className="text-sm">{formatDate(currentTime)}</p>
              <p className="text-xl text-[#C9A84C] tracking-wider">{formatTime(currentTime)}</p>
            </div>
            <button
              onClick={onBackToKiosk}
              className="bg-slate-600 hover:bg-slate-700 p-3 rounded-[16px] transition-colors active:scale-95"
              title="Back to Kiosk"
            >
              <Home className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Tab bar */}
      <div className="bg-white border-b-2 border-slate-200 flex-shrink-0">
        <div className="max-w-[1600px] mx-auto px-8 flex items-center gap-1 py-0">
          {TABS.map(tab => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 border-b-4 transition-colors flex flex-col items-start gap-0.5 ${
                  active
                    ? 'border-[#C9A84C] text-[#1B2A4A]'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="text-base font-semibold">{tab.label}</span>
                <span className="text-xs opacity-70">{tab.labelMs}</span>
              </button>
            );
          })}
          <div className="flex-1" />
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-slate-500 hover:text-[#1B2A4A] text-sm py-4 px-3 transition-colors"
          >
            ← Back to Queue Manager / Kembali
          </button>
        </div>
      </div>

      {/* Tab content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[1600px] mx-auto">

          {activeTab === 'user-statistics' && (
            <>
              <div className="mb-5">
                <h2 className="text-2xl text-[#1B2A4A]">User Statistics</h2>
                <p className="text-base text-slate-500">Statistik Pengguna — 3 subsystems</p>
              </div>
              <div className="grid grid-cols-3 gap-5">
                <SubsystemCard title="User Activity" titleMs="Aktiviti Pengguna" icon={UserCheck} defaultExpanded>
                  <UserActivityDashboard />
                </SubsystemCard>
                <SubsystemCard title="Visitor Tracking" titleMs="Penjejakan Pelawat" icon={Users} defaultExpanded>
                  <VisitorTrackingAnalytics />
                </SubsystemCard>
                <SubsystemCard title="Management Reports" titleMs="Laporan Pengurusan" icon={FileBarChart2} defaultExpanded>
                  <ManagementReporting />
                </SubsystemCard>
              </div>
            </>
          )}

          {activeTab === 'pattern-recognition' && (
            <>
              <div className="mb-5">
                <h2 className="text-2xl text-[#1B2A4A]">Pattern Recognition</h2>
                <p className="text-base text-slate-500">Pengecaman Corak — 3 subsystems</p>
              </div>
              <div className="grid grid-cols-3 gap-5">
                <SubsystemCard title="Customer Behaviour" titleMs="Tingkah Laku Pelanggan" icon={Brain} defaultExpanded>
                  <CustomerBehaviourAnalysis />
                </SubsystemCard>
                <SubsystemCard title="Complaint Patterns" titleMs="Corak Aduan" icon={AlertCircle} defaultExpanded>
                  <ComplaintPatternDetection />
                </SubsystemCard>
                <SubsystemCard title="Service Requests" titleMs="Permintaan Perkhidmatan" icon={ClipboardList} defaultExpanded>
                  <ServiceRequestAnalysis />
                </SubsystemCard>
              </div>
            </>
          )}

          {activeTab === 'predictive-forecasting' && (
            <>
              <div className="mb-5">
                <h2 className="text-2xl text-[#1B2A4A]">Predictive Forecasting</h2>
                <p className="text-base text-slate-500">Ramalan Prediktif — 3 subsystems</p>
              </div>
              <div className="grid grid-cols-3 gap-5">
                <SubsystemCard title="FAQ Trends" titleMs="Trend Soalan Lazim" icon={TrendingUp} defaultExpanded>
                  <FAQTrendForecasting />
                </SubsystemCard>
                <SubsystemCard title="Peak Hour Prediction" titleMs="Ramalan Waktu Puncak" icon={Clock} defaultExpanded>
                  <PeakHourPrediction />
                </SubsystemCard>
                <SubsystemCard title="Service Demand" titleMs="Permintaan Perkhidmatan" icon={BarChart3} defaultExpanded>
                  <ServiceDemandForecasting />
                </SubsystemCard>
              </div>
            </>
          )}

        </div>
      </main>
    </div>
  );
}
