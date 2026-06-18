import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Bell } from 'lucide-react';

export function NoticeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const notices = [
    {
      en: "Office closed on 1 May 2026",
      ms: "Pejabat tutup pada 1 Mei 2026"
    },
    {
      en: "Counter 3 is temporarily unavailable",
      ms: "Kaunter 3 tidak beroperasi buat sementara"
    },
    {
      en: "New online payment portal now available",
      ms: "Portal pembayaran dalam talian baharu kini tersedia"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % notices.length);
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval);
  }, [notices.length]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? notices.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % notices.length);
  };

  return (
    <div className="bg-[#C9A84C] py-6 px-8 border-b-4 border-[#B8973B]">
      <div className="max-w-7xl mx-auto flex items-center gap-6">
        <button
          onClick={handlePrevious}
          className="bg-white/20 hover:bg-white/30 p-3 rounded-[16px] transition-colors active:scale-95 flex-shrink-0"
          aria-label="Previous notice"
        >
          <ChevronLeft className="w-7 h-7 text-white" />
        </button>

        <div className="flex-1 text-center overflow-hidden">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Bell className="w-6 h-6 text-white" />
            <span className="text-lg text-white/90 font-semibold">NOTICE / NOTIS</span>
          </div>
          <div className="transition-opacity duration-300">
            <p className="text-2xl text-white mb-1">{notices[currentIndex].en}</p>
            <p className="text-xl text-white/90">{notices[currentIndex].ms}</p>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="bg-white/20 hover:bg-white/30 p-3 rounded-[16px] transition-colors active:scale-95 flex-shrink-0"
          aria-label="Next notice"
        >
          <ChevronRight className="w-7 h-7 text-white" />
        </button>
      </div>

      {/* Indicator Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {notices.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-6' : 'bg-white/40'
            }`}
            aria-label={`Go to notice ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
