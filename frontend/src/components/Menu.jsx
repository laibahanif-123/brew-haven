import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Menu() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await api.get("/products");
        // Get the first 5 products for the featured list
        setItems(data.slice(0, 5));
      } catch (err) {
        console.error("Failed to load featured products");
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section id="menu" className="py-28" style={{ background: "#1e1510" }}>
      <div className="max-w-[1800px] mx-auto px-8 md:px-16 lg:px-24">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-crema">The Menu</span>
            <h2 className="font-display text-4xl md:text-5xl mt-2">Today's pour list</h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="text-cream-dim text-sm max-w-xs text-right">Prices in PKR. Every cup is pulled to order.</p>
            <Link
              to="/menu"
              className="font-mono text-xs border border-crema/40 text-crema hover:bg-crema hover:text-espresso px-5 py-2.5 transition-all duration-300"
            >
              See full menu →
            </Link>
          </div>
        </div>

        {/* Menu Items */}
        <div className="border-t border-cream/10">
          {items.map((item, idx) => (
            <Link
              to={`/product/${item._id}`}
              key={item._id}
              className="group grid grid-cols-[72px_1fr_auto] items-center gap-6 py-6 border-b border-cream/10 hover:bg-white/[0.02] transition-colors duration-300 px-3 -mx-3 rounded"
            >
              {/* Image */}
              <div className="w-[72px] h-[72px] rounded-full overflow-hidden border-2 border-cream/10 group-hover:border-crema/40 transition-colors duration-300 flex-shrink-0">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Name + desc */}
              <div className="flex items-center gap-4 w-full min-w-0">
                <div className="min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-display text-xl group-hover:text-crema transition-colors duration-300">{item.name}</span>
                    {item.tag && (
                      <span className="font-mono text-[10px] tracking-wider uppercase bg-crema/10 text-crema border border-crema/20 px-2 py-0.5 rounded-full">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-cream-dim group-hover:text-cream-dim/80 transition-colors">{item.desc}</div>
                </div>
                <div className="flex-1 border-b-2 border-dotted border-cream/10 mb-2 hidden md:block" />
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="font-mono text-crema whitespace-nowrap text-sm">Rs. {item.price}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity font-mono text-xs text-cream-dim">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex justify-center">
          <Link
            to="/menu"
            className="font-mono text-xs text-cream-dim hover:text-crema transition-colors border-b border-cream/20 hover:border-crema pb-1"
          >
            + 12 more items including teas, pastries & cakes
          </Link>
        </div>
      </div>
    </section>
  );
}