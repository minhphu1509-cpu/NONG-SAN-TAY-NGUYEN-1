
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 brand-font text-green-800">Về Chúng Tôi</h1>
          <p className="text-stone-600 leading-relaxed mb-6 text-lg">
            Nông Sản Tây Nguyên Mr Táo được thành lập từ sự đam mê và trăn trở về giá trị đích thực của nông sản Việt. Chúng tôi sinh ra và lớn lên giữa những rẫy cà phê, rừng mắc ca bạt ngàn của Đắk Lắk, Gia Lai.
          </p>
          <p className="text-stone-600 leading-relaxed mb-6">
            Sứ mệnh của chúng tôi là mang trọn vẹn sự tinh túy của vùng đất Bazan đến tận tay người tiêu dùng thông qua quy trình chọn lọc khắt khe nhất. Không chỉ bán sản phẩm, chúng tôi bán sự an tâm và sức khỏe cho gia đình bạn.
          </p>
          <div className="flex space-x-8 mt-10">
            <div>
              <p className="text-3xl font-bold text-green-700">10+</p>
              <p className="text-xs uppercase text-stone-400 font-bold">Năm kinh nghiệm</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-700">5000+</p>
              <p className="text-xs uppercase text-stone-400 font-bold">Khách hàng tin dùng</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-full h-full border-2 border-green-700 rounded-3xl -z-10"></div>
          <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=1200" className="rounded-3xl shadow-2xl w-full h-[500px] object-cover" alt="Nông trại Mr Táo" />
        </div>
      </div>
    </div>
  );
};

export default About;
