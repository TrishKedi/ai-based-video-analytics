import whisper


model = whisper.load_model('small')
result = model.transcribe("D:\\AIProjects\\ai-based-video-analytics\\backend\\audios\\test.wav")
print(result["text"])