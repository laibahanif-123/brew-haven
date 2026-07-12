import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import ProductDetails from "./pages/ProductDetails";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminAddProduct from "./pages/admin/AdminAddProduct";

import UserLayout from "./pages/user/UserLayout";
import DashboardHome from "./pages/user/DashboardHome";
import OrderHistory from "./pages/user/OrderHistory";
import AccountDetails from "./pages/user/AccountDetails";

const ProtectedLayout = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const AdminProtectedLayout = () => {
  const { isAuthenticated, userInfo } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!userInfo?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

function App() {
  return (
    <div className="font-body">
      <Routes>
        {/* Public Routes (No Navbar/Footer) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes (Require Login, Includes Navbar/Footer) */}
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          
          {/* User Dashboard Routes */}
          <Route element={<UserLayout />}>
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/dashboard/orders" element={<OrderHistory />} />
            <Route path="/dashboard/account" element={<AccountDetails />} />
          </Route>
        </Route>

        {/* Admin Routes (No Navbar/Footer) */}
        <Route element={<AdminProtectedLayout />}>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<Navigate to="/admin/orders" replace />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/add" element={<AdminAddProduct />} />
            <Route path="products/edit/:id" element={<AdminAddProduct />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;