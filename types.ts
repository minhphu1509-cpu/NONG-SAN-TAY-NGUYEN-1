
export interface Product {
  id: number;
  name: string;
  category: CategoryType;
  price: number;
  oldPrice?: number;
  image: string;
  images: string[]; // Array for up to 10 images
  description: string;
  rating: number;
  reviews: number;
  isBestSeller?: boolean;
  stockCount: number; // New field for inventory management
}

export type CategoryType = 'cafe' | 'hat' | 'matong' | 'giavi' | 'all';

export interface Category {
  id: CategoryType;
  name: string;
  icon: string;
}

export interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  comment: string;
  date?: string;
  productId?: number;
}

export interface ContactForm {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Address {
  id: string;
  label: string;
  recipientName: string;
  phone: string;
  fullAddress: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  avatar?: string;
  addresses: Address[];
  notifications: UserNotification[]; // Track alerts
}

export interface UserNotification {
  id: string;
  type: 'back_in_stock' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface StockSubscription {
  productId: number;
  email: string;
  createdAt: string;
}

export type PaymentMethod = 'cod' | 'banking' | 'momo' | 'zalopay' | 'card';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  status: 'pending' | 'shipping' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface Promotion {
  id: number;
  name: string;
  discountPercent: number;
  productIds: number[];
  isActive: boolean;
  startDate?: string;
  endDate?: string;
}

export type BlogCategory = 'news' | 'recipe' | 'story';

export interface BlogPost {
  id: number;
  title: string;
  category: BlogCategory;
  image: string;
  author: string;
  date: string;
  summary: string;
  content: string;
}

export interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  link: string;
}

export interface SiteConfig {
  hotline: string;
  email: string;
  address: string;
  welcomeMessage: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
  zalo?: string;
  googleMap?: string; 
  banners: Banner[];
}

export interface SecurityLog {
  id: string;
  event: string;
  status: 'success' | 'warning' | 'danger';
  timestamp: string;
  details: string;
  ip: string;
}

export interface SecurityConfig {
  is2FAEnabled: boolean;
  bruteForceProtection: boolean;
  sessionTimeoutMinutes: number;
  lastAuditAt?: string;
}

export interface AiSecurityReport {
  score: number;
  status: string;
  findings: Array<{
    severity: 'low' | 'medium' | 'high';
    issue: string;
    recommendation: string;
  }>;
  summary: string;
}
