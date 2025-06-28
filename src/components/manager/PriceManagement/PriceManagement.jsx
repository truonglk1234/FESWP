import { useEffect, useState } from "react";
import axios from "axios";
import "./PriceManagement.css";

const PriceManagement = () => {
  const [testingPrices, setTestingPrices] = useState([]);
  const [consultingPrices, setConsultingPrices] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:8080/api/management/prices/testing", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setTestingPrices(res.data))
      .catch(err => console.error("Lỗi tải giá xét nghiệm:", err));

    axios.get("http://localhost:8080/api/management/prices/consulting", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setConsultingPrices(res.data))
      .catch(err => console.error("Lỗi tải giá tư vấn:", err));
  }, []);

  const formatCurrency = (num) => `$ ${num.toLocaleString("vi-VN")} VNĐ`;

  return (
    <div className="pm-container">
      <h2>Quản lý giá</h2>

      <section className="pm-section">
        <h3>Giá dịch vụ xét nghiệm</h3>
        <table className="pm-table">
          <thead>
            <tr>
              <th>Dịch vụ</th>
              <th>Giá</th>
            </tr>
          </thead>
          <tbody>
            {testingPrices.map(service => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>{formatCurrency(service.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="pm-section">
        <h3>Giá dịch vụ tư vấn</h3>
        <table className="pm-table">
          <thead>
            <tr>
              <th>Tư vấn viên</th>
              <th>Giá</th>
            </tr>
          </thead>
          <tbody>
            {consultingPrices.map(consult => (
              <tr key={consult.id}>
                <td>{consult.name}</td>
                <td>{formatCurrency(consult.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default PriceManagement;
