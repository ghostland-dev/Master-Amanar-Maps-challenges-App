
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

interface LeaderboardPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const LeaderboardPagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: LeaderboardPaginationProps) => {
  const generatePaginationItems = () => {
    // Always show first page, last page, current page, and one page before and after current
    const items = new Set([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);
    
    // Remove invalid pages
    const validItems = Array.from(items).filter(page => page > 0 && page <= totalPages);
    
    // Sort pages
    validItems.sort((a, b) => a - b);
    
    // Add ellipses where needed
    const result = [];
    let prevPage = 0;
    
    for (const page of validItems) {
      if (page - prevPage > 1) {
        result.push('ellipsis');
      }
      result.push(page);
      prevPage = page;
    }
    
    return result;
  };
  
  return (
    <Pagination className="my-8">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onPageChange(currentPage - 1);
              }}
            />
          </PaginationItem>
        )}
        
        {generatePaginationItems().map((item, i) => (
          item === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <span className="flex h-9 w-9 items-center justify-center">...</span>
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink 
                href="#" 
                isActive={currentPage === item}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(item as number);
                }}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        ))}
        
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onPageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
