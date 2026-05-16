import { useState } from 'react';
import { LeadInfo } from '@/types/inbox';
import { Copy, Mail, Phone } from 'lucide-react';
import { Toast } from '@/components/ui/Toast';

interface LeadPanelProps {
  lead?: LeadInfo;
  onCopyField: (value: string) => void;
}

export function LeadPanel({ lead, onCopyField }: LeadPanelProps) {
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-[#101010] border-l border-white/10">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <span className="text-white/20 text-2xl">?</span>
        </div>
        <h3 className="text-white font-medium mb-2">Chưa có thông tin khách</h3>
        <p className="text-sm text-white/50">Hệ thống chưa thu thập được thông tin từ khách này.</p>
      </div>
    );
  }

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCopy = (value: string, label: string) => {
    if (!value) return;
    onCopyField(value);
    triggerToast(`Đã sao chép ${label}`);
  };

  return (
    <div className="flex flex-col h-full bg-[#101010] border-l border-white/10 overflow-y-auto w-[300px]">
      <div className="p-4 border-b border-white/10 sticky top-0 bg-[#101010]/80 backdrop-blur-md z-10">
        <h3 className="font-semibold text-white">Thông tin khách</h3>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile */}
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-[#2367A2]/20 text-[#008FEA] flex items-center justify-center text-2xl font-bold mx-auto mb-3">
            {lead.name.charAt(0).toUpperCase()}
          </div>
          <h4 className="text-lg font-medium text-white">{lead.name}</h4>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3 text-sm text-white/70">
              <Mail size={16} className="text-white/40" />
              <span className="truncate">{lead.email || 'Chưa cung cấp'}</span>
            </div>
            {lead.email && (
              <button 
                onClick={() => handleCopy(lead.email, 'email')}
                className="opacity-0 group-hover:opacity-100 p-1 text-white/50 hover:text-white transition-all"
              >
                <Copy size={14} />
              </button>
            )}
          </div>
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3 text-sm text-white/70">
              <Phone size={16} className="text-white/40" />
              <span>{lead.phone || 'Chưa cung cấp'}</span>
            </div>
            {lead.phone && (
              <button 
                onClick={() => handleCopy(lead.phone, 'số điện thoại')}
                className="opacity-0 group-hover:opacity-100 p-1 text-white/50 hover:text-white transition-all"
              >
                <Copy size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
      <Toast message={toastMessage} isVisible={showToast} type="success" />
    </div>
  );
}
