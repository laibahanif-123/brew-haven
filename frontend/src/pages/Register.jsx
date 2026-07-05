import { useState } from "react";
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
        password: formData.password
      });
      localStorage.setItem("token", data.token);
      login(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Error creating account. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-row-reverse bg-espresso">
      {/* Right side: Image (Reversed for variation from login) */}
      <div className="hidden lg:block lg:w-1/3 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1200&q=80"
          alt="Premium pour over coffee"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-espresso/80 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 p-12 text-right max-w-md">
          <div className="w-12 h-12 rounded-full border border-crema/40 flex items-center justify-center font-mono text-xs text-crema backdrop-blur-md mb-6 bg-espresso/20 ml-auto">
            bh
          </div>
          <h2 className="font-display text-4xl text-cream leading-tight mb-4 shadow-sm">
            Join the haven,<br />
            <span className="italic text-crema">skip the line.</span>
          </h2>
          <p className="text-cream-dim/90 text-sm leading-relaxed backdrop-blur-sm p-4 bg-espresso/30 rounded-xl border border-white/5 text-left ml-auto inline-block">
            "It's not just coffee — it's the whole experience. The space, the smell, the people. I work from here every Monday."
            <br />
            <span className="font-mono text-[10px] uppercase tracking-widest text-crema mt-2 block text-right">— Sara K.</span>
          </p>
        </div>
      </div>

      {/* Left side: Form */}
      <div className="w-full lg:w-2/3 flex items-center justify-center px-6 py-12 sm:p-12 relative overflow-y-auto max-h-screen custom-scrollbar">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{ background: "radial-gradient(circle at center, rgba(124,47,31,0.15) 0%, transparent 60%)" }}
        />

        <div className="w-full max-w-md relative z-10 py-12">
          
          <div className="text-center mb-10">
            <div className="w-10 h-10 mx-auto rounded-full border border-crema/40 flex items-center justify-center font-mono text-[10px] text-crema mb-5 bg-crema/5">
              bh
            </div>
            <span className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-crema mb-3 block">Join Us</span>
            <h1 className="font-display text-3xl sm:text-4xl mb-3 text-cream">Create your account</h1>
            <p className="text-cream-dim text-sm px-4 sm:px-0">Takes less than a minute. Earn beans with every order.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-espresso-2/60 backdrop-blur-md border border-cream/10 p-6 sm:p-10 rounded-2xl shadow-2xl space-y-5">
            {error && (
              <div className="bg-rust-deep/20 border border-rust/50 text-cream text-sm px-4 py-3 rounded-lg flex items-center gap-3">
                <span className="text-rust">⚠</span>
                {error}
              </div>
            )}

            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-cream-dim block mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Ayesha Raza"
                className="w-full bg-espresso-2 border border-cream/15 px-4 py-3.5 rounded-lg text-sm outline-none focus:border-crema transition-colors placeholder:text-cream/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-cream-dim block mb-2">Email</label>
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
              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-cream-dim block mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="03xx-xxxxxxx"
                  className="w-full bg-espresso-2 border border-cream/15 px-4 py-3.5 rounded-lg text-sm outline-none focus:border-crema transition-colors placeholder:text-cream/20"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-cream-dim block mb-2">Password</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
                className="w-full bg-espresso-2 border border-cream/15 px-4 py-3.5 rounded-lg text-sm outline-none focus:border-crema transition-colors placeholder:text-cream/20"
              />
            </div>

            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-cream-dim block mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                className="w-full bg-espresso-2 border border-cream/15 px-4 py-3.5 rounded-lg text-sm outline-none focus:border-crema transition-colors placeholder:text-cream/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden bg-rust hover:bg-rust-deep py-4 rounded-lg font-mono text-sm transition-all duration-300 disabled:opacity-70 mt-6"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
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
          </form>

          <p className="text-center text-sm text-cream-dim mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-crema hover:text-cream transition-colors underline underline-offset-4 decoration-crema/30 hover:decoration-crema">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(205, 191, 168, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(205, 191, 168, 0.2); }
        
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