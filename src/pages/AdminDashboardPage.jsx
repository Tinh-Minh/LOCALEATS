import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Import all Super Admin Tab components
import AdminOverviewTab from "./admin/AdminOverviewTab";
import AdminPlacesTab from "./admin/AdminPlacesTab";
import AdminKycTab from "./admin/AdminKycTab";
import AdminLiveMapTab from "./admin/AdminLiveMapTab";
import AdminRevenueTab from "./admin/AdminRevenueTab";
import AdminCampaignsTab from "./admin/AdminCampaignsTab";
import AdminInvoicesTab from "./admin/AdminInvoicesTab";
import AdminRolesTab from "./admin/AdminRolesTab";
import AdminAuditLogTab from "./admin/AdminAuditLogTab";
import AdminAiSommelierTab from "./admin/AdminAiSommelierTab";
import AdminRoutingNodesTab from "./admin/AdminRoutingNodesTab";
import AdminApiWebhooksTab from "./admin/AdminApiWebhooksTab";
import AdminReviewSentinelTab from "./admin/AdminReviewSentinelTab";
import AdminKolTab from "./admin/AdminKolTab";
import AdminFraudTab from "./admin/AdminFraudTab";
import AdminUsersTab from "./admin/AdminUsersTab";

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // New Place State for Add Modal
  const [newPlace, setNewPlace] = useState({
    name: "",
    category: "Phở",
    specialty: "",
    address: "",
    district: "Quận 1",
    price: "45.000đ - 85.000đ",
    rating: 4.8,
    lat: 10.775,
    lng: 106.7,
    hot: true,
    openNow: true,
    closeAt: "22:00",
  });

  const showToast = (msg, type = "success") => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleAddPlaceSubmit = (e) => {
    e.preventDefault();
    setIsAddModalOpen(false);
    showToast(`Đã thêm quán "${newPlace.name}" vào mạng lưới dữ liệu thành công!`);
    setNewPlace({
      name: "",
      category: "Phở",
      specialty: "",
      address: "",
      district: "Quận 1",
      price: "45.000đ - 85.000đ",
      rating: 4.8,
      lat: 10.775,
      lng: 106.7,
      hot: true,
      openNow: true,
      closeAt: "22:00",
    });
  };

  const navSections = [
    {
      category: "TỔNG QUAN HỆ THỐNG",
      items: [
        {
          id: "dashboard",
          label: "Chỉ Huy Mạng Lưới Toàn Diện",
          icon: "dashboard",
          badge: "Master Live",
          badgeClass: "bg-[#2C694E] text-white",
        },
      ],
    },
    {
      category: "QUẢN TRỊ ĐỐI TÁC ẨM THỰC",
      items: [
        {
          id: "places",
          label: "Danh Sách Quán (12.840) & Menu",
          icon: "restaurant",
          badge: "12.8K",
          badgeClass: "bg-[#FD9013] text-[#231A11]",
        },
        {
          id: "queue",
          label: "Phê Duyệt Mới (KYC & ATTP)",
          icon: "verified_user",
          badge: "24 Chờ",
          badgeClass: "bg-[#DE3618] text-white",
        },
        {
          id: "fraud",
          label: "Báo Cáo Gian Lận & Khóa Quán",
          icon: "gavel",
          badge: "6 Cảnh Báo",
          badgeClass: "bg-red-100 text-red-800",
        },
      ],
    },
    {
      category: "BẢN ĐỒ & MẠNG LƯỚI GPS",
      items: [
        {
          id: "regions",
          label: "Live Fleet & Heatmap GPS",
          icon: "map",
          badge: "Radar",
          badgeClass: "bg-[#2C694E] text-white",
        },
        {
          id: "routing",
          label: "Cụm Node Định Tuyến (16ms)",
          icon: "hub",
          badge: "16ms",
          badgeClass: "bg-emerald-100 text-emerald-800",
        },
      ],
    },
    {
      category: "TÀI CHÍNH & QUẢNG CÁO",
      items: [
        {
          id: "revenue",
          label: "Doanh Thu VIP & Gói Ads",
          icon: "payments",
          badge: "ARR 2.45B",
          badgeClass: "bg-[#FD9013]/20 text-[#8F4E00]",
        },
        {
          id: "campaigns",
          label: "Chiến Dịch QC & Giao Dịch",
          icon: "campaign",
          badge: "148 Live",
          badgeClass: "bg-blue-100 text-blue-900",
        },
        {
          id: "invoices",
          label: "Đối Soát & Hóa Đơn VAT",
          icon: "receipt_long",
          badge: "e-VAT",
          badgeClass: "bg-[#B1F0CE] text-[#002114]",
        },
      ],
    },
    {
      category: "CỘNG ĐỒNG & REVIEW SENTINEL",
      items: [
        {
          id: "users",
          label: "Thực Khách & Cộng Đồng",
          icon: "group",
          badge: "482K",
          badgeClass: "bg-purple-100 text-purple-800",
        },
        {
          id: "kol",
          label: "Phân Cấp KOL & Foodie Reviewer",
          icon: "stars",
          badge: "VIP KOL",
          badgeClass: "bg-amber-100 text-amber-800",
        },
        {
          id: "reviews",
          label: "Kiểm Duyệt Review AI Sentinel",
          icon: "shield",
          badge: "AI Bot",
          badgeClass: "bg-indigo-100 text-indigo-800",
        },
      ],
    },
    {
      category: "HẠ TẦNG & AI ENGINE",
      items: [
        {
          id: "ai-sommelier",
          label: "Mô Hình AI Sommelier",
          icon: "psychology",
          badge: "Model V4",
          badgeClass: "bg-teal-100 text-teal-800",
        },
        {
          id: "api-webhooks",
          label: "API Partner & Webhooks",
          icon: "api",
          badge: "REST",
          badgeClass: "bg-cyan-100 text-cyan-800",
        },
        {
          id: "roles",
          label: "Phân Quyền Vai Trò (RBAC)",
          icon: "badge",
          badge: "Security",
          badgeClass: "bg-slate-200 text-slate-800",
        },
        {
          id: "audit",
          label: "Audit Log & An Ninh Bảo Mật",
          icon: "policy",
          badge: "2FA Live",
          badgeClass: "bg-rose-100 text-rose-800",
        },
      ],
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#FFF8F5] text-[#231A11] flex antialiased selection:bg-[#DE3618] selection:text-white font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#231A11] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#FD9013]/30 animate-bounce">
          <span className="material-symbols-outlined text-[#FD9013]">
            {toastMessage.type === "error" ? "error" : "check_circle"}
          </span>
          <span className="text-xs font-semibold">{toastMessage.msg}</span>
        </div>
      )}

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
          <div className="h-16 flex items-center px-6 gap-3 bg-[#FFF1E8] border-b border-[#F2DFD1]/70 sticky top-0 z-20 backdrop-blur-md">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-[#231A11] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-xl text-[#FD9013]">
                  admin_panel_settings
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-[#231A11] tracking-tight leading-none">
                  LOCALEATS
                </span>
                <span className="text-[11px] text-[#DE3618] font-bold mt-0.5">
                  Super Admin Root
                </span>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(false)}
              className="lg:hidden ml-auto p-1.5 rounded-xl text-[#5C403A] hover:bg-[#FEEADC]"
              title="Đóng menu"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Master Node Status Badge */}
          <div className="px-5 py-4">
            <div className="bg-[#FEEADC] rounded-2xl p-3 flex items-center justify-between border border-[#F2DFD1]">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2C694E] animate-ping shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[#231A11] truncate">Cluster Master VN-East</span>
                  <span className="text-[11px] text-[#5C403A] truncate">Uptime 99.99% • Latency 12ms</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#2C694E] text-base">cloud_done</span>
            </div>
          </div>

          {/* Categorized Navigation Links */}
          <div className="px-3 pb-6 flex flex-col gap-4">
            {navSections.map((sec, secIdx) => (
              <div key={secIdx} className="flex flex-col gap-1">
                <span className="text-[10px] font-extrabold tracking-wider text-[#5C403A]/70 uppercase px-3 py-1">
                  {sec.category}
                </span>
                {sec.items.map((nav) => {
                  const isActive = activeTab === nav.id;
                  return (
                    <button
                      key={nav.id}
                      onClick={() => {
                        setActiveTab(nav.id);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      type="button"
                      className={`flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-bold transition-all text-left ${
                        isActive
                          ? "bg-[#231A11] text-white shadow-md"
                          : "text-[#5C403A] hover:bg-[#F8E5D6] hover:text-[#231A11]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`material-symbols-outlined text-lg shrink-0 ${
                            isActive ? "text-[#FD9013]" : "text-[#5C403A]"
                          }`}
                        >
                          {nav.icon}
                        </span>
                        <span className="truncate max-w-[130px]">{nav.label}</span>
                      </div>
                      {nav.badge && (
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 ${
                            nav.badgeClass || (isActive ? "bg-[#FD9013] text-[#231A11]" : "bg-white/80 text-[#5C403A]")
                          }`}
                        >
                          {nav.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Support Widget & Quick Links */}
        <div className="p-4 flex flex-col gap-2 border-t border-[#F2DFD1]/50 bg-[#FFF1E8]">
          <div className="bg-[#FEEADC] p-3 rounded-2xl flex flex-col gap-1.5 border border-[#F2DFD1]">
            <div className="flex items-center gap-2 text-[#8F4E00]">
              <span className="material-symbols-outlined text-base">security</span>
              <span className="text-xs font-bold">Admin Security Console</span>
            </div>
            <p className="text-[11px] text-[#5C403A] leading-tight">
              Đã xác thực 2FA sinh trắc học phiên làm việc cấp quyền Root Admin
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/merchant"
              className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl text-[11px] font-bold text-[#8F4E00] bg-[#FFF8F5] border border-[#F2DFD1] hover:bg-[#FEEADC] transition-colors text-center"
            >
              <span className="material-symbols-outlined text-sm">storefront</span>
              Portal Quán
            </Link>
            <Link
              to="/"
              className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl text-[11px] font-bold text-[#5C403A] bg-[#FFF8F5] border border-[#F2DFD1] hover:bg-[#F8E5D6] hover:text-[#DE3618] transition-colors text-center"
            >
              <span className="material-symbols-outlined text-sm">map</span>
              Bản Đồ Khách
            </Link>
          </div>
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
            title="Mở menu quản trị"
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
                placeholder="Tìm kiếm quán ăn, chủ sở hữu, địa chỉ GPS, mã GPKD, log bảo mật..."
                className="w-full h-10 pl-11 pr-4 rounded-full bg-white text-[#231A11] placeholder-[#906F69] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#DE3618]/25 border border-[#F2DFD1] transition-all"
              />
            </div>
          </div>

          {/* Right Status Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#DE3618] hover:bg-[#B91D00] text-white text-xs font-bold shadow-md shadow-[#DE3618]/20 transition-all"
            >
              <span className="material-symbols-outlined text-base">add_business</span>
              <span>+ Thêm Quán Mới</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 bg-[#FEEADC] px-3.5 py-1.5 rounded-full border border-[#F2DFD1]">
              <span className="w-2 h-2 rounded-full bg-[#2C694E] animate-pulse" />
              <span className="text-xs text-[#231A11] font-bold">Node V4.8 Live</span>
            </div>

            <button
              type="button"
              onClick={() => showToast("Đã rà soát an ninh: Toàn bộ 16 phân hệ Super Admin hoạt động an toàn!", "success")}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#5C403A] hover:bg-[#FEEADC] hover:text-[#231A11] transition-all relative"
              aria-label="Thông báo an ninh"
            >
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#DE3618]" />
            </button>

            <div className="h-6 w-px bg-[#F2DFD1]" />

            <div className="flex items-center gap-3 pl-1">
              <div className="w-9 h-9 rounded-full bg-[#231A11] text-[#FD9013] flex items-center justify-center font-bold text-sm shadow">
                SA
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-xs font-bold text-[#231A11] leading-none">Super Admin Master</span>
                <span className="text-[11px] text-[#5C403A] mt-0.5">Toàn quyền điều hành Root</span>
              </div>
            </div>
          </div>
        </header>

        {/* DYNAMIC TAB BODY */}
        <main className="flex-1 w-full bg-[#FFF8F5]">
          {activeTab === "dashboard" && (
            <div className="pt-20 px-3 sm:px-6 md:px-8 pb-12 max-w-[1720px] mx-auto w-full">
              <AdminOverviewTab onNavigateTab={setActiveTab} />
            </div>
          )}
          {activeTab === "places" && <AdminPlacesTab onNavigateTab={setActiveTab} />}
          {activeTab === "queue" && <AdminKycTab onNavigateTab={setActiveTab} />}
          {activeTab === "fraud" && <AdminFraudTab onNavigateTab={setActiveTab} />}
          {activeTab === "regions" && <AdminLiveMapTab onNavigateTab={setActiveTab} />}
          {activeTab === "routing" && <AdminRoutingNodesTab onNavigateTab={setActiveTab} />}
          {activeTab === "revenue" && <AdminRevenueTab onNavigateTab={setActiveTab} />}
          {activeTab === "campaigns" && <AdminCampaignsTab onNavigateTab={setActiveTab} />}
          {activeTab === "invoices" && <AdminInvoicesTab onNavigateTab={setActiveTab} />}
          {activeTab === "users" && <AdminUsersTab onNavigateTab={setActiveTab} />}
          {activeTab === "kol" && <AdminKolTab onNavigateTab={setActiveTab} />}
          {activeTab === "reviews" && <AdminReviewSentinelTab onNavigateTab={setActiveTab} />}
          {activeTab === "ai-sommelier" && <AdminAiSommelierTab onNavigateTab={setActiveTab} />}
          {activeTab === "api-webhooks" && <AdminApiWebhooksTab onNavigateTab={setActiveTab} />}
          {activeTab === "roles" && <AdminRolesTab onNavigateTab={setActiveTab} />}
          {activeTab === "audit" && <AdminAuditLogTab onNavigateTab={setActiveTab} />}
        </main>
      </div>

      {/* Modal Thêm Quán Mới */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#F2DFD1] relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 text-[#5C403A] hover:text-[#231A11]"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-[#FFDAD3] flex items-center justify-center text-[#DE3618]">
                <span className="material-symbols-outlined text-2xl">add_business</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#231A11]">Thêm Quán Ăn Mới Vào Bản Đồ</h3>
                <p className="text-xs text-[#5C403A]">Ghim tọa độ và phát hành trực tiếp lên mạng lưới LocalEats</p>
              </div>
            </div>

            <form onSubmit={handleAddPlaceSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#231A11] mb-1">Tên quán ăn</label>
                <input
                  type="text"
                  required
                  value={newPlace.name}
                  onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })}
                  placeholder="Ví dụ: Bún Bò Huế Đông Ba"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF1E8] border border-[#F2DFD1] focus:outline-none focus:border-[#DE3618]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#231A11] mb-1">Danh mục món</label>
                  <select
                    value={newPlace.category}
                    onChange={(e) => setNewPlace({ ...newPlace, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF1E8] border border-[#F2DFD1] focus:outline-none focus:border-[#DE3618]"
                  >
                    <option>Phở</option>
                    <option>Bánh Mì</option>
                    <option>Hải Sản</option>
                    <option>Cơm Tấm</option>
                    <option>Bún Bò</option>
                    <option>Lẩu &amp; Nướng</option>
                    <option>Tráng Miệng &amp; Chè</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#231A11] mb-1">Khu vực / Quận</label>
                  <input
                    type="text"
                    required
                    value={newPlace.district}
                    onChange={(e) => setNewPlace({ ...newPlace, district: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF1E8] border border-[#F2DFD1] focus:outline-none focus:border-[#DE3618]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#231A11] mb-1">Địa chỉ chi tiết</label>
                <input
                  type="text"
                  required
                  value={newPlace.address}
                  onChange={(e) => setNewPlace({ ...newPlace, address: e.target.value })}
                  placeholder="Số nhà, tên đường, phường..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF1E8] border border-[#F2DFD1] focus:outline-none focus:border-[#DE3618]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#231A11] mb-1">Khoảng giá</label>
                  <input
                    type="text"
                    value={newPlace.price}
                    onChange={(e) => setNewPlace({ ...newPlace, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF1E8] border border-[#F2DFD1] focus:outline-none focus:border-[#DE3618]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#231A11] mb-1">Đánh giá ban đầu</label>
                  <input
                    type="number"
                    step="0.1"
                    min="3.0"
                    max="5.0"
                    value={newPlace.rating}
                    onChange={(e) => setNewPlace({ ...newPlace, rating: parseFloat(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF1E8] border border-[#F2DFD1] focus:outline-none focus:border-[#DE3618]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="hotCheck"
                  checked={newPlace.hot}
                  onChange={(e) => setNewPlace({ ...newPlace, hot: e.target.checked })}
                  className="rounded text-[#DE3618] focus:ring-0 accent-[#DE3618] cursor-pointer"
                />
                <label htmlFor="hotCheck" className="font-semibold text-[#231A11] cursor-pointer">
                  Gắn nhãn HOT Trending ngay khi kích hoạt
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#F2DFD1]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-full font-bold text-[#5C403A] hover:bg-gray-100 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#DE3618] hover:bg-[#B91D00] text-white font-bold shadow-md shadow-[#DE3618]/25 transition-all"
                >
                  Xác nhận thêm quán
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
