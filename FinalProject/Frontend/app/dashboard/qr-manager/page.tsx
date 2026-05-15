import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { QRCodeManagerPage } from '@/components/qr-manager/QRCodeManagerPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quản lý mã QR | SEMINAR Digital Card',
  description: 'Chia sẻ hồ sơ số của bạn nhanh chóng qua mã QR.',
};

export default function QRManagerRoute() {
  return (
    <div className="flex h-screen bg-black">
      <DashboardSidebar />
      <QRCodeManagerPage />
    </div>
  );
}
