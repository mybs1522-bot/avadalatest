import React from 'react';

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-4xl font-extrabold tracking-tight mb-6">Delivery Policy</h1>
        <div className="prose prose-slate max-w-none text-slate-600">
          <p>
            All Astrojeevan Design products are digital educational resources. There is no physical shipping involved.
          </p>
          <p>
            Upon successful enrollment, you will receive instant access to your courses and materials directly 
            on the platform and via a confirmation email. Everything is provided completely free of charge.
          </p>
        </div>
      </div>
    </div>
  );
}
