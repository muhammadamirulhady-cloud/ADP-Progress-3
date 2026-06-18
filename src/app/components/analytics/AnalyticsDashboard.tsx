import { useState, useEffect } from 'react';
import { Building2, BarChart3, ArrowLeft, Home, UserCheck, Users, UserCog } from 'lucide-react';
import { UserActivityDashboard } from './UserActivityDashboard';
import { VisitorTrackingAnalytics } from './VisitorTrackingAnalytics';
import { ManagementReporting } from './ManagementReporting';

interface AnalyticsDashboardProps {
  onClose: () => void;
  onBackToKiosk: () => void;
}

type AnalyticsView =
  | 'overview'
  | 'user-activity'
  | 'visitor-tracking'
  | 'management-reporting';

export function AnalyticsDashboard({ onClose, onBackToKiosk }: AnalyticsDashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentView, setCurrentView] = useState<AnalyticsView>('overview');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-MY', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-MY', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const menuItems = [
    { id: 'user-activity', title: 'User Activity', titleMs: 'Aktiviti Pengguna', module: 'User Statistics', icon: UserCheck },
    { id: 'visitor-tracking', title: 'Visitor Tracking', titleMs: 'Penjejakan Pelawat', module: 'User Statistics', icon: Users },
    { id: 'management-reporting', title: 'Management Reports', titleMs: 'Laporan Pengurusan', module: 'User Statistics', icon: UserCog }
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'user-activity':
        return <UserActivityDashboard />;
      case 'visitor-tracking':
        return <VisitorTrackingAnalytics />;
      case 'management-reporting':
        return <ManagementReporting />;
      default:
        return (
          <div>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-4xl text-[#1B2A4A] mb-2">Analytics & Insight</h2>
                <p className="text-2xl text-slate-600">Analitik & Pandangan</p>
              </div>
              <button
                onClick={onClose}
                className="bg-[#C9A84C] hover:bg-[#B8973B] text-white px-6 py-4 rounded-[16px] transition-colors active:scale-95 flex items-center gap-3"
                title="Back to Queue Manager / Kembali ke Pengurus Giliran"
              >
                <ArrowLeft className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-lg">Back to Queue Manager</div>
                  <div className="text-sm opacity-90">Kembali ke Pengurus Giliran</div>
                </div>
              </button>
            </div>

            {/* User Statistics Module */}
            <div className="mb-8">
              <h3 className="text-2xl text-[#1B2A4A] mb-4">User Statistics</h3>
              <div className="grid grid-cols-3 gap-6">
                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentView(item.id as AnalyticsView)}
                      className="bg-[#C9A84C] hover:bg-[#B8973B] text-white rounded-[16px] p-6 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <IconComponent className="w-16 h-16" strokeWidth={1.5} />
                        <div className="text-center">
                          <div className="text-xl mb-1">{item.title}</div>
                          <div className="text-lg opacity-90">{item.titleMs}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="size-full bg-white flex flex-col">
      {/* Header */}
      <header className="bg-[#1B2A4A] text-white py-6 px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-4 w-64">
            <div className="bg-white/10 p-4 rounded-[16px]">
              <Building2 className="w-12 h-12 text-[#C9A84C]" />
            </div>
          </div>

          {/* Center: System Name */}
          <div className="text-center flex-1">
            <h1 className="text-4xl tracking-wide">AI-FrontDesk MPS</h1>
            <p className="text-lg text-[#C9A84C]">Analytics Dashboard</p>
          </div>

          {/* Right: Date/Time & Navigation */}
          <div className="w-64 flex items-center justify-end gap-3">
            <div className="text-right">
              <p className="text-lg">{formatDate(currentTime)}</p>
              <p className="text-2xl text-[#C9A84C] tracking-wider">{formatTime(currentTime)}</p>
            </div>
            <button
              onClick={onBackToKiosk}
              className="bg-slate-600 hover:bg-slate-700 p-3 rounded-[16px] transition-colors active:scale-95"
              title="Back to Kiosk / Kembali ke Kiosk"
            >
              <Home className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Breadcrumb */}
      {currentView !== 'overview' && (
        <div className="bg-slate-100 border-b-2 border-slate-200 py-3 px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-2">
            <button
              onClick={() => setCurrentView('overview')}
              className="text-lg text-[#C9A84C] hover:underline"
            >
              Analytics Home
            </button>
            <span className="text-slate-600">/</span>
            <span className="text-lg text-slate-800">
              {menuItems.find(item => item.id === currentView)?.title}
            </span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
