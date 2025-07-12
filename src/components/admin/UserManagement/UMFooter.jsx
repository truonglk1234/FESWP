import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UMFooter.css';

const UMFooter = () => {
  const [managers, setManagers] = useState([]);

  const getToken = () => {
    try {
      const stored = localStorage.getItem('user') || sessionStorage.getItem('user');
      return stored ? JSON.parse(stored).token : null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const token = getToken();
        if (!token) return;

        const res = await axios.get('http://localhost:8080/api/auth/admin/managers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setManagers(res.data);
      } catch (error) {
        console.error('❌ Lỗi khi gọi API /managers:', error);
      }
    };

    fetchManagers();
  }, []);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return "Chưa có";
    const date = new Date(isoDate);
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <div className="um-footer">
      <div className="um-footer-header">
        <div>
          <h3 className="um-footer-title">Danh sách người quản lý</h3>
          <p className="um-footer-subtitle">Tổng số {managers.length} người quản lý </p>
        </div>
      </div>

      <table className="um-user-table">
        <thead>
          <tr>
            <th>Người dùng</th>
            <th>Liên hệ</th>
            <th>Ngày tham gia</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {managers.map((u, index) => (
            <tr key={index}>
              <td>
                <div className="um-user-info">
                  <span className="um-user-initials">{getInitials(u.name)}</span>
                  <div>
                    <p className="um-user-name">{u.name}</p>
                    <p className="um-user-id">ID: {u.id}</p>
                  </div>
                </div>
              </td>
              <td>
                <p>{u.email}</p>
                <p>{u.phone}</p>
              </td>
              <td>{formatDate(u.createdAt)}</td>
              <td>
                <span className={`um-status ${u.verifiedStatus === 'Đã xác thực' ? 'active' : 'inactive'}`}>
                  {u.verifiedStatus === 'Đã xác thực' ? 'Đang hoạt động' : u.verifiedStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UMFooter;
