import { Edit2, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../components/ui/Badge";
import { DataTable } from "../components/ui/DataTable";
import { AdminLayout } from "../layouts/AdminLayout";

interface Artwork {
  id: string;
  title: string;
  artist: string;
  collection: string;
  location: string;
  status: "On Display" | "Storage" | "Maintenance";
  image: string;
}

const mockArtworks: Artwork[] = [
  {
    id: "ART-001",
    title: "Mona Lisa",
    artist: "Leonardo da Vinci",
    collection: "Renaissance",
    location: "Room 6, Wall A",
    status: "On Display",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1200px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"
  },
  {
    id: "ART-002",
    title: "The Starry Night",
    artist: "Vincent van Gogh",
    collection: "Post-Impressionism",
    location: "Room 12, Wall B",
    status: "On Display",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg"
  },
  {
    id: "ART-003",
    title: "The Scream",
    artist: "Edvard Munch",
    collection: "Expressionism",
    location: "Storage 2",
    status: "Storage",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f4/The_Scream.jpg"
  },
  {
    id: "ART-004",
    title: "Girl with a Pearl Earring",
    artist: "Johannes Vermeer",
    collection: "Dutch Golden Age",
    location: "Room 4, Wall C",
    status: "Maintenance",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/800px-1665_Girl_with_a_Pearl_Earring.jpg"
  },
  {
     id: "ART-005",
     title: "Guernica",
     artist: "Pablo Picasso",
     collection: "Cubism",
     location: "Room 8, Wall A",
     status: "On Display",
     image: "https://upload.wikimedia.org/wikipedia/en/7/74/PicassoGuernica.jpg"
  }
];

export function Artworks() {
  const columns = [
    {
       header: "Artwork",
       cell: (item: Artwork) => (
          <div className="flex items-center gap-4">
             <div className="h-12 w-12 overflow-hidden rounded-lg bg-gray-100">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
             </div>
             <div>
                <div className="font-bold text-gray-900">{item.title}</div>
                <div className="text-xs text-gray-500">{item.id}</div>
             </div>
          </div>
       )
    },
    {
       header: "Artist",
       accessorKey: "artist" as const,
       className: "font-medium"
    },
    {
       header: "Collection",
       accessorKey: "collection" as const
    },
    {
       header: "Location",
       accessorKey: "location" as const
    },
    {
       header: "Status",
       cell: (item: Artwork) => {
          const variant = 
             item.status === 'On Display' ? 'success' :
             item.status === 'Maintenance' ? 'warning' :
             'default';
          return <Badge variant={variant}>{item.status}</Badge>;
       }
    },
     {
       header: "Actions",
       className: "text-right",
       cell: (item: Artwork) => (
          <div className="flex justify-end gap-2">
             <Link to={`/artworks/${item.id}`} className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600">
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
    <AdminLayout title="Artworks">
      <DataTable 
         title="Collection Inventory"
         description="Manage and catalog museum artworks available for robot tours."
         columns={columns}
         data={mockArtworks}
         actions={
            <Link to="/artworks/new" className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-white shadow-lg shadow-lime-500/20 hover:bg-[#6da324] transition-all">
               <span>+ Add New Artwork</span>
            </Link>
         }
      />
    </AdminLayout>
  );
}
