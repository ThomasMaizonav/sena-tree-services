import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const RECIPIENT_EMAIL = "info@senastreeservices.com"

type ContactForm = {
  name?: unknown
  phone?: unknown
  email?: unknown
  address?: unknown
  area?: unknown
  service?: unknown
  message?: unknown
}

type Lead = {
  name: string
  phone: string
  email: string
  address: string
  area: string
  service: string
  message: string
}

const GOOGLE_SHEETS_SPREADSHEET_ID = "1-L711WsboOnRp450iatAIjDIQfaTxn8XeF4D4FwJBkQ"
const GOOGLE_SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets"

function base64Url(value: string | Buffer) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
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

async function sendLeadToCrm(lead: Lead) {
  const webhookUrl = process.env.CRM_WEBHOOK_URL

  if (!webhookUrl) {
    throw new Error("CRM_WEBHOOK_URL is not configured")
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15_000)

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        address: lead.address,
        area: lead.area,
        service: lead.service,
        message: lead.message,
        source: "Sena Tree Services website",
        source_url: "https://www.senastreeservices.com",
      }),
      cache: "no-store",
      signal: controller.signal,
    })

    const responseBody = await response.text()

    if (!response.ok) {
      throw new Error(`CRM webhook returned ${response.status}: ${responseBody.slice(0, 300)}`)
    }
  } finally {
    clearTimeout(timeout)
  }
}

async function getGoogleSheetsAccessToken(serviceAccountEmail: string, privateKey: string) {
  const { createSign } = await import("node:crypto")
  const now = Math.floor(Date.now() / 1000)
  const unsignedToken = [
    base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" })),
    base64Url(
      JSON.stringify({
        iss: serviceAccountEmail,
        scope: GOOGLE_SHEETS_SCOPE,
        aud: "https://oauth2.googleapis.com/token",
        iat: now,
        exp: now + 60 * 60,
      }),
    ),
  ].join(".")

  const signer = createSign("RSA-SHA256")
  signer.update(unsignedToken)
  signer.end()

  const assertion = `${unsignedToken}.${base64Url(signer.sign(privateKey))}`
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
    cache: "no-store",
  })

  const body = (await response.json().catch(() => null)) as { access_token?: string } | null

  if (!response.ok || !body?.access_token) {
    throw new Error(`Google OAuth returned ${response.status}`)
  }

  return body.access_token
}

async function appendLeadToGoogleSheets(lead: Lead) {
  const serviceAccountEmail = process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n")

  // The feature becomes active as soon as both production variables are configured.
  if (!serviceAccountEmail || !privateKey) {
    return
  }

  const accessToken = await getGoogleSheetsAccessToken(serviceAccountEmail, privateKey)
  const conversionDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    timeStyle: "medium",
    timeZone: "America/New_York",
  }).format(new Date())
  const serviceAreaAndAddress = [lead.area, lead.address].filter(Boolean).join(" / ")
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15_000)

  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_SPREADSHEET_ID}/values/A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [[conversionDate, lead.name, lead.phone, lead.message, lead.email, serviceAreaAndAddress]],
        }),
        cache: "no-store",
        signal: controller.signal,
      },
    )

    if (!response.ok) {
      throw new Error(`Google Sheets returned ${response.status}: ${(await response.text()).slice(0, 300)}`)
    }
  } finally {
    clearTimeout(timeout)
  }
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
  const address = text(form.address)
  const area = text(form.area)
  const service = text(form.service)
  const message = text(form.message)

  const lead: Lead = {
    name,
    phone,
    email,
    address,
    area,
    service,
    message,
  }

  if (!name || !phone || !email || !address || !service) {
    return NextResponse.json(
      { error: "Please complete your name, phone, email, address, and service." },
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

    const emailPromise = transporter.sendMail({
      from: smtpUser,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New estimate request from ${name}`,
      text: [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Street address: ${address}`,
        `Service area / city: ${area || "Not provided"}`,
        `Service needed: ${service}`,
        `Message: ${message || "Not provided"}`,
      ].join("\n"),
      html: `
        <h2>New estimate request</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Street address:</strong> ${escapeHtml(address)}</p>
        <p><strong>Service area / city:</strong> ${escapeHtml(area || "Not provided")}</p>
        <p><strong>Service needed:</strong> ${escapeHtml(service)}</p>
        <p><strong>Message:</strong><br>${escapeHtml(message || "Not provided").replace(/\n/g, "<br>")}</p>
      `,
    })

    const crmPromise = sendLeadToCrm(lead)
    const googleSheetsPromise = appendLeadToGoogleSheets(lead)
    const [emailResult, crmResult, googleSheetsResult] = await Promise.allSettled([
      emailPromise,
      crmPromise,
      googleSheetsPromise,
    ])

    if (emailResult.status === "rejected") {
      throw emailResult.reason
    }

    if (crmResult.status === "rejected") {
      console.error("Unable to send contact request to the CRM webhook", crmResult.reason)

      return NextResponse.json(
        { error: "Our lead service is temporarily unavailable. Please call us at (804) 269-2932." },
        { status: 502 },
      )
    }

    if (googleSheetsResult.status === "rejected") {
      console.error("Unable to append contact request to Google Sheets", googleSheetsResult.reason)

      return NextResponse.json(
        { error: "Our lead service is temporarily unavailable. Please call us at (804) 269-2932." },
        { status: 502 },
      )
    }

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
