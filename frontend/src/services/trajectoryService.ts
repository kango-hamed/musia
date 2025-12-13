/**
 * Trajectory Service
 * API client for trajectory-related endpoints
 */

import { apiClient, retryRequest } from './api';
import type {
  Trajectory,
  TrajectoriesResponse,
  SingleTrajectoryResponse,
  TrajectoryStep,
} from '@/types';

export const trajectoryService = {
  /**
   * Get all trajectories
   */
  async getAll(): Promise<Trajectory[]> {
    const response = await retryRequest(() =>
      apiClient.get<TrajectoriesResponse>('/trajectories')
    );
    return response.data.data;
  },

  /**
   * Get single trajectory by ID (with steps populated)
   */
  async getById(id: string): Promise<Trajectory> {
    const response = await retryRequest(() =>
      apiClient.get<SingleTrajectoryResponse>(`/trajectories/${id}`)
    );
    return response.data.data;
  },

  /**
   * Get active trajectories
   */
  async getActive(): Promise<Trajectory[]> {
    const trajectories = await this.getAll();
    return trajectories.filter((t) => t.isActive);
  },

  /**
   * Get default trajectory
   */
  async getDefault(): Promise<Trajectory | null> {
    const trajectories = await this.getAll();
    return trajectories.find((t) => t.isDefault) || null;
  },

  /**
   * Get trajectories by theme
   */
  async getByTheme(theme: string): Promise<Trajectory[]> {
    const trajectories = await this.getAll();
    return trajectories.filter((t) => t.theme === theme);
  },

  /**
   * Get trajectories by difficulty
   */
  async getByDifficulty(
    difficultyLevel: Trajectory['difficultyLevel']
  ): Promise<Trajectory[]> {
    const trajectories = await this.getAll();
    return trajectories.filter((t) => t.difficultyLevel === difficultyLevel);
  },

  /**
   * Create new trajectory (protected)
   */
  async create(trajectory: Partial<Trajectory>): Promise<Trajectory> {
    const response = await apiClient.post<SingleTrajectoryResponse>(
      '/trajectories',
      trajectory
    );
    return response.data.data;
  },

  /**
   * Update trajectory (protected)
   */
  async update(id: string, updates: Partial<Trajectory>): Promise<Trajectory> {
    const response = await apiClient.patch<SingleTrajectoryResponse>(
      `/trajectories/${id}`,
      updates
    );
    return response.data.data;
  },

  /**
   * Delete trajectory (protected)
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/trajectories/${id}`);
  },

  /**
   * Add step to trajectory (protected)
   */
  async addStep(
    trajectoryId: string,
    step: Partial<TrajectoryStep>
  ): Promise<Trajectory> {
    const response = await apiClient.post<SingleTrajectoryResponse>(
      `/trajectories/${trajectoryId}/steps`,
      step
    );
    return response.data.data;
  },

  /**
   * Update trajectory step (protected)
   */
  async updateStep(
    trajectoryId: string,
    stepId: string,
    updates: Partial<TrajectoryStep>
  ): Promise<Trajectory> {
    const response = await apiClient.patch<SingleTrajectoryResponse>(
      `/trajectories/${trajectoryId}/steps/${stepId}`,
      updates
    );
    return response.data.data;
  },

  /**
   * Delete trajectory step (protected)
   */
  async deleteStep(trajectoryId: string, stepId: string): Promise<Trajectory> {
    const response = await apiClient.delete<SingleTrajectoryResponse>(
      `/trajectories/${trajectoryId}/steps/${stepId}`
    );
    return response.data.data;
  },

  /**
   * Reorder trajectory steps (protected)
   */
  async reorderSteps(
    trajectoryId: string,
    stepIds: string[]
  ): Promise<Trajectory> {
    const response = await apiClient.patch<SingleTrajectoryResponse>(
      `/trajectories/${trajectoryId}/reorder`,
      { stepIds }
    );
    return response.data.data;
  },
};
