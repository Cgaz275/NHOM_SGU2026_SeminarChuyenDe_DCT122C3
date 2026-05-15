import { SystemPromptConfig } from '@/types/ai-twin';
import { ToneSelector } from './ToneSelector';
// import { SystemPromptBox } from './SystemPromptBox';

interface PersonaSectionProps {
  config: SystemPromptConfig;
  onChange: (config: Partial<SystemPromptConfig>) => void;
}

export function PersonaSection({ config, onChange }: PersonaSectionProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">AI Identity</h2>
          <p className="text-sm text-white/50 mb-6">
            Configure how your AI introduces itself to visitors.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Public AI Display Name</label>
              <input
                type="text"
                value={config.aiDisplayName}
                onChange={(e) => onChange({ aiDisplayName: e.target.value })}
                className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#008FEA] transition-colors"
                placeholder="e.g. Anthony's AI Twin"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Default Greeting Message</label>
              <textarea
                value={config.greetingMessage}
                onChange={(e) => onChange({ greetingMessage: e.target.value })}
                rows={3}
                className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#008FEA] transition-colors resize-none"
                placeholder="e.g. Hi, I'm Anthony's AI Twin. How can I help you?"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">AI Personality</h2>
          <p className="text-sm text-white/50 mb-6">
            Define the core behavior and tone of your AI assistant.
          </p>

          <ToneSelector 
            value={config.tone} 
            onChange={(tone) => onChange({ tone })} 
          />
        </div>


      </div>
    </div>
  );
}
