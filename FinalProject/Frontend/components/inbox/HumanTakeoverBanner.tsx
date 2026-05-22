import { ShieldAlert } from 'lucide-react';

interface HumanTakeoverBannerProps {
  isActive: boolean;
}

export function HumanTakeoverBanner({ isActive }: HumanTakeoverBannerProps) {
  if (!isActive) return null;

  return (
    <div className="bg-success/10 border-b border-success/20 px-4 py-3 flex items-center justify-center gap-2 sticky top-0 z-10 backdrop-blur-md">
      <ShieldAlert size={16} className="text-success" />
      <span className="text-sm font-medium text-success">
        Chủ thẻ đang trực tiếp hỗ trợ. AI đã tạm dừng trong hội thoại này.
      </span>
    </div>
  );
}
