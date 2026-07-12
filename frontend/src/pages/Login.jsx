import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState({ email: "", password: "", remember: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const imgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imgRef.current) {
        imgRef.current.style.transform = `translateY(${window.scrollY * 0.2}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/users/login", {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", data.token);
      login(data);
      if (data.isAdmin) navigate("/admin");
      else navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
      setLoading(false);
    }
  };

  const stats = [
    { val: "4.9", label: "/ 5 Rating" },
    { val: "12", label: "Origins Roasted" },
    { val: "7AM–9PM", label: "Open Daily" },
    { val: "2026", label: "Est. Year" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* ── Parallax Background ── */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imgRef}
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1800&q=80"
          alt="Coffee shop ambience"
          className="w-full h-[120%] object-cover -mt-[10%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/97 via-espresso/85 to-espresso/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-transparent" />
      </div>

      {/* ── Floating decorations ── */}
      <div className="absolute top-32 right-[12%] w-2 h-2 rounded-full bg-crema/20 animate-pulse" />
      <div className="absolute top-48 right-[22%] w-1 h-1 rounded-full bg-crema/30" />
      <div className="absolute top-64 right-[18%] w-3 h-3 rounded-full bg-rust/20 animate-pulse" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-48 left-[8%] w-2 h-2 rounded-full bg-crema/15 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-[5%] w-1 h-1 rounded-full bg-crema/25" />

      {/* ── Radial glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 65% 50%, rgba(217,165,76,0.07) 0%, transparent 60%)" }}
      />

      {/* ── Main Layout ── */}
      <div className="relative w-full max-w-[1800px] mx-auto px-6 md:px-16 lg:px-24 pt-28 pb-20 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

        {/* ── Left: Branding ── */}
        <div className="flex-1 max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-crema/30 bg-crema/5 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-crema animate-pulse" />
            <span className="font-mono text-xs tracking-widest uppercase text-crema">
              Mian Channu · Est. 2026 · Now Open
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-semibold text-5xl md:text-[4.5rem] leading-[1.05] mb-6">
            Welcome back,
            <br />
            <span className="text-crema italic font-medium relative">
              we missed you.
              <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 300 6" fill="none">
                <path d="M0 5 Q75 0 150 5 Q225 10 300 5" stroke="#d9a54c" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="text-cream-dim text-lg leading-relaxed max-w-md mb-10">
            Sign in to order your favourite brew, track deliveries, and save your preferences — all in one place.
          </p>

          {/* Quick links */}
          <div className="flex flex-wrap gap-4 items-center mb-14">
            <Link
              to="/menu"
              className="group relative overflow-hidden bg-rust hover:bg-rust-deep px-7 py-3.5 font-mono text-sm transition-all duration-300 flex items-center gap-3"
            >
              <span>View the menu</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <a
              href="#visit"
              className="font-mono text-sm border border-cream/25 hover:border-crema hover:text-crema px-7 py-3.5 transition-all duration-300 backdrop-blur-sm"
            >
              Reserve a table
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 pt-8 border-t border-cream/10">
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

        {/* ── Right: Login Form ── */}
        <div className="w-full max-w-md lg:max-w-[420px] relative">
          {/* Form glow */}
          <div
            className="absolute -inset-4 rounded-3xl pointer-events-none opacity-40"
            style={{ background: "radial-gradient(circle, rgba(217,165,76,0.12) 0%, transparent 70%)" }}
          />

          <div className="relative z-10 text-center mb-8">
            <div className="w-10 h-10 mx-auto rounded-full border border-crema/40 flex items-center justify-center font-mono text-[10px] text-crema mb-4 bg-crema/5">
              bh
            </div>
            <span className="font-mono text-[10px] tracking-widest uppercase text-crema mb-2 block">
              Welcome Back
            </span>
            <h2 className="font-display text-3xl text-cream">Sign in to your account</h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="relative z-10 bg-espresso-2/70 backdrop-blur-xl border border-cream/10 p-8 rounded-2xl shadow-2xl space-y-5"
          >
            {error && (
              <div className="bg-rust-deep/20 border border-rust/50 text-cream text-sm px-4 py-3 rounded-lg flex items-center gap-3">
                <span className="text-rust">⚠</span>
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-cream-dim block mb-2">
                Email address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-espresso border border-cream/15 px-4 py-3.5 rounded-lg text-sm outline-none focus:border-crema transition-colors placeholder:text-cream/20 text-cream"
              />
            </div>

            {/* Password */}
            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-cream-dim block mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-espresso border border-cream/15 px-4 py-3.5 rounded-lg text-sm outline-none focus:border-crema transition-colors placeholder:text-cream/20 text-cream"
              />
            </div>

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-3 text-cream-dim cursor-pointer group">
                <div className="relative flex items-center justify-center w-4 h-4">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="peer appearance-none w-4 h-4 border border-cream/30 rounded cursor-pointer checked:bg-crema checked:border-crema transition-all"
                  />
                  <svg className="absolute w-2.5 h-2.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-espresso" viewBox="0 0 14 10" fill="none">
                    <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="group-hover:text-cream transition-colors">Remember me</span>
              </label>
              <Link to="/forgot-password" className="font-mono text-xs text-crema hover:text-cream transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden bg-rust hover:bg-rust-deep py-4 rounded-lg font-mono text-sm transition-all duration-300 disabled:opacity-70 mt-2"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-cream">
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In →"
                )}
              </span>
              <div className="absolute inset-0 h-full w-0 bg-white/10 group-hover:w-full transition-all duration-300 ease-out" />
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex-1 h-px bg-cream/10" />
              <span className="font-mono text-[10px] text-cream-dim uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-cream/10" />
            </div>

            <p className="text-center text-sm text-cream-dim">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="text-crema hover:text-cream transition-colors underline underline-offset-4 decoration-crema/30 hover:decoration-crema"
              >
                Create one
              </Link>
            </p>
          </form>

          {/* Testimonial card below form */}
          <div className="relative z-10 mt-5 p-4 bg-espresso/60 backdrop-blur-md border border-cream/10 rounded-xl">
            <p className="text-cream-dim text-xs leading-relaxed italic">
              "I've tried specialty coffee in Dubai and London. Brew Haven holds its own."
            </p>
            <span className="font-mono text-[10px] uppercase tracking-widest text-crema mt-2 block">— Bilal M.</span>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-mono text-[10px] tracking-widest text-cream-dim uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-cream-dim to-transparent animate-pulse" />
      </div>

      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px #18110c inset !important;
          -webkit-text-fill-color: #f4ead9 !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </section>
  );
}