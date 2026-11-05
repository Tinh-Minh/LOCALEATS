import { useState } from "react";

/**
 * AdminLiveMapTab
 * Super Admin Screen: Bản Đồ GPS Live Fleet & Realtime Heatmap
 * Auto-generated from Google Stitch design with full length fidelity.
 */
export default function AdminLiveMapTab({ onNavigateTab }) {
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeRegion, setActiveRegion] = useState("hn");

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
      <main className="relative pt-18 bg-surface min-h-screen"><div className="flex flex-col w-full">
{/*  Sub-header Breadcrumb & Realtime Ribbon  */}
<div className="px-3 sm:px-6 lg:px-8 pt-6 pb-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-extrabold flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
          Telemetry Vĩ Mô Cấp Quốc Gia
        </span>
<span className="text-outline-variant font-label-sm">/</span>
<span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Mesh Network Layer v4.8</span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1 flex items-center gap-3">
        Bản Đồ GPS Live Fleet &amp; Heatmap ẩm thực
        <span className="px-3 py-1 rounded-full bg-tertiary/10 text-tertiary font-label-sm text-label-sm font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-sm">wifi_tethering</span>
          WS: 485,210 Sockets Connected
        </span>
</h1>
</div>
{/*  Quick Macro Switchers  */}
<div className="flex items-center gap-2.5 flex-wrap">
<div className="bg-surface-container-high rounded-full p-1 flex items-center shadow-sm">
<button className="px-4 py-2 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm font-bold flex items-center gap-1.5 shadow-md hover:brightness-110 transition-all active:scale-95" id="btn-refresh-radar" type="button">
<span className="material-symbols-outlined text-base animate-spin" id="radar-spin-icon">radar</span>
          Quét Radar Live (5s)
        </button>
<button className="px-4 py-2 rounded-full text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm font-bold flex items-center gap-1.5 transition-all" id="btn-shield-toggle" type="button">
<span className="material-symbols-outlined text-base text-secondary">security</span>
          Shield Mode Khu Vực
        </button>
</div>
<div className="bg-surface-container rounded-full px-3 py-1.5 flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm shadow-sm">
<span className="material-symbols-outlined text-sm text-primary">speed</span>
<span className="font-semibold text-on-surface">Tần số:</span>
<div className="flex items-center gap-1 font-bold">
<span className="cursor-pointer px-2 py-0.5 rounded-full bg-primary text-white">100ms</span>
<span className="cursor-pointer px-2 py-0.5 rounded-full hover:bg-surface-container-highest transition-colors">500ms</span>
<span className="cursor-pointer px-2 py-0.5 rounded-full hover:bg-surface-container-highest transition-colors">1s</span>
</div>
</div>
</div>
</div>
{/*  Primary Top Interactive Toolbar (Filter, Projections, Layer Toggles)  */}
<div className="px-3 sm:px-6 lg:px-8 pb-4">
<div className="bg-surface-container-lowest rounded-3xl p-4 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
{/*  Geographic Focus Chips  */}
<div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold tracking-wider shrink-0 mr-1 flex items-center gap-1">
<span className="material-symbols-outlined text-sm">explore</span>
          Vùng:
        </span>
<button
  onClick={() => setActiveRegion("all")}
  className={`px-4 py-2 rounded-full font-label-md text-label-md shrink-0 shadow-sm flex items-center gap-1.5 transition-all ${
    activeRegion === "all" ? "bg-primary text-white font-bold" : "bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold"
  }`}
  type="button"
>
  <span className="">Toàn Quốc</span>
  {activeRegion === "all" && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
</button>
<button
  onClick={() => setActiveRegion("hn")}
  className={`px-4 py-2 rounded-full font-label-md text-label-md shrink-0 transition-all flex items-center gap-1.5 ${
    activeRegion === "hn" ? "bg-primary text-white font-bold shadow-sm" : "bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold"
  }`}
  type="button"
>
  <span className="">Hà Nội (Hoàn Kiếm &amp; Tây Hồ)</span>
  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${activeRegion === "hn" ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}`}>4.2K</span>
</button>
<button
  onClick={() => setActiveRegion("hcm")}
  className={`px-4 py-2 rounded-full font-label-md text-label-md shrink-0 transition-all flex items-center gap-1.5 ${
    activeRegion === "hcm" ? "bg-primary text-white font-bold shadow-sm" : "bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold"
  }`}
  type="button"
>
  <span className="">TP.HCM (Q1, Q3, Thảo Điền)</span>
  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${activeRegion === "hcm" ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}`}>5.8K</span>
