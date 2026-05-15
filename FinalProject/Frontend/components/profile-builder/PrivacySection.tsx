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
    { key: 'showEmail', label: 'Show Email', desc: 'Display your email on your public profile.' },
    { key: 'showPhone', label: 'Show Phone', desc: 'Display your phone number on your public profile.' },
    { key: 'showSocialLinks', label: 'Show Social Links', desc: 'Display your social media icons.' },
    { key: 'allowAiContactMention', label: 'Allow AI to mention contact info', desc: 'Let your AI Twin share your email or phone when asked.' },
  ];

  return (
    <div className="flex flex-col gap-6 bg-[#101010] border border-white/10 rounded-xl p-6">
      <div>
        <h2 className="text-lg font-semibold text-white">Privacy</h2>
        <p className="text-sm text-white/50 mt-1">Control what information is public.</p>
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
                    AI will not be allowed to share your email or phone number.
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
