export interface FeatureFlag {
  id: number;
  name: string;
  feature_key: string;
  description: string;
  enabled: boolean;
  rollout_percentage: number;
  project_id: number;
  environment: string;
  last_updated: string;
}

