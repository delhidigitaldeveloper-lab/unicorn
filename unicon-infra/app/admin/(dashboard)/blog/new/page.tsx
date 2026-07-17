import AdminPageHeader from "@/components/admin/AdminPageHeader";
import BlogForm from "@/components/admin/forms/BlogForm";

export default function NewBlogPostPage() {
  return (
    <div>
      <AdminPageHeader title="New Blog Post" description="Write a new article for the journal." />
      <BlogForm />
    </div>
  );
}
