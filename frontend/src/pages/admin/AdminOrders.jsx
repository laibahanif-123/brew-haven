import { useState, useEffect } from "react";
import api from "../../services/api";
import io from "socket.io-client";
import { FiTrash2, FiEdit, FiX } from "react-icons/fi";

const socket = io("http://localhost:5000");

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: ""
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders");
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();

    // Socket listeners for real-time updates
    socket.on("newOrder", (order) => {
      // Add the new order at the top
      setOrders((prev) => [order, ...prev]);
    });

    socket.on("orderStatusUpdated", (updatedOrder) => {
      setOrders((prev) =>
        prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
      );
    });

    socket.on("orderDeleted", (deletedOrderId) => {
      setOrders((prev) => prev.filter((o) => o._id !== deletedOrderId));
    });

    socket.on("orderDetailsUpdated", (updatedOrder) => {
      setOrders((prev) =>
        prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
      );
    });

    return () => {
      socket.off("newOrder");
      socket.off("orderStatusUpdated");
      socket.off("orderDeleted");
      socket.off("orderDetailsUpdated");
    };
  }, []);

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await api.delete(`/orders/${orderId}`);
        // Socket will handle UI update, or fallback:
        // setOrders(prev => prev.filter(o => o._id !== orderId));
      } catch (err) {
        console.error("Failed to delete order", err);
      }
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
    } catch (err) {
      console.error(err);
    }
  };

  const openEditModal = (order) => {
    setEditingOrder(order);
    setEditFormData({
      name: order.shippingAddress?.name || "",
      phone: order.shippingAddress?.phone || "",
      address: order.shippingAddress?.address || "",
      city: order.shippingAddress?.city || ""
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/orders/${editingOrder._id}/details`, {
        shippingAddress: {
          name: editFormData.name,
          phone: editFormData.phone,
          address: editFormData.address,
          city: editFormData.city,
        }
      });
      setEditingOrder(null);
    } catch (err) {
      console.error("Failed to update order details", err);
    }
  };

  if (loading) return <div className="text-cream-dim">Loading orders...</div>;

  return (
    <div>
      <h1 className="font-display text-4xl text-cream mb-8 flex items-center gap-4">
        Live Orders
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
      </h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-espresso-2/50 border border-cream/10 p-6 rounded-xl flex flex-col md:flex-row gap-6 justify-between items-start md:items-center"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-mono text-xs uppercase tracking-widest text-crema">
                  Order #{order._id.slice(-6)}
                </h3>
                <span className="text-[10px] bg-cream/10 px-2 py-0.5 rounded text-cream-dim">
                  {new Date(order.createdAt).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-cream text-lg font-display mb-1">{order.shippingAddress.name}</p>
              <p className="text-sm text-cream-dim">{order.orderItems.length} items • Rs. {order.totalPrice}</p>
            </div>

            <div className="flex items-center gap-4">
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className={`font-mono text-xs px-4 py-2 rounded-lg border outline-none cursor-pointer transition-colors ${
                  order.status === "Pending" ? "bg-amber-500/10 border-amber-500/30 text-amber-500" :
                  order.status === "Delivered" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" :
                  "bg-blue-500/10 border-blue-500/30 text-blue-500"
                }`}
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Preparing">Preparing</option>
                <option value="Ready">Ready</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button 
                onClick={() => openEditModal(order)}
                className="p-2.5 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/30 hover:bg-blue-500 hover:text-white transition-colors"
                title="Edit Order"
              >
                <FiEdit size={16} />
              </button>
              <button 
                onClick={() => handleDeleteOrder(order._id)}
                className="p-2.5 rounded-lg bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white transition-colors"
                title="Delete Order"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {orders.length === 0 && (
          <p className="text-cream-dim">No orders yet.</p>
        )}
      </div>

      {/* Edit Modal */}
      {editingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/80 backdrop-blur-sm">
          <div className="bg-espresso-2 border border-cream/10 rounded-xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-cream/10">
              <h2 className="font-display text-xl text-cream">Edit Order #{editingOrder._id.slice(-6)}</h2>
              <button onClick={() => setEditingOrder(null)} className="text-cream-dim hover:text-cream">
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div>
                <label className="block font-mono text-xs text-cream-dim mb-1.5 uppercase tracking-widest">Name</label>
                <input 
                  type="text" required
                  value={editFormData.name} onChange={e => setEditFormData({...editFormData, name: e.target.value})}
                  className="w-full bg-espresso/50 border border-cream/15 px-4 py-2.5 rounded text-sm outline-none focus:border-crema text-cream"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-cream-dim mb-1.5 uppercase tracking-widest">Phone</label>
                <input 
                  type="text" required
                  value={editFormData.phone} onChange={e => setEditFormData({...editFormData, phone: e.target.value})}
                  className="w-full bg-espresso/50 border border-cream/15 px-4 py-2.5 rounded text-sm outline-none focus:border-crema text-cream"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-cream-dim mb-1.5 uppercase tracking-widest">Address</label>
                <input 
                  type="text" required
                  value={editFormData.address} onChange={e => setEditFormData({...editFormData, address: e.target.value})}
                  className="w-full bg-espresso/50 border border-cream/15 px-4 py-2.5 rounded text-sm outline-none focus:border-crema text-cream"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-cream-dim mb-1.5 uppercase tracking-widest">City</label>
                <input 
                  type="text" required
                  value={editFormData.city} onChange={e => setEditFormData({...editFormData, city: e.target.value})}
                  className="w-full bg-espresso/50 border border-cream/15 px-4 py-2.5 rounded text-sm outline-none focus:border-crema text-cream"
                />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setEditingOrder(null)} className="px-5 py-2.5 text-sm font-mono text-cream-dim hover:text-cream">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2.5 bg-crema text-espresso font-mono text-sm font-medium rounded hover:bg-cream transition-colors">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
