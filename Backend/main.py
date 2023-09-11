# from routes.video import video_router
# app.include_router(video_router)
import uvicorn
from fastapi import FastAPI
import sys
import os
from subprocess import Popen
from Backend.db.database import engine, Base
from Backend.routes.users import Users
from Backend.routes.phrases import Phrases
from fastapi.middleware.cors import CORSMiddleware

sys.path.append(os.getcwd())

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
    p = Popen("start.bat", cwd=os.getcwd())
    uvicorn.run('main:app', reload=True)
