import requests
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def extract_context(text):
    lines = text.split("\n")

    title = ""
    for line in lines:
        if len(line.strip()) > 15:
            title = line.strip()
            break

    lower = text.lower()

    abstract = ""
    if "abstract" in lower:
        part = lower.split("abstract", 1)[1]

        for stop in ["introduction", "keywords"]:
            if stop in part:
                part = part.split(stop)[0]

        abstract = part[:500]
    else:
        abstract = text[:500]

    return title + " " + abstract



def clean_text(text):
    text = re.sub(r"[^a-zA-Z\s]", " ", text)
    return text.lower()


def get_top_3_related_titles(query, user_email="guest"):
    try:
        url = "https://api.openalex.org/works"

        
        context = extract_context(query)
        context = clean_text(context)

        print("CONTEXT:", context[:200])

       
        res = requests.get(url, params={
            "search": context[:200],
            "per-page": 15
        })

        if res.status_code != 200:
            return ["Failed to fetch papers"]

        data = res.json()

        titles = [item.get("title", "") for item in data.get("results", [])]

        if not titles:
            return ["No papers found"]

       
        documents = [context] + titles

        vectorizer = TfidfVectorizer(stop_words="english")
        tfidf_matrix = vectorizer.fit_transform(documents)

        query_vector = tfidf_matrix[0]
        title_vectors = tfidf_matrix[1:]

        scores = cosine_similarity(query_vector, title_vectors)[0]

        ranked = sorted(
            zip(titles, scores),
            key=lambda x: x[1],
            reverse=True
        )

        top = [title for title, score in ranked[:3]]

        return top if top else ["No relevant papers found"]

    except Exception as e:
        print("Recommendation Error:", e)
        return ["Error fetching recommendations"]