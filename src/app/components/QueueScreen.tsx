import { useState } from 'react';
import { Hash, CheckCircle, Clock, Printer, ArrowLeft, Users } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useQueue, SERVICES, ServiceKey, QueueTicket } from '../context/QueueContext';

interface QueueScreenProps {
  onBack: () => void;
}

type Step = 'select-service' | 'confirm' | 'ticket-issued';

export function QueueScreen({ onBack }: QueueScreenProps) {
  const { issueTicket, getWaiting, estimateWait } = useQueue();

  const [step, setStep]                 = useState<Step>('select-service');
  const [selectedKey, setSelectedKey]   = useState<ServiceKey | null>(null);
  const [issuedTicket, setIssuedTicket] = useState<QueueTicket | null>(null);

  function handleSelectService(key: ServiceKey) {
    setSelectedKey(key);
    setStep('confirm');
  }

  async function handleConfirm() {
    if (!selectedKey) return;
    const ticket = await issueTicket(selectedKey);
    setIssuedTicket(ticket);
    setStep('ticket-issued');
  }

  function handleDone() {
    setStep('select-service');
    setSelectedKey(null);
    setIssuedTicket(null);
    onBack();
  }

  const selectedService = SERVICES.find(s => s.key === selectedKey);

  // ── Step 3: Ticket issued ──────────────────────────────────
  if (step === 'ticket-issued' && issuedTicket) {
    const svc         = SERVICES.find(s => s.key === issuedTicket.serviceKey)!;
    const waitingAhead = getWaiting(issuedTicket.serviceKey).filter(
      t => t.issuedAt < issuedTicket.issuedAt
    ).length;
    const issuedTime = new Date(issuedTicket.issuedAt).toLocaleTimeString('en-MY', {
      hour: '2-digit', minute: '2-digit', hour12: true,
    });

    return (
      <div className="size-full bg-white flex flex-col">
        <Header showBackButton onBack={onBack} />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-slate-100 overflow-hidden">

              {/* Receipt header */}
              <div className="bg-[#1B2A4A] px-8 py-6 text-center">
                <p className="text-[#C9A84C] text-xl tracking-wide mb-1">AI-FrontDesk MPS</p>
                <p className="text-white/60 text-base">Majlis Perbandaran Sepang</p>
              </div>

              <div className="border-b-2 border-dashed border-slate-200 mx-8" />

              {/* Ticket body */}
              <div className="px-8 py-10 text-center">
                <p className="text-slate-500 text-xl mb-2">Your Queue Number / Nombor Giliran Anda</p>
                <div className="text-[7rem] leading-none text-[#C9A84C] mb-4">
                  {issuedTicket.number}
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-[16px] px-6 py-4 mb-6 inline-block">
                  <p className="text-2xl text-[#1B2A4A]">{svc.en}</p>
                  <p className="text-xl text-slate-500">{svc.ms}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-amber-50 border border-amber-200 rounded-[16px] p-4">
                    <div className="flex items-center justify-center gap-2 text-amber-700 mb-1">
                      <Users className="w-5 h-5" />
                      <span className="text-lg">Ahead of you</span>
                    </div>
                    <p className="text-4xl text-amber-800">{waitingAhead}</p>
                    <p className="text-sm text-amber-600">people / orang</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-[16px] p-4">
                    <div className="flex items-center justify-center gap-2 text-blue-700 mb-1">
                      <Clock className="w-5 h-5" />
                      <span className="text-lg">Est. wait</span>
                    </div>
                    <p className="text-4xl text-blue-800">~{issuedTicket.estimatedWaitMinutes}</p>
                    <p className="text-sm text-blue-600">minutes / minit</p>
                  </div>
                </div>

                <div className="bg-[#1B2A4A]/5 rounded-[16px] px-6 py-4 text-[#1B2A4A] text-lg mb-6">
                  <p>Please proceed to <span className="font-semibold text-[#C9A84C]">{svc.counterLabel}</span></p>
                  <p>Sila pergi ke <span className="font-semibold text-[#C9A84C]">{svc.counterLabel}</span></p>
                </div>

                <p className="text-slate-400 text-sm">
                  Issued at / Dikeluarkan pada: {issuedTime}
                </p>
              </div>

              <div className="border-b-2 border-dashed border-slate-200 mx-8" />

              <div className="px-8 py-6 grid grid-cols-2 gap-4">
                <button
                  onClick={() => window.print()}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-[16px] py-5 transition-all active:scale-95 flex items-center justify-center gap-3 text-xl"
                >
                  <Printer className="w-6 h-6" />
                  Print / Cetak
                </button>
                <button
                  onClick={handleDone}
                  className="bg-[#C9A84C] hover:bg-[#B8973B] text-white rounded-[16px] py-5 transition-all active:scale-95 flex items-center justify-center gap-3 text-xl"
                >
                  <CheckCircle className="w-6 h-6" />
                  Done / Selesai
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ── Step 2: Confirm selection ──────────────────────────────
  if (step === 'confirm' && selectedService) {
    const waitingCount = getWaiting(selectedService.key).length;
    const estWait      = estimateWait(selectedService.key);

    return (
      <div className="size-full bg-white flex flex-col">
        <Header showBackButton onBack={() => setStep('select-service')} />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-2xl shadow-2xl p-12 border-2 border-slate-100 text-center">
              <Hash className="w-20 h-20 mx-auto mb-6 text-[#C9A84C]" />
              <h2 className="text-4xl mb-2 text-[#1B2A4A]">Confirm Selection</h2>
              <p className="text-2xl text-slate-500 mb-8">Sahkan Pilihan</p>

              <div className="bg-[#1B2A4A] rounded-[16px] px-8 py-6 mb-8">
                <p className="text-3xl text-white mb-1">{selectedService.en}</p>
                <p className="text-2xl text-[#C9A84C]">{selectedService.ms}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="bg-slate-50 border border-slate-200 rounded-[16px] p-5">
                  <Users className="w-8 h-8 mx-auto mb-2 text-slate-500" />
                  <p className="text-3xl text-slate-800">{waitingCount}</p>
                  <p className="text-lg text-slate-500">Waiting / Menunggu</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-[16px] p-5">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-slate-500" />
                  <p className="text-3xl text-slate-800">~{estWait} min</p>
                  <p className="text-lg text-slate-500">Est. wait / Anggaran</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setStep('select-service')}
                  className="border-2 border-slate-300 hover:border-slate-400 text-slate-700 rounded-[16px] py-6 transition-all active:scale-95 flex items-center justify-center gap-3 text-2xl"
                >
                  <ArrowLeft className="w-7 h-7" />
                  Back / Kembali
                </button>
                <button
                  onClick={handleConfirm}
                  className="bg-[#C9A84C] hover:bg-[#B8973B] text-white rounded-[16px] py-6 transition-all active:scale-95 text-2xl"
                >
                  Get Ticket / Ambil Tiket
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ── Step 1: Select service ─────────────────────────────────
  return (
    <div className="size-full bg-white flex flex-col">
      <Header showBackButton onBack={onBack} />
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-4xl w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-12 border-2 border-slate-100">
            <div className="text-center mb-12">
              <Hash className="w-24 h-24 mx-auto mb-6 text-[#C9A84C]" />
              <h2 className="text-4xl mb-3 text-[#1B2A4A]">Select Service Counter</h2>
              <p className="text-2xl text-slate-600">Pilih Kaunter Perkhidmatan</p>
            </div>

            <div className="grid grid-cols-1 gap-5">
              {SERVICES.map(service => {
                const waitingCount = getWaiting(service.key).length;
                const estWait      = estimateWait(service.key);
                return (
                  <button
                    key={service.key}
                    onClick={() => handleSelectService(service.key)}
                    className="bg-[#C9A84C] hover:bg-[#B8973B] text-white rounded-[16px] p-7 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="text-2xl mb-1">{service.en}</div>
                        <div className="text-xl opacity-90">{service.ms}</div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right text-white/80">
                          <div className="flex items-center gap-1 justify-end text-lg">
                            <Users className="w-4 h-4" />
                            {waitingCount} waiting
                          </div>
                          <div className="flex items-center gap-1 justify-end text-base opacity-80">
                            <Clock className="w-4 h-4" />
                            ~{estWait} min
                          </div>
                        </div>
                        <CheckCircle className="w-11 h-11 flex-shrink-0" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
