
import ConsultantLayout from '../components/ConsultantManagement/ConsultantLayout';
import ConsultingSchedule from '../components/ConsultantManagement/ConsultingSchedule/ConsultingSchedule';
import ConsultantDashboard from '../components/ConsultantManagement/Dashboard/ConsultantDashboard';
import ConsultantPP from '../components/ConsultantManagement/PersonalProfile/ConsultantPP';

const ConsultantManagementPage = () => {
  return (
    <ConsultantLayout>
        <ConsultantDashboard/>
        <ConsultantPP/>
        <ConsultingSchedule/>
    </ConsultantLayout>
  );
};

export default ConsultantManagementPage;
