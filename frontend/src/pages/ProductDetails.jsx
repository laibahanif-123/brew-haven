import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import api from "../services/api";

const sizes = ["Small", "Medium", "Large"];
const sugarLevels = ["No Sugar", "Less Sugar", "Normal", "Extra Sugar"];

export default function ProductDetails() {
  const { id } = useParams();
  const addItem = useCartStore((state) => state.addItem);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [size, setSize] = useState("Medium");
  const [sugar, setSugar] = useState("Normal");
  const [extraShot, setExtraShot] = useState(false);
  const [whippedCream, setWhippedCream] = useState(false);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError("Product not found or could not be loaded.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <section className="pt-32 pb-24 min-h-screen">
        <div className="max-w-[1800px] mx-auto px-8 md:px-16 lg:px-24">
          <p className="text-cream-dim text-lg mt-8">Loading product details...</p>
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="pt-32 pb-24 min-h-screen">
        <div className="max-w-[1800px] mx-auto px-8 md:px-16 lg:px-24">
          <Link to="/menu" className="font-mono text-xs text-cream-dim hover:text-crema">
            ← Back to menu
          </Link>
          <p className="text-cream-dim text-lg mt-8">{error || "Product not found."}</p>
        </div>
      </section>
    );
  }

  const priceAdjust = (size === "Large" ? 100 : size === "Small" ? -50 : 0) + (extraShot ? 80 : 0) + (whippedCream ? 60 : 0);
  const finalPrice = product.price + priceAdjust;

  const handleAddToCart = () => {
    addItem({
      ...product,
      id: product._id,
      price: finalPrice,
      name: `${product.name} (${size})`,
    });
    for (let i = 1; i < qty; i++) {
      addItem({ ...product, id: product._id, price: finalPrice, name: `${product.name} (${size})` });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <section className="pt-32 pb-24 min-h-screen">
      <div className="max-w-[1800px] mx-auto px-8 md:px-16 lg:px-24">
        <Link to="/menu" className="font-mono text-xs text-cream-dim hover:text-crema">
          ← Back to menu
        </Link>

        <div className="grid md:grid-cols-2 gap-16 mt-8">
          {/* IMAGE */}
          <div className="h-[420px] md:h-[520px] rounded overflow-hidden">
            <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* DETAILS */}
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-crema">{product.category}</span>
            <h1 className="font-display text-4xl mt-2 mb-3">{product.name}</h1>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-crema font-mono text-sm">★ {product.rating}</span>
              <span className="text-cream-dim text-xs">(214 reviews)</span>
            </div>
            <p className="text-cream-dim text-sm leading-relaxed mb-6 max-w-md">{product.description}</p>

            <div className="mb-6">
              <span className="font-mono text-xs text-cream-dim block mb-2">Ingredients</span>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing) => (
                  <span key={ing} className="text-xs border border-cream/15 rounded-full px-3 py-1 text-cream-dim">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* SIZE */}
            <div className="mb-6">
              <span className="font-mono text-xs text-cream-dim block mb-2">Size</span>
              <div className="flex gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`font-mono text-xs px-4 py-2 rounded border transition ${
                      size === s ? "border-crema text-crema" : "border-cream/20 text-cream-dim"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* SUGAR LEVEL */}
            <div className="mb-6">
              <span className="font-mono text-xs text-cream-dim block mb-2">Sugar Level</span>
              <div className="flex flex-wrap gap-2">
                {sugarLevels.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSugar(s)}
                    className={`font-mono text-xs px-4 py-2 rounded border transition ${
                      sugar === s ? "border-crema text-crema" : "border-cream/20 text-cream-dim"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* ADD-ONS */}
            <div className="mb-8">
              <span className="font-mono text-xs text-cream-dim block mb-2">Add-ons</span>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-3 text-sm text-cream-dim cursor-pointer">
                  <input type="checkbox" checked={extraShot} onChange={(e) => setExtraShot(e.target.checked)} className="accent-crema" />
                  Extra Espresso Shot <span className="font-mono text-xs text-crema">+Rs. 80</span>
                </label>
                <label className="flex items-center gap-3 text-sm text-cream-dim cursor-pointer">
                  <input type="checkbox" checked={whippedCream} onChange={(e) => setWhippedCream(e.target.checked)} className="accent-crema" />
                  Whipped Cream <span className="font-mono text-xs text-crema">+Rs. 60</span>
                </label>
              </div>
            </div>

            {/* QTY + PRICE */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4 font-mono text-sm">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-8 h-8 border border-cream/20 rounded hover:border-crema">−</button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="w-8 h-8 border border-cream/20 rounded hover:border-crema">+</button>
              </div>
              <span className="font-display text-2xl text-crema">Rs. {finalPrice * qty}</span>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-rust hover:bg-rust-deep py-4 font-mono text-sm transition"
            >
              {added ? "Added ✓" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}