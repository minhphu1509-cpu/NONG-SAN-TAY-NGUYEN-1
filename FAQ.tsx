
import React, { useState } from 'react';
import { FAQItem } from '../types';

interface FAQProps {
  faqs: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 brand-font text-stone-800 uppercase">Hỏi Đáp Thường Gặp</h1>
        <div className="w-24 h-1 bg-green-700 mx-auto mb-8"></div>
        <p className="text-stone-500 italic">Mọi điều bạn cần biết về chất lượng và dịch vụ tại Mr Táo.</p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-stone-200 rounded-[30px] overflow-hidden bg-white shadow-sm transition-all hover:shadow-md">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center p-8 text-left hover:bg-stone-50 transition-colors"
            >
              <span className="font-bold text-xl text-stone-800 pr-8 leading-tight">{faq.question}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${openIndex === index ? 'bg-green-700 text-white' : 'bg-stone-100 text-stone-500'}`}>
                <svg 
                  className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-8 pt-0 text-stone-600 border-t border-stone-50 leading-relaxed text-lg">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-20 p-12 bg-green-900 rounded-[40px] text-center text-white relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-4">Bạn vẫn còn thắc mắc khác?</h3>
          <p className="text-stone-300 mb-8 max-w-md mx-auto">Đội ngũ trợ lý ảo AI và Mr Táo luôn sẵn sàng hỗ trợ bạn 24/7.</p>
          <button className="px-10 py-4 bg-amber-500 text-green-900 rounded-2xl font-bold hover:bg-amber-400 transition-all shadow-xl">
            Chat trực tiếp ngay
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      </div>
    </div>
  );
};

export default FAQ;
