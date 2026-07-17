import { FAQItem } from "./types";

// NOTE: Projects, Blog Posts, Team Members, Testimonials, Gallery Images,
// Site Settings (contact info, social links, site icon) and per-page SEO
// are all managed through the Admin Panel and stored in /data/*.json —
// see lib/db/repositories.ts for the data-access functions.
//
// The constants below remain static/hardcoded (navigation structure,
// services list, stats, and FAQs) since they weren't part of the content
// types requested for admin management. Feel free to wire these into the
// admin panel too using the same repository pattern if needed.

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Founder", href: "/about/founder" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Joint Ventures", href: "/joint-ventures" },
  {
    label: "Dholera SIR",
    href: "/dholera-sir",
    children: [
      { label: "About Dholera SIR", href: "/dholera-sir" },
      { label: "Progress Room", href: "/dholera-progress" },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export const FAQS: FAQItem[] = [
  {
    question: "What documents are required to book a property with Unicon Infra?",
    answer:
      "You'll need a valid government ID (Aadhaar/Passport), PAN card, address proof, and passport-sized photographs. For NRI buyers, additional documents like OCI/PIO card and passport copies are required.",
  },
  {
    question: "Do you offer home loan assistance?",
    answer:
      "Yes, we have tie-ups with leading nationalized and private banks offering pre-approved loan facilities with attractive interest rates for all our projects.",
  },
  {
    question: "What is the typical payment plan structure?",
    answer:
      "We offer flexible payment plans including Construction Linked Plans (CLP), Down Payment Plans (DPP), and Possession Linked Plans. Our sales team can help you choose the best option.",
  },
  {
    question: "Are your projects RERA registered?",
    answer:
      "Yes, all Unicon Infra projects are fully RERA registered and comply with all state real estate regulatory requirements. RERA numbers are available on each project page.",
  },
  {
    question: "Can I schedule a site visit before booking?",
    answer:
      "Absolutely. We encourage all prospective buyers to schedule a site visit. You can book one directly through our Contact page or by calling our sales team.",
  },
  {
    question: "What is the possession timeline for ongoing projects?",
    answer:
      "Possession timelines vary by project and are listed on each individual project page. Our team provides regular construction updates to all registered buyers.",
  },
  {
    question: "Do you provide interior design and fit-out services?",
    answer:
      "Yes, through our in-house design studio we offer bespoke interior design and turnkey fit-out packages for both residential and commercial buyers.",
  },
];

export const STATS = [
  { label: "Years of Excellence", value: 18, suffix: "+" },
  { label: "Projects Delivered", value: 42, suffix: "+" },
  { label: "Happy Families", value: 6500, suffix: "+" },
  { label: "Sq.Ft. Developed", value: 12, suffix: "M+" },
];

export const SERVICES = [
  {
    title: "Luxury Residential Development",
    description:
      "End-to-end design and development of ultra-luxury apartments, penthouses and villas with bespoke architecture.",
    icon: "home",
  },
  {
    title: "Commercial & Office Spaces",
    description:
      "Grade-A office towers and retail developments engineered for modern enterprise and long-term value.",
    icon: "building",
  },
  {
    title: "Township Planning",
    description:
      "Large-scale integrated townships combining residences, retail, education and green infrastructure.",
    icon: "layout",
  },
  {
    title: "Interior Design Studio",
    description:
      "In-house design studio offering bespoke interior and turnkey fit-out packages for every residence.",
    icon: "brush",
  },
  {
    title: "Property Management",
    description:
      "Dedicated facility and property management services ensuring long-term asset value and resident comfort.",
    icon: "shield",
  },
  {
    title: "Investment Advisory",
    description:
      "Personalized investment advisory helping you identify the right asset for growth and lifestyle goals.",
    icon: "chart",
  },
];
