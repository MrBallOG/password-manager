from typing import List
from fastapi import APIRouter
from ..models import Password
from ..schemas import CreatePassword, ReadPassword


router = APIRouter(
    prefix="/password",
    tags=["Password"]
)


@router.get("/", response_model=List[ReadPassword])
async def get_passwords(id: int):
    l = []
    l.append(ReadPassword(id=id, client_id=1))
    l.append(ReadPassword(id=2, client_id=2))
    return l


@router.post("/", response_model=ReadPassword)
async def create_password(password: CreatePassword):
    passw = Password(**password.dict(), id=1)
    return passw


@router.put("/{id}", response_model=ReadPassword)
async def update_password(id: int, password: CreatePassword):
    passw = Password(**password.dict(), id=id)
    return passw


@router.delete("/{id}")
async def delete_password(id: int):
    return id
