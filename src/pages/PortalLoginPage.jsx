import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function PortalLoginPage() {
  const navigate = useNavigate();
  const [currentRole, setCurrentRole] = useState("partner"); // 'partner' | 'admin'
  const [identifier, setIdentifier] = useState("quanngon@localeats.vn");
  const [password, setPassword] = useState("12345678");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRoleChange = (role) => {
    setCurrentRole(role);
    if (role === "partner") {
      setIdentifier("quanngon@localeats.vn");
      setPassword("12345678");
    } else {
      setIdentifier("admin.lead@localeats.vn");
      setPassword("admin@2026");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      if (currentRole === "partner") {
        sessionStorage.setItem("localeats_merchant_auth", "true");
        navigate("/merchant");
      } else {
        sessionStorage.setItem("localeats_admin_auth", "true");
        navigate("/admin");
      }
    }, 600);
  };

  return (
    <main className="w-full bg-[#FFF8F5] min-h-screen text-[#231A11] flex flex-col justify-between selection:bg-[#DE3618] selection:text-white">
      <div className="w-full min-h-screen flex items-center justify-center p-3 sm:p-6 lg:p-10 relative overflow-hidden bg-[#FFF8F5]">
        {/* Subtle Ambient Culinary Glows */}
        <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-[#FFDCC2] opacity-50 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-[#FFDAD3] opacity-40 blur-3xl pointer-events-none" />

        <div className="w-full max-w-6xl rounded-3xl bg-white shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10 border border-[#F2DFD1]/60">
          {/* LEFT EDITORIAL / SHOWCASE PANEL */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#FFF1E8] via-[#FEEADC] to-[#F2DFD1] p-6 sm:p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
            {/* Ambient glows inside left panel */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FD9013]/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-10 left-4 w-48 h-48 bg-[#DE3618]/10 rounded-full blur-xl pointer-events-none" />

            {/* Brand Top Area */}
            <div className="relative z-10">
              <Link to="/" className="inline-flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-md p-1.5 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[#DE3618] text-2xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
                    local_fire_department
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-2xl tracking-tight text-[#231A11]">LOCALEATS</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#DE3618] text-white text-xs uppercase tracking-wider font-bold shadow-sm">
                      Portal
                    </span>
                  </div>
                  <p className="text-xs text-[#5C403A] font-medium">Bản Đồ Ẩm Thực &amp; Quản Lý Đối Tác</p>
                </div>
              </Link>

              <div className="mt-8 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-sm border border-[#F2DFD1]">
                <span className="material-symbols-outlined text-[#8F4E00] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_fire_department
                </span>
                <span className="text-xs text-[#8F4E00] font-semibold">Hệ thống Quản lý Ẩm thực Thông minh</span>
              </div>

              <div className="mt-6">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#231A11] font-extrabold leading-tight tracking-tight">
                  Đưa tinh hoa món ngon đến hàng triệu thực khách.
                </h1>
                <p className="mt-4 text-sm text-[#5C403A] leading-relaxed">
                  Giải pháp hiển thị vị trí theo thời gian thực, tối ưu lượt ghé quán và kết nối mạng lưới cộng đồng yêu ẩm thực chuyên sâu toàn quốc.
                </p>
              </div>
            </div>

            {/* Visual Proof & Metrics Bento Showcase */}
            <div className="mt-8 relative z-10 space-y-3.5">
              {/* Metric Card 1 */}
              <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-sm shadow-sm flex items-center gap-4 border border-[#F2DFD1]/50">
                <div className="w-12 h-12 rounded-xl bg-[#B1F0CE] flex items-center justify-center text-[#002114] shrink-0">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    storefront
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-bold text-[#231A11]">2.500+</span>
                    <span className="text-xs text-[#2C694E] font-bold">Toàn quốc</span>
                  </div>
                  <p className="text-xs text-[#5C403A] truncate">Nhà hàng &amp; quán ăn đang kích hoạt</p>
                </div>
              </div>

              {/* Metric Card 2 */}
              <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-sm shadow-sm flex items-center gap-4 border border-[#F2DFD1]/50">
                <div className="w-12 h-12 rounded-xl bg-[#FFDCC2] flex items-center justify-center text-[#2E1500] shrink-0">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    near_me
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-bold text-[#8F4E00]">+320%</span>
                    <span className="text-xs text-[#DE3618] font-bold">Tăng trưởng</span>
                  </div>
                  <p className="text-xs text-[#5C403A] truncate">Lượt khách bấm chỉ đường GPS mỗi tháng</p>
                </div>
              </div>

              {/* Feature Spotlight Graphic */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#B91D00] to-[#DE3618] text-white flex items-center justify-between shadow-lg shadow-[#DE3618]/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">share_location</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">Ghim vị trí chuẩn xác</p>
                    <p className="text-xs text-[#FFDAD3] opacity-90">Độ trễ cập nhật thực đơn &lt; 5 giây</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </div>
            </div>

            {/* Bottom Testimonial Snippet */}
            <div className="mt-8 pt-6 relative z-10 flex items-center gap-3 border-t border-[#F2DFD1]/80">
              <div className="flex -space-x-2 shrink-0">
                <div className="w-8 h-8 rounded-full bg-[#FD9013] text-white text-xs flex items-center justify-center font-bold shadow ring-2 ring-white">
                  H
                </div>
                <div className="w-8 h-8 rounded-full bg-[#2C694E] text-white text-xs flex items-center justify-center font-bold shadow ring-2 ring-white">
                  T
                </div>
                <div className="w-8 h-8 rounded-full bg-[#DE3618] text-white text-xs flex items-center justify-center font-bold shadow ring-2 ring-white">
                  B
                </div>
              </div>
              <p className="text-xs text-[#5C403A]">
                Được bảo chứng bởi các chủ quán tại Hà Nội, TP.HCM &amp; Đà Nẵng
              </p>
            </div>
          </div>

          {/* RIGHT AUTHENTICATION PANEL */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-12 flex flex-col justify-between bg-white">
            <div>
              {/* Header Context */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#8F4E00] font-bold">Cổng Đăng Nhập Tập Trung</p>
                  <h2 className="text-2xl sm:text-3xl text-[#231A11] font-extrabold mt-1">Chào mừng trở lại</h2>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF1E8] text-[#5C403A] text-xs font-semibold self-start">
                  <span className="w-2 h-2 rounded-full bg-[#2C694E] animate-pulse" />
                  Máy chủ ổn định (v4.8.2)
                </div>
              </div>

              {/* Segmented Role Switcher Tab */}
              <div className="p-1 rounded-full bg-[#F8E5D6] flex gap-1 mb-6">
                <button
                  type="button"
                  onClick={() => handleRoleChange("partner")}
                  className={`flex-1 py-2.5 px-3 sm:px-4 rounded-full text-xs sm:text-sm text-center font-bold transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 ${
                    currentRole === "partner"
                      ? "bg-[#DE3618] text-white shadow-md shadow-[#DE3618]/25"
                      : "text-[#5C403A] hover:text-[#231A11]"
                  }`}
                >
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: currentRole === "partner" ? "'FILL' 1" : "'FILL' 0" }}>
                    restaurant
                  </span>
                  Chủ Quán / Đối Tác
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleChange("admin")}
                  className={`flex-1 py-2.5 px-3 sm:px-4 rounded-full text-xs sm:text-sm text-center font-bold transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 ${
                    currentRole === "admin"
                      ? "bg-[#231A11] text-white shadow-md"
                      : "text-[#5C403A] hover:text-[#231A11]"
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
                  Super Admin
                </button>
              </div>

              {/* Dynamic Role Description Banner */}
              <div className="mb-6 p-3.5 rounded-2xl bg-[#FEEADC] flex items-center gap-3 border border-[#F2DFD1]">
                <span className={`material-symbols-outlined text-xl ${currentRole === "partner" ? "text-[#DE3618]" : "text-[#FD9013]"}`}>
                  {currentRole === "partner" ? "store" : "admin_panel_settings"}
                </span>
                <p className="text-xs text-[#231A11] leading-relaxed">
                  {currentRole === "partner"
                    ? "Đăng nhập dành cho Chủ quán để cập nhật bàn trống, định vị gian hàng và quản lý khuyến mãi."
                    : "Cổng điều hành nội bộ: Kiểm duyệt quán ăn, phân quyền địa bàn và giám sát bản đồ toàn mạng lưới."}
                </p>
              </div>

              {/* Form Area */}
              <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                {/* Username/Email Field */}
                <div>
                  <label className="block text-xs sm:text-sm text-[#231A11] font-semibold mb-2">
                    {currentRole === "partner"
                      ? "Email / Số điện thoại hoặc Mã số thuế quán"
                      : "Mã nhân sự / Email Quản trị hệ thống (@localeats.admin)"}
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-4 pointer-events-none text-[#5C403A]">
                      <span className="material-symbols-outlined text-xl">account_circle</span>
                    </div>
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      required
                      placeholder={
                        currentRole === "partner"
                          ? "Ví dụ: quanngon@localeats.vn hoặc MST: 0312xxxxxx"
                          : "Ví dụ: admin.lead@localeats.vn"
                      }
                      className="w-full pl-12 pr-4 py-3 sm:py-3.5 rounded-full bg-[#FFF1E8] text-[#231A11] text-sm placeholder-[#5C403A]/50 focus:bg-white focus:ring-2 focus:ring-[#DE3618]/30 focus:shadow-md focus:outline-none transition-all border border-transparent focus:border-[#DE3618]"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs sm:text-sm text-[#231A11] font-semibold">
                      Mật khẩu tài khoản
                    </label>
                    <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Vui lòng liên hệ hotline đối tác 1900 8899 để cấp lại mật khẩu!"); }} className="text-xs font-semibold text-[#DE3618] hover:underline">
                      Quên mật khẩu?
                    </a>
                  </div>
                  <div className="relative flex items-center">
                    <div className="absolute left-4 pointer-events-none text-[#5C403A]">
                      <span className="material-symbols-outlined text-xl">lock</span>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Nhập tối thiểu 8 ký tự an toàn"
                      className="w-full pl-12 pr-12 py-3 sm:py-3.5 rounded-full bg-[#FFF1E8] text-[#231A11] text-sm placeholder-[#5C403A]/50 focus:bg-white focus:ring-2 focus:ring-[#DE3618]/30 focus:shadow-md focus:outline-none transition-all border border-transparent focus:border-[#DE3618]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-[#5C403A] hover:text-[#231A11] focus:outline-none transition-colors"
                      aria-label="Hiển thị hoặc ẩn mật khẩu"
                    >
                      <span className="material-symbols-outlined text-xl">
                        {showPassword ? "visibility" : "visibility_off"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Remember me & Quick Safety Check */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-[#DE3618] focus:ring-0 accent-[#DE3618] cursor-pointer"
                    />
                    <span className="text-xs text-[#5C403A]">Ghi nhớ đăng nhập trên thiết bị này</span>
                  </label>
                  <span className="text-xs text-[#2C694E] flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-sm">shield</span> Phiên mã hóa SSL
                  </span>
                </div>

                {/* Main CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 sm:py-4 px-6 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg transition-transform active:scale-95 text-white ${
                    currentRole === "partner"
                      ? "bg-[#DE3618] hover:bg-[#B91D00] shadow-[#DE3618]/30"
                      : "bg-[#231A11] hover:bg-black shadow-black/25"
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">
                    {isSubmitting ? "hourglass_top" : "login"}
                  </span>
                  <span>
                    {isSubmitting
                      ? "Đang xác thực thông tin..."
                      : currentRole === "partner"
                      ? "Đăng nhập vào Portal Đối Tác"
                      : "Đăng nhập Hệ thống Super Admin"}
                  </span>
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="h-px bg-[#F2DFD1] w-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white px-3 text-xs text-[#5C403A] uppercase tracking-wider font-semibold">
                    Hoặc đăng nhập nhanh qua
                  </span>
                </div>
              </div>

              {/* Social / Fast Auth Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => alert("Tính năng Google Business Profile đang đồng bộ qua OAuth!")}
                  className="py-2.5 px-4 rounded-full bg-[#FFF1E8] hover:bg-[#FEEADC] text-[#231A11] text-xs font-bold flex items-center justify-center gap-2 transition-colors border border-[#F2DFD1]"
                >
                  <span className="material-symbols-outlined text-[#FD9013] text-lg">store</span>
                  Google Business Profile
                </button>
                <button
                  type="button"
                  onClick={() => alert("Tính năng Zalo OA đang liên kết dữ liệu!")}
                  className="py-2.5 px-4 rounded-full bg-[#FFF1E8] hover:bg-[#FEEADC] text-[#231A11] text-xs font-bold flex items-center justify-center gap-2 transition-colors border border-[#F2DFD1]"
                >
                  <span className="material-symbols-outlined text-[#2C694E] text-lg">verified_user</span>
                  Zalo Doanh Nghiệp (OA)
                </button>
              </div>

              {/* Merchant Onboarding Promotion */}
              <div className="mt-6 p-4 rounded-2xl bg-[#FFF1E8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-[#F2DFD1]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFDCC2] flex items-center justify-center text-[#2E1500] shrink-0">
                    <span className="material-symbols-outlined text-xl">add_business</span>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-[#231A11] font-bold">Chưa có tài khoản gian hàng?</p>
                    <p className="text-xs text-[#5C403A]">Đăng ký mở quán trên bản đồ LOCALEATS chỉ 3 phút</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => alert("Mẫu đăng ký chủ quán mới đã được mở!")}
                  className="px-4 py-2 rounded-full bg-[#FD9013] hover:bg-[#8F4E00] text-white text-xs font-bold shrink-0 transition-colors shadow-sm"
                >
                  Đăng ký ngay
                </button>
              </div>
            </div>

            {/* Security & Support Footer */}
            <div className="mt-8 pt-5 border-t border-[#F2DFD1] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 text-[#5C403A] text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-[#2C694E]">support_agent</span>
                  <span>
                    Hotline đối tác 24/7: <strong className="text-[#231A11]">1900 8899 (Phím 1)</strong>
                  </span>
                </div>
                <div className="flex items-center gap-3 font-medium">
                  <Link to="/" className="text-[#DE3618] font-bold hover:underline">
                    ← Trở về Bản đồ Khách
                  </Link>
                  <span>•</span>
                  <a href="#guide" onClick={(e) => { e.preventDefault(); alert("Hướng dẫn đối tác: Đăng nhập -> Quản lý món -> Bật nhận khách"); }} className="hover:text-[#DE3618] transition-colors">
                    Hướng dẫn chủ quán
                  </a>
                </div>
              </div>

              {/* Security Badge Row */}
              <div className="p-3 rounded-xl bg-[#FEEADC] flex flex-wrap items-center justify-between gap-3 border border-[#F2DFD1]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#DE3618] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                  <span className="text-[11px] text-[#231A11] uppercase tracking-wider font-bold">
                    Chứng nhận Bảo mật SSL 256-bit
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[#5C403A] text-[11px] font-semibold">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-[#2C694E]">check_circle</span> 2FA Quán ăn kích hoạt
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-[#FD9013]">database</span> Tự động sao lưu Cloud
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
