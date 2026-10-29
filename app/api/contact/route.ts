import { NextResponse } from "next/server"

const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/info@senastreeservices.com"
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

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const upstreamResponse = await fetch(FORMSUBMIT_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        email,
        area,
        service,
        message,
        _subject: `New estimate request from ${name}`,
        _replyto: email,
        _template: "table",
      }),
      signal: controller.signal,
      cache: "no-store",
    })

    const responseText = await upstreamResponse.text()
    let upstreamPayload: { error?: string; errors?: Record<string, string[]>; message?: string } = {}

    try {
      upstreamPayload = JSON.parse(responseText) as typeof upstreamPayload
    } catch {
      // FormSubmit can return plain text for infrastructure errors.
    }

    if (!upstreamResponse.ok) {
      const validationErrors = upstreamPayload.errors
        ? Object.values(upstreamPayload.errors).flat().join(" ")
        : ""

      console.error("FormSubmit rejected contact request", {
        status: upstreamResponse.status,
        response: responseText.slice(0, 500),
      })

      return NextResponse.json(
        {
          error:
            upstreamPayload.error ||
            validationErrors ||
            "Our email service is temporarily unavailable. Please call us at (804) 269-2932.",
        },
        { status: 502 },
      )
    }

    return NextResponse.json({
      message: upstreamPayload.message || "Thank you! We'll be in touch within 2 hours during business hours.",
    })
  } catch (error) {
    console.error("Unable to reach FormSubmit", error)

    return NextResponse.json(
      { error: "Our email service is temporarily unavailable. Please call us at (804) 269-2932." },
      { status: 502 },
    )
  } finally {
    clearTimeout(timeout)
  }
}
