import { useState } from "react";

/**
 * AdminRoutingNodesTab
 * Super Admin Screen: Node Định Tuyến & Hạ Tầng Cluster 16ms
 * Auto-generated from Google Stitch design with full length fidelity.
 */
export default function AdminRoutingNodesTab({ onNavigateTab }) {
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
      <main className="relative pt-16 bg-surface min-h-screen px-space-lg py-space-lg"><div className="flex flex-col w-full">
{/*  Header & Global Actions Bar  */}
<div className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-lg mb-space-xl">
<div className="space-y-space-xs max-w-3xl">
<div className="flex flex-wrap items-center gap-space-xs">
<span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm tracking-widest uppercase">
<span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          NETWORK INFRASTRUCTURE &amp; EDGE NODES
        </span>
<span className="inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">
<span className="material-symbols-outlined text-xs">speed</span> Global Latency: 16.4ms
        </span>
<span className="inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
<span className="material-symbols-outlined text-xs">verified</span> Cluster Health: 99.999% SLA
        </span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
        Quản Lý Cụm Node Định Tuyến GPS &amp; Edge Gateway
      </h1>
<p className="font-body-md text-body-md text-on-surface-variant">
        Giám sát hạ tầng máy chủ phân tán toàn quốc, định tuyến luồng dữ liệu GPS thực khách với nhà hàng theo thời gian thực (Realtime WebSocket Engine).
      </p>
</div>
{/*  Actions  */}
<div className="flex flex-wrap items-center gap-space-sm">
<button className="inline-flex items-center gap-space-xs px-space-md py-2.5 rounded-full bg-surface-container-lowest text-on-surface font-label-lg text-label-lg shadow-sm hover:bg-surface-container-high transition-all" type="button">
<span className="material-symbols-outlined text-base text-on-surface-variant">sim_card_download</span>
<span>Xuất Báo Cáo Ping &amp; RTT (.csv)</span>
</button>
<button className="inline-flex items-center gap-space-xs px-space-md py-2.5 rounded-full bg-surface-container-lowest text-secondary font-label-lg text-label-lg shadow-sm hover:bg-surface-container-high transition-all" type="button">
<span className="material-symbols-outlined text-base">balance</span>
<span>Rebalance Tải Tự Động</span>
</button>
<button className="inline-flex items-center gap-space-xs px-space-lg py-2.5 rounded-full bg-primary-container text-on-primary-container font-label-lg text-label-lg shadow-[0_6px_16px_rgba(222,54,24,0.35)] hover:opacity-95 active:scale-[0.98] transition-all" type="button">
<span className="material-symbols-outlined text-base">add_circle</span>
<span>Thêm Edge Gateway Mới</span>
</button>
</div>
</div>
{/*  KPI Top Metric Cards  */}
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md mb-space-xl">
{/*  Card 1  */}
<div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Tổng Edge Node Active</span>
<div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
<span className="material-symbols-outlined text-base">dns</span>
</div>
</div>
<div className="flex items-baseline gap-space-xs mb-space-xs">
<span className="font-headline-lg text-headline-lg text-on-surface">48 / 48</span>
<span className="font-label-sm text-label-sm text-tertiary font-bold">100% Online</span>
</div>
<div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
<span>Bắc • Trung • Nam Cụm Phân Vùng</span>
<span className="text-tertiary font-label-sm text-label-sm">~14.2ms RTT</span>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full mt-3 overflow-hidden">
<div className="bg-tertiary h-full rounded-full w-full"></div>
</div>
</div>
{/*  Card 2  */}
<div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Băng Thông Realtime</span>
<div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
<span className="material-symbols-outlined text-base">rss_feed</span>
</div>
</div>
<div className="flex items-baseline gap-space-xs mb-space-xs">
<span className="font-headline-lg text-headline-lg text-on-surface">4.85</span>
<span className="font-title-md text-title-md text-on-surface-variant">Gbps</span>
</div>
<div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
<span>Peak Trưa: 8.2 Gbps</span>
<span className="text-secondary font-label-sm text-label-sm">420.000 sockets</span>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full mt-3 overflow-hidden">
<div className="bg-secondary-container h-full rounded-full w-[59%]"></div>
</div>
</div>
{/*  Card 3  */}
<div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Tỷ Lệ Mất Gói (Loss)</span>
<div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined text-base">network_check</span>
</div>
</div>
<div className="flex items-baseline gap-space-xs mb-space-xs">
<span className="font-headline-lg text-headline-lg text-tertiary">0.002%</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">/ SLA &lt;0.01%</span>
</div>
<div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
<span>0 Node Timeout cảnh báo</span>
<span className="text-tertiary font-label-sm text-label-sm">Tối ưu</span>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full mt-3 overflow-hidden">
<div className="bg-tertiary h-full rounded-full w-[12%]"></div>
</div>
</div>
{/*  Card 4  */}
<div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Thông Lượng Định Vị</span>
<div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-base">pin_drop</span>
</div>
</div>
<div className="flex items-baseline gap-space-xs mb-space-xs">
<span className="font-headline-lg text-headline-lg text-on-surface">68.500</span>
<span className="font-title-md text-title-md text-on-surface-variant">req/s</span>
</div>
<div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
<span>Geofencing Calculation</span>
<span className="text-primary font-label-sm text-label-sm">&lt; 5ms / batch</span>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full mt-3 overflow-hidden">
<div className="bg-primary h-full rounded-full w-[74%]"></div>
</div>
</div>
</div>
{/*  Regional Clusters & Topology Visualizer  */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md mb-space-xl">
{/*  Regional Cluster Cards (Span 7)  */}
<div className="lg:col-span-7 flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div>
<h2 className="font-title-md text-title-md text-on-surface">Cụm Trọng Điểm Theo Vùng (Edge Clusters)</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Tải phân bổ theo mật độ tài xế giao vận và quán ăn đối tác</p>
</div>
<span className="font-label-sm text-label-sm text-secondary uppercase font-bold px-space-xs py-1 rounded-full bg-surface-container-low">Auto Mesh Active</span>
</div>
{/*  Cluster Item: Miền Nam  */}
<div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-shadow">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-sm">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
<span className="material-symbols-outlined">south</span>
</div>
<div>
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-on-surface">Cụm Miền Nam</span>
<span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed">Tải Cao</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">TP.HCM • Bình Dương • Cần Thơ • Đồng Nai</span>
</div>
</div>
<div className="text-right">
<span className="font-headline-sm text-headline-sm text-on-surface">22 Nodes</span>
<span className="block font-label-sm text-label-sm text-tertiary">Ping: 11ms • IDC Tân Bình</span>
</div>
</div>
<div className="space-y-1.5">
<div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
<span>Công Suất Định Tuyến Socket (78%)</span>
<span className="font-bold text-on-surface">285.000 / 365.000 Connections</span>
</div>
<div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
<div className="bg-secondary-container h-full rounded-full w-[78%]"></div>
</div>
</div>
<div className="mt-space-sm pt-space-xs flex flex-wrap items-center justify-between gap-2 text-on-surface-variant font-label-sm text-label-sm">
<span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-tertiary"></span>Gateway Viettel IDC Tân Bình (Tier 3+)</span>
<span className="text-secondary font-bold">Dự phòng nóng: FPT District 9</span>
</div>
</div>
{/*  Cluster Item: Miền Bắc  */}
<div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-shadow">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-sm">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface">
<span className="material-symbols-outlined">north</span>
</div>
<div>
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-on-surface">Cụm Miền Bắc</span>
<span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed">Cân Bằng Tốt</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Hà Nội • Hải Phòng • Quảng Ninh • Bắc Ninh</span>
</div>
</div>
<div className="text-right">
<span className="font-headline-sm text-headline-sm text-on-surface">18 Nodes</span>
<span className="block font-label-sm text-label-sm text-tertiary">Ping: 12ms • FPT Ba Đình</span>
</div>
</div>
<div className="space-y-1.5">
<div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
<span>Công Suất Định Tuyến Socket (64%)</span>
<span className="font-bold text-on-surface">172.000 / 270.000 Connections</span>
</div>
<div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
<div className="bg-tertiary h-full rounded-full w-[64%]"></div>
</div>
</div>
<div className="mt-space-sm pt-space-xs flex flex-wrap items-center justify-between gap-2 text-on-surface-variant font-label-sm text-label-sm">
<span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-tertiary"></span>Gateway FPT Cloud Ba Đình (IPv4/IPv6 Dual)</span>
<span className="text-on-surface-variant">Dự phòng nóng: VNPT Nam Thăng Long</span>
</div>
</div>
{/*  Cluster Item: Miền Trung & Tây Nguyên  */}
<div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-shadow">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-sm">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface">
<span className="material-symbols-outlined">explore</span>
</div>
<div>
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-on-surface">Cụm Miền Trung &amp; Tây Nguyên</span>
<span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded-full bg-surface-container-high text-on-surface-variant">Nhàn Rỗi</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Đà Nẵng • Huế • Nha Trang • Đà Lạt</span>
</div>
</div>
<div className="text-right">
<span className="font-headline-sm text-headline-sm text-on-surface">8 Nodes</span>
<span className="block font-label-sm text-label-sm text-tertiary">Ping: 18ms • VNPT Đà Nẵng</span>
</div>
</div>
<div className="space-y-1.5">
<div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
<span>Công Suất Định Tuyến Socket (45%)</span>
<span className="font-bold text-on-surface">45.000 / 100.000 Connections</span>
</div>
<div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
<div className="bg-tertiary-container h-full rounded-full w-[45%]"></div>
</div>
</div>
<div className="mt-space-sm pt-space-xs flex flex-wrap items-center justify-between gap-2 text-on-surface-variant font-label-sm text-label-sm">
<span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-tertiary"></span>Gateway VNPT IDC Đà Nẵng (Anycast DNS)</span>
<span className="text-on-surface-variant">Sẵn sàng điều phối overflow từ HCM</span>
</div>
</div>
</div>
{/*  Live Network Topo & Traffic Wave Visualizer (Span 5)  */}
<div className="lg:col-span-5 flex flex-col justify-between rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
<div className="space-y-space-xs">
<div className="flex items-center justify-between">
<span className="font-title-md text-title-md text-on-surface">Topo Luồng GPS &amp; Mesh Gateway</span>
<span className="flex items-center gap-1 font-label-sm text-label-sm text-tertiary">
<span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span> Live Broadcast
          </span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Mô hình phân luồng WebSocket qua các điểm trạm biên</p>
</div>
{/*  Topology Interactive Visual Diagram  */}
<div className="my-space-md relative rounded-xl bg-surface-container-low p-space-md flex flex-col items-center justify-center overflow-hidden min-h-[260px]">
{/*  Background Grid Effect SVG  */}
<svg className="absolute inset-0 w-full h-full opacity-30 text-outline-variant" fill="none">
<pattern height="24" id="grid-pattern" patternunits="userSpaceOnUse" width="24">
<path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
</pattern>
<rect fill="url(#grid-pattern)" height="100%" width="100%"></rect>
</svg>
{/*  Connecting Lines SVG  */}
<svg className="absolute inset-0 w-full h-full text-secondary-container" fill="none">
<path className="animate-pulse" d="M 120 70 L 210 130" stroke="currentColor" strokeDasharray="4 3" strokeWidth="2"></path>
<path className="animate-pulse" d="M 300 70 L 210 130" stroke="currentColor" strokeDasharray="4 3" strokeWidth="2"></path>
<path d="M 210 130 L 210 200" stroke="currentColor" strokeWidth="2.5"></path>
<path d="M 210 130 L 100 200" stroke="currentColor" strokeDasharray="3 3" strokeWidth="1.5"></path>
<path d="M 210 130 L 320 200" stroke="currentColor" strokeDasharray="3 3" strokeWidth="1.5"></path>
</svg>
{/*  Node badges floating in topo  */}
<div className="relative z-10 w-full flex justify-around mb-8">
<div className="px-space-sm py-1.5 rounded-xl bg-surface-container-lowest shadow-sm flex items-center gap-1.5">
<span className="material-symbols-outlined text-sm text-primary">person_pin_circle</span>
<span className="font-label-sm text-label-sm font-bold text-on-surface">Drivers (420k)</span>
</div>
<div className="px-space-sm py-1.5 rounded-xl bg-surface-container-lowest shadow-sm flex items-center gap-1.5">
<span className="material-symbols-outlined text-sm text-secondary">storefront</span>
<span className="font-label-sm text-label-sm font-bold text-on-surface">Merchants (12.8k)</span>
</div>
</div>
<div className="relative z-10 px-space-md py-2 rounded-xl bg-primary-container text-on-primary-container shadow-md flex items-center gap-2 mb-8">
<span className="material-symbols-outlined text-lg">hub</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm tracking-wide">LOCALEATS ANYCAST CORE</span>
<span className="text-[10px] opacity-80">RTT Weighted Routing Layer</span>
</div>
</div>
<div className="relative z-10 w-full flex justify-between px-2">
<div className="px-space-xs py-1 rounded-lg bg-surface-container-lowest shadow-sm text-center">
<span className="block font-label-sm text-label-sm text-on-surface font-bold">Node HN</span>
<span className="text-[10px] text-tertiary">9.8ms</span>
</div>
<div className="px-space-xs py-1 rounded-lg bg-surface-container-lowest shadow-sm text-center ring-2 ring-secondary-container">
<span className="block font-label-sm text-label-sm text-on-surface font-bold">Node HCM</span>
<span className="text-[10px] text-secondary">8.4ms</span>
</div>
<div className="px-space-xs py-1 rounded-lg bg-surface-container-lowest shadow-sm text-center">
<span className="block font-label-sm text-label-sm text-on-surface font-bold">Node DNG</span>
<span className="text-[10px] text-tertiary">14.6ms</span>
</div>
</div>
</div>
{/*  Realtime Sparkline Graph of Throughput  */}
<div className="pt-space-xs space-y-space-xs">
<div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
<span>Lưu lượng tin nhắn vị trí (30 phút qua)</span>
<span className="text-tertiary font-bold">+18.4% vs hôm qua</span>
</div>
<div className="h-14 flex items-end gap-1 w-full pt-2">
<div className="flex-1 bg-surface-container rounded-t h-[40%] hover:bg-secondary transition-all"></div>
<div className="flex-1 bg-surface-container rounded-t h-[55%] hover:bg-secondary transition-all"></div>
<div className="flex-1 bg-surface-container rounded-t h-[48%] hover:bg-secondary transition-all"></div>
<div className="flex-1 bg-surface-container rounded-t h-[65%] hover:bg-secondary transition-all"></div>
<div className="flex-1 bg-surface-container rounded-t h-[75%] hover:bg-secondary transition-all"></div>
<div className="flex-1 bg-surface-container rounded-t h-[82%] hover:bg-secondary transition-all"></div>
<div className="flex-1 bg-secondary-container rounded-t h-[92%] hover:bg-primary transition-all"></div>
<div className="flex-1 bg-primary-container rounded-t h-[100%] hover:bg-primary transition-all"></div>
<div className="flex-1 bg-secondary-container rounded-t h-[88%] hover:bg-secondary transition-all"></div>
<div className="flex-1 bg-surface-container rounded-t h-[70%] hover:bg-secondary transition-all"></div>
<div className="flex-1 bg-surface-container rounded-t h-[74%] hover:bg-secondary transition-all"></div>
<div className="flex-1 bg-tertiary rounded-t h-[68%] hover:bg-tertiary transition-all"></div>
</div>
</div>
</div>
</div>
{/*  Detailed Node Management Table  */}
<div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm mb-space-xl overflow-hidden">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
<div>
<h2 className="font-title-md text-title-md text-on-surface">Danh Sách Chi Tiết Từng Node Định Tuyến</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Giám sát tài nguyên máy chủ vật lý &amp; socket phiên bản WebSocket v2.8</p>
</div>
<div className="flex items-center gap-space-xs">
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-base">search</span>
<input className="pl-9 pr-space-md py-1.5 rounded-full bg-surface-container text-on-surface font-body-sm text-body-sm placeholder:text-on-surface-variant focus:outline-none" placeholder="Tìm theo node ID, quận..." type="text"/>
</div>
<button className="p-2 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface" type="button">
<span className="material-symbols-outlined text-base">filter_list</span>
</button>
</div>
</div>
{/*  Table Container  */}
<div className="overflow-x-auto">
<table className="w-full text-left font-body-sm text-body-sm text-on-surface">
<thead>
<tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
<th className="py-3 px-space-md rounded-l-lg">Mã Node &amp; Máy Chủ</th>
<th className="py-3 px-space-sm">Khu Vực Phục Vụ</th>
<th className="py-3 px-space-sm">Trọng Số Tải (CPU / RAM)</th>
<th className="py-3 px-space-sm">Socket Đang Giữ</th>
<th className="py-3 px-space-sm">Độ Trễ (Ping)</th>
<th className="py-3 px-space-sm">Trạng Thái</th>
<th className="py-3 px-space-md text-right rounded-r-lg">Thao Tác</th>
</tr>
</thead>
<tbody className="divide-y-0">
{/*  Row 1: node-hanoi-core-01  */}
<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-3.5 px-space-md">
<div className="flex items-center gap-space-sm">
<span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
<div>
<span className="font-label-lg text-label-lg font-bold text-on-surface block">node-hanoi-core-01</span>
<span className="text-xs text-on-surface-variant font-label-sm text-label-sm">FPT DC Ba Đình • IP: 118.69.172.10</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-sm">
<span className="font-label-md text-label-md text-on-surface">Hoàn Kiếm &amp; Ba Đình</span>
<span className="block text-xs text-on-surface-variant">Bán kính: 8.5 km</span>
</td>
<td className="py-3.5 px-space-sm">
<div className="w-28 space-y-1">
<div className="flex justify-between text-xs">
<span>65% CPU</span>
<span className="text-on-surface-variant">14.2 GB</span>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
<div className="bg-tertiary h-full rounded-full w-[65%]"></div>
</div>
</div>
</td>
<td className="py-3.5 px-space-sm">
<span className="font-title-md text-title-md text-on-surface">42.180</span>
<span className="block text-xs text-on-surface-variant">99.8% Geo-matched</span>
</td>
<td className="py-3.5 px-space-sm">
<span className="inline-flex items-center gap-1 font-label-md text-label-md text-tertiary font-bold">
<span className="material-symbols-outlined text-xs">bolt</span> 9.8 ms
              </span>
</td>
<td className="py-3.5 px-space-sm">
<span className="inline-flex items-center gap-1 px-space-xs py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                Hoạt Động
              </span>
</td>
<td className="py-3.5 px-space-md text-right">
<div className="inline-flex items-center gap-1">
<button className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface" title="Flush Cache" type="button">
<span className="material-symbols-outlined text-base">cleaning_services</span>
</button>
<button className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface" title="Khởi động lại" type="button">
<span className="material-symbols-outlined text-base">restart_alt</span>
</button>
<button className="p-1.5 rounded-full hover:bg-surface-container text-secondary hover:text-primary" title="Failover" type="button">
<span className="material-symbols-outlined text-base">sync_alt</span>
</button>
</div>
</td>
</tr>
{/*  Row 2: node-hcm-center-02  */}
<tr className="hover:bg-surface-container-low/60 transition-colors bg-surface-container-low/30">
<td className="py-3.5 px-space-md">
<div className="flex items-center gap-space-sm">
<span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
<div>
<span className="font-label-lg text-label-lg font-bold text-on-surface block">node-hcm-center-02</span>
<span className="text-xs text-on-surface-variant font-label-sm text-label-sm">Viettel IDC TB • IP: 125.235.4.88</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-sm">
<span className="font-label-md text-label-md text-on-surface">Quận 1 &amp; Quận 3 (Sài Gòn)</span>
<span className="block text-xs text-on-surface-variant">Bán kính: 6.0 km</span>
</td>
<td className="py-3.5 px-space-sm">
<div className="w-28 space-y-1">
<div className="flex justify-between text-xs text-secondary font-bold">
<span>82% CPU</span>
<span>26.8 GB</span>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
<div className="bg-secondary-container h-full rounded-full w-[82%]"></div>
</div>
</div>
</td>
<td className="py-3.5 px-space-sm">
<span className="font-headline-sm text-headline-sm text-secondary">58.420</span>
<span className="block text-xs text-on-surface-variant">Cận ngưỡng 60k</span>
</td>
<td className="py-3.5 px-space-sm">
<span className="inline-flex items-center gap-1 font-label-md text-label-md text-tertiary font-bold">
<span className="material-symbols-outlined text-xs">bolt</span> 8.4 ms
              </span>
</td>
<td className="py-3.5 px-space-sm">
<span className="inline-flex items-center gap-1 px-space-xs py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                Tải Cao
              </span>
</td>
<td className="py-3.5 px-space-md text-right">
<div className="inline-flex items-center gap-1">
<button className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface" title="Flush Cache" type="button">
<span className="material-symbols-outlined text-base">cleaning_services</span>
</button>
<button className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface" title="Khởi động lại" type="button">
<span className="material-symbols-outlined text-base">restart_alt</span>
</button>
<button className="p-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed" title="Failover" type="button">
<span className="material-symbols-outlined text-base">sync_alt</span>
</button>
</div>
</td>
</tr>
{/*  Row 3: node-danang-coast-01  */}
<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-3.5 px-space-md">
<div className="flex items-center gap-space-sm">
<span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
<div>
<span className="font-label-lg text-label-lg font-bold text-on-surface block">node-danang-coast-01</span>
<span className="text-xs text-on-surface-variant font-label-sm text-label-sm">VNPT Đà Nẵng • IP: 14.162.88.22</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-sm">
<span className="font-label-md text-label-md text-on-surface">Hải Châu &amp; Sơn Trà</span>
<span className="block text-xs text-on-surface-variant">Bán kính: 12.0 km</span>
</td>
<td className="py-3.5 px-space-sm">
<div className="w-28 space-y-1">
<div className="flex justify-between text-xs">
<span>38% CPU</span>
<span className="text-on-surface-variant">8.9 GB</span>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
<div className="bg-tertiary h-full rounded-full w-[38%]"></div>
</div>
</div>
</td>
<td className="py-3.5 px-space-sm">
<span className="font-title-md text-title-md text-on-surface">18.120</span>
<span className="block text-xs text-on-surface-variant">99.4% Geo-matched</span>
</td>
<td className="py-3.5 px-space-sm">
<span className="inline-flex items-center gap-1 font-label-md text-label-md text-tertiary font-bold">
<span className="material-symbols-outlined text-xs">bolt</span> 14.6 ms
              </span>
</td>
<td className="py-3.5 px-space-sm">
<span className="inline-flex items-center gap-1 px-space-xs py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                Hoạt Động
              </span>
</td>
<td className="py-3.5 px-space-md text-right">
<div className="inline-flex items-center gap-1">
<button className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface" title="Flush Cache" type="button">
<span className="material-symbols-outlined text-base">cleaning_services</span>
</button>
<button className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface" title="Khởi động lại" type="button">
<span className="material-symbols-outlined text-base">restart_alt</span>
</button>
<button className="p-1.5 rounded-full hover:bg-surface-container text-secondary hover:text-primary" title="Failover" type="button">
<span className="material-symbols-outlined text-base">sync_alt</span>
</button>
</div>
</td>
</tr>
{/*  Row 4: node-cantho-south-01  */}
<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-3.5 px-space-md">
<div className="flex items-center gap-space-sm">
<span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
<div>
<span className="font-label-lg text-label-lg font-bold text-on-surface block">node-cantho-south-01</span>
<span className="text-xs text-on-surface-variant font-label-sm text-label-sm">VNPT Cần Thơ • IP: 113.161.90.14</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-sm">
<span className="font-label-md text-label-md text-on-surface">Ninh Kiều &amp; Cái Răng</span>
<span className="block text-xs text-on-surface-variant">Bán kính: 10.5 km</span>
</td>
<td className="py-3.5 px-space-sm">
<div className="w-28 space-y-1">
<div className="flex justify-between text-xs">
<span>29% CPU</span>
<span className="text-on-surface-variant">6.1 GB</span>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
<div className="bg-tertiary h-full rounded-full w-[29%]"></div>
</div>
</div>
</td>
<td className="py-3.5 px-space-sm">
<span className="font-title-md text-title-md text-on-surface">12.450</span>
<span className="block text-xs text-on-surface-variant">99.1% Geo-matched</span>
</td>
<td className="py-3.5 px-space-sm">
<span className="inline-flex items-center gap-1 font-label-md text-label-md text-tertiary font-bold">
<span className="material-symbols-outlined text-xs">bolt</span> 19.2 ms
              </span>
</td>
<td className="py-3.5 px-space-sm">
<span className="inline-flex items-center gap-1 px-space-xs py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                Hoạt Động
              </span>
</td>
<td className="py-3.5 px-space-md text-right">
<div className="inline-flex items-center gap-1">
<button className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface" title="Flush Cache" type="button">
<span className="material-symbols-outlined text-base">cleaning_services</span>
</button>
<button className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface" title="Khởi động lại" type="button">
<span className="material-symbols-outlined text-base">restart_alt</span>
</button>
<button className="p-1.5 rounded-full hover:bg-surface-container text-secondary hover:text-primary" title="Failover" type="button">
<span className="material-symbols-outlined text-base">sync_alt</span>
</button>
</div>
</td>
</tr>
{/*  Row 5: node-dalat-highland-02  */}
<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-3.5 px-space-md">
<div className="flex items-center gap-space-sm">
<span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
<div>
<span className="font-label-lg text-label-lg font-bold text-on-surface block">node-dalat-highland-02</span>
<span className="text-xs text-on-surface-variant font-label-sm text-label-sm">Viettel Lâm Đồng • IP: 171.244.19.45</span>
</div>
</div>
</td>
<td className="py-3.5 px-space-sm">
<span className="font-label-md text-label-md text-on-surface">TP Đà Lạt &amp; Lạc Dương</span>
<span className="block text-xs text-on-surface-variant">Bán kính: 15.0 km</span>
</td>
<td className="py-3.5 px-space-sm">
<div className="w-28 space-y-1">
<div className="flex justify-between text-xs">
<span>44% CPU</span>
<span className="text-on-surface-variant">10.4 GB</span>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
<div className="bg-tertiary h-full rounded-full w-[44%]"></div>
</div>
</div>
</td>
<td className="py-3.5 px-space-sm">
<span className="font-title-md text-title-md text-on-surface">15.040</span>
<span className="block text-xs text-on-surface-variant">98.9% Geo-matched</span>
</td>
<td className="py-3.5 px-space-sm">
<span className="inline-flex items-center gap-1 font-label-md text-label-md text-tertiary font-bold">
<span className="material-symbols-outlined text-xs">bolt</span> 22.1 ms
              </span>
</td>
<td className="py-3.5 px-space-sm">
<span className="inline-flex items-center gap-1 px-space-xs py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                Hoạt Động
              </span>
</td>
<td className="py-3.5 px-space-md text-right">
<div className="inline-flex items-center gap-1">
<button className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface" title="Flush Cache" type="button">
<span className="material-symbols-outlined text-base">cleaning_services</span>
</button>
<button className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface" title="Khởi động lại" type="button">
<span className="material-symbols-outlined text-base">restart_alt</span>
</button>
<button className="p-1.5 rounded-full hover:bg-surface-container text-secondary hover:text-primary" title="Failover" type="button">
<span className="material-symbols-outlined text-base">sync_alt</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
{/*  Pagination & Footnote  */}
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mt-space-md pt-space-sm">
<span className="font-body-sm text-body-sm text-on-surface-variant">Hiển thị 5 trên 48 Nodes toàn quốc • Cập nhật tự động mỗi 3 giây</span>
<div className="flex items-center gap-space-xs">
<button className="px-3 py-1 rounded-lg bg-surface-container font-label-sm text-label-sm text-on-surface hover:bg-surface-container-high transition-all" type="button">Trước</button>
<span className="px-2 font-label-sm text-label-sm font-bold text-on-surface">1 / 10</span>
<button className="px-3 py-1 rounded-lg bg-surface-container font-label-sm text-label-sm text-on-surface hover:bg-surface-container-high transition-all" type="button">Sau</button>
</div>
</div>
</div>
{/*  Routing Policy & Failover Management  */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md">
{/*  Policy 1: GeoDNS & Anycast  */}
<div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm space-y-space-sm">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary">alt_route</span>
<span className="font-title-md text-title-md text-on-surface">Chính Sách Điều Phối Anycast</span>
</div>
<input checked="" className="accent-primary w-4 h-4 cursor-pointer" type="checkbox"/>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
        Tự động liên kết thiết bị người dùng đến Edge Node gần nhất dựa trên vĩ độ/kinh độ và độ trễ BGP RTT.
      </p>
<div className="p-space-sm rounded-lg bg-surface-container-low space-y-1 font-label-sm text-label-sm text-on-surface-variant">
<div className="flex justify-between">
<span>DNS Resolver:</span>
<span className="font-bold text-on-surface">Cloudflare Magic Transit + BGP Anycast</span>
</div>
<div className="flex justify-between">
<span>Thời gian chuyển mạch:</span>
<span className="font-bold text-tertiary">&lt; 150ms Zero-drop</span>
</div>
</div>
<button className="w-full py-2 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-bold hover:bg-surface-container-high transition-all" type="button">
        Hiệu Chỉnh Ngưỡng Khoảng Cách (Haversine)
      </button>
</div>
{/*  Policy 2: Anti-DDOS & Socket Flood Shield  */}
<div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm space-y-space-sm">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary">security</span>
<span className="font-title-md text-title-md text-on-surface">Lá Chắn DDOS &amp; Rate Limit</span>
</div>
<input checked="" className="accent-secondary w-4 h-4 cursor-pointer" type="checkbox"/>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
        Phát hiện GPS spoofing, bot tạo tọa độ ảo và ngắt kết nối WebSocket bất thường quá 25 req/giây mỗi client.
      </p>
<div className="p-space-sm rounded-lg bg-surface-container-low space-y-1 font-label-sm text-label-sm text-on-surface-variant">
<div className="flex justify-between">
<span>Ngưỡng Socket Flood:</span>
<span className="font-bold text-on-surface">65.000 / node hard-cap</span>
</div>
<div className="flex justify-between">
<span>IP Bị Cách Ly Hôm Nay:</span>
<span className="font-bold text-primary">142 IPs vi phạm</span>
</div>
</div>
<button className="w-full py-2 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-bold hover:bg-surface-container-high transition-all" type="button">
        Cấu Hình Bộ Lọc Token JWT
      </button>
</div>
{/*  Policy 3: Failover Logs  */}
<div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm space-y-space-sm">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary">history_toggle_off</span>
<span className="font-title-md text-title-md text-on-surface">Nhật Ký Chuyển Mạch (30 Ngày)</span>
</div>
<span className="font-label-sm text-label-sm text-tertiary font-bold">100% Khả Dụng</span>
</div>
<div className="space-y-2">
<div className="p-2 rounded-lg bg-surface-container-low flex items-start gap-2">
<span className="material-symbols-outlined text-sm text-tertiary mt-0.5">check_circle</span>
<div className="text-xs">
<span className="font-bold text-on-surface block">Rebalance 12k socket sang HCM-03</span>
<span className="text-on-surface-variant">08:42 sáng nay • Tự động do cao điểm ăn sáng</span>
</div>
</div>
<div className="p-2 rounded-lg bg-surface-container-low flex items-start gap-2">
<span className="material-symbols-outlined text-sm text-secondary mt-0.5">swap_horiz</span>
<div className="text-xs">
<span className="font-bold text-on-surface block">Bảo trì cáp quang biển APG</span>
<span className="text-on-surface-variant">14 ngày trước • Định tuyến qua cụm Sing Cloud</span>
</div>
</div>
</div>
<button className="w-full py-2 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-bold hover:bg-surface-container-high transition-all" type="button">
        Xem Toàn Bộ 482 Sự Kiện Failover
      </button>
</div>
</div>
</div></main>
    </div>
  );
}
