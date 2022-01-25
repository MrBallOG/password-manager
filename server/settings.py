from pydantic import BaseSettings


class Settings(BaseSettings):
    CONNECTION_STRING: str
    SECRET_ACCESS: str
    SECRET_REFRESH: str
    ALGORITHM: str
    TOKEN_DURATION: int
    ORIGIN: str

    class Config:
        env_file = '.env'


settings = Settings()
