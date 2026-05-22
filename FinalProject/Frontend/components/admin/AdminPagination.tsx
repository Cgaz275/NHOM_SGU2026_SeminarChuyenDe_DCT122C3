interface AdminPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function AdminPagination({ currentPage, totalPages, onPageChange }: AdminPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-white/10 mt-4">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-md border border-white/10 bg-[#1A1A1A] px-4 py-2 text-sm font-medium text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Trước
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative ml-3 inline-flex items-center rounded-md border border-white/10 bg-[#1A1A1A] px-4 py-2 text-sm font-medium text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sau
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-white/60">
            Trang <span className="font-medium text-white">{currentPage}</span> / <span className="font-medium text-white">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-white/60 ring-1 ring-inset ring-white/10 hover:bg-white/5 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed bg-[#1A1A1A]"
            >
              <span className="sr-only">Trước</span>
              Trước
            </button>
            
            {[...Array(totalPages)].map((_, idx) => {
              const page = idx + 1;
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-white/10 focus:z-20 focus:outline-offset-0 ${
                    currentPage === page
                      ? 'z-10 bg-[#008FEA] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008FEA]'
                      : 'text-white/80 hover:bg-white/5 bg-[#1A1A1A]'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-white/60 ring-1 ring-inset ring-white/10 hover:bg-white/5 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed bg-[#1A1A1A]"
            >
              <span className="sr-only">Sau</span>
              Sau
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
