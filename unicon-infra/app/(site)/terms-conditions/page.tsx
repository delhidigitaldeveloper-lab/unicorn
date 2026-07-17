import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { getSiteSettings, buildPageMetadata } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("terms-conditions", {
    title: "Terms & Conditions",
    description: "Read the terms and conditions governing the use of the Unicon Infra website.",
  });
}

const BASE_SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing and using this website, you accept and agree to be bound by these terms and conditions. If you do not agree, please discontinue use of this website.",
  },
  {
    title: "2. Project Information",
    body: "All project details, floor plans, renders, pricing, and specifications displayed on this website are indicative and subject to change without prior notice. Please refer to the official sale agreement for final, binding details.",
  },
  {
    title: "3. RERA Disclaimer",
    body: "All ongoing and upcoming projects referenced on this website are registered under the Real Estate (Regulation and Development) Act. RERA registration numbers are available on request and on individual project pages.",
  },
  {
    title: "4. Intellectual Property",
    body: "All content on this website, including text, images, logos, and graphics, is the property of Unicon Infra and may not be reproduced without written permission.",
  },
  {
    title: "5. No Warranty",
    body: "While we strive for accuracy, Unicon Infra makes no warranties regarding the completeness or reliability of information on this website, including images which may be for representational purposes only.",
  },
  {
    title: "6. Limitation of Liability",
    body: "Unicon Infra shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of this website or reliance on its content.",
  },
  {
    title: "7. Governing Law",
    body: "These terms shall be governed by and construed in accordance with the laws of India, with exclusive jurisdiction of the courts in Gurugram, Haryana.",
  },
];

export default async function TermsPage() {
  const settings = await getSiteSettings();
  const sections = [
    ...BASE_SECTIONS,
    {
      title: "8. Contact Us",
      body: `For questions regarding these terms, please contact us at ${settings.email} or call ${settings.phone}.`,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop"
        breadcrumb="Terms & Conditions"
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
