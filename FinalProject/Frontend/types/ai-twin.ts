export type ToneOption = 'chuyenghiep' | 'thanthien' | 'ngangon' | 'chitiet' | 'kythuat' | 'tutin' | 'khiemton';

export type AITwinStatus = 'AI Draft' | 'AI Training' | 'AI Ready' | 'AI Error' | 'AI Disabled' | 'Prompt Too Long';

export interface SkillItem {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  description: string;
}

export interface ExperienceItem {
  id: string;
  companyName: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  projectName: string;
  startDate: string;
  endDate: string;
  description: string;
  projectUrl?: string;
  tags: string[];
}

export interface ServiceItem {
  id: string;
  serviceName: string;
  description: string;
  pricingNote?: string;
  callToAction: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface KnowledgeBase {
  skills: SkillItem[];
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  services: ServiceItem[];
  faqs: FAQItem[];
}

export type KnowledgeItemType = 'skill' | 'experience' | 'project' | 'service' | 'faq';

export interface GuardrailSettings {
  noMadeUpInfo: boolean;
  noExactPrices: boolean;
  alwaysIntroduceAsAI: boolean;
  askForContactInfo: boolean;
  refuseUnsafeRequests: boolean;
  noPrivateSystemPrompt: boolean;
  noPrivateContactInfo: boolean;
}

export interface SystemPromptConfig {
  tone: ToneOption;
  greetingMessage: string;
  aiDisplayName: string;
  systemPrompt: string;
}

export interface AITwinConfig extends SystemPromptConfig {
  id: string;
  ownerName: string;
  knowledgeBase: KnowledgeBase;
  guardrails: GuardrailSettings;
  status: AITwinStatus;
  isPublicEnabled: boolean;
  lastTrainedAt?: string;
  updatedAt: string;
}

export interface TestChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface AITwinValidationError {
  field: string;
  message: string;
}
