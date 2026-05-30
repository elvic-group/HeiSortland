"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import LanguageSwitcher from "@/i18n/LanguageSwitcher";

const navLinks = [
  { label: "Hva skjer", href: "/arrangementer" },
  { label: "Kategorier", href: "/kategorier" },
  { label: "Steder", href: "/steder" },
  { label: "Ny i Sortland", href: "/ny-i-sortland" },
];

export default function Header() {
  const { user, isAuthenticated, isAdmin, isOrganizer, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isLightHeader = !isHomePage || scrolled;
  const headerSurface = isLightHeader
    ? "bg-warm/95 border-b border-border/70 shadow-sm backdrop-blur-md"
    : "bg-transparent";
  const logoColor = isLightHeader ? "text-navy" : "text-warm";
  const navColor = isLightHeader
    ? "text-navy hover:text-accent"
    : "text-[rgba(246,243,236,0.75)] hover:text-warm";
  const menuLineColor = isLightHeader ? "bg-navy" : "bg-warm";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerSurface}`}
    >
      <nav className="flex items-center justify-between px-6 md:px-12 h-18 max-w-7xl mx-auto">
        <Link
          href="/"
          className={`font-serif text-xl md:text-2xl font-semibold tracking-tight transition-colors duration-500 ${logoColor}`}
        >
          Hei<span className="text-accent">.</span> Sortland
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors duration-500 ${navColor}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <LanguageSwitcher />
          </li>
          <li>
            <Link
              href="/legg-til"
              className="text-sm font-semibold px-4 py-2 bg-accent text-white hover:bg-accent/90 transition-colors duration-300"
            >
              Legg inn
            </Link>
          </li>
          <li>
            {isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  aria-expanded={userMenuOpen}
                  className={`flex items-center gap-2 px-3 py-1.5 transition-colors duration-300 ${navColor}`}
                >
                  <span className="w-7 h-7 rounded-full bg-accent text-warm text-xs font-semibold flex items-center justify-center">
                    {initials}
                  </span>
                  <span className="text-sm font-medium">
                    {user.name.split(" ")[0]}
                  </span>
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-white border border-border shadow-lg"
                    >
                      <div className="p-4 border-b border-border">
                        <p className="text-sm font-medium text-ink">
                          {user.name}
                        </p>
                        <p className="text-xs text-muted mt-0.5">
                          {user.email}
                        </p>
                        <span className="inline-block mt-1.5 px-2 py-0.5 bg-navy/5 text-[10px] font-mono uppercase tracking-widest text-muted">
                          {user.role === "admin"
                            ? "Admin"
                            : user.role === "organizer"
                              ? "Arrangør"
                              : "Bruker"}
                        </span>
                      </div>
                      <div className="p-2">
                        <Link
                          href="/min-side"
                          onClick={() => setUserMenuOpen(false)}
                          className="block px-3 py-2 text-sm text-ink hover:bg-warm transition-colors"
                        >
                          Min side
                        </Link>
                        {(isAdmin || isOrganizer) && (
                          <Link
                            href="/arrangor"
                            onClick={() => setUserMenuOpen(false)}
                            className="block px-3 py-2 text-sm text-ink hover:bg-warm transition-colors"
                          >
                            Arrangør-dashboard
                          </Link>
                        )}
                        {isAdmin && (
                          <Link
                            href="/admin"
                            onClick={() => setUserMenuOpen(false)}
                            className="block px-3 py-2 text-sm text-ink hover:bg-warm transition-colors"
                          >
                            Adminpanel
                          </Link>
                        )}
                        <hr className="my-1 border-border" />
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            logout();
                          }}
                          className="block w-full text-left px-3 py-2 text-sm text-error hover:bg-error/5 transition-colors"
                        >
                          Logg ut
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/logg-inn"
                className={`text-sm font-medium transition-colors duration-500 ${navColor}`}
              >
                Logg inn
              </Link>
            )}
          </li>
        </ul>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden relative w-8 h-8 flex items-center justify-center"
          aria-label="Meny"
          aria-expanded={menuOpen}
        >
          <div className="flex flex-col gap-1.5">
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-[1.5px] transition-colors duration-500 ${menuLineColor}`}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className={`block w-6 h-[1.5px] transition-colors duration-500 ${menuLineColor}`}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-[1.5px] transition-colors duration-500 ${menuLineColor}`}
            />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-warm border-t border-border"
          >
            <ul className="flex flex-col px-6 pb-8 pt-4 gap-5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-lg font-medium text-muted hover:text-ink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/legg-til"
                  onClick={() => setMenuOpen(false)}
                  className="inline-block mt-2 px-5 py-3 bg-accent text-white text-sm font-semibold"
                >
                  Legg inn arrangement
                </Link>
              </li>
              {isAuthenticated && user ? (
                <>
                  <li className="pt-2 border-t border-border">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 rounded-full bg-accent text-warm text-sm font-semibold flex items-center justify-center">
                        {initials}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-ink">
                          {user.name}
                        </p>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
                          {user.role === "admin"
                            ? "Admin"
                            : user.role === "organizer"
                              ? "Arrangør"
                              : "Bruker"}
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link
                      href="/min-side"
                      onClick={() => setMenuOpen(false)}
                      className="text-sm font-medium text-muted hover:text-ink"
                    >
                      Min side
                    </Link>
                  </li>
                  {(isAdmin || isOrganizer) && (
                    <li>
                      <Link
                        href="/arrangor"
                        onClick={() => setMenuOpen(false)}
                        className="text-sm font-medium text-muted hover:text-ink"
                      >
                        Arrangør-dashboard
                      </Link>
                    </li>
                  )}
                  {isAdmin && (
                    <li>
                      <Link
                        href="/admin"
                        onClick={() => setMenuOpen(false)}
                        className="text-sm font-medium text-muted hover:text-ink"
                      >
                        Adminpanel
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        logout();
                      }}
                      className="text-sm font-medium text-error hover:text-error/80"
                    >
                      Logg ut
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    href="/logg-inn"
                    onClick={() => setMenuOpen(false)}
                    className="text-sm font-medium text-muted hover:text-ink"
                  >
                    Logg inn
                  </Link>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
