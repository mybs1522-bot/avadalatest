import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 bg-zinc-900 text-zinc-400 border-t border-zinc-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Adriders LLP</h4>
            <p className="text-xs leading-relaxed">
              Premium architecture & design courses trusted by 50,000+ professionals across India.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/shop" className="hover:text-primary transition-colors">Shop</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Policies</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/refund-policy" className="hover:text-primary transition-colors">Cancellation & Refund</Link></li>
              <li><Link to="/shipping-policy" className="hover:text-primary transition-colors">Shipping & Exchange</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Contact</h4>
            <ul className="space-y-2 text-xs">
              <li><strong>Legal Name:</strong> Adriders LLP</li>
              <li>adridersllp@gmail.com</li>
              <li>Phone/WhatsApp: +91 8127645066</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-800 pt-6 text-center text-xs text-zinc-500 space-y-2">
          <p>Legal Name: Adriders LLP, Phone number: 8127645066, Email id: adridersllp@gmail.com</p>
          <p>&copy; {new Date().getFullYear()} Adriders LLP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
