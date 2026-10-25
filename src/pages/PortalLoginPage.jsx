import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function PortalLoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("admin"); // 'admin' | 'merchant'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Gợi ý thông tin đăng nhập nhanh
  const fillDemoAccount = (selectedRole) => {
    setRole(selectedRole);
    setError("");
    if (selectedRole === "admin") {
      setUsername("admin@localeats.vn");
      setPassword("admin123");
    } else {
      setUsername("chuquan@huynhhoa.vn");
      setPassword("quan123");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Vui lòng nhập đầy đủ tài khoản và mật khẩu.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (role === "admin") {
        // Lưu phiên đăng nhập
        sessionStorage.setItem("localeats_admin_auth", "true");
        navigate("/admin");
      } else {
        // Lưu phiên đăng nhập chủ quán
        sessionStorage.setItem("localeats_merchant_auth", "true");
        navigate("/merchant");
      }
    }, 600);
  };

  return (
    <div className="min-h-screen w-full bg-[#111827] flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E84A27]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="px-6 py-5 flex items-center justify-between border-b border-gray-800/80 bg-gray-900/60 backdrop-blur-md z-10">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#E84A27] to-[#FF9F1C] flex items-center justify-center shadow-lg shadow-[#E84A27]/25 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-white text-lg">location_on</span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm text-[#E84A27] tracking-wider leading-none">LOCALEATS</span>
            <span className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase mt-0.5">Management Portal</span>
          </div>
        </Link>

        <Link
          to="/"
          className="flex items-center gap-1.5 text-xs font-bold text-gray-300 hover:text-white bg-gray-800/80 hover:bg-gray-700/80 px-3.5 py-2 rounded-xl transition-all border border-gray-700"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Về trang chủ bản đồ</span>
        </Link>
      </header>

      {/* Main Login Box */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 z-10">
        <div className="w-full max-w-md bg-gray-900/90 border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl animate-fadeIn">
          {/* Role Tabs */}
          <div className="flex p-1 bg-gray-800/80 rounded-2xl mb-6 border border-gray-700/60">
            <button
              type="button"
              onClick={() => {
                setRole("admin");
                setError("");
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                role === "admin"
                  ? "bg-[#E84A27] text-white shadow-lg shadow-[#E84A27]/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
              QUẢN TRỊ VIÊN (ADMIN)
            </button>
            <button
              type="button"
              onClick={() => {
                setRole("merchant");
                setError("");
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                role === "merchant"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined text-sm">storefront</span>
              CHỦ QUÁN ĂN (MERCHANT)
            </button>
          </div>

          <div className="text-center mb-6">
            <div className="inline-flex p-3 rounded-2xl bg-gray-800/80 border border-gray-700 text-white mb-3">
              <span className="material-symbols-outlined text-2xl text-[#E84A27]">
                {role === "admin" ? "shield_person" : "storefront"}
              </span>
            </div>
            <h2 className="text-xl font-black text-white tracking-tight">
              {role === "admin" ? "Đăng Nhập Quản Trị Hệ Thống" : "Cổng Quản Lý Gian Hàng Ẩm Thực"}
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              {role === "admin"
                ? "Dành cho nhân sự điều hành nền tảng bản đồ LOCALEATS"
                : "Dành cho chủ nhà hàng, quán ăn đối tác quản lý menu và tiếp nhận khách"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">error</span>
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">
                {role === "admin" ? "Email Quản trị viên" : "Tài khoản đối tác / Email"}
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-gray-500 text-lg">
                  account_circle
                </span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={role === "admin" ? "admin@localeats.vn" : "chuquan@huynhhoa.vn"}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-xs font-medium focus:outline-none focus:border-[#E84A27] transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-gray-300">Mật khẩu</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Vui lòng liên hệ bộ phận hỗ trợ LOCALEATS qua Hotline 1900-EATS."); }} className="text-[11px] text-[#E84A27] hover:underline">
                  Quên mật khẩu?
                </a>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-gray-500 text-lg">
                  lock
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-xs font-medium focus:outline-none focus:border-[#E84A27] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-xl text-xs font-black text-white flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 disabled:opacity-60 ${
                role === "admin"
                  ? "bg-[#E84A27] hover:bg-[#d43d1c] shadow-[#E84A27]/25"
                  : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25"
              }`}
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Đang xác thực bảo mật...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">login</span>
                  <span>ĐĂNG NHẬP VÀO {role === "admin" ? "ADMIN" : "DASHBOARD CHỦ QUÁN"}</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Autofill */}
          <div className="mt-6 pt-5 border-t border-gray-800 text-center">
            <span className="text-[11px] text-gray-400 font-semibold block mb-2.5">
              ⚡ Tài khoản thử nghiệm nhanh (Click để điền tự động):
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fillDemoAccount("admin")}
                className="flex-1 py-1.5 px-2 bg-gray-800/90 hover:bg-gray-700 border border-gray-700 text-gray-300 rounded-lg text-[10px] font-bold transition-all"
              >
                🔑 Thử quyền Admin
              </button>
              <button
                type="button"
                onClick={() => fillDemoAccount("merchant")}
                className="flex-1 py-1.5 px-2 bg-gray-800/90 hover:bg-gray-700 border border-gray-700 text-gray-300 rounded-lg text-[10px] font-bold transition-all"
              >
                🏪 Thử quyền Chủ Quán
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-gray-500 border-t border-gray-800/60 z-10">
        © 2026 LOCALEATS Vietnam. Hệ thống thông tin địa điểm ẩm thực & điều phối dẫn đường thông minh.
      </footer>
    </div>
  );
}
