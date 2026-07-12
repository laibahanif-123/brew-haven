import { useState, useEffect } from "react";
import api from "../../services/api";
import { FiPackage } from "react-icons/fi";

export default function OrderHistory() {
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

  if (loading) return <div className="text-cream-dim">Loading order history...</div>;

  return (
    <div>
      <h2 className="font-display text-3xl text-cream mb-8 flex items-center gap-3">
        <FiPackage className="text-crema" />
        Order History
      </h2>

      {orders.length === 0 ? (
        <div className="bg-espresso border border-cream/10 rounded-xl p-10 text-center">
          <p className="text-cream-dim mb-4">No orders found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-espresso border border-cream/10 rounded-xl overflow-hidden">
              <div className="bg-espresso-2/50 border-b border-cream/10 p-5 flex flex-wrap justify-between items-center gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-cream-dim mb-1">Order Placed</p>
                  <p className="text-sm text-cream">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-cream-dim mb-1">Total</p>
                  <p className="text-sm text-cream font-medium">Rs. {order.totalPrice}</p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-cream-dim mb-1">Order #</p>
                  <p className="text-sm font-mono text-crema">{order._id}</p>
                </div>
                <div className="ml-auto">
                  <span className={`text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full border ${
                    order.status === 'Delivered' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                    order.status === 'Cancelled' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                    'bg-amber-500/10 border-amber-500/20 text-amber-400'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <div className="space-y-4">
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-cream/5 rounded border border-cream/10 overflow-hidden flex-shrink-0">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-cream font-medium">{item.name}</h4>
                        <p className="text-sm text-cream-dim mt-1">Qty: {item.qty} × Rs. {item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
