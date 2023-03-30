from fastapi import Depends, APIRouter, HTTPException
from sqlalchemy.orm import Session

import crud.phrases as crud
import schemas.users
from db.database import get_db
from schemas.phrases import PhraseCreate, PhraseUpdate, Phrase

Phrases = APIRouter(prefix='/phrases',
                    tags=['phrases'],
                    responses={404: {"description": "Not found"}},
                    )


@Phrases.post("/{user_id}/", response_model=Phrase)
def create_phrase_for_user(
        user_id: int, phrase: PhraseCreate, db: Session = Depends(get_db)
):
    db_phrase = crud.create_user_phrase(db=db, phrase=phrase, user_id=user_id)
    return db_phrase


@Phrases.get("/")
def get_phrases(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    phrases = crud.get_phrases(db, skip=skip, limit=limit)
    return phrases


@Phrases.get("/{phrase_id}/")
def get_phrase_by_id(phrase_id: int, db: Session = Depends(get_db)):
    phrase = crud.get_phrase_by_id(db, phrase_id)
    if phrase is None:
        raise HTTPException(status_code=404, detail='Phrase not found')
    return phrase


@Phrases.get("/id/{user_id}/")
def get_phrase_by_user_id(user_id: int, db: Session = Depends(get_db)):
    phrase = crud.get_phrases_by_user_id(db, user_id)
    if phrase is None or phrase == []:
        raise HTTPException(status_code=404, detail="User not found")
    return phrase




@Phrases.get("/name/{user_name}/", response_model=schemas.users.User)
def get_phrases_by_user_name(user_name: str, db: Session = Depends(get_db)):
    phrases = crud.get_phrases_by_user_name(db, user_name=user_name)
    if phrases is None:
        raise HTTPException(status_code=404, detail="User not found")
    return phrases




@Phrases.put("/{phrase_id}/", response_model=Phrase)
def phrase_update(phrase_id: int, phrase: PhraseUpdate, db: Session = Depends(get_db)):
    db_phrase = crud.update_phrase(db, phrase_id, phrase)
    if db_phrase is None:
        raise HTTPException(status_code=404)
    return db_phrase


@Phrases.delete("/{phrase_id}/", status_code=204)
def delete_phrase(phrase_id: int, db: Session = Depends(get_db)):
    crud.delete_phrase(db, phrase_id)
    return None
