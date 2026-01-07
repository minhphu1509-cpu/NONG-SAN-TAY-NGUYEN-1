
import { Product, Category, Review, BlogPost } from './types';

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'Tất cả', icon: 'LayoutGrid' },
  { id: 'cafe', name: 'Cà phê Tây Nguyên', icon: 'Coffee' },
  { id: 'hat', name: 'Hạt dinh dưỡng', icon: 'Nut' },
  { id: 'matong', name: 'Mật ong rừng', icon: 'Droplets' },
  { id: 'giavi', name: 'Tiêu & Gia vị', icon: 'Sprout' },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Cà phê Robusta Honey Thượng Hạng',
    category: 'cafe',
    price: 250000,
    oldPrice: 300000,
    image: 'https://picsum.photos/id/1060/800/800',
    images: ['https://picsum.photos/id/1060/800/800'],
    description: '100% hạt Robusta chín cây, sơ chế theo phương pháp Honey cho hương vị đậm đà, hậu ngọt sâu. Phù hợp pha phin truyền thống.',
    rating: 5,
    reviews: 124,
    isBestSeller: true,
    stockCount: 15,
  },
  {
    id: 2,
    name: 'Hạt Mắc Ca Lâm Đồng (Nứt vỏ)',
    category: 'hat',
    price: 320000,
    oldPrice: 380000,
    image: 'https://picsum.photos/id/1080/800/800',
    images: ['https://picsum.photos/id/1080/800/800'],
    description: 'Mắc ca size A+, hạt to đều, nứt vỏ tự nhiên. Giàu Omega 3-6-9, tốt cho tim mạch và trí não. Đóng gói hút chân không 500g.',
    rating: 4.8,
    reviews: 89,
    isBestSeller: true,
    stockCount: 0, // Out of Stock
  },
  {
    id: 3,
    name: 'Mật Ong Hoa Cà Phê Nguyên Chất',
    category: 'matong',
    price: 180000,
    oldPrice: 220000,
    image: 'https://picsum.photos/id/312/800/800',
    images: ['https://picsum.photos/id/312/800/800'],
    description: 'Mật ong được khai thác trực tiếp từ mùa hoa cà phê nở rộ tháng 3. Màu vàng sánh, hương thơm nhẹ, vị ngọt thanh không gắt.',
    rating: 4.9,
    reviews: 210,
    isBestSeller: false,
    stockCount: 42,
  },
  {
    id: 4,
    name: 'Tiêu Đen Chư Sê (Hạt Tiêu Sọ)',
    category: 'giavi',
    price: 150000,
    image: 'https://picsum.photos/id/292/800/800',
    images: ['https://picsum.photos/id/292/800/800'],
    description: 'Hạt tiêu đen Chư Sê nổi tiếng, hạt chắc, cay nồng tự nhiên. Đã được sàng lọc kỹ, không hạt lép, không tạp chất.',
    rating: 4.7,
    reviews: 56,
    isBestSeller: false,
    stockCount: 10,
  },
  {
    id: 5,
    name: 'Cà phê Arabica Cầu Đất',
    category: 'cafe',
    price: 350000,
    image: 'https://picsum.photos/id/425/800/800',
    images: ['https://picsum.photos/id/425/800/800'],
    description: 'Arabica Cầu Đất trứ danh với vị chua thanh quyến rũ, hương thơm nồng nàn. Dành cho người sành cà phê.',
    rating: 5,
    reviews: 78,
    isBestSeller: true,
    stockCount: 5,
  },
  {
    id: 6,
    name: 'Muối Kiến Vàng Gia Lai',
    category: 'giavi',
    price: 85000,
    image: 'https://picsum.photos/id/835/800/800',
    images: ['https://picsum.photos/id/835/800/800'],
    description: 'Đặc sản độc đáo của vùng chảo lửa Krông Pa. Vị chua thanh của kiến vàng kết hợp ớt hiểm cay xé lưỡi. Chấm bò một nắng là hết bài.',
    rating: 4.5,
    reviews: 32,
    isBestSeller: false,
    stockCount: 0, // Out of Stock
  },
];

export const REVIEWS: Review[] = [
  {
    id: 1,
    author: 'Nguyễn Văn A',
    avatar: 'https://picsum.photos/id/1005/100/100',
    rating: 5,
    comment: 'Cà phê rất thơm, đúng chuẩn vị Tây Nguyên mình từng uống khi đi du lịch Buôn Ma Thuột. Đóng gói cẩn thận, giao hàng nhanh.',
  },
  {
    id: 2,
    author: 'Trần Thị B',
    avatar: 'https://picsum.photos/id/1011/100/100',
    rating: 5,
    comment: 'Mắc ca hạt to, giòn, không bị hôi dầu. Mua biếu bố mẹ rất ưng ý. Sẽ ủng hộ shop dài dài.',
  },
  {
    id: 3,
    author: 'Lê Hoàng C',
    avatar: 'https://picsum.photos/id/1027/100/100',
    rating: 4,
    comment: 'Mật ong sánh mịn, test thử thấy chuẩn mật thật. Giá cả hợp lý so với chất lượng.',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Cách pha cà phê phin ngon chuẩn vị người Pleiku',
    category: 'recipe',
    image: 'https://images.unsplash.com/photo-1610450821569-425333f20253?auto=format&fit=crop&w=800&q=80',
    author: 'Mr Táo',
    date: '2023-10-15',
    summary: 'Bí quyết nằm ở nhiệt độ nước và cách ủ cà phê. Cùng Mr Táo tìm hiểu cách để có ly cà phê phin đậm đà vào mỗi sáng.',
    content: 'Cà phê phin là nét văn hóa đặc trưng...'
  },
  {
    id: 2,
    title: 'Mùa hoa cà phê Tây Nguyên - Vẻ đẹp tinh khôi của núi rừng',
    category: 'story',
    image: 'https://images.unsplash.com/photo-1599940859674-a7fef05b94ae?auto=format&fit=crop&w=800&q=80',
    author: 'H\'Hen',
    date: '2023-03-20',
    summary: 'Tháng 3, Tây Nguyên khoác lên mình màu áo trắng tinh khôi của hoa cà phê. Đây cũng là mùa ong đi lấy mật.',
    content: 'Khi những cơn mưa đầu mùa tưới mát vùng đất bazan, cũng là lúc hoa cà phê bung nở trắng xóa cả một vùng trời...'
  },
  {
    id: 3,
    title: 'Phân biệt Mật ong rừng và Mật ong nuôi',
    category: 'news',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    author: 'Chuyên gia dinh dưỡng',
    date: '2023-06-10',
    summary: 'Làm sao để biết mật ong bạn mua có phải là mật ong rừng nguyên chất? Những mẹo nhỏ đơn giản giúp bạn phân biệt.',
    content: 'Mật ong rừng thường có bọt khí nhiều hơn, mùi thơm nồng hơn và màu sắc thay đổi theo mùa hoa...'
  },
];
