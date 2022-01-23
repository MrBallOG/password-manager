from typing import List
from fastapi import APIRouter, Depends
from sqlmodel import Session
from src.models import Password
from src.schemas import GetOrUpdatePassword, CreatePassword, CheckPassword
from src.db import get_session
import src.repository.password as sr
from src.tokens import Token, verify_access_token


router = APIRouter(
    prefix="/password",
    tags=["Password"]
)


@router.get("/{client_id}", response_model=List[GetOrUpdatePassword])
async def read_passwords(client_id: int, token: Token, session: Session = Depends(get_session)):
    verify_access_token(token)
    passwords = sr.read_passwords(client_id, session)
    return passwords


@router.post("/", response_model=CheckPassword, status_code=201)
async def create_password(password: CreatePassword, token: Token, session: Session = Depends(get_session)):
    verify_access_token(token)
    passw = sr.create_password(password, session)
    return passw


@router.put("/", response_model=CheckPassword)
async def update_password(password: GetOrUpdatePassword, token: Token, session: Session = Depends(get_session)):
    verify_access_token(token)
    passw = sr.update_password(password, session)
    return passw


@router.delete("/{id}", status_code=204)
async def delete_password(id: int, token: Token, session: Session = Depends(get_session)):
    verify_access_token(token)
    sr.delete_password(id, session)
