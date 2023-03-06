from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session
import crud.users
import schemas.users
from db.database import get_db

Users = APIRouter(prefix='/users',
                  tags=['users'],
                  responses={404: {"description": "Not found"}},
                  )


@Users.get("/", response_model=list[schemas.users.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.users.get_users(db, skip=skip, limit=limit)
    return users


@Users.get("/{user_id}/", response_model=schemas.users.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.users.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@Users.post("/", response_model=schemas.users.User)
def create_user(user: schemas.users.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.users.get_user_by_name(db, name=user.name)
    if db_user:
        raise HTTPException(status_code=400, detail="Name already registered")
    return crud.users.create_user(db=db, user=user)


# TODO: add user update

# TODO: add user delete
