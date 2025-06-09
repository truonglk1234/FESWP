import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import ConsultantIntroSection from '../components/consultants/ConsultantIntroSection';

const ConsultantPage = () => {
  return (
    <>
      <Header />
      <main>
        <ConsultantIntroSection />
        {/* Sau này có thể thêm bộ lọc, danh sách tư vấn viên ở đây */}
      </main>
      <Footer />
    </>
  );
};

export default ConsultantPage;
