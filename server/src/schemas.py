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


class RegisterClient(LoginClient):
    master_password: str


class CheckPassword(SQLModel):
    id: int
    client_id: int


class CreatePassword(SQLModel):
    ciphertext: str
    client_id: int


class GetOrUpdatePassword(CreatePassword):
    id: int
