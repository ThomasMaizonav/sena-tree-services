"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { ProjectGallery } from "@/components/project-gallery"
import { WhyChooseUs } from "@/components/why-choose-us"
import { ServiceAreas } from "@/components/service-areas"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }))
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <Hero />
      <About isVisible={isVisible["about"]} />
      <Services isVisible={isVisible["services"]} />
      <ProjectGallery />
      <WhyChooseUs isVisible={isVisible["why-choose-us"]} />
      <ServiceAreas isVisible={isVisible["areas"]} />
      <Testimonials isVisible={isVisible["testimonials"]} />
      <Contact isVisible={isVisible["contact"]} />
      <Footer />
    </main>
  )
}
