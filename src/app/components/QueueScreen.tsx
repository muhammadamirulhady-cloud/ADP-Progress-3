import { Hash, CheckCircle } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';

interface QueueScreenProps {
  onBack: () => void;
}

export function QueueScreen({ onBack }: QueueScreenProps) {
  return (
    <div className="size-full bg-white flex flex-col">
      <Header showBackButton onBack={onBack} />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-4xl w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-12 border-2 border-slate-100">
            <div className="text-center mb-12">
              <Hash className="w-32 h-32 mx-auto mb-6 text-[#C9A84C]" />
              <h2 className="text-4xl mb-3 text-[#1B2A4A]">Select Service Counter</h2>
              <p className="text-2xl text-slate-600">Pilih Kaunter Perkhidmatan</p>
            </div>

            <div className="grid grid-cols-1 gap-5">
              {[
                { en: "Licensing", ms: "Pelesenan" },
                { en: "Assessment & Tax", ms: "Taksiran & Cukai" },
                { en: "Engineering", ms: "Kejuruteraan" },
                { en: "Health & Environment", ms: "Kesihatan & Alam Sekitar" },
                { en: "General Inquiries", ms: "Pertanyaan Am" }
              ].map((service, index) => (
                <button
                  key={index}
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
