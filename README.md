# 🚀 ResearchMate AI

**AI-Powered Research Paper Assistant**

ResearchMate AI is a smart platform that helps users **analyze research papers, generate insights, and discover related work** using a hybrid approach that combines **LLMs (Groq), NLP, and classical information retrieval techniques**.

---

## ✨ Features

### 📄 Paper Upload & Processing

* Upload research papers in PDF format
* Extracts structured text (title, abstract, and main content)

### 🧠 Smart Summarization (Groq Powered)

* Generates concise and readable summaries
* Removes noise such as headers and metadata
* Uses Groq for fast and efficient inference

### 💡 Research Idea Generator (Hybrid AI)

* Extracts domain and key concepts
* Generates research ideas using Groq
* Applies custom ranking and scoring logic

### 🔍 Research Paper Recommendation

* Fetches candidate papers using OpenAlex API
* Ranks results using TF-IDF and cosine similarity
* Works across multiple domains (domain-independent)

### ❓ Ask Questions (Context-Aware Q&A)

* Ask questions based on uploaded research papers
* Uses Groq for context-aware responses

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS (Glassmorphism UI)

### Backend

* FastAPI (Python)
* RESTful APIs

### AI / ML

* Groq API (LLM inference)
* TF-IDF (Scikit-learn)
* Cosine Similarity
* NLP preprocessing

### APIs

* OpenAlex API (research paper retrieval)

---

## 🧠 System Architecture

```text
User Uploads Paper
        ↓
Text Extraction Layer
        ↓
+--------------------------------------+
| AI Processing Layer                  |
|--------------------------------------|
| Groq (Summarization, Q&A)            |
| Idea Generator (Hybrid Logic + LLM)  |
| Recommendation Engine (TF-IDF + API) |
+--------------------------------------+
        ↓
Frontend Dashboard (React)
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/researchmate-ai.git
cd researchmate-ai
```

---

### 2️⃣ Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 📂 Project Structure

```text
researchmate-ai/
│
├── backend/
│   ├── routes/              # API routes
│   ├── services/            # Core logic (AI, recommendation, etc.)
│   ├── main.py              # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── pages/           # Pages
│   │   └── assets/          # Images & static files
│
└── README.md
```

---

## 🎯 Key Highlights

* ✔ Hybrid architecture (LLM + deterministic logic)
* ✔ Uses Groq for ultra-fast inference
* ✔ Domain-independent research analysis
* ✔ Custom ranking algorithms (not just AI output)
* ✔ Clean and modern glassmorphism UI

---

## 📸 Screenshots

<img width="1911" height="939" alt="image" src="https://github.com/user-attachments/assets/4c163afe-4da6-4450-8693-6764cfbe3792" />
<img width="1914" height="897" alt="image" src="https://github.com/user-attachments/assets/32cad2b0-2920-4a73-a4e4-034dafd489b3" />
<img width="1908" height="882" alt="image" src="https://github.com/user-attachments/assets/db75caad-e37f-4146-b64a-da118be484ce" />
<img width="1208" height="831" alt="image" src="https://github.com/user-attachments/assets/108afb0e-6919-4da7-81ed-83f84b730b1f" />



---

## 🚀 Future Improvements

* Semantic search using embeddings
* Citation-based ranking
* User personalization
* Multi-paper comparison


