from transformers import pipeline

summarizer = pipeline(
    "summarization",
    model="sshleifer/distilbart-cnn-12-6"
)

rewriter = pipeline(
    "text2text-generation",
    model="google/flan-t5-base"
)


def extract_main_content(text):
    text_lower = text.lower()

    if "abstract" in text_lower:
        part = text_lower.split("abstract", 1)[1]
        for stop in ["introduction", "keywords"]:
            if stop in part:
                part = part.split(stop)[0]

        return part[:1500] 

    
    return text[:2000]


def clean_text(text):
    lines = text.split("\n")
    clean_lines = []

    for line in lines:
        line = line.strip()

        if len(line) < 30:
            continue

        if any(word in line.lower() for word in [
            "volume", "issue", "journal", "university",
            "doi", "issn", "@", "copyright"
        ]):
            continue

        clean_lines.append(line)

    return " ".join(clean_lines)


def rewrite_summary(text):
    prompt = f"""
Rewrite this into a clear academic summary.

Format:
- 2 to 3 sentences only
- Sentence 1 → what the paper studies
- Sentence 2 → methodology or approach
- Sentence 3 → key insight or result

Rules:
- Remove repetition
- Fix grammar
- Use simple and clear language

Text:
{text}
"""

    result = rewriter(
        prompt,
        max_length=120,
        do_sample=False  
    )

    return result[0]['generated_text']


def summarize_text(text):

    text = extract_main_content(text)

    text = clean_text(text)

    result = summarizer(
        text,
        max_length=180,
        min_length=60,
        do_sample=False
    )

    summary = result[0]['summary_text']

    final_output = rewrite_summary(summary)

    return final_output