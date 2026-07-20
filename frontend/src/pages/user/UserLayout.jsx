import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { FiHome, FiClock, FiUser, FiLogOut, FiChevronRight } from "react-icons/fi";

export default function UserLayout() {
  const location = useLocation();
  const navigate  = useNavigate();
  const { userInfo, logout } = useAuthStore();

  const navs = [
    { name: "Dashboard",      path: "/dashboard",          icon: <FiHome size={16} /> },
    { name: "Order History",  path: "/dashboard/orders",   icon: <FiClock size={16} /> },
    { name: "Account",        path: "/dashboard/account",  icon: <FiUser size={16} /> },
  ];

  const handleLogout = () => { logout(); navigate("/login"); };

  const initials = userInfo?.name
    ? userInfo.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  return (
    <div className="min-h-screen bg-espresso pt-24 pb-16 px-5 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">

        {/* ══════ SIDEBAR ══════ */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-4" style={{ animation: "slideInLeft 0.5s ease both" }}>

          {/* Profile Card */}
          <div className="bg-espresso-2/70 border border-cream/10 rounded-2xl p-6 flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-rust/15 border-2 border-rust/30 flex items-center justify-center font-display text-xl text-rust mb-4 relative">
              {initials}
              <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-espresso-2" />
            </div>

            {/* Info */}
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-crema/60 mb-1">Hello 👋</p>
            <h2 className="font-display text-lg text-cream mb-0.5 truncate max-w-full">{userInfo?.name}</h2>
            <p className="font-mono text-[9px] text-cream/30 truncate max-w-full">{userInfo?.email}</p>
          </div>

          {/* Navigation */}
          <nav className="bg-espresso-2/70 border border-cream/10 rounded-2xl p-3 flex flex-col gap-1">
            {navs.map((nav, i) => {
              const isActive = location.pathname === nav.path;
              return (
                <Link
                  key={nav.name}
                  to={nav.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 no-underline group
                    ${isActive
                      ? "bg-crema text-espresso font-medium shadow-sm shadow-crema/20"
                      : "text-cream/50 hover:text-cream hover:bg-cream/5"
                    }`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <span className={`${isActive ? "text-espresso" : "text-cream/40 group-hover:text-cream"} transition-colors`}>
                    {nav.icon}
                  </span>
                  <span className="font-mono text-[11px] tracking-wider uppercase flex-1">{nav.name}</span>
                  {isActive && <FiChevronRight size={12} className="text-espresso/50" />}
                </Link>
              );
            })}

            {/* Divider */}
            <div className="h-px bg-cream/8 my-1" />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-rust/60 hover:text-rust hover:bg-rust/8 transition-all duration-200 group w-full text-left"
            >
              <FiLogOut size={16} className="group-hover:scale-110 transition-transform" />
              <span className="font-mono text-[11px] tracking-wider uppercase">Logout</span>
            </button>
          </nav>
        </aside>

        {/* ══════ MAIN CONTENT ══════ */}
        <main className="flex-1 min-w-0" style={{ animation: "fadeUp 0.5s ease both", animationDelay: "0.1s" }}>
          <div className="bg-espresso-2/40 border border-cream/8 rounded-2xl p-6 md:p-8 min-h-[600px]">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}
