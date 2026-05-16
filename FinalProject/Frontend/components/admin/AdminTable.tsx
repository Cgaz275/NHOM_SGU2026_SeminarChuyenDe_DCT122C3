import { ReactNode } from 'react';

interface AdminTableProps {
  columns: string[];
  children: ReactNode;
}

export function AdminTable({ columns, children }: AdminTableProps) {
  return (
    <div className="w-full overflow-x-auto border border-white/10 rounded-xl bg-[#121A24]">
      <table className="w-full text-left text-sm text-white/80 whitespace-nowrap">
        <thead className="bg-[#101010] text-white/60 font-medium border-b border-white/10">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-4 py-3 first:rounded-tl-xl last:rounded-tr-xl">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {children}
        </tbody>
      </table>
    </div>
  );
}
