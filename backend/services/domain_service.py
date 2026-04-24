from groq import Groq
import os
import json
from dotenv import load_dotenv

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def detect_domain(text):
    prompt = f"""
Identify domain and subdomain of this research paper.

Return JSON:
{{
  "domain": "...",
  "subdomain": "..."
}}

Text:
{text[:1200]}
"""

    try:
        res = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.2
        )
        return json.loads(res.choices[0].message.content)
    except:
        return {"domain": "General", "subdomain": ""}