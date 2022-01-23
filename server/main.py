from fastapi import FastAPI
from src.routers import auth, password
from src.db import create_tables


app = FastAPI()


@app.on_event("startup")
def on_startup():
    create_tables()


app.include_router(auth.router)
app.include_router(password.router)
