from typing import List, Optional
from sqlmodel import Field, Relationship
from .schemas import RegisterClient, CreatePassword


class Client(RegisterClient, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    passwords: List["Password"] = Relationship(back_populates="client")


class Password(CreatePassword, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    client_id: int = Field(..., foreign_key="client.id")
    client: Client = Relationship(back_populates="passwords")
