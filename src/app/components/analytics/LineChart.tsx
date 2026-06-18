interface LineChartProps {
  title: string;
  titleMs: string;
  data: { label: string; value: number }[];
  color?: string;
}

export function LineChart({ title, titleMs, data, color = '#C9A84C' }: LineChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;

  return (
    <div className="bg-white border-2 border-slate-200 rounded-[16px] p-6 shadow-lg">
      <div className="mb-6">
        <h3 className="text-2xl text-[#1B2A4A]">{title}</h3>
        <p className="text-lg text-slate-600">{titleMs}</p>
      </div>
      <div className="relative h-64">
        <svg className="w-full h-full" viewBox="0 0 800 256">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="0"
              y1={i * 64}
              x2="800"
              y2={i * 64}
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          ))}

          {/* Line path */}
          <path
            d={data.map((point, i) => {
              const x = (i / (data.length - 1)) * 800;
              const y = 256 - ((point.value - minValue) / range) * 240 - 8;
              return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
            }).join(' ')}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Data points */}
          {data.map((point, i) => {
            const x = (i / (data.length - 1)) * 800;
            const y = 256 - ((point.value - minValue) / range) * 240 - 8;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="5"
                fill={color}
              />
            );
          })}
        </svg>
      </div>
      <div className="flex justify-between mt-4 px-2">
        {data.map((point, i) => (
          <div key={i} className="text-center">
            <p className="text-sm text-slate-600">{point.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
