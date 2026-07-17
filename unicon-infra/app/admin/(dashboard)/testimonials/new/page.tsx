import AdminPageHeader from "@/components/admin/AdminPageHeader";
import TestimonialForm from "@/components/admin/forms/TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <div>
      <AdminPageHeader title="Add Testimonial" description="Add a new client review." />
      <TestimonialForm />
    </div>
  );
}
