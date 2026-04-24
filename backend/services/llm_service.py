from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_ideas(text, keywords, domain, subdomain):
    prompt = f"""
Generate 5 HIGH-QUALITY and DIVERSE research ideas.

Domain: {domain}
Subdomain: {subdomain}
Keywords: {keywords}

STRICT RULES:
- Must stay within domain
- Avoid generic ideas
- Each idea must be DIFFERENT:
  1. System architecture
  2. Optimization model
  3. Real-time system
  4. Advanced research (RL, deep learning)
  5. Product/startup idea

- Include:
  ✔ technical detail
  ✔ clear use-case
  ✔ system/method design

Return JSON:
[
  {{
    "title": "...",
    "description": "...",
    "use_case": "...",
    "category": "System/Research/Application/Product"
  }}
]
"""

    res = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7
    )

    return res.choices[0].message.content