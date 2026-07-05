export default function Visit() {
  return (
    <section id="contact" className="py-28">
      <div className="max-w-[1800px] mx-auto px-8 md:px-16 lg:px-24">

        {/* Main CTA block */}
        <div
          className="relative overflow-hidden rounded-2xl p-10 md:p-20"
          style={{
            background: "linear-gradient(135deg, #7c2f1f 0%, #a1402b 40%, #7c2f1f 100%)",
          }}
        >
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full border border-white/5 pointer-events-none" />

          {/* Shimmer top line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="relative grid md:grid-cols-[1.2fr_0.8fr] gap-14 items-start">

            {/* LEFT */}
            <div>
              <span className="font-mono text-xs tracking-widest uppercase text-crema-soft mb-4 block">
                Contact Us
              </span>
              <h2 className="font-display text-4xl md:text-5xl mb-5 leading-tight">
                Come sit<br />
                <span className="italic font-medium text-crema-soft">with us.</span>
              </h2>
              <p className="text-crema-soft/80 text-base leading-relaxed max-w-md mb-8">
                Walk-ins are always welcome. For groups of 5 or more, we'd love a heads-up so we can hold a table just for you.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-crema text-espresso hover:bg-cream font-mono text-sm px-8 py-4 transition-all duration-300 font-medium"
                >
                  Reserve a table
                  <span>→</span>
                </a>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-white/20 text-crema-soft hover:border-crema hover:text-crema font-mono text-sm px-8 py-4 transition-all duration-300"
                >
                  Get directions
                </a>
              </div>

              {/* Location pill */}
              <div className="mt-8 inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                <span className="w-1.5 h-1.5 rounded-full bg-crema animate-pulse" />
                <span className="font-mono text-xs text-crema-soft">Mian Channu · +92 51 000 0000</span>
              </div>
            </div>

            {/* RIGHT — Hours */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <h3 className="font-mono text-xs tracking-widest uppercase text-crema-soft mb-6">
                Opening Hours
              </h3>
              <div className="space-y-0 font-mono text-sm">
                {[
                  { day: "Mon – Fri", hours: "7:00 AM – 9:00 PM", active: true },
                  { day: "Saturday", hours: "8:00 AM – 10:00 PM", active: false },
                  { day: "Sunday", hours: "8:00 AM – 8:00 PM", active: false },
                ].map(({ day, hours, active }) => (
                  <div
                    key={day}
                    className={`flex justify-between items-center border-b border-white/10 py-4 last:border-0 ${
                      active ? "text-crema-soft" : "text-crema-soft/60"
                    }`}
                  >
                    <span>{day}</span>
                    <span className="tabular-nums">{hours}</span>
                  </div>
                ))}
              </div>

              {/* Today's status */}
              <div className="mt-6 flex items-center gap-2 bg-white/5 rounded-lg p-3">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                <span className="font-mono text-xs text-crema-soft/80">We're open right now — come on in!</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
