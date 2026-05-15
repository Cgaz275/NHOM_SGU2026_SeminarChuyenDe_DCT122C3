import React from 'react';
import { AuthHero } from './AuthHero';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col md:flex-row">
      {/* Left Column - Hero */}
      <div className="hidden md:flex md:w-1/2 p-12 lg:p-20 flex-col justify-center relative border-r border-white/5 bg-[#050505]">
        <AuthHero />
      </div>
      
      {/* Right Column - Auth Card */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 md:p-20 relative overflow-hidden">
        {/* Subtle background glow for right column */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-full max-h-lg bg-[#2367A2]/10 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Mobile Hero (only shows on small screens) */}
        <div className="md:hidden w-full max-w-md mb-8 text-center relative z-10">
          <h1 className="text-2xl font-bold uppercase tracking-tight text-white mb-2">
            Chào mừng bạn trở lại với Digital Twin
          </h1>
          <p className="text-[#B7B7B7] text-sm">
            Quản lý thẻ cá nhân số và AI Persona của bạn trong một không gian duy nhất.
          </p>
        </div>
        
        {/* Children (Forms) */}
        <div className="w-full max-w-md relative z-10">
          {/* Blue outer glow */}
          <div className="absolute -inset-1 bg-[#008FEA] rounded-[36px] blur-xl opacity-20 pointer-events-none"></div>
          {children}
        </div>
      </div>
    </div>
  );
}
