"""
Admin Media & S3 Storage Endpoints
Uploads product thumbnails, category images, and agronomy article photos to AWS S3.
"""

from typing import Dict, Any, Optional
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from pydantic import BaseModel
from app.core.dependencies import require_role
from app.models.user import User
from app.core.s3_config import S3Config, load_s3_config, save_s3_config
from app.services.storage_service import StorageService

router = APIRouter()


class S3ConfigUpdate(BaseModel):
    aws_access_key_id: str
    aws_secret_access_key: str
    aws_region: str = "ap-south-1"
    aws_s3_bucket: str = "onaar-media-assets"
    aws_cloudfront_domain: Optional[str] = ""
    s3_endpoint_url: Optional[str] = ""


@router.post("/admin/media/upload", summary="Upload Image to S3 or Local Fallback")
async def upload_media_file(
    file: UploadFile = File(...),
    folder: str = Form("products"),
    admin_user: User = Depends(require_role("admin", "vendor")),
):
    """
    Accepts multipart image/document upload.
    Routes to AWS S3 bucket if credentials are configured; otherwise saves locally.
    """
    if not file.filename:
        raise HTTPException(status_code=400, detail="Missing filename in upload.")

    contents = await file.read()
    if len(contents) > 20 * 1024 * 1024:  # 20MB limit
        raise HTTPException(status_code=400, detail="File size exceeds maximum 20MB limit.")

    result = await StorageService.upload_file(
        file_bytes=contents,
        original_filename=file.filename,
        content_type=file.content_type or "image/jpeg",
        folder=folder,
    )
    return result


@router.get("/admin/media/config", summary="Get S3 Storage Configuration Status")
async def get_storage_configuration(
    admin_user: User = Depends(require_role("admin", "vendor")),
):
    """Returns current AWS S3 connection status with masked secret key."""
    cfg = load_s3_config()
    masked_secret = ""
    if cfg.aws_secret_access_key and not cfg.aws_secret_access_key.startswith("PASTE_"):
        masked_secret = cfg.aws_secret_access_key[:4] + "••••••••" + cfg.aws_secret_access_key[-4:]
    
    return {
        "is_configured": cfg.is_configured,
        "aws_access_key_id": cfg.aws_access_key_id if not cfg.aws_access_key_id.startswith("PASTE_") else "",
        "aws_secret_access_key_masked": masked_secret,
        "aws_region": cfg.aws_region,
        "aws_s3_bucket": cfg.aws_s3_bucket,
        "aws_cloudfront_domain": cfg.aws_cloudfront_domain,
        "s3_endpoint_url": cfg.s3_endpoint_url,
    }


@router.put("/admin/media/config", summary="Update AWS S3 Credentials")
async def update_storage_configuration(
    payload: S3ConfigUpdate,
    admin_user: User = Depends(require_role("admin", "vendor")),
):
    """Saves updated AWS S3 bucket settings and IAM credentials to persistent storage."""
    cfg = S3Config(
        aws_access_key_id=payload.aws_access_key_id.strip(),
        aws_secret_access_key=payload.aws_secret_access_key.strip(),
        aws_region=payload.aws_region.strip(),
        aws_s3_bucket=payload.aws_s3_bucket.strip(),
        aws_cloudfront_domain=(payload.aws_cloudfront_domain or "").strip(),
        s3_endpoint_url=(payload.s3_endpoint_url or "").strip(),
    )
    save_s3_config(cfg)
    return {
        "success": True,
        "message": "AWS S3 storage configuration updated successfully.",
        "is_configured": cfg.is_configured,
    }


@router.post("/admin/media/verify", summary="Test AWS S3 Connection")
async def verify_s3_storage_connection(
    admin_user: User = Depends(require_role("admin", "vendor")),
):
    """Executes a live handshake against AWS S3 bucket using the stored credentials."""
    return await StorageService.test_s3_connection()
