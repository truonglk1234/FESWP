import './MSHeader.css';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MSHeader = () => {
  const navigate = useNavigate();

  const handleAddService = () => {
    navigate('/staff/services/create');
  };

  return (
    <div className="ms-header-container">
      <div className="ms-header-bar">
        <h2>
          Danh sách dịch vụ y tế
        </h2>
        <button className="ms-add-btn" onClick={handleAddService}>
          <Plus size={16} /> Thêm dịch vụ
        </button>
      </div>
      <p className="ms-subtitle">Quản lý các dịch vụ xét nghiệm được giao</p>
    </div>
  );
};

export default MSHeader;
  