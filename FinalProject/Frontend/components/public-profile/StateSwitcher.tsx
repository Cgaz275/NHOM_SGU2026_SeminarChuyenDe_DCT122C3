import { PublicProfileState } from '../../types/public-profile';

interface StateSwitcherProps {
  currentState: PublicProfileState;
  onStateChange: (state: PublicProfileState) => void;
}

const STATES: { label: string; value: PublicProfileState }[] = [
  { label: 'Đã xuất bản + AI Sẵn sàng', value: 'published' },
  { label: 'AI Đã tắt', value: 'ai_disabled' },
  { label: 'Lỗi AI', value: 'ai_error' },
  { label: 'Hồ sơ đang cập nhật', value: 'updating' },
  { label: 'Thẻ bị khóa', value: 'locked' },
  { label: '404 Không tìm thấy', value: 'not_found' },
  { label: 'Khung xương tải', value: 'loading' },
];

export function StateSwitcher({ currentState, onStateChange }: StateSwitcherProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-[#1A1A1A] border border-white/10 rounded-xl p-3 shadow-2xl flex flex-col gap-2 max-w-[200px]">
      <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Trạng thái Demo</h4>
      <select
        value={currentState}
        onChange={(e) => onStateChange(e.target.value as PublicProfileState)}
        className="w-full bg-card border border-white/10 text-white text-sm rounded-lg px-2 py-1.5 focus:outline-none focus:border-brand-blue"
      >
        {STATES.map((state) => (
          <option key={state.value} value={state.value}>
            {state.label}
          </option>
        ))}
      </select>
    </div>
  );
}
