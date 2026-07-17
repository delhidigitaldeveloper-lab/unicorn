import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProjectForm from "@/components/admin/forms/ProjectForm";
import { getProjectById } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);
  if (!project) return notFound();

  return (
    <div>
      <AdminPageHeader title="Edit Project" description={project.name} />
      <ProjectForm project={project} />
    </div>
  );
}
