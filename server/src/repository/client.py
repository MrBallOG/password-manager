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

    passw = client.password.encode()
    master_passw = client.master_password.encode()

    b64_passw = b64encode(SHA256.new(passw).digest())
    b64_master_passw = b64encode(SHA256.new(master_passw).digest())

    passw_hash = bcrypt(b64_passw, 12)
    master_passw_hash = bcrypt(b64_master_passw, 12)

    dict_client = client.dict()
    dict_client["password"] = passw_hash.decode()
    dict_client["master_password"] = master_passw_hash.decode()

    db_client = Client(**dict_client)
    session.add(db_client)
    session.commit()
    session.refresh(db_client)

    return db_client


def read_client(client: LoginClient, session: Session) -> Client:
    db_client = get_client_by_email(client.email, session)
    if not db_client:
        raise HTTPException(detail="wrong email or password", status_code=404)

    passw = client.password.encode()
    b64_passw = b64encode(SHA256.new(passw).digest())

    try:
        bcrypt_check(b64_passw, db_client.password)
    except ValueError:
        raise HTTPException(detail="wrong email or password", status_code=404)

    return db_client


def get_client_by_email(email: str, session: Session) -> Client:
    statement = select(Client).where(Client.email == email).limit(1)
    return session.exec(statement).first()
