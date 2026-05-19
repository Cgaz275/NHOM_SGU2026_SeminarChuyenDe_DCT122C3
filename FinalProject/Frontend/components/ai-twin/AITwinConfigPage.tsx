'use client';

import { useState, useEffect } from 'react';
// import { AIStatusBar } from './AIStatusBar';
import { AITwinTabs } from './AITwinTabs';
import { 
  getAITwinConfig, 
  saveAITwinConfig, 
  addKnowledgeItem, 
  updateKnowledgeItem, 
  deleteKnowledgeItem, 
  trainAITwin, 
  publishAITwin, 
  togglePublicAI 
} from '@/services/aiTwinService';
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
        showToast('Tải cấu hình AI thất bại.', 'error');
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
      showToast(`Đã thêm ${type} thành công.`);
    } catch (error: any) {
      console.error('[AITwin] Lỗi thêm:', error);
      showToast(`Thêm ${type} thất bại: ${error?.message || 'Lỗi không xác định'}`, 'error');
    }
  };

  const handleUpdateKnowledge = async (type: KnowledgeItemType, id: string, item: any) => {
    try {
      const updatedConfig = await updateKnowledgeItem(type, id, item);
      setConfig(updatedConfig);
      showToast(`Đã cập nhật ${type} thành công.`);
    } catch (error) {
      showToast(`Cập nhật ${type} thất bại.`, 'error');
    }
  };

  const handleDeleteKnowledge = async (type: KnowledgeItemType, id: string) => {
    if (!window.confirm('Bạn có chắc muốn xóa mục này không?')) return;
    try {
      const updatedConfig = await deleteKnowledgeItem(type, id);
      setConfig(updatedConfig);
      showToast(`Đã xóa ${type} thành công.`);
    } catch (error) {
      showToast(`Xóa ${type} thất bại.`, 'error');
    }
  };

  const handleSave = async () => {
    if (!config) return;
    try {
      const updatedConfig = await saveAITwinConfig(config);
      setConfig(updatedConfig);
      showToast('Đã lưu cấu hình thành công.');
    } catch (error) {
      showToast('Lưu cấu hình thất bại.', 'error');
    }
  };

  const handleTrain = async () => {
    if (!config) return;
    try {
      const updatedConfig = await trainAITwin(config);
      setConfig(updatedConfig);
      showToast('Đã hoàn thành huấn luyện AI.');
    } catch (error) {
      showToast('Huấn luyện AI thất bại.', 'error');
    }
  };

  const handlePublish = async () => {
    if (!config) return;
    try {
      const updatedConfig = await publishAITwin(config);
      setConfig(updatedConfig);
      showToast('Đã xuất bản AI thành công.');
    } catch (error) {
      showToast('Xuất bản AI thất bại.', 'error');
    }
  };

  const handleTogglePublic = async (enabled: boolean) => {
    if (!config) return;
    try {
      const updatedConfig = await togglePublicAI(enabled);
      setConfig(updatedConfig);
      if (enabled) {
        showToast('Đã bật AI công khai.');
      } else {
        showToast('Đã tắt AI công khai. Khách truy cập sẽ thấy form liên hệ dự phòng.');
      }
    } catch (error) {
      showToast('Chuyển đổi quyền truy cập công khai thất bại.', 'error');
    }
  };

  const calculateKnowledgeLength = (config: AITwinConfig | null) => {
    if (!config || !config.knowledgeBase) return 0;
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
        Tải cấu hình thất bại.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Cấu hình AI Digital Twin</h1>
          <p className="text-white/60">
            Cấu hình cách trợ lý AI của bạn nói chuyện, những gì nó biết và khi nào nó có thể công khai.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-[#008FEA] hover:bg-[#0077c2] text-white font-medium rounded-lg transition-colors text-sm"
          >
            Lưu thay đổi
          </button>
          <button
            onClick={handleTrain}
            className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors text-sm"
          >
            Huấn luyện AI
          </button>
        </div>
      </div>


      {/* <div className="mb-8">
        <AIStatusBar 
          status={config.status}
          lastTrainedAt={config.lastTrainedAt}
          systemPromptLength={config.systemPrompt?.length || 0}
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
            knowledgeBase={config.knowledgeBase || {}}
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
