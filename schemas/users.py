from pydantic import BaseModel

from schemas.phrases import Phrase


class UserBase(BaseModel):
    name: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool
    phrases: list[Phrase] = []

    class Config:
        orm_mode = True
