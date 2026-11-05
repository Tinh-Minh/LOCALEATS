import { useState } from "react";

/**
 * AdminUsersTab
 * Super Admin Screen: Quản Lý Thực Khách & Cộng Đồng Foodie
 * Auto-generated from Google Stitch design with full length fidelity.
 */
export default function AdminUsersTab({ onNavigateTab }) {
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
<div className="p-8 space-y-8 max-w-[1720px] mx-auto w-full">
{/*  Top Action Header Banner  */}
<div className="relative overflow-hidden rounded-3xl bg-surface-container-low p-8 shadow-sm">
<div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-primary-container/10 blur-3xl pointer-events-none"></div>
<div className="absolute right-64 -bottom-20 w-60 h-60 rounded-full bg-secondary-container/15 blur-2xl pointer-events-none"></div>
<div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
<div className="space-y-2">
<div className="flex items-center gap-3">
<span className="px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
<span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest animate-pulse"></span>
              Live Community Directory
            </span>
<span className="font-label-md text-label-md text-on-surface-variant font-medium">Node: cluster-hcm-primary</span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
            Quản Lý Cơ Sở Dữ Liệu Thực Khách
            <span className="text-primary font-bold">(1.850.420 Users)</span>
</h1>
<p className="font-body-md text-body-md text-on-surface-variant max-w-3xl leading-relaxed">
            Giám sát tài khoản thực khách toàn quốc, phân nhóm hành vi ẩm thực theo vị trí địa lý, tỷ lệ MAU/DAU và quản lý cấp độ tin cậy <strong className="text-on-surface font-semibold">Trust Score Engine v4.2</strong>.
          </p>
</div>
<div className="flex flex-wrap items-center gap-3">
<button className="px-5 py-3 rounded-full bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md shadow-sm transition-all flex items-center gap-2 group" type="button">
<span className="material-symbols-outlined text-primary text-xl group-hover:rotate-12 transition-transform">download</span>
<span>Xuất file (.csv)</span>
</button>
<button className="px-5 py-3 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-all flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-secondary text-xl">tune</span>
<span>Thuật toán gắn thẻ</span>
</button>
<button className="px-6 py-3 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 active:scale-95" type="button">
<span className="material-symbols-outlined text-xl">campaign</span>
<span>Push toàn hệ thống</span>
</button>
</div>
</div>
</div>
{/*  4 KPI Metrics Bento Cards  */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
{/*  Metric 1  */}
<div className="p-6 rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
<div className="flex items-start justify-between">
<div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
<span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
</div>
<span className="px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-xs">trending_up</span>
            +14.2% MoM
          </span>
</div>
<div className="mt-4">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Người dùng hoạt động (MAU)</span>
<div className="flex items-baseline gap-2 mt-1">
<span className="font-display-lg text-display-lg font-black text-on-surface tracking-tight">1.420.800</span>
</div>
<div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm mt-3 pt-3 bg-surface-container-low/60 rounded-xl px-3 py-2">
<span>DAU Hôm Nay:</span>
<span className="font-bold text-on-surface">348.600 người</span>
</div>
</div>
</div>
{/*  Metric 2  */}
<div className="p-6 rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
<div className="flex items-start justify-between">
<div className="w-12 h-12 rounded-2xl bg-tertiary/10 text-tertiary flex items-center justify-center">
<span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>pin_drop</span>
</div>
<span className="px-2.5 py-1 rounded-full bg-tertiary/10 text-tertiary font-label-sm text-label-sm font-bold">
            GPS High Precision
          </span>
</div>
<div className="mt-4">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Xác Thực Quán Thực Tế</span>
<div className="flex items-baseline gap-2 mt-1">
<span className="font-display-lg text-display-lg font-black text-tertiary tracking-tight">92.8%</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Geo-Checkin</span>
</div>
<div className="w-full bg-surface-container rounded-full h-2 mt-4 overflow-hidden">
<div className="bg-tertiary h-2 rounded-full" style={{ width: "92.8%" }}></div>
</div>
</div>
</div>
{/*  Metric 3  */}
<div className="p-6 rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
<div className="flex items-start justify-between">
<div className="w-12 h-12 rounded-2xl bg-secondary-container/20 text-secondary flex items-center justify-center">
<span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
</div>
<span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
            A-Tier Tier Rank
          </span>
</div>
<div className="mt-4">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Điểm Uy Tín Bình Quân</span>
<div className="flex items-baseline gap-2 mt-1">
<span className="font-display-lg text-display-lg font-black text-on-surface tracking-tight">84.6</span>
<span className="font-title-md text-title-md text-on-surface-variant font-medium">/100</span>
</div>
<div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm mt-3 pt-3 bg-surface-container-low/60 rounded-xl px-3 py-2">
<span>Tỷ lệ Review chất lượng:</span>
<span className="font-bold text-tertiary">96.4% Clean</span>
</div>
</div>
</div>
{/*  Metric 4  */}
<div className="p-6 rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
<div className="flex items-start justify-between">
<div className="w-12 h-12 rounded-2xl bg-error/10 text-error flex items-center justify-center">
<span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
</div>
<span className="px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-xs">flip_camera_ios</span>
            AI Detected
          </span>
</div>
<div className="mt-4">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Vi Phạm &amp; Tạm Khóa</span>
<div className="flex items-baseline gap-2 mt-1">
<span className="font-display-lg text-display-lg font-black text-error tracking-tight">1.412</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">tài khoản</span>
</div>
<div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm mt-3 pt-3 bg-error-container/30 rounded-xl px-3 py-2">
<span>Bot spam &amp; Review ảo:</span>
<span className="font-bold text-error">91.2% tự động chặn</span>
</div>
</div>
</div>
</div>
{/*  Main Workspace: Left Directory (8 cols) + Right Analytics Panel (4 cols)  */}
<div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
{/*  Left Column: Tables & Filters (Span 8)  */}
<div className="xl:col-span-8 space-y-6">
{/*  Filter Controls Container  */}
<div className="p-6 rounded-3xl bg-surface-container-lowest shadow-sm space-y-5">
{/*  Search Row  */}
<div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
<div className="relative flex-1">
<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary text-xl">search</span>
<input className="w-full h-12 pl-12 pr-4 rounded-2xl bg-surface-container text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-high transition-all" placeholder="Tìm theo Họ tên, SĐT, Email, ID thực khách (USR-xxxx), @Username Foodie..." type="text"/>
</div>
<div className="flex items-center gap-2.5">
<select className="h-12 px-4 rounded-2xl bg-surface-container text-on-surface font-label-md text-label-md focus:outline-none focus:bg-surface-container-high transition-all">
<option value="all">Khu vực: Toàn quốc</option>
<option value="hn">Hà Nội (684K)</option>
<option value="hcm">TP. Hồ Chí Minh (890K)</option>
<option value="dn">Đà Nẵng (192K)</option>
<option value="other">Tỉnh thành khác</option>
</select>
<select className="h-12 px-4 rounded-2xl bg-surface-container text-on-surface font-label-md text-label-md focus:outline-none focus:bg-surface-container-high transition-all">
<option value="all">Phân hạng Foodie</option>
<option value="diamond">Foodie Kim Cương</option>
<option value="gold">KOL VIP / Sứ Giả</option>
<option value="silver">Foodie Tích Cực</option>
<option value="warning">Cảnh báo vi phạm</option>
</select>
<button className="w-12 h-12 rounded-2xl bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-all" title="Bộ lọc nâng cao" type="button">
<span className="material-symbols-outlined text-xl">filter_list</span>
</button>
</div>
</div>
{/*  Directory Navigation Tabs  */}
<div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
<button className="px-4 py-2.5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm whitespace-nowrap shadow-sm" type="button">
              Tất cả thực khách (1.85M)
            </button>
<button className="px-4 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm whitespace-nowrap transition-all flex items-center gap-1.5" type="button">
<span className="material-symbols-outlined text-sm text-secondary">star</span>
              Top Đóng Góp Review (14.2K)
            </button>
<button className="px-4 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm whitespace-nowrap transition-all flex items-center gap-1.5" type="button">
<span className="material-symbols-outlined text-sm text-error">warning</span>
              Cảnh Báo Gian Lận (2.1K)
            </button>
<button className="px-4 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm whitespace-nowrap transition-all flex items-center gap-1.5" type="button">
<span className="material-symbols-outlined text-sm text-outline">lock</span>
              Tài Khoản Đã Khóa (1.4K)
            </button>
</div>
</div>
{/*  Foodie Data Table  */}
<div className="bg-surface-container-lowest rounded-3xl shadow-sm overflow-hidden">
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
<th className="py-4 px-6 font-bold">Thực Khách &amp; Profile</th>
<th className="py-4 px-4 font-bold">Hạng &amp; Huy Hiệu</th>
<th className="py-4 px-4 font-bold">Vị Trí GPS</th>
<th className="py-4 px-4 font-bold">Hoạt Động / Check-in</th>
<th className="py-4 px-4 font-bold text-center">Trust Score</th>
<th className="py-4 px-6 font-bold text-right">Thao Tác</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-container/60 font-body-sm text-body-sm text-on-surface">
{/*  Row 1: Tran Minh Hoang  */}
<tr className="hover:bg-surface-container-low/40 transition-colors group">
<td className="py-4 px-6">
<div className="flex items-center gap-3.5">
<div className="relative">
<img className="w-12 h-12 rounded-2xl object-cover shadow-sm" data-alt="Portrait photo of a young Vietnamese male food connoisseur with glasses, wearing modern casual clothing in a vibrant Hanoi coffee shop setting with warm natural sunlight." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCus1MDOT_LYuKzPmmPq1LwAQafem6Yun8SLgJ6YOJOLE3ZY5XQ0mLBEJ1lYQIlcENMFieNudNjPGZ3UbkUTKJpARbVjtCzbRmUhW06gZDTAozQdXiMBVgCFTvbUThNlsDfzu10FK5pAwbmUo7r1snxUhsqMrK2fhb35xsN0GnDb1RnDx-4EcoMvICaKcDa_zu6n5i90Wj1oCOASDyDFEhGbnOD-H4vg_-k3P38PT8"/>
<span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-tertiary flex items-center justify-center text-on-tertiary text-[9px] font-bold">✓</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md font-bold text-on-surface leading-tight">Trần Minh Hoàng</span>
<div className="flex items-center gap-1.5 mt-0.5">
<span className="font-label-sm text-label-sm text-primary font-semibold">@hoangfoodie</span>
<span className="text-on-surface-variant/40">•</span>
<span className="font-label-sm text-[11px] text-on-surface-variant">USR-89214</span>
</div>
</div>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col gap-1 items-start">
<span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[11px] font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-xs text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>diamond</span>
                        Foodie Kim Cương (Lv.8)
                      </span>
<span className="text-[11px] font-label-sm text-tertiary font-semibold flex items-center gap-0.5">
<span className="material-symbols-outlined text-xs">verified</span> Sứ Giả Phố Cổ
                      </span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold text-on-surface">Đống Đa, Hà Nội</span>
<span className="font-label-sm text-[11px] text-on-surface-variant mt-0.5">GPS: 21.0182, 105.8291</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold text-on-surface">284 reviews</span>
<span className="font-label-sm text-[11px] text-tertiary font-medium">142 quán (GPS 98%)</span>
</div>
</td>
<td className="py-4 px-4 text-center">
<div className="inline-flex flex-col items-center">
<span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md font-extrabold shadow-xs">
                        96/100
                      </span>
<span className="font-label-sm text-[10px] text-tertiary mt-1 font-bold">Rất Uy Tín</span>
</div>
</td>
<td className="py-4 px-6 text-right">
<div className="flex items-center justify-end gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
<button className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface transition-all" title="Xem hồ sơ" type="button">
<span className="material-symbols-outlined text-lg">visibility</span>
</button>
<button className="p-2 rounded-xl bg-secondary-fixed hover:bg-secondary-container text-on-secondary-fixed transition-all" title="Huy hiệu Sứ giả ẩm thực" type="button">
<span className="material-symbols-outlined text-lg">military_tech</span>
</button>
<button className="p-2 rounded-xl bg-surface-container hover:bg-error-container hover:text-on-error-container text-on-surface-variant transition-all" title="Khóa tài khoản" type="button">
<span className="material-symbols-outlined text-lg">lock</span>
</button>
</div>
</td>
</tr>
{/*  Row 2: Le Phuong Thao  */}
<tr className="hover:bg-surface-container-low/40 transition-colors group">
<td className="py-4 px-6">
<div className="flex items-center gap-3.5">
<div className="relative">
<img className="w-12 h-12 rounded-2xl object-cover shadow-sm" data-alt="Warm aesthetic headshot of a stylish Vietnamese female food reviewer in a cozy Saigon bistro with soft ambient bokeh lighting in background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZ6LMQIu5xe2U_0PLbNfQYri8HxMnDbCeQXWxga-0gUBEeqnlzmZVSOeL92rQcKF2Iyt1WLNYvbBMqopveummiegYJ_kSrsS8YLbmc5ojuEQqBoTYMvQzgn3WPg6uYhIMzVSyOOiqFqEkQGuph93nmx4uMqTcNBr90L-8J-I5ApGMGAGBQXZgp9SC4_V2jlyTwiAudozabge3P044Fa_PXENjdF_axXq295AfA-qw"/>
<span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container text-[9px] font-bold">★</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md font-bold text-on-surface leading-tight">Lê Phương Thảo</span>
<div className="flex items-center gap-1.5 mt-0.5">
<span className="font-label-sm text-label-sm text-primary font-semibold">@thaole_taste</span>
<span className="text-on-surface-variant/40">•</span>
<span className="font-label-sm text-[11px] text-on-surface-variant">USR-30491</span>
</div>
</div>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col gap-1 items-start">
<span className="px-2.5 py-1 rounded-full bg-secondary-container/20 text-secondary font-label-sm text-[11px] font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                        KOL Ẩm Thực Vàng
                      </span>
<span className="text-[11px] font-label-sm text-on-surface-variant font-medium">Đối tác chứng nhận</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold text-on-surface">Quận 1, TP.HCM</span>
<span className="font-label-sm text-[11px] text-on-surface-variant mt-0.5">GPS: 10.7769, 106.7009</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold text-on-surface">189 reviews</span>
<span className="font-label-sm text-[11px] text-on-surface-variant">95 quán đã ghé</span>
</div>
</td>
<td className="py-4 px-4 text-center">
<div className="inline-flex flex-col items-center">
<span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md font-extrabold shadow-xs">
                        92/100
                      </span>
<span className="font-label-sm text-[10px] text-tertiary mt-1 font-bold">Xác Thực Cao</span>
</div>
</td>
<td className="py-4 px-6 text-right">
<div className="flex items-center justify-end gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
<button className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface transition-all" title="Xem hồ sơ" type="button">
<span className="material-symbols-outlined text-lg">visibility</span>
</button>
<button className="p-2 rounded-xl bg-secondary-fixed hover:bg-secondary-container text-on-secondary-fixed transition-all" title="Huy hiệu Sứ giả ẩm thực" type="button">
<span className="material-symbols-outlined text-lg">military_tech</span>
</button>
<button className="p-2 rounded-xl bg-surface-container hover:bg-error-container hover:text-on-error-container text-on-surface-variant transition-all" title="Khóa tài khoản" type="button">
<span className="material-symbols-outlined text-lg">lock</span>
</button>
</div>
</td>
</tr>
{/*  Row 3: Dang Tien Dung  */}
<tr className="hover:bg-surface-container-low/40 transition-colors group">
<td className="py-4 px-6">
<div className="flex items-center gap-3.5">
<div className="relative">
<img className="w-12 h-12 rounded-2xl object-cover shadow-sm" data-alt="Casual profile photo of a Vietnamese male foodie sitting at a street food stall in Hanoi with authentic warm ambient lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3FSXvE_Ka7bftEMo4gwp-mGvrCEI19FO7x-N2iIGRiTiz7_Lv-BCUICFV8guqAyPioBCCDY4c3xe2LbarklyaamzriMlS3m4T1RaWDGvBfROS43X4G3Uu7eSWfitsuvcNPpFg-k7XIo79seLm4XMh2HjssLUH4PS3V2C_AzlrTRmfm5Vue-ItVSXrNgiO2fVFmf06AnhJyXZ4362vlTIu4ajsvj4FlEy40oqCjTU"/>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md font-bold text-on-surface leading-tight">Đặng Tiến Dũng</span>
<div className="flex items-center gap-1.5 mt-0.5">
<span className="font-label-sm text-label-sm text-on-surface-variant">@dungdang_hn</span>
<span className="text-on-surface-variant/40">•</span>
<span className="font-label-sm text-[11px] text-on-surface-variant">USR-11942</span>
</div>
</div>
</div>
</td>
<td className="py-4 px-4">
<span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-[11px] font-bold">
                      Thực Khách Thường Xuyên
                    </span>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold text-on-surface">Cầu Giấy, Hà Nội</span>
<span className="font-label-sm text-[11px] text-on-surface-variant mt-0.5">GPS: 21.0362, 105.7906</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold text-on-surface">45 reviews</span>
<span className="font-label-sm text-[11px] text-on-surface-variant">38 quán đã ghé</span>
</div>
</td>
<td className="py-4 px-4 text-center">
<div className="inline-flex flex-col items-center">
<span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md font-extrabold shadow-xs">
                        88/100
                      </span>
<span className="font-label-sm text-[10px] text-on-surface-variant mt-1 font-semibold">Chuẩn Bậc B</span>
</div>
</td>
<td className="py-4 px-6 text-right">
<div className="flex items-center justify-end gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
<button className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface transition-all" title="Xem hồ sơ" type="button">
<span className="material-symbols-outlined text-lg">visibility</span>
</button>
<button className="p-2 rounded-xl bg-secondary-fixed hover:bg-secondary-container text-on-secondary-fixed transition-all" title="Huy hiệu Sứ giả ẩm thực" type="button">
<span className="material-symbols-outlined text-lg">military_tech</span>
</button>
<button className="p-2 rounded-xl bg-surface-container hover:bg-error-container hover:text-on-error-container text-on-surface-variant transition-all" title="Khóa tài khoản" type="button">
<span className="material-symbols-outlined text-lg">lock</span>
</button>
</div>
</td>
</tr>
{/*  Row 4: Vu Tuan Kiet (Spam/Bot Alert)  */}
<tr className="bg-error-container/15 hover:bg-error-container/25 transition-colors group">
<td className="py-4 px-6">
<div className="flex items-center gap-3.5">
<div className="relative">
<div className="w-12 h-12 rounded-2xl bg-error-container text-error flex items-center justify-center font-bold text-lg">
                          !
                        </div>
<span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-error flex items-center justify-center text-on-error text-[9px]">✕</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md font-bold text-error leading-tight">Vũ Tuấn Kiệt</span>
<div className="flex items-center gap-1.5 mt-0.5">
<span className="font-label-sm text-label-sm text-error/80 font-mono">@kietbot_auto</span>
<span className="text-on-surface-variant/40">•</span>
<span className="font-label-sm text-[11px] text-error">USR-00412</span>
</div>
</div>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col gap-1 items-start">
<span className="px-2.5 py-1 rounded-full bg-error text-on-error font-label-sm text-[11px] font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-xs">smart_toy</span>
                        Nghi Vấn Bot Spam
                      </span>
<span className="text-[11px] font-label-sm text-error font-semibold">Tạm đình chỉ 14 ngày</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold text-on-surface">Ngũ Hành Sơn, ĐN</span>
<span className="font-label-sm text-[11px] text-error mt-0.5">GPS Fake Spoof Alert</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold text-error">18 reviews / 30 phút</span>
<span className="font-label-sm text-[11px] text-on-surface-variant">Không khớp hóa đơn</span>
</div>
</td>
<td className="py-4 px-4 text-center">
<div className="inline-flex flex-col items-center">
<span className="px-3 py-1 rounded-full bg-error-container text-on-error-container font-label-md text-label-md font-black shadow-xs">
                        32/100
                      </span>
<span className="font-label-sm text-[10px] text-error mt-1 font-bold">Mức Nguy Hiểm</span>
</div>
</td>
<td className="py-4 px-6 text-right">
<div className="flex items-center justify-end gap-1.5">
<button className="px-3 py-1.5 rounded-xl bg-error text-on-error hover:bg-on-error-container font-label-sm text-[11px] font-bold transition-all shadow-xs" title="Xử lý gian lận" type="button">
                        Mở Hồ Sơ Phạt
                      </button>
</div>
</td>
</tr>
{/*  Row 5: Nguyen Bich Ngoc  */}
<tr className="hover:bg-surface-container-low/40 transition-colors group">
<td className="py-4 px-6">
<div className="flex items-center gap-3.5">
<div className="relative">
<img className="w-12 h-12 rounded-2xl object-cover shadow-sm" data-alt="Portrait photo of a young Vietnamese female university student enjoying milk tea in a bright modern cafe in Ho Chi Minh City." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWw3-DJwlmegdmTpCQ-u9lhEN8zHyUCOWMgQU92ZXtdmKcSStbY4UDtrYpWDFXWMj4uE_AXK54CqZUoT7VorDytPKvMm4S4tewNm9Km9NNvGhuU3D9EE9zDOprhFW5OQU3UHyepuyLzTu5cMggxEVKPGfgU4mjMrPeZk-rS4Unc5Gr9yAzkuzAELoCCu3v114mZ5USU-ef5EpgIX1f6Spf2DfjPNpzROZgp4dIlVQ"/>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md font-bold text-on-surface leading-tight">Nguyễn Bích Ngọc</span>
<div className="flex items-center gap-1.5 mt-0.5">
<span className="font-label-sm text-label-sm text-primary font-semibold">@ngocbich_tea</span>
<span className="text-on-surface-variant/40">•</span>
<span className="font-label-sm text-[11px] text-on-surface-variant">USR-76129</span>
</div>
</div>
</div>
</td>
<td className="py-4 px-4">
<span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-[11px] font-bold flex items-center gap-1 w-fit">
<span className="material-symbols-outlined text-xs text-outline">verified</span>
                      Foodie Bạc (Lv.3)
                    </span>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold text-on-surface">Bình Thạnh, TP.HCM</span>
<span className="font-label-sm text-[11px] text-on-surface-variant mt-0.5">GPS: 10.8012, 106.7118</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold text-on-surface">32 reviews</span>
<span className="font-label-sm text-[11px] text-on-surface-variant">29 quán đã ghé</span>
</div>
</td>
<td className="py-4 px-4 text-center">
<div className="inline-flex flex-col items-center">
<span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md font-extrabold shadow-xs">
                        85/100
                      </span>
<span className="font-label-sm text-[10px] text-on-surface-variant mt-1 font-semibold">Tin Cậy</span>
</div>
</td>
<td className="py-4 px-6 text-right">
<div className="flex items-center justify-end gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
<button className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface transition-all" title="Xem hồ sơ" type="button">
<span className="material-symbols-outlined text-lg">visibility</span>
</button>
<button className="p-2 rounded-xl bg-secondary-fixed hover:bg-secondary-container text-on-secondary-fixed transition-all" title="Huy hiệu Sứ giả ẩm thực" type="button">
<span className="material-symbols-outlined text-lg">military_tech</span>
</button>
<button className="p-2 rounded-xl bg-surface-container hover:bg-error-container hover:text-on-error-container text-on-surface-variant transition-all" title="Khóa tài khoản" type="button">
<span className="material-symbols-outlined text-lg">lock</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
{/*  Table Footer Pagination  */}
<div className="p-5 bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-4">
<span className="font-body-sm text-body-sm text-on-surface-variant">
              Hiển thị <strong className="text-on-surface font-bold">1 - 5</strong> trong tổng số <strong className="text-on-surface font-bold">1.850.420</strong> thực khách
            </span>
<div className="flex items-center gap-2">
<button className="px-3 py-1.5 rounded-xl bg-surface-container text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-all" disabled="" type="button">
                Trước
              </button>
<button className="px-3 py-1.5 rounded-xl bg-primary-container text-on-primary-container font-label-sm text-label-sm font-bold shadow-xs" type="button">
                1
              </button>
<button className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-all" type="button">
                2
              </button>
<button className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-all" type="button">
                3
              </button>
<span className="text-on-surface-variant px-1 font-bold">...</span>
<button className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-all" type="button">
                370.084
              </button>
<button className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-all" type="button">
                Sau
              </button>
</div>
</div>
</div>
</div>
{/*  Right Column: User Analytics & Quick Actions (Span 4)  */}
<div className="xl:col-span-4 space-y-6">
{/*  Food Preference Distribution (Visual Chart)  */}
<div className="p-6 rounded-3xl bg-surface-container-lowest shadow-sm space-y-6">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-2xl">restaurant</span>
<h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Phân Khúc Sở Thích Ẩm Thực</h2>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Realtime AI</span>
</div>
{/*  SVG Donut Chart representation  */}
<div className="flex items-center justify-center p-2 relative">
<svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 120 120">
<circle cx="60" cy="60" fill="transparent" r="50" stroke="#feeadc" strokeWidth="16"></circle>
{/*  Pho Co / Truyen Thong 38%  */}
<circle cx="60" cy="60" fill="transparent" r="50" stroke="#b91d00" strokeDasharray="314.159" strokeDashoffset="194.77" strokeWidth="16"></circle>
{/*  Tra Sua & An Vat 27%  */}
<circle cx="60" cy="60" fill="transparent" r="50" stroke="#fd9013" strokeDasharray="314.159" strokeDashoffset="229.33" strokeWidth="16" transform="rotate(136.8 60 60)"></circle>
{/*  Lau Nuong & Nhau 21%  */}
<circle cx="60" cy="60" fill="transparent" r="50" stroke="#2c694e" strokeDasharray="314.159" strokeDashoffset="248.18" strokeWidth="16" transform="rotate(234 60 60)"></circle>
{/*  Fine Dining 14%  */}
<circle cx="60" cy="60" fill="transparent" r="50" stroke="#8f4e00" strokeDasharray="314.159" strokeDashoffset="270.17" strokeWidth="16" transform="rotate(309.6 60 60)"></circle>
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
<span className="font-headline-md text-headline-md font-black text-on-surface leading-none">1.85M</span>
<span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-bold mt-1">Profile Thực</span>
</div>
</div>
{/*  Legend Bar List  */}
<div className="space-y-3 pt-2">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2.5">
<span className="w-3 h-3 rounded-full bg-primary"></span>
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Phố Cổ &amp; Món Truyền Thống</span>
</div>
<span className="font-label-md text-label-md font-bold text-on-surface">38% (703K)</span>
</div>
<div className="flex items-center justify-between">
<div className="flex items-center gap-2.5">
<span className="w-3 h-3 rounded-full bg-secondary-container"></span>
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Trà Sữa &amp; Ăn Vặt Giới Trẻ</span>
</div>
<span className="font-label-md text-label-md font-bold text-on-surface">27% (499K)</span>
</div>
<div className="flex items-center justify-between">
<div className="flex items-center gap-2.5">
<span className="w-3 h-3 rounded-full bg-tertiary"></span>
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Lẩu Nướng &amp; Tiệc Nhậu</span>
</div>
<span className="font-label-md text-label-md font-bold text-on-surface">21% (388K)</span>
</div>
<div className="flex items-center justify-between">
<div className="flex items-center gap-2.5">
<span className="w-3 h-3 rounded-full bg-secondary"></span>
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Fine Dining &amp; Artisan Cafe</span>
</div>
<span className="font-label-md text-label-md font-bold text-on-surface">14% (259K)</span>
</div>
</div>
</div>
{/*  OS & Device Distribution  */}
<div className="p-6 rounded-3xl bg-surface-container-lowest shadow-sm space-y-4">
<div className="flex items-center justify-between">
<h3 className="font-title-md text-title-md font-bold text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-xl">devices</span>
              Thiết Bị &amp; Nền Tảng Di Động
            </h3>
<span className="font-label-sm text-label-sm text-tertiary font-bold">Live Synced</span>
</div>
<div className="space-y-3">
<div>
<div className="flex justify-between font-label-md text-label-md mb-1.5">
<span className="flex items-center gap-1.5 font-bold text-on-surface">
<span className="material-symbols-outlined text-base">phone_iphone</span> Apple iOS (iPhone/iPad)
                </span>
<span className="font-black text-primary">58%</span>
</div>
<div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden">
<div className="bg-primary h-2.5 rounded-full" style={{ width: "58%" }}></div>
</div>
</div>
<div>
<div className="flex justify-between font-label-md text-label-md mb-1.5">
<span className="flex items-center gap-1.5 font-bold text-on-surface">
<span className="material-symbols-outlined text-base">android</span> Android (Samsung, Xiaomi, Oppo)
                </span>
<span className="font-black text-tertiary">42%</span>
</div>
<div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden">
<div className="bg-tertiary h-2.5 rounded-full" style={{ width: "42%" }}></div>
</div>
</div>
</div>
</div>
{/*  Super Admin Quick Operations Card  */}
<div className="p-6 rounded-3xl bg-surface-container-low shadow-sm space-y-4">
<div className="flex items-center gap-2.5">
<div className="w-9 h-9 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-xs">
<span className="material-symbols-outlined text-xl">bolt</span>
</div>
<div>
<h3 className="font-title-md text-title-md font-bold text-on-surface leading-none">Hành Động Nhanh Root Admin</h3>
<span className="font-label-sm text-[11px] text-on-surface-variant">Thao tác tài khoản khẩn cấp</span>
</div>
</div>
<div className="grid grid-cols-2 gap-2.5 pt-1">
<button className="p-3.5 rounded-2xl bg-surface-container-lowest hover:bg-surface-container text-left transition-all group flex flex-col justify-between shadow-xs" type="button">
<span className="material-symbols-outlined text-primary text-2xl group-hover:scale-110 transition-transform">lock_reset</span>
<div className="mt-2">
<span className="font-label-md text-label-md font-bold text-on-surface block leading-tight">Reset Mật Khẩu</span>
<span className="font-label-sm text-[11px] text-on-surface-variant">Gửi OTP bảo mật</span>
</div>
</button>
<button className="p-3.5 rounded-2xl bg-surface-container-lowest hover:bg-error-container hover:text-on-error-container text-left transition-all group flex flex-col justify-between shadow-xs" type="button">
<span className="material-symbols-outlined text-error text-2xl group-hover:scale-110 transition-transform">timer</span>
<div className="mt-2">
<span className="font-label-md text-label-md font-bold text-on-surface block leading-tight">Khóa 7 Ngày</span>
<span className="font-label-sm text-[11px] text-on-surface-variant">Cảnh cáo vi phạm</span>
</div>
</button>
<button className="p-3.5 rounded-2xl bg-surface-container-lowest hover:bg-tertiary-container hover:text-on-tertiary-container text-left transition-all group flex flex-col justify-between shadow-xs" type="button">
<span className="material-symbols-outlined text-tertiary text-2xl group-hover:scale-110 transition-transform">lock_open</span>
<div className="mt-2">
<span className="font-label-md text-label-md font-bold text-on-surface block leading-tight">Mở Khóa Thủ Công</span>
<span className="font-label-sm text-[11px] text-on-surface-variant">Phục hồi quyền</span>
</div>
</button>
<button className="p-3.5 rounded-2xl bg-secondary-fixed hover:bg-secondary-container text-on-secondary-fixed text-left transition-all group flex flex-col justify-between shadow-xs" type="button">
<span className="material-symbols-outlined text-secondary text-2xl group-hover:scale-110 transition-transform">workspace_premium</span>
<div className="mt-2">
<span className="font-label-md text-label-md font-bold text-on-surface block leading-tight">Cấp Huy Hiệu</span>
<span className="font-label-sm text-[11px] text-on-secondary-fixed-variant">Sứ giả ẩm thực</span>
</div>
</button>
</div>
<div className="p-3 rounded-2xl bg-surface-container flex items-center justify-between text-on-surface-variant font-label-sm text-[11px]">
<span className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-sm text-tertiary">security</span>
              Ghi lại log thao tác Admin vào Security Hub
            </span>
<span className="font-bold text-primary">#SEC-LOG-2024</span>
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
