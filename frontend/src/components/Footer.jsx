import { Link } from "react-router-dom";

const links = {
  Explore: [
    { label: "Full Menu", to: "/menu" },
    { label: "About", href: "/#about" },
    { label: "Gallery", href: "/#gallery" },
    { label: "Contact", href: "/#contact" },
  ],
  Account: [
    { label: "Sign In", to: "/login" },
    { label: "Register", to: "/register" },
    { label: "My Cart", to: "/cart" },
    { label: "Order History", to: "/login" },
  ],
  Follow: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "TikTok", href: "#" },
    { label: "YouTube", href: "#" },
  ],
};

const origins = ["Ethiopia", "Colombia", "Sumatra", "Kenya", "Guatemala"];

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-cream/8" style={{ background: "#100c08" }}>
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, #d9a54c55, transparent)" }}
      />

      {/* Background watermark text */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 font-display text-[14rem] font-bold leading-none select-none pointer-events-none opacity-[0.025] whitespace-nowrap"
        style={{ color: "#d9a54c" }}
      >
        BREW HAVEN
      </div>

      <div className="relative max-w-[1800px] mx-auto px-8 md:px-16 lg:px-24">

        {/* ── TOP BAND ── */}
        <div className="py-16 border-b border-cream/8 grid md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12">

          {/* Brand column */}
          <div>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 font-display font-bold text-2xl mb-5 group w-fit">
              <span className="w-10 h-10 rounded-full border border-crema flex items-center justify-center font-mono text-sm text-crema group-hover:bg-crema group-hover:text-espresso transition-all duration-300">
                bh
              </span>
              Brew Haven
            </Link>

            <p className="text-sm text-cream-dim leading-relaxed max-w-xs mb-6">
              Small-batch specialty coffee, roasted every Tuesday in Mian Channu. No shortcuts, no syrup pumps — just really good coffee.
            </p>

            {/* Origins pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {origins.map((o) => (
                <span
                  key={o}
                  className="font-mono text-[10px] tracking-wider uppercase border border-cream/15 text-cream-dim px-2.5 py-1 rounded-full"
                >
                  {o}
                </span>
              ))}
            </div>

            {/* Newsletter */}
            <p className="font-mono text-[10px] tracking-widest uppercase text-crema mb-3">Weekly Roast Notes</p>
            <div className="flex border-b border-cream/20 pb-2.5 max-w-xs focus-within:border-crema transition-colors">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-transparent outline-none text-sm flex-1 placeholder:text-cream-dim/40 text-cream"
              />
              <button className="font-mono text-xs text-crema hover:text-cream transition-colors ml-2 whitespace-nowrap">
                Join →
              </button>
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-crema mb-6">
                {heading}
              </h3>
              <ul className="space-y-1">
                {items.map((item) =>
                  item.href ? (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        onClick={(e) => {
                          if (item.href.startsWith("/#")) {
                            e.preventDefault();
                            scrollTo(item.href.replace("/#", ""));
                          }
                        }}
                        className="group flex items-center gap-1.5 text-sm text-cream-dim hover:text-crema py-1.5 transition-colors duration-200"
                      >
                        <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 text-crema text-xs">→</span>
                        {item.label}
                      </a>
                    </li>
                  ) : (
                    <li key={item.label}>
                      <Link
                        to={item.to}
                        className="group flex items-center gap-1.5 text-sm text-cream-dim hover:text-crema py-1.5 transition-colors duration-200"
                      >
                        <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 text-crema text-xs">→</span>
                        {item.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* ── MIDDLE STATS BAR ── */}
        <div className="py-10 border-b border-cream/8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { val: "4.9★", label: "Average Rating" },
            { val: "12", label: "Bean Origins" },
            { val: "300kg", label: "Roasted Weekly" },
            { val: "3", label: "City Locations" },
          ].map(({ val, label }) => (
            <div key={label} className="text-center md:text-left">
              <div className="font-display text-2xl text-crema">{val}</div>
              <div className="font-mono text-[10px] tracking-widest uppercase text-cream-dim mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="py-7 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-mono text-[11px] text-cream-dim tracking-wider">
            © 2026 BREW HAVEN COFFEE CO. · MIAN CHANNU
          </span>

          {/* Hours quick-view */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-[11px] text-cream-dim">Open today · 7:00 AM – 9:00 PM</span>
          </div>

          <span className="font-mono text-[11px] text-cream-dim tracking-wider">
            DESIGNED FOR SLOW MORNINGS
          </span>
        </div>

      </div>
    </footer>
  );
}