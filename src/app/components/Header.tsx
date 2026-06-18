import { useState, useEffect } from 'react';
import { Building2 } from 'lucide-react';

interface HeaderProps {
  showBackButton?: boolean;
  onBack?: () => void;
}

export function Header({ showBackButton, onBack }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-MY', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-MY', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <header className="bg-[#1B2A4A] text-white py-6 px-8 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-4 w-64">
          {showBackButton && onBack ? (
            <button
              onClick={onBack}
              className="bg-[#C9A84C] hover:bg-[#B8973B] p-4 rounded-[16px] transition-colors active:scale-95"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ) : (
            <div className="bg-white/10 p-4 rounded-[16px]">
              <Building2 className="w-12 h-12 text-[#C9A84C]" />
            </div>
          )}
        </div>

        {/* Center: System Name */}
        <div className="text-center flex-1">
          <h1 className="text-4xl tracking-wide">AI-FrontDesk MPS</h1>
        </div>

        {/* Right: Date/Time */}
        <div className="text-right w-64">
          <p className="text-lg">{formatDate(currentTime)}</p>
          <p className="text-2xl text-[#C9A84C] tracking-wider">{formatTime(currentTime)}</p>
        </div>
      </div>
    </header>
  );
}
