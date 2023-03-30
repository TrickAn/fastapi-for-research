from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session
import crud.users as crud
import crud.phrases as crudp
import schemas.users
from db.database import get_db
from schemas.users import UserUpdateName, UserUpdatePassword

Users = APIRouter(prefix='/users',
                  tags=['users'],
                  responses={404: {"description": "Not found"}},
                  )


@Users.post("/", response_model=schemas.users.User)
def create_user(user: schemas.users.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_name(db, user_name=user.name)
    if db_user:
        raise HTTPException(status_code=400, detail="Name already registered")
    return crud.create_user(db=db, user=user)


@Users.get("/", response_model=list[schemas.users.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@Users.get("/{user_id}/", response_model=schemas.users.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@Users.get("/name/{user_name}/", response_model=schemas.users.User)
def read_user_by_name(user_name: str, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_name(db, user_name=user_name)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user



@Users.put("/{user_id}/", response_model=schemas.users.User)
def user_name_update(user_id: int, user: UserUpdateName, db: Session = Depends(get_db)):
    db_user = crud.update_user_name(db, user_id, user)
    if db_user is None:
        raise HTTPException(status_code=404)
    return db_user


@Users.put("/password/{user_name}/", response_model=schemas.users.User)
def user_pass_update(user_name: str, user: UserUpdatePassword, db: Session = Depends(get_db)):
    db_user = crud.update_user_password(db, user_name, user)
    if db_user is None:
        raise HTTPException(status_code=404)
    return db_user




@Users.delete("/{user_id}/")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    crud.delete_user(db, user_id)
    return None
# TODO: If i delete user, phrases won`t delete
