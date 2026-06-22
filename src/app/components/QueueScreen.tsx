import { useState } from 'react';
import { Hash, CheckCircle, Ticket } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';

interface QueueScreenProps {
  onBack: () => void;
}

export function QueueScreen({ onBack }: QueueScreenProps) {
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    { en: "Licensing", ms: "Pelesenan", prefix: "A" },
    { en: "Assessment & Tax", ms: "Taksiran & Cukai", prefix: "B" },
    { en: "Engineering", ms: "Kejuruteraan", prefix: "C" },
    { en: "Health & Environment", ms: "Kesihatan & Alam Sekitar", prefix: "D" },
    { en: "General Inquiries", ms: "Pertanyaan Am", prefix: "E" },
  ];

  const handleSelectService = (service: typeof services[0]) => {
    const number = Math.floor(Math.random() * 50) + 1;
    const formatted = String(number).padStart(3, '0');
    setTicketNumber(`${service.prefix}-${formatted}`);
    setSelectedService(service.en);
  };

  // Ticket confirmation screen
  if (ticketNumber) {
    return (
      <div className="size-full bg-white flex flex-col">
        <Header showBackButton onBack={onBack} />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-12 border-2 border-slate-100 text-center">
            <Ticket className="w-24 h-24 mx-auto mb-6 text-[#C9A84C]" />
            <h2 className="text-3xl text-[#1B2A4A] mb-2">Your Queue Number</h2>
            <p className="text-xl text-slate-500 mb-8">Nombor Giliran Anda</p>

            <div className="bg-[#1B2A4A] rounded-2xl p-8 mb-6">
              <p className="text-8xl font-bold text-[#C9A84C] tracking-widest">{ticketNumber}</p>
            </div>

            <p className="text-xl text-slate-700 mb-1">{selectedService}</p>
            <p className="text-lg text-slate-500 mb-10">Please wait for your number to be called.</p>

            <button
              onClick={onBack}
              className="bg-[#1B2A4A] hover:bg-[#2a3d6b] text-white rounded-[16px] py-4 px-10 text-xl transition-colors"
            >
              Return to Home / Kembali ke Menu
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Service selection screen
  return (
    <div className="size-full bg-white flex flex-col">
      <Header showBackButton onBack={onBack} />
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-4xl w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-12 border-2 border-slate-100">
            <div className="text-center mb-12">
              <Hash className="w-32 h-32 mx-auto mb-6 text-[#C9A84C]" />
              <h2 className="text-4xl mb-3 text-[#1B2A4A]">Select Service Counter</h2>
              <p className="text-2xl text-slate-600">Pilih Kaunter Perkhidmatan</p>
            </div>
            <div className="grid grid-cols-1 gap-5">
              {services.map((service, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectService(service)}
                  className="bg-[#C9A84C] hover:bg-[#B8973B] text-white rounded-[16px] p-7 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <div className="text-2xl mb-1">{service.en}</div>
                      <div className="text-xl opacity-90">{service.ms}</div>
                    </div>
                    <CheckCircle className="w-11 h-11" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}