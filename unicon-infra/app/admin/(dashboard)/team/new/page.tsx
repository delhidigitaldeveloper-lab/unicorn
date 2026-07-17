import AdminPageHeader from "@/components/admin/AdminPageHeader";
import TeamMemberForm from "@/components/admin/forms/TeamMemberForm";

export default function NewTeamMemberPage() {
  return (
    <div>
      <AdminPageHeader title="Add Team Member" description="Add a new leadership profile." />
      <TeamMemberForm />
    </div>
  );
}
