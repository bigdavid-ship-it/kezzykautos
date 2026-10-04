import { Metadata } from 'next';
import { SectionHeader } from '@/components/public/SectionHeader';

export const metadata: Metadata = {
  title: 'Privacy Policy | Kezzyk Autos',
  description: 'Privacy Policy for Kezzyk Autos.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="flex-1 py-12 lg:py-20 bg-bg-primary">
      <div className="section-container max-w-4xl">
        <SectionHeader
          title="Privacy Policy"
          subtitle="How we collect, use, and protect your information."
        />

        <div className="mt-12 prose prose-invert prose-orange max-w-none text-text-secondary">
          <p className="text-body mb-6">
            <strong>Last Updated: [DEV PLACEHOLDER - Date]</strong>
          </p>
          <p className="text-body mb-8">
            At Kezzyk Autos, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage with our services. 
            <em>[DEV PLACEHOLDER - Needs legal review]</em>
          </p>

          <h2 className="text-heading font-bold text-text-primary mt-10 mb-4">1. Information Collection</h2>
          <p className="mb-4">
            We may collect personal information that you provide directly to us, including but not limited to your name, email address, phone number, and any other information you choose to provide when making an inquiry, filling out a contact form, or communicating with us.
          </p>

          <h2 className="text-heading font-bold text-text-primary mt-10 mb-4">2. Use of Information</h2>
          <p className="mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Provide, operate, and maintain our website and services.</li>
            <li>Respond to your inquiries and customer service requests.</li>
            <li>Process transactions and send related information.</li>
            <li>Send administrative information, such as updates to our terms or policies.</li>
          </ul>

          <h2 className="text-heading font-bold text-text-primary mt-10 mb-4">3. Information Sharing</h2>
          <p className="mb-4">
            We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information with our business partners and trusted affiliates.
          </p>

          <h2 className="text-heading font-bold text-text-primary mt-10 mb-4">4. Security</h2>
          <p className="mb-4">
            We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information stored on our site.
          </p>

          <h2 className="text-heading font-bold text-text-primary mt-10 mb-4">5. Cookies</h2>
          <p className="mb-4">
            Our website may use "cookies" to enhance user experience. You may choose to set your web browser to refuse cookies or to alert you when cookies are being sent. If you do so, note that some parts of the site may not function properly.
          </p>

          <h2 className="text-heading font-bold text-text-primary mt-10 mb-4">6. Changes to This Privacy Policy</h2>
          <p className="mb-4">
            Kezzyk Autos has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the top of this page. We encourage you to frequently check this page for any changes.
          </p>

          <h2 className="text-heading font-bold text-text-primary mt-10 mb-4">7. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at our provided contact information.
          </p>
        </div>
      </div>
    </main>
  );
}
