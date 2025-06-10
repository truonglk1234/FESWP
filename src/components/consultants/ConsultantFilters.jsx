import React from 'react';
import { SlidersHorizontal, Grid, List, User } from 'lucide-react';

const ConsultantFilters = ({
  viewMode,
  setViewMode,
  total,
  specialty,
  setSpecialty,
  location,
  setLocation,
  gender,
  setGender,
  price,
  setPrice
}) => {
  return (
    <div className="filter-container">
      <div className="filter-header">
        <div className="title"><SlidersHorizontal size={18} /> Bộ lọc & Sắp xếp</div>
        <div className="view-toggle">
          <span>Hiển thị:</span>
          <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}><Grid size={16} /></button>
          <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}><List size={16} /></button>
        </div>
      </div>
      <div className="filters">
        <div className="filter-group">
          <label><User size={14} /> Chuyên khoa</label>
          <select value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
            <option>Tất cả</option>
            <option>Sản phụ khoa</option>
            <option>Nhiễm khuẩn & HIV</option>
            <option>Nhi khoa</option>
            <option>Nam học</option>
            <option>Da liễu</option>
            <option>Tim mạch</option>
            <option>Tâm lý</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Địa điểm</label>
          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            <option>Tất cả</option>
            <option>Hà Nội</option>
            <option>TP.HCM</option>
            <option>Đà Nẵng</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Giới tính</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option>Tất cả</option>
            <option>Nam</option>
            <option>Nữ</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Mức giá</label>
          <select value={price} onChange={(e) => setPrice(e.target.value)}>
            <option>Tất cả</option>
            <option value="<400">Dưới 400K</option>
            <option value="400-500">400K - 500K</option>
            <option value=">500">Trên 500K</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Sắp xếp theo</label>
          <select><option>Đánh giá cao nhất</option></select>
        </div>
      </div>
      <div className="results-count">Tìm thấy {total} bác sĩ</div>
    </div>
  );
};

export default ConsultantFilters;