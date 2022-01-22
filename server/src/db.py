from sqlmodel import SQLModel, Session, create_engine
from .settings import settings
from . import models


db_url = settings.CONNECTION_STRING
engine = create_engine(db_url, echo=True)


def get_session():
    with Session(engine) as session:
        yield session


def create_tables():
    SQLModel.metadata.create_all(engine)
