import React from 'react';
import './TermsAndPrivacy.css';

const TermsAndPrivacy = () => {
  return (
    <div className="terms-container">
      <h1>Điều khoản & Chính sách bảo mật</h1>

      <section>
        <h2>1. Điều khoản sử dụng</h2>
        <p>
          Việc sử dụng nền tảng STI Health đồng nghĩa với việc bạn đồng ý tuân thủ tất cả các điều khoản dưới đây.
          Bạn phải đảm bảo thông tin cung cấp là chính xác, không giả mạo danh tính hoặc sử dụng tài khoản người khác.
        </p>
        <p>
          Người dùng cam kết không sử dụng nền tảng vào bất kỳ mục đích bất hợp pháp, gian lận hoặc gây ảnh hưởng tiêu cực
          đến hệ thống hoặc người dùng khác.
        </p>
        <p>
          STI Health có quyền tạm ngưng hoặc chấm dứt quyền truy cập của bạn nếu vi phạm các điều khoản dịch vụ.
        </p>
      </section>

      <section>
        <h2>2. Chính sách bảo mật</h2>
        <p>
          STI Health cam kết bảo vệ thông tin cá nhân của bạn một cách nghiêm ngặt. Mọi thông tin như tên, số điện thoại, email,
          ngày sinh, thông tin tư vấn và lịch sử xét nghiệm sẽ được mã hóa và lưu trữ an toàn.
        </p>
        <ul>
          <li>Thông tin cá nhân chỉ được thu thập khi bạn đăng ký hoặc sử dụng dịch vụ.</li>
          <li>Chúng tôi không chia sẻ dữ liệu với bên thứ ba nếu không có sự đồng ý từ bạn.</li>
          <li>STI Health sử dụng công nghệ bảo mật như HTTPS, xác thực hai lớp, và mã hóa dữ liệu.</li>
        </ul>
        <p>
          Trong trường hợp pháp luật yêu cầu, chúng tôi có thể cung cấp dữ liệu cho cơ quan chức năng, nhưng luôn theo quy trình giám sát nghiêm ngặt.
        </p>
      </section>

      <section>
        <h2>3. Quyền và trách nhiệm của người dùng</h2>
        <p>
          Người dùng có quyền truy cập, chỉnh sửa, yêu cầu xóa hoặc phản hồi về dữ liệu cá nhân đã cung cấp trên nền tảng.
          Bạn cũng có trách nhiệm bảo vệ thông tin đăng nhập và không chia sẻ tài khoản với người khác.
        </p>
        <p>
          Bất kỳ hành vi lạm dụng, phát tán nội dung phản cảm, hoặc tấn công hệ thống đều sẽ bị xử lý nghiêm theo quy định pháp luật.
        </p>
      </section>

      <section>
        <h2>4. Cookie & theo dõi hành vi</h2>
        <p>
          Chúng tôi có thể sử dụng cookie và các công nghệ tương tự để thu thập thông tin duyệt web nhằm cải thiện trải nghiệm người dùng.
          Cookie không lưu trữ dữ liệu cá nhân mà chỉ ghi nhận các hành vi như: số lượt truy cập, thiết bị sử dụng, vùng địa lý,...
        </p>
        <p>
          Bạn có thể tắt cookie trong trình duyệt nhưng có thể ảnh hưởng đến một số chức năng của hệ thống.
        </p>
      </section>

      <section>
        <h2>5. Thay đổi điều khoản & chính sách</h2>
        <p>
          STI Health có thể cập nhật nội dung Điều khoản và Chính sách mà không cần thông báo trước. Khi có thay đổi lớn, hệ thống sẽ gửi email hoặc hiển thị thông báo tại trang chủ.
        </p>
        <p>
          Việc bạn tiếp tục sử dụng nền tảng sau khi điều khoản được cập nhật được xem là đồng ý với các nội dung mới.
        </p>
      </section>

      <section>
        <h2>6. Liên hệ</h2>
        <p>
          Nếu bạn có bất kỳ câu hỏi, yêu cầu hỗ trợ hoặc phản hồi nào về chính sách bảo mật và điều khoản sử dụng, vui lòng liên hệ:
        </p>
        <ul>
          <li>Email: <a href="mailto:support@stihealth.vn">support@stihealth.vn</a></li>
          <li>Hotline hỗ trợ: 1900-1234</li>
          <li>Địa chỉ: 123 Nguyễn Du, Quận 1, TP. Hồ Chí Minh</li>
        </ul>
      </section>
    </div>
  );
};

export default TermsAndPrivacy;
