import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { places } from "../data/places";
import { apiFetch } from "../utils/api";

// Import 7 High-Fidelity Stitch Merchant Tabs
import MerchantOverviewTab from "./merchant/MerchantOverviewTab";
import MerchantMenuTab from "./merchant/MerchantMenuTab";
import MerchantMapTab from "./merchant/MerchantMapTab";
import MerchantAnalyticsTab from "./merchant/MerchantAnalyticsTab";
import MerchantVipTab from "./merchant/MerchantVipTab";
import MerchantReviewsTab from "./merchant/MerchantReviewsTab";
import MerchantSettingsTab from "./merchant/MerchantSettingsTab";

export default function MerchantDashboardPage() {
  const [selectedPlaceId] = useState(1);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [merchantData, setMerchantData] = useState(null);

  useEffect(() => {
    let mounted = true;
    apiFetch("/api/merchant/overview")
      .then((data) => {
        if (mounted && data) setMerchantData(data);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const currentPlace = useMemo(() => {
    const base = places.find((p) => p.id === selectedPlaceId) || places[0];
    if (merchantData?.store) {
      return {
        ...base,
        ...merchantData.store,
        district: merchantData.store.address || base.district,
        merchantStats: merchantData.stats,
        recentVisits: merchantData.recentVisits,
        activeNavigations: merchantData.activeNavigations,
      };
    }
    return base;
  }, [selectedPlaceId, merchantData]);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "dashboard" },
    { id: "quan-cua-toi", label: "Quán của tôi & Menu", icon: "storefront" },
    { id: "ban-do-chi-duong", label: "Bản đồ & Chỉ đường GPS", icon: "explore" },
    { id: "phan-tich-bieu-do", label: "Phân tích & Biểu đồ", icon: "monitoring" },
    { id: "goi-vip-tai-tro", label: "Gói VIP & Tài trợ", icon: "local_fire_department" },
    { id: "danh-gia", label: "Đánh giá & Phản hồi", icon: "rate_review" },
    { id: "cai-dat", label: "Cài đặt gian hàng", icon: "settings" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#FFF8F5] text-[#231A11] flex antialiased selection:bg-[#DE3618] selection:text-white font-sans">
      {/* ASIDE SIDEBAR */}
      {/* MOBILE BACKDROP OVERLAY */}
      {isMobileNavOpen && (
        <div
          onClick={() => setIsMobileNavOpen(false)}
          className="fixed inset-0 bg-black/45 backdrop-blur-xs z-50 lg:hidden animate-fadeIn"
        />
      )}

      {/* ASIDE SIDEBAR */}
      <aside className={`fixed left-0 top-0 h-full w-72 bg-[#FFF1E8] z-50 flex flex-col justify-between shadow-2xl lg:shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-[#F2DFD1] overflow-y-auto styled-scrollbar transition-transform duration-300 ease-in-out ${
        isMobileNavOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        <div className="flex flex-col">
          {/* Logo brand */}
          <div className="h-16 flex items-center justify-between px-6 bg-[#FFF1E8] border-b border-[#F2DFD1]/70">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#DE3618] to-[#FD9013] flex items-center justify-center text-white shadow-md shadow-[#DE3618]/25 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_fire_department
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-[#DE3618] tracking-tight leading-none">LOCALEATS</span>
                <span className="text-[11px] text-[#5C403A] font-semibold mt-0.5">Merchant Portal</span>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(false)}
              className="lg:hidden p-1.5 rounded-xl text-[#5C403A] hover:bg-[#FEEADC] transition-colors"
              title="Đóng menu"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Chi nhánh đang chọn */}
          <div className="px-5 py-4">
            <div className="bg-[#FEEADC] rounded-2xl p-3 flex items-center justify-between border border-[#F2DFD1]">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2C694E] animate-pulse shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[#231A11] truncate">{currentPlace.name}</span>
                  <span className="text-[11px] text-[#5C403A] truncate">{currentPlace.district || "Chi nhánh Hoàn Kiếm"}</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#5C403A] text-lg cursor-pointer hover:text-[#231A11]">
                unfold_more
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 flex flex-col gap-1">
            {navItems.map((nav) => {
              const isActive = activeNav === nav.id;
              return (
                <button
                  key={nav.id}
                  onClick={() => {
                    setActiveNav(nav.id);
                    setIsMobileNavOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  type="button"
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#DE3618] text-white shadow-md shadow-[#DE3618]/25"
                      : "text-[#5C403A] hover:bg-[#F8E5D6] hover:text-[#231A11]"
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{nav.icon}</span>
                  <span>{nav.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Support Widget & Back to App */}
        <div className="p-4 flex flex-col gap-2">
          <div className="bg-[#FEEADC] p-3.5 rounded-2xl flex flex-col gap-2 border border-[#F2DFD1]">
            <div className="flex items-center gap-2 text-[#8F4E00]">
              <span className="material-symbols-outlined text-lg">support_agent</span>
              <span className="text-xs font-bold">Trung tâm hỗ trợ</span>
            </div>
            <p className="text-[11px] text-[#5C403A] leading-tight">Tổng đài đối tác ẩm thực trực tuyến 24/7</p>
            <a
              href="tel:19008899"
              className="inline-flex items-center gap-1 text-xs text-[#DE3618] font-bold hover:underline mt-0.5"
            >
              Hotline: 1900 8899 (Phím 1)
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </a>
          </div>

          <Link
            to="/"
            className="flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-[#5C403A] hover:bg-[#F8E5D6] hover:text-[#DE3618] transition-colors"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Về lại Bản đồ Khách
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="pl-0 lg:pl-72 flex-1 flex flex-col min-h-screen">
        {/* HEADER */}
        <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-[#FFF8F5]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-3 sm:px-6 lg:px-8 border-b border-[#F2DFD1]">
          {/* Mobile hamburger menu */}
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(true)}
            className="lg:hidden mr-2 p-2 rounded-xl text-[#231A11] hover:bg-[#FEEADC] transition-colors shrink-0"
            title="Mở menu quản trị quán"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
          {/* Search bar */}
          <div className="flex items-center gap-4 flex-1 max-w-lg">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#DE3618] text-xl">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm món ăn, đơn đặt bàn, mã coupon..."
                className="w-full h-10 pl-11 pr-4 rounded-full bg-white text-[#231A11] placeholder-[#906F69] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#DE3618]/25 border border-[#F2DFD1] transition-all"
              />
            </div>
          </div>

          {/* Right Status Controls */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-[#FEEADC] px-3.5 py-1.5 rounded-full border border-[#F2DFD1]">
              <span className={`w-2 h-2 rounded-full ${isOpen ? "bg-[#2C694E] animate-pulse" : "bg-gray-400"}`} />
              <span className="text-xs text-[#231A11] font-semibold">
                {isOpen ? "Đang mở cửa nhận khách" : "Đã tạm dừng nhận khách"}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => alert("Bạn có 3 thông báo mới từ hệ thống LocalEats!")}
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#5C403A] hover:bg-[#FEEADC] hover:text-[#231A11] transition-all relative"
                aria-label="Thông báo"
              >
                <span className="material-symbols-outlined text-xl">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#DE3618]" />
              </button>

              <button
                type="button"
                onClick={() => alert("Danh sách hóa đơn và phiếu đặt bàn tháng này")}
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#5C403A] hover:bg-[#FEEADC] hover:text-[#231A11] transition-all"
                aria-label="Hóa đơn"
              >
                <span className="material-symbols-outlined text-xl">receipt_long</span>
              </button>
            </div>

            <div className="h-6 w-px bg-[#F2DFD1]" />

            <div className="flex items-center gap-3 pl-1">
              <div className="w-9 h-9 rounded-full bg-[#DE3618] text-white flex items-center justify-center font-bold text-sm shadow">
                CQ
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-xs font-bold text-[#231A11] leading-none">Chủ Quán Ẩm Thực</span>
                <span className="text-[11px] text-[#5C403A] mt-0.5">Đối tác Kim Cương</span>
              </div>
            </div>
          </div>
        </header>

        {/* BODY CONTENT CONTAINER */}
        <main className="pt-20 px-3 sm:px-6 md:px-8 pb-12 flex flex-col gap-8 max-w-[1600px] w-full mx-auto">
          {activeNav === "dashboard" && (
            <MerchantOverviewTab currentPlace={currentPlace} isOpen={isOpen} setIsOpen={setIsOpen} />
          )}

          {activeNav === "quan-cua-toi" && <MerchantMenuTab />}

          {activeNav === "ban-do-chi-duong" && <MerchantMapTab />}

          {activeNav === "phan-tich-bieu-do" && <MerchantAnalyticsTab />}

          {activeNav === "goi-vip-tai-tro" && <MerchantVipTab />}

          {activeNav === "danh-gia" && <MerchantReviewsTab />}

          {activeNav === "cai-dat" && <MerchantSettingsTab currentPlace={currentPlace} />}
        </main>
      </div>
    </div>
  );
}
