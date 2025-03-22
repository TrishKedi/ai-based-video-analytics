from fastapi import APIRouter, HTTPException
from app.services.transcribe import transcribe_audio
import os
import urllib.parse

router = APIRouter()
AUDIO_DIR = 'audios'

@router.post('/transcribe/')
async def transcribe(file: str):
    # audio_path = os.path.abspath(os.path.join(AUDIO_DIR, file))
    # Fix Windows path encoding issue
    normalized_filename = file.replace("\\", "/")
    # normalized_filename = urllib.parse.unquote(file)
   
    if not os.path.exists(file):
        raise HTTPException(status_code=404, detail="Audio file not found")
    
    try:
        transcript = await transcribe_audio(normalized_filename)
        return {'transcript': transcript}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error during transcription: {str(e)}")