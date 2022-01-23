from fastapi import APIRouter
from ..models import Client
from ..schemas import RegisterClient, LoginClient, ReadClient


router = APIRouter(
    tags=["Auth"]
)


@router.post("/register", response_model=ReadClient)
async def register(client: RegisterClient):
    db_client = Client(**client.dict(), id=1)
    return db_client


@router.post("/login", response_model=ReadClient)
async def login(client: LoginClient):
    db_client = Client(**client.dict(), id=1)
    return db_client
