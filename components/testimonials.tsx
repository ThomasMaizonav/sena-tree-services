const testimonials = [
  {
    stars: 5,
    text: "Sena's crew showed up on time, worked efficiently, and left my yard spotless. They removed a massive oak that was dangerously close to my roof — I can't believe how stress-free the whole process was. Highly recommend to anyone in Henrico!",
    author: "Michael T.",
    location: "Henrico County",
  },
  {
    stars: 5,
    text: "I've used three different tree companies over the years and none of them come close to Sena's. The team is professional, the price was fair, and they actually explained what they were doing and why. Truly a cut above.",
    author: "Sandra R.",
    location: "Midlothian",
  },
  {
    stars: 5,
    text: "Called them on a Friday afternoon after a storm knocked a limb onto my fence. They were at my house Saturday morning. That kind of responsiveness is rare. Sena's has a customer for life.",
    author: "James W.",
    location: "Short Pump",
  },
]

interface TestimonialsProps {
  isVisible?: boolean
}

export function Testimonials({ isVisible }: TestimonialsProps) {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-[#F5F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-[#4A7C2F] font-mono uppercase tracking-widest text-sm font-semibold mb-4 block">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0A0A0A] font-bold mb-4 text-balance">
            What Our Clients Are Saying
          </h2>
          <p className="text-[#1A1A1A]/60 text-lg">
            Over 10 years of five-star service, one tree at a time.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className={`bg-white rounded-xl p-6 sm:p-8 border-t-[3px] border-[#4A7C2F] shadow-green ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-[#B8A060]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-[#1A1A1A]/80 leading-relaxed mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="border-t border-[#4A7C2F]/20 pt-4">
                <p className="font-semibold text-[#0A0A0A]">
                  — {testimonial.author}
                </p>
                <p className="text-[#4A7C2F] text-sm">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
