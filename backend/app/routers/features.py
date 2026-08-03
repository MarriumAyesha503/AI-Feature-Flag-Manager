from http.client import HTTPException

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import FeatureFlag
from app.schemas.feature_flag import (FeatureFlagCreate,FeatureFlagResponse,FeatureFlagUpdate)
from sqlalchemy import select

router = APIRouter(prefix="/feature-flags")

@router.post("/create", response_model=FeatureFlagResponse)
async def create_feature_flag(flag: FeatureFlagCreate,db: AsyncSession = Depends(get_db)):

    new_flag = FeatureFlag(**flag.dict())
    db.add(new_flag)
    await db.commit()
    await db.refresh(new_flag)

    return new_flag

@router.patch("/{flag_id}")
async def update_feature_flag( flag_id: int, flag_update: FeatureFlagUpdate, db: AsyncSession = Depends(get_db) ):
    flag = await get_flag_by_id(flag_id, db)

    if not flag:
        raise HTTPException( status_code=404, detail="Feature flag not found" )

    update_data = flag_update.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(flag, key, value)


    await db.commit()
    await db.refresh(flag)

    return flag

@router.get("", response_model=list[FeatureFlagResponse])
async def get_feature_flags(db: AsyncSession = Depends(get_db)):

    result = await db.execute(select(FeatureFlag))
    return result.scalars().all()

@router.delete("/{flag_id}")
async def delete_feature_flag( flag_id: int, db: AsyncSession = Depends(get_db) ):

    flag = await get_flag_by_id(flag_id, db)
    await db.delete(flag)
    await db.commit()

    return {
        "message": "Feature flag deleted successfully"
    }

@router.get("/{flag_id}", response_model=FeatureFlagResponse)
async def get_flag_by_id(flag_id: int, db: AsyncSession = Depends(get_db)):

    result = await db.execute( select(FeatureFlag).where(FeatureFlag.id == flag_id) )
    flag = result.scalar_one_or_none()

    if not flag:
        raise HTTPException(
            status_code=404,
            detail="Feature flag not found"
        )

    return flag

@router.get("/environment/{environment}", response_model=list[FeatureFlagResponse])
async def get_feature_flags_by_environment(environment: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(FeatureFlag)
        .where(
            FeatureFlag.environment == environment
        )
    )

    return result.scalars().all()