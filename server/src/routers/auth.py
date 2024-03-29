from datetime import datetime, timedelta
from typing import Optional
from fastapi import APIRouter, Cookie, Depends, HTTPException, Response
from sqlmodel import Session
from src.routers.password import check_if_correct_master_passowrd
from src.schemas import CheckMasterPassword, RegisterClient, LoginClient, CheckClient, validate_check_master_password, validate_login_client, validate_register_client
from src.repository.client import create_client, get_client_by_email, read_client
from src.db import get_session
from src.tokens import Token, verify_access_token, verify_refresh_token, create_access_token, create_refresh_token
from settings import settings

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


@router.post("/register", response_model=CheckClient, status_code=201)
async def register(client: RegisterClient, session: Session = Depends(get_session)):
    validate_register_client(client)

    db_client = create_client(client, session)
    return db_client


@router.post("/login", response_model=Token)
async def login(client: LoginClient, response: Response, session: Session = Depends(get_session)):
    validate_login_client(client)

    db_client = read_client(client, session)
    refresh_token = create_refresh_token(db_client.email)
    access_token = create_access_token(db_client.email)
    duration = settings.TOKEN_DURATION * 64
    expires = datetime.utcnow() + timedelta(minutes=duration)
    response.set_cookie(key=refresh_token.token_type,
                        value=refresh_token.token,
                        httponly=True,
                        secure=True,
                        samesite="None",
                        path="/auth",
                        expires=expires.strftime("%a, %d %b %Y %H:%M:%S GMT"))

    return access_token


@router.post("/master")
async def master(token: Token, master_password: CheckMasterPassword, session: Session = Depends(get_session)):
    validate_check_master_password(master_password)

    email = verify_access_token(token)
    db_client = get_client_by_email(email, session)

    check_if_correct_master_passowrd(master_password, db_client)


@router.post("/logout", status_code=204)
async def logout(response: Response):
    response.set_cookie(key="refresh_token",
                        value="",
                        httponly=True,
                        secure=True,
                        samesite="None",
                        path="/auth",
                        expires="Thu, 01 Jan 1970 00:00:01 GMT")


@router.post("/refresh", response_model=Token)
async def refresh(refresh_token: Optional[str] = Cookie(None)):
    if refresh_token == None:
        raise HTTPException(status_code=401, detail="token missing")

    token = Token(token_type="refresh_token", token=refresh_token)
    email = verify_refresh_token(token)

    return create_access_token(email)
