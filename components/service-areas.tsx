const areas = [
  "Richmond, VA",
  "Henrico County",
  "Midlothian",
  "Short Pump",
  "Chesterfield",
  "Glen Allen",
  "Mechanicsville",
  "Bon Air",
  "Colonial Heights",
  "Petersburg",
  "And surrounding areas",
]

interface ServiceAreasProps {
  isVisible?: boolean
}

export function ServiceAreas({ isVisible }: ServiceAreasProps) {
  return (
    <section id="areas" className="py-20 lg:py-28 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-[#4A7C2F] font-mono uppercase tracking-widest text-sm font-semibold mb-4 block">
            Where We Work
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-bold mb-4 text-balance">
            Serving the Greater Richmond Region
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Wherever you are in the Richmond metro, Sena&apos;s Tree Services is
            ready to roll. Our crews cover:
          </p>
        </div>

        {/* Areas Grid */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
          {areas.map((area) => (
            <span
              key={area}
              className="bg-[#1A1A1A] border border-[#4A7C2F] text-[#6BA33A] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#4A7C2F]/10 transition-colors cursor-default"
            >
              {area}
            </span>
          ))}
        </div>

        {/* Additional Text */}
        <p className={`text-center text-white/50 max-w-3xl mx-auto leading-relaxed ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.4s" }}>
          Not sure if we cover your area? Give us a call or send us a message —
          chances are, we do. Sena&apos;s Tree Services proudly serves homeowners,
          property managers, HOAs, and commercial clients throughout Central
          Virginia.
        </p>
      </div>
    </section>
  )
}
