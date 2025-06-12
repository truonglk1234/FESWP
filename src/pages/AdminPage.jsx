import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboard from '../components/admin/dashboard/AdminDashboard';
import AdminUserManage from '../components/admin/UserManagement/AdminUserManage';
import AdminCM from '../components/admin/ConsultantManagement/AdminCM';

const AdminPage = () => {
  return (
    <AdminLayout>
      <AdminDashboard />
      <AdminUserManage />
      <AdminCM/>
    </AdminLayout>
  );
};

export default AdminPage;
