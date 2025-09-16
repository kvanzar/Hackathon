from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pathlib import Path
# This is the corrected import line
from app.api.router import router as api_router

env_path = Path(__file__).parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

app = FastAPI(
    title="Travel AI Agent API",
    version="1.0.0",
    description="A production-grade agentic workflow for travel planning."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")

@app.get("/", tags=["Status"])
def read_root():
    return {"status": "ok", "message": "Welcome to the Travel AI API!"}