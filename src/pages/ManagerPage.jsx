import ManagerLayout from '../components/manager/ManagerLayout';
import ManagerDashboard from '../components/manager/dashboard/ManagerDashboard';
import ManagerUserManage from '../components/manager/UserManagement/ManagerUserManage';
import ManagerCM from '../components/manager/ConsultantManagement/ManagerCM';
import ManagerSM from '../components/manager/ServiceManagement/ManagerSM';
import ManagerBM from '../components/manager/BlogsManagement/ManagerBM';
import ManagerFM from '../components/manager/FeedbackManagement/ManagerFM';
import ManagerQA from '../components/manager/Q&AManagement/ManagerQA';

const ManagerPage = () => {
  return (
    <ManagerLayout>
      <ManagerDashboard />
      <ManagerUserManage />
      <ManagerCM />
      <ManagerSM />
      <ManagerBM />
      <ManagerFM />
      <ManagerQA />
    </ManagerLayout>
  );
};

export default ManagerPage;
