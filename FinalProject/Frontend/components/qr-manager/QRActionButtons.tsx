import { Download, Link } from 'lucide-react';
import { useState } from 'react';

interface QRActionButtonsProps {
  onCopyLink: () => Promise<void>;
  onDownloadPNG: () => Promise<void>;
  onDownloadSVG: () => Promise<void>;
  disabled: boolean;
}

export function QRActionButtons({
  onCopyLink,
  onDownloadPNG,
  onDownloadSVG,
  disabled,
}: QRActionButtonsProps) {
  const [isCopying, setIsCopying] = useState(false);
  const [isDownloadingPNG, setIsDownloadingPNG] = useState(false);
  const [isDownloadingSVG, setIsDownloadingSVG] = useState(false);

  const handleCopyLink = async () => {
    setIsCopying(true);
    await onCopyLink();
    setIsCopying(false);
  };

  const handleDownloadPNG = async () => {
    setIsDownloadingPNG(true);
    await onDownloadPNG();
    setIsDownloadingPNG(false);
  };

  const handleDownloadSVG = async () => {
    setIsDownloadingSVG(true);
    await onDownloadSVG();
    setIsDownloadingSVG(false);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full mt-6">
      <button
        onClick={handleDownloadPNG}
        disabled={disabled || isDownloadingPNG}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#008FEA] hover:bg-[#008FEA]/90 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Download size={18} />
        {isDownloadingPNG ? 'Đang tải...' : 'Tải PNG'}
      </button>
      <button
        onClick={handleDownloadSVG}
        disabled={disabled || isDownloadingSVG}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-white/10"
      >
        <Download size={18} />
        {isDownloadingSVG ? 'Đang tải...' : 'Tải SVG'}
      </button>
      <button
        onClick={handleCopyLink}
        disabled={disabled || isCopying}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-white/10"
      >
        <Link size={18} />
        {isCopying ? 'Đang sao chép...' : 'Sao chép liên kết'}
      </button>
    </div>
  );
}
