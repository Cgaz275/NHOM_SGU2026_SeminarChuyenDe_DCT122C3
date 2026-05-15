'use client';

import { 
  ProfileBuilderData, 
  BasicInfoData, 
  MediaData, 
  SocialLinksData, 
  PrivacySettings, 
  ThemeSettings, 
  SlugStatus 
} from '@/types/profile-builder';
import { BasicInfoSection } from './BasicInfoSection';
import { MediaUploadSection } from './MediaUploadSection';
import { SocialLinksSection } from './SocialLinksSection';
import { PrivacySection } from './PrivacySection';
// import { ThemeSelectorSection } from './ThemeSelectorSection';
import { PublishSection } from './PublishSection';

interface ProfileBuilderFormProps {
  data: ProfileBuilderData;
  onChange: (data: ProfileBuilderData) => void;
  slugStatus: SlugStatus;
  setSlugStatus: (status: SlugStatus) => void;
  onSaveDraft: () => void;
  onPublish: () => void;
  onReset: () => void;
  isSaving: boolean;
  isPublishing: boolean;
}

export function ProfileBuilderForm({
  data,
  onChange,
  slugStatus,
  setSlugStatus,
  onSaveDraft,
  onPublish,
  onReset,
  isSaving,
  isPublishing
}: ProfileBuilderFormProps) {

  // Handlers for updating specific sections
  const updateBasicInfo = (basicInfo: BasicInfoData) => {
    onChange({ ...data, basicInfo });
  };

  const updateMedia = (media: MediaData) => {
    onChange({ ...data, media });
  };

  const updateSocialLinks = (socialLinks: SocialLinksData) => {
    onChange({ ...data, socialLinks });
  };

  const updatePrivacy = (privacy: PrivacySettings) => {
    onChange({ ...data, privacy });
  };

  const updateTheme = (theme: ThemeSettings) => {
    onChange({ ...data, theme });
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl w-full">
      <BasicInfoSection 
        data={data.basicInfo} 
        onChange={updateBasicInfo} 
        slugStatus={slugStatus}
        setSlugStatus={setSlugStatus}
      />
      
      <MediaUploadSection 
        data={data.media} 
        onChange={updateMedia} 
      />
      
      <SocialLinksSection 
        data={data.socialLinks} 
        onChange={updateSocialLinks} 
      />
      
      <PrivacySection 
        data={data.privacy} 
        onChange={updatePrivacy} 
      />
      

      
      <PublishSection 
        data={data}
        slugStatus={slugStatus}
        onSaveDraft={onSaveDraft}
        onPublish={onPublish}
        onReset={onReset}
        isSaving={isSaving}
        isPublishing={isPublishing}
      />
    </div>
  );
}
