from fastapi import APIRouter, HTTPException
from app.services.transcribe import transcribe_audio
import os

router = APIRouter()
AUDIO_DIR = 'audios'

@router.post('/transcribe/')
async def transcribe(file: str):
    audio_path = os.path.abspath(os.path.join(AUDIO_DIR, file))
   
    if not os.path.exists(audio_path):
        raise HTTPException(status_code=404, detail="Audio file not found")
    
    try:
        transcript = await transcribe_audio(audio_path)
        return {'transcript': transcript}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error during transcription: {str(e)}")