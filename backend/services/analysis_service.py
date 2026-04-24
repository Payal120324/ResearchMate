import re
from collections import Counter
from groq import Groq
import os
import json
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

STOPWORDS = {
    "the","and","is","in","to","of","for","with","on","that","this","we","are"
}


def extract_keywords(text, top_k=8):
    words = re.findall(r"\b[a-zA-Z]{4,}\b", text.lower())
    words = [w for w in words if w not in STOPWORDS]

    freq = Counter(words)
    return [w for w, _ in freq.most_common(top_k)]



def detect_domain_llm(text):
    prompt = f"""
Identify the research domain and subdomain.

Return JSON:
{{
  "domain": "...",
  "subdomain": "..."
}}

Text:
{text[:1500]}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2
    )

    try:
        return json.loads(response.choices[0].message.content)
    except:
        return {"domain": "General AI", "subdomain": ""}