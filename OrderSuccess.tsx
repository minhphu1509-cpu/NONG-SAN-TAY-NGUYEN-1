
import React from 'react';
import { Page } from '../types';

interface OrderSuccessProps {
  onPageChange: (page: Page) => void;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({ onPageChange }) => {
  return (
    <div className="max-w-xl mx-auto px-4 py-32 text-center">
      <div className="w-24 h-24 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
      </div>
      <h1 className="text-4xl font-bold text-stone-800 mb-6 brand-font">Đặt Hàng Thành Công!</h1>
      <p className="text-stone-500 mb-10 leading-relaxed text-lg">
        Cảm ơn bạn đã tin dùng nông sản Tây Nguyên của Mr Táo. Đơn hàng của bạn đang được xử lý và sẽ sớm được giao đến.
      </p>
      <div className="space-y-4">
        <button 
          onClick={() => onPageChange(Page.Home)}
          className="w-full py-4 bg-green-800 text-white rounded-2xl font-bold hover:bg-green-900 transition-all shadow-lg"
        >
          Quay lại trang chủ
        </button>
        <button 
          onClick={() => onPageChange(Page.Products)}
          className="w-full py-4 bg-stone-100 text-stone-600 rounded-2xl font-bold hover:bg-stone-200 transition-all"
        >
          Tiếp tục mua sắm
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
