"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"

const slides = [
  { src: "/images/gallery/gallery-1.jpg", alt: "Tree service project photo 1" },
  { src: "/images/gallery/gallery-2.jpg", alt: "Tree service project photo 2" },
  { src: "/images/gallery/gallery-3.jpg", alt: "Tree service project photo 3" },
  { src: "/images/gallery/gallery-4.jpg", alt: "Tree service project photo 4" },
  { src: "/images/gallery/gallery-5.jpg", alt: "Tree service project photo 5" },
  { src: "/images/gallery/gallery-6.jpg", alt: "Tree service project photo 6" },
  { src: "/images/gallery/gallery-7.jpg", alt: "Tree service project photo 7" },
  { src: "/images/gallery/gallery-8.jpg", alt: "Tree service project photo 8" },
]

const DRAG_THRESHOLD = 70
const AUTO_ADVANCE_MS = 5000

export function ProjectGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const dragStartXRef = useRef<number | null>(null)

  const goTo = useCallback((nextIndex: number) => {
    const total = slides.length
    const normalized = (nextIndex + total) % total
    setCurrentIndex(normalized)
  }, [])

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }, [])

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    if (isDragging) return

    const timer = setInterval(() => {
      goNext()
    }, AUTO_ADVANCE_MS)

    return () => clearInterval(timer)
  }, [goNext, isDragging])

  const endDrag = useCallback(() => {
    if (dragStartXRef.current === null) return

    if (dragOffset <= -DRAG_THRESHOLD) {
      goNext()
    } else if (dragOffset >= DRAG_THRESHOLD) {
      goPrev()
    }

    setIsDragging(false)
    setDragOffset(0)
    dragStartXRef.current = null
  }, [dragOffset, goNext, goPrev])

  const startDrag = useCallback((clientX: number) => {
    dragStartXRef.current = clientX
    setIsDragging(true)
    setDragOffset(0)
  }, [])

  return (
    <section id="gallery" className="relative z-20 -mt-12 sm:-mt-14 lg:-mt-20 bg-[#F5F5F0] pb-16 lg:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-[#0A0A0A]">
          <div
            className={`flex touch-pan-y ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            onPointerDown={(event) => {
              startDrag(event.clientX)
              event.currentTarget.setPointerCapture(event.pointerId)
            }}
            onPointerMove={(event) => {
              if (!isDragging || dragStartXRef.current === null) return
              setDragOffset(event.clientX - dragStartXRef.current)
            }}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerLeave={() => {
              if (isDragging) endDrag()
            }}
            style={{
              transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
              transition: isDragging ? "none" : "transform 500ms ease",
            }}
          >
            {slides.map((slide, index) => (
              <div key={slide.src} className="relative min-w-full h-[260px] sm:h-[360px] lg:h-[430px]">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover select-none"
                  draggable={false}
                  priority={index < 2}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={goPrev}
            className="absolute z-20 left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-[#0A0A0A]/70 text-white border border-white/25 hover:bg-[#0A0A0A]/90 transition-colors"
            aria-label="Previous image"
          >
            <span aria-hidden="true" className="text-xl leading-none">
              ‹
            </span>
          </button>

          <button
            type="button"
            onClick={goNext}
            className="absolute z-20 right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-[#0A0A0A]/70 text-white border border-white/25 hover:bg-[#0A0A0A]/90 transition-colors"
            aria-label="Next image"
          >
            <span aria-hidden="true" className="text-xl leading-none">
              ›
            </span>
          </button>

          <div className="absolute z-20 bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-[#0A0A0A]/60 px-3 py-1.5">
            {slides.map((slide, index) => (
              <button
                key={`${slide.src}-dot`}
                type="button"
                onClick={() => goTo(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === currentIndex ? "w-6 bg-[#6BA33A]" : "w-2.5 bg-white/60 hover:bg-white/85"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
