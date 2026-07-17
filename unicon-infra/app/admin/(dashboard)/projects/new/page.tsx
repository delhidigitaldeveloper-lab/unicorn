import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProjectForm from "@/components/admin/forms/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <AdminPageHeader title="Add New Project" description="Create a new project listing." />
      <ProjectForm />
    </div>
  );
}
