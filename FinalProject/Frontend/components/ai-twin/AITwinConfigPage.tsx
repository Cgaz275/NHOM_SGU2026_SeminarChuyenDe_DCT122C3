'use client';

import { useState, useEffect } from 'react';
// import { AIStatusBar } from './AIStatusBar';
import { AITwinTabs } from './AITwinTabs';
import { getAITwinConfig, saveAITwinConfig, addKnowledgeItem, updateKnowledgeItem, deleteKnowledgeItem, trainAITwin, publishAITwin, togglePublicAI } from '@/lib/mock-ai-twin-api';
import { AITwinConfig, KnowledgeItemType } from '@/types/ai-twin';
import { Toast } from '@/components/ui/Toast';
import { PersonaSection } from './PersonaSection';
import { KnowledgeBaseSection } from './KnowledgeBaseSection';
// import { PromptRulesSection } from './PromptRulesSection';
// import { TestChatSection } from './TestChatSection';
// import { PublishAISection } from './PublishAISection';

export function AITwinConfigPage() {
  const [config, setConfig] = useState<AITwinConfig | null>(null);
  const [activeTab, setActiveTab] = useState('persona');
  const [isLoading, setIsLoading] = useState(true);
  
  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false,
  });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  useEffect(() => {
    async function loadConfig() {
      setIsLoading(true);
      try {
        const data = await getAITwinConfig();
        setConfig(data);
      } catch (error) {
        showToast('Failed to load AI configuration.', 'error');
      } finally {
        setIsLoading(false);
      }
    }
    loadConfig();
  }, []);

  const handleConfigChange = (updates: Partial<AITwinConfig>) => {
    setConfig((prev) => prev ? { ...prev, ...updates } : null);
  };

  const handleGuardrailsChange = (guardrails: any) => {
    setConfig((prev) => prev ? { ...prev, guardrails } : null);
  };

  const handleAddKnowledge = async (type: KnowledgeItemType, item: any) => {
    try {
      const updatedConfig = await addKnowledgeItem(type, item);
      setConfig(updatedConfig);
      showToast(`${type} added successfully.`);
    } catch (error) {
      showToast(`Failed to add ${type}.`, 'error');
    }
  };

  const handleUpdateKnowledge = async (type: KnowledgeItemType, id: string, item: any) => {
    try {
      const updatedConfig = await updateKnowledgeItem(type, id, item);
      setConfig(updatedConfig);
      showToast(`${type} updated successfully.`);
    } catch (error) {
      showToast(`Failed to update ${type}.`, 'error');
    }
  };

  const handleDeleteKnowledge = async (type: KnowledgeItemType, id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const updatedConfig = await deleteKnowledgeItem(type, id);
      setConfig(updatedConfig);
      showToast(`${type} deleted successfully.`);
    } catch (error) {
      showToast(`Failed to delete ${type}.`, 'error');
    }
  };

  const handleSave = async () => {
    if (!config) return;
    try {
      const updatedConfig = await saveAITwinConfig(config);
      setConfig(updatedConfig);
      showToast('Configuration saved successfully.');
    } catch (error) {
      showToast('Failed to save configuration.', 'error');
    }
  };

  const handleTrain = async () => {
    if (!config) return;
    try {
      const updatedConfig = await trainAITwin(config);
      setConfig(updatedConfig);
      showToast('AI training completed.');
    } catch (error) {
      showToast('Failed to train AI.', 'error');
    }
  };

  const handlePublish = async () => {
    if (!config) return;
    try {
      const updatedConfig = await publishAITwin(config);
      setConfig(updatedConfig);
      showToast('AI published successfully.');
    } catch (error) {
      showToast('Failed to publish AI.', 'error');
    }
  };

  const handleTogglePublic = async (enabled: boolean) => {
    if (!config) return;
    try {
      const updatedConfig = await togglePublicAI(enabled);
      setConfig(updatedConfig);
      if (enabled) {
        showToast('Public AI enabled.');
      } else {
        showToast('Public AI disabled. Visitors will see the fallback contact form.');
      }
    } catch (error) {
      showToast('Failed to toggle public access.', 'error');
    }
  };

  const calculateKnowledgeLength = (config: AITwinConfig | null) => {
    if (!config) return 0;
    return JSON.stringify(config.knowledgeBase).length;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#008FEA]"></div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="p-8 text-center text-white/50">
        Failed to load configuration.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">AI Digital Twin Configuration</h1>
        <p className="text-white/60">
          Configure how your AI assistant speaks, what it knows, and when it can go public.
        </p>
      </div>

      {/* <div className="mb-8">
        <AIStatusBar 
          status={config.status}
          lastTrainedAt={config.lastTrainedAt}
          systemPromptLength={config.systemPrompt.length}
          knowledgeBaseLength={calculateKnowledgeLength(config)}
          isPublicEnabled={config.isPublicEnabled}
        />
      </div> */}

      <AITwinTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === 'persona' && (
          <PersonaSection 
            config={config} 
            onChange={handleConfigChange} 
          />
        )}
        {activeTab === 'knowledge' && (
          <KnowledgeBaseSection
            knowledgeBase={config.knowledgeBase}
            onAdd={handleAddKnowledge}
            onUpdate={handleUpdateKnowledge}
            onDelete={handleDeleteKnowledge}
          />
        )}
      </div>

      <Toast 
        message={toast.message} 
        type={toast.type} 
        isVisible={toast.isVisible} 
      />
    </div>
  );
}
