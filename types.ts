
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  unit: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipping' | 'completed';
  date: string;
  paymentMethod: string;
  bankAccountNumber?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface PortfolioItem {
  id: string;
  url: string;
  title: string;
  cat: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export enum Page {
  Home = 'home',
  About = 'about',
  Products = 'products',
  Services = 'services',
  Portfolio = 'portfolio',
  Pricing = 'pricing',
  Blog = 'blog',
  Contact = 'contact',
  Admin = 'admin',
  FAQ = 'faq',
  Team = 'team',
  Cart = 'cart',
  Checkout = 'checkout',
  OrderSuccess = 'order-success'
}
