'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { toPng } from 'html-to-image';
import { QRCodeSVG } from 'qrcode.react';
import { PublicProfile } from '../../types/public-profile';
import { Download, FileBox, AlertTriangle } from 'lucide-react';

interface SaveContactCardProps {
  profile: PublicProfile;
  onExportVCard?: () => void;
  onOpenReport?: () => void;
}

export function SaveContactCard({ profile, onExportVCard, onOpenReport }: SaveContactCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Lấy link hiện tại để gen QR
  const profileUrl = typeof window !== 'undefined' ? window.location.href : `https://shorty-lazily-dainty.ngrok-free.dev/u/${profile.username}`;
  
  const backendIp = 'latticed-willetta-subovarian.ngrok-free.dev';
  const qrRedirectUrl = `https://${backendIp}/api/v1/cards/qr/${profile.id}`;

  const handleDownloadCard = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#1A1A1A',
      });

      const link = document.createElement('a');
      link.download = `${profile.name.toLowerCase().replace(/\s+/g, '-')}-contact-card.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Failed to download contact card:', error);
    }
  };

  const handleExportVCard = () => {
    if (onExportVCard) {
      onExportVCard();
      return;
    }

    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${profile.name}
TITLE:${profile.role}
URL:${profileUrl}
NOTE:${profile.slogan}
END:VCARD`;

    const blob = new Blob([vcard], {
      type: 'text/vcard;charset=utf-8',
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.name.toLowerCase().replace(/\s+/g, '-')}.vcf`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-[24px] bg-card border border-white/10 p-6 md:p-8 mt-6">
      <h2 className="text-xl font-bold text-foreground mb-4">Thông tin liên hệ</h2>

      {/* Contact Card Preview */}
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-xl bg-[#1A1A1A] border border-white/5 p-5 mb-6 shadow-inner flex items-center justify-between gap-4"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 via-transparent to-electric-blue/10 pointer-events-none" />

        <div className="relative z-10 flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-gradient-to-tr from-brand-blue to-electric-blue flex items-center justify-center flex-shrink-0">
              {profile.avatarUrl ? (
                <Image
                  src={profile.avatarUrl}
                  alt={profile.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-white font-bold">
                  {profile.name.charAt(0)}
                </span>
              )}
            </div>

            <div className="min-w-0">
              <h3 className="text-white font-semibold truncate">
                {profile.name}
              </h3>
              <p className="text-electric-blue text-xs truncate">
                {profile.role}
              </p>
            </div>
          </div>

          <p className="text-text-muted text-xs line-clamp-2">
            {profile.slogan}
          </p>

          <p className="text-text-muted text-[10px] mt-3 truncate">
            {profileUrl}
          </p>
        </div>

        {/* Real QR Code */}
        <div className="relative z-10 flex-shrink-0 w-24 h-24 bg-white rounded-xl flex items-center justify-center p-2">
          <QRCodeSVG
            value={qrRedirectUrl}
            size={80}
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="H"
            includeMargin={false}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleDownloadCard}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-brand-blue hover:bg-electric-blue text-white font-semibold transition-all duration-300 shadow-[0_0_20px_-5px_rgba(35,103,162,0.5)] hover:shadow-[0_0_25px_-5px_rgba(0,143,234,0.6)]"
        >
          <Download className="w-5 h-5" />
          Tải thẻ danh thiếp
        </button>

        <button
          onClick={handleExportVCard}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors"
        >
          <FileBox className="w-5 h-5" />
          Xuất file vCard
        </button>

        {onOpenReport && (
          <button
            onClick={onOpenReport}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-danger/10 hover:bg-danger/20 border border-danger/20 hover:border-danger/30 text-danger font-medium transition-all duration-300 mt-2"
          >
            <AlertTriangle className="w-4 h-4" />
            Báo cáo vi phạm
          </button>
        )}
      </div>
    </div>
  );
}