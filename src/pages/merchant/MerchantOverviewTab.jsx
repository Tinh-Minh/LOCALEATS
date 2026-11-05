import { useState } from "react";

const defaultMenuItems = [
  {
    id: 1,
    name: "Lẩu Nấm Ba Chỉ Bò Mỹ Thảo Mộc",
    price: "325.000đ",
    salesCount: 1480,
    status: "Còn món",
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1547928576-a4a33237cbc3?w=400&q=80",
  },
  {
    id: 2,
    name: "Nước Lẩu Thảo Mộc Dưỡng Nhan",
    price: "95.000đ",
    salesCount: 985,
    status: "Còn món",
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&q=80",
  },
  {
    id: 3,
    name: "Bò Sốt Nấm Tiêu Đen Bản Gang",
    price: "185.000đ",
    salesCount: 632,
    status: "Còn món",
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80",
  },
  {
    id: 4,
    name: "Trà Sen Nhãn Ô Long Khói Hoàng Gia",
    price: "45.000đ",
    salesCount: 420,
    status: "Còn món",
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  },
];

const defaultLiveDirections = [
  {
    id: 1,
    time: "2 phút trước",
    vehicle: "Xe máy",
    vehicleIcon: "two_wheeler",
    vehicleColor: "text-[#FD9013]",
    distance: "1.2 km (Phố Huế)",
    eta: "~4 phút nữa",
    tableStatus: "Đã giữ bàn #08",
    statusClass: "bg-[#FEEADC] text-[#231A11]",
  },
  {
    id: 2,
    time: "7 phút trước",
    vehicle: "Đi bộ",
    vehicleIcon: "directions_walk",
    vehicleColor: "text-[#2C694E]",
    distance: "350m (Hồ Gươm)",
    eta: "~2 phút nữa",
    tableStatus: "Khách vãng lai (4 người)",
    statusClass: "bg-[#FFDAD3] text-[#8E1400]",
  },
  {
    id: 3,
    time: "14 phút trước",
    vehicle: "Ô tô",
    vehicleIcon: "directions_car",
    vehicleColor: "text-[#DE3618]",
    distance: "4.5 km (Cầu Giấy)",
    eta: "~15 phút nữa",
    tableStatus: "Cần chỗ đỗ xe",
    statusClass: "bg-[#FEEADC] text-[#231A11]",
  },
  {
    id: 4,
    time: "21 phút trước",
    vehicle: "Xe máy",
    vehicleIcon: "two_wheeler",
    vehicleColor: "text-[#FD9013]",
    distance: "2.8 km (Ba Đình)",
    eta: "Đã check-in",
    tableStatus: "Đang phục vụ",
    statusClass: "bg-[#B1F0CE] text-[#002114]",
  },
];

