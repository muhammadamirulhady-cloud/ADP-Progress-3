import { Calendar } from 'lucide-react';
import { useState } from 'react';

interface DateRangeFilterProps {
  onDateChange?: (startDate: string, endDate: string) => void;
}

export function DateRangeFilter({ onDateChange }: DateRangeFilterProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleApply = () => {
    if (onDateChange && startDate && endDate) {
      onDateChange(startDate, endDate);
    }
  };

  return (
    <div className="bg-white border-2 border-slate-200 rounded-[16px] p-6 shadow-lg">
      <div className="flex items-center gap-4 mb-4">
        <Calendar className="w-6 h-6 text-[#C9A84C]" />
        <div>
          <h3 className="text-xl text-[#1B2A4A]">Date Range</h3>
          <p className="text-sm text-slate-600">Julat Tarikh</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-slate-600 mb-2">Start Date / Tarikh Mula</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-3 border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C]"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-2">End Date / Tarikh Tamat</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-3 border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C]"
          />
        </div>
      </div>
      <button
        onClick={handleApply}
        className="w-full bg-[#C9A84C] hover:bg-[#B8973B] text-white py-3 rounded-[16px] transition-colors"
      >
        Apply Filter / Gunakan Penapis
      </button>
    </div>
  );
}
