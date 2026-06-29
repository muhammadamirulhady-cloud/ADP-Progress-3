import { useState, useEffect } from 'react';
import { Building2, LogOut, Check, X, Clock, BarChart3, Home } from 'lucide-react';
import { AnalyticsDashboard } from './analytics/AnalyticsDashboard';
import { useQueue, SERVICES } from '../context/QueueContext';

interface QueueManagerScreenProps {
  onBackToKiosk?: () => void;
}

export function QueueManagerScreen({ onBackToKiosk }: QueueManagerScreenProps = {}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAnalytics, setShowAnalytics] = useState(false);

  const {
    allWaiting,
    currentlyServing,
    callNext,
    markServed,
    markMissed,
  } = useQueue();

  // The first currently-serving ticket (across all services)
  const servingTicket = currentlyServing[0] ?? null;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-MY', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  // Call the next ticket across ALL services (FIFO by issuedAt)
  const handleCallNext = () => {
    if (allWaiting.length === 0) return;
    const next = allWaiting[0];
    callNext(next.serviceKey);
  };

  const handleMarkServed = () => {
    if (servingTicket) markServed(servingTicket.id);
  };

  const handleMarkMissed = () => {
    if (servingTicket) markMissed(servingTicket.id);
  };

  const handleEndSession = () => {
    if (confirm('Are you sure you want to end your session? / Adakah anda pasti untuk menamatkan sesi?')) {
      alert('Session ended / Sesi ditamatkan');
    }
  };

  // Helper to look up service labels from the context SERVICES array
  function serviceLabel(serviceKey: string, lang: 'en' | 'ms') {
    const svc = SERVICES.find(s => s.key === serviceKey);
    return lang === 'en' ? (svc?.en ?? serviceKey) : (svc?.ms ?? serviceKey);
  }

  // Elapsed minutes since a ticket was issued
  function minutesWaiting(issuedAt: number) {
    return Math.max(1, Math.round((Date.now() - issuedAt) / 60_000));
  }

  if (showAnalytics) {
    return (
      <AnalyticsDashboard
        queueManagerMode
        onClose={() => setShowAnalytics(false)}
        onBackToKiosk={() => { if (onBackToKiosk) onBackToKiosk(); }}
      />
    );
  }

  return (
    <div className="size-full bg-white flex flex-col">
      {/* Header */}
      <header className="bg-[#1B2A4A] text-white py-6 px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 w-64">
            <div className="bg-white/10 p-4 rounded-[16px]">
              <Building2 className="w-12 h-12 text-[#C9A84C]" />
            </div>
          </div>
          <div className="text-center flex-1">
            <h1 className="text-4xl tracking-wide">AI-FrontDesk MPS</h1>
          </div>
          <div className="w-64 flex items-center justify-end gap-3">
            <div className="text-right">
              <p className="text-lg">{formatDate(currentTime)}</p>
              <p className="text-2xl text-[#C9A84C] tracking-wider">{formatTime(currentTime)}</p>
            </div>
            {onBackToKiosk && (
              <button
                onClick={onBackToKiosk}
                className="bg-slate-600 hover:bg-slate-700 p-3 rounded-[16px] transition-colors active:scale-95"
                title="Back to Kiosk / Kembali ke Kiosk"
              >
                <Home className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Staff Info Bar */}
      <div className="bg-slate-100 border-b-2 border-slate-200 py-4 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div>
              <p className="text-lg text-slate-600">Staff / Kakitangan</p>
              <p className="text-2xl text-[#1B2A4A]">Hafiz bin Ahmad</p>
            </div>
            <div className="h-12 w-px bg-slate-300" />
            <div>
              <p className="text-lg text-slate-600">Counter / Kaunter</p>
              <p className="text-2xl text-[#C9A84C]">Counter 2</p>
            </div>
            <div className="h-12 w-px bg-slate-300" />
            <div>
              <p className="text-lg text-slate-600">In Queue / Dalam Giliran</p>
              <p className="text-2xl text-[#1B2A4A]">{allWaiting.length} waiting</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAnalytics(true)}
              className="bg-[#C9A84C] hover:bg-[#B8973B] text-white px-6 py-3 rounded-[16px] transition-colors active:scale-95 flex items-center gap-3"
            >
              <BarChart3 className="w-5 h-5" />
              <span className="text-lg">Analytics</span>
            </button>
            <button
              onClick={handleEndSession}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-[16px] transition-colors active:scale-95 flex items-center gap-3"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-lg">End Session / Tamat Sesi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Now Serving */}
          <section>
            <h2 className="text-3xl text-[#1B2A4A] mb-4">Now Serving / Sedang Dilayan</h2>
            <div className="bg-gradient-to-r from-[#C9A84C] to-[#B8973B] rounded-[16px] p-8 shadow-lg mb-4">
              {servingTicket ? (
                <div className="text-center mb-6">
                  <p className="text-2xl text-white/80 mb-2">Current Ticket / Tiket Semasa</p>
                  <p className="text-7xl text-white mb-4">{servingTicket.number}</p>
                  <div className="bg-white/20 rounded-[16px] p-4 inline-block mb-4">
                    <p className="text-2xl text-white">{serviceLabel(servingTicket.serviceKey, 'en')}</p>
                    <p className="text-xl text-white/90">{serviceLabel(servingTicket.serviceKey, 'ms')}</p>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-white/90">
                    <Clock className="w-6 h-6" />
                    <p className="text-xl">
                      Waiting: {minutesWaiting(servingTicket.issuedAt)} minutes / Menunggu: {minutesWaiting(servingTicket.issuedAt)} minit
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center mb-6">
                  <p className="text-3xl text-white/80 mb-2">No ticket currently serving</p>
                  <p className="text-xl text-white/60">Press "Call Next Number" to begin</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleMarkServed}
                  disabled={!servingTicket}
                  className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-5 rounded-[16px] transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                  <Check className="w-7 h-7" />
                  <div className="text-left">
                    <div className="text-xl">Mark as Served</div>
                    <div className="text-lg opacity-90">Tandakan Selesai</div>
                  </div>
                </button>
                <button
                  onClick={handleMarkMissed}
                  disabled={!servingTicket}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-5 rounded-[16px] transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                  <X className="w-7 h-7" />
                  <div className="text-left">
                    <div className="text-xl">Mark as Missed</div>
                    <div className="text-lg opacity-90">Tandakan Tidak Hadir</div>
                  </div>
                </button>
              </div>
            </div>
          </section>

          {/* Queue List */}
          <section>
            <h2 className="text-3xl text-[#1B2A4A] mb-4">
              Queue List / Senarai Giliran
              <span className="ml-3 text-xl text-slate-500">({allWaiting.length})</span>
            </h2>
            <div className="bg-white border-2 border-slate-200 rounded-[16px] overflow-hidden shadow-lg">
              <div className="bg-slate-100 px-6 py-4 grid grid-cols-12 gap-4 border-b-2 border-slate-200">
                <div className="col-span-2">
                  <p className="text-lg text-slate-700">Ticket No.</p>
                  <p className="text-sm text-slate-500">No. Tiket</p>
                </div>
                <div className="col-span-7">
                  <p className="text-lg text-slate-700">Service Type</p>
                  <p className="text-sm text-slate-500">Jenis Perkhidmatan</p>
                </div>
                <div className="col-span-3">
                  <p className="text-lg text-slate-700">Wait Time</p>
                  <p className="text-sm text-slate-500">Masa Menunggu</p>
                </div>
              </div>

              {allWaiting.length === 0 ? (
                <div className="px-6 py-10 text-center text-slate-400 text-xl">
                  No tickets waiting / Tiada tiket menunggu
                </div>
              ) : (
                allWaiting.map((ticket, index) => (
                  <div
                    key={ticket.id}
                    className={`px-6 py-5 grid grid-cols-12 gap-4 items-center ${
                      index !== allWaiting.length - 1 ? 'border-b border-slate-200' : ''
                    } hover:bg-slate-50 transition-colors`}
                  >
                    <div className="col-span-2">
                      <p className="text-3xl text-[#C9A84C]">{ticket.number}</p>
                    </div>
                    <div className="col-span-7">
                      <p className="text-xl text-slate-800">{serviceLabel(ticket.serviceKey, 'en')}</p>
                      <p className="text-lg text-slate-600">{serviceLabel(ticket.serviceKey, 'ms')}</p>
                    </div>
                    <div className="col-span-3 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-slate-500" />
                      <p className="text-lg text-slate-700">{minutesWaiting(ticket.issuedAt)} min</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Call Next Button */}
          <button
            onClick={handleCallNext}
            disabled={allWaiting.length === 0}
            className={`w-full py-8 rounded-[16px] text-3xl transition-all flex items-center justify-center gap-4 ${
              allWaiting.length > 0
                ? 'bg-[#C9A84C] hover:bg-[#B8973B] text-white active:scale-95 shadow-lg'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            <div className="text-center">
              <div>Call Next Number</div>
              <div className="text-2xl opacity-90">Panggil Nombor Seterusnya</div>
            </div>
          </button>

        </div>
      </main>
    </div>
  );
}
