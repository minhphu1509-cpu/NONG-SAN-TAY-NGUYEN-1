
import React, { useState, useRef } from 'react';
import { Product, BlogPost, FAQItem, TeamMember, Order, PortfolioItem, Promotion } from '../types';

interface AdminProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  faqs: FAQItem[];
  setFaqs: React.Dispatch<React.SetStateAction<FAQItem[]>>;
  team: TeamMember[];
  setTeam: React.Dispatch<React.SetStateAction<TeamMember[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  portfolioItems: PortfolioItem[];
  setPortfolioItems: React.Dispatch<React.SetStateAction<PortfolioItem[]>>;
  promotions: Promotion[];
  setPromotions: React.Dispatch<React.SetStateAction<Promotion[]>>;
}

type AdminTab = 'dashboard' | 'products' | 'orders' | 'blog' | 'faq' | 'team' | 'portfolio' | 'settings' | 'promotions';

const Admin: React.FC<AdminProps> = ({ 
  products, setProducts, 
  blogPosts, setBlogPosts, 
  faqs, setFaqs, 
  team, setTeam,
  orders, setOrders,
  portfolioItems, setPortfolioItems,
  promotions, setPromotions
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState(localStorage.getItem('adminPassword') || '');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [settingsStatus, setSettingsStatus] = useState({ type: '', message: '' });

  // --- Helper: File to Base64 ---
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setPreviewImage(base64);
      } catch (err) {
        console.error("Error converting file:", err);
      }
    }
  };

  // --- Handlers ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === adminPassword) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Mật khẩu không chính xác. Vui lòng thử lại.');
    }
  };

  const handleSetupPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.length < 6) {
      setLoginError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }
    localStorage.setItem('adminPassword', passwordInput);
    setAdminPassword(passwordInput);
    setIsLoggedIn(true);
    setLoginError('');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const current = formData.get('currentPassword') as string;
    const next = formData.get('newPassword') as string;
    const confirm = formData.get('confirmPassword') as string;

    if (current !== adminPassword) {
      setSettingsStatus({ type: 'error', message: 'Mật khẩu hiện tại không đúng.' });
      return;
    }
    if (next.length < 6) {
      setSettingsStatus({ type: 'error', message: 'Mật khẩu mới phải từ 6 ký tự.' });
      return;
    }
    if (next !== confirm) {
      setSettingsStatus({ type: 'error', message: 'Xác nhận mật khẩu không khớp.' });
      return;
    }

    localStorage.setItem('adminPassword', next);
    setAdminPassword(next);
    setSettingsStatus({ type: 'success', message: 'Cập nhật mật khẩu thành công!' });
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setSettingsStatus({ type: '', message: '' }), 3000);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const togglePromotionStatus = (id: string) => {
    setPromotions(prev => prev.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
  };

  const handleDelete = (type: AdminTab, id: string | number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa mục này?")) return;
    
    switch(type) {
      case 'products': setProducts(prev => prev.filter(p => p.id !== id)); break;
      case 'blog': setBlogPosts(prev => prev.filter(p => p.id !== id)); break;
      case 'faq': setFaqs(prev => prev.filter((_, i) => i !== id)); break;
      case 'team': setTeam(prev => prev.filter((_, i) => i !== id)); break;
      case 'orders': setOrders(prev => prev.filter(o => o.id !== id)); break;
      case 'portfolio': setPortfolioItems(prev => prev.filter(p => p.id !== id)); break;
      case 'promotions': setPromotions(prev => prev.filter(p => p.id !== id)); break;
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    // Use previewImage if uploaded, otherwise use the text field URL
    const finalImage = previewImage || (data.image as string) || (data.url as string);

    if (activeTab === 'products') {
      const newProd = { 
        ...data, 
        price: Number(data.price), 
        image: finalImage,
        id: editingItem?.id || Date.now().toString() 
      } as Product;
      setProducts(prev => editingItem ? prev.map(p => p.id === editingItem.id ? newProd : p) : [newProd, ...prev]);
    } else if (activeTab === 'blog') {
      const newPost = { 
        ...data, 
        image: finalImage,
        id: editingItem?.id || Date.now().toString(), 
        date: new Date().toISOString().split('T')[0] 
      } as BlogPost;
      setBlogPosts(prev => editingItem ? prev.map(p => p.id === editingItem.id ? newPost : p) : [newPost, ...prev]);
    } else if (activeTab === 'faq') {
      const newFaq = data as unknown as FAQItem;
      setFaqs(prev => editingItem !== null ? prev.map((f, i) => i === editingItem ? newFaq : f) : [newFaq, ...prev]);
    } else if (activeTab === 'team') {
      const newMember = {
        ...data,
        image: finalImage
      } as unknown as TeamMember;
      setTeam(prev => editingItem !== null ? prev.map((m, i) => i === editingItem ? newMember : m) : [newMember, ...prev]);
    } else if (activeTab === 'portfolio') {
      const newPort = {
        ...data,
        url: finalImage,
        id: editingItem?.id || Date.now().toString()
      } as unknown as PortfolioItem;
      setPortfolioItems(prev => editingItem ? prev.map(p => p.id === editingItem.id ? newPort : p) : [newPort, ...prev]);
    } else if (activeTab === 'promotions') {
      const newPromo = {
        ...data,
        id: editingItem?.id || Date.now().toString(),
        isActive: editingItem ? editingItem.isActive : true
      } as unknown as Promotion;
      setPromotions(prev => editingItem ? prev.map(p => p.id === editingItem.id ? newPromo : p) : [newPromo, ...prev]);
    }

    setShowModal(false);
    setEditingItem(null);
    setPreviewImage(null);
  };

  const openAddModal = () => {
    setEditingItem(null);
    setPreviewImage(null);
    setShowModal(true);
  };

  const openEditModal = (item: any, index?: number) => {
    setEditingItem(index !== undefined ? index : item);
    setPreviewImage(item.image || item.url || null);
    setShowModal(true);
  };

  // --- Auth Screens ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
        <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-stone-100 w-full max-w-md animate-fade-in">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-green-800 rounded-full flex items-center justify-center text-white mx-auto mb-4 text-2xl font-bold italic shadow-xl">T</div>
            <h2 className="text-3xl font-bold text-stone-800 brand-font mb-2">
              {adminPassword ? 'Đăng Nhập Quản Trị' : 'Thiết Lập Quản Trị'}
            </h2>
            <p className="text-stone-500 text-sm">
              {adminPassword ? 'Vui lòng nhập mật khẩu để tiếp tục.' : 'Tạo mật khẩu quản trị cho lần đầu sử dụng.'}
            </p>
          </div>

          <form onSubmit={adminPassword ? handleLogin : handleSetupPassword} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Mật khẩu</label>
              <input 
                type="password" 
                required 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-stone-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-green-700 transition-all text-center tracking-widest"
              />
              {loginError && <p className="text-red-500 text-xs text-center font-medium animate-pulse">{loginError}</p>}
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-green-800 text-white font-bold rounded-2xl hover:bg-green-900 transition-all shadow-xl shadow-green-100 uppercase tracking-widest text-sm"
            >
              {adminPassword ? 'Vào hệ thống' : 'Lưu & Bắt đầu'}
            </button>
          </form>
          
          <div className="mt-8 text-center text-[10px] text-stone-400 font-medium">
            <p>© 2026 MR TÁO CMS • SECURE ACCESS</p>
          </div>
        </div>
      </div>
    );
  }

  // --- Main Render Components ---
  const TabButton = ({ id, label, icon }: { id: AdminTab, label: string, icon: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-all font-medium text-sm whitespace-nowrap ${
        activeTab === id ? 'border-green-700 text-green-700 bg-green-50/50' : 'border-transparent text-stone-500 hover:text-stone-800'
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-bold text-stone-800 brand-font">Quản Trị Mr Táo</h1>
          <p className="text-stone-500 text-sm">Chào mừng bạn trở lại, Quản trị viên.</p>
        </div>
        <div className="flex bg-white rounded-2xl shadow-sm border border-stone-200 overflow-x-auto max-w-full custom-scrollbar">
          <TabButton id="dashboard" label="Tổng quan" icon="📊" />
          <TabButton id="orders" label="Đơn hàng" icon="🛒" />
          <TabButton id="promotions" label="Khuyến mãi" icon="🏷️" />
          <TabButton id="products" label="Sản phẩm" icon="📦" />
          <TabButton id="blog" label="Bài viết" icon="📰" />
          <TabButton id="portfolio" label="Hình ảnh" icon="📸" />
          <TabButton id="team" label="Đội ngũ" icon="👥" />
          <TabButton id="faq" label="Hỏi đáp" icon="❓" />
          <TabButton id="settings" label="Cấu hình" icon="⚙️" />
        </div>
      </div>

      <div className="animate-fade-in">
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-green-800 p-8 rounded-[40px] text-white shadow-xl relative overflow-hidden group">
               <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">Doanh thu tháng</p>
               <h3 className="text-4xl font-bold">{orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}đ</h3>
               <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full group-hover:scale-110 transition-transform"></div>
            </div>
            <div className="bg-white p-8 rounded-[40px] border border-stone-100 shadow-sm flex flex-col justify-between">
               <p className="text-stone-400 text-xs font-bold uppercase mb-2">Đơn hàng mới</p>
               <h3 className="text-4xl font-bold text-stone-800">{orders.filter(o => o.status === 'pending').length}</h3>
               <div className="mt-4 text-xs text-green-600 font-bold">↑ 12% so với tháng trước</div>
            </div>
            <div className="bg-white p-8 rounded-[40px] border border-stone-100 shadow-sm flex flex-col justify-between">
               <p className="text-stone-400 text-xs font-bold uppercase mb-2">Sản phẩm hiện có</p>
               <h3 className="text-4xl font-bold text-stone-800">{products.length}</h3>
               <div className="mt-4 text-xs text-stone-500">Đã cập nhật 2h trước</div>
            </div>
            <div className="bg-white p-8 rounded-[40px] border border-stone-100 shadow-sm flex flex-col justify-between">
               <p className="text-stone-400 text-xs font-bold uppercase mb-2">Chương trình khuyến mãi</p>
               <h3 className="text-4xl font-bold text-stone-800">{promotions.filter(p => p.isActive).length}</h3>
               <div className="mt-4 text-xs text-amber-600 font-bold">Đang chạy</div>
            </div>
          </div>
        )}

        {activeTab === 'promotions' && (
          <div className="bg-white rounded-[40px] shadow-sm border border-stone-100 overflow-hidden">
            <div className="p-8 border-b border-stone-100 flex justify-between items-center">
              <h2 className="font-bold text-stone-800 uppercase text-sm tracking-widest">Chiến dịch khuyến mãi ({promotions.length})</h2>
              <button onClick={openAddModal} className="px-6 py-2 bg-green-800 text-white rounded-xl text-xs font-bold hover:bg-green-900 transition-all">+ Thêm chương trình</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-stone-50 text-stone-400 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="px-8 py-5">Tên chương trình</th>
                    <th className="px-8 py-5">Mức giảm</th>
                    <th className="px-8 py-5">Thời gian</th>
                    <th className="px-8 py-5">Trạng thái</th>
                    <th className="px-8 py-5">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {promotions.map(promo => (
                    <tr key={promo.id} className="hover:bg-stone-50/50">
                      <td className="px-8 py-6">
                        <p className="font-bold text-stone-800">{promo.title}</p>
                        <p className="text-[10px] text-stone-400 max-w-xs truncate">{promo.description}</p>
                      </td>
                      <td className="px-8 py-6 font-bold text-amber-600">{promo.discount}</td>
                      <td className="px-8 py-6 text-xs text-stone-500">
                        {promo.startDate} đến {promo.endDate}
                      </td>
                      <td className="px-8 py-6">
                        <button 
                          onClick={() => togglePromotionStatus(promo.id)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                            promo.isActive ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-400'
                          }`}
                        >
                          {promo.isActive ? 'Đang chạy' : 'Tạm dừng'}
                        </button>
                      </td>
                      <td className="px-8 py-6 flex gap-4">
                        <button onClick={() => openEditModal(promo)} className="text-blue-500 hover:text-blue-700">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button onClick={() => handleDelete('promotions', promo.id)} className="text-red-400 hover:text-red-600">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-[40px] p-10 shadow-sm border border-stone-100">
               <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-700">
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                 </div>
                 <h2 className="text-2xl font-bold text-stone-800 brand-font">Thay đổi mật khẩu đăng nhập</h2>
               </div>

               <form onSubmit={handleChangePassword} className="space-y-6">
                 {settingsStatus.message && (
                   <div className={`p-4 rounded-2xl text-sm font-medium ${settingsStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                     {settingsStatus.message}
                   </div>
                 )}
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Mật khẩu hiện tại</label>
                   <input required name="currentPassword" type="password" className="w-full bg-stone-50 border-none rounded-xl px-5 py-3 focus:ring-2 focus:ring-green-700" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Mật khẩu mới</label>
                   <input required name="newPassword" type="password" className="w-full bg-stone-50 border-none rounded-xl px-5 py-3 focus:ring-2 focus:ring-green-700" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Xác nhận mật khẩu mới</label>
                   <input required name="confirmPassword" type="password" className="w-full bg-stone-50 border-none rounded-xl px-5 py-3 focus:ring-2 focus:ring-green-700" />
                 </div>
                 <button type="submit" className="w-full py-4 bg-green-800 text-white font-bold rounded-2xl hover:bg-green-900 transition-all shadow-xl shadow-green-100 uppercase text-xs tracking-widest">Cập nhật mật khẩu</button>
                 <button 
                  type="button" 
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full py-2 text-stone-400 text-[10px] font-bold uppercase hover:text-red-500 transition-colors"
                 >
                   Đăng xuất khỏi hệ thống
                 </button>
               </form>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-[40px] shadow-sm border border-stone-100 overflow-hidden">
            <div className="p-8 border-b border-stone-100 flex justify-between items-center">
               <h2 className="font-bold text-stone-800 uppercase text-sm tracking-widest">Danh sách đơn hàng</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-stone-50 text-stone-400 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="px-8 py-5">Mã đơn</th>
                    <th className="px-8 py-5">Khách hàng</th>
                    <th className="px-8 py-5">Tổng tiền</th>
                    <th className="px-8 py-5">Trạng thái</th>
                    <th className="px-8 py-5">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-stone-50/50">
                      <td className="px-8 py-6 font-bold text-green-700">{order.id}</td>
                      <td className="px-8 py-6">
                        <p className="font-bold text-stone-800">{order.customerName}</p>
                        <p className="text-[10px] text-stone-500">{order.phone}</p>
                      </td>
                      <td className="px-8 py-6 font-bold text-stone-800">{order.total.toLocaleString()}đ</td>
                      <td className="px-8 py-6">
                        <select 
                          value={order.status} 
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                          className={`text-xs font-bold px-3 py-1 rounded-full border-none focus:ring-0 cursor-pointer ${
                            order.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                            order.status === 'confirmed' ? 'bg-blue-100 text-blue-700' : 
                            order.status === 'shipping' ? 'bg-purple-100 text-purple-700' :
                            'bg-green-100 text-green-700'
                          }`}
                        >
                          <option value="pending">Chờ xử lý</option>
                          <option value="confirmed">Đã xác nhận</option>
                          <option value="shipping">Đang giao</option>
                          <option value="completed">Hoàn thành</option>
                        </select>
                      </td>
                      <td className="px-8 py-6">
                         <button onClick={() => handleDelete('orders', order.id)} className="text-red-400 hover:text-red-600">
                           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white rounded-[40px] shadow-sm border border-stone-100 overflow-hidden">
            <div className="p-8 border-b border-stone-100 flex justify-between items-center">
              <h2 className="font-bold text-stone-800 uppercase text-sm tracking-widest">Kho hàng ({products.length})</h2>
              <button onClick={openAddModal} className="px-6 py-2 bg-green-800 text-white rounded-xl text-xs font-bold hover:bg-green-900 transition-all">+ Thêm sản phẩm</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-stone-50 text-stone-400 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="px-8 py-5">Ảnh</th>
                    <th className="px-8 py-5">Tên sản phẩm</th>
                    <th className="px-8 py-5">Danh mục</th>
                    <th className="px-8 py-5">Giá</th>
                    <th className="px-8 py-5">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-stone-50/50">
                      <td className="px-8 py-4"><img src={product.image} className="w-12 h-12 object-cover rounded-lg" /></td>
                      <td className="px-8 py-4 font-bold text-stone-800">{product.name}</td>
                      <td className="px-8 py-4"><span className="bg-stone-100 px-2 py-1 rounded text-[10px] text-stone-600 uppercase font-bold">{product.category}</span></td>
                      <td className="px-8 py-4 font-bold text-green-700">{product.price.toLocaleString()}đ</td>
                      <td className="px-8 py-4 flex gap-4 mt-3">
                         <button onClick={() => openEditModal(product)} className="text-blue-500 hover:text-blue-700 font-bold">Sửa</button>
                         <button onClick={() => handleDelete('products', product.id)} className="text-red-500 hover:text-red-700 font-bold">Xóa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="bg-white rounded-[40px] shadow-sm border border-stone-100 overflow-hidden">
            <div className="p-8 border-b border-stone-100 flex justify-between items-center">
              <h2 className="font-bold text-stone-800 uppercase text-sm tracking-widest">Góc hình ảnh ({portfolioItems.length})</h2>
              <button onClick={openAddModal} className="px-6 py-2 bg-green-800 text-white rounded-xl text-xs font-bold hover:bg-green-900">+ Thêm ảnh</button>
            </div>
            <div className="p-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
               {portfolioItems.map((item) => (
                 <div key={item.id} className="relative group rounded-2xl overflow-hidden aspect-square shadow-sm">
                    <img src={item.url} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                       <button onClick={() => openEditModal(item)} className="text-white text-xs font-bold bg-blue-600 px-3 py-1 rounded-full">Sửa</button>
                       <button onClick={() => handleDelete('portfolio', item.id)} className="text-white text-xs font-bold bg-red-600 px-3 py-1 rounded-full">Xóa</button>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="bg-white rounded-[40px] shadow-sm border border-stone-100 overflow-hidden">
             <div className="p-8 border-b border-stone-100 flex justify-between items-center">
              <h2 className="font-bold text-stone-800 uppercase text-sm tracking-widest">Quản lý đội ngũ</h2>
              <button onClick={openAddModal} className="px-6 py-2 bg-green-800 text-white rounded-xl text-xs font-bold hover:bg-green-900">+ Thêm thành viên</button>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {team.map((member, i) => (
                 <div key={i} className="flex items-center gap-4 p-4 border border-stone-100 rounded-2xl">
                    <img src={member.image} className="w-16 h-16 rounded-full object-cover" />
                    <div className="flex-grow">
                       <h4 className="font-bold text-stone-800">{member.name}</h4>
                       <p className="text-xs text-green-700 font-bold">{member.role}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                       <button onClick={() => openEditModal(member, i)} className="text-xs text-blue-500 font-bold">Sửa</button>
                       <button onClick={() => handleDelete('team', i)} className="text-xs text-red-500 font-bold">Xóa</button>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        )}

        {activeTab === 'blog' && (
           <div className="bg-white rounded-[40px] shadow-sm border border-stone-100 overflow-hidden">
            <div className="p-8 border-b border-stone-100 flex justify-between items-center">
              <h2 className="font-bold text-stone-800 uppercase text-sm tracking-widest">Biên tập bài viết</h2>
              <button onClick={openAddModal} className="px-6 py-2 bg-green-800 text-white rounded-xl text-xs font-bold hover:bg-green-900">+ Bài viết mới</button>
            </div>
            <div className="p-8 space-y-4">
               {blogPosts.map((post) => (
                 <div key={post.id} className="flex justify-between items-center p-4 bg-stone-50 rounded-2xl hover:bg-stone-100 transition-all">
                    <div className="flex items-center gap-4">
                       <img src={post.image} className="w-16 h-10 object-cover rounded-lg" />
                       <div>
                          <h4 className="font-bold text-stone-800 line-clamp-1">{post.title}</h4>
                          <p className="text-[10px] text-stone-400 font-bold">{post.date} | Tác giả: {post.author}</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <button onClick={() => openEditModal(post)} className="text-xs font-bold text-blue-600">Sửa</button>
                       <button onClick={() => handleDelete('blog', post.id)} className="text-xs font-bold text-red-600">Xóa</button>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
           <div className="bg-white rounded-[40px] shadow-sm border border-stone-100 overflow-hidden">
            <div className="p-8 border-b border-stone-100 flex justify-between items-center">
              <h2 className="font-bold text-stone-800 uppercase text-sm tracking-widest">Hỏi đáp (FAQ)</h2>
              <button onClick={openAddModal} className="px-6 py-2 bg-green-800 text-white rounded-xl text-xs font-bold hover:bg-green-900">+ Thêm câu hỏi</button>
            </div>
            <div className="p-8 space-y-4">
               {faqs.map((faq, i) => (
                 <div key={i} className="p-6 border border-stone-100 rounded-2xl relative group">
                    <h4 className="font-bold text-stone-800 mb-2">{faq.question}</h4>
                    <p className="text-sm text-stone-500 italic">{faq.answer}</p>
                    <div className="absolute top-4 right-4 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button onClick={() => openEditModal(faq, i)} className="text-xs text-blue-500 font-bold">Sửa</button>
                       <button onClick={() => handleDelete('faq', i)} className="text-xs text-red-500 font-bold">Xóa</button>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL SYSTEM */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-[40px] w-full max-w-2xl overflow-hidden shadow-2xl animate-fade-in-up">
             <div className="bg-green-800 p-8 text-white flex justify-between items-center">
                <h3 className="text-2xl font-bold brand-font">{editingItem !== null ? 'Chỉnh sửa' : 'Thêm mới'} {activeTab.toUpperCase()}</h3>
                <button onClick={() => setShowModal(false)} className="text-white/60 hover:text-white">
                   <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
             </div>
             
             <form onSubmit={handleSave} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                {/* Common Image Upload Section */}
                {(activeTab === 'products' || activeTab === 'blog' || activeTab === 'team' || activeTab === 'portfolio') && (
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase text-stone-400 block tracking-widest">Hình ảnh</label>
                    <div className="flex flex-col sm:flex-row items-center gap-6 p-6 border-2 border-dashed border-stone-100 rounded-[30px] bg-stone-50 group hover:border-green-700 transition-colors">
                      <div className="w-32 h-32 rounded-2xl bg-white shadow-sm flex-shrink-0 overflow-hidden flex items-center justify-center border border-stone-200">
                        {previewImage ? (
                          <img src={previewImage} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-stone-300">No Image</span>
                        )}
                      </div>
                      <div className="flex-grow space-y-3 w-full">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageFileChange}
                          className="hidden" 
                          id="fileUpload" 
                        />
                        <label 
                          htmlFor="fileUpload"
                          className="inline-block px-6 py-2 bg-stone-800 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-stone-700 transition-all uppercase tracking-widest"
                        >
                          Tải ảnh từ máy
                        </label>
                        <p className="text-[10px] text-stone-400">Hoặc nhập liên kết ảnh:</p>
                        <input 
                          name={activeTab === 'portfolio' ? 'url' : 'image'}
                          defaultValue={editingItem?.image || editingItem?.url}
                          onChange={(e) => setPreviewImage(e.target.value)}
                          placeholder="https://..."
                          className="w-full bg-white border border-stone-100 rounded-xl px-4 py-2 text-xs focus:ring-1 focus:ring-green-700"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'products' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-stone-400">Tên sản phẩm</label>
                          <input required name="name" defaultValue={editingItem?.name} className="w-full bg-stone-50 border-none rounded-xl px-4 py-3" />
                       </div>
                       <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-stone-400">Giá (VNĐ)</label>
                          <input required name="price" type="number" defaultValue={editingItem?.price} className="w-full bg-stone-50 border-none rounded-xl px-4 py-3" />
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-stone-400">Danh mục</label>
                          <select name="category" defaultValue={editingItem?.category} className="w-full bg-stone-50 border-none rounded-xl px-4 py-3">
                             <option>Cà Phê</option>
                             <option>Hạt Dinh Dưỡng</option>
                             <option>Mật Ong</option>
                             <option>Trà</option>
                             <option>Gia Vị</option>
                          </select>
                       </div>
                       <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-stone-400">Đơn vị (VD: Gói 500g)</label>
                          <input required name="unit" defaultValue={editingItem?.unit} className="w-full bg-stone-50 border-none rounded-xl px-4 py-3" />
                       </div>
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold uppercase text-stone-400">Mô tả ngắn</label>
                       <textarea required name="description" defaultValue={editingItem?.description} className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 h-24" />
                    </div>
                  </>
                )}

                {activeTab === 'promotions' && (
                  <>
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold uppercase text-stone-400">Tên chương trình</label>
                       <input required name="title" defaultValue={editingItem?.title} className="w-full bg-stone-50 border-none rounded-xl px-4 py-3" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-stone-400">Mức giảm (VD: 10% hoặc 50k)</label>
                          <input required name="discount" defaultValue={editingItem?.discount} className="w-full bg-stone-50 border-none rounded-xl px-4 py-3" />
                      </div>
                      <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-stone-400">Trạng thái</label>
                          <select name="isActive" defaultValue={editingItem?.isActive?.toString()} className="w-full bg-stone-50 border-none rounded-xl px-4 py-3">
                            <option value="true">Kích hoạt</option>
                            <option value="false">Tạm dừng</option>
                          </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-stone-400">Ngày bắt đầu</label>
                          <input required name="startDate" type="date" defaultValue={editingItem?.startDate} className="w-full bg-stone-50 border-none rounded-xl px-4 py-3" />
                       </div>
                       <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-stone-400">Ngày kết thúc</label>
                          <input required name="endDate" type="date" defaultValue={editingItem?.endDate} className="w-full bg-stone-50 border-none rounded-xl px-4 py-3" />
                       </div>
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold uppercase text-stone-400">Chi tiết ưu đãi</label>
                       <textarea required name="description" defaultValue={editingItem?.description} className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 h-24" />
                    </div>
                  </>
                )}

                {activeTab === 'portfolio' && (
                  <>
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold uppercase text-stone-400">Tiêu đề ảnh</label>
                       <input required name="title" defaultValue={editingItem?.title} className="w-full bg-stone-50 border-none rounded-xl px-4 py-3" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold uppercase text-stone-400">Phân loại</label>
                       <input required name="cat" defaultValue={editingItem?.cat} placeholder="VD: Nguồn nguyên liệu" className="w-full bg-stone-50 border-none rounded-xl px-4 py-3" />
                    </div>
                  </>
                )}

                {activeTab === 'blog' && (
                  <>
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold uppercase text-stone-400">Tiêu đề bài viết</label>
                       <input required name="title" defaultValue={editingItem?.title} className="w-full bg-stone-50 border-none rounded-xl px-4 py-3" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold uppercase text-stone-400">Tác giả</label>
                       <input required name="author" defaultValue={editingItem?.author || 'Mr Táo'} className="w-full bg-stone-50 border-none rounded-xl px-4 py-3" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold uppercase text-stone-400">Nội dung tóm tắt</label>
                       <textarea required name="excerpt" defaultValue={editingItem?.excerpt} className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 h-32" />
                    </div>
                  </>
                )}

                {activeTab === 'team' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-stone-400">Tên thành viên</label>
                          <input required name="name" defaultValue={team[editingItem as number]?.name} className="w-full bg-stone-50 border-none rounded-xl px-4 py-3" />
                       </div>
                       <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-stone-400">Chức vụ</label>
                          <input required name="role" defaultValue={team[editingItem as number]?.role} className="w-full bg-stone-50 border-none rounded-xl px-4 py-3" />
                       </div>
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold uppercase text-stone-400">Tiểu sử ngắn</label>
                       <textarea required name="bio" defaultValue={team[editingItem as number]?.bio} className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 h-24" />
                    </div>
                  </>
                )}

                {activeTab === 'faq' && (
                  <>
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold uppercase text-stone-400">Câu hỏi</label>
                       <input required name="question" defaultValue={faqs[editingItem as number]?.question} className="w-full bg-stone-50 border-none rounded-xl px-4 py-3" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold uppercase text-stone-400">Câu trả lời</label>
                       <textarea required name="answer" defaultValue={faqs[editingItem as number]?.answer} className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 h-32" />
                    </div>
                  </>
                )}

                <div className="flex gap-4 pt-4 sticky bottom-0 bg-white">
                   <button type="submit" className="flex-1 py-4 bg-green-800 text-white font-bold rounded-2xl hover:bg-green-900 transition-all shadow-xl shadow-green-100 uppercase tracking-widest text-xs">Lưu thay đổi</button>
                   <button type="button" onClick={() => setShowModal(false)} className="px-8 py-4 bg-stone-100 text-stone-600 font-bold rounded-2xl hover:bg-stone-200 uppercase text-xs">Hủy</button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;