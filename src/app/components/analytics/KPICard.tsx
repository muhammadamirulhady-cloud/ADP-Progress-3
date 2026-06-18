import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  titleMs: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: string;
}

export function KPICard({ title, titleMs, value, icon: Icon, trend, color = '#C9A84C' }: KPICardProps) {
  return (
    <div className="bg-white border-2 border-slate-200 rounded-[16px] p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-lg text-slate-600">{title}</p>
          <p className="text-sm text-slate-500">{titleMs}</p>
        </div>
        <div
          className="p-3 rounded-[16px]"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-8 h-8" style={{ color }} />
        </div>
      </div>
      <div className="mb-2">
        <p className="text-4xl text-[#1B2A4A]">{value}</p>
      </div>
      {trend && (
        <div className="flex items-center gap-2">
          <span className={`text-sm px-2 py-1 rounded ${trend.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {trend.isPositive ? '↑' : '↓'} {trend.value}
          </span>
          <span className="text-sm text-slate-500">vs last period</span>
        </div>
      )}
    </div>
  );
}
