import Link from "next/link";

/**
 * Generates a pagination bar for a web page with page values like 1, 2, 3, 4, 5, and so on.
 * @param {number} currentPage - The current page.
 * @param {number} totalPages - The total number of pages.
 * @returns {number[]} - An array of page numbers to display in the pagination bar.
 */
function generatePaginationBar(
  currentPage: number,
  totalPages: number,
): number[] {
  const visiblePages = 5; // Number of visible pages in the bar
  const halfBar = Math.floor(visiblePages / 2);
  let start, end;

  if (totalPages <= visiblePages) {
    start = 1;
    end = totalPages;
  } else if (currentPage <= halfBar) {
    start = 1;
    end = visiblePages;
  } else if (currentPage >= totalPages - halfBar) {
    start = totalPages - visiblePages + 1;
    end = totalPages;
  } else {
    start = currentPage - halfBar;
    end = currentPage + halfBar;
  }

  const pages = [];

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
}

function PaginationBar({ page }: { page: number }) {
  const paginationNumbers = generatePaginationBar(page, 32);

  return (
    <div className="flex items-center justify-center mt-6">
      {paginationNumbers.map((paginationNumber) => {
        const selectedClassName =
          "flex items-center justify-center w-12 h-12 bg-neutral-600 ";
        const notSelectedClassName =
          "flex items-center justify-center w-12 h-12 bg-neutral-400 text-neutral-900";
        return (
          <Link
            className={
              paginationNumber === page
                ? selectedClassName
                : notSelectedClassName
            }
            key={paginationNumber}
            href={`/${paginationNumber}`}
          >
            {" "}
            {paginationNumber}{" "}
          </Link>
        );
      })}
    </div>
  );
}

export default PaginationBar;
