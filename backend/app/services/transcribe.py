import os
import whisper
import asyncio
import urllib.parse

async def transcribe_audio(audio_path: str):

    if not os.path.exists(audio_path):
      
        raise FileNotFoundError(f"Audio File not found")
    
    model = whisper.load_model("tiny")
    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(None, model.transcribe, audio_path)

    return urllib.parse.unquote(result["text"])
   

