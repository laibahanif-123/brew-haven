import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import api from "../services/api";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const imgRef = useRef(null);

  const [formData, setFormData] = useState({ email: "", password: "", remember: false });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      if (imgRef.current) {
        imgRef.current.style.transform = `scale(1.1) translateY(${window.scrollY * 0.08}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
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

  return (
    <div className="flex h-screen overflow-hidden bg-espresso">

      {/* ══════════════════════════════
          LEFT PANEL — Coffee Visual
      ══════════════════════════════ */}
      <div className="relative hidden lg:flex w-[45%] flex-shrink-0 overflow-hidden">
        {/* Parallax Image */}
        <img
          ref={imgRef}
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=90"
          alt="Coffee atmosphere"
          className="absolute inset-0 w-full h-full object-cover scale-110"
          style={{ transformOrigin: "center center", transition: "transform 0.1s linear" }}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/60 to-espresso/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-espresso" />

        {/* Top-left BH badge */}
        <Link to="/" className="absolute top-8 left-8 z-20 no-underline">
          <div className="w-11 h-11 rounded-full border border-crema/40 bg-espresso/70 backdrop-blur-md flex items-center justify-center font-mono text-[11px] tracking-widest text-crema hover:scale-110 transition-transform">
            bh
          </div>
        </Link>

        {/* Bottom content */}
        <div
          className="absolute bottom-0 left-0 right-0 p-10 z-20"
          style={{ animation: mounted ? "slideInLeft 0.8s ease both" : "none", animationDelay: "0.2s" }}
        >
          {/* Label */}
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-crema mb-4">
            ☕ Brew Haven
          </p>

          {/* Tagline */}
          <h2 className="font-display text-4xl text-cream leading-snug mb-6">
            Your perfect cup,<br />
            <span className="text-crema italic">waiting for you.</span>
          </h2>

          {/* Divider */}
          <div className="w-12 h-px bg-crema/40 mb-6" />

          {/* Testimonial */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-5">
            <p className="text-cream/60 text-sm italic leading-relaxed mb-4">
              "I've tried specialty coffee in Dubai and London. Brew Haven holds its own — every single time."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-crema/20 border border-crema/30 flex items-center justify-center font-display text-crema text-sm">
                B
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-widest text-crema uppercase">Bilal M.</p>
                <p className="font-mono text-[9px] text-cream/30 tracking-wider">Verified Customer</p>
              </div>
            </div>
          </div>

          {/* Feature dots */}
          <div className="flex items-center gap-6 mt-6">
            {["Order Ahead", "Live Tracking", "Save Favorites"].map((f) => (
              <div key={f} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-crema" />
                <span className="font-mono text-[9px] tracking-wider text-cream/40 uppercase">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════
          RIGHT PANEL — Login Form
      ══════════════════════════════ */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 overflow-hidden relative">

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-crema/[0.03] blur-3xl" />
        </div>

        {/* Mobile Logo */}
        <div className="lg:hidden mb-8">
          <Link to="/" className="no-underline">
            <div className="w-12 h-12 rounded-full border border-crema/40 bg-espresso-2 flex items-center justify-center font-mono text-sm tracking-widest text-crema">
              bh
            </div>
          </Link>
        </div>

        {/* Form container */}
        <div
          className="w-full max-w-sm relative z-10"
          style={{ animation: mounted ? "fadeUp 0.7s ease both" : "none", animationDelay: "0.1s" }}
        >
          {/* Desktop BH logo */}
          <div className="hidden lg:flex justify-center mb-8">
            <Link to="/" className="no-underline">
              <div className="w-12 h-12 rounded-full border border-crema/40 bg-espresso-2 flex items-center justify-center font-mono text-sm tracking-widest text-crema hover:scale-110 transition-transform">
                bh
              </div>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-10">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-crema mb-3">
              Welcome Back
            </p>
            <h1 className="font-display text-4xl text-cream leading-tight mb-3">
              Sign in to your<br />account
            </h1>
            <p className="text-cream/35 text-sm leading-relaxed">
              Order ahead, track deliveries, save your favorites.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              className="mb-6 flex items-center gap-3 bg-rust/10 border border-rust/25 rounded-xl px-4 py-3"
              style={{ animation: "scaleIn 0.3s ease both" }}
            >
              <span className="text-rust text-lg">⚠</span>
              <p className="text-rust text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-cream/40 mb-2">
                Email Address
              </label>
              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/25 group-focus-within:text-crema transition-colors" size={15} />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full bg-espresso-2 border border-cream/10 focus:border-crema/50 rounded-xl pl-11 pr-4 py-3.5 text-sm text-cream placeholder-cream/20 outline-none transition-all duration-200 focus:bg-espresso-2/80"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-cream/40 mb-2">
                Password
              </label>
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/25 group-focus-within:text-crema transition-colors" size={15} />
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-espresso-2 border border-cream/10 focus:border-crema/50 rounded-xl pl-11 pr-12 py-3.5 text-sm text-cream placeholder-cream/20 outline-none transition-all duration-200 focus:bg-espresso-2/80"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/25 hover:text-crema transition-colors"
                >
                  {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded border transition-all duration-200 flex items-center justify-center ${
                      formData.remember
                        ? "bg-crema border-crema"
                        : "bg-espresso-2 border-cream/20 group-hover:border-crema/40"
                    }`}
                  >
                    {formData.remember && (
                      <svg viewBox="0 0 10 8" className="w-2.5 h-2.5 fill-none stroke-espresso" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 4L3.5 7L9 1" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-cream/40 text-xs group-hover:text-cream/60 transition-colors">Remember me</span>
              </label>

              <Link
                to="/forgot-password"
                className="font-mono text-[11px] text-crema/70 hover:text-crema transition-colors no-underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-mono text-sm tracking-widest uppercase transition-all duration-300 ${
                loading
                  ? "bg-rust/40 text-cream/40 cursor-not-allowed"
                  : "bg-rust hover:bg-rust-deep text-cream shadow-lg shadow-rust/25 hover:shadow-rust/40 hover:scale-[1.01] active:scale-[0.99]"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <FiArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-7">
            <div className="flex-1 h-px bg-cream/8" />
            <span className="font-mono text-[9px] tracking-widest text-cream/20 uppercase">or</span>
            <div className="flex-1 h-px bg-cream/8" />
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-cream/35">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-crema hover:text-crema-soft underline underline-offset-4 decoration-crema/30 hover:decoration-crema/60 transition-all"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* Autofill override */}
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 60px #241a13 inset !important;
          -webkit-text-fill-color: #f4ead9 !important;
          transition: background-color 9999s;
        }
        input::placeholder { color: rgba(244,234,217,0.18) !important; }
      `}</style>
    </div>
  );
}