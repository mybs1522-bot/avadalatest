import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { PRODUCTS } from '../lib/data';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/card';
import { triggerRazorpaySubscriptionCheckout } from '../lib/razorpay';
import { sendStudentWelcomeEmail } from '../lib/email';
import { Lock, ShieldCheck, CheckCircle2, Clock, Sparkles } from 'lucide-react';


export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get('product');
  const isCart = searchParams.get('cart') === 'true';
  
  const product = productId ? PRODUCTS.find(p => p.id === productId) : PRODUCTS[0];

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

    triggerRazorpaySubscriptionCheckout(
      {
        monthlyPrice: 399,
        trialDays: 3,
        productName: product ? product.name : 'Avada Architecture Pass',
      },
      (res) => {
        localStorage.setItem('student_session', JSON.stringify({
          email: formData.email,
          name: formData.name,
          trialActive: true
        }));

        // Send Welcome Email via Resend API
        sendStudentWelcomeEmail({
          studentEmail: formData.email,
          studentName: formData.name,
        });

        alert('3-Day Free Trial Activated! Welcome to your Student Portal.');
        navigate('/portal');
      },

      (err) => {
        console.error("Subscription setup failed", err);
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
        {/* Trial Header Badge */}
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 mb-8 flex items-center gap-3 text-emerald-800 dark:text-emerald-300">
          <Sparkles size={24} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="font-bold text-sm sm:text-base">3-Day Free Trial Activated (₹0 Due Today)</p>
            <p className="text-xs opacity-90">Enjoy 72 hours of full access. Auto-renews at ₹399/month via UPI AutoPay starting Day 4. Cancel anytime before trial ends.</p>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold mb-2">Activate Your 3-Day Trial</h1>
        <p className="text-muted-foreground mb-8">Setup your UPI AutoPay mandate with ₹0 charge today.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Col: Customer Details Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Contact Details</CardTitle>
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
                    <label className="block text-sm font-semibold mb-1.5">Phone Number (UPI Linked) <span className="text-destructive">*</span></label>
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
                      I accept the <Link to="/terms" className="text-primary hover:underline font-semibold">Terms</Link>, <Link to="/privacy-policy" className="text-primary hover:underline font-semibold">Privacy Policy</Link>, and authorize a recurring UPI AutoPay mandate of ₹399/month starting in 3 days.
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
                <CardTitle>Plan Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {product && (
                  <div className="flex items-start gap-4 pb-4 border-b border-border">
                    <img src={product.imageUrl} alt={product.name} className="w-20 h-14 object-cover rounded" />
                    <div>
                      <h3 className="font-bold text-sm leading-tight">{product.name}</h3>
                      <p className="text-xs text-emerald-600 font-semibold mt-1">3 Days Free Trial Included</p>
                    </div>
                  </div>
                )}

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Initial Trial (3 Days)</span>
                    <span className="font-bold text-emerald-600">FREE (₹0)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Recurring Billing (from Day 4)</span>
                    <span className="font-bold">₹399 / month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Method</span>
                    <span className="font-medium text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">UPI AutoPay</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex justify-between items-center text-lg font-extrabold">
                  <span>Due Today</span>
                  <span className="text-emerald-600">₹0</span>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-4">
                <Button type="submit" form="checkout-form" size="lg" className="w-full text-lg h-14 shadow-lg shadow-primary/25 bg-emerald-600 hover:bg-emerald-700 text-white">
                  Start 3-Day Free Trial (₹0) <Lock size={16} className="ml-2" />
                </Button>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground text-center">
                  <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                  Razorpay UPI AutoPay • Mandate authorization only (₹0 debited today)
                </div>
              </CardFooter>
            </Card>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span><strong>3 days full unrestricted access</strong> to course materials.</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock size={16} className="text-emerald-500 shrink-0" />
                <span>First ₹399 charge automatically applies in 72 hours.</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>Cancel anytime effortlessly before trial expires.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}