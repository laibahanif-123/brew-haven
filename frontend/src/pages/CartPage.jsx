import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  const removeItem = useCartStore((state) => state.removeItem);

  const subtotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);
  const delivery = subtotal > 0 ? 150 : 0; // Adding delivery here for better UX
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + tax;

  if (items.length === 0) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center px-8 pt-24 pb-16 bg-espresso">
        {/* Decorative circle */}
        <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-crema/5 rounded-full border border-crema/20" />
          <div className="absolute inset-2 bg-crema/10 rounded-full border border-crema/20" />
          <span className="text-4xl">🛒</span>
        </div>
        <h1 className="font-display text-4xl mb-4 text-cream">Your cart is empty</h1>
        <p className="text-cream-dim text-sm mb-10 max-w-sm text-center">
          Looks like you haven't added anything yet. Discover our latest roasts and fresh pastries.
        </p>
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
          <span className="font-mono text-xs tracking-widest uppercase text-crema block mb-2">Review</span>
          <h1 className="font-display text-4xl md:text-5xl text-cream">Your Cart</h1>
        </div>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-16">
          
          {/* LEFT: CART ITEMS */}
          <div className="space-y-4">
            {/* Header for list */}
            <div className="hidden md:grid grid-cols-[1fr_auto_auto] gap-6 text-cream-dim font-mono text-xs uppercase tracking-wider pb-3 border-b border-cream/10">
              <div>Product</div>
              <div className="w-28 text-center">Quantity</div>
              <div className="w-24 text-right">Total</div>
            </div>

            {items.map((item) => (
              <div key={item.id} className="group relative flex flex-col md:flex-row items-start md:items-center gap-5 bg-espresso-2/50 hover:bg-espresso-2 border border-cream/5 hover:border-cream/15 rounded-lg p-4 transition-all duration-300">
                
                {/* Product Image & Info */}
                <div className="flex items-center gap-4 flex-1 w-full">
                  <div className="w-20 h-20 rounded-md overflow-hidden bg-espresso border border-cream/10 flex-shrink-0">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-cream">{item.name}</h3>
                    <p className="font-mono text-[11px] text-cream-dim mt-1">Rs. {item.price}</p>
                    
                    {/* Mobile Only: Quantity & Price */}
                    <div className="md:hidden mt-3 flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-3 font-mono text-sm bg-espresso border border-cream/10 rounded px-2 py-1">
                        <button onClick={() => decreaseQty(item.id)} className="w-5 h-5 flex items-center justify-center text-cream-dim hover:text-crema transition-colors">−</button>
                        <span className="w-4 text-center">{item.qty}</span>
                        <button onClick={() => increaseQty(item.id)} className="w-5 h-5 flex items-center justify-center text-cream-dim hover:text-crema transition-colors">+</button>
                      </div>
                      <span className="font-mono text-crema text-sm">Rs. {item.price * item.qty}</span>
                    </div>
                  </div>
                </div>

                {/* Desktop Only: Quantity */}
                <div className="hidden md:flex items-center gap-3 font-mono text-sm bg-espresso border border-cream/10 rounded-md p-1 mx-4">
                  <button onClick={() => decreaseQty(item.id)} className="w-7 h-7 flex items-center justify-center text-cream-dim hover:text-crema hover:bg-white/5 rounded transition-colors">−</button>
                  <span className="w-6 text-center">{item.qty}</span>
                  <button onClick={() => increaseQty(item.id)} className="w-7 h-7 flex items-center justify-center text-cream-dim hover:text-crema hover:bg-white/5 rounded transition-colors">+</button>
                </div>

                {/* Desktop Only: Total Price */}
                <div className="hidden md:block w-24 text-right font-mono text-crema text-sm">
                  Rs. {item.price * item.qty}
                </div>

                {/* Remove button (absolute on mobile top right, normal on desktop) */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-4 right-4 md:static p-2 md:p-1 text-cream-dim/50 hover:text-rust transition-colors"
                  aria-label="Remove item"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT: SUMMARY (STICKY) */}
          <div className="relative">
            <div className="sticky top-32 bg-espresso-2 border border-cream/10 rounded-xl p-8 shadow-2xl">
              <h2 className="font-display text-2xl text-cream mb-6">Order Summary</h2>
              
              <div className="space-y-4 font-mono text-sm border-b border-cream/10 pb-6 mb-6">
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
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-cream-dim">Total</span>
                <span className="font-display text-3xl text-crema">Rs. {total}</span>
              </div>

              <Link
                to="/checkout"
                className="w-full relative group overflow-hidden bg-rust hover:bg-rust-deep py-4 rounded-lg font-mono text-sm transition-all duration-300 flex items-center justify-center text-cream"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Proceed to Checkout →
                </span>
                <div className="absolute inset-0 h-full w-0 bg-white/10 group-hover:w-full transition-all duration-300 ease-out" />
              </Link>
              
              <div className="mt-4 text-center">
                <Link to="/menu" className="font-mono text-xs text-cream-dim hover:text-crema underline underline-offset-4 decoration-transparent hover:decoration-crema/40 transition-all">
                  or continue shopping
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}