const features = [
  {
    title: "Fully Licensed & Insured",
    description:
      "Your property is protected from start to finish. We carry full liability and workers' comp — so you never have to worry.",
  },
  {
    title: "Local Experts Who Know Virginia Trees",
    description:
      "Virginia's climate, soil, and native species demand specialized knowledge. Our team lives and works here — we know these trees like neighbors.",
  },
  {
    title: "Transparent, No-Surprise Pricing",
    description:
      "We show up, assess the job, and give you a straight number. No hidden fees, no bait-and-switch — just honest work at a fair price.",
  },
  {
    title: "Clean Job Sites, Every Single Time",
    description:
      "We take pride in leaving your yard cleaner than we found it. Debris removal and cleanup are part of every job — always.",
  },
  {
    title: "Fast Response & Flexible Scheduling",
    description:
      "We respect your time. Whether it's a routine trim or a weekend emergency, we move quickly and work around your schedule.",
  },
]

interface WhyChooseUsProps {
  isVisible?: boolean
}

export function WhyChooseUs({ isVisible }: WhyChooseUsProps) {
  return (
    <section id="why-choose-us" className="py-20 lg:py-28 bg-[#F5F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Decorative Tree Illustration */}
          <div className={`hidden lg:flex items-center justify-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <svg
              viewBox="0 0 400 500"
              className="w-full max-w-md h-auto"
              fill="none"
            >
              {/* Tree trunk */}
              <path
                d="M200 500 L200 280 C200 260 180 240 200 220"
                stroke="#2E5A1C"
                strokeWidth="20"
                strokeLinecap="round"
              />
              {/* Branches */}
              <path
                d="M200 280 C150 260 100 280 80 250"
                stroke="#2E5A1C"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M200 260 C250 240 300 260 320 230"
                stroke="#2E5A1C"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M200 220 C160 200 140 180 120 150"
                stroke="#2E5A1C"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M200 220 C240 200 260 180 280 150"
                stroke="#2E5A1C"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* Foliage circles */}
              <circle cx="80" cy="230" r="50" fill="#4A7C2F" opacity="0.9" />
              <circle cx="120" cy="180" r="45" fill="#6BA33A" opacity="0.9" />
              <circle cx="150" cy="130" r="40" fill="#4A7C2F" opacity="0.9" />
              <circle cx="200" cy="100" r="55" fill="#6BA33A" opacity="0.9" />
              <circle cx="250" cy="130" r="40" fill="#4A7C2F" opacity="0.9" />
              <circle cx="280" cy="180" r="45" fill="#6BA33A" opacity="0.9" />
              <circle cx="320" cy="230" r="50" fill="#4A7C2F" opacity="0.9" />
              <circle cx="170" cy="160" r="35" fill="#D4EABC" opacity="0.6" />
              <circle cx="230" cy="160" r="35" fill="#D4EABC" opacity="0.6" />
              <circle cx="200" cy="200" r="30" fill="#D4EABC" opacity="0.6" />
              {/* Gold accent leaves */}
              <circle cx="100" cy="200" r="8" fill="#B8A060" />
              <circle cx="300" cy="200" r="8" fill="#B8A060" />
              <circle cx="200" cy="80" r="8" fill="#B8A060" />
            </svg>
          </div>

          {/* Features List */}
          <div className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
            <span className="text-[#4A7C2F] font-mono uppercase tracking-widest text-sm font-semibold mb-4 block">
              Why Choose Us
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0A0A0A] font-bold mb-10 leading-tight">
              Why Richmond Homeowners Choose Sena&apos;s — Year After Year
            </h2>

            <div className="space-y-8">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="flex gap-4"
                  style={{ animationDelay: `${(index + 2) * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#4A7C2F] flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
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
                  <div>
                    <h3 className="font-semibold text-[#0A0A0A] text-lg mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-[#1A1A1A]/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
