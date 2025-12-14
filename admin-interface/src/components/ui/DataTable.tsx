import { ChevronLeft, ChevronRight, Search, Settings } from "lucide-react";
import { ReactNode } from "react";

interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  title: string;
  description?: string;
  onSearch?: (query: string) => void;
  actions?: ReactNode;
}

export function DataTable<T>({ columns, data, title, description, onSearch, actions }: DataTableProps<T>) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          {description && <p className="text-sm text-gray-500">{description}</p>}
        </div>
        
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="h-10 w-full rounded-full border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary w-64"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50">
             <Settings className="h-4 w-4 text-gray-500" />
          </button>
          {actions}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              {columns.map((col, idx) => (
                <th 
                   key={idx} 
                   className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item, rowIdx) => (
              <tr key={rowIdx} className="group hover:bg-gray-50/50 transition-colors">
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className={`px-4 py-4 text-sm text-gray-700 ${col.className || ''}`}>
                    {col.cell ? col.cell(item) : col.accessorKey ? String(item[col.accessorKey]) : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination (Static for now) */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
         <div className="text-sm text-gray-500">
            Showing <span className="font-medium text-gray-900">1</span> to <span className="font-medium text-gray-900">{data.length}</span> of <span className="font-medium text-gray-900">{data.length}</span> results
         </div>
         <div className="flex gap-2">
            <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 disabled:opacity-50" disabled>
               <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50">
               <ChevronRight className="h-4 w-4" />
            </button>
         </div>
      </div>
    </div>
  );
}
