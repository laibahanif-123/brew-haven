import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

export default function AdminAddProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    category: "Hot Coffee",
    price: "",
    rating: "4.5",
    img: "",
    desc: "",
    description: "",
    ingredients: ""
  });

  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          const { data } = await api.get(`/products/${id}`);
          setFormData({
            ...data,
            ingredients: data.ingredients ? data.ingredients.join(", ") : ""
          });
        } catch (err) {
          console.error("Error fetching product", err);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const payload = {
      ...formData,
      price: Number(formData.price),
      rating: Number(formData.rating),
      ingredients: formData.ingredients.split(",").map(i => i.trim()).filter(Boolean)
    };

    try {
      if (isEditMode) {
        await api.put(`/products/${id}`, payload);
      } else {
        await api.post("/products", payload);
      }
      navigate("/admin/products");
    } catch (err) {
      console.error("Error saving product", err);
      alert(err.response?.data?.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-cream-dim">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-display text-4xl text-cream mb-8">
        {isEditMode ? "Edit Product" : "Add New Product"}
      </h1>

      <form onSubmit={handleSubmit} className="bg-espresso-2/50 border border-cream/10 rounded-xl p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block font-mono text-xs text-cream-dim mb-2 uppercase tracking-widest">Product Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-espresso border border-cream/15 px-4 py-3 rounded outline-none focus:border-crema text-cream"
              placeholder="e.g. Caramel Macchiato"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-mono text-xs text-cream-dim mb-2 uppercase tracking-widest">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-espresso border border-cream/15 px-4 py-3 rounded outline-none focus:border-crema text-cream"
            >
              <option value="Hot Coffee">Hot Coffee</option>
              <option value="Cold Coffee">Cold Coffee</option>
              <option value="Tea">Tea</option>
              <option value="Cakes">Cakes</option>
              <option value="Pastries">Pastries</option>
              <option value="Snacks">Snacks</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block font-mono text-xs text-cream-dim mb-2 uppercase tracking-widest">Price (Rs.) *</label>
            <input
              type="number"
              name="price"
              required
              min="0"
              value={formData.price}
              onChange={handleChange}
              className="w-full bg-espresso border border-cream/15 px-4 py-3 rounded outline-none focus:border-crema text-cream"
              placeholder="e.g. 450"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block font-mono text-xs text-cream-dim mb-2 uppercase tracking-widest">Rating</label>
            <input
              type="number"
              name="rating"
              step="0.1"
              min="0"
              max="5"
              value={formData.rating}
              onChange={handleChange}
              className="w-full bg-espresso border border-cream/15 px-4 py-3 rounded outline-none focus:border-crema text-cream"
              placeholder="e.g. 4.5"
            />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-mono text-xs text-cream-dim mb-2 uppercase tracking-widest">Image URL *</label>
          <input
            type="url"
            name="img"
            required
            value={formData.img}
            onChange={handleChange}
            className="w-full bg-espresso border border-cream/15 px-4 py-3 rounded outline-none focus:border-crema text-cream"
            placeholder="https://images.unsplash.com/photo-..."
          />
          {formData.img && (
            <div className="mt-4 p-2 border border-cream/10 rounded inline-block bg-espresso">
              <img src={formData.img} alt="Preview" className="h-24 object-cover rounded" />
            </div>
          )}
        </div>

        {/* Short Description */}
        <div>
          <label className="block font-mono text-xs text-cream-dim mb-2 uppercase tracking-widest">Short Description</label>
          <input
            type="text"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            className="w-full bg-espresso border border-cream/15 px-4 py-3 rounded outline-none focus:border-crema text-cream"
            placeholder="A brief sentence for menu card"
          />
        </div>

        {/* Full Description */}
        <div>
          <label className="block font-mono text-xs text-cream-dim mb-2 uppercase tracking-widest">Full Description</label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-espresso border border-cream/15 px-4 py-3 rounded outline-none focus:border-crema text-cream"
            placeholder="Detailed description for product details page..."
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block font-mono text-xs text-cream-dim mb-2 uppercase tracking-widest">Ingredients (comma separated)</label>
          <input
            type="text"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            className="w-full bg-espresso border border-cream/15 px-4 py-3 rounded outline-none focus:border-crema text-cream"
            placeholder="e.g. Espresso, Steamed Milk, Vanilla Syrup"
          />
        </div>

        <div className="pt-4 flex gap-4 border-t border-cream/10">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="px-6 py-3 border border-cream/20 text-cream rounded hover:border-crema transition-colors font-mono uppercase tracking-widest text-xs"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-crema text-espresso font-bold rounded hover:bg-cream transition-colors font-mono uppercase tracking-widest text-xs"
          >
            {saving ? "Saving..." : isEditMode ? "Update Product" : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
