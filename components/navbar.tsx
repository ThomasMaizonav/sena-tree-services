"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#areas", label: "Areas" },
  { href: "#contact", label: "Contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0A0A0A]/95 backdrop-blur-sm shadow-green"
          : "bg-[#0A0A0A]"
      } border-b border-[#4A7C2F]/30`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3" aria-label="Sena's Tree Services Home">
            <Image
              src="/images/logo.jpg"
              alt="Sena's Tree Services Logo"
              width={48}
              height={48}
              className="rounded-lg"
            />
            <span className="font-serif text-xl md:text-2xl text-white font-semibold">
              Sena&apos;s <span className="text-[#4A7C2F]">Tree Services</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-[#6BA33A] transition-colors duration-200 text-sm font-medium tracking-wide"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-[#4A7C2F] hover:bg-[#2E5A1C] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-[1.02] shadow-green"
              aria-label="Get a Free Quote"
            >
              Get a Free Quote
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#4A7C2F]/30">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white/80 hover:text-[#6BA33A] transition-colors duration-200 text-base font-medium"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-[#4A7C2F] hover:bg-[#2E5A1C] text-white px-5 py-3 rounded-lg font-medium text-center transition-all duration-200 mt-2"
              >
                Get a Free Quote
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
