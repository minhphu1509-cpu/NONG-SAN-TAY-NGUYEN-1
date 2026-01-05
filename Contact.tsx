
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <span className="text-green-700 font-bold uppercase tracking-widest text-sm mb-4 block">Liên hệ</span>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-8 brand-font leading-tight">Chúng tôi luôn lắng nghe bạn.</h1>
          <p className="text-stone-600 mb-12 text-lg leading-relaxed">
            Bạn có câu hỏi về sản phẩm, muốn đặt hàng sỉ hoặc muốn làm đối tác? Hãy để lại thông tin, Mr Táo sẽ phản hồi bạn trong vòng 24h.
          </p>

          <div className="space-y-8">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-700 shrink-0 mr-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
              </div>
              <div>
                <h4 className="font-bold text-stone-800 mb-1">Địa chỉ</h4>
                <p className="text-stone-500">06 Nguyễn Bính, Tp Huế, VN</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-700 shrink-0 mr-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <div>
                <h4 className="font-bold text-stone-800 mb-1">Điện thoại</h4>
                <p className="text-stone-500">0766 771 509</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-10 shadow-2xl border border-stone-100 relative overflow-hidden">
          {isSent ? (
            <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in py-20">
              <div className="w-20 h-20 bg-green-100 text-green-700 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-stone-800 mb-2">Gửi thành công!</h3>
              <p className="text-stone-500">Mr Táo đã nhận được tin nhắn của bạn và sẽ sớm phản hồi.</p>
              <button 
                onClick={() => setIsSent(false)}
                className="mt-8 text-green-700 font-bold hover:underline"
              >
                Gửi thêm tin nhắn khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-400 uppercase">Họ và tên</label>
                  <input required type="text" className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 transition-all" placeholder="Nguyễn Văn A" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-400 uppercase">Số điện thoại</label>
                  <input required type="tel" className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 transition-all" placeholder="0901 xxx xxx" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-400 uppercase">Chủ đề</label>
                <select className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 transition-all">
                  <option>Đặt hàng sản phẩm</option>
                  <option>Yêu cầu báo giá sỉ</option>
                  <option>Hợp tác kinh doanh</option>
                  <option>Góp ý dịch vụ</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-400 uppercase">Lời nhắn</label>
                <textarea required className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 transition-all h-32" placeholder="Nội dung chi tiết..."></textarea>
              </div>
              <button className="w-full py-4 bg-green-700 text-white font-bold rounded-xl hover:bg-green-800 transition-all shadow-xl shadow-green-100">
                Gửi thông tin ngay
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
