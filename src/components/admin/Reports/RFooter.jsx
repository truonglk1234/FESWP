import './RFooter.css';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

const lineData = [
  { name: 'T1', users: 320, tests: 420, consults: 430 },
  { name: 'T2', users: 350, tests: 380, consults: 470 },
  { name: 'T3', users: 390, tests: 410, consults: 510 },
  { name: 'T4', users: 410, tests: 400, consults: 580 },
  { name: 'T5', users: 440, tests: 370, consults: 630 },
  { name: 'T6', users: 470, tests: 360, consults: 690 },
];

const pieData = [
  { name: 'HIV', value: 35 },
  { name: 'Giang mai', value: 25 },
  { name: 'HPV', value: 20 },
  { name: 'Lậu', value: 12 },
  { name: 'Chlamydia', value: 8 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const RFooter = () => {
  return (
    <div className="rfooter-container">
      <div className="rfooter-top">
        <div className="rfooter-tabs">
          <button className="active">Tổng quan</button>
          <button>Doanh thu</button>
          <button>Dịch vụ</button>
          <button>Hiệu suất</button>
        </div>
        <div className="rfooter-chart">
          <h3>📈 Xu hướng hoạt động 6 tháng qua</h3>
          <p>Theo dõi số lượng người dùng, xét nghiệm và tư vấn</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="tests" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="consults" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rfooter-bottom">
        <div className="rfooter-pie">
          <h3>🧪 Phân bố loại xét nghiệm</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rfooter-stats">
          <h3>Thống kê nhanh</h3>
          <ul>
            <li>
              <span>Tỷ lệ hài lòng</span>
              <span className="success">94%</span>
            </li>
            <li>
              <span>Thời gian phản hồi TB</span>
              <span className="info">2.5h</span>
            </li>
            <li>
              <span>Tỷ lệ tái khám</span>
              <span className="purple">68%</span>
            </li>
            <li>
              <span>Đánh giá trung bình</span>
              <span className="warning">4.7/5</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RFooter;
