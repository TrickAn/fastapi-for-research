from pydantic import BaseModel


class PhraseBase(BaseModel):
    text: str


class PhraseCreate(PhraseBase):
    pass


class Phrase(PhraseBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True
