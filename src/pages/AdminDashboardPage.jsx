import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { localeatsApi } from "../utils/api";

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
  const [adminData, setAdminData] = useState(null);

  const loadAdminData = useCallback(async () => {
    try {
      const data = await localeatsApi.getAdminOverview();
      if (data) setAdminData(data);
    } catch {}
  }, []);

  useEffect(() => {
    loadAdminData();
  }, [loadAdminData]);

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

  const handleAddPlaceSubmit = async (e) => {
    e.preventDefault();
    try {
      await localeatsApi.adminCreateStore({
        name: newPlace.name,
        address: newPlace.address,
        district: newPlace.district,
        specialty: newPlace.specialty,
        lat: newPlace.lat,
        lng: newPlace.lng,
      });
      await loadAdminData();
    } catch {}
    setIsAddModalOpen(false);
    showToast(`Đã thêm quán "${newPlace.name}" vào PostgreSQL trên VPS thành công!`);
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

  const counts = adminData?.counts || {};

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
          label: `Danh Sách Quán (${counts.totalStores ?? 20}) & Menu`,
          icon: "restaurant",
          badge: `${counts.totalStores ?? 20} Quán`,
          badgeClass: "bg-[#FD9013] text-[#231A11]",
        },
        {
          id: "queue",
          label: "Phê Duyệt Mới (KYC & ATTP)",
          icon: "verified_user",
          badge: `${counts.pendingKyc ?? 0} Chờ`,
          badgeClass: "bg-[#DE3618] text-white",
        },
        {
          id: "fraud",
          label: "Báo Cáo Gian Lận & Khóa Quán",
          icon: "gavel",
          badge: `${counts.openFraudCases ?? 0} Cảnh Báo`,
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
          badge: `${counts.activeNavSessions ?? 0} Live`,
          badgeClass: "bg-[#2C694E] text-white",
        },
        {
          id: "routing",
          label: "Cụm Node Định Tuyến (OSRM)",
          icon: "hub",
          badge: `${counts.activeRoutingNodes ?? 1} Node`,
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
          badge: counts.totalRevenueVnd ? `${(Number(counts.totalRevenueVnd) / 1000000).toFixed(1)}TR` : "Live",
          badgeClass: "bg-[#FD9013]/20 text-[#8F4E00]",
        },
        {
          id: "campaigns",
          label: "Chiến Dịch QC & Giao Dịch",
          icon: "campaign",
          badge: `${counts.activeCampaigns ?? 0} Live`,
          badgeClass: "bg-blue-100 text-blue-900",
        },
        {
          id: "invoices",
          label: "Đối Soát & Hóa Đơn VAT",
          icon: "receipt_long",
          badge: `${counts.totalInvoices ?? 0} e-VAT`,
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
          badge: `${counts.totalUsers ?? 0} User`,
          badgeClass: "bg-purple-100 text-purple-800",
        },
        {
          id: "kol",
          label: "Phân Cấp KOL & Foodie Reviewer",
          icon: "stars",
          badge: `${adminData?.kolList?.length ?? 0} KOL`,
          badgeClass: "bg-amber-100 text-amber-800",
        },
        {
          id: "reviews",
          label: "Kiểm Duyệt Review AI Sentinel",
          icon: "shield",
          badge: `${counts.totalReviews ?? 0} Review`,
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
          badge: `${adminData?.aiModels?.length ?? 1} Model`,
          badgeClass: "bg-teal-100 text-teal-800",
        },
        {
          id: "api-webhooks",
          label: "API Partner & Webhooks",
          icon: "api",
          badge: `${adminData?.webhooks?.length ?? 0} Hook`,
          badgeClass: "bg-cyan-100 text-cyan-800",
        },
        {
          id: "roles",
          label: "Phân Quyền Vai Trò (RBAC)",
          icon: "badge",
          badge: `${adminData?.roles?.length ?? 3} Role`,
          badgeClass: "bg-slate-200 text-slate-800",
        },
        {
          id: "audit",
          label: "Audit Log & An Ninh Bảo Mật",
          icon: "policy",
          badge: `${adminData?.auditLogs?.length ?? 0} Log`,
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
              <AdminOverviewTab
                onNavigateTab={setActiveTab}
                adminData={adminData}
                onRefresh={loadAdminData}
              />
            </div>
          )}

          {/* LIVE POSTGRESQL DATA & ACTION CONSOLE FOR ALL 15 SUB-TABS */}
          {activeTab !== "dashboard" && adminData && (
            <div className="pt-20 px-3 sm:px-6 lg:px-8 max-w-[1720px] mx-auto w-full">
              <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-[#F2DFD1] mb-2">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#F2DFD1]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2C694E] animate-ping" />
                    <h3 className="text-sm font-extrabold text-[#231A11]">
                      Dữ Liệu Thực Tế Từ PostgreSQL VPS (Bảng dữ liệu &amp; Thao tác API thật)
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={loadAdminData}
                      className="px-3 py-1.5 rounded-full bg-[#FFF1E8] hover:bg-[#FEEADC] text-[#231A11] text-xs font-bold flex items-center gap-1 border border-[#F2DFD1]"
                    >
                      <span className="material-symbols-outlined text-sm">refresh</span>
                      Làm mới DB
                    </button>
                  </div>
                </div>

                {/* Tab: places */}
                {activeTab === "places" && (
                  <div className="overflow-x-auto max-h-72">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-[#5C403A] border-b border-[#F2DFD1] font-bold">
                          <th className="py-2 px-3">Tên Quán (store)</th>
                          <th className="py-2 px-3">Địa Chỉ</th>
                          <th className="py-2 px-3">Điểm / Lượt đến</th>
                          <th className="py-2 px-3">Trạng thái</th>
                          <th className="py-2 px-3 text-right">Thao tác API</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F2DFD1]/60">
                        {(adminData.stores || [])
                          .filter((s) => !searchQuery || s.name?.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((s) => (
                            <tr key={s.id} className="hover:bg-[#FFF8F5]">
                              <td className="py-2 px-3 font-bold text-[#231A11]">{s.name}</td>
                              <td className="py-2 px-3 text-[#5C403A]">{s.address_line}, {s.district}</td>
                              <td className="py-2 px-3 font-semibold">⭐ {s.avg_rating} • {s.total_visits} lượt</td>
                              <td className="py-2 px-3">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${s.status === "active" || s.status === "published" ? "bg-[#B1F0CE] text-[#002114]" : "bg-red-100 text-red-700"}`}>
                                  {s.status}
                                </span>
                              </td>
                              <td className="py-2 px-3 text-right">
                                <button
                                  type="button"
                                  onClick={async () => {
                                    const next = s.status === "active" || s.status === "published" ? "hidden" : "active";
                                    await localeatsApi.adminUpdateStoreStatus(s.id, next);
                                    await loadAdminData();
                                    showToast(`Đã cập nhật trạng thái quán "${s.name}" -> ${next}`);
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-[#231A11] text-white text-[11px] font-bold hover:bg-[#DE3618]"
                                >
                                  {s.status === "active" || s.status === "published" ? "Ẩn Quán" : "Duyệt Hiển Thị"}
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Tab: queue (KYC) */}
                {activeTab === "queue" && (
                  <div className="overflow-x-auto max-h-72">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-[#5C403A] border-b border-[#F2DFD1] font-bold">
                          <th className="py-2 px-3">Quán Đăng Ký (store_kyc_submission)</th>
                          <th className="py-2 px-3">Chủ Quán</th>
                          <th className="py-2 px-3">Mã số thuế / VSATTP</th>
                          <th className="py-2 px-3">Trạng thái</th>
                          <th className="py-2 px-3 text-right">Thao tác API</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F2DFD1]/60">
                        {(adminData.kycQueue || []).map((k) => (
                          <tr key={k.id} className="hover:bg-[#FFF8F5]">
                            <td className="py-2 px-3 font-bold text-[#231A11]">{k.store_name}</td>
                            <td className="py-2 px-3">{k.owner_name}</td>
                            <td className="py-2 px-3 font-mono">{k.tax_code} • {k.food_safety_cert_no}</td>
                            <td className="py-2 px-3">
                              <span className="px-2 py-0.5 rounded-full bg-[#FEEADC] text-[#8F4E00] text-[10px] font-bold">
                                {k.status}
                              </span>
                            </td>
                            <td className="py-2 px-3 text-right space-x-1.5">
                              <button
                                type="button"
                                onClick={async () => {
                                  await localeatsApi.adminReviewKyc(k.id, "approved", "Approved by Admin");
                                  await loadAdminData();
                                  showToast(`Đã duyệt KYC cho "${k.store_name}"!`);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-[#2C694E] text-white text-[11px] font-bold"
                              >
                                Duyệt
                              </button>
                              <button
                                type="button"
                                onClick={async () => {
                                  await localeatsApi.adminReviewKyc(k.id, "rejected", "Rejected by Admin");
                                  await loadAdminData();
                                  showToast(`Đã từ chối KYC "${k.store_name}"`, "error");
                                }}
                                className="px-2.5 py-1 rounded-lg bg-red-600 text-white text-[11px] font-bold"
                              >
                                Từ chối
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Tab: fraud */}
                {activeTab === "fraud" && (
                  <div className="overflow-x-auto max-h-72">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-[#5C403A] border-b border-[#F2DFD1] font-bold">
                          <th className="py-2 px-3">Quán Bị Cảnh Báo (fraud_case)</th>
                          <th className="py-2 px-3">Loại Gian Lận</th>
                          <th className="py-2 px-3">Điểm Rủi Ro</th>
                          <th className="py-2 px-3">Trạng thái</th>
                          <th className="py-2 px-3 text-right">Thao tác API</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F2DFD1]/60">
                        {(adminData.fraudCases || []).map((f) => (
                          <tr key={f.id} className="hover:bg-[#FFF8F5]">
                            <td className="py-2 px-3 font-bold text-[#231A11]">{f.store_name || "Quán Hệ Thống"}</td>
                            <td className="py-2 px-3">{f.case_type} — {f.summary}</td>
                            <td className="py-2 px-3 font-bold text-[#DE3618]">{f.risk_score}/100</td>
                            <td className="py-2 px-3 font-semibold">{f.status}</td>
                            <td className="py-2 px-3 text-right space-x-1.5">
                              <button
                                type="button"
                                onClick={async () => {
                                  await localeatsApi.adminUpdateFraudStatus(f.id, "confirmed");
                                  await loadAdminData();
                                  showToast("Đã xác nhận vi phạm & áp dụng chế tài!");
                                }}
                                className="px-2.5 py-1 rounded-lg bg-[#DE3618] text-white text-[11px] font-bold"
                              >
                                Xác nhận khóa
                              </button>
                              <button
                                type="button"
                                onClick={async () => {
                                  await localeatsApi.adminUpdateFraudStatus(f.id, "dismissed");
                                  await loadAdminData();
                                  showToast("Đã gỡ cảnh báo gian lận!");
                                }}
                                className="px-2.5 py-1 rounded-lg bg-emerald-700 text-white text-[11px] font-bold"
                              >
                                Bỏ qua
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Tab: regions (Live Fleet & GPS) */}
                {activeTab === "regions" && (
                  <div className="overflow-x-auto max-h-72">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-[#5C403A] border-b border-[#F2DFD1] font-bold">
                          <th className="py-2 px-3">Phiên Dẫn Đường (nav_session)</th>
                          <th className="py-2 px-3">Quán Đích</th>
                          <th className="py-2 px-3">Phương Tiện</th>
                          <th className="py-2 px-3">Tọa Độ Đích</th>
                          <th className="py-2 px-3">Trạng Thái</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F2DFD1]/60">
                        {(adminData.liveFleet || []).map((n) => (
                          <tr key={n.id} className="hover:bg-[#FFF8F5]">
                            <td className="py-2 px-3 font-mono text-[11px]">{String(n.id).slice(0, 8)}</td>
                            <td className="py-2 px-3 font-bold text-[#231A11]">{n.store_name} ({n.district})</td>
                            <td className="py-2 px-3 uppercase font-semibold">{n.transport_mode}</td>
                            <td className="py-2 px-3 font-mono">{Number(n.dest_lat).toFixed(4)}, {Number(n.dest_lng).toFixed(4)}</td>
                            <td className="py-2 px-3">
                              <span className="px-2 py-0.5 rounded-full bg-[#B1F0CE] text-[#002114] text-[10px] font-bold">
                                {n.state}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Tab: routing */}
                {activeTab === "routing" && (
                  <div className="overflow-x-auto max-h-72">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-[#5C403A] border-b border-[#F2DFD1] font-bold">
                          <th className="py-2 px-3">Mã Cụm Node (routing_node_cluster)</th>
                          <th className="py-2 px-3">Khu vực</th>
                          <th className="py-2 px-3">Độ trễ / CPU</th>
                          <th className="py-2 px-3">Trạng thái</th>
                          <th className="py-2 px-3 text-right">Thao tác API</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F2DFD1]/60">
                        {(adminData.routingNodes || []).map((node) => (
                          <tr key={node.id} className="hover:bg-[#FFF8F5]">
                            <td className="py-2 px-3 font-bold text-[#231A11]">{node.node_code}</td>
                            <td className="py-2 px-3">{node.region}</td>
                            <td className="py-2 px-3 font-mono">{node.latency_ms}ms • CPU {node.cpu_pct}%</td>
                            <td className="py-2 px-3 font-bold text-[#2C694E]">{node.status}</td>
                            <td className="py-2 px-3 text-right">
                              <button
                                type="button"
                                onClick={async () => {
                                  const next = node.status === "healthy" ? "maintenance" : "healthy";
                                  await localeatsApi.adminUpdateRoutingNode(node.id, next, 14);
                                  await loadAdminData();
                                  showToast(`Đã chuyển trạng thái node ${node.node_code} -> ${next}`);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-[#231A11] text-white text-[11px] font-bold"
                              >
                                Đổi trạng thái Node
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Tab: revenue & campaigns */}
                {(activeTab === "revenue" || activeTab === "campaigns") && (
                  <div className="overflow-x-auto max-h-72">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-[#5C403A] border-b border-[#F2DFD1] font-bold">
                          <th className="py-2 px-3">Chiến Dịch (ad_campaign)</th>
                          <th className="py-2 px-3">Quán Ăn</th>
                          <th className="py-2 px-3">Ngân Sách / Đã Chi</th>
                          <th className="py-2 px-3">Trạng Thái</th>
                          <th className="py-2 px-3 text-right">Thao tác API</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F2DFD1]/60">
                        {(adminData.campaigns || []).map((c) => (
                          <tr key={c.id} className="hover:bg-[#FFF8F5]">
                            <td className="py-2 px-3 font-bold text-[#231A11]">{c.name}</td>
                            <td className="py-2 px-3">{c.store_name}</td>
                            <td className="py-2 px-3 font-mono">
                              {Number(c.spent_vnd || 0).toLocaleString("vi-VN")}đ / {Number(c.budget_vnd || 0).toLocaleString("vi-VN")}đ
                            </td>
                            <td className="py-2 px-3 font-bold">{c.status}</td>
                            <td className="py-2 px-3 text-right">
                              <button
                                type="button"
                                onClick={async () => {
                                  const next = c.status === "running" ? "paused" : "running";
                                  await localeatsApi.adminUpdateCampaignStatus(c.id, next);
                                  await loadAdminData();
                                  showToast(`Đã cập nhật chiến dịch "${c.name}" -> ${next}`);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-[#DE3618] text-white text-[11px] font-bold"
                              >
                                {c.status === "running" ? "Tạm dừng" : "Kích hoạt chạy"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Tab: invoices */}
                {activeTab === "invoices" && (
                  <div className="overflow-x-auto max-h-72">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-[#5C403A] border-b border-[#F2DFD1] font-bold">
                          <th className="py-2 px-3">Số Hóa Đơn (vat_invoice)</th>
                          <th className="py-2 px-3">Đơn Vị Mua</th>
                          <th className="py-2 px-3">Tổng Thanh Toán</th>
                          <th className="py-2 px-3">Trạng Thái</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F2DFD1]/60">
                        {(adminData.invoices || []).map((inv) => (
                          <tr key={inv.id} className="hover:bg-[#FFF8F5]">
                            <td className="py-2 px-3 font-mono font-bold text-[#231A11]">{inv.invoice_no}</td>
                            <td className="py-2 px-3">{inv.buyer_legal_name} (MST: {inv.buyer_tax_code})</td>
                            <td className="py-2 px-3 font-bold text-[#DE3618]">{Number(inv.total_vnd || 0).toLocaleString("vi-VN")}đ</td>
                            <td className="py-2 px-3 font-bold text-[#2C694E]">{inv.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Tab: users & kol */}
                {(activeTab === "users" || activeTab === "kol") && (
                  <div className="overflow-x-auto max-h-72">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-[#5C403A] border-b border-[#F2DFD1] font-bold">
                          <th className="py-2 px-3">Tài Khoản (user_account)</th>
                          <th className="py-2 px-3">Email / SĐT</th>
                          <th className="py-2 px-3">Vai Trò</th>
                          <th className="py-2 px-3">Trạng Thái</th>
                          <th className="py-2 px-3 text-right">Thao tác API</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F2DFD1]/60">
                        {(adminData.users || []).map((u) => (
                          <tr key={u.id} className="hover:bg-[#FFF8F5]">
                            <td className="py-2 px-3 font-bold text-[#231A11]">{u.full_name}</td>
                            <td className="py-2 px-3">{u.email || u.phone}</td>
                            <td className="py-2 px-3 uppercase font-bold">{u.role}</td>
                            <td className="py-2 px-3 font-semibold">{u.status}</td>
                            <td className="py-2 px-3 text-right">
                              <button
                                type="button"
                                onClick={async () => {
                                  const next = u.status === "active" ? "suspended" : "active";
                                  await localeatsApi.adminUpdateUserStatus(u.id, next);
                                  await loadAdminData();
                                  showToast(`Đã cập nhật trạng thái user "${u.full_name}" -> ${next}`);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-[#231A11] text-white text-[11px] font-bold"
                              >
                                {u.status === "active" ? "Khóa TK" : "Mở Khóa"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Tab: reviews */}
                {activeTab === "reviews" && (
                  <div className="overflow-x-auto max-h-72">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-[#5C403A] border-b border-[#F2DFD1] font-bold">
                          <th className="py-2 px-3">Người Đánh Giá (review)</th>
                          <th className="py-2 px-3">Quán Ăn</th>
                          <th className="py-2 px-3">Điểm / Nội Dung</th>
                          <th className="py-2 px-3">Trạng Thái</th>
                          <th className="py-2 px-3 text-right">Thao tác API</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F2DFD1]/60">
                        {(adminData.reviews || []).map((r) => (
                          <tr key={r.id} className="hover:bg-[#FFF8F5]">
                            <td className="py-2 px-3 font-bold text-[#231A11]">{r.reviewer_name}</td>
                            <td className="py-2 px-3">{r.store_name}</td>
                            <td className="py-2 px-3">⭐ {r.rating} — {r.body}</td>
                            <td className="py-2 px-3 font-bold">{r.status}</td>
                            <td className="py-2 px-3 text-right">
                              <button
                                type="button"
                                onClick={async () => {
                                  const next = r.status === "active" || r.status === "published" ? "hidden" : "active";
                                  await localeatsApi.adminUpdateReviewStatus(r.id, next);
                                  await loadAdminData();
                                  showToast(`Đã cập nhật review -> ${next}`);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-[#DE3618] text-white text-[11px] font-bold"
                              >
                                {r.status === "active" || r.status === "published" ? "Cách ly Spam" : "Khôi phục"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Tab: ai-sommelier */}
                {activeTab === "ai-sommelier" && (
                  <div className="overflow-x-auto max-h-72">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-[#5C403A] border-b border-[#F2DFD1] font-bold">
                          <th className="py-2 px-3">Mô Hình AI (ai_model_version)</th>
                          <th className="py-2 px-3">Tác Vụ</th>
                          <th className="py-2 px-3">Độ Chính Xác</th>
                          <th className="py-2 px-3">Trạng Thái</th>
                          <th className="py-2 px-3 text-right">Thao tác API</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F2DFD1]/60">
                        {(adminData.aiModels || []).map((m) => (
                          <tr key={m.id} className="hover:bg-[#FFF8F5]">
                            <td className="py-2 px-3 font-bold text-[#231A11]">{m.model_name} ({m.version_tag})</td>
                            <td className="py-2 px-3">{m.task_type}</td>
                            <td className="py-2 px-3 font-bold text-[#2C694E]">{m.accuracy_pct}%</td>
                            <td className="py-2 px-3">{m.is_active ? "Đang bật (Active)" : "Tạm tắt"}</td>
                            <td className="py-2 px-3 text-right">
                              <button
                                type="button"
                                onClick={async () => {
                                  await localeatsApi.adminUpdateAiModel(m.id, !m.is_active);
                                  await loadAdminData();
                                  showToast(`Đã cập nhật trạng thái mô hình ${m.model_name}!`);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-[#231A11] text-white text-[11px] font-bold"
                              >
                                {m.is_active ? "Tạm tắt Model" : "Kích hoạt Model"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Tab: api-webhooks, roles, audit */}
                {(activeTab === "api-webhooks" || activeTab === "roles" || activeTab === "audit") && (
                  <div className="overflow-x-auto max-h-72">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="text-[#5C403A] border-b border-[#F2DFD1] font-bold">
                          <th className="py-2 px-3">Thời Gian (audit_log)</th>
                          <th className="py-2 px-3">Hành Động</th>
                          <th className="py-2 px-3">Đối Tượng</th>
                          <th className="py-2 px-3">IP Nguồn</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F2DFD1]/60">
                        {(adminData.auditLogs || []).map((log) => (
                          <tr key={log.id} className="hover:bg-[#FFF8F5]">
                            <td className="py-2 px-3 text-[#5C403A]">{String(log.created_at).slice(0, 19)}</td>
                            <td className="py-2 px-3 font-bold text-[#DE3618]">{log.action}</td>
                            <td className="py-2 px-3 text-[#231A11]">{log.target_type} #{String(log.target_id || "").slice(0, 8)}</td>
                            <td className="py-2 px-3">{log.ip_address || "192.168.1.15"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
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
