const features = [
  {
    icon: "☕",
    title: "Single-Origin Beans",
    desc: "We source directly from 5 farm partners across Ethiopia, Colombia, and Sumatra — no middlemen.",
    accent: "#d9a54c",
  },
  {
    icon: "🔥",
    title: "Roasted Weekly",
    desc: "Every Tuesday, 300kg of beans are roasted in-house. You're always drinking this week's fresh batch.",
    accent: "#a1402b",
  },
  {
    icon: "🤝",
    title: "Direct Trade",
    desc: "Our growers earn fair wages. We visit each farm annually and build real long-term relationships.",
    accent: "#d9a54c",
  },
  {
    icon: "🎨",
    title: "Barista Crafted",
    desc: "Every cup is pulled to order by trained baristas who take the craft of coffee seriously.",
    accent: "#a1402b",
  },
];

export default function Features() {
  return (
    <section className="py-24 border-t border-cream/5 relative overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none opacity-10"
        style={{ background: "radial-gradient(ellipse, #d9a54c 0%, transparent 70%)" }}
      />

      <div className="max-w-[1800px] mx-auto px-8 md:px-16 lg:px-24">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="font-mono text-xs tracking-widest uppercase text-crema block mb-3">Why Brew Haven</span>
          <h2 className="font-display text-4xl md:text-5xl">
            The <span className="text-crema italic font-medium">difference</span> is in the details
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon, title, desc, accent }) => (
            <div
              key={title}
              className="group relative p-7 rounded-2xl border border-cream/8 hover:border-crema/25 bg-white/[0.015] hover:bg-white/[0.04] transition-all duration-500 overflow-hidden"
            >
              {/* Corner glow on hover */}
              <div
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }}
              />

              {/* Icon */}
              <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300 inline-block">
                {icon}
              </div>

              {/* Title */}
              <h3 className="font-display text-xl mb-3 group-hover:text-crema transition-colors duration-300">
                {title}
              </h3>

              {/* Desc */}
              <p className="text-cream-dim text-sm leading-relaxed">{desc}</p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: `linear-gradient(to right, ${accent}, transparent)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
