import { Search } from 'lucide-react';

interface AdminSearchBarProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export function AdminSearchBar({ placeholder, value, onChange }: AdminSearchBarProps) {
  return (
    <div className="relative w-full md:max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-white/40" />
      </div>
      <input
        type="text"
        className="w-full pl-10 pr-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#008FEA] focus:border-[#008FEA] transition-all"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
