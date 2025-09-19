// src/app/api/talent/route.ts
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // needed for nodemailer

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

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE || "false") === "true",
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    });

    await transporter.sendMail({
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to: process.env.TO_EMAIL || "chandras@creoinvent-tech.com",
      subject: `New CV submission: ${firstName} ${lastName} (${role || "Talent Network"})`,
      text,
      replyTo: email,
      attachments: [
        {
          filename: cvField.name || "cv",
          content: cvBuffer,
          contentType: cvField.type || "application/octet-stream",
        },
      ],
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    console.error("Talent POST error:", err);
    return new Response(JSON.stringify({ message }), { status: 500 });
  }
}
