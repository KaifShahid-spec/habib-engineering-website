import { Section } from "@/components/ui/section";
import { generateMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";

export const metadata = generateMetadata({
  title: "Privacy Policy",
  description: "How Habib Engineering collects, uses, and protects your personal information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <Section>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>

        <p className="text-muted-foreground mb-8">
          Last updated: November 2026
        </p>

        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p>
            At {siteConfig.name} ("we", "us", or "our"), we are committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>

          <h2>1. Information We Collect</h2>
          <p>We may collect information about you in a variety of ways. The information we may collect on the website includes:</p>
          <ul>
            <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you fill out our contact form or request a quote.</li>
            <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the website, such as your IP address, browser type, operating system, and access times.</li>
            <li><strong>Financial Data:</strong> We do not collect financial information (we do not process payments on this site).</li>
          </ul>

          <h2>2. Use of Your Information</h2>
          <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the website to:</p>
          <ul>
            <li>Respond to your inquiries, quote requests, or customer service requests.</li>
            <li>Send you technical notices, updates, and support messages.</li>
            <li>Compile anonymous statistical data and analysis for use internally or with third parties.</li>
          </ul>

          <h2>3. Disclosure of Your Information</h2>
          <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
          <ul>
            <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.</li>
            <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including data analysis, email delivery, hosting services, and customer service.</li>
          </ul>

          <h2>4. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information.
            While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts,
            no security measures are perfect or impenetrable.
          </p>

          <h2>5. Contact Us</h2>
          <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
          <ul>
            <li>Email: {siteConfig.email}</li>
            <li>Phone: {siteConfig.phone}</li>
            <li>Address: {siteConfig.headOffice.line1}, {siteConfig.headOffice.city}</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}