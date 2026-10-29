import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const RECIPIENT_EMAIL = "info@senastreeservices.com"

type ContactForm = {
  name?: unknown
  phone?: unknown
  email?: unknown
  area?: unknown
  service?: unknown
  message?: unknown
}

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

function escapeHtml(value: string) {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  }

  return value.replace(/[&<>"']/g, (character) => entities[character] ?? character)
}

export async function POST(request: Request) {
  let form: ContactForm

  try {
    form = (await request.json()) as ContactForm
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 })
  }

  const name = text(form.name)
  const phone = text(form.phone)
  const email = text(form.email)
  const area = text(form.area)
  const service = text(form.service)
  const message = text(form.message)

  if (!name || !phone || !email || !service) {
    return NextResponse.json(
      { error: "Please complete your name, phone, email, and service." },
      { status: 400 },
    )
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
  }

  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS

  if (!smtpUser || !smtpPass) {
    console.error("SMTP_USER or SMTP_PASS is not configured")

    return NextResponse.json(
      { error: "Our email service is temporarily unavailable. Please call us at (804) 269-2932." },
      { status: 503 },
    )
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      connectionTimeout: 15_000,
      greetingTimeout: 15_000,
      socketTimeout: 15_000,
    })

    await transporter.sendMail({
      from: smtpUser,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New estimate request from ${name}`,
      text: [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Service area / city: ${area || "Not provided"}`,
        `Service needed: ${service}`,
        `Message: ${message || "Not provided"}`,
      ].join("\n"),
      html: `
        <h2>New estimate request</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Service area / city:</strong> ${escapeHtml(area || "Not provided")}</p>
        <p><strong>Service needed:</strong> ${escapeHtml(service)}</p>
        <p><strong>Message:</strong><br>${escapeHtml(message || "Not provided").replace(/\n/g, "<br>")}</p>
      `,
    })

    return NextResponse.json({
      message: "Thank you! We'll be in touch soon.",
    })
  } catch (error) {
    console.error("Unable to send contact request through Gmail SMTP", error)

    return NextResponse.json(
      { error: "Our email service is temporarily unavailable. Please call us at (804) 269-2932." },
      { status: 502 },
    )
  }
}
