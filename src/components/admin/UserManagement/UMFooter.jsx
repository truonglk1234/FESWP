import React from 'react';
import './UMFooter.css';

const users = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0123456789',
    registered: '2024-01-15',
    lastLogin: '2024-06-05',
    tuVan: 12,
    xetNghiem: 8,
    status: 'Đang hoạt động',
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'tranthib@email.com',
    phone: '0987654321',
    registered: '2024-02-20',
    lastLogin: '2024-05-28',
    tuVan: 5,
    xetNghiem: 3,
    status: 'Không hoạt động',
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'levanc@email.com',
    phone: '0345678901',
    registered: '2024-03-10',
    lastLogin: '2024-06-04',
    tuVan: 20,
    xetNghiem: 15,
    status: 'Đang hoạt động',
  },
];

export default function UMFooter() {
  return (
    <div className="page-container">
      <div className="header-row">
        <h1 className="page-title">Quản lý người dùng</h1>
        <div className="actions">
          <button className="btn btn-light">Xuất danh sách</button>
          <button className="btn btn-dark">Thêm người dùng mới</button>
        </div>
      </div>

      <div className="user-table">
        <div className="table-header">
          <span>THÔNG TIN NGƯỜI DÙNG</span>
          <span>LIÊN HỆ</span>
          <span>HOẠT ĐỘNG</span>
          <span>TRẠNG THÁI</span>
          <span>THAO TÁC</span>
        </div>

        {users.map(user => (
          <div className="table-row" key={user.id}>
            <div>
              <strong>{user.name}</strong><br />
              ID: {user.id}<br />
              Đăng ký: {user.registered}
            </div>
            <div>
              {user.email}<br />
              {user.phone}<br />
              Login cuối: {user.lastLogin}
            </div>
            <div>
              Tư vấn: <strong>{user.tuVan}</strong><br />
              Xét nghiệm: <strong>{user.xetNghiem}</strong>
            </div>
            <div>
              <span className={`status ${user.status === 'Đang hoạt động' ? 'active' : 'inactive'}`}>
                {user.status}
              </span>
            </div>
            <div>...</div>
          </div>
        ))}

        <div className="pagination">
          <button>&lt; Previous</button>
          <button className="active">1</button>
          <button>2</button>
          <button>Next &gt;</button>
        </div>
      </div>
    </div>
  );
}
