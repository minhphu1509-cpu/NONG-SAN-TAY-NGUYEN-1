
import React from 'react';
import { Page } from '../types';

interface FooterProps {
  onPageChange: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onPageChange }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white brand-font uppercase">Mr Táo</h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              Mang trọn tinh hoa từ đất đỏ bazan Tây Nguyên đến bàn ăn của mọi gia đình Việt. Cam kết sạch, chuẩn, ngon.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=100077295340415" target="_blank" className="hover:text-green-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.youtube.com/@mrtaovlog" target="_blank" className="hover:text-red-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="zalo.me/0766771509" className="hover:text-blue-500 transition-colors flex items-center justify-center bg-white text-blue-600 rounded-full w-6 h-6 text-[8px] font-bold">ZALO</a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Liên Kết</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => onPageChange(Page.Home)} className="hover:text-green-500 transition-colors">Trang chủ</button></li>
              <li><button onClick={() => onPageChange(Page.Products)} className="hover:text-green-500 transition-colors">Sản phẩm</button></li>
              <li><button onClick={() => onPageChange(Page.About)} className="hover:text-green-500 transition-colors">Giới thiệu</button></li>
              <li><button onClick={() => onPageChange(Page.Blog)} className="hover:text-green-500 transition-colors">Tin tức</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Sản phẩm chính</h4>
            <ul className="space-y-3 text-sm">
              <li>Cà phê hạt rang xay</li>
              <li>Hạt Mắc ca Đắk Lắk</li>
              <li>Tiêu đen, tiêu trắng</li>
              <li>Mật ong hoa rừng</li>
              <li>Hạt Điều Bình Phước</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Thông tin liên hệ</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-3 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>06 Nguyễn Bính, Tp Huế, VN</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-3 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span>0766 771 509</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-800 pt-8 text-center text-stone-500 text-xs">
          <p>© 2026 Nông Sản Tây Nguyên Mr Táo. Tất cả quyền lợi được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
