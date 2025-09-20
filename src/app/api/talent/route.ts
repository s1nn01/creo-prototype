// src/app/api/talent/route.ts
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const firstName = String(form.get("firstName") ?? "");
    const lastName = String(form.get("lastName") ?? "");
    const email = String(form.get("email") ?? "");
    const location = String(form.get("location") ?? "");
    const role = String(form.get("role") ?? "");
    const experience = String(form.get("experience") ?? "");
    const skills = String(form.get("skills") ?? "");
    const employmentType = String(form.get("employmentType") ?? "");
    const workMode = String(form.get("workMode") ?? "");
    const seniority = String(form.get("seniority") ?? "");

    const cvField = form.get("cv");
    if (!(cvField instanceof File)) {
      return new Response(JSON.stringify({ message: "CV file is required" }), { status: 400 });
    }

    const cvBuffer = Buffer.from(await cvField.arrayBuffer());

    const host = process.env.SMTP_HOST!;
    const port = Number(process.env.SMTP_PORT || "587"); // default to 587 (STARTTLS)
    const user = process.env.SMTP_USER!;
    const pass = process.env.SMTP_PASS!;
    const from = (process.env.FROM_EMAIL || user)!;

    // ✅ secure must be TRUE only for 465, FALSE for 587
    const useSecure = port === 465;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: useSecure,          // SSL for 465; STARTTLS for 587
      auth: { user, pass },
      requireTLS: !useSecure,     // enforce STARTTLS when not using SSL
      connectionTimeout: 15000,   // 15s safety timeouts
      greetingTimeout: 15000,
      socketTimeout: 20000,
      tls: {
        rejectUnauthorized: false // helps with some GoDaddy cert quirks
      },
    });

    const text = `
New Talent Network submission

Name: ${firstName} ${lastName}
Email: ${email}
Location: ${location}
Primary Role: ${role}
Experience: ${experience}
Skills: ${skills}
Employment Type: ${employmentType}
Work Mode: ${workMode}
Seniority: ${seniority}
`.trim();

    const info = await transporter.sendMail({
      from: `"Creo Website" <${from}>`,
      to: process.env.TO_EMAIL || "chandras@creoinvent-tech.com",
      replyTo: email || undefined,
      subject: `New CV submission: ${firstName} ${lastName} (${role || "Talent Network"})`,
      text,
      attachments: [
        {
          filename: cvField.name || "cv",
          content: cvBuffer,
          contentType: cvField.type || "application/octet-stream",
        },
      ],
    });

    return new Response(JSON.stringify({ ok: true, id: info.messageId }), { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal error";
    console.error("Talent POST error:", err);
    return new Response(JSON.stringify({ message }), { status: 500 });
  }
}
