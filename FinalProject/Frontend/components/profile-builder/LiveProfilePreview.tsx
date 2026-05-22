'use client';

import { ProfileBuilderData } from '@/types/profile-builder';
import { 
  Mail, 
  Phone,
  Link as LinkIcon,
  MessageSquare,
  UserPlus
} from 'lucide-react';
import Image from 'next/image';

interface LiveProfilePreviewProps {
  data: ProfileBuilderData;
}

export function LiveProfilePreview({ data }: LiveProfilePreviewProps) {
  const { basicInfo, media, socialLinks, privacy, theme } = data;

  // Theme mapping
  const getThemeStyles = () => {
    switch (theme.theme) {
      case 'Minimal Black':
        return {
          bg: 'bg-black',
          card: 'bg-[#0A0A0A] border border-white/10',
          accent: 'bg-white text-black',
          accentText: 'text-white',
          buttonPrimary: 'bg-white text-black hover:bg-white/90',
          buttonSecondary: 'bg-white/10 text-white hover:bg-white/20',
        };
      case 'Electric Blue':
        return {
          bg: 'bg-[#030914]',
          card: 'bg-[#081226] border border-[#008FEA]/20',
          accent: 'bg-[#008FEA] text-white',
          accentText: 'text-[#008FEA]',
          buttonPrimary: 'bg-[#008FEA] text-white hover:bg-[#008FEA]/90',
          buttonSecondary: 'bg-[#008FEA]/10 text-[#008FEA] hover:bg-[#008FEA]/20 border border-[#008FEA]/30',
        };
      case 'Glass Card':
        return {
          bg: 'bg-[#0B0B0B]',
          card: 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl',
          accent: 'bg-white text-black',
          accentText: 'text-white',
          buttonPrimary: 'bg-white text-black hover:bg-white/90',
          buttonSecondary: 'bg-white/10 text-white hover:bg-white/20',
        };
      case 'Dark Blue':
      default:
        return {
          bg: 'bg-[#0B1120]',
          card: 'bg-[#101827] border border-[#2367A2]/30',
          accent: 'bg-[#2367A2] text-white',
          accentText: 'text-[#2367A2]',
          buttonPrimary: 'bg-[#2367A2] text-white hover:bg-[#2367A2]/90',
          buttonSecondary: 'bg-[#2367A2]/10 text-[#2367A2] hover:bg-[#2367A2]/20 border border-[#2367A2]/30',
        };
    }
  };

  const getFontStyles = () => {
    switch (theme.fontStyle) {
      case 'Tech Display':
        return 'font-mono tracking-tight';
      case 'Clean Professional':
        return 'font-serif tracking-normal';
      case 'Modern Sans':
      default:
        return 'font-sans tracking-normal';
    }
  };

  const styles = getThemeStyles();
  const fontStyle = getFontStyles();

  const activeSocials = [
    { key: 'email', value: socialLinks.email, icon: Mail, isVisible: privacy.showEmail },
    { key: 'phone', value: socialLinks.phone, icon: Phone, isVisible: privacy.showPhone },
    { key: 'portfolio', value: socialLinks.portfolio, icon: LinkIcon, isVisible: privacy.showSocialLinks },
    // { key: 'facebook', value: socialLinks.facebook, icon: Facebook, isVisible: privacy.showSocialLinks },
    // { key: 'instagram', value: socialLinks.instagram, icon: Instagram, isVisible: privacy.showSocialLinks },
    // { key: 'x', value: socialLinks.x, icon: Twitter, isVisible: privacy.showSocialLinks },
    // { key: 'github', value: socialLinks.github, icon: Github, isVisible: privacy.showSocialLinks },
    { key: 'behance', value: socialLinks.behance, icon: LinkIcon, isVisible: privacy.showSocialLinks },
    // { key: 'dribbble', value: socialLinks.dribbble, icon: Dribbble, isVisible: privacy.showSocialLinks },
  ].filter(social => social.value && social.isVisible);

  return (
    <div className={`w-full max-w-[380px] h-[780px] rounded-[40px] overflow-hidden relative shadow-2xl ring-8 ring-[#101010] ${styles.bg} ${fontStyle}`}>
      {/* Device Top Bar Mock */}
      <div className="absolute top-0 left-0 right-0 h-12 z-20 flex items-center justify-between px-6">
        <span className="text-[10px] font-bold text-white/50">9:41</span>
        <div className="flex gap-1.5">
          <div className="w-4 h-3 bg-white/50 rounded-sm"></div>
          <div className="w-3 h-3 bg-white/50 rounded-full"></div>
        </div>
      </div>

      <div className="w-full h-full overflow-y-auto no-scrollbar pb-20">
        <div className={`m-4 mt-16 rounded-3xl overflow-hidden p-6 flex flex-col items-center text-center ${styles.card}`}>
          
          {/* Avatar */}
          <div className="relative w-28 h-28 rounded-full overflow-hidden mb-5 border-4 border-white/5 shadow-lg">
            {media.avatarUrl ? (
              <Image 
                src={media.avatarUrl} 
                alt={basicInfo.fullName || 'Avatar'} 
                fill 
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                <span className="text-3xl font-bold text-white/30">
                  {basicInfo.fullName ? basicInfo.fullName.charAt(0).toUpperCase() : '?'}
                </span>
              </div>
            )}
          </div>

          {/* Name & Role */}
          <h1 className="text-2xl font-bold text-white mb-1">
            {basicInfo.fullName || 'Tên của bạn'}
          </h1>
          <p className={`text-sm font-medium mb-3 ${styles.accentText}`}>
            {basicInfo.role || 'Vai trò của bạn'}
          </p>

          {/* Slogan */}
          {basicInfo.slogan && (
            <p className="text-sm italic text-white/70 mb-5 max-w-[280px]">
              "{basicInfo.slogan}"
            </p>
          )}

          {/* Social Links */}
          {activeSocials.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {activeSocials.map((social) => {
                const Icon = social.icon;
                return (
                  <div 
                    key={social.key}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 border border-white/5"
                  >
                    <Icon size={18} />
                  </div>
                );
              })}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col w-full gap-3 mb-8">
            <button className={`w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors ${styles.buttonPrimary}`}>
              <MessageSquare size={18} />
              Hỏi AI Twin của tôi
            </button>
            <button className={`w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors ${styles.buttonSecondary}`}>
              <UserPlus size={18} />
              Lưu danh bạ
            </button>
          </div>

          {/* Bio */}
          <div className="w-full text-left bg-white/5 p-4 rounded-2xl border border-white/5">
            <h3 className="text-sm font-semibold text-white mb-2">Giới thiệu</h3>
            <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">
              {basicInfo.bio || 'Thêm tiểu sử để giới thiệu bản thân...'}
            </p>
          </div>

          {/* Skills */}
          
            <div className="w-full mt-4 text-left">
              <h3 className="text-sm font-semibold text-white mb-3">Kỹ năng</h3>

              {data.skills && data.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {data.skills.map(skill => (
                  <span key={skill} className="px-3 py-1.5 text-xs font-medium text-white/80 bg-white/5 border border-white/10 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            )}
            </div>
          

        </div>
      </div>
    </div>
  );
}
