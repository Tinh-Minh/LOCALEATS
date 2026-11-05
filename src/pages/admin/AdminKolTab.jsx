import { useState } from "react";

/**
 * AdminKolTab
 * Super Admin Screen: Phân Cấp KOL & Foodie Reviewer Huy Hiệu
 * Auto-generated from Google Stitch design with full length fidelity.
 */
export default function AdminKolTab({ onNavigateTab }) {
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
<div className="px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 flex flex-col gap-8 max-w-[1720px] mx-auto w-full">
{/*  Header Section  */}
<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
<div className="flex flex-col gap-2 max-w-4xl">
<div className="flex items-center gap-2.5">
<span className="px-3 py-1 rounded-full bg-secondary-container/20 text-secondary font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-1.5 font-bold">
<span className="material-symbols-outlined text-sm">verified</span>
            LOCALEATS Creator Guild v3.4
          </span>
<span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm">
            AI Bias Engine Active
          </span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-extrabold">
          Quản Trị Cấp Bậc KOL, Reviewer &amp; Sứ Giả Ẩm Thực (Foodie Ambassador)
        </h1>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Thiết lập chính sách phân hạng người đánh giá, cơ chế thưởng điểm cống hiến, xác thực tích xanh KOL ẩm thực và giám sát toàn vẹn tính khách quan của chiến dịch trải nghiệm.
        </p>
</div>
<div className="flex flex-wrap items-center gap-3">
<button className="h-11 px-5 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md flex items-center gap-2 shadow-xs transition-transform active:scale-95">
<span className="material-symbols-outlined text-base text-secondary">tune</span>
          Cấu hình thù lao &amp; Voucher
        </button>
<button className="h-11 px-5 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md flex items-center gap-2 shadow-xs transition-transform active:scale-95">
<span className="material-symbols-outlined text-base text-primary">campaign</span>
          Tạo chiến dịch mời Foodie
        </button>
<button className="h-11 px-6 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md flex items-center gap-2 shadow-md transition-all active:scale-95 shadow-primary/20">
<span className="material-symbols-outlined text-base">new_releases</span>
          Duyệt cấp huy hiệu mới
          <span className="ml-1 px-2 py-0.5 rounded-full bg-on-primary text-primary font-bold text-label-sm">8 hồ sơ</span>
</button>
</div>
</div>
{/*  KPI Metric Cards Grid  */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
{/*  Card 1  */}
<div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group">
<div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-secondary-fixed/30 pointer-events-none transition-transform group-hover:scale-125"></div>
<div className="flex items-center justify-between mb-4">
<span className="font-label-md text-label-md text-on-surface-variant font-semibold">Tổng Reviewer Đã Cấp Bậc</span>
<div className="w-11 h-11 rounded-2xl bg-secondary-fixed/50 text-secondary flex items-center justify-center">
<span className="material-symbols-outlined text-2xl">military_tech</span>
</div>
</div>
<div className="flex flex-col gap-1">
<div className="flex items-baseline gap-2">
<span className="font-display-lg text-display-lg font-extrabold text-on-surface">8.420</span>
<span className="font-label-md text-label-md text-on-surface-variant">thành viên</span>
</div>
<div className="flex items-center gap-2 text-label-sm font-label-sm text-tertiary">
<span className="material-symbols-outlined text-sm">trending_up</span>
<span>+340 người gia nhập tuần này (L1 - L10)</span>
</div>
</div>
<div className="w-full bg-surface-container-high h-1.5 rounded-full mt-5 overflow-hidden">
<div className="bg-secondary-container h-full rounded-full w-[78%]"></div>
</div>
</div>
{/*  Card 2  */}
<div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group">
<div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-primary-fixed/40 pointer-events-none transition-transform group-hover:scale-125"></div>
<div className="flex items-center justify-between mb-4">
<span className="font-label-md text-label-md text-on-surface-variant font-semibold">KOL Ẩm Thực Tích Xanh</span>
<div className="w-11 h-11 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center">
<span className="material-symbols-outlined text-2xl">verified_user</span>
</div>
</div>
<div className="flex flex-col gap-1">
<div className="flex items-baseline gap-2">
<span className="font-display-lg text-display-lg font-extrabold text-on-surface">486</span>
<span className="font-label-md text-label-md text-on-surface-variant">KOLs Active</span>
</div>
<div className="flex items-center gap-2 text-label-sm font-label-sm text-tertiary">
<span className="material-symbols-outlined text-sm">check_circle</span>
<span>TikTok / Instagram / YouTube Verified</span>
</div>
</div>
<div className="w-full bg-surface-container-high h-1.5 rounded-full mt-5 overflow-hidden">
<div className="bg-primary-container h-full rounded-full w-[92%]"></div>
</div>
</div>
{/*  Card 3  */}
<div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group">
<div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-tertiary-fixed/30 pointer-events-none transition-transform group-hover:scale-125"></div>
<div className="flex items-center justify-between mb-4">
<span className="font-label-md text-label-md text-on-surface-variant font-semibold">Tổng Lượt Xem Review (MoM)</span>
<div className="w-11 h-11 rounded-2xl bg-tertiary-fixed text-tertiary flex items-center justify-center">
<span className="material-symbols-outlined text-2xl">visibility</span>
</div>
</div>
<div className="flex flex-col gap-1">
<div className="flex items-baseline gap-2">
<span className="font-display-lg text-display-lg font-extrabold text-on-surface">42.8M</span>
<span className="font-label-md text-label-md text-on-surface-variant">impressions</span>
</div>
<div className="flex items-center gap-2 text-label-sm font-label-sm text-tertiary">
<span className="material-symbols-outlined text-sm">arrow_upward</span>
<span>Tăng trưởng +26.5% so với tháng trước</span>
</div>
</div>
<div className="w-full bg-surface-container-high h-1.5 rounded-full mt-5 overflow-hidden">
<div className="bg-tertiary h-full rounded-full w-[84%]"></div>
</div>
</div>
{/*  Card 4  */}
<div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group">
<div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-surface-container pointer-events-none transition-transform group-hover:scale-125"></div>
<div className="flex items-center justify-between mb-4">
<span className="font-label-md text-label-md text-on-surface-variant font-semibold">Conversion Tới Quán Ăn</span>
<div className="w-11 h-11 rounded-2xl bg-surface-container-high text-secondary flex items-center justify-center">
<span className="material-symbols-outlined text-2xl">near_me</span>
</div>
</div>
<div className="flex flex-col gap-1">
<div className="flex items-baseline gap-2">
<span className="font-display-lg text-display-lg font-extrabold text-on-surface">14.8%</span>
<span className="font-label-md text-label-md text-tertiary font-bold">Rất cao</span>
</div>
<div className="flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant">
<span className="material-symbols-outlined text-sm text-secondary">explore</span>
<span>Định vị dẫn đường &amp; gọi xe tới quán trực tiếp</span>
</div>
</div>
<div className="w-full bg-surface-container-high h-1.5 rounded-full mt-5 overflow-hidden">
<div className="bg-secondary h-full rounded-full w-[65%]"></div>
</div>
</div>
</div>
{/*  Tier Progression Structure Showcase  */}
<div className="flex flex-col gap-4">
<div className="flex items-center justify-between">
<div>
<h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            Bảng Phân Cấp Danh Hiệu &amp; Tiêu Chuẩn Thăng Hạng
          </h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">
            Hệ sinh thái phân tầng 4 cấp bậc với cơ chế tích lũy Trust Score và xác thực minh bạch
          </p>
</div>
<button className="text-primary hover:text-on-primary-fixed-variant font-label-md text-label-md flex items-center gap-1">
<span>Chỉnh sửa tiêu chuẩn thăng cấp</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</button>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
{/*  Tier 1  */}
<div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden transition-all hover:shadow-md">
<div className="flex items-start justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Level 01 - 03</span>
<h3 className="font-title-md text-title-md font-bold text-on-surface mt-1">Foodie Mới Nhập Khẩu</h3>
</div>
<div className="w-10 h-10 rounded-2xl bg-surface-container flex items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined text-xl">restaurant</span>
</div>
</div>
<div className="my-5 flex flex-col gap-3">
<div className="p-3.5 rounded-2xl bg-surface-container-low flex flex-col gap-1.5">
<span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Tiêu chuẩn thăng cấp</span>
<div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface">
<span className="material-symbols-outlined text-base text-secondary">pin_drop</span>
<span>5 review định vị GPS tại chỗ</span>
</div>
<div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface">
<span className="material-symbols-outlined text-base text-secondary">add_a_photo</span>
<span>10 ảnh chụp đĩa thức ăn nét cao</span>
</div>
</div>
<div className="p-3.5 rounded-2xl bg-surface-container-low flex flex-col gap-1.5">
<span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Đặc quyền cấp bậc</span>
<div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface">
<span className="material-symbols-outlined text-base text-tertiary">confirmation_number</span>
<span>Voucher ẩm thực 20.000đ</span>
</div>
<div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface">
<span className="material-symbols-outlined text-base text-tertiary">badge</span>
<span>Huy hiệu Tân Binh Sành Ăn</span>
</div>
</div>
</div>
<div className="flex items-center justify-between pt-2">
<span className="font-label-sm text-label-sm text-on-surface-variant">5.120 thành viên</span>
<span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">Tự động cấp</span>
</div>
</div>
{/*  Tier 2  */}
<div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden transition-all hover:shadow-md">
<div className="flex items-start justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">Level 04 - 06</span>
<h3 className="font-title-md text-title-md font-bold text-on-surface mt-1">Thực Thần Tích Cực</h3>
</div>
<div className="w-10 h-10 rounded-2xl bg-secondary-fixed/50 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-xl">workspace_premium</span>
</div>
</div>
<div className="my-5 flex flex-col gap-3">
<div className="p-3.5 rounded-2xl bg-surface-container-low flex flex-col gap-1.5">
<span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Tiêu chuẩn thăng cấp</span>
<div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface">
<span className="material-symbols-outlined text-base text-secondary">rate_review</span>
<span>25 review mô tả chi tiết vị giác</span>
</div>
<div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface">
<span className="material-symbols-outlined text-base text-secondary">shield</span>
<span>Trust Score &gt; 80/100 (AI Verify)</span>
</div>
</div>
<div className="p-3.5 rounded-2xl bg-surface-container-low flex flex-col gap-1.5">
<span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Đặc quyền cấp bậc</span>
<div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface">
<span className="material-symbols-outlined text-base text-tertiary">star_rate</span>
<span>Ghim top bình luận đánh giá</span>
</div>
<div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface">
<span className="material-symbols-outlined text-base text-tertiary">card_giftcard</span>
<span>Huy hiệu Bạc + Combo quà tặng</span>
</div>
</div>
</div>
<div className="flex items-center justify-between pt-2">
<span className="font-label-sm text-label-sm text-on-surface-variant">2.814 thành viên</span>
<span className="px-2.5 py-1 rounded-full bg-secondary-fixed/40 text-secondary font-label-sm text-label-sm font-semibold">Silver Tier</span>
</div>
</div>
{/*  Tier 3  */}
<div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden transition-all hover:shadow-md">
<div className="flex items-start justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary-container">Level 07 - 09</span>
<h3 className="font-title-md text-title-md font-bold text-on-surface mt-1">Sứ Giả Ẩm Thực (Ambassador)</h3>
</div>
<div className="w-10 h-10 rounded-2xl bg-secondary-container/20 flex items-center justify-center text-secondary-container">
<span className="material-symbols-outlined text-xl">military_tech</span>
</div>
</div>
<div className="my-5 flex flex-col gap-3">
<div className="p-3.5 rounded-2xl bg-surface-container-low flex flex-col gap-1.5">
<span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Tiêu chuẩn thăng cấp</span>
<div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface">
<span className="material-symbols-outlined text-base text-secondary">menu_book</span>
<span>100 review &amp; khám phá 50 quán lạ</span>
</div>
<div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface">
<span className="material-symbols-outlined text-base text-secondary">recommend</span>
<span>1000 lượt vote Hữu Ích từ cộng đồng</span>
</div>
</div>
<div className="p-3.5 rounded-2xl bg-surface-container-low flex flex-col gap-1.5">
<span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Đặc quyền cấp bậc</span>
<div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface">
<span className="material-symbols-outlined text-base text-tertiary">celebration</span>
<span>Vé mời tiệc độc quyền Tasting Menu</span>
</div>
<div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface">
<span className="material-symbols-outlined text-base text-tertiary">workspace_premium</span>
<span>Badge Vàng Sứ Giả Tỉnh / Thành</span>
</div>
</div>
</div>
<div className="flex items-center justify-between pt-2">
<span className="font-label-sm text-label-sm text-on-surface-variant">420 đại sứ</span>
<span className="px-2.5 py-1 rounded-full bg-secondary-container/20 text-secondary-container font-label-sm text-label-sm font-semibold">Gold Ambassador</span>
</div>
</div>
{/*  Tier 4  */}
<div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden transition-all hover:shadow-md">
<div className="flex items-start justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-primary">Cấp Đặc Biệt</span>
<h3 className="font-title-md text-title-md font-bold text-on-surface mt-1">KOL Ẩm Thực Tích Xanh</h3>
</div>
<div className="w-10 h-10 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-xl">verified</span>
</div>
</div>
<div className="my-5 flex flex-col gap-3">
<div className="p-3.5 rounded-2xl bg-surface-container-low flex flex-col gap-1.5">
<span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Tiêu chuẩn thăng cấp</span>
<div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface">
<span className="material-symbols-outlined text-base text-primary">public</span>
<span>MXH &gt;50K followers ẩm thực</span>
</div>
<div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface">
<span className="material-symbols-outlined text-base text-primary">gavel</span>
<span>Ký cam kết liêm chính chống review bẩn</span>
</div>
</div>
<div className="p-3.5 rounded-2xl bg-surface-container-low flex flex-col gap-1.5">
<span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Đặc quyền cấp bậc</span>
<div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface">
<span className="material-symbols-outlined text-base text-tertiary">monetization_on</span>
<span>Hoa hồng giới thiệu &amp; Booking QC</span>
</div>
<div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface">
<span className="material-symbols-outlined text-base text-tertiary">check_circle</span>
<span>Tích xanh bảo chứng trên LOCALEATS</span>
</div>
</div>
</div>
<div className="flex items-center justify-between pt-2">
<span className="font-label-sm text-label-sm text-on-surface-variant">486 người sáng tạo</span>
<span className="px-2.5 py-1 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-semibold">Verified Creator</span>
</div>
</div>
</div>
</div>
{/*  Main Content Split: Creator Table & Integrity Checker  */}
<div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
{/*  Creator List Table (8 Cols)  */}
<div className="xl:col-span-8 flex flex-col gap-4 bg-surface-container-lowest rounded-3xl p-6 shadow-sm">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
<div className="flex flex-col">
<h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Danh Sách KOL &amp; Reviewer Đang Hoạt Động
            </h2>
<span className="font-body-sm text-body-sm text-on-surface-variant">
              Theo dõi hiệu suất truyền thông, tính minh bạch và chỉ số chuyển đổi thực khách
            </span>
</div>
<div className="flex items-center gap-2">
<div className="relative">
<input className="h-10 pl-9 pr-4 rounded-full bg-surface-container-low text-on-surface placeholder:text-outline text-body-sm font-body-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-48 sm:w-64" placeholder="Tìm KOL, handle..." type="text"/>
<span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-lg">search</span>
</div>
<button className="h-10 w-10 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface-variant" title="Lọc theo cấp bậc">
<span className="material-symbols-outlined text-lg">filter_list</span>
</button>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
<th className="py-3 px-4 rounded-l-2xl">KOL / Reviewer</th>
<th className="py-3 px-4">Cấp Bậc &amp; Quy Mô</th>
<th className="py-3 px-4">Đóng Góp LOCALEATS</th>
<th className="py-3 px-4">Chỉ Số Uy Tín (Trust Score)</th>
<th className="py-3 px-4 rounded-r-2xl text-right">Hành Động</th>
</tr>
</thead>
<tbody className="font-body-sm text-body-sm divide-y-0">
{/*  Row 1: Ninh Titok  */}
<tr className="hover:bg-surface-container-low/50 transition-colors group">
<td className="py-4 px-4">
<div className="flex items-center gap-3">
<div className="relative w-12 h-12 flex-shrink-0">
<img className="w-12 h-12 rounded-full object-cover shadow-xs" data-alt="Chân dung nhà sáng tạo nội dung ẩm thực nam trẻ tuổi cười rạng rỡ đang cầm đũa tại quán ăn phố cổ Hà Nội, ánh sáng vàng ấm cúng, ảnh chất lượng cao chuyên nghiệp" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBT5EcpqCWgKCYjtpek4xPgBS37r3Hi0dlHWxkvIG27ZggfSRo71wLw-zJO6rQD3_FuZ6RRayeVPWagkGtBkhr-wYpxTejyzsTw9qNOZGa6eXfM_ZDN-CNs9Q4eR5EtTwEM-3tEZSCbeBj3-p55LH05d7D1UKidZCl7uV3gZnxoNMiD6LV-uIttZYNp__UxkzU0q8fVWBScTEgMLTmAF8hbIZNSlaIm7Ep8gRdGnlQ"/>
<span className="material-symbols-outlined text-primary text-base absolute -bottom-1 -right-1 bg-surface-container-lowest rounded-full p-0.5">verified</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-1.5">
<span className="font-title-md text-title-md font-bold text-on-surface">Ninh Titok</span>
<span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-[10px] font-bold">PRO</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant">@ninhtitok</span>
</div>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold text-on-surface">Verified Diamond</span>
<span className="text-on-surface-variant text-label-sm font-label-sm">1.2M TikTok Followers</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold text-on-surface">82 bài review</span>
<span className="text-secondary text-label-sm font-label-sm">14 chiến dịch Food Tasting</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col gap-1">
<div className="flex items-center gap-2">
<span className="font-label-md text-label-md font-extrabold text-tertiary">99.2%</span>
<span className="text-[11px] font-label-sm text-tertiary bg-tertiary-fixed px-2 py-0.5 rounded-full">Tuyệt đối</span>
</div>
<span className="text-on-surface-variant text-[11px] font-label-sm">0 vi phạm xung đột tài trợ</span>
</div>
</td>
<td className="py-4 px-4 text-right">
<div className="flex items-center justify-end gap-2">
<button className="px-3.5 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-all" title="Xem báo cáo chi tiết">
                      Xem hồ sơ
                    </button>
<button className="px-3.5 py-1.5 rounded-full bg-primary-fixed hover:bg-primary-container hover:text-on-primary-container text-primary font-label-sm text-label-sm font-bold transition-all">
                      Cấp hợp đồng
                    </button>
</div>
</td>
</tr>
{/*  Row 2: Dino Vũ  */}
<tr className="hover:bg-surface-container-low/50 transition-colors group">
<td className="py-4 px-4">
<div className="flex items-center gap-3">
<div className="relative w-12 h-12 flex-shrink-0">
<img className="w-12 h-12 rounded-full object-cover shadow-xs" data-alt="Food blogger nổi tiếng đang làm bánh trong căn bếp mở cao cấp, phong cách lifestyle tinh tế, ánh sáng tự nhiên ấm áp dịu dàng" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDloB89IFG1UIQq_Q6AUk4gjfCHykrudLpddUCHtFx4wKGiV_QZEEmb4OwFF9FJHNmOa6sy1cPo0pc_GD1AyVxrT3TYaFZZdLOywjx-wxezuRnmU5GjZsG36TeQYLtHPI5y58zp0ZZLkbJxYZuCeufJtNS_WFuyCq1nSZA1oAzgsYt7EESakPmV6gnHn3KpKqdVox6hWEuL4N29dFxHK02pJJC7K7jpD536Vvfd4a4"/>
<span className="material-symbols-outlined text-primary text-base absolute -bottom-1 -right-1 bg-surface-container-lowest rounded-full p-0.5">verified</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-1.5">
<span className="font-title-md text-title-md font-bold text-on-surface">Dino Vũ</span>
<span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-[10px] font-bold">CHEF</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant">@dinovufood</span>
</div>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold text-on-surface">Verified Diamond</span>
<span className="text-on-surface-variant text-label-sm font-label-sm">850K Subscribers</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold text-on-surface">64 bài review</span>
<span className="text-secondary text-label-sm font-label-sm">9 chiến dịch Fine Dining</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col gap-1">
<div className="flex items-center gap-2">
<span className="font-label-md text-label-md font-extrabold text-tertiary">98.5%</span>
<span className="text-[11px] font-label-sm text-tertiary bg-tertiary-fixed px-2 py-0.5 rounded-full">Cao</span>
</div>
<span className="text-on-surface-variant text-[11px] font-label-sm">Được chứng nhận Sommeliers</span>
</div>
</td>
<td className="py-4 px-4 text-right">
<div className="flex items-center justify-end gap-2">
<button className="px-3.5 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-all">
                      Xem hồ sơ
                    </button>
<button className="px-3.5 py-1.5 rounded-full bg-surface-container-high hover:bg-secondary-fixed text-secondary font-label-sm text-label-sm font-semibold transition-all">
                      Mời tiệc VIP
                    </button>
</div>
</td>
</tr>
{/*  Row 3: Huyền Foodie Hà Nội  */}
<tr className="hover:bg-surface-container-low/50 transition-colors group">
<td className="py-4 px-4">
<div className="flex items-center gap-3">
<div className="relative w-12 h-12 flex-shrink-0">
<img className="w-12 h-12 rounded-full object-cover shadow-xs" data-alt="Nữ food reviewer trẻ trung vui vẻ đang thưởng thức bát phở bò nóng hổi bốc khói tại vỉa hè Hà Nội thời điểm hoàng hôn vàng óng" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfRxIlvoiJIC5hURGDkdrPyxYaAr5gffLxK1VuoRMmHxmJX3nTb7fLwLyLvDRijT-LV0UD_4KqthUSfnIuzmgERi19EBeLXy8S5FmBm5xYNd2zw-FnApku8H_IhRGGQrYbAjmraJQQWqcJLu-9zGY-iU17EXv0QMLlHh1p06MNl1p1BI_SW26pIgKZtWubVUCFFjKDqDKO2FPSQsd_ASHmoEwpJHEEdm2DpQFAbJg"/>
<span className="material-symbols-outlined text-secondary-container text-base absolute -bottom-1 -right-1 bg-surface-container-lowest rounded-full p-0.5">workspace_premium</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-1.5">
<span className="font-title-md text-title-md font-bold text-on-surface">Huyền Foodie Hà Nội</span>
<span className="px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary-container font-label-sm text-[10px] font-bold">TOP LOCAL</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant">@huyenfoodie</span>
</div>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold text-on-surface">Sứ Giả Ẩm Thực Vàng</span>
<span className="text-on-surface-variant text-label-sm font-label-sm">Top 1 Reviewer Hoàn Kiếm</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold text-on-surface">142 bài review chân thực</span>
<span className="text-tertiary text-label-sm font-label-sm font-semibold">Đã kéo 4.500 lượt khách ghé</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col gap-1">
<div className="flex items-center gap-2">
<span className="font-label-md text-label-md font-extrabold text-tertiary">97.8%</span>
<span className="text-[11px] font-label-sm text-tertiary bg-tertiary-fixed px-2 py-0.5 rounded-full">Xuất sắc</span>
</div>
<span className="text-on-surface-variant text-[11px] font-label-sm">98.2% ảnh gốc không filter ảo</span>
</div>
</td>
<td className="py-4 px-4 text-right">
<div className="flex items-center justify-end gap-2">
<button className="px-3.5 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-all">
                      Xem hồ sơ
                    </button>
<button className="px-3.5 py-1.5 rounded-full bg-secondary-container/20 text-secondary font-label-sm text-label-sm font-bold transition-all">
                      Thưởng Ambassador
                    </button>
</div>
</td>
</tr>
{/*  Row 4: Tuấn Ăn Đêm (Warning Case)  */}
<tr className="hover:bg-error-container/20 transition-colors group bg-error-container/10">
<td className="py-4 px-4">
<div className="flex items-center gap-3">
<div className="relative w-12 h-12 flex-shrink-0">
<img className="w-12 h-12 rounded-full object-cover shadow-xs opacity-75" data-alt="Chân dung nam reviewer ngồi trong quán ăn khuya ánh đèn mờ, phong cách ẩm thực đường phố đêm Sài Gòn" src="https://lh3.googleusercontent.com/aida-public/AB6AXuArUXT4tz2s4ab6lbGOkVXFayoU0Pb2dEALe-dpgfmjdEA_iAtirvXJMeXst-OP5CuamaMOhH22AlwJyqBZRJVrRhlit2d2i2rz3yAEG9irKV1FcHsdp5sZ11H6ZeDJXLbtHXf9zqFgDPuQmGqA2WYeGsN10WX4Sy4EbefdVbmRzwUAjMwcBDG9ud14V2qhD8xdv8S7WGEIXQW-MDTOPWFeeK_JwNul4JQ6ChR-QPU"/>
<span className="material-symbols-outlined text-error text-base absolute -bottom-1 -right-1 bg-surface-container-lowest rounded-full p-0.5">warning</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-1.5">
<span className="font-title-md text-title-md font-bold text-on-surface">Tuấn Ăn Đêm</span>
<span className="px-2 py-0.5 rounded-full bg-error-container text-error font-label-sm text-[10px] font-bold">SUSPENDED</span>
</div>
<span className="font-label-sm text-label-sm text-error font-medium">@tuanandem99</span>
</div>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold text-error">Bị Cảnh Cáo (Warning)</span>
<span className="text-on-surface-variant text-label-sm font-label-sm">Đình chỉ quyền lợi 30 ngày</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold text-on-surface">38 bài review</span>
<span className="text-error text-label-sm font-label-sm">3 bài bị gỡ do dối trá</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col gap-1">
<div className="flex items-center gap-2">
<span className="font-label-md text-label-md font-extrabold text-error">42.1%</span>
<span className="text-[11px] font-label-sm text-error bg-error-container px-2 py-0.5 rounded-full">Gian lận</span>
</div>
<span className="text-error text-[11px] font-label-sm">Nhận tiền PR không gắn nhãn QC</span>
</div>
</td>
<td className="py-4 px-4 text-right">
<div className="flex items-center justify-end gap-2">
<button className="px-3.5 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-all">
                      Xem vi phạm
                    </button>
<button className="px-3.5 py-1.5 rounded-full bg-error text-on-error font-label-sm text-label-sm font-bold transition-all shadow-xs">
                      Tước huy hiệu
                    </button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
{/*  Table Pagination & Bulk Action  */}
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
<span className="font-label-sm text-label-sm text-on-surface-variant">
            Hiển thị 4 trên tổng số 486 KOLs và 8.420 Reviewers có huy hiệu
          </span>
<div className="flex items-center gap-2">
<button className="h-9 px-3 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-sm">chevron_left</span> Trước
            </button>
<span className="px-3 py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-bold">1</span>
<button className="h-9 w-9 rounded-full hover:bg-surface-container text-on-surface font-label-sm text-label-sm">2</button>
<button className="h-9 w-9 rounded-full hover:bg-surface-container text-on-surface font-label-sm text-label-sm">3</button>
<button className="h-9 px-3 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm flex items-center gap-1">
              Sau <span className="material-symbols-outlined text-sm">chevron_right</span>
</button>
</div>
</div>
</div>
{/*  Integrity & Bias Checker Tool (4 Cols)  */}
<div className="xl:col-span-4 flex flex-col gap-6">
{/*  AI Integrity Card  */}
<div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col gap-5 relative overflow-hidden">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2.5">
<div className="w-10 h-10 rounded-2xl bg-tertiary-fixed text-tertiary flex items-center justify-center">
<span className="material-symbols-outlined text-xl">psychology</span>
</div>
<div className="flex flex-col">
<h3 className="font-title-md text-title-md font-bold text-on-surface">LOCALEATS Integrity AI</h3>
<span className="font-label-sm text-label-sm text-tertiary font-semibold">Realtime Bias Detection</span>
</div>
</div>
<span className="px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm font-bold">v4.2.1</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
            Mô hình phân tích đối chiếu ngôn từ ngữ cảnh, hóa đơn đối soát thực tế và tọa độ GPS ở quán để phát hiện reviewer bị mua chuộc hoặc nhận tiền chìm.
          </p>
{/*  Visual AI Radar/Graph Gauge  */}
<div className="p-4 rounded-2xl bg-surface-container-low flex flex-col gap-3">
<div className="flex items-center justify-between font-label-sm text-label-sm">
<span className="text-on-surface font-bold">Chỉ số Khách Quan Toàn Mạng Lưới</span>
<span className="text-tertiary font-extrabold text-base">96.4%</span>
</div>
{/*  SVG Progress Indicator  */}
<div className="w-full flex items-center gap-3">
<svg className="w-full h-3 rounded-full bg-surface-container-highest overflow-hidden" preserveaspectratio="none" viewBox="0 0 100 8">
<rect className="fill-current text-tertiary" height="8" width="96.4" x="0" y="0"></rect>
</svg>
</div>
<div className="grid grid-cols-2 gap-2 pt-2">
<div className="p-2.5 rounded-xl bg-surface-container flex flex-col">
<span className="text-[11px] font-label-sm text-on-surface-variant">Review Thật &amp; Khách Quan</span>
<span className="font-title-md text-title-md font-bold text-on-surface">99.4%</span>
</div>
<div className="p-2.5 rounded-xl bg-surface-container flex flex-col">
<span className="text-[11px] font-label-sm text-on-surface-variant">Nghi Vấn Nhận Tiền Ẩn</span>
<span className="font-title-md text-title-md font-bold text-error">0.6%</span>
</div>
</div>
</div>
{/*  Alert Stream  */}
<div className="flex flex-col gap-3">
<span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Cảnh Báo Xung Đột Lợi Ích Gần Đây</span>
{/*  Alert Item 1  */}
<div className="p-3.5 rounded-2xl bg-error-container/20 flex flex-col gap-2">
<div className="flex items-start justify-between gap-2">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-error text-lg">flag</span>
<span className="font-label-md text-label-md font-bold text-on-surface">Phát hiện bài viết bất thường</span>
</div>
<span className="text-[11px] font-label-sm text-on-surface-variant">14 phút trước</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface leading-tight">
                Reviewer <strong className="text-error">@huan_foodboy</strong> chấm 5 sao tuyệt đối và dùng 12 tính từ khen ngợi tột đỉnh cho quán BBQ vừa khai trương mà không xuất trình hoá đơn thanh toán.
              </p>
<div className="flex items-center gap-2 pt-1">
<button className="px-3 py-1 rounded-full bg-error text-on-error font-label-sm text-label-sm font-bold">
                  Khóa tạm thời
                </button>
<button className="px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
                  Yêu cầu hóa đơn
                </button>
</div>
</div>
{/*  Alert Item 2  */}
<div className="p-3.5 rounded-2xl bg-secondary-fixed/30 flex flex-col gap-2">
<div className="flex items-start justify-between gap-2">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-lg">report_problem</span>
<span className="font-label-md text-label-md font-bold text-on-surface">Không gắn nhãn #Sponsored</span>
</div>
<span className="text-[11px] font-label-sm text-on-surface-variant">2 giờ trước</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface leading-tight">
                KOL <strong className="text-secondary">@phuc_an_uong</strong> đăng tải video có mã giảm giá riêng của nhà hàng nhưng chưa khai báo qua cổng LOCALEATS Partner Booking.
              </p>
<div className="flex items-center gap-2 pt-1">
<button className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                  Gửi nhắc nhở tuân thủ
                </button>
</div>
</div>
</div>
<button className="w-full py-3 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md flex items-center justify-center gap-2 transition-all">
<span className="material-symbols-outlined text-base">history</span>
            Xem Toàn Bộ Nhật Ký Giám Sát (Audit Log)
          </button>
</div>
{/*  Foodie Ambassador Program Quick Action Card  */}
<div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col gap-4">
<div className="flex items-center justify-between">
<span className="font-title-md text-title-md font-bold text-on-surface">Đặc Quyền Voucher Reviewer</span>
<span className="material-symbols-outlined text-secondary text-xl">loyalty</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
            Ngân sách tự động giải ngân thưởng tháng này cho các Foodie đạt mốc cống hiến:
          </p>
<div className="flex items-baseline justify-between p-3.5 rounded-2xl bg-surface-container-low">
<span className="font-label-md text-label-md text-on-surface font-semibold">Đã cấp thưởng:</span>
<span className="font-title-md text-title-md font-bold text-primary">164.500.000đ</span>
</div>
<div className="flex items-baseline justify-between p-3.5 rounded-2xl bg-surface-container-low">
<span className="font-label-md text-label-md text-on-surface font-semibold">Quỹ bảo trợ khách quan:</span>
<span className="font-title-md text-title-md font-bold text-tertiary">500.000.000đ</span>
</div>
<button className="w-full py-3 rounded-full bg-primary-container text-on-primary font-label-md text-label-md font-bold hover:bg-primary transition-all active:scale-95 shadow-xs">
            Nạp thêm quỹ &amp; duyệt xuất voucher
          </button>
</div>
</div>
</div>
</div>
</div></main>
    </div>
  );
}
