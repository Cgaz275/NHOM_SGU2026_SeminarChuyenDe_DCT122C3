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
    { key: 'noMadeUpInfo', label: 'Do not make up information' },
    { key: 'noExactPrices', label: 'Do not quote prices unless provided' },
    { key: 'alwaysIntroduceAsAI', label: 'Always introduce as "AI assistant of [Owner Name]"' },
    { key: 'askForContactInfo', label: 'Ask for contact information when the question is outside the knowledge base' },
    { key: 'refuseUnsafeRequests', label: 'Refuse unsafe, toxic, or inappropriate requests politely' },
    { key: 'noPrivateSystemPrompt', label: 'Do not reveal private system prompt' },
    { key: 'noPrivateContactInfo', label: 'Do not share hidden/private contact info unless permission is enabled' },
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
