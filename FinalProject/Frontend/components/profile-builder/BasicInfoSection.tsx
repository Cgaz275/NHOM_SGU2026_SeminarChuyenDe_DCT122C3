'use client';

import { BasicInfoData, SlugStatus } from '@/types/profile-builder';
import { SlugInput } from './SlugInput';

interface BasicInfoSectionProps {
  data: BasicInfoData;
  onChange: (data: BasicInfoData) => void;
  slugStatus: SlugStatus;
  setSlugStatus: (status: SlugStatus) => void;
}

export function BasicInfoSection({ data, onChange, slugStatus, setSlugStatus }: BasicInfoSectionProps) {
  const handleTextChange = (field: keyof BasicInfoData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const bioLength = data.bio.length;

  return (
    <div className="flex flex-col gap-6 bg-[#101010] border border-white/10 rounded-xl p-6">
      <div>
        <h2 className="text-lg font-semibold text-white">Thông tin cơ bản</h2>
        <p className="text-sm text-white/50 mt-1">Thiết lập các thông tin cá nhân cốt lõi của bạn.</p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Full Name & Role */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-white/90">
              Họ và Tên <span className="text-[#E5484D]">*</span>
            </label>
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => handleTextChange('fullName', e.target.value)}
              placeholder="VD: Nguyễn Văn A"
              className="bg-[#0B0B0B] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#008FEA] transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-white/90">
              Vai trò / Chức danh <span className="text-[#E5484D]">*</span>
            </label>
            <input
              type="text"
              value={data.role}
              onChange={(e) => handleTextChange('role', e.target.value)}
              placeholder="VD: Chuyên viên Thiết kế"
              className="bg-[#0B0B0B] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#008FEA] transition-colors"
            />
          </div>
        </div>

        {/* Slug */}
        <SlugInput
          value={data.slug}
          onChange={(val) => handleTextChange('slug', val)}
          status={slugStatus}
          setStatus={setSlugStatus}
        />

        {/* Slogan */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-white/90">Slogan / Câu khẩu hiệu</label>
          <input
            type="text"
            value={data.slogan}
            onChange={(e) => handleTextChange('slogan', e.target.value)}
            placeholder="VD: Kiến tạo tương lai số"
            className="bg-[#0B0B0B] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#008FEA] transition-colors"
          />
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-end">
            <label className="text-sm font-medium text-white/90">Tiểu sử</label>
            <span className={`text-xs ${bioLength > 300 ? 'text-[#E5484D]' : 'text-white/40'}`}>
              {bioLength} / 300
            </span>
          </div>
          <textarea
            value={data.bio}
            onChange={(e) => {
              if (e.target.value.length <= 300) {
                handleTextChange('bio', e.target.value);
              }
            }}
            placeholder="Viết một đoạn tiểu sử ngắn về bản thân bạn..."
            rows={4}
            className="bg-[#0B0B0B] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#008FEA] transition-colors resize-none"
          />
        </div>
      </div>
    </div>

  );
}
