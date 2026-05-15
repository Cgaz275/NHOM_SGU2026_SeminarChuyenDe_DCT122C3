import { QRCodeData, QRActionResponse, QREventType } from '@/types/qr-manager';

const MOCK_DELAY = 800;

export const mockQRData: QRCodeData = {
  id: 'qr-12345',
  ownerName: 'Anthony Simon',
  username: 'anthony-simon',
  publicUrl: 'https://digitalcard.app/u/anthony-simon',
  displayUrl: 'digitalcard.app/u/anthony-simon',
  status: 'published', // Try 'draft' or 'updating'
  slugChangedRecently: false, // Set to true to see the warning
  scanCount: 128,
  copyCount: 24,
  downloadCount: 12,
  updatedAt: new Date().toISOString(),
};

export async function getQRCodeData(): Promise<QRCodeData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockQRData);
    }, MOCK_DELAY);
  });
}

export async function copyProfileUrl(url: string): Promise<QRActionResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, clipboard API is used by the frontend before calling this, or just handled entirely by frontend.
      // This mock could represent backend tracking of a copy action.
      resolve({ success: true, message: 'Copied successfully' });
    }, 400);
  });
}

export async function trackQREvent(eventType: QREventType): Promise<QRActionResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[Mock API] Tracked event: ${eventType}`);
      resolve({ success: true });
    }, 300);
  });
}
