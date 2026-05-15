// import { FAQItem } from '@/types/ai-twin';
// import { Edit2, Trash2 } from 'lucide-react';

// interface FAQListProps {
//   items: FAQItem[];
//   onEdit: (item: FAQItem) => void;
//   onDelete: (id: string) => void;
// }

// export function FAQList({ items, onEdit, onDelete }: FAQListProps) {
//   if (items.length === 0) {
//     return <div className="text-center py-6 text-sm text-white/50">No FAQs added yet.</div>;
//   }

//   return (
//     <div className="space-y-3">
//       {items.map(item => (
//         <div key={item.id} className="bg-[#101010] border border-white/10 rounded-lg p-4 flex flex-col md:flex-row md:items-start justify-between gap-4">
//           <div className="flex-1">
//             <h4 className="font-semibold text-white mb-2">Q: {item.question}</h4>
//             <p className="text-sm text-white/60">A: {item.answer}</p>
//           </div>
//           <div className="flex items-center gap-2 self-end md:self-auto shrink-0 mt-2 md:mt-0">
//             <button onClick={() => onEdit(item)} className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
//               <Edit2 size={16} />
//             </button>
//             <button onClick={() => onDelete(item.id)} className="p-2 text-white/50 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
//               <Trash2 size={16} />
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
