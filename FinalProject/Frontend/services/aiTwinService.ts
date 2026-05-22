import { apiClient } from '../lib/apiClient';
import { AITwinConfig, KnowledgeItemType, TestChatMessage } from '@/types/ai-twin';

const defaultAITwinConfig: AITwinConfig = {
  id: '',
  ownerName: '',
  aiDisplayName: "My AI Twin",
  tone: 'chuyenghiep',
  greetingMessage: "Hi, I'm the AI assistant. How can I help you?",
  systemPrompt: "You are an AI assistant. Answer based only on the provided profile and knowledge base.",
  knowledgeBase: {
    skills: [], experiences: [], projects: [], services: [], faqs: []
  },
  guardrails: {
    noMadeUpInfo: true, noExactPrices: true, alwaysIntroduceAsAI: true,
    askForContactInfo: true, refuseUnsafeRequests: true, noPrivateSystemPrompt: true,
    noPrivateContactInfo: true,
  },
  status: 'AI Draft',
  isPublicEnabled: false,
  updatedAt: new Date().toISOString(),
};

async function getCard() {
  const res = await apiClient<any[]>('/cards/me');
  if (res.success && res.data && res.data.length > 0) {
    return res.data[0];
  }
  return null;
}

export async function getAITwinConfig(): Promise<AITwinConfig> {
  const card = await getCard();
  if (card) {
    const aiConfig = card.aiConfig || {};
    const kb = aiConfig.knowledgeBase || {};

    // Đảm bảo tất cả các mục đều có ID để React không báo lỗi key
    const ensureIds = (arr: any[], prefix: string) =>
      (arr || []).map((s: any, index: number) => ({ id: s.id || `${prefix}-${index}`, ...s }));

    return {
      ...defaultAITwinConfig,
      ...aiConfig,
      knowledgeBase: {
        skills:      ensureIds(kb.skills,      'skill'),
        experiences: ensureIds(kb.experiences, 'exp'),
        projects:    ensureIds(kb.projects,    'proj'),
        services:    ensureIds(kb.services,    'svc'),
        faqs:        ensureIds(kb.faqs,        'faq'),
      },
      id: card.id,
      status: card.aiStatus || 'AI Draft',
    };
  }
  return JSON.parse(JSON.stringify(defaultAITwinConfig));
}


export async function saveAITwinConfig(config: Partial<AITwinConfig>): Promise<AITwinConfig> {
  const card = await getCard();
  if (!card) throw new Error("Chưa có thẻ. Vui lòng tạo thẻ trước khi cấu hình AI.");
  
  const currentConfig = await getAITwinConfig();
  const newConfig = { ...currentConfig, ...config };
  
  const res = await apiClient<any>(`/cards/${card.id}/ai-config`, {
    method: 'PUT',
    body: JSON.stringify({
      aiConfig: newConfig,
      aiStatus: 'AI Draft',
    })
  });
  
  if (!res.success) throw new Error(res.message);
  return { ...newConfig, status: 'AI Draft' };
}

export async function trainAITwin(config: AITwinConfig): Promise<AITwinConfig> {
  const card = await getCard();
  if (!card) throw new Error("Chưa có thẻ.");
  
  const res = await apiClient<any>(`/cards/${card.id}/ai-config`, {
    method: 'PUT',
    body: JSON.stringify({
      aiConfig: config,
      aiStatus: 'AI Ready',
    })
  });
  
  if (!res.success) throw new Error(res.message);
  return { ...config, status: 'AI Ready' };
}

export async function publishAITwin(config: AITwinConfig): Promise<AITwinConfig> {
  return trainAITwin({ ...config, isPublicEnabled: true });
}

export async function togglePublicAI(enabled: boolean): Promise<AITwinConfig> {
  const currentConfig = await getAITwinConfig();
  return trainAITwin({ ...currentConfig, isPublicEnabled: enabled });
}

