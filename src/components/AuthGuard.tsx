"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AuthGuard({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: "user" | "organizer" | "admin";
}) {
  const { user, loading, isAuthenticated, isOrganizer, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.replace("/logg-inn");
      return;
    }

    if (requiredRole === "admin" && !isAdmin) {
      router.replace("/");
      return;
    }

    if (requiredRole === "organizer" && !isOrganizer) {
      router.replace("/");
      return;
    }
  }, [loading, isAuthenticated, isOrganizer, isAdmin, requiredRole, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-navy border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-sm text-muted font-mono">Laster…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  if (requiredRole === "admin" && !isAdmin) return null;
  if (requiredRole === "organizer" && !isOrganizer) return null;

  return <>{children}</>;
}
