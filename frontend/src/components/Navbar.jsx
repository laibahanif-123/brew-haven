import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiShoppingBag, FiMenu, FiX, FiSettings } from "react-icons/fi";
import { useState } from "react";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";

function NavHashLink({ to, children, className, onClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick();
    const sectionId = to.replace("/#", "");
    if (location.pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const userInfo = useAuthStore((state) => state.userInfo);
  const logout = useAuthStore((state) => state.logout);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4 bg-espresso/95 backdrop-blur-md border-b border-cream/10 transition-all duration-300">
      <div className="max-w-[1800px] mx-auto px-8 md:px-16 lg:px-24 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-xl relative z-[60]">
          <span className="w-8 h-8 rounded-full border border-crema flex items-center justify-center font-mono text-xs text-crema">
            bh
          </span>
          Brew Haven
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-9 text-sm">
          <Link to="/" className="opacity-80 hover:opacity-100 transition-opacity">Home</Link>
          <Link to="/menu" className="opacity-80 hover:opacity-100 transition-opacity">Menu</Link>
          <NavHashLink to="/#about" className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer">About</NavHashLink>
          <NavHashLink to="/#gallery" className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer">Gallery</NavHashLink>
          <NavHashLink to="/#contact" className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer">Contact</NavHashLink>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-5">
          {/* Dashboard — only when logged in */}
          {userInfo && !userInfo.isAdmin && (
            <Link
              to="/dashboard"
              className="font-mono text-[10px] uppercase tracking-widest text-cream-dim hover:text-crema transition-colors"
            >
              Dashboard
            </Link>
          )}

          {/* Admin Settings icon */}
          {userInfo?.isAdmin && (
            <Link
              to="/admin"
              title="Admin Dashboard"
              className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all">
                <FiSettings size={13} />
              </span>
              Admin Dashboard
            </Link>
          )}

          {/* Login — only when logged out */}
          {!userInfo && (
            <Link
              to="/login"
              className="font-mono text-[10px] uppercase tracking-widest text-cream-dim hover:text-crema transition-colors"
            >
              Login
            </Link>
          )}

          <Link to="/cart" className="relative text-cream hover:text-crema transition">
            <FiShoppingBag size={19} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-rust text-cream text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
          <NavHashLink
            to="/#contact"
            className="font-mono text-xs border border-cream-dim px-5 py-2.5 hover:border-crema hover:text-crema transition cursor-pointer"
          >
            Reserve a table
          </NavHashLink>
        </div>

        {/* Mobile Toggle & Cart icon */}
        <div className="flex md:hidden items-center gap-4 relative z-[60]">
          <Link to="/cart" className="relative text-cream hover:text-crema transition" onClick={() => setIsMobileMenuOpen(false)}>
            <FiShoppingBag size={19} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-rust text-cream text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-cream hover:text-crema transition">
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`fixed inset-0 bg-espresso z-50 flex flex-col pt-24 px-8 transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6 text-xl font-display">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-crema transition">Home</Link>
          <Link to="/menu" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-crema transition">Menu</Link>
          <NavHashLink to="/#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-crema transition cursor-pointer">About</NavHashLink>
          <NavHashLink to="/#gallery" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-crema transition cursor-pointer">Gallery</NavHashLink>
          <NavHashLink to="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-crema transition cursor-pointer">Contact</NavHashLink>
        </div>
        
        <div className="mt-10 flex flex-col gap-5 border-t border-cream/10 pt-8">
          {userInfo && !userInfo.isAdmin && (
            <Link
              to="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-left font-mono text-xs tracking-widest text-cream-dim hover:text-crema transition uppercase"
            >
              Dashboard
            </Link>
          )}
          {userInfo?.isAdmin && (
            <Link
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 font-mono text-xs tracking-widest text-emerald-400 uppercase hover:text-emerald-300 transition"
            >
              <FiSettings size={16} />
              Admin Dashboard
            </Link>
          )}
          {!userInfo && (
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-left font-mono text-xs tracking-widest text-crema uppercase hover:text-cream transition"
            >
              Login
            </Link>
          )}
          <NavHashLink
            to="/#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-mono text-xs text-center border border-cream-dim px-5 py-3 mt-4 hover:border-crema hover:text-crema transition cursor-pointer"
          >
            Reserve a table
          </NavHashLink>
        </div>
      </div>
    </nav>
  );
}