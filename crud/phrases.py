from sqlalchemy.orm import Session

from models.phrase import Phrase
from schemas.phrases import PhraseCreate


def get_phrases(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Phrase).offset(skip).limit(limit).all()


def get_phrase_by_user_id(db: Session, user_id: int):
    return db.query(Phrase).filter(Phrase.user_id == user_id).all()


def create_user_phrase(db: Session, phrase: PhraseCreate, user_id: int):
    db_phrase = Phrase(**phrase.dict(), user_id=user_id)
    db.add(db_phrase)
    db.commit()
    db.refresh(db_phrase)
    return db_phrase
