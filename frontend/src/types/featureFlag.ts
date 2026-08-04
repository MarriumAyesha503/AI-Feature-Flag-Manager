export interface FeatureFlag {
  id?: number;
  name: string;
  description: string;
  enabled: boolean;
  rollout_percentage: number;
  project_id: number;
  environment: string;
  last_updated?: string;
}

