import { useRouter } from "next/router";

export default function Pagination({ total = 0, limit = 10, currentPage = 1 }) {
  const router = useRouter();
  let totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  const handlePageChange = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages) return;

    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: pageNum },
    });
  };

  return (
    <div className="flex gap-2 mt-4 justify-center items-center">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const pageNum = index + 1;
        return (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`px-3 py-1 border rounded ${
              pageNum === currentPage ? "bg-main text-white" : ""
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
