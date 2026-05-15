'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, UserCircle, QrCode, MessageSquare, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { name: 'Quản lý thông tin', href: '/dashboard/profile-builder', icon: UserCircle },
  { name: 'Quản lý Persona', href: '/dashboard/ai-twin', icon: LayoutDashboard },
  { name: 'Quản lý QR', href: '/dashboard/qr-manager', icon: QrCode },
  { name: 'Quản lý tin nhắn', href: '/dashboard/inbox', icon: MessageSquare },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#101010] border-b border-white/10 sticky top-0 z-40">
        <div className="text-xl font-bold tracking-widest text-white">SEMINAR</div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white p-2"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[73px] left-0 w-full bg-[#101010] border-b border-white/10 z-30 px-4 py-2 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#2367A2]/20 text-[#008FEA] border border-[#2367A2]/30'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-[240px] h-screen bg-[#101010] border-r border-white/10 sticky top-0 py-6 px-4 shrink-0">
        <div className="mb-8 px-4">
          <div className="text-2xl font-bold tracking-widest text-white">SEMINAR</div>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#2367A2]/20 text-[#008FEA] border border-[#2367A2]/30'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto px-4">
          <div className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Seminar
          </div>
        </div>
      </aside>
    </>
  );
}
