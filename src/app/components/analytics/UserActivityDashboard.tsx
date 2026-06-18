import { Users, TrendingUp, Clock, CheckCircle, Activity, BarChart3 } from 'lucide-react';
import { KPICard } from './KPICard';
import { LineChart } from './LineChart';
import { BarChart } from './BarChart';

export function UserActivityDashboard() {
  const peakUsageData = [
    { label: '8AM', value: 45 },
    { label: '10AM', value: 120 },
    { label: '12PM', value: 180 },
    { label: '2PM', value: 150 },
    { label: '4PM', value: 90 }
  ];

  const serviceUsageData = [
    { label: 'Licensing', labelMs: 'Pelesenan', value: 245 },
    { label: 'Queue', labelMs: 'Giliran', value: 189 },
    { label: 'Appointments', labelMs: 'Temu Janji', value: 156 },
    { label: 'Complaints', labelMs: 'Aduan', value: 98 },
    { label: 'Feedback', labelMs: 'Maklum Balas', value: 67 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl text-[#1B2A4A] mb-2">User Activity Dashboard</h2>
        <p className="text-xl text-slate-600">Papan Pemuka Aktiviti Pengguna</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-3 gap-6">
        <KPICard
          title="Active Users"
          titleMs="Pengguna Aktif"
          value="342"
          icon={Users}
          trend={{ value: '+12%', isPositive: true }}
        />
        <KPICard
          title="Daily Visitors"
          titleMs="Pelawat Harian"
          value="1,234"
          icon={TrendingUp}
          trend={{ value: '+8%', isPositive: true }}
        />
        <KPICard
          title="Weekly Visitors"
          titleMs="Pelawat Mingguan"
          value="8,456"
          icon={BarChart3}
          trend={{ value: '+15%', isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <KPICard
          title="Monthly Visitors"
          titleMs="Pelawat Bulanan"
          value="32,891"
          icon={Activity}
          trend={{ value: '+22%', isPositive: true }}
        />
        <KPICard
          title="Completed Transactions"
          titleMs="Transaksi Selesai"
          value="755"
          icon={CheckCircle}
          trend={{ value: '+5%', isPositive: true }}
        />
        <KPICard
          title="Avg Session Duration"
          titleMs="Purata Tempoh Sesi"
          value="4:32"
          icon={Clock}
          trend={{ value: '-2%', isPositive: false }}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6">
        <LineChart
          title="Peak Usage Time"
          titleMs="Masa Penggunaan Puncak"
          data={peakUsageData}
        />
        <BarChart
          title="Service Usage Distribution"
          titleMs="Pengedaran Penggunaan Perkhidmatan"
          data={serviceUsageData}
        />
      </div>

      {/* Real-time Activity Feed */}
      <div className="bg-white border-2 border-slate-200 rounded-[16px] p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl text-[#1B2A4A]">Real-time Activity Feed</h3>
            <p className="text-lg text-slate-600">Suapan Aktiviti Masa Nyata</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-600">Live</span>
            </div>
            <p className="text-sm text-slate-500">Last updated: 2 seconds ago</p>
            <button className="bg-[#C9A84C] hover:bg-[#B8973B] text-white px-4 py-2 rounded-[16px] text-sm transition-colors">
              Refresh / Muat Semula
            </button>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { user: 'User #1234', action: 'Submitted complaint', time: '2 sec ago' },
            { user: 'User #1235', action: 'Booked appointment', time: '15 sec ago' },
            { user: 'User #1236', action: 'Asked question', time: '23 sec ago' },
            { user: 'User #1237', action: 'Got queue number', time: '45 sec ago' },
            { user: 'User #1238', action: 'Gave feedback', time: '1 min ago' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-[16px]">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-[#C9A84C] rounded-full"></div>
                <div>
                  <p className="text-lg text-slate-800">{activity.user}</p>
                  <p className="text-sm text-slate-600">{activity.action}</p>
                </div>
              </div>
              <p className="text-sm text-slate-500">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
