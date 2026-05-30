import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendApprovalEmail } from "@/lib/email";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
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

  // Send email notification if status changed to approved or rejected
  if (status === "approved" || status === "rejected") {
    try {
      const { data: event } = await supabase
        .from("events")
        .select("title, organizer_email")
        .eq("id", id)
        .single();

      if (event?.organizer_email) {
        await sendApprovalEmail(event.organizer_email, event.title, status);
      }
    } catch (emailError) {
      // Don't fail the request if email sending fails
      console.error("[admin] Failed to send notification email:", emailError);
    }
  }

  return NextResponse.json({ success: true });
}
