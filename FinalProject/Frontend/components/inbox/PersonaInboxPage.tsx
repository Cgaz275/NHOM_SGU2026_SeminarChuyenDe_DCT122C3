'use client';

import { useState, useEffect, useMemo } from 'react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { ConversationList } from './ConversationList';
import { TranscriptViewer } from './TranscriptViewer';
import { LeadPanel } from './LeadPanel';
import { LeadDrawer } from './LeadDrawer';
import { ConfirmActionModal } from './ConfirmActionModal';
import { Toast } from '@/components/ui/Toast';
import { Conversation, ConversationFilter } from '@/types/inbox';
import * as api from '@/services/conversationService';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';



export function PersonaInboxPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Modals state
  const [takeoverModalOpen, setTakeoverModalOpen] = useState(false);
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  
  // Mobile step state: 'list' | 'detail'
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list');
  const [isMobileLeadOpen, setIsMobileLeadOpen] = useState(false);

  // Toast state
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [showToast, setShowToast] = useState(false);

  // Filters
  const [filter, setFilter] = useState<ConversationFilter>({
    search: '',
    type: 'all',
  });

  const loadConversations = async () => {
    try {
      setIsLoading(true);
      const data = await api.getConversations();
      setConversations(data);
    } catch (err) {
      setError('Không thể tải hộp thư. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (!selectedId) return;

    // Lắng nghe tin nhắn mới của cuộc trò chuyện đang chọn
    const messagesRef = collection(db, 'conversations', selectedId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
        };
      });

      // Cập nhật lại messages của cuộc trò chuyện trong state conversations
      setConversations((prevConversations) =>
        prevConversations.map((c) =>
          c.id === selectedId ? { ...c, messages: newMessages as any } : c
        )
      );
    });

    return () => unsubscribe();
  }, [selectedId]);

  const selectedConversation = useMemo(() => {
    return conversations.find((c) => c.id === selectedId) || null;
  }, [conversations, selectedId]);

  const filteredConversations = useMemo(() => {
    return conversations.filter((c) => {
      // Type filter
      if (filter.type === 'unread' && c.status !== 'unread') return false;
      if (filter.type === 'archived' && c.status !== 'archived') return false;
      if (filter.type === 'new_lead' && c.leadTag !== 'new_lead') return false;
      if (filter.type === 'ai_paused' && c.mode !== 'ai_paused') return false;
      if (filter.type !== 'archived' && c.status === 'archived' && filter.type !== 'all') return false; // Don't show archived in 'all' unless specified? Wait, standard is show all non-archived in 'all' usually, but user said 'Tất cả', 'Chưa đọc', 'Đã lưu trữ'. Let's hide archived from 'all'.
      if (filter.type === 'all' && c.status === 'archived') return false;

      // Search filter
      if (filter.search) {
        const query = filter.search.toLowerCase();
        const matchName = c.visitorName.toLowerCase().includes(query);
        const matchEmail = c.visitorEmail.toLowerCase().includes(query);
        const matchPhone = c.visitorPhone.includes(query);
        if (!matchName && !matchEmail && !matchPhone) return false;
      }

      return true;
    });
  }, [conversations, filter]);

  const triggerToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSelectConversation = (id: string) => {
    setSelectedId(id);
    setMobileView('detail');
  };

  const handleSendMessage = async (content: string) => {
    if (!selectedId) return;
    const res = await api.sendOwnerMessage(selectedId, content);
    if (res.success) {
      loadConversations();
    } else {
      triggerToast(res.message || 'Lỗi gửi tin nhắn', 'error');
    }
  };

  const handleConfirmTakeover = async () => {
    if (!selectedId || !selectedConversation) return;
    setIsActionLoading(true);
    const isCurrentlyTakeover = selectedConversation.mode === 'human_takeover';
    const res = await api.toggleHumanTakeover(selectedId, !isCurrentlyTakeover);
    setIsActionLoading(false);
    setTakeoverModalOpen(false);
    
    if (res.success) {
      loadConversations();
      triggerToast(isCurrentlyTakeover ? 'Đã trả lại hội thoại cho AI' : 'Đã tiếp quản hội thoại');
    } else {
      triggerToast(res.message || 'Lỗi xử lý', 'error');
    }
  };

  const handleMarkRead = async (read: boolean) => {
    if (!selectedId) return;
    const res = await api.markConversationRead(selectedId, read);
    if (res.success) {
      // Optimistic update
      setConversations(conversations.map(c => 
        c.id === selectedId ? { ...c, status: read ? 'read' : 'unread', unreadCount: read ? 0 : 1 } : c
      ));
    }
  };

  const handleConfirmArchive = async () => {
    if (!selectedId) return;
    setIsActionLoading(true);
    const res = await api.archiveConversation(selectedId);
    setIsActionLoading(false);
    setArchiveModalOpen(false);
    
    if (res.success) {
      setSelectedId(null);
      setMobileView('list');
      loadConversations();
      triggerToast('Đã lưu trữ hội thoại');
    }
  };

  const handleRestore = async () => {
    if (!selectedId) return;
    const res = await api.restoreConversation(selectedId);
    if (res.success) {
      loadConversations();
      triggerToast('Đã khôi phục hội thoại');
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    setIsActionLoading(true);
    const res = await api.deleteConversation(selectedId);
    setIsActionLoading(false);
    setDeleteModalOpen(false);
    
    if (res.success) {
      setSelectedId(null);
      setMobileView('list');
      loadConversations();
      triggerToast('Đã xóa hội thoại');
    }
  };

  const handleToggleEmailNotification = async (enabled: boolean) => {
    if (!selectedId) return;
    const res = await api.updateEmailNotification(selectedId, enabled);
    if (res.success) {
      loadConversations();
      triggerToast('Đã cập nhật thông báo email');
    }
  };



  const handleCopyField = async (value: string) => {
    await api.copyLeadField(value);
  };

  return (
    <div className="flex h-screen bg-[#101010] overflow-hidden font-sans">
      <DashboardSidebar />

      <main className="flex-1 flex overflow-hidden">
        {/* Left Column: Conversation List */}
        <div className={`h-full ${mobileView === 'list' ? 'flex flex-1' : 'hidden md:flex'}`}>
          <ConversationList
            conversations={filteredConversations}
            selectedId={selectedId}
            onSelect={handleSelectConversation}
            filter={filter}
            onFilterChange={setFilter}
            isLoading={isLoading}
          />
        </div>

        {/* Middle/Right Columns: Detail View */}
        <div className={`flex-1 flex h-full ${mobileView === 'detail' ? 'flex' : 'hidden md:flex'}`}>
          {/* Middle: Transcript Viewer */}
          <TranscriptViewer
            conversation={selectedConversation}
            onSendMessage={handleSendMessage}
            onToggleTakeover={() => setTakeoverModalOpen(true)}
            onMarkRead={handleMarkRead}
            onArchive={() => setArchiveModalOpen(true)}
            onRestore={handleRestore}
            onDelete={() => setDeleteModalOpen(true)}
            onToggleEmailNotification={handleToggleEmailNotification}
            onBackToMobileList={() => setMobileView('list')}
            onShowMobileLead={() => setIsMobileLeadOpen(true)}
            isLoading={isActionLoading}
          />

          {/* Right: Lead Panel (Desktop) */}
          {selectedConversation && (
            <div className="hidden xl:block h-full shrink-0">
              <LeadPanel
                lead={selectedConversation.lead}
                onCopyField={handleCopyField}
              />
            </div>
          )}
        </div>
      </main>

      {/* Mobile Lead Drawer */}
      <LeadDrawer
        isOpen={isMobileLeadOpen}
        onClose={() => setIsMobileLeadOpen(false)}
        lead={selectedConversation?.lead}
        onCopyField={handleCopyField}
      />

      {/* Modals */}
      <ConfirmActionModal
        isOpen={takeoverModalOpen}
        onClose={() => setTakeoverModalOpen(false)}
        onConfirm={handleConfirmTakeover}
        isLoading={isActionLoading}
        title={selectedConversation?.mode === 'human_takeover' ? 'Trả lại hội thoại cho AI?' : 'Tiếp quản hội thoại?'}
        message={
          selectedConversation?.mode === 'human_takeover'
            ? 'AI Twin sẽ tiếp tục phản hồi tự động dựa trên cấu hình hiện tại.'
            : 'Khi tiếp quản, AI sẽ tạm dừng trả lời trong hội thoại này và tin nhắn của bạn sẽ được gửi trực tiếp cho khách.'
        }
        confirmText={selectedConversation?.mode === 'human_takeover' ? 'Trả lại cho AI' : 'Tiếp quản'}
      />

      <ConfirmActionModal
        isOpen={archiveModalOpen}
        onClose={() => setArchiveModalOpen(false)}
        onConfirm={handleConfirmArchive}
        isLoading={isActionLoading}
        title="Lưu trữ hội thoại?"
        message="Hội thoại sẽ được chuyển khỏi danh sách đang hoạt động nhưng vẫn có thể xem lại trong bộ lọc Đã lưu trữ."
        confirmText="Lưu trữ"
      />

      <ConfirmActionModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isActionLoading}
        isDanger={true}
        title="Xóa hội thoại?"
        message="Hành động này chỉ là mô phỏng trong bản demo. Khi kết nối backend thật, hội thoại sẽ bị xóa theo quyền của chủ thẻ."
        confirmText="Xóa"
      />

      {/* Error state overlay */}
      {error && !isLoading && conversations.length === 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-white/10 text-center">
            <h3 className="text-white font-medium mb-2">Lỗi</h3>
            <p className="text-white/60 text-sm mb-4">{error}</p>
            <button
              onClick={loadConversations}
              className="px-4 py-2 bg-[#2367A2] text-white rounded-lg hover:bg-[#2367A2]/90 transition-colors"
            >
              Thử lại
            </button>
          </div>
        </div>
      )}

      <Toast message={toastMessage} isVisible={showToast} type={toastType} />
    </div>
  );
}
