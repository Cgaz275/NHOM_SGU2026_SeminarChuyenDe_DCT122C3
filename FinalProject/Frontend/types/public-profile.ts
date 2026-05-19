export type AIStatus = 'ai_ready' | 'ai_disabled' | 'ai_error';

export type PublicProfileState = 
  | 'published' 
  | 'ai_disabled' 
  | 'ai_error' 
  | 'updating' 
  | 'locked' 
  | 'not_found' 
  | 'loading';

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  iconName: string;
}

export interface Project {
  id: string;
  title: string;
  dateRange: string;
  description: string;
  tags: string[];
}

export interface Experience {
  id: string;
  company: string;
  dateRange: string;
  description: string;
}

export interface PublicProfile {
  id: string;
  username: string;
  name: string;
  role: string;
  slogan: string;
  bio: string;
  skills: string[];
  socialLinks: SocialLink[];
  featuredProjects: Project[];
  experience: Experience[];
  avatarUrl?: string; // Using a placeholder if missing
  aiStatus: AIStatus;
  aiDisplayName?: string;
  greetingMessage?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface LeadFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ReportData {
  reason: string;
  details?: string;
}
