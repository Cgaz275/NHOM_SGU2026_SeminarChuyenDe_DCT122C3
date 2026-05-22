import { QRCodeSVG } from 'qrcode.react';
import { Copy } from 'lucide-react';
import { QRStatusBadge } from './QRStatusBadge';
import { QRProfileStatus } from '@/types/qr-manager';
import { RefObject } from 'react';

interface QRCodePreviewCardProps {
  publicUrl: string;
  displayUrl: string;
  status: QRProfileStatus;
  onCopyUrl: () => void;
  qrRef: RefObject<SVGSVGElement | null>;
}

export function QRCodePreviewCard({
  publicUrl,
  displayUrl,
  status,
  onCopyUrl,
  qrRef,
}: QRCodePreviewCardProps) {
  return (
    <div className="relative p-6 sm:p-8 bg-[#101010] rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(35,103,162,0.1)] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#008FEA]/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative flex flex-col items-center">
        <div className="w-full flex justify-between items-start mb-8">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Mã QR hồ sơ</h2>
            <p className="text-sm text-white/60">Quét mã để mở hồ sơ công khai của bạn</p>
          </div>
          <QRStatusBadge status={status} />
        </div>

        {/* QR Code Container */}
        <div className="bg-white p-6 rounded-2xl shadow-xl mb-8 flex items-center justify-center">
          <QRCodeSVG
            value={publicUrl}
            size={240}
            level="H"
            includeMargin={false}
            ref={qrRef as any}
            className="w-full h-auto max-w-[240px]"
          />
        </div>

        {/* URL Copy section */}
        <div className="w-full flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl">
          <div className="flex-1 truncate text-sm text-white/80 pl-2">
            {displayUrl}
          </div>
          <button
            onClick={onCopyUrl}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors shrink-0"
            disabled={status === 'draft'}
          >
            <Copy size={14} />
            <span className="hidden sm:inline">Sao chép URL</span>
          </button>
        </div>
      </div>
    </div>
  );
}
