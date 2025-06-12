import React from "react";
import "./UMFooter.css";

const users = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    phone: "0123456789",
    registered: "2024-01-15",
    lastLogin: "2024-06-05",
    tuVan: 12,
    xetNghiem: 8,
    status: "active",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@email.com",
    phone: "0987654321",
    registered: "2024-02-20",
    lastLogin: "2024-05-28",
    tuVan: 5,
    xetNghiem: 3,
    status: "inactive",
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "levanc@email.com",
    phone: "0345678901",
    registered: "2024-03-10",
    lastLogin: "2024-06-04",
    tuVan: 20,
    xetNghiem: 15,
    status: "active",
  },
];

export default function UMFooter() {
  return (
    <div className="user-page">
      <h2 className="title">Danh sách người dùng (4)</h2>

      <div className="user-table">
        <div className="table-head">
          <div>THÔNG TIN NGƯỞI DÙNG</div>
          <div>LIÊN HỆ</div>
          <div>HOẠT ĐỘNG</div>
          <div>TRẠNG THÁI</div>
          <div>THAO TÁC</div>
        </div>

        {users.map((user) => (
          <div className="table-row" key={user.id}>
            <div>
              <strong>{user.name}</strong>
              <div>ID: {user.id}</div>
              <div>Đăng ký: {user.registered}</div>
            </div>
            <div>
              <div>{user.email}</div>
              <div>{user.phone}</div>
              <div>Login cuối: {user.lastLogin}</div>
            </div>
            <div>
              <div>Tư vấn: <strong>{user.tuVan}</strong></div>
              <div>Xét nghiệm: <strong>{user.xetNghiem}</strong></div>
            </div>
            <div>
              <span className={`status ${user.status}`}>
                {user.status === "active" ? "Đang hoạt động" : "Không hoạt động"}
              </span>
            </div>
            <div className="dots">...</div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button>{"<"} Previous</button>
        <button className="active">1</button>
        <button>2</button>
        <button>Next {">"}</button>
      </div>
    </div>
  );
}
