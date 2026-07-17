import SectionHeading from "@/components/ui/SectionHeading";
import BlogCard from "@/components/blog/BlogCard";
import Button from "@/components/ui/Button";
import { BlogPost } from "@/lib/types";

export default function BlogsPreview({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="py-28 md:py-36 bg-luxury-charcoal">
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Insights & Stories"
          title="From the Unicon Infra Journal"
          description="Perspectives on design, investment, and the art of luxury living."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {posts.slice(0, 3).map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>

        <div className="flex justify-center mt-14">
          <Button href="/blog" variant="outline">
            Visit The Journal
          </Button>
        </div>
      </div>
    </section>
  );
}
