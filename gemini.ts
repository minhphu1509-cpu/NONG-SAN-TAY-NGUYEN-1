
import { GoogleGenAI } from "@google/genai";

export const getGeminiResponse = async (message: string) => {
  try {
    // Khởi tạo instance mới mỗi lần gọi để đảm bảo sử dụng API key cập nhật nhất từ môi trường
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: `Bạn là trợ lý ảo thân thiện của "Nông Sản Tây Nguyên Mr Táo". 
        Cửa hàng chuyên cung cấp cà phê, hạt mắc ca, tiêu, mật ong và các loại nông sản Tây Nguyên chất lượng cao.
        Địa chỉ: 06 Nguyễn Bính, Tp Huế, VN. 
        SĐT: 0766771509.
        Màu sắc chủ đạo: Xanh lá và Nâu gỗ.
        Hãy trả lời ngắn gọn, lịch sự, tư vấn nhiệt tình về sản phẩm và lợi ích của nông sản sạch.
        Luôn chào khách bằng tên "Mr Táo" nếu phù hợp và kết thúc bằng lời mời ghé cửa hàng.`,
        temperature: 0.7,
      },
    });
    
    return response.text || "Xin lỗi, tôi không thể trả lời lúc này. Bạn vui lòng liên hệ hotline 0766771509 nhé!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Xin lỗi, tôi gặp chút trục trặc kết nối. Bạn vui lòng liên hệ hotline 0766771509 để được hỗ trợ nhanh nhất nhé!";
  }
};
