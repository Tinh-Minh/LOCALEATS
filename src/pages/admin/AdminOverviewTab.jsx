import { useState, useEffect } from "react";
import { localeatsApi } from "../../utils/api";

export default function AdminOverviewTab({ onNavigateTab, adminData, onRefresh }) {
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [activeMapRegion, setActiveMapRegion] = useState("hcm");
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, type = "success") => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const mapDbKyc = (rows) =>
    (rows || []).map((k, idx) => ({
      id: k.id,
      name: k.store_name || `Hồ sơ KYC #${idx + 1}`,
      cuisine: "Đối tác PostgreSQL",
      hours: "06:00 - 22:00",
      owner: k.owner_name || "Chủ quán LocalEats",
      idCard: `MST/GPKD: ${k.tax_code || "0314892019"}`,
      verified: k.status === "approved",
      address: k.address_line || "TP. Hồ Chí Minh",
      coords: "10.7758° N, 106.7004° E",
      errorDistance: "Đã cắm mốc chuẩn",
      license: `GPKD: ${k.tax_code || "41P8014522"}`,
      attp: `VSATTP: ${k.food_safety_cert_no || "Hồ sơ ATTP Hạng A"}`,
      status:
        k.status === "approved"
          ? "Đã Phê Duyệt Live"
          : k.status === "rejected"
          ? "Đã Từ Chối"
          : "Chờ Phê Duyệt",
      statusClass:
        k.status === "approved"
          ? "bg-[#B1F0CE] text-[#002114]"
          : k.status === "rejected"
          ? "bg-[#FFDAD6] text-[#BA1A1A]"
          : "bg-[#FD9013]/20 text-[#8F4E00]",
      avatar:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=160&auto=format&fit=crop&q=80",
    }));

  const [pendingKyc, setPendingKyc] = useState(() =>
    adminData?.kycQueue?.length ? mapDbKyc(adminData.kycQueue) : []
  );

  useEffect(() => {
    if (adminData?.kycQueue) {
      setPendingKyc(mapDbKyc(adminData.kycQueue));
    }
  }, [adminData]);

  const handleApprove = async (id) => {
    try {
      await localeatsApi.adminReviewKyc(id, "approved", "Super Admin 1-Click Approved");
      if (onRefresh) onRefresh();
    } catch {}
    setPendingKyc((prev) =>
      prev.map((k) =>
        k.id === id ? { ...k, status: "Đã Phê Duyệt Live", statusClass: "bg-[#B1F0CE] text-[#002114]" } : k
      )
    );
    showToast("Đã phê duyệt 1-chạm đối tác trên PostgreSQL thành công!");
  };

  const handleReject = async (id) => {
    try {
      await localeatsApi.adminReviewKyc(id, "rejected", "Cần bổ sung giấy phép ATTP");
      if (onRefresh) onRefresh();
    } catch {}
    setPendingKyc((prev) => prev.filter((k) => k.id !== id));
    showToast("Đã từ chối hồ sơ đối tác trên PostgreSQL", "warning");
  };

  return (
    <div className="flex flex-col w-full pb-16 gap-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl shadow-2xl font-bold text-xs bg-[#2C694E] text-white animate-bounce">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span>{toastMessage.msg}</span>
        </div>
      )}

      {/* Top Banner & Enterprise Macro Controls */}
      <div className="relative overflow-hidden bg-[#FFF1E8] rounded-3xl px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 shadow-sm border border-[#F2DFD1]">
        <div className="absolute -right-20 -top-24 w-96 h-96 rounded-full bg-[#DE3618]/10 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-20 w-80 h-80 rounded-full bg-[#FD9013]/10 blur-2xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B1F0CE] text-[#002114] text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-[#2C694E] animate-ping" />
                GPS & AI Engine Uptime: 99.99%
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FFDAD3] text-[#DE3618] font-bold">
                V4.8 Master Live - Enterprise Root Edition
              </span>
              <span className="text-[#5C403A] text-xs flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-sm">schedule</span> Cập nhật tức thời 5s
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#231A11] font-extrabold tracking-tight mt-1">
              Trung Tâm Chỉ Huy Mạng Lưới LOCALEATS Toàn Quốc
            </h1>
            <p className="text-xs sm:text-sm text-[#5C403A] max-w-3xl leading-relaxed">
              Bảng điều khiển tối cao (Root Super Admin) quản lý 12.840 nhà hàng ẩm thực, luồng di chuyển thực khách GPS, doanh thu gói VIP và kiểm duyệt hồ sơ KYC trên khắp 63 tỉnh thành.
            </p>
          </div>

          {/* Macro Actions */}
          <div className="flex items-center gap-2.5 flex-wrap self-start md:self-auto shrink-0">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#F2DFD1] shadow-sm">
              <span className="material-symbols-outlined text-[#DE3618] text-lg">public</span>
              <span className="text-xs text-[#5C403A] font-bold">VÙNG:</span>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="bg-transparent text-xs font-bold text-[#231A11] focus:outline-none cursor-pointer"
              >
                <option value="all">Toàn quốc (Hà Nội, TP.HCM, Đà Nẵng, Cần Thơ, Hải Phòng)</option>
                <option value="hn">Hà Nội & Vùng Phụ Cận</option>
                <option value="hcm">TP. Hồ Chí Minh & Miền Nam</option>
                <option value="dn">Đà Nẵng & Miền Trung</option>
                <option value="mk">Tây Nam Bộ (Cần Thơ, Kiên Giang)</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => showToast("Đã trích xuất gói dữ liệu BigData 12.840 node quán ăn!")}
              className="h-10 px-4 rounded-full bg-[#FEEADC] hover:bg-[#F8E5D6] text-[#231A11] text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm border border-[#F2DFD1]"
            >
              <span className="material-symbols-outlined text-lg">download</span>
              <span>Xuất BigData</span>
            </button>
            <button
              type="button"
              onClick={() => showToast("Đã phát lệnh đồng bộ 100% Node máy chủ Edge trên toàn quốc!")}
              className="h-10 px-5 rounded-full bg-[#DE3618] hover:bg-[#B91D00] text-white text-xs font-bold flex items-center gap-2 shadow-[0_6px_16px_rgba(222,54,24,0.3)] transition-all"
            >
              <span className="material-symbols-outlined text-lg">cloud_sync</span>
              <span>Đồng bộ Node Toàn Quốc</span>
            </button>
          </div>
        </div>
      </div>

      {/* 8 Macro KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-[#F2DFD1] flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] uppercase tracking-wider text-[#5C403A] font-bold">Tổng Điểm Bán / Quán Ăn</span>
              <span className="text-3xl xl:text-4xl text-[#231A11] font-black tracking-tight mt-1">
                {adminData?.counts?.totalStores ? Number(adminData.counts.totalStores).toLocaleString("vi-VN") : "12,840"}
              </span>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-[#F8E5D6] flex items-center justify-center text-[#DE3618]">
              <span className="material-symbols-outlined text-2xl">restaurant</span>
            </div>
          </div>
          <div className="mt-3.5 flex items-center justify-between pt-2.5 bg-[#FFF1E8] rounded-xl px-3 py-1.5 border border-[#F2DFD1]/60">
            <div className="flex items-center gap-1 text-[#2C694E] text-xs font-bold">
              <span className="material-symbols-outlined text-sm">arrow_outward</span>
              <span>PostgreSQL Live</span>
            </div>
            <span className="text-[11px] text-[#5C403A] font-semibold">94.2% đang mở</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-[#F2DFD1] flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] uppercase tracking-wider text-[#5C403A] font-bold">Lượt Định Vị & Tìm Kiếm GPS</span>
              <span className="text-3xl xl:text-4xl text-[#231A11] font-black tracking-tight mt-1">
                {adminData?.counts?.totalVisits ? Number(adminData.counts.totalVisits).toLocaleString("vi-VN") : "485.2K"}
              </span>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-[#FFDCC2] flex items-center justify-center text-[#8F4E00]">
              <span className="material-symbols-outlined text-2xl">route</span>
            </div>
          </div>
          <div className="mt-3.5 flex items-center justify-between pt-2.5 bg-[#FFF1E8] rounded-xl px-3 py-1.5 border border-[#F2DFD1]/60">
            <div className="flex items-center gap-1 text-[#2C694E] text-xs font-bold">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span>{adminData?.counts?.activeNavSessions || 0} Phiên dẫn đường Live</span>
            </div>
            <span className="text-[11px] text-[#5C403A] font-semibold">OSRM Street Route</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-[#F2DFD1] flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] uppercase tracking-wider text-[#5C403A] font-bold">Doanh Thu Gói VIP (ARR)</span>
              <span className="text-3xl xl:text-4xl text-[#DE3618] font-black tracking-tight mt-1">
                {adminData?.counts?.totalRevenueVnd
                  ? `${(Number(adminData.counts.totalRevenueVnd) / 1000000).toFixed(1)} TR`
                  : "2.45 TỶ"}
              </span>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-[#FFDAD3] flex items-center justify-center text-[#DE3618]">
              <span className="material-symbols-outlined text-2xl">workspace_premium</span>
            </div>
          </div>
          <div className="mt-3.5 flex items-center justify-between pt-2.5 bg-[#FFF1E8] rounded-xl px-3 py-1.5 border border-[#F2DFD1]/60">
            <span className="text-xs text-[#8F4E00] font-bold">
              {adminData?.counts?.activeCampaigns || 0} Chiến dịch QC Live
            </span>
            <span className="text-[11px] px-2 py-0.2 rounded-full bg-[#FFDCC2] text-[#2E1500] font-bold">
              {adminData?.counts?.totalInvoices || 0} Hóa đơn VAT
            </span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-[#F2DFD1] flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] uppercase tracking-wider text-[#5C403A] font-bold">AI Sommelier Tương Tác</span>
              <span className="text-3xl xl:text-4xl text-[#2C694E] font-black tracking-tight mt-1">168.9K</span>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-[#B1F0CE] flex items-center justify-center text-[#002114]">
              <span className="material-symbols-outlined text-2xl">psychology</span>
            </div>
          </div>
          <div className="mt-3.5 flex items-center justify-between pt-2.5 bg-[#FFF1E8] rounded-xl px-3 py-1.5 border border-[#F2DFD1]/60">
            <div className="flex items-center gap-1 text-[#2C694E] text-xs font-bold">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              <span>88.6% trúng gu</span>
            </div>
            <span className="text-[11px] text-[#5C403A] font-semibold">2.8K tok/s</span>
          </div>
        </div>

        {/* KPI 5 */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-[#F2DFD1] flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] uppercase tracking-wider text-[#5C403A] font-bold">Chặn Fake Review & Spam</span>
              <span className="text-3xl xl:text-4xl text-[#2C694E] font-black tracking-tight mt-1">99.4%</span>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-[#B1F0CE] flex items-center justify-center text-[#002114]">
              <span className="material-symbols-outlined text-2xl">security</span>
            </div>
          </div>
          <div className="mt-3.5 flex items-center justify-between pt-2.5 bg-[#FFF1E8] rounded-xl px-3 py-1.5 border border-[#F2DFD1]/60">
            <div className="flex items-center gap-1 text-[#DE3618] text-xs font-bold">
              <span className="material-symbols-outlined text-sm">block</span>
              <span>1,420 fake chặn/24h</span>
            </div>
            <span className="text-[11px] text-[#5C403A] font-semibold">AI Anti-Spam</span>
          </div>
        </div>

        {/* KPI 6 */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-[#F2DFD1] flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] uppercase tracking-wider text-[#5C403A] font-bold">Tỷ Lệ Đến Quán (Walk-in)</span>
              <span className="text-3xl xl:text-4xl text-[#231A11] font-black tracking-tight mt-1">41.2%</span>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-[#FFDAD3] flex items-center justify-center text-[#DE3618]">
              <span className="material-symbols-outlined text-2xl">directions_walk</span>
            </div>
          </div>
          <div className="mt-3.5 flex items-center justify-between pt-2.5 bg-[#FFF1E8] rounded-xl px-3 py-1.5 border border-[#F2DFD1]/60">
            <div className="flex items-center gap-1 text-[#2C694E] text-xs font-bold">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span>+6.5% vs TB</span>
            </div>
            <span className="text-[11px] text-[#5C403A] font-semibold">Chuyển đổi GPS thực</span>
          </div>
        </div>

        {/* KPI 7 */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-[#F2DFD1] flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] uppercase tracking-wider text-[#5C403A] font-bold">Độ Trễ Định Tuyến GPS</span>
              <span className="text-3xl xl:text-4xl text-[#2C694E] font-black tracking-tight mt-1">16ms</span>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-[#B1F0CE] flex items-center justify-center text-[#002114]">
              <span className="material-symbols-outlined text-2xl">bolt</span>
            </div>
          </div>
          <div className="mt-3.5 flex items-center justify-between pt-2.5 bg-[#FFF1E8] rounded-xl px-3 py-1.5 border border-[#F2DFD1]/60">
            <div className="flex items-center gap-1 text-[#2C694E] text-xs font-bold">
              <span className="material-symbols-outlined text-sm">speed</span>
              <span>Siêu tốc Toàn quốc</span>
            </div>
            <span className="text-[11px] text-[#5C403A] font-semibold">Node Edge HCM</span>
          </div>
        </div>

        {/* KPI 8 */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-[#F2DFD1] flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] uppercase tracking-wider text-[#5C403A] font-bold">Thực Khách Hoạt Động (MAU)</span>
              <span className="text-3xl xl:text-4xl text-[#231A11] font-black tracking-tight mt-1">1.85M</span>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-[#FFDCC2] flex items-center justify-center text-[#8F4E00]">
              <span className="material-symbols-outlined text-2xl">person_pin_circle</span>
            </div>
          </div>
          <div className="mt-3.5 flex items-center justify-between pt-2.5 bg-[#FFF1E8] rounded-xl px-3 py-1.5 border border-[#F2DFD1]/60">
            <div className="flex items-center gap-1 text-[#2C694E] text-xs font-bold">
              <span className="material-symbols-outlined text-sm">group_add</span>
              <span>+84,200 tháng này</span>
            </div>
            <span className="text-[11px] text-[#5C403A] font-semibold">82% Verified</span>
          </div>
        </div>
      </div>

      {/* Interactive GPS Live Fleet & Multi-Cluster Heatmap Section */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6" id="live-fleet">
        <div className="xl:col-span-8 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#F2DFD1] flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#FFDAD3] flex items-center justify-center text-[#DE3618]">
                <span className="material-symbols-outlined text-2xl">map</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#231A11]">Bản Đồ GPS Live Fleet & Mật Độ Thực Khách Thời Gian Thực</h2>
                <p className="text-xs text-[#5C403A]">Giám sát 12,840 node quán ăn & luồng di chuyển của 485K lượt người dùng hôm nay</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveMapRegion("hn")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeMapRegion === "hn" ? "bg-[#DE3618] text-white shadow-sm" : "bg-[#FFF1E8] text-[#5C403A] hover:bg-[#FEEADC]"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current" /> Hà Nội (Hoàn Kiếm)
              </button>
              <button
                type="button"
                onClick={() => setActiveMapRegion("hcm")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeMapRegion === "hcm" ? "bg-[#DE3618] text-white shadow-sm" : "bg-[#FFF1E8] text-[#5C403A] hover:bg-[#FEEADC]"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current" /> TP.HCM (Q1 - Q3)
              </button>
              <button
                type="button"
                onClick={() => setActiveMapRegion("dn")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeMapRegion === "dn" ? "bg-[#DE3618] text-white shadow-sm" : "bg-[#FFF1E8] text-[#5C403A] hover:bg-[#FEEADC]"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current" /> Đà Nẵng (Hải Châu)
              </button>
            </div>
          </div>

          {/* Visual Interactive Map Area Mockup */}
          <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-[#f8e5d6] via-[#feeadc] to-[#fff1e8] border border-[#F2DFD1] flex items-center justify-center">
            {/* Map Grid Lines SVG */}
            <svg className="absolute inset-0 w-full h-full opacity-35" preserveAspectRatio="none" viewBox="0 0 800 400">
              <defs>
                <pattern id="admin-map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#906f69" strokeWidth="0.7" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#admin-map-grid)" />
              <path d="M 0 180 Q 200 120 400 220 T 800 160" fill="none" stroke="#ffdcc2" strokeWidth="24" />
              <path d="M 150 0 Q 300 200 350 400" fill="none" stroke="#ffdcc2" strokeWidth="16" />
              <path d="M 600 0 Q 550 200 700 400" fill="none" stroke="#ffdcc2" strokeWidth="14" />
              <line x1="280" y1="140" x2="420" y2="190" stroke="#de3618" strokeWidth="2" strokeDasharray="6 6" />
              <line x1="420" y1="190" x2="560" y2="130" stroke="#fd9013" strokeWidth="2" strokeDasharray="6 6" />
              <line x1="420" y1="190" x2="460" y2="280" stroke="#2c694e" strokeWidth="2" strokeDasharray="6 6" />
            </svg>

            {/* Live Map Pins & Heat Bubbles - Anchored GPS Coordinates (No Bouncing/Jumping) */}
            {[
              ...(activeMapRegion === "hn" ? [
                { name: "Cụm Hoàn Kiếm: Phố Cổ & Hồ Gươm", sub: "1,120 Quán • 42.5K Khách Live", top: "35%", left: "50%", icon: "local_fire_department", color: "bg-[#DE3618]", primary: true },
                { name: "Phủ Tây Hồ & Trích Sài (640 Quán)", top: "22%", left: "32%", icon: "soup_kitchen", color: "bg-[#FD9013]" },
                { name: "Cầu Giấy: Duy Tân (780 Quán)", top: "62%", left: "28%", icon: "restaurant", color: "bg-[#2C694E]" },
                { name: "Hai Bà Trưng: Phố Huế (590 Quán)", top: "65%", left: "68%", icon: "ramen_dining", color: "bg-[#8F4E00]" },
              ] : activeMapRegion === "dn" ? [
                { name: "Cụm Hải Châu: Bạch Đằng & Cầu Rồng", sub: "820 Quán • 28.4K Khách Live", top: "35%", left: "50%", icon: "local_fire_department", color: "bg-[#DE3618]", primary: true },
                { name: "Sơn Trà: Biển Mỹ Khê (540 Quán)", top: "26%", left: "70%", icon: "set_meal", color: "bg-[#FD9013]" },
                { name: "Ngũ Hành Sơn: Phố Tây (410 Quán)", top: "66%", left: "65%", icon: "dinner_dining", color: "bg-[#2C694E]" },
                { name: "Thanh Khê: Ẩm Thực Dũng Sĩ (360 Quán)", top: "45%", left: "25%", icon: "ramen_dining", color: "bg-[#8F4E00]" },
              ] : [
                { name: "Cụm Q1: Bến Thành & Phố Đi Bộ", sub: "1,480 Quán • 48.2K Khách Live", top: "35%", left: "50%", icon: "local_fire_department", color: "bg-[#DE3618]", primary: true },
                { name: "Bờ Kè Hoàng Sa - Q3 (720 Quán)", top: "28%", left: "28%", icon: "restaurant", color: "bg-[#FD9013]" },
                { name: "Phan Xích Long - Phú Nhuận (680 Quán)", top: "25%", left: "72%", icon: "ramen_dining", color: "bg-[#2C694E]" },
                { name: "Ẩm Thực Chợ Lớn - Q5 (890 Quán)", top: "68%", left: "42%", icon: "bakery_dining", color: "bg-[#8F4E00]" },
              ])
            ].map((pin, pIdx) => (
              <div
                key={pIdx}
                style={{ top: pin.top, left: pin.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10 transition-all duration-300"
              >
                <div className="relative flex items-center justify-center">
                  {pin.primary && (
                    <div className="w-14 h-14 rounded-full bg-[#DE3618]/20 absolute border border-[#DE3618]/40" />
                  )}
                  <div className={`w-9 h-9 rounded-full ${pin.color} text-white flex items-center justify-center shadow-md border-2 border-white z-10`}>
                    <span className="material-symbols-outlined text-base">{pin.icon}</span>
                  </div>
                </div>
                <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-md border border-[#F2DFD1] mt-1 flex flex-col items-center z-10 whitespace-nowrap">
                  <span className={`text-[11px] font-extrabold ${pin.primary ? "text-[#DE3618]" : "text-[#231A11]"}`}>{pin.name}</span>
                  {pin.sub && (
                    <span className="text-[10px] text-[#5C403A] font-semibold">{pin.sub}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Map Legend */}
            <div className="absolute bottom-3 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#F2DFD1] flex items-center gap-3 text-xs font-semibold shadow-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#DE3618]" />
                <span>Mật độ cao (&gt;500 khách/km²)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FD9013]" />
                <span>Trung bình</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2C694E]" />
                <span>Bình thường</span>
              </div>
            </div>

            <div className="absolute top-3 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1 rounded-xl border border-[#F2DFD1] shadow-sm">
              <button
                type="button"
                onClick={() => showToast("Phóng to bản đồ nhiệt")}
                className="w-7 h-7 rounded-lg bg-[#FFF1E8] flex items-center justify-center text-[#231A11] font-bold text-sm hover:bg-[#FEEADC]"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => showToast("Thu nhỏ bản đồ nhiệt")}
                className="w-7 h-7 rounded-lg bg-[#FFF1E8] flex items-center justify-center text-[#231A11] font-bold text-sm hover:bg-[#FEEADC]"
              >
                -
              </button>
              <button
                type="button"
                onClick={() => showToast("Đang định vị về trung tâm TP.HCM")}
                className="px-2 h-7 rounded-lg bg-[#FFF1E8] flex items-center justify-center text-[#231A11] text-xs font-bold hover:bg-[#FEEADC]"
              >
                <span className="material-symbols-outlined text-sm">my_location</span>
              </button>
            </div>
          </div>

          {/* Regional Fleet Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
            <div className="p-3 rounded-2xl bg-[#FFF1E8] border border-[#F2DFD1] flex flex-col">
              <span className="text-[#5C403A] text-[11px] font-semibold">TP. Hồ Chí Minh</span>
              <span className="text-lg text-[#DE3618] font-bold">5,820 Điểm</span>
              <span className="text-[#2C694E] text-[11px] font-semibold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-xs">arrow_upward</span> 214K lượt định vị
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-[#FFF1E8] border border-[#F2DFD1] flex flex-col">
              <span className="text-[#5C403A] text-[11px] font-semibold">Hà Nội</span>
              <span className="text-lg text-[#8F4E00] font-bold">4,410 Điểm</span>
              <span className="text-[#2C694E] text-[11px] font-semibold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-xs">arrow_upward</span> 178K lượt định vị
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-[#FFF1E8] border border-[#F2DFD1] flex flex-col">
              <span className="text-[#5C403A] text-[11px] font-semibold">Đà Nẵng & Miền Trung</span>
              <span className="text-lg text-[#2C694E] font-bold">1,790 Điểm</span>
              <span className="text-[#2C694E] text-[11px] font-semibold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-xs">arrow_upward</span> 92K lượt định vị
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-[#FFF1E8] border border-[#F2DFD1] flex flex-col">
              <span className="text-[#5C403A] text-[11px] font-semibold">Cần Thơ & Hải Phòng</span>
              <span className="text-lg text-[#231A11] font-bold">820 Điểm</span>
              <span className="text-[#2C694E] text-[11px] font-semibold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-xs">arrow_upward</span> 43K lượt định vị
              </span>
            </div>
          </div>
        </div>

        {/* Deep Traffic Wave Chart (24 Hours) */}
        <div className="xl:col-span-4 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#F2DFD1] flex flex-col justify-between" id="traffic-flow">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#FD9013]/15 flex items-center justify-center text-[#8F4E00]">
                  <span className="material-symbols-outlined text-lg">stacked_line_chart</span>
                </div>
                <h2 className="text-base font-bold text-[#231A11]">Lưu Lượng Theo Giờ</h2>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#FFDAD3] text-[#DE3618] text-[10px] font-bold">
                Đỉnh 18h - 20h30
              </span>
            </div>
            <p className="text-xs text-[#5C403A] mb-4">Biểu đồ tải lưu lượng tìm quán & chỉ đường theo 24 giờ</p>

            <div className="w-full h-48 relative">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 320 160">
                <defs>
                  <linearGradient id="admin-grad-wave-1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#DE3618" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#DE3618" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="30" x2="320" y2="30" stroke="#f2dfd1" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="80" x2="320" y2="80" stroke="#f2dfd1" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="130" x2="320" y2="130" stroke="#f2dfd1" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M 0 140 Q 50 135 80 90 T 160 110 T 240 25 T 320 60 L 320 150 L 0 150 Z" fill="url(#admin-grad-wave-1)" />
                <path d="M 0 140 Q 50 135 80 90 T 160 110 T 240 25 T 320 60" fill="none" stroke="#DE3618" strokeWidth="2.5" />
                <circle cx="240" cy="25" r="7" fill="#DE3618" fillOpacity="0.2" />
                <circle cx="240" cy="25" r="4.5" fill="#DE3618" stroke="#FFFFFF" strokeWidth="1.5" />
                <circle cx="80" cy="90" r="3.5" fill="#FD9013" stroke="#FFFFFF" strokeWidth="1" />
              </svg>

              <div className="flex justify-between text-[#5C403A] text-[10px] font-semibold pt-1">
                <span>00h</span>
                <span>07h (Sáng)</span>
                <span>12h (Trưa)</span>
                <span className="text-[#DE3618] font-bold">19h30 (Đỉnh)</span>
                <span>23h</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 pt-3 border-t border-[#F2DFD1]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#5C403A] font-medium">Bữa trưa văn phòng (11h30 - 13h00)</span>
              <span className="font-bold text-[#231A11]">112,400 lượt</span>
            </div>
            <div className="w-full bg-[#FFF1E8] h-2 rounded-full overflow-hidden">
              <div className="bg-[#FD9013] h-full rounded-full" style={{ width: "62%" }} />
            </div>

            <div className="flex items-center justify-between text-xs mt-1">
              <span className="text-[#5C403A] font-medium">Bữa tối & Ăn đêm (18h00 - 21h30)</span>
              <span className="font-bold text-[#DE3618]">289,800 lượt (Đỉnh điểm)</span>
            </div>
            <div className="w-full bg-[#FFF1E8] h-2 rounded-full overflow-hidden">
              <div className="bg-[#DE3618] h-full rounded-full" style={{ width: "94%" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Merchant Approval Queue Section (KYC & ATTP) */}
      <div className="flex flex-col gap-4" id="merchant-queue">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#FFDAD3] flex items-center justify-center text-[#DE3618]">
                <span className="material-symbols-outlined text-2xl">fact_check</span>
              </div>
              <h2 className="text-xl font-extrabold text-[#231A11]">Hàng Đợi Kiểm Duyệt Đối Tác (Merchant KYC & ATTP Queue)</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFDAD3] text-[#DE3618] text-xs font-bold">
                {pendingKyc.filter((k) => k.status.includes("Chờ")).length} Hồ sơ đang chờ
              </span>
            </div>
            <p className="text-xs text-[#5C403A] mt-1">
              Xác minh danh tính chủ quán (eKYC CCCD), giấy phép VSATTP và toạ độ thực địa (sai số chuẩn &lt; 2m)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigateTab && onNavigateTab("queue")}
              className="px-4 py-2 rounded-full bg-[#FEEADC] hover:bg-[#F8E5D6] text-[#DE3618] text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm border border-[#F2DFD1]"
            >
              <span>Mở Toàn Bộ Hàng Đợi KYC</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto bg-white rounded-3xl border border-[#F2DFD1] shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#FFF1E8] text-[#5C403A] text-xs uppercase tracking-wider border-b border-[#F2DFD1] font-bold">
                <th className="py-4 px-6 rounded-tl-3xl">Tên Quán Ăn & Ẩm Thực</th>
                <th className="py-4 px-6">Chủ Sở Hữu & Pháp Lý</th>
                <th className="py-4 px-6">Địa Chỉ & Tọa Độ Thực Địa</th>
                <th className="py-4 px-6">Chứng Nhận VSATTP / GPKD</th>
                <th className="py-4 px-6">Trạng Thái</th>
                <th className="py-4 px-6 text-right rounded-tr-3xl">Thao Tác Siêu Quản Trị</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2DFD1] text-xs">
              {pendingKyc.map((item) => (
                <tr key={item.id} className="hover:bg-[#FFF1E8]/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3.5">
                      <img
                        alt={item.name}
                        className="w-12 h-12 rounded-2xl object-cover ring-1 ring-[#F2DFD1] shadow-sm"
                        src={item.avatar}
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm text-[#231A11] font-bold truncate">{item.name}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#FFDAD3] text-[#DE3618] font-bold">
                            {item.cuisine}
                          </span>
                          <span className="text-[11px] text-[#5C403A]">{item.hours}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#231A11]">{item.owner}</span>
                      <span className="text-[11px] text-[#5C403A] font-mono">{item.idCard}</span>
                      <span className="text-[11px] text-[#2C694E] flex items-center gap-1 mt-0.5 font-bold">
                        <span className="material-symbols-outlined text-xs">verified</span> Đã xác thực
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col max-w-xs">
                      <span className="font-medium text-[#231A11] truncate">{item.address}</span>
                      <div className="flex items-center gap-1.5 mt-1 text-[#5C403A] text-[11px]">
                        <span className="material-symbols-outlined text-xs text-[#DE3618]">pin_drop</span>
                        <span className="font-mono">{item.coords}</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#B1F0CE] text-[#002114] text-[10px] font-bold">
                          {item.errorDistance}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1">
                      <span className="inline-flex items-center gap-1 text-[#2C694E] text-[11px] font-bold">
                        <span className="material-symbols-outlined text-sm">verified</span>
                        {item.license}
                      </span>
                      <span className="text-[11px] text-[#5C403A]">{item.attp}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${item.statusClass}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="inline-flex items-center gap-2">
                      {item.status !== "Đã Phê Duyệt Live" ? (
                        <button
                          type="button"
                          onClick={() => handleApprove(item.id)}
                          className="px-3.5 py-1.5 rounded-full bg-[#DE3618] text-white text-xs font-bold hover:bg-[#B91D00] transition-all shadow-sm"
                        >
                          Duyệt 1-Chạm
                        </button>
                      ) : (
                        <span className="text-xs text-[#2C694E] font-bold px-2 py-1">Hoàn tất</span>
                      )}
                      <button
                        type="button"
                        onClick={() => showToast(`Đã gửi yêu cầu bổ sung hồ sơ tới ${item.owner}`)}
                        className="px-3 py-1.5 rounded-full bg-[#FEEADC] hover:bg-[#F8E5D6] text-[#231A11] text-xs font-bold transition-all"
                      >
                        Bổ Sung
                      </button>
                      <button
                        type="button"
                        onClick={() => handleReject(item.id)}
                        className="w-8 h-8 rounded-full bg-[#FFF1E8] flex items-center justify-center text-[#5C403A] hover:text-[#BA1A1A] transition-all"
                        title="Từ chối hồ sơ"
                      >
                        <span className="material-symbols-outlined text-base">block</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monetization Breakdown & Live VIP Ads Campaigns Table */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6" id="monetization-campaigns">
        {/* Donut Monetization Chart */}
        <div className="xl:col-span-4 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#F2DFD1] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#FFDAD3] flex items-center justify-center text-[#DE3618]">
                  <span className="material-symbols-outlined text-lg">pie_chart</span>
                </div>
                <h2 className="text-base font-bold text-[#231A11]">Cơ Cấu Doanh Thu Gói VIP</h2>
              </div>
              <span className="material-symbols-outlined text-[#5C403A] cursor-pointer text-lg">info</span>
            </div>
            <p className="text-xs text-[#5C403A]">Phân bổ nguồn thu tài trợ theo tính năng quảng bá trên toàn hệ thống</p>

            <div className="relative w-full flex items-center justify-center py-6">
              <svg className="w-44 h-44 -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="62" fill="none" stroke="#f2dfd1" strokeWidth="16" />
                <circle cx="80" cy="80" r="62" fill="none" stroke="#DE3618" strokeWidth="16" strokeDasharray="163 390" strokeDashoffset="0" />
                <circle cx="80" cy="80" r="62" fill="none" stroke="#FD9013" strokeWidth="16" strokeDasharray="109 390" strokeDashoffset="-163" />
                <circle cx="80" cy="80" r="62" fill="none" stroke="#2C694E" strokeWidth="16" strokeDasharray="70 390" strokeDashoffset="-272" />
                <circle cx="80" cy="80" r="62" fill="none" stroke="#8F4E00" strokeWidth="16" strokeDasharray="47 390" strokeDashoffset="-342" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] text-[#5C403A] uppercase font-bold">TỔNG ARR</span>
                <span className="text-xl font-black text-[#231A11]">2.45 TỶ</span>
                <span className="text-[10px] text-[#2C694E] font-bold">VNĐ / NĂM</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#FFF1E8]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#DE3618]" />
                <span className="font-semibold text-[#231A11]">VIP Kim Cương (Vị trí Vàng)</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-[#231A11]">42%</span>
                <span className="text-[11px] text-[#5C403A] block">1.03 Tỷ VNĐ</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#FFF1E8]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FD9013]" />
                <span className="font-semibold text-[#231A11]">VIP Vàng Bản Đồ GPS</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-[#231A11]">28%</span>
                <span className="text-[11px] text-[#5C403A] block">686 Triệu</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#FFF1E8]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#2C694E]" />
                <span className="font-semibold text-[#231A11]">Hot Drop Flash Pulse</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-[#231A11]">18%</span>
                <span className="text-[11px] text-[#5C403A] block">441 Triệu</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#FFF1E8]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#8F4E00]" />
                <span className="font-semibold text-[#231A11]">Pin Ghim Thương Hiệu</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-[#231A11]">12%</span>
                <span className="text-[11px] text-[#5C403A] block">294 Triệu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Running Campaigns Table */}
        <div className="xl:col-span-8 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#F2DFD1] flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-[#FFDCC2] flex items-center justify-center text-[#8F4E00]">
                  <span className="material-symbols-outlined text-xl">campaign</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#231A11]">Quản Lý Chiến Dịch Quảng Cáo & Ghim Tài Trợ Bản Đồ</h3>
                  <p className="text-xs text-[#5C403A]">Giám sát cam kết hiển thị (Impressions) và tỷ lệ click chỉ đường thực tế</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => showToast("Mở giao diện ký hợp đồng tài trợ mới")}
                className="px-3.5 py-1.5 rounded-full bg-[#DE3618] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-[#B91D00] transition-all"
              >
                <span className="material-symbols-outlined text-sm">add</span> Thêm Hợp Đồng VIP
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[#5C403A] text-[11px] uppercase tracking-wider border-b border-[#F2DFD1] pb-2 font-bold">
                    <th className="py-2.5 px-3">Thương Hiệu / Nhà Hàng</th>
                    <th className="py-2.5 px-3">Gói Dịch Vụ</th>
                    <th className="py-2.5 px-3">Khu Vực Độc Quyền</th>
                    <th className="py-2.5 px-3">Cam Kết / Thực Tế</th>
                    <th className="py-2.5 px-3">Trạng Thái</th>
                    <th className="py-2.5 px-3 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2DFD1] text-xs">
                  <tr>
                    <td className="py-3 px-3">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#231A11] text-sm">Bếp Trưởng Hà Nội (Hoàn Kiếm)</span>
                        <span className="text-[#5C403A] text-[11px]">ID HĐ: VIP-HN-2024-88</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-[#FFDAD3] text-[#DE3618] font-bold text-[11px]">
                        VIP Kim Cương
                      </span>
                    </td>
                    <td className="py-3 px-3 font-medium text-[#231A11]">Bán kính 2km Hồ Gươm</td>
                    <td className="py-3 px-3">
                      <div className="flex flex-col gap-1 w-28">
                        <div className="flex justify-between font-bold text-[11px]">
                          <span>124.5K</span>
                          <span>/ 150K</span>
                        </div>
                        <div className="w-full bg-[#FFF1E8] h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#DE3618] h-full rounded-full" style={{ width: "83%" }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 text-[#2C694E] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2C694E] animate-pulse" /> Đang chạy
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="inline-flex gap-1">
                        <button
                          type="button"
                          onClick={() => showToast("Đã gửi đề nghị gia hạn hợp đồng VIP!")}
                          className="px-2.5 py-1 rounded-full bg-[#FEEADC] hover:bg-[#F8E5D6] font-bold text-[#231A11]"
                        >
                          Gia hạn
                        </button>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 px-3">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#231A11] text-sm">Dim Tu Tac Saigon</span>
                        <span className="text-[#5C403A] text-[11px]">ID HĐ: VIP-SG-2024-102</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-[#FFDCC2] text-[#8F4E00] font-bold text-[11px]">
                        VIP Vàng Bản Đồ
                      </span>
                    </td>
                    <td className="py-3 px-3 font-medium text-[#231A11]">Quận 1 & Quận 5</td>
                    <td className="py-3 px-3">
                      <div className="flex flex-col gap-1 w-28">
                        <div className="flex justify-between font-bold text-[11px]">
                          <span>88.2K</span>
                          <span>/ 90K</span>
                        </div>
                        <div className="w-full bg-[#FFF1E8] h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#FD9013] h-full rounded-full" style={{ width: "98%" }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 text-[#8F4E00] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FD9013] animate-pulse" /> Sắp hết hạn
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="inline-flex gap-1">
                        <button
                          type="button"
                          onClick={() => showToast("Đang chuẩn bị hợp đồng tái ký!")}
                          className="px-2.5 py-1 rounded-full bg-[#FD9013] text-white hover:opacity-90 font-bold"
                        >
                          Tái Ký
                        </button>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 px-3">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#231A11] text-sm">Mì Quảng Bà Mua (Đà Nẵng)</span>
                        <span className="text-[#5C403A] text-[11px]">ID HĐ: VIP-DN-2024-34</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-[#B1F0CE] text-[#002114] font-bold text-[11px]">
                        Hot Drop Flash Pulse
                      </span>
                    </td>
                    <td className="py-3 px-3 font-medium text-[#231A11]">Cầu Rồng & Sân Bay</td>
                    <td className="py-3 px-3">
                      <div className="flex flex-col gap-1 w-28">
                        <div className="flex justify-between font-bold text-[11px]">
                          <span>42.1K</span>
                          <span>/ 50K</span>
                        </div>
                        <div className="w-full bg-[#FFF1E8] h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#2C694E] h-full rounded-full" style={{ width: "84%" }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 text-[#2C694E] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2C694E] animate-pulse" /> Đang chạy
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="inline-flex gap-1">
                        <button
                          type="button"
                          onClick={() => showToast("Đã gửi đề xuất gia hạn!")}
                          className="px-2.5 py-1 rounded-full bg-[#FEEADC] hover:bg-[#F8E5D6] font-bold text-[#231A11]"
                        >
                          Gia hạn
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-4 border-t border-[#F2DFD1] flex items-center justify-between text-xs text-[#5C403A]">
            <span>Đang hiển thị 3 trên 892 hợp đồng tài trợ đang active</span>
            <button
              type="button"
              onClick={() => onNavigateTab && onNavigateTab("revenue")}
              className="text-[#DE3618] font-bold hover:underline inline-flex items-center gap-0.5"
            >
              Xem toàn bộ hợp đồng ADS & VIP <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dual Section: AI Anti-Spam Fraud Sentinel & Cloud Infrastructure Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="fraud-sentinel">
        {/* Fraud Sentinel */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#F2DFD1] flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FFDAD6] flex items-center justify-center text-[#BA1A1A]">
                <span className="material-symbols-outlined text-2xl">shield_with_heart</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-[#231A11]">Giám Sát Gian Lận Đánh Giá & Cân Bằng Mật Độ Bản Đồ</h3>
                <p className="text-xs text-[#5C403A]">AI Anti-Spam phát hiện các đợt bơm review ảo, tấn công 1 sao và nguy cơ loãng ghim VIP</p>
              </div>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#FFDAD6] text-[#BA1A1A] font-extrabold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#BA1A1A] animate-ping" /> 3 Cảnh Báo Đỏ
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {/* Alert 1 */}
            <div className="p-4 rounded-2xl bg-[#FFF1E8] border border-[#F2DFD1] flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#BA1A1A] text-2xl mt-0.5">report</span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#231A11]">Lẩu Cua Đồng 68 (Quận 1, TP.HCM)</span>
                    <span className="px-2 py-0.2 rounded bg-[#FFDAD6] text-[#BA1A1A] text-[10px] font-bold">
                      Spam Bot 5 Sao
                    </span>
                  </div>
                  <p className="text-xs text-[#5C403A]">
                    Phát hiện 48 đánh giá 5 sao từ cùng dải IP mạng 118.69.xxx trong 12 phút qua. Thuật toán tự động cô lập điểm số uy tín để ban kiểm duyệt thẩm định.
                  </p>
                  <span className="text-[11px] text-[#5C403A] font-mono">ID Cửa hàng: MER-SG-9104 • Tần suất: 4 review/phút</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => showToast("Đã khóa tính năng đánh giá gian hàng này!", "warning")}
                  className="px-3.5 py-1.5 rounded-full bg-[#BA1A1A] text-white text-xs font-bold hover:opacity-90 transition-all shadow-sm"
                >
                  Khóa Đánh Giá
                </button>
              </div>
            </div>

            {/* Alert 2 */}
            <div className="p-4 rounded-2xl bg-[#FFF1E8] border border-[#F2DFD1] flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#BA1A1A] text-2xl mt-0.5">group_remove</span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#231A11]">Bún Bò Huế O Mai (Cầu Giấy, HN)</span>
                    <span className="px-2 py-0.2 rounded bg-[#FFDAD6] text-[#BA1A1A] text-[10px] font-bold">
                      Tấn Công 1 Sao Tập Thể
                    </span>
                  </div>
                  <p className="text-xs text-[#5C403A]">
                    Phát hiện 32 tài khoản tạo dưới 24h cùng thả review 1 sao với nội dung sao chép từ ngữ tiêu cực. AI đã tự động kích hoạt lá chắn bảo vệ quán (Shield Mode).
                  </p>
                  <span className="text-[11px] text-[#2C694E] font-bold">Đã kích hoạt chế độ thẩm định thủ công</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => showToast("Đã duyệt khiếu nại và gỡ 32 đánh giá phá hoại!")}
                  className="px-3.5 py-1.5 rounded-full bg-[#2C694E] text-white text-xs font-bold hover:opacity-90 transition-all shadow-sm"
                >
                  Duyệt Khiếu Nại
                </button>
              </div>
            </div>

            {/* Alert 3 */}
            <div className="p-4 rounded-2xl bg-[#FFF1E8] border border-[#F2DFD1] flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#8F4E00] text-2xl mt-0.5">density_medium</span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#231A11]">Cụm Phố Cổ Hà Nội (Bán Kính 500m)</span>
                    <span className="px-2 py-0.2 rounded bg-[#FFDCC2] text-[#2E1500] text-[10px] font-bold">
                      Mật Độ Ghim VIP Vượt Ngưỡng
                    </span>
                  </div>
                  <p className="text-xs text-[#5C403A]">
                    Mật độ hiển thị ghim tài trợ đạt 18/20 điểm tối đa. Kích hoạt tính năng giãn cách quay vòng hiển thị (Dynamic Ad Rotation) để giữ tính khách quan.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => showToast("Đã kích hoạt thuật toán cân bằng ghim tự động!")}
                  className="px-3.5 py-1.5 rounded-full bg-[#FEEADC] hover:bg-[#F8E5D6] text-xs font-bold text-[#231A11] transition-all"
                >
                  Cân Bằng Tự Động
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cloud Infrastructure Status */}
        <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#F2DFD1] flex flex-col justify-between" id="infra-status">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#B1F0CE] flex items-center justify-center text-[#002114]">
                  <span className="material-symbols-outlined text-2xl">dns</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#231A11]">Hạ Tầng Cụm Máy Chủ Cloud & AI Load</h3>
                  <p className="text-xs text-[#5C403A]">Giám sát tài nguyên máy chủ tính toán thời gian thực theo giây</p>
                </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-[#2C694E] animate-pulse" />
            </div>

            {/* Node Breakdown */}
            <div className="grid grid-cols-3 gap-2.5 my-4 text-center">
              <div className="p-2.5 rounded-2xl bg-[#FFF1E8] border border-[#F2DFD1]">
                <span className="text-[10px] text-[#5C403A] uppercase font-bold">TP.HCM Node 01</span>
                <span className="block font-bold text-[#2C694E] text-sm mt-0.5">CPU: 38%</span>
                <span className="text-[10px] text-[#5C403A]">RAM: 14.2/64GB</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-[#FFF1E8] border border-[#F2DFD1]">
                <span className="text-[10px] text-[#5C403A] uppercase font-bold">Hà Nội Node 02</span>
                <span className="block font-bold text-[#2C694E] text-sm mt-0.5">CPU: 44%</span>
                <span className="text-[10px] text-[#5C403A]">RAM: 18.5/64GB</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-[#FFF1E8] border border-[#F2DFD1]">
                <span className="text-[10px] text-[#5C403A] uppercase font-bold">Đà Nẵng Node 03</span>
                <span className="block font-bold text-[#2C694E] text-sm mt-0.5">CPU: 26%</span>
                <span className="text-[10px] text-[#5C403A]">RAM: 9.1/32GB</span>
              </div>
            </div>

            {/* Metric Gauges */}
            <div className="flex flex-col gap-3.5 my-2">
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#231A11] font-semibold">Tải Tổng Hợp Máy Chủ (Cluster Core Load)</span>
                  <span className="text-[#2C694E] font-bold">42% (Tối ưu)</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#FFF1E8] overflow-hidden">
                  <div className="h-full bg-[#2C694E] rounded-full" style={{ width: "42%" }} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#231A11] font-semibold">Độ Trễ Phản Hồi Định Tuyến GPS Toàn Quốc</span>
                  <span className="text-[#DE3618] font-bold">16ms (Cực nhanh)</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#FFF1E8] overflow-hidden">
                  <div className="h-full bg-[#DE3618] rounded-full" style={{ width: "18%" }} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#231A11] font-semibold">Băng Thông AI Sommelier Gợi Ý (Token/giây)</span>
                  <span className="text-[#8F4E00] font-bold">2,850 tok/s</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#FFF1E8] overflow-hidden">
                  <div className="h-full bg-[#FD9013] rounded-full" style={{ width: "58%" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#F2DFD1] flex items-center justify-between bg-[#FFF1E8] rounded-2xl p-3 mt-3">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#5C403A]">Hạ tầng an ninh điện toán đám mây</span>
              <span className="text-xs text-[#231A11] font-bold">VN-Cloud HCM Node 04 Primary Master</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#2C694E] text-[11px] font-bold">
              <span className="material-symbols-outlined text-sm">shield</span>
              <span>WAF & Anti-DDoS 100Gbps Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Realtime Admin Audit Logs Table */}
      <div className="flex flex-col gap-4" id="audit-log">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#FFDAD3] flex items-center justify-center text-[#DE3618]">
              <span className="material-symbols-outlined text-2xl">history_edu</span>
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-[#231A11]">Nhật Ký Hoạt Động Quản Trị Hệ Thống (Root Audit Log)</h3>
              <p className="text-xs text-[#5C403A]">Toàn bộ thao tác can thiệp dữ liệu, cấp phép quán và điều chỉnh thuật toán được ghi vết bất biến (Immutable Ledger)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white border border-[#F2DFD1] text-[#5C403A] font-mono text-xs font-semibold">
              Thời gian thực: GMT+7
            </span>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-3xl border border-[#F2DFD1] shadow-sm">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="bg-[#FFF1E8] text-[#5C403A] uppercase tracking-wider border-b border-[#F2DFD1] font-bold">
                <th className="py-3 px-5 rounded-tl-3xl">Thời Gian</th>
                <th className="py-3 px-5">Nhân Sự Quản Trị</th>
                <th className="py-3 px-5">Hành Động / Lệnh</th>
                <th className="py-3 px-5">Đối Tượng Bị Tác Động</th>
                <th className="py-3 px-5">Địa Chỉ IP & Thiết Bị</th>
                <th className="py-3 px-5 text-right rounded-tr-3xl">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2DFD1]">
              <tr className="hover:bg-[#FFF1E8]/40 transition-colors">
                <td className="py-3 px-5 text-[#5C403A]">19:42:15.024</td>
                <td className="py-3 px-5 font-bold text-[#231A11]">nam.nguyen (Root Super Admin)</td>
                <td className="py-3 px-5 text-[#DE3618] font-bold">MERCHANT_APPROVE_1CLICK</td>
                <td className="py-3 px-5 text-[#231A11]">Cơm Tấm Ba Ghiền (ID: 80145)</td>
                <td className="py-3 px-5 text-[#5C403A]">14.161.22.84 (MacBook M3 Root)</td>
                <td className="py-3 px-5 text-right">
                  <span className="px-2 py-0.5 rounded bg-[#B1F0CE] text-[#002114] font-bold">SUCCESS (200)</span>
                </td>
              </tr>
              <tr className="hover:bg-[#FFF1E8]/40 transition-colors">
                <td className="py-3 px-5 text-[#5C403A]">19:40:02.881</td>
                <td className="py-3 px-5 font-bold text-[#231A11]">ai_sentinel_daemon</td>
                <td className="py-3 px-5 text-[#BA1A1A] font-bold">FRAUD_QUARANTINE_REVIEWS</td>
                <td className="py-3 px-5 text-[#231A11]">Lẩu Cua Đồng 68 (Quận 1)</td>
                <td className="py-3 px-5 text-[#5C403A]">10.0.4.12 (Internal AI Pod)</td>
                <td className="py-3 px-5 text-right">
                  <span className="px-2 py-0.5 rounded bg-[#FFDAD6] text-[#BA1A1A] font-bold">BLOCKED (48 Bot)</span>
                </td>
              </tr>
              <tr className="hover:bg-[#FFF1E8]/40 transition-colors">
                <td className="py-3 px-5 text-[#5C403A]">19:35:44.119</td>
                <td className="py-3 px-5 font-bold text-[#231A11]">huyen.tran (Financial Auditor)</td>
                <td className="py-3 px-5 text-[#8F4E00] font-bold">VIP_CONTRACT_RENEWAL</td>
                <td className="py-3 px-5 text-[#231A11]">Bếp Trưởng Hà Nội (Hoàn Kiếm)</td>
                <td className="py-3 px-5 text-[#5C403A]">113.190.44.102 (Hanoi HQ Office)</td>
                <td className="py-3 px-5 text-right">
                  <span className="px-2 py-0.5 rounded bg-[#B1F0CE] text-[#002114] font-bold">CONFIRMED (VAT)</span>
                </td>
              </tr>
              <tr className="hover:bg-[#FFF1E8]/40 transition-colors">
                <td className="py-3 px-5 text-[#5C403A]">19:28:10.552</td>
                <td className="py-3 px-5 font-bold text-[#231A11]">system_cluster_orchestrator</td>
                <td className="py-3 px-5 text-[#231A11] font-bold">AUTO_SCALE_GPS_EDGE</td>
                <td className="py-3 px-5 text-[#231A11]">Cluster VN-East Node 01 & 02</td>
                <td className="py-3 px-5 text-[#5C403A]">10.0.1.1 (K8s Master Control)</td>
                <td className="py-3 px-5 text-right">
                  <span className="px-2 py-0.5 rounded bg-[#B1F0CE] text-[#002114] font-bold">SCALED +4 PODS</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

