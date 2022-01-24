from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from src.models import Password, Client
from src.schemas import GetOrUpdatePassword, CreatePassword, CheckPassword, CheckMasterPassword
from src.db import get_session
import src.repository.password as sr
from src.repository.client import get_client_by_email, check_password
from src.tokens import Token, verify_access_token


router = APIRouter(
    prefix="/password",
    tags=["Password"]
)


@router.post("/{client_id}", response_model=List[GetOrUpdatePassword])
async def read_passwords(client_id: int, token: Token, master_password: CheckMasterPassword, session: Session = Depends(get_session)):
    email = verify_access_token(token)
    db_client = get_client_by_email(email, session)

    check_if_token_belongs_to_user(client_id, db_client)
    check_if_correct_master_passowrd(master_password, db_client)

    passwords = sr.read_passwords(client_id, session)
    return passwords


@router.post("/", response_model=CheckPassword, status_code=201)
async def create_password(password: CreatePassword, token: Token, master_password: CheckMasterPassword, session: Session = Depends(get_session)):
    email = verify_access_token(token)
    db_client = get_client_by_email(email, session)

    check_if_token_belongs_to_user(password.client_id, db_client)
    check_if_correct_master_passowrd(master_password, db_client)

    passw = sr.create_password(password, session)
    return passw


@router.put("/", response_model=CheckPassword)
async def update_password(password: GetOrUpdatePassword, token: Token, master_password: CheckMasterPassword, session: Session = Depends(get_session)):
    email = verify_access_token(token)
    db_client = get_client_by_email(email, session)

    check_if_token_belongs_to_user(password.client_id, db_client)
    check_if_correct_master_passowrd(master_password, db_client)

    passw = sr.update_password(password, session)
    return passw


@router.delete("/{id}", status_code=204)
async def delete_password(id: int, token: Token, master_password: CheckMasterPassword, session: Session = Depends(get_session)):
    email = verify_access_token(token)
    db_client = get_client_by_email(email, session)
    password = sr.read_password(id, session)

    check_if_token_belongs_to_user(password.client_id, db_client)
    check_if_correct_master_passowrd(master_password, db_client)

    sr.delete_password(id, session)


def check_if_token_belongs_to_user(client_id: int, db_client: Client):
    if not db_client or db_client.id != client_id:
        raise HTTPException(
            detail="wrong user or password", status_code=404)


def check_if_correct_master_passowrd(master_password: CheckMasterPassword, db_client: Client):
    check_password(master_password.master_password, db_client.master_password)
