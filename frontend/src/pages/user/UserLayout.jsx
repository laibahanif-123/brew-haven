import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { FiHome, FiClock, FiUser, FiLogOut } from "react-icons/fi";

export default function UserLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo, logout } = useAuthStore();

  const navs = [
    { name: "Dashboard", path: "/dashboard", icon: <FiHome size={18} /> },
    { name: "Order History", path: "/dashboard/orders", icon: <FiClock size={18} /> },
    { name: "Account Details", path: "/dashboard/account", icon: <FiUser size={18} /> }
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-8 text-cream font-body">
      {/* Sidebar */}
      <aside className="w-full md:w-72 flex-shrink-0">
        <div className="bg-espresso-2/50 border border-cream/10 rounded-2xl p-6 flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-rust/20 border border-rust/30 flex items-center justify-center text-3xl font-display text-rust mb-4">
            {getInitials(userInfo?.name)}
          </div>
          <p className="font-mono text-[10px] text-cream-dim uppercase tracking-widest mb-1">Hello</p>
          <h2 className="font-display text-xl text-crema text-center">{userInfo?.name}</h2>
          <p className="font-mono text-[10px] text-cream-dim mt-1">{userInfo?.email}</p>
        </div>

        <nav className="bg-espresso-2/50 border border-cream/10 rounded-2xl p-4 flex flex-col gap-2">
          {navs.map((nav) => {
            const isActive = location.pathname === nav.path;
            return (
              <Link
                key={nav.name}
                to={nav.path}
                className={`flex items-center gap-3 font-mono text-xs uppercase tracking-wider px-4 py-3.5 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-crema text-espresso font-bold shadow-md"
                    : "text-cream-dim hover:text-cream hover:bg-cream/5"
                }`}
              >
                {nav.icon}
                {nav.name}
              </Link>
            );
          })}
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider px-4 py-3.5 rounded-xl text-rust hover:bg-rust/10 transition-all mt-2"
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1">
        <div className="bg-espresso-2/30 border border-cream/10 rounded-2xl p-6 md:p-10 min-h-[600px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
