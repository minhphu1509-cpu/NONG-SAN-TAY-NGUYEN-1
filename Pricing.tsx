
import React from 'react';
import { Page } from '../types';

interface PricingProps {
  onPageChange: (page: Page) => void;
}

const Pricing: React.FC<PricingProps> = ({ onPageChange }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 brand-font text-stone-800">Chính Sách & Bảng Giá</h1>
        <p className="text-stone-500">Chúng tôi luôn cam kết mức giá tốt nhất đi kèm chất lượng thượng hạng</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {[
          {
            name: "Khách lẻ",
            price: "Giá niêm yết",
            features: ["Sản phẩm đóng gói chuẩn", "Tư vấn sử dụng 24/7", "Giao hàng toàn quốc", "Đổi trả trong 7 ngày"],
            cta: "Xem sản phẩm",
            target: Page.Products,
            highlight: false
          },
          {
            name: "Khách sỉ / Đại lý",
            price: "Chiết khấu 15-30%",
            features: ["Hỗ trợ thiết kế thương hiệu", "Giá sỉ cạnh tranh nhất", "Miễn phí vận chuyển nội thành", "Đào tạo pha chế/kiến thức"],
            cta: "Nhận báo giá",
            target: Page.Contact,
            highlight: true
          },
          {
            name: "Doanh nghiệp",
            price: "Thiết kế riêng",
            features: ["Set quà tặng cao cấp", "In logo thương hiệu", "Hợp đồng xuất hóa đơn", "Tùy chọn combo hạt & trà"],
            cta: "Liên hệ tư vấn",
            target: Page.Contact,
            highlight: false
          }
        ].map((plan, i) => (
          <div key={i} className={`p-10 rounded-3xl flex flex-col ${plan.highlight ? 'bg-green-900 text-white shadow-2xl scale-105 z-10' : 'bg-white text-stone-800 border border-stone-100 shadow-sm'}`}>
            <h3 className={`text-xl font-bold mb-2 ${plan.highlight ? 'text-amber-400' : 'text-green-800'}`}>{plan.name}</h3>
            <p className="text-3xl font-bold mb-8">{plan.price}</p>
            <ul className="space-y-4 mb-10 flex-grow">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center text-sm">
                  <svg className={`w-5 h-5 mr-3 ${plan.highlight ? 'text-green-400' : 'text-green-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {f}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => onPageChange(plan.target)}
              className={`py-3 rounded-xl font-bold transition-all ${plan.highlight ? 'bg-amber-500 text-green-900 hover:bg-amber-400' : 'bg-green-700 text-white hover:bg-green-800'}`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
