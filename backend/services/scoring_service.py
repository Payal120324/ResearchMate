def score_idea(idea, keywords, domain):
    score = 0
    reasons = []

    text = (idea["title"] + idea["description"]).lower()

    matches = [k for k in keywords if k in text]
    score += len(matches) * 2

    if matches:
        reasons.append(f"Matches keywords: {', '.join(matches)}")

    if any(x in text for x in ["system", "platform", "framework", "pipeline"]):
        score += 3
        reasons.append("Strong technical design")

    if "real-time" in text or "application" in text:
        score += 2
        reasons.append("Real-world relevance")

    if any(x in text for x in ["iot", "predictive", "digital twin", "simulation"]):
        score += 3
        reasons.append("Advanced concept")

    if "using machine learning" in text:
        score -= 3
        reasons.append("Too generic")

    if domain.lower() in ["education", "psychology"]:
        if any(x in text for x in ["reinforcement learning", "optimization", "edge ai"]):
            score -= 4
            reasons.append("Domain drift penalty")

    return score, reasons