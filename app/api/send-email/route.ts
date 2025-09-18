import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    await resend.emails.send({
      from: `Snatcho <${process.env.RESEND_FROM}>`,
      to: email,
      subject: "Welcome to Snatcho 🎉",
      html: `
        <h2>Hey ${name || "there"} 👋</h2>
        <p>Thanks for joining the Snatcho waitlist! 🚀</p>
        <p>You’ll be the first to know when we launch.</p>
        <p>– Team Snatcho ⚡</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
