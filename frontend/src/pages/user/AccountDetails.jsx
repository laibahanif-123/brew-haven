import { useState, useEffect } from "react";
import api from "../../services/api";
import { useAuthStore } from "../../store/authStore";

export default function AccountDetails() {
  const { userInfo, login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name || "",
        email: userInfo.email || "",
        phone: userInfo.phone || "",
        password: "",
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccessMsg("");
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const payload = { name: formData.name, phone: formData.phone };
      if (formData.password) {
        payload.password = formData.password;
      }

      const { data } = await api.put("/users/profile", payload);
      
      // Update global auth store
      login(data);
      
      setSuccessMsg("Profile updated successfully!");
      setFormData(prev => ({ ...prev, password: "" })); // clear password field
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-3xl text-cream mb-8">Account Details</h2>

      {successMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-lg mb-6 text-sm">
          {successMsg}
        </div>
      )}
      
      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg mb-6 text-sm">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-mono text-xs text-cream-dim mb-2 uppercase tracking-widest">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-espresso border border-cream/15 px-4 py-3 rounded outline-none focus:border-crema text-cream transition-colors"
          />
        </div>

        <div>
          <label className="block font-mono text-xs text-cream-dim mb-2 uppercase tracking-widest">Email Address</label>
          <input
            type="email"
            value={formData.email}
            disabled
            className="w-full bg-espresso/50 border border-cream/5 px-4 py-3 rounded text-cream-dim cursor-not-allowed"
          />
          <p className="text-[10px] text-cream-dim/50 mt-1">Email cannot be changed.</p>
        </div>

        <div>
          <label className="block font-mono text-xs text-cream-dim mb-2 uppercase tracking-widest">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Optional"
            className="w-full bg-espresso border border-cream/15 px-4 py-3 rounded outline-none focus:border-crema text-cream transition-colors"
          />
        </div>

        <div className="pt-4">
          <h3 className="font-display text-xl text-cream mb-4">Change Password</h3>
          <label className="block font-mono text-xs text-cream-dim mb-2 uppercase tracking-widest">New Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
            className="w-full bg-espresso border border-cream/15 px-4 py-3 rounded outline-none focus:border-crema text-cream transition-colors"
          />
        </div>

        <div className="pt-6 border-t border-cream/10">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-crema text-espresso font-bold rounded hover:bg-cream transition-colors font-mono uppercase tracking-widest text-xs disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
