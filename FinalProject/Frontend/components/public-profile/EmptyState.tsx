import { AlertCircle, Lock, RefreshCw, HelpCircle } from 'lucide-react';
import { PublicProfileState } from '../../types/public-profile';

interface EmptyStateProps {
  state: PublicProfileState;
}

export function EmptyState({ state }: EmptyStateProps) {
  let title = '';
  let description = '';
  let Icon = AlertCircle;

  switch (state) {
    case 'updating':
      title = 'Hồ sơ đang được cập nhật';
      description = 'Hồ sơ này hiện đang được cập nhật. Vui lòng quay lại sau.';
      Icon = RefreshCw;
      break;
    case 'locked':
      title = 'Hồ sơ không khả dụng';
      description = 'Hồ sơ này hiện đã bị khóa hoặc không khả dụng.';
      Icon = Lock;
      break;
    case 'not_found':
      title = 'Không tìm thấy hồ sơ số';
      description = "Hồ sơ bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.";
      Icon = HelpCircle;
      break;
    default:
      return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
        <Icon className="w-10 h-10 text-brand-blue" />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">{title}</h1>
      <p className="text-text-muted max-w-md">{description}</p>
    </div>
  );
}
