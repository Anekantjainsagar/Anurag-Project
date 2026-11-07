"""
Storage Service: AWS S3 & Local Fallback
Handles file uploads to Amazon S3 buckets with fallback to local public directory when credentials are pending.
"""

import os
import re
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, Any, Optional

from app.core.s3_config import s3_config, load_s3_config

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent.parent
LOCAL_UPLOAD_DIR = PROJECT_ROOT / "public" / "uploads"


class StorageService:
    @staticmethod
    def _sanitize_filename(filename: str) -> str:
        name, ext = os.path.splitext(filename)
        cleaned = re.sub(r"[^a-zA-Z0-9_\-]", "_", name).lower()
        timestamp = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
        unique_id = uuid.uuid4().hex[:6]
        return f"{cleaned}_{timestamp}_{unique_id}{ext.lower()}"

    @classmethod
    async def upload_file(
        cls,
        file_bytes: bytes,
        original_filename: str,
        content_type: str = "image/jpeg",
        folder: str = "products",
    ) -> Dict[str, Any]:
        """
        Uploads an image or document to AWS S3 if credentials configured.
        Otherwise falls back to local storage (public/uploads/) for seamless development.
        """
        safe_name = cls._sanitize_filename(original_filename)
        s3_key = f"{folder}/{safe_name}"
        current_cfg = load_s3_config()

        # If S3 is fully configured, attempt upload via boto3
        if current_cfg.is_configured:
            try:
                import boto3
                from botocore.config import Config

                s3_client_kwargs = {
                    "aws_access_key_id": current_cfg.aws_access_key_id,
                    "aws_secret_access_key": current_cfg.aws_secret_access_key,
                    "region_name": current_cfg.aws_region,
                    "config": Config(signature_version="s3v4"),
                }
                if current_cfg.s3_endpoint_url:
                    s3_client_kwargs["endpoint_url"] = current_cfg.s3_endpoint_url

                s3_client = boto3.client("s3", **s3_client_kwargs)

                # Attempt upload without ACL (standard for modern S3 bucket ownership)
                s3_client.put_object(
                    Bucket=current_cfg.aws_s3_bucket,
                    Key=s3_key,
                    Body=file_bytes,
                    ContentType=content_type,
                )

                if current_cfg.aws_cloudfront_domain:
                    cdn_domain = current_cfg.aws_cloudfront_domain.rstrip("/")
                    final_url = f"https://{cdn_domain}/{s3_key}"
                else:
                    final_url = f"https://{current_cfg.aws_s3_bucket}.s3.{current_cfg.aws_region}.amazonaws.com/{s3_key}"

                return {
                    "success": True,
                    "provider": "aws_s3",
                    "url": final_url,
                    "key": s3_key,
                    "bucket": current_cfg.aws_s3_bucket,
                    "region": current_cfg.aws_region,
                }
            except Exception as e:
                print(f"⚠️ [S3 UPLOAD ERROR] {e}. Falling back to local upload storage.")

        # Local fallback storage
        target_dir = LOCAL_UPLOAD_DIR / folder
        target_dir.mkdir(parents=True, exist_ok=True)
        file_path = target_dir / safe_name
        
        with open(file_path, "wb") as f:
            f.write(file_bytes)

        local_url = f"/uploads/{folder}/{safe_name}"
        return {
            "success": True,
            "provider": "local_fallback",
            "url": local_url,
            "key": f"{folder}/{safe_name}",
            "note": "Uploaded locally. Provide valid AWS S3 credentials to route directly to cloud.",
        }

    @classmethod
    async def test_s3_connection(cls) -> Dict[str, Any]:
        """Validates current AWS S3 credentials with a lightweight head_bucket call."""
        current_cfg = load_s3_config()
        if not current_cfg.is_configured:
            return {
                "success": False,
                "configured": False,
                "message": "AWS S3 credentials not configured. Please provide AWS Access Key, Secret Key, and Bucket name.",
            }

        try:
            import boto3
            s3_client = boto3.client(
                "s3",
                aws_access_key_id=current_cfg.aws_access_key_id,
                aws_secret_access_key=current_cfg.aws_secret_access_key,
                region_name=current_cfg.aws_region,
            )
            s3_client.head_bucket(Bucket=current_cfg.aws_s3_bucket)
            return {
                "success": True,
                "configured": True,
                "message": f"Successfully connected to S3 bucket '{current_cfg.aws_s3_bucket}' in region '{current_cfg.aws_region}'.",
            }
        except Exception as e:
            return {
                "success": False,
                "configured": True,
                "message": f"Failed to connect to AWS S3: {str(e)}",
            }
