"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";

const COOKIE_NAME = "NEXT_LOCALE";

function setLocaleCookie(locale: string) {
  if (typeof document === "undefined") return;
  const maxAge = 365 * 24 * 60 * 60; // 1 year
  document.cookie = `${COOKIE_NAME}=${locale}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export default function LanguageSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLocale = () => {
    const nextLocale = locale === "no" ? "en" : "no";
    setLocaleCookie(nextLocale);
    startTransition(() => {
      router.replace(pathname);
      router.refresh();
    });
  };

  return (
    <button
      onClick={toggleLocale}
      disabled={isPending}
      className={`text-xs font-mono uppercase tracking-wider text-muted hover:text-ink transition-colors ${className}`}
      title={locale === "no" ? "Switch to English" : "Bytt til norsk"}
    >
      {locale === "no" ? (
        <>
          <span className="font-semibold text-ink">NO</span>
          <span className="mx-1 text-border">|</span>
          <span>EN</span>
        </>
      ) : (
        <>
          <span>NO</span>
          <span className="mx-1 text-border">|</span>
          <span className="font-semibold text-ink">EN</span>
        </>
      )}
    </button>
  );
}
