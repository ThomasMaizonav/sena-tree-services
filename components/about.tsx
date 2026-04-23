import Image from "next/image"

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
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-14 items-center">
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

          {/* About Image */}
          <div className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
            <div className="w-full max-w-[330px] sm:max-w-[380px] lg:max-w-[360px] mx-auto lg:mx-0 lg:ml-auto bg-[#1A1A1A] p-3 rounded-[24px] border border-[#4A7C2F]/30 shadow-green-lg">
              <div className="relative overflow-hidden rounded-[18px]">
                <Image
                  src="/images/hero-1.jpg"
                  alt="Sena's Tree Services climber performing safe tree work"
                  width={1200}
                  height={1600}
                  className="w-full h-auto object-cover"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0A0A0A]/75 to-transparent" />
              </div>
              <p className="text-[#F5F5F0]/80 text-xs sm:text-sm mt-2.5 px-1">
                Real job site photo from Sena&apos;s Tree Services in action.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
