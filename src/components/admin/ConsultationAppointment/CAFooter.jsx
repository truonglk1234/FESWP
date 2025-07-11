import React from 'react';
import './CAFooter.css';
import { Video, CheckCircle, XCircle } from 'lucide-react';

const CAFooter = () => {
  return (
    <div className="ca-footer">
      <div className="ca-footer-header">
        <div>
          <h2 className="ca-footer-title">Lịch hẹn hôm nay</h2>
          <p className="ca-footer-subtitle">Danh sách 4 lịch hẹn trong ngày 20/06/2024</p>
        </div>
        <div className="ca-footer-tools">
          <input type="date" value="2024-06-20" className="ca-date-picker" />
          <button className="ca-export-btn">Xuất lịch</button>
        </div>
      </div>

      <table className="ca-table">
        <thead>
          <tr>
            <th>Thời gian</th>
            <th>Bệnh nhân</th>
            <th>Tư vấn viên</th>
            <th>Chủ đề</th>
            <th>Loại</th>
            <th>Trạng thái</th>
            <th>Ghi chú</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>09:00</strong><br />
              <span className="ca-time-sub">30 phút</span>
            </td>
            <td>
              <div className="ca-user">
                <div className="ca-avatar">NTM</div>
                Nguyễn Thị Mai
              </div>
            </td>
            <td>BS. Nguyễn Minh Anh</td>
            <td>Tư vấn sức khỏe sinh sản</td>
            <td><Video size={16} /> Online</td>
            <td><span className="ca-status done">Đã xác nhận</span></td>
            <td>Bệnh nhân có câu hỏi về chu kỳ kinh nguyệt</td>
            <td>
              <button className="ca-join-btn">
                <Video size={14} />
                <span>Tham gia</span>
              </button>
            </td>
          </tr>

          <tr>
            <td>
              <strong>10:30</strong><br />
              <span className="ca-time-sub">45 phút</span>
            </td>
            <td>
              <div className="ca-user">
                <div className="ca-avatar">TVM</div>
                Trần Văn Minh
              </div>
            </td>
            <td>BS. Lê Văn Hoàng</td>
            <td>Tư vấn nam khoa</td>
            <td><Video size={16} /> Online</td>
            <td><span className="ca-status pending">Chờ xác nhận</span></td>
            <td>Cần tư vấn về kết quả xét nghiệm</td>
            <td>
              <div className="ca-action-btns">
                <button className="ca-accept-btn"><CheckCircle size={16} /></button>
                <button className="ca-reject-btn"><XCircle size={16} /></button>
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <strong>14:00</strong><br />
              <span className="ca-time-sub">30 phút</span>
            </td>
            <td>
              <div className="ca-user">
                <div className="ca-avatar">LTH</div>
                Lê Thị Hoa
              </div>
            </td>
            <td>BS. Trần Thị Bích</td>
            <td>Tư vấn tâm lý</td>
            <td><Video size={16} /> Online</td>
            <td><span className="ca-status success">Hoàn thành</span></td>
            <td>Hoàn thành phiên tư vấn đầu tiên</td>
            <td></td>
          </tr>

          <tr>
            <td>
              <strong>15:30</strong><br />
              <span className="ca-time-sub">30 phút</span>
            </td>
            <td>
              <div className="ca-user">
                <div className="ca-avatar">PĐA</div>
                Phạm Đức Anh
              </div>
            </td>
            <td>BS. Phạm Thị Lan</td>
            <td>Tư vấn STIs</td>
            <td><Video size={16} /> Online</td>
            <td><span className="ca-status cancel">Đã huỷ</span></td>
            <td>Bệnh nhân huỷ lịch hẹn</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CAFooter;
