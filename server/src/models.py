from typing import List, Optional
from sqlmodel import Field, Relationship, SQLModel


class Client(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str
    email: str
    password: str
    master_password: str
    passwords: List["Password"] = Relationship(back_populates="client")


class Password(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    ciphertext: str
    client_id: int = Field(..., foreign_key="client.id")
    client: Client = Relationship(back_populates="passwords")
