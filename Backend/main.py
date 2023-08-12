# from routes.video import video_router
# app.include_router(video_router)
import uvicorn
from fastapi import FastAPI

from Backend.db.database import engine, Base
from Backend.routes.users import Users
from Backend.routes.phrases import Phrases
from Backend.fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(Users)
app.include_router(Phrases)

origins = ["http://localhost:3000", "http://127.0.0.1:3000"]
app.add_middleware(CORSMiddleware,
                   allow_origins=origins,
                   allow_credentials=True,
                   allow_methods=['*'],
                   allow_headers=['*'])

if __name__ == '__main__':
    uvicorn.run('main:app', reload=True)


# TODO: Make description of users and repair 'id' of phrases and users
