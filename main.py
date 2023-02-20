import uvicorn
from fastapi import FastAPI
from routes.video import video_router
from Phrases.Generate import Phrase_router

app = FastAPI()

app.include_router(video_router)
app.include_router(Phrase_router)

if __name__ == '__main__':
    uvicorn.run('main:app', reload=True)
