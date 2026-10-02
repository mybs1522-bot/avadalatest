import React from 'react';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-4xl font-extrabold tracking-tight mb-6">Guarantee Policy</h1>
        <div className="prose prose-slate max-w-none text-slate-600">
          <p>
            Astrojeevan Design provides completely free access to all its course materials and resources. 
            Because no payments are collected and no money is charged, a traditional refund policy does not apply.
          </p>
          <p>
            You are free to enroll, access, and utilize the resources at zero cost. We guarantee that 
            you will have lifetime unrestricted access to the materials provided without any hidden charges or fees.
          </p>
          <p>
            If you have any issues accessing the platform, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