</button>
<button
  onClick={() => setActiveRegion("dn")}
  className={`px-4 py-2 rounded-full font-label-md text-label-md shrink-0 transition-all flex items-center gap-1.5 ${
    activeRegion === "dn" ? "bg-primary text-white font-bold shadow-sm" : "bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold"
  }`}
  type="button"
>
  <span>Đà Nẵng &amp; Hội An</span>
  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${activeRegion === "dn" ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}`}>2.1K</span>
</button>
<button className="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold shrink-0 transition-all" type="button">
          Cần Thơ
        </button>
<button className="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold shrink-0 transition-all" type="button">
          Hải Phòng
        </button>
</div>
{/*  View Style & Projection Filters  */}
<div className="flex items-center gap-2 self-end lg:self-auto shrink-0">
<div className="bg-surface-container p-1 rounded-2xl flex items-center gap-1 shadow-inner">
<button className="px-3 py-1.5 rounded-xl bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-bold shadow-xs flex items-center gap-1.5" type="button">
<span className="material-symbols-outlined text-base text-primary">local_fire_department</span>
            Lớp Nhiệt Ẩm Thực
          </button>
<button className="px-3 py-1.5 rounded-xl text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-1.5 transition-colors" type="button">
<span className="material-symbols-outlined text-base">directions_bike</span>
            Vector Luồng Khách
          </button>
<button className="px-3 py-1.5 rounded-xl text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-1.5 transition-colors" type="button">
<span className="material-symbols-outlined text-base">layers</span>
            Vệ Tinh 3D
          </button>
</div>
<button className="w-10 h-10 rounded-2xl bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-all shadow-sm" title="Lọc hiển thị nâng cao" type="button">
<span className="material-symbols-outlined text-xl">tune</span>
</button>
</div>
</div>
</div>
{/*  KPI Metrics Ribbon (Top Bar)  */}
<div className="px-3 sm:px-6 lg:px-8 pb-5">
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
{/*  Metric 1  */}
<div className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
<div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-primary/5 pointer-events-none"></div>
<div className="flex items-center justify-between">
<div className="flex items-center gap-2.5">
<div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
<span className="material-symbols-outlined text-xl">storefront</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">Tổng Node Merchant GPS</span>
<div className="font-headline-md text-headline-md text-on-surface font-extrabold mt-0.5">12,840 <span className="font-label-sm text-xs font-semibold text-tertiary">/ 12,840</span></div>
</div>
</div>
<span className="px-2 py-1 rounded-full bg-tertiary/10 text-tertiary font-label-sm text-[11px] font-bold">100% Online</span>
</div>
<div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
<span className="flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            1,410 Điểm VIP Gold &amp; Diamond
          </span>
<span className="text-primary font-bold">SLA 99.998%</span>
</div>
</div>
{/*  Metric 2  */}
<div className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
<div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-secondary/5 pointer-events-none"></div>
<div className="flex items-center justify-between">
<div className="flex items-center gap-2.5">
<div className="w-10 h-10 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center">
<span className="material-symbols-outlined text-xl">directions_walk</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">Lưu Lượng Thực Khách Live</span>
<div className="font-headline-md text-headline-md text-on-surface font-extrabold mt-0.5">42,680 <span className="font-label-sm text-xs text-secondary font-semibold">Active Di Chuyển</span></div>
</div>
</div>
<span className="px-2 py-1 rounded-full bg-secondary-container/20 text-on-secondary-container font-label-sm text-[11px] font-bold flex items-center gap-0.5">
<span className="material-symbols-outlined text-xs">north</span> +18.4%
          </span>
</div>
<div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
<span className="">Khung giờ cao điểm: <strong className="text-on-surface">11:30 - 13:45</strong></span>
<span className="text-secondary font-bold">485.2K cài app</span>
</div>
</div>
{/*  Metric 3  */}
<div className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
<div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-error/5 pointer-events-none"></div>
<div className="flex items-center justify-between">
<div className="flex items-center gap-2.5">
<div className="w-10 h-10 rounded-2xl bg-error/10 text-error flex items-center justify-center">
<span className="material-symbols-outlined text-xl">whatshot</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">Cụm Quá Tải Heatmap</span>
<div className="font-headline-md text-headline-md text-error font-extrabold mt-0.5">4 Điểm Nóng <span className="font-label-sm text-xs font-semibold text-on-surface-variant">Cực Đại</span></div>
</div>
</div>
<span className="px-2.5 py-1 rounded-full bg-error text-white font-label-sm text-[11px] font-extrabold animate-pulse">Level 3</span>
</div>
<div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
<span className="truncate">Mã Mây, Bùi Viện, Sơn Trà, Thảo Điền</span>
<span className="text-error font-bold text-xs shrink-0">&gt;300% TB</span>
</div>
</div>
{/*  Metric 4  */}
<div className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
<div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-tertiary/5 pointer-events-none"></div>
<div className="flex items-center justify-between">
<div className="flex items-center gap-2.5">
<div className="w-10 h-10 rounded-2xl bg-tertiary/10 text-tertiary flex items-center justify-center">
<span className="material-symbols-outlined text-xl">network_ping</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">Độ Trễ GPS / Ping Telemetry</span>
<div className="font-headline-md text-headline-md text-tertiary font-extrabold mt-0.5">14.8 ms <span className="font-label-sm text-xs font-semibold text-on-surface-variant">(Mean)</span></div>
</div>
</div>
<span className="px-2 py-1 rounded-full bg-tertiary/10 text-tertiary font-label-sm text-[11px] font-bold">Băng thông 1.2 GB/s</span>
</div>
<div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
<span className="">Edge Clusters: <strong className="text-on-surface">3/3 Nodes Xanh</strong></span>
<span className="text-tertiary font-bold">0.00% Packet Loss</span>
</div>
</div>
</div>
</div>
{/*  Main Canvas & Dispatch Layout Split (12-Column Grid)  */}
<div className="px-3 sm:px-6 lg:px-8 pb-10 grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
{/*  Hero Interactive GPS Fleet Canvas (Span 8.5 Col)  */}
<div className="xl:col-span-8 flex flex-col gap-4">
<div className="relative bg-surface-container-lowest rounded-3xl shadow-md overflow-hidden h-[420px] sm:h-[560px] xl:h-[740px] flex flex-col">
{/*  Live Map Canvas Layer (Dynamic Region-aware & Anchored GPS Pins - No Bouncing/Jumping)  */}
<div className="absolute inset-0 w-full h-full bg-cover bg-center overflow-hidden transition-all duration-500" data-location={activeRegion === "hn" ? "Hanoi, Vietnam" : activeRegion === "hcm" ? "Ho Chi Minh City, Vietnam" : activeRegion === "dn" ? "Da Nang, Vietnam" : "Vietnam National Map"} style={{ backgroundImage: activeRegion === "hn" ? "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDBPjHfiavlMhMb0i4qQO_tNAus_Nv_8IjuJXeZ57Hd99-jMSvrXksN0c5R16RvaKiJ04KaTsES0wBioQPsrAZG9f3r2PxWeck-Z0he6WGgt3RaC9C2O_6oATwcDRS6kev2vnr0r82tBzAMR20_shb1Og8wVThKFjIN1jpm0y3gal05X8liwWy0TdZsxH6hl150feTWyfAB_2ZNh5y7gRGseIIyzCrQjgasGtwiIu0')" : "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBcP_MxNcCTTG_bTAAVR6_LUD6942ooHKAAzEqcumko-1LEhCccXMkajj65jFBGohGkN0TUWvrkyNDMfEd6nTRnEOETPyACB_PXmTClqS3V2X3Y2fnXioDDRfIgnqSNa2UChFciqzxUGhK3_-6byOX3zK1AMtuzGfuEvkvKOWNXxfJ1wARO78i4wcyrshwBcUvW_XJVDU5sAXNs7zpc1148WoskS279apNnDmuU_aQ')" }}>
{/*  Heatmap Gradient Luminous Ambient Glows  */}
<div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-surface/30 to-transparent pointer-events-none"></div>

{/*  SVG Navigation Flow Polylines - Anchored GPS Lines (No jumping dots)  */}
<svg className="absolute inset-0 w-full h-full pointer-events-none z-10" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="warmPoly1" x1="0%" x2="100%" y1="0%" y2="100%">
<stop offset="0%" stopColor="#fd9013" stopOpacity="0.8"></stop>
<stop offset="100%" stopColor="#de3618" stopOpacity="0.95"></stop>
</linearGradient>
<linearGradient id="warmPoly2" x1="100%" x2="0%" y1="0%" y2="100%">
<stop offset="0%" stopColor="#2c694e" stopOpacity="0.7"></stop>
<stop offset="100%" stopColor="#fd9013" stopOpacity="0.9"></stop>
</linearGradient>
</defs>
<path d="M 220,520 Q 340,430 460,320 T 560,260" fill="none" stroke="url(#warmPoly1)" strokeDasharray="8 6" strokeLinecap="round" strokeWidth="3.5"></path>
<path d="M 180,260 C 280,310 390,290 560,260" fill="none" stroke="url(#warmPoly1)" strokeDasharray="6 6" strokeLinecap="round" strokeWidth="3"></path>
<path d="M 720,440 Q 640,340 560,260" fill="none" stroke="url(#warmPoly2)" strokeDasharray="10 6" strokeLinecap="round" strokeWidth="3"></path>
{/* Fixed stationary telemetry dots */}
<circle cx="360" cy="410" fill="#de3618" r="4.5"></circle>
<circle cx="500" cy="290" fill="#fd9013" r="4"></circle>
<circle cx="280" cy="290" fill="#de3618" r="3.5"></circle>
<circle cx="660" cy="370" fill="#2c694e" r="4"></circle>
</svg>

{/*  DYNAMIC HOTSPOT PINS & CLUSTERS PER REGION  */}
{activeRegion === "hn" && (
  <>
    {/* Hanoi Node 1 */}
    <div className="absolute top-[34%] left-[52%] z-20 -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
      <div className="w-14 h-14 rounded-full bg-primary/20 absolute -inset-2 border border-primary/40"></div>
      <div className="relative w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-xl border-2 border-white transform group-hover:scale-110 transition-transform">
        <span className="material-symbols-outlined text-xl">ramen_dining</span>
        <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-white text-primary font-label-sm text-[9px] font-extrabold shadow-xs">34</span>
      </div>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-80 bg-surface-container-lowest/98 backdrop-blur-xl p-4 rounded-3xl shadow-2xl border border-primary/20 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all transform origin-bottom z-30">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-extrabold uppercase">Hotspot Cực Đại</span>
            <h2 className="font-title-md text-title-md text-on-surface mt-1 leading-snug">Lẩu Cua Đồng Mã Mây</h2>
            <span className="text-on-surface-variant text-[12px]">44 Mã Mây, Hàng Buồm, Hoàn Kiếm</span>
          </div>
          <div className="w-9 h-9 rounded-2xl bg-secondary-fixed/50 text-secondary flex items-center justify-center font-bold text-xs">4.9★</div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 bg-surface-container-low p-2.5 rounded-2xl text-xs">
          <div><span className="text-[10px] text-on-surface-variant uppercase font-bold">Khách Đang Tới</span><div className="font-extrabold text-primary">34 Khách</div></div>
          <div><span className="text-[10px] text-on-surface-variant uppercase font-bold">ETA Trung Bình</span><div className="font-bold text-tertiary">4 - 8 Phút</div></div>
        </div>
      </div>
    </div>

    {/* Hanoi Node 2 */}
    <div className="absolute top-[56%] left-[38%] z-20 -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
      <div className="relative w-9 h-9 rounded-2xl bg-[#FD9013] text-white flex items-center justify-center shadow-lg border-2 border-white transform group-hover:scale-110 transition-transform">
        <span className="material-symbols-outlined text-lg">soup_kitchen</span>
        <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-white text-[#FD9013] text-[9px] font-bold">28</span>
      </div>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-surface-container-lowest p-3 rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-30">
        <div className="font-bold text-sm text-on-surface">Phở Thìn Bờ Hồ</div>
        <div className="text-on-surface-variant text-[11px]">61 Đinh Tiên Hoàng • 28 khách đang tới</div>
      </div>
    </div>

    {/* Hanoi Clusters */}
    <div className="absolute top-[48%] left-[40%] z-15"><div className="px-3 py-1.5 rounded-full bg-white/95 shadow-md text-on-surface text-xs font-bold flex items-center gap-1.5 border border-[#F2DFD1]"><span className="w-2.5 h-2.5 rounded-full bg-primary"></span>Cụm Hàng Buồm • 148 Quán</div></div>
    <div className="absolute top-[22%] left-[34%] z-15"><div className="px-3 py-1.5 rounded-full bg-white/95 shadow-md text-on-surface text-xs font-bold flex items-center gap-1.5 border border-[#F2DFD1]"><span className="w-2.5 h-2.5 rounded-full bg-[#FD9013]"></span>Cụm Tây Hồ • 86 Quán</div></div>
    <div className="absolute bottom-[35%] right-[22%] z-15"><div className="px-3 py-1.5 rounded-full bg-white/95 shadow-md text-on-surface text-xs font-bold flex items-center gap-1.5 border border-[#F2DFD1]"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>Cụm Tạ Hiện • 214 Quán Nightlife</div></div>
  </>
)}

{activeRegion === "hcm" && (
  <>
    {/* HCM Node 1 */}
    <div className="absolute top-[36%] left-[46%] z-20 -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
      <div className="w-14 h-14 rounded-full bg-primary/20 absolute -inset-2 border border-primary/40"></div>
      <div className="relative w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-xl border-2 border-white transform group-hover:scale-110 transition-transform">
        <span className="material-symbols-outlined text-xl">skillet</span>
        <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-white text-primary text-[9px] font-extrabold shadow-xs">52</span>
      </div>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-80 bg-surface-container-lowest/98 backdrop-blur-xl p-4 rounded-3xl shadow-2xl border border-primary/20 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-30">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-extrabold uppercase">Hotspot Sài Gòn</span>
            <h2 className="font-title-md text-title-md text-on-surface mt-1 leading-snug">Cơm Tấm Ba Ghiền</h2>
            <span className="text-on-surface-variant text-[12px]">84 Đặng Văn Ngữ, Phú Nhuận</span>
          </div>
          <div className="w-9 h-9 rounded-2xl bg-secondary-fixed/50 text-secondary flex items-center justify-center font-bold text-xs">4.8★</div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 bg-surface-container-low p-2.5 rounded-2xl text-xs">
          <div><span className="text-[10px] text-on-surface-variant uppercase font-bold">Khách Đang Tới</span><div className="font-extrabold text-primary">52 Khách</div></div>
          <div><span className="text-[10px] text-on-surface-variant uppercase font-bold">ETA Trung Bình</span><div className="font-bold text-tertiary">6 - 10 Phút</div></div>
        </div>
      </div>
    </div>

    {/* HCM Node 2 */}
    <div className="absolute top-[58%] left-[54%] z-20 -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
      <div className="relative w-9 h-9 rounded-2xl bg-[#FD9013] text-white flex items-center justify-center shadow-lg border-2 border-white transform group-hover:scale-110 transition-transform">
        <span className="material-symbols-outlined text-lg">bakery_dining</span>
        <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-white text-[#FD9013] text-[9px] font-bold">64</span>
      </div>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-surface-container-lowest p-3 rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-30">
        <div className="font-bold text-sm text-on-surface">Bánh Mì Huỳnh Hoa</div>
        <div className="text-on-surface-variant text-[11px]">26 Lê Thị Riêng, Quận 1 • 64 khách đang xếp hàng</div>
      </div>
    </div>

    {/* HCM Clusters */}
    <div className="absolute top-[48%] left-[40%] z-15"><div className="px-3 py-1.5 rounded-full bg-white/95 shadow-md text-on-surface text-xs font-bold flex items-center gap-1.5 border border-[#F2DFD1]"><span className="w-2.5 h-2.5 rounded-full bg-primary"></span>Cụm Bến Thành Q1 • 182 Quán</div></div>
    <div className="absolute top-[22%] left-[64%] z-15"><div className="px-3 py-1.5 rounded-full bg-white/95 shadow-md text-on-surface text-xs font-bold flex items-center gap-1.5 border border-[#F2DFD1]"><span className="w-2.5 h-2.5 rounded-full bg-[#FD9013]"></span>Cụm Thảo Điền Q2 • 94 Quán</div></div>
    <div className="absolute bottom-[28%] left-[26%] z-15"><div className="px-3 py-1.5 rounded-full bg-white/95 shadow-md text-on-surface text-xs font-bold flex items-center gap-1.5 border border-[#F2DFD1]"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>Cụm Chợ Lớn Q5 • 195 Quán</div></div>
  </>
)}

{activeRegion === "dn" && (
  <>
    {/* Da Nang Node 1 */}
    <div className="absolute top-[38%] left-[50%] z-20 -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
      <div className="w-14 h-14 rounded-full bg-primary/20 absolute -inset-2 border border-primary/40"></div>
      <div className="relative w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-xl border-2 border-white transform group-hover:scale-110 transition-transform">
        <span className="material-symbols-outlined text-xl">ramen_dining</span>
        <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-white text-primary text-[9px] font-extrabold shadow-xs">31</span>
      </div>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-80 bg-surface-container-lowest/98 backdrop-blur-xl p-4 rounded-3xl shadow-2xl border border-primary/20 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-30">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-extrabold uppercase">Đặc Sản Đà Nẵng</span>
            <h2 className="font-title-md text-title-md text-on-surface mt-1 leading-snug">Mì Quảng Bà Mua</h2>
            <span className="text-on-surface-variant text-[12px]">19 Trần Bình Trọng, Q. Hải Châu</span>
          </div>
          <div className="w-9 h-9 rounded-2xl bg-secondary-fixed/50 text-secondary flex items-center justify-center font-bold text-xs">4.9★</div>
        </div>
      </div>
    </div>

    {/* Da Nang Clusters */}
    <div className="absolute top-[46%] left-[44%] z-15"><div className="px-3 py-1.5 rounded-full bg-white/95 shadow-md text-on-surface text-xs font-bold flex items-center gap-1.5 border border-[#F2DFD1]"><span className="w-2.5 h-2.5 rounded-full bg-primary"></span>Cụm Cầu Rồng • 128 Quán</div></div>
    <div className="absolute top-[30%] left-[72%] z-15"><div className="px-3 py-1.5 rounded-full bg-white/95 shadow-md text-on-surface text-xs font-bold flex items-center gap-1.5 border border-[#F2DFD1]"><span className="w-2.5 h-2.5 rounded-full bg-[#FD9013]"></span>Cụm Biển Mỹ Khê • 98 Quán</div></div>
  </>
)}

{activeRegion === "all" && (
  <>
    <div className="absolute top-[26%] left-[48%] z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
      <div className="w-10 h-10 rounded-2xl bg-[#DE3618] text-white flex items-center justify-center shadow-xl border-2 border-white"><span className="material-symbols-outlined text-xl">hub</span></div>
      <div className="mt-1 px-3 py-1 rounded-xl bg-white/95 shadow-md text-xs font-extrabold text-[#DE3618] border border-[#F2DFD1]">Miền Bắc: 4,280 Quán (142K Khách)</div>
    </div>
    <div className="absolute top-[50%] left-[55%] z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
      <div className="w-10 h-10 rounded-2xl bg-[#FD9013] text-white flex items-center justify-center shadow-xl border-2 border-white"><span className="material-symbols-outlined text-xl">hub</span></div>
      <div className="mt-1 px-3 py-1 rounded-xl bg-white/95 shadow-md text-xs font-extrabold text-[#FD9013] border border-[#F2DFD1]">Miền Trung: 2,840 Quán (88K Khách)</div>
    </div>
    <div className="absolute top-[72%] left-[44%] z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
      <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xl border-2 border-white"><span className="material-symbols-outlined text-xl">hub</span></div>
      <div className="mt-1 px-3 py-1 rounded-xl bg-white/95 shadow-md text-xs font-extrabold text-emerald-800 border border-[#F2DFD1]">Miền Nam: 5,720 Quán (255K Khách)</div>
    </div>
  </>
)}
</div>
{/*  Overlaid Map Telemetry HUD (Bottom Float)  */}
<div className="absolute bottom-4 left-4 right-4 z-30 flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-none">
{/*  Left Heatmap Legend  */}
<div className="bg-surface-container-lowest/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-md pointer-events-auto flex items-center gap-3">
<span className="font-label-sm text-[11px] uppercase font-bold text-on-surface-variant">Mật độ nhiệt:</span>
<div className="flex items-center gap-1.5">
<span className="font-label-sm text-[10px] text-on-surface-variant font-medium">Bình Thường</span>
<div className="w-28 h-2.5 rounded-full bg-gradient-to-r from-surface-container via-secondary-container to-primary"></div>
<span className="font-label-sm text-[10px] text-primary font-black">Cực Đại (&gt;300%)</span>
</div>
</div>
{/*  Right Floating Controls  */}
<div className="bg-surface-container-lowest/90 backdrop-blur-md p-1.5 rounded-2xl shadow-md pointer-events-auto flex items-center gap-1">
<button className="w-8 h-8 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center font-bold text-sm transition-colors" title="Zoom In" type="button">+</button>
<button className="w-8 h-8 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center font-bold text-sm transition-colors" title="Zoom Out" type="button">-</button>
<div className="w-px h-4 bg-outline-variant mx-1"></div>
<button className="px-2.5 py-1 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-xs font-semibold flex items-center gap-1 transition-colors" type="button">
<span className="material-symbols-outlined text-sm">my_location</span>
              Tâm Điểm
            </button>
</div>
</div>
{/*  Upper Map Live Node Pill  */}
<div className="absolute top-4 left-4 z-30 pointer-events-none">
<div className="bg-surface-container-lowest/90 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-sm pointer-events-auto flex items-center gap-2.5">
<span className="material-symbols-outlined text-primary text-lg">satellite_alt</span>
<div className="flex flex-col">
<span className="font-label-sm text-xs font-bold text-on-surface">Toạ Độ Vùng: 21.0333° N, 105.8500° E</span>
<span className="text-[10px] font-label-sm text-on-surface-variant">Hoàn Kiếm Center Grid • Bán Kính 3.5km</span>
</div>
</div>
</div>
</div>
{/*  Live GPS Feed Data Stream Strip  */}
<div className="bg-surface-container-lowest rounded-3xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-base">stream</span>
</div>
<div className="text-body-sm text-on-surface-variant flex items-center gap-2">
<span className="font-bold text-on-surface font-label-sm text-xs uppercase">Dòng Lệnh GPS Mới Nhất:</span>
<span className="font-mono text-xs bg-surface-container px-2 py-0.5 rounded text-on-surface">[NODE_#9124] Ping: 12ms → (21.0321, 105.8491) - 48 thiết bị mới kết nối qua WiFi Geo-fencing</span>
</div>
</div>
<div className="flex items-center gap-2 shrink-0">
<span className="px-2.5 py-1 rounded-full bg-surface-container font-label-sm text-[11px] text-on-surface-variant font-semibold">Tải GPS Socket: 3.4k msg/giây</span>
</div>
</div>
</div>
{/*  Cluster Dispatch & Anomaly Panel (Span 3.5 Col)  */}
<div className="xl:col-span-4 flex flex-col gap-6">
{/*  Dynamic Pin Throttle Card  */}
<div className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm flex flex-col gap-4">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="w-9 h-9 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
<span className="material-symbols-outlined text-xl">auto_fix_high</span>
</div>
<div>
<h2 className="font-title-md text-title-md text-on-surface font-bold">Dynamic Pin Throttle</h2>
<span className="font-label-sm text-[11px] text-on-surface-variant">Giãn cách ghim chống nghẽn thị giác</span>
</div>
</div>
<span className="px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary font-label-sm text-[11px] font-bold">Auto ON</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
          Thuật toán tự động gom ghim (clustering) và giảm 40% mật độ badge quảng cáo phụ khi phát hiện lưu lượng &gt;5,000 khách/km² để ưu tiên tuyến đi thông thoáng.
        </p>
<div className="space-y-3 pt-2">
<div>
<div className="flex items-center justify-between font-label-sm text-xs font-bold mb-1">
<span className="text-on-surface">Ngưỡng nén ghim POI</span>
<span className="text-primary font-bold">78% (Đang hoạt động)</span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
<div className="h-full bg-primary-container rounded-full" style={{ width: "78%" }}></div>
</div>
</div>
<div className="flex items-center justify-between pt-1">
<span className="font-label-sm text-xs text-on-surface-variant">Độ trễ render Canvas</span>
<span className="font-label-sm text-xs font-bold text-tertiary">3.2ms (GPU WebGL 60fps)</span>
</div>
</div>
<button className="w-full py-2.5 rounded-2xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm font-bold flex items-center justify-center gap-1.5 transition-colors" type="button">
<span className="material-symbols-outlined text-base">tune</span>
          Cấu Hình Hệ Số Phân Rã Bán Kính
        </button>
</div>
{/*  Traffic Modality Distribution Breakdown (Visual Richness Inline SVG)  */}
<div className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm flex flex-col gap-4">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="w-9 h-9 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
<span className="material-symbols-outlined text-xl">commute</span>
</div>
<div>
<h2 className="font-title-md text-title-md text-on-surface font-bold">Phương Tiện Thực Khách</h2>
<span className="font-label-sm text-[11px] text-on-surface-variant">Nhận diện qua tốc độ GPS Sensor</span>
</div>
</div>
<span className="font-label-sm text-xs font-extrabold text-on-surface">42,680 Live</span>
</div>
{/*  Donut / Bar Visual Stack  */}
<div className="grid grid-cols-3 gap-2 text-center pt-1">
{/*  Motobike  */}
<div className="bg-surface-container-low p-3 rounded-2xl flex flex-col items-center">
<span className="material-symbols-outlined text-primary text-xl mb-1">two_wheeler</span>
<span className="font-headline-sm text-headline-sm text-primary font-black">68.4%</span>
<span className="font-label-sm text-[11px] text-on-surface-variant font-semibold">Xe Máy (29.2K)</span>
</div>
{/*  Walking  */}
<div className="bg-surface-container-low p-3 rounded-2xl flex flex-col items-center">
<span className="material-symbols-outlined text-tertiary text-xl mb-1">directions_walk</span>
<span className="font-headline-sm text-headline-sm text-tertiary font-black">24.1%</span>
<span className="font-label-sm text-[11px] text-on-surface-variant font-semibold">Đi Bộ (10.3K)</span>
</div>
{/*  Car / Taxi  */}
<div className="bg-surface-container-low p-3 rounded-2xl flex flex-col items-center">
<span className="material-symbols-outlined text-secondary text-xl mb-1">local_taxi</span>
<span className="font-headline-sm text-headline-sm text-secondary font-black">7.5%</span>
<span className="font-label-sm text-[11px] text-on-surface-variant font-semibold">Ô Tô / Taxi (3.2K)</span>
</div>
</div>
{/*  Inline SVG Multi-segment Progress Bar  */}
<div className="w-full h-3 rounded-full bg-surface-container overflow-hidden flex">
<div className="h-full bg-primary-container" style={{ width: "68.4%" }} title="Xe máy"></div>
<div className="h-full bg-tertiary" style={{ width: "24.1%" }} title="Đi bộ"></div>
<div className="h-full bg-secondary-container" style={{ width: "7.5%" }} title="Ô tô"></div>
</div>
<div className="flex items-center justify-between text-on-surface-variant font-label-sm text-[11px]">
<span className="">Vận tốc TB người đi bộ: <strong>4.2 km/h</strong></span>
<span className="">Vận tốc TB xe máy: <strong>26.8 km/h</strong></span>
</div>
</div>
{/*  Realtime Cluster Alerts & Anomaly Feed (High Priority)  */}
<div className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm flex flex-col gap-3.5">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="w-9 h-9 rounded-2xl bg-error/10 text-error flex items-center justify-center">
<span className="material-symbols-outlined text-xl">warning</span>
</div>
<div>
<h2 className="font-title-md text-title-md text-on-surface font-bold">Cảnh Báo Quá Tải Cụm</h2>
<span className="font-label-sm text-[11px] text-error font-bold">Tăng đột biến (&gt;300% TB)</span>
</div>
</div>
<span className="w-2.5 h-2.5 rounded-full bg-error animate-ping"></span>
</div>
{/*  Anomaly Item 1  */}
<div className="bg-surface-container-low p-3.5 rounded-2xl flex flex-col gap-2 transition-all hover:bg-surface-container">
<div className="flex items-start justify-between">
<div className="flex flex-col">
<div className="flex items-center gap-1.5">
<span className="font-label-md text-label-md text-on-surface font-bold">Cụm Phố Cổ (Hà Nội)</span>
<span className="px-1.5 py-0.2 rounded bg-error text-white font-label-sm text-[9px] font-black">+342%</span>
</div>
<span className="font-label-sm text-[11px] text-on-surface-variant">Bán kính 800m quanh Mã Mây - Tạ Hiện</span>
</div>
<button className="px-2.5 py-1 rounded-full bg-primary-container text-white font-label-sm text-[11px] font-bold hover:brightness-110 shadow-xs" type="button">
              Điều Tiết
            </button>
</div>
<div className="flex items-center justify-between text-[11px] font-label-sm text-on-surface-variant">
<span className="">8,420 khách • 92% quán kín bàn</span>
<span className="text-error font-bold">Khuyến nghị: Bật Staggering Ads</span>
</div>
</div>
{/*  Anomaly Item 2  */}
<div className="bg-surface-container-low p-3.5 rounded-2xl flex flex-col gap-2 transition-all hover:bg-surface-container">
<div className="flex items-start justify-between">
<div className="flex flex-col">
<div className="flex items-center gap-1.5">
<span className="font-label-md text-label-md text-on-surface font-bold">Bùi Viện - Phạm Ngũ Lão (TP.HCM)</span>
<span className="px-1.5 py-0.2 rounded bg-secondary-container text-white font-label-sm text-[9px] font-black">+280%</span>
</div>
<span className="font-label-sm text-[11px] text-on-surface-variant">Mật độ beer club &amp; ẩm thực đường phố đêm</span>
</div>
<button className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-[11px] font-bold" type="button">
              Xem Lưới
            </button>
</div>
<div className="flex items-center justify-between text-[11px] font-label-sm text-on-surface-variant">
<span className="">6,190 khách • Lượng xe máy ùn ứ</span>
<span className="text-secondary font-bold">Cảnh báo: 2 Quán tắt nhận order</span>
</div>
</div>
{/*  Anomaly Item 3  */}
<div className="bg-surface-container-low p-3.5 rounded-2xl flex flex-col gap-2 transition-all hover:bg-surface-container">
<div className="flex items-start justify-between">
<div className="flex flex-col">
<div className="flex items-center gap-1.5">
<span className="font-label-md text-label-md text-on-surface font-bold">Chợ Đêm Sơn Trà (Đà Nẵng)</span>
<span className="px-1.5 py-0.2 rounded bg-tertiary text-white font-label-sm text-[9px] font-black">+195%</span>
</div>
<span className="font-label-sm text-[11px] text-on-surface-variant">Khu ẩm thực hải sản &amp; đồ nướng</span>
</div>
<button className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-[11px] font-bold" type="button">
              Kiểm Tra
            </button>
</div>
<div className="flex items-center justify-between text-[11px] font-label-sm text-on-surface-variant">
<span className="">3,840 khách du lịch • 88% khách đi bộ</span>
<span className="text-tertiary font-bold">Lưu lượng an toàn</span>
</div>
</div>
{/*  Action Footer  */}
<button className="w-full mt-1 py-2.5 rounded-2xl bg-surface-container-high text-on-surface hover:bg-surface-variant font-label-sm text-label-sm font-bold flex items-center justify-center gap-1.5 transition-colors" type="button">
<span className="material-symbols-outlined text-base">notifications_active</span>
          Cấu Hình Webhook Báo Động Telegram SRE
        </button>
</div>
</div>
</div>
</div>
</main>
    </div>
  );
}
