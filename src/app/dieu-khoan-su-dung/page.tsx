import LegalLayout, { type LegalPageData } from "@/app/legal/components/legal-layout";

const data: LegalPageData = {
  title: "Điều khoản sử dụng",
  subtitle:
    "Các điều khoản và điều kiện sử dụng website và dịch vụ của Kepler. Vui lòng đọc kỹ trước khi sử dụng.",
  lastUpdated: "01/08/2026",
  icon: "ScrollText",
  relatedLinks: [
    { label: "Chính sách bảo mật", href: "/chinh-sach-bao-mat" },
    { label: "Chính sách Cookie", href: "/chinh-sach-cookie" },
  ],
  sections: [
    {
      id: "chap-nhan",
      title: "1. Chấp nhận điều khoản",
      body: [
        "Bằng việc truy cập và sử dụng website kepler.com.vn, bạn chấp nhận rằng bạn đã đọc, hiểu và đồng ý với tất cả các điều khoản được trình bày trong tài liệu này.",
        "Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng không sử dụng website hoặc dịch vụ của Kepler.",
        "Kepler có thể cập nhật điều khoản này bất kỳ lúc nào. Việc bạn tiếp tục sử dụng website sau khi cập nhật đồng nghĩa với việc chấp nhận điều khoản mới.",
      ],
    },
    {
      id: "dinh-nghia",
      title: "2. Định nghĩa",
      body: [
        "'Website' là trang web kepler.com.vn và tất cả các trang con, tính năng thuộc Kepler Group.",
        "'Người dùng' là bất kỳ cá nhân hoặc tổ chức nào truy cập, sử dụng website hoặc dịch vụ của Kepler.",
        "'Nội dung' bao gồm tất cả bài viết, hình ảnh, video, tài liệu, dữ liệu và thông tin hiển thị trên website.",
        "'Dịch vụ' là các sản phẩm, tính năng và công cụ mà Kepler cung cấp cho người dùng.",
      ],
    },
    {
      id: "su-dung",
      title: "3. Điều kiện sử dụng",
      body: [
        "Bạn chỉ được sử dụng website cho mục đích hợp pháp, bao gồm: xem thông tin, liên hệ tư vấn, đăng ký nhận tin tức.",
        "Bạn không được: sao chép, phân phối, hoặc sử dụng nội dung cho mục đích thương mại mà không được sự đồng ý của Kepler.",
        "Cấm hành vi: tấn công, gây gián đoạn hệ thống, gửi Spam, lan nhập dữ liệu, hoặc sử dụng bot tự động để thu thập thông tin.",
        "Bạn chịu trách nhiệm về tính chính xác của thông tin mình cung cấp khi đăng ký hoặc liên hệ.",
      ],
    },
    {
      id: "quyen-so-huu",
      title: "4. Quyền sở hữu trí tuệ",
      body: [
        "Tất cả nội dung trên website bao gồm: logo, bài viết, hình ảnh, thiết kế, mã nguồn — thuộc quyền sở hữu của Kepler hoặc các đối tác cấp phép.",
        "Bạn không được sao chép, sửa đổi, phân phối hoặc sử dụng nội dung cho mục đích thương mại mà không có sự phép của Kepler.",
        "Kepler giữ mọi quyền đối với tên thương hiệu, logo, slogan và bất kỳ dấu hiệu thương mại nào liên quan.",
        "Bất kỳ vi phạm nào về quyền sở hữu trí tuệ sẽ bị xử lý theo pháp luật hiện hành.",
      ],
    },
    {
      id: "trach-nhiem",
      title: "5. Giới hạn trách nhiệm",
      body: [
        "Website và nội dung được cung cấp 'nguyên trạng' mà không có bất kỳ bảo nào về tính chính xác, đầy đủ hoặc phù hợp với mục đích cụ thể.",
        "Kepler không chịu trách nhiệm về bất kỳ thiết hại trực tiếp, gián tiếp, phát sinh hoặc mất mát dữ liệu nào phát sinh từ việc sử dụng hoặc không thể sử dụng website.",
        "Kepler không đảm bảo website hoạt động liên tục, không lỗi hoặc miễn nhiễm virus. Bạn chấp nhận rủi ro khi sử dụng.",
        "Thông tin trên website có thể chứa sai sót hoặc không còn phù hợp với thực tế. Kepler có thể cập nhật bất kỳ lúc nào mà không cần báo trước.",
      ],
    },
    {
      id: "lien-ket",
      title: "6. Liên kết website thứ ba",
      body: [
        "Website có thể chứa các liên kết đến website thứ ba. Kepler không kiểm soát và không chịu trách nhiệm về nội dung hoặc chính sách của các website này.",
        "Việc bạn truy cập website thứ ba thông qua liên kết từ Kepler là tại nguy rủi của bạn.",
        "Kepler không xác nhận hoặc đảm bảo tính chính xác của thông tin trên các website thứ ba.",
      ],
    },
    {
      id: "thanh-toan",
      title: "7. Dịch vụ thanh toán",
      body: [
        "Nếu bạn sử dụng dịch vụ thanh toán, bạn đồng ý chỉ sử dụng thông tin thẻ tín dụng hoặc tài khoản ngân hàng thuộc quyền sở hữu của bạn.",
        "Mọi giao dịch chịu áp dụng các điều khoản của nhà cung cấp thanh toán và ngân hàng phát hành thẻ.",
        "Kepler không lưu trữ thông tin thẻ tín dụng của bạn. Tất cả giao dịch được xử lý qua cổng thanh toán an toàn.",
        "Bạn chịu trách nhiệm bảo mật thông tin đăng nhập tài khoản của mình.",
      ],
    },
    {
      id: "huy-bo",
      title: "8. Hủy bỏ dịch vụ",
      body: [
        "Bạn có thể hủy sử dụng dịch vụ bất kỳ lúc nào bằng cách ngừng truy cập website hoặc liên hệ yêu cầu hủy đăng ký.",
        "Kepler có thể ngừng hoặc giới hạn truy cập của bạn nếu phát hiện vi phạm điều khoản sử dụng.",
        "Trong trường hợp Kepler ngừng hoạt động website, thông báo trước sẽ được gửi đến người dùng.",
      ],
    },
    {
      id: "phap-luat",
      title: "9. Pháp luật áp dụng và giải quyết tranh chấp",
      body: [
        "Điều khoản sử dụng này chịu áp dụng pháp luật Việt Nam.",
        "Mọi tranh chấp phát sinh từ việc sử dụng website sẽ được giải quyết qua thương lượng. Nếu không đạt được thỏa thuận, tranh chấp sẽ được đưa ra cơ quan thẩm quyền tại TP. Hồ Chí Minh.",
        "Nếu bất kỳ điều khoản nào được xác định là không hợp pháp, các điều khoản còn lại vẫn có hiệu lực đầy đủ.",
      ],
    },
  ],
};

export default function TermsOfUsePage() {
  return <LegalLayout data={data} />;
}
