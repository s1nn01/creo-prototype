// src/app/api/talent/route.ts
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // ensure Node (not Edge), required for nodemailer

export async function POST(req: NextRequest) {
  try {
    // Read multipart form-data
    const form = await req.formData();

    // Pull simple fields
    const firstName = String(form.get("firstName") || "");
    const lastName = String(form.get("lastName") || "");
    const email = String(form.get("email") || "");
    const location = String(form.get("location") || "");
    const role = String(form.get("role") || "");
    const experience = String(form.get("experience") || "");
    const skills = String(form.get("skills") || "");
    const employmentType = String(form.get("employmentType") || "");
    const workMode = String(form.get("workMode") || "");
    const seniority = String(form.get("seniority") || "");

    // CV file
    const cv = form.get("cv") as unknown as File | null;

    if (!email) {
      return new Response(JSON.stringify({ message: "Email is required" }), { status: 400 });
    }
    if (!cv) {
      return new Response(JSON.stringify({ message: "CV file is required" }), { status: 400 });
    }

    // Convert File -> Buffer
    const arrayBuffer = await cv.arrayBuffer();
    const cvBuffer = Buffer.from(arrayBuffer);

    const cvName = cv.name || "cv";
    const cvType = cv.type || "application/octet-stream";

    // Build email body (plain text)
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

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE || "false") === "true", // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    });

    // Send mail
    await transporter.sendMail({
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to: process.env.TO_EMAIL || "chandras@creoinvent-tech.com",
      subject: `New CV submission: ${firstName} ${lastName} (${role || "Talent Network"})`,
      text,
      attachments: [
        {
          filename: (cv as any).name || "cv",
          content: cvBuffer,
          contentType: cv.type || "application/octet-stream",
        },
      ],
      replyTo: email, // makes it easy to reply directly to the candidate
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err: unknown) {
    console.error("Talent POST error:", err);
    return new Response(JSON.stringify({ message: err?.message || "Internal error" }), { status: 500 });
  }
}
