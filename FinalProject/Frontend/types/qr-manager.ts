export type QRProfileStatus = 'published' | 'draft' | 'updating';

export type QREventType = 'qr_copy_url' | 'qr_copy_link' | 'qr_download_png' | 'qr_download_svg';

export type QRDownloadFormat = 'png' | 'svg';

export interface QRCodeData {
  id: string;
  ownerName: string;
  username: string;
  publicUrl: string;
  displayUrl: string;
  status: QRProfileStatus;
  slugChangedRecently: boolean;
  scanCount: number;
  copyCount: number;
  downloadCount: number;
  updatedAt: string;
}

export interface QRActionResponse {
  success: boolean;
  message?: string;
}
