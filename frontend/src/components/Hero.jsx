import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function Hero() {
  const imgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imgRef.current) {
        const scrollY = window.scrollY;
        imgRef.current.style.transform = `translateY(${scrollY * 0.25}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imgRef}
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1800&q=80"
          alt="Coffee shop ambience"
          className="w-full h-[120%] object-cover -mt-[10%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/95 via-espresso/80 to-espresso/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-transparent" />
      </div>

      {/* Floating coffee beans decoration */}
      <div className="absolute top-32 right-[12%] w-2 h-2 rounded-full bg-crema/20 animate-pulse" />
      <div className="absolute top-48 right-[22%] w-1 h-1 rounded-full bg-crema/30" style={{ animationDelay: "1s" }} />
      <div className="absolute top-64 right-[18%] w-3 h-3 rounded-full bg-rust/20 animate-pulse" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div className="relative max-w-[1800px] mx-auto px-8 md:px-16 lg:px-24 pt-28 pb-20 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-crema/30 bg-crema/5 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-crema animate-pulse" />
            <span className="font-mono text-xs tracking-widest uppercase text-crema">
              Mian Channu · Est. 2026 · Now Open
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-semibold text-6xl md:text-[5.5rem] leading-[1.05] mb-6">
            Slow mornings,
            <br />
            <span className="text-crema italic font-medium relative">
              well brewed.
              <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 300 6" fill="none">
                <path d="M0 5 Q75 0 150 5 Q225 10 300 5" stroke="#d9a54c" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="text-cream-dim text-lg leading-relaxed max-w-lg mb-10">
            Single-origin beans, roasted in small batches every Tuesday.
            We pour, you linger — no rush, just really good coffee.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 items-center mb-16">
            <Link
              to="/menu"
              className="group relative overflow-hidden bg-rust hover:bg-rust-deep px-8 py-4 font-mono text-sm transition-all duration-300 flex items-center gap-3"
            >
              <span>View the menu</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <a
              href="#visit"
              className="font-mono text-sm border border-cream/25 hover:border-crema hover:text-crema px-8 py-4 transition-all duration-300 backdrop-blur-sm"
            >
              Reserve a table
            </a>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-10 pt-8 border-t border-cream/10">
            {[
              { val: "4.9", label: "/ 5 Rating" },
              { val: "12", label: "Origins Roasted" },
              { val: "7AM–9PM", label: "Open Daily" },
              { val: "2026", label: "Est. Year" },
            ].map(({ val, label }) => (
              <div key={label} className="group">
                <span className="font-display text-2xl text-crema block group-hover:scale-110 transition-transform origin-left">
                  {val}
                </span>
                <span className="font-mono text-[10px] tracking-widest text-cream-dim uppercase mt-0.5 block">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="font-mono text-[10px] tracking-widest text-cream-dim uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-cream-dim to-transparent animate-pulse" />
      </div>
    </section>
  );
}