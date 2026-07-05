const stats = [
  { val: "5", label: "Farm Partners" },
  { val: "300kg", label: "Roasted / Week" },
  { val: "3", label: "City Locations" },
  { val: "2026", label: "Founded" },
];

export default function Story() {
  return (
    <section id="about" className="py-28 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #d9a54c 0%, transparent 70%)" }}
      />

      <div className="max-w-[1800px] mx-auto px-8 md:px-16 lg:px-24 grid md:grid-cols-[1fr_1fr] gap-20 items-center">

        {/* LEFT — Image collage */}
        <div className="relative">
          {/* Main large image */}
          <div className="relative h-[500px] rounded overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80"
              alt="Coffee shop interior"
              className="w-full h-full object-cover hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 to-transparent" />
          </div>

          {/* Floating overlay card */}
          <div className="absolute -bottom-6 -right-6 bg-espresso-2 border border-cream/10 p-6 rounded shadow-2xl w-48">
            <div className="font-display text-4xl text-crema">1st</div>
            <div className="font-mono text-[10px] tracking-widest text-cream-dim uppercase mt-1">Year of Crafting</div>
            <div className="mt-3 h-px bg-cream/10" />
            <div className="font-mono text-[10px] text-cream-dim mt-3 leading-relaxed">
              Mian Channu's most-loved specialty café
            </div>
          </div>

          {/* Small accent image */}
          <div className="absolute -top-4 -right-4 w-28 h-28 rounded overflow-hidden border-4 border-espresso shadow-xl hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=300&q=80"
              alt="Coffee beans"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Year badge */}
          <div className="absolute top-6 left-6 bg-espresso border border-crema/40 px-4 py-2 font-mono text-xs tracking-widest text-crema backdrop-blur-sm">
            SINCE 2026
          </div>
        </div>

        {/* RIGHT — Text content */}
        <div>
          <span className="font-mono text-xs tracking-widest uppercase text-crema">About Us</span>
          <h2 className="font-display text-3xl md:text-5xl mt-4 mb-6 leading-tight">
            Roasted in-house,<br />
            <span className="text-crema italic font-medium">served with intent.</span>
          </h2>

          <div className="space-y-4 mb-10">
            <p className="text-cream-dim text-base leading-relaxed max-w-md">
              Brew Haven started as a single roaster in a garage — today, we're doing it the slow way: small-batch roasting, direct trade with growers, and a bar built for conversation.
            </p>
            <p className="text-cream-dim text-base leading-relaxed max-w-md">
              No syrup pumps, no shortcuts. Just beans we'd drink ourselves, poured by people who care where they came from.
            </p>
          </div>

          {/* Signature / personal touch */}
          <div className="flex items-center gap-4 mb-10 p-4 border border-cream/10 rounded bg-white/[0.02]">
            <div className="w-10 h-10 rounded-full bg-crema/10 border border-crema/20 flex items-center justify-center text-crema font-display italic text-lg flex-shrink-0">
              A
            </div>
            <div>
              <div className="font-display italic text-sm text-cream">"Every cup tells the story of where it grew."</div>
              <div className="font-mono text-[10px] text-cream-dim mt-1 tracking-wider">— Ahmad, Head Roaster</div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-6 pt-8 border-t border-cream/10">
            {stats.map(({ val, label }) => (
              <div key={label} className="group">
                <span className="font-display text-3xl text-crema block group-hover:scale-105 transition-transform origin-left">
                  {val}
                </span>
                <span className="font-mono text-[11px] tracking-widest text-cream-dim uppercase mt-1 block">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}