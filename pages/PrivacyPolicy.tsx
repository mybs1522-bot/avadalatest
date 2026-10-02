import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background pt-16 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-10">Last updated: October 2, 2026</p>

        <div className="prose max-w-none text-foreground space-y-8">
          <section>
            <p className="text-muted-foreground leading-relaxed">
              At Adriders LLP ("Company", "we", "our"), we respect your privacy and are committed to protecting it. This policy explains what information we collect and how we use it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              When you enroll or interact with our Site, we collect the following personal information:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-3 ml-4">
              <li><strong>Personal Identification:</strong> Full name, email address, phone number</li>
              <li><strong>Usage Data:</strong> IP address, browser type, pages visited, time spent on pages</li>
              <li><strong>Device Information:</strong> Device type, operating system, unique device identifiers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-3 ml-4">
              <li>Provide access to courses and deliver digital educational materials</li>
              <li>Improve, personalize, and expand our Site and courses</li>
              <li>Provide customer support via email and WhatsApp</li>
              <li>Communicate with you for updates, promotions, and essential announcements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">3. Sharing Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share information with trusted third-party service providers who assist us in operating our website, such as:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-3 ml-4">
              <li><strong>Hosting & Database Providers</strong></li>
              <li><strong>Email Service Providers</strong> — for transactional and marketing emails</li>
              <li><strong>Analytics Providers</strong> — to understand how users interact with our Site</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">4. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">You have the right to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-3 ml-4">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              To exercise any of these rights, please contact us at <strong>adridersllp@gmail.com</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">5. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions or concerns about this Privacy Policy, please contact us:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-3 ml-4">
              <li><strong>Legal Name:</strong> Adriders LLP</li>
              <li><strong>Email:</strong> adridersllp@gmail.com</li>
              <li><strong>WhatsApp:</strong> +91 8127645066</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
