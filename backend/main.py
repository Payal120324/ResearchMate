from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import recommend
from fastapi import Request
from fastapi.responses import JSONResponse
from routes import ideas
from routes import upload, summarize, ask

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router)
app.include_router(summarize.router)
app.include_router(ask.router)
app.include_router(recommend.router)
app.include_router(ideas.router)



@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"error": f"Internal server error: {str(exc)}"}
    )

@app.get("/")
def home():
    return {"message": "Backend running 🚀"}
