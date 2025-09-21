// src/app/api/contact/route.ts
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    // Which type of enquiry is this? ('hire' | 'callback')
    const kind = String(form.get("kind") ?? "callback");

    const name = String(form.get("name") ?? "");
    const company = String(form.get("company") ?? "");
    const email = String(form.get("email") ?? "");
    const phone = String(form.get("phone") ?? "");
    const message = String(form.get("message") ?? "");

    if (!email) {
      return new Response(JSON.stringify({ message: "Email is required" }), { status: 400 });
    }

    const host = process.env.SMTP_HOST || "smtp.office365.com";
    const port = Number(process.env.SMTP_PORT || "587");
    const user = process.env.SMTP_USER!;
    const pass = process.env.SMTP_PASS!;
    const fromEmail = (process.env.FROM_EMAIL || user)!;
    const toEmail = process.env.TO_EMAIL || "chandras@creoinvent-tech.com";

    if (!user || !pass) {
      return new Response(
        JSON.stringify({ message: "SMTP credentials missing (SMTP_USER / SMTP_PASS)" }),
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,            // 587
      secure: false,   // STARTTLS
      requireTLS: true,
      auth: { user, pass },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
    });

    const subject =
      kind === "hire"
        ? `Hire Talent inquiry from ${company || name}`
        : `Callback request from ${name}`;

    const text = `
New website inquiry (${kind})

Name: ${name}
Company: ${company}
Email: ${email}
Phone: ${phone}

Message:
${message}
`.trim();

    const html = `
      <h3>New website inquiry (${kind})</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Company:</b> ${company}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Message:</b><br/>${message.replace(/\n/g, "<br/>")}</p>
    `;

    const info = await transporter.sendMail({
      from: `"Creo Website" <${fromEmail}>`,
      to: toEmail,
      replyTo: email || undefined,
      subject,
      text,
      html,
    });

    return new Response(JSON.stringify({ ok: true, id: info.messageId }), { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal error";
    console.error("Contact POST error:", err);
    return new Response(JSON.stringify({ message }), { status: 500 });
  }
}
