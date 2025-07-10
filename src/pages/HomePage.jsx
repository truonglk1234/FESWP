import Header from '../components/header/Header'; 
import Footer from '../components/footer/Footer';
import HeroSection from '../components/hero/HeroSection';
import WhyChooseSection from '../components/why/WhyChooseSection';
import ServicePlansSection from '../components/servicePlans/ServicePlansSection';
import ConsultantPlansSection from '../components/consultantPlans/ConsultantPlansSection';
import HomeBlogIntroSection from '../components/blogs/HomeBlogIntroSection';

const HomePage = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <WhyChooseSection />
      <ServicePlansSection />
      <ConsultantPlansSection />
      <HomeBlogIntroSection />
      <Footer />
    </>
  );
};

export default HomePage;
