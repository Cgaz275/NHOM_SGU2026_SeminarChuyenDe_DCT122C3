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
          <h2 className="text-xl font-semibold text-white mb-1">Danh tính AI</h2>
          <p className="text-sm text-white/50 mb-6">
            Cấu hình cách AI của bạn tự giới thiệu với khách truy cập.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Tên hiển thị công khai của AI</label>
              <input
                type="text"
                value={config.aiDisplayName}
                onChange={(e) => onChange({ aiDisplayName: e.target.value })}
                className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#008FEA] transition-colors"
                placeholder="VD: Anthony's AI Twin"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Tin nhắn chào mừng mặc định</label>
              <textarea
                value={config.greetingMessage}
                onChange={(e) => onChange({ greetingMessage: e.target.value })}
                rows={3}
                className="w-full bg-[#101010] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#008FEA] transition-colors resize-none"
                placeholder="VD: Xin chào, tôi là AI Twin của Anthony. Tôi có thể giúp gì cho bạn?"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">Tính cách AI</h2>
          <p className="text-sm text-white/50 mb-6">
            Xác định hành vi cốt lõi và giọng điệu của trợ lý AI của bạn.
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
