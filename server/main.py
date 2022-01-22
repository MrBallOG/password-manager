from fastapi import FastAPI
from src.routers import auth, password
from src.db import create_tables


create_tables()


app = FastAPI()
app.include_router(auth.router)
app.include_router(password.router)
