import { Outlet } from 'react-router-dom';
import { StaffSidebar } from './StaffSidebar';
import './StaffLayout.css';

const StaffLayout = () => {
  return (
    <div className="sl-layout">
      <StaffSidebar />
      <main className="sl-content">
        <Outlet /> 
      </main>
    </div>
  );
};

export default StaffLayout;
