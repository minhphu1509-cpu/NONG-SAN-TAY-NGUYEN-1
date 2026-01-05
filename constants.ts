
import { Product, BlogPost, Page, FAQItem, TeamMember, PortfolioItem, Promotion } from './types';

export const APP_NAME = "Mr Táo - Nông Sản Tây Nguyên";

export const COLORS = {
  primary: "#166534",
  secondary: "#78350f",
  accent: "#f59e0b",
  bg: "#fdfcfb"
};

export const NAV_ITEMS = [
  { label: "Trang chủ", page: Page.Home },
  { label: "Sản phẩm", page: Page.Products },
  { label: "Dịch vụ", page: Page.Services },
  { label: "Blog", page: Page.Blog },
  { label: "Hình ảnh", page: Page.Portfolio },
  { label: "Hỏi đáp", page: Page.FAQ },
  { label: "Liên hệ", page: Page.Contact }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Cà Phê Robusta Honey Đắk Lắk",
    category: "Cà Phê",
    price: 285000,
    description: "Hạt cà phê Robusta chế biến theo phương pháp Honey, mang lại vị ngọt hậu tự nhiên và hương thơm nồng nàn của hoa cà phê núi rừng.",
    image: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&q=80&w=1000",
    unit: "Gói 500g"
  },
  {
    id: "2",
    name: "Hạt Mắc Ca VIP Loại 1",
    category: "Hạt Dinh Dưỡng",
    price: 350000,
    description: "Hạt mắc ca tuyển chọn kích thước lớn, sấy lạnh giữ nguyên hàm lượng dinh dưỡng, giòn tan và béo ngậy.",
    image: "https://images.unsplash.com/photo-1543233604-3b60995982a3?auto=format&fit=crop&q=80&w=1000",
    unit: "Hộp 500g"
  },
  {
    id: "3",
    name: "Tiêu Đen Chín Cây Gia Lai",
    category: "Gia Vị",
    price: 180000,
    description: "Hạt tiêu đen chín đỏ trên cây, phơi nắng tự nhiên, cay nồng đậm đà và mùi thơm cực kỳ đặc trưng.",
    image: "https://images.unsplash.com/photo-1599940824399-b87987cb972d?auto=format&fit=crop&q=80&w=1000",
    unit: "Gói 200g"
  },
  {
    id: "4",
    name: "Mật Ong Rừng Nguyên Chất",
    category: "Mật Ong",
    price: 450000,
    description: "Mật ong đa hoa khai thác trực tiếp từ rừng già, vị ngọt thanh, đặc quánh tự nhiên.",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=1000",
    unit: "Chai 750ml"
  },
  {
    id: "5",
    name: "Hạt Điều Rang Củi Bình Phước",
    category: "Hạt Dinh Dưỡng",
    price: 295000,
    description: "Hạt điều vỏ lụa rang củi thủ công, giữ trọn vẹn độ béo thơm và vị mặn nhẹ của muối tinh khiết.",
    image: "https://images.unsplash.com/photo-1536620239015-611b33937d57?auto=format&fit=crop&q=80&w=1000",
    unit: "Hộp 500g"
  },
  {
    id: "6",
    name: "Trà Oolong Thượng Hạng",
    category: "Trà",
    price: 420000,
    description: "Búp trà Oolong 1 tôm 2 lá từ cao nguyên Lâm Đồng, nước trà vàng xanh, hương thơm dịu nhẹ.",
    image: "https://images.unsplash.com/photo-1563911191333-dc06371859f2?auto=format&fit=crop&q=80&w=1000",
    unit: "Gói 250g"
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    title: "5 Công dụng vàng của Hạt Mắc Ca cho mẹ bầu",
    excerpt: "Hạt mắc ca được mệnh danh là nữ hoàng các loại hạt nhờ hàm lượng dinh dưỡng vượt trội giúp phát triển trí não cho bé...",
    date: "2024-05-10",
    author: "Mr Táo",
    image: "https://images.unsplash.com/photo-1528751004148-73602167195c?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "b2",
    title: "Bí quyết pha ly cà phê Robusta chuẩn vị Tây Nguyên",
    excerpt: "Nhiệt độ nước, kích thước bột và thời gian ủ là 3 yếu tố quyết định đến một ly cà phê đậm đà bản sắc núi rừng...",
    date: "2024-05-15",
    author: "Mr Táo",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000"
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    question: "Sản phẩm Mr Táo có đạt chuẩn sạch không?",
    answer: "Tất cả các dòng sản phẩm của chúng tôi đều đạt chứng nhận VietGAP và được kiểm định định kỳ về dư lượng thuốc bảo vệ thực vật."
  },
  {
    question: "Chính sách đại lý của Mr Táo như thế nào?",
    answer: "Chúng tôi có chính sách chiết khấu linh hoạt từ 15-35% tùy sản lượng, đồng thời hỗ trợ thiết kế bao bì cho đối tác sỉ."
  }
];

export const INITIAL_TEAM: TeamMember[] = [
  {
    name: "Lê Minh Táo",
    role: "Founder & Master Roaster",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600",
    bio: "Hơn 15 năm gắn bó với cây cà phê, Mr Táo là người trực tiếp kiểm soát quy trình rang xay."
  },
  {
    name: "Nguyễn Thu Hà",
    role: "Giám đốc Chất lượng",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=600",
    bio: "Chuyên gia với bằng cấp quốc tế về thử nếm (Cupping), phụ trách khâu chọn lọc nguyên liệu."
  }
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  { id: "p1", url: "https://images.unsplash.com/photo-1500313830540-7b6650a74fd0?auto=format&fit=crop&q=80&w=800", title: "Cánh đồng cà phê", cat: "Nguồn nguyên liệu" },
  { id: "p2", url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800", title: "Xử lý hạt cà phê", cat: "Sản xuất" },
  { id: "p3", url: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800", title: "Hạt Robusta thành phẩm", cat: "Sản phẩm" },
  { id: "p4", url: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&q=80&w=800", title: "Phân loại mắc ca", cat: "Chế biến" },
  { id: "p5", url: "https://images.unsplash.com/photo-1528751004148-73602167195c?auto=format&fit=crop&q=80&w=800", title: "Vùng đất Bazan", cat: "Thiên nhiên" },
  { id: "p6", url: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800", title: "Khai thác mật ong", cat: "Khai thác" },
];

export const INITIAL_PROMOTIONS: Promotion[] = [
  {
    id: "promo1",
    title: "Khai Trương Chi Nhánh Huế",
    description: "Giảm ngay tất cả đơn hàng & Miễn phí vận chuyển nội thành",
    discount: "10%",
    startDate: "2026-01-01",
    endDate: "2026-01-31",
    isActive: true
  }
];
