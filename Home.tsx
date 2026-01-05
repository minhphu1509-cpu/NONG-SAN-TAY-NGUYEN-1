
import React from 'react';
import { Page, Product, Promotion } from '../types';

interface HomeProps {
  onPageChange: (page: Page) => void;
  products: Product[];
  addToCart: (product: Product) => void;
  promotions: Promotion[];
}

const Home: React.FC<HomeProps> = ({ onPageChange, products, addToCart, promotions }) => {
  const activePromo = promotions.find(p => p.isActive) || null;

  return (
    <div className="space-y-12 sm:space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500313830540-7b6650a74fd0?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover brightness-[0.45] scale-105 animate-pulse-slow"
            alt="Central Highlands"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#fdfcfb]"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto">
          <span className="inline-block px-5 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold tracking-[0.3em] uppercase mb-8 border border-white/20 animate-fade-in-up">
            Nông Sản Sạch • Tây Nguyên Việt Nam
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-bold mb-8 brand-font leading-[1.1] animate-fade-in-up [animation-delay:0.2s]">
            Tinh Hoa <br/><span className="text-green-400">Đất Đỏ Bazan</span>
          </h1>
          <p className="text-lg sm:text-2xl mb-12 font-medium opacity-80 max-w-2xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:0.4s]">
            Mang trọn vẹn hương vị núi rừng thuần khiết từ nương rẫy đến tận bàn ăn của mỗi gia đình Việt.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in-up [animation-delay:0.6s]">
            <button 
              onClick={() => onPageChange(Page.Products)}
              className="px-12 py-5 bg-green-800 hover:bg-green-700 text-white rounded-full font-bold transition-all shadow-2xl hover:scale-105 active:scale-95 text-lg"
            >
              Khám phá sản phẩm
            </button>
            <button 
              onClick={() => onPageChange(Page.About)}
              className="px-12 py-5 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full font-bold transition-all hover:bg-white/20 text-lg"
            >
              Tìm hiểu câu chuyện
            </button>
          </div>
        </div>
      </section>

      {/* Featured Stats */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: "Trang trại", val: "50+", unit: "Ha" },
          { label: "Sản lượng", val: "100+", unit: "Tấn/Năm" },
          { label: "Khách hàng", val: "10K+", unit: "Tin dùng" },
          { label: "Kinh nghiệm", val: "15+", unit: "Năm" }
        ].map((stat, i) => (
          <div key={i} className="text-center p-8 bg-white rounded-[32px] shadow-sm border border-stone-100 hover:shadow-xl transition-all">
            <p className="text-3xl sm:text-5xl font-bold text-green-800 mb-2 brand-font">{stat.val}</p>
            <p className="text-[10px] sm:text-xs font-bold text-stone-400 uppercase tracking-widest">{stat.label} {stat.unit}</p>
          </div>
        ))}
      </section>

      {/* Promotion */}
      {activePromo && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-stone-900 rounded-[48px] p-8 sm:p-16 text-white relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12 group">
            <div className="relative z-10 text-center lg:text-left">
              <span className="text-amber-500 font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Ưu đãi độc quyền</span>
              <h2 className="text-4xl sm:text-6xl font-bold brand-font mb-6 leading-tight">{activePromo.title}</h2>
              <p className="text-stone-400 text-xl font-medium max-w-xl">{activePromo.description}</p>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="text-7xl sm:text-8xl font-black text-amber-500 brand-font mb-2">-{activePromo.discount}</div>
              <button 
                onClick={() => onPageChange(Page.Products)}
                className="px-12 py-5 bg-white text-stone-900 rounded-full font-bold hover:bg-amber-500 transition-all shadow-2xl uppercase tracking-widest"
              >
                Mua ngay kẻo lỡ
              </button>
            </div>
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-[120px] -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -ml-20 -mb-20"></div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-4xl sm:text-6xl font-bold text-stone-900 brand-font">Best Sellers</h2>
            <div className="w-20 h-2 bg-green-700 rounded-full mt-4 mx-auto md:ml-0"></div>
          </div>
          <button 
            onClick={() => onPageChange(Page.Products)}
            className="flex items-center gap-3 text-stone-400 hover:text-green-800 font-bold uppercase tracking-widest text-sm group transition-colors"
          >
            Tất cả sản phẩm
            <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {products.slice(0, 4).map((product) => (
            <div key={product.id} className="group flex flex-col">
              <div className="aspect-square rounded-[40px] overflow-hidden relative mb-6 shadow-sm hover:shadow-2xl transition-all duration-500">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full py-4 bg-white text-green-900 rounded-2xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-xl"
                  >
                    Thêm vào giỏ
                  </button>
                </div>
                <div className="absolute top-6 left-6">
                   <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-bold uppercase text-stone-900 shadow-sm">{product.category}</span>
                </div>
              </div>
              <div className="px-4 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-stone-800 mb-2 group-hover:text-green-800 transition-colors line-clamp-1">{product.name}</h3>
                <div className="mt-auto flex justify-between items-center pt-2">
                  <span className="text-2xl font-bold text-green-900">{product.price.toLocaleString()}đ</span>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter">{product.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
