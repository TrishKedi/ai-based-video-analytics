from transformers import pipeline

def summarize_text(text: str, size: int = 150):
    summarizer = pipeline('summarization', model='facebook/bart-large-cnn')
    summary =  summarizer(text, max_length=size, min_length=50, do_sample=False)
    return  summary[0]["summary_text"]