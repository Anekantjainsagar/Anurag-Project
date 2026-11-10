"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  X,
  HelpCircle,
} from "lucide-react";

export type ModalVariant = "danger" | "warning" | "info" | "success";
export type ModalType = "confirm" | "alert" | "prompt";

export interface ConfirmationModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ModalVariant;
  type?: ModalType;
  promptPlaceholder?: string;
  promptDefaultValue?: string;
  onConfirm: (inputValue?: string) => void;
  onCancel: () => void;
}

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmText,
  cancelText = "Cancel",
  variant = "danger",
  type = "confirm",
  promptPlaceholder = "Enter value...",
  promptDefaultValue = "",
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  const [promptValue, setPromptValue] = useState(promptDefaultValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPromptValue(promptDefaultValue);
      // Small timeout to allow render before focusing
      const timer = setTimeout(() => {
        if (type === "prompt") {
          inputRef.current?.focus();
          inputRef.current?.select();
        } else {
          confirmButtonRef.current?.focus();
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, promptDefaultValue, type]);

  // Handle ESC and Enter shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCancel();
      } else if (e.key === "Enter" && type !== "prompt") {
        e.preventDefault();
        onConfirm();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel, onConfirm, type]);

  // Lock body scroll when confirmation modal is open
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const defaultTitle =
    title ||
    (type === "prompt"
      ? "Input Required"
      : type === "alert"
      ? "Notice"
      : variant === "danger"
      ? "Confirm Action"
      : "Please Confirm");

  const defaultConfirmText =
    confirmText ||
    (type === "alert"
      ? "OK"
      : variant === "danger"
      ? "Delete"
      : "Confirm");

  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          icon: <AlertTriangle className="w-5 h-5 text-rose-600" />,
          iconBg: "bg-rose-50 border-rose-100",
          confirmBtn:
            "bg-rose-600 hover:bg-rose-700 text-white shadow-xs focus:ring-rose-500",
        };
      case "warning":
        return {
          icon: <AlertCircle className="w-5 h-5 text-amber-600" />,
          iconBg: "bg-amber-50 border-amber-100",
          confirmBtn:
            "bg-amber-600 hover:bg-amber-700 text-white shadow-xs focus:ring-amber-500",
        };
      case "success":
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
          iconBg: "bg-emerald-50 border-emerald-100",
          confirmBtn:
            "bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs focus:ring-emerald-600",
        };
      case "info":
      default:
        return {
          icon: type === "prompt" ? <HelpCircle className="w-5 h-5 text-emerald-700" /> : <Info className="w-5 h-5 text-emerald-700" />,
          iconBg: "bg-emerald-50 border-emerald-100",
          confirmBtn:
            "bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs focus:ring-emerald-600",
        };
    }
  };

  const { icon, iconBg, confirmBtn } = getVariantStyles();

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(promptValue);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans transition-all"
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Top close cross */}
        <button
          onClick={onCancel}
          className="absolute right-3.5 top-3.5 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6">
          <div className="flex items-start gap-3.5">
            {/* Variant Icon */}
            <div
              className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${iconBg}`}
            >
              {icon}
            </div>

            {/* Title and Message */}
            <div className="flex-1 pr-4">
              <h3
                id="confirm-modal-title"
                className="text-base font-bold text-slate-900 font-serif leading-snug"
              >
                {defaultTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                {message}
              </p>
            </div>
          </div>

          {/* Prompt Input (if type === 'prompt') */}
          {type === "prompt" && (
            <form onSubmit={handlePromptSubmit} className="mt-4">
              <input
                ref={inputRef}
                type="text"
                value={promptValue}
                onChange={(e) => setPromptValue(e.target.value)}
                placeholder={promptPlaceholder}
                className="w-full bg-slate-50 text-slate-800 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all font-mono"
              />
            </form>
          )}

          {/* Actions */}
          <div className="mt-6 flex flex-col-reverse sm:flex-row items-stretch sm:items-center sm:justify-end gap-2.5">
            {type !== "alert" && (
              <button
                type="button"
                onClick={onCancel}
                className="w-full sm:w-auto text-center px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer border border-slate-200 whitespace-nowrap"
              >
                {cancelText}
              </button>
            )}

            <button
              ref={confirmButtonRef}
              type="button"
              onClick={() => onConfirm(type === "prompt" ? promptValue : undefined)}
              className={`w-full sm:w-auto text-center px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap ${confirmBtn}`}
            >
              {defaultConfirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
