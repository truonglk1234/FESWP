import './ServicePlansSection.css';
import { TestTube2, User, HeartPulse, MessageCircle, Stethoscope } from 'lucide-react';

const services = [
  {
    icon: <TestTube2 size={24} />,
    title: 'Xét nghiệm STI toàn diện',
    description: 'Gói xét nghiệm đầy đủ các bệnh lây truyền qua đường tình dục với kết quả nhanh chóng và chính xác',
    price: '299.000đ',
    duration: '30 phút',
    features: ['HIV/AIDS', 'Giang mai (Syphilis)', 'Lậu (Gonorrhea)', 'Herpes', 'HPV']
  },
  {
    icon: <User size={24} />,
    title: 'Tư vấn bác sĩ chuyên khoa',
    description: 'Tư vấn riêng tư với bác sĩ chuyên khoa về các vấn đề sức khỏe giới tính và sinh sản',
    price: '199.000đ',
    duration: '45 phút',
    features: ['Tư vấn riêng tư', 'Bảo mật tuyệt đối', 'Bác sĩ chuyên khoa', 'Hỗ trợ 24/7']
  },
  {
    icon: <HeartPulse size={24} />,
    title: 'Theo dõi sức khỏe thông minh',
    description: 'Hệ thống AI theo dõi sức khỏe giới tính và cảnh báo sớm các vấn đề tiềm ẩn',
    price: 'Miễn phí',
    duration: 'Không giới hạn',
    features: ['Theo dõi sức khỏe', 'Cảnh báo sớm', 'Báo cáo y tế', 'Sync đa thiết bị']
  },
  {
    icon: <MessageCircle size={24} />,
    title: 'Telemedicine - Khám từ xa',
    description: 'Tư vấn trực tuyến với bác sĩ chuyên khoa qua video call, nhận chẩn đoán và đơn thuốc',
    price: '149.000đ',
    duration: '30 phút',
    features: ['Video call HD', 'Đơn thuốc điện tử', 'Chia sẻ hồ sơ y tế', 'Lưu trữ cuộc hội thoại']
  }
];

const ServicePlansSection = () => {
  return (
    <section className="plans-section">
      <div className="plans-container">
        <div className="plans-header">
          <span className="badge">Dịch vụ y tế chuyên nghiệp</span>
          <h2>Dịch vụ sức khỏe giới tính hàng đầu</h2>
          <p>Lựa chọn dịch vụ chăm sóc sức khỏe phù hợp với nhu cầu của bạn từ các gói cơ bản đến nâng cao</p>
        </div>

        <div className="plans-grid">
          {services.map((service, index) => (
            <div className="plan-card" key={index}>
              <div className="plan-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p className="plan-desc">{service.description}</p>
              <div className="plan-price">{service.price}</div>
              <div className="plan-duration">{service.duration}</div>
              <ul className="plan-features">
                {service.features.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <button className="btn-primary">Đặt lịch khám ngay</button>
            </div>
          ))}
        </div>

        {/* ✅ Nút "Xem tất cả dịch vụ y tế" */}
        <div className="plans-footer">
          <button className="btn-outline with-icon">
            Xem tất cả dịch vụ y tế <Stethoscope size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicePlansSection;
