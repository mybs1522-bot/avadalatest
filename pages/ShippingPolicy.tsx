import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Download, Zap, CheckCircle2 } from 'lucide-react';

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-background pt-16 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Shipping & Exchange Policy</h1>
        <p className="text-muted-foreground mb-10">Last updated: July 8, 2026</p>

        {/* Highlight Banner */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 md:p-8 mb-12 flex items-start gap-4">
          <Download size={32} className="text-blue-600 shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl font-extrabold text-blue-800 mb-2">100% Digital Delivery — Instant Access</h2>
            <p className="text-blue-700 text-base leading-relaxed">
              All Avada Design products are <strong>digital products</strong> delivered electronically. There is no physical shipping involved. Upon successful payment, you will receive <strong>instant access</strong> to your purchased courses and materials via email and on-screen confirmation.
            </p>
          </div>
        </div>

        <div className="prose max-w-none text-foreground space-y-8">

          <section>
            <h2 className="text-2xl font-bold mb-3">Delivery Method</h2>
            <div className="space-y-3 mt-4">
              {[
                "All courses and digital resources are delivered via Google Drive links.",
                "Access links are sent to the email address provided during checkout.",
                "You will also see your access link on-screen immediately after successful payment.",
                "No physical products are shipped — everything is digital and instant.",
                "Delivery is available 24/7, including weekends and holidays.",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">{point}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Delivery Timeline</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div className="bg-card border border-border rounded-xl p-5 text-center">
                <Zap size={24} className="text-primary mx-auto mb-3" />
                <h3 className="font-bold text-sm mb-1">Instant</h3>
                <p className="text-muted-foreground text-xs">On-screen access link after payment</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5 text-center">
                <Package size={24} className="text-primary mx-auto mb-3" />
                <h3 className="font-bold text-sm mb-1">Within 5 Minutes</h3>
                <p className="text-muted-foreground text-xs">Email with full access details</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5 text-center">
                <Download size={24} className="text-primary mx-auto mb-3" />
                <h3 className="font-bold text-sm mb-1">Lifetime Access</h3>
                <p className="text-muted-foreground text-xs">No expiry — download anytime</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Exchanges</h2>
            <p className="text-muted-foreground leading-relaxed">
              As our products are digital and non-tangible, exchanges in the traditional sense are not applicable. However, if you purchased the wrong bundle or course, please contact our support team within 7 days and we will assist you in switching to the correct product at no additional charge (subject to price difference adjustments if the new product costs more).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Didn't Receive Your Access Link?</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you completed your payment but haven't received your access link within 10 minutes, please:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-3 ml-4">
              <li>Check your spam/junk email folder</li>
              <li>Ensure you entered the correct email address during checkout</li>
              <li>Contact us at <strong>support@avada.in</strong> or WhatsApp <strong>+91 8545015333</strong></li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Our support team is available 24/7 and will resolve your issue promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              For any questions about shipping and delivery, please reach out:
            </p>
            <ul className="list-none space-y-1 text-muted-foreground mt-3">
              <li><strong>Email:</strong> support@avada.in</li>
              <li><strong>Address:</strong> E-36, Coregano, Sector 8, Noida - 201301</li>
              <li><strong>WhatsApp:</strong> +91 8545015333</li>
              <li><strong>Page:</strong> <Link to="/contact" className="text-primary hover:underline">Contact Us</Link></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
