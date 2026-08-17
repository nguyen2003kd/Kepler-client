import LegalLayout, { type LegalPageData } from "@/app/legal/components/legal-layout";

const data: LegalPageData = {
  title: "Chính sách Cookie",
  subtitle:
    "Kepler sử dụng cookie để cải thiện trải nghiệm người dùng. Chính sách này giải thích loại cookie chúng tôi sử dụng và cách bạn quản lý chúng.",
  lastUpdated: "01/08/2026",
  icon: "Cookie",
  relatedLinks: [
    { label: "Chính sách bảo mật", href: "/chinh-sach-bao-mat" },
    { label: "Điều khoản sử dụng", href: "/dieu-khoan-su-dung" },
  ],
  sections: [
    {
      id: "cookie-la-gi",
      title: "1. Cookie là gì?",
      body: [
        "Cookie là các tập tin nhỏ được website lưu trên trình duyệt của bạn. Cookie giúp website nhớ thông tin về bước truy cập của bạn, giảm thiểu việc nhập lại dữ liệu.",
        "Cookie không phải là virus, không thể phép truy cập thông tin cá nhân trên máy tính của bạn, và không làm ảnh hưởng đến hiệu năng thiết bị.",
        "Mỗi cookie chứa: tên, giá trị, thời hạn, và domain mà nó thuộc về.",
      ],
    },
    {
      id: "loai-cookie",
      title: "2. Các loại cookie Kepler sử dụng",
      body: [
        "Cookie bắt buộc: Cần thiết để website hoạt động bình thường. Không thể từ chối cookie này mà website vẫn hoạt động được.",
        "Cookie phân tích: Giúp Kepler hiểu cách người dùng tương tác với website, từ đó cải thiện nội dung và tính năng. Dữ liệu lưu trữ là danh danh, không liên kết đến cá nhân.",
        "Cookie chức năng: Nhớ lựa chọn của bạn như ngôn ngữ, kiểu xem, để không phải chọn lại mỗi lần truy cập.",
        "Cookie quảng cáo/third-party: Cung cấp bởi các đối tác quảng cáo hoặc phân tích. Kepler chỉ sử dụng khi cần thiết và luôn tuân thủ chính sách bảo mật.",
      ],
    },
    {
      id: "muc-dich",
      title: "3. Mục đích sử dụng cookie",
      body: [
        "Nhớ thông tin đăng nhập để bạn không phải nhập lại mỗi lần truy cập.",
        "Lưu trữ tùy chọn người dùng như ngôn ngữ, chế độ xem, kiểu hiển thị.",
        "Phân tích lượng truy cập và hành vi người dùng để cải thiện trải nghiệm và nội dung.",
        "Hiển thị quảng cáo phù hợp với sự quan tâm của người dùng.",
      ],
    },
    {
      id: "quan-ly",
      title: "4. Cách bạn quản lý cookie",
      body: [
        "Bạn có thể chấp nhận hoặc từ chối cookie thông qua banner thông báo cookie lần đầu truy cập website.",
        "Bạn có thể xóa cookie đã lưu trong trình duyệt bất kỳ lúc nào thông qua cài đặt riêng tư của mỗi trình duyệt.",
        "Việc từ chối cookie có thể ảnh hưởng đến một số tính năng của website như: đăng nhập, lưu tùy chọn, hoặc hiển thị nội dung phù hợp.",
        "Để quản lý cookie chi tiết, bạn có thể cài đặt phần mở rộng 'Do Not Track' hoặc sử dụng chế độ duyệt ẩn danh của trình duyệt.",
      ],
    },
    {
      id: "thoi-han",
      title: "5. Thời hạn lưu trữ cookie",
      body: [
        "Cookie phiên (session cookie): Tự động xóa khi bạn đóng trình duyệt. Không lưu trữ thông tin qua các bước truy cập.",
        "Cookie lưu trữ (persistent cookie): Lưu lại trên trình duyệt trong một khoảng thời gian nhất định (từ vài ngày đến vài năm) hoặc cho đến khi bạn xóa thủ công.",
        "Kepler chỉ lưu cookie lưu trữ khi cần thiết để cải thiện trải nghiệm người dùng. Thời hạn lưu trữ được đặt phù hợp với mục đích sử dụng.",
      ],
    },
    {
      id: "third-party",
      title: "6. Cookie thứ ba",
      body: [
        "Kepler có thể sử dụng cookie của các dịch vụ phân tích như Google Analytics để hiểu cách người dùng tương tác với website.",
        "Các dịch vụ này có chính sách riêng về việc sử dụng dữ liệu. Kepler không kiểm soát hoặc chịu trách nhiệm về cách thứ ba xử lý dữ liệu cookie.",
        "Chúng tôi khuyến khích bạn đọc chính sách bảo mật của các dịch vụ thứ ba để hiểu rõ hơn về cách dữ liệu của bạn được sử dụng.",
      ],
    },
    {
      id: "cap-nhat",
      title: "7. Cập nhật chính sách cookie",
      body: [
        "Kepler có thể cập nhật chính sách cookie này bất kỳ lúc nào để phản ánh thay đổi trong công nghệ, pháp luật hoặc thực hành kinh doanh.",
        "Phiên bản cập nhật sẽ được đăng tải trên trang này với ngày cập nhật gần nhất.",
        "Nếu có thay đổi lớn về cách sử dụng cookie, chúng tôi sẽ hiển thị banner thông báo cookie mỗi khi bạn truy cập.",
      ],
    },
    {
      id: "lien-he",
      title: "8. Thông tin liên hệ",
      body: [
        "Nếu bạn có câu hỏi về chính sách cookie, vui lòng liên hệ:",
        "Kepler Group — Email: info@kepler.com.vn — Điện thoại: (+84) 28 XXXX XXXX.",
        "Chúng tôi sẽ phản hồi yêu cầu của bạn trong vòng 72 giờ làm việc.",
      ],
    },
  ],
};

export default function CookiePolicyPage() {
  return <LegalLayout data={data} />;
}