export default function MerchantOverviewTab({
  currentPlace = {
    name: "Bếp Trưởng Hà Nội",
    image: "https://images.unsplash.com/photo-1547928576-a4a33237cbc3?w=400&q=80",
    address: "38B Mã Mây, Hàng Buồm, Hoàn Kiếm, Hà Nội",
    district: "Hoàn Kiếm",
    rating: 4.9,
    reviews: 4820,
    closeAt: "23:00",
  },
  isOpen: propIsOpen,
  setIsOpen: propSetIsOpen,
  menuItems: propMenuItems,
  toggleItemStatus: propToggleItemStatus,
  liveDirections: propLiveDirections,
  setIsFlashSaleModalOpen: propSetIsFlashSaleModalOpen,
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(true);
  const isOpen = propIsOpen !== undefined ? propIsOpen : internalIsOpen;
  const setIsOpen = propSetIsOpen || setInternalIsOpen;

  const [items, setItems] = useState(defaultMenuItems);
  const menuItems = propMenuItems || items;

  const handleToggleStatus = (id) => {
    if (propToggleItemStatus) {
      propToggleItemStatus(id);
    } else {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status: item.status === "Còn món" ? "Tạm hết món" : "Còn món" }
            : item
        )
      );
    }
  };

  const liveDirections = propLiveDirections || defaultLiveDirections;
  const [chartPeriod, setChartPeriod] = useState("today");

  // Flash Sale Modal internal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flashSaleText, setFlashSaleText] = useState("Giảm 20% cho khách đến quán trước 19:30");
  const openFlashSaleModal = () => {
    if (propSetIsFlashSaleModalOpen) {
      propSetIsFlashSaleModalOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Top Merchant Status & Highlights Banner */}
      <div className="relative overflow-hidden bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgba(222,54,24,0.06)] border border-[#F2DFD1]">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#FFDAD3]/40 blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-[#FFDCC2]/50 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          {/* Store info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-md shrink-0 border-2 border-white">
              <img
                src={currentPlace?.image || "https://images.unsplash.com/photo-1547928576-a4a33237cbc3?w=400&q=80"}
                alt={currentPlace?.name || "Nhà hàng"}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1 right-1 bg-[#DE3618] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow">
                <span className="material-symbols-outlined text-[10px]">workspace_premium</span> VIP
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl text-[#231A11] font-extrabold tracking-tight">
                  {currentPlace?.name || "Bếp Trưởng Hà Nội"}
                </h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B1F0CE] text-[#002114] text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#2C694E] animate-ping" />
                  <span>{isOpen ? "ĐANG MỞ CỬA" : "TẠM ĐÓNG"}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFDCC2] text-[#2E1500] text-xs font-bold">
                  <span className="material-symbols-outlined text-xs">local_fire_department</span>
                  Đối tác VIP Vàng
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[#5C403A] text-xs font-medium">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-[#DE3618]">location_on</span>
                  {currentPlace?.address || "38B Mã Mây, Hàng Buồm, Hoàn Kiếm, Hà Nội"}
                </span>
                <span className="text-[#F2DFD1] font-bold">•</span>
                <span className="flex items-center gap-1 bg-[#FEEADC] px-2 py-0.5 rounded-md font-semibold text-[#8F4E00]">
                  <span className="material-symbols-outlined text-sm text-[#FD9013]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  {currentPlace?.rating || 4.9} / 5.0 ({currentPlace?.reviews || 4820} nhận xét)
                </span>
                <span className="text-[#F2DFD1] font-bold">•</span>
                <span className="flex items-center gap-1 text-[#2C694E] font-medium">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  Đóng cửa lúc {currentPlace?.closeAt || "22:00"}
                </span>
              </div>
            </div>
          </div>

          {/* Controls: Store Open Toggle & Live Dispatch */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 self-start xl:self-center">
            <div className="flex items-center gap-2.5 bg-[#FFF1E8] px-4 py-2 rounded-2xl shadow-sm border border-[#F2DFD1]">
              <span className="text-xs text-[#231A11] font-bold">Nhận khách tới quán:</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isOpen}
                  onChange={(e) => setIsOpen(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2C694E]" />
              </label>
            </div>

            <button
              type="button"
              onClick={openFlashSaleModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#DE3618] hover:bg-[#B91D00] text-white text-xs font-bold shadow-md shadow-[#DE3618]/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined text-lg">campaign</span>
              <span>Tạo Flash Sale Giờ Vàng</span>
            </button>
          </div>
        </div>

        {/* VIP Positioning Ribbon Alert */}
        <div className="mt-6 pt-4 bg-gradient-to-r from-[#FFDCC2]/60 via-[#FFDAD3]/40 to-transparent -mx-6 md:-mx-8 px-6 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-3 border-t border-[#F2DFD1]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FD9013] text-white flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-sm">workspace_premium</span>
            </div>
            <p className="text-xs sm:text-sm text-[#231A11]">
              <strong className="font-bold text-[#8F4E00]">Tài trợ Vị trí #2 {currentPlace?.district || "Quận Hoàn Kiếm"}:</strong> Gian hàng của bạn đang đón trung bình{" "}
              <strong>1.200 lượt khách khám phá tự nhiên</strong> mỗi ngày từ đề xuất AI bản đồ ẩm thực.
            </p>
          </div>
          <button
            type="button"
            onClick={() => alert("Gói Kim Cương (#1) đang được giảm 15% cho thành viên đối tác lâu năm!")}
            className="inline-flex items-center gap-1 text-xs text-[#DE3618] font-bold hover:underline shrink-0"
          >
            Nâng cấp Gói Kim Cương (#1)
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* 4 Key Core KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Khách chỉ đường tới quán */}
        <div className="bg-white p-5 rounded-3xl shadow-[0_4px_24px_rgba(43,33,24,0.04)] border border-[#F2DFD1] flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-2xl bg-[#FFDAD3] text-[#DE3618] flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">near_me</span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2C694E] bg-[#B1F0CE] px-2 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-xs">trending_up</span>
              +34.2%
            </span>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#231A11] tracking-tight">2.450</span>
            <p className="text-xs text-[#5C403A] font-medium mt-1">Lượt bấm "Chỉ đường GPS"</p>
          </div>
          <div className="mt-3 pt-3 border-t border-[#F2DFD1] flex items-center justify-between text-[11px] text-[#5C403A]">
            <span>Đã tới quán: <strong className="text-[#231A11]">1.820 khách</strong></span>
            <span className="text-[#DE3618] font-semibold">Tỷ lệ chuyển đổi 74%</span>
          </div>
        </div>

        {/* Card 2: Lượt hiển thị bản đồ */}
        <div className="bg-white p-5 rounded-3xl shadow-[0_4px_24px_rgba(43,33,24,0.04)] border border-[#F2DFD1] flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-2xl bg-[#FFDCC2] text-[#8F4E00] flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">map</span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2C694E] bg-[#B1F0CE] px-2 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-xs">trending_up</span>
              +18.5%
            </span>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#231A11] tracking-tight">18.420</span>
            <p className="text-xs text-[#5C403A] font-medium mt-1">Lượt hiển thị trên Bản Đồ</p>
          </div>
          <div className="mt-3 pt-3 border-t border-[#F2DFD1] flex items-center justify-between text-[11px] text-[#5C403A]">
            <span>Bán kính 3km: <strong className="text-[#231A11]">85%</strong></span>
            <span className="text-[#2C694E] font-semibold">Top #2 Khu Vực</span>
          </div>
        </div>

        {/* Card 3: Khách đặt bàn & chờ món */}
        <div className="bg-white p-5 rounded-3xl shadow-[0_4px_24px_rgba(43,33,24,0.04)] border border-[#F2DFD1] flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-2xl bg-[#B1F0CE] text-[#002114] flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">table_restaurant</span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#DE3618] bg-[#FFDAD3] px-2 py-0.5 rounded-full">
              Cao điểm
            </span>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#231A11] tracking-tight">28 / 36</span>
            <p className="text-xs text-[#5C403A] font-medium mt-1">Bàn đang có khách (78%)</p>
          </div>
          <div className="mt-3 pt-3 border-t border-[#F2DFD1] flex items-center justify-between text-[11px] text-[#5C403A]">
            <span>Đang tới: <strong className="text-[#231A11]">4 nhóm khách</strong></span>
            <span className="text-[#2C694E] font-semibold">Còn 8 bàn trống</span>
          </div>
        </div>

        {/* Card 4: Doanh thu ước tính */}
        <div className="bg-white p-5 rounded-3xl shadow-[0_4px_24px_rgba(43,33,24,0.04)] border border-[#F2DFD1] flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-2xl bg-[#FEEADC] text-[#DE3618] flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">payments</span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2C694E] bg-[#B1F0CE] px-2 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-xs">trending_up</span>
              +22.4%
            </span>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#231A11] tracking-tight">38.450.000đ</span>
            <p className="text-xs text-[#5C403A] font-medium mt-1">Doanh thu qua LocalEats hôm nay</p>
          </div>
          <div className="mt-3 pt-3 border-t border-[#F2DFD1] flex items-center justify-between text-[11px] text-[#5C403A]">
            <span>Hóa đơn TB: <strong className="text-[#231A11]">465.000đ</strong></span>
            <span className="text-[#8F4E00] font-semibold">82 lượt thanh toán</span>
          </div>
        </div>
      </div>

      {/* Main Graphs: Peak Hours Traffic Flow & AI Recommendation Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Peak Hours Inbound Flow Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-3xl shadow-[0_4px_24px_rgba(43,33,24,0.04)] border border-[#F2DFD1]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#DE3618] text-xl">show_chart</span>
                <h2 className="text-base sm:text-lg text-[#231A11] font-bold">
                  Lưu Lượng Khách Chỉ Đường & Tới Quán Theo Giờ
                </h2>
              </div>
              <p className="text-xs text-[#5C403A] mt-1">
                Phân tích giờ cao điểm giúp chuẩn bị bàn và tối ưu nhân viên phục vụ
              </p>
            </div>

            {/* Time Filter Tabs */}
            <div className="flex items-center bg-[#FFF1E8] p-1 rounded-2xl border border-[#F2DFD1] self-start sm:self-auto">
              {[
                { id: "today", label: "Hôm nay" },
                { id: "7days", label: "7 ngày qua" },
                { id: "month", label: "Tháng này" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setChartPeriod(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    chartPeriod === tab.id
                      ? "bg-[#DE3618] text-white shadow-sm"
                      : "text-[#5C403A] hover:text-[#231A11]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Traffic Flow Curve */}
          <div className="relative w-full h-64 select-none">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 700 220">
              <defs>
                <linearGradient id="gradientCurve" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#DE3618" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#DE3618" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal grid lines */}
              <line x1="0" y1="40" x2="700" y2="40" stroke="#F2DFD1" strokeDasharray="4 4" strokeWidth="1" />
              <line x1="0" y1="90" x2="700" y2="90" stroke="#F2DFD1" strokeDasharray="4 4" strokeWidth="1" />
              <line x1="0" y1="140" x2="700" y2="140" stroke="#F2DFD1" strokeDasharray="4 4" strokeWidth="1" />
              <line x1="0" y1="190" x2="700" y2="190" stroke="#F2DFD1" strokeWidth="1" />

              {/* Area fill */}
              <path
                d="M 20,185 Q 90,180 150,150 T 300,120 T 420,50 T 540,110 T 680,175 L 680,190 L 20,190 Z"
                fill="url(#gradientCurve)"
              />

              {/* Spline stroke */}
              <path
                d="M 20,185 Q 90,180 150,150 T 300,120 T 420,50 T 540,110 T 680,175"
                fill="none"
                stroke="#DE3618"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Peak Highlight Circle */}
              <circle cx="420" cy="50" r="7" fill="#DE3618" stroke="#FFFFFF" strokeWidth="3" />
              <circle cx="150" cy="150" r="5" fill="#FD9013" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="540" cy="110" r="5" fill="#FD9013" stroke="#FFFFFF" strokeWidth="2" />
            </svg>

            {/* Float Badge Peak Label */}
            <div className="absolute top-2 left-[58%] -translate-x-1/2 bg-[#231A11] text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-[#FD9013] animate-ping" />
              <span>Đỉnh điểm 19:30 (482 khách/h)</span>
            </div>
          </div>

          {/* Time axis labels */}
          <div className="flex justify-between text-[11px] text-[#5C403A] font-semibold pt-2 border-t border-[#F2DFD1]">
            <span>10:00</span>
            <span>11:30 (Trưa)</span>
            <span>14:00</span>
            <span>17:00</span>
            <span className="text-[#DE3618] font-bold">19:30 (Tối)</span>
            <span>21:00</span>
            <span>22:30</span>
          </div>
        </div>

        {/* Right Column: AI Dish Recommendation Engine (4 cols) */}
        <div className="lg:col-span-4 bg-gradient-to-br from-[#FFF1E8] via-[#FEEADC] to-white p-6 md:p-8 rounded-3xl shadow-[0_4px_24px_rgba(43,33,24,0.04)] border border-[#F2DFD1] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#DE3618] text-xl">auto_awesome</span>
              <span className="text-xs font-bold text-[#DE3618] uppercase tracking-wider">AI LocalEats Engine</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#231A11] leading-snug">
              Món Ăn Được Tìm Kiếm Nhiều Nhất Quanh Khu Vực
            </h3>
            <p className="text-xs text-[#5C403A] mt-2 leading-relaxed">
              Dựa trên 14.000 truy vấn tìm kiếm của khách hàng trong bán kính 2km trong 48 giờ qua.
            </p>

            <div className="mt-5 flex flex-col gap-3">
              {[
                { name: "Lẩu Nấm Chim Câu & Bò", count: "1.420 tìm kiếm", percent: 92, tag: "Nên đẩy Flash Sale" },
                { name: "Nước Lẩu Thảo Mộc Nấm", count: "980 tìm kiếm", percent: 78, tag: "Khách gọi nhiều" },
                { name: "Bò Tơ Cuộn Nấm Nướng", count: "750 tìm kiếm", percent: 64, tag: "Món mới hot" },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-2xl shadow-sm border border-[#F2DFD1]">
                  <div className="flex items-center justify-between text-xs font-bold text-[#231A11]">
                    <span>{item.name}</span>
                    <span className="text-[10px] text-[#DE3618] bg-[#FFDAD3] px-2 py-0.5 rounded-full">
                      {item.tag}
                    </span>
                  </div>
                  <div className="w-full bg-[#FFF1E8] h-2 rounded-full mt-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#FD9013] to-[#DE3618] h-full rounded-full transition-all duration-500"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-[#5C403A] mt-1.5">
                    <span>Mức độ quan tâm</span>
                    <span className="font-semibold">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => alert("Hệ thống AI đã tự động ghim các món này lên đầu trang menu của quán!")}
            className="w-full mt-5 py-2.5 rounded-full bg-white text-[#DE3618] border border-[#DE3618] text-xs font-bold hover:bg-[#DE3618] hover:text-white transition-all shadow-sm flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">bolt</span>
            Áp dụng tối ưu thực đơn ngay
          </button>
        </div>
      </div>

      {/* Two operational grids: Live Directions Tracker & Quick Menu Stock Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Live Directions Table (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl shadow-[0_4px_24px_rgba(43,33,24,0.04)] border border-[#F2DFD1]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2C694E] animate-ping" />
                <span className="text-xs font-bold text-[#2C694E] uppercase tracking-wider">Trực Tiếp Radar</span>
              </div>
              <h2 className="text-base sm:text-lg text-[#231A11] font-bold mt-1">
                Thực Khách Đang Chỉ Đường Tới Quán
              </h2>
            </div>
            <span className="text-xs bg-[#FEEADC] text-[#2C694E] px-3 py-1 rounded-full font-bold">
              Trực tiếp GPS
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[#5C403A] font-bold bg-[#FFF1E8] rounded-xl">
                  <th className="py-3 px-4 rounded-l-xl">Thời gian</th>
                  <th className="py-3 px-4">Phương tiện</th>
                  <th className="py-3 px-4">Khoảng cách</th>
                  <th className="py-3 px-4">Dự kiến đến</th>
                  <th className="py-3 px-4 rounded-r-xl text-right">Trạng thái bàn</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2DFD1]">
                {liveDirections.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FFF1E8]/50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#231A11]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DE3618]" />
                        {item.time}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 text-[#231A11] font-medium">
                        <span className={`material-symbols-outlined text-base ${item.vehicleColor}`}>
                          {item.vehicleIcon}
                        </span>
                        {item.vehicle}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#231A11]">{item.distance}</td>
                    <td className="py-3.5 px-4 text-[#2C694E] font-bold">{item.eta}</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${item.statusClass}`}>
                        {item.tableStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Menu Operations (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl shadow-[0_4px_24px_rgba(43,33,24,0.04)] border border-[#F2DFD1] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#DE3618] text-xl">restaurant_menu</span>
                <h2 className="text-base sm:text-lg text-[#231A11] font-bold">Thực Đơn Đang Phục Vụ</h2>
              </div>
              <span className="text-xs text-[#5C403A] font-semibold">{menuItems.length} món</span>
            </div>

            <div className="flex flex-col gap-3">
              {menuItems.map((dish) => (
                <div
                  key={dish.id}
                  className="p-3 rounded-2xl bg-[#FFF1E8]/60 hover:bg-[#FFF1E8] transition-colors border border-[#F2DFD1] flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#231A11] truncate">{dish.name}</span>
                        {dish.isBestseller && (
                          <span className="px-1.5 py-0.2 bg-[#DE3618] text-white text-[9px] font-bold rounded-full">
                            HOT
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#DE3618] font-bold">{dish.price}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleToggleStatus(dish.id)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-bold shrink-0 transition-colors ${
                      dish.status === "Còn món"
                        ? "bg-[#B1F0CE] text-[#002114] hover:bg-amber-100"
                        : "bg-red-100 text-red-700 hover:bg-emerald-100"
                    }`}
                  >
                    {dish.status}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-[#F2DFD1] flex items-center justify-between">
            <span className="text-xs text-[#5C403A]">Cần bổ sung món mới vào menu?</span>
            <button
              type="button"
              onClick={() => alert("Mở form thêm món mới vào thực đơn")}
              className="px-4 py-2 rounded-full bg-[#DE3618] hover:bg-[#B91D00] text-white text-xs font-bold shadow-sm transition-all"
            >
              + Thêm món mới
            </button>
          </div>
        </div>
      </div>

      {/* Internal Flash Sale Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-[#F2DFD1] animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFDAD3] flex items-center justify-center text-[#DE3618]">
                <span className="material-symbols-outlined text-2xl">campaign</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#231A11]">Tạo Flash Sale Giờ Vàng</h3>
                <p className="text-xs text-[#5C403A]">Phát thông báo ưu đãi tới thực khách quanh bán kính 2km</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#231A11] mb-1.5">
                  Nội dung ưu đãi hiển thị trên bản đồ
                </label>
                <input
                  type="text"
                  value={flashSaleText}
                  onChange={(e) => setFlashSaleText(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FFF1E8] border border-[#F2DFD1] text-xs font-medium focus:outline-none focus:border-[#DE3618]"
                />
              </div>

              <div className="p-3 rounded-2xl bg-[#FEEADC] text-xs text-[#8F4E00] flex items-center gap-2">
                <span className="material-symbols-outlined text-base">notifications_active</span>
                <span>Thông báo sẽ được đẩy tới ~1,400 thực khách đang mở app quanh quán!</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-full text-xs font-bold text-[#5C403A] hover:bg-gray-100 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert(`Đã phát Flash Sale thành công: "${flashSaleText}"!`);
                    setIsModalOpen(false);
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#DE3618] hover:bg-[#B91D00] text-white text-xs font-bold shadow-md shadow-[#DE3618]/25 transition-all"
                >
                  Kích hoạt ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
