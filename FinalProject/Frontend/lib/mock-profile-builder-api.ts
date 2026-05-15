import { ProfileBuilderData } from '@/types/profile-builder';

const UNAVAILABLE_SLUGS = ['admin', 'test', 'anthony-simon', 'digitalcard'];

const initialData: ProfileBuilderData = {
  id: 'mock-user-1',
  basicInfo: {
    fullName: '',
    role: '',
    slogan: '',
    bio: '',
    slug: '',
  },
  media: {
    avatarUrl: '',
  },
  socialLinks: {
    facebook: '',
    instagram: '',
    x: '',
    github: '',
    behance: '',
    dribbble: '',
    portfolio: '',
    email: '',
    phone: '',
  },
  privacy: {
    showEmail: true,
    showPhone: true,
    showSocialLinks: true,
    allowAiContactMention: true,
  },
  theme: {
    theme: 'Dark Blue',
    fontStyle: 'Modern Sans',
  },
  lastSavedAt: null,
};

let serverData: ProfileBuilderData = JSON.parse(JSON.stringify(initialData));

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getProfileDraft(): Promise<ProfileBuilderData> {
  await delay(800);
  return JSON.parse(JSON.stringify(serverData));
}

export async function saveProfileDraft(data: ProfileBuilderData): Promise<{ success: boolean; lastSavedAt: string }> {
  await delay(1000);
  const now = new Date().toISOString();
  serverData = JSON.parse(JSON.stringify({ ...data, lastSavedAt: now }));
  return { success: true, lastSavedAt: now };
}

export async function publishProfile(data: ProfileBuilderData): Promise<{ success: boolean; message: string }> {
  await delay(1500);
  if (!data.basicInfo.fullName || !data.basicInfo.role || !data.basicInfo.slug) {
    throw new Error('Missing required fields');
  }
  const now = new Date().toISOString();
  serverData = JSON.parse(JSON.stringify({ ...data, lastSavedAt: now }));
  return { success: true, message: 'Card published successfully' };
}

export async function checkSlugAvailability(slug: string): Promise<boolean> {
  await delay(500);
  return !UNAVAILABLE_SLUGS.includes(slug.toLowerCase());
}

export async function mockUploadAvatar(file: File): Promise<string> {
  await delay(1200);
  
  if (!file.type.startsWith('image/')) {
    throw new Error('Invalid file type');
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('File too large');
  }

  // Create a local object URL to simulate the uploaded image path
  return URL.createObjectURL(file);
}

export async function resetProfileDraft(): Promise<ProfileBuilderData> {
  await delay(800);
  serverData = JSON.parse(JSON.stringify(initialData));
  return JSON.parse(JSON.stringify(serverData));
}
