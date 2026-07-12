import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import api from "../../services/api";

export default function AdminSettings() {
  const { userInfo } = useAuthStore();

  const [profile, setProfile] = useState({
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    phone: userInfo?.phone || "",
  });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [profileMsg, setProfileMsg] = useState({ type: "", text: "" });
  const [passwordMsg, setPasswordMsg] = useState({ type: "", text: "" });
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const cafeInfo = [
    { label: "Cafe Name", value: "Brew Haven" },
    { label: "Location", value: "Mian Channu, Punjab, Pakistan" },
    { label: "Phone", value: "+92 300 0000000" },
    { label: "Email", value: "hello@brewhaven.pk" },
    { label: "Opening Hours", value: "7:00 AM – 9:00 PM (Daily)" },
    { label: "Established", value: "2026" },
  ];

  const handleProfileChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMsg({ type: "", text: "" });
    try {
      await api.put("/users/profile", {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
      });
      setProfileMsg({ type: "success", text: "Profile updated successfully." });
    } catch (err) {
      setProfileMsg({ type: "error", text: err.response?.data?.message || "Failed to update profile." });
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (passwords.newPassword.length < 8) {
      setPasswordMsg({ type: "error", text: "New password must be at least 8 characters." });
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordMsg({ type: "error", text: "Passwords do not match." });
      return;
    }
    setPasswordLoading(true);
    setPasswordMsg({ type: "", text: "" });
    try {
      await api.put("/users/profile", {
        currentPassword: passwords.currentPassword,
        password: passwords.newPassword,
      });
      setPasswordMsg({ type: "success", text: "Password changed successfully." });
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setPasswordMsg({ type: "error", text: err.response?.data?.message || "Failed to change password." });
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl text-cream">Settings</h1>
          <p className="font-mono text-xs text-cream-dim mt-1 tracking-wider uppercase">
            Manage your account &amp; cafe info
          </p>
        </div>
        <div className="w-12 h-12 rounded-full bg-crema/10 border border-crema/30 flex items-center justify-center font-display text-xl text-crema">
          {userInfo?.name?.[0]?.toUpperCase() || "A"}
        </div>
      </div>

      {/* Grid layout */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* ── Profile Settings ── */}
        <div className="bg-espresso-2/40 border border-cream/10 rounded-2xl p-7">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xl">👤</span>
            <div>
              <h2 className="font-display text-xl text-cream">Profile Info</h2>
              <p className="font-mono text-[10px] text-cream-dim uppercase tracking-wider">Update your admin details</p>
            </div>
          </div>

          <form onSubmit={handleProfileSave} className="space-y-4">
            {profileMsg.text && (
              <div className={`text-sm px-4 py-3 rounded-lg border font-mono ${
                profileMsg.type === "success"
                  ? "bg-green-900/20 border-green-500/30 text-green-400"
                  : "bg-rust-deep/20 border-rust/30 text-rust"
              }`}>
                {profileMsg.type === "success" ? "✓ " : "⚠ "}{profileMsg.text}
              </div>
            )}

            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-cream-dim block mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full bg-espresso border border-cream/15 px-4 py-3 rounded-lg text-sm outline-none focus:border-crema transition-colors text-cream placeholder:text-cream/20"
                placeholder="Admin Name"
              />
            </div>

            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-cream-dim block mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full bg-espresso border border-cream/15 px-4 py-3 rounded-lg text-sm outline-none focus:border-crema transition-colors text-cream placeholder:text-cream/20"
                placeholder="admin@brewhaven.pk"
              />
            </div>

            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-cream-dim block mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                className="w-full bg-espresso border border-cream/15 px-4 py-3 rounded-lg text-sm outline-none focus:border-crema transition-colors text-cream placeholder:text-cream/20"
                placeholder="03xx-xxxxxxx"
              />
            </div>

            <button
              type="submit"
              disabled={profileLoading}
              className="w-full relative group overflow-hidden bg-crema hover:bg-crema-soft text-espresso py-3 rounded-lg font-mono text-xs uppercase tracking-widest transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {profileLoading ? (
                <><span className="w-4 h-4 border-2 border-espresso/30 border-t-espresso rounded-full animate-spin" /> Saving...</>
              ) : "Save Profile"}
            </button>
          </form>
        </div>

        {/* ── Password Change ── */}
        <div className="bg-espresso-2/40 border border-cream/10 rounded-2xl p-7">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xl">🔐</span>
            <div>
              <h2 className="font-display text-xl text-cream">Change Password</h2>
              <p className="font-mono text-[10px] text-cream-dim uppercase tracking-wider">Update your login password</p>
            </div>
          </div>

          <form onSubmit={handlePasswordSave} className="space-y-4">
            {passwordMsg.text && (
              <div className={`text-sm px-4 py-3 rounded-lg border font-mono ${
                passwordMsg.type === "success"
                  ? "bg-green-900/20 border-green-500/30 text-green-400"
                  : "bg-rust-deep/20 border-rust/30 text-rust"
              }`}>
                {passwordMsg.type === "success" ? "✓ " : "⚠ "}{passwordMsg.text}
              </div>
            )}

            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-cream-dim block mb-2">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
                className="w-full bg-espresso border border-cream/15 px-4 py-3 rounded-lg text-sm outline-none focus:border-crema transition-colors text-cream placeholder:text-cream/20"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-cream-dim block mb-2">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                className="w-full bg-espresso border border-cream/15 px-4 py-3 rounded-lg text-sm outline-none focus:border-crema transition-colors text-cream placeholder:text-cream/20"
                placeholder="Min. 8 characters"
              />
            </div>

            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-cream-dim block mb-2">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full bg-espresso border border-cream/15 px-4 py-3 rounded-lg text-sm outline-none focus:border-crema transition-colors text-cream placeholder:text-cream/20"
                placeholder="Re-enter new password"
              />
            </div>

            <button
              type="submit"
              disabled={passwordLoading}
              className="w-full relative group overflow-hidden bg-rust hover:bg-rust-deep text-cream py-3 rounded-lg font-mono text-xs uppercase tracking-widest transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {passwordLoading ? (
                <><span className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin" /> Updating...</>
              ) : "Change Password"}
            </button>
          </form>
        </div>

        {/* ── Cafe Information ── */}
        <div className="bg-espresso-2/40 border border-cream/10 rounded-2xl p-7">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xl">☕</span>
            <div>
              <h2 className="font-display text-xl text-cream">Cafe Information</h2>
              <p className="font-mono text-[10px] text-cream-dim uppercase tracking-wider">Business details</p>
            </div>
          </div>

          <div className="space-y-3">
            {cafeInfo.map(({ label, value }) => (
              <div key={label} className="flex items-start justify-between py-3 border-b border-cream/8 last:border-0">
                <span className="font-mono text-[11px] uppercase tracking-wider text-cream-dim">{label}</span>
                <span className="font-mono text-xs text-cream text-right max-w-[55%]">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── System Info ── */}
        <div className="bg-espresso-2/40 border border-cream/10 rounded-2xl p-7">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xl">⚙️</span>
            <div>
              <h2 className="font-display text-xl text-cream">System Info</h2>
              <p className="font-mono text-[10px] text-cream-dim uppercase tracking-wider">App & version details</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { label: "App Name", value: "Brew Haven POS" },
              { label: "Version", value: "v1.0.0" },
              { label: "Stack", value: "MERN · Tailwind · Vercel" },
              { label: "Role", value: "Administrator" },
              { label: "Admin ID", value: userInfo?._id?.slice(-8)?.toUpperCase() || "—" },
              { label: "Developed By", value: "Laiba Hanif" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-start justify-between py-3 border-b border-cream/8 last:border-0">
                <span className="font-mono text-[11px] uppercase tracking-wider text-cream-dim">{label}</span>
                <span className={`font-mono text-xs text-right max-w-[55%] ${
                  label === "Developed By" ? "text-crema" : "text-cream"
                }`}>{value}</span>
              </div>
            ))}
          </div>

          {/* Status indicator */}
          <div className="mt-5 flex items-center gap-2 p-3 bg-green-900/10 border border-green-500/20 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-[11px] text-green-400 uppercase tracking-wider">System Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}
