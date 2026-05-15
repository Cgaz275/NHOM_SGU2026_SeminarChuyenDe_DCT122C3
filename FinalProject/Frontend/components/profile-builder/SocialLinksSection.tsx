'use client';

import { SocialLinksData } from '@/types/profile-builder';
import { 
  // Facebook, 
  // Instagram, 
  // Twitter, 
  // Github, 
  // Dribbble, 
  Mail, 
  Phone,
  Link as LinkIcon
} from 'lucide-react';

interface SocialLinksSectionProps {
  data: SocialLinksData;
  onChange: (data: SocialLinksData) => void;
}

export function SocialLinksSection({ data, onChange }: SocialLinksSectionProps) {
  const handleChange = (field: keyof SocialLinksData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const socialFields: { key: keyof SocialLinksData; label: string; icon: React.ElementType; placeholder: string; type: string }[] = [
    { key: 'email', label: 'Email', icon: Mail, placeholder: 'hello@example.com', type: 'email' },
    { key: 'phone', label: 'Phone', icon: Phone, placeholder: '+1 234 567 8900', type: 'tel' },
    { key: 'portfolio', label: 'Portfolio Website', icon: LinkIcon, placeholder: 'https://yourwebsite.com', type: 'url' },
    // { key: 'facebook', label: 'Facebook', icon: Facebook, placeholder: 'https://facebook.com/...', type: 'url' },
    // { key: 'instagram', label: 'Instagram', icon: Instagram, placeholder: 'https://instagram.com/...', type: 'url' },
    // { key: 'x', label: 'X (Twitter)', icon: Twitter, placeholder: 'https://x.com/...', type: 'url' },
    // { key: 'github', label: 'GitHub', icon: Github, placeholder: 'https://github.com/...', type: 'url' },
    { key: 'behance', label: 'Behance', icon: LinkIcon, placeholder: 'https://behance.net/...', type: 'url' },
    // { key: 'dribbble', label: 'Dribbble', icon: Dribbble, placeholder: 'https://dribbble.com/...', type: 'url' },
  ];

  return (
    <div className="flex flex-col gap-6 bg-[#101010] border border-white/10 rounded-xl p-6">
      <div>
        <h2 className="text-lg font-semibold text-white">Social Links & Contact</h2>
        <p className="text-sm text-white/50 mt-1">Add your social profiles and contact methods.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socialFields.map((field) => {
          const Icon = field.icon;
          const hasValue = !!data[field.key];

          return (
            <div key={field.key} className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-white/90">
                {field.label}
              </label>
              <div className="relative flex items-center bg-[#0B0B0B] border border-white/10 rounded-lg overflow-hidden focus-within:border-[#008FEA] transition-colors">
                <div className={`pl-3 pr-2 flex items-center justify-center transition-colors ${hasValue ? 'text-[#008FEA]' : 'text-white/30'}`}>
                  <Icon size={16} />
                </div>
                <input
                  type={field.type}
                  value={data[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="flex-1 bg-transparent py-2.5 pr-3 text-sm text-white placeholder-white/30 focus:outline-none"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
