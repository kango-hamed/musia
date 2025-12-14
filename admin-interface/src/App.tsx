import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ArtworkForm } from "./pages/ArtworkForm";
import { Artworks } from "./pages/Artworks";
import { Dashboard } from "./pages/Dashboard";
import { MapEditor } from "./pages/MapEditor";
import { Trajectories } from "./pages/Trajectories";
import { TrajectoryEditor } from "./pages/TrajectoryEditor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        
        {/* Artworks Management */}
        <Route path="/artworks" element={<Artworks />} />
        <Route path="/artworks/new" element={<ArtworkForm />} />
        <Route path="/artworks/:id" element={<ArtworkForm />} />

        {/* Trajectory Management */}
        <Route path="/trajectories" element={<Trajectories />} />
        <Route path="/trajectories/new" element={<TrajectoryEditor />} />
        <Route path="/trajectories/:id" element={<TrajectoryEditor />} />

        {/* Map Editor */}
        <Route path="/map-editor" element={<MapEditor />} />
        
        {/* Placeholder routes for other sidebar items */}
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
