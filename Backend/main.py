# from routes.video import video_router
# app.include_router(video_router)
import uvicorn
from fastapi import FastAPI

from db.database import engine, Base
from routes.users import Users
from routes.phrases import Phrases

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(Users)
app.include_router(Phrases)

if __name__ == '__main__':
    uvicorn.run('main:app', reload=True)


# TODO: Make description of users and repair 'id' of phrases and users