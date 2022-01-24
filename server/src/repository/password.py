from typing import List
from sqlmodel import Session, select
from fastapi.exceptions import HTTPException
from src.schemas import CreatePassword, GetOrUpdatePassword
from src.models import Password, Client


def read_passwords(client_id: int, session: Session) -> List[Password]:
    check_if_client_exists(client_id, session)

    statement = select(Password).where(Password.client_id == client_id)
    passwords = session.exec(statement).all()

    return passwords


def read_password(password_id: int, session: Session) -> Password:
    check_if_client_exists(password_id, session)

    statement = select(Password).where(Password.id == password_id).limit(1)
    password = session.exec(statement).first()

    if not password:
        raise HTTPException(detail="no such password", status_code=404)

    return password


def create_password(password: CreatePassword, session: Session) -> Password:
    check_if_client_exists(password.client_id, session)

    db_password = Password.from_orm(password)
    session.add(db_password)
    session.commit()
    session.refresh(db_password)

    return db_password


def update_password(password: GetOrUpdatePassword, session: Session) -> Password:
    check_if_client_exists(password.client_id, session)

    statement = select(Password).where(Password.id == password.id).limit(1)
    db_password = session.exec(statement).first()
    if not db_password:
        raise HTTPException(detail="no such password", status_code=404)

    db_password.ciphertext = password.ciphertext
    session.add(db_password)
    session.commit()
    session.refresh(db_password)

    return db_password


def delete_password(id: int, session: Session):
    statement = select(Password).where(Password.id == id).limit(1)
    db_password = session.exec(statement).first()
    if not db_password:
        raise HTTPException(detail="no such password", status_code=404)

    session.delete(db_password)
    session.commit()


def check_if_client_exists(client_id: int, session: Session):
    statement = select(Client).where(Client.id == client_id).limit(1)
    if not session.exec(statement).first():
        raise HTTPException(detail="no such client", status_code=404)
