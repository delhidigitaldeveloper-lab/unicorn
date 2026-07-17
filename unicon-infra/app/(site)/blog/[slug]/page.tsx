import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { HiOutlineUser, HiOutlineCalendar, HiOutlineClock } from "react-icons/hi";
import SectionHeading from "@/components/ui/SectionHeading";
import BlogCard from "@/components/blog/BlogCard";
import { getAllBlogPosts, getBlogBySlug } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogBySlug(params.slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogDetailsPage({ params }: { params: { slug: string } }) {
  const post = await getBlogBySlug(params.slug);
  if (!post || !post.published) return notFound();

  const allPosts = await getAllBlogPosts({ publishedOnly: true });
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <section className="relative h-[50vh] min-h-[380px] flex items-end overflow-hidden">
        <Image src={post.coverImage} alt={post.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        <div className="container-luxury relative pb-14 max-w-4xl">
          <p className="eyebrow mb-4">{post.category}</p>
          <h1 className="font-display text-3xl md:text-5xl leading-tight">{post.title}</h1>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-black">
        <div className="container-luxury max-w-3xl">
          <div className="flex flex-wrap items-center gap-6 text-white/50 text-sm pb-8 border-b border-white/10">
            <span className="flex items-center gap-2">
              <HiOutlineUser className="text-luxury-gold" /> {post.author}
            </span>
            <span className="flex items-center gap-2">
              <HiOutlineCalendar className="text-luxury-gold" />
              {new Date(post.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-2">
              <HiOutlineClock className="text-luxury-gold" /> {post.readTime}
            </span>
          </div>

          <div className="mt-10 space-y-6">
            {post.content.map((para, i) => (
              <p key={i} className="text-white/70 leading-relaxed text-base md:text-lg">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-28 bg-luxury-charcoal">
        <div className="container-luxury">
          <SectionHeading eyebrow="Continue Reading" title="More From The Journal" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {related.map((p, i) => (
              <BlogCard key={p.slug} post={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
