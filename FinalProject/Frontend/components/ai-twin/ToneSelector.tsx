import { ToneOption } from '@/types/ai-twin';
import { Check } from 'lucide-react';

interface ToneSelectorProps {
  value: ToneOption;
  onChange: (tone: ToneOption) => void;
}

export function ToneSelector({ value, onChange }: ToneSelectorProps) {
  const tones: { id: ToneOption; title: string;}[] = [
    { id: 'chuyenghiep', title: 'Chuyên nghiệp'},
    { id: 'thanthien', title: 'Thân thiện'},
    { id: 'ngangon', title: 'Ngắn gọn'},
    { id: 'chitiet', title: 'Chi tiết'},
    { id: 'kythuat', title: 'Kỹ thuật'},
    { id: 'tutin', title: 'Tự tin'},
    { id: 'khiemton', title: 'Khiêm tốn'},
  ];

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-white">AI Tone</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tones.map((tone) => (
          <div
            key={tone.id}
            onClick={() => onChange(tone.id)}
            className={`cursor-pointer p-4 rounded-xl border transition-all ${
              value === tone.id
                ? 'border-[#008FEA] bg-[#008FEA]/10'
                : 'border-white/10 bg-[#1A1A1A] hover:border-white/30'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`font-semibold ${value === tone.id ? 'text-[#008FEA]' : 'text-white'}`}>
                {tone.title}
              </span>
              {value === tone.id && <Check size={16} className="text-[#008FEA]" />}
            </div>
           
          </div>
        ))}
      </div>
    </div>
  );
}
