import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background pt-16 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-10">Last updated: July 8, 2026</p>

        <div className="prose max-w-none text-foreground space-y-8">

          <section>
            <h2 className="text-2xl font-bold mb-3">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              When you make a purchase or interact with our Site, we collect the following personal information:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-3 ml-4">
              <li><strong>Personal Identification:</strong> Full name, email address, phone number</li>
              <li><strong>Payment Information:</strong> Processed securely by Razorpay — we do not store your card details</li>
              <li><strong>Usage Data:</strong> IP address, browser type, pages visited, time spent on pages</li>
              <li><strong>Device Information:</strong> Device type, operating system, unique device identifiers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-3 ml-4">
              <li>Process your purchases and deliver digital products</li>
              <li>Send you order confirmations, course access links, and receipts</li>
              <li>Provide customer support via email and WhatsApp</li>
              <li>Improve our website, products, and services</li>
              <li>Send promotional offers (only with your consent; you can unsubscribe anytime)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">3. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard security measures to protect your personal information. All payment transactions are encrypted using SSL technology and processed by Razorpay, a PCI-DSS compliant payment gateway. We do not store your credit/debit card information on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">4. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">We may share your information with the following trusted third parties:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-3 ml-4">
              <li><strong>Razorpay</strong> — for secure payment processing</li>
              <li><strong>Google Drive</strong> — for course content delivery</li>
              <li><strong>Email Service Providers</strong> — for transactional and marketing emails</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              We do not sell, rent, or trade your personal information to any third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">5. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website may use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user preferences. You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">6. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">You have the right to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-3 ml-4">
              <li>Access the personal data we hold about you</li>
              <li>Request correction or deletion of your personal data</li>
              <li>Opt-out of marketing communications at any time</li>
              <li>Request a copy of your data in a portable format</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              To exercise any of these rights, please contact us at <strong>support@avada.in</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">7. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal information for as long as your account is active or as needed to provide you with our Services. We may also retain your information as necessary to comply with legal obligations, resolve disputes, and enforce our agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">8. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any significant changes by updating the "Last updated" date at the top of this page. We encourage you to review this Privacy Policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">9. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us:
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
