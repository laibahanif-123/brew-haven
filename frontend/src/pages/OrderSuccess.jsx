import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function OrderSuccess() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-8 py-24 bg-espresso relative overflow-hidden">
      
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rust/10 rounded-full blur-[100px]" />
      </div>

      <div 
        className={`w-full max-w-[500px] relative z-10 transition-all duration-1000 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Receipt Card */}
        <div className="bg-espresso-2 border border-cream/10 rounded-2xl p-10 md:p-12 shadow-2xl relative overflow-hidden text-center">
          
          {/* Top Edge styling (like a receipt) */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-crema to-transparent opacity-50" />
          
          {/* Animated Checkmark */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
              <div className="w-20 h-20 rounded-full border border-green-500/30 bg-green-500/10 flex items-center justify-center relative z-10 backdrop-blur-sm">
                <svg 
                  className={`w-8 h-8 text-green-400 transition-all duration-700 delay-300 ${mounted ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="font-display text-4xl mb-4 text-cream">Order Confirmed</h1>
          
          <p className="text-cream-dim text-sm max-w-sm mx-auto mb-8 leading-relaxed">
            Your coffee is being crafted with care. We'll send you an update when it's ready for delivery.
          </p>
          
          {/* Mock Order Details */}
          <div className="bg-espresso/50 rounded-xl p-6 border border-cream/5 mb-10 text-left">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-cream/10">
              <span className="font-mono text-[10px] tracking-widest uppercase text-cream-dim">Order #</span>
              <span className="font-mono text-xs text-crema">BH-{Math.floor(1000 + Math.random() * 9000)}</span>
            </div>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-cream/10">
              <span className="font-mono text-[10px] tracking-widest uppercase text-cream-dim">Est. Delivery</span>
              <span className="font-mono text-xs text-cream">35 - 45 mins</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-mono text-[10px] tracking-widest uppercase text-cream-dim">Status</span>
              <span className="font-mono text-[10px] tracking-widest uppercase text-green-400 bg-green-400/10 px-2 py-1 rounded">Preparing</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/menu" 
              className="bg-rust hover:bg-rust-deep text-cream px-8 py-3.5 rounded-lg font-mono text-sm transition-all duration-300 shadow-lg flex-1"
            >
              Order More
            </Link>
            <Link 
              to="/" 
              className="border border-cream/20 hover:border-crema hover:text-crema text-cream-dim px-8 py-3.5 rounded-lg font-mono text-sm transition-all duration-300 flex-1"
            >
              Back to Home
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}