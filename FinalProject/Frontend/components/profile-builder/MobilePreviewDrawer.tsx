'use client';

import { ProfileBuilderData } from '@/types/profile-builder';
import { LiveProfilePreview } from './LiveProfilePreview';
import { X, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobilePreviewDrawerProps {
  data: ProfileBuilderData;
}

export function MobilePreviewDrawer({ data }: MobilePreviewDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 z-40 lg:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-[#008FEA] hover:bg-[#008FEA]/90 text-white px-5 py-3 rounded-full shadow-lg font-medium shadow-[#008FEA]/20 transition-transform active:scale-95"
        >
          <Eye size={20} />
          Preview
        </button>
      </div>

      {/* Drawer Overlay & Content */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />
            
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 z-50 h-[90vh] bg-[#0B0B0B] border-t border-white/10 rounded-t-3xl overflow-hidden flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#101010]">
                <h3 className="text-lg font-bold text-white">Live Preview</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 -mr-2 text-white/50 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar bg-[#050505] flex justify-center py-8 px-4">
                <div className="transform scale-[0.85] origin-top">
                  <LiveProfilePreview data={data} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
