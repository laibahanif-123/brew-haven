import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { FiShoppingBag, FiPackage, FiPlusCircle, FiSettings } from "react-icons/fi";
import { useAuthStore } from "../../store/authStore";

export default function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo, logout } = useAuthStore();

  const navs = [
    { name: "Live Orders", path: "/admin/orders", icon: <FiShoppingBag size={15} /> },
    { name: "All Products", path: "/admin/products", icon: <FiPackage size={15} /> },
    { name: "Add Product", path: "/admin/products/add", icon: <FiPlusCircle size={15} /> },
  ];
  const bottomNavs = [
    { name: "Settings", path: "/admin/settings", icon: <FiSettings size={15} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen w-full bg-espresso text-cream overflow-hidden font-body">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col border-r border-cream/10 bg-espresso-2/30">
        <div className="p-8 border-b border-cream/10">
          <h2 className="font-display text-3xl text-crema tracking-wide">Admin</h2>
          <p className="font-mono text-[10px] uppercase tracking-widest text-cream-dim mt-2">Brew Haven</p>
        </div>
        
        <nav className="flex-1 p-6 flex flex-col gap-2 overflow-y-auto">
          <p className="font-mono text-[9px] uppercase tracking-widest text-cream/20 px-2 mb-2">Navigation</p>
          {navs.map((nav) => (
            <Link
              key={nav.name}
              to={nav.path}
              className={`flex items-center gap-3 font-mono text-xs uppercase tracking-wider px-4 py-3.5 rounded-lg transition-all duration-300 ${
                location.pathname === nav.path
                  ? "bg-crema text-espresso font-bold shadow-md"
                  : "text-cream-dim hover:text-cream hover:bg-cream/5"
              }`}
            >
              {nav.icon}
              {nav.name}
            </Link>
          ))}

          <div className="mt-auto pt-4 border-t border-cream/8">
            <p className="font-mono text-[9px] uppercase tracking-widest text-cream/20 px-2 mb-2 mt-2">System</p>
            {bottomNavs.map((nav) => (
              <Link
                key={nav.name}
                to={nav.path}
                className={`flex items-center gap-3 font-mono text-xs uppercase tracking-wider px-4 py-3.5 rounded-lg transition-all duration-300 ${
                  location.pathname === nav.path
                    ? "bg-crema text-espresso font-bold shadow-md"
                    : "text-cream-dim hover:text-cream hover:bg-cream/5"
                }`}
              >
                {nav.icon}
                {nav.name}
              </Link>
            ))}
          </div>
        </nav>

        <div className="p-6 border-t border-cream/10">
          <div className="mb-4">
            <p className="font-mono text-xs text-cream truncate">{userInfo?.name}</p>
            <p className="font-mono text-[10px] text-cream-dim truncate">{userInfo?.email}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full font-mono text-[11px] uppercase tracking-widest text-rust hover:bg-rust/10 border border-rust/20 py-2.5 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full bg-[#1e1510] relative">
        {/* Top Header */}
        <header className="h-20 border-b border-cream/10 flex items-center justify-between px-10 bg-espresso-2/20 backdrop-blur-sm z-10 flex-shrink-0">
          <div>
             <span className="font-mono text-[10px] uppercase tracking-widest text-cream-dim">
               {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
             </span>
          </div>
          <Link 
            to="/" 
            className="font-mono text-xs text-cream hover:text-crema border border-cream/20 px-4 py-2 rounded-lg hover:border-crema transition-colors"
          >
            ← View Main Website
          </Link>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(205, 191, 168, 0.15); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(205, 191, 168, 0.3); }
      `}</style>
    </div>
  );
}
