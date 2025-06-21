
import ConsultantLayout from '../components/ConsultantManagement/ConsultantLayout';
import ConsultingSchedule from '../components/ConsultantManagement/ConsultingSchedule/ConsultingSchedule';
import ConsultantDashboard from '../components/ConsultantManagement/Dashboard/ConsultantDashboard';
import ConsultantEvaluate from '../components/ConsultantManagement/Evaluate/ConsultantEvaluate';
import ConsultantMessage from '../components/ConsultantManagement/Message/ConsultantMessage';
import ConsultantQuestion from '../components/ConsultantManagement/Question/ConsultantQuestion';

const ConsultantManagementPage = () => {
  return (
    <ConsultantLayout>
        <ConsultantDashboard/>
        <ConsultingSchedule/>
        <ConsultantMessage/>
        <ConsultantQuestion/>
        <ConsultantEvaluate/>
    </ConsultantLayout>
  );
};

export default ConsultantManagementPage;
