"use client";

import React, { createContext, useContext, useState, useRef, useCallback } from "react";
import ConfirmationModal, { ModalVariant, ModalType } from "@/components/ConfirmationModal";

export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ModalVariant;
}

export interface AlertOptions {
  title?: string;
  message: string;
  confirmText?: string;
  variant?: ModalVariant;
}

export interface PromptOptions {
  title?: string;
  message: string;
  defaultValue?: string;
  placeholder?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ModalVariant;
}

interface ConfirmContextType {
  confirm: (options: ConfirmOptions | string) => Promise<boolean>;
  alert: (options: AlertOptions | string) => Promise<void>;
  prompt: (options: PromptOptions | string) => Promise<string | null>;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: ModalVariant;
    type?: ModalType;
    promptPlaceholder?: string;
    promptDefaultValue?: string;
  }>({
    isOpen: false,
    message: "",
  });

  const resolverRef = useRef<((value: any) => void) | null>(null);

  const confirm = useCallback((options: ConfirmOptions | string): Promise<boolean> => {
    return new Promise((resolve) => {
      resolverRef.current = resolve;
      if (typeof options === "string") {
        setModalState({
          isOpen: true,
          message: options,
          type: "confirm",
          variant: "danger",
        });
      } else {
        setModalState({
          isOpen: true,
          title: options.title,
          message: options.message,
          confirmText: options.confirmText,
          cancelText: options.cancelText,
          variant: options.variant || "danger",
          type: "confirm",
        });
      }
    });
  }, []);

  const alert = useCallback((options: AlertOptions | string): Promise<void> => {
    return new Promise((resolve) => {
      resolverRef.current = () => resolve();
      if (typeof options === "string") {
        setModalState({
          isOpen: true,
          message: options,
          type: "alert",
          variant: "info",
          confirmText: "OK",
        });
      } else {
        setModalState({
          isOpen: true,
          title: options.title,
          message: options.message,
          confirmText: options.confirmText || "OK",
          variant: options.variant || "info",
          type: "alert",
        });
      }
    });
  }, []);

  const prompt = useCallback((options: PromptOptions | string): Promise<string | null> => {
    return new Promise((resolve) => {
      resolverRef.current = resolve;
      if (typeof options === "string") {
        setModalState({
          isOpen: true,
          message: options,
          type: "prompt",
          variant: "info",
          confirmText: "Submit",
          cancelText: "Cancel",
        });
      } else {
        setModalState({
          isOpen: true,
          title: options.title,
          message: options.message,
          promptDefaultValue: options.defaultValue || "",
          promptPlaceholder: options.placeholder || "Enter value...",
          confirmText: options.confirmText || "Submit",
          cancelText: options.cancelText || "Cancel",
          variant: options.variant || "info",
          type: "prompt",
        });
      }
    });
  }, []);

  const handleConfirm = useCallback((inputValue?: string) => {
    if (resolverRef.current) {
      if (modalState.type === "prompt") {
        resolverRef.current(inputValue !== undefined ? inputValue : "");
      } else if (modalState.type === "alert") {
        resolverRef.current(undefined);
      } else {
        resolverRef.current(true);
      }
      resolverRef.current = null;
    }
    setModalState((prev) => ({ ...prev, isOpen: false }));
  }, [modalState.type]);

  const handleCancel = useCallback(() => {
    if (resolverRef.current) {
      if (modalState.type === "prompt") {
        resolverRef.current(null);
      } else if (modalState.type === "alert") {
        resolverRef.current(undefined);
      } else {
        resolverRef.current(false);
      }
      resolverRef.current = null;
    }
    setModalState((prev) => ({ ...prev, isOpen: false }));
  }, [modalState.type]);

  return (
    <ConfirmContext.Provider value={{ confirm, alert, prompt }}>
      {children}
      <ConfirmationModal
        isOpen={modalState.isOpen}
        title={modalState.title}
        message={modalState.message}
        confirmText={modalState.confirmText}
        cancelText={modalState.cancelText}
        variant={modalState.variant}
        type={modalState.type}
        promptPlaceholder={modalState.promptPlaceholder}
        promptDefaultValue={modalState.promptDefaultValue}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }
  return context;
}
