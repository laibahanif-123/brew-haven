import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import api from "../services/api";

const paymentMethods = [
  { id: "cod", label: "Cash on Delivery", icon: "💵" },
  { id: "jazzcash", label: "JazzCash", icon: "📱" },
  { id: "easypaisa", label: "Easypaisa", icon: "🟢" },
  { id: "card", label: "Credit / Debit Card", icon: "💳" },
];

export default function Checkout() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [payment, setPayment] = useState("cod");
  const [placing, setPlacing] = useState(false);

  const subtotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);
  const delivery = subtotal > 0 ? 150 : 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + tax;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [error, setError] = useState("");

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setPlacing(true);
    setError("");

    try {
      const orderItems = items.map((item) => ({
        name: item.name,
        qty: item.qty,
        price: item.price,
        img: item.img,
        product: item.id, 
      }));

      const orderPayload = {
        orderItems,
        shippingAddress: form,
        paymentMethod: payment,
        totalPrice: total,
      };

      await api.post("/orders", orderPayload);
      
      clearCart();
      navigate("/order-success");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order. Please try again.");
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center px-8 pt-24 bg-espresso">
        <h1 className="font-display text-4xl mb-4 text-cream">Nothing to check out</h1>
        <p className="text-cream-dim text-sm mb-8">Your cart is empty — add something from the menu first.</p>
        <Link 
          to="/menu" 
          className="bg-rust hover:bg-rust-deep text-cream px-10 py-4 font-mono text-sm transition-all duration-300 rounded-sm hover:shadow-[0_0_15px_rgba(161,64,43,0.4)]"
        >
          Browse the menu →
        </Link>
      </section>
    );
  }

  return (
    <section className="pt-36 pb-24 min-h-screen bg-espresso">
      <div className="max-w-[1800px] mx-auto px-8 md:px-16 lg:px-24">
        
        <div className="mb-12">
          <Link to="/cart" className="font-mono text-xs text-cream-dim hover:text-crema mb-4 inline-block transition-colors">← Back to Cart</Link>
          <h1 className="font-display text-4xl md:text-5xl text-cream">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-16">
          
          {/* LEFT: FORM */}
          <div>
            <form onSubmit={handlePlaceOrder} className="space-y-10">
              {error && (
                <div className="bg-rust-deep/20 border border-rust/50 text-cream text-sm px-4 py-3 rounded-lg flex items-center gap-3">
                  <span className="text-rust">⚠</span>
                  {error}
                </div>
              )}
              
              {/* Shipping Details */}
              <div className="bg-espresso-2/50 border border-cream/10 rounded-xl p-8">
                <h2 className="font-mono text-xs uppercase tracking-widest text-crema mb-6 flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-crema/20 flex items-center justify-center text-[10px]">1</span> 
                  Shipping Details
                </h2>
                
                <div className="space-y-5">
                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-wider text-cream-dim block mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Ayesha Raza"
                      className="w-full bg-espresso-2 border border-cream/15 px-4 py-3.5 rounded-lg text-sm outline-none focus:border-crema transition-colors placeholder:text-cream/20"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-wider text-cream-dim block mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="03xx-xxxxxxx"
                      className="w-full bg-espresso-2 border border-cream/15 px-4 py-3.5 rounded-lg text-sm outline-none focus:border-crema transition-colors placeholder:text-cream/20"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-wider text-cream-dim block mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={form.address}
                      onChange={handleChange}
                      placeholder="House / Street / Area"
                      className="w-full bg-espresso-2 border border-cream/15 px-4 py-3.5 rounded-lg text-sm outline-none focus:border-crema transition-colors placeholder:text-cream/20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[11px] uppercase tracking-wider text-cream-dim block mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={form.city}
                        onChange={handleChange}
                        placeholder="Mian Channu"
                        className="w-full bg-espresso-2 border border-cream/15 px-4 py-3.5 rounded-lg text-sm outline-none focus:border-crema transition-colors placeholder:text-cream/20"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[11px] uppercase tracking-wider text-cream-dim block mb-2">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={form.postalCode}
                        onChange={handleChange}
                        placeholder="44000"
                        className="w-full bg-espresso-2 border border-cream/15 px-4 py-3.5 rounded-lg text-sm outline-none focus:border-crema transition-colors placeholder:text-cream/20"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-espresso-2/50 border border-cream/10 rounded-xl p-8">
                <h2 className="font-mono text-xs uppercase tracking-widest text-crema mb-6 flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-crema/20 flex items-center justify-center text-[10px]">2</span> 
                  Payment Method
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {paymentMethods.map((m) => (
                    <label
                      key={m.id}
                      className={`relative flex flex-col gap-3 border rounded-lg p-5 cursor-pointer transition-all duration-300 ${
                        payment === m.id 
                          ? "border-crema bg-crema/5" 
                          : "border-cream/10 bg-espresso-2 hover:border-cream/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={m.id}
                        checked={payment === m.id}
                        onChange={() => setPayment(m.id)}
                        className="sr-only" // hidden but accessible
                      />
                      <div className="flex justify-between items-center w-full">
                        <span className="text-2xl">{m.icon}</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${payment === m.id ? 'border-crema' : 'border-cream/20'}`}>
                          {payment === m.id && <div className="w-2 h-2 bg-crema rounded-full" />}
                        </div>
                      </div>
                      <span className={`font-mono text-sm mt-2 transition-colors ${payment === m.id ? 'text-crema' : 'text-cream-dim'}`}>
                        {m.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={placing}
                className="w-full relative group overflow-hidden bg-rust hover:bg-rust-deep py-5 rounded-xl font-mono text-base transition-all duration-300 disabled:opacity-70 shadow-lg"
              >
                <span className="relative z-10 flex items-center justify-center gap-3 text-cream">
                  {placing ? (
                    <>
                      <span className="w-5 h-5 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                      Processing Order...
                    </>
                  ) : (
                    `Place Order — Rs. ${total}`
                  )}
                </span>
                <div className="absolute inset-0 h-full w-0 bg-white/10 group-hover:w-full transition-all duration-300 ease-out" />
              </button>
            </form>
          </div>

          {/* RIGHT: ORDER SUMMARY (STICKY) */}
          <div className="relative">
            <div className="sticky top-32 bg-espresso-2 border border-cream/10 rounded-xl p-8 shadow-2xl">
              <h2 className="font-display text-2xl text-cream mb-6">Order Summary</h2>
              
              {/* Mini Item List */}
              <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-16 h-16 rounded overflow-hidden bg-espresso border border-cream/10 flex-shrink-0">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="font-display text-base text-cream truncate">{item.name}</div>
                      <div className="font-mono text-[10px] text-cream-dim mt-1 uppercase tracking-wider">Qty: {item.qty} × Rs. {item.price}</div>
                    </div>
                    <div className="font-mono text-crema text-sm flex items-center">
                      Rs. {item.qty * item.price}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="pt-6 border-t border-cream/10 space-y-3 font-mono text-sm">
                <div className="flex justify-between items-center text-cream-dim">
                  <span>Subtotal</span>
                  <span className="text-cream">Rs. {subtotal}</span>
                </div>
                <div className="flex justify-between items-center text-cream-dim">
                  <span>Delivery</span>
                  <span className="text-cream">Rs. {delivery}</span>
                </div>
                <div className="flex justify-between items-center text-cream-dim">
                  <span className="flex items-center gap-1">Tax <span className="text-[10px] bg-cream/10 px-1.5 rounded text-cream-dim">5%</span></span>
                  <span className="text-cream">Rs. {tax}</span>
                </div>
                <div className="flex justify-between items-end pt-5 mt-2 border-t border-cream/10">
                  <span className="font-mono text-xs uppercase tracking-widest text-cream-dim">Total</span>
                  <span className="font-display text-3xl text-crema">Rs. {total}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(205, 191, 168, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(205, 191, 168, 0.2); }
      `}</style>
    </section>
  );
}