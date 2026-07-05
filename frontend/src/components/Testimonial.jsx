import { useState } from "react";

const testimonials = [
  {
    quote: "Best flat white in the city — and the kind of place where the barista actually remembers your order.",
    author: "Ayesha R.",
    since: "Regular since 2021",
    initials: "AR",
  },
  {
    quote: "I've tried specialty coffee in Dubai and London. Brew Haven holds its own. The cold brew alone is worth the trip.",
    author: "Bilal M.",
    since: "Regular since 2022",
    initials: "BM",
  },
  {
    quote: "It's not just coffee — it's the whole experience. The space, the smell, the people. I work from here every Monday.",
    author: "Sara K.",
    since: "Regular since 2020",
    initials: "SK",
  },
];

export default function Testimonial() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="py-28 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(161,64,43,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1800px] mx-auto px-8 md:px-16 lg:px-24 text-center relative">
        <span className="font-mono text-xs tracking-widest uppercase text-crema mb-8 block">
          What people say
        </span>

        {/* Big quote mark */}
        <div className="font-display text-[8rem] text-rust/25 leading-none -mb-6 select-none">"</div>

        {/* Quote — animated via key */}
        <blockquote
          key={active}
          className="font-display italic font-medium text-2xl md:text-4xl leading-snug max-w-3xl mx-auto text-cream mb-10"
          style={{ animation: "fadeIn 0.4s ease" }}
        >
          {t.quote}
        </blockquote>

        {/* Author */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="w-10 h-10 rounded-full bg-crema/10 border border-crema/30 flex items-center justify-center font-mono text-xs text-crema">
            {t.initials}
          </div>
          <div className="text-left">
            <div className="font-mono text-xs text-cream tracking-wider">{t.author}</div>
            <div className="font-mono text-[10px] text-cream-dim tracking-wider">{t.since}</div>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex items-center justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 ${
                i === active
                  ? "w-6 h-1.5 bg-crema"
                  : "w-1.5 h-1.5 bg-cream/25 hover:bg-cream/50"
              }`}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}