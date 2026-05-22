// import { AITwinStatus } from '@/types/ai-twin';
// import { CheckCircle, AlertTriangle, XCircle, Loader2, Clock, FileText, Database, ShieldAlert } from 'lucide-react';

// interface AIStatusBarProps {
//   status: AITwinStatus;
//   lastTrainedAt?: string;
//   systemPromptLength: number;
//   knowledgeBaseLength: number;
//   isPublicEnabled: boolean;
// }

// export function AIStatusBar({
//   status,
//   lastTrainedAt,
//   systemPromptLength,
//   knowledgeBaseLength,
//   isPublicEnabled,
// }: AIStatusBarProps) {
  
//   const getStatusDisplay = () => {
//     switch (status) {
//       case 'AI Ready':
//         return { color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20', icon: CheckCircle };
//       case 'AI Draft':
//         return { color: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-400/20', icon: Clock };
//       case 'AI Training':
//         return { color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', icon: Loader2 };
//       case 'AI Error':
//         return { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20', icon: XCircle };
//       case 'AI Disabled':
//         return { color: 'text-gray-500', bg: 'bg-gray-500/10', border: 'border-gray-500/20', icon: AlertTriangle };
//       case 'Prompt Too Long':
//         return { color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20', icon: ShieldAlert };
//       default:
//         return { color: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-400/20', icon: Clock };
//     }
//   };

//   const statusConfig = getStatusDisplay();
//   const Icon = statusConfig.icon;

//   const formatDate = (dateString?: string) => {
//     if (!dateString) return 'Chưa bao giờ huấn luyện';
//     const date = new Date(dateString);
//     return date.toLocaleString();
//   };

//   return (
//     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1A1A1A] border border-white/10 rounded-xl p-4">
//       <div className="flex items-center gap-3">
//         <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md border ${statusConfig.bg} ${statusConfig.border} ${statusConfig.color}`}>
//           <Icon size={16} className={status === 'AI Training' ? 'animate-spin' : ''} />
//           <span className="text-sm font-medium">{status}</span>
//         </div>
//         <div className="text-sm text-white/50">
//           Huấn luyện lần cuối: {formatDate(lastTrainedAt)}
//         </div>
//       </div>

//       <div className="flex items-center gap-4 text-sm">
//         <div className="flex items-center gap-2">
//           <FileText size={16} className="text-white/40" />
//           <span className={systemPromptLength > 2000 ? 'text-red-400' : systemPromptLength > 1800 ? 'text-orange-400' : 'text-white/70'}>
//             Prompt: {systemPromptLength}/2,000
//           </span>
//         </div>
//         <div className="w-px h-4 bg-white/10" />
//         <div className="flex items-center gap-2">
//           <Database size={16} className="text-white/40" />
//           <span className={knowledgeBaseLength > 15000 ? 'text-red-400' : knowledgeBaseLength > 13500 ? 'text-orange-400' : 'text-white/70'}>
//             Kiến thức: {knowledgeBaseLength}/15,000
//           </span>
//         </div>
//         <div className="w-px h-4 bg-white/10" />
//         <div className="flex items-center gap-2">
//           <div className={`w-2 h-2 rounded-full ${isPublicEnabled ? 'bg-green-400' : 'bg-gray-500'}`} />
//           <span className="text-white/70">{isPublicEnabled ? 'Công khai' : 'Ẩn'}</span>
//         </div>
//       </div>
//     </div>
//   );
// }
