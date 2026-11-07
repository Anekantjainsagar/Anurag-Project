"""
AWS S3 Bucket & Cloud Storage Configuration
Persists AWS S3 credentials and settings to backend/s3_credentials.json and environment variables.
"""

import json
import os
from pathlib import Path
from typing import Optional
from pydantic import BaseModel

BACKEND_DIR = Path(__file__).resolve().parent.parent.parent
CONFIG_FILE = BACKEND_DIR / "s3_credentials.json"


class S3Config(BaseModel):
    # AWS IAM Credentials
    aws_access_key_id: str = ""
    aws_secret_access_key: str = ""
    
    # Bucket & Region settings
    aws_region: str = "ap-south-1"
    aws_s3_bucket: str = "onaar-media-assets"
    
    # Optional CloudFront CDN or custom endpoint (e.g. MinIO)
    aws_cloudfront_domain: Optional[str] = ""
    s3_endpoint_url: Optional[str] = ""

    @property
    def is_configured(self) -> bool:
        """Returns True if minimum required AWS S3 credentials are provided."""
        return bool(
            self.aws_access_key_id
            and self.aws_secret_access_key
            and not self.aws_access_key_id.startswith("PASTE_")
            and not self.aws_secret_access_key.startswith("PASTE_")
            and self.aws_s3_bucket
        )


def load_s3_config() -> S3Config:
    """Loads S3 configuration from JSON file or environment variables."""
    if CONFIG_FILE.exists():
        try:
            with open(CONFIG_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
                return S3Config(**data)
        except Exception as e:
            print(f"⚠️ [S3] Failed to read {CONFIG_FILE}: {e}")

    # Fallback to environment variables
    return S3Config(
        aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID", ""),
        aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY", ""),
        aws_region=os.getenv("AWS_REGION", "ap-south-1"),
        aws_s3_bucket=os.getenv("AWS_S3_BUCKET", "onaar-media-assets"),
        aws_cloudfront_domain=os.getenv("AWS_CLOUDFRONT_DOMAIN", ""),
        s3_endpoint_url=os.getenv("S3_ENDPOINT_URL", ""),
    )


def save_s3_config(config: S3Config) -> None:
    """Persists updated S3 credentials to s3_credentials.json."""
    with open(CONFIG_FILE, "w", encoding="utf-8") as f:
        json.dump(config.model_dump(), f, indent=2)
    print(f"✅ [S3] S3 credentials saved to {CONFIG_FILE}")


# Global singleton instance
s3_config = load_s3_config()
