from fastapi import APIRouter, HTTPException
from app.services.summarize import summarize_text
import urllib.parse
router = APIRouter()

@router.post('/summarize')
def summarize(text: str):

    if not text:
        raise HTTPException(status_code=500, detail=f'Text cannot be empty')
    
    try:
        decode_text = urllib.parse.unquote(text)
        summary = summarize_text(decode_text)
        return {'summary': summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Error summarizing the text {str(e)}')