import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  type?: 'success' | 'error';
}

export function Toast({ message, isVisible, type = 'success' }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          className="fixed bottom-6 left-1/2 z-50 flex items-center gap-2 rounded-full bg-[#1A1A1A] border border-white/10 px-4 py-3 text-sm font-medium text-white shadow-lg"
        >
          {type === 'success' ? (
            <CheckCircle2 className="h-5 w-5 text-success" />
          ) : (
            <AlertCircle className="h-5 w-5 text-danger" />
          )}
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
