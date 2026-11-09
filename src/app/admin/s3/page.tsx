"use client";

import React, { useState, useEffect } from "react";
import { Cloud, Upload, CheckCircle2, AlertCircle, Copy, RefreshCw } from "lucide-react";
import { api } from "@/services/apiClient";
import { useCart } from "@/context/CartContext";

export default function AdminS3Page() {
  const { showToast } = useCart();

  const [s3Config, setS3Config] = useState({
    is_configured: false,
    aws_access_key_id: "",
    aws_secret_access_key: "",
    aws_region: "ap-south-1",
    aws_s3_bucket: "onaar-media-assets",
    aws_cloudfront_domain: "",
    s3_endpoint_url: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSavingS3, setIsSavingS3] = useState(false);
  const [isTestingS3, setIsTestingS3] = useState(false);
  const [s3StatusMessage, setS3StatusMessage] = useState<string | null>(null);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [uploadedMediaList, setUploadedMediaList] = useState<
    Array<{ name: string; url: string; provider: string; uploaded_at: string }>
  >([]);

  const loadS3Config = async () => {
    setIsLoading(true);
    try {
      const data = await api.admin.getS3Config();
      if (data) {
        setS3Config({
          is_configured: data.is_configured,
          aws_access_key_id: data.aws_access_key_id || "",
          aws_secret_access_key: "",
          aws_region: data.aws_region || "ap-south-1",
          aws_s3_bucket: data.aws_s3_bucket || "onaar-media-assets",
          aws_cloudfront_domain: data.aws_cloudfront_domain || "",
          s3_endpoint_url: data.s3_endpoint_url || "",
        });
      }
    } catch (err: any) {
      showToast(err.message || "Failed to load S3 configuration");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadS3Config();
  }, []);

  const handleSaveS3Config = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingS3(true);
    try {
      await api.admin.updateS3Config(s3Config);
      showToast("S3 credentials saved to backend/s3_credentials.json!");
      loadS3Config();
    } catch (err: any) {
      showToast(err.message || "Failed to save S3 settings");
    } finally {
      setIsSavingS3(false);
    }
  };

  const handleTestS3 = async () => {
    setIsTestingS3(true);
    setS3StatusMessage(null);
    try {
      const res = await api.admin.verifyS3Config();
      setS3StatusMessage(res.message);
      if (res.success) {
        showToast("AWS S3 bucket connected successfully!");
      } else {
        showToast(res.message);
      }
    } catch (err: any) {
      setS3StatusMessage(err.message || "S3 Handshake failed.");
    } finally {
      setIsTestingS3(false);
    }
  };

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingMedia(true);
    try {
      const res = await api.admin.uploadMedia(file, "general");
      showToast(`Image uploaded via ${res.provider}!`);

      setUploadedMediaList((prev) => [
        {
          name: file.name,
          url: res.url,
          provider: res.provider,
          uploaded_at: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);
    } catch (err: any) {
      showToast(err.message || "Failed to upload image");
    } finally {
      setIsUploadingMedia(false);
      if (e.target) e.target.value = "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 font-serif flex items-center gap-2">
            <Cloud className="w-4 h-4 text-emerald-700" />
            <span>Amazon S3 Cloud Assets & Storage</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Decoupled object storage configuration for high-resolution product photos, farm videos & blogs.
          </p>
        </div>
        <button
          onClick={loadS3Config}
          className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer self-start sm:self-auto"
          title="Refresh S3 Status"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Credentials & Status Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <Cloud className="w-5 h-5" />
            <span>Amazon S3 Cloud Status</span>
          </div>

          <div
            className={`p-4 rounded-xl border flex items-center gap-3 ${
              s3Config.is_configured
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-amber-50 border-amber-200 text-amber-800"
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full shrink-0 ${
                s3Config.is_configured ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
              }`}
            />
            <div className="text-xs">
              <div className="font-bold flex items-center gap-1.5">
                {s3Config.is_configured ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>AWS S3 Active &amp; Configured</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Credentials Pending</span>
                  </>
                )}
              </div>
              <div className="text-[11px] opacity-80 mt-0.5">
                {s3Config.is_configured
                  ? `Routing uploads to '${s3Config.aws_s3_bucket}'`
                  : "Uploads are saved to local fallback until credentials provided."}
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-600 font-mono">
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span>Bucket Name:</span>
              <strong className="text-slate-900">{s3Config.aws_s3_bucket}</strong>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span>AWS Region:</span>
              <strong className="text-slate-900">{s3Config.aws_region}</strong>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span>Storage Config File:</span>
              <strong className="text-slate-900 truncate">backend/s3_credentials.json</strong>
            </div>
          </div>

          <button
            onClick={handleTestS3}
            disabled={isTestingS3}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
          >
            {isTestingS3 ? "Testing S3 Handshake..." : "Test AWS S3 Connection"}
          </button>

          {s3StatusMessage && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
              {s3StatusMessage}
            </div>
          )}
        </div>

        {/* S3 Configuration Form */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">AWS S3 IAM Credentials</h2>
            <p className="text-xs text-slate-500">
              Saved securely to <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-emerald-800">backend/s3_credentials.json</code>. You can paste your credentials here whenever ready.
            </p>
          </div>

          <form onSubmit={handleSaveS3Config} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  AWS Access Key ID
                </label>
                <input
                  type="text"
                  placeholder="AKIAIOSFODNN7EXAMPLE"
                  value={s3Config.aws_access_key_id}
                  onChange={(e) => setS3Config({ ...s3Config, aws_access_key_id: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-emerald-600"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  AWS Secret Access Key
                </label>
                <input
                  type="password"
                  placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
                  value={s3Config.aws_secret_access_key}
                  onChange={(e) => setS3Config({ ...s3Config, aws_secret_access_key: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">AWS Region</label>
                <input
                  type="text"
                  placeholder="ap-south-1"
                  value={s3Config.aws_region}
                  onChange={(e) => setS3Config({ ...s3Config, aws_region: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-emerald-600"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">S3 Bucket Name</label>
                <input
                  type="text"
                  placeholder="onaar-media-assets"
                  value={s3Config.aws_s3_bucket}
                  onChange={(e) => setS3Config({ ...s3Config, aws_s3_bucket: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                CloudFront CDN Domain (Optional)
              </label>
              <input
                type="text"
                placeholder="assets.onaar.in or d1234.cloudfront.net"
                value={s3Config.aws_cloudfront_domain || ""}
                onChange={(e) => setS3Config({ ...s3Config, aws_cloudfront_domain: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-emerald-600"
              />
            </div>

            <button
              type="submit"
              disabled={isSavingS3}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
            >
              {isSavingS3 ? "Saving..." : "Save S3 Configuration"}
            </button>
          </form>
        </div>
      </div>

      {/* Media Asset Uploader Dropzone */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Direct Media Uploader</h3>
            <p className="text-xs text-slate-500">
              Upload photos directly to S3 (or local fallback). Instant CDN URLs will be generated for your crops and articles.
            </p>
          </div>
          <label className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-2 self-start sm:self-auto transition-colors">
            <Upload className="w-4 h-4" />
            <span>Upload Image</span>
            <input
              type="file"
              accept="image/*"
              disabled={isUploadingMedia}
              onChange={handleUploadFile}
              className="hidden"
            />
          </label>
        </div>

        {isUploadingMedia && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs text-emerald-800 font-bold animate-pulse">
            Uploading image to storage provider...
          </div>
        )}

        {/* Recently uploaded list */}
        {uploadedMediaList.length > 0 && (
          <div className="space-y-2 mt-4">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider text-[10px]">
              Session Uploads
            </div>
            <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
              {uploadedMediaList.map((m, idx) => (
                <div key={idx} className="p-3 bg-slate-50/50 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <img src={m.url} alt={m.name} className="w-9 h-9 object-cover rounded-lg border border-slate-200 shrink-0" />
                    <div className="truncate">
                      <div className="font-bold text-slate-900 truncate">{m.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono truncate">{m.url}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(m.url);
                      showToast("URL copied to clipboard!");
                    }}
                    className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer shrink-0 flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy URL</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
