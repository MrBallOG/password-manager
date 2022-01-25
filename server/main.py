from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routers import auth, password
from src.db import create_tables
from settings import settings


app = FastAPI()


@app.on_event("startup")
def on_startup():
    create_tables()


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ORIGIN,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router)
app.include_router(password.router)
