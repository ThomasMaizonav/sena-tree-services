import { NextResponse } from "next/server"

const RESEND_ENDPOINT = "https://api.resend.com/emails"
const REQUEST_TIMEOUT_MS = 15_000

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
    '\"': "&quot;",
  }

  return value.replace(
    /[&<>'\"]/g,
    (character) => entities[character] ?? character,
  )
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

  const resendApiKey = process.env.RESEND_API_KEY

  if (!resendApiKey) {
    console.error("RESEND_API_KEY is not configured")

    return NextResponse.json(
      { error: "Our email service is temporarily unavailable. Please call us at (804) 269-2932." },
      { status: 503 },
    )
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const upstreamResponse = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Sena Tree Services <info@senastreeservices.com>",
        to: ["info@senastreeservices.com"],
        reply_to: email,
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
      }),
      signal: controller.signal,
      cache: "no-store",
    })

    const responseText = await upstreamResponse.text()
    let upstreamPayload: { error?: string; errors?: Record<string, string[]>; message?: string } = {}

    try {
      upstreamPayload = JSON.parse(responseText) as typeof upstreamPayload
    } catch {
      // Resend can return plain text for infrastructure errors.
    }

    if (!upstreamResponse.ok) {
      const validationErrors = upstreamPayload.errors
        ? Object.values(upstreamPayload.errors).flat().join(" ")
        : ""

      console.error("Resend rejected contact request", {
        status: upstreamResponse.status,
        response: responseText.slice(0, 500),
      })

      return NextResponse.json(
        {
          error:
            upstreamPayload.message ||
            upstreamPayload.error ||
            validationErrors ||
            "Our email service is temporarily unavailable. Please call us at (804) 269-2932.",
        },
        { status: 502 },
      )
    }

    return NextResponse.json({
      message: "Thank you! We'll be in touch within 2 hours during business hours.",
    })
  } catch (error) {
    console.error("Unable to reach Resend", error)

    return NextResponse.json(
      { error: "Our email service is temporarily unavailable. Please call us at (804) 269-2932." },
      { status: 502 },
    )
  } finally {
    clearTimeout(timeout)
  }
}
