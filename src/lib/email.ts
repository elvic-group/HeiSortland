import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

function getResend(): Resend | null {
  if (!resendApiKey) {
    console.warn("[email] RESEND_API_KEY is not set — emails will be logged to console only.");
    return null;
  }
  return new Resend(resendApiKey);
}

const FROM_EMAIL = "HeiSortland <hei@heisortland.no>";

export async function sendApprovalEmail(
  to: string,
  eventTitle: string,
  status: "approved" | "rejected"
): Promise<void> {
  const resend = getResend();

  if (status === "approved") {
    const subject = `✅ "${eventTitle}" er godkjent`;
    const html = `
      <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #F6F3EC;">
        <h2 style="font-family: Georgia, serif; color: #10172F; font-size: 24px; margin: 0 0 12px;">
          Arrangementet ditt er godkjent!
        </h2>
        <p style="color: #1E1E2F; font-size: 16px; line-height: 1.6; margin: 0 0 8px;">
          <strong>"${eventTitle}"</strong> er nå publisert på HeiSortland og synlig for alle.
        </p>
        <p style="color: #6F6F78; font-size: 14px; line-height: 1.6; margin: 0 0 24px;">
          Du kan når som helst redigere eller administrere arrangementet ditt fra arrangør-dashboardet.
        </p>
        <div style="border-top: 1px solid #E5E0D8; padding-top: 20px; margin-top: 20px;">
          <p style="color: #6F6F78; font-size: 12px; margin: 0;">
            Med vennlig hilsen,<br />
            <strong style="color: #10172F;">HeiSortland</strong>
          </p>
        </div>
      </div>
    `;

    if (resend) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to,
          subject,
          html,
        });
        console.log(`[email] Approval sent to ${to} for "${eventTitle}"`);
      } catch (error) {
        console.error("[email] Failed to send approval email:", error);
      }
    } else {
      console.log(`[email] (dry-run) Approval email to ${to}: ${subject}`);
    }
  } else {
    const subject = `❌ "${eventTitle}" ble ikke godkjent`;
    const html = `
      <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #F6F3EC;">
        <h2 style="font-family: Georgia, serif; color: #10172F; font-size: 24px; margin: 0 0 12px;">
          Arrangementet ditt ble ikke godkjent
        </h2>
        <p style="color: #1E1E2F; font-size: 16px; line-height: 1.6; margin: 0 0 8px;">
          <strong>"${eventTitle}"</strong> ble vurdert og dessverre ikke godkjent for publisering på HeiSortland.
        </p>
        <p style="color: #6F6F78; font-size: 14px; line-height: 1.6; margin: 0 0 24px;">
          Dette kan skyldes manglende informasjon, eller at arrangementet ikke passer innenfor våre retningslinjer. Ta gjerne kontakt hvis du har spørsmål.
        </p>
        <div style="border-top: 1px solid #E5E0D8; padding-top: 20px; margin-top: 20px;">
          <p style="color: #6F6F78; font-size: 12px; margin: 0;">
            Med vennlig hilsen,<br />
            <strong style="color: #10172F;">HeiSortland</strong>
          </p>
        </div>
      </div>
    `;

    if (resend) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to,
          subject,
          html,
        });
        console.log(`[email] Rejection sent to ${to} for "${eventTitle}"`);
      } catch (error) {
        console.error("[email] Failed to send rejection email:", error);
      }
    } else {
      console.log(`[email] (dry-run) Rejection email to ${to}: ${subject}`);
    }
  }
}
