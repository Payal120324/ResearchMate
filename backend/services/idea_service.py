import json

from services.analysis_service import extract_keywords
from services.domain_service import detect_domain
from services.llm_service import generate_ideas
from services.scoring_service import score_idea


def process_ideas(text):
    
    keywords = extract_keywords(text)

    
    domain_data = detect_domain(text)
    domain = domain_data.get("domain", "General")
    subdomain = domain_data.get("subdomain", "")

    
    raw = generate_ideas(text, keywords, domain, subdomain)

    try:
        ideas = json.loads(raw)
    except:
        return {"ideas": []}

   
    final = []
    for idea in ideas:
        score, reasons = score_idea(idea, keywords, domain)

        idea["score"] = score
        idea["reasons"] = reasons
        final.append(idea)

    
    final = sorted(final, key=lambda x: x["score"], reverse=True)

    return {
        "domain": domain,
        "subdomain": subdomain,
        "keywords": keywords,
        "ideas": final[:3]
    }