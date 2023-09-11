from sqlalchemy.orm import Session
from Backend.auth.security import get_password_hash
from Backend.models.user import User
from Backend.schemas.users import UserCreate, UserUpdate, UserUpdatePassword


def get_user_by_name(db: Session, user_name: str):
    return db.query(User).filter(User.name == user_name).first()


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_user_pass(db: Session, user_password: str):
    return db.query(User).filter(User.password == user_password)


def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def update_user(db: Session, user_id: int, updated_user: UserUpdate):
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
    db_user = User(name=user.name, hashed_password=get_password_hash(user.password))
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user_password(db: Session, user_name: str, updated_user: UserUpdatePassword):
    user = get_user_by_name(db, user_name)
    if user is None:
        return None
    user.hashed_password = get_password_hash(updated_user.password)
    db.commit()
    return user


# def get_description_by_id(db: Session, ):
#    return db.query(User).filter(User.id == user.id).first()


# def get_user_by_id(db: Session, user_id: int):
#    return db.query(User).filter(User.id == user_id).first()


# def get_description_by_name


def delete_user(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    db.delete(user)
    db.commit()
