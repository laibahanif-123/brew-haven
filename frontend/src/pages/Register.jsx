import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import api from "../services/api";
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";

export default function Register() {
  const navigate = useNavigate();
  const login    = useAuthStore((s) => s.login);
  const imgRef   = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", password: "", confirmPassword: "",
  });
  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

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
        name:     formData.fullName,
        email:    formData.email,
        phone:    formData.phone,
        password: formData.password,
      });
      localStorage.setItem("token", data.token);
      login(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Error creating account. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-espresso">

      {/* ══ LEFT — Coffee Image ══ */}
      <div className="relative hidden lg:flex w-[42%] flex-shrink-0 overflow-hidden">
        <img
          ref={imgRef}
          src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1400&q=90"
          alt="Coffee atmosphere"
          className="absolute inset-0 w-full h-full object-cover scale-110"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/55 to-espresso/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-espresso" />

        {/* BH Badge */}
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
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-crema mb-4">☕ Brew Haven</p>
          <h2 className="font-display text-4xl text-cream leading-snug mb-6">
            Join the haven,<br />
            <span className="text-crema italic">skip the line.</span>
          </h2>
          <div className="w-12 h-px bg-crema/40 mb-6" />
          <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-5">
            <p className="text-cream/55 text-sm italic leading-relaxed mb-4">
              "It's not just coffee — it's the whole experience. The space, the smell, the people. I work from here every Monday."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-crema/20 border border-crema/30 flex items-center justify-center font-display text-crema text-sm">
                S
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-widest text-crema uppercase">Sara K.</p>
                <p className="font-mono text-[9px] text-cream/30 tracking-wider">Verified Customer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ RIGHT — Form ══ */}
      <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto px-8 py-8 relative">

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-crema/[0.03] blur-3xl" />
        </div>

        {/* Mobile Logo */}
        <div className="lg:hidden mb-6">
          <Link to="/" className="no-underline">
            <div className="w-12 h-12 rounded-full border border-crema/40 bg-espresso-2 flex items-center justify-center font-mono text-sm tracking-widest text-crema">
              bh
            </div>
          </Link>
        </div>

        <div
          className="w-full max-w-sm relative z-10"
          style={{ animation: mounted ? "fadeUp 0.7s ease both" : "none" }}
        >
          {/* Desktop Logo */}
          <div className="hidden lg:flex justify-center mb-6">
            <Link to="/" className="no-underline">
              <div className="w-11 h-11 rounded-full border border-crema/40 bg-espresso-2 flex items-center justify-center font-mono text-[11px] tracking-widest text-crema hover:scale-110 transition-transform">
                bh
              </div>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-7">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-crema mb-2">Join Us</p>
            <h1 className="font-display text-3xl text-cream mb-2">Create your account</h1>
            <p className="text-cream/35 text-sm">Takes less than a minute.</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-center gap-3 bg-rust/10 border border-rust/25 rounded-xl px-4 py-3">
              <span className="text-rust text-lg">⚠</span>
              <p className="text-rust text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name */}
            <div>
              <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-cream/40 mb-2">Full Name</label>
              <div className="relative group">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/25 group-focus-within:text-crema transition-colors" size={14} />
                <input
                  type="text" name="fullName" required
                  value={formData.fullName} onChange={handleChange}
                  placeholder="Ayesha Raza"
                  className="w-full bg-espresso-2 border border-cream/10 focus:border-crema/50 rounded-xl pl-10 pr-4 py-3 text-sm text-cream placeholder-cream/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* Email + Phone row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-cream/40 mb-2">Email</label>
                <div className="relative group">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/25 group-focus-within:text-crema transition-colors" size={13} />
                  <input
                    type="email" name="email" required
                    value={formData.email} onChange={handleChange}
                    placeholder="you@email.com"
                    className="w-full bg-espresso-2 border border-cream/10 focus:border-crema/50 rounded-xl pl-9 pr-3 py-3 text-sm text-cream placeholder-cream/20 outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-cream/40 mb-2">Phone</label>
                <div className="relative group">
                  <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/25 group-focus-within:text-crema transition-colors" size={13} />
                  <input
                    type="tel" name="phone" required
                    value={formData.phone} onChange={handleChange}
                    placeholder="03xx-xxxxxxx"
                    className="w-full bg-espresso-2 border border-cream/10 focus:border-crema/50 rounded-xl pl-9 pr-3 py-3 text-sm text-cream placeholder-cream/20 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-cream/40 mb-2">Password</label>
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/25 group-focus-within:text-crema transition-colors" size={14} />
                <input
                  type={showPass ? "text" : "password"} name="password" required
                  value={formData.password} onChange={handleChange}
                  placeholder="Min. 8 characters"
                  className="w-full bg-espresso-2 border border-cream/10 focus:border-crema/50 rounded-xl pl-10 pr-11 py-3 text-sm text-cream placeholder-cream/20 outline-none transition-all"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/25 hover:text-crema transition-colors">
                  {showPass ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-cream/40 mb-2">Confirm Password</label>
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/25 group-focus-within:text-crema transition-colors" size={14} />
                <input
                  type={showConfirm ? "text" : "password"} name="confirmPassword" required
                  value={formData.confirmPassword} onChange={handleChange}
                  placeholder="Re-enter password"
                  className="w-full bg-espresso-2 border border-cream/10 focus:border-crema/50 rounded-xl pl-10 pr-11 py-3 text-sm text-cream placeholder-cream/20 outline-none transition-all"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/25 hover:text-crema transition-colors">
                  {showConfirm ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              className={`w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-mono text-sm tracking-widest uppercase transition-all duration-300 mt-1 ${
                loading
                  ? "bg-rust/40 text-cream/40 cursor-not-allowed"
                  : "bg-rust hover:bg-rust-deep text-cream shadow-lg shadow-rust/25 hover:shadow-rust/40 hover:scale-[1.01] active:scale-[0.99]"
              }`}
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin" /> Creating...</>
              ) : (
                <>Create Account <FiArrowRight size={14} /></>
              )}
            </button>
          </form>

          {/* Divider + Login link */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-cream/8" />
            <span className="font-mono text-[9px] tracking-widest text-cream/20 uppercase">or</span>
            <div className="flex-1 h-px bg-cream/8" />
          </div>
          <p className="text-center text-sm text-cream/35">
            Already have an account?{" "}
            <Link to="/login" className="text-crema hover:text-crema-soft underline underline-offset-4 decoration-crema/30 transition-all">
              Sign in
            </Link>
          </p>
        </div>
      </div>

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