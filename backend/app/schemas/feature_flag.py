from pydantic import BaseModel

class FeatureFlagCreate(BaseModel):

    name: str
    description: str
    enabled: bool = False
    rollout_percentage: int = 0
    project_id: int

class FeatureFlagUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    enabled: bool | None = None
    rollout_percentage: int | None = None

class FeatureFlagResponse(BaseModel):

    id: int
    name: str
    enabled: bool
    rollout_percentage: int

    class Config:
        from_attributes = True