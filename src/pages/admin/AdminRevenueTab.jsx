import { useState } from "react";

/**
 * AdminRevenueTab
 * Super Admin Screen: Doanh Thu VIP & Ads
 * Auto-generated from Google Stitch design with full length fidelity.
 */
export default function AdminRevenueTab({ onNavigateTab }) {
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");

  const showToast = (msg, type = "success") => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 3200);
  };

  return (
    <div className="relative w-full">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#231A11] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#FD9013]/30 animate-bounce">
          <span className="material-symbols-outlined text-[#FD9013]">
            {toastMessage.type === "error" ? "error" : "check_circle"}
          </span>
          <span className="text-xs font-semibold">{toastMessage.msg}</span>
        </div>
      )}

      {/* Main Stitch Screen Content */}
      <main className="w-full pt-16 px-gutter-md pb-margin-lg bg-surface"><div className="flex flex-col w-full">
{/*  Section 1: Page Header & Time Controls  */}
<div className="flex flex-col gap-space-md mb-space-xl">
<div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
<div>
<div className="flex items-center gap-space-xs mb-space-xs">
<span className="px-space-xs py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase tracking-wider">
            Tài Chính &amp; Quảng Cáo
          </span>
<span className="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Dữ liệu thời gian thực (Cập nhật 2 phút trước)</span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          Doanh Thu Gói VIP, Vị Trí Ghim Bản Đồ &amp; Tài Trợ Quảng Cáo
        </h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-space-xs max-w-4xl">
          Báo cáo vĩ mô ARR, MRR, tỷ lệ giữ chân đối tác quán ăn và phân tích cơ cấu nguồn thu trên nền tảng LOCALEATS toàn quốc
        </p>
</div>
{/*  Quick Actions  */}
<div className="flex flex-wrap items-center gap-space-xs">
<button className="flex items-center gap-space-xs px-space-md py-2.5 rounded-full bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors shadow-sm">
<span className="material-symbols-outlined text-base text-primary">download</span>
          Xuất Báo Cáo (Excel / PDF)
        </button>
<button className="flex items-center gap-space-xs px-space-md py-2.5 rounded-full bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors shadow-sm">
<span className="material-symbols-outlined text-base text-secondary">tune</span>
          Cấu Hình Thuế &amp; Chiết Khấu
        </button>
<button className="flex items-center gap-space-xs px-space-md py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all shadow-md active:scale-95">
<span className="material-symbols-outlined text-base animate-spin" style={{ animationDuration: "3s" }}>sync</span>
          Đồng Bộ Cổng Thanh Toán Live
        </button>
</div>
</div>
{/*  Time Filter Pills  */}
<div className="flex flex-wrap items-center justify-between gap-space-md pt-space-xs">
<div className="inline-flex p-1 rounded-full bg-surface-container-low shadow-sm">
<button className="px-space-md py-1.5 rounded-full text-on-surface-variant font-label-md text-label-md hover:text-on-surface transition-colors">
          Hôm nay
        </button>
<button className="px-space-md py-1.5 rounded-full text-on-surface-variant font-label-md text-label-md hover:text-on-surface transition-colors">
          7 ngày qua
        </button>
<button className="px-space-md py-1.5 rounded-full bg-primary text-on-primary font-label-md text-label-md shadow-sm">
          Tháng này (Tháng 10/2024)
        </button>
<button className="px-space-md py-1.5 rounded-full text-on-surface-variant font-label-md text-label-md hover:text-on-surface transition-colors">
          Quý 4/2024
        </button>
<button className="px-space-md py-1.5 rounded-full text-on-surface-variant font-label-md text-label-md hover:text-on-surface transition-colors">
          Cả năm 2024
        </button>
</div>
<div className="flex items-center gap-space-sm font-label-md text-label-md text-on-surface-variant">
<span className="flex items-center gap-1 text-tertiary font-bold">
<span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
          VNPay, MoMo, VietQR: Sẵn sàng
        </span>
