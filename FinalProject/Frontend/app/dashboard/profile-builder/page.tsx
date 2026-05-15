'use client';

import { useState, useEffect, useCallback } from 'react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { ProfileBuilderForm } from '@/components/profile-builder/ProfileBuilderForm';
import { LiveProfilePreview } from '@/components/profile-builder/LiveProfilePreview';
import { MobilePreviewDrawer } from '@/components/profile-builder/MobilePreviewDrawer';
import { ProfileBuilderStateBar } from '@/components/profile-builder/ProfileBuilderStateBar';
import { Toast } from '@/components/ui/Toast';
import { 
  ProfileBuilderData, 
  ProfileBuilderStatus, 
  SlugStatus 
} from '@/types/profile-builder';
import { 
  getProfileDraft, 
  saveProfileDraft, 
  publishProfile, 
  resetProfileDraft 
} from '@/lib/mock-profile-builder-api';

export default function ProfileBuilderPage() {
  const [data, setData] = useState<ProfileBuilderData | null>(null);
  const [status, setStatus] = useState<ProfileBuilderStatus>('loading');
  const [slugStatus, setSlugStatus] = useState<SlugStatus>('idle');
  
  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const draft = await getProfileDraft();
        setData(draft);
        setStatus('draft-saved');
        if (draft.basicInfo.slug) {
          // Trigger slug validation indirectly by setting status if needed, 
          // but the SlugInput will handle it on mount.
        }
      } catch (error) {
        setStatus('error');
        showToast('Failed to load profile draft.', 'error');
      }
    };
    loadData();
  }, []);

  // Handle data changes
  const handleDataChange = useCallback((newData: ProfileBuilderData) => {
    setData(newData);
    setStatus('unsaved-changes');
  }, []);

  // Actions
  const handleSaveDraft = async () => {
    if (!data) return;
    setStatus('saving');
    try {
      const response = await saveProfileDraft(data);
      setData(prev => prev ? { ...prev, lastSavedAt: response.lastSavedAt } : null);
      setStatus('draft-saved');
      showToast('Draft saved successfully.');
    } catch (error) {
      setStatus('unsaved-changes');
      showToast('Failed to save draft.', 'error');
    }
  };

  const handlePublish = async () => {
    if (!data) return;
    
    // Validation
    if (!data.basicInfo.fullName || !data.basicInfo.role || !data.basicInfo.slug) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }
    
    if (slugStatus !== 'available') {
      showToast('Please choose a valid and available slug.', 'error');
      return;
    }

    setStatus('publishing');
    try {
      const response = await publishProfile(data);
      setStatus('published');
      showToast(response.message);
      
      // Update last saved time
      const latestData = await getProfileDraft();
      setData(latestData);
      
      // Revert to draft-saved after a delay
      setTimeout(() => setStatus('draft-saved'), 3000);
    } catch (error: any) {
      setStatus('unsaved-changes');
      showToast(error.message || 'Failed to publish card.', 'error');
    }
  };

  const handleReset = async () => {
    setStatus('loading');
    try {
      const resetData = await resetProfileDraft();
      setData(resetData);
      setStatus('draft-saved');
      setSlugStatus('idle');
      showToast('Changes reset successfully.');
    } catch (error) {
      setStatus('error');
      showToast('Failed to reset changes.', 'error');
    }
  };

  // Keyboard shortcut for save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        if (status === 'unsaved-changes') {
          handleSaveDraft();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, handleSaveDraft]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-[#050505] flex font-sans">
      <DashboardSidebar />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="px-6 py-8 md:px-10 border-b border-white/5 bg-[#0B0B0B]">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Profile Builder</h1>
          <p className="text-white/50 text-sm md:text-base">
            Edit your public digital card and preview changes in real time.
          </p>
        </header>

        {/* Content */}
        {data ? (
          <div className="flex-1 overflow-hidden flex">
            {/* Form Column */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-6 md:p-10 w-full lg:max-w-[800px]">
              <ProfileBuilderStateBar 
                status={status} 
                lastSavedAt={data.lastSavedAt} 
              />
              
              <ProfileBuilderForm
                data={data}
                onChange={handleDataChange}
                slugStatus={slugStatus}
                setSlugStatus={setSlugStatus}
                onSaveDraft={handleSaveDraft}
                onPublish={handlePublish}
                onReset={handleReset}
                isSaving={status === 'saving'}
                isPublishing={status === 'publishing'}
              />
            </div>

            {/* Desktop Live Preview Column */}
            <div className="hidden lg:flex flex-col flex-1 border-l border-white/5 bg-[#0B0B0B] relative">
              <div className="sticky top-0 p-10 h-screen overflow-y-auto no-scrollbar flex items-center justify-center">
                <div className="w-full flex justify-center transform scale-95 xl:scale-100 origin-center transition-transform">
                  <LiveProfilePreview data={data} />
                </div>
              </div>
            </div>

            {/* Mobile Preview Drawer */}
            <MobilePreviewDrawer data={data} />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#008FEA] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </main>

      {/* Global Toast */}
      <Toast 
        message={toast.message} 
        type={toast.type} 
        isVisible={toast.isVisible} 
      />
    </div>
  );
}
