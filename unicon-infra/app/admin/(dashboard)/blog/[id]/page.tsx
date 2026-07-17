import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import BlogForm from "@/components/admin/forms/BlogForm";
import { getBlogById } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  const post = await getBlogById(params.id);
  if (!post) return notFound();

  return (
    <div>
      <AdminPageHeader title="Edit Blog Post" description={post.title} />
      <BlogForm post={post} />
    </div>
  );
}
