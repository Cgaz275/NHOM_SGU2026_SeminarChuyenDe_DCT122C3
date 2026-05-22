import { apiClient } from '../lib/apiClient';
import { ProfileBuilderData } from '@/types/profile-builder';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../lib/firebase';

const defaultProfileData: ProfileBuilderData = {
  id: '',
  basicInfo: {
    fullName: '',
    role: '',
    slogan: '',
    bio: '',
    slug: '',
  },
  media: { avatarUrl: '' },
  socialLinks: {
    facebook: '', instagram: '', x: '', github: '',
    behance: '', dribbble: '', portfolio: '', email: '', phone: '',
  },
  privacy: {
    showEmail: true, showPhone: true, showSocialLinks: true, allowAiContactMention: true,
  },
  theme: { theme: 'Dark Blue', fontStyle: 'Modern Sans' },
  lastSavedAt: null,
};

function mapBackendToFrontend(card: any): ProfileBuilderData {
  return {
    id: card.id,
    basicInfo: {
      fullName: card.fullName || '',
      role: card.jobTitle || '',
      slogan: card.slogan || '',
      bio: card.bio || '',
      slug: card.slug || '',
    },
    media: {
      avatarUrl: card.avatarUrl || '',
    },
    socialLinks: { ...defaultProfileData.socialLinks, ...(card.socialLinks || {}) },
    privacy: {
      showEmail: card.isEmailPublic ?? true,
      showPhone: card.isPhonePublic ?? true,
      showSocialLinks: card.isSocialLinksPublic ?? true,
      allowAiContactMention: card.allowAiContactMention ?? true,
    },
    theme: card.theme || { theme: 'Dark Blue', fontStyle: 'Modern Sans' },
    lastSavedAt: card.createdAt ? new Date(card.createdAt._seconds ? card.createdAt._seconds * 1000 : card.createdAt).toISOString() : null,
    skills: card.aiConfig?.knowledgeBase?.skills?.map((s: any) => s.name) || [],
  };
}


function mapFrontendToBackend(data: ProfileBuilderData): any {
  return {
    fullName: data.basicInfo.fullName,
    jobTitle: data.basicInfo.role,
    slogan: data.basicInfo.slogan,
    bio: data.basicInfo.bio,
    avatarUrl: data.media.avatarUrl,
    socialLinks: data.socialLinks,
    isEmailPublic: data.privacy.showEmail,
    isPhonePublic: data.privacy.showPhone,
    isSocialLinksPublic: data.privacy.showSocialLinks,
    allowAiContactMention: data.privacy.allowAiContactMention,
    theme: data.theme,
    slug: data.basicInfo.slug,
    aiConfig: {
      knowledgeBase: {
        skills: data.skills?.map(s => ({ name: s })) || []
      }
    }
  };
}



export async function getProfileDraft(): Promise<ProfileBuilderData> {
  const [cardsRes, userRes] = await Promise.all([
    apiClient<any[]>('/cards/me'),
    apiClient<any>('/users/me')
  ]);

  let profileData = JSON.parse(JSON.stringify(defaultProfileData));

  if (cardsRes.success && cardsRes.data && cardsRes.data.length > 0) {
    profileData = mapBackendToFrontend(cardsRes.data[0]);
  }

  // Tự động lấy email từ user profile nếu trong card chưa có
  if (userRes.success && userRes.data && userRes.data.email) {
    if (!profileData.socialLinks.email) {
      profileData.socialLinks.email = userRes.data.email;
    }
  }

  return profileData;
}


export async function saveProfileDraft(data: ProfileBuilderData): Promise<{ success: boolean; lastSavedAt: string }> {
  const payload = mapFrontendToBackend(data);
  let res;
  
  if (data.id) {
    // Update existing
    res = await apiClient<any>(`/cards/${data.id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  } else {
    // Create new
    res = await apiClient<any>('/cards', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  if (!res.success) {
    throw new Error(res.message || 'Lỗi lưu thông tin thẻ');
  }

  return { success: true, lastSavedAt: new Date().toISOString() };
}

export async function publishProfile(data: ProfileBuilderData): Promise<{ success: boolean; message: string }> {
  if (!data.basicInfo.fullName || !data.basicInfo.role) {
    throw new Error('Thiếu thông tin bắt buộc');
  }
  
  // Lưu dữ liệu trước
  await saveProfileDraft(data);

  // Cập nhật trạng thái thành published
  if (data.id) {
    const res = await apiClient<any>(`/cards/${data.id}`, {
      method: 'PUT',
      body: JSON.stringify({ status: 'published' }),
    });
    
    if (!res.success) {
      throw new Error(res.message || 'Lỗi xuất bản thẻ');
    }
  }

  return { success: true, message: 'Đã xuất bản thẻ thành công' };
}


export async function checkSlugAvailability(slug: string): Promise<boolean> {
  const res = await apiClient<any>(`/cards/check-slug?slug=${slug}`);
  if (res.success) {
    // res.data = true nghĩa là bị trùng (không dùng được) -> trả về false
    // res.data = false nghĩa là không trùng (dùng được) -> trả về true
    return !res.data;
  }
  return false; 
}


export async function mockUploadAvatar(file: File): Promise<string> {
  // Tạo reference đến file trên Firebase Storage
  const fileRef = ref(storage, `avatars/${Date.now()}_${file.name}`);
  
  // Upload file
  await uploadBytes(fileRef, file);
  
  // Lấy download URL
  const downloadURL = await getDownloadURL(fileRef);
  return downloadURL;
}

export async function resetProfileDraft(): Promise<ProfileBuilderData> {
  return await getProfileDraft();
}
