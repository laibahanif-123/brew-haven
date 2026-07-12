import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaTiktok, FaYoutube, FaEnvelope, FaArrowRight } from "react-icons/fa6";

const links = {
  Explore: [
    { label: "Full Menu", to: "/menu" },
    { label: "About Our Beans", href: "/#about" },
    { label: "Visual Gallery", href: "/#gallery" },
    { label: "Get In Touch", href: "/#contact" },
  ],
  Account: [
    { label: "Sign In", to: "/login" },
    { label: "Register", to: "/register" },
    { label: "My Cart", to: "/cart" },
    { label: "Order History", to: "/dashboard/orders" },
  ],
  Follow: [
    { label: "Instagram", href: "#", icon: FaInstagram },
    { label: "Facebook", href: "#", icon: FaFacebookF },
    { label: "TikTok", href: "#", icon: FaTiktok },
    { label: "YouTube", href: "#", icon: FaYoutube },
  ],
};

const origins = ["Ethiopia", "Colombia", "Sumatra", "Kenya", "Guatemala"];

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-cream/10" style={{ background: "#0a0705" }}>
      {/* Top golden spotlight glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[350px] pointer-events-none opacity-20 blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(217, 165, 76, 0.15) 0%, transparent 70%)"
        }}
      />

      {/* Decorative vertical grid line accents */}
      <div className="absolute top-0 bottom-0 left-[10%] w-px bg-gradient-to-b from-cream/5 via-cream/2 to-transparent pointer-events-none hidden lg:block" />
      <div className="absolute top-0 bottom-0 right-[10%] w-px bg-gradient-to-b from-cream/5 via-cream/2 to-transparent pointer-events-none hidden lg:block" />

      {/* Background massive watermark text */}
      <div
        className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 font-display text-[12vw] font-black leading-none select-none pointer-events-none opacity-[0.015] tracking-[0.2em] whitespace-nowrap"
        style={{ color: "#d9a54c" }}
      >
        BREWHAVEN
      </div>

      <div className="relative max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 z-10">

        {/* ── TOP SECTION: Brand, Navigation & Newsletter ── */}
        <div className="py-20 border-b border-cream/10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1.2fr] gap-16">

          {/* Column 1: Brand & Identity */}
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center gap-4 font-display font-bold text-3xl group tracking-tight text-cream">
              <span className="w-12 h-12 rounded-full border-2 border-crema/40 flex items-center justify-center font-mono text-sm text-crema group-hover:border-crema group-hover:bg-crema group-hover:text-espresso transition-all duration-500 shadow-[0_0_15px_rgba(217,165,76,0.1)]">
                bh
              </span>
              <span className="group-hover:text-crema transition-colors duration-300">Brew Haven</span>
            </Link>

            <p className="text-sm text-cream-dim/80 leading-relaxed max-w-sm">
              Small-batch specialty coffee, micro-roasted every Tuesday in Mian Channu. No shortcuts, no compromises — just pure, unfiltered coffee excellence.
            </p>

            {/* Coffee Origin Tags */}
            <div className="space-y-3 pt-2">
              <h4 className="font-mono text-[9px] tracking-[0.2em] uppercase text-crema/70">Selected Micro-Lots</h4>
              <div className="flex flex-wrap gap-2">
                {origins.map((origin) => (
                  <span
                    key={origin}
                    className="font-mono text-[10px] tracking-wider uppercase border border-cream/10 bg-cream/[0.02] text-cream-dim/90 px-3 py-1 rounded-md hover:border-crema hover:text-crema hover:bg-crema/[0.03] transition-all duration-300 cursor-default"
                  >
                    {origin}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Explore Navigation */}
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-crema mb-8 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-[1px] after:bg-crema">
              Explore
            </h3>
            <ul className="space-y-3">
              {links.Explore.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      onClick={(e) => {
                        if (item.href.startsWith("/#")) {
                          e.preventDefault();
                          scrollTo(item.href.replace("/#", ""));
                        }
                      }}
                      className="group flex items-center gap-2 text-sm text-cream-dim hover:text-cream py-1 transition-all duration-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-crema scale-0 group-hover:scale-100 transition-all duration-300" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{item.label}</span>
                    </a>
                  ) : (
                    <Link
                      to={item.to}
                      className="group flex items-center gap-2 text-sm text-cream-dim hover:text-cream py-1 transition-all duration-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-crema scale-0 group-hover:scale-100 transition-all duration-300" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{item.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Account & Management */}
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-crema mb-8 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-[1px] after:bg-crema">
              Client Space
            </h3>
            <ul className="space-y-3">
              {links.Account.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="group flex items-center gap-2 text-sm text-cream-dim hover:text-cream py-1 transition-all duration-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-crema scale-0 group-hover:scale-100 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Socials */}
          <div className="space-y-8">
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-crema mb-4">
                Weekly Roast Notes
              </h3>
              <p className="text-xs text-cream-dim/60 leading-relaxed mb-4">
                Receive cupping notes, fresh imports, and roasting schedules directly.
              </p>
              <div className="flex items-center gap-2 border-b border-cream/20 focus-within:border-crema py-2 transition-colors duration-300">
                <FaEnvelope className="text-cream-dim/40 text-sm flex-shrink-0" />
                <input
                  type="email"
                  placeholder="enter your email address"
                  className="bg-transparent outline-none text-xs flex-1 placeholder:text-cream-dim/30 text-cream font-mono tracking-wider"
                />
                <button className="group text-crema hover:text-cream transition-colors p-1" aria-label="Subscribe">
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Social media links with elegant custom styling */}
            <div className="space-y-3">
              <h4 className="font-mono text-[9px] tracking-[0.2em] uppercase text-crema/70">Connect With Us</h4>
              <div className="flex gap-3">
                {links.Follow.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="w-9 h-9 rounded-lg border border-cream/15 flex items-center justify-center text-cream-dim hover:text-espresso hover:bg-crema hover:border-crema transition-all duration-300 shadow-sm"
                      aria-label={item.label}
                    >
                      <Icon className="text-sm" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* ── MIDDLE STATS BAR (Premium visual layout) ── */}
        <div className="py-12 border-b border-cream/10 grid grid-cols-2 md:grid-cols-4 gap-8 relative">
          {[
            { val: "4.9★", label: "Average Rating", desc: "From 1k+ happy clients" },
            { val: "12+", label: "Direct Trade Origins", desc: "Ethically & sustainably sourced" },
            { val: "300kg+", label: "Roasted Weekly", desc: "Freshness guaranteed" },
            { val: "3", label: "Showroom Locations", desc: "Come visit our bars" },
          ].map(({ val, label, desc }, idx) => (
            <div 
              key={label} 
              className={`text-center md:text-left space-y-1 ${
                idx !== 3 ? "md:border-r border-cream/5 pr-4" : ""
              }`}
            >
              <div className="font-display text-3xl font-bold text-crema">{val}</div>
              <div className="font-mono text-[10px] tracking-widest uppercase text-cream">{label}</div>
              <div className="text-[11px] text-cream-dim/55 font-light">{desc}</div>
            </div>
          ))}
        </div>

        {/* ── BOTTOM BAR (Aesthetic details, credits, and active shop status) ── */}
        <div className="py-10 flex flex-col lg:flex-row justify-between items-center gap-6 text-center lg:text-left">
          
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 font-mono text-[11px] text-cream-dim/60 tracking-wider">
            <span>© {new Date().getFullYear()} BREW HAVEN COFFEE CO.</span>
            <span className="hidden md:inline text-cream/20">|</span>
            <span>MIAN CHANNU, PAKISTAN</span>
          </div>

          {/* Active status indicator badge */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-green-500 absolute" />
            <span className="font-mono text-[10px] text-green-400 uppercase tracking-widest">
              Live &amp; Brewing Today · 7:00 AM – 9:00 PM
            </span>
          </div>

          {/* Premium Developer Branding */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-cream-dim/50 tracking-[0.15em] uppercase">Developed By</span>
            <span className="font-mono text-[11px] text-crema font-semibold tracking-[0.2em] uppercase border-b border-crema/30 pb-0.5 hover:border-crema hover:text-cream-dim transition-all duration-300 cursor-default">
              Laiba Hanif
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}