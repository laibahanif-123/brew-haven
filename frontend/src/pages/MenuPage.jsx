import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import api from "../services/api";

const categories = ["All", "Hot Coffee", "Cold Coffee", "Tea", "Pastries", "Cakes", "Snacks"];
const FALLBACK_IMG = "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=500&q=80";

export default function MenuPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data);
      } catch (err) {
        setError("Could not load menu. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filtered = products.filter((p) => {
    const matchCategory = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <section className="pt-36 pb-24 min-h-screen">
      <div className="w-full mx-auto px-8 md:px-12 lg:px-16 2xl:px-24">
        <div className="mb-12">
          <span className="font-mono text-xs tracking-widest uppercase text-crema">Full Menu</span>
          <h1 className="font-display text-4xl md:text-5xl mt-2">Everything we pour</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-between mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono text-xs px-4 py-2 rounded-full border transition ${
                  activeCategory === cat
                    ? "border-crema text-crema"
                    : "border-cream/20 text-cream-dim hover:border-cream-dim"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-espresso-2 border border-cream/15 px-4 py-2 text-sm rounded outline-none focus:border-crema w-full md:w-64"
          />
        </div>

        {loading ? (
          <p className="text-cream-dim text-sm">Loading menu...</p>
        ) : error ? (
          <p className="text-rust text-sm">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="text-cream-dim text-sm">No products match your search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8">
            {filtered.map((p) => (
              <div key={p._id} className="bg-espresso-2 rounded overflow-hidden border border-cream/10 group">
                <Link to={`/product/${p._id}`}>
                  <div className="h-48 overflow-hidden bg-espresso">
                    <img
                      src={p.img}
                      alt={p.name}
                      onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_IMG; }}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                </Link>
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <Link to={`/product/${p._id}`}>
                      <h3 className="font-display text-lg hover:text-crema transition">{p.name}</h3>
                    </Link>
                    <span className="font-mono text-xs text-crema">★ {p.rating}</span>
                  </div>
                  <p className="text-cream-dim text-xs mt-1.5 mb-4">{p.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-crema">Rs. {p.price}</span>
                    <button
                      onClick={() => useCartStore.getState().addItem({ ...p, id: p._id })}
                      className="font-mono text-xs bg-rust hover:bg-rust-deep px-4 py-2 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}