"""
Core Application Configuration
Uses Pydantic v2 Settings to validate and expose environment variables.
"""

from pathlib import Path
from typing import List, Union
from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

BACKEND_DIR = Path(__file__).resolve().parent.parent.parent
DEFAULT_SQLITE_URL = f"sqlite+aiosqlite:///{BACKEND_DIR / 'onaar.db'}"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=str(BACKEND_DIR / ".env"),
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # Project metadata
    PROJECT_NAME: str = "Onaar E-Commerce Backend"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    API_V1_PREFIX: str = "/api/v1"

    # Security & JWT
    SECRET_KEY: str = "onaar-insecure-default-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30

    # Supabase PostgreSQL / Local SQLite Database
    DATABASE_URL: str = DEFAULT_SQLITE_URL
    SUPABASE_URL: str = "https://btiuwbqbkltwlefcqhjd.supabase.co"
    SUPABASE_SERVICE_ROLE_KEY: str = ""

    # SMTP Configuration
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = "meriwebdunia@gmail.com"
    SMTP_PASSWORD: str = ""
    SMTP_USE_TLS: bool = True
    SMTP_FROM_NAME: str = "ONAAR / Pure Harvest"
    SMTP_FROM_EMAIL: str = "meriwebdunia@gmail.com"

    # Vendor Details
    VENDOR_NAME: str = "Anurag Jain"
    VENDOR_EMAIL: str = "meriwebdunia@gmail.com"
    VENDOR_PHONE: str = "+91-98765 43210"

    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://anurag-project.vercel.app",
    ]

    @field_validator("DATABASE_URL", mode="before")
    @classmethod
    def validate_database_url(cls, v: Union[str, None]) -> str:
        if not v or not isinstance(v, str) or not v.strip():
            return DEFAULT_SQLITE_URL
        val = v.strip()
        # Fallback to local SQLite if password placeholder or unreachable template
        if "[PASSWORD]" in val or "db.btiuwbqbkltwlefcqhjd.supabase.co" in val:
            return DEFAULT_SQLITE_URL
        if val.startswith("sqlite+aiosqlite:///"):
            path_part = val.replace("sqlite+aiosqlite:///", "")
            if not path_part.startswith("/") and not Path(path_part).is_absolute():
                filename = Path(path_part).name or "onaar.db"
                resolved = (BACKEND_DIR / filename).resolve()
                return f"sqlite+aiosqlite:///{resolved}"
        return val

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",") if i.strip()]
        elif isinstance(v, list):
            return v
        return [
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "https://anurag-project.vercel.app",
        ]


settings = Settings()

