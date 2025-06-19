
import ConsultantLayout from '../components/ConsultantManagement/ConsultantLayout';
import ConsultantDashboard from '../components/ConsultantManagement/Dashboard/ConsultantDashboard';
import ConsultantPP from '../components/ConsultantManagement/PersonalProfile/ConsultantPP';

const ConsultantManagementPage = () => {
  return (
    <ConsultantLayout>
        <ConsultantDashboard/>
        <ConsultantPP/>
        
    </ConsultantLayout>
  );
};

export default ConsultantManagementPage;
