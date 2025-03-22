from fastapi import FastAPI
from app.routes.video import router as video_router
from app.routes.transcribe import router as transcription_router
from app.routes.summarize import router as summary_router

app = FastAPI()

app.include_router(video_router, prefix='/api', tags=['video'])
app.include_router(transcription_router, prefix='/api', tags=['transcribe'])
app.include_router(summary_router, prefix='/api', tags=['summarize'])

@app.get('/')
def  root():
    return {'message': 'Welcome to AI analytics video API'}