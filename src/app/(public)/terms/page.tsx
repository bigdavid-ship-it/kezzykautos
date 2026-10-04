import { Metadata } from 'next';
import { SectionHeader } from '@/components/public/SectionHeader';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Kezzyk Autos',
  description: 'Terms and Conditions for using Kezzyk Autos website and services.',
};

export default function TermsPage() {
  return (
    <main className="flex-1 py-12 lg:py-20 bg-bg-primary">
      <div className="section-container max-w-4xl">
        <SectionHeader
          title="Terms & Conditions"
          subtitle="Please read these terms carefully before using our services."
        />

        <div className="mt-12 prose prose-invert prose-orange max-w-none text-text-secondary">
          <p className="text-body mb-6">
            <strong>Last Updated: [DEV PLACEHOLDER - Date]</strong>
          </p>
          <p className="text-body mb-8">
            Welcome to Kezzyk Autos. These Terms & Conditions govern your use of our website and services. By accessing or using our website, you agree to be bound by these terms.
            <em>[DEV PLACEHOLDER - Needs legal review]</em>
          </p>

          <h2 className="text-heading font-bold text-text-primary mt-10 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this website.
          </p>

          <h2 className="text-heading font-bold text-text-primary mt-10 mb-4">2. Services</h2>
          <p className="mb-4">
            Kezzyk Autos provides an online platform to view our premium vehicle inventory, make inquiries, and contact our team. We reserve the right to modify or discontinue any service with or without notice.
          </p>

          <h2 className="text-heading font-bold text-text-primary mt-10 mb-4">3. Vehicles & Accuracy</h2>
          <p className="mb-4">
            While we strive for accuracy, Kezzyk Autos does not guarantee that vehicle descriptions, pricing, mileage, or other content available on the site is entirely accurate, complete, reliable, current, or error-free. Vehicle availability is subject to prior sale.
          </p>

          <h2 className="text-heading font-bold text-text-primary mt-10 mb-4">4. Pricing</h2>
          <p className="mb-4">
            All prices are subject to change without notice. Prices listed on the website may exclude applicable taxes, registration, and documentation fees. Final pricing will be confirmed during the formal purchasing process.
          </p>

          <h2 className="text-heading font-bold text-text-primary mt-10 mb-4">5. Inquiries & Communications</h2>
          <p className="mb-4">
            By submitting an inquiry or contacting us, you consent to receive communications from Kezzyk Autos regarding your request, our inventory, and promotional materials. You may opt out of promotional communications at any time.
          </p>

          <h2 className="text-heading font-bold text-text-primary mt-10 mb-4">6. Limitation of Liability</h2>
          <p className="mb-4">
            Kezzyk Autos shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our website or services, or for the cost of procurement of substitute goods and services.
          </p>

          <h2 className="text-heading font-bold text-text-primary mt-10 mb-4">7. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. Your continued use of the website after any such changes constitutes your acceptance of the new Terms & Conditions.
          </p>
        </div>
      </div>
    </main>
  );
}
