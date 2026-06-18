import { Lock } from 'lucide-react';

interface AdminAccessButtonProps {
  onClick: () => void;
}

export function AdminAccessButton({ onClick }: AdminAccessButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white/10 hover:bg-white/20 px-4 py-3 rounded-[16px] transition-all duration-200 active:scale-95 flex items-center gap-2 border border-white/20"
      aria-label="Admin Access"
    >
      <Lock className="w-5 h-5 text-[#C9A84C]" />
      <span className="text-sm text-white">Admin Access</span>
    </button>
  );
}
