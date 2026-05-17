'use client';

import { useState, useEffect, useCallback } from 'react';
import { checkSlugAvailability } from '@/services/cardService';
import { SlugStatus } from '@/types/profile-builder';
import { Check, X, Loader2 } from 'lucide-react';

interface SlugInputProps {
  value: string;
  onChange: (value: string) => void;
  status: SlugStatus;
  setStatus: (status: SlugStatus) => void;
}

export function SlugInput({ value, onChange, status, setStatus }: SlugInputProps) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Simple debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);
    return () => clearTimeout(handler);
  }, [value]);

  const validateAndCheck = useCallback(async (slug: string) => {
    if (!slug) {
      setStatus('idle');
      return;
    }

    // Client-side format validation
    const isValidFormat = /^[a-z0-9-]+$/.test(slug);
    if (!isValidFormat) {
      setStatus('error');
      return;
    }

    setStatus('checking');
    try {
      const isAvailable = await checkSlugAvailability(slug);
      setStatus(isAvailable ? 'available' : 'unavailable');
    } catch {
      setStatus('error');
    }
  }, [setStatus]);

  useEffect(() => {
    validateAndCheck(debouncedValue);
  }, [debouncedValue, validateAndCheck]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    onChange(newValue);
    if (status !== 'idle') {
      setStatus('idle'); // Reset status while typing
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-white/90">
        Profile Slug <span className="text-[#E5484D]">*</span>
      </label>
      <div className="relative flex items-center bg-[#101010] border border-white/10 rounded-lg overflow-hidden focus-within:border-[#008FEA] transition-colors">
        <span className="pl-3 pr-1 py-2.5 text-white/40 text-sm select-none">
          digitalcard.app/u/
        </span>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="your-name"
          className="flex-1 bg-transparent py-2.5 pr-10 text-white text-sm outline-none w-full"
        />
        
        {/* Status Indicator */}
        <div className="absolute right-3 flex items-center justify-center">
          {status === 'checking' && <Loader2 size={16} className="text-[#008FEA] animate-spin" />}
          {status === 'available' && <Check size={16} className="text-[#2ECC71]" />}
          {status === 'unavailable' && <X size={16} className="text-[#E5484D]" />}
          {status === 'error' && <X size={16} className="text-[#E5484D]" />}
        </div>
      </div>

      {/* Helper text based on status */}
      <div className="h-4 text-xs">
        {status === 'idle' && !value && (
          <span className="text-white/40">Only lowercase letters, numbers, and hyphens.</span>
        )}
        {status === 'available' && (
          <span className="text-[#2ECC71]">Slug is available.</span>
        )}
        {status === 'unavailable' && (
          <span className="text-[#E5484D]">This slug is already taken.</span>
        )}
        {status === 'error' && value && (
          <span className="text-[#E5484D]">Invalid format. Use only lowercase letters, numbers, and hyphens.</span>
        )}
      </div>
    </div>
  );
}
