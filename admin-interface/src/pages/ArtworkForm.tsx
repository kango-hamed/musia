import { ArrowLeft, MapPin, Save, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Tabs } from "../components/ui/Tabs";
import { TextArea } from "../components/ui/TextArea";
import { AdminLayout } from "../layouts/AdminLayout";

export function ArtworkForm() {
  // Tab 1: General Information
  const GeneralTab = (
    <div className="grid grid-cols-12 gap-8">
      {/* Left: Image Upload */}
      <div className="col-span-12 lg:col-span-4">
        <label className="mb-2 block text-sm font-semibold text-gray-700">Artwork Image</label>
        <div className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100">
           <Upload className="mb-2 h-8 w-8 text-gray-400" />
           <span className="text-sm font-medium text-gray-500">Click to upload image</span>
           <span className="text-xs text-gray-400">JPG, PNG up to 10MB</span>
        </div>
      </div>

      {/* Right: Fields */}
      <div className="col-span-12 lg:col-span-8 space-y-6">
         <Input label="Title" placeholder="e.g. Mona Lisa" />
         <Input label="Artist" placeholder="e.g. Leonardo da Vinci" />
         
         <div className="grid grid-cols-2 gap-6">
            <Input label="Year" placeholder="e.g. 1503" type="number"/>
            <Input label="Technique" placeholder="e.g. Oil on poplar" />
         </div>

         <div className="grid grid-cols-2 gap-6">
            <Select 
                label="Collection" 
                options={[
                { label: "Permanent Collection", value: "permanent" },
                { label: "Temporary Exhibition", value: "temporary" },
                { label: "Loan", value: "loan" }
                ]} 
            />
            <Select 
                label="Period" 
                options={[
                { label: "Renaissance", value: "renaissance" },
                { label: "Modern Art", value: "modern" },
                { label: "Baroque", value: "baroque" },
                { label: "Impressionism", value: "impressionism" }
                ]} 
            />
         </div>
         
         <Input label="Style" placeholder="e.g. Portrait, Landscape" />
      </div>
    </div>
  );

  // Tab 2: Narrative Content
  const ContentTab = (
     <div className="space-y-8">
        <div>
           <h3 className="mb-4 text-lg font-bold text-gray-900">Description</h3>
           <TextArea 
              label="Standard Description" 
              placeholder="The main description displayed to visitors..." 
              rows={4}
           />
           <div className="mt-4">
               <TextArea 
                  label="Short Description (for notifications)" 
                  placeholder="Brief summary..." 
                  rows={2}
               />
           </div>
        </div>

        <div>
           <h3 className="mb-4 text-lg font-bold text-gray-900">Audio Guides</h3>
           <div className="grid grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-200 p-4">
                 <div className="mb-2 font-semibold">Short Audio (Intro)</div>
                 <div className="flex items-center gap-3">
                    <button className="rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-bold text-white">Upload</button>
                    <span className="text-xs text-gray-400">No file selected</span>
                 </div>
              </div>
              <div className="rounded-xl border border-gray-200 p-4">
                 <div className="mb-2 font-semibold">Long Audio (Deep Dive)</div>
                 <div className="flex items-center gap-3">
                    <button className="rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-bold text-white">Upload</button>
                    <span className="text-xs text-gray-400">No file selected</span>
                 </div>
              </div>
           </div>
        </div>
     </div>
  );

  // Tab 3: Location
  const LocationTab = (
     <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8">
           <div className="relative h-[400px] w-full bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-200">
              <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Louvre_plan_entresol.svg/2560px-Louvre_plan_entresol.svg.png')] bg-cover opacity-20"></div>
              <div className="z-10 bg-white p-3 shadow-lg rounded-xl flex items-center gap-2">
                 <MapPin className="text-primary h-5 w-5" />
                 <span className="text-sm font-bold">Pin Location on Map</span>
              </div>
           </div>
        </div>
        <div className="col-span-4 space-y-6">
           <Select 
              label="Floor" 
              options={[
                 { label: "Ground Floor", value: "0" },
                 { label: "First Floor", value: "1" },
                 { label: "Basement", value: "-1" }
              ]} 
           />
           <Input label="Room Name" placeholder="e.g. Salle des États" />
           <div className="grid grid-cols-2 gap-4">
              <Input label="Coord X" placeholder="0.00" type="number" step="0.1" />
              <Input label="Coord Y" placeholder="0.00" type="number" step="0.1" />
           </div>
           <div>
              <Input label="Orientation (°)" placeholder="0" type="number" min="0" max="360" />
              <div className="mt-1 text-xs text-gray-400">Angle where the robot should face to show the artwork.</div>
           </div>
        </div>
     </div>
  );

  return (
    <AdminLayout title="Edit Artwork">
      <div className="mb-8 flex items-center justify-between">
        <Link to="/artworks" className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900">
           <ArrowLeft className="h-4 w-4" /> Back to List
        </Link>
        <div className="flex gap-3">
           <button className="rounded-full px-6 py-2 text-sm font-bold text-gray-600 hover:bg-gray-100">Cancel</button>
           <button className="flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-sm font-bold text-white shadow-lg hover:bg-[#6da324]">
              <Save className="h-4 w-4" /> Save Changes
           </button>
        </div>
      </div>

      <Tabs 
         tabs={[
            { id: "general", label: "General Information", content: GeneralTab },
            { id: "content", label: "Narrative Content", content: ContentTab },
            { id: "location", label: "Location & Map", content: LocationTab },
         ]} 
      />
    </AdminLayout>
  );
}
