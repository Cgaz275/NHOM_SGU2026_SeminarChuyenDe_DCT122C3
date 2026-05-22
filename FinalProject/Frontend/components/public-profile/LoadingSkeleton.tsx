export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-pulse">
      <div className="space-y-6">
        {/* Hero Card Skeleton */}
        <div className="rounded-[24px] bg-card border border-white/5 p-6 md:p-8 h-[320px] flex flex-col items-center">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/10 mb-6" />
          <div className="w-48 h-8 bg-white/10 rounded mb-4" />
          <div className="w-32 h-4 bg-white/10 rounded mb-4" />
          <div className="w-64 h-4 bg-white/10 rounded" />
        </div>
        
        {/* Save Contact Card Skeleton */}
        <div className="rounded-[24px] bg-card border border-white/5 p-6 md:p-8 h-[280px]">
          <div className="w-32 h-6 bg-white/10 rounded mb-6" />
          <div className="w-full h-24 bg-white/10 rounded-xl mb-6" />
          <div className="w-full h-12 bg-white/10 rounded-full mb-3" />
          <div className="w-full h-12 bg-white/10 rounded-full" />
        </div>
      </div>

      <div className="space-y-6">
        {/* About Skeleton */}
        <div className="rounded-[24px] bg-card border border-white/5 p-6 md:p-8">
          <div className="w-24 h-6 bg-white/10 rounded mb-4" />
          <div className="space-y-2">
            <div className="w-full h-4 bg-white/10 rounded" />
            <div className="w-5/6 h-4 bg-white/10 rounded" />
            <div className="w-4/6 h-4 bg-white/10 rounded" />
          </div>
        </div>

        {/* Chat Skeleton */}
        <div className="rounded-[24px] bg-card border border-white/5 h-[500px] md:h-[600px] flex flex-col">
          <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10" />
            <div>
              <div className="w-32 h-5 bg-white/10 rounded mb-2" />
              <div className="w-16 h-3 bg-white/10 rounded" />
            </div>
          </div>
          <div className="flex-1 p-6 space-y-4">
            <div className="w-3/4 h-16 bg-white/10 rounded-2xl rounded-tl-sm" />
            <div className="w-2/3 h-12 bg-white/10 rounded-2xl rounded-tr-sm ml-auto" />
            <div className="w-1/2 h-12 bg-white/10 rounded-2xl rounded-tl-sm" />
          </div>
          <div className="p-4 border-t border-white/5">
            <div className="w-full h-12 bg-white/10 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
