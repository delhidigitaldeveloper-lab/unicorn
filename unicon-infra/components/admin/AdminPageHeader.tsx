import { ReactNode } from "react";

export default function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="font-display text-2xl md:text-3xl">{title}</h1>
        {description && <p className="text-white/50 text-sm mt-1">{description}</p>}
      </div>
      {action}
    </div>
  );
}
