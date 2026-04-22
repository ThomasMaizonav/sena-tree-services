const stats = [
  { value: "10+", label: "Years", sublabel: "In Business" },
  { value: "500+", label: "Properties", sublabel: "Serviced" },
  { value: "5-Star", label: "Average", sublabel: "Rating" },
  { value: "Same-Day", label: "Quotes", sublabel: "Available" },
]

interface AboutProps {
  isVisible?: boolean
}

export function About({ isVisible }: AboutProps) {
  return (
    <section
      id="about"
      className="py-20 lg:py-28 bg-[#F5F5F0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <span className="text-[#4A7C2F] font-mono uppercase tracking-widest text-sm font-semibold mb-4 block">
              About Us
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0A0A0A] font-bold mb-6 leading-tight">
              A Legacy Grown One Tree at a Time
            </h2>
            <div className="space-y-4 text-[#1A1A1A]/80 text-lg leading-relaxed">
              <p>
                For over 10 years, Sena&apos;s Tree Services has been the go-to name
                for homeowners and property managers across the Greater Richmond
                area who refuse to settle for anything less than expert care. We
                don&apos;t just trim branches — we protect your property, enhance your
                curb appeal, and preserve the natural beauty that makes Virginia
                neighborhoods worth calling home.
              </p>
              <p>
                Our crew brings the same level of detail to a backyard oak in
                Midlothian as we do to a commercial property in Short Pump. That
                consistency, that pride in every job, is what&apos;s kept our clients
                coming back — and sending their neighbors our way.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className={`grid grid-cols-2 gap-4 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-[#1A1A1A] p-6 sm:p-8 rounded-xl border-t-4 border-[#4A7C2F] shadow-green"
              >
                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#4A7C2F] font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm uppercase tracking-wide">
                  {stat.label}
                </div>
                <div className="text-white/40 text-xs uppercase tracking-wide">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
