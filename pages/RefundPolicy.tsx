import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Mail, MessageCircle, Clock } from 'lucide-react';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-background pt-16 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Cancellation & Refund Policy</h1>
        <p className="text-muted-foreground mb-10">Last updated: July 8, 2026</p>

        {/* Highlight Banner */}
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 md:p-8 mb-12 flex items-start gap-4">
          <ShieldCheck size={32} className="text-emerald-600 shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl font-extrabold text-emerald-800 mb-2">7-Day No-Questions-Asked Refund</h2>
            <p className="text-emerald-700 text-base leading-relaxed">
              We are fully confident in the quality of our courses. If you are not completely satisfied with your purchase for <strong>any reason whatsoever</strong>, simply contact us within <strong>7 days of your purchase date</strong> and we will issue a <strong>100% full refund</strong>. No questions asked. No hassle. No hard feelings.
            </p>
          </div>
        </div>

        <div className="prose max-w-none text-foreground space-y-8">

          <section>
            <h2 className="text-2xl font-bold mb-3">How to Request a Refund</h2>
            <div className="space-y-4 mt-4">
              <div className="flex items-start gap-4 bg-card border border-border rounded-xl p-5">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Send us an email or WhatsApp message</h3>
                  <p className="text-muted-foreground text-sm">Contact us at <strong>support@avada.in</strong> or WhatsApp us at <strong>+91 8545015333</strong> with your order details (name, email used for purchase, and payment ID if available).</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-card border border-border rounded-xl p-5">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">We verify your purchase</h3>
                  <p className="text-muted-foreground text-sm">Our team will verify your purchase details. This typically takes less than 24 hours.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-card border border-border rounded-xl p-5">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Refund processed within 5–7 business days</h3>
                  <p className="text-muted-foreground text-sm">Once approved, your refund will be processed back to your original payment method within 5–7 business days. The exact timeline depends on your bank.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Key Points</h2>
            <div className="space-y-3 mt-4">
              {[
                "Refund requests must be made within 7 calendar days of the purchase date.",
                "Refunds apply to all course bundles and individual course purchases.",
                "The full purchase amount will be refunded — no deductions, no partial refunds.",
                "All prices are inclusive of GST. The refunded amount will also be the full amount paid.",
                "Upon refund, your access to course materials will be revoked.",
                "Refunds are limited to one per customer per product.",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">{point}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Cancellation</h2>
            <p className="text-muted-foreground leading-relaxed">
              Since all our products are digital and delivered instantly after payment, there is no "order processing" window during which an order can be cancelled before delivery. However, our <strong>7-day refund policy</strong> effectively serves as a cancellation policy — if you change your mind within 7 days, you get a full refund.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Contact Us for Refunds</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div className="bg-card border border-border rounded-xl p-5 text-center">
                <Mail size={24} className="text-primary mx-auto mb-3" />
                <h3 className="font-bold text-sm mb-1">Email</h3>
                <p className="text-muted-foreground text-sm">support@avada.in</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5 text-center">
                <MessageCircle size={24} className="text-primary mx-auto mb-3" />
                <h3 className="font-bold text-sm mb-1">WhatsApp</h3>
                <p className="text-muted-foreground text-sm">+91 8545015333</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5 text-center">
                <Clock size={24} className="text-primary mx-auto mb-3" />
                <h3 className="font-bold text-sm mb-1">Response Time</h3>
                <p className="text-muted-foreground text-sm">Within 24 hours</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
