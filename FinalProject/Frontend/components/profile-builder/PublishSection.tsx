'use client';

import { ProfileBuilderData, SlugStatus } from '@/types/profile-builder';
import { Save, Globe, RefreshCcw, AlertCircle, CheckCircle2 } from 'lucide-react';

interface PublishSectionProps {
  data: ProfileBuilderData;
  slugStatus: SlugStatus;
  onSaveDraft: () => void;
  onPublish: () => void;
  onReset: () => void;
  isSaving: boolean;
  isPublishing: boolean;
}

export function PublishSection({
  data,
  slugStatus,
  onSaveDraft,
  onPublish,
  onReset,
  isSaving,
  isPublishing
}: PublishSectionProps) {
  // Simple validation check
  const hasRequiredFields = !!(data.basicInfo.fullName && data.basicInfo.role && data.basicInfo.slug);
  const isSlugValid = slugStatus === 'available';
  const canPublish = hasRequiredFields && isSlugValid;

  return (
    <div className="flex flex-col gap-6 bg-[#101010] border border-white/10 rounded-xl p-6">
      <div>
        <h2 className="text-lg font-semibold text-white">Tùy chọn xuất bản</h2>
        <p className="text-sm text-white/50 mt-1">Xem lại và đưa hồ sơ của bạn lên mạng.</p>
      </div>

      <div className="bg-[#0B0B0B] border border-white/5 rounded-lg p-4">
        <h3 className="text-sm font-medium text-white mb-3">Kiểm tra trước khi xuất bản</h3>
        <ul className="flex flex-col gap-2">
          <li className="flex items-center gap-2 text-sm">
            {hasRequiredFields ? (
              <CheckCircle2 size={16} className="text-[#2ECC71]" />
            ) : (
              <AlertCircle size={16} className="text-[#E5484D]" />
            )}
            <span className={hasRequiredFields ? 'text-white/80' : 'text-[#E5484D]'}>
              Các trường bắt buộc (Tên, Vai trò, Slug) đã điền
            </span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            {isSlugValid ? (
              <CheckCircle2 size={16} className="text-[#2ECC71]" />
            ) : (
              <AlertCircle size={16} className="text-[#E5484D]" />
            )}
            <span className={isSlugValid ? 'text-white/80' : 'text-[#E5484D]'}>
              {slugStatus === 'unavailable' ? 'Slug đã bị trùng' : 
               slugStatus === 'error' ? 'Định dạng slug không hợp lệ' :
               slugStatus === 'available' ? 'Slug hợp lệ' : 'Đang chờ kiểm tra slug'}
            </span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <CheckCircle2 size={16} className="text-[#2ECC71]" />
            <span className="text-white/80">
              Cài đặt riêng tư đã cấu hình ({data.privacy.showEmail ? 'Hiện Email' : 'Ẩn Email'})
            </span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={onPublish}
          disabled={!canPublish || isPublishing || isSaving}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#008FEA] hover:bg-[#008FEA]/90 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPublishing ? (
            <RefreshCcw size={18} className="animate-spin" />
          ) : (
            <Globe size={18} />
          )}
          {isPublishing ? 'Đang xuất bản...' : 'Xuất bản Thẻ'}
        </button>
        
        <button
          onClick={onSaveDraft}
          disabled={isSaving || isPublishing}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <RefreshCcw size={18} className="animate-spin" />
          ) : (
            <Save size={18} />
          )}
          {isSaving ? 'Đang lưu...' : 'Lưu nháp'}
        </button>

        <button
          onClick={() => {
            if (confirm('Bạn có chắc muốn đặt lại tất cả các thay đổi về trạng thái đã lưu gần nhất không?')) {
              onReset();
            }
          }}
          disabled={isSaving || isPublishing}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent hover:bg-[#E5484D]/10 text-[#E5484D] px-6 py-2.5 rounded-lg font-medium transition-colors ml-auto border border-transparent hover:border-[#E5484D]/30"
        >
          <RefreshCcw size={16} />
          Đặt lại thay đổi
        </button>
      </div>
    </div>

  );
}
