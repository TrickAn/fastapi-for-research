from fastapi import Depends, APIRouter
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from crud.phrases import create_user_phrase
from schemas.phrases import PhraseBase, PhraseCreate, PhraseGet
from db.database import get_db

Phrases = APIRouter(prefix='/phrases',
                    tags=['phrases'],
                    responses={404: {"description": "Not found"}},
                    )


@Phrases.post("/users/{user_id}/phrases/", response_model=PhraseBase)
def create_phrase_for_user(
        user_id: int, phrase: PhraseCreate, db: Session = Depends(get_db)
):
    return create_user_phrase(db=db, phrase=phrase, user_id=user_id)


# @Phrases.get("/phrases/", response_model=list[PhraseGet])
# def read_phrases(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     phrases = get_phrases(db, skip=skip, limit=limit)
#     return phrases.name


@Phrases.put("/items/{item_id}", response_model=PhraseBase)
async def update_item(item_id: int, item: PhraseBase):

    return update_item_encoded
