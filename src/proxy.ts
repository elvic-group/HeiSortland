import { updateSession } from "@/lib/supabase/middleware";
import type { NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
  // Skip Supabase auth if env vars are not configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl || supabaseUrl === "your-project-url") {
    return;
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
