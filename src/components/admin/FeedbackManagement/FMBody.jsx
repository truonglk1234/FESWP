import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FMBody.css';

const FMBody = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    axios.get('http://localhost:8080/api/feedbacks')
      .then(res => setFeedbacks(res.data))
      .catch(err => console.error('❌ Lỗi khi tải feedbacks:', err));
  }, []);

  const totalPages = Math.ceil(feedbacks.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const pagedFeedbacks = feedbacks.slice(startIdx, startIdx + itemsPerPage);

  return (
    <>
      <div className="fm-body">
        {pagedFeedbacks.map((fb) => (
          <div
            key={fb.bookingId}
            className="feedback-card"
          >
            <div className="feedback-header">
              <div>
                <span className="user-icon">👤</span>
                <span className="user-name">{fb.fullName}</span>
                <span className="stars">
                  {'★'.repeat(fb.rating)}{'☆'.repeat(5 - fb.rating)}
                </span>
                <span className="rating">({fb.rating}/5)</span>
              </div>
              <div className="status-date">
                <span className="date">📅 {new Date(fb.createdAt).toLocaleDateString('vi-VN')}</span>
              </div>
            </div>

            <div className="feedback-info">
              Dịch vụ: <strong>{fb.serviceName}</strong>
            </div>

            <div className="feedback-content">
              <span className="comment-icon">💬</span> {fb.comment}
            </div>

        
          </div>
        ))}
      </div>

      <div className="fm-footer">
        <button
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          ‹ Trước
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="page-btn"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          sau ›
        </button>
      </div>
    </>
  );
};

export default FMBody;
