import React from 'react';
import './TestResultModal.css';
import { FaMicroscope } from 'react-icons/fa';

const TestResultModal = ({ result, onClose }) => {
  if (!result) return null;

  return (
    <div className="trm-backdrop" onClick={onClose}>
      <div className="trm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="trm-header">
          <FaMicroscope className="trm-icon" />
          <h2>Kết quả xét nghiệm</h2>
        </div>

        <div className="trm-info">
          <div className="trm-row">
            <span className="trm-label">Gói:</span>
            <span className="trm-value">{result.serviceName}</span>
          </div>
          <div className="trm-row">
            <span className="trm-label">Ngày thực hiện:</span>
            <span className="trm-value">
              {new Date(result.appointmentDate).toLocaleString('vi-VN')}
            </span>
          </div>
          <div className="trm-row">
            <span className="trm-label">Kết quả:</span>
            <span className="trm-value">{result.result || 'Chưa có'}</span>
          </div>
          <div className="trm-row">
            <span className="trm-label">Lời khuyên:</span>
            <span className="trm-value">{result.advice || 'Không có'}</span>
          </div>
        </div>

        <button className="trm-close-btn" onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default TestResultModal;
