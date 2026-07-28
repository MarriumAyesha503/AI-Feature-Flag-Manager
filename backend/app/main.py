from fastapi import FastAPI

from app.database import create_tables
from app.routers import users
from app.routers import features
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React/Vite frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await create_tables()

app.include_router(users.router)
app.include_router(features.router)
