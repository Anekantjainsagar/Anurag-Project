"""
Onaar / YOUR BRAND FastAPI Server Runner
Direct entrypoint to start the development server with auto-reload.
Usage:
    python run.py
    # or from project root:
    python backend/run.py
"""

import sys
from pathlib import Path
import uvicorn

# Ensure the backend directory is in the Python path
BACKEND_DIR = Path(__file__).resolve().parent
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

if __name__ == "__main__":
    print("\n" + "=" * 60)
    print("🌾 Starting Onaar FastAPI Backend Server")
    print("🚀 API URL:      http://127.0.0.1:8000")
    print("📖 Swagger Docs: http://127.0.0.1:8000/docs")
    print("📚 ReDoc:        http://127.0.0.1:8000/redoc")
    print("=" * 60 + "\n")

    uvicorn.run(
        "app.main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
        app_dir=str(BACKEND_DIR),
    )
