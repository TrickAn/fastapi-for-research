from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session
import Backend.crud.users as crud
import Backend.schemas.users
from Backend.db.database import get_db
from Backend.schemas.users import UserUpdate, UserUpdatePassword

Users = APIRouter(prefix='/users',
                  tags=['users'],
                  responses={404: {"description": "Not found"}},
                  )


@Users.post("/", response_model=Backend.schemas.users.User)
def create_user(user: Backend.schemas.users.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_name(db, user_name=user.name.strip())
    if db_user:
        raise HTTPException(status_code=400, detail="Name already registered")
    return crud.create_user(db=db, user=user)


@Users.get("/", response_model=list[Backend.schemas.users.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@Users.get("/{user_id}/", response_model=Backend.schemas.users.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@Users.get("/name/{user_name}/", response_model=Backend.schemas.users.User)
def read_user_by_name(user_name: str, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_name(db, user_name=user_name.strip())
    if db_user is None:
        raise HTTPException(status_code=200, detail="User not found")
    # return db_user
    raise HTTPException(status_code=200, detail="User found")


@Users.put("/{user_id}/", response_model=Backend.schemas.users.User)
def user_update(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    db_user = crud.update_user(db, user_id, user)
    if db_user is None:
        raise HTTPException(status_code=404)
    return db_user


@Users.put("/password/{user_name}/", response_model=Backend.schemas.users.User)
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
