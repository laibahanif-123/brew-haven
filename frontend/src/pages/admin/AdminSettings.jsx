import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useSettingsStore } from "../../store/settingsStore";
import api from "../../services/api";

const TABS = [
  { id: "profile",    icon: "👤", label: "Profile" },
  { id: "security",  icon: "🔐", label: "Security" },
  { id: "cafe",      icon: "☕", label: "Cafe Info" },
  { id: "system",    icon: "⚙️", label: "System" },
];

function Alert({ msg }) {
  if (!msg?.text) return null;
  const ok = msg.type === "success";
  return (
    <div className={`flex items-center gap-2 text-sm px-4 py-3 rounded-lg border font-mono ${ok ? "bg-green-900/20 border-green-500/30 text-green-400" : "bg-red-900/20 border-red-500/30 text-red-400"}`}>
      <span>{ok ? "✓" : "⚠"}</span> {msg.text}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="font-mono text-[11px] uppercase tracking-wider text-cream-dim block mb-2">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full bg-espresso border border-cream/15 px-4 py-3 rounded-lg text-sm outline-none focus:border-crema transition-colors text-cream placeholder:text-cream/20";

export default function AdminSettings() {
  const { userInfo, login } = useAuthStore();
  const { settings, fetchSettings, updateSettings } = useSettingsStore();
  const [activeTab, setActiveTab] = useState("profile");

  // ── Profile ──
  const [profile, setProfile] = useState({ name: userInfo?.name || "", email: userInfo?.email || "", phone: userInfo?.phone || "", bio: userInfo?.bio || "" });
  const [profileMsg, setProfileMsg] = useState({});
  const [profileLoading, setProfileLoading] = useState(false);

  // ── Security ──
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [showPw, setShowPw] = useState({ cur: false, nw: false, cf: false });
  const [passwordMsg, setPasswordMsg] = useState({});
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionLog] = useState([
    { device: "Chrome · Windows", location: "Mian Channu, PK", time: "Just now", active: true },
    { device: "Safari · iPhone", location: "Lahore, PK", time: "2 days ago", active: false },
  ]);

  // ── Cafe ──
  const [cafeSettings, setCafeSettings] = useState({ cafeName: "", location: "", phone: "", email: "", openingHours: "", established: "", tagline: "", website: "" });
  const [cafeMsg, setCafeMsg] = useState({});
  const [cafeLoading, setCafeLoading] = useState(false);

  useEffect(() => { fetchSettings(); }, []);
  useEffect(() => {
    if (settings) setCafeSettings({
      cafeName: settings.cafeName || "", location: settings.location || "",
      phone: settings.phone || "", email: settings.email || "",
      openingHours: settings.openingHours || "", established: settings.established || "",
      tagline: settings.tagline || "", website: settings.website || "",
    });
  }, [settings]);

  const handleProfileSave = async (e) => {
    e.preventDefault(); setProfileLoading(true); setProfileMsg({});
    try {
      const { data } = await api.put("/users/profile", { name: profile.name, email: profile.email, phone: profile.phone });
      login(data);
      setProfileMsg({ type: "success", text: "Profile updated successfully." });
    } catch (err) { setProfileMsg({ type: "error", text: err.response?.data?.message || "Failed to update profile." }); }
    finally { setProfileLoading(false); }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (!passwords.currentPassword) return setPasswordMsg({ type: "error", text: "Enter current password." });
    if (passwords.newPassword.length < 8) return setPasswordMsg({ type: "error", text: "New password must be 8+ characters." });
    if (passwords.newPassword !== passwords.confirmPassword) return setPasswordMsg({ type: "error", text: "Passwords do not match." });
    setPasswordLoading(true); setPasswordMsg({});
    try {
      const { data } = await api.put("/users/profile", { currentPassword: passwords.currentPassword, password: passwords.newPassword });
      login(data);
      setPasswordMsg({ type: "success", text: "Password changed successfully." });
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) { setPasswordMsg({ type: "error", text: err.response?.data?.message || "Failed to change password." }); }
    finally { setPasswordLoading(false); }
  };

  const handleCafeSave = async (e) => {
    e.preventDefault(); setCafeLoading(true); setCafeMsg({});
    const result = await updateSettings(cafeSettings);
    if (result.success) {
      setCafeMsg({ type: "success", text: "Cafe settings saved." });
    } else { setCafeMsg({ type: "error", text: result.message }); }
    setCafeLoading(false);
  };

  const pwInput = (name, show, toggleKey, placeholder) => (
    <div className="relative">
      <input type={show ? "text" : "password"} name={name}
        value={passwords[name]} onChange={e => setPasswords(p => ({ ...p, [name]: e.target.value }))}
        className={inputCls + " pr-12"} placeholder={placeholder} />
      <button type="button" onClick={() => setShowPw(p => ({ ...p, [toggleKey]: !p[toggleKey] }))}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-cream-dim hover:text-crema transition-colors text-lg">
        {show ? "🙈" : "👁️"}
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl text-cream">Settings</h1>
          <p className="font-mono text-xs text-cream-dim mt-1 tracking-wider uppercase">Manage your account &amp; cafe info</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-crema/10 border border-crema/30 flex items-center justify-center font-display text-xl text-crema font-bold">
          {userInfo?.name?.[0]?.toUpperCase() || "A"}
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex gap-1 p-1 bg-espresso-2/60 border border-cream/10 rounded-xl w-fit">
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-crema text-espresso shadow-lg"
                : "text-cream-dim hover:text-cream"
            }`}>
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* ════ PROFILE TAB ════ */}
      {activeTab === "profile" && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Avatar card */}
          <div className="bg-espresso-2/40 border border-cream/10 rounded-2xl p-7 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-24 h-24 rounded-full bg-crema/10 border-2 border-crema/30 flex items-center justify-center font-display text-5xl text-crema font-bold">
              {userInfo?.name?.[0]?.toUpperCase() || "A"}
            </div>
            <div>
              <p className="font-display text-xl text-cream">{userInfo?.name || "Admin"}</p>
              <p className="font-mono text-xs text-cream-dim mt-1">{userInfo?.email}</p>
            </div>
            <span className="px-3 py-1 bg-crema/10 border border-crema/30 rounded-full font-mono text-[11px] text-crema uppercase tracking-wider">
              Administrator
            </span>
            <div className="w-full pt-4 border-t border-cream/10 space-y-2">
              {[
                { label: "Member Since", value: userInfo?.createdAt ? new Date(userInfo.createdAt).getFullYear() : "2026" },
                { label: "Admin ID", value: userInfo?._id?.slice(-8)?.toUpperCase() || "—" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span className="font-mono text-[11px] text-cream-dim uppercase">{label}</span>
                  <span className="font-mono text-xs text-cream">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Edit form */}
          <div className="lg:col-span-2 bg-espresso-2/40 border border-cream/10 rounded-2xl p-7">
            <h2 className="font-display text-xl text-cream mb-6">Edit Profile</h2>
            <form onSubmit={handleProfileSave} className="space-y-4">
              <Alert msg={profileMsg} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Full Name">
                  <input type="text" name="name" value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                    className={inputCls} placeholder="Admin Name" />
                </Field>
                <Field label="Phone">
                  <input type="tel" name="phone" value={profile.phone} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
                    className={inputCls} placeholder="03xx-xxxxxxx" />
                </Field>
              </div>
              <Field label="Email Address">
                <input type="email" name="email" value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                  className={inputCls} placeholder="admin@brewhaven.pk" />
              </Field>
              <button type="submit" disabled={profileLoading}
                className="w-full bg-crema hover:bg-crema-soft text-espresso py-3 rounded-lg font-mono text-xs uppercase tracking-widest transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2">
                {profileLoading ? <><span className="w-4 h-4 border-2 border-espresso/30 border-t-espresso rounded-full animate-spin" /> Saving...</> : "Save Profile"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ════ SECURITY TAB ════ */}
      {activeTab === "security" && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Change Password */}
          <div className="bg-espresso-2/40 border border-cream/10 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xl">🔐</span>
              <div>
                <h2 className="font-display text-xl text-cream">Change Password</h2>
                <p className="font-mono text-[10px] text-cream-dim uppercase tracking-wider">Update your login password</p>
              </div>
            </div>
            <form onSubmit={handlePasswordSave} className="space-y-4">
              <Alert msg={passwordMsg} />
              <Field label="Current Password">{pwInput("currentPassword", showPw.cur, "cur", "••••••••")}</Field>
              <Field label="New Password">{pwInput("newPassword", showPw.nw, "nw", "Min. 8 characters")}</Field>
              <Field label="Confirm New Password">{pwInput("confirmPassword", showPw.cf, "cf", "Re-enter new password")}</Field>

              {/* Password strength */}
              {passwords.newPassword && (
                <div className="space-y-1">
                  <div className="flex gap-1">
                    {[1,2,3,4].map(i => {
                      const strength = passwords.newPassword.length >= i * 3 ? (i <= 1 ? "bg-red-500" : i <= 2 ? "bg-yellow-500" : i <= 3 ? "bg-blue-500" : "bg-green-500") : "bg-cream/10";
                      return <div key={i} className={`h-1 flex-1 rounded-full transition-all ${strength}`} />;
                    })}
                  </div>
                  <p className="font-mono text-[10px] text-cream-dim">
                    {passwords.newPassword.length < 4 ? "Weak" : passwords.newPassword.length < 8 ? "Fair" : passwords.newPassword.length < 12 ? "Good" : "Strong"}
                  </p>
                </div>
              )}

              <button type="submit" disabled={passwordLoading}
                className="w-full bg-rust hover:bg-rust-deep text-cream py-3 rounded-lg font-mono text-xs uppercase tracking-widest transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2">
                {passwordLoading ? <><span className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin" /> Updating...</> : "Change Password"}
              </button>
            </form>
          </div>

          {/* Sessions & 2FA */}
          <div className="space-y-6">
            {/* Two Factor */}
            <div className="bg-espresso-2/40 border border-cream/10 rounded-2xl p-7">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🛡️</span>
                  <div>
                    <h2 className="font-display text-lg text-cream">Two-Factor Auth</h2>
                    <p className="font-mono text-[10px] text-cream-dim uppercase tracking-wider">Extra login security</p>
                  </div>
                </div>
                <button onClick={() => setTwoFactor(p => !p)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${twoFactor ? "bg-crema" : "bg-cream/20"}`}>
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-espresso transition-all duration-300 ${twoFactor ? "left-7" : "left-1"}`} />
                </button>
              </div>
              <p className="font-mono text-xs text-cream-dim leading-relaxed">
                {twoFactor ? "✓ 2FA is enabled. Your account has extra protection." : "Enable 2FA to add an extra layer of security to your admin account."}
              </p>
            </div>

            {/* Active Sessions */}
            <div className="bg-espresso-2/40 border border-cream/10 rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xl">📱</span>
                <div>
                  <h2 className="font-display text-lg text-cream">Active Sessions</h2>
                  <p className="font-mono text-[10px] text-cream-dim uppercase tracking-wider">Logged-in devices</p>
                </div>
              </div>
              <div className="space-y-3">
                {sessionLog.map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-espresso/50 rounded-lg border border-cream/8">
                    <div>
                      <p className="font-mono text-xs text-cream">{s.device}</p>
                      <p className="font-mono text-[10px] text-cream-dim mt-0.5">{s.location} · {s.time}</p>
                    </div>
                    {s.active
                      ? <span className="flex items-center gap-1.5 font-mono text-[10px] text-green-400"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />Active</span>
                      : <button className="font-mono text-[10px] text-rust hover:text-rust-deep transition-colors uppercase tracking-wider">Revoke</button>
                    }
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════ CAFE INFO TAB ════ */}
      {activeTab === "cafe" && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-espresso-2/40 border border-cream/10 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xl">☕</span>
              <div>
                <h2 className="font-display text-xl text-cream">Cafe Information</h2>
                <p className="font-mono text-[10px] text-cream-dim uppercase tracking-wider">Business details</p>
              </div>
            </div>
            <form onSubmit={handleCafeSave} className="space-y-4">
              <Alert msg={cafeMsg} />
              <Field label="Cafe Name">
                <input type="text" name="cafeName" value={cafeSettings.cafeName} onChange={e => setCafeSettings(p => ({ ...p, cafeName: e.target.value }))}
                  className={inputCls} placeholder="Brew Haven" />
              </Field>
              <Field label="Tagline">
                <input type="text" name="tagline" value={cafeSettings.tagline} onChange={e => setCafeSettings(p => ({ ...p, tagline: e.target.value }))}
                  className={inputCls} placeholder="Where every sip tells a story" />
              </Field>
              <Field label="Location / Address">
                <input type="text" name="location" value={cafeSettings.location} onChange={e => setCafeSettings(p => ({ ...p, location: e.target.value }))}
                  className={inputCls} placeholder="Mian Channu, Punjab, Pakistan" />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Phone">
                  <input type="text" name="phone" value={cafeSettings.phone} onChange={e => setCafeSettings(p => ({ ...p, phone: e.target.value }))}
                    className={inputCls} placeholder="+92 300 0000000" />
                </Field>
                <Field label="Email">
                  <input type="email" name="email" value={cafeSettings.email} onChange={e => setCafeSettings(p => ({ ...p, email: e.target.value }))}
                    className={inputCls} placeholder="hello@brewhaven.pk" />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Opening Hours">
                  <input type="text" name="openingHours" value={cafeSettings.openingHours} onChange={e => setCafeSettings(p => ({ ...p, openingHours: e.target.value }))}
                    className={inputCls} placeholder="7:00 AM – 9:00 PM" />
                </Field>
                <Field label="Established">
                  <input type="text" name="established" value={cafeSettings.established} onChange={e => setCafeSettings(p => ({ ...p, established: e.target.value }))}
                    className={inputCls} placeholder="2026" />
                </Field>
              </div>
              <Field label="Website">
                <input type="url" name="website" value={cafeSettings.website} onChange={e => setCafeSettings(p => ({ ...p, website: e.target.value }))}
                  className={inputCls} placeholder="https://brewhaven.pk" />
              </Field>
              <button type="submit" disabled={cafeLoading}
                className="w-full bg-crema hover:bg-crema-soft text-espresso py-3 rounded-lg font-mono text-xs uppercase tracking-widest transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2">
                {cafeLoading ? <><span className="w-4 h-4 border-2 border-espresso/30 border-t-espresso rounded-full animate-spin" /> Saving...</> : "Save Cafe Settings"}
              </button>
            </form>
          </div>

          {/* Live preview card */}
          <div className="bg-espresso-2/40 border border-cream/10 rounded-2xl p-7">
            <h2 className="font-display text-xl text-cream mb-6">Live Preview</h2>
            <div className="space-y-4">
              <div className="p-5 bg-espresso/60 rounded-xl border border-cream/10">
                <p className="font-display text-2xl text-crema">{cafeSettings.cafeName || "Brew Haven"}</p>
                {cafeSettings.tagline && <p className="font-mono text-xs text-cream-dim mt-1 italic">"{cafeSettings.tagline}"</p>}
              </div>
              {[
                { icon: "📍", label: "Location", value: cafeSettings.location },
                { icon: "📞", label: "Phone", value: cafeSettings.phone },
                { icon: "📧", label: "Email", value: cafeSettings.email },
                { icon: "🕐", label: "Hours", value: cafeSettings.openingHours },
                { icon: "🌐", label: "Website", value: cafeSettings.website },
                { icon: "🗓️", label: "Established", value: cafeSettings.established },
              ].filter(r => r.value).map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-3 py-2 border-b border-cream/8 last:border-0">
                  <span className="text-base">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[10px] text-cream-dim uppercase tracking-wider">{label}</p>
                    <p className="font-mono text-xs text-cream mt-0.5 truncate">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ════ SYSTEM TAB ════ */}
      {activeTab === "system" && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* App Info */}
          <div className="bg-espresso-2/40 border border-cream/10 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xl">⚙️</span>
              <div>
                <h2 className="font-display text-xl text-cream">System Info</h2>
                <p className="font-mono text-[10px] text-cream-dim uppercase tracking-wider">App &amp; version details</p>
              </div>
            </div>
            <div className="space-y-1">
              {[
                { label: "App Name",     value: "Brew Haven POS" },
                { label: "Version",      value: "v1.0.0" },
                { label: "Stack",        value: "MERN · Tailwind · Vercel" },
                { label: "Database",     value: "MongoDB Atlas" },
                { label: "Auth",         value: "JWT · Bcrypt" },
                { label: "Role",         value: "Administrator" },
                { label: "Admin ID",     value: userInfo?._id?.slice(-8)?.toUpperCase() || "—" },
                { label: "Developed By", value: "Laiba Hanif", highlight: true },
              ].map(({ label, value, highlight }) => (
                <div key={label} className="flex items-center justify-between py-3 border-b border-cream/8 last:border-0">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-cream-dim">{label}</span>
                  <span className={`font-mono text-xs ${highlight ? "text-crema" : "text-cream"}`}>{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2 p-3 bg-green-900/10 border border-green-500/20 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-[11px] text-green-400 uppercase tracking-wider">System Online</span>
            </div>
          </div>

          {/* Quick Stats + Danger Zone */}
          <div className="space-y-6">
            <div className="bg-espresso-2/40 border border-cream/10 rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xl">📊</span>
                <div>
                  <h2 className="font-display text-lg text-cream">Quick Stats</h2>
                  <p className="font-mono text-[10px] text-cream-dim uppercase tracking-wider">At a glance</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Last Login", value: "Today" },
                  { label: "Time Zone", value: "PKT +5:00" },
                  { label: "Language", value: "English" },
                  { label: "Currency", value: "PKR (Rs.)" },
                ].map(({ label, value }) => (
                  <div key={label} className="p-4 bg-espresso/50 rounded-xl border border-cream/8 text-center">
                    <p className="font-mono text-xs text-cream">{value}</p>
                    <p className="font-mono text-[10px] text-cream-dim uppercase tracking-wider mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-rust-deep/10 border border-rust/20 rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xl">⚠️</span>
                <div>
                  <h2 className="font-display text-lg text-rust">Danger Zone</h2>
                  <p className="font-mono text-[10px] text-cream-dim uppercase tracking-wider">Irreversible actions</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-espresso/40 rounded-lg border border-cream/8">
                  <div>
                    <p className="font-mono text-xs text-cream">Export All Data</p>
                    <p className="font-mono text-[10px] text-cream-dim mt-0.5">Download orders &amp; products</p>
                  </div>
                  <button className="px-4 py-2 bg-cream/10 hover:bg-cream/20 text-cream border border-cream/20 rounded-lg font-mono text-[11px] uppercase tracking-wider transition-colors">
                    Export
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-rust-deep/10 rounded-lg border border-rust/20">
                  <div>
                    <p className="font-mono text-xs text-rust">Clear All Orders</p>
                    <p className="font-mono text-[10px] text-cream-dim mt-0.5">Permanently delete order history</p>
                  </div>
                  <button className="px-4 py-2 bg-rust/20 hover:bg-rust/30 text-rust border border-rust/30 rounded-lg font-mono text-[11px] uppercase tracking-wider transition-colors">
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
