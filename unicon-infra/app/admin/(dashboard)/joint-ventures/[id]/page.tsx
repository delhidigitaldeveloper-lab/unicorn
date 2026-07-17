import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import JointVentureForm from "@/components/admin/forms/JointVentureForm";
import { getJointVentureById } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export default async function EditJointVenturePage({ params }: { params: { id: string } }) {
  const venture = await getJointVentureById(params.id);
  if (!venture) return notFound();

  return (
    <div>
      <AdminPageHeader title="Edit Joint Venture Partner" description={venture.name} />
      <JointVentureForm venture={venture} />
    </div>
  );
}
