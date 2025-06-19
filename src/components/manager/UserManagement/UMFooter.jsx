import React, { useState } from 'react';
import './UMFooter.css';

const usersData = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0123456789',
    registered: '2024-01-15',
    status: 'active',
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'tranthib@email.com',
    phone: '0987654321',
    registered: '2024-02-20',
    status: 'inactive',
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'levanc@email.com',
    phone: '0345678901',
    registered: '2024-03-10',
    status: 'active',
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    email: 'phamd@email.com',
    phone: '0912345678',
    registered: '2024-04-01',
    status: 'active',
  },
  {
    id: 5,
    name: 'Võ Văn E',
    email: 'vovane@email.com',
    phone: '0901234567',
    registered: '2024-04-20',
    status: 'inactive',
  },
  {
    id: 6,
    name: 'Đinh Thị F',
    email: 'dinhf@email.com',
    phone: '0987123456',
    registered: '2024-05-01',
    status: 'active',
  },
  {
    id: 7,
    name: 'Ngô Văn G',
    email: 'ngovang@email.com',
    phone: '0923456789',
    registered: '2024-05-12',
    status: 'active',
  },
  {
    id: 8,
    name: 'Bùi Thị H',
    email: 'buih@email.com',
    phone: '0934567890',
    registered: '2024-05-15',
    status: 'inactive',
  },
  {
    id: 9,
    name: 'Hoàng Văn I',
    email: 'hoangi@email.com',
    phone: '0945678901',
    registered: '2024-05-18',
    status: 'active',
  },
];

const PAGE_SIZE = 3;

function UMFooter() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(usersData.length / PAGE_SIZE);
  const currentUsers = usersData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleEdit = (user) => {
    alert(`Bạn đang sửa thông tin của: ${user.name}`);
    // TODO: Mở popup hoặc chuyển trang chỉnh sửa
  };

  const handleDelete = (user) => {
    if (window.confirm(`Bạn có chắc muốn xóa người dùng "${user.name}"?`)) {
      alert(`Đã xóa: ${user.name}`);
      // TODO: Gọi API xóa và cập nhật lại danh sách
    }
  };

  return (
    <div className="user-page">
      <div className="title">Danh sách người dùng ({usersData.length})</div>
      <div className="user-table">
        <div className="table-head">
          <div>Thông tin người dùng</div>
          <div>Liên hệ</div>
          <div>Trạng thái</div>
          <div>Thao tác</div>
        </div>
        {currentUsers.map(user => (
          <div className="table-row" key={user.id}>
            <div>
              <strong>{user.name}</strong>
              <span>ID: {user.id}</span>
              <span>Đăng ký: {user.registered}</span>
            </div>
            <div>
              <span>{user.email}</span>
              <span>{user.phone}</span>
            </div>
            <div>
              <span className={`status ${user.status === 'active' ? 'active' : 'inactive'}`}>
                {user.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
              </span>
            </div>
            <div className="action-buttons">
              <button className="edit-btn" onClick={() => handleEdit(user)}>Sửa</button>
              <button className="delete-btn" onClick={() => handleDelete(user)}>Xóa</button>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt; Previous
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
          Next &gt;
        </button>
      </div>
    </div>
  );
}

export default UMFooter;
