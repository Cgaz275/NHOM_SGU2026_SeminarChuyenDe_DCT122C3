import { LeadInfo } from '@/types/inbox';
import { LeadPanel } from './LeadPanel';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LeadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lead?: LeadInfo;
  onCopyField: (value: string) => void;
}

export function LeadDrawer({
  isOpen,
  onClose,
  lead,
  onCopyField,
}: LeadDrawerProps) {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = 'hidden';
    } else {
      setTimeout(() => setIsRendered(false), 300);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isRendered) return null;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col justify-end xl:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div 
        className={`relative bg-[#101010] border-t border-white/10 rounded-t-2xl h-[85vh] transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="absolute top-4 right-4 z-20">
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-hidden [&>div]:w-full [&>div]:border-l-0">
          <LeadPanel 
            lead={lead} 
            onCopyField={onCopyField}
          />
        </div>
      </div>
    </div>
  );
}