<span className="text-outline">/</span>
<span>Kỳ đối soát: <strong className="text-on-surface">Chu kỳ tuần (Thứ 2 hàng tuần)</strong></span>
</div>
</div>
</div>
{/*  Section 2: Macro Financial KPI Cards  */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-space-md mb-space-xl">
{/*  KPI Card 1: ARR  */}
<div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm relative overflow-hidden flex flex-col justify-between">
<div className="absolute -right-4 -top-4 w-20 h-20 bg-primary-fixed-dim/30 rounded-full blur-xl pointer-events-none"></div>
<div>
<div className="flex items-center justify-between mb-space-xs">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Doanh Thu Lũy Kế (ARR)</span>
<span className="w-7 h-7 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
<span className="material-symbols-outlined text-sm">trending_up</span>
</span>
</div>
<p className="font-headline-md text-headline-md text-on-surface tracking-tight">2.450.000.000 <span className="font-label-md text-label-md font-normal text-on-surface-variant">đ</span></p>
</div>
<div className="mt-space-md pt-space-xs">
<div className="flex items-center justify-between font-label-sm text-label-sm">
<span className="text-tertiary font-bold flex items-center gap-0.5">
<span className="material-symbols-outlined text-xs">arrow_upward</span> +18.4% MoM
          </span>
<span className="text-on-surface-variant">Mục tiêu Q4: 2.8 Tỷ</span>
</div>
<div className="w-full bg-surface-container rounded-full h-1.5 mt-1.5 overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{ width: "87.5%" }}></div>
</div>
</div>
</div>
{/*  KPI Card 2: MRR  */}
<div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm relative overflow-hidden flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-xs">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Doanh Thu Tháng Này (MRR)</span>
<span className="w-7 h-7 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
<span className="material-symbols-outlined text-sm">calendar_month</span>
</span>
</div>
<p className="font-headline-md text-headline-md text-on-surface tracking-tight">286.450.000 <span className="font-label-md text-label-md font-normal text-on-surface-variant">đ</span></p>
</div>
<div className="mt-space-md pt-space-xs">
<div className="flex items-center justify-between font-label-sm text-label-sm">
<span className="text-tertiary font-bold flex items-center gap-0.5">
<span className="material-symbols-outlined text-xs">arrow_upward</span> +22.1% YoY
          </span>
<span className="text-on-surface-variant">TB: 9.5M đ/ngày</span>
</div>
<p className="font-label-sm text-label-sm text-outline mt-1 truncate">Dự kiến hết tháng: 312M đ</p>
</div>
</div>
{/*  KPI Card 3: Paid Merchants  */}
<div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm relative overflow-hidden flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-xs">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Quán Đang Trả Phí</span>
<span className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface">
<span className="material-symbols-outlined text-sm">store</span>
</span>
</div>
<div className="flex items-baseline gap-1.5">
<p className="font-headline-md text-headline-md text-on-surface tracking-tight">892</p>
<span className="font-label-sm text-label-sm text-outline">/ 12.840 quán (6.95%)</span>
</div>
</div>
<div className="mt-space-md pt-space-xs">
<div className="flex flex-wrap gap-1 font-label-sm text-label-sm">
<span className="px-1.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-bold">142 Kim Cương</span>
<span className="px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed">380 Vàng</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant">210 Pulse</span>
</div>
</div>
</div>
{/*  KPI Card 4: LTV & CAC  */}
<div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm relative overflow-hidden flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-xs">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Giá Trị Trọn Đời (LTV)</span>
<span className="w-7 h-7 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
<span className="material-symbols-outlined text-sm">all_inclusive</span>
</span>
</div>
<p className="font-headline-md text-headline-md text-on-surface tracking-tight">18.250.000 <span className="font-label-md text-label-md font-normal text-on-surface-variant">đ</span></p>
</div>
<div className="mt-space-md pt-space-xs">
<div className="flex items-center justify-between font-label-sm text-label-sm">
<span className="text-on-surface-variant">Chi phí CAC: <strong className="text-on-surface">420.000 đ</strong></span>
<span className="px-1.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-bold">43.4x Healthy</span>
</div>
<p className="font-label-sm text-label-sm text-tertiary mt-1">Thời gian hoàn vốn: 1.4 tháng</p>
</div>
</div>
{/*  KPI Card 5: Retention & Churn  */}
<div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm relative overflow-hidden flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-xs">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Tái Tục &amp; Rời Bỏ</span>
<span className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-sm">autorenew</span>
</span>
</div>
<div className="flex items-baseline gap-2">
<p className="font-headline-md text-headline-md text-tertiary tracking-tight">94.6%</p>
<span className="font-label-sm text-label-sm text-outline">Tái tục auto</span>
</div>
</div>
<div className="mt-space-md pt-space-xs">
<div className="flex items-center justify-between font-label-sm text-label-sm">
<span className="text-on-surface-variant">Tỷ lệ Churn: <strong className="text-primary font-bold">2.1%</strong></span>
<span className="text-tertiary font-bold">-0.4% so T9</span>
</div>
<div className="w-full bg-surface-container rounded-full h-1.5 mt-1.5 overflow-hidden">
<div className="bg-tertiary h-full rounded-full" style={{ width: "94.6%" }}></div>
</div>
</div>
</div>
</div>
{/*  Section 3: Revenue Trend & Product Mix Analytics  */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md mb-space-xl">
{/*  Cash Flow Trend Chart (Span 7)  */}
<div className="lg:col-span-7 rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col justify-between">
<div>
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
<div>
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-lg">insights</span>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Xu Hướng Dòng Tiền 12 Tháng (2023 - 2024)</h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Tác động mạnh mẽ từ mốc ra mắt tính năng HotDrop Pulse (T5) và Ghim Độc Quyền Bản Đồ (T7)
            </p>
</div>
<div className="flex items-center gap-space-sm">
<span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
<span className="w-2.5 h-2.5 rounded-sm bg-primary"></span> Thực thu
            </span>
<span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
<span className="w-2.5 h-2.5 rounded-sm bg-secondary-container"></span> Mục tiêu
            </span>
</div>
</div>
{/*  Inline SVG Trend Chart  */}
<div className="w-full h-64 relative mt-space-md">
<svg className="w-full h-full" preserveaspectratio="none" viewBox="0 0 680 220">
<defs>
<lineargradient id="primaryBarGrad" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stopColor="#de3618" stopOpacity="0.95"></stop>
<stop offset="100%" stopColor="#b91d00" stopOpacity="0.65"></stop>
</lineargradient>
<lineargradient id="pulseGlow" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stopColor="#fd9013" stopOpacity="0.3"></stop>
<stop offset="100%" stopColor="#fd9013" stopOpacity="0"></stop>
</lineargradient>
</defs>
{/*  Grid Lines  */}
<line stroke="#f2dfd1" strokeWidth="1" x1="0" x2="680" y1="180" y2="180"></line>
<line stroke="#f2dfd1" strokeDasharray="4" strokeWidth="1" x1="0" x2="680" y1="130" y2="130"></line>
<line stroke="#f2dfd1" strokeDasharray="4" strokeWidth="1" x1="0" x2="680" y1="80" y2="80"></line>
<line stroke="#f2dfd1" strokeDasharray="4" strokeWidth="1" x1="0" x2="680" y1="30" y2="30"></line>
{/*  Bars for 12 months  */}
{/*  T11/23  */}
<rect fill="#f2dfd1" height="35" rx="4" width="26" x="20" y="145"></rect>
{/*  T12/23  */}
<rect fill="#f2dfd1" height="45" rx="4" width="26" x="74" y="135"></rect>
{/*  T1/24  */}
<rect fill="#f2dfd1" height="55" rx="4" width="26" x="128" y="125"></rect>
{/*  T2/24  */}
<rect fill="#f2dfd1" height="50" rx="4" width="26" x="182" y="130"></rect>
{/*  T3/24  */}
<rect fill="#f2dfd1" height="65" rx="4" width="26" x="236" y="115"></rect>
{/*  T4/24  */}
<rect fill="#f2dfd1" height="75" rx="4" width="26" x="290" y="105"></rect>
{/*  T5/24 (Launch HotDrop Pulse)  */}
<rect fill="url(#primaryBarGrad)" height="95" rx="4" width="26" x="344" y="85"></rect>
{/*  T6/24  */}
<rect fill="url(#primaryBarGrad)" height="105" rx="4" width="26" x="398" y="75"></rect>
{/*  T7/24 (Launch Map Radar Pin)  */}
<rect fill="url(#primaryBarGrad)" height="125" rx="4" width="26" x="452" y="55"></rect>
{/*  T8/24  */}
<rect fill="url(#primaryBarGrad)" height="135" rx="4" width="26" x="506" y="45"></rect>
{/*  T9/24  */}
<rect fill="url(#primaryBarGrad)" height="142" rx="4" width="26" x="560" y="38"></rect>
{/*  T10/24 (Current)  */}
<rect fill="#b91d00" height="156" rx="4" width="26" x="614" y="24"></rect>
{/*  Target Trend Line  */}
<path d="M 33 150 L 87 140 L 141 130 L 195 125 L 249 110 L 303 98 L 357 80 L 411 68 L 465 50 L 519 40 L 573 32 L 627 20" fill="none" stroke="#fd9013" strokeDasharray="3 3" strokeWidth="2.5"></path>
{/*  Feature Launch Markers  */}
<circle cx="357" cy="85" fill="#fd9013" r="4" stroke="#ffffff" strokeWidth="2"></circle>
<circle cx="465" cy="55" fill="#de3618" r="4" stroke="#ffffff" strokeWidth="2"></circle>
</svg>
{/*  Timeline Month Labels  */}
<div className="flex justify-between text-center font-label-sm text-label-sm text-outline mt-1 px-1">
<span className="w-8">T11</span>
<span className="w-8">T12</span>
<span className="w-8">T1</span>
<span className="w-8">T2</span>
<span className="w-8">T3</span>
<span className="w-8">T4</span>
<span className="w-8 font-bold text-secondary-container">T5*</span>
<span className="w-8">T6</span>
<span className="w-8 font-bold text-primary">T7*</span>
<span className="w-8">T8</span>
<span className="w-8">T9</span>
<span className="w-8 font-bold text-on-surface bg-surface-container-high rounded px-1">T10</span>
</div>
</div>
</div>
<div className="mt-space-md pt-space-sm flex flex-wrap items-center justify-between gap-space-sm bg-surface-container-low p-space-sm rounded-xl">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary-container text-base">bolt</span>
<span className="font-body-sm text-body-sm text-on-surface"><strong>Mốc T5:</strong> Ra mắt HotDrop Flash Pulse (+34% tăng trưởng)</span>
</div>
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-base">pin_drop</span>
<span className="font-body-sm text-body-sm text-on-surface"><strong>Mốc T7:</strong> Ghim Độc Quyền Radar Bản Đồ (+52% tăng trưởng)</span>
</div>
</div>
</div>
{/*  Revenue Product Mix (Span 5)  */}
<div className="lg:col-span-5 rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-md">
<div>
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary-container text-lg">donut_large</span>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Cơ Cấu Nguồn Doanh Thu</h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Tỷ trọng đóng góp theo sản phẩm dịch vụ</p>
</div>
<span className="font-label-sm text-label-sm font-bold text-primary px-2 py-0.5 rounded-full bg-primary-fixed">
            4 Dòng Dịch Vụ
          </span>
</div>
{/*  Product Breakdown List  */}
<div className="space-y-space-md">
{/*  Item 1: Diamond VIP  */}
<div className="p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
<div className="flex items-center justify-between mb-1">
<div className="flex items-center gap-space-xs">
<span className="w-3 h-3 rounded-full bg-primary"></span>
<span className="font-title-md text-title-md text-on-surface font-bold">Gói VIP Kim Cương</span>
</div>
<div className="text-right">
<span className="font-headline-sm text-headline-sm text-primary font-bold">42%</span>
<span className="font-body-sm text-body-sm text-outline ml-1">(1.03 Tỷ đ)</span>
</div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant pl-4">
              Vị trí Top 1 tìm kiếm quận + Viền lửa hào quang + Banner ưu tiên
            </p>
<div className="w-full bg-surface-container-highest rounded-full h-1.5 mt-2 ml-4 overflow-hidden" style={{ width: "calc(100% - 1rem)" }}>
<div className="bg-primary h-full rounded-full" style={{ width: "42%" }}></div>
</div>
</div>
{/*  Item 2: Gold VIP  */}
<div className="p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
<div className="flex items-center justify-between mb-1">
<div className="flex items-center gap-space-xs">
<span className="w-3 h-3 rounded-full bg-secondary-container"></span>
<span className="font-title-md text-title-md text-on-surface font-bold">Gói VIP Vàng Bản Đồ</span>
</div>
<div className="text-right">
<span className="font-headline-sm text-headline-sm text-secondary-container font-bold">28%</span>
<span className="font-body-sm text-body-sm text-outline ml-1">(686 Triệu đ)</span>
</div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant pl-4">
              Biểu tượng Ghim nổi bật + Huy hiệu kiểm duyệt an toàn thực phẩm
            </p>
<div className="w-full bg-surface-container-highest rounded-full h-1.5 mt-2 ml-4 overflow-hidden" style={{ width: "calc(100% - 1rem)" }}>
<div className="bg-secondary-container h-full rounded-full" style={{ width: "28%" }}></div>
</div>
</div>
{/*  Item 3: HotDrop Flash Pulse  */}
<div className="p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
<div className="flex items-center justify-between mb-1">
<div className="flex items-center gap-space-xs">
<span className="w-3 h-3 rounded-full bg-tertiary"></span>
<span className="font-title-md text-title-md text-on-surface font-bold">HotDrop Flash Pulse</span>
</div>
<div className="text-right">
<span className="font-headline-sm text-headline-sm text-tertiary font-bold">18%</span>
<span className="font-body-sm text-body-sm text-outline ml-1">(441 Triệu đ)</span>
</div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant pl-4">
              Đẩy quán mục HOT giờ cao điểm (11h-13h &amp; 18h-21h) bùng nổ traffic
            </p>
<div className="w-full bg-surface-container-highest rounded-full h-1.5 mt-2 ml-4 overflow-hidden" style={{ width: "calc(100% - 1rem)" }}>
<div className="bg-tertiary h-full rounded-full" style={{ width: "18%" }}></div>
</div>
</div>
{/*  Item 4: Brand Radar Pin  */}
<div className="p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
<div className="flex items-center justify-between mb-1">
<div className="flex items-center gap-space-xs">
<span className="w-3 h-3 rounded-full bg-outline"></span>
<span className="font-title-md text-title-md text-on-surface font-bold">Ghim Thương Hiệu Radar Tùy Chỉnh</span>
</div>
<div className="text-right">
<span className="font-headline-sm text-headline-sm text-outline font-bold">12%</span>
<span className="font-body-sm text-body-sm text-outline ml-1">(294 Triệu đ)</span>
</div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant pl-4">
              Logo chuỗi chu vi 3km - 10km quanh thực khách đang di chuyển
            </p>
<div className="w-full bg-surface-container-highest rounded-full h-1.5 mt-2 ml-4 overflow-hidden" style={{ width: "calc(100% - 1rem)" }}>
<div className="bg-outline h-full rounded-full" style={{ width: "12%" }}></div>
</div>
</div>
</div>
</div>
<div className="mt-space-md pt-space-sm flex items-center justify-between font-label-md text-label-md text-on-surface-variant">
<span>Tổng giá trị danh mục:</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-bold">2.451.000.000 đ</span>
</div>
</div>
</div>
{/*  Section 4: Regional Analysis & AI Financial Recommendations  */}
<div className="grid grid-cols-1 xl:grid-cols-12 gap-space-md mb-space-xl">
{/*  Regional Analysis Table (Span 7)  */}
<div className="xl:col-span-7 rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
<div className="flex items-center justify-between mb-space-md">
<div>
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-lg">public</span>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Phân Tích Doanh Thu Theo Khu Vực &amp; Tỉnh Thành</h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Hiệu suất thương mại hóa ẩm thực theo địa bàn trọng điểm</p>
</div>
<span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface">
          4 Cụm Địa Bàn
        </span>
</div>
<div className="space-y-space-md">
{/*  Region 1: Ha Noi  */}
<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
<div className="flex-1">
<div className="flex items-center gap-space-xs">
<span className="font-title-md text-title-md text-on-surface font-bold">Hà Nội</span>
<span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm">47% Tổng Thu</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Hoàn Kiếm, Cầu Giấy, Tây Hồ, Ba Đình, Đống Đa
            </p>
</div>
<div className="flex items-center gap-space-lg">
<div>
<p className="font-label-sm text-label-sm text-outline">Số quán VIP</p>
<p className="font-title-md text-title-md text-on-surface font-bold">410 <span className="font-label-sm text-label-sm font-normal text-on-surface-variant">quán</span></p>
</div>
<div className="text-right">
<p className="font-label-sm text-label-sm text-outline">Doanh số</p>
<p className="font-headline-sm text-headline-sm text-primary font-bold">1.15 Tỷ đ</p>
</div>
</div>
</div>
{/*  Region 2: TP HCM  */}
<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
<div className="flex-1">
<div className="flex items-center gap-space-xs">
<span className="font-title-md text-title-md text-on-surface font-bold">TP. Hồ Chí Minh</span>
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">40% Tổng Thu</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Quận 1, Quận 3, Bình Thạnh, Thảo Điền, Phú Nhuận
            </p>
</div>
<div className="flex items-center gap-space-lg">
<div>
<p className="font-label-sm text-label-sm text-outline">Số quán VIP</p>
<p className="font-title-md text-title-md text-on-surface font-bold">365 <span className="font-label-sm text-label-sm font-normal text-on-surface-variant">quán</span></p>
</div>
<div className="text-right">
<p className="font-label-sm text-label-sm text-outline">Doanh số</p>
<p className="font-headline-sm text-headline-sm text-secondary font-bold">980 Triệu đ</p>
</div>
</div>
</div>
{/*  Region 3: Da Nang  */}
<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
<div className="flex-1">
<div className="flex items-center gap-space-xs">
<span className="font-title-md text-title-md text-on-surface font-bold">Đà Nẵng</span>
<span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">9% Tổng Thu</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Hải Châu, Sơn Trà, Ngũ Hành Sơn
            </p>
</div>
<div className="flex items-center gap-space-lg">
<div>
<p className="font-label-sm text-label-sm text-outline">Số quán VIP</p>
<p className="font-title-md text-title-md text-on-surface font-bold">82 <span className="font-label-sm text-label-sm font-normal text-on-surface-variant">quán</span></p>
</div>
<div className="text-right">
<p className="font-label-sm text-label-sm text-outline">Doanh số</p>
<p className="font-headline-sm text-headline-sm text-tertiary font-bold">220 Triệu đ</p>
</div>
</div>
</div>
{/*  Region 4: Other Cities  */}
<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
<div className="flex-1">
<div className="flex items-center gap-space-xs">
<span className="font-title-md text-title-md text-on-surface font-bold">Các Tỉnh Thành Khác</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm">4% Tổng Thu</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Cần Thơ, Hải Phòng, Nha Trang, Đà Lạt, Huế
            </p>
</div>
<div className="flex items-center gap-space-lg">
<div>
<p className="font-label-sm text-label-sm text-outline">Số quán VIP</p>
<p className="font-title-md text-title-md text-on-surface font-bold">35 <span className="font-label-sm text-label-sm font-normal text-on-surface-variant">quán</span></p>
</div>
<div className="text-right">
<p className="font-label-sm text-label-sm text-outline">Doanh số</p>
<p className="font-headline-sm text-headline-sm text-on-surface font-bold">100 Triệu đ</p>
</div>
</div>
</div>
</div>
</div>
{/*  AI Financial Engine Recommendations (Span 5)  */}
<div className="xl:col-span-5 rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-md">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-xl">psychology</span>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface">AI Financial Engine Insights</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Cảnh báo thu chi &amp; tối ưu giá thầu tự động</p>
</div>
</div>
<span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
            Live AI 4.5
          </span>
</div>
<div className="space-y-space-md">
{/*  Alert 1: Capacity Limit  */}
<div className="p-space-md rounded-xl bg-error-container/40 flex gap-space-sm">
<span className="material-symbols-outlined text-primary text-xl flex-shrink-0 mt-0.5">warning</span>
<div>
<div className="flex items-center gap-space-xs mb-1">
<span className="font-title-md text-title-md text-on-error-container font-bold">Cảnh Báo Trần Hiển Thị Ghim VIP</span>
<span className="px-1.5 py-0.2 rounded bg-primary text-on-primary font-label-sm text-label-sm">Khẩn Cấp</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface">
                Khu vực <strong>Phố Cổ &amp; Hoàn Kiếm (Hà Nội)</strong> đã đạt <strong>90% trần hiển thị</strong> ghim bản đồ. Nếu tiếp tục cấp phép sẽ giảm trải nghiệm người dùng tìm món.
              </p>
<div className="mt-space-sm flex items-center gap-space-xs">
<button className="px-space-sm py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm hover:bg-primary-container transition-colors shadow-sm">
                  Tăng Giá Thầu Giờ Vàng +15%
                </button>
<button className="px-space-sm py-1 rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors">
                  Giới Hạn Radar
                </button>
</div>
</div>
</div>
{/*  Alert 2: Growth Opportunity  */}
<div className="p-space-md rounded-xl bg-tertiary-fixed/30 flex gap-space-sm">
<span className="material-symbols-outlined text-tertiary text-xl flex-shrink-0 mt-0.5">lightbulb</span>
<div>
<div className="flex items-center gap-space-xs mb-1">
<span className="font-title-md text-title-md text-on-tertiary-fixed-variant font-bold">Cơ Hội Tăng Trưởng Du Lịch Đà Nẵng</span>
<span className="px-1.5 py-0.2 rounded bg-tertiary text-on-tertiary font-label-sm text-label-sm">Tiềm Năng</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface">
                Lượng tìm kiếm ẩm thực <strong>Đà Nẵng tăng 45%</strong> trong 14 ngày qua nhưng tỷ lệ chủ quán chuyển đổi lên VIP chỉ đạt <strong>4.8%</strong>.
              </p>
<div className="mt-space-sm flex items-center gap-space-xs">
<button className="px-space-sm py-1 rounded-full bg-tertiary text-on-tertiary font-label-sm text-label-sm hover:bg-tertiary-container transition-colors shadow-sm">
                  Kích Hoạt Gói Thử Nghiệm 14 Ngày
                </button>
<button className="px-space-sm py-1 rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors">
                  Gửi Push Notification
                </button>
</div>
</div>
</div>
{/*  Alert 3: Pricing Optimization  */}
<div className="p-space-md rounded-xl bg-secondary-fixed/40 flex gap-space-sm">
<span className="material-symbols-outlined text-secondary text-xl flex-shrink-0 mt-0.5">paid</span>
<div>
<div className="flex items-center gap-space-xs mb-1">
<span className="font-title-md text-title-md text-on-secondary-fixed-variant font-bold">Tối Ưu Gói HotDrop Khung Giờ 18h - 21h</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface">
                Khung giờ tối có tỷ lệ click đơn hàng đạt <strong>32.8%</strong>. Đề xuất mở thêm gói Flash Pulse 4 tiếng cuối tuần với giá 350.000 đ/lượt.
              </p>
</div>
</div>
</div>
</div>
<div className="pt-space-md mt-space-sm border-t border-surface-container flex items-center justify-between text-outline font-label-sm text-label-sm">
<span>Tự động cập nhật mô hình: <strong className="text-on-surface">00:00 mỗi ngày</strong></span>
<button className="text-primary hover:underline font-bold">Xem Nhật Ký AI (Logs)</button>
</div>
</div>
</div>
{/*  Section 5: Top Spending Merchants Leaderboard  */}
<div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
<div>
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-xl">hotel_class</span>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Top 5 Đối Tác Chi Tiêu Quảng Cáo Lớn Nhất Tháng</h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
          Danh sách quán ăn dẫn đầu ngân sách tài trợ ghim và chiến dịch hiển thị ưu tiên
        </p>
</div>
<button className="flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md">
<span>Xem toàn bộ 892 quán</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</button>
</div>
{/*  Merchant Cards Grid  */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-space-md">
{/*  Merchant 1  */}
<div className="rounded-xl bg-surface-container-low p-space-md flex flex-col justify-between hover:shadow-md transition-shadow relative">
<span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary text-on-primary font-label-sm text-label-sm flex items-center justify-center font-bold">
          #1
        </span>
<div>
<div className="flex items-center gap-space-sm mb-space-sm">
<img className="w-12 h-12 rounded-xl object-cover shadow-sm" data-alt="Warm culinary photo of Vietnamese freshwater crab hotpot with golden broth, steaming herbs, fried tofu, and fresh vermicelli in a traditional rustic copper pot, soft restaurant interior lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_95ICFv5KIDhhntnu2TtOZ-W64hIfGkjx_EfJ_WknM408bFbQfOaV8t6nPb8R_rY9MvZ4b7n3HlZAU4xUa9FzNfXPI5v84mwkcQHRyleXbqtWC1dn57ooxupn6_5yiVezawuOLFj6zCetuFXgrHks1YITHZQRU7noI2N-IhCdYl4FfXwQqtvA_WpCeCtDO7JPfyveVd03LNAk_i1yDWG3z-SYaM1ocCBFWYH8Lb8"/>
<div className="min-w-0 pr-6">
<h3 className="font-title-md text-title-md text-on-surface font-bold truncate">Lẩu Cua Đồng 68</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant truncate">Cầu Giấy, Hà Nội</p>
</div>
</div>
<div className="space-y-1 my-space-sm">
<div className="flex items-center justify-between font-label-sm text-label-sm">
<span className="text-outline">Gói đăng ký:</span>
<span className="font-bold text-primary">VIP Kim Cương Năm</span>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm">
<span className="text-outline">Tính năng:</span>
<span className="text-on-surface">Flash Ads Giờ Vàng</span>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm">
<span className="text-outline">Lượt click/tháng:</span>
<span className="text-tertiary font-bold">48.200 clicks</span>
</div>
</div>
</div>
<div className="pt-space-sm border-t border-surface-container">
<p className="font-label-sm text-label-sm text-outline">Tổng chi tiêu tháng:</p>
<p className="font-headline-sm text-headline-sm text-primary font-bold">48.500.000 đ</p>
</div>
</div>
{/*  Merchant 2  */}
<div className="rounded-xl bg-surface-container-low p-space-md flex flex-col justify-between hover:shadow-md transition-shadow relative">
<span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-secondary-container text-on-secondary font-label-sm text-label-sm flex items-center justify-center font-bold">
          #2
        </span>
<div>
<div className="flex items-center gap-space-sm mb-space-sm">
<img className="w-12 h-12 rounded-xl object-cover shadow-sm" data-alt="Artisanal Chinese dim sum banquet featuring steaming bamboo baskets with translucent shrimp dumplings, siu mai, and barbecue pork buns, warm golden ambient dining room lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyxzlM__DQqRXoapRBUIN8b_7zwzBdqItdyF3Axmih1Zd8sgu0S2dVwao8Y4tcoHQQSHBARqGvWmRazIZ9q9Hh6hx3gYLKRHumr8sNCIAJlrrJiN70OxEVAJZNk6HXvef4wtKZ99T_4XmRzm0slVlnSjxhX2ZmwMWdIAS5BAwVhVHRR5bvBedBvxsAFXMdEAvnuZI2hEfgVqoS6w3k0yfPGvNxye1WQ7CoYiXE0mE"/>
<div className="min-w-0 pr-6">
<h3 className="font-title-md text-title-md text-on-surface font-bold truncate">Dim Tu Tac Saigon</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant truncate">Quận 1, TP. Hồ Chí Minh</p>
</div>
</div>
<div className="space-y-1 my-space-sm">
<div className="flex items-center justify-between font-label-sm text-label-sm">
<span className="text-outline">Gói đăng ký:</span>
<span className="font-bold text-secondary-container">VIP Vàng Bản Đồ</span>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm">
<span className="text-outline">Tính năng:</span>
<span className="text-on-surface">Ghim Độc Quyền 5km</span>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm">
<span className="text-outline">Lượt click/tháng:</span>
<span className="text-tertiary font-bold">41.900 clicks</span>
</div>
</div>
</div>
<div className="pt-space-sm border-t border-surface-container">
<p className="font-label-sm text-label-sm text-outline">Tổng chi tiêu tháng:</p>
<p className="font-headline-sm text-headline-sm text-secondary font-bold">42.000.000 đ</p>
</div>
</div>
{/*  Merchant 3  */}
<div className="rounded-xl bg-surface-container-low p-space-md flex flex-col justify-between hover:shadow-md transition-shadow relative">
<span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm flex items-center justify-center font-bold">
          #3
        </span>
<div>
<div className="flex items-center gap-space-sm mb-space-sm">
<img className="w-12 h-12 rounded-xl object-cover shadow-sm" data-alt="Savory bowl of authentic Hue beef noodle soup bun bo hue with rich red chili oil broth, tender beef shank slices, crab meatball, and fresh lime, captured in appetizing gourmet warmth." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyeZgvYf2GyH8Ms-eOnF7-0NtqJt1JxWmYvoyl0SzvQxmbpdaWde8D0UCbSPAq3DBpkIwAq3ugIwPwdcNYT5hK6Tf-g3rWTI2CQdrTifVX62yGprfpaMKTJooucODoTS3I9WH1ponBX1iGNF2N87LQg8KYTHfn0QWpqOWYjJ0XhTcq3BkRM0ijooUascUKmjKCUdIaWvBhz7ZOC_Q_xlRAQC9Uzf35es-JGgAqmMY"/>
<div className="min-w-0 pr-6">
<h3 className="font-title-md text-title-md text-on-surface font-bold truncate">Bún Bò Huế O Mai</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant truncate">Cầu Giấy, Hà Nội</p>
</div>
</div>
<div className="space-y-1 my-space-sm">
<div className="flex items-center justify-between font-label-sm text-label-sm">
<span className="text-outline">Gói đăng ký:</span>
<span className="font-bold text-primary">VIP Kim Cương Tháng</span>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm">
<span className="text-outline">Tính năng:</span>
<span className="text-on-surface">Tài Trợ Tìm Kiếm</span>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm">
<span className="text-outline">Lượt click/tháng:</span>
<span className="text-tertiary font-bold">36.500 clicks</span>
</div>
</div>
</div>
<div className="pt-space-sm border-t border-surface-container">
<p className="font-label-sm text-label-sm text-outline">Tổng chi tiêu tháng:</p>
<p className="font-headline-sm text-headline-sm text-on-surface font-bold">35.500.000 đ</p>
</div>
</div>
{/*  Merchant 4  */}
<div className="rounded-xl bg-surface-container-low p-space-md flex flex-col justify-between hover:shadow-md transition-shadow relative">
<span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm flex items-center justify-center font-bold">
          #4
        </span>
<div>
<div className="flex items-center gap-space-sm mb-space-sm">
<img className="w-12 h-12 rounded-xl object-cover shadow-sm" data-alt="Traditional Hanoi culinary dish of grilled pork patties and spring rolls with rice noodles in sweet fish sauce broth, bun cha hanoi style, warm sunlit wooden tabletop." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVTUURVmXxy4fv4doBo0hThk-EVZSiJGZe3MmnZdX1TGN4wVmtaYdP4N-N017cRXEv8WWgJoU99W6nf_OlL4jW_8AmaIliwxCHMWwFiSxAkAK-RjleH25T-e5vk4ehsJgjx5W9q04np5kYigljPLLAUSwMUb3tkuO_agrw_R0In2oDscWmOX8AeRdUcElZqVeXWWGIqGLg1lMr8I4RbNURyxSq1hImrPBoMkI3sjM"/>
<div className="min-w-0 pr-6">
<h3 className="font-title-md text-title-md text-on-surface font-bold truncate">Bếp Trưởng Hà Nội</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant truncate">Hoàn Kiếm, Hà Nội</p>
</div>
</div>
<div className="space-y-1 my-space-sm">
<div className="flex items-center justify-between font-label-sm text-label-sm">
<span className="text-outline">Gói đăng ký:</span>
<span className="font-bold text-secondary-container">VIP Vàng Bản Đồ</span>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm">
<span className="text-outline">Tính năng:</span>
<span className="text-on-surface">Pulse Giờ Ăn Trưa</span>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm">
<span className="text-outline">Lượt click/tháng:</span>
<span className="text-tertiary font-bold">29.100 clicks</span>
</div>
</div>
</div>
<div className="pt-space-sm border-t border-surface-container">
<p className="font-label-sm text-label-sm text-outline">Tổng chi tiêu tháng:</p>
<p className="font-headline-sm text-headline-sm text-on-surface font-bold">29.000.000 đ</p>
</div>
</div>
{/*  Merchant 5  */}
<div className="rounded-xl bg-surface-container-low p-space-md flex flex-col justify-between hover:shadow-md transition-shadow relative">
<span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm flex items-center justify-center font-bold">
          #5
        </span>
<div>
<div className="flex items-center gap-space-sm mb-space-sm">
<img className="w-12 h-12 rounded-xl object-cover shadow-sm" data-alt="Velvety Hanoi egg coffee in a small ceramic cup resting in warm water bath, thick frothy custard foam top, deep roasted coffee aromas, moody vintage aesthetic cafe ambience." src="https://lh3.googleusercontent.com/aida-public/AB6AXuChTpWNThrr_un9KifjGRCAfGXIHQhDoeJHnJO-cdCqdiGrcMbG1D7aQjxZF4lQbSXpBZDFjgAT-NDIuIyry2-elOCUZdEI1VkoAp6uqunGPtn5eI-Sr4QolqQ1YHjwS_xd8U1IPH7z9gkq2lrFky9SyJTuD7CfyILMpbIK0P0Hy-bu9ehmxo3ViJ3mCozUXncl-K6JIx-FnH4NXGjCnwvnYPtHGcWGjHL8AgvVP6E"/>
<div className="min-w-0 pr-6">
<h3 className="font-title-md text-title-md text-on-surface font-bold truncate">Cà Phê Trứng Giảng</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant truncate">Ba Đình, Hà Nội</p>
</div>
</div>
<div className="space-y-1 my-space-sm">
<div className="flex items-center justify-between font-label-sm text-label-sm">
<span className="text-outline">Gói đăng ký:</span>
<span className="font-bold text-secondary-container">VIP Vàng Bản Đồ</span>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm">
<span className="text-outline">Tính năng:</span>
<span className="text-on-surface">Ghim Di Tích Ẩm Thực</span>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm">
<span className="text-outline">Lượt click/tháng:</span>
<span className="text-tertiary font-bold">26.300 clicks</span>
</div>
</div>
</div>
<div className="pt-space-sm border-t border-surface-container">
<p className="font-label-sm text-label-sm text-outline">Tổng chi tiêu tháng:</p>
<p className="font-headline-sm text-headline-sm text-on-surface font-bold">24.500.000 đ</p>
</div>
</div>
</div>
</div>
</div></main>
    </div>
  );
}
