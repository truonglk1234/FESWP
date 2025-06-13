import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboard from '../components/admin/dashboard/AdminDashboard';
import AdminUserManage from '../components/admin/UserManagement/AdminUserManage';
import AdminCM from '../components/admin/ConsultantManagement/AdminCM';
import AdminSM from '../components/admin/ServiceManagement/AdminSM';
import AdminBM from '../components/admin/BlogsManagement/AdminBM';

const AdminPage = () => {
  return (
    <AdminLayout>
      <AdminDashboard />
      <AdminUserManage />
      <AdminCM/>
      <AdminSM/>
      <AdminBM/>
    </AdminLayout>
  );
};

export default AdminPage;
