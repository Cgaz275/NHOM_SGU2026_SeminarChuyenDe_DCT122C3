import {
  PublicProfile,
  ChatMessage,
  LeadFormData,
  ReportData,
} from '../types/public-profile';

const MOCK_PROFILE: PublicProfile = {
  id: 'profile_123',
  username: 'anthony-simon',
  name: 'Anthony Simon',
  role: 'Product Designer & AI Strategist',
  slogan: 'Crafting digital twins for seamless professional connection',
  bio: 'Anthony is a versatile full-stack developer and AI product strategist. He builds digital experiences that combine personal branding, automation, and conversational AI.',
  skills: ['Next.js', 'Python', 'UI/UX', 'AI Agent', 'Supabase', 'Tailwind CSS'],
  socialLinks: [
    { id: '1', platform: 'LinkedIn', url: '#', iconName: 'linkedin' },
    { id: '2', platform: 'GitHub', url: '#', iconName: 'github' },
    { id: '3', platform: 'X', url: '#', iconName: 'twitter' },
    { id: '4', platform: 'Portfolio', url: '#', iconName: 'globe' },
    { id: '5', platform: 'Email', url: '#', iconName: 'mail' },
  ],
  featuredProjects: [
    {
      id: 'p1',
      title: 'Personal Website with an AI Digital Twin',
      dateRange: '01.2026 - 02.2026',
      description: 'A portfolio platform where visitors can chat with an AI representative trained on the owner’s skills, projects, and experience.',
      tags: ['Next.js', 'AI', 'Tailwind'],
    },
    {
      id: 'p2',
      title: 'Persona-Based Digital Card',
      dateRange: '01.2026 - 02.2026',
      description: 'A smart digital business card with QR sharing, lead capture, AI chat, and contact export.',
      tags: ['QR', 'Supabase', 'AI'],
    },
  ],
  experience: [
    {
      id: 'e1',
      company: 'Company A',
      dateRange: '01.2026 - 02.2026',
      description: 'Worked on frontend interfaces, profile management, AI assistant configuration, and dashboard workflows.',
    },
    {
      id: 'e2',
      company: 'Company B',
      dateRange: '03.2026 - 05.2026',
      description: 'Built interactive public profile components, chat UI states, and lead capture forms.',
    },
  ],
  aiStatus: 'ai_ready',
};

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getPublicProfile(username: string): Promise<PublicProfile> {
  await delay(800);
  if (username !== 'anthony-simon') {
    throw new Error('Profile not found');
  }
  return MOCK_PROFILE;
}

export async function sendChatMessage(profileId: string, message: string): Promise<ChatMessage> {
  await delay(1200);

  const lowerMsg = message.toLowerCase();
  let aiContent = "I do not have enough information about that. You can leave your contact information so Anthony can reply directly.";

  if (lowerMsg.includes('project')) {
    aiContent = "Anthony has worked on several projects, including a 'Personal Website with an AI Digital Twin' and a 'Persona-Based Digital Card'. They showcase his skills in Next.js, AI integration, and frontend engineering.";
  } else if (lowerMsg.includes('skill') || lowerMsg.includes('tech')) {
    aiContent = "Anthony is skilled in Next.js, Python, UI/UX design, building AI Agents, Supabase, and Tailwind CSS.";
  } else if (lowerMsg.includes('experience') || lowerMsg.includes('work')) {
    aiContent = "Anthony has experience working at Company A and Company B, focusing on frontend interfaces, AI assistant configuration, and interactive public profiles.";
  } else if (
    lowerMsg.includes('contact') ||
    lowerMsg.includes('collaboration') ||
    lowerMsg.includes('service') ||
    lowerMsg.includes('price') ||
    lowerMsg.includes('pricing') ||
    lowerMsg.includes('hiring') ||
    lowerMsg.includes('business')
  ) {
    // This is a special signal that the UI should show the fallback form
    aiContent = "For business inquiries, pricing, or detailed collaboration questions, please leave your contact information. Anthony will get back to you directly! [SHOW_LEAD_FORM]";
  }

  return {
    id: Date.now().toString(),
    role: 'assistant',
    content: aiContent,
    timestamp: new Date(),
  };
}

export async function submitLeadForm(profileId: string, leadData: LeadFormData): Promise<boolean> {
  await delay(1000);
  console.log('Mock submitted lead data:', leadData);
  return true;
}

export async function submitAIReport(profileId: string, reportData: ReportData): Promise<boolean> {
  await delay(800);
  console.log('Mock submitted AI report:', reportData);
  return true;
}

export async function downloadContactCard(profileId: string): Promise<boolean> {
  await delay(1500);
  console.log('Mock downloading contact card image for', profileId);
  return true;
}

export async function exportVCard(profileId: string): Promise<boolean> {
  await delay(1000);
  console.log('Mock exporting vCard for', profileId);
  return true;
}
