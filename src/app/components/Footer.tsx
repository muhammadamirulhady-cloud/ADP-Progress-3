import { Info, UserCog, Shield } from 'lucide-react';

interface FooterProps {
  onStaffLogin?: () => void;
  onAdminPortal?: () => void;
}

export function Footer({ onStaffLogin, onAdminPortal }: FooterProps) {
  return (
    <footer className="bg-[#1B2A4A] text-white py-6 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex justify-start">
            {onAdminPortal && (
              <button
                onClick={onAdminPortal}
                className="bg-[#C9A84C] hover:bg-[#B8973B] text-white px-4 py-2 rounded-[12px] transition-all duration-200 active:scale-95 flex items-center gap-2 text-sm shadow-md"
                aria-label="Admin Portal"
              >
                <Shield className="w-4 h-4" />
                <span className="font-semibold">Admin Portal</span>
              </button>
            )}
          </div>
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Info className="w-6 h-6 text-[#C9A84C]" />
              <p className="text-xl">Touch the screen to begin / Sentuh skrin untuk bermula</p>
            </div>
            <p className="text-lg text-white/60">For assistance, please contact the counter / Untuk bantuan, sila hubungi kaunter</p>
          </div>
          <div className="flex-1 flex justify-end">
            {onStaffLogin && (
              <button
                onClick={onStaffLogin}
                className="bg-white/10 hover:bg-white/20 p-3 rounded-[16px] transition-colors active:scale-95"
                aria-label="Staff Login"
              >
                <UserCog className="w-6 h-6 text-[#C9A84C]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
