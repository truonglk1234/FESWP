import MedicalBlog from '../components/staff/Blog/MedicalBlog';
import StaffHome from '../components/staff/Home/StaffHome';
import TestResults from '../components/staff/Result/TestResults';
import TestSchedule from '../components/staff/Schedule/TestSchedule';
import MedicalServices from '../components/staff/Service/MedicalServices';
import StaffLayout from '../components/staff/StaffLayout';

const StaffPage = () => {
  return (
    <StaffLayout>
        <StaffHome/>
        <TestSchedule/>
        <TestResults/>
        <MedicalServices/>
        <MedicalBlog/>
    </StaffLayout>
  );
};

export default StaffPage;
