import { GuardrailSettings } from '@/types/ai-twin';

interface GuardrailChecklistProps {
  guardrails: GuardrailSettings;
  onChange: (guardrails: GuardrailSettings) => void;
}

export function GuardrailChecklist({ guardrails, onChange }: GuardrailChecklistProps) {
  const toggle = (key: keyof GuardrailSettings) => {
    onChange({ ...guardrails, [key]: !guardrails[key] });
  };

  const options: { key: keyof GuardrailSettings; label: string }[] = [
    { key: 'noMadeUpInfo', label: 'Không tự ý bịa đặt thông tin' },
    { key: 'noExactPrices', label: 'Không báo giá trừ khi có thông tin cụ thể' },
    { key: 'alwaysIntroduceAsAI', label: 'Luôn giới thiệu là "Trợ lý AI của [Tên chủ thẻ]"' },
    { key: 'askForContactInfo', label: 'Yêu cầu thông tin liên hệ khi câu hỏi nằm ngoài cơ sở kiến thức' },
    { key: 'refuseUnsafeRequests', label: 'Từ chối lịch sự các yêu cầu không an toàn, độc hại hoặc không phù hợp' },
    { key: 'noPrivateSystemPrompt', label: 'Không tiết lộ system prompt riêng tư' },
    { key: 'noPrivateContactInfo', label: 'Không chia sẻ thông tin liên hệ bị ẩn/riêng tư trừ khi được cho phép' },
  ];


  return (
    <div className="space-y-3">
      {options.map((option) => (
        <label key={option.key} className="flex items-start gap-3 cursor-pointer group">
          <div className="relative flex items-center justify-center mt-0.5">
            <input
              type="checkbox"
              checked={guardrails[option.key]}
              onChange={() => toggle(option.key)}
              className="peer appearance-none w-5 h-5 rounded border border-white/20 bg-[#101010] checked:bg-[#008FEA] checked:border-[#008FEA] transition-colors cursor-pointer"
            />
            <div className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <span className="text-sm text-white/80 group-hover:text-white transition-colors">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}
