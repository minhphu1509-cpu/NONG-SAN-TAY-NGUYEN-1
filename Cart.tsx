
import React from 'react';
import { Page, CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  onPageChange: (page: Page) => void;
}

const Cart: React.FC<CartProps> = ({ cart, updateQuantity, removeFromCart, onPageChange }) => {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center animate-fade-in-up">
        <div className="w-32 h-32 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-10 text-stone-300">
          <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
        </div>
        <h2 className="text-3xl font-bold text-stone-800 mb-4 brand-font uppercase">Giỏ hàng trống</h2>
        <p className="text-stone-500 mb-12 max-w-md mx-auto leading-relaxed">Hãy dành chút thời gian dạo qua gian hàng của Mr Táo để tìm cho mình những đặc sản ưng ý nhất nhé!</p>
        <button 
          onClick={() => onPageChange(Page.Products)}
          className="px-12 py-5 bg-green-800 text-white rounded-full font-bold hover:bg-green-700 transition-all shadow-2xl hover:scale-105"
        >
          Tiếp tục mua sắm
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
         <h1 className="text-4xl sm:text-6xl font-bold text-stone-900 brand-font">Giỏ Hàng</h1>
         <button onClick={() => onPageChange(Page.Products)} className="text-stone-400 font-bold uppercase text-xs tracking-widest hover:text-green-800">Tiếp tục mua sắm &rarr;</button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-8">
          {cart.map((item) => (
            <div key={item.id} className="bg-white p-6 sm:p-8 rounded-[32px] border border-stone-100 shadow-sm flex flex-col sm:flex-row items-center gap-8 group hover:shadow-xl transition-all">
              <div className="w-full sm:w-32 h-48 sm:h-32 rounded-[24px] overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-grow text-center sm:text-left">
                <h3 className="font-bold text-stone-800 text-xl sm:text-2xl mb-1 line-clamp-1">{item.name}</h3>
                <p className="text-xs text-stone-400 uppercase tracking-widest mb-6">{item.category} • {item.unit}</p>
                <div className="flex items-center justify-center sm:justify-start gap-8">
                  <div className="flex items-center bg-stone-50 rounded-full border border-stone-200 p-1">
                    <button onClick={() => updateQuantity(item.id, -1)} className="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-green-800 font-bold transition-colors">-</button>
                    <span className="w-12 text-center font-bold text-stone-900 text-lg">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-green-800 font-bold transition-colors">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-[10px] font-bold text-red-400 hover:text-red-600 uppercase tracking-widest transition-colors">Gỡ khỏi giỏ</button>
                </div>
              </div>
              <div className="text-center sm:text-right pt-4 sm:pt-0 border-t sm:border-t-0 border-stone-100 w-full sm:w-auto">
                <p className="font-bold text-green-900 text-2xl">{(item.price * item.quantity).toLocaleString()}đ</p>
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{item.price.toLocaleString()}đ / SP</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <div className="bg-stone-900 p-8 sm:p-10 rounded-[40px] text-white shadow-2xl space-y-8 sticky top-28">
            <h3 className="text-xl font-bold border-b border-white/10 pb-6 uppercase tracking-widest text-white/60 text-sm">Thanh toán</h3>
            <div className="space-y-6">
              <div className="flex justify-between text-white/50 font-medium">
                <span>Tạm tính ({cart.length} sản phẩm)</span>
                <span>{subtotal.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between text-white/50 font-medium">
                <span>Vận chuyển (Toàn quốc)</span>
                <span className="text-green-400 font-bold">MIỄN PHÍ</span>
              </div>
              <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                <span className="text-lg opacity-60">Tổng cộng</span>
                <span className="text-4xl font-bold text-amber-500 brand-font">{subtotal.toLocaleString()}đ</span>
              </div>
            </div>
            <button 
              onClick={() => onPageChange(Page.Checkout)}
              className="w-full py-5 bg-green-700 text-white rounded-[24px] font-bold hover:bg-green-600 transition-all shadow-2xl uppercase tracking-[0.2em] text-sm hover:scale-[1.02]"
            >
              Đặt hàng ngay
            </button>
            <div className="text-center">
              <p className="text-[10px] text-white/30 font-bold uppercase tracking-tighter">Cam kết 100% nông sản sạch tự nhiên</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
