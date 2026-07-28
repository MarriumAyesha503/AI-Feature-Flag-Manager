from sqlalchemy import Column, Integer, String, Boolean
from app.database import Base


class FeatureFlag(Base):

    __tablename__ = "feature_flags"
    
    id = Column(Integer,primary_key=True)
    name = Column(String,unique=True)
    description = Column(String)
    enabled = Column(Boolean,default=False)
    rollout_percentage = Column(Integer,default=0)
    project_id = Column(Integer)