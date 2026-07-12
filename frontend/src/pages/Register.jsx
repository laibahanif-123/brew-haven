import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post("/users/register", {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
      localStorage.setItem("token", data.token);
      login(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Error creating account. Please try again.");
      setLoading(false);
    }
  };

  const perks = [
    { icon: "☕", title: "Order Ahead", desc: "Skip the queue, pick up hot." },
    { icon: "📦", title: "Track Orders", desc: "Live delivery updates." },
    { icon: "❤️", title: "Save Favourites", desc: "Your usual, one tap away." },
    { icon: "🎁", title: "Earn Rewards", desc: "Beans with every purchase." },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* ── Parallax Background ── */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imgRef}
          src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1800&q=80"
          alt="Premium pour over coffee"
          className="w-full h-[120%] object-cover -mt-[10%]"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-espresso/97 via-espresso/85 to-espresso/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-transparent" />
      </div>

      {/* ── Floating decorations ── */}
      <div className="absolute top-32 left-[12%] w-2 h-2 rounded-full bg-crema/20 animate-pulse" />
      <div className="absolute top-52 left-[22%] w-1 h-1 rounded-full bg-crema/30" />
      <div className="absolute top-72 left-[17%] w-3 h-3 rounded-full bg-rust/20 animate-pulse" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-48 right-[8%] w-2 h-2 rounded-full bg-crema/15 animate-pulse" style={{ animationDelay: "1s" }} />

      {/* ── Radial glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 35% 50%, rgba(124,47,31,0.08) 0%, transparent 60%)" }}
      />

      {/* ── Main Layout ── */}
      <div className="relative w-full max-w-[1800px] mx-auto px-6 md:px-16 lg:px-24 pt-28 pb-20 flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">

        {/* ── Right: Branding ── */}
        <div className="flex-1 max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-crema/30 bg-crema/5 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-crema animate-pulse" />
            <span className="font-mono text-xs tracking-widest uppercase text-crema">
              Mian Channu · Est. 2026 · Free to Join
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-semibold text-5xl md:text-[4.5rem] leading-[1.05] mb-6">
            Join the haven,
            <br />
            <span className="text-crema italic font-medium relative">
              skip the line.
              <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 300 6" fill="none">
                <path d="M0 5 Q75 0 150 5 Q225 10 300 5" stroke="#d9a54c" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="text-cream-dim text-lg leading-relaxed max-w-md mb-10">
            Takes less than a minute. Get access to exclusive perks, order tracking, and your personal brew history.
          </p>

          {/* Perk cards */}
          <div className="grid grid-cols-2 gap-3 mb-10">
            {perks.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-espresso/60 backdrop-blur-sm border border-cream/10 rounded-xl p-4 hover:border-crema/30 transition-colors"
              >
                <span className="text-xl mb-2 block">{icon}</span>
                <p className="font-mono text-xs text-cream uppercase tracking-wider mb-1">{title}</p>
                <p className="text-cream-dim text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="p-4 bg-espresso/50 backdrop-blur-sm border border-cream/10 rounded-xl">
            <p className="text-cream-dim text-sm leading-relaxed italic">
              "It's not just coffee — it's the whole experience. The space, the smell, the people. I work from here every Monday."
            </p>
            <span className="font-mono text-[10px] uppercase tracking-widest text-crema mt-2 block">— Sara K.</span>
          </div>
        </div>

        {/* ── Left: Register Form ── */}
        <div className="w-full max-w-md lg:max-w-[420px] relative">
          {/* Form glow */}
          <div
            className="absolute -inset-4 rounded-3xl pointer-events-none opacity-40"
            style={{ background: "radial-gradient(circle, rgba(124,47,31,0.12) 0%, transparent 70%)" }}
          />

          <div className="relative z-10 text-center mb-8">
            <div className="w-10 h-10 mx-auto rounded-full border border-crema/40 flex items-center justify-center font-mono text-[10px] text-crema mb-4 bg-crema/5">
              bh
            </div>
            <span className="font-mono text-[10px] tracking-widest uppercase text-crema mb-2 block">
              Join Us
            </span>
            <h2 className="font-display text-3xl text-cream">Create your account</h2>
            <p className="text-cream-dim text-sm mt-2">Takes less than a minute.</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="relative z-10 bg-espresso-2/70 backdrop-blur-xl border border-cream/10 p-8 rounded-2xl shadow-2xl space-y-4"
          >
            {error && (
              <div className="bg-rust-deep/20 border border-rust/50 text-cream text-sm px-4 py-3 rounded-lg flex items-center gap-3">
                <span className="text-rust">⚠</span>
                {error}
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-cream-dim block mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Ayesha Raza"
                className="w-full bg-espresso border border-cream/15 px-4 py-3.5 rounded-lg text-sm outline-none focus:border-crema transition-colors placeholder:text-cream/20 text-cream"
              />
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-cream-dim block mb-2">Email</label>
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
              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-cream-dim block mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="03xx-xxxxxxx"
                  className="w-full bg-espresso border border-cream/15 px-4 py-3.5 rounded-lg text-sm outline-none focus:border-crema transition-colors placeholder:text-cream/20 text-cream"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-cream-dim block mb-2">Password</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
                className="w-full bg-espresso border border-cream/15 px-4 py-3.5 rounded-lg text-sm outline-none focus:border-crema transition-colors placeholder:text-cream/20 text-cream"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-cream-dim block mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                className="w-full bg-espresso border border-cream/15 px-4 py-3.5 rounded-lg text-sm outline-none focus:border-crema transition-colors placeholder:text-cream/20 text-cream"
              />
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
                    Creating account...
                  </>
                ) : (
                  "Create Account →"
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
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-crema hover:text-cream transition-colors underline underline-offset-4 decoration-crema/30 hover:decoration-crema"
              >
                Sign in
              </Link>
            </p>
          </form>
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