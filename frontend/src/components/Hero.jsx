import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const slides = [
  {
    img: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1800&q=80",
    tagline: "Slow mornings,",
    highlight: "well brewed.",
    sub: "Single-origin beans, roasted in small batches every Tuesday. We pour, you linger — no rush, just really good coffee.",
  },
  {
    img: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=1800&q=80",
    tagline: "Every cup,",
    highlight: "tells a story.",
    sub: "Sourced directly from 5 farm partners across Ethiopia, Colombia, and Sumatra — no middlemen, just great beans.",
  },
  {
    img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1800&q=80",
    tagline: "Your favourite spot,",
    highlight: "now online.",
    sub: "Order ahead, reserve your table, and earn rewards with every visit. Brew Haven, anywhere you are.",
  },
];

const stats = [
  { val: "4.9", label: "/ 5 Rating" },
  { val: "12", label: "Origins Roasted" },
  { val: "7AM–9PM", label: "Open Daily" },
  { val: "2026", label: "Est. Year" },
];

export default function Hero() {
  const imgRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (imgRef.current) {
        imgRef.current.style.transform = `translateY(${window.scrollY * 0.25}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setAnimating(false);
      }, 400);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imgRef}
          src={slide.img}
          alt="Coffee shop ambience"
          className="w-full h-[120%] object-cover -mt-[10%] transition-all duration-1000"
          style={{ transitionProperty: "opacity" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/97 via-espresso/80 to-espresso/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-transparent" />
      </div>

      {/* Animated grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
      />

      {/* Floating particles */}
      <div className="absolute top-32 right-[12%] w-2 h-2 rounded-full bg-crema/20 animate-pulse" />
      <div className="absolute top-48 right-[22%] w-1 h-1 rounded-full bg-crema/30" />
      <div className="absolute top-64 right-[18%] w-3 h-3 rounded-full bg-rust/20 animate-pulse" style={{ animationDelay: "2s" }} />
      <div className="absolute top-96 right-[8%] w-1.5 h-1.5 rounded-full bg-crema/15 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-48 right-[30%] w-2 h-2 rounded-full bg-rust/15 animate-pulse" style={{ animationDelay: "3s" }} />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 70% 50%, rgba(217,165,76,0.06) 0%, transparent 60%)" }}
      />

      {/* Slide counter */}
      <div className="absolute top-28 right-8 md:right-16 lg:right-24 flex flex-col items-end gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-500 rounded-full ${
              i === current ? "w-8 h-1.5 bg-crema" : "w-1.5 h-1.5 bg-cream/20 hover:bg-cream/40"
            }`}
          />
        ))}
      </div>

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
          <div className={`transition-all duration-400 ${animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
            style={{ transition: "opacity 0.4s ease, transform 0.4s ease" }}>
            <h1 className="font-display font-semibold text-6xl md:text-[5.5rem] leading-[1.05] mb-6">
              {slide.tagline}
              <br />
              <span className="text-crema italic font-medium relative">
                {slide.highlight}
                <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 300 6" fill="none">
                  <path d="M0 5 Q75 0 150 5 Q225 10 300 5" stroke="#d9a54c" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
                </svg>
              </span>
            </h1>

            <p className="text-cream-dim text-lg leading-relaxed max-w-lg mb-10">
              {slide.sub}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 items-center mb-16">
            <Link
              to="/menu"
              className="group relative overflow-hidden bg-rust hover:bg-rust-deep px-8 py-4 font-mono text-sm transition-all duration-300 flex items-center gap-3"
            >
              <span>View the menu</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
              <div className="absolute inset-0 h-full w-0 bg-white/10 group-hover:w-full transition-all duration-500 ease-out" />
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
            {stats.map(({ val, label }) => (
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