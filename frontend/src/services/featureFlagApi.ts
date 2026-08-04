import api from "../api/client";
import type { FeatureFlag } from "../types/featureFlag";

// Get all feature flags
export async function fetchFeatureFlags(): Promise<FeatureFlag[]> {
  const response = await api.get("/feature-flags");
  return response.data;
}

// Get feature flag by id
export async function fetchFeatureFlagById(id: number): Promise<FeatureFlag>  {
  const response = await api.get(`/feature-flags/${id}`);
  return response.data;
};

// Create a feature flag
export async function createFeatureFlag(flag: FeatureFlag): Promise<FeatureFlag> {
  const response = await api.post("/feature-flags/create", flag);
  return response.data;
}

// Update a feature flag
export async function updateFeatureFlag(id: number, flag: Partial<FeatureFlag>): Promise<FeatureFlag> {
  const response = await api.put(`/feature-flags/${id}`, flag);
  return response.data;
}

// Toggle enabled/disabled
export async function toggleFeatureFlag(id: number, enabled: boolean): Promise<FeatureFlag> {
  const response = await api.patch(`/feature-flags/${id}`, { enabled, });
  return response.data;
}

// Delete a feature flag
export async function deleteFeatureFlag(id: number): Promise<void> {
  await api.delete(`/feature-flags/${id}`);
}

