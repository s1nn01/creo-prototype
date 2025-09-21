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

    // Basic file guardrails
    const allowed =
      ["application/pdf",
       "application/msword",
       "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (cvField.size > 5 * 1024 * 1024) {
      return new Response(JSON.stringify({ message: "File too large (max 5MB)" }), { status: 400 });
    }
    if (cvField.type && !allowed.includes(cvField.type)) {
      return new Response(JSON.stringify({ message: "Only PDF/DOC/DOCX are allowed" }), { status: 400 });
    }

    const cvBuffer = Buffer.from(await (cvField as File).arrayBuffer());

    // ---- Office 365 transporter (SMTP AUTH on 587 with STARTTLS) ----
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
      port,               // 587
      secure: false,      // NOT SSL on connect
      requireTLS: true,   // upgrade to TLS (STARTTLS)
      auth: { user, pass },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
    });

    const subject = `New CV submission: ${firstName} ${lastName} (${role || "Talent Network"})`;

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

    const html = `
      <h3>New Talent Network Submission</h3>
      <p><b>Name:</b> ${firstName} ${lastName}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Location:</b> ${location}</p>
      <p><b>Role:</b> ${role}</p>
      <p><b>Experience:</b> ${experience}</p>
      <p><b>Employment Type:</b> ${employmentType} &nbsp; <b>Work Mode:</b> ${workMode} &nbsp; <b>Seniority:</b> ${seniority}</p>
      <p><b>Skills:</b> ${skills}</p>
    `;

    const info = await transporter.sendMail({
      from: `"Creo Website" <${fromEmail}>`,
      to: toEmail,
      replyTo: email || undefined, // replies go to candidate
      subject,
      text,
      html,
      attachments: [
        {
          filename: (cvField as File).name || "cv",
          content: cvBuffer,
          contentType: (cvField as File).type || "application/octet-stream",
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
