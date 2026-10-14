"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import BrandLogo from "./BrandLogo";
import { X, Lock, Phone, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LoginModal() {
  const { isLoginModalOpen, setIsLoginModalOpen, showToast } = useCart();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      showToast("Please enter a valid 10-digit mobile number");
      return;
    }
    setOtpSent(true);
    showToast("OTP sent to +91 " + phoneNumber);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    showToast("Welcome back! You have successfully signed in.");
    setTimeout(() => {
      setIsLoginModalOpen(false);
      setIsLoggedIn(false);
      setOtpSent(false);
      setPhoneNumber("");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in font-sans">
      <div className="bg-white rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl border border-gray-100 relative">
        {/* Close Button */}
        <button
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-full cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-7 text-center">
          <div className="flex justify-center mb-4">
            <BrandLogo variant="dark" size="sm" />
          </div>

          {isLoggedIn ? (
            <div className="py-6 space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#044a27] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-serif font-bold text-lg text-gray-900">
                Login Successful
              </h3>
              <p className="text-xs text-gray-500">
                Welcome to pure food and healthier lifestyle.
              </p>
            </div>
          ) : !otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4 text-left">
              <div className="text-center space-y-1">
                <h3 className="font-serif text-xl font-bold text-gray-900">
                  Welcome to Your Brand
                </h3>
                <p className="text-xs text-gray-500">
                  Enter your mobile number to sign in or register
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Mobile Number
                </label>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-[#f9faf9] focus-within:border-[#044a27] focus-within:bg-white transition-all">
                  <span className="px-3 py-2 text-xs font-semibold text-gray-500 border-r border-gray-200 bg-gray-50">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="98765 43210"
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(e.target.value.replace(/\D/g, ""))
                    }
                    className="w-full text-xs px-3 py-2.5 text-gray-900 focus:outline-none"
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#044a27] hover:bg-[#03391e] text-white py-2.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <span>CONTINUE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                By continuing, you agree to our Terms of Use and Privacy Policy.
              </p>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4 text-left">
              <div className="text-center space-y-1">
                <h3 className="font-serif text-xl font-bold text-gray-900">
                  Verify OTP
                </h3>
                <p className="text-xs text-gray-500">
                  Code sent to <strong>+91 {phoneNumber}</strong>
                </p>
              </div>

              <div className="flex justify-center gap-2 py-2">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[index] = e.target.value;
                      setOtp(newOtp);
                      if (e.target.value && e.target.nextElementSibling) {
                        (
                          e.target.nextElementSibling as HTMLInputElement
                        ).focus();
                      }
                    }}
                    className="w-11 h-12 text-center text-lg font-bold border border-gray-300 rounded-lg focus:border-[#044a27] focus:outline-none bg-[#f8faf9]"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full bg-[#044a27] hover:bg-[#03391e] text-white py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                VERIFY & LOGIN
              </button>

              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="w-full text-center text-xs text-[#044a27] font-semibold hover:underline"
              >
                Change mobile number
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
