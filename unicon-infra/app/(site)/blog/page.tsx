import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import BlogCard from "@/components/blog/BlogCard";
import { getAllBlogPosts, buildPageMetadata } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("blog", {
    title: "Blog & Insights",
    description: "Perspectives on luxury real estate, architecture, and investment from the Unicon Infra journal.",
  });
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts({ publishedOnly: true });

  return (
    <>
      <PageHero
        eyebrow="The Journal"
        title="Insights on Luxury Living & Investment"
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop"
        breadcrumb="Blog"
      />
      <section className="py-24 md:py-32 bg-black">
        <div className="container-luxury">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
