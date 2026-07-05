const features = [
  {
    icon: "☕",
    title: "Single-Origin Beans",
    desc: "We source directly from 5 farm partners across Ethiopia, Colombia, and Sumatra — no middlemen.",
  },
  {
    icon: "🔥",
    title: "Roasted Weekly",
    desc: "Every Tuesday, 300kg of beans are roasted in-house. You're always drinking this week's batch.",
  },
  {
    icon: "🤝",
    title: "Direct Trade",
    desc: "Our growers earn fair wages. We visit each farm annually and build real relationships.",
  },
  {
    icon: "🎨",
    title: "Barista Crafted",
    desc: "Every cup is pulled to order by trained baristas who take the craft seriously.",
  },
];

export default function Features() {
  return (
    <section className="py-20 border-t border-cream/5">
      <div className="max-w-[1800px] mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="group p-6 rounded-xl border border-cream/8 hover:border-crema/20 bg-white/[0.015] hover:bg-white/[0.03] transition-all duration-300"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                {icon}
              </div>
              <h3 className="font-display text-lg mb-2 group-hover:text-crema transition-colors duration-300">
                {title}
              </h3>
              <p className="text-cream-dim text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
