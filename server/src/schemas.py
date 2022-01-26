from fastapi import HTTPException
from sqlalchemy import Column, String
from sqlmodel import SQLModel
from sqlmodel import Field
from sys import maxsize


class CheckClient(SQLModel):
    id: int
    email: str


class LoginClient(SQLModel):
    email: str = Field(sa_column=Column("email", String, unique=True))
    password: str


class CheckMasterPassword(SQLModel):
    master_password: str


class RegisterClient(LoginClient, CheckMasterPassword):
    pass


class CheckPassword(SQLModel):
    id: int


class CreatePassword(SQLModel):
    ciphertext: str


class GetOrUpdatePassword(CreatePassword):
    id: int


def validate_check_master_password(passw: CheckMasterPassword):
    validate_master_password(passw.master_password)


def validate_login_client(client: LoginClient):
    validate_email(client.email)
    validate_password(client.password)


def validate_register_client(client: RegisterClient):
    validate_email(client.email)
    validate_password(client.password)
    validate_master_password(client.master_password)


def validate_get_or_update_password(passw: GetOrUpdatePassword):
    validate_id(passw.id)
    validate_ciphertext(passw.ciphertext)


def validate_create_password(passw: CreatePassword):
    validate_ciphertext(passw.ciphertext)


def validate_email(email: str):
    lenght = len(email)
    if lenght > 254:
        raise HTTPException(
            detail="email must be shorter than 255", status_code=422)


def validate_master_password(master_passw: str):
    lenght = len(master_passw)
    if lenght < 12 or lenght > 64:
        raise HTTPException(
            detail="master password must be between 12 and 64", status_code=422)


def validate_password(passw: str):
    lenght = len(passw)
    if lenght < 8 or lenght > 50:
        raise HTTPException(
            detail="password must be between 8 and 50", status_code=422)


def validate_id(id: int):
    if id > maxsize or id < 0:
        raise HTTPException(
            detail="id must be >= 0 and < max_int", status_code=422)


def validate_ciphertext(ciphertext: str):
    if len(ciphertext) > 500:
        raise HTTPException(
            detail="ciphertext must be shorter than 501", status_code=422)
