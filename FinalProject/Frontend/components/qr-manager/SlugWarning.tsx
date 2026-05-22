import { AlertTriangle } from 'lucide-react';

interface SlugWarningProps {
  show: boolean;
}

export function SlugWarning({ show }: SlugWarningProps) {
  if (!show) return null;

  return (
    <div className="flex items-start gap-3 p-4 bg-[#F5A524]/10 border border-[#F5A524]/20 rounded-xl mt-4">
      <AlertTriangle className="w-5 h-5 text-[#F5A524] shrink-0 mt-0.5" />
      <p className="text-sm text-[#F5A524]/90">
        Slug đã thay đổi gần đây. Mã QR cũ có thể không còn trỏ đúng hồ sơ hiện tại.
      </p>
    </div>
  );
}
