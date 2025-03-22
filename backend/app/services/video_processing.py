import os
import subprocess
from moviepy import VideoFileClip
from pathlib import Path

def extract_audio_from_video(video_path:str, output_dir: str = "audios"):

    if not os.path.exists(video_path):
        raise FileNotFoundError('Video not found')
    
    os.makedirs(output_dir, exist_ok=True)
    audio_filename = Path(video_path).stem + '.wav'
    audio_path = os.path.join(output_dir, audio_filename)

    try:
        video = VideoFileClip(video_path)
        video.audio.write_audiofile(audio_path, fps=16000, codec="pcm_s16le")
    except Exception as e:
        raise RuntimeError(f"Error extracting audio: {str(e)}")
    
    return audio_path

