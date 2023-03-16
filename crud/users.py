from sqlalchemy.orm import Session

from models.users import User
from schemas.users import UserCreate, UserUpdateName


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_name(db: Session, name: str):
    return db.query(User).filter(User.name == name).first()

def get_user_by_id(db: Session, id: int):
    return db.query(User).filter(User.id == id).first()

def update_user_name(db: Session,  user_id: int, updated_user: UserUpdateName):
    user = get_user_by_id(db, user_id)
    if user is None:
        return None
    for key, value in updated_user:
        setattr(user, key, value)
    db.commit()
    return user



def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()


def create_user(db: Session, user: UserCreate):
    fake_hashed_password = user.password + "notreallyhashed"
    db_user = User(name=user.name, hashed_password=fake_hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# TODO: Update user
def update_user():
    pass


def delete_user(db: Session, user_id: int):
    db.query(User).filter(User.id == user_id).delete()
    db.commit()
