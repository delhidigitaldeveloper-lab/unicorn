import type { Metadata } from "next";
import { HiOutlinePhone, HiOutlineMail, HiOutlineLocationMarker, HiOutlineClock } from "react-icons/hi";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import ContactForm from "@/components/contact/ContactForm";
import MapEmbed from "@/components/contact/MapEmbed";
import { getSiteSettings, getAllProjects, buildPageMetadata } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("contact", {
    title: "Contact Us",
    description: "Get in touch with Unicon Infra to schedule a site visit or speak with our real estate advisory team.",
  });
}

export default async function ContactPage() {
  const [settings, projects] = await Promise.all([getSiteSettings(), getAllProjects()]);

  const INFO = [
    { icon: HiOutlinePhone, label: "Call Us", value: settings.phone },
    { icon: HiOutlineMail, label: "Email Us", value: settings.email },
    { icon: HiOutlineLocationMarker, label: "Visit Us", value: settings.address },
    { icon: HiOutlineClock, label: "Working Hours", value: "Mon – Sat, 9:00 AM – 7:00 PM" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Let's Build Something Extraordinary"
        image="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop"
        breadcrumb="Contact"
      />

      <section className="py-24 md:py-32 bg-black">
        <div className="container-luxury grid lg:grid-cols-2 gap-16">
          <div>
            <SectionHeading eyebrow="Send a Message" title="Schedule Your Consultation" align="left" />
            <div className="mt-10">
              <ContactForm projects={projects} />
            </div>
          </div>

          <div className="space-y-6">
            {INFO.map((item) => (
              <GlassCard key={item.label} hover={false} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full gold-border flex items-center justify-center shrink-0">
                  <item.icon className="text-luxury-gold" size={22} />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wide">{item.label}</p>
                  <p className="text-white mt-1">{item.value}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32 bg-black">
        <div className="container-luxury">
          <SectionHeading eyebrow="Find Us" title="Our Corporate Office" />
          <div className="mt-10">
            <MapEmbed lat={28.4595} lng={77.0726} label="Unicon Infra Head Office" />
          </div>
        </div>
      </section>
    </>
  );
}
