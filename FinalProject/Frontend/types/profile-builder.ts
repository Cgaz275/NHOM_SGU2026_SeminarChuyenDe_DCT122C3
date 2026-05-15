export type ThemeOption = 'Dark Blue' | 'Minimal Black' | 'Electric Blue' | 'Glass Card';
export type FontStyle = 'Modern Sans' | 'Tech Display' | 'Clean Professional';

export interface BasicInfoData {
  fullName: string;
  role: string;
  slogan: string;
  bio: string;
  slug: string;
}

export interface MediaData {
  avatarUrl: string;
}

export interface SocialLinksData {
  facebook: string;
  instagram: string;
  x: string;
  github: string;
  behance: string;
  dribbble: string;
  portfolio: string;
  email: string;
  phone: string;
}

export interface PrivacySettings {
  showEmail: boolean;
  showPhone: boolean;
  showSocialLinks: boolean;
  allowAiContactMention: boolean;
}

export interface ThemeSettings {
  theme: ThemeOption;
  fontStyle: FontStyle;
}

export interface ProfileBuilderData {
  id: string;
  basicInfo: BasicInfoData;
  media: MediaData;
  socialLinks: SocialLinksData;
  privacy: PrivacySettings;
  theme: ThemeSettings;
  lastSavedAt: string | null;
}

export type ProfileBuilderStatus = 'loading' | 'draft-saved' | 'unsaved-changes' | 'saving' | 'publishing' | 'published' | 'error';
export type SlugStatus = 'idle' | 'checking' | 'available' | 'unavailable' | 'error';
export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';
