import AdminPageHeader from "@/components/admin/AdminPageHeader";
import JointVentureForm from "@/components/admin/forms/JointVentureForm";

export default function NewJointVenturePage() {
  return (
    <div>
      <AdminPageHeader title="Add Joint Venture Partner" description="Add a new partner company." />
      <JointVentureForm />
    </div>
  );
}
