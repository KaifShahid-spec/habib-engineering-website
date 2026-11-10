import { Section } from "@/components/ui/section";
import { generateMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";

export const metadata = generateMetadata({
  title: "Terms & Conditions",
  description: "Terms of use for the Habib Engineering website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Section>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Terms and Conditions</h1>

        <p className="text-muted-foreground mb-8">
          Last updated: November 2026
        </p>

        <div className="prose prose-slate max-w-none dark:prose-invert">
          <h2>1. Agreement to Terms</h2>
          <p>
            These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you")
            and {siteConfig.name} ("we," "us" or "our"), concerning your access to and use of the website.
            By accessing the site, you agree that you have read, understood, and agree to be bound by all of these Terms and Conditions.
          </p>

          <h2>2. Intellectual Property Rights</h2>
          <p>
            Unless otherwise indicated, the site is our proprietary property and all source code, databases, functionality, software, website designs,
            audio, video, text, photographs, and graphics on the site (collectively, the "Content") and the trademarks, service marks, and logos contained
            therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
          </p>
          <p>
            Provided that you are eligible to use the site, you are granted a limited license to access and use the site and to download or print a copy
            of any portion of the Content to which you have properly gained access solely for your personal, non-commercial use.
          </p>

          <h2>3. User Representations</h2>
          <p>By using the site, you represent and warrant that:</p>
          <ul>
            <li>All registration information you submit will be true, accurate, current, and complete.</li>
            <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
            <li>You have the legal capacity and you agree to comply with these Terms and Conditions.</li>
            <li>You will not access the site through automated or non-human means, whether through a bot, script, or otherwise.</li>
          </ul>

          <h2>4. Products and Services</h2>
          <p>
            We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the site.
            However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current,
            or free of other errors, and your electronic display may not accurately reflect the actual colors and details of the products.
          </p>
          <p>
            All products are subject to availability, and we cannot guarantee that items will be in stock. We reserve the right to discontinue any products
            at any time for any reason. Prices for all products are subject to change.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential,
            exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your
            use of the site, even if we have been advised of the possibility of such damages.
          </p>

          <h2>6. Governing Law</h2>
          <p>
            These Terms shall be governed by and defined following the laws of Pakistan. {siteConfig.name} and yourself irrevocably consent that the courts
            of Lahore, Pakistan shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            In order to resolve a complaint regarding the site or to receive further information regarding use of the site, please contact us at:
          </p>
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