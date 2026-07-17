import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import TestimonialForm from "@/components/admin/forms/TestimonialForm";
import { getTestimonialById } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  const testimonial = await getTestimonialById(params.id);
  if (!testimonial) return notFound();

  return (
    <div>
      <AdminPageHeader title="Edit Testimonial" description={testimonial.name} />
      <TestimonialForm testimonial={testimonial} />
    </div>
  );
}
