import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.user_metadata?.role !== "admin") {
    return NextResponse.json({ error: "Ikke autorisert" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { status } = body;

  if (!["approved", "pending", "rejected"].includes(status)) {
    return NextResponse.json({ error: "Ugyldig status" }, { status: 400 });
  }

  const { error } = await supabase
    .from("events")
    .update({ status })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
