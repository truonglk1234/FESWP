import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboard from '../components/admin/dashboard/AdminDashboard';
import AdminUserManage from '../components/admin/UserManagement/AdminUserManage';

const AdminPage = () => {
  return (
    <AdminLayout>
      <AdminDashboard />
      <AdminUserManage />
    </AdminLayout>
  );
};

export default AdminPage;
