from datetime import datetime
from enum import Enum
from pydantic import BaseModel

class Environment(str, Enum):
    DEV = "dev"
    TEST = "test"
    STAGE = "stage"
    PRODUCTION = "prod"

class FeatureFlagCreate(BaseModel):

    name: str
    description: str
    enabled: bool = False
    rollout_percentage: int = 0
    project_id: int
    environment: Environment
    
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
    environment: Environment
    last_updated: datetime

    class Config:
        from_attributes = True