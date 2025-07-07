import React, { useState, useEffect } from 'react';
import './ManagerStaffManage.css';
import axios from 'axios';

const PAGE_SIZE = 3;

const ManagerStaffManage = () => {
  const [staffs, setStaffs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Gọi API lấy danh sách nhân viên
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    if (!token) return;
    axios.get('http://localhost:8080/api/auth/manager/staff', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setStaffs(res.data || []);
      })
      .catch(err => {
        console.error('❌ Lỗi khi tải danh sách nhân viên:', err);
      });
  }, []);

  const totalPages = Math.ceil(staffs.length / PAGE_SIZE);
  const currentStaffs = staffs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleView = (staff) => {
    alert(`🔍 Xem chi tiết nhân viên:\n\nTên: ${staff.name}\nEmail: ${staff.email}\nSĐT: ${staff.phone}`);
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
          <button className="smh-add-btn">Thêm nhân viên mới</button>
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
                  Ngày tạo: {staff.createdAt ? new Date(staff.createdAt).toLocaleDateString() : ''}
                </span>
              </div>
              <div>
                <span>{staff.email}</span>
                <span>{staff.phone}</span>
              </div>
              <div>
                <span className={`stm-status ${staff.active ? 'active' : 'inactive'}`}>
                  {staff.active ? 'Hoạt động' : 'Ngừng hoạt động'}
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
    </div>
  );
};

export default ManagerStaffManage;
