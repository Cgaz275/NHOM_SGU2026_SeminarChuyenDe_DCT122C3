interface QRTrackingHintProps {
  scanCount: number;
  copyCount: number;
  downloadCount: number;
}

export function QRTrackingHint({ scanCount, copyCount, downloadCount }: QRTrackingHintProps) {
  return (
    <div className="mt-8 space-y-4">
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex flex-col items-center p-3 bg-[#1A1A1A] rounded-xl border border-white/5 min-w-[100px]">
          <span className="text-xl font-bold text-white">{scanCount}</span>
          <span className="text-xs text-white/50">Lượt quét</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-[#1A1A1A] rounded-xl border border-white/5 min-w-[100px]">
          <span className="text-xl font-bold text-white">{copyCount}</span>
          <span className="text-xs text-white/50">Lượt sao chép</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-[#1A1A1A] rounded-xl border border-white/5 min-w-[100px]">
          <span className="text-xl font-bold text-white">{downloadCount}</span>
          <span className="text-xs text-white/50">Lượt tải QR</span>
        </div>
      </div>
    </div>
  );
}
