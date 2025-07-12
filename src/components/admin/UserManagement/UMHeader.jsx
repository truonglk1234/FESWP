import React from 'react';
import './UMHeader.css';
import { UserPlus } from 'lucide-react';

const UMHeader = () => {
  return (
    <div className="um-header">
      <div className="um-header-text">
        <h2 className="um-title">Quản lý người dùng</h2>
        <p className="um-subtitle">Quản lý thông tin và hoạt động của người dùng</p>
      </div>
    </div>
  );
};

export default UMHeader;
