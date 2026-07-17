import { ReactNode } from "react";

export interface DataTableColumn<T> {
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

export default function DataTable<T extends { id: string }>({
  columns,
  rows,
  emptyMessage = "No records found.",
}: {
  columns: DataTableColumn<T>[];
  rows: T[];
  emptyMessage?: string;
}) {
  if (rows.length === 0) {
    return <div className="glass rounded-2xl p-16 text-center text-white/40">{emptyMessage}</div>;
  }

  return (
    <div className="glass rounded-2xl overflow-x-auto">
      <table className="w-full text-sm min-w-[640px]">
        <thead>
          <tr className="border-b border-white/10 text-left">
            {columns.map((col) => (
              <th
                key={col.header}
                className="px-5 py-4 text-white/40 font-normal uppercase text-xs tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors"
            >
              {columns.map((col) => (
                <td key={col.header} className={`px-5 py-4 align-middle ${col.className ?? ""}`}>
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
