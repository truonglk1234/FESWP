import React, { useState, useEffect } from 'react';
import './ConsultantDetailModal.css';
import { X } from 'lucide-react';
import axios from 'axios';

const ConsultantDetailModal = ({ consultantId, onClose, onUpdated }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Lấy chi tiết tư vấn viên
  useEffect(() => {
    const fetchConsultant = async () => {
      try {
        setLoading(true);
        setError('');

        const token = localStorage.getItem('token');
        const res = await axios.get(
          `http://localhost:8080/api/manager/consultants/${consultantId}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : '',
            },
          }
        );
        setData(res.data);
      } catch (err) {
        setError('Không tải được dữ liệu tư vấn viên');
      } finally {
        setLoading(false);
      }
    };

    if (consultantId) {
      fetchConsultant();
    }
  }, [consultantId]);

  // Xóa tư vấn viên
  const handleDelete = async () => {
    if (!window.confirm('Bạn có chắc muốn xóa tư vấn viên này?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `http://localhost:8080/api/manager/consultants/${consultantId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        }
      );
      alert('Đã xóa tư vấn viên');
      onUpdated();
      onClose();
    } catch (err) {
      alert('❌ Lỗi khi xóa tư vấn viên');
    }
  };

  if (loading) {
    return (
      <div className="cddm-overlay" onClick={onClose}>
        <div className="cddm-modal" onClick={(e) => e.stopPropagation()}>
          <p style={{ padding: 20 }}>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="cddm-overlay" onClick={onClose}>
        <div className="cddm-modal" onClick={(e) => e.stopPropagation()}>
          <div className="cddm-header">
            <h2>Chi tiết tư vấn viên</h2>
            <button className="cddm-close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
          <div className="cddm-body">
            <p className="cddm-error">{error || 'Không tìm thấy dữ liệu'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cddm-overlay" onClick={onClose}>
      <div className="cddm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cddm-header">
          <h2>Chi tiết tư vấn viên</h2>
          <button className="cddm-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="cddm-body">
          <div className="cddm-row"><label>Họ tên:</label> <span>{data.fullName}</span></div>
          <div className="cddm-row"><label>Email:</label> <span>{data.email}</span></div>
          <div className="cddm-row"><label>SĐT:</label> <span>{data.phone}</span></div>
          <div className="cddm-row"><label>Địa chỉ:</label> <span>{data.address}</span></div>
          <div className="cddm-row"><label>Giới tính:</label> <span>{data.gender}</span></div>
          <div className="cddm-row"><label>Ngày sinh:</label> 
            <span>{data.dateOfBirth ? new Date(data.dateOfBirth).toLocaleDateString('vi-VN') : '-'}</span>
          </div>
          <div className="cddm-row"><label>Trạng thái:</label> 
            <span className={`cddm-status ${data.status?.toLowerCase() === 'active' ? 'active' : 'inactive'}`}>
              {data.status === 'Active' ? 'Hoạt động' : 'Ngừng hoạt động'}
            </span>
          </div>
          <div className="cddm-row"><label>Chuyên môn:</label> <span>{data.specialty || '-'}</span></div>
          <div className="cddm-row"><label>Kinh nghiệm:</label> <span>{data.experienceYears ?? '-'}</span></div>
          <div className="cddm-row"><label>Trình độ:</label> <span>{data.education || '-'}</span></div>
          <div className="cddm-row"><label>Chứng chỉ:</label> <span>{data.certification || '-'}</span></div>
          <div className="cddm-row"><label>Mô tả:</label> <span>{data.description || '-'}</span></div>
        </div>

        {/* Buttons */}
        <div className="cddm-actions">
          <button className="cddm-delete-btn" onClick={handleDelete}>
            Xóa
          </button>
          <button className="cddm-edit-btn" onClick={() => alert('Chức năng sửa đang xây dựng')}>
            Sửa
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultantDetailModal;