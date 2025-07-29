import React, { useState, useEffect } from 'react';
import './ConsultantManage.css';
import AddConsultantForm from './AddConsultantForm';
import ConsultantDetailModal from './ConsultantDetailModal';
import axios from 'axios';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const PAGE_SIZE = 5;

const ConsultantManage = () => {
  const [consultants, setConsultants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState(null);

  // Lấy token
  const getToken = () => {
    try {
      const stored = localStorage.getItem('user') || sessionStorage.getItem('user');
      return stored ? JSON.parse(stored)?.token : null;
    } catch (err) {
      console.error('❌ Token không hợp lệ:', err);
      return null;
    }
  };

  // Load danh sách tư vấn viên
  const fetchConsultants = () => {
    const token = getToken();
    if (!token) return;

    axios
      .get('http://localhost:8080/api/auth/manager/consultants', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setConsultants(res.data || []);
      })
      .catch((err) => {
        console.error('❌ Lỗi khi tải danh sách tư vấn viên:', err);
      });
  };

  useEffect(() => {
    fetchConsultants();
  }, []);

  // Pagination
  const totalPages = Math.ceil(consultants.length / PAGE_SIZE);
  const currentConsultants = consultants.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Lấy class trạng thái
  const getStatusClass = (status) => {
    if (status?.toLowerCase() === 'inactive' || status === false)
      return 'cm-status inactive';
    if (status?.toLowerCase() === 'busy') return 'cm-status busy';
    return 'cm-status active';
  };

  // Icon trạng thái
  const renderStatus = (status) => {
    if (status?.toLowerCase() === 'inactive' || status === false) {
      return (
        <>
          <XCircle size={16} style={{ marginRight: 6 }} />
          Ngừng hoạt động
        </>
      );
    }
    if (status?.toLowerCase() === 'busy') {
      return (
        <>
          <Clock size={16} style={{ marginRight: 6 }} />
          Bận
        </>
      );
    }
    return (
      <>
        <CheckCircle size={16} style={{ marginRight: 6 }} />
        Hoạt động
      </>
    );
  };

  return (
    <div className="cm-container">
      {/* HEADER */}
      <div className="cm-header-row">
        <div className="cm-header-text">
          <h1 className="cm-title">Quản lý tư vấn viên</h1>
          <p className="cm-subtitle">
            Quản lý thông tin, trạng thái và lịch làm việc của tư vấn viên
          </p>
        </div>
        <button className="cm-add-btn" onClick={() => setShowAddForm(true)}>
          + Thêm tư vấn viên
        </button>
      </div>

      {/* TABLE */}
      <div className="cm-page">
        <div className="cm-table-title">
          Danh sách tư vấn viên ({consultants.length})
        </div>
        <div className="cm-table">
          <div className="cm-table-head">
            <div>THÔNG TIN</div>
            <div>LIÊN HỆ</div>
            <div>TRẠNG THÁI</div>
            <div>THAO TÁC</div>
          </div>

          {currentConsultants.length > 0 ? (
            currentConsultants.map((c) => (
              <div className="cm-table-row" key={c.id}>
                <div>
                  <strong>{c.fullName}</strong>
                  <span>ID: {c.id}</span>
                  <span>
                    Ngày tạo:{' '}
                    {c.createdAt
                      ? new Date(c.createdAt).toLocaleDateString()
                      : '-'}
                  </span>
                </div>
                <div>
                  <span>{c.email}</span>
                  <span>{c.phone || '-'}</span>
                </div>
                <div>
                  <span className={getStatusClass(c.status)}>
                    {renderStatus(c.status)}
                  </span>
                </div>
                <div className="cm-action-buttons">
                  <button
                    className="cm-view-btn"
                    onClick={() => setSelectedConsultant(c)}
                  >
                    Xem
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="cm-empty">Không có tư vấn viên nào</div>
          )}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="cm-pagination">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              &lt; Trước
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={currentPage === i + 1 ? 'active' : ''}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Sau &gt;
            </button>
          </div>
        )}
      </div>

      {/* MODALS */}
      {showAddForm && (
        <AddConsultantForm
          onClose={() => setShowAddForm(false)}
          onAdded={fetchConsultants}
        />
      )}
      {selectedConsultant && (
        <ConsultantDetailModal
          consultant={selectedConsultant}
          onClose={() => setSelectedConsultant(null)}
        />
      )}
    </div>
  );
};

export default ConsultantManage;
