import { Resend } from "resend";
import { NextResponse } from "next/server";

const resendClient = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { category, description, userEmail, posthogDistinctId } =
      await request.json();

    if (!category || !description || !userEmail) {
      return NextResponse.json(
        { error: "Missing category, description, or email" },
        { status: 400 },
      );
    }

    const toEmail = process.env.DATA_REQUEST_TO_EMAIL!;
    const fromEmail = process.env.DATA_REQUEST_FROM_EMAIL!;

    const emailText = [
      `From: ${userEmail ?? "unknown"}`,
      posthogDistinctId ? `PostHog Distinct ID: ${posthogDistinctId}` : null,
      `Category: ${category}`,
      "",
      description,
    ]
      .filter(Boolean)
      .join("\n");

    const response = await resendClient.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: userEmail,
      subject: `[Tube Map] Data request: ${category}`,
      text: emailText,
    });

    if (response.error) {
      console.error("Resend error:", response.error);
      return NextResponse.json(
        { error: response.error.message ?? "Failed to send email" },
        { status: response.error.statusCode ?? 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
