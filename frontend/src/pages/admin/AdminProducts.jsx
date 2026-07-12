import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/products/${id}`);
        setProducts(products.filter((p) => p._id !== id));
      } catch (err) {
        console.error("Error deleting product", err);
      }
    }
  };

  if (loading) return <div className="text-cream-dim">Loading products...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-4xl text-cream">All Products</h1>
        <Link
          to="/admin/products/add"
          className="flex items-center gap-2 bg-crema text-espresso px-4 py-2 rounded-lg font-mono text-sm hover:bg-cream transition-colors"
        >
          <FiPlus /> Add Product
        </Link>
      </div>

      <div className="bg-espresso-2/50 border border-cream/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-espresso-2 border-b border-cream/10">
              <tr>
                <th className="p-4 font-mono text-xs uppercase tracking-widest text-cream-dim">Image</th>
                <th className="p-4 font-mono text-xs uppercase tracking-widest text-cream-dim">Name</th>
                <th className="p-4 font-mono text-xs uppercase tracking-widest text-cream-dim">Category</th>
                <th className="p-4 font-mono text-xs uppercase tracking-widest text-cream-dim">Price</th>
                <th className="p-4 font-mono text-xs uppercase tracking-widest text-cream-dim text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream/5">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-cream/5 transition-colors">
                  <td className="p-4">
                    <img src={product.img} alt={product.name} className="w-12 h-12 rounded object-cover" />
                  </td>
                  <td className="p-4 text-cream">{product.name}</td>
                  <td className="p-4 text-cream-dim">{product.category}</td>
                  <td className="p-4 text-cream">Rs. {product.price}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                        className="p-2 rounded bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
                        title="Edit Product"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-2 rounded bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                        title="Delete Product"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {products.length === 0 && (
          <div className="p-8 text-center text-cream-dim">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
}
