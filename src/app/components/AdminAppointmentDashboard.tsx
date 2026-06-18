import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Printer, Download, LogOut, ArrowLeft } from 'lucide-react';
import { Header } from './Header';

interface AdminAppointmentDashboardProps {
  onBackToKiosk: () => void;
  onBackToHub?: () => void;
}

interface Appointment {
  time: string;
  refNumber: string;
  citizenName: string;
  icNumber: string;
  department: string;
}

export function AdminAppointmentDashboard({ onBackToKiosk, onBackToHub }: AdminAppointmentDashboardProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Mock appointment data
  const mockAppointments: Record<string, Appointment[]> = {
    '2026-06-05': [
      { time: '9:00 AM - 10:00 AM', refNumber: 'APT-2024-1234', citizenName: 'Ahmad bin Abdullah', icNumber: '900101-14-5678', department: 'Licensing' },
      { time: '11:00 AM - 12:00 PM', refNumber: 'APT-2024-1235', citizenName: 'Siti binti Omar', icNumber: '850505-10-1234', department: 'Assessment' },
      { time: '2:00 PM - 3:00 PM', refNumber: 'APT-2024-1236', citizenName: 'Lee Wei Ming', icNumber: '920315-08-9876', department: 'Permit Application' },
    ],
    '2026-06-06': [
      { time: '9:00 AM - 10:00 AM', refNumber: 'APT-2024-1237', citizenName: 'Muthu Krishnan', icNumber: '880707-12-4567', department: 'Licensing' },
    ],
    '2026-06-10': [
      { time: '11:00 AM - 12:00 PM', refNumber: 'APT-2024-1238', citizenName: 'Tan Mei Ling', icNumber: '950220-05-2345', department: 'Assessment' },
      { time: '4:00 PM - 5:00 PM', refNumber: 'APT-2024-1239', citizenName: 'Kumar s/o Raju', icNumber: '870912-11-6789', department: 'Permit Application' },
    ],
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getAppointmentCount = (date: Date | null) => {
    if (!date) return 0;
    const key = date.toISOString().split('T')[0];
    return mockAppointments[key]?.length || 0;
  };

  const getSelectedDateAppointments = () => {
    const key = selectedDate.toISOString().split('T')[0];
    return mockAppointments[key] || [];
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-MY', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="size-full bg-slate-50 flex flex-col h-screen overflow-hidden">
      <Header />

      <div className="bg-[#1B2A4A] py-4 px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl text-white flex items-center gap-3">
            <Calendar className="w-8 h-8 text-[#C9A84C]" />
            Admin Dashboard: Appointment Management
          </h1>
          <div className="flex gap-3">
            {onBackToHub && (
              <button
                onClick={onBackToHub}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-[16px] transition-all duration-200 active:scale-95 flex items-center gap-2 border border-white/20"
              >
                <ArrowLeft className="w-5 h-5" />
                Admin Hub
              </button>
            )}
            <button
              onClick={onBackToKiosk}
              className="bg-[#C9A84C] hover:bg-[#B8973B] text-white px-6 py-3 rounded-[16px] transition-all duration-200 active:scale-95 flex items-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Back to Kiosk
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto p-8">
        <div className="flex gap-8 min-h-full">
        {/* Calendar Widget - Left Side */}
        <div className="flex-1 bg-white rounded-[24px] shadow-lg border-2 border-slate-100 p-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-[#1B2A4A]">{formatMonthYear(currentMonth)}</h2>
            <div className="flex gap-2">
              <button
                onClick={previousMonth}
                className="p-3 rounded-[16px] bg-slate-100 hover:bg-[#C9A84C] hover:text-white transition-all duration-200"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextMonth}
                className="p-3 rounded-[16px] bg-slate-100 hover:bg-[#C9A84C] hover:text-white transition-all duration-200"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-lg font-bold text-[#1B2A4A] py-3">
                {day}
              </div>
            ))}
            {getDaysInMonth(currentMonth).map((date, idx) => {
              const count = getAppointmentCount(date);
              const isSelected = date && selectedDate.toDateString() === date.toDateString();
              const isToday = date && date.toDateString() === new Date().toDateString();

              return (
                <button
                  key={idx}
                  onClick={() => date && setSelectedDate(date)}
                  disabled={!date}
                  className={`aspect-square p-2 rounded-[16px] text-center transition-all duration-200 relative ${
                    !date
                      ? 'invisible'
                      : isSelected
                      ? 'bg-[#C9A84C] text-white font-bold shadow-lg scale-105'
                      : isToday
                      ? 'bg-[#1B2A4A] text-white font-bold'
                      : count > 0
                      ? 'bg-slate-100 hover:bg-slate-200'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  {date && (
                    <>
                      <div className="text-xl">{date.getDate()}</div>
                      {count > 0 && !isSelected && !isToday && (
                        <div className="absolute top-1 right-1 bg-[#C9A84C] text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                          {count}
                        </div>
                      )}
                      {count > 0 && (isSelected || isToday) && (
                        <div className="absolute top-1 right-1 bg-white text-[#C9A84C] text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                          {count}
                        </div>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Daily Schedule Panel - Right Side */}
        <div className="w-[500px] bg-white rounded-[24px] shadow-lg border-2 border-slate-100 p-8 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#1B2A4A]">
              Appointments for {selectedDate.toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' })}
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 mb-6">
            {getSelectedDateAppointments().length === 0 ? (
              <div className="flex items-center justify-center h-full text-center">
                <div className="text-slate-400">
                  <Calendar className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="text-xl">No appointments scheduled for this date</p>
                </div>
              </div>
            ) : (
              getSelectedDateAppointments().map((appointment, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border-2 border-slate-200 rounded-[16px] p-6 hover:border-[#C9A84C] transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-[#C9A84C] text-white px-4 py-2 rounded-[12px] text-sm font-bold">
                      {appointment.time}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500 w-24">Ref Number:</span>
                      <span className="text-base font-bold text-[#1B2A4A]">{appointment.refNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500 w-24">Citizen:</span>
                      <span className="text-base font-semibold text-slate-800">{appointment.citizenName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500 w-24">IC Number:</span>
                      <span className="text-base text-slate-700">{appointment.icNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500 w-24">Department:</span>
                      <span className="text-base text-slate-700">{appointment.department}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex gap-4 pt-4 border-t-2 border-slate-100">
            <button className="flex-1 bg-[#1B2A4A] hover:bg-[#2A4070] text-white py-4 rounded-[16px] transition-all duration-200 active:scale-95 flex items-center justify-center gap-2">
              <Printer className="w-5 h-5" />
              Print Schedule
            </button>
            <button className="flex-1 bg-[#C9A84C] hover:bg-[#B8973B] text-white py-4 rounded-[16px] transition-all duration-200 active:scale-95 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}
