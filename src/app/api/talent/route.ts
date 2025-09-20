// src/app/api/talent/route.ts
import type { NextRequest } from "next/server";
import { Resend } from "resend";

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
    const cvBuffer = Buffer.from(await (cvField as File).arrayBuffer());

    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.FROM_EMAIL || "onboarding@resend.dev";
    const to = process.env.TO_EMAIL || "chandras@creoinvent-tech.com";

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

    const { data, error } = await resend.emails.send({
      from: `Creo Website <${from}>`,
      to,
      reply_to: email || undefined,
      subject: `New CV submission: ${firstName} ${lastName} (${role || "Talent Network"})`,
      html,
      attachments: [
        {
          filename: (cvField as File).name || "cv",
          content: cvBuffer.toString("base64"),
        },
      ],
    });

    if (error) throw new Error(error.message);
    return new Response(JSON.stringify({ ok: true, id: data?.id }), { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal error";
    console.error("Talent POST error:", err);
    return new Response(JSON.stringify({ message }), { status: 500 });
  }
}
