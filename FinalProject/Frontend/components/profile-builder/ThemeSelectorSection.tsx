// 'use client';

// import { ThemeSettings, ThemeOption, FontStyle } from '@/types/profile-builder';
// import { Check } from 'lucide-react';

// interface ThemeSelectorSectionProps {
//   data: ThemeSettings;
//   onChange: (data: ThemeSettings) => void;
// }

// const themeOptions: { label: ThemeOption; previewColor: string; bg: string }[] = [
//   { label: 'Dark Blue', previewColor: '#2367A2', bg: 'bg-[#0B1120]' },
//   { label: 'Minimal Black', previewColor: '#ffffff', bg: 'bg-[#000000]' },
//   { label: 'Electric Blue', previewColor: '#008FEA', bg: 'bg-[#0a192f]' },
//   { label: 'Glass Card', previewColor: '#ffffff', bg: 'bg-gradient-to-br from-white/10 to-white/5' },
// ];

// const fontOptions: FontStyle[] = ['Modern Sans', 'Tech Display', 'Clean Professional'];

// export function ThemeSelectorSection({ data, onChange }: ThemeSelectorSectionProps) {
//   return (
//     <div className="flex flex-col gap-6 bg-[#101010] border border-white/10 rounded-xl p-6">
//       <div>
//         <h2 className="text-lg font-semibold text-white">Chủ đề & Giao diện</h2>
//         <p className="text-sm text-white/50 mt-1">Tùy chỉnh giao diện cho thẻ số của bạn.</p>
//       </div>

//       <div className="flex flex-col gap-6">
//         {/* Theme Selection */}
//         <div className="flex flex-col gap-3">
//           <label className="text-sm font-medium text-white/90">Chủ đề mẫu</label>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//             {themeOptions.map((theme) => {
//               const isActive = data.theme === theme.label;
//               return (
//                 <button
//                   key={theme.label}
//                   onClick={() => onChange({ ...data, theme: theme.label })}
//                   className={`relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
//                     isActive 
//                       ? 'border-[#008FEA] bg-[#008FEA]/10' 
//                       : 'border-white/10 bg-[#0B0B0B] hover:border-white/30'
//                   }`}
//                 >
//                   <div className={`w-8 h-8 rounded-full border border-white/20 mb-3 flex items-center justify-center ${theme.bg}`}>
//                     <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.previewColor }} />
//                   </div>
//                   <span className="text-xs font-medium text-white text-center">
//                     {theme.label}
//                   </span>
                  
//                   {isActive && (
//                     <div className="absolute top-2 right-2 text-[#008FEA]">
//                       <Check size={14} />
//                     </div>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Font Style Selection */}
//         <div className="flex flex-col gap-3">
//           <label className="text-sm font-medium text-white/90">Kiểu font chữ</label>
//           <div className="flex flex-wrap gap-3">
//             {fontOptions.map((font) => {
//               const isActive = data.fontStyle === font;
//               return (
//                 <button
//                   key={font}
//                   onClick={() => onChange({ ...data, fontStyle: font })}
//                   className={`px-4 py-2 rounded-lg text-sm transition-colors border ${
//                     isActive
//                       ? 'bg-[#008FEA]/20 text-[#008FEA] border-[#008FEA]/30'
//                       : 'bg-[#0B0B0B] text-white/70 border-white/10 hover:bg-white/5 hover:text-white'
//                   }`}
//                 >
//                   {font}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
