import { useState } from "react";
import { FaPhone, FaLocationDot, FaClock, FaPaperPlane, FaSquareArrowUpRight } from "react-icons/fa6";
import { useSettingsStore } from "../store/settingsStore";

export default function Visit() {
  const { settings } = useSettingsStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Inquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | null

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "Inquiry", message: "" });
      
      // Reset status message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #5c2014 0%, #8c3523 50%, #5c2014 100%)" }}>
      {/* Decorative large circles for organic shapes */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full border border-white/5 pointer-events-none" />
      
      {/* Subtle overlay texture/grid */}
      <div className="absolute inset-0 bg-black/[0.05] pointer-events-none" />

      <div className="relative max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-crema-soft font-semibold">Visit &amp; Contact</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream">
            Come sit <span className="italic font-medium text-crema-soft">with us.</span>
          </h2>
          <p className="text-sm text-cream/90 leading-relaxed">
            Walk-ins are always welcome. Have questions about our single-origin lots, reservations, or general feedback? Send us a message or visit our roastery.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* LEFT: Contact Form Card (Grid span 7) */}
          <div className="lg:col-span-7 bg-[#1c1410] border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h3 className="font-display text-2xl font-bold text-crema-soft">Send a Message</h3>
                <p className="text-xs text-cream-dim/60 mt-1">We typically reply within 2 hours during open hours.</p>
              </div>

              {submitStatus === "success" && (
                <div className="p-4 bg-green-500/10 border border-green-500/25 rounded-xl text-green-400 text-sm font-mono text-center animate-fade-in shadow-inner">
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] tracking-wider uppercase text-cream-dim/80">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Laiba Hanif"
                      className="w-full bg-[#120c09] border border-white/10 rounded-lg px-4 py-3 text-sm text-cream placeholder:text-cream-dim/30 focus:outline-none focus:border-crema focus:ring-1 focus:ring-crema/20 transition-all duration-300 shadow-inner"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] tracking-wider uppercase text-cream-dim/80">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="laiba@example.com"
                      className="w-full bg-[#120c09] border border-white/10 rounded-lg px-4 py-3 text-sm text-cream placeholder:text-cream-dim/30 focus:outline-none focus:border-crema focus:ring-1 focus:ring-crema/20 transition-all duration-300 shadow-inner"
                    />
                  </div>
                </div>

                {/* Subject Selection */}
                <div className="space-y-2">
                  <label className="block font-mono text-[10px] tracking-wider uppercase text-cream-dim/80">Subject / Purpose</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-[#120c09] border border-white/10 rounded-lg px-4 py-3 text-sm text-cream focus:outline-none focus:border-crema focus:ring-1 focus:ring-crema/20 transition-all duration-300 cursor-pointer shadow-inner"
                  >
                    <option value="Inquiry">General Inquiry</option>
                    <option value="Reservation">Table Reservation</option>
                    <option value="Feedback">Feedback &amp; Suggestions</option>
                    <option value="Catering">Catering / Events</option>
                  </select>
                </div>

                {/* Message field */}
                <div className="space-y-2">
                  <label className="block font-mono text-[10px] tracking-wider uppercase text-cream-dim/80">Your Message</label>
                  <textarea
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your request..."
                    className="w-full bg-[#120c09] border border-white/10 rounded-lg px-4 py-3 text-sm text-cream placeholder:text-cream-dim/30 focus:outline-none focus:border-crema focus:ring-1 focus:ring-crema/20 transition-all duration-300 resize-none shadow-inner"
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-crema hover:bg-crema-soft text-espresso font-mono text-xs tracking-widest uppercase font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(217,165,76,0.3)]"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-espresso border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message <FaPaperPlane className="text-[10px]" />
                    </>
                  )}
                </button>
              </form>
            </div>
            
            {/* Quick Contacts details */}
            <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#120c09] border border-white/10 flex items-center justify-center text-crema shadow-inner">
                  <FaPhone className="text-sm" />
                </div>
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-cream-dim/50">Call Us</div>
                  <div className="text-sm text-cream font-medium">{settings.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#120c09] border border-white/10 flex items-center justify-center text-crema shadow-inner">
                  <FaLocationDot className="text-sm" />
                </div>
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-cream-dim/50">Roastery Address</div>
                  <div className="text-sm text-cream font-medium">{settings.location}</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Opening Hours & Map Cards (Grid span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-8 justify-between">
            
            {/* Opening Hours card */}
            <div className="bg-[#1c1410] border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                <FaClock className="text-crema-soft text-lg" />
                <h3 className="font-display text-xl font-bold text-cream">Opening Hours</h3>
              </div>
              <div className="space-y-1 font-mono text-xs">
                <div className="flex justify-between items-center border-b border-white/5 py-4 text-crema-soft">
                  <span>Opening Hours</span>
                  <span className="tabular-nums font-semibold">{settings.openingHours}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 py-4 text-cream-dim/70">
                  <span>Established</span>
                  <span className="tabular-nums font-semibold">{settings.established}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-6 flex items-center gap-2 bg-green-500/5 border border-green-500/10 rounded-lg p-3">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-[10px] text-green-400 uppercase tracking-wider">
                  We're open right now — come on in!
                </span>
              </div>
            </div>

            {/* Map location card */}
            <div className="bg-[#1c1410] border border-white/10 rounded-2xl p-8 flex-1 flex flex-col justify-between gap-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="space-y-1">
                  <h3 className="font-display text-xl font-bold text-cream">Our Location</h3>
                  <p className="text-xs text-cream-dim/60">Come visit us in {settings.location.split(",")[0]}</p>
                </div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(settings.location)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[10px] uppercase tracking-wider text-crema-soft hover:text-cream flex items-center gap-1 transition-colors duration-300"
                >
                  Directions <FaSquareArrowUpRight className="text-xs" />
                </a>
              </div>

              {/* Colorful Google Map (No dark filter applied) */}
              <div className="relative w-full h-[240px] md:h-[280px] lg:h-full min-h-[220px] rounded-xl overflow-hidden border border-white/10 shadow-inner group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55075.4678121639!2d72.3259929851624!3d30.443916964177583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393d325754b2d159%3A0x679c13b59df95b3d!2sMian%20Channu%2C%20Khanewal%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1716380000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Brew Haven Map"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none border border-white/10 group-hover:border-crema/20 transition-colors duration-300 rounded-xl" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
