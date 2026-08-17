import LegalLayout, { type LegalPageData } from "@/app/legal/components/legal-layout";

const data: LegalPageData = {
  title: "Chính sách bảo mật",
  subtitle:
    "Kepler cam kết bảo vệ thông tin cá nhân của người dùng, đảm bảo tính bảo mật và an toàn dữ liệu theo các quy định pháp luật hiện hành.",
  lastUpdated: "01/08/2026",
  icon: "ShieldCheck",
  relatedLinks: [
    { label: "Điều khoản sử dụng", href: "/dieu-khoan-su-dung" },
    { label: "Chính sách Cookie", href: "/chinh-sach-cookie" },
  ],
  sections: [
    {
      id: "muc-dich",
      title: "1. Mục đích và phạm vi",
      body: [
        "Chính sách bảo mật này giải thích cách Kepler thu thập, sử dụng, chia sẻ và bảo vệ thông tin cá nhân của bạn khi bạn truy cập website hoặc sử dụng các dịch vụ của chúng tôi.",
        "Thông tin cá nhân bao gồm: họ tên, địa chỉ email, số điện thoại, địa chỉ, thông tin doanh nghiệp và bất kỳ dữ liệu nào bạn cung cấp khi đăng ký, liên hệ hoặc sử dụng dịch vụ.",
        "Bằng chấp nhận chính sách này, bạn đồng ý với các điều khoản được trình bày dưới đây.",
      ],
    },
    {
      id: "thu-thap",
      title: "2. Thông tin chúng tôi thu thập",
      body: [
        "Chúng tôi thu thập thông tin bạn cung cấp trực tiếp khi điền form liên hệ, đăng ký nhận tin tức, hoặc gửi yêu cầu tư vấn.",
        "Thông tin tự động thu thập bao gồm: địa chỉ IP, loại trình duyệt, thiết bị, thời gian truy cập, và các trang bạn đã xem. Thông tin này giúp chúng tôi cải thiện trải nghiệm người dùng.",
        "Chúng tôi không thu thập thông tin nhạy cảm như thông tin tài khoản ngân hàng qua website, trừ khi được yêu cầu theo quy định pháp luật.",
      ],
    },
    {
      id: "su-dung",
      title: "3. Mục đích sử dụng thông tin",
      body: [
        "Thông tin cá nhân được sử dụng để: phản hồi yêu cầu của bạn, cung cấp dịch vụ tư vấn, gửi thông báo về sản phẩm dịch vụ, và cải thiện nội dung website.",
        "Chúng tôi có thể sử dụng thông tin để phân tích hành vi người dùng nhằm tối ưu hóa trải nghiệm và phát triển tính năng mới.",
        "Chúng tôi không bán hoặc cho thuê thông tin cá nhân của bạn cho bên thứ ba với mục đích thương mại.",
      ],
    },
    {
      id: "chia-se",
      title: "4. Chia sẻ thông tin với bên thứ ba",
      body: [
        "Chúng tôi chỉ chia sẻ thông tin cá nhân khi: được sự đồng ý của bạn, yêu cầu theo quy định pháp luật, hoặc cần thiết để bảo vệ quyền lợi của Kepler.",
        "Các nhà cung cấp dịch vụ thứ ba (hosting, phân tích dữ liệu) có thể truy cập dữ liệu trong phạm vi cung cấp dịch vụ và bị ràng buộc bởi nghĩa vụ bảo mật.",
        "Trong trường hợp sáp nhập hoặc chuyển nhượng doanh nghiệp, thông tin cá nhân sẽ được chuyển giao theo các quy định pháp luật áp dụng.",
      ],
    },
    {
      id: "bao-ve",
      title: "5. Biện pháp bảo vệ dữ liệu",
      body: [
        "Kepler áp dụng các biện pháp kỹ thuật và tổ chức để bảo vệ thông tin cá nhân khỏi truy cập trái phép, mất mát hoặc tiết lộ.",
        "Các biện pháp bao gồm: mã hóa dữ liệu (SSL/TLS), giới hạn quyền truy cập nội bộ, hệ thống giám sát xâm nhập, và kiểm tra định kỳ.",
        "Tuy nhiên, không có phương thức truyền tải qua Internet hoặc lưu trữ điện tử nào được 100% an toàn. Chúng tôi không thể đảm bảo bất khể hổng bảo mật tuyệt đối.",
      ],
    },
    {
      id: "quyen",
      title: "6. Quyền của bạn",
      body: [
        "Bạn có quyền truy cập, chỉnh sửa, hoặc xóa thông tin cá nhân của mình bất kỳ lúc nào bằng cách liên hệ trực tiếp với Kepler.",
        "Bạn có thể từ chối nhận email marketing bằng cách nhấn nút hủy đăng ký trong mỗi email hoặc liên hệ với chúng tôi.",
        "Theo Luật Bảo vệ dữ liệu cá nhân 2023, bạn có quyền khiếu nại lên cơ quan thẩm quyền nếu cho rằng dữ liệu cá nhân của mình bị xử lý sai pháp luật.",
      ],
    },
    {
      id: "luu-tru",
      title: "7. Thời gian lưu trữ dữ liệu",
      body: [
        "Chúng tôi chỉ lưu trữ thông tin cá nhân trong thời gian cần thiết để đáp ứng mục đích thu thập hoặc theo yêu cầu của pháp luật.",
        "Thông tin không còn cần thiết sẽ được xóa hoặc ẩn danh tính danh một cách an toàn.",
        "Dữ liệu pháp lý, kế toán có thể được lưu trữ lâu hơn theo quy định của cơ quan thuế và pháp luật.",
      ],
    },
    {
      id: "cap-nhat",
      title: "8. Cập nhật chính sách",
      body: [
        "Kepler có thể cập nhật chính sách bảo mật này bất kỳ lúc nào. Phiên bản mới sẽ được đăng tải trên trang này với ngày cập nhật gần nhất.",
        "Chúng tôi khuyến khích bạn xem xét chính sách này định kỳ để nhận thức các thay đổi.",
        "Trong trường hợp có thay đổi lớn, chúng tôi sẽ thông báo qua email hoặc thông báo nổi bật trên website.",
      ],
    },
    {
      id: "lien-he",
      title: "9. Thông tin liên hệ",
      body: [
        "Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu nào liên quan đến chính sách bảo mật, vui lòng liên hệ:",
        "Kepler Group — Email: info@kepler.com.vn — Điện thoại: (+84) 28 XXXX XXXX — Địa chỉ: [địa chỉ Kepler].",
        "Chúng tôi cam kết phản hồi yêu cầu của bạn trong vòng 72 giờ làm việc.",
      ],
    },
  ],
};

export default function PrivacyPolicyPage() {
  return <LegalLayout data={data} />;
}
