from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.video_processing import extract_audio_from_video
import os
import shutil

router = APIRouter()

UPLOAD_DIR = 'uploads'
AUDIO_DIR = 'audios'
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post('/upload/')
def upload_video(file: UploadFile = File(...)):
    # file_path = os.path.join(UPLOAD_DIR, file.filename)
    file_path = f'{UPLOAD_DIR}/{file.filename}'
    with open(file_path, 'wb') as buffer:
        try:
            shutil.copyfileobj(file.file, buffer)
            
        except Exception as e:
            raise HTTPException(statuscode=500, detail=f'failed to upload file {str(e)}')
        
    # audio_file_path = extract_audio_from_video(file_path, 'audios')
    return { 'file': file.filename, 'file_path': file_path }

@router.post("/process/")
def process_video(filename: str):
    """
    Endpoint to extract audio from a video file.
    """
    video_path = os.path.join(UPLOAD_DIR, filename)
    
    if not os.path.exists(video_path):
        raise HTTPException(status_code=404, detail="Video file not found")
    
    try:
        audio_path = extract_audio_from_video(video_path, AUDIO_DIR)
        return {"message": "Audio extracted successfully", "audio_path": audio_path}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing video: {str(e)}")
        

