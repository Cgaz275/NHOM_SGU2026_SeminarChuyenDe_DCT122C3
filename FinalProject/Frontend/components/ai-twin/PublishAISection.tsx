import { useState } from 'react';
import { AITwinConfig } from '@/types/ai-twin';
import { ConfirmToggleAIModal } from './ConfirmToggleAIModal';
import { CheckCircle, AlertCircle, Loader2, Save, UploadCloud, Power, PowerOff } from 'lucide-react';

interface PublishAISectionProps {
  config: AITwinConfig;
  onSave: () => Promise<void>;
  onTrain: () => Promise<void>;
  onPublish: () => Promise<void>;
  onTogglePublic: (enabled: boolean) => Promise<void>;
}

export function PublishAISection({ config, onSave, onTrain, onPublish, onTogglePublic }: PublishAISectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const hasKnowledge = 
    config.knowledgeBase.skills.length > 0 ||
    config.knowledgeBase.experiences.length > 0 ||
    config.knowledgeBase.projects.length > 0 ||
    config.knowledgeBase.services.length > 0 ||
    config.knowledgeBase.faqs.length > 0;

  const isPromptValid = config.systemPrompt.length > 0 && config.systemPrompt.length <= 2000;
  const isKnowledgeValid = JSON.stringify(config.knowledgeBase).length <= 15000;
  
  // Guardrails check: at least one enabled
  const hasGuardrails = Object.values(config.guardrails).some(Boolean);

  const canPublish = hasKnowledge && isPromptValid && isKnowledgeValid && hasGuardrails;

  const handleSave = async () => {
    setIsSaving(true);
    await onSave();
    setIsSaving(false);
  };

  const handleTrain = async () => {
    setIsTraining(true);
    await onTrain();
    setIsTraining(false);
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    await onPublish();
    setIsPublishing(false);
  };

  const handleToggleConfirm = async () => {
    setIsToggling(true);
    await onTogglePublic(!config.isPublicEnabled);
    setIsToggling(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Pre-flight checklist */}
      <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Pre-flight Checklist</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            {isPromptValid ? <CheckCircle size={18} className="text-green-400" /> : <AlertCircle size={18} className="text-red-400" />}
            <span className={isPromptValid ? 'text-white' : 'text-red-400'}>System prompt is valid (under 2,000 characters)</span>
          </div>
          <div className="flex items-center gap-3">
            {isKnowledgeValid ? <CheckCircle size={18} className="text-green-400" /> : <AlertCircle size={18} className="text-red-400" />}
            <span className={isKnowledgeValid ? 'text-white' : 'text-red-400'}>Knowledge base is under 15,000 characters</span>
          </div>
          <div className="flex items-center gap-3">
            {hasKnowledge ? <CheckCircle size={18} className="text-green-400" /> : <AlertCircle size={18} className="text-red-400" />}
            <span className={hasKnowledge ? 'text-white' : 'text-red-400'}>At least one item in the knowledge base</span>
          </div>
          <div className="flex items-center gap-3">
            {hasGuardrails ? <CheckCircle size={18} className="text-green-400" /> : <AlertCircle size={18} className="text-red-400" />}
            <span className={hasGuardrails ? 'text-white' : 'text-red-400'}>Safety guardrails enabled</span>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Save & Train */}
        <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Save & Train</h3>
            <p className="text-sm text-white/50 mb-6">
              Save your current configuration as a draft or generate the AI model data without making it public.
            </p>
          </div>
          <div className="flex gap-3 mt-auto">
            <button
              onClick={handleSave}
              disabled={isSaving || isTraining || isPublishing}
              className="flex-1 flex items-center justify-center gap-2 bg-[#101010] border border-white/10 text-white px-4 py-2.5 rounded-lg hover:bg-white/5 transition-colors disabled:opacity-50"
            >
              {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              Save Draft
            </button>
            <button
              onClick={handleTrain}
              disabled={!canPublish || isSaving || isTraining || isPublishing}
              className="flex-1 flex items-center justify-center gap-2 bg-[#101010] border border-[#008FEA]/30 text-[#008FEA] px-4 py-2.5 rounded-lg hover:bg-[#008FEA]/10 transition-colors disabled:opacity-50"
            >
              {isTraining ? <Loader2 size={18} className="animate-spin" /> : <Power size={18} />}
              Train AI
            </button>
          </div>
        </div>

        {/* Publish & Toggle */}
        <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Public Access</h3>
            <p className="text-sm text-white/50 mb-6">
              Publish your AI Twin for visitors to interact with on your public profile.
            </p>
          </div>
          <div className="flex gap-3 mt-auto">
            <button
              onClick={handlePublish}
              disabled={!canPublish || isSaving || isTraining || isPublishing || config.isPublicEnabled}
              className="flex-1 flex items-center justify-center gap-2 bg-[#008FEA] text-white px-4 py-2.5 rounded-lg hover:bg-[#007AC8] transition-colors disabled:opacity-50"
            >
              {isPublishing ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} />}
              Publish AI
            </button>

            {config.status !== 'AI Draft' && config.status !== 'AI Training' && config.status !== 'Prompt Too Long' && (
              <button
                onClick={() => setIsModalOpen(true)}
                disabled={isToggling}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-colors border ${
                  config.isPublicEnabled
                    ? 'border-red-500/30 text-red-400 hover:bg-red-500/10'
                    : 'border-green-500/30 text-green-400 hover:bg-green-500/10'
                }`}
              >
                {isToggling ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : config.isPublicEnabled ? (
                  <PowerOff size={18} />
                ) : (
                  <Power size={18} />
                )}
                {config.isPublicEnabled ? 'Disable Public' : 'Enable Public'}
              </button>
            )}
          </div>
        </div>
      </div>

      <ConfirmToggleAIModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleToggleConfirm}
        isEnabling={!config.isPublicEnabled}
      />
    </div>
  );
}
