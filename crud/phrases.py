from sqlalchemy.orm import Session

from models.phrase import Phrase
from models.users import User
from schemas.phrases import PhraseCreate, PhraseBase


def get_phrases(db: Session, skip: int = 0, limit: int = 100) -> PhraseBase:
    return db.query(Phrase.text, User.name).join(User, User.id == Phrase.user_id).group_by(Phrase.id).offset(skip).limit(limit).first()


def get_phrase_by_user_id(db: Session, user_id: int):
    return db.query(Phrase).filter(Phrase.user_id == user_id).all()


def create_user_phrase(db: Session, phrase: PhraseCreate, user_id: int):
    db_phrase = Phrase(**phrase.dict(), user_id=user_id)
    db.add(db_phrase)
    db.commit()
    db.refresh(db_phrase)
    return db_phrase
