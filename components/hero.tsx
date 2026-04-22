"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"

const heroImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/437b6b89-46a5-4519-92bb-668e6b3c02a9-hKZ5KWuy70W111IWvKBbPm5uoqA2Bg.jpg",
    alt: "Professional arborist climbing tree for safe tree removal in Richmond VA",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8BD7E158-248F-4ECC-9063-B306B8951014-xJtG2VBIntfyEEbLA8fzw4oZAa90wL.jpg",
    alt: "Wood chipper and equipment for land clearing services in Henrico",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FE05905C-5261-4623-AA37-BC00DAC78ECB-zmUebpfgR73ng3Ils1SXvu9ATwn7Z3.jpg",
    alt: "Beautiful landscaping with trimmed hedges in Midlothian VA",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f990d840-62b5-4916-8e6f-39d86c6cf1ac-whXHtsYK3j48hdJKUkbvOeFudaZrxv.jpg",
    alt: "Completed deck restoration project in Short Pump Virginia",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b0fa7c87-62e3-428e-835a-8cd62b28baf3-c8Dg0OHX4Jj12naVeDBWalsevDrAJ3.jpg",
    alt: "Deck repair and restoration work in progress",
  },
]

const trustBadges = [
  { icon: "shield", text: "Licensed & Insured" },
  { icon: "calendar", text: "10+ Years Experience" },
  { icon: "check", text: "Free Estimates" },
]

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextSlide = useCallback(() => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
      setIsTransitioning(false)
    }, 500)
  }, [])

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className={`object-cover transition-transform duration-[8000ms] ${
                index === currentIndex && !isTransitioning ? "scale-110" : "scale-100"
              }`}
              priority={index === 0}
            />
          </div>
        ))}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/95 via-[#0A0A0A]/80 to-[#2E5A1C]/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white font-bold leading-tight mb-6 animate-fade-in-up">
            Richmond&apos;s Most Trusted{" "}
            <span className="text-[#6BA33A]">Tree Experts</span> — Over a
            Decade of Excellence
          </h1>
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            From towering removals to delicate trims, Sena&apos;s Tree Services
            brings precision, safety, and beauty to every yard we touch —
            serving Richmond, Henrico, Midlothian, Short Pump, and beyond.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <a
              href="#contact"
              className="bg-[#4A7C2F] hover:bg-[#2E5A1C] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-[1.02] shadow-green-lg text-center"
              aria-label="Get Your Free Estimate"
            >
              Get Your Free Estimate
            </a>
            <a
              href="#services"
              className="border-2 border-white text-white hover:bg-white hover:text-[#0A0A0A] px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 text-center"
              aria-label="View Our Services"
            >
              View Our Services
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-6 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            {trustBadges.map((badge, index) => (
              <div key={badge.text} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#4A7C2F]/20 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-[#6BA33A]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-white font-medium">{badge.text}</span>
                {index < trustBadges.length - 1 && (
                  <span className="hidden sm:block w-1 h-1 rounded-full bg-[#6BA33A] ml-3" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-[#4A7C2F]"
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
