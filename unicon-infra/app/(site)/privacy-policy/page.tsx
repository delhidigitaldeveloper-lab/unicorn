import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { getSiteSettings, buildPageMetadata } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("privacy-policy", {
    title: "Privacy Policy",
    description: "Read Unicon Infra's privacy policy regarding data collection and usage.",
  });
}

const BASE_SECTIONS = [
  {
    title: "1. Information We Collect",
    body: "We collect personal information such as your name, phone number, email address, and enquiry details when you submit forms on our website, including contact forms, site visit requests, and newsletter subscriptions.",
  },
  {
    title: "2. How We Use Your Information",
    body: "Information collected is used to respond to enquiries, schedule site visits, send project updates, and improve our services. We do not sell your personal data to third parties.",
  },
  {
    title: "3. Cookies & Tracking",
    body: "Our website may use cookies and similar technologies to enhance user experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings.",
  },
  {
    title: "4. Data Security",
    body: "We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.",
  },
  {
    title: "5. Third-Party Links",
    body: "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites.",
  },
  {
    title: "6. Your Rights",
    body: "You may request access to, correction of, or deletion of your personal data held by us at any time by contacting us using the details below.",
  },
  {
    title: "7. Changes to This Policy",
    body: "We may update this privacy policy periodically. Changes will be posted on this page with a revised effective date.",
  },
];

export default async function PrivacyPolicyPage() {
  const settings = await getSiteSettings();
  const sections = [
    ...BASE_SECTIONS,
    {
      title: "8. Contact Us",
      body: `For any questions regarding this privacy policy, please contact us at ${settings.email} or call ${settings.phone}.`,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop"
        breadcrumb="Privacy Policy"
      />
      <section className="py-24 md:py-32 bg-black">
        <div className="container-luxury max-w-3xl">
          <p className="text-white/40 text-sm mb-12">Last updated: July 1, 2026</p>
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-display text-xl md:text-2xl mb-3 text-luxury-gold">
                  {section.title}
                </h2>
                <p className="text-white/60 leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
