
import React from 'react';

const Services: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 brand-font text-stone-800 uppercase">Dịch Vụ Của Chúng Tôi</h1>
        <div className="w-24 h-1 bg-green-700 mx-auto mb-8"></div>
        <p className="text-stone-500 max-w-2xl mx-auto italic">Chúng tôi không chỉ cung cấp sản phẩm, mà còn mang đến những giải pháp giá trị cho đối tác và khách hàng.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            title: "Cung cấp sỉ & lẻ", 
            icon: "🛒", 
            desc: "Hỗ trợ các đại lý, quán café với mức giá cạnh tranh nhất thị trường. Chính sách chiết khấu linh hoạt cho đơn hàng số lượng lớn." 
          },
          { 
            title: "Quà tặng doanh nghiệp", 
            icon: "🎁", 
            desc: "Thiết kế set quà nông sản cao cấp, tinh tế cho đối tác và nhân viên trong các dịp lễ Tết, sự kiện quan trọng." 
          },
          { 
            title: "Rang xay theo yêu cầu", 
            icon: "☕", 
            desc: "Dịch vụ gia công, rang xay cà phê theo profile riêng biệt của khách hàng, đảm bảo hương vị độc bản cho thương hiệu bạn." 
          },
          { 
            title: "Giao hàng tận nơi", 
            icon: "🚚", 
            desc: "Hệ thống vận chuyển chuyên nghiệp, đảm bảo hàng hóa đến tay khách hàng nhanh chóng và nguyên vẹn trên toàn quốc." 
          },
          { 
            title: "Tư vấn nông sản sạch", 
            icon: "💡", 
            desc: "Chia sẻ kiến thức về cách chọn lọc, bảo quản và sử dụng các loại hạt dinh dưỡng, cà phê chuẩn gu Tây Nguyên." 
          },
          { 
            title: "Liên kết bao tiêu", 
            icon: "🤝", 
            desc: "Hợp tác với các hộ nông dân xây dựng vùng nguyên liệu sạch, bền vững, đạt tiêu chuẩn xuất khẩu." 
          }
        ].map((s, i) => (
          <div key={i} className="p-10 bg-white rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
            <h3 className="text-xl font-bold mb-4 text-stone-800">{s.title}</h3>
            <p className="text-stone-500 text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
