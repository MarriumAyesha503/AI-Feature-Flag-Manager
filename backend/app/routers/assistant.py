from app.schemas.assistant_request import AssistantRequest
from app.database import get_db
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.ai_service import ask_ai

router = APIRouter(prefix="/assistant")


@router.post("")
async def assistant(request: AssistantRequest, db: AsyncSession = Depends(get_db)):
    print(f"Received message: {request.message}")
    response = await ask_ai(request.message, db)
    return {
        "response": response
    }