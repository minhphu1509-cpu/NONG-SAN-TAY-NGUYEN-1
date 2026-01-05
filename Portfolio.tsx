
import React from 'react';
import { PortfolioItem } from '../types';

interface PortfolioProps {
  portfolioItems: PortfolioItem[];
}

const Portfolio: React.FC<PortfolioProps> = ({ portfolioItems }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 brand-font text-stone-800">Góc Hình Ảnh</h1>
        <p className="text-stone-500 italic">Cùng nhìn lại hành trình của Mr Táo từ núi rừng đến tay bạn</p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {portfolioItems.map((img) => (
          <div key={img.id} className="relative group overflow-hidden rounded-3xl bg-stone-200">
            <img src={img.url} alt={img.title} className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 text-white">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">{img.cat}</span>
              <h3 className="text-xl font-bold">{img.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
