import { Edit2, Pause, Play, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../components/ui/Badge";
import { DataTable } from "../components/ui/DataTable";
import { AdminLayout } from "../layouts/AdminLayout";

interface Trajectory {
  id: string;
  name: string;
  theme: string;
  duration: number; // minutes
  stops: number;
  status: "Active" | "Draft" | "Archived";
  lastRun: string;
}

const mockTrajectories: Trajectory[] = [
  {
    id: "TRJ-001",
    name: "Renaissance Highlights",
    theme: "Renaissance",
    duration: 45,
    stops: 8,
    status: "Active",
    lastRun: "2 hours ago"
  },
  {
    id: "TRJ-002",
    name: "Modern Art Discovery",
    theme: "Modern",
    duration: 30,
    stops: 5,
    status: "Active",
    lastRun: "Yesterday"
  },
  {
    id: "TRJ-003",
    name: "Impressionist Masterpieces",
    theme: "Impressionism",
    duration: 60,
    stops: 12,
    status: "Draft",
    lastRun: "Never"
  },
  {
     id: "TRJ-004",
     name: "Quick Overview",
     theme: "General",
     duration: 15,
     stops: 3,
     status: "Active",
     lastRun: "10 mins ago"
  }
];

export function Trajectories() {
  const columns = [
    {
       header: "Tour Name",
       cell: (item: Trajectory) => (
          <div>
             <div className="font-bold text-gray-900">{item.name}</div>
             <div className="text-xs text-gray-500">{item.id}</div>
          </div>
       )
    },
    {
       header: "Theme",
       accessorKey: "theme" as const
    },
    {
       header: "Duration",
       cell: (item: Trajectory) => <span className="text-gray-600">{item.duration} min</span>
    },
    {
       header: "Stops",
       accessorKey: "stops" as const
    },
    {
       header: "Status",
       cell: (item: Trajectory) => {
          const variant = 
             item.status === 'Active' ? 'success' :
             item.status === 'Draft' ? 'warning' :
             'default';
          return <Badge variant={variant}>{item.status}</Badge>;
       }
    },
    {
       header: "Last Run",
       accessorKey: "lastRun" as const,
       className: "text-gray-500"
    },
    {
       header: "Actions",
       className: "text-right",
       cell: (item: Trajectory) => (
          <div className="flex justify-end gap-2">
             <button className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-green-50 hover:text-green-600">
                {item.status === 'Active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
             </button>
             <Link to={`/trajectories/${item.id}`} className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                <Edit2 className="h-4 w-4" />
             </Link>
             <button className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500">
                <Trash2 className="h-4 w-4" />
             </button>
          </div>
       )
    }
  ];

  return (
    <AdminLayout title="Trajectories">
      <DataTable 
         title="Guided Tours"
         description="Manage robot tour paths and artwork sequences."
         columns={columns}
         data={mockTrajectories}
         actions={
            <Link to="/trajectories/new" className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-white shadow-lg shadow-lime-500/20 hover:bg-[#6da324] transition-all">
               <span>+ Create New Tour</span>
            </Link>
         }
      />
    </AdminLayout>
  );
}
