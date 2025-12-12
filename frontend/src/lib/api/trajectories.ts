import { PreloadedTrajectory, Trajectory } from "../types";

const API_BASE = "/api";

export async function getTrajectories(): Promise<Trajectory[]> {
  const response = await fetch(`${API_BASE}/trajectories`);
  if (!response.ok) throw new Error("Failed to fetch trajectories");
  const data = await response.json();
  return data.data || data;
}

export async function getTrajectory(id: string): Promise<Trajectory> {
  const response = await fetch(`${API_BASE}/trajectories/${id}`);
  if (!response.ok) throw new Error("Failed to fetch trajectory");
  const data = await response.json();
  return data.data || data;
}

// For NLP Module integration
export async function preloadTrajectory(
  id: string
): Promise<PreloadedTrajectory> {
  // This connects to the NLP module's preload endpoint
  const NLP_BASE = import.meta.env.VITE_NLP_API_URL || "http://localhost:8000";
  const response = await fetch(`${NLP_BASE}/trajectories/${id}/preload`);
  if (!response.ok) throw new Error("Failed to preload trajectory");
  return response.json();
}

export async function startTrajectoryVisit(id: string) {
  const NLP_BASE = import.meta.env.VITE_NLP_API_URL || "http://localhost:8000";
  const response = await fetch(`${NLP_BASE}/trajectories/${id}/start`, {
    method: "POST",
  });
  if (!response.ok) throw new Error("Failed to start trajectory visit");
  return response.json();
}
