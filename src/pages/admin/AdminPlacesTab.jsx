import { useState } from "react";

/**
 * AdminPlacesTab
 * Super Admin Screen: Danh Sách Quán (12.840) & Quản Lý Thực Đơn Niêm Yết
 * Auto-generated from Google Stitch design with full length fidelity.
 */
export default function AdminPlacesTab({ onNavigateTab }) {
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
      <main className="relative pt-18 bg-surface min-h-screen"><div className="flex flex-col w-full">
<div className="p-8 flex flex-col gap-8 max-w-[1720px] mx-auto w-full">
{/*  Top Action & Search Bar Section  */}
<div className="flex flex-col gap-6">
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
<div>
<div className="flex items-center gap-2">
<span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm uppercase tracking-wider font-extrabold">Data Governance v4.8</span>
<span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
<span className="text-on-surface-variant font-label-sm text-label-sm">Đồng bộ cơ sở dữ liệu quốc gia (12,840 nodes)</span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-surface mt-1 tracking-tight">Quản Lý Cơ Sở Dữ Liệu Quán Ăn &amp; Thực Đơn</h1>
</div>
<div className="flex flex-wrap items-center gap-3">
<button className="px-4 py-2.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md flex items-center gap-2 shadow-sm transition-all" type="button">
<span className="material-symbols-outlined text-lg text-secondary">file_download</span>
<span className="">Xuất Báo Cáo CSV/Excel</span>
</button>
<button className="px-4 py-2.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md flex items-center gap-2 shadow-sm transition-all" type="button">
<span className="material-symbols-outlined text-lg text-tertiary">neurology</span>
<span className="">Đồng Bộ Menu OCR AI</span>
</button>
<button className="px-5 py-2.5 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md flex items-center gap-2 shadow-md hover:shadow-lg transition-all" type="button">
<span className="material-symbols-outlined text-xl">add_business</span>
<span className="">Tạo Merchant Mới</span>
</button>
</div>
</div>
{/*  Quick Metrics Cards (Bento Cluster)  */}
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
<div className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm flex flex-col justify-between relative overflow-hidden">
<div className="absolute -right-4 -bottom-4 w-28 h-28 rounded-full bg-primary/5 blur-2xl pointer-events-none"></div>
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">Tổng Đối Tác Hoạt Động</span>
<span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
<span className="material-symbols-outlined text-base">store</span>
</span>
</div>
<div className="mt-4 flex items-baseline justify-between">
<div>
<div className="font-display-lg text-display-lg leading-none font-extrabold text-on-surface">12,840</div>
<div className="font-label-sm text-label-sm text-tertiary font-bold mt-1.5 flex items-center gap-1">
<span className="material-symbols-outlined text-sm font-bold">trending_up</span>
<span className="">+428 quán gia nhập tháng này</span>
</div>
</div>
{/*  Sparkline SVG  */}
<svg className="w-16 h-8 text-primary overflow-visible" fill="none" viewBox="0 0 64 24">
<path d="M1 20 Q 15 18, 25 10 T 45 12 T 63 2" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
</svg>
</div>
</div>
<div className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm flex flex-col justify-between relative overflow-hidden">
<div className="absolute -right-4 -bottom-4 w-28 h-28 rounded-full bg-tertiary/5 blur-2xl pointer-events-none"></div>
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">Mở Cửa Thực Tế (Live)</span>
<span className="w-8 h-8 rounded-full bg-tertiary/15 text-tertiary flex items-center justify-center">
<span className="material-symbols-outlined text-base">door_open</span>
</span>
</div>
<div className="mt-4 flex items-baseline justify-between">
<div>
<div className="font-display-lg text-display-lg leading-none font-extrabold text-on-surface">11,920</div>
<div className="font-label-sm text-label-sm text-on-surface-variant font-medium mt-1.5">
                Tỷ lệ mở đón khách: <strong className="text-tertiary font-bold">92.8%</strong>
</div>
</div>
{/*  Progress Ring Mini  */}
<div className="relative w-11 h-11 flex items-center justify-center">
<svg className="w-11 h-11 -rotate-90" viewBox="0 0 36 36">
<circle className="text-surface-container-high" cx="18" cy="18" fill="none" r="14" stroke="currentColor" strokeWidth="3"></circle>
<circle className="text-tertiary" cx="18" cy="18" fill="none" r="14" stroke="currentColor" strokeDasharray="87.9" strokeDashoffset="6.3" strokeLinecap="round" strokeWidth="3"></circle>
</svg>
<span className="absolute text-[10px] font-bold text-on-surface">93%</span>
</div>
</div>
</div>
<div className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm flex flex-col justify-between relative overflow-hidden">
<div className="absolute -right-4 -bottom-4 w-28 h-28 rounded-full bg-secondary/5 blur-2xl pointer-events-none"></div>
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">Menu Xác Thực Minh Bạch</span>
<span className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-base">verified</span>
</span>
</div>
<div className="mt-4 flex items-baseline justify-between">
<div>
<div className="font-display-lg text-display-lg leading-none font-extrabold text-on-surface">10,450</div>
<div className="font-label-sm text-label-sm text-secondary font-bold mt-1.5 flex items-center gap-1">
<span className="material-symbols-outlined text-sm">price_check</span>
<span className="">Chuẩn chống chặt chém 81.3%</span>
</div>
</div>
<div className="px-2.5 py-1 rounded-xl bg-secondary/10 text-secondary font-label-sm text-[11px] font-bold">
              AI Guarded
            </div>
</div>
</div>
<div className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm flex flex-col justify-between relative overflow-hidden">
<div className="absolute -right-4 -bottom-4 w-28 h-28 rounded-full bg-primary-container/10 blur-2xl pointer-events-none"></div>
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">Đang Áp Dụng Deal / Voucher</span>
<span className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
<span className="material-symbols-outlined text-base">local_offer</span>
</span>
</div>
<div className="mt-4 flex items-baseline justify-between">
<div>
<div className="font-display-lg text-display-lg leading-none font-extrabold text-on-surface">3,120</div>
<div className="font-label-sm text-label-sm text-primary font-bold mt-1.5 flex items-center gap-1">
<span className="material-symbols-outlined text-sm">local_fire_department</span>
<span className="">+12.4% GMV kích cầu du lịch</span>
</div>
</div>
<span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm font-bold">Flash Hot</span>
</div>
</div>
</div>
{/*  Advanced Omnisearch & Multi-facet Filter Container  */}
<div className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm flex flex-col gap-4">
{/*  Top Search Bar  */}
<div className="flex flex-col lg:flex-row items-center gap-3">
<div className="relative flex-1 w-full">
<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary text-2xl">search</span>
<input className="w-full h-13 pl-12 pr-28 rounded-2xl bg-surface-container-low text-on-surface placeholder:text-outline/70 font-body-md text-body-md border-0 focus:ring-2 focus:ring-primary/20 transition-all shadow-none" placeholder="Tìm theo Tên quán, Mã ID (MC-XXXX), Món signature, Chủ hộ kinh doanh, SĐT hotline, Tọa độ GPS..." type="text" value="" />
<button className="absolute right-2.5 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-primary text-white font-label-sm text-label-sm font-bold hover:bg-primary-container transition-all flex items-center gap-1.5" type="button">
<span className="material-symbols-outlined text-sm">filter_alt</span>
<span className="">Lọc Sâu</span>
</button>
</div>
<div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
<div className="flex items-center gap-2 bg-surface-container-low px-3 py-2 rounded-2xl">
<span className="material-symbols-outlined text-on-surface-variant text-base">sort</span>
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Sắp xếp:</span>
<select className="bg-transparent border-0 text-on-surface font-label-md text-label-md font-bold focus:ring-0 cursor-pointer p-0 pr-6">
<option>Lượt ghé thăm (Cao nhất)</option>
<option>Đánh giá (5 sao xuống)</option>
<option>Mới cập nhật Menu</option>
<option>Cảnh báo giá lễ hội</option>
</select>
</div>
<button className="h-11 px-3.5 rounded-2xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center gap-1 font-label-sm text-label-sm font-bold transition-all whitespace-nowrap" type="button">
<span className="material-symbols-outlined text-base">restart_alt</span>
<span className="">Xóa bộ lọc</span>
</button>
</div>
</div>
{/*  Filter Pill Clusters  */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 pt-2">
{/*  Filter 1: Khu Vực  */}
<div className="flex flex-col gap-1.5">
<label className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">Khu Vực / Tỉnh Thành</label>
<div className="relative">
<select className="w-full h-10 px-3.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm font-semibold border-0 focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer">
<option value="all">Toàn quốc (63 Tỉnh/Thành phố)</option>
<option selected="" value="hn">Hà Nội (4,320 quán)</option>
<option value="hcm">TP. Hồ Chí Minh (5,810 quán)</option>
<option value="dn">Đà Nẵng &amp; Hội An (1,290 quán)</option>
<option value="hue">Thừa Thiên Huế (610 quán)</option>
<option value="other">Khu vực khác (810 quán)</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-base">expand_more</span>
</div>
</div>
{/*  Filter 2: Phân Loại Ẩm Thực  */}
<div className="flex flex-col gap-1.5">
<label className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">Phân Loại Ẩm Thực</label>
<div className="relative">
<select className="w-full h-10 px-3.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm font-semibold border-0 focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer">
<option value="all">Tất cả phong vị &amp; chủng loại</option>
<option value="pho_bun">Món Nước, Bún, Phở, Mì</option>
<option value="lau_nuong">Lẩu &amp; Nướng Than Hoa</option>
<option value="streetfood">Ẩm Thực Đường Phố / Ăn Vặt</option>
<option value="cafe">Cà Phê, Trà &amp; Tráng Miệng</option>
<option value="regional">Đặc Sản Vùng Miền (Bắc - Trung - Nam)</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-base">expand_more</span>
</div>
</div>
{/*  Filter 3: Gói Dịch Vụ VIP  */}
<div className="flex flex-col gap-1.5">
<label className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">Cấp Độ Đối Tác (Gói VIP)</label>
<div className="relative">
<select className="w-full h-10 px-3.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm font-semibold border-0 focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer">
<option value="all">Tất cả gói đối tác</option>
<option value="diamond">VIP Kim Cương (Badge Lửa Vàng)</option>
<option value="gold">VIP Vàng (Ưu tiên bản đồ)</option>
<option value="standard">Đối Tác Chuẩn (Standard)</option>
<option value="unverified">Chưa kích hoạt / Chờ thẩm định</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-base">expand_more</span>
</div>
</div>
{/*  Filter 4: Trạng Thái Vận Hành  */}
<div className="flex flex-col gap-1.5">
<label className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">Trạng Thái Vận Hành</label>
<div className="relative">
<select className="w-full h-10 px-3.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm font-semibold border-0 focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer">
<option value="all">Tất cả trạng thái</option>
<option selected="" value="active">Đang Mở Bán Bình Thường</option>
<option value="menu_review">Có Món Chờ Duyệt Giá Mới</option>
<option value="temp_closed">Tạm Nghỉ / Bảo Trì Bếp</option>
<option value="suspended">Bị Đình Chỉ / Cảnh Báo Gian Lận</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-base">expand_more</span>
</div>
</div>
</div>
{/*  Quick Filter Tags  */}
<div className="flex items-center gap-2 flex-wrap pt-2">
<span className="font-label-sm text-[11px] text-on-surface-variant font-semibold">Bộ lọc gợi ý nhanh:</span>
<button className="px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 font-label-sm text-[11px] font-bold flex items-center gap-1 transition-all" type="button">
<span className="material-symbols-outlined text-sm">warning</span>
<span className="">Tăng giá &gt;20% ngày lễ (18 quán)</span>
</button>
<button className="px-3 py-1 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-[11px] font-bold flex items-center gap-1 transition-all" type="button">
<span className="material-symbols-outlined text-sm text-tertiary">check_circle</span>
<span className="">Đã kiểm định ATTP &amp; Menu gốc</span>
</button>
<button className="px-3 py-1 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-[11px] font-bold flex items-center gap-1 transition-all" type="button">
<span className="material-symbols-outlined text-sm text-secondary">workspace_premium</span>
<span className="">Top 100 Michelin Selected VN</span>
</button>
<button className="px-3 py-1 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-[11px] font-bold flex items-center gap-1 transition-all" type="button">
<span className="material-symbols-outlined text-sm text-primary">notifications_active</span>
<span className="">Chờ cập nhật ảnh món HQ (42)</span>
</button>
</div>
</div>
</div>
{/*  Main Workspace: Master Table & Quick Inspector Split Layout  */}
<div className="grid grid-cols-1 2xl:grid-cols-12 gap-8 items-start">
{/*  Left / Center: Master Table (Spans 8 columns on large screens)  */}
<div className="2xl:col-span-8 flex flex-col gap-4">
<div className="bg-surface-container-lowest rounded-3xl shadow-sm overflow-hidden flex flex-col">
{/*  Table Header Utility  */}
<div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-low/40">
<div className="flex items-center gap-3">
<span className="font-headline-sm text-headline-sm text-on-surface">Danh Sách Đối Tác Quán Ăn</span>
<span className="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-[11px] font-extrabold">Đang hiển thị 1-6 trên 12,840</span>
</div>
<div className="flex items-center gap-2">
<button className="w-9 h-9 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-all" title="Làm mới dữ liệu">
<span className="material-symbols-outlined text-base">refresh</span>
</button>
<button className="w-9 h-9 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-all" title="Tuỳ biến cột dữ liệu">
<span className="material-symbols-outlined text-base">view_column</span>
</button>
<div className="flex items-center gap-1 ml-2">
<button className="px-2.5 py-1 rounded-lg bg-surface-container-high font-label-sm text-label-sm font-bold text-on-surface">1</button>
<button className="px-2.5 py-1 rounded-lg hover:bg-surface-container-high font-label-sm text-label-sm font-bold text-on-surface-variant">2</button>
<button className="px-2.5 py-1 rounded-lg hover:bg-surface-container-high font-label-sm text-label-sm font-bold text-on-surface-variant">3</button>
<span className="text-on-surface-variant text-xs">...</span>
<button className="px-2.5 py-1 rounded-lg hover:bg-surface-container-high font-label-sm text-label-sm font-bold text-on-surface-variant">2,140</button>
</div>
</div>
</div>
{/*  Master Data Table Container  */}
<div className="overflow-x-auto w-full">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-[11px] uppercase tracking-wider font-bold">
<th className="py-3.5 px-4 w-12 text-center">
<input className="rounded text-primary focus:ring-primary/30" type="checkbox" />
</th>
<th className="py-3.5 px-4 min-w-[240px]">Nhà Hàng &amp; Định Danh</th>
<th className="py-3.5 px-4 min-w-[170px]">Chủ Quán &amp; Hotline</th>
<th className="py-3.5 px-4 min-w-[210px]">Địa Chỉ &amp; GPS Radar</th>
<th className="py-3.5 px-4 min-w-[130px]">Gói Dịch Vụ</th>
<th className="py-3.5 px-4 min-w-[140px] text-right">Menu &amp; Giá Trung Bình</th>
<th className="py-3.5 px-4 min-w-[110px] text-center">Đánh Giá</th>
<th className="py-3.5 px-4 min-w-[120px] text-right">Traffic Tháng</th>
<th className="py-3.5 px-4 min-w-[90px] text-center">Trạng Thái</th>
<th className="py-3.5 px-4 w-28 text-center sticky right-0 bg-surface-container-low">Thao Tác</th>
</tr>
</thead>
<tbody className="font-body-sm text-body-sm divide-y-0">
{/*  Row 1: Lẩu Cua Đồng 68 (Selected by default)  */}
<tr className="bg-surface-container-low/70 hover:bg-surface-container transition-all cursor-pointer group" onclick="selectMerchant('MC-HN-0068')">
<td className="py-3.5 px-4 text-center">
<input checked="" className="rounded text-primary focus:ring-primary/30" type="checkbox" />
</td>
<td className="py-3.5 px-4">
<div className="flex items-center gap-3">
<img className="w-12 h-12 rounded-2xl object-cover shadow-sm ring-2 ring-primary/40" data-alt="Nồi lẩu riêu cua đồng truyền thống Hà Nội sôi sùng sục đầy ắp gạch cua vàng óng, thịt bò tái hoa chuối tươi xanh trong quán ăn ấm cúng phong cách phố cổ" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-b1u9JQciiJAtYmN48REx2RSnU9dHJY2l5fRzBoFsnffdo_2SuwNKF8DMXmuE-2mbYVsX4PXx8OmbqycfvUMcA4e59dUWCI9DpFH7-2KQ0GxDS36JIe80wmPTmdXPqp2tOvlT-n8k1lUajuVNiWHmtNuzDG6IbgzLVtSpVCbmuusTGw_KvA2jBISF39hG1b4PC8ocpLOFebGs5Lg_SOjeLwZGeJyVVRwHu6W9yi4" />
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-1.5">
<span className="font-headline-sm text-headline-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">Lẩu Cua Đồng 68</span>
<span className="material-symbols-outlined text-primary text-base" title="Đã xác thực giấy phép ATTP">verified</span>
</div>
<div className="flex items-center gap-2 mt-0.5">
<span className="font-label-sm text-[11px] font-bold text-primary px-1.5 py-0.2 rounded bg-primary/10">MC-HN-0068</span>
<span className="text-on-surface-variant text-[11px]">Lẩu &amp; Ẩm Thực Bắc</span>
</div>
</div>
</div>
</td>
<td className="py-3.5 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold text-on-surface">Vũ Trọng Hưng</span>
<span className="text-on-surface-variant font-label-sm text-xs mt-0.5">0912 886 428</span>
<span className="text-[10px] text-tertiary font-semibold flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>Đã xác thực CCCD
                      </span>
</div>
</td>
<td className="py-3.5 px-4">
<div className="flex flex-col">
<span className="font-body-sm text-body-sm text-on-surface line-clamp-1">68 Mã Mây, Hàng Buồm, Hoàn Kiếm</span>
<div className="flex items-center gap-1 text-[11px] text-on-surface-variant mt-0.5">
<span className="material-symbols-outlined text-xs text-primary">location_on</span>
<span className="">21.0345° N, 105.8522° E</span>
</div>
</div>
</td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[11px] font-extrabold shadow-sm">
<span className="material-symbols-outlined text-sm text-secondary">diamond</span>
<span className="">VIP Kim Cương</span>
</span>
</td>
<td className="py-3.5 px-4 text-right">
<div className="flex flex-col items-end">
<span className="font-label-md text-label-md font-bold text-on-surface">42 món niêm yết</span>
<span className="font-label-sm text-[11px] text-secondary font-bold">~ 285.000 đ/người</span>
<span className="text-[10px] text-tertiary">Khớp chuẩn 100% bill</span>
</div>
</td>
<td className="py-3.5 px-4 text-center">
<div className="flex flex-col items-center">
<div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed-dim/30 text-on-surface font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-sm text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
<span className="">4.85</span>
</div>
<span className="text-[11px] text-on-surface-variant mt-0.5">1,420 đánh giá</span>
</div>
</td>
<td className="py-3.5 px-4 text-right">
<div className="flex flex-col items-end">
<span className="font-label-md text-label-md font-extrabold text-on-surface">18,420 lượt</span>
<span className="text-[11px] text-tertiary font-bold">+18.2% MoM</span>
</div>
</td>
<td className="py-3.5 px-4 text-center">
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" />
<div className="w-10 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-container-high after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tertiary"></div>
</label>
</td>
<td className="py-3.5 px-4 text-center sticky right-0 bg-surface-container-low/70">
<div className="flex items-center justify-center gap-1">
<button className="w-8 h-8 rounded-xl bg-surface-container hover:bg-primary hover:text-white text-on-surface-variant flex items-center justify-center transition-all" title="Xem chi tiết thực đơn">
<span className="material-symbols-outlined text-base">restaurant_menu</span>
</button>
<button className="w-8 h-8 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-all" title="Sửa thông tin đối tác">
<span className="material-symbols-outlined text-base">edit</span>
</button>
<button className="w-8 h-8 rounded-xl bg-surface-container hover:bg-error-container hover:text-error text-on-surface-variant flex items-center justify-center transition-all" title="Đình chỉ hoặc khóa">
<span className="material-symbols-outlined text-base">block</span>
</button>
</div>
</td>
</tr>
{/*  Row 2: Cơm Tấm Ba Ghiền  */}
<tr className="hover:bg-surface-container/60 transition-all cursor-pointer group" onclick="selectMerchant('MC-SG-1029')">
<td className="py-3.5 px-4 text-center">
<input className="rounded text-primary focus:ring-primary/30" type="checkbox" />
</td>
<td className="py-3.5 px-4">
<div className="flex items-center gap-3">
<img className="w-12 h-12 rounded-2xl object-cover shadow-sm" data-alt="Đĩa cơm tấm sườn bì chả Sài Gòn truyền thống miếng sườn nướng mỡ hành óng ả than hoa thơm lừng hạt tấm tơi mịn màng" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj4JStHUIAp3bjhKYFqqyt26jy3gyMo8m3nmzQXoP8FKkBVRFMNebjB1ogkwMM4uliUQHH9ZTrLM07vz_zwFp97IeCALcq3u2BZTXV2CYB1jLoqjI0aRi1Hiw81nOf2CghUVRrc6f3fumbJCYZ575O9T_BJxCbGNYqNgycME19FAFkUG1DvJhjZa1d1o_jITbXx92xRONPuUaSGqxaEtXxfOSYQN4IohlvVyNjz14" />
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-1.5">
<span className="font-headline-sm text-headline-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">Cơm Tấm Ba Ghiền</span>
<span className="material-symbols-outlined text-tertiary text-base" title="Michelin Bib Gourmand">workspace_premium</span>
</div>
<div className="flex items-center gap-2 mt-0.5">
<span className="font-label-sm text-[11px] font-bold text-primary px-1.5 py-0.2 rounded bg-primary/10">MC-SG-1029</span>
<span className="text-on-surface-variant text-[11px]">Cơm Tấm Truyền Thống</span>
</div>
</div>
</div>
</td>
<td className="py-3.5 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold text-on-surface">Nguyễn Văn Ghiền</span>
<span className="text-on-surface-variant font-label-sm text-xs mt-0.5">0903 119 220</span>
<span className="text-[10px] text-tertiary font-semibold flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>Pháp nhân hộ KD
                      </span>
</div>
</td>
<td className="py-3.5 px-4">
<div className="flex flex-col">
<span className="font-body-sm text-body-sm text-on-surface line-clamp-1">84 Đặng Văn Ngữ, P.10, Phú Nhuận</span>
<div className="flex items-center gap-1 text-[11px] text-on-surface-variant mt-0.5">
<span className="material-symbols-outlined text-xs text-primary">location_on</span>
<span className="">10.7924° N, 106.6711° E</span>
</div>
</div>
</td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[11px] font-extrabold shadow-sm">
<span className="material-symbols-outlined text-sm text-secondary">diamond</span>
<span className="">VIP Kim Cương</span>
</span>
</td>
<td className="py-3.5 px-4 text-right">
<div className="flex flex-col items-end">
<span className="font-label-md text-label-md font-bold text-on-surface">19 món niêm yết</span>
<span className="font-label-sm text-[11px] text-secondary font-bold">~ 95.000 đ/phần</span>
<span className="text-[10px] text-tertiary">Không phụ thu lễ</span>
</div>
</td>
<td className="py-3.5 px-4 text-center">
<div className="flex flex-col items-center">
<div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed-dim/30 text-on-surface font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-sm text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
<span className="">4.72</span>
</div>
<span className="text-[11px] text-on-surface-variant mt-0.5">4,890 đánh giá</span>
</div>
</td>
<td className="py-3.5 px-4 text-right">
<div className="flex flex-col items-end">
<span className="font-label-md text-label-md font-extrabold text-on-surface">32,800 lượt</span>
<span className="text-[11px] text-tertiary font-bold">+24.5% MoM</span>
</div>
</td>
<td className="py-3.5 px-4 text-center">
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" />
<div className="w-10 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-container-high after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tertiary"></div>
</label>
</td>
<td className="py-3.5 px-4 text-center sticky right-0 bg-surface-container-lowest">
<div className="flex items-center justify-center gap-1">
<button className="w-8 h-8 rounded-xl bg-surface-container hover:bg-primary hover:text-white text-on-surface-variant flex items-center justify-center transition-all" title="Xem chi tiết thực đơn">
<span className="material-symbols-outlined text-base">restaurant_menu</span>
</button>
<button className="w-8 h-8 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-all" title="Sửa thông tin đối tác">
<span className="material-symbols-outlined text-base">edit</span>
</button>
<button className="w-8 h-8 rounded-xl bg-surface-container hover:bg-error-container hover:text-error text-on-surface-variant flex items-center justify-center transition-all" title="Đình chỉ hoặc khóa">
<span className="material-symbols-outlined text-base">block</span>
</button>
</div>
</td>
</tr>
{/*  Row 3: Bún Bò Huế O Mai  */}
<tr className="hover:bg-surface-container/60 transition-all cursor-pointer group" onclick="selectMerchant('MC-HN-0412')">
<td className="py-3.5 px-4 text-center">
<input className="rounded text-primary focus:ring-primary/30" type="checkbox" />
</td>
<td className="py-3.5 px-4">
<div className="flex items-center gap-3">
<img className="w-12 h-12 rounded-2xl object-cover shadow-sm" data-alt="Tô bún bò Huế đậm đà nước dùng thơm ngát mùi sả và mắm ruốc, móng giò mềm múp, tiết luộc và chả cua nồng ấm trong bát sành thủ công" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH57Fcy-4EJz4dFRyyPqpxYLzTGkIkGR25xZBHXLtsgrEnLef8AIp5TRzhikrg2GQFQcCOfgRXkhEN16dxyU-4yj60U0_Nglojrqy7Z4Jo8d8xZl4jPVOPlOEULRdS_YD1soEMa48QEGOxnriWn4ciKZNTLUt51ATb6J6XdP5iQQBQ8JSqszR1cnj_PHyNv6jdqmqZLNDgGQoxRQv74VRboQ9J4pAeo2yxEcq3-Gg" />
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-1.5">
<span className="font-headline-sm text-headline-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">Bún Bò Huế O Mai</span>
<span className="material-symbols-outlined text-primary text-base">verified</span>
</div>
<div className="flex items-center gap-2 mt-0.5">
<span className="font-label-sm text-[11px] font-bold text-primary px-1.5 py-0.2 rounded bg-primary/10">MC-HN-0412</span>
<span className="text-on-surface-variant text-[11px]">Đặc Sản Miền Trung</span>
</div>
</div>
</div>
</td>
<td className="py-3.5 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold text-on-surface">Lê Thị Mai O</span>
<span className="text-on-surface-variant font-label-sm text-xs mt-0.5">0983 234 888</span>
<span className="text-[10px] text-tertiary font-semibold flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>Đã cấp phép ATTP
                      </span>
</div>
</td>
<td className="py-3.5 px-4">
<div className="flex flex-col">
<span className="font-body-sm text-body-sm text-on-surface line-clamp-1">112 Trần Đăng Ninh, Dịch Vọng, Cầu Giấy</span>
<div className="flex items-center gap-1 text-[11px] text-on-surface-variant mt-0.5">
<span className="material-symbols-outlined text-xs text-primary">location_on</span>
<span className="">21.0392° N, 105.7925° E</span>
</div>
</div>
</td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed-dim/40 text-secondary font-label-sm text-[11px] font-bold">
<span className="material-symbols-outlined text-sm">stars</span>
<span className="">VIP Vàng</span>
</span>
</td>
<td className="py-3.5 px-4 text-right">
<div className="flex flex-col items-end">
<span className="font-label-md text-label-md font-bold text-on-surface">15 món niêm yết</span>
<span className="font-label-sm text-[11px] text-secondary font-bold">~ 60.000 đ/tô</span>
<span className="text-[10px] text-primary font-bold">1 món chờ duyệt giá</span>
</div>
</td>
<td className="py-3.5 px-4 text-center">
<div className="flex flex-col items-center">
<div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed-dim/30 text-on-surface font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-sm text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
<span className="">4.68</span>
</div>
<span className="text-[11px] text-on-surface-variant mt-0.5">920 đánh giá</span>
</div>
</td>
<td className="py-3.5 px-4 text-right">
<div className="flex flex-col items-end">
<span className="font-label-md text-label-md font-extrabold text-on-surface">11,250 lượt</span>
<span className="text-[11px] text-tertiary font-bold">+9.1% MoM</span>
</div>
</td>
<td className="py-3.5 px-4 text-center">
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" />
<div className="w-10 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-container-high after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tertiary"></div>
</label>
</td>
<td className="py-3.5 px-4 text-center sticky right-0 bg-surface-container-lowest">
<div className="flex items-center justify-center gap-1">
<button className="w-8 h-8 rounded-xl bg-surface-container hover:bg-primary hover:text-white text-on-surface-variant flex items-center justify-center transition-all" title="Xem chi tiết thực đơn">
<span className="material-symbols-outlined text-base">restaurant_menu</span>
</button>
<button className="w-8 h-8 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-all" title="Sửa thông tin đối tác">
<span className="material-symbols-outlined text-base">edit</span>
</button>
<button className="w-8 h-8 rounded-xl bg-surface-container hover:bg-error-container hover:text-error text-on-surface-variant flex items-center justify-center transition-all" title="Đình chỉ hoặc khóa">
<span className="material-symbols-outlined text-base">block</span>
</button>
</div>
</td>
</tr>
{/*  Row 4: Dim Tu Tac Saigon  */}
<tr className="hover:bg-surface-container/60 transition-all cursor-pointer group" onclick="selectMerchant('MC-SG-0088')">
<td className="py-3.5 px-4 text-center">
<input className="rounded text-primary focus:ring-primary/30" type="checkbox" />
</td>
<td className="py-3.5 px-4">
<div className="flex items-center gap-3">
<img className="w-12 h-12 rounded-2xl object-cover shadow-sm" data-alt="Xửng hấp dimsum bằng tre bốc khói nghi ngút với há cảo tôm sò điệp vỏ trong suốt tinh xảo bánh bao kim sa vàng óng trong nhà hàng ẩm thực Quảng Đông cao cấp" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWJqilE0XDR9B0qL2Mp-PSedEzpUfFoDm-ivSP5qas4YUmvaFKI2sjKwSS8ki3eE4NHWpOpbWSGy06_A4dt5-8t2ZjJAXIs6FsvWFOH0ZOZDACliyxtRAm0Y26XIsyrrXmJwr9eRCxPSmD33snpecHvAIDkbDtyssm_k13cqPCDw_-K1E7vPcn7F6evX4x1qxmAcLHVCxa9CjyUYiQGAKtJyUC_AVnNW5pgw5HyP4" />
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-1.5">
<span className="font-headline-sm text-headline-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">Dim Tu Tac Saigon</span>
<span className="material-symbols-outlined text-secondary text-base">star</span>
</div>
<div className="flex items-center gap-2 mt-0.5">
<span className="font-label-sm text-[11px] font-bold text-primary px-1.5 py-0.2 rounded bg-primary/10">MC-SG-0088</span>
<span className="text-on-surface-variant text-[11px]">Ẩm Thực Trung Hoa</span>
</div>
</div>
</div>
</td>
<td className="py-3.5 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold text-on-surface">Cty TNHH DT Food VN</span>
<span className="text-on-surface-variant font-label-sm text-xs mt-0.5">028 3826 6668</span>
<span className="text-[10px] text-tertiary font-semibold flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>Chuỗi Doanh Nghiệp
                      </span>
</div>
</td>
<td className="py-3.5 px-4">
<div className="flex flex-col">
<span className="font-body-sm text-body-sm text-on-surface line-clamp-1">55 Đông Du, P. Bến Nghé, Quận 1</span>
<div className="flex items-center gap-1 text-[11px] text-on-surface-variant mt-0.5">
<span className="material-symbols-outlined text-xs text-primary">location_on</span>
<span className="">10.7761° N, 106.7052° E</span>
</div>
</div>
</td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[11px] font-extrabold shadow-sm">
<span className="material-symbols-outlined text-sm text-secondary">diamond</span>
<span className="">VIP Kim Cương</span>
</span>
</td>
<td className="py-3.5 px-4 text-right">
<div className="flex flex-col items-end">
<span className="font-label-md text-label-md font-bold text-on-surface">118 món niêm yết</span>
<span className="font-label-sm text-[11px] text-secondary font-bold">~ 480.000 đ/người</span>
<span className="text-[10px] text-tertiary">VAT Niêm Yết Đầy Đủ</span>
</div>
</td>
<td className="py-3.5 px-4 text-center">
<div className="flex flex-col items-center">
<div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed-dim/30 text-on-surface font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-sm text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
<span className="">4.91</span>
</div>
<span className="text-[11px] text-on-surface-variant mt-0.5">3,210 đánh giá</span>
</div>
</td>
<td className="py-3.5 px-4 text-right">
<div className="flex flex-col items-end">
<span className="font-label-md text-label-md font-extrabold text-on-surface">26,500 lượt</span>
<span className="text-[11px] text-tertiary font-bold">+15.8% MoM</span>
</div>
</td>
<td className="py-3.5 px-4 text-center">
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" />
<div className="w-10 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-container-high after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tertiary"></div>
</label>
</td>
<td className="py-3.5 px-4 text-center sticky right-0 bg-surface-container-lowest">
<div className="flex items-center justify-center gap-1">
<button className="w-8 h-8 rounded-xl bg-surface-container hover:bg-primary hover:text-white text-on-surface-variant flex items-center justify-center transition-all" title="Xem chi tiết thực đơn">
<span className="material-symbols-outlined text-base">restaurant_menu</span>
</button>
<button className="w-8 h-8 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-all" title="Sửa thông tin đối tác">
<span className="material-symbols-outlined text-base">edit</span>
</button>
<button className="w-8 h-8 rounded-xl bg-surface-container hover:bg-error-container hover:text-error text-on-surface-variant flex items-center justify-center transition-all" title="Đình chỉ hoặc khóa">
<span className="material-symbols-outlined text-base">block</span>
</button>
</div>
</td>
</tr>
{/*  Row 5: Cà Phê Trứng Giảng  */}
<tr className="hover:bg-surface-container/60 transition-all cursor-pointer group" onclick="selectMerchant('MC-HN-0039')">
<td className="py-3.5 px-4 text-center">
<input className="rounded text-primary focus:ring-primary/30" type="checkbox" />
</td>
<td className="py-3.5 px-4">
<div className="flex items-center gap-3">
<img className="w-12 h-12 rounded-2xl object-cover shadow-sm" data-alt="Cốc cà phê trứng Giảng cổ kính đặt trong bát nước nóng giữ ấm, lớp bọt trứng đánh bông mịn vàng kem sánh quyện lớp cà phê đậm đặc Hà Nội xưa" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUOUBiTVTD3fyeLammNjbUhLnRIgwoHnuThO2O8XjnOIdB6js5obKeWbbhpgyoqNOUUeYF5bwmncQlmwOg2tz4iShzPkY1NMbbI_V1cnRDYtGlS63F_QMF5KyN35hOXRb98roCV3AYLD3Knay9Vyv6xz9AWX0hW462bxX3zsDMgMnmjgNDjLtqkW3UjKcNjMLgU3zbOSfJ3dkw-H8lNXCchN2RFxMWriB8bxyNrWE" />
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-1.5">
<span className="font-headline-sm text-headline-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">Cà Phê Trứng Giảng</span>
<span className="material-symbols-outlined text-primary text-base">verified</span>
</div>
<div className="flex items-center gap-2 mt-0.5">
<span className="font-label-sm text-[11px] font-bold text-primary px-1.5 py-0.2 rounded bg-primary/10">MC-HN-0039</span>
<span className="text-on-surface-variant text-[11px]">Cà Phê Di Sản Hà Nội</span>
</div>
</div>
</div>
</td>
<td className="py-3.5 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold text-on-surface">Nguyễn Trí Hòa</span>
<span className="text-on-surface-variant font-label-sm text-xs mt-0.5">0917 222 284</span>
<span className="text-[10px] text-tertiary font-semibold flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>Thương hiệu bảo hộ
                      </span>
</div>
</td>
<td className="py-3.5 px-4">
<div className="flex flex-col">
<span className="font-body-sm text-body-sm text-on-surface line-clamp-1">39 Nguyễn Hữu Huân, Lý Thái Tổ, Hoàn Kiếm</span>
<div className="flex items-center gap-1 text-[11px] text-on-surface-variant mt-0.5">
<span className="material-symbols-outlined text-xs text-primary">location_on</span>
<span className="">21.0329° N, 105.8549° E</span>
</div>
</div>
</td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[11px] font-extrabold shadow-sm">
<span className="material-symbols-outlined text-sm text-secondary">diamond</span>
<span className="">VIP Kim Cương</span>
</span>
</td>
<td className="py-3.5 px-4 text-right">
<div className="flex flex-col items-end">
<span className="font-label-md text-label-md font-bold text-on-surface">24 món đồ uống</span>
<span className="font-label-sm text-[11px] text-secondary font-bold">~ 40.000 đ/ly</span>
<span className="text-[10px] text-tertiary">Bình ổn giá 3 năm</span>
</div>
</td>
<td className="py-3.5 px-4 text-center">
<div className="flex flex-col items-center">
<div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed-dim/30 text-on-surface font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-sm text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
<span className="">4.79</span>
</div>
<span className="text-[11px] text-on-surface-variant mt-0.5">8,950 đánh giá</span>
</div>
</td>
<td className="py-3.5 px-4 text-right">
<div className="flex flex-col items-end">
<span className="font-label-md text-label-md font-extrabold text-on-surface">45,120 lượt</span>
<span className="text-[11px] text-tertiary font-bold">+31.2% MoM</span>
</div>
</td>
<td className="py-3.5 px-4 text-center">
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" />
<div className="w-10 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-container-high after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tertiary"></div>
</label>
</td>
<td className="py-3.5 px-4 text-center sticky right-0 bg-surface-container-lowest">
<div className="flex items-center justify-center gap-1">
<button className="w-8 h-8 rounded-xl bg-surface-container hover:bg-primary hover:text-white text-on-surface-variant flex items-center justify-center transition-all" title="Xem chi tiết thực đơn">
<span className="material-symbols-outlined text-base">restaurant_menu</span>
</button>
<button className="w-8 h-8 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-all" title="Sửa thông tin đối tác">
<span className="material-symbols-outlined text-base">edit</span>
</button>
<button className="w-8 h-8 rounded-xl bg-surface-container hover:bg-error-container hover:text-error text-on-surface-variant flex items-center justify-center transition-all" title="Đình chỉ hoặc khóa">
<span className="material-symbols-outlined text-base">block</span>
</button>
</div>
</td>
</tr>
{/*  Row 6: Mì Quảng Bà Mua  */}
<tr className="hover:bg-surface-container/60 transition-all cursor-pointer group" onclick="selectMerchant('MC-DN-0195')">
<td className="py-3.5 px-4 text-center">
<input className="rounded text-primary focus:ring-primary/30" type="checkbox" />
</td>
<td className="py-3.5 px-4">
<div className="flex items-center gap-3">
<img className="w-12 h-12 rounded-2xl object-cover shadow-sm" data-alt="Bát mì Quảng ếch và gà ta sợi mì vàng nghệ dẻo mềm cùng rau sống búp chuối bánh tráng nướng giòn rụm tại quán ăn miền Trung" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3ioEdognOyAs1dXeTA4rE0eV6H92ue1ecmTckTKoe-lBSIFIYJR77faZf7bsX6PuPpU5Yeg8co6ohDTY8x8ykoOXtIedK9meqx8e_mGmy8HpU4r0-2UhoScimt5l5zL6bYfe7ncFlO1vu6vS99X6eR7SsY7cIZgkCcZfYsqih97-_SHsGLkb37JL4ygN6vXtrAtbymNu40IqfcL7rbep9sl1erjMOOLrmprCENvU" />
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-1.5">
<span className="font-headline-sm text-headline-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">Mì Quảng Bà Mua</span>
<span className="material-symbols-outlined text-primary text-base">verified</span>
</div>
<div className="flex items-center gap-2 mt-0.5">
<span className="font-label-sm text-[11px] font-bold text-primary px-1.5 py-0.2 rounded bg-primary/10">MC-DN-0195</span>
<span className="text-on-surface-variant text-[11px]">Đặc Sản Xứ Quảng</span>
</div>
</div>
</div>
</td>
<td className="py-3.5 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold text-on-surface">Trần Thị Mua</span>
<span className="text-on-surface-variant font-label-sm text-xs mt-0.5">0905 385 686</span>
<span className="text-[10px] text-tertiary font-semibold flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>Đã xác minh GPS
                      </span>
</div>
</td>
<td className="py-3.5 px-4">
<div className="flex flex-col">
<span className="font-body-sm text-body-sm text-on-surface line-clamp-1">19 Trần Bình Trọng, Hải Châu, Đà Nẵng</span>
<div className="flex items-center gap-1 text-[11px] text-on-surface-variant mt-0.5">
<span className="material-symbols-outlined text-xs text-primary">location_on</span>
<span className="">16.0645° N, 108.2201° E</span>
</div>
</div>
</td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-[11px] font-bold">
<span className="material-symbols-outlined text-sm text-on-surface-variant">storefront</span>
<span className="">Tiêu Chuẩn</span>
</span>
</td>
<td className="py-3.5 px-4 text-right">
<div className="flex flex-col items-end">
<span className="font-label-md text-label-md font-bold text-on-surface">18 món niêm yết</span>
<span className="font-label-sm text-[11px] text-secondary font-bold">~ 55.000 đ/tô</span>
<span className="text-[10px] text-tertiary">Menu đồng bộ thẻ</span>
</div>
</td>
<td className="py-3.5 px-4 text-center">
<div className="flex flex-col items-center">
<div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed-dim/30 text-on-surface font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-sm text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
<span className="">4.64</span>
</div>
<span className="text-[11px] text-on-surface-variant mt-0.5">2,110 đánh giá</span>
</div>
</td>
<td className="py-3.5 px-4 text-right">
<div className="flex flex-col items-end">
<span className="font-label-md text-label-md font-extrabold text-on-surface">14,900 lượt</span>
<span className="text-[11px] text-tertiary font-bold">+11.3% MoM</span>
</div>
</td>
<td className="py-3.5 px-4 text-center">
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" />
<div className="w-10 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-container-high after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tertiary"></div>
</label>
</td>
<td className="py-3.5 px-4 text-center sticky right-0 bg-surface-container-lowest">
<div className="flex items-center justify-center gap-1">
<button className="w-8 h-8 rounded-xl bg-surface-container hover:bg-primary hover:text-white text-on-surface-variant flex items-center justify-center transition-all" title="Xem chi tiết thực đơn">
<span className="material-symbols-outlined text-base">restaurant_menu</span>
</button>
<button className="w-8 h-8 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-all" title="Sửa thông tin đối tác">
<span className="material-symbols-outlined text-base">edit</span>
</button>
<button className="w-8 h-8 rounded-xl bg-surface-container hover:bg-error-container hover:text-error text-on-surface-variant flex items-center justify-center transition-all" title="Đình chỉ hoặc khóa">
<span className="material-symbols-outlined text-base">block</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
{/*  Table Footer Pagination Bar  */}
<div className="p-4 bg-surface-container-low/40 flex flex-col sm:flex-row items-center justify-between gap-3 font-body-sm text-body-sm text-on-surface-variant">
<div className="flex items-center gap-2">
<span className="">Đang hiển thị dòng:</span>
<select className="rounded-xl bg-surface-container px-3 py-1 font-bold text-on-surface border-0 focus:ring-0 text-xs cursor-pointer">
<option>6 / trang</option>
<option>25 / trang</option>
<option>50 / trang</option>
<option>100 / trang</option>
</select>
<span className="">trên tổng số <strong>12,840</strong> nhà hàng toàn quốc</span>
</div>
<div className="flex items-center gap-1.5">
<button className="w-8 h-8 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface disabled:opacity-40" disabled="">
<span className="material-symbols-outlined text-base">chevron_left</span>
</button>
<button className="w-8 h-8 rounded-xl bg-primary text-white font-bold text-xs">1</button>
<button className="w-8 h-8 rounded-xl hover:bg-surface-container font-bold text-xs text-on-surface">2</button>
<button className="w-8 h-8 rounded-xl hover:bg-surface-container font-bold text-xs text-on-surface">3</button>
<span className="px-1 text-xs">...</span>
<button className="w-8 h-8 rounded-xl hover:bg-surface-container font-bold text-xs text-on-surface">2,140</button>
<button className="w-8 h-8 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface">
<span className="material-symbols-outlined text-base">chevron_right</span>
</button>
</div>
</div>
</div>
{/*  System Audit Log Snippet for Merchants  */}
<div className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm flex flex-col gap-3">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-xl">history_edu</span>
<span className="font-headline-sm text-headline-sm text-on-surface">Audit Trail Hoạt Động &amp; Điều Chỉnh Giá Niêm Yết</span>
</div>
<span className="font-label-sm text-label-sm text-tertiary font-bold flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
              Live Event Listener
            </span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
<div className="p-3 rounded-2xl bg-surface-container-low flex flex-col gap-1">
<div className="flex items-center justify-between text-[11px] font-label-sm text-on-surface-variant">
<span className="">Vừa xong (10:42 AM)</span>
<span className="text-tertiary font-bold">Auto Approved</span>
</div>
<div className="font-label-md text-label-md font-bold text-on-surface">Cơm Tấm Ba Ghiền (MC-SG-1029)</div>
<p className="text-[12px] text-on-surface-variant leading-snug">Cập nhật ảnh 4K món "Chả Trứng Hấp Đặc Biệt", OCR kiểm duyệt khớp giá 25.000đ.</p>
</div>
<div className="p-3 rounded-2xl bg-surface-container-low flex flex-col gap-1">
<div className="flex items-center justify-between text-[11px] font-label-sm text-on-surface-variant">
<span className="">15 phút trước</span>
<span className="text-primary font-bold">AI Flag Tripped</span>
</div>
<div className="font-label-md text-label-md font-bold text-on-surface">Bún Bò Huế O Mai (MC-HN-0412)</div>
<p className="text-[12px] text-on-surface-variant leading-snug">Yêu cầu tăng giá "Tô Đặc Biệt Khổng Lồ" từ 65K lên 85K (+30.7%). Đã chuyển queue duyệt thủ công.</p>
</div>
<div className="p-3 rounded-2xl bg-surface-container-low flex flex-col gap-1">
<div className="flex items-center justify-between text-[11px] font-label-sm text-on-surface-variant">
<span className="">42 phút trước</span>
<span className="text-secondary font-bold">KYC Verified</span>
</div>
<div className="font-label-md text-label-md font-bold text-on-surface">Lẩu Cua Đồng 68 (MC-HN-0068)</div>
<p className="text-[12px] text-on-surface-variant leading-snug">Gia hạn thành công chứng nhận Vệ Sinh An Toàn Thực Phẩm định kỳ năm 2025.</p>
</div>
</div>
</div>
</div>
{/*  Right Column: Quick Menu Inspector & Price Fluctuation Sentinel (Spans 4 columns)  */}
<div className="2xl:col-span-4 flex flex-col gap-5 sticky top-22">
{/*  Inspector Card  */}
<div className="bg-surface-container-lowest rounded-3xl p-6 shadow-md flex flex-col gap-5 relative overflow-hidden">
{/*  Ambient Glow decoration  */}
<div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none"></div>
{/*  Inspector Header  */}
<div className="flex items-start justify-between">
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-[11px] font-extrabold uppercase tracking-wide">Live Menu Inspector</span>
<span className="w-2 h-2 rounded-full bg-tertiary"></span>
</div>
<h2 className="font-headline-md text-headline-md text-on-surface font-extrabold mt-1">Lẩu Cua Đồng 68</h2>
<span className="text-on-surface-variant text-xs">Mã quán: <strong>MC-HN-0068</strong> • 68 Mã Mây, Hoàn Kiếm, HN</span>
</div>
<div className="flex items-center gap-1.5">
<button className="w-9 h-9 rounded-2xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant flex items-center justify-center transition-all" title="Xem full màn hình">
<span className="material-symbols-outlined text-lg">open_in_new</span>
</button>
</div>
</div>
{/*  AI Anti-Price-Gouging Shield Banner  */}
<div className="rounded-2xl bg-secondary-fixed/40 p-3.5 flex items-start gap-3 shadow-xs">
<span className="material-symbols-outlined text-secondary text-2xl flex-shrink-0 mt-0.5">shield_with_heart</span>
<div className="flex flex-col text-xs leading-relaxed">
<span className="font-label-md text-label-md font-bold text-on-secondary-container">Bộ Lọc Chống Tăng Giá Ngày Lễ (AI Guard)</span>
<span className="text-on-secondary-variant mt-0.5">Giá tất cả 42 món đang niêm yết trùng khớp 100% với bảng hóa đơn chụp tại quán. Không phát hiện biến động &gt;5% trong 90 ngày qua.</span>
</div>
</div>
{/*  Signature Dishes Interactive List  */}
<div className="flex flex-col gap-3">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md uppercase tracking-wider font-extrabold text-on-surface">Món Ăn Nổi Bật &amp; Niêm Yết</span>
<span className="font-label-sm text-[11px] text-primary font-bold">42 Món Có Sẵn</span>
</div>
{/*  Dish Item 1  */}
<div className="p-3.5 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-all flex items-center justify-between gap-3">
<div className="flex items-center gap-3 min-w-0">
<img className="w-13 h-13 rounded-xl object-cover flex-shrink-0" data-alt="Nồi lẩu riêu cua bắp bò sườn sụn thơm nức bắp bò đỏ au hoa chuối tươi xanh chanh ớt" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvXc7HX8k4BixIcyscdL8-3AihifXyjCxZQu7kCIIhd9-NnPwYbmx6DNe8PmIKE0lHbe0ibDoXWyJmlIc2xNNQ1KN9zPp4FM0ybf1IYbzCVYKvzATmB6_Dt8FkLYw2nYEDnoVLvjcpgLIs-2jpYcPt4agVtjHiAMtsbDgfdQz-9QStqyt_uzhoZjSaIRCuyWzWsXIws6QBKhCeGan9_VlTSX5-YKjpboWvr5FAVes" />
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-1">
<span className="font-label-md text-label-md font-bold text-on-surface truncate">Lẩu Riêu Cua Bắp Bò Sụn</span>
<span className="material-symbols-outlined text-primary text-sm">local_fire_department</span>
</div>
<span className="text-[11px] text-on-surface-variant">Set 3-4 người ăn • Size L</span>
<div className="flex items-center gap-2 mt-1">
<span className="font-label-md text-label-md font-extrabold text-primary">385.000 đ</span>
<span className="font-label-sm text-[10px] text-outline line-through">420.000 đ</span>
</div>
</div>
</div>
<div className="flex flex-col items-end gap-1.5 flex-shrink-0">
<span className="px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary font-label-sm text-[10px] font-bold">Khớp Giá Menu Quán</span>
<button className="px-2.5 py-1 rounded-lg bg-surface-container-highest hover:bg-primary hover:text-white font-label-sm text-[11px] font-bold text-on-surface transition-all">Sửa Giá</button>
</div>
</div>
{/*  Dish Item 2  */}
<div className="p-3.5 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-all flex items-center justify-between gap-3">
<div className="flex items-center gap-3 min-w-0">
<img className="w-13 h-13 rounded-xl object-cover flex-shrink-0" data-alt="Đĩa bắp bò ta xào chua ngọt thái lát mỏng hoa chuối rau răm tiêu sọ thơm nồng" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjbhpdymbAEdfuhFRcynl--noNcTAJ-JGngdMiQw_LFBsI1LvTP7eY4G43d0VmahBY7b49Y7PR4E8My70T9ecZl0-pk4SsodO6IIG9L8pQdlWEXcPdtKQEtAdYMIG8QCyZGIzClE63pB4OwHYJsQQO3WpRlVsGLibX2IMrQ9-ZtcRmaWQ7fXY3bJOQsLTwnrbioj4sUAoyGJiorMaS4SHGnSF_EX0Mcwv7cSS9xog" />
<div className="flex flex-col min-w-0">
<span className="font-label-md text-label-md font-bold text-on-surface truncate">Bắp Bò Muối Chua Ngọt</span>
<span className="text-[11px] text-on-surface-variant">Món nhắm đặc sản Hà Thành</span>
<div className="flex items-center gap-2 mt-1">
<span className="font-label-md text-label-md font-extrabold text-primary">165.000 đ</span>
</div>
</div>
</div>
<div className="flex flex-col items-end gap-1.5 flex-shrink-0">
<span className="px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary font-label-sm text-[10px] font-bold">Khớp Giá Menu Quán</span>
<button className="px-2.5 py-1 rounded-lg bg-surface-container-highest hover:bg-primary hover:text-white font-label-sm text-[11px] font-bold text-on-surface transition-all">Sửa Giá</button>
</div>
</div>
{/*  Dish Item 3 (Warning trigger demo)  */}
<div className="p-3.5 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-all flex items-center justify-between gap-3">
<div className="flex items-center gap-3 min-w-0">
<img className="w-13 h-13 rounded-xl object-cover flex-shrink-0" data-alt="Bát gạch cua đồng xưng xựng chưng hành phi mỡ lợn thơm lừng bốc khói màu vàng nghệ óng ánh" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0kQACkhWiyAA4WvJuJZSsimpEPIuIQ-O0-176yxFfnwV5Wx7APLe137gY30hi92VQu5eqNVLcjP6NEtbNCCKdxOrOqpEEXpBuOU7vfbiztuEkDKH7POClQdMAbh47mnUOcM2NhvcRBqFFQl9exfp368vZpCUaEoeu2elBUms5iwdy5IlaD38BoB8xNr1uluM3VT6tnGx6Ly9uu_mYO1fXniT-x6nD0soT_lXqCq4" />
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-1">
<span className="font-label-md text-label-md font-bold text-on-surface truncate">Gạch Cua Chưng Thêm</span>
<span className="material-symbols-outlined text-secondary text-sm">trending_up</span>
</div>
<span className="text-[11px] text-on-surface-variant">Gợi ý gọi thêm cho nồi lẩu</span>
<div className="flex items-center gap-2 mt-1">
<span className="font-label-md text-label-md font-extrabold text-primary">85.000 đ</span>
<span className="text-[10px] text-secondary font-bold">(+10K dịp Tết)</span>
</div>
</div>
</div>
<div className="flex flex-col items-end gap-1.5 flex-shrink-0">
<span className="px-2 py-0.5 rounded-full bg-secondary/15 text-secondary font-label-sm text-[10px] font-bold">Chờ Thẩm Định</span>
<button className="px-2.5 py-1 rounded-lg bg-primary-container text-white font-label-sm text-[11px] font-bold hover:shadow-md transition-all">Duyệt Ngay</button>
</div>
</div>
{/*  Dish Item 4  */}
<div className="p-3.5 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-all flex items-center justify-between gap-3">
<div className="flex items-center gap-3 min-w-0">
<img className="w-13 h-13 rounded-xl object-cover flex-shrink-0" data-alt="Đĩa quẩy giòn vàng ruộm xốp ngậy ăn kèm lẩu riêu cua nóng sốt trên bàn gỗ cổ kính" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2R5rHgnIPGplZpPH4fisAfI29eiZZWwMiEZv3XMFpi2CE5wp0pHtplu0bEwF8VBEzKNE7Xa49EzCZr9R5U0a69waVThnzp4D6Liv1qMRbWzl5h1X7VYjMTVZ4SoRwdWnzmDtVhOe-7xfn3L4VLlm2CQe9ynInkLhGwnR8fMD4of1OJrrRql3ZAw7emf3VC3aWbx2KU8TgzdRm18i0yKQpQ7F-pv6rCR8ZMexV_Mg" />
<div className="flex flex-col min-w-0">
<span className="font-label-md text-label-md font-bold text-on-surface truncate">Quẩy Giòn Phố Cổ (Đĩa)</span>
<span className="text-[11px] text-on-surface-variant">10 chiếc giòn tan thơm bơ</span>
<div className="flex items-center gap-2 mt-1">
<span className="font-label-md text-label-md font-extrabold text-primary">20.000 đ</span>
</div>
</div>
</div>
<div className="flex flex-col items-end gap-1.5 flex-shrink-0">
<span className="px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary font-label-sm text-[10px] font-bold">Khớp Giá Menu Quán</span>
<button className="px-2.5 py-1 rounded-lg bg-surface-container-highest hover:bg-primary hover:text-white font-label-sm text-[11px] font-bold text-on-surface transition-all">Sửa Giá</button>
</div>
</div>
</div>
{/*  Price Fluctuation Graph Card  */}
<div className="rounded-2xl bg-surface-container p-4 flex flex-col gap-3">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-base">analytics</span>
<span className="font-label-md text-label-md font-bold text-on-surface">Lịch Sử Biến Động Giá (12 Tháng)</span>
</div>
<span className="text-[11px] font-bold text-tertiary font-label-sm">Độ ổn định: 99.4%</span>
</div>
{/*  Chart visual  */}
<div className="relative h-20 w-full flex items-end justify-between gap-1 pt-2">
<div className="flex-1 flex flex-col items-center gap-1">
<div className="w-full bg-surface-variant rounded-t-md h-12"></div>
<span className="text-[9px] text-on-surface-variant font-bold">T1</span>
</div>
<div className="flex-1 flex flex-col items-center gap-1">
<div className="w-full bg-surface-variant rounded-t-md h-12"></div>
<span className="text-[9px] text-on-surface-variant font-bold">T2</span>
</div>
<div className="flex-1 flex flex-col items-center gap-1">
<div className="w-full bg-surface-variant rounded-t-md h-12"></div>
<span className="text-[9px] text-on-surface-variant font-bold">T3</span>
</div>
<div className="flex-1 flex flex-col items-center gap-1">
<div className="w-full bg-surface-variant rounded-t-md h-12"></div>
<span className="text-[9px] text-on-surface-variant font-bold">T4</span>
</div>
<div className="flex-1 flex flex-col items-center gap-1">
<div className="w-full bg-surface-variant rounded-t-md h-12"></div>
<span className="text-[9px] text-on-surface-variant font-bold">T5</span>
</div>
<div className="flex-1 flex flex-col items-center gap-1">
<div className="w-full bg-surface-variant rounded-t-md h-12"></div>
<span className="text-[9px] text-on-surface-variant font-bold">T6</span>
</div>
<div className="flex-1 flex flex-col items-center gap-1">
<div className="w-full bg-surface-variant rounded-t-md h-12"></div>
<span className="text-[9px] text-on-surface-variant font-bold">T7</span>
</div>
<div className="flex-1 flex flex-col items-center gap-1">
<div className="w-full bg-surface-variant rounded-t-md h-12"></div>
<span className="text-[9px] text-on-surface-variant font-bold">T8</span>
</div>
<div className="flex-1 flex flex-col items-center gap-1">
<div className="w-full bg-surface-variant rounded-t-md h-12"></div>
<span className="text-[9px] text-on-surface-variant font-bold">T9</span>
</div>
<div className="flex-1 flex flex-col items-center gap-1">
<div className="w-full bg-secondary/80 rounded-t-md h-14"></div>
<span className="text-[9px] text-secondary font-bold">T10</span>
</div>
<div className="flex-1 flex flex-col items-center gap-1">
<div className="w-full bg-surface-variant rounded-t-md h-12"></div>
<span className="text-[9px] text-on-surface-variant font-bold">T11</span>
</div>
<div className="flex-1 flex flex-col items-center gap-1">
<div className="w-full bg-primary rounded-t-md h-13 shadow-xs"></div>
<span className="text-[9px] text-primary font-extrabold">T12</span>
</div>
</div>
<div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-1 border-t border-outline-variant/30">
<span className="">Biên độ giá: <strong>20.000đ - 385.000đ</strong></span>
<span className="text-tertiary font-bold">Khóa giá Lễ Tết: Active</span>
</div>
</div>
{/*  Quick Action Buttons for Inspector  */}
<div className="flex items-center gap-3 pt-2">
<button className="flex-1 py-3 rounded-full bg-primary-container hover:bg-primary text-on-primary-container font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 shadow-md transition-all">
<span className="material-symbols-outlined text-lg">verified</span>
<span className="">Cấp Dấu Uy Tín Niêm Yết</span>
</button>
<button className="px-4 py-3 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-bold flex items-center justify-center gap-1 transition-all" title="Gửi thông báo nhắc nhở giá">
<span className="material-symbols-outlined text-lg">campaign</span>
</button>
</div>
</div>
{/*  Location Radar Widget  */}
<div className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm flex flex-col gap-3">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-xl">satellite_alt</span>
<span className="font-label-md text-label-md font-extrabold text-on-surface">Toạ Độ Trạm GPS Radar</span>
</div>
<span className="font-label-sm text-[11px] text-tertiary font-bold">Sai số: &lt; 1.2 mét</span>
</div>
<div className="w-full h-36 rounded-2xl relative overflow-hidden bg-cover bg-center shadow-inner" data-location="68 Ma May, Hoan Kiem, Hanoi" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBR0XAfVVns7SiSCi3Z1HpZbK4OLL7q4yeuvZkDLUoZNAlOqNURK7-FGRDhzoVvsCbEJVE4S5HxxZ5kAVr0lI6ieNDm-tQba6FismmpdnAQVePFoXZziHgb2hfNWKVPTMXQDcoU9nL1JNqqbgiyE3g-ax7_I-jnd05sk2LUd816IE14ELWW2MRA2WkqhweRXfakRuKTrG96QHsRAvGZ6WHhcZNB6oUadwhzSwVv6Dc')" }}>
<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3 justify-between">
<div className="flex items-center gap-1.5 text-white text-xs font-bold">
<span className="material-symbols-outlined text-primary text-base">pin_drop</span>
<span className="">Khu Phố Cổ Hoàn Kiếm, Hà Nội</span>
</div>
<span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold">Live GPS Lock</span>
</div>
</div>
<div className="flex items-center justify-between text-xs text-on-surface-variant">
<span className="">Bán kính giao hàng: <strong className="text-on-surface">8.5 km</strong></span>
<span className="">Mật độ quán cạnh tranh: <strong className="text-secondary">Rất Cao (142 quán)</strong></span>
</div>
</div>
</div>
</div>
</div>
</div>
</main>
    </div>
  );
}
