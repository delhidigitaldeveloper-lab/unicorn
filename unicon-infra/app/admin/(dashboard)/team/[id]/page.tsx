import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import TeamMemberForm from "@/components/admin/forms/TeamMemberForm";
import { getTeamMemberById } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export default async function EditTeamMemberPage({ params }: { params: { id: string } }) {
  const member = await getTeamMemberById(params.id);
  if (!member) return notFound();

  return (
    <div>
      <AdminPageHeader title="Edit Team Member" description={member.name} />
      <TeamMemberForm member={member} />
    </div>
  );
}
