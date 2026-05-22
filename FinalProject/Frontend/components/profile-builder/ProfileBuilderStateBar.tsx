'use client';

import { ProfileBuilderStatus } from '@/types/profile-builder';
import { AlertCircle, CheckCircle2, Clock, Loader2, Save } from 'lucide-react';

interface ProfileBuilderStateBarProps {
  status: ProfileBuilderStatus;
  lastSavedAt: string | null;
}

export function ProfileBuilderStateBar({ status, lastSavedAt }: ProfileBuilderStateBarProps) {
  const getStatusDisplay = () => {
    switch (status) {
      case 'draft-saved':
        return {
          icon: <Save size={16} className="text-white/60" />,
          text: 'Đã lưu nháp',
          color: 'text-white/60'
        };
      case 'unsaved-changes':
        return {
          icon: <AlertCircle size={16} className="text-[#F5A524]" />,
          text: 'Có thay đổi chưa lưu',
          color: 'text-[#F5A524]'
        };
      case 'saving':
        return {
          icon: <Loader2 size={16} className="text-[#008FEA] animate-spin" />,
          text: 'Đang lưu nháp...',
          color: 'text-[#008FEA]'
        };
      case 'publishing':
        return {
          icon: <Loader2 size={16} className="text-[#008FEA] animate-spin" />,
          text: 'Đang xuất bản...',
          color: 'text-[#008FEA]'
        };
      case 'published':
        return {
          icon: <CheckCircle2 size={16} className="text-[#2ECC71]" />,
          text: 'Đã xuất bản thành công',
          color: 'text-[#2ECC71]'
        };
      case 'error':
        return {
          icon: <AlertCircle size={16} className="text-[#E5484D]" />,
          text: 'Đã xảy ra lỗi',
          color: 'text-[#E5484D]'
        };
      case 'loading':
      default:
        return {
          icon: <Loader2 size={16} className="text-white/40 animate-spin" />,
          text: 'Đang tải...',
          color: 'text-white/40'
        };
    }
  };


  const display = getStatusDisplay();

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex items-center justify-between bg-[#101010] border border-white/10 rounded-xl px-4 py-3 mb-6">
      <div className={`flex items-center gap-2 text-sm font-medium ${display.color}`}>
        {display.icon}
        {display.text}
      </div>

      {lastSavedAt && status !== 'loading' && (
        <div className="flex items-center gap-1.5 text-xs text-white/40">
          <Clock size={14} />
          Đã lưu lúc {formatTime(lastSavedAt)}
        </div>
      )}
    </div>
  );
}
