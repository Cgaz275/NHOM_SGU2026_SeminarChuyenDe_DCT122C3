'use client';

import { PrivacySettings } from '@/types/profile-builder';

interface PrivacySectionProps {
  data: PrivacySettings;
  onChange: (data: PrivacySettings) => void;
}

export function PrivacySection({ data, onChange }: PrivacySectionProps) {
  const handleToggle = (field: keyof PrivacySettings) => {
    onChange({ ...data, [field]: !data[field] });
  };

  const toggles = [
    { key: 'showEmail', label: 'Hiển thị Email', desc: 'Hiển thị email của bạn trên hồ sơ công khai.' },
    { key: 'showPhone', label: 'Hiển thị Số điện thoại', desc: 'Hiển thị số điện thoại của bạn trên hồ sơ công khai.' },
    { key: 'showSocialLinks', label: 'Hiển thị Liên kết mạng xã hội', desc: 'Hiển thị các biểu tượng mạng xã hội của bạn.' },
    { key: 'allowAiContactMention', label: 'Cho phép AI chia sẻ thông tin liên hệ', desc: 'Cho phép AI Twin chia sẻ email hoặc số điện thoại của bạn khi được hỏi.' },
  ];

  return (
    <div className="flex flex-col gap-6 bg-[#101010] border border-white/10 rounded-xl p-6">
      <div>
        <h2 className="text-lg font-semibold text-white">Quyền riêng tư</h2>
        <p className="text-sm text-white/50 mt-1">Kiểm soát những thông tin nào được công khai.</p>
      </div>

      <div className="flex flex-col gap-6">
        {toggles.map((toggle) => {
          const isChecked = data[toggle.key as keyof PrivacySettings];
          return (
            <div key={toggle.key} className="flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white/90">{toggle.label}</span>
                <span className="text-xs text-white/50">{toggle.desc}</span>
                {!isChecked && toggle.key === 'allowAiContactMention' && (
                  <span className="text-xs text-[#F5A524] mt-1">
                    AI sẽ không được phép chia sẻ email hoặc số điện thoại của bạn.
                  </span>
                )}
              </div>
              
              <button
                type="button"
                onClick={() => handleToggle(toggle.key as keyof PrivacySettings)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isChecked ? 'bg-[#008FEA]' : 'bg-white/10'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isChecked ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>

  );
}
