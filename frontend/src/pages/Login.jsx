import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState({ email: "", password: "", remember: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        password: formData.password
      });
      localStorage.setItem("token", data.token);
      login(data);
      if (data.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex bg-espresso">
      {/* Left side: Image */}
      <div className="hidden lg:block lg:w-1/3 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=1200&q=80"
          alt="Premium coffee latte art"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/80 via-transparent to-transparent" />
        <div className="absolute bottom-12 left-12 max-w-md">
          <div className="w-12 h-12 rounded-full border border-crema/40 flex items-center justify-center font-mono text-xs text-crema backdrop-blur-md mb-6 bg-espresso/20">
            bh
          </div>
          <h2 className="font-display text-4xl text-cream leading-tight mb-4 shadow-sm">
            The perfect cup,<br />
            <span className="italic text-crema">waiting for you.</span>
          </h2>
          <p className="text-cream-dim/90 text-sm leading-relaxed backdrop-blur-sm p-4 bg-espresso/30 rounded-xl border border-white/5">
            "I've tried specialty coffee in Dubai and London. Brew Haven holds its own."
            <br />
            <span className="font-mono text-[10px] uppercase tracking-widest text-crema mt-2 block">— Bilal M.</span>
          </p>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="w-full lg:w-2/3 flex items-center justify-center px-6 py-12 sm:p-12 lg:p-24 relative">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{ background: "radial-gradient(circle at center, rgba(217,165,76,0.15) 0%, transparent 60%)" }}
        />

        <div className="w-full max-w-md relative z-10">
          
          <div className="text-center mb-10">
            {/* Logo for mobile or just extra branding */}
            <div className="w-10 h-10 mx-auto rounded-full border border-crema/40 flex items-center justify-center font-mono text-[10px] text-crema mb-5 bg-crema/5">
              bh
            </div>
            <span className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-crema mb-3 block">Welcome Back</span>
            <h1 className="font-display text-3xl sm:text-4xl mb-3 text-cream">Sign in to your account</h1>
            <p className="text-cream-dim text-sm px-4 sm:px-0">Order ahead, track deliveries, and save your favorites.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-espresso-2/60 backdrop-blur-md border border-cream/10 p-6 sm:p-10 rounded-2xl shadow-2xl space-y-6">
            {error && (
              <div className="bg-rust-deep/20 border border-rust/50 text-cream text-sm px-4 py-3 rounded-lg flex items-center gap-3">
                <span className="text-rust">⚠</span>
                {error}
              </div>
            )}
            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-cream-dim block mb-2">Email address</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full bg-espresso-2 border border-cream/15 px-4 py-3.5 rounded-lg text-sm outline-none focus:border-crema transition-colors placeholder:text-cream/20"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-cream-dim block mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-espresso-2 border border-cream/15 px-4 py-3.5 rounded-lg text-sm outline-none focus:border-crema transition-colors placeholder:text-cream/20"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm mt-2">
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

            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden bg-rust hover:bg-rust-deep py-4 rounded-lg font-mono text-sm transition-all duration-300 disabled:opacity-70 mt-4"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
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
          </form>

          <p className="text-center text-sm text-cream-dim mt-8">
            Don't have an account?{" "}
            <Link to="/register" className="text-crema hover:text-cream transition-colors underline underline-offset-4 decoration-crema/30 hover:decoration-crema">
              Create one
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        /* Fix for browser autofill background color */
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active{
            -webkit-box-shadow: 0 0 0 30px #1a1614 inset !important;
            -webkit-text-fill-color: #f4ebd8 !important;
            transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </section>
  );
}