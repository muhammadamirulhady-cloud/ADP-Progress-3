interface BarChartProps {
  title: string;
  titleMs: string;
  data: { label: string; labelMs: string; value: number }[];
  color?: string;
}

export function BarChart({ title, titleMs, data, color = '#C9A84C' }: BarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-white border-2 border-slate-200 rounded-[16px] p-6 shadow-lg">
      <div className="mb-6">
        <h3 className="text-2xl text-[#1B2A4A]">{title}</h3>
        <p className="text-lg text-slate-600">{titleMs}</p>
      </div>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-2">
              <div>
                <p className="text-lg text-slate-800">{item.label}</p>
                <p className="text-sm text-slate-600">{item.labelMs}</p>
              </div>
              <p className="text-xl text-[#1B2A4A]">{item.value}</p>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div
                className="h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: color
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
