import { Shield, ShieldAlert } from 'lucide-react';

interface HumanTakeoverToggleProps {
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function HumanTakeoverToggle({ isActive, onClick, disabled }: HumanTakeoverToggleProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
        isActive
          ? 'bg-success/20 text-success hover:bg-success/30 border border-success/30'
          : 'bg-[#2367A2]/20 text-[#008FEA] hover:bg-[#2367A2]/40 border border-[#2367A2]/30'
      } disabled:opacity-50 disabled:cursor-not-allowed shrink-0`}
    >
      {isActive ? <ShieldAlert size={16} /> : <Shield size={16} />}
      <span className="hidden sm:inline">
        {isActive ? 'Trả lại cho AI' : 'Tiếp quản hội thoại'}
      </span>
    </button>
  );
}
