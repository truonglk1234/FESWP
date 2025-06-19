
import ConsultantLayout from '../components/ConsultantManagement/ConsultantLayout';
import ConsultingSchedule from '../components/ConsultantManagement/ConsultingSchedule/ConsultingSchedule';
import ConsultantDashboard from '../components/ConsultantManagement/Dashboard/ConsultantDashboard';
import ConsultantPP from '../components/ConsultantManagement/PersonalProfile/ConsultantPP';
import ConsultantQuestion from '../components/ConsultantManagement/Question/ConsultantQuestion';

const ConsultantManagementPage = () => {
  return (
    <ConsultantLayout>
        <ConsultantDashboard/>
        <ConsultantPP/>
        <ConsultingSchedule/>
        <ConsultantQuestion/>
    </ConsultantLayout>
  );
};

export default ConsultantManagementPage;
