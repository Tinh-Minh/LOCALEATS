import { useState } from "react";

/**
 * AdminApiWebhooksTab
 * Super Admin Screen: API Partner & Cấu Hình Webhooks
 * Auto-generated from Google Stitch design with full length fidelity.
 */
export default function AdminApiWebhooksTab({ onNavigateTab }) {
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
<div className="relative overflow-hidden rounded-3xl bg-surface-container-low p-space-lg shadow-sm mb-space-lg">
<div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-secondary-container/10 blur-3xl pointer-events-none"></div>
<div className="absolute right-64 -bottom-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none"></div>
<div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
<div className="max-w-3xl space-y-space-xs">
<div className="flex flex-wrap items-center gap-space-xs">
<span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm tracking-widest uppercase flex items-center gap-1.5 shadow-sm">
<span className="material-symbols-outlined text-sm">hub</span>
            Integration &amp; Open Platform
          </span>
<span className="px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1.5 shadow-sm">
<span className="w-2 h-2 rounded-full bg-tertiary"></span>
            Gateway: Kong API Enterprise v3.6
          </span>
<span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm flex items-center gap-1.5 shadow-sm">
<span className="material-symbols-outlined text-sm">verified</span>
            Uptime SLA: 99.99%
          </span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight pt-1">
          Quản Lý Kết Nối API Đối Tác &amp; Luồng Webhooks
        </h1>
<p className="font-body-md text-body-md text-on-surface-variant max-w-2xl leading-relaxed">
          Kiểm soát hạn mức truy cập (Rate Limiting), cấp phát khóa API bảo mật (Secret Keys), và giám sát độ tin cậy của các luồng Webhooks gửi thông tin đơn hàng/định vị đến đối tác.
        </p>
</div>
<div className="flex flex-wrap items-center gap-space-sm pt-2 xl:pt-0">
<button className="px-space-md py-2.5 rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-container-high transition-all shadow-sm font-label-lg text-label-lg flex items-center gap-2" id="btn-docs" type="button">
<span className="material-symbols-outlined text-lg text-on-surface-variant">terminal</span>
<span>Swagger / Postman</span>
</button>
<button className="px-space-md py-2.5 rounded-full bg-secondary text-on-secondary hover:bg-on-secondary-container transition-all shadow-md font-label-lg text-label-lg flex items-center gap-2" id="btn-ping" type="button">
<span className="material-symbols-outlined text-lg">bolt</span>
<span>Kiểm Tra Webhook Ping</span>
</button>
<button className="px-space-lg py-2.5 rounded-full bg-primary-container text-on-primary-container hover:bg-primary transition-all shadow-[0_6px_16px_rgba(222,54,24,0.35)] active:scale-95 font-label-lg text-label-lg flex items-center gap-2" id="btn-generate-key" type="button">
<span className="material-symbols-outlined text-lg">add_circle</span>
<span>Tạo Khóa API Mới</span>
</button>
</div>
</div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-lg">
<div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant font-bold">Lượt Gọi API Hôm Nay</span>
<span className="p-2 rounded-xl bg-surface-container-low text-primary flex items-center justify-center">
<span className="material-symbols-outlined text-xl">dataset</span>
</span>
</div>
<div className="my-space-sm">
<div className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">8.420.000</div>
<div className="flex items-center gap-2 mt-1">
<span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-xs">north</span>+14.8%
          </span>
<span className="font-body-sm text-body-sm text-on-surface-variant">vs hôm qua</span>
</div>
</div>
<div className="pt-space-xs text-on-surface-variant font-body-sm text-body-sm flex justify-between">
<span>Peak: <strong className="text-on-surface">1.200 req/s</strong></span>
<span>Avg: <strong className="text-on-surface">450 req/s</strong></span>
</div>
</div>
<div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant font-bold">Thành Công (HTTP 200)</span>
<span className="p-2 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-xl">check_circle</span>
</span>
</div>
<div className="my-space-sm">
<div className="font-headline-lg text-headline-lg text-tertiary font-extrabold tracking-tight">99.94%</div>
<div className="w-full bg-surface-container-high h-1.5 rounded-full mt-2.5 overflow-hidden">
<div className="bg-tertiary h-full rounded-full" style={{ width: "99.94%" }}></div>
</div>
</div>
<div className="pt-space-xs text-on-surface-variant font-body-sm text-body-sm flex justify-between">
<span>4xx client: <strong className="text-secondary">0.05%</strong></span>
<span>5xx system: <strong className="text-primary">0.01%</strong></span>
</div>
</div>
<div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant font-bold">Độ Trễ Gateway TB</span>
<span className="p-2 rounded-xl bg-surface-container-low text-secondary flex items-center justify-center">
<span className="material-symbols-outlined text-xl">speed</span>
</span>
</div>
<div className="my-space-sm">
<div className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">18.2 ms</div>
<div className="flex items-center gap-2 mt-1">
<span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-xs">south</span>-3.4 ms
          </span>
<span className="font-body-sm text-body-sm text-on-surface-variant">tối ưu hóa node</span>
</div>
</div>
<div className="pt-space-xs text-on-surface-variant font-body-sm text-body-sm flex justify-between">
<span>Redis Hit Rate:</span>
<span className="font-label-md text-label-md text-tertiary font-bold">84% Cached</span>
</div>
</div>
<div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant font-bold">Webhooks Đã Phân Phối</span>
<span className="p-2 rounded-xl bg-surface-container-low text-secondary flex items-center justify-center">
<span className="material-symbols-outlined text-xl">move_to_inbox</span>
</span>
</div>
<div className="my-space-sm">
<div className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">124.600</div>
<div className="flex items-center gap-2 mt-1">
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-xs">autorenew</span>Retry Level 3
          </span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Queue: 4ms</span>
</div>
</div>
<div className="pt-space-xs text-on-surface-variant font-body-sm text-body-sm flex justify-between">
<span>Độ tin cậy Retry:</span>
<span className="font-label-md text-label-md text-tertiary font-bold">99.98% OK</span>
</div>
</div>
</div>
<div className="rounded-3xl bg-surface-container-lowest p-space-lg shadow-sm mb-space-lg">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
<div>
<h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
<span>Đối Tác Doanh Nghiệp &amp; Ứng Dụng Đang Kết Nối</span>
<span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-bold">5 Active Clients</span>
</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
          Quản lý phạm vi quyền, chỉ định IP Whitelist và kiểm soát phân bổ Quota theo giờ/ngày.
        </p>
</div>
<div className="flex items-center gap-space-xs">
<div className="relative">
<input className="h-10 pl-10 pr-4 rounded-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/40 w-64 transition-all" placeholder="Tìm theo tên đối tác hoặc Prefix..." type="text"/>
<span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-lg">search</span>
</div>
<button className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors" type="button">
<span className="material-symbols-outlined text-xl">filter_list</span>
</button>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left">
<thead>
<tr className="bg-surface-container-low rounded-2xl text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
<th className="py-3 px-space-md rounded-l-xl">Đối Tác &amp; Nghiệp Vụ</th>
<th className="py-3 px-space-md">Hạn Mức Quota (Req/ngày)</th>
<th className="py-3 px-space-md">API Secret Key Hash</th>
<th className="py-3 px-space-md">Trạng Thái</th>
<th className="py-3 px-space-md text-right rounded-r-xl">Thao Tác Quản Trị</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-container-low">
<tr className="hover:bg-surface-container-low/40 transition-colors">
<td className="py-space-md px-space-md">
<div className="flex items-center gap-space-sm">
<div className="w-11 h-11 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary font-bold shadow-sm">
<span className="material-symbols-outlined text-2xl">receipt_long</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-1.5">
<span className="font-title-md text-title-md text-on-surface font-bold">VNPT E-Invoice Gateway</span>
<span className="material-symbols-outlined text-base text-tertiary" title="Enterprise Tier">verified</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant truncate">Đồng bộ hóa đơn điện tử VAT &amp; Cục Thuế tự động</span>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<span className="px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md font-bold">Không giới hạn</span>
<div className="text-on-surface-variant font-body-sm text-body-sm mt-1">Đã dùng: 432.180 hôm nay</div>
</td>
<td className="py-space-md px-space-md">
<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-low font-mono text-xs text-on-surface">
<span>lce_live_vnpt_e82a9...</span>
<button className="text-on-surface-variant hover:text-primary transition-colors" onclick="navigator.clipboard.writeText('lce_live_vnpt_e82a9d821ff34ac88')" title="Sao chép Key" type="button">
<span className="material-symbols-outlined text-base">content_copy</span>
</button>
</div>
</td>
<td className="py-space-md px-space-md">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
<span className="w-2 h-2 rounded-full bg-tertiary"></span>Active
              </span>
</td>
<td className="py-space-md px-space-md text-right">
<div className="inline-flex items-center gap-1">
<button className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors" title="Xoay vòng khóa (Rotate)" type="button">
<span className="material-symbols-outlined text-lg">refresh</span>
</button>
<button className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-secondary transition-colors" title="IP Whitelist (3 IPs)" type="button">
<span className="material-symbols-outlined text-lg">shield</span>
</button>
<button className="p-2 rounded-xl text-on-surface-variant hover:bg-error-container hover:text-error transition-colors" title="Tạm dừng kết nối" type="button">
<span className="material-symbols-outlined text-lg">pause_circle</span>
</button>
</div>
</td>
</tr>
<tr className="hover:bg-surface-container-low/40 transition-colors">
<td className="py-space-md px-space-md">
<div className="flex items-center gap-space-sm">
<div className="w-11 h-11 rounded-2xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold shadow-sm">
<span className="material-symbols-outlined text-2xl">chat</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-1.5">
<span className="font-title-md text-title-md text-on-surface font-bold">Zalo Mini App LOCALEATS</span>
<span className="px-1.5 py-0.2 bg-secondary-fixed text-on-secondary-fixed rounded text-[10px] font-bold">POPULAR</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant truncate">Tra cứu quán nhanh, voucher và đặt bàn trực tiếp</span>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<span className="font-label-md text-label-md text-on-surface font-bold">2.000.000</span>
<span className="text-on-surface-variant font-body-sm text-body-sm"> /ngày</span>
<div className="w-28 bg-surface-container-high h-1.5 rounded-full mt-1.5 overflow-hidden">
<div className="bg-secondary-container h-full rounded-full" style={{ width: "68%" }}></div>
</div>
</td>
<td className="py-space-md px-space-md">
<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-low font-mono text-xs text-on-surface">
<span>lce_live_zalo_882c1...</span>
<button className="text-on-surface-variant hover:text-primary transition-colors" onclick="navigator.clipboard.writeText('lce_live_zalo_882c199042b')" title="Sao chép Key" type="button">
<span className="material-symbols-outlined text-base">content_copy</span>
</button>
</div>
</td>
<td className="py-space-md px-space-md">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
<span className="w-2 h-2 rounded-full bg-tertiary"></span>Active
              </span>
</td>
<td className="py-space-md px-space-md text-right">
<div className="inline-flex items-center gap-1">
<button className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors" title="Xoay vòng khóa (Rotate)" type="button">
<span className="material-symbols-outlined text-lg">refresh</span>
</button>
<button className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-secondary transition-colors" title="IP Whitelist (Dynamic)" type="button">
<span className="material-symbols-outlined text-lg">shield</span>
</button>
<button className="p-2 rounded-xl text-on-surface-variant hover:bg-error-container hover:text-error transition-colors" title="Tạm dừng kết nối" type="button">
<span className="material-symbols-outlined text-lg">pause_circle</span>
</button>
</div>
</td>
</tr>
<tr className="hover:bg-surface-container-low/40 transition-colors">
<td className="py-space-md px-space-md">
<div className="flex items-center gap-space-sm">
<div className="w-11 h-11 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary font-bold shadow-sm">
<span className="material-symbols-outlined text-2xl">two_wheeler</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-1.5">
<span className="font-title-md text-title-md text-on-surface font-bold">Ahamove &amp; Grab Driver Fleet</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant truncate">Tích hợp luồng tọa độ quán ăn, bãi đỗ xe và giờ mở cửa</span>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<span className="font-label-md text-label-md text-on-surface font-bold">1.500.000</span>
<span className="text-on-surface-variant font-body-sm text-body-sm"> /ngày</span>
<div className="w-28 bg-surface-container-high h-1.5 rounded-full mt-1.5 overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{ width: "82%" }}></div>
</div>
</td>
<td className="py-space-md px-space-md">
<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-low font-mono text-xs text-on-surface">
<span>lce_live_fleet_77bb4...</span>
<button className="text-on-surface-variant hover:text-primary transition-colors" onclick="navigator.clipboard.writeText('lce_live_fleet_77bb411c990')" title="Sao chép Key" type="button">
<span className="material-symbols-outlined text-base">content_copy</span>
</button>
</div>
</td>
<td className="py-space-md px-space-md">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
<span className="w-2 h-2 rounded-full bg-tertiary"></span>Active
              </span>
</td>
<td className="py-space-md px-space-md text-right">
<div className="inline-flex items-center gap-1">
<button className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors" title="Xoay vòng khóa (Rotate)" type="button">
<span className="material-symbols-outlined text-lg">refresh</span>
</button>
<button className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-secondary transition-colors" title="IP Whitelist (12 IPs)" type="button">
<span className="material-symbols-outlined text-lg">shield</span>
</button>
<button className="p-2 rounded-xl text-on-surface-variant hover:bg-error-container hover:text-error transition-colors" title="Tạm dừng kết nối" type="button">
<span className="material-symbols-outlined text-lg">pause_circle</span>
</button>
</div>
</td>
</tr>
<tr className="hover:bg-surface-container-low/40 transition-colors">
<td className="py-space-md px-space-md">
<div className="flex items-center gap-space-sm">
<div className="w-11 h-11 rounded-2xl bg-surface-container-high flex items-center justify-center text-secondary font-bold shadow-sm">
<span className="material-symbols-outlined text-2xl">restaurant</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-1.5">
<span className="font-title-md text-title-md text-on-surface font-bold">Michelin Guide Vietnam Partner</span>
<span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant rounded text-[10px] font-bold">GLOBAL</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant truncate">Đồng bộ dữ liệu nhà hàng được đề xuất &amp; danh hiệu sao ẩm thực</span>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<span className="font-label-md text-label-md text-on-surface font-bold">500.000</span>
<span className="text-on-surface-variant font-body-sm text-body-sm"> /ngày</span>
<div className="w-28 bg-surface-container-high h-1.5 rounded-full mt-1.5 overflow-hidden">
<div className="bg-tertiary h-full rounded-full" style={{ width: "25%" }}></div>
</div>
</td>
<td className="py-space-md px-space-md">
<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-low font-mono text-xs text-on-surface">
<span>lce_live_michelin_51a...</span>
<button className="text-on-surface-variant hover:text-primary transition-colors" onclick="navigator.clipboard.writeText('lce_live_michelin_51a66ff821')" title="Sao chép Key" type="button">
<span className="material-symbols-outlined text-base">content_copy</span>
</button>
</div>
</td>
<td className="py-space-md px-space-md">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
<span className="w-2 h-2 rounded-full bg-tertiary"></span>Active
              </span>
</td>
<td className="py-space-md px-space-md text-right">
<div className="inline-flex items-center gap-1">
<button className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors" title="Xoay vòng khóa (Rotate)" type="button">
<span className="material-symbols-outlined text-lg">refresh</span>
</button>
<button className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-secondary transition-colors" title="IP Whitelist (EU Origin)" type="button">
<span className="material-symbols-outlined text-lg">shield</span>
</button>
<button className="p-2 rounded-xl text-on-surface-variant hover:bg-error-container hover:text-error transition-colors" title="Tạm dừng kết nối" type="button">
<span className="material-symbols-outlined text-lg">pause_circle</span>
</button>
</div>
</td>
</tr>
<tr className="hover:bg-surface-container-low/40 transition-colors">
<td className="py-space-md px-space-md">
<div className="flex items-center gap-space-sm">
<div className="w-11 h-11 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary font-bold shadow-sm">
<span className="material-symbols-outlined text-2xl">point_of_sale</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-1.5">
<span className="font-title-md text-title-md text-on-surface font-bold">KiotViet &amp; iPOS POS Connector</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant truncate">Đồng bộ menu và giá món tự động từ phần mềm quản lý quán ăn</span>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<span className="font-label-md text-label-md text-on-surface font-bold">800.000</span>
<span className="text-on-surface-variant font-body-sm text-body-sm"> /ngày</span>
<div className="w-28 bg-surface-container-high h-1.5 rounded-full mt-1.5 overflow-hidden">
<div className="bg-secondary h-full rounded-full" style={{ width: "54%" }}></div>
</div>
</td>
<td className="py-space-md px-space-md">
<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-low font-mono text-xs text-on-surface">
<span>lce_live_ipos_44d99...</span>
<button className="text-on-surface-variant hover:text-primary transition-colors" onclick="navigator.clipboard.writeText('lce_live_ipos_44d990aa77c')" title="Sao chép Key" type="button">
<span className="material-symbols-outlined text-base">content_copy</span>
</button>
</div>
</td>
<td className="py-space-md px-space-md">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
<span className="w-2 h-2 rounded-full bg-tertiary"></span>Active
              </span>
</td>
<td className="py-space-md px-space-md text-right">
<div className="inline-flex items-center gap-1">
<button className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors" title="Xoay vòng khóa (Rotate)" type="button">
<span className="material-symbols-outlined text-lg">refresh</span>
</button>
<button className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-secondary transition-colors" title="IP Whitelist (Internal Cloud)" type="button">
<span className="material-symbols-outlined text-lg">shield</span>
</button>
<button className="p-2 rounded-xl text-on-surface-variant hover:bg-error-container hover:text-error transition-colors" title="Tạm dừng kết nối" type="button">
<span className="material-symbols-outlined text-lg">pause_circle</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-lg">
<div className="lg:span-7 lg:col-span-7 flex flex-col justify-between rounded-3xl bg-surface-container-lowest p-space-lg shadow-sm">
<div>
<div className="flex items-center justify-between mb-space-md">
<div>
<h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
<span>Bảng Giám Sát Luồng Webhooks Tự Động</span>
<span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse"></span>
</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Event Stream thời gian thực từ Worker cluster gửi đến các hệ thống đối tác.
            </p>
</div>
<span className="px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
            Auto-refresh 5s
          </span>
</div>
<div className="space-y-space-sm">
<div className="p-space-sm rounded-2xl bg-surface-container-low/60 hover:bg-surface-container-low transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-sm">
<span className="w-9 h-9 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold text-xs">
                200
              </span>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-label-md text-label-md text-on-surface font-mono font-bold">evt_whk_990141</span>
<span className="px-2 py-0.5 rounded-md bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">merchant.menu_updated</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant font-mono truncate max-w-sm">https://api.ipos.vn/v2/webhooks/menu-sync</span>
</div>
</div>
<div className="flex items-center gap-space-md justify-between sm:justify-end">
<span className="font-body-sm text-body-sm text-on-surface-variant">12 giây trước</span>
<button className="px-3 py-1.5 rounded-xl bg-surface-container-lowest text-on-surface hover:text-primary transition-colors font-label-sm text-label-sm font-bold shadow-sm flex items-center gap-1" type="button">
<span className="material-symbols-outlined text-sm">replay</span> Bắn Lại
              </button>
</div>
</div>
<div className="p-space-sm rounded-2xl bg-surface-container-low/60 hover:bg-surface-container-low transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-sm">
<span className="w-9 h-9 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold text-xs">
                200
              </span>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-label-md text-label-md text-on-surface font-mono font-bold">evt_whk_990140</span>
<span className="px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold">review.flagged</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant font-mono truncate max-w-sm">https://guard.localeats.internal/webhooks/ai-audit</span>
</div>
</div>
<div className="flex items-center gap-space-md justify-between sm:justify-end">
<span className="font-body-sm text-body-sm text-on-surface-variant">45 giây trước</span>
<button className="px-3 py-1.5 rounded-xl bg-surface-container-lowest text-on-surface hover:text-primary transition-colors font-label-sm text-label-sm font-bold shadow-sm flex items-center gap-1" type="button">
<span className="material-symbols-outlined text-sm">replay</span> Bắn Lại
              </button>
</div>
</div>
<div className="p-space-sm rounded-2xl bg-surface-container-low/60 hover:bg-surface-container-low transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-sm">
<span className="w-9 h-9 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold text-xs">
                200
              </span>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-label-md text-label-md text-on-surface font-mono font-bold">evt_whk_990139</span>
<span className="px-2 py-0.5 rounded-md bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">kyc.approved</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant font-mono truncate max-w-sm">https://portal.vnpt-invoice.vn/notify/merchant-tax</span>
</div>
</div>
<div className="flex items-center gap-space-md justify-between sm:justify-end">
<span className="font-body-sm text-body-sm text-on-surface-variant">2 phút trước</span>
<button className="px-3 py-1.5 rounded-xl bg-surface-container-lowest text-on-surface hover:text-primary transition-colors font-label-sm text-label-sm font-bold shadow-sm flex items-center gap-1" type="button">
<span className="material-symbols-outlined text-sm">replay</span> Bắn Lại
              </button>
</div>
</div>
<div className="p-space-sm rounded-2xl bg-surface-container-low/60 hover:bg-surface-container-low transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-sm">
<span className="w-9 h-9 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold text-xs">
                200
              </span>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-label-md text-label-md text-on-surface font-mono font-bold">evt_whk_990138</span>
<span className="px-2 py-0.5 rounded-md bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-semibold">payment.settled</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant font-mono truncate max-w-sm">https://billing.ahamove.com/hook/payout-daily</span>
</div>
</div>
<div className="flex items-center gap-space-md justify-between sm:justify-end">
<span className="font-body-sm text-body-sm text-on-surface-variant">3 phút trước</span>
<button className="px-3 py-1.5 rounded-xl bg-surface-container-lowest text-on-surface hover:text-primary transition-colors font-label-sm text-label-sm font-bold shadow-sm flex items-center gap-1" type="button">
<span className="material-symbols-outlined text-sm">replay</span> Bắn Lại
              </button>
</div>
</div>
</div>
</div>
<div className="mt-space-md pt-space-sm flex items-center justify-between">
<span className="font-body-sm text-body-sm text-on-surface-variant">
          Showing 4 of 124,600 delivery events
        </span>
<button className="font-label-md text-label-md text-primary font-bold hover:underline flex items-center gap-1" type="button">
<span>Xem Tất Cả Webhooks Log</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
</div>
<div className="lg:span-5 lg:col-span-5 flex flex-col justify-between rounded-3xl bg-surface-container-lowest p-space-lg shadow-sm">
<div>
<div className="flex items-center justify-between mb-space-md">
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">Rate Limiter &amp; Circuit Breaker</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Cơ chế bảo vệ chịu tải &amp; tự ngắt mạch gateway.
            </p>
</div>
<span className="material-symbols-outlined text-secondary text-2xl">safety_check</span>
</div>
<div className="p-space-md rounded-2xl bg-surface-container-low mb-space-md space-y-space-sm">
<div className="flex items-center justify-between">
<span className="font-title-md text-title-md text-on-surface font-semibold">Tự ngắt mạch (Circuit Trip)</span>
<span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">5 Lần Timeout</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
            Tự động cô lập endpoint đối tác khi liên tiếp gặp 5 sự cố kết nối quá 2.500ms để bảo toàn tài nguyên máy chủ.
          </p>
<div className="pt-1 flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
<span>Trạng thái: <strong className="text-tertiary">Closed (Healthy)</strong></span>
<span>Khôi phục thử: <strong className="text-on-surface">30s probe</strong></span>
</div>
</div>
<div className="space-y-space-xs">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface font-bold">Sandbox Payload Test (JSON)</span>
<button className="px-3 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm hover:bg-primary-container transition-all flex items-center gap-1 shadow-sm" id="btn-run-mock" type="button">
<span className="material-symbols-outlined text-xs">play_arrow</span> Run Simulation
            </button>
</div>
<div className="p-space-sm rounded-xl bg-inverse-surface text-inverse-on-surface font-mono text-xs leading-relaxed overflow-x-auto shadow-inner">
<pre className="text-tertiary-fixed">&#123;
  <span className="text-secondary-fixed-dim">"event"</span>: "merchant.menu_updated",
  <span className="text-secondary-fixed-dim">"timestamp"</span>: 1711789200,
  <span className="text-secondary-fixed-dim">"partner_id"</span>: "ipos_vietnam_core",
  <span className="text-secondary-fixed-dim">"data"</span>: &#123;
    <span className="text-secondary-fixed-dim">"merchant_id"</span>: "MCH_88290",
    <span className="text-secondary-fixed-dim">"items_count"</span>: 42,
    <span className="text-secondary-fixed-dim">"currency"</span>: "VND"
  &#125;
&#125;</pre>
</div>
</div>
</div>
<div className="mt-space-md p-space-sm rounded-2xl bg-surface-container-high flex items-center gap-space-sm">
<span className="material-symbols-outlined text-primary text-xl">info</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">
          Khóa API môi trường Sandbox dùng prefix <code className="font-mono text-xs font-bold text-primary">lce_test_***</code> không bị tính phí quota thực.
        </span>
</div>
</div>
</div>
<div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm hidden flex items-center justify-center p-4" id="modal-new-key">
<div className="w-full max-w-xl rounded-3xl bg-surface-container-lowest p-space-lg shadow-xl relative animate-in fade-in duration-200">
<div className="flex items-center justify-between mb-space-md">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center">
<span className="material-symbols-outlined text-xl">key</span>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Cấp Khóa API Đối Tác Mới</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Tạo chuỗi xác thực HMAC-SHA256 định danh hệ thống đối tác</p>
</div>
</div>
<button className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-on-surface" id="btn-close-modal" type="button">
<span className="material-symbols-outlined text-lg">close</span>
</button>
</div>
<form className="space-y-space-md" onsubmit="event.preventDefault(); alert('Khóa API mới đã được khởi tạo thành công!'); document.getElementById('modal-new-key').classList.add('hidden');">
<div>
<label className="block font-label-md text-label-md text-on-surface font-bold mb-1">Tên Ứng Dụng / Doanh Nghiệp Đối Tác</label>
<input className="w-full h-11 px-4 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Ví dụ: ShopeeFood Logistics Sync" required="" type="text"/>
</div>
<div className="grid grid-cols-2 gap-space-md">
<div>
<label className="block font-label-md text-label-md text-on-surface font-bold mb-1">Môi Trường</label>
<select className="w-full h-11 px-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary/50">
<option value="production">Production (Live)</option>
<option value="sandbox">Sandbox (Testing)</option>
</select>
</div>
<div>
<label className="block font-label-md text-label-md text-on-surface font-bold mb-1">Hạn Mức Quota (Req/ngày)</label>
<select className="w-full h-11 px-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary/50">
<option value="500k">500.000 req/ngày</option>
<option value="1m">1.000.000 req/ngày</option>
<option value="unlimited">Không giới hạn (Enterprise)</option>
</select>
</div>
</div>
<div>
<label className="block font-label-md text-label-md text-on-surface font-bold mb-1">IP Whitelist (Tùy chọn, cách nhau dấu phẩy)</label>
<input className="w-full h-11 px-4 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="103.20.10.1, 14.161.22.4" type="text"/>
</div>
<div className="pt-space-sm flex items-center justify-end gap-space-sm">
<button className="px-5 py-2.5 rounded-full bg-surface-container-high text-on-surface font-label-lg text-label-lg hover:bg-surface-variant transition-colors" id="btn-cancel-modal" type="button">
            Hủy Bỏ
          </button>
<button className="px-6 py-2.5 rounded-full bg-primary-container text-on-primary-container font-label-lg text-label-lg hover:bg-primary transition-all shadow-md" type="submit">
            Khởi Tạo Ngay
          </button>
</div>
</form>
</div>
</div>
</div>
</main>
    </div>
  );
}
