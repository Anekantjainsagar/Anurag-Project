"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import BrandLogo from "./BrandLogo";
import { X, ArrowRight, CheckCircle2, ShieldCheck, KeyRound, Phone, Mail } from "lucide-react";

export default function LoginModal() {
  const { isLoginModalOpen, setIsLoginModalOpen, showToast } = useCart();
  const { sendOtp, verifyOtp } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [fullName, setFullName] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [devCode, setDevCode] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoginModalOpen) return null;

  const isEmail = identifier.includes("@");

  const getCleanIdentifier = () => {
    const raw = identifier.trim();
    if (raw.includes("@")) {
      return raw.toLowerCase();
    }
    const digitsOnly = raw.replace(/\D/g, "");
    if (digitsOnly.length === 10) {
      return `+91${digitsOnly}`;
    }
    if (raw.startsWith("+")) {
      return raw;
    }
    return `+91${digitsOnly.slice(-10)}`;
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const raw = identifier.trim();

    if (!raw) {
      showToast("Please enter your mobile number or email");
      return;
    }

    if (raw.includes("@")) {
      if (!raw.includes(".") || raw.length < 5) {
        showToast("Please enter a valid email address");
        return;
      }
    } else {
      const digitsOnly = raw.replace(/\D/g, "");
      if (digitsOnly.length < 10) {
        showToast("Please enter a valid 10-digit mobile number");
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const cleanId = getCleanIdentifier();
      const channel = cleanId.includes("@") ? "email" : "sms";
      const res = await sendOtp(cleanId, channel);
      setOtpSent(true);
      if (res.dev_code) {
        setDevCode(res.dev_code);
      }
      showToast(res.message || `Verification code sent to ${cleanId}`);
    } catch (err: any) {
      showToast(err?.message || "Failed to send verification code. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 4) {
      showToast("Please enter the complete 4-digit code");
      return;
    }

    setIsSubmitting(true);
    try {
      const cleanId = getCleanIdentifier();
      await verifyOtp(cleanId, enteredOtp, fullName || undefined);
      setIsLoggedIn(true);
      showToast("Welcome back! Authentication successful.");
      setTimeout(() => {
        setIsLoginModalOpen(false);
        setIsLoggedIn(false);
        setOtpSent(false);
        setIdentifier("");
        setFullName("");
        setDevCode(null);
        setOtp(["", "", "", ""]);
      }, 1000);
    } catch (err: any) {
      showToast(err.message || "Invalid OTP code. Please retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.slice(-1).replace(/\D/g, "");
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-advance focus
    if (digit && index < 3) {
      const nextInput = document.getElementById(`modal-otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`modal-otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleAutofillDevCode = () => {
    if (devCode && devCode.length === 4) {
      setOtp(devCode.split(""));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in font-sans">
      <div className="bg-white rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl border border-gray-100 relative">
        {/* Close Button */}
        <button
          onClick={() => {
            setIsLoginModalOpen(false);
            setOtpSent(false);
            setDevCode(null);
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-full cursor-pointer z-10"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-7 text-center">
          <div className="flex justify-center mb-4">
            <BrandLogo variant="dark" size="sm" />
          </div>

          {isLoggedIn ? (
            <div className="py-6 space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#01722C] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-serif font-bold text-lg text-gray-900">
                Login Successful
              </h3>
              <p className="text-xs text-gray-500">
                Welcome to Onaar and pure organic living!
              </p>
            </div>
          ) : !otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4 text-left">
              <div className="text-center space-y-1">
                <h3 className="font-serif text-xl font-bold text-gray-900">
                  Sign In to Onaar
                </h3>
                <p className="text-xs text-gray-500">
                  Enter your mobile number or email to access your account
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name (Optional for new users)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Anurag Jain"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 border border-gray-200 rounded-lg bg-[#f9faf9] text-gray-900 focus:outline-none focus:border-[#01722C] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Mobile Number or Email
                </label>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-[#f9faf9] focus-within:border-[#01722C] focus-within:bg-white transition-all">
                  <span className="px-3 py-2 text-xs font-semibold text-gray-500 border-r border-gray-200 bg-gray-50 flex items-center gap-1 shrink-0">
                    {isEmail ? (
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                    ) : (
                      <>
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        <span>+91</span>
                      </>
                    )}
                  </span>
                  <input
                    type="text"
                    placeholder={isEmail ? "meriwebdunia@gmail.com" : "98765 43210"}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 text-gray-900 focus:outline-none font-mono"
                    autoFocus
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  Admins: Use <strong>+91 98765 43210</strong> or <strong>meriwebdunia@gmail.com</strong>
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#01722C] hover:bg-[#0b542c] text-white py-2.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? "SENDING..." : "CONTINUE WITH OTP"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#01722C]" />
                <span>Zero spam • 100% Cryptographically Verified</span>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4 text-left">
              <div className="text-center space-y-1">
                <h3 className="font-serif text-xl font-bold text-gray-900">
                  Enter Verification Code
                </h3>
                <p className="text-xs text-gray-500">
                  4-digit code sent to <strong>{getCleanIdentifier()}</strong>
                </p>
              </div>

              {devCode && (
                <div
                  onClick={handleAutofillDevCode}
                  className="bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl p-2.5 text-center text-xs text-amber-800 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  title="Click to auto-fill dev code"
                >
                  <KeyRound className="w-4 h-4 text-amber-600" />
                  <span>Dev Test OTP: <strong>{devCode}</strong> <span className="underline text-[10px] ml-1">(Click to auto-fill)</span></span>
                </div>
              )}

              <div className="flex justify-center gap-2 py-2">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    id={`modal-otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg font-bold border border-gray-300 rounded-xl bg-[#f9faf9] text-gray-900 focus:outline-none focus:border-[#01722C] focus:bg-white font-mono"
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#01722C] hover:bg-[#0b542c] text-white py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? "VERIFYING..." : "VERIFY & SIGN IN"}
              </button>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false);
                    setOtp(["", "", "", ""]);
                  }}
                  className="text-gray-500 hover:text-gray-800 text-[11px] cursor-pointer"
                >
                  ← Change number/email
                </button>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={isSubmitting}
                  className="text-[#01722C] font-semibold hover:underline text-[11px] cursor-pointer disabled:opacity-50"
                >
                  Resend Code
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
