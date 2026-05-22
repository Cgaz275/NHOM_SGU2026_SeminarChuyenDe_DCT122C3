'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { QRCodePreviewCard } from './QRCodePreviewCard';
import { QRActionButtons } from './QRActionButtons';
import { SlugWarning } from './SlugWarning';
import { QRTrackingHint } from './QRTrackingHint';
import { Toast } from '@/components/ui/Toast';
import { QRCodeData } from '@/types/qr-manager';
import { getProfileDraft } from '@/services/cardService';
import { trackQREvent, copyProfileUrl } from '@/lib/mock-qr-manager-api';

export function QRCodeManagerPage() {
  const [qrData, setQrData] = useState<QRCodeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toastState, setToastState] = useState({ isVisible: false, message: '', type: 'success' as 'success' | 'error' });
  const qrSvgRef = useRef<SVGSVGElement | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToastState({ isVisible: true, message, type });
    setTimeout(() => setToastState(prev => ({ ...prev, isVisible: false })), 3000);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const profile = await getProfileDraft();
        if (profile && profile.basicInfo.slug) {
          const backendIp = 'latticed-willetta-subovarian.ngrok-free.dev'; // IP của Backend
          const publicUrl = `http://${backendIp}/api/v1/cards/qr/${profile.id}`;
          
          setQrData({
            id: profile.id || 'new',
            ownerName: profile.basicInfo.fullName || 'Người dùng',
            username: profile.basicInfo.slug,
            publicUrl: publicUrl, // Link giấu trong QR (Mã QR Động)
            displayUrl: `shorty-lazily-dainty.ngrok-free.dev/u/${profile.basicInfo.slug}`, // Link hiển thị trên giao diện
            status: 'published',
            slugChangedRecently: false,
            scanCount: 0,
            copyCount: 0,
            downloadCount: 0,
            updatedAt: profile.lastSavedAt || new Date().toISOString(),
          });
        } else {

          setQrData(null);
        }
      } catch (error) {
        setToastState({ isVisible: true, message: 'Không thể tải dữ liệu QR. Vui lòng thử lại sau.', type: 'error' });
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);


  const handleCopyUrl = async () => {
    if (!qrData) return;
    try {
      await navigator.clipboard.writeText(qrData.publicUrl);
      await copyProfileUrl(qrData.publicUrl); // mock api call
      await trackQREvent('qr_copy_url');
      showToast('Đã sao chép URL hồ sơ.', 'success');
    } catch (error) {
      showToast('Lỗi khi sao chép URL.', 'error');
    }
  };

  const handleCopyLink = async () => {
    if (!qrData) return;
    try {
      await navigator.clipboard.writeText(qrData.publicUrl);
      await trackQREvent('qr_copy_link');
      showToast('Đã sao chép liên kết.', 'success');
    } catch (error) {
      showToast('Lỗi khi sao chép liên kết.', 'error');
    }
  };

  const handleDownloadPNG = async () => {
    if (!qrData || !qrSvgRef.current) return;
    
    return new Promise<void>((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1000;
      canvas.height = 1000;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        showToast('Trình duyệt không hỗ trợ Canvas.', 'error');
        resolve();
        return;
      }

      if (!qrSvgRef.current) {
        showToast('Không tìm thấy thẻ SVG mã QR để xử lý.', 'error');
        return;
      }

      const xml = new XMLSerializer().serializeToString(qrSvgRef.current);
      const svg64 = btoa(unescape(encodeURIComponent(xml)));
      const image64 = 'data:image/svg+xml;base64,' + svg64;

      const img = new Image();
      img.onload = async () => {
        // Draw white background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw QR code with padding (100px padding all around = 800x800 image centered)
        ctx.drawImage(img, 100, 100, 800, 800);

        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `${qrData.username}-qr-code.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        await trackQREvent('qr_download_png');
        showToast('Đã tải mã QR PNG.', 'success');
        resolve();
      };
      img.onerror = () => {
        showToast('Lỗi khi tạo ảnh PNG.', 'error');
        resolve();
      };
      img.src = image64;
    });
  };

  const handleDownloadSVG = async () => {
    if (!qrData || !qrSvgRef.current) return;
    
    try {
      const xml = new XMLSerializer().serializeToString(qrSvgRef.current);
      const blob = new Blob([xml], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = `${qrData.username}-qr-code.svg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);

      await trackQREvent('qr_download_svg');
      showToast('Đã tải mã QR SVG.', 'success');
    } catch (error) {
      showToast('Lỗi khi tải mã SVG.', 'error');
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center min-h-[500px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#008FEA]"></div>
      </div>
    );
  }

  if (!qrData) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center min-h-[500px]">
        <div className="text-white/50">Không tìm thấy dữ liệu mã QR.</div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 sm:p-8 overflow-y-auto w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-[720px] mx-auto w-full"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Quản lý mã QR</h1>
          <p className="text-white/60">
            Chia sẻ hồ sơ số của bạn nhanh chóng qua mã QR hoặc đường dẫn cá nhân.
          </p>
        </div>

        <QRCodePreviewCard
          publicUrl={qrData.publicUrl}
          displayUrl={qrData.displayUrl}
          status={qrData.status}
          onCopyUrl={handleCopyUrl}
          qrRef={qrSvgRef}
        />

        <SlugWarning show={qrData.slugChangedRecently} />

        <QRActionButtons
          onCopyLink={handleCopyLink}
          onDownloadPNG={handleDownloadPNG}
          onDownloadSVG={handleDownloadSVG}
          disabled={qrData.status === 'draft'}
        />

        {qrData.status === 'draft' && (
          <div className="mt-4 text-center text-sm text-[#F5A524]/90">
            Hồ sơ chưa được xuất bản. Mã QR hiện chưa khả dụng cho khách truy cập.
          </div>
        )}

        <QRTrackingHint
          scanCount={qrData.scanCount}
          copyCount={qrData.copyCount}
          downloadCount={qrData.downloadCount}
        />
      </motion.div>

      <Toast 
        isVisible={toastState.isVisible} 
        message={toastState.message} 
        type={toastState.type} 
      />
    </div>
  );
}
