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
      title = 'Profile is updating';
      description = 'This profile is currently being updated. Please check back later.';
      Icon = RefreshCw;
      break;
    case 'locked':
      title = 'Profile unavailable';
      description = 'This profile is currently locked or unavailable.';
      Icon = Lock;
      break;
    case 'not_found':
      title = 'Digital profile not found';
      description = "The profile you're looking for doesn't exist or has been removed.";
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
