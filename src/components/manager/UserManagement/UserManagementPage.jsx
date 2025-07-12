import React, { useState, useEffect, useCallback } from 'react';
import './UserManagementPage.css';
import axios from 'axios';
import UserDetailModal from './UserDetailModal';

const PAGE_SIZE = 3;

const UserManagementPage = () => {
  const [usersData, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getToken = () => {
    try {
      const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser)?.token : null;
    } catch (err) {
      console.error("❌ Token không đọc được:", err);
      return null;
    }
  };

  const fetchUsers = useCallback(() => {
    const token = getToken();
    if (!token) return;

    setLoading(true);
    axios.get('http://localhost:8080/api/auth/manager/customers', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => setUsersData(res.data || []))
      .catch(err => console.error('❌ Lỗi khi tải danh sách người dùng:', err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const totalPages = Math.ceil(usersData.length / PAGE_SIZE);
  const currentUsers = usersData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleView = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="um-container">
      {/* --------- HEADER --------- */}
      <div className="um-header-row">
        <div className="um-header-text">
          <h1 className="um-title">Quản lý người dùng</h1>
          <p className="um-subtitle">Quản lý tài khoản khách hàng</p>
        </div>
      </div>

      {/* --------- TABLE --------- */}
      <div className="um-user-page">
        <div className="um-user-title">
          Danh sách người dùng ({usersData.length})
        </div>

        <div className="um-user-table">
          <div className="um-table-head">
            <div>Thông tin người dùng</div>
            <div>Liên hệ</div>
            <div>Trạng thái</div>
            <div>Thao tác</div>
          </div>

          {loading ? (
            <div className="um-loading">Đang tải dữ liệu...</div>
          ) : currentUsers.length === 0 ? (
            <div className="um-empty">Không có người dùng nào.</div>
          ) : (
            currentUsers.map(user => (
              <div className="um-table-row" key={user.id}>
                <div>
                  <strong>{user.name}</strong>
                  <span>ID: {user.id}</span>
                  <span>
                    Đăng ký: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                  </span>
                </div>
                <div>
                  <span>{user.email}</span>
                  <span>{user.phone || '-'}</span>
                </div>
                <div>
                  <span className={`um-status ${user.verifiedStatus === 'Đã xác thực' ? 'active' : 'inactive'}`}>
                    {user.verifiedStatus || 'Chưa xác thực'}
                  </span>
                </div>
                <div className="um-action-buttons">
                  <button className="um-view-btn" onClick={() => handleView(user)}>Xem</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* --------- PAGINATION --------- */}
        {!loading && totalPages > 1 && (
          <div className="um-pagination">
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
        )}
      </div>

      {/* --------- MODAL DETAIL --------- */}
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default UserManagementPage;
