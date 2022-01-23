from sqlmodel import SQLModel


class ReadClient(SQLModel):
    id: int
    username: str
    email: str


class LoginClient(SQLModel):
    username: str
    email: str
    password: str


class RegisterClient(LoginClient):
    master_password: str


class ReadPassword(SQLModel):
    id: int
    client_id: int


class CreatePassword(SQLModel):
    ciphertext: str
    client_id: int
