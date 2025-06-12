import "./UserManagementHeader.css";
import { FaUserCheck, FaUserTimes } from "react-icons/fa";

const UserManagementHeader = () => {
  // Khai báo dữ liệu cứng tại đây
  const totalUsers = 4;
  const activeUsers = 2;
  const blockedUsers = 1;

  return (
    <div className="user-management">
      <div className="header-top">
        <div>
          <h1>Quản lý người dùng</h1>
          <p>Quản lý tài khoản khách hàng</p>
        </div>
        <div className="actions">
          <button className="export-btn">Xuất danh sách</button>
          <button className="add-btn">+ Thêm người dùng mới</button>
        </div>
      </div>

      <div className="stats">
        <div className="stat-box">
          <div className="stat-title">Tổng người dùng</div>
          <div className="stat-number">{totalUsers}</div>
        </div>

        <div className="stat-box">
          <div className="stat-title">Đang hoạt động</div>
          <div className="stat-number green">{activeUsers}</div>
          <div className="stat-icon"><FaUserCheck color="green" /></div>
        </div>

        <div className="stat-box">
          <div className="stat-title">Bị khóa</div>
          <div className="stat-number red">{blockedUsers}</div>
          <div className="stat-icon"><FaUserTimes color="red" /></div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementHeader;
