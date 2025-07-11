import React from 'react';
import './UMFooter.css';
import { Filter, Search, MoreHorizontal } from 'lucide-react';

const users = [
  {
    initials: 'NTM',
    name: 'Nguyễn Thị Mai',
    id: 'USR001',
    email: 'mai.nguyen@email.com',
    phone: '0987654321',
    joinDate: '15/03/2024',
    status: 'Hoạt động',
    lastAccess: '2 ngày trước',
    tests: 3,
    consults: 5,
  },
  {
    initials: 'TVM',
    name: 'Trần Văn Minh',
    id: 'USR002',
    email: 'minh.tran@email.com',
    phone: '0912345678',
    joinDate: '10/03/2024',
    status: 'Hoạt động',
    lastAccess: '1 tuần trước',
    tests: 1,
    consults: 2,
  },
  {
    initials: 'LTH',
    name: 'Lê Thị Hoa',
    id: 'USR003',
    email: 'hoa.le@email.com',
    phone: '0908765432',
    joinDate: '05/03/2024',
    status: 'Không hoạt động',
    lastAccess: '1 tháng trước',
    tests: 2,
    consults: 1,
  },
  {
    initials: 'PĐA',
    name: 'Phạm Đức Anh',
    id: 'USR004',
    email: 'anh.pham@email.com',
    phone: '0976543210',
    joinDate: '28/02/2024',
    status: 'Hoạt động',
    lastAccess: '5 ngày trước',
    tests: 4,
    consults: 8,
  },
];

const UMFooter = () => {
  return (
    <div className="um-footer">
      <div className="um-footer-header">
        <div>
          <h3 className="um-footer-title">Danh sách người dùng</h3>
          <p className="um-footer-subtitle">Tổng số {users.length} người dùng đã đăng ký</p>
        </div>
        <div className="um-footer-tools">
          <div className="um-search-box">
            <Search size={16} />
            <input type="text" placeholder="Tìm kiếm người dùng..." />
          </div>
          <button className="um-filter-btn">
            <Filter size={16} /> Lọc
          </button>
        </div>
      </div>

      <table className="um-user-table">
        <thead>
          <tr>
            <th>Người dùng</th>
            <th>Liên hệ</th>
            <th>Ngày tham gia</th>
            <th>Trạng thái</th>
            <th>Lần cuối truy cập</th>
            <th>Hoạt động</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr key={index}>
              <td>
                <div className="um-user-info">
                  <span className="um-user-initials">{u.initials}</span>
                  <div>
                    <p className="um-user-name">{u.name}</p>
                    <p className="um-user-id">{u.id}</p>
                  </div>
                </div>
              </td>
              <td>
                <p>{u.email}</p>
                <p>{u.phone}</p>
              </td>
              <td>{u.joinDate}</td>
              <td>
                <span className={`um-status ${u.status === 'Hoạt động' ? 'active' : 'inactive'}`}>
                  {u.status}
                </span>
              </td>
              <td>{u.lastAccess}</td>
              <td>
                {u.tests} xét nghiệm<br />{u.consults} tư vấn
              </td>
              <td><MoreHorizontal size={18} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UMFooter;
