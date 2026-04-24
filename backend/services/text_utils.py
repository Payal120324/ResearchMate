def extract_abstract(text):
    """Safely extract abstract or return first 1000 chars"""
    text_lower = text.lower()
    
    if "abstract" in text_lower:
        parts = text.split("abstract", 1)
        if len(parts) > 1:
            return parts[1][:1000].strip()
    
    return text[:1000].strip()
