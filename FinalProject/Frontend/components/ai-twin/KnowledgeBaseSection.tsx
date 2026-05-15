import { useState } from 'react';
import { KnowledgeBase, KnowledgeItemType, SkillItem, ExperienceItem, ProjectItem, ServiceItem, FAQItem } from '@/types/ai-twin';
import { Plus, Database } from 'lucide-react';

import { AddSkillModal } from './AddSkillModal';
import { SkillList } from './SkillList';
import { AddExperienceModal } from './AddExperienceModal';
import { ExperienceList } from './ExperienceList';
import { AddProjectModal } from './AddProjectModal';
import { ProjectList } from './ProjectList';
import { AddServiceModal } from './AddServiceModal';
import { ServiceList } from './ServiceList';
// import { AddFAQModal } from './AddFAQModal';
// import { FAQList } from './FAQList';

interface KnowledgeBaseSectionProps {
  knowledgeBase: KnowledgeBase;
  onAdd: (type: KnowledgeItemType, item: any) => void;
  onUpdate: (type: KnowledgeItemType, id: string, item: any) => void;
  onDelete: (type: KnowledgeItemType, id: string) => void;
}

export function KnowledgeBaseSection({ knowledgeBase, onAdd, onUpdate, onDelete }: KnowledgeBaseSectionProps) {
  // Modal states
  const [modalState, setModalState] = useState<{ type: KnowledgeItemType | null, initialData: any | null }>({ type: null, initialData: null });

  const handleAddClick = (type: KnowledgeItemType) => setModalState({ type, initialData: null });
  const handleEditClick = (type: KnowledgeItemType, item: any) => setModalState({ type, initialData: item });
  const handleCloseModal = () => setModalState({ type: null, initialData: null });

  const handleSave = (item: any) => {
    if (!modalState.type) return;
    if (modalState.initialData) {
      onUpdate(modalState.type, modalState.initialData.id, item);
    } else {
      onAdd(modalState.type, item);
    }
  };

  const currentLength = JSON.stringify(knowledgeBase).length;
  const isWarning = currentLength > 13500;
  const isError = currentLength > 15000;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      

      {/* Skills */}
      <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-white">Skills</h2>
            <span className="bg-white/10 text-white/70 px-2 py-0.5 rounded-full text-xs">{knowledgeBase.skills.length}</span>
          </div>
          <button onClick={() => handleAddClick('skill')} className="flex items-center gap-2 text-sm text-[#008FEA] hover:text-[#007AC8] transition-colors">
            <Plus size={16} /> Add Skill
          </button>
        </div>
        <SkillList items={knowledgeBase.skills} onEdit={(item) => handleEditClick('skill', item)} onDelete={(id) => onDelete('skill', id)} />
      </div>

      {/* Experiences */}
      <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-white">Experience</h2>
            <span className="bg-white/10 text-white/70 px-2 py-0.5 rounded-full text-xs">{knowledgeBase.experiences.length}</span>
          </div>
          <button onClick={() => handleAddClick('experience')} className="flex items-center gap-2 text-sm text-[#008FEA] hover:text-[#007AC8] transition-colors">
            <Plus size={16} /> Add Experience
          </button>
        </div>
        <ExperienceList items={knowledgeBase.experiences} onEdit={(item) => handleEditClick('experience', item)} onDelete={(id) => onDelete('experience', id)} />
      </div>

      {/* Projects */}
      <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-white">Projects</h2>
            <span className="bg-white/10 text-white/70 px-2 py-0.5 rounded-full text-xs">{knowledgeBase.projects.length}</span>
          </div>
          <button onClick={() => handleAddClick('project')} className="flex items-center gap-2 text-sm text-[#008FEA] hover:text-[#007AC8] transition-colors">
            <Plus size={16} /> Add Project
          </button>
        </div>
        <ProjectList items={knowledgeBase.projects} onEdit={(item) => handleEditClick('project', item)} onDelete={(id) => onDelete('project', id)} />
      </div>

      {/* Services */}
      <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-white">Services</h2>
            <span className="bg-white/10 text-white/70 px-2 py-0.5 rounded-full text-xs">{knowledgeBase.services.length}</span>
          </div>
          <button onClick={() => handleAddClick('service')} className="flex items-center gap-2 text-sm text-[#008FEA] hover:text-[#007AC8] transition-colors">
            <Plus size={16} /> Add Service
          </button>
        </div>
        <ServiceList items={knowledgeBase.services} onEdit={(item) => handleEditClick('service', item)} onDelete={(id) => onDelete('service', id)} />
      </div>

      {/* FAQs */}
      {/* <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-white">FAQ</h2>
            <span className="bg-white/10 text-white/70 px-2 py-0.5 rounded-full text-xs">{knowledgeBase.faqs.length}</span>
          </div>
          <button onClick={() => handleAddClick('faq')} className="flex items-center gap-2 text-sm text-[#008FEA] hover:text-[#007AC8] transition-colors">
            <Plus size={16} /> Add FAQ
          </button>
        </div>
        <FAQList items={knowledgeBase.faqs} onEdit={(item) => handleEditClick('faq', item)} onDelete={(id) => onDelete('faq', id)} />
      </div> */}

      {/* Modals */}
      {modalState.type === 'skill' && <AddSkillModal isOpen={true} onClose={handleCloseModal} onAdd={handleSave} initialData={modalState.initialData} />}
      {modalState.type === 'experience' && <AddExperienceModal isOpen={true} onClose={handleCloseModal} onAdd={handleSave} initialData={modalState.initialData} />}
      {modalState.type === 'project' && <AddProjectModal isOpen={true} onClose={handleCloseModal} onAdd={handleSave} initialData={modalState.initialData} />}
      {modalState.type === 'service' && <AddServiceModal isOpen={true} onClose={handleCloseModal} onAdd={handleSave} initialData={modalState.initialData} />}
      {/* {modalState.type === 'faq' && <AddFAQModal isOpen={true} onClose={handleCloseModal} onAdd={handleSave} initialData={modalState.initialData} />} */}

    </div>
  );
}
