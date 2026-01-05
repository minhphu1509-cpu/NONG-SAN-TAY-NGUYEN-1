
import React, { useState } from 'react';
import { Page, CartItem, Order } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  onPageChange: (page: Page) => void;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  clearCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, onPageChange, setOrders, clearCart }) => {
  const [form, setForm] = useState({
    name: '', 
    phone: '', 
    address: '', 
    paymentMethod: 'cod',
    bankAccountNumber: ''
  });

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: Order = {
      id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      customerName: form.name,
      phone: form.phone,
      address: form.address,
      items: [...cart],
      total: total,
      status: 'pending',
      date: new Date().toLocaleDateString('vi-VN'),
      paymentMethod: form.paymentMethod,
      bankAccountNumber: form.paymentMethod === 'bank' ? form.bankAccountNumber : undefined
    };
    
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    onPageChange(Page.OrderSuccess);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex items-center gap-4 mb-10">
        <button onClick={() => onPageChange(Page.Cart)} className="text-stone-400 hover:text-green-700 transition-all">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <h1 className="text-3xl font-bold text-stone-800 brand-font">Thanh Toán</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-10">
          <section className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
            <h3 className="font-bold text-stone-800 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm">1</span>
              Thông tin nhận hàng
            </h3>
            <div className="space-y-4">
              <input 
                required
                type="text" 
                placeholder="Họ và tên người nhận" 
                className="w-full bg-stone-50 border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-green-500"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
              />
              <input 
                required
                type="tel" 
                placeholder="Số điện thoại" 
                className="w-full bg-stone-50 border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-green-500"
                value={form.phone}
                onChange={e => setForm({...form, phone: e.target.value})}
              />
              <textarea 
                required
                placeholder="Địa chỉ nhận hàng chi tiết" 
                className="w-full bg-stone-50 border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-green-500 h-24"
                value={form.address}
                onChange={e => setForm({...form, address: e.target.value})}
              />
            </div>
          </section>

          <section className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
            <h3 className="font-bold text-stone-800 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm">2</span>
              Phương thức thanh toán
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                { id: 'cod', label: 'Thanh toán khi nhận hàng (COD)', icon: '🚚' },
                { id: 'bank', label: 'Chuyển khoản ngân hàng', icon: '🏦' },
                { id: 'momo', label: 'Ví MoMo / ZaloPay', icon: '📱' },
              ].map(method => (
                <label 
                  key={method.id}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    form.paymentMethod === method.id ? 'border-green-700 bg-green-50' : 'border-stone-100 hover:border-stone-200'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="payment" 
                    className="hidden" 
                    checked={form.paymentMethod === method.id}
                    onChange={() => setForm({...form, paymentMethod: method.id})}
                  />
                  <span className="text-2xl">{method.icon}</span>
                  <span className="text-sm font-medium text-stone-700">{method.label}</span>
                </label>
              ))}
            </div>

            {/* Hiển thị trường nhập STK khi chọn Chuyển khoản */}
            {form.paymentMethod === 'bank' && (
              <div className="animate-fade-in-up bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-4">
                <div className="flex items-center gap-3 text-green-800 mb-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-xs font-bold uppercase tracking-wider">Thông tin chuyển khoản của khách hàng</span>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Số tài khoản của bạn</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Nhập số tài khoản để chúng tôi đối soát" 
                    className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 transition-all shadow-sm"
                    value={form.bankAccountNumber}
                    onChange={e => setForm({...form, bankAccountNumber: e.target.value})}
                  />
                  <p className="text-[10px] text-stone-400 italic mt-2">
                    * Vui lòng nhập số tài khoản bạn sẽ dùng để chuyển tiền cho Mr Táo.
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-200 mt-2">
                  <p className="text-xs font-bold text-stone-800 mb-2 uppercase">Thông tin nhận tiền của Mr Táo:</p>
                  <div className="bg-white p-3 rounded-xl border border-stone-100 text-sm space-y-1">
                    <p><span className="text-stone-400">Ngân hàng:</span> <span className="font-bold">Vietcombank</span></p>
                    <p><span className="text-stone-400">Số tài khoản:</span> <span className="font-bold text-green-700">0766 771 509</span></p>
                    <p><span className="text-stone-400">Chủ TK:</span> <span className="font-bold">Lê Minh Táo</span></p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

        <div className="space-y-8">
          <div className="bg-stone-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
             <h3 className="text-xl font-bold mb-8 opacity-60 uppercase tracking-widest text-sm">Đơn hàng của bạn</h3>
             <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img src={item.image} className="w-14 h-14 rounded-xl object-cover opacity-80" />
                        <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                          {item.quantity}
                        </span>
                      </div>
                      <span className="font-medium text-sm line-clamp-1 max-w-[150px]">{item.name}</span>
                    </div>
                    <span className="font-bold">{(item.price * item.quantity).toLocaleString()}đ</span>
                  </div>
                ))}
             </div>
             
             <div className="border-t border-white/10 pt-8 space-y-4">
                <div className="flex justify-between text-white/60">
                  <span>Tạm tính</span>
                  <span>{total.toLocaleString()}đ</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Vận chuyển</span>
                  <span className="text-green-400">Miễn phí</span>
                </div>
                <div className="flex justify-between items-end pt-4">
                  <span className="text-lg">Tổng cộng</span>
                  <span className="text-3xl font-bold text-amber-400">{total.toLocaleString()}đ</span>
                </div>
             </div>

             <button 
                type="submit"
                className="w-full mt-10 py-5 bg-green-700 text-white rounded-2xl font-bold hover:bg-green-600 transition-all shadow-xl text-lg uppercase tracking-widest"
              >
                Đặt hàng ngay
              </button>
              <p className="text-center text-[10px] mt-4 text-white/40 italic">Bằng cách đặt hàng, bạn đồng ý với các điều khoản của Mr Táo.</p>
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
