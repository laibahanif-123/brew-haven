const origins = [
  "Ethiopian Yirgacheffe",
  "Colombian Huila",
  "Sumatra Mandheling",
  "Kenyan AA",
  "Guatemalan Antigua",
  "Brazilian Cerrado",
  "Costa Rican Tarrazú",
];

export default function MarqueeStrip() {
  return (
    <div className="relative overflow-hidden border-y border-crema/20" style={{ background: "linear-gradient(135deg, #d9a54c 0%, #c4923a 50%, #d9a54c 100%)" }}>
      {/* Top shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="py-4 overflow-hidden whitespace-nowrap">
        <div className="inline-flex gap-14 animate-[scroll_40s_linear_infinite]">
          {[...origins, ...origins, ...origins].map((o, i) => (
            <span key={i} className="font-mono text-sm tracking-[0.15em] uppercase text-espresso flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-espresso/50 inline-block" />
              {o}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom shimmer line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </div>
  );
}