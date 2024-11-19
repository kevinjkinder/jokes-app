import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onChange }: PaginationProps) {
  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => onChange(1)}
      >
        First
      </button>
      <button
        className="nav-btn"
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
      >
        ←
      </button>
      <div className="page-info">
        <span>Page {currentPage} of {totalPages}</span>
      </div>
      <button
        className="nav-btn"
        disabled={currentPage === totalPages}
        onClick={() => onChange(currentPage + 1)}
      >
        →
      </button>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onChange(totalPages)}
      >
        Last
      </button>
    </div>
  );
} 