"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let toastId = 0;

function ToastIcon({ type }: { type: ToastType }) {
  if (type === "success") {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        className="text-success shrink-0"
      >
        <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M5.5 9L8 11.5L12.5 6.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "error") {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        className="text-error shrink-0"
      >
        <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M9 5.5V9.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="9" cy="12.5" r="0.75" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className="text-warning shrink-0"
    >
      <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.2" />
      <path d="M9 5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9" cy="12" r="0.75" fill="currentColor" />
    </svg>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, type: ToastType = "info") => {
    const id = String(++toastId);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {typeof window !== "undefined" &&
        createPortal(
          <div
            aria-live="polite"
            className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none"
          >
            <AnimatePresence>
              {toasts.map((t) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  className="pointer-events-auto flex items-start gap-3 bg-navy border border-navy/30 text-warm px-5 py-3.5 shadow-lg max-w-sm"
                >
                  <ToastIcon type={t.type} />
                  <p className="text-sm leading-relaxed pr-2">{t.message}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue & { Toaster: typeof ToastProvider } {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  // We return a stub Toaster ref — the real provider is already wrapping the app.
  return { ...ctx, Toaster: ToastProvider };
}
