import { useState } from "react";

const testimonials = [
  {
    quote: "Best flat white in the city — and the kind of place where the barista actually remembers your order.",
    author: "Ayesha R.",
    role: "Architect · Regular since 2024",
    initials: "AR",
    rating: 5,
  },
  {
    quote: "I've tried specialty coffee in Dubai and London. Brew Haven holds its own. The cold brew alone is worth the trip.",
    author: "Bilal M.",
    role: "Designer · Regular since 2024",
    initials: "BM",
    rating: 5,
  },
  {
    quote: "It's not just coffee — it's the whole experience. The space, the smell, the people. I work from here every Monday.",
    author: "Sara K.",
    role: "Writer · Regular since 2024",
    initials: "SK",
    rating: 5,
  },
  {
    quote: "Finally a café in Mian Channu that takes coffee seriously. The Ethiopian pour-over changed my morning routine.",
    author: "Usman T.",
    role: "Engineer · Regular since 2026",
    initials: "UT",
    rating: 5,
  },
];

export default function Testimonial() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="py-28 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(161,64,43,0.07) 0%, transparent 70%)" }}
      />
      {/* Top/Bottom fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-espresso to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-espresso to-transparent pointer-events-none" />

      <div className="max-w-[1800px] mx-auto px-8 md:px-16 lg:px-24 relative">
        {/* Label */}
        <div className="text-center mb-4">
          <span className="font-mono text-xs tracking-widest uppercase text-crema">What people say</span>
        </div>

        {/* All testimonials grid */}
        <div className="grid md:grid-cols-2 gap-5 mb-14">
          {testimonials.map((item, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`text-left p-7 rounded-2xl border transition-all duration-400 group ${
                i === active
                  ? "border-crema/40 bg-crema/5 shadow-lg shadow-crema/5"
                  : "border-cream/8 bg-white/[0.015] hover:border-cream/20 hover:bg-white/[0.03]"
              }`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: item.rating }).map((_, si) => (
                  <span key={si} className="text-crema text-sm">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className={`font-display italic text-lg leading-relaxed mb-5 transition-colors ${
                i === active ? "text-cream" : "text-cream-dim"
              }`}>
                "{item.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs transition-all ${
                  i === active
                    ? "bg-crema/20 border border-crema/50 text-crema"
                    : "bg-cream/5 border border-cream/15 text-cream-dim"
                }`}>
                  {item.initials}
                </div>
                <div>
                  <div className="font-mono text-xs text-cream tracking-wider">{item.author}</div>
                  <div className="font-mono text-[10px] text-cream-dim tracking-wider mt-0.5">{item.role}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Featured quote — large display */}
        <div className="text-center border-t border-cream/10 pt-14">
          <div className="font-display text-[6rem] text-rust/20 leading-none -mb-4 select-none">"</div>
          <blockquote
            key={active}
            className="font-display italic font-medium text-3xl md:text-5xl leading-snug max-w-4xl mx-auto text-cream mb-8"
            style={{ animation: "fadeUp 0.4s ease both" }}
          >
            {t.quote}
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-crema/10 border border-crema/30 flex items-center justify-center font-mono text-xs text-crema">
              {t.initials}
            </div>
            <div className="text-left">
              <div className="font-mono text-xs text-cream tracking-wider">{t.author}</div>
              <div className="font-mono text-[10px] text-cream-dim">{t.role}</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}