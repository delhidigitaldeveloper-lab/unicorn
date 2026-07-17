import { MetadataRoute } from "next";
import { getAllProjects, getAllBlogPosts } from "@/lib/db/repositories";

const BASE_URL = "https://www.uniconinfra.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([
    getAllProjects(),
    getAllBlogPosts({ publishedOnly: true }),
  ]);

  const staticRoutes = [
    "",
    "/about",
    "/about/founder",
    "/projects",
    "/joint-ventures",
    "/dholera-sir",
    "/dholera-progress",
    "/services",
    "/gallery",
    "/blog",
    "/faqs",
    "/contact",
    "/privacy-policy",
    "/terms-conditions",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${BASE_URL}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogRoutes = posts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
