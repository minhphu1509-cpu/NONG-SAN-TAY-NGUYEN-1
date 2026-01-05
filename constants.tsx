
import React from 'react';
import { Product, Blog, Testimonial, NavItem } from './types';

export const COLORS = {
  forest: '#2D5A27',
  wood: '#8B4513',
  cream: '#fdfcf0',
  leaf: '#4ade80',
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Trang Chủ', path: '/' },
  { label: 'Sản Phẩm', path: '/products' },
  { label: 'Dịch Vụ', path: '/services' },
  { label: 'Blog', path: '/blog' },
  { label: 'Giới Thiệu', path: '/about' },
  { label: 'Liên Hệ', path: '/contact' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Cà Phê Robusta Honey',
    price: 250000,
    category: 'Cà Phê',
    unit: 'Gói 500g',
    image: 'https://picsum.photos/seed/coffee1/400/400',
    description: 'Cà phê được chế biến theo phương pháp Honey, giữ lại vị ngọt tự nhiên của thịt quả.'
  },
  {
    id: '2',
    name: 'Hạt Mắc Ca Nứt Vỏ',
    price: 185000,
    category: 'Hạt Dinh Dưỡng',
    unit: 'Hộp 500g',
    image: 'https://picsum.photos/seed/macca/400/400',
    description: 'Hạt mắc ca Tây Nguyên sấy lạnh, giữ trọn hương vị béo bùi và dinh dưỡng.'
  },
  {
    id: '3',
    name: 'Mật Ong Rừng Gia Lai',
    price: 450000,
    category: 'Đặc Sản',
    unit: 'Chai 500ml',
    image: 'https://picsum.photos/seed/honey/400/400',
    description: 'Mật ong hoa rừng nguyên chất 100%, thu hoạch tự nhiên từ vùng núi cao Gia Lai.'
  },
  {
    id: '4',
    name: 'Hồ Tiêu Chư Sê',
    price: 120000,
    category: 'Gia Vị',
    unit: 'Hộp 250g',
    image: 'https://picsum.photos/seed/pepper/400/400',
    description: 'Hồ tiêu đen nổi tiếng vùng Chư Sê, cay nồng và thơm đặc trưng.'
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Anh Minh',
    role: 'Chủ quán cà phê',
    content: 'Chất lượng cà phê ở đây thực sự khác biệt, khách hàng của tôi rất thích hương vị Robusta Honey.',
    avatar: 'https://picsum.photos/seed/user1/100/100'
  },
  {
    id: '2',
    name: 'Chị Lan',
    role: 'Nội trợ',
    content: 'Gia đình tôi tin dùng hạt mắc ca và mật ong rừng ở đây, cảm giác rất an tâm về nguồn gốc.',
    avatar: 'https://picsum.photos/seed/user2/100/100'
  }
];

export const BLOG_POSTS: Blog[] = [
  {
    id: '1',
    title: 'Cách Phân Biệt Mật Ong Rừng Thật',
    excerpt: 'Làm thế nào để biết mật ong bạn mua là nguyên chất? Hãy cùng khám phá 5 mẹo đơn giản...',
    date: '15/10/2023',
    author: 'Admin',
    image: 'https://picsum.photos/seed/blog1/800/500'
  },
  {
    id: '2',
    title: 'Hành Trình Của Hạt Cà Phê Tây Nguyên',
    excerpt: 'Từ những đồi chè xanh mướt đến tách cà phê nóng hổi trên tay bạn là một câu chuyện dài...',
    date: '10/10/2023',
    author: 'Văn Sang',
    image: 'https://picsum.photos/seed/blog2/800/500'
  }
];
