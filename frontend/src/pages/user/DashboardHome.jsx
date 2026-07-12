import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { FiBox, FiCheckCircle, FiClock, FiCreditCard } from "react-icons/fi";

export default function DashboardHome() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const { data } = await api.get("/orders/myorders");
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, []);

  if (loading) return <div className="text-cream-dim">Loading dashboard...</div>;

  // Calculate stats
  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(o => o.status === "Delivered").length;
  const pendingOrders = orders.filter(o => ["Pending", "Confirmed", "Preparing", "Ready", "Out for Delivery"].includes(o.status)).length;
  const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);

  const stats = [
    { label: "Total Orders", value: totalOrders, icon: <FiBox size={24} className="text-crema" /> },
    { label: "Delivered", value: deliveredOrders, icon: <FiCheckCircle size={24} className="text-emerald-500" /> },
    { label: "Pending/Active", value: pendingOrders, icon: <FiClock size={24} className="text-amber-500" /> },
    { label: "Total Spent", value: `Rs. ${totalSpent}`, icon: <FiCreditCard size={24} className="text-blue-500" /> }
  ];

  return (
    <div>
      <h2 className="font-display text-3xl text-cream mb-8">Dashboard Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-espresso border border-cream/10 p-6 rounded-xl flex flex-col gap-4">
            <div className="p-3 bg-cream/5 rounded-lg w-fit">
              {stat.icon}
            </div>
            <div>
              <p className="font-display text-2xl text-cream">{stat.value}</p>
              <p className="font-mono text-[10px] text-cream-dim uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-display text-xl text-cream">Recent Orders</h3>
          <Link to="/dashboard/orders" className="font-mono text-xs text-crema hover:text-cream transition-colors">
            View All →
          </Link>
        </div>

        <div className="bg-espresso border border-cream/10 rounded-xl overflow-hidden">
          {orders.length === 0 ? (
            <div className="p-8 text-center text-cream-dim font-mono text-sm">
              You haven't placed any orders yet.
              <div className="mt-4">
                <Link to="/menu" className="text-crema hover:underline">Explore Menu</Link>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-espresso-2/50 border-b border-cream/10">
                  <tr>
                    <th className="p-4 font-mono text-xs uppercase tracking-widest text-cream-dim">Order ID</th>
                    <th className="p-4 font-mono text-xs uppercase tracking-widest text-cream-dim">Date</th>
                    <th className="p-4 font-mono text-xs uppercase tracking-widest text-cream-dim">Status</th>
                    <th className="p-4 font-mono text-xs uppercase tracking-widest text-cream-dim text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream/5">
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order._id} className="hover:bg-cream/5 transition-colors">
                      <td className="p-4 font-mono text-xs text-cream">#{order._id.slice(-6)}</td>
                      <td className="p-4 text-sm text-cream-dim">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                          order.status === 'Delivered' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                          order.status === 'Cancelled' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                          'bg-amber-500/10 border-amber-500/20 text-amber-400'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 text-right text-cream font-medium">Rs. {order.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
