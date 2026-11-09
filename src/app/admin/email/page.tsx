"use client";

import React, { useState, useEffect } from "react";
import { Mail, RefreshCw, Send, CheckCircle2, ShieldCheck } from "lucide-react";
import { api } from "@/services/apiClient";
import { useCart } from "@/context/CartContext";

export default function AdminEmailPage() {
  const { showToast } = useCart();

  const [smtpConfig, setSmtpConfig] = useState({
    smtp_host: "smtp.gmail.com",
    smtp_port: 587,
    smtp_user: "support@onaar.com",
    smtp_password: "",
    smtp_from_email: "support@onaar.com",
    smtp_from_name: "ONAAR Organic Foods",
    smtp_use_tls: true,
  });

  const [templates, setTemplates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingSmtp, setIsSavingSmtp] = useState(false);
  const [isTestingSmtp, setIsTestingSmtp] = useState(false);

  const loadSmtpConfig = async () => {
    try {
      const data = await api.admin.getSmtpConfig();
      if (data) {
        setSmtpConfig({
          smtp_host: data.host || "smtp.gmail.com",
          smtp_port: data.port || 587,
          smtp_user: data.user || "support@onaar.com",
          smtp_password: "",
          smtp_from_email: data.from_email || "support@onaar.com",
          smtp_from_name: data.from_name || "ONAAR Organic Foods",
          smtp_use_tls: data.use_tls !== false,
        });
      }
    } catch (err: any) {
      console.error("Failed to load SMTP config:", err);
    }
  };

  const loadTemplates = async () => {
    try {
      const data = await api.admin.getEmailTemplates();
      if (data && data.length > 0) {
        setTemplates(data);
      }
    } catch (err: any) {
      console.error("Failed to load email templates:", err);
    }
  };

  const loadAll = async () => {
    setIsLoading(true);
    await Promise.all([loadSmtpConfig(), loadTemplates()]);
    setIsLoading(false);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleSaveSmtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSmtp(true);
    try {
      await api.admin.updateSmtpConfig({
        host: smtpConfig.smtp_host,
        port: smtpConfig.smtp_port,
        user: smtpConfig.smtp_user,
        password: smtpConfig.smtp_password || undefined,
        from_email: smtpConfig.smtp_from_email,
        from_name: smtpConfig.smtp_from_name,
        use_tls: smtpConfig.smtp_use_tls,
      });
      showToast("SMTP configuration saved.");
    } catch (err: any) {
      showToast(err.message || "Failed to save SMTP settings");
    } finally {
      setIsSavingSmtp(false);
    }
  };

  const handleTestSmtp = async () => {
    setIsTestingSmtp(true);
    try {
      const res = await api.admin.verifySmtp();
      showToast(res.message || "SMTP handshake verified!");
    } catch (err: any) {
      showToast(err.message || "SMTP handshake test failed");
    } finally {
      setIsTestingSmtp(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 font-serif flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-700" />
            <span>Automated Email Templates &amp; SMTP Handshake</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure order confirmations, dispatch tracking notifications, and transactional OTP emails.
          </p>
        </div>
        <button
          onClick={loadAll}
          className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer self-start sm:self-auto"
          title="Refresh Settings"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* SMTP Configuration */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Outbound SMTP Server Pipeline</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Configured for aiosmtplib and transactional mail servers (Gmail, AWS SES, SendGrid, Postmark).
          </p>
        </div>

        <form onSubmit={handleSaveSmtp} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">SMTP Host</label>
              <input
                type="text"
                placeholder="smtp.gmail.com"
                value={smtpConfig.smtp_host}
                onChange={(e) => setSmtpConfig({ ...smtpConfig, smtp_host: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-emerald-600"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Port</label>
              <input
                type="number"
                placeholder="587"
                value={smtpConfig.smtp_port}
                onChange={(e) => setSmtpConfig({ ...smtpConfig, smtp_port: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-emerald-600"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Auth Username / Email</label>
              <input
                type="text"
                placeholder="support@onaar.com"
                value={smtpConfig.smtp_user}
                onChange={(e) => setSmtpConfig({ ...smtpConfig, smtp_user: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Password / App Password (Optional to change)
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={smtpConfig.smtp_password}
                onChange={(e) => setSmtpConfig({ ...smtpConfig, smtp_password: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-emerald-600"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Sender Email</label>
              <input
                type="email"
                placeholder="orders@onaar.com"
                value={smtpConfig.smtp_from_email}
                onChange={(e) => setSmtpConfig({ ...smtpConfig, smtp_from_email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-emerald-600"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Sender Display Name</label>
              <input
                type="text"
                placeholder="ONAAR Organic Foods"
                value={smtpConfig.smtp_from_name}
                onChange={(e) => setSmtpConfig({ ...smtpConfig, smtp_from_name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-emerald-600"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isSavingSmtp}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all shadow-xs disabled:opacity-50"
            >
              {isSavingSmtp ? "Saving..." : "Save SMTP Settings"}
            </button>

            <button
              type="button"
              onClick={handleTestSmtp}
              disabled={isTestingSmtp}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isTestingSmtp ? "Testing..." : "Test Live Handshake"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Templates List */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Active Transactional Email Templates ({templates.length})</h3>
          <p className="text-xs text-slate-500">
            Automated event triggers triggered on order placement, fulfillment, and account verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {templates.length === 0 ? (
            <div className="col-span-2 py-8 text-center text-xs text-slate-400">
              Default transactional templates active (Order Placed, Dispatched, Delivered, Welcome).
            </div>
          ) : (
            templates.map((t) => (
              <div key={t.template_key} className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <strong className="text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.name}</span>
                  </strong>
                  <span className="font-mono text-emerald-700 text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {t.template_key}
                  </span>
                </div>
                <div className="text-xs text-slate-600">Subject: {t.subject}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
