from datetime import datetime, timedelta
from fastapi import HTTPException
import jwt
from pydantic import BaseModel
from sqlalchemy import true
from settings import settings


class Token(BaseModel):
    token: str
    token_type: str


def create_refresh_token(email: str) -> Token:
    return Token(token=create_token(email, True), token_type="refresh_token")


def create_access_token(email: str) -> Token:
    return Token(token=create_token(email), token_type="bearer")


def create_token(email: str, refresh: bool = False) -> str:
    if refresh:
        duration = 64 * settings.TOKEN_DURATION
        secret = settings.SECRET_REFRESH
        expire = datetime.utcnow() + timedelta(minutes=duration)
    else:
        duration = settings.TOKEN_DURATION
        secret = settings.SECRET_ACCESS
        expire = datetime.utcnow() + timedelta(minutes=duration)

    to_encode = {"sub": email, "exp": expire}

    return jwt.encode(to_encode, secret, algorithm=settings.ALGORITHM)


def verify_refresh_token(token: Token) -> str:
    return verify_token(token, True)


def verify_access_token(token: Token) -> str:
    return verify_token(token)


def verify_token(token: Token, refresh: bool = False) -> str:
    if refresh:
        secret = settings.SECRET_REFRESH
    else:
        secret = settings.SECRET_ACCESS

    try:
        data = jwt.decode(token.token, secret, algorithms=settings.ALGORITHM)
        return data["sub"]
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="token expired")
    except jwt.exceptions.InvalidSignatureError:
        raise HTTPException(status_code=401, detail="invalid token")
