from sqlalchemy import Column, String
from sqlmodel import SQLModel
from sqlmodel import Field


class CheckClient(SQLModel):
    id: int
    username: str
    email: str


class LoginClient(SQLModel):
    username: str
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
