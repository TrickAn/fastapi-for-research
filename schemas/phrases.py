from pydantic import BaseModel


class PhraseBase(BaseModel):
    text: str


class PhraseCreate(PhraseBase):
    pass


class PhraseUpdate(PhraseBase):
    pass


class PhraseGet(PhraseBase):
    name: str


class Phrase(PhraseBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True
