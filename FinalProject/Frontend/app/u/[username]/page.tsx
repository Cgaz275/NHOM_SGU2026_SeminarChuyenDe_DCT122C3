'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  PublicProfile,
  PublicProfileState,
  ChatMessage,
  ReportData,
} from '../../../types/public-profile';
import {
  submitAIReport,
} from '../../../lib/mock-public-profile-api';
import { apiClient } from '../../../lib/apiClient';

import { ProfileHeroCard } from '../../../components/public-profile/ProfileHeroCard';
import { SocialLinks } from '../../../components/public-profile/SocialLinks';
import { AboutSection } from '../../../components/public-profile/AboutSection';
import { SkillsSection } from '../../../components/public-profile/SkillsSection';
import { FeaturedProjects } from '../../../components/public-profile/FeaturedProjects';
import { ExperienceSection } from '../../../components/public-profile/ExperienceSection';
import { SaveContactCard } from '../../../components/public-profile/SaveContactCard';
import { AITwinChatWidget } from '../../../components/public-profile/AITwinChatWidget';
import { LeadFallbackModal } from '../../../components/public-profile/LeadFallbackModal';
import { ReportAIModal } from '../../../components/public-profile/ReportAIModal';
import { StateSwitcher } from '../../../components/public-profile/StateSwitcher';
import { LoadingSkeleton } from '../../../components/public-profile/LoadingSkeleton';
import { EmptyState } from '../../../components/public-profile/EmptyState';
import { Toast } from '../../../components/ui/Toast';
import { GuestIntroModal } from '../../../components/public-profile/GuestIntroModal';
import { collection, query, orderBy, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export default function PublicProfilePage() {
  const params = useParams();
  const username = params?.username as string;

  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [pageState, setPageState] = useState<PublicProfileState>('loading');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [guestInfo, setGuestInfo] = useState<{ name: string; contact: string } | null>(null);
  const [isHumanTakeover, setIsHumanTakeover] = useState(false);
  const [pendingOpenLead, setPendingOpenLead] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
    visible: boolean;
  }>({
    message: '',
    type: 'success',
    visible: false,
  });

  const showToast = (
    message: string,
    type: 'success' | 'error' = 'success'
  ) => {
    setToast({ message, type, visible: true });

    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!username) return;

      try {
        setPageState('loading');

        const res = await apiClient<any>(`/cards/${username}`);
        if (!res.success || !res.data) {
          setPageState('not_found');
          return;
        }
        const card = res.data;
        
        const data: PublicProfile = {
          id: card.id,
          username: card.slug || username,
          name: card.fullName || 'No Name',
          role: card.jobTitle || 'No Title',
          slogan: card.slogan || '',
          bio: card.bio || '',
          skills: card.aiConfig?.knowledgeBase?.skills?.map((s: any) => s.name) || [],
          socialLinks: Object.entries(card.socialLinks || {})
            .filter(([_, url]) => url && (url as string).trim() !== '')
            .map(([platform, url]) => ({
              id: platform,
              platform,
              url: url as string,
              iconName: platform
            })),
          featuredProjects: card.aiConfig?.knowledgeBase?.projects?.map((p: any) => ({
            id: p.id,
            title: p.projectName,
            dateRange: '',
            description: p.description,
            tags: []
          })) || [],
          experience: card.aiConfig?.knowledgeBase?.experiences?.map((e: any) => ({
            id: e.id,
            company: e.companyName,
            dateRange: '',
            description: e.description
          })) || [],
          avatarUrl: card.avatarUrl,
          aiStatus: (card.aiStatus === 'AI Ready' && card.aiConfig?.isAiPaused !== true) ? 'ai_ready' : 'ai_disabled',
          aiDisplayName: card.aiConfig?.aiDisplayName,
          greetingMessage: card.aiConfig?.greetingMessage
        };

        setProfile(data);
        setPageState('published');

        // Khôi phục thông tin khách từ lần trước (nếu có)
        const savedGuest = localStorage.getItem(`guest_info_${card.id}`);
        let restoredGuest: { name: string; contact: string } | null = null;
        if (savedGuest) {
          try {
            restoredGuest = JSON.parse(savedGuest);
            setGuestInfo(restoredGuest);
          } catch {}
        }

        const greeting = card.aiConfig?.greetingMessage || `Hi, I'm ${data.name}'s AI Twin. You can ask me about his skills, projects, experience, or collaboration availability.`;
        const greetingMsg: ChatMessage = {
          id: 'init-1',
          role: 'assistant',
          content: greeting,
          timestamp: new Date(),
        };

        // Nếu có thông tin khách cũ → gọi API lấy lịch sử chat và khôi phục
        if (restoredGuest?.contact) {
          try {
            const histRes = await apiClient<{ conversationId: string; messages: any[]; mode?: string }>(
              `/chat/cards/${card.id}/history?guestContact=${encodeURIComponent(restoredGuest.contact)}`
            );
            if (histRes.success && histRes.data && histRes.data.messages?.length > 0) {
              const { conversationId: oldId, messages: oldMsgs, mode: oldMode } = histRes.data;
              setConversationId(oldId);
              setIsHumanTakeover(oldMode === 'human_takeover');
              const restoredMsgs: ChatMessage[] = oldMsgs.map((m: any) => ({
                id: m.id,
                role: m.sender === 'visitor' ? 'user' : 'assistant',
                content: m.sender === 'owner' ? `👤 ${m.content}` : m.content,
                timestamp: m.createdAt ? new Date(m.createdAt) : new Date(),
              }));
              setMessages([greetingMsg, ...restoredMsgs]);
              return; // Không cần set messages mặc định bên dưới
            }
          } catch {}
        }

        setMessages([greetingMsg]);
      } catch (err) {
        setPageState('not_found');
      }
    };

    fetchProfile();
  }, [username]);

  // Lắng nghe tin nhắn thời gian thực (bao gồm tin từ chủ thẻ khi tiếp quản)
  useEffect(() => {
    if (!conversationId || !db) return;

    const messagesRef = collection(db, 'conversations', conversationId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Chỉ xử lý khi có tin mới được thêm
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const data = change.doc.data();
          // Chỉ hiển thị tin của chủ thẻ (owner) — tin visitor/AI đã được thêm qua API
          if (data.sender === 'owner') {
            const ownerMsg: ChatMessage = {
              id: change.doc.id,
              role: 'assistant', // hiển giống AI nhưng có dấu hiệu riêng
              content: `👤 ${data.content}`, // prefix để phân biệt với AI
              timestamp: new Date(),
            };
            setMessages((prev) => {
              // Tránh duplicate
              if (prev.some((m) => m.id === change.doc.id)) return prev;
              return [...prev, ownerMsg];
            });
          }
        }
      });
    });

    return () => unsubscribe();
  }, [conversationId]);

  // Lắng nghe trạng thái tiếp quản (mode) thời gian thực từ cuộc hội thoại
  useEffect(() => {
    if (!conversationId || !db) return;

    const convDocRef = doc(db, 'conversations', conversationId);
    const unsubscribe = onSnapshot(convDocRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setIsHumanTakeover(data?.mode === 'human_takeover');
      }
    });

    return () => unsubscribe();
  }, [conversationId]);

  const handleSendMessage = async (msgContent: string) => {
    if (!profile) return;

    // Nếu chưa có thông tin khách → hiển thị modal trước
    if (!guestInfo) {
      setIsGuestModalOpen(true);
      return;
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: msgContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const res = await apiClient<{ reply: string; conversationId?: string }>(`/chat/cards/${profile.id}/chat`, {
        method: 'POST',
        body: JSON.stringify({
          message: msgContent,
          conversationId,
          guestName: guestInfo?.name,
          guestContact: guestInfo?.contact,
          forceHumanTakeover: isHumanTakeover || currentAiStatus !== 'ai_ready',
        }),
      });

      if (res.success && res.data) {
        if (res.data.conversationId) {
          setConversationId(res.data.conversationId);
        }
        // Nếu mode là human_takeover, reply là null → không thêm tin AI
        // Chủ thẻ sẽ trả lời qua Firestore onSnapshot
        if (res.data.reply !== null && res.data.reply !== undefined) {
          const aiResponse: ChatMessage = {
            id: Date.now().toString(),
            role: 'assistant',
            content: res.data.reply,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, aiResponse]);
        } else {
          // Human takeover — hiển thị banner "chủ thẻ đang trả lời"
          setIsHumanTakeover(true);
        }
      } else {
        showToast(res.message || 'Failed to connect to AI', 'error');
        setIsLeadModalOpen(true);
      }
    } catch (error) {
      showToast('Failed to connect to AI', 'error');
      setIsLeadModalOpen(true);
    } finally {
      setIsTyping(false);
    }
  };

  const handleGuestSubmit = async (info: { name: string; contact: string }) => {
    if (!profile) return;
    setGuestInfo(info);
    // Lưu vào localStorage để khách không cần nhập lại khi quay lại
    localStorage.setItem(`guest_info_${profile.id}`, JSON.stringify(info));
    setIsGuestModalOpen(false);

    if (pendingOpenLead) {
      setPendingOpenLead(false);
      setIsLeadModalOpen(true);
    }

    // Tìm lịch sử chat cũ theo email/zalo
    try {
      const histRes = await apiClient<{ conversationId: string; messages: any[]; mode?: string }>(
        `/chat/cards/${profile.id}/history?guestContact=${encodeURIComponent(info.contact)}`
      );

      if (histRes.success && histRes.data && histRes.data.messages?.length > 0) {
        const { conversationId: oldConvId, messages: oldMessages, mode: oldMode } = histRes.data;
        setConversationId(oldConvId);
        setIsHumanTakeover(oldMode === 'human_takeover');

        // Map tin nhắn cũ về dạng ChatMessage để hiện lên giao diện
        const restoredMsgs: ChatMessage[] = oldMessages.map((m) => ({
          id: m.id,
          role: m.sender === 'visitor' ? 'user' : 'assistant',
          content: m.sender === 'owner' ? `👤 ${m.content}` : m.content,
          timestamp: m.createdAt ? new Date(m.createdAt) : new Date(),
        }));

        // Giữ lại lời chào ban đầu, thêm lịch sử phía sau
        setMessages((prev) => {
          const greeting = prev[0]; // lời chào ban đầu
          return greeting ? [greeting, ...restoredMsgs] : restoredMsgs;
        });

        showToast(`✨ Đã khôi phục ${oldMessages.length} tin nhắn từ lần trước!`);
      }
    } catch {
      // Không tìm thấy lịch sử cũ → bắt đầu chat mới, không cần báo lỗi
    }
  };

  const handleOpenLeadForm = () => {
    if (!guestInfo) {
      setPendingOpenLead(true);
      setIsGuestModalOpen(true);
    } else {
      setIsLeadModalOpen(true);
    }
  };

  const handleLeadSubmit = async (message: string) => {
    if (!profile) return;

    // Nếu chưa có thông tin khách → hiển thị modal xin chào trước
    if (!guestInfo) {
      setIsLeadModalOpen(false);
      setIsGuestModalOpen(true);
      return;
    }

    try {
      const res = await apiClient<{ reply: string; conversationId?: string }>(`/chat/cards/${profile.id}/chat`, {
        method: 'POST',
        body: JSON.stringify({
          message,
          conversationId,
          guestName: guestInfo.name,
          guestContact: guestInfo.contact,
          forceHumanTakeover: true,
        }),
      });

      if (res.success) {
        if (res.data?.conversationId) {
          setConversationId(res.data.conversationId);
        }
        
        // Thêm tin nhắn của khách vào UI
        const userMsg: ChatMessage = {
          id: Date.now().toString(),
          role: 'user',
          content: message,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMsg]);
        setIsHumanTakeover(true);

        showToast('Tin nhắn đã được gửi! AI đã tạm dừng để chờ phản hồi từ chủ thẻ.');
        setIsLeadModalOpen(false);
      } else {
        showToast(res.message || 'Không thể gửi tin nhắn.', 'error');
      }
    } catch (error) {
      showToast('Không thể gửi tin nhắn. Vui lòng thử lại.', 'error');
    }
  };

  const handleReportSubmit = async (data: ReportData) => {
    if (!profile) return;

    try {
      await submitAIReport(profile.id, data);

      showToast('Thanks. This report has been submitted for review.');
      setIsReportModalOpen(false);
    } catch (error) {
      showToast('Failed to submit report. Please try again.', 'error');
    }
  };

  const currentAiStatus =
    pageState === 'ai_disabled'
      ? 'ai_disabled'
      : pageState === 'ai_error'
      ? 'ai_error'
      : profile?.aiStatus || 'ai_ready';

  if (['updating', 'locked', 'not_found'].includes(pageState)) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col relative font-sans">
        <EmptyState state={pageState} />
        <StateSwitcher currentState={pageState} onStateChange={setPageState} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 pt-8 px-4 font-sans selection:bg-brand-blue/30 relative">
      <div className="max-w-6xl mx-auto">
        {pageState === 'loading' || !profile ? (
          <LoadingSkeleton />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            <div className="lg:col-span-5 flex flex-col gap-6">
              <ProfileHeroCard profile={profile} />

              <div className="px-2">
                <SocialLinks links={profile.socialLinks} />
              </div>

              <SaveContactCard profile={profile} />
            </div>

            <div className="lg:col-span-7 flex flex-col gap-6">
              <AboutSection bio={profile.bio} />
              <SkillsSection skills={profile.skills} />
              <FeaturedProjects projects={profile.featuredProjects} />
              <ExperienceSection experience={profile.experience} />

              <div id="ai-chat">
                <AITwinChatWidget
                  profileName={profile.name}
                  aiDisplayName={profile.aiDisplayName}
                  aiStatus={currentAiStatus}
                  messages={messages}
                  isTyping={isTyping}
                  onSendMessage={handleSendMessage}
                  onOpenLeadForm={handleOpenLeadForm}
                  onOpenReport={() => setIsReportModalOpen(true)}
                  isHumanTakeover={isHumanTakeover}
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {profile && (
        <>
          <LeadFallbackModal
            isOpen={isLeadModalOpen}
            onClose={() => setIsLeadModalOpen(false)}
            onSubmit={handleLeadSubmit}
            profileName={profile.name}
          />

          <ReportAIModal
            isOpen={isReportModalOpen}
            onClose={() => setIsReportModalOpen(false)}
            onSubmit={handleReportSubmit}
          />

          <GuestIntroModal
            isOpen={isGuestModalOpen}
            aiDisplayName={profile.aiDisplayName || ''}
            profileName={profile.name}
            cardId={profile.id}
            onSubmit={handleGuestSubmit}
            onClose={() => setIsGuestModalOpen(false)}
          />
        </>
      )}

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
      />

      <StateSwitcher currentState={pageState} onStateChange={setPageState} />
    </div>
  );
}