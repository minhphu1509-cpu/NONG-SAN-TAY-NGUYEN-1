
import React from 'react';
import { BlogPost } from '../types';

interface BlogProps {
  blogPosts: BlogPost[];
}

const Blog: React.FC<BlogProps> = ({ blogPosts }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 brand-font text-stone-800">Cẩm Nang Nông Sản</h1>
        <div className="w-24 h-1 bg-green-700 mx-auto mb-6"></div>
        <p className="text-stone-500 max-w-2xl mx-auto">Chia sẻ kiến thức về sức khỏe, văn hóa thưởng thức và những câu chuyện đằng sau nông sản sạch.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {blogPosts.map((post) => (
          <article key={post.id} className="group cursor-pointer">
            <div className="aspect-[16/10] rounded-[40px] overflow-hidden mb-8 shadow-xl">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            </div>
            <div className="space-y-4 px-2">
              <div className="flex items-center text-xs text-stone-400 font-bold uppercase tracking-widest">
                <span className="bg-stone-100 px-3 py-1 rounded-full">{post.date}</span>
                <span className="mx-4 text-green-700/30">/</span>
                <span className="text-green-700">{post.author}</span>
              </div>
              <h2 className="text-3xl font-bold text-stone-800 group-hover:text-green-700 transition-colors leading-tight">
                {post.title}
              </h2>
              <p className="text-stone-500 leading-relaxed text-lg line-clamp-3">
                {post.excerpt}
              </p>
              <button className="text-sm font-bold text-stone-900 group-hover:text-green-700 transition-all flex items-center pt-4 uppercase tracking-widest">
                Tiếp tục đọc 
                <svg className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
