import React from "react";

const Pagination = ({ page: currentPage, totalPages, setPage: setCurrentPage }) => {
  return (
    <div className="schedule-table-pagination">
      {currentPage > 1 && (
        <button
          className="schedule-table-page-btn prev"
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          ← Previous
        </button>
      )}

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          className={`schedule-table-page-btn ${currentPage === i + 1 ? "active" : ""}`}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          className="schedule-table-page-btn next"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next →
        </button>
      )}
    </div>
  );
};

export default Pagination;
