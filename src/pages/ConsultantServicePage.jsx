import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import ConsultantIntroSection from '../components/consultantPlans/ConsultantIntroSection';
import ConsultantContent from '../components/consultantPlans/ConsultantContent';

const ConsultingServicePage = () => {
  return (
    <>
      <Header />
      <ConsultantIntroSection />
      <ConsultantContent />
      <Footer />
    </>
  );
};

export default ConsultingServicePage;
