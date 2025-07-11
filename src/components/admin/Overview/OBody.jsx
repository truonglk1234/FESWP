import React from 'react';
import './OBody.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { TrendingUp } from 'lucide-react';

const data = [
  { name: 'T1', tests: 500, consults: 320 },
  { name: 'T2', tests: 530, consults: 380 },
  { name: 'T3', tests: 580, consults: 410 },
  { name: 'T4', tests: 610, consults: 390 },
  { name: 'T5', tests: 650, consults: 450 },
  { name: 'T6', tests: 700, consults: 500 },
];

const OBody = () => {
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
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
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
