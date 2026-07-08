import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { PRODUCTS } from '../lib/data';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/card';
import { triggerRazorpayCheckout } from '../lib/razorpay';
import { Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get('product');
  const isCart = searchParams.get('cart') === 'true';
  
  const product = productId ? PRODUCTS.find(p => p.id === productId) : null;
  
  // GST is already included in the price
  const total = product ? product.price : (isCart ? 397 : 0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    termsAccepted: false
  });
  
  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    const newErrors: any = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Please enter a valid email address";
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = "Please enter a valid 10-digit phone number";
    if (!formData.termsAccepted) newErrors.terms = "You must accept the terms and conditions to proceed";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    triggerRazorpayCheckout(
      total,
      (res) => {
        alert('Payment successful! Payment ID: ' + res.razorpay_payment_id);
        navigate('/');
      },
      (err) => {
        console.error("Payment failed", err);
      },
      {
        name: formData.name,
        email: formData.email,
        contact: formData.phone
      }
    );
  };

  if (!product && !isCart) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-muted/20">
        <h2 className="text-2xl font-bold mb-4">No items to checkout</h2>
        <Button onClick={() => navigate('/shop')}>Go to Shop</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-2">Secure Checkout</h1>
        <p className="text-muted-foreground mb-8">Complete your purchase to get instant access.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Col: Customer Details Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5" id="checkout-form">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Full Name <span className="text-destructive">*</span></label>
                    <Input 
                      type="text" 
                      placeholder="Enter your full name" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Email Address <span className="text-destructive">*</span></label>
                    <Input 
                      type="email" 
                      placeholder="you@example.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                    <p className="text-muted-foreground text-xs mt-1">Course access link will be sent to this email</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Phone Number <span className="text-destructive">*</span></label>
                    <Input 
                      type="tel" 
                      placeholder="10-digit mobile number" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className={errors.phone ? "border-destructive" : ""}
                    />
                    {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div className="flex items-start gap-3 pt-4 border-t border-border">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      className="mt-1 w-4 h-4 accent-primary"
                      checked={formData.termsAccepted}
                      onChange={(e) => setFormData({...formData, termsAccepted: e.target.checked})}
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                      I accept the <Link to="/terms" className="text-primary hover:underline font-semibold">Terms and Conditions</Link>, <Link to="/privacy-policy" className="text-primary hover:underline font-semibold">Privacy Policy</Link>, and <Link to="/refund-policy" className="text-primary hover:underline font-semibold">Refund Policy</Link>.
                    </label>
                  </div>
                  {errors.terms && <p className="text-destructive text-xs">{errors.terms}</p>}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Col: Order Summary */}
          <div>
            <Card className="sticky top-24 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {product ? (
                  <div className="flex items-start gap-4 pb-4 border-b border-border">
                    <img src={product.imageUrl} alt={product.name} className="w-20 h-14 object-cover rounded" />
                    <div>
                      <h3 className="font-bold text-sm leading-tight">{product.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">Lifetime Access • Digital Delivery</p>
                    </div>
                  </div>
                ) : (
                  <div className="pb-4 border-b border-border">
                    <h3 className="font-bold text-sm">Shopping Cart Items</h3>
                    <p className="text-xs text-muted-foreground mt-1">Multiple courses • Lifetime Access</p>
                  </div>
                )}

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST</span>
                    <span className="font-medium text-emerald-600">Included ✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-emerald-600">Free (Digital)</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-border flex justify-between items-center text-xl font-extrabold">
                  <span>Total</span>
                  <span className="text-primary">₹{total}</span>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-4">
                <Button type="submit" form="checkout-form" size="lg" className="w-full text-lg h-14 shadow-lg shadow-primary/25">
                  Complete Payment — ₹{total} <Lock size={16} className="ml-2" />
                </Button>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  256-bit SSL Secure Checkout • Powered by Razorpay
                </div>
              </CardFooter>
            </Card>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>Instant access via email after payment.</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span><strong>7-day no-questions-asked</strong> refund guarantee.</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>All prices are inclusive of GST.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}