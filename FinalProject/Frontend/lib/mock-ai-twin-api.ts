import {
  AITwinConfig,
  AITwinStatus,
  KnowledgeItemType,
  TestChatMessage,
  SkillItem,
  ExperienceItem,
  ProjectItem,
  ServiceItem,
  FAQItem
} from '@/types/ai-twin';

// Mock initial data
let mockConfig: AITwinConfig = {
  id: 'twin-123',
  ownerName: 'Anthony Simon',
  aiDisplayName: "Anthony's AI Twin",
  tone: 'chuyenghiep',
  greetingMessage: "Hi, I'm Anthony's AI Twin. You can ask me about his skills, projects, experience, or collaboration availability.",
  systemPrompt: "You are the AI assistant of Anthony Simon. Answer based only on the provided profile and knowledge base. If information is missing, ask the visitor to leave contact details.",
  knowledgeBase: {
    skills: [
      {
        id: 'sk-1',
        name: 'React.js',
        level: 'Expert',
        description: 'Building complex single-page applications using React and Next.js.'
      }
    ],
    experiences: [],
    projects: [],
    services: [],
    faqs: []
  },
  guardrails: {
    noMadeUpInfo: true,
    noExactPrices: true,
    alwaysIntroduceAsAI: true,
    askForContactInfo: true,
    refuseUnsafeRequests: true,
    noPrivateSystemPrompt: true,
    noPrivateContactInfo: true,
  },
  status: 'AI Draft',
  isPublicEnabled: false,
  updatedAt: new Date().toISOString(),
};

// Helpers for simulation
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getAITwinConfig(): Promise<AITwinConfig> {
  await delay(600);
  return { ...mockConfig };
}

export async function saveAITwinConfig(config: Partial<AITwinConfig>): Promise<AITwinConfig> {
  await delay(800);
  mockConfig = { ...mockConfig, ...config, updatedAt: new Date().toISOString() };
  if (mockConfig.status !== 'AI Disabled') {
    mockConfig.status = 'AI Draft';
  }
  return { ...mockConfig };
}

