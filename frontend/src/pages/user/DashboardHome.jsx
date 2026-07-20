import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { FiBox, FiCheckCircle, FiClock, FiCreditCard, FiArrowRight, FiPackage } from "react-icons/fi";

const STATUS_STYLE = {
  Delivered:        "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  Cancelled:        "bg-rust/10 border-rust/20 text-rust",
  Pending:          "bg-amber-500/10 border-amber-500/20 text-amber-400",
  Confirmed:        "bg-amber-500/10 border-amber-500/20 text-amber-400",
  Preparing:        "bg-blue-500/10 border-blue-500/20 text-blue-400",
  Ready:            "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  "Out for Delivery":"bg-crema/10 border-crema/20 text-crema",
};

export default function DashboardHome() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/orders/myorders")
      .then(({ data }) => setOrders(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 gap-3">
        <div className="w-5 h-5 rounded-full border-2 border-crema/30 border-t-crema animate-spin" />
        <span className="font-mono text-xs tracking-widest text-cream/40 uppercase">Loading...</span>
      </div>
    );
  }

  const totalOrders   = orders.length;
  const deliveredOrders = orders.filter(o => o.status === "Delivered").length;
  const pendingOrders   = orders.filter(o =>
    ["Pending","Confirmed","Preparing","Ready","Out for Delivery"].includes(o.status)
  ).length;
  const totalSpent = orders.reduce((s, o) => s + o.totalPrice, 0);

  const stats = [
    {
      label: "Total Orders",
      value: totalOrders,
      icon: <FiBox size={20} />,
      color: "text-crema",
      glow: "bg-crema/8",
    },
    {
      label: "Delivered",
      value: deliveredOrders,
      icon: <FiCheckCircle size={20} />,
      color: "text-emerald-400",
      glow: "bg-emerald-500/8",
    },
    {
      label: "Active",
      value: pendingOrders,
      icon: <FiClock size={20} />,
      color: "text-amber-400",
      glow: "bg-amber-500/8",
    },
    {
      label: "Total Spent",
      value: `Rs. ${totalSpent.toLocaleString()}`,
      icon: <FiCreditCard size={20} />,
      color: "text-blue-400",
      glow: "bg-blue-500/8",
    },
  ];

  return (
    <div style={{ animation: "fadeUp 0.5s ease both" }}>

      {/* ── Header ── */}
      <div className="mb-8">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-crema mb-2">Overview</p>
        <h2 className="font-display text-3xl text-cream">Dashboard</h2>
      </div>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-espresso-2/60 border border-cream/8 rounded-2xl p-5 flex flex-col gap-4 hover:border-cream/15 transition-all duration-300 group"
            style={{ animation: `fadeUp 0.5s ease both`, animationDelay: `${i * 0.07}s` }}
          >
            {/* Icon */}
            <div className={`w-10 h-10 rounded-xl ${stat.glow} flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            {/* Value */}
            <div>
              <p className={`font-display text-2xl ${stat.color} leading-none mb-1`}>{stat.value}</p>
              <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-cream/35">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Recent Orders ── */}
      <div>
        {/* Section Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-display text-xl text-cream">Recent Orders</h3>
          </div>
          <Link
            to="/dashboard/orders"
            className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-crema/70 hover:text-crema transition-colors no-underline"
          >
            View All <FiArrowRight size={12} />
          </Link>
        </div>

        {/* Table Card */}
        <div className="bg-espresso-2/50 border border-cream/8 rounded-2xl overflow-hidden">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-cream/5 flex items-center justify-center text-cream/20">
                <FiPackage size={28} />
              </div>
              <div>
                <p className="font-display text-lg text-cream/50 mb-1">No orders yet</p>
                <p className="font-mono text-xs text-cream/25">Your order history will appear here</p>
              </div>
              <Link
                to="/menu"
                className="mt-2 flex items-center gap-2 bg-rust hover:bg-rust-deep text-cream font-mono text-xs tracking-widest uppercase px-5 py-2.5 rounded-xl transition-all no-underline hover:scale-105"
              >
                Explore Menu <FiArrowRight size={12} />
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-cream/8">
                  <tr>
                    {["Order ID", "Date", "Items", "Status", "Total"].map((h, i) => (
                      <th
                        key={h}
                        className={`p-4 font-mono text-[9px] tracking-[0.2em] uppercase text-cream/30 ${i === 4 ? "text-right" : ""}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((order, idx) => (
                    <tr
                      key={order._id}
                      className="border-b border-cream/5 last:border-0 hover:bg-cream/3 transition-colors"
                      style={{ animation: `fadeUp 0.4s ease both`, animationDelay: `${idx * 0.05}s` }}
                    >
                      {/* ID */}
                      <td className="p-4">
                        <span className="font-mono text-xs text-crema/70">#{order._id.slice(-6).toUpperCase()}</span>
                      </td>
                      {/* Date */}
                      <td className="p-4">
                        <span className="text-xs text-cream/45">
                          {new Date(order.createdAt).toLocaleDateString("en-US", {
                            day: "numeric", month: "short", year: "numeric"
                          })}
                        </span>
                      </td>
                      {/* Items count */}
                      <td className="p-4">
                        <span className="text-xs text-cream/45">
                          {order.orderItems?.length || 0} item{order.orderItems?.length !== 1 ? "s" : ""}
                        </span>
                      </td>
                      {/* Status badge */}
                      <td className="p-4">
                        <span className={`font-mono text-[9px] tracking-wider uppercase px-2.5 py-1 rounded-full border ${STATUS_STYLE[order.status] || STATUS_STYLE["Pending"]}`}>
                          {order.status}
                        </span>
                      </td>
                      {/* Total */}
                      <td className="p-4 text-right">
                        <span className="font-display text-base text-cream">Rs. {order.totalPrice?.toLocaleString()}</span>
                      </td>
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
