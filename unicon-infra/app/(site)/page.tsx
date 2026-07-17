import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import DholeraSpotlight from "@/components/home/DholeraSpotlight";
import DholeraWhyNow from "@/components/home/DholeraWhyNow";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import VideoShowcase from "@/components/home/VideoShowcase";
import VideoGrid from "@/components/home/VideoGrid";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Stats from "@/components/home/Stats";
import AmenitiesHighlight from "@/components/home/AmenitiesHighlight";
import InvestmentBenefits from "@/components/home/InvestmentBenefits";
import Testimonials from "@/components/home/Testimonials";
import BrochureCTA from "@/components/home/BrochureCTA";
import BlogsPreview from "@/components/home/BlogsPreview";
import ContactCTA from "@/components/home/ContactCTA";
import {
  getAllProjects,
  getAllTestimonials,
  getAllBlogPosts,
  getAllVideos,
  buildPageMetadata,
} from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("home", {
    title: "Premium Luxury Real Estate in India",
    description:
      "Discover Unicon Infra's exclusive residences, villas, commercial towers and townships. Where architecture meets art.",
  });
}

export default async function HomePage() {
  const [projects, testimonials, posts, videos] = await Promise.all([
    getAllProjects(),
    getAllTestimonials(),
    getAllBlogPosts({ publishedOnly: true }),
    getAllVideos(),
  ]);

  return (
    <>
      <Hero />
      <AboutSection />
      <DholeraSpotlight />
      <FeaturedProjects projects={projects} />
      <VideoShowcase />
      <VideoGrid videos={videos} />
      <WhyChooseUs />
      <Stats />
      <DholeraWhyNow />
      <AmenitiesHighlight />
      <InvestmentBenefits />
      <Testimonials testimonials={testimonials} />
      <BrochureCTA />
      <BlogsPreview posts={posts} />
      <ContactCTA />
    </>
  );
}
