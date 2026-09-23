import postcards from "@/assets/story-postcards.jpg";

export type Story = {
  slug: string;
  title: string;
  country: string;
  category: string;
  excerpt: string;
  readTime: number;
  views: number;
  featured?: boolean;
  image: string;
  body: string[];
  origin: string;
  truth: string;
};

export const stories: Story[] = [
  {
    slug: "can-phong-cuoi-hanh-lang",
    title: "Căn phòng cuối hành lang",
    country: "Việt Nam",
    category: "Địa điểm bí ẩn",
    excerpt: "Một khu tập thể cũ, ngọn đèn luôn sáng và lời nhắn kỳ lạ để lại trên bậc thang.",
    readTime: 6,
    views: 18400,
    featured: true,
    image: postcards,
    body: [
      "Người ta kể rằng ở một khu tập thể cũ giữa Sài Gòn có căn phòng cuối hành lang luôn bật đèn, dù đã khóa cửa nhiều năm. Mỗi tối mưa, người đi qua thường nghe tiếng kéo ghế rất khẽ — giống như ai đó đang chuẩn bị một bàn trà.",
      "Lạ nhất là sáng hôm sau, trên bậc thang thường có một mẩu giấy nhỏ ghi: “Đi chậm thôi, cầu thang trơn đó.” Thế nên cư dân không quá sợ. Họ chỉ đặt thêm một chậu cây trước cửa, coi như lời cảm ơn người hàng xóm vô hình nhưng chu đáo.",
    ],
    origin: "Câu chuyện mang nhiều nét của lời kể truyền miệng tại các khu nhà tập thể lâu năm: không gian chung, ký ức của cư dân cũ và những âm thanh khó xác định trong đêm.",
    truth: "Chưa có bằng chứng về căn phòng cụ thể. Tiếng động có thể đến từ đường ống, gió và kết cấu nhà cũ. Mẩu giấy nhiều khả năng là trò đùa tử tế của một người hàng xóm.",
  },
  {
    slug: "teke-teke-san-truong",
    title: "Teke Teke và chiếc nơ đỏ",
    country: "Nhật Bản",
    category: "Trường học",
    excerpt: "Phiên bản dịu dàng hơn về tiếng lách cách cuối hành lang trường học vắng.",
    readTime: 5,
    views: 25100,
    featured: true,
    image: postcards,
    body: ["Sau giờ tan học, vài học sinh bảo rằng họ nghe tiếng “teke teke” vọng trên sàn gỗ. Cuối hành lang chỉ còn một chiếc nơ đỏ nằm cạnh cửa sổ.", "Người nhặt chiếc nơ và đặt lên bàn giáo viên hôm sau thường nhận được một viên kẹo. Không ai biết ai để lại, nhưng từ đó tiếng động cũng biến mất."],
    origin: "Teke Teke là một truyền thuyết đô thị nổi tiếng của Nhật Bản, có nhiều phiên bản khác nhau và thường được kể trong trường học.",
    truth: "Đây là văn hóa kể chuyện dân gian hiện đại, không phải một sự kiện được xác minh. Phiên bản trên đã được kể lại theo tinh thần nhẹ nhàng của trang.",
  },
  {
    slug: "cuoc-goi-luc-ba-gio",
    title: "Bốt điện thoại lúc ba giờ",
    country: "Anh",
    category: "Đồ vật",
    excerpt: "Chiếc bốt đỏ không còn dây điện nhưng thỉnh thoảng vẫn đổ chuông trong sương.",
    readTime: 4,
    views: 9700,
    image: postcards,
    body: ["Một bốt điện thoại cũ bên bờ sông được cho là sẽ reo đúng ba giờ sáng. Nếu nhấc máy, bạn chỉ nghe tiếng ai đó hỏi đường về nhà.", "Người dân địa phương đùa rằng hãy chỉ đường thật kỹ — khách du lịch từ thế giới bên kia cũng dễ lạc như chúng ta."],
    origin: "Những bốt điện thoại bỏ hoang thường xuất hiện trong truyện kể Anh, nhất là khi chúng trở thành vật còn sót lại của một thời kỳ khác.",
    truth: "Không có hồ sơ đáng tin cậy cho cuộc gọi này. Dây điện, gió và trò đùa là những giải thích hợp lý hơn.",
  },
  {
    slug: "ga-tau-hoa-giay",
    title: "Ga tàu đầy hoa giấy",
    country: "Mexico",
    category: "Chuyện chưa giải thích",
    excerpt: "Một ga tàu không có trên bản đồ và những vòng hoa xuất hiện sau chuyến cuối.",
    readTime: 7,
    views: 14300,
    image: postcards,
    body: ["Sau chuyến tàu cuối, có người kể rằng đoàn tàu dừng ở một sân ga phủ đầy hoa giấy. Bảng tên ga trống không, còn đồng hồ luôn chỉ mười hai giờ.", "Nếu không bước xuống, sáng hôm sau bạn vẫn về đúng ga quen thuộc — trong túi áo có thêm một cánh hoa nhỏ."],
    origin: "Motif “nhà ga không tồn tại” xuất hiện trong nhiều truyền thuyết hiện đại và thường phản ánh nỗi lo lạc đường giữa đô thị lớn.",
    truth: "Có thể đây là ký ức mơ màng khi ngủ quên trên tàu, được tô điểm qua nhiều lần kể lại.",
  },
  {
    slug: "thang-may-tang-muoi-ba",
    title: "Thang máy tầng mười ba",
    country: "Hàn Quốc",
    category: "Internet",
    excerpt: "Một chuỗi nút bấm được truyền tay trên mạng và tầng lầu không ai đăng ký.",
    readTime: 5,
    views: 32100,
    image: postcards,
    body: ["Một bài đăng cũ hướng dẫn bấm thang máy theo thứ tự kỳ lạ. Người thử nói rằng cửa mở ra một tầng không có trong sơ đồ.", "Nhưng điều đáng chú ý nhất ở đó là máy bán hàng vẫn hoạt động, dù chỉ bán duy nhất sữa dâu."],
    origin: "Trò chơi thang máy lan truyền trên các diễn đàn mạng Hàn Quốc rồi được biến tấu ở nhiều quốc gia.",
    truth: "Không có bằng chứng xác thực. Đừng tự ý thử trong tòa nhà lạ; bạn có thể làm phiền cư dân hoặc hệ thống an ninh.",
  },
  {
    slug: "xe-buyt-so-khong",
    title: "Chuyến xe buýt số 0",
    country: "Trung Quốc",
    category: "Chuyện chưa giải thích",
    excerpt: "Chiếc xe chỉ xuất hiện khi trời mưa và luôn chở hành khách về đúng nơi cần đến.",
    readTime: 6,
    views: 11600,
    image: postcards,
    body: ["Khi mưa lớn làm bảng số tuyến nhòe đi, đôi lúc một chiếc xe số 0 ghé trạm. Bác tài không hỏi tiền, chỉ hỏi: “Bạn muốn về đâu?”", "Không ai nhớ đường đi, nhưng ai cũng tỉnh dậy ở trạm gần nhà với một chiếc vé màu hồng trong tay."],
    origin: "Các câu chuyện về phương tiện bí ẩn rất phổ biến tại đô thị châu Á, nơi hành trình đêm vừa quen thuộc vừa dễ tạo cảm giác lạc hướng.",
    truth: "Có thể người kể đã lên nhầm chuyến xe tăng cường hoặc trộn lẫn ký ức sau một giấc ngủ ngắn.",
  },
  {
    slug: "bong-trang-duoi-giếng",
    title: "Bóng trăng dưới giếng",
    country: "Thái Lan",
    category: "Ma quỷ",
    excerpt: "Một lời nhắc dễ thương rằng đừng cúi quá gần chiếc giếng cổ vào đêm trăng.",
    readTime: 4,
    views: 8200,
    image: postcards,
    body: ["Trẻ con trong làng được dặn không cúi sát giếng vào đêm trăng vì cái bóng dưới nước sẽ làm mặt xấu. Có cậu bé thử nhìn và thấy… chính mình đang lè lưỡi trước.", "Từ đó mọi người để một chiếc gương nhỏ cạnh giếng, cho cái bóng có bạn chơi và không trêu khách qua đường nữa."],
    origin: "Lời răn quanh ao giếng thường giúp trẻ nhỏ tránh nơi nguy hiểm, rồi dần trở thành chuyện kể dân gian.",
    truth: "Phản chiếu, gợn nước và ánh sáng yếu dễ khiến khuôn mặt trông khác lạ. Lời đồn cũng là một cách nhắc trẻ giữ an toàn.",
  },
  {
    slug: "con-meo-trong-man-hinh",
    title: "Con mèo trong màn hình cũ",
    country: "Mỹ",
    category: "Internet",
    excerpt: "Một trang web thất lạc, con mèo pixel và lời nhắc đi ngủ đúng giờ.",
    readTime: 3,
    views: 19700,
    image: postcards,
    body: ["Diễn đàn đầu những năm 2000 từng kể về trang web có con mèo pixel chỉ xuất hiện sau hai giờ sáng. Nó nhìn thẳng vào màn hình rồi giơ tấm biển: “Đi ngủ đi.”", "Nếu đóng máy ngay, sáng hôm sau hình nền sẽ có thêm một ngôi sao. Có lẽ đây là con ma có ý thức chăm sóc sức khỏe nhất Internet."],
    origin: "Đây là kiểu creepypasta hoài cổ, kết hợp nỗi lạ lẫm của Internet sơ khai với ký ức về màn hình CRT.",
    truth: "Không tìm thấy bản lưu đáng tin cậy. Nhiều khả năng đó là hình động hoặc tiện ích do người dùng tự tạo.",
  },
];

export const countries = ["Tất cả", "Việt Nam", "Nhật Bản", "Hàn Quốc", "Trung Quốc", "Thái Lan", "Mỹ", "Anh", "Mexico"];
export const topics = ["Tất cả", "Ma quỷ", "Địa điểm bí ẩn", "Trường học", "Internet", "Đồ vật", "Chuyện chưa giải thích"];

export const formatViews = (views: number) => `${(views / 1000).toFixed(views % 1000 === 0 ? 0 : 1)}K`;
