import React from 'react';
import './TestResultModal.css';

const TestResultModal = ({ result, onClose }) => {
  if (!result) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Kết quả xét nghiệm</h2>
        <p><strong>Gói:</strong> {result.serviceName}</p>
        <p><strong>Ngày thực hiện:</strong> {new Date(result.appointmentDate).toLocaleString('vi-VN')}</p>
        <p><strong>Kết quả:</strong> {result.result || 'Chưa có'}</p>
        <p><strong>Lời khuyên:</strong> {result.advice || 'Không có'}</p>
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default TestResultModal;
