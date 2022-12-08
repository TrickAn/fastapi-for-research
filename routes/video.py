import shutil
from typing import List
from fastapi import APIRouter, UploadFile, File

# from schemas import UploadVideo

video_router = APIRouter(prefix='/video',
                         tags=['video'],
                         responses={404: {"description": "Not found"}},
                         )


@video_router.post('/')
async def root(file: UploadFile = File(...)):
    with open('test.mp4', 'wb') as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"file_name": file.filename}


@video_router.post('/img')
async def upload_image(files: List[UploadFile] = File(...)):
    for img in files:
        with open(f'{img.filename}', 'wb') as buffer:
            shutil.copyfileobj(img.file, buffer)

    return {"file_name": 'Good'}


@video_router.get('/{id}')
async def get_by_id():
    print()
