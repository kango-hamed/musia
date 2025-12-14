import { CRS, divIcon, LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Layers, Map as MapIcon, Maximize, Search } from "lucide-react";
import { useState } from "react";
import { ImageOverlay, MapContainer, Marker, Popup, useMapEvents } from "react-leaflet";
import { AdminLayout } from "../layouts/AdminLayout";

// Fix Leaflet's default icon path issues
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Artist Marker Icon
const createCustomIcon = (color: string) => {
    return divIcon({
        className: "bg-transparent",
        html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`
    });
};

const mapBounds: LatLngBoundsExpression = [[0, 0], [1000, 1500]]; // Arbitrary meters/pixels

// Mock Data
const existingMARKERS = [
    { id: 1, x: 500, y: 750, title: "Mona Lisa", type: "artwork" },
    { id: 2, x: 200, y: 300, title: "Starry Night", type: "artwork" },
    { id: 3, x: 800, y: 1200, title: "Robot Base", type: "charging_station" }
];

function LocationMarker() {
    const [position, setPosition] = useState<L.LatLng | null>(null);
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
            console.log("Map Clicked at:", e.latlng);
        },
    });

    return position === null ? null : (
        <Marker position={position} icon={createCustomIcon("#ff0000")}>
            <Popup>New Point: {position.lat.toFixed(0)}, {position.lng.toFixed(0)}</Popup>
        </Marker>
    );
}

export function MapEditor() {
  const [markers] = useState(existingMARKERS);

  return (
    <AdminLayout title="Map Editor">
       <div className="relative h-[calc(100vh-140px)] w-full overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 shadow-sm">
          
          {/* Map Toolbar */}
          <div className="absolute left-4 top-4 z-[1000] flex flex-col gap-2 rounded-xl bg-white p-2 shadow-lg">
             <button className="rounded-lg p-2 hover:bg-gray-100" title="Select">
                <MapIcon className="h-5 w-5 text-gray-700" />
             </button>
             <button className="rounded-lg p-2 hover:bg-gray-100" title="Layers">
                <Layers className="h-5 w-5 text-gray-700" />
             </button>
             <div className="h-px bg-gray-200 my-1" />
             <button className="rounded-lg p-2 hover:bg-gray-100" title="Fullscreen">
                <Maximize className="h-5 w-5 text-gray-700" />
             </button>
          </div>

          {/* Search Overlay */}
          <div className="absolute right-4 top-4 z-[1000] w-72 rounded-xl bg-white p-3 shadow-lg">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input 
                   type="text" 
                   placeholder="Search map objects..." 
                   className="w-full rounded-lg bg-gray-50 pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
             </div>
          </div>

          <MapContainer 
             center={[500, 750]} 
             zoom={0} 
             scrollWheelZoom={true} 
             crs={CRS.Simple}
             minZoom={-1}
             maxZoom={2}
             style={{ height: "100%", width: "100%", background: "#e5e7eb" }}
          >
             {/* Floor Plan Image */}
             <ImageOverlay
                url="/musia-floor-plan.png"
                bounds={mapBounds}
             />

             {/* Existing Markers */}
             {markers.map(marker => (
                <Marker 
                   key={marker.id} 
                   position={[marker.x, marker.y]} 
                   icon={createCustomIcon(marker.type === 'artwork' ? '#7ab529' : '#000000')}
                >
                   <Popup>
                      <div className="text-sm font-bold">{marker.title}</div>
                      <div className="text-xs text-gray-500">x: {marker.x}, y: {marker.y}</div>
                   </Popup>
                </Marker>
             ))}

             {/* Interactive Click Marker */}
             <LocationMarker />

          </MapContainer>
       </div>
    </AdminLayout>
  );
}
