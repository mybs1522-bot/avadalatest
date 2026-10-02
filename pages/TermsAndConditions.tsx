import React from 'react';
import { Link } from 'react-router-dom';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Terms and Conditions</h1>
        <p className="text-muted-foreground mb-8">Last Updated: October 2, 2026</p>

        <div className="prose prose-slate max-w-none text-slate-600 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-3">1. Introduction</h2>
            <p>
              Welcome to Astrojeevan Design ("Company", "we", "our", "us"). These Terms and Conditions govern your use of our website and all digital products, courses, downloadable resources, and services offered by us (collectively, the "Services"). By accessing or using the Site, you agree to be bound by these Terms. If you do not agree, please do not use our Services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">2. Free Access</h2>
            <p>
              Astrojeevan Design provides all educational courses and digital resources completely free of charge. There are no hidden fees, subscriptions, or payment requirements to access our core materials.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">3. Eligibility</h2>
            <p>
              You must be at least 18 years of age to enroll in our courses. By enrolling, you represent and warrant that you are at least 18 years old and that all information you provide is accurate, complete, and current.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">4. Intellectual Property</h2>
            <p>
              All course content, videos, images, textures, 3D models, and other materials provided are the intellectual property of Astrojeevan Design. You are granted a personal, non-transferable, non-exclusive license to access and use the materials for your own educational and professional purposes. You may not redistribute, resell, or share access to any enrolled materials.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">5. Disclaimer of Warranties</h2>
            <p>
              The Services are provided on an "AS IS" and "AS AVAILABLE" basis. We make no representations or warranties of any kind, express or implied, regarding the operation of the Site or the information, content, or materials included. We do not guarantee that the courses will result in specific career outcomes or financial gains.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">6. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, Astrojeevan Design shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our Services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">7. Contact Information</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <ul className="list-disc pl-6 mt-2">
              <li><strong>Email:</strong> support@astrojeevan.in</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
