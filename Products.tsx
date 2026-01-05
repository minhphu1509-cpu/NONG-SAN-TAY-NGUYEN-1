
import React, { useState } from 'react';
import { Page, Product } from '../types';

interface ProductsProps {
  onPageChange?: (page: Page) => void;
  products: Product[];
  addToCart: (product: Product) => void;
}

const Categories = ["Tất cả", "Cà Phê", "Hạt Dinh Dưỡng", "Mật Ong", "Trà", "Gia Vị"];

const Products: React.FC<ProductsProps> = ({ onPageChange, products, addToCart }) => {
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  const filteredProducts = activeCategory === "Tất cả" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-stone-800 mb-6 brand-font uppercase tracking-tighter">Đặc Sản Mr Táo</h1>
        <p className="text-stone-500 italic max-w-2xl mx-auto">Chọn lọc những gì tốt đẹp nhất từ lòng đất mẹ Tây Nguyên.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {Categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all ${
              activeCategory === cat 
                ? 'bg-green-700 text-white shadow-xl shadow-green-100' 
                : 'bg-white text-stone-600 border border-stone-200 hover:border-green-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all group border border-stone-100 flex flex-col h-full">
            {/* Image Container with Hover Overlay */}
            <div className="h-80 overflow-hidden relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
              />
              
              {/* Badge */}
              <div className="absolute top-6 left-6 z-10">
                <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-bold uppercase text-stone-800 shadow-sm border border-stone-200">
                  {product.unit}
                </span>
              </div>

              {/* Quick View Hover Overlay */}
              <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center items-center p-8 text-center translate-y-4 group-hover:translate-y-0">
                <p className="text-white text-sm mb-6 line-clamp-4 leading-relaxed font-medium">
                  {product.description}
                </p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="bg-white text-green-800 px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-green-700 hover:text-white transition-all shadow-xl"
                >
                  Thêm nhanh vào giỏ
                </button>
              </div>
            </div>

            <div className="p-10 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs text-green-700 font-bold uppercase tracking-widest">{product.category}</span>
              </div>
              <h3 className="text-2xl font-bold text-stone-800 mb-4 group-hover:text-green-700 transition-colors">{product.name}</h3>
              
              <div className="mt-auto pt-8 border-t border-stone-50 flex justify-between items-center">
                <span className="text-3xl font-bold text-stone-900">{product.price.toLocaleString()}đ</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => { addToCart(product); onPageChange?.(Page.Cart); }}
                    className="px-6 py-3 bg-green-700 text-white rounded-2xl font-bold hover:bg-green-800 transition-all shadow-xl shadow-green-100 text-sm uppercase"
                  >
                    Mua Ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
