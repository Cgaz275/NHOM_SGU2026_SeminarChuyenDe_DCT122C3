import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, AlertTriangle } from 'lucide-react';

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Quản lý người dùng',
      href: '/admin/users',
      icon: Users,
    },
    {
      name: 'Quản lý báo cáo',
      href: '/admin/reports',
      icon: AlertTriangle,
    },
  ];

  return (
    <aside className="w-full md:w-[220px] bg-[#101010] border-r border-white/10 flex flex-col h-auto md:h-screen sticky top-0">
      <div className="p-6 border-b border-white/10 hidden md:block">
        <Link href="/admin">
          <h1 className="text-2xl font-bold tracking-wider text-white">ADMIN</h1>
        </Link>
      </div>
      
      {/* Mobile Top Bar */}
      <div className="p-4 border-b border-white/10 md:hidden flex justify-between items-center">
        <Link href="/admin">
          <h1 className="text-xl font-bold tracking-wider text-white">ADMIN</h1>
        </Link>
      </div>

      <nav className="flex md:flex-col gap-2 p-4 overflow-x-auto md:overflow-x-visible">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-brand-blue/20 text-[#008FEA] border border-[#008FEA]/30'
                  : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
