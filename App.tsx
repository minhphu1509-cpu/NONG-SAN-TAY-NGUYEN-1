
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import About from './pages/About';
import Blog from './pages/Blog';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Pricing from './pages/Pricing';
import FAQ from './pages/FAQ';
import Team from './pages/Team';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import { Page, Product, BlogPost, FAQItem, TeamMember, CartItem, Order, PortfolioItem, Promotion } from './types';
import { INITIAL_PRODUCTS, INITIAL_BLOG_POSTS, INITIAL_FAQS, INITIAL_TEAM, INITIAL_PORTFOLIO, INITIAL_PROMOTIONS } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  
  // Data States
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [faqs, setFaqs] = useState<FAQItem[]>(INITIAL_FAQS);
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO);
  const [promotions, setPromotions] = useState<Promotion[]>(INITIAL_PROMOTIONS);
  
  // E-commerce States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Cart Logics
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <Home onPageChange={setCurrentPage} products={products} addToCart={addToCart} promotions={promotions} />;
      case Page.Products:
        return <Products onPageChange={setCurrentPage} products={products} addToCart={addToCart} />;
      case Page.Cart:
        return <Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} onPageChange={setCurrentPage} />;
      case Page.Checkout:
        return <Checkout cart={cart} onPageChange={setCurrentPage} setOrders={setOrders} clearCart={clearCart} />;
      case Page.OrderSuccess:
        return <OrderSuccess onPageChange={setCurrentPage} />;
      case Page.Admin:
        return (
          <Admin 
            products={products} setProducts={setProducts}
            blogPosts={blogPosts} setBlogPosts={setBlogPosts}
            faqs={faqs} setFaqs={setFaqs}
            team={team} setTeam={setTeam}
            orders={orders} setOrders={setOrders}
            portfolioItems={portfolioItems} setPortfolioItems={setPortfolioItems}
            promotions={promotions} setPromotions={setPromotions}
          />
        );
      case Page.About: return <About />;
      case Page.Blog: return <Blog blogPosts={blogPosts} />;
      case Page.Services: return <Services />;
      case Page.Portfolio: return <Portfolio portfolioItems={portfolioItems} />;
      case Page.Pricing: return <Pricing onPageChange={setCurrentPage} />;
      case Page.FAQ: return <FAQ faqs={faqs} />;
      case Page.Team: return <Team team={team} />;
      case Page.Contact: return <Contact />;
      default: return <Home onPageChange={setCurrentPage} products={products} addToCart={addToCart} promotions={promotions} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-green-100 selection:text-green-900 bg-stone-50">
      <Navbar 
        currentPage={currentPage} 
        onPageChange={(p) => {
          setCurrentPage(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onPageChange={setCurrentPage} />
      <Chatbot />
      
      {/* Decorative BG Pattern */}
      <div className="fixed top-0 left-0 -z-10 w-full h-full pointer-events-none opacity-[0.02]">
        <svg width="100%" height="100%"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#166534"/></pattern></defs><rect width="100%" height="100%" fill="url(#dots)" /></svg>
      </div>
    </div>
  );
};

export default App;
