"use client";

import { useLocale } from "next-intl";

const COOKIE_NAME = "NEXT_LOCALE";

function setCookie(locale: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=${locale}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
}

export default function LanguageSwitcher({
  scrolled = false,
}: {
  scrolled?: boolean;
}) {
  const locale = useLocale();
  const isNorwegian = locale === "no";

  const switchTo = (next: string) => {
    setCookie(next);
    window.location.reload();
  };

  const activeClass = scrolled
    ? "text-navy font-semibold"
    : "text-warm font-semibold";
  const inactiveClass = scrolled
    ? "text-muted hover:text-navy"
    : "text-white/50 hover:text-warm";
  const dividerClass = scrolled ? "text-border" : "text-white/20";

  return (
    <span className="text-xs font-mono uppercase tracking-wider transition-colors select-none">
      <button
        onClick={() => switchTo("no")}
        className={isNorwegian ? activeClass : inactiveClass}
        title="Norsk"
      >
        NO
      </button>
      <span className={`mx-1 ${dividerClass}`}>|</span>
      <button
        onClick={() => switchTo("en")}
        className={!isNorwegian ? activeClass : inactiveClass}
        title="English"
      >
        EN
      </button>
    </span>
  );
}
