import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart as ShoppingCartIcon, Menu, X } from 'lucide-react';
import { Button } from './ui/button';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold tracking-tight">
              Avada <span className="text-primary">Design</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.path ? 'text-foreground' : 'text-foreground/60'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <Link to="/portal">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm">
                Student Portal
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCartIcon className="h-5 w-5" />
                <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-primary"></span>
              </Button>
            </Link>
          </div>


          <div className="-mr-2 flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-b bg-background">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/cart"
              className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cart
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
