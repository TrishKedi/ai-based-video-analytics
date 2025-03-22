import os
import whisper
import asyncio

async def transcribe_audio(audio_path: str):
    print('transcription started')
    print(audio_path)
    
    if not os.path.exists(audio_path):
        print("audio file not found")
        raise FileNotFoundError(f"Audio File not found")
    
    model = whisper.load_model("tiny")
    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(None, model.transcribe, audio_path)

    return result["text"]
   

