const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
      </svg>
    ),
    title: "Tree Removal",
    description:
      "Safe, efficient removal of hazardous, dead, or unwanted trees — protecting your home and clearing your space with zero guesswork.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
      </svg>
    ),
    title: "Tree Trimming & Pruning",
    description:
      "Shape, balance, and revitalize your trees with precision cuts that promote healthy growth and keep your property looking immaculate year-round.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        <circle cx="12" cy="16" r="3" strokeWidth={1.5} />
      </svg>
    ),
    title: "Stump Grinding",
    description:
      "We grind stumps down to below grade — eliminating trip hazards, pests, and eyesores so your yard is clean and ready for what's next.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Emergency Tree Services",
    description:
      "Storm damage doesn't wait for business hours. Our team responds fast to fallen or dangerous trees — protecting your family, your home, and your peace of mind.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4z" />
      </svg>
    ),
    title: "Land Clearing",
    description:
      "Preparing a lot for construction or reclaiming overgrown land? We clear brush, trees, and debris to give your project a clean foundation.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Mulch Application",
    description:
      "Looking to refresh and protect your landscape? Our mulch application enhances curb appeal while helping retain moisture, regulate soil temperature, and prevent weed growth. We install clean, even layers with attention to detail — giving your yard a polished, healthy look that lasts.",
  },
]

interface ServicesProps {
  isVisible?: boolean
}

export function Services({ isVisible }: ServicesProps) {
  return (
    <section id="services" className="py-20 lg:py-28 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-[#4A7C2F] font-mono uppercase tracking-widest text-sm font-semibold mb-4 block">
            What We Do
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-bold mb-4 text-balance">
            Complete Tree Care, Expertly Delivered
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Every service we offer is backed by a decade of hands-on experience
            and a commitment to doing the job right the first time.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`bg-[#1A1A1A] rounded-xl p-6 sm:p-8 border-t-[3px] border-[#4A7C2F] transition-all duration-300 hover:-translate-y-1 hover:shadow-green-hover group ${isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-lg bg-[#4A7C2F]/10 flex items-center justify-center text-[#6BA33A] mb-6 group-hover:bg-[#4A7C2F]/20 transition-colors">
                {service.icon}
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-semibold mb-3">
                {service.title}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
