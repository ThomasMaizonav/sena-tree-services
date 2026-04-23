"use client"

import { useState } from "react"

const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/info@senastreeservices.com"

const services = [
  "Tree Removal",
  "Tree Trimming & Pruning",
  "Stump Grinding",
  "Emergency Tree Services",
  "Land Clearing",
  "Tree Health & Consulting",
]

interface ContactProps {
  isVisible?: boolean
}

const initialFormData = {
  name: "",
  phone: "",
  email: "",
  area: "",
  service: "",
  message: "",
}

export function Contact({ isVisible }: ContactProps) {
  const [formData, setFormData] = useState(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [submitError, setSubmitError] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(false)
    setSubmitMessage("")

    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          _subject: `New estimate request from ${formData.name}`,
          _replyto: formData.email,
          _template: "table",
        }),
      })

      const payload = (await response.json().catch(() => null)) as
        | {
            error?: string
            errors?: Record<string, string[]>
            message?: string
          }
        | null

      if (!response.ok) {
        const validationErrors = payload?.errors
          ? Object.values(payload.errors)
              .flat()
              .join(" ")
          : ""

        throw new Error(
          payload?.error ||
            validationErrors ||
            "We couldn't send your request. Please call us or try again in a few minutes.",
        )
      }

      setFormData(initialFormData)
      setSubmitMessage(
        payload?.message || "Thank you! We'll be in touch within 2 hours during business hours.",
      )
    } catch (error) {
      setSubmitError(true)
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "We couldn't send your request. Please call us or try again in a few minutes.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#0A0A0A] relative overflow-hidden">
      {/* Subtle leaf pattern background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="leaf-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M10 0 Q15 5 10 10 Q5 5 10 0" fill="#4A7C2F" />
          </pattern>
          <rect width="100" height="100" fill="url(#leaf-pattern)" />
        </svg>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-[#4A7C2F] font-mono uppercase tracking-widest text-sm font-semibold mb-4 block">
            Get In Touch
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-bold mb-4 text-balance">
            Ready for a Yard That Speaks for Itself?
          </h2>
          <p className="text-white/60 text-lg">
            Get your free, no-obligation estimate today. Our team typically
            responds within 2 hours during business hours.
          </p>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          action={FORMSUBMIT_ENDPOINT}
          method="POST"
          className={`bg-[#1A1A1A] rounded-2xl p-6 sm:p-10 shadow-green-lg ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.2s" }}
        >
          <div className="grid sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label htmlFor="name" className="block text-white/80 text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#0A0A0A] border border-[#4A7C2F]/50 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#4A7C2F] focus:ring-2 focus:ring-[#4A7C2F]/20 transition-all"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-white/80 text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#0A0A0A] border border-[#4A7C2F]/50 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#4A7C2F] focus:ring-2 focus:ring-[#4A7C2F]/20 transition-all"
                placeholder="(804) 269-2932"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#0A0A0A] border border-[#4A7C2F]/50 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#4A7C2F] focus:ring-2 focus:ring-[#4A7C2F]/20 transition-all"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="area" className="block text-white/80 text-sm font-medium mb-2">
                Service Area / City
              </label>
              <input
                type="text"
                id="area"
                name="area"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full bg-[#0A0A0A] border border-[#4A7C2F]/50 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#4A7C2F] focus:ring-2 focus:ring-[#4A7C2F]/20 transition-all"
                placeholder="e.g. Richmond, Henrico"
              />
            </div>
          </div>

          <div className="mb-5">
            <label htmlFor="service" className="block text-white/80 text-sm font-medium mb-2">
              Service Needed
            </label>
            <select
              id="service"
              name="service"
              required
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full bg-[#0A0A0A] border border-[#4A7C2F]/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4A7C2F] focus:ring-2 focus:ring-[#4A7C2F]/20 transition-all appearance-none cursor-pointer"
            >
              <option value="">Select a service...</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-white/80 text-sm font-medium mb-2">
              Message / Additional Details
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-[#0A0A0A] border border-[#4A7C2F]/50 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#4A7C2F] focus:ring-2 focus:ring-[#4A7C2F]/20 transition-all resize-none"
              placeholder="Tell us about your project..."
            />
          </div>

          <input type="hidden" name="_subject" value={`New estimate request from ${formData.name || "website visitor"}`} />
          <input type="hidden" name="_replyto" value={formData.email} />
          <input type="hidden" name="_template" value="table" />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#4A7C2F] hover:bg-[#2E5A1C] text-white py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-[1.01] shadow-green flex items-center justify-center gap-2"
          >
            {isSubmitting ? "Sending Request..." : "Request My Free Estimate"}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

          {submitMessage ? (
            <p
              aria-live="polite"
              className={`mt-4 text-sm ${submitError ? "text-[#FCA5A5]" : "text-[#A3E635]"}`}
            >
              {submitMessage}
            </p>
          ) : null}
        </form>

        {/* Contact Info Strip */}
        <div className={`flex flex-wrap justify-center gap-6 sm:gap-10 mt-10 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.4s" }}>
          <a
            href="tel:+18042692932"
            className="flex items-center gap-2 text-white/70 hover:text-[#6BA33A] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>(804) 269-2932</span>
          </a>
          <a
            href="mailto:info@senastreeservices.com"
            className="flex items-center gap-2 text-white/70 hover:text-[#6BA33A] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>info@senastreeservices.com</span>
          </a>
          <div className="flex items-center gap-2 text-white/70">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Serving Richmond, VA & Surrounding Areas</span>
          </div>
        </div>
      </div>
    </section>
  )
}
