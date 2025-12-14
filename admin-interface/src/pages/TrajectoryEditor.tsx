import { closestCenter, DndContext, type DragEndEvent, DragOverlay, type DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ArrowLeft, GripVertical, MapPin, Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../components/ui/Input";
import { AdminLayout } from "../layouts/AdminLayout";

// --- Mock Data ---
interface Artwork {
  id: string;
  title: string;
  image: string;
}

const AVAILABLE_ARTWORKS: Artwork[] = [
  { id: "1", title: "Mona Lisa", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/100px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg" },
  { id: "2", title: "Starry Night", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/100px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg" },
  { id: "3", title: "The Scream", image: "https://upload.wikimedia.org/wikipedia/commons/f/f4/The_Scream.jpg" },
  { id: "4", title: "Girl with Pearl Earring", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/100px-1665_Girl_with_a_Pearl_Earring.jpg" },
  { id: "5", title: "Guernica", image: "https://upload.wikimedia.org/wikipedia/en/7/74/PicassoGuernica.jpg" },
];

// --- Sortable Item Component ---
function SortableItem({ id, artwork, onRemove }: { id: string, artwork: Artwork, onRemove: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="group mb-3 flex items-center justify-between rounded-xl bg-white p-3 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3">
        <button {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:text-gray-600 active:cursor-grabbing">
           <GripVertical className="h-5 w-5" />
        </button>
        <div className="h-10 w-10 overflow-hidden rounded-lg bg-gray-100">
           <img src={artwork.image} alt={artwork.title} className="h-full w-full object-cover" />
        </div>
        <span className="font-medium text-gray-800">{artwork.title}</span>
      </div>
      
      <div className="flex items-center gap-4">
         <div className="flex items-center gap-1 text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">
            <span className="font-semibold text-gray-900">2</span> min
         </div>
         <button onClick={() => onRemove(id)} className="text-gray-400 hover:text-red-500">
            <Trash2 className="h-4 w-4" />
         </button>
      </div>
    </div>
  );
}

export function TrajectoryEditor() {
  const [items, setItems] = useState<Artwork[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active.id !== over?.id && over) {
      setItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  };

  const addToTour = (artwork: Artwork) => {
     if (!items.find(i => i.id === artwork.id)) {
        setItems([...items, artwork]);
     }
  };

  const removeFromTour = (id: string) => {
     setItems(items.filter(i => i.id !== id));
  };

  const handleSave = () => {
    // In a real app, this would send data to the backend
    const tourData = {
        name: "Renaissance Highlights", // This should grab the value from the input ref
        theme: "Renaissance",
        stops: items.map((item, index) => ({
            artworkId: item.id,
            order: index + 1,
            duration: 2 // default
        }))
    };
    alert(`Tour Saved! \n${items.length} stops added.`);
    console.log("Saving Tour:", tourData);
  };

  return (
    <AdminLayout title="Edit Tour">
      <div className="mb-6 flex items-center justify-between">
        <Link to="/trajectories" className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900">
           <ArrowLeft className="h-4 w-4" /> Back to Tours
        </Link>
        <button 
           onClick={handleSave}
           className="flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-sm font-bold text-white shadow-lg hover:bg-[#6da324]"
        >
           <Save className="h-4 w-4" /> Save Tour
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8 h-[calc(100vh-200px)]">
         
         {/* Left: Available Artworks */}
         <div className="col-span-4 flex flex-col rounded-3xl bg-white p-6 shadow-sm overflow-hidden">
            <h3 className="mb-4 font-bold text-gray-900">Available Artworks</h3>
            <div className="mb-4">
               <Input placeholder="Search collection..." />
            </div>
            <div className="flex-1 overflow-y-auto pr-2 space-y-2">
               {AVAILABLE_ARTWORKS.map(artwork => (
                  <div key={artwork.id} className="flex items-center justify-between rounded-xl border border-gray-100 p-3 hover:bg-gray-50 transition-colors">
                     <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-lg bg-gray-100">
                           <img src={artwork.image} alt={artwork.title} className="h-full w-full object-cover" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{artwork.title}</span>
                     </div>
                     <button 
                        onClick={() => addToTour(artwork)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar text-white hover:bg-black"
                     >
                        <Plus className="h-4 w-4" />
                     </button>
                  </div>
               ))}
            </div>
         </div>

         {/* Right: Tour Path Editor */}
         <div className="col-span-8 flex flex-col">
            <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
               <div className="grid grid-cols-2 gap-6">
                  <Input label="Tour Name" placeholder="e.g. Renaissance Highlights" defaultValue="Renaissance Highlights" />
                  <Input label="Theme" placeholder="e.g. History" defaultValue="Renaissance" />
               </div>
            </div>

            <div className="flex-1 rounded-3xl bg-gray-50 border-2 border-dashed border-gray-200 p-6">
               <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">Tour Path Sequence</h3>
                  <span className="text-sm text-gray-500">{items.length} Stops • ~{items.length * 5} mins</span>
               </div>
               
               <DndContext 
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
               >
                  <SortableContext 
                     items={items.map(i => i.id)}
                     strategy={verticalListSortingStrategy}
                  >
                     <div className="space-y-3">
                        {items.length === 0 && (
                           <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                              <MapPin className="h-12 w-12 mb-2 opacity-50" />
                              <p>Drag artworks here or click + to add stops</p>
                           </div>
                        )}
                        {items.map((artwork) => (
                           <SortableItem key={artwork.id} id={artwork.id} artwork={artwork} onRemove={removeFromTour} />
                        ))}
                     </div>
                  </SortableContext>
                  
                  <DragOverlay>
                     {activeId ? (
                        <div className="opacity-80">
                           {/* Placeholder for dragging appearance */}
                           <div className="rounded-xl bg-white p-3 shadow-lg border border-primary">
                              Dragging...
                           </div>
                        </div>
                     ) : null}
                  </DragOverlay>
               </DndContext>
            </div>
         </div>

      </div>
    </AdminLayout>
  );
}
