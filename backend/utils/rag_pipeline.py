from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import os
from groq import Groq
from dotenv import load_dotenv
import pickle

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY missing from .env file!")
    
client = Groq(api_key=GROQ_API_KEY)
embed_model = SentenceTransformer("all-MiniLM-L6-v2")

VECTOR_DIR = "vector_store"
os.makedirs(VECTOR_DIR, exist_ok=True)


def split_text(text, chunk_size=500):
    return [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]


def create_vector_store(text, user_id, doc_id):
    chunks = split_text(text)

    embeddings = embed_model.encode(chunks)
    dim = embeddings.shape[1]

    index = faiss.IndexFlatL2(dim)
    index.add(np.array(embeddings))

    index_path = f"{VECTOR_DIR}/{user_id}_{doc_id}.index"
    faiss.write_index(index, index_path)

    with open(f"{VECTOR_DIR}/{user_id}_{doc_id}.pkl", "wb") as f:
        pickle.dump(chunks, f)

    return index_path



def load_vector_store(user_id, doc_id):
    index_path = f"{VECTOR_DIR}/{user_id}_{doc_id}.index"
    chunks_path = f"{VECTOR_DIR}/{user_id}_{doc_id}.pkl"

    if not os.path.exists(index_path):
        return None, None

    index = faiss.read_index(index_path)

    with open(chunks_path, "rb") as f:
        chunks = pickle.load(f)

    return index, chunks


def retrieve_chunks(query, user_id, doc_id, k=5):
    index, chunks = load_vector_store(user_id, doc_id)

    if index is None:
        return []

    query_embedding = embed_model.encode([query])
    distances, indices = index.search(np.array(query_embedding), k)

    return [chunks[i] for i in indices[0]]


def answer_query(query, user_id, doc_id):
    relevant_chunks = retrieve_chunks(query, user_id, doc_id)

    if not relevant_chunks:
        return "No document found."

    context = "\n\n".join(relevant_chunks)

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": f"Answer ONLY using this context:\n{context}"
                },
                {
                    "role": "user",
                    "content": query
                }
            ],
            temperature=0.3,
        )
        return completion.choices[0].message.content
    except Exception as e:
        return f"Query error: {str(e)}. Please check GROQ_API_KEY."

