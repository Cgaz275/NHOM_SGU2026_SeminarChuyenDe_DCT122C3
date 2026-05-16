'use client';

import { ReactNode, useEffect, useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { checkAdminPermission } from '@/lib/mock-admin-api';
import { AdminLoadingState } from './AdminLoadingState';
import { PermissionDeniedState } from './PermissionDeniedState';

export function AdminLayout({ children }: { children: ReactNode }) {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function checkPerms() {
      setIsLoading(true);
      try {
        const result = await checkAdminPermission();
        setHasPermission(result);
      } catch (error) {
        setHasPermission(false);
      } finally {
        setIsLoading(false);
      }
    }
    checkPerms();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center">
        <AdminLoadingState />
      </div>
    );
  }

  if (!hasPermission) {
    return <PermissionDeniedState />;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0B0B0B] text-white">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-[#101010] border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(35,103,162,0.1)] overflow-hidden min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-4rem)]">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
