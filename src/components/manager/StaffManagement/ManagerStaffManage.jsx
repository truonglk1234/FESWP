import React, { useState, useEffect } from 'react';
import './ManagerStaffManage.css';
import axios from 'axios';
import AddStaffForm from './AddStaffForm';
import StaffDetailModal from './StaffDetailModal';

const PAGE_SIZE = 3;

const ManagerStaffManage = () => {
  const [staffs, setStaffs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // Lấy token từ localStorage/sessionStorage
  const getToken = () => {
    try {
      const stored = localStorage.getItem('user') || sessionStorage.getItem('user');
      return stored ? JSON.parse(stored)?.token : null;
    } catch (err) {
      console.error("❌ Token không hợp lệ:", err);
      return null;
    }
  };

  // Gọi API lấy danh sách nhân viên
  const fetchStaffs = () => {
    const token = getToken();
    if (!token) return;

    axios.get('http://localhost:8080/api/auth/manager/staff', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setStaffs(res.data || []);
      })
      .catch(err => {
        console.error('❌ Lỗi khi tải danh sách nhân viên:', err);
      });
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  const totalPages = Math.ceil(staffs.length / PAGE_SIZE);
  const currentStaffs = staffs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleView = (staff) => {
    setSelectedStaff(staff);
  };

  return (
    <div className="smh-container">
      {/* ---------- HEADER ---------- */}
      <div className="smh-header-row">
        <div className="smh-header-text">
          <h1 className="smh-title">Quản lý nhân viên</h1>
          <p className="smh-subtitle">Quản lý thông tin và phân quyền nhân viên</p>
        </div>
        <div className="smh-top-right-buttons">
          <button className="smh-add-btn" onClick={() => setShowAddForm(true)}>
            Thêm nhân viên mới
          </button>
        </div>
      </div>

      {/* ---------- TABLE ---------- */}
      <div className="stm-page">
        <div className="stm-title">Danh sách nhân viên ({staffs.length})</div>
        <div className="stm-table">
          <div className="stm-table-head">
            <div>Thông tin nhân viên</div>
            <div>Liên hệ</div>
            <div>Trạng thái</div>
            <div>Thao tác</div>
          </div>
          {currentStaffs.map(staff => (
            <div className="stm-table-row" key={staff.id}>
              <div>
                <strong>{staff.name}</strong>
                <span>ID: {staff.id}</span>
                <span>
                  Ngày tạo: {staff.createdAt ? new Date(staff.createdAt).toLocaleDateString() : '-'}
                </span>
              </div>
              <div>
                <span>{staff.email}</span>
                <span>{staff.phone || '-'}</span>
              </div>
              <div>
                <span className={`stm-status ${staff.active === false ? 'inactive' : 'active'}`}>
                  {staff.active === false ? 'Ngừng hoạt động' : 'Hoạt động'}
                </span>
              </div>
              <div className="stm-action-buttons">
                <button className="stm-view-btn" onClick={() => handleView(staff)}>Xem</button>
              </div>
            </div>
          ))}
        </div>

        {/* ---------- PAGINATION ---------- */}
        <div className="stm-pagination">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
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
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Sau &gt;
          </button>
        </div>
      </div>

      {/* ---------- MODAL ADD ---------- */}
      {showAddForm && (
        <AddStaffForm
          onClose={() => setShowAddForm(false)}
          onAdded={fetchStaffs}
        />
      )}

      {/* ---------- MODAL VIEW ---------- */}
      {selectedStaff && (
        <StaffDetailModal
          staff={selectedStaff}
          onClose={() => setSelectedStaff(null)}
        />
      )}
    </div>
  );
};

export default ManagerStaffManage;
