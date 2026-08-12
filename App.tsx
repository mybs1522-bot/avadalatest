import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CheckoutPage from './pages/CheckoutPage';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductPage from './pages/ProductPage';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import StudentPortal from './pages/StudentPortal';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ShoppingCartDemo } from './pages/ShoppingCartDemo';

const App: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<ShoppingCartDemo />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/portal" element={<StudentPortal />} />
          <Route path="/login" element={<StudentPortal />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};


export default App;