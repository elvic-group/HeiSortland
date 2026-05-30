"use client";

import { useAuth } from "@/context/AuthContext";
import { useSavedEvents } from "@/hooks/useSavedEvents";
import Link from "next/link";

interface SaveButtonProps {
  eventId: string;
  size?: "sm" | "md";
}

export default function SaveButton({ eventId, size = "md" }: SaveButtonProps) {
  const { isAuthenticated } = useAuth();
  const { isSaved, toggleSave } = useSavedEvents();
  const saved = isSaved(eventId);

  if (!isAuthenticated) {
    return (
      <Link
        href="/logg-inn"
        className={`group inline-flex items-center gap-1.5 text-muted hover:text-accent transition-colors ${
          size === "sm" ? "text-[10px]" : "text-xs"
        }`}
        title="Logg inn for å lagre"
      >
        <svg
          width={size === "sm" ? 14 : 16}
          height={size === "sm" ? 14 : 16}
          viewBox="0 0 16 16"
          fill="none"
          className="opacity-40 group-hover:opacity-100 transition-opacity"
        >
          <path
            d="M8 14C6.5 14 5 13 4 11.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M2 8.5C2 5.5 4.5 3 8 3C11.5 3 14 5.5 14 8.5C14 9.5 13.5 11 12.5 12"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M12.5 12C10.5 13.5 8 15 8 15C8 15 5.5 12.5 4 11"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSave(eventId);
      }}
      className={`group inline-flex items-center gap-1.5 transition-colors ${
        saved ? "text-accent" : "text-muted hover:text-accent"
      } ${size === "sm" ? "text-[10px]" : "text-xs"}`}
      title={saved ? "Fjern fra lagrede" : "Lagre arrangement"}
    >
      <svg
        width={size === "sm" ? 14 : 16}
        height={size === "sm" ? 14 : 16}
        viewBox="0 0 16 16"
        fill={saved ? "currentColor" : "none"}
        className={`transition-all duration-200 ${
          saved ? "scale-110" : "group-hover:scale-105"
        }`}
      >
        <path
          d="M8 14C6.5 14 5 13 4 11.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M2 8.5C2 5.5 4.5 3 8 3C11.5 3 14 5.5 14 8.5C14 9.5 13.5 11 12.5 12"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M12.5 12C10.5 13.5 8 15 8 15C8 15 5.5 12.5 4 11"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {size === "md" && (
        <span className="font-mono text-[10px] uppercase tracking-wider">
          {saved ? "Lagret" : "Lagre"}
        </span>
      )}
    </button>
  );
}
