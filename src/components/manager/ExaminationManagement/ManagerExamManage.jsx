import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManagerExamManage.css';

const PAGE_SIZE = 5;

const ManagerExamManage = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getToken = () => {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    try {
      return storedUser ? JSON.parse(storedUser).token : null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        if (!token) return;

        const res = await axios.get('http://localhost:8080/api/manager/examinations', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const sorted = res.data.sort((a, b) => a.id - b.id);
        setBookings(sorted);
      } catch (err) {
        console.error('Lỗi khi tải danh sách:', err);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(bookings.length / PAGE_SIZE);
  const pagedBookings = bookings.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const getStatusClass = (status) => {
    if (!status) return 'status';
    return `status ${status.trim().toLowerCase().replace(/\s/g, '-')}`;
  };

  return (
    <div className="manager-exam">
      <h2>📋 Tất cả lịch xét nghiệm</h2>

      <table className="exam-table">
        <thead>
          <tr>
            <th>Mã</th>
            <th>Khách hàng</th>
            <th>Dịch vụ</th>
            <th>Ngày hẹn</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {pagedBookings.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.userFullName}</td>
              <td>{b.serviceName}</td>
              <td>{new Date(b.appointmentDate).toLocaleString('vi-VN')}</td>
              <td><span className={getStatusClass(b.status)}>{b.status}</span></td>
            </tr>
          ))}
          {pagedBookings.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center' }}>Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>←</button>
        <span>Trang {currentPage} / {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>→</button>
      </div>
    </div>
  );
};

export default ManagerExamManage;
