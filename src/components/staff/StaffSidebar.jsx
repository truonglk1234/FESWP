import { Home, Calendar, FileText, Stethoscope, BookOpen, LogOut, UserPlus } from 'lucide-react';
import './StaffSidebar.css';
import { Link } from 'react-router-dom';

export const StaffSidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-header">
          <Link to="/" className="logo-link">
            <div className="logo-square"><UserPlus className="icon-white" /></div>
            <div className="logo-text-group">
              <h1 className="sidebar-title">Theo dõi xét nghiệm</h1>
              <p className="sidebar-subtitle">Nhân viên y tế</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="sidebar-middle">
        <p className="nav-label">Menu chính</p>
        <ul>
          <li><Link to="/staff" className="nav-link"><Home /> Trang chủ</Link></li>
          <li><Link to="/staff/schedule" className="nav-link"><Calendar /> Lịch xét nghiệm</Link></li>
          <li><Link to="/staff/results" className="nav-link"><FileText /> Kết quả xét nghiệm</Link></li>
          <li><Link to="/staff/services" className="nav-link"><Stethoscope /> Dịch vụ y tế</Link></li>
          <li><Link to="/staff/blogs" className="nav-link"><BookOpen /> Blog Y Tế</Link></li>
        </ul>
      </div>

      <div className="sidebar-footer">
        <Link to="/logout" className="nav-link"><LogOut /> Đăng xuất</Link>
      </div>
    </aside>
  );
};
