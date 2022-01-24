from sqlmodel import select
from fastapi.exceptions import HTTPException
from sqlmodel import Session
from Crypto.Protocol.KDF import bcrypt, bcrypt_check
from Crypto.Hash import SHA256
from base64 import b64encode
from src.schemas import RegisterClient, LoginClient
from src.models import Client


def create_client(client: RegisterClient, session: Session) -> Client:
    if get_client_by_email(client.email, session):
        raise HTTPException(detail="email is used", status_code=409)

    passw_hash = hash_password(client.password)
    master_passw_hash = hash_password(client.master_password)

    dict_client = client.dict()
    dict_client["password"] = passw_hash
    dict_client["master_password"] = master_passw_hash

    db_client = Client(**dict_client)
    session.add(db_client)
    session.commit()
    session.refresh(db_client)

    return db_client


def read_client(client: LoginClient, session: Session) -> Client:
    db_client = get_client_by_email(client.email, session)
    if not db_client:
        raise HTTPException(detail="wrong email or password", status_code=404)

    check_password(client.password, db_client.password)

    return db_client


def hash_password(password: str) -> str:
    passw = password.encode()
    b64_passw = b64encode(SHA256.new(passw).digest())
    passw_hash = bcrypt(b64_passw, 15)

    return passw_hash.decode()


def check_password(password: str, db_password: str):
    passw = password.encode()
    b64_passw = b64encode(SHA256.new(passw).digest())

    try:
        bcrypt_check(b64_passw, db_password.encode())
    except ValueError:
        raise HTTPException(detail="wrong email or password", status_code=404)


def get_client_by_email(email: str, session: Session) -> Client:
    statement = select(Client).where(Client.email == email).limit(1)
    return session.exec(statement).first()
