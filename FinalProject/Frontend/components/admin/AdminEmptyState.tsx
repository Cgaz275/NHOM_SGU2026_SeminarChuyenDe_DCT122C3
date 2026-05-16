interface AdminEmptyStateProps {
  message: string;
}

export function AdminEmptyState({ message }: AdminEmptyStateProps) {
  return (
    <div className="flex items-center justify-center py-16 text-white/50 border border-dashed border-white/10 rounded-xl bg-[#121A24]/30">
      <p>{message}</p>
    </div>
  );
}
