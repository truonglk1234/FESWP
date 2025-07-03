import React, { useEffect, useState } from 'react';
import './UserViewPage.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserViewPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:8080/api/auth/manager/customers/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!user) return <p className="uv-loading">Đang tải thông tin...</p>;

  return (
    <div className="uv-container">
      <h1>Thông tin chi tiết</h1>
      <div className="uv-info">
        <p><strong>Tên:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Số điện thoại:</strong> {user.phone}</p>
        <p><strong>Trạng thái:</strong> {user.verifiedStatus}</p>
        <p><strong>ID:</strong> {user.id}</p>
      </div>
    </div>
  );
};

export default UserViewPage;