export async function trainAITwin(config: AITwinConfig): Promise<AITwinConfig> {
  await delay(1500); // Simulate training
  mockConfig = {
    ...config,
    status: 'AI Ready',
    lastTrainedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return { ...mockConfig };
}

export async function publishAITwin(config: AITwinConfig): Promise<AITwinConfig> {
  await delay(1000);
  mockConfig = {
    ...config,
    isPublicEnabled: true,
    status: 'AI Ready',
    updatedAt: new Date().toISOString(),
  };
  return { ...mockConfig };
}

export async function togglePublicAI(enabled: boolean): Promise<AITwinConfig> {
  await delay(600);
  mockConfig = {
    ...mockConfig,
    isPublicEnabled: enabled,
    status: enabled ? 'AI Ready' : 'AI Disabled',
    updatedAt: new Date().toISOString(),
  };
  return { ...mockConfig };
}

// Mock Test Chat Logic
export async function sendTestMessage(config: AITwinConfig, message: string): Promise<TestChatMessage> {
  await delay(1200); // simulate thinking
  
  const msgLower = message.toLowerCase();
  let responseContent = "I do not have enough information about that yet. You can add it to the Knowledge Base or ask the visitor to leave contact information.";

  if (msgLower.includes('skill') || msgLower.includes('react')) {
    if (config.knowledgeBase.skills.length > 0) {
      responseContent = `Based on the knowledge base, Anthony is skilled in: ${config.knowledgeBase.skills.map(s => s.name).join(', ')}.`;
    }
  } else if (msgLower.includes('project')) {
    if (config.knowledgeBase.projects.length > 0) {
      responseContent = `Anthony has worked on: ${config.knowledgeBase.projects.map(p => p.projectName).join(', ')}.`;
    } else {
      responseContent = "There are no projects listed yet.";
    }
  } else if (msgLower.includes('experience') || msgLower.includes('company')) {
    if (config.knowledgeBase.experiences.length > 0) {
      responseContent = `Anthony has experience working at: ${config.knowledgeBase.experiences.map(e => e.companyName).join(', ')}.`;
    } else {
      responseContent = "There is no experience listed yet.";
    }
  } else if (msgLower.includes('service') || msgLower.includes('price') || msgLower.includes('cost')) {
    responseContent = "For detailed pricing and services, please provide your contact information and Anthony will reach out.";
  } else if (msgLower.includes('hi') || msgLower.includes('hello')) {
    responseContent = config.greetingMessage;
  }

  return {
    id: Date.now().toString(),
    role: 'assistant',
    content: `[Mock AI Response]: ${responseContent}`,
    timestamp: new Date().toISOString(),
  };
}

export async function regenerateTestResponse(config: AITwinConfig, messages: TestChatMessage[]): Promise<TestChatMessage> {
  await delay(1000);
  return {
    id: Date.now().toString(),
    role: 'assistant',
    content: "[Mock AI Regenerated Response]: I have reconsidered your last question, but I still only have access to the provided knowledge base. Please add more details if you want a better answer.",
    timestamp: new Date().toISOString(),
  };
}

export async function resetTestConversation(): Promise<void> {
  await delay(300);
}

// Knowledge Base Helpers (To simulate adding/editing/deleting items individually)
export async function addKnowledgeItem(type: KnowledgeItemType, item: any): Promise<AITwinConfig> {
  await delay(500);
  const newItem = { ...item, id: Date.now().toString() };
  if (type === 'skill') mockConfig.knowledgeBase.skills.push(newItem);
  if (type === 'experience') mockConfig.knowledgeBase.experiences.push(newItem);
  if (type === 'project') mockConfig.knowledgeBase.projects.push(newItem);
  if (type === 'service') mockConfig.knowledgeBase.services.push(newItem);
  if (type === 'faq') mockConfig.knowledgeBase.faqs.push(newItem);
  mockConfig.status = 'AI Draft';
  return { ...mockConfig };
}

export async function updateKnowledgeItem(type: KnowledgeItemType, itemId: string, item: any): Promise<AITwinConfig> {
  await delay(500);
  const updateArr = (arr: any[]) => arr.map(x => x.id === itemId ? { ...x, ...item } : x);
  if (type === 'skill') mockConfig.knowledgeBase.skills = updateArr(mockConfig.knowledgeBase.skills);
  if (type === 'experience') mockConfig.knowledgeBase.experiences = updateArr(mockConfig.knowledgeBase.experiences);
  if (type === 'project') mockConfig.knowledgeBase.projects = updateArr(mockConfig.knowledgeBase.projects);
  if (type === 'service') mockConfig.knowledgeBase.services = updateArr(mockConfig.knowledgeBase.services);
  if (type === 'faq') mockConfig.knowledgeBase.faqs = updateArr(mockConfig.knowledgeBase.faqs);
  mockConfig.status = 'AI Draft';
  return { ...mockConfig };
}

export async function deleteKnowledgeItem(type: KnowledgeItemType, itemId: string): Promise<AITwinConfig> {
  await delay(500);
  const filterArr = (arr: any[]) => arr.filter(x => x.id !== itemId);
  if (type === 'skill') mockConfig.knowledgeBase.skills = filterArr(mockConfig.knowledgeBase.skills);
  if (type === 'experience') mockConfig.knowledgeBase.experiences = filterArr(mockConfig.knowledgeBase.experiences);
  if (type === 'project') mockConfig.knowledgeBase.projects = filterArr(mockConfig.knowledgeBase.projects);
  if (type === 'service') mockConfig.knowledgeBase.services = filterArr(mockConfig.knowledgeBase.services);
  if (type === 'faq') mockConfig.knowledgeBase.faqs = filterArr(mockConfig.knowledgeBase.faqs);
  mockConfig.status = 'AI Draft';
  return { ...mockConfig };
}
