import { Loader2 } from 'lucide-react';

export function AdminLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-white/60">
      <Loader2 className="h-8 w-8 animate-spin mb-4 text-[#008FEA]" />
      <p className="text-lg">Đang tải dữ liệu...</p>
    </div>
  );
}
