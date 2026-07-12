import { Link } from "react-router-dom";

const steps = [
  {
    num: "01",
    icon: "🛒",
    title: "Browse & Order",
    desc: "Explore our full menu of single-origin coffees, specialty drinks, cakes, and snacks. Add your favourites to cart.",
    cta: { label: "View Menu", to: "/menu" },
  },
  {
    num: "02",
    icon: "✅",
    title: "We Confirm",
    desc: "Your order is instantly received by our team. We prepare everything fresh — pulled to order, never pre-made.",
    cta: null,
  },
  {
    num: "03",
    icon: "📦",
    title: "Track Live",
    desc: "Watch your order status update in real-time — from Pending → Preparing → Ready. No waiting in the dark.",
    cta: { label: "Your Dashboard", to: "/dashboard" },
  },
  {
    num: "04",
    icon: "☕",
    title: "Enjoy",
    desc: "Pick up your order or enjoy it at our cafe. Every cup crafted with intention — sip slowly, no rush.",
    cta: null,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-28 relative overflow-hidden" style={{ background: "#19120a" }}>
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(217,165,76,0.05) 0%, transparent 70%)" }}
      />

      <div className="max-w-[1800px] mx-auto px-8 md:px-16 lg:px-24 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-crema block mb-3">
              Simple Process
            </span>
            <h2 className="font-display text-4xl md:text-6xl leading-tight">
              Order in <span className="text-crema italic font-medium">4 steps</span>
            </h2>
          </div>
          <p className="text-cream-dim text-sm max-w-xs leading-relaxed md:text-right">
            From browsing to your first sip — the Brew Haven ordering experience is built to be effortless.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line (desktop) */}
          <div className="absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-crema/20 to-transparent hidden lg:block pointer-events-none" />

          {steps.map((step, i) => (
            <div
              key={step.num}
              className="group relative bg-espresso-2/30 border border-cream/8 hover:border-crema/25 rounded-2xl p-7 transition-all duration-500 hover:bg-espresso-2/60"
            >
              {/* Step number */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] tracking-widest uppercase text-cream/20">
                  Step {step.num}
                </span>
                {/* Connector dot */}
                <div className={`w-3 h-3 rounded-full border-2 transition-colors duration-300 ${
                  i === 0 ? "bg-crema border-crema" : "border-cream/20 group-hover:border-crema/60"
                }`} />
              </div>

              {/* Icon */}
              <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300 inline-block">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl mb-3 group-hover:text-crema transition-colors duration-300">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-cream-dim text-sm leading-relaxed mb-6">
                {step.desc}
              </p>

              {/* CTA */}
              {step.cta && (
                <Link
                  to={step.cta.to}
                  className="inline-flex items-center gap-2 font-mono text-xs text-crema border border-crema/30 hover:bg-crema hover:text-espresso px-4 py-2 rounded-lg transition-all duration-300"
                >
                  {step.cta.label}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              )}

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-crema/50 to-transparent transition-all duration-500 rounded-full" />
            </div>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-2xl border border-crema/15 bg-crema/[0.03] backdrop-blur-sm">
          <div>
            <h3 className="font-display text-2xl text-cream mb-1">
              Ready to order your first cup?
            </h3>
            <p className="text-cream-dim text-sm">
              Create an account in under a minute and start ordering.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link
              to="/menu"
              className="group overflow-hidden relative bg-rust hover:bg-rust-deep px-7 py-3.5 font-mono text-sm transition-all duration-300 flex items-center gap-2"
            >
              <span>Browse Menu</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link
              to="/register"
              className="font-mono text-sm border border-cream/25 hover:border-crema hover:text-crema px-7 py-3.5 transition-all duration-300"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
