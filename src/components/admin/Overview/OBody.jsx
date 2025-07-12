import React, { useEffect, useState } from 'react';
import './OBody.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import axios from 'axios';

const OBody = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/admin/statistics/monthly')
      .then(res => {
        const responseData = res.data;

        if (Array.isArray(responseData)) {
          const transformed = responseData.map(item => ({
            name: item.month,       // "Tháng 7/2025"
            tests: item.count,      // Số lượng xét nghiệm
            consults: 0             // Hiện tại chưa có dữ liệu tư vấn
          }));
          setChartData(transformed);
        } else {
          console.error("❌ Không phải mảng hợp lệ:", responseData);
        }
      })
      .catch(err => {
        console.error("❌ Lỗi khi gọi API:", err);
      });
  }, []);

  return (
    <div className="obody-card">
      <div className="obody-header">
        <TrendingUp size={20} className="obody-icon" />
        <div>
          <h3 className="obody-title">Thống kê theo tháng</h3>
          <p className="obody-subtitle">Số lượng xét nghiệm và tư vấn trong 6 tháng qua</p>
        </div>
      </div>
      <div className="obody-chart">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="tests" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="consults" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OBody;