export async function sendTestMessage(config: AITwinConfig, message: string): Promise<TestChatMessage> {
  if (!config.id) throw new Error("Chưa có cardId.");
  
  const res = await apiClient<any>(`/chat/cards/${config.id}/chat`, {
    method: 'POST',
    body: JSON.stringify({ message }),
  });
  
  if (!res.success) throw new Error(res.message);
  
  return {
    id: Date.now().toString(),
    role: 'assistant',
    content: res.data.reply,
    timestamp: new Date().toISOString(),
  };
}

export async function regenerateTestResponse(config: AITwinConfig, messages: TestChatMessage[]): Promise<TestChatMessage> {
  const lastUserMsg = messages.slice().reverse().find(m => m.role === 'user');
  if (!lastUserMsg) throw new Error("Không tìm thấy câu hỏi trước đó");
  return sendTestMessage(config, lastUserMsg.content);
}

export async function resetTestConversation(): Promise<void> {
  // Can clear conversation history locally
}

export async function addKnowledgeItem(type: KnowledgeItemType, item: any): Promise<AITwinConfig> {
  const config = await getAITwinConfig();
  const kb = config.knowledgeBase;
  // Đảm bảo các mảng tồn tại trước khi push
  if (!kb.skills) kb.skills = [];
  if (!kb.experiences) kb.experiences = [];
  if (!kb.projects) kb.projects = [];
  if (!kb.services) kb.services = [];
  if (!kb.faqs) kb.faqs = [];

  const newItem = { ...item, id: Date.now().toString() };
  if (type === 'skill') kb.skills.push(newItem);
  if (type === 'experience') kb.experiences.push(newItem);
  if (type === 'project') kb.projects.push(newItem);
  if (type === 'service') kb.services.push(newItem);
  if (type === 'faq') kb.faqs.push(newItem);
  return saveAITwinConfig(config);
}

export async function updateKnowledgeItem(type: KnowledgeItemType, itemId: string, item: any): Promise<AITwinConfig> {
  const config = await getAITwinConfig();
  const kb = config.knowledgeBase;
  if (!kb.skills) kb.skills = [];
  if (!kb.experiences) kb.experiences = [];
  if (!kb.projects) kb.projects = [];
  if (!kb.services) kb.services = [];
  if (!kb.faqs) kb.faqs = [];

  const updateArr = (arr: any[]) => arr.map(x => x.id === itemId ? { ...x, ...item } : x);
  if (type === 'skill') kb.skills = updateArr(kb.skills);
  if (type === 'experience') kb.experiences = updateArr(kb.experiences);
  if (type === 'project') kb.projects = updateArr(kb.projects);
  if (type === 'service') kb.services = updateArr(kb.services);
  if (type === 'faq') kb.faqs = updateArr(kb.faqs);
  return saveAITwinConfig(config);
}

export async function deleteKnowledgeItem(type: KnowledgeItemType, itemId: string): Promise<AITwinConfig> {
  const config = await getAITwinConfig();
  const kb = config.knowledgeBase;
  if (!kb.skills) kb.skills = [];
  if (!kb.experiences) kb.experiences = [];
  if (!kb.projects) kb.projects = [];
  if (!kb.services) kb.services = [];
  if (!kb.faqs) kb.faqs = [];

  const filterArr = (arr: any[]) => arr.filter(x => x.id !== itemId);
  if (type === 'skill') kb.skills = filterArr(kb.skills);
  if (type === 'experience') kb.experiences = filterArr(kb.experiences);
  if (type === 'project') kb.projects = filterArr(kb.projects);
  if (type === 'service') kb.services = filterArr(kb.services);
  if (type === 'faq') kb.faqs = filterArr(kb.faqs);
  return saveAITwinConfig(config);
}

export async function toggleGlobalAIPause(cardId: string, isAiPaused: boolean): Promise<boolean> {
  const res = await apiClient<any>(`/cards/${cardId}/takeover`, {
    method: 'PUT',
    body: JSON.stringify({ isAiPaused }),
  });
  return res.success;
}
