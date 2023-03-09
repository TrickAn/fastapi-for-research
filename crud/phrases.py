from sqlalchemy.orm import Session

from models.phrase import Phrase
from schemas.phrases import PhraseCreate, PhraseUpdate


def get_phrases(db: Session, skip: int = 0, limit: int = 100):
    # return db.query(Phrase.text, User.name).join(User, User.id == Phrase.user_id).group_by(Phrase.id).offset(skip).limit(limit).all()
    return db.query(Phrase).offset(skip).limit(limit).all()


def get_phrase_by_id(db: Session, phrase_id: int):
    return db.query(Phrase).get(phrase_id)


def get_phrases_by_user_id(db: Session, user_id: int):
    return db.query(Phrase).filter(Phrase.user_id == user_id).all()

def get_phrases_by_user_name(db: Session, user_name: int):
    return db.query(Phrase).filter(Phrase.user_name == user_name).all()


def create_user_phrase(db: Session, phrase: PhraseCreate, user_id: int):
    db_phrase = Phrase(**phrase.dict(), user_id=user_id)
    db.add(db_phrase)
    db.commit()
    db.refresh(db_phrase)
    return db_phrase


def update_phrase(db: Session,  phrase_id: int, updated_phrase: PhraseUpdate):
    phrase = get_phrase_by_id(db, phrase_id)
    if phrase is None:
        return None
    for key, value in updated_phrase:
        setattr(phrase, key, value)
    db.commit()
    return phrase


def delete_phrase(db: Session, phrase_id: int):
    db.query(Phrase).filter(Phrase.id == phrase_id).delete()
    db.commit()
    return None