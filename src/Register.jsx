import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    gender: '',
    birthDate: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agree: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.agree) {
      alert("Bạn cần đồng ý với điều khoản và chính sách.");
      return;
    }
    console.log(form); // xử lý submit ở đây
  };

  return (
    <div className="register-container">
      <h2>Đăng ký tài khoản</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Nguyễn Văn A"
          value={form.fullName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="email@example.com"
          value={form.email}
          onChange={handleChange}
          required
        />

        <div className="row">
          <select name="gender" value={form.gender} onChange={handleChange} required>
            <option value="">Chọn giới tính</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>

          <input
            type="date"
            name="birthDate"
            value={form.birthDate}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="tel"
          name="phone"
          placeholder="0901234567"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Xác nhận mật khẩu"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <div className="checkbox">
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
            required
          />
          <label>
            Tôi đồng ý với <a href="#">Điều khoản sử dụng</a> và <a href="#">Chính sách bảo mật</a>
          </label>
        </div>

        <button type="submit">Đăng ký</button>
        <p>Đã có tài khoản? <a href="#">Đăng nhập</a></p>
      </form>
    </div>
  );
};

export default Register;
