import { useState } from "react";

export default function MerchantAnalyticsTab() {
  const [timeRange, setTimeRange] = useState("30d");
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, type = "success") => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const topDishes = [
    {
      rank: 1,
      name: "Lẩu Riêu Cua Bắp Bò Sườn Sụn",
      desc: "Món Signature • Nồi lớn 4-5 người",
      cat: "Lẩu truyền thống",
      sold: "1,420",
      unit: "nồi",
      revenue: "823.600.000",
      repeat: "44.2%",
      rating: "4.9 (482)",
      image: "https://images.unsplash.com/photo-1547928576-a4a33237cbc3?w=200&q=80",
    },
    {
      rank: 2,
      name: "Lẩu Ếch Măng Cay Phố Cổ",
      desc: "Vị chua cay nồng ấm đặc trưng",
      cat: "Lẩu đặc sản",
      sold: "980",
      unit: "nồi",
      revenue: "441.000.000",
      repeat: "38.5%",
      rating: "4.8 (310)",
      image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=200&q=80",
    },
    {
      rank: 3,
      name: "Lẩu Gà Đồi Lá É Tiêu Xanh",
      desc: "Thanh ngọt tự nhiên, ấm bụng",
      cat: "Lẩu thanh đạm",
      sold: "760",
      unit: "nồi",
      revenue: "342.000.000",
      repeat: "32.1%",
      rating: "4.7 (215)",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&q=80",
    },
    {
      rank: 4,
      name: "Nem Chua Rán & Ngô Chiên Bơ Tỏi",
      desc: "Món ăn kèm đắt khách nhất",
      cat: "Khai vị / Ăn kèm",
      sold: "2,650",
      unit: "phần",
      revenue: "198.750.000",
      repeat: "51.0%",
      rating: "4.9 (530)",
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=200&q=80",
    },
    {
      rank: 5,
      name: "Chim Câu Quay Nước Dừa Thượng Hạng",
      desc: "Món nhậu đặc sắc dùng kèm bia thủ công",
      cat: "Món nhậu cao cấp",
      sold: "610",
      unit: "con",
      revenue: "152.500.000",
      repeat: "29.4%",
      rating: "4.8 (142)",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&q=80",
    },
  ];

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl font-bold text-xs bg-[#2C694E] text-white animate-bounce">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span>{toastMessage.msg}</span>
        </div>
      )}

      {/* Top Command Strip & Filter Controls */}
      <section className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#F2DFD1] flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#8F4E00]">
            <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
              insights
            </span>
            <span className="text-xs uppercase tracking-wider font-bold">
              Thống kê kinh doanh ẩm thực thời gian thực
            </span>
          </div>

          <div className="flex items-baseline gap-4 flex-wrap">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-[#231A11] tracking-tight">
              Phân tích &amp; Biểu đồ Hiệu suất
            </h1>
            <span className="px-3 py-1 rounded-full bg-[#B1F0CE] text-[#002114] text-xs font-bold">
              Đồng bộ GPS: 3 phút trước
            </span>
          </div>

          <p className="text-xs text-[#5C403A] max-w-2xl">
            Đo lường hành vi thực khách từ tìm kiếm bản đồ, lượt điều hướng chân thực, đến hiệu suất bán các món ăn biểu trưng tại chi nhánh Hoàn Kiếm.
          </p>
        </div>

        {/* Filter Buttons & Export Action */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="p-1.5 rounded-full bg-[#FFF1E8] border border-[#F2DFD1] flex items-center shadow-xs">
            {[
              { id: "today", label: "Hôm nay" },
              { id: "7d", label: "7 ngày qua" },
              { id: "30d", label: "30 ngày qua" },
              { id: "quarter", label: "Quý này" },
            ].map((tab) => {
              const active = timeRange === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setTimeRange(tab.id);
                    showToast(`Đã chuyển bộ lọc: ${tab.label}`);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    active
                      ? "bg-[#DE3618] text-white shadow-sm"
                      : "text-[#5C403A] hover:text-[#231A11]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => showToast("Mở bộ chọn tùy chỉnh khoảng ngày...", "info")}
            className="px-4 py-2.5 rounded-full bg-white text-[#231A11] text-xs font-bold flex items-center gap-2 border border-[#F2DFD1] shadow-xs hover:bg-[#FFF8F5] transition-all"
          >
            <span className="material-symbols-outlined text-base text-[#DE3618]">calendar_month</span>
            <span>Tùy chỉnh ngày</span>
          </button>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsExportOpen(!isExportOpen)}
              className="px-5 py-2.5 rounded-full bg-[#DE3618] hover:bg-[#B91D00] text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-[#DE3618]/25 transition-all"
            >
              <span className="material-symbols-outlined text-base">download</span>
              <span>Xuất báo cáo</span>
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>

            {isExportOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-[#F2DFD1] shadow-xl z-50 p-2 flex flex-col gap-1 animate-fadeIn">
                <button
                  type="button"
                  onClick={() => {
                    setIsExportOpen(false);
                    showToast("Đang tạo báo cáo Excel chi tiết (.xlsx)...", "info");
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#FFF1E8] text-xs font-semibold text-[#231A11] flex items-center gap-2.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[#2C694E] text-lg">table_chart</span>
                  <span>Tải tệp Excel (.xlsx)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsExportOpen(false);
                    showToast("Đang kết xuất ấn phẩm đồ họa PDF...", "info");
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#FFF1E8] text-xs font-semibold text-[#231A11] flex items-center gap-2.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[#DE3618] text-lg">picture_as_pdf</span>
                  <span>Báo cáo đồ họa PDF</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 1: KPI Analytics Overview (Bento Row) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* KPI Card 1 */}
        <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm border border-[#F2DFD1] flex flex-col justify-between group hover:shadow-md transition-all">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-[#FFF1E8] blur-xl pointer-events-none group-hover:scale-125 transition-transform" />
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF1E8] flex items-center justify-center text-[#DE3618] shadow-xs">
              <span className="material-symbols-outlined text-2xl">visibility</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#B1F0CE] text-[#002114] text-xs font-bold">
              <span className="material-symbols-outlined text-xs">trending_up</span>
              <span>+28.4%</span>
            </div>
          </div>
          <div className="mt-6 flex flex-col">
            <span className="text-xs text-[#5C403A] font-semibold">Lượt xem gian hàng bản đồ</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-[#231A11] tracking-tight">64,820</span>
              <span className="text-xs text-[#5C403A]">lượt</span>
            </div>
            <div className="mt-3 w-full bg-[#F8E5D6] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#DE3618] h-full rounded-full" style={{ width: "78%" }} />
            </div>
            <span className="text-[11px] text-[#5C403A] mt-2 flex items-center gap-1">
              <strong className="text-[#2C694E]">+14,320</strong> so với 30 ngày trước
            </span>
          </div>
        </div>

        {/* KPI Card 2 */}
        <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm border border-[#F2DFD1] flex flex-col justify-between group hover:shadow-md transition-all">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-[#FFDCC2]/40 blur-xl pointer-events-none group-hover:scale-125 transition-transform" />
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF1E8] flex items-center justify-center text-[#FD9013] shadow-xs">
              <span className="material-symbols-outlined text-2xl">directions</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#B1F0CE] text-[#002114] text-xs font-bold">
              <span className="material-symbols-outlined text-xs">trending_up</span>
              <span>+19.2%</span>
            </div>
          </div>
          <div className="mt-6 flex flex-col">
            <span className="text-xs text-[#5C403A] font-semibold">Nhấp "Chỉ đường" (Navigation)</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-[#231A11] tracking-tight">12,450</span>
              <span className="text-xs text-[#5C403A]">lần</span>
            </div>
            <div className="mt-3 w-full bg-[#F8E5D6] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#FD9013] h-full rounded-full" style={{ width: "65%" }} />
            </div>
            <span className="text-[11px] text-[#5C403A] mt-2 flex items-center gap-1">
              <strong className="text-[#8F4E00]">19.2%</strong> tương tác bản đồ chuyển hướng
            </span>
          </div>
        </div>

        {/* KPI Card 3 */}
        <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm border border-[#F2DFD1] flex flex-col justify-between group hover:shadow-md transition-all">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-[#B1F0CE]/30 blur-xl pointer-events-none group-hover:scale-125 transition-transform" />
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF1E8] flex items-center justify-center text-[#2C694E] shadow-xs">
              <span className="material-symbols-outlined text-2xl">storefront</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#B1F0CE] text-[#002114] text-xs font-bold">
              <span className="material-symbols-outlined text-xs">trending_up</span>
              <span>+4.8%</span>
            </div>
          </div>
          <div className="mt-6 flex flex-col">
            <span className="text-xs text-[#5C403A] font-semibold">Khách ghé thực tế (Walk-in Rate)</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-[#231A11] tracking-tight">38.6%</span>
              <span className="text-xs text-[#2C694E] font-bold">Rất cao</span>
            </div>
            <div className="mt-3 w-full bg-[#F8E5D6] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#2C694E] h-full rounded-full" style={{ width: "38.6%" }} />
            </div>
            <span className="text-[11px] text-[#5C403A] mt-2 flex items-center gap-1">
              Khoảng <strong className="text-[#231A11]">4,805</strong> lượt bàn thực nhận
            </span>
          </div>
        </div>

        {/* KPI Card 4 */}
        <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm border border-[#F2DFD1] flex flex-col justify-between group hover:shadow-md transition-all">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-[#FFDAD3]/40 blur-xl pointer-events-none group-hover:scale-125 transition-transform" />
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF1E8] flex items-center justify-center text-[#DE3618] shadow-xs">
              <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FEEADC] text-[#231A11] text-xs font-semibold">
              <span>Ổn định</span>
            </div>
          </div>
          <div className="mt-6 flex flex-col">
            <span className="text-xs text-[#5C403A] font-semibold">Chi tiêu ước tính / Thực khách</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-[#DE3618] tracking-tight">245.000</span>
              <span className="text-xs text-[#231A11] font-bold">VNĐ</span>
            </div>
            <div className="mt-3 w-full bg-[#F8E5D6] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#DE3618] h-full rounded-full" style={{ width: "62%" }} />
            </div>
            <span className="text-[11px] text-[#5C403A] mt-2 flex items-center gap-1">
              Mục tiêu kỳ tới: <strong className="text-[#DE3618]">280.000 VNĐ</strong>
            </span>
          </div>
        </div>
      </section>

      {/* AI Smart Insight Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#B91D00] via-[#DE3618] to-[#FD9013] p-6 sm:p-8 text-white shadow-xl shadow-[#DE3618]/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="flex items-start gap-4 z-10">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-[#FFDAD3] font-bold">
                LOCALEATS AI Genius Recommendation
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#B1F0CE] text-[#002114] text-[10px] font-bold">
                Độ tin cậy 94%
              </span>
            </div>
            <p className="text-sm lg:text-base text-white font-medium leading-relaxed max-w-3xl">
              "Khách đi nhóm 4 người tăng <strong className="underline decoration-[#FFDCC2]">45%</strong> vào khung giờ 18:30 – 21:30 các tối Thứ 6 &amp; Thứ 7. Đề xuất tăng cường đẩy mạnh{" "}
              <strong className="text-[#FFDCC2]">Combo Lẩu Gia Đình 4 Người</strong> để nâng giá trị đơn lên{" "}
              <strong className="text-[#FFDCC2]">1.200.000 VNĐ</strong>."
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0 z-10 w-full md:w-auto">
          <button
            type="button"
            onClick={() => showToast("Đã tạo chương trình combo đề xuất vào thực đơn!", "success")}
            className="w-full md:w-auto px-6 py-3 rounded-full bg-white text-[#DE3618] text-xs font-bold shadow-md hover:bg-[#FFF8F5] active:scale-95 transition-all text-center"
          >
            Áp dụng Combo ngay
          </button>
        </div>
      </section>

      {/* Section 2: Deep Dive Chart 1 - 24H Hourly Curve */}
      <section className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-[#F2DFD1] flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#DE3618] animate-pulse" />
              <h2 className="text-base sm:text-lg font-bold text-[#231A11]">
                Lưu lượng khách tìm kiếm theo 24 Giờ
              </h2>
            </div>
            <p className="text-xs text-[#5C403A]">
              So sánh mật độ tìm kiếm &amp; chỉ đường giữa Ngày trong tuần (Thứ 2 - Thứ 5) và Cuối tuần (Thứ 6 - CN)
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#FFF8F5] px-4 py-2 rounded-2xl border border-[#F2DFD1]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#231A11]">
              <span className="w-3 h-3 rounded-full bg-[#DE3618]" />
              <span>Cuối tuần (T6-CN)</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#5C403A]">
              <span className="w-3 h-3 rounded-full bg-[#FD9013]" />
              <span>Ngày thường (T2-T5)</span>
            </div>
            <div className="h-4 w-px bg-[#F2DFD1]" />
            <span className="text-xs text-[#2C694E] font-bold">Đỉnh điểm: 19h30</span>
          </div>
        </div>

        {/* Line Graph SVG Visual Container */}
        <div className="relative w-full overflow-x-auto">
          <div className="min-w-[720px] h-72 flex flex-col justify-between relative pt-6 pb-2">
            {/* Horizontal Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
              <div className="w-full border-b border-[#F2DFD1] border-dashed h-0" />
              <div className="w-full border-b border-[#F2DFD1] border-dashed h-0" />
              <div className="w-full border-b border-[#F2DFD1] border-dashed h-0" />
              <div className="w-full border-b border-[#F2DFD1] border-dashed h-0" />
              <div className="w-full border-b border-[#F2DFD1] border-dashed h-0" />
            </div>

            {/* Interactive SVG Plot */}
            <svg className="w-full h-56 overflow-visible" preserveAspectRatio="none" viewBox="0 0 900 220">
              <defs>
                <linearGradient id="weekendGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#DE3618" stopOpacity="0.32" />
                  <stop offset="85%" stopColor="#DE3618" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="weekdayGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#FD9013" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#FD9013" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Weekend Area & Line */}
              <path
                d="M 0,200 L 75,195 L 150,190 L 225,180 L 300,140 L 375,100 L 450,120 L 525,150 L 600,85 L 675,25 L 750,45 L 825,120 L 900,180 L 900,220 L 0,220 Z"
                fill="url(#weekendGrad)"
              />
              <path
                d="M 0,200 L 75,195 L 150,190 L 225,180 L 300,140 L 375,100 L 450,120 L 525,150 L 600,85 L 675,25 L 750,45 L 825,120 L 900,180"
                fill="none"
                stroke="#DE3618"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3.5"
              />

              {/* Weekday Area & Line */}
              <path
                d="M 0,210 L 75,205 L 150,200 L 225,185 L 300,150 L 375,70 L 450,90 L 525,170 L 600,130 L 675,95 L 750,110 L 825,160 L 900,195 L 900,220 L 0,220 Z"
                fill="url(#weekdayGrad)"
              />
              <path
                d="M 0,210 L 75,205 L 150,200 L 225,185 L 300,150 L 375,70 L 450,90 L 525,170 L 600,130 L 675,95 L 750,110 L 825,160 L 900,195"
                fill="none"
                stroke="#FD9013"
                strokeDasharray="4 4"
                strokeLinecap="round"
                strokeWidth="2.5"
              />

              {/* Highlight Peak Dot at 19:30 Weekend */}
              <circle cx="675" cy="25" fill="#DE3618" r="7" stroke="#ffffff" strokeWidth="3" />
              {/* Highlight Lunch Peak Weekday */}
              <circle cx="375" cy="70" fill="#FD9013" r="5" stroke="#ffffff" strokeWidth="2" />
            </svg>

            {/* 24-Hour Timeline Labels */}
            <div className="flex justify-between text-xs text-[#5C403A] pt-2">
              <span>00:00</span>
              <span>03:00</span>
              <span>06:00</span>
              <span>09:00</span>
              <span className="font-bold text-[#231A11]">11:30 (Trưa)</span>
              <span>14:00</span>
              <span>16:00</span>
              <span className="font-bold text-[#DE3618]">19:30 (Cao điểm Tối)</span>
              <span>21:30</span>
              <span>23:00</span>
            </div>
          </div>
        </div>

        {/* Quick Context Stat Pills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-[#FFF8F5] border border-[#F2DFD1] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#5C403A] font-semibold">Khung giờ trưa (11:30 - 13:30)</span>
              <span className="text-base font-bold text-[#231A11]">1,840 lượt/ngày</span>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-white border border-[#F2DFD1] text-xs text-[#8F4E00] font-bold">
              Dân văn phòng
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF8F5] border border-[#F2DFD1] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#5C403A] font-semibold">Khung giờ tối (18:30 - 21:30)</span>
              <span className="text-base font-bold text-[#DE3618]">4,620 lượt/ngày</span>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-[#FFDAD3] text-[#8E1400] text-xs font-bold">
              Cháy bàn +92%
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF8F5] border border-[#F2DFD1] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#5C403A] font-semibold">Khách ăn đêm (Sau 22:00)</span>
              <span className="text-base font-bold text-[#231A11]">890 lượt/ngày</span>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-[#B1F0CE] text-[#002114] text-xs font-bold">
              Tăng trưởng +15%
            </span>
          </div>
        </div>
      </section>

      {/* Section 3: Deep Dive Chart 2 (Acquisition Channels) & Chart 3 (Demographics) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Deep Dive 2: Donut Chart & Source Breakdown (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-[#F2DFD1] flex flex-col justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[#8F4E00] uppercase tracking-wider">
                Phễu chuyển đổi
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[#231A11]">
                Kênh tiếp cận &amp; Nguồn khách hàng
              </h2>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-[#FFF1E8] text-[#5C403A] font-medium border border-[#F2DFD1]">
              Bản đồ GPS &amp; AI
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Donut Visual */}
            <div className="md:col-span-5 flex flex-col items-center justify-center relative">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" fill="transparent" r="38" stroke="#FEEADC" strokeWidth="12" />
                  {/* 46% GPS Direct (#DE3618) */}
                  <circle
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="38"
                    stroke="#DE3618"
                    strokeDasharray="109.8 238.76"
                    strokeDashoffset="0"
                    strokeWidth="12"
                  />
                  {/* 28% AI (#FD9013) */}
                  <circle
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="38"
                    stroke="#FD9013"
                    strokeDasharray="66.85 238.76"
                    strokeDashoffset="-109.8"
                    strokeWidth="12"
                  />
                  {/* 16% Trending (#2C694E) */}
                  <circle
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="38"
                    stroke="#2C694E"
                    strokeDasharray="38.2 238.76"
                    strokeDashoffset="-176.65"
                    strokeWidth="12"
                  />
                  {/* 10% VIP Pin (#8F4E00) */}
                  <circle
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="38"
                    stroke="#8F4E00"
                    strokeDasharray="23.87 238.76"
                    strokeDashoffset="-214.85"
                    strokeWidth="12"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-black text-[#231A11] leading-none">100%</span>
                  <span className="text-[11px] text-[#5C403A] font-semibold mt-1">4 Luồng chính</span>
                </div>
              </div>
              <span className="text-xs text-[#5C403A] mt-2 text-center">Tổng 64,820 phiên xem</span>
            </div>

            {/* Channel Progress Breakdown Details */}
            <div className="md:col-span-7 flex flex-col gap-3">
              {/* Item 1 */}
              <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-[#FFF8F5] border border-[#F2DFD1] hover:bg-[#FFF1E8] transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#DE3618] shrink-0" />
                    <span className="text-xs font-bold text-[#231A11]">Tìm kiếm trực tiếp bản đồ GPS</span>
                  </div>
                  <span className="text-xs font-black text-[#DE3618]">46%</span>
                </div>
                <div className="w-full bg-[#F8E5D6] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#DE3618] h-full rounded-full" style={{ width: "46%" }} />
                </div>
                <span className="text-[11px] text-[#5C403A]">29,817 khách định vị tìm quán bán kính 1.5km</span>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-[#FFF8F5] border border-[#F2DFD1] hover:bg-[#FFF1E8] transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FD9013] shrink-0" />
                    <span className="text-xs font-bold text-[#231A11]">Đề xuất Trợ lý AI ẩm thực</span>
                  </div>
                  <span className="text-xs font-black text-[#8F4E00]">28%</span>
                </div>
                <div className="w-full bg-[#F8E5D6] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#FD9013] h-full rounded-full" style={{ width: "28%" }} />
                </div>
                <span className="text-[11px] text-[#5C403A]">18,150 khách hỏi "Ăn lẩu ngon phố cổ Hà Nội"</span>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-[#FFF8F5] border border-[#F2DFD1] hover:bg-[#FFF1E8] transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#2C694E] shrink-0" />
                    <span className="text-xs font-bold text-[#231A11]">Mục Quán Đang HOT / Trending</span>
                  </div>
                  <span className="text-xs font-black text-[#2C694E]">16%</span>
                </div>
                <div className="w-full bg-[#F8E5D6] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#2C694E] h-full rounded-full" style={{ width: "16%" }} />
                </div>
                <span className="text-[11px] text-[#5C403A]">Top 3 bảng xếp hạng Phố Ẩm Thực Hoàn Kiếm</span>
              </div>

              {/* Item 4 */}
              <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-[#FFF8F5] border border-[#F2DFD1] hover:bg-[#FFF1E8] transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#8F4E00] shrink-0" />
                    <span className="text-xs font-bold text-[#231A11]">Ghim tài trợ VIP Phố Cổ</span>
                  </div>
                  <span className="text-xs font-black text-[#8F4E00]">10%</span>
                </div>
                <div className="w-full bg-[#F8E5D6] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#8F4E00] h-full rounded-full" style={{ width: "10%" }} />
                </div>
                <span className="text-[11px] text-[#5C403A]">Hiển thị ưu tiên tại ngã tư Tràng Tiền &amp; Đinh Tiên Hoàng</span>
              </div>
            </div>
          </div>
        </div>

        {/* Deep Dive 3: Demographics & Geography (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-[#F2DFD1] flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-bold text-[#2C694E] uppercase tracking-wider">
              Chân dung người ăn
            </span>
            <h2 className="text-base sm:text-lg font-bold text-[#231A11]">
              Cơ cấu Khách theo Nhân khẩu học
            </h2>
            <p className="text-xs text-[#5C403A]">
              Phân bố khách ghé thực tế theo đối tượng và nguồn gốc địa lý
            </p>
          </div>

          <div className="flex flex-col gap-3.5">
            {/* Segment 1 */}
            <div className="p-3.5 rounded-2xl bg-[#FFF8F5] border border-[#F2DFD1] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FFDAD3] flex items-center justify-center text-[#DE3618]">
                    <span className="material-symbols-outlined text-lg">business_center</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#231A11]">Dân văn phòng quanh Hoàn Kiếm</span>
                    <span className="text-[11px] text-[#5C403A]">Bán kính 2km • Khung trưa &amp; liên hoan tối</span>
                  </div>
                </div>
                <span className="text-base font-black text-[#231A11]">42%</span>
              </div>
              <div className="w-full bg-[#F8E5D6] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#DE3618] h-full rounded-full" style={{ width: "42%" }} />
              </div>
            </div>

            {/* Segment 2 */}
            <div className="p-3.5 rounded-2xl bg-[#FFF8F5] border border-[#F2DFD1] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FFDCC2] flex items-center justify-center text-[#8F4E00]">
                    <span className="material-symbols-outlined text-lg">flight_takeoff</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#231A11]">Du khách phương xa &amp; Quốc tế</span>
                    <span className="text-[11px] text-[#5C403A]">Khách Sài Gòn, Hàn Quốc, Pháp &amp; Úc</span>
                  </div>
                </div>
                <span className="text-base font-black text-[#231A11]">34%</span>
              </div>
              <div className="w-full bg-[#F8E5D6] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#FD9013] h-full rounded-full" style={{ width: "34%" }} />
              </div>
            </div>

            {/* Segment 3 */}
            <div className="p-3.5 rounded-2xl bg-[#FFF8F5] border border-[#F2DFD1] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#B1F0CE] flex items-center justify-center text-[#2C694E]">
                    <span className="material-symbols-outlined text-lg">celebration</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#231A11]">Giới trẻ sành ăn (Food Reviewer)</span>
                    <span className="text-[11px] text-[#5C403A]">Nhóm tuổi 18 - 28 • Cuối tuần &amp; sau 20h</span>
                  </div>
                </div>
                <span className="text-base font-black text-[#231A11]">24%</span>
              </div>
              <div className="w-full bg-[#F8E5D6] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#2C694E] h-full rounded-full" style={{ width: "24%" }} />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 bg-[#FFF8F5] p-3 rounded-2xl border border-[#F2DFD1]">
            <span className="text-xs text-[#5C403A] font-semibold">Vùng tập trung đặt chỗ:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-white text-xs font-bold text-[#231A11] border border-[#F2DFD1]">
                Phố Cổ
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white text-xs font-bold text-[#231A11] border border-[#F2DFD1]">
                Bờ Hồ
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white text-xs font-bold text-[#231A11] border border-[#F2DFD1]">
                Phan Chu Trinh
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Top 5 Profitable & Traffic Generating Dishes Table */}
      <section className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-[#F2DFD1] flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#DE3618] text-2xl">local_fire_department</span>
              <h2 className="text-base sm:text-lg font-bold text-[#231A11]">
                Top 5 Món Ăn Sinh Lời &amp; Hút Khách Nhất
              </h2>
            </div>
            <p className="text-xs text-[#5C403A]">
              Xếp hạng dựa trên tỷ lệ bán ra thực tế, giá trị doanh thu và tỷ lệ thực khách quay lại (Repeat Rate)
            </p>
          </div>

          <button
            type="button"
            onClick={() => showToast("Hiển thị đầy đủ báo cáo 38 món...", "info")}
            className="px-4 py-2 rounded-full bg-[#FFF1E8] hover:bg-[#FEEADC] text-[#231A11] text-xs font-bold border border-[#F2DFD1] transition-colors"
          >
            Xem toàn bộ 38 món
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px] text-xs">
            <thead>
              <tr className="bg-[#FFF1E8] text-[#5C403A] font-bold uppercase tracking-wider rounded-2xl">
                <th className="py-3.5 px-4 rounded-l-2xl">Thứ hạng &amp; Món ăn</th>
                <th className="py-3.5 px-4">Danh mục</th>
                <th className="py-3.5 px-4 text-right">Lượng bán ra</th>
                <th className="py-3.5 px-4 text-right">Doanh thu ước tính</th>
                <th className="py-3.5 px-4 text-center">Tỷ lệ gọi lại (Repeat)</th>
                <th className="py-3.5 px-4 text-center rounded-r-2xl">Đánh giá khách</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2DFD1]">
              {topDishes.map((dish) => (
                <tr key={dish.rank} className="hover:bg-[#FFF8F5] transition-colors group">
                  <td className="py-4 px-4 flex items-center gap-3.5">
                    <span
                      className={`w-7 h-7 rounded-full text-white text-xs font-black flex items-center justify-center shrink-0 shadow-sm ${
                        dish.rank === 1
                          ? "bg-[#DE3618]"
                          : dish.rank === 2
                          ? "bg-[#FD9013]"
                          : "bg-gray-400"
                      }`}
                    >
                      {dish.rank}
                    </span>
                    <img
                      className="w-14 h-14 rounded-2xl object-cover shadow-sm shrink-0 border border-[#F2DFD1]"
                      src={dish.image}
                      alt={dish.name}
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-xs text-[#231A11] truncate">{dish.name}</span>
                      <span className="text-[11px] text-[#5C403A]">{dish.desc}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 rounded-full bg-[#FFF1E8] text-xs text-[#8F4E00] font-semibold">
                      {dish.cat}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="font-bold text-sm text-[#231A11]">{dish.sold}</span>
                    <span className="block text-[11px] text-[#5C403A]">{dish.unit}</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="font-extrabold text-sm text-[#DE3618]">{dish.revenue}</span>
                    <span className="block text-[11px] text-[#5C403A]">VNĐ</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B1F0CE] text-[#002114] text-xs font-bold">
                      <span className="material-symbols-outlined text-sm">repeat</span>
                      <span>{dish.repeat}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-xs text-[#8F4E00] font-bold">
                      <span className="material-symbols-outlined text-base text-[#FD9013]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      {dish.rating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer Summary */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 bg-[#FFF8F5] px-6 py-4 rounded-2xl border border-[#F2DFD1] gap-3">
          <span className="text-xs text-[#5C403A]">
            Tổng doanh thu 5 món dẫn đầu: <strong className="text-[#231A11]">1.957.850.000 VNĐ</strong> (Chiếm 68% doanh số tổng)
          </span>
          <button
            type="button"
            onClick={() => showToast("Đang tối ưu thực đơn gợi ý...", "info")}
            className="text-[#DE3618] text-xs font-bold hover:underline flex items-center gap-1"
          >
            <span>Thiết lập giá &amp; khuyến mãi theo khung giờ</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      </section>
    </div>
  );
}

