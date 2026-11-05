import { useState } from "react";

/**
 * AdminKycTab
 * Super Admin Screen: Phê Duyệt Mới (KYC & ATTP) & Vi Phạm Khóa Quán
 * Auto-generated from Google Stitch design with full length fidelity.
 */
export default function AdminKycTab({ onNavigateTab }) {
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
<div className="p-3 sm:p-6 lg:p-8 max-w-[1720px] mx-auto w-full space-y-8">
{/*  Top Editorial Header & Operational Live Strip  */}
<div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 bg-surface-container p-6 rounded-3xl shadow-sm">
<div className="space-y-1.5">
<div className="flex items-center gap-2.5">
<span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm uppercase tracking-wider font-extrabold">Hạ Tầng Pháp Lý &amp; Kiểm Duyệt</span>
<span className="text-on-surface-variant font-label-sm text-label-sm">|</span>
<span className="font-label-sm text-label-sm text-tertiary flex items-center gap-1 font-bold">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-ping"></span>
            AI Sentinel 4.2: Tự Động Quét 24/7
          </span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Thẩm Định KYC/ATTP &amp; Chế Tài Vi Phạm</h1>
<p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">Trung tâm điều hành tối cao kiểm tra tính xác thực pháp lý cơ sở ẩm thực, kiểm định hồ sơ vệ sinh an toàn thực phẩm và thực thi lệnh khóa đối tác sai phạm.</p>
</div>
<div className="flex items-center gap-3">
<button className="px-5 py-2.5 rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface font-label-md text-label-md flex items-center gap-2 transition shadow-sm hover:scale-[1.01] active:scale-[0.98]" id="btn-export-dossier">
<span className="material-symbols-outlined text-lg text-secondary">download</span>
          Xuất Báo Cáo Tuân Thủ (.xlsx)
        </button>
<button className="px-6 py-2.5 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md flex items-center gap-2 transition shadow-md shadow-primary/20 hover:scale-[1.01] active:scale-[0.98]" id="btn-trigger-scan">
<span className="material-symbols-outlined text-lg">radar</span>
          Quét Toàn Quốc Khẩn Cấp
        </button>
</div>
</div>
{/*  Section 1: Tab Navigation System  */}
<div className="flex flex-wrap items-center justify-between gap-4">
<div className="inline-flex p-1.5 rounded-full bg-surface-container-high shadow-inner">
<button className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm transition-all" id="tab-btn-kyc">
<span className="material-symbols-outlined text-lg">verified_user</span>
<span className="">1. Hàng Đợi KYC &amp; ATTP</span>
<span className="px-2 py-0.5 rounded-full bg-white/20 text-on-primary font-label-sm text-label-sm font-extrabold">14 chờ</span>
</button>
<button className="flex items-center gap-2.5 px-6 py-3 rounded-full text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg transition-all" id="tab-btn-enforce">
<span className="material-symbols-outlined text-lg">gavel</span>
<span className="">2. Chế Tài &amp; Quán Vi Phạm</span>
<span className="px-2 py-0.5 rounded-full bg-error-container text-error font-label-sm text-label-sm font-extrabold">3 Khóa • 8 Theo Dõi</span>
</button>
<button className="flex items-center gap-2.5 px-6 py-3 rounded-full text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg transition-all" id="tab-btn-appeals">
<span className="material-symbols-outlined text-lg">quickreply</span>
<span className="">3. Lịch Sử Giải Trình &amp; Khiếu Nại</span>
<span className="px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary font-label-sm text-label-sm font-extrabold">5 mới</span>
</button>
</div>
<div className="flex items-center gap-3">
<span className="font-label-sm text-label-sm text-on-surface-variant">Lọc theo khu vực:</span>
<div className="flex gap-1.5">
<button className="px-3.5 py-1.5 rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-xs font-bold">Toàn Quốc</button>
<button className="px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm">Hà Nội (6)</button>
<button className="px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm">TP.HCM (7)</button>
<button className="px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm">Đà Nẵng (1)</button>
</div>
</div>
</div>
{/*  Section 2: Core KPI Metrics Bento Grid  */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
{/*  Card 1: Pass Rate  */}
<div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant font-bold uppercase tracking-wider">Tỷ Lệ Đạt Chuẩn KYC &amp; ATTP</span>
<span className="w-10 h-10 rounded-2xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-xl">verified</span>
</span>
</div>
<div className="my-4 flex items-baseline gap-3">
<span className="font-display-lg text-display-lg text-on-surface font-extrabold tracking-tight">87.4%</span>
<span className="font-label-sm text-label-sm text-tertiary flex items-center font-bold">
<span className="material-symbols-outlined text-base">trending_up</span> +3.1% vs tháng trước
          </span>
</div>
<div className="space-y-2">
<div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
<div className="bg-tertiary h-full rounded-full" style={{ width: "87.4%" }}></div>
</div>
<div className="flex justify-between font-label-sm text-[11px] text-on-surface-variant">
<span className="">Đạt chuẩn ngay lần 1: 74%</span>
<span className="">Sau bổ sung hồ sơ: 13.4%</span>
</div>
</div>
</div>
{/*  Card 2: SLA Response Time  */}
<div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant font-bold uppercase tracking-wider">Thời Gian Thẩm Định (SLA)</span>
<span className="w-10 h-10 rounded-2xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-xl">timer</span>
</span>
</div>
<div className="my-4 flex items-baseline gap-3">
<span className="font-display-lg text-display-lg text-secondary font-extrabold tracking-tight">1.8h</span>
<span className="font-label-sm text-label-sm text-tertiary font-bold">Đạt SLA &lt; 4.0h</span>
</div>
<div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
<span className="material-symbols-outlined text-base text-secondary">bolt</span>
<span className="">OCR Tự động trích xuất CCCD &amp; QR: <strong className="text-on-surface">9.2 giây/bản</strong></span>
</div>
</div>
{/*  Card 3: Sanctioned Merchants  */}
<div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant font-bold uppercase tracking-wider">Chế Tài Khóa Do ATTP / Gian Lận</span>
<span className="w-10 h-10 rounded-2xl bg-error-container text-error flex items-center justify-center">
<span className="material-symbols-outlined text-xl">block</span>
</span>
</div>
<div className="my-4 flex items-baseline gap-3">
<span className="font-display-lg text-display-lg text-error font-extrabold tracking-tight">12</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Quán (Quý II/2025)</span>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
<span className="flex items-center gap-1 text-error"><span className="w-2 h-2 rounded-full bg-error"></span> 3 Vĩnh Viễn</span>
<span className="flex items-center gap-1 text-secondary"><span className="w-2 h-2 rounded-full bg-secondary"></span> 9 Tạm Thời</span>
<span className="text-tertiary font-bold">0 Sai Lệch</span>
</div>
</div>
{/*  Card 4: GPS Precision Rectification  */}
<div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant font-bold uppercase tracking-wider">Khắc Phục Tọa Độ Sai Lệch</span>
<span className="w-10 h-10 rounded-2xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-xl">pin_drop</span>
</span>
</div>
<div className="my-4 flex items-baseline gap-3">
<span className="font-display-lg text-display-lg text-on-surface font-extrabold tracking-tight">98.2%</span>
<span className="font-label-sm text-label-sm text-tertiary font-bold flex items-center">
<span className="material-symbols-outlined text-base">check_circle</span> Geofence Sai Số &lt; 2m
          </span>
</div>
<div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
<span className="">Đã xác thực thực địa: <strong className="text-on-surface">1,420 quán</strong></span>
<span className="text-primary font-bold">18 lệch vị trí</span>
</div>
</div>
</div>
{/*  Section 3: Deep KYC Verification Deck (Active Dossier)  */}
<div className="space-y-6" id="view-kyc-deck">
{/*  Action Toolbar for KYC Queue  */}
<div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-surface-container-low p-4 rounded-2xl">
<div className="flex items-center gap-3">
<span className="w-3 h-3 rounded-full bg-primary animate-pulse"></span>
<span className="font-headline-sm text-headline-sm text-on-surface">Hồ Sơ Đang Xem Xét: <span className="text-primary font-extrabold">PHỞ GIA TRUYỀN BÁT ĐÀN (CHI NHÁNH THẢO ĐIỀN)</span></span>
<span className="px-2.5 py-0.5 rounded-full bg-secondary-container/20 text-secondary font-label-sm text-label-sm font-bold">Hồ sơ #KYC-2025-0894</span>
</div>
<div className="flex items-center gap-2">
<button className="p-2 rounded-xl bg-surface-container-lowest text-on-surface-variant hover:text-on-surface shadow-xs" title="Hồ sơ trước">
<span className="material-symbols-outlined">chevron_left</span>
</button>
<span className="font-label-md text-label-md text-on-surface px-2">Hồ sơ <strong>03</strong> / 14</span>
<button className="p-2 rounded-xl bg-surface-container-lowest text-on-surface-variant hover:text-on-surface shadow-xs" title="Hồ sơ tiếp">
<span className="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>
{/*  Main Dossier Card Grid: Split Layout  */}
<div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
{/*  Left: Visual Evidence (Facade, Interior, GPS Corroboration) - 7 cols  */}
<div className="xl:col-span-7 space-y-6">
{/*  Proof Image Pair: Facade & Registered Signboard  */}
<div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm space-y-4">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-xl">store</span>
<h3 className="font-title-md text-title-md text-on-surface">Ảnh Thực Tế Mặt Tiền &amp; Bảng Hiệu Đối Chiếu</h3>
</div>
<span className="px-3 py-1 rounded-full bg-tertiary/10 text-tertiary font-label-sm text-label-sm font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-sm">auto_awesome</span> AI Khớp Tên 99.8%
              </span>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
{/*  Photo 1: Storefront Exterior  */}
<div className="group relative rounded-2xl overflow-hidden bg-surface-container">
<img className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Vivid sunlit Vietnamese traditional beef pho restaurant storefront with large red wooden signboard reading 'PHỞ GIA TRUYỀN BÁT ĐÀN' with warm golden light, clear street number plate 42 Xuan Thuy Thao Dien, spotless glass entrance and cozy steaming kitchen visible inside." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTUTxCTsMZbLvkUxPQRlUn4sbCZdV7yizvRE097yIHuZWil5NMc6lB5QYsTGSBHSZsxGq_JFWruVQkGR__Fvsj6hnAtTBsG6DcaCzauKHjwWKdoUB_qxR9Q_dL6Jdy4LnTHVxdEAXcm3gFmN3UIDLJk691qeV80ZmyIqL1Vc9fG3lu4eM5ltjuTjgYEg9uYwmbifwucjXX9ui6GCVFGuPoaqqnllyo_ImS91vc9Rs" />
<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-3.5 text-white">
<span className="font-label-sm text-label-sm text-white/80">Camera chụp thực tế tại quán</span>
<span className="font-label-md text-label-md font-bold">Mặt tiền chính diện &amp; Số nhà 42</span>
</div>
<span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-tertiary text-white font-label-sm text-[10px] font-bold">GPS Tag Khớp</span>
</div>
{/*  Photo 2: Signboard Macro Inspection  */}
<div className="group relative rounded-2xl overflow-hidden bg-surface-container">
<img className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" data-alt="High-resolution close-up of a premium restaurant signboard in wooden warm tones with clear gold lettering 'PHỞ GIA TRUYỀN BÁT ĐÀN' showing business registration subtext, tax code, phone number and licensed culinary brand emblem under bright afternoon sunlight." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZRfz2K8OJAKECvAK_yFbw5G7-GazUDuJxUmh1-jNncREu1cpglclnw55HupkNDb-DuOcUHQbQSAMSUWo1uucyV-k8gXgIyNBKjUbCBl14Vzzw2FJXfyqmSKmKrWq3VCp0rT8gawtgZgeonfee1dKVemOdgPqwPXIk7C41VEM0TO2WT4af9ZfetND6GwIG0Sag_89daGlMaHjCSOP2AQVYN5yUXAo6YMHsiNS3cxY" />
<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-3.5 text-white">
<span className="font-label-sm text-label-sm text-white/80">Chi tiết bảng hiệu niêm yết</span>
<span className="font-label-md text-label-md font-bold">Tên kinh doanh &amp; MST 0317894211</span>
</div>
<span className="absolute top-3 right-3 px-2 py-1 rounded-md bg-surface/90 text-on-surface font-label-sm text-[10px] font-bold">Độ phân giải 4K</span>
</div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant bg-surface p-3 rounded-xl">
<strong>Ghi chú AI OCR:</strong> Chữ trên bảng hiệu trùng khớp hoàn toàn với hồ sơ đăng ký kinh doanh. Không phát hiện dấu hiệu chỉnh sửa ảnh (Photoshop/AI Generative deepfake check: Clean).
            </p>
</div>
{/*  Geolocation Corroboration Map Engine  */}
<div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm space-y-4">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-xl">map</span>
<h3 className="font-title-md text-title-md text-on-surface">Đối Chiếu Toạ Độ GPS &amp; Google Map Live API</h3>
</div>
<span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                Sai số: 0.8 mét (Hoàn hảo)
              </span>
</div>
{/*  Map View Container  */}
<div className="w-full h-64 rounded-2xl relative overflow-hidden bg-cover bg-center shadow-inner flex items-center justify-center" data-location="42 Xuan Thuy, Thao Dien, District 2, Ho Chi Minh City, Vietnam" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBcP_MxNcCTTG_bTAAVR6_LUD6942ooHKAAzEqcumko-1LEhCccXMkajj65jFBGohGkN0TUWvrkyNDMfEd6nTRnEOETPyACB_PXmTClqS3V2X3Y2fnXioDDRfIgnqSNa2UChFciqzxUGhK3_-6byOX3zK1AMtuzGfuEvkvKOWNXxfJ1wARO78i4wcyrshwBcUvW_XJVDU5sAXNs7zpc1148WoskS279apNnDmuU_aQ')" }}>
<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
{/*  Map Center Marker Simulation - Anchored GPS Pin (No bouncing/jumping)  */}
<div className="relative z-10 flex flex-col items-center">
<div className="relative flex items-center justify-center">
  <div className="w-16 h-16 rounded-full bg-primary/20 absolute -inset-2 border border-primary/40"></div>
  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl border-2 border-white relative z-10 transition-transform">
    <span className="material-symbols-outlined text-2xl">location_on</span>
  </div>
</div>
<div className="mt-2.5 px-3.5 py-1 rounded-full bg-white/95 text-on-surface text-center shadow-lg border border-primary/20 flex items-center gap-1.5 z-10">
  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
  <span className="font-mono text-xs font-bold text-primary">10.804245, 106.732912</span>
  <span className="text-[10px] text-on-surface-variant font-medium">(Tọa Độ Đã Khóa Cố Định)</span>
</div>
</div>
{/*  Satellite Geofence Overlay Badge  */}
<div className="absolute top-4 left-4 z-10 bg-surface/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-xs text-xs space-y-0.5">
<div className="flex items-center gap-1.5 font-label-sm text-on-surface font-bold">
<span className="w-2 h-2 rounded-full bg-tertiary"></span>
                  Lớp Bản Đồ Vệ Tinh Trực Quan
                </div>
<div className="text-[11px] text-on-surface-variant">42 Xuân Thủy, Phường Thảo Điền, TP. Thủ Đức</div>
</div>
</div>
<div className="grid grid-cols-3 gap-3 text-center">
<div className="bg-surface p-3 rounded-xl">
<span className="block font-label-sm text-[11px] text-on-surface-variant">Toạ độ khai báo</span>
<span className="font-label-md text-label-md font-bold text-on-surface">10.804240, 106.732910</span>
</div>
<div className="bg-surface p-3 rounded-xl">
<span className="block font-label-sm text-[11px] text-on-surface-variant">Vị trí ảnh chụp EXIF</span>
<span className="font-label-md text-label-md font-bold text-on-surface">10.804245, 106.732912</span>
</div>
<div className="bg-surface p-3 rounded-xl">
<span className="block font-label-sm text-[11px] text-on-surface-variant">Trạng thái Geofence</span>
<span className="font-label-md text-label-md font-bold text-tertiary">Trùng khớp tuyệt đối</span>
</div>
</div>
</div>
</div>
{/*  Right: Legal Credentials & Action Console - 5 cols  */}
<div className="xl:col-span-5 space-y-6">
{/*  Legal Certificates Card: GPKD & ATTP  */}
<div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm space-y-5">
<div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-xl">policy</span>
<h3 className="font-title-md text-title-md text-on-surface">Chứng Từ Pháp Lý &amp; ATTP</h3>
</div>
<span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[10px] font-bold uppercase">Hợp Pháp 100%</span>
</div>
{/*  Doc 1: ATTP Certificate Check  */}
<div className="bg-surface-container-low p-4 rounded-2xl space-y-3">
<div className="flex items-start justify-between">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center">
<span className="material-symbols-outlined text-2xl">sanitizer</span>
</div>
<div>
<span className="font-label-md text-label-md font-bold text-on-surface block">Giấy Chứng Nhận Vệ Sinh ATTP</span>
<span className="font-body-sm text-[12px] text-on-surface-variant">Số cấp: <strong>ATTP-HCM-2024-8193</strong></span>
</div>
</div>
<button className="px-2.5 py-1 rounded-lg bg-surface-container-lowest text-primary text-xs font-bold shadow-xs hover:bg-surface">Xem Ảnh Gốc</button>
</div>
<div className="grid grid-cols-2 gap-2 text-xs pt-1">
<div className="space-y-0.5">
<span className="text-on-surface-variant">Cơ quan cấp:</span>
<span className="font-semibold block text-on-surface">Ban QLATTP TP.HCM</span>
</div>
<div className="space-y-0.5">
<span className="text-on-surface-variant">Thời hạn hiệu lực:</span>
<span className="font-semibold block text-tertiary">Còn 2 năm 4 tháng (đến 10/2027)</span>
</div>
</div>
<div className="flex items-center gap-2 p-2 bg-white rounded-xl text-xs text-on-surface-variant">
<span className="material-symbols-outlined text-sm text-tertiary">qr_code_scanner</span>
<span className="">Mã QR Cục ATTP: <strong className="text-tertiary">Đã xác minh thật qua cổng Dịch Vụ Công</strong></span>
</div>
</div>
{/*  Doc 2: Business Registration & CCCD  */}
<div className="bg-surface-container-low p-4 rounded-2xl space-y-3">
<div className="flex items-start justify-between">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
<span className="material-symbols-outlined text-2xl">badge</span>
</div>
<div>
<span className="font-label-md text-label-md font-bold text-on-surface block">Đăng Ký Kinh Doanh &amp; CCCD</span>
<span className="font-body-sm text-[12px] text-on-surface-variant">Đại diện pháp luật: <strong>Đặng Trần Bảo Long</strong></span>
</div>
</div>
<button className="px-2.5 py-1 rounded-lg bg-surface-container-lowest text-primary text-xs font-bold shadow-xs hover:bg-surface">Đối Chiếu</button>
</div>
<div className="grid grid-cols-2 gap-2 text-xs pt-1">
<div className="space-y-0.5">
<span className="text-on-surface-variant">Mã số thuế quán:</span>
<span className="font-semibold block text-on-surface">0317894211</span>
</div>
<div className="space-y-0.5">
<span className="text-on-surface-variant">CCCD gắn chip:</span>
<span className="font-semibold block text-on-surface">001092003819 (Hợp lệ)</span>
</div>
</div>
</div>
{/*  Additional Risk Intelligence  */}
<div className="p-3.5 rounded-2xl bg-surface flex items-center justify-between text-xs">
<span className="text-on-surface-variant flex items-center gap-1.5">
<span className="material-symbols-outlined text-sm text-tertiary">security</span>
                Lịch sử gian lận chủ quán trên hệ thống:
              </span>
<span className="px-2 py-0.5 rounded bg-tertiary/10 text-tertiary font-bold">Hồ sơ sạch (0 vi phạm)</span>
</div>
</div>
{/*  Root Admin Decision Control Panel (One-touch approval)  */}
<div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm space-y-4">
<h3 className="font-title-md text-title-md text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-xl">draw</span>
              Quyết Định Phê Duyệt Của Super Admin
            </h3>
<div className="space-y-2">
<label className="font-label-sm text-label-sm text-on-surface-variant block">Ghi chú kiểm duyệt / Chỉ đạo hiển thị đặc quyền:</label>
<textarea className="w-full p-3 rounded-2xl bg-surface border-none focus:ring-2 focus:ring-primary text-body-sm text-on-surface placeholder:text-on-surface-variant/60" id="kyc-notes" placeholder="Nhập ghi chú cho Merchant hoặc lưu vết nội bộ... (Ví dụ: Đã kiểm tra thực tế, cấp nhãn Quán Mới Nổi bật)" rows="2"></textarea>
</div>
{/*  Primary Decision Buttons  */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
{/*  1-Touch Approve & Pin Map  */}
<button className="sm:col-span-3 py-3.5 px-4 rounded-full bg-primary-container text-on-primary font-label-md text-label-md font-bold flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] active:scale-[0.98] transition" id="btn-approve-kyc">
<span className="material-symbols-outlined text-xl">verified</span>
                Duyệt 1-Chạm: Cấp Quyền &amp; Ghim Bản Đồ Toàn Quốc
              </button>
{/*  Request Resubmission  */}
<button className="sm:col-span-2 py-3 px-3 rounded-full bg-surface-container text-secondary font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 hover:bg-surface-container-high transition" id="btn-request-changes">
<span className="material-symbols-outlined text-lg">replay</span>
                Yêu Cầu Bổ Sung Chứng Từ
              </button>
{/*  Reject  */}
<button className="py-3 px-3 rounded-full bg-error-container/60 hover:bg-error-container text-error font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 transition" id="btn-reject-kyc">
<span className="material-symbols-outlined text-lg">close</span>
                Từ Chối
              </button>
</div>
<div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-2 border-t border-surface-container">
<span className="">Kiểm duyệt viên: <strong>Nguyễn Hoàng Nam (Root)</strong></span>
<span className="flex items-center gap-1 text-tertiary">
<span className="material-symbols-outlined text-sm">lock</span> Chữ ký điện tử HSM Active
              </span>
</div>
</div>
</div>
</div>
</div>
{/*  Section 4: Enforcement & Blacklist Console (Punitive System)  */}
<div className="space-y-6" id="view-enforcement">
<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-surface-container-low p-6 rounded-3xl">
<div className="space-y-1">
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-error animate-ping"></span>
<h2 className="font-headline-md text-headline-md text-on-surface">Bảng Xử Lý Vi Phạm &amp; Chế Tài Khóa Quán</h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Các cơ sở bị phát hiện gian lận đánh giá, tăng giá niêm yết không báo trước hoặc vi phạm tiêu chuẩn vệ sinh ATTP do thực khách phản ánh.</p>
</div>
<div className="flex items-center gap-2">
<span className="px-3 py-1.5 rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-bold shadow-xs">
            Tổng 11 Quán Trong Tầm Ngắm
          </span>
<button className="px-4 py-2 rounded-full bg-error text-on-error font-label-sm text-label-sm font-bold flex items-center gap-1.5 shadow-sm hover:scale-[1.01]">
<span className="material-symbols-outlined text-base">security_update_warning</span>
            Cập Nhật Blacklist Toàn Quốc
          </button>
</div>
</div>
{/*  Enforcement Table Container  */}
<div className="bg-surface-container-lowest rounded-3xl shadow-sm overflow-hidden">
<div className="overflow-x-auto">
<table className="w-full text-left text-body-sm">
<thead className="bg-surface-container font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
<tr>
<th className="py-4 px-6">Quán &amp; Địa Chỉ</th>
<th className="py-4 px-4">Loại Hành Vi Vi Phạm</th>
<th className="py-4 px-4">Mức Độ &amp; Bằng Chứng AI</th>
<th className="py-4 px-4">Trạng Thái Chế Tài</th>
<th className="py-4 px-4">Bộ Công Cụ Chế Tài (Root Super Admin)</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-container font-body-sm">
{/*  Offender 1: Food Hygiene Violation (Red Flag)  */}
<tr className="hover:bg-surface/50 transition">
<td className="py-4 px-6">
<div className="flex items-center gap-3">
<img className="w-12 h-12 rounded-xl object-cover" data-alt="Small seafood restaurant in a coastal alley with outdoor plastic tables and cooking pots under harsh incandescent light with visible health inspection warning notice" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwaYSSVjshAaAcSYwNh6zCDuqmCQxXJ6Qv3d2HdhiTbN8VMe_emjhf8zUIN6mpFmGFoepFPkmLyzgnHg1gESdgeNfJfXIQeiK6IEJibh0SO3zazAdoaZDx9k9pL7I5RBZwEFUOooXHi-tA5wW27BxKZ9BbXF-5ZsBZvPxHLF65Ix9SQm_OOEX_uT3OT3R1jd5hTzRxHrMPGyJtF6LqDH217Ap_XEmO-h5vjn9ont4" />
<div>
<span className="font-label-md text-label-md font-bold text-on-surface block">Hải Sản Biển Đêm - Ốc 88</span>
<span className="text-xs text-on-surface-variant">142 Trần Bạch Đằng, Sơn Trà, Đà Nẵng</span>
</div>
</div>
</td>
<td className="py-4 px-4">
<span className="px-2.5 py-1 rounded-full bg-error-container text-error font-label-sm text-label-sm font-bold inline-flex items-center gap-1">
<span className="material-symbols-outlined text-sm">coronavirus</span> Bão Review Mất Vệ Sinh ATTP
                  </span>
<span className="block text-[11px] text-on-surface-variant mt-1">19 phản ánh ngộ độc trong 48h</span>
</td>
<td className="py-4 px-4">
<div className="flex items-center gap-2">
<span className="font-label-md text-label-md font-extrabold text-error">NGUY HIỂM (Cấp 3)</span>
</div>
<span className="text-xs text-on-surface-variant block mt-0.5">Sentinel AI: 94.8% trùng mẫu triệu chứng</span>
</td>
<td className="py-4 px-4">
<span className="px-3 py-1 rounded-full bg-error text-white font-label-sm text-label-sm font-bold inline-flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-white animate-pulse"></span> Đang Khóa 30 Ngày
                  </span>
<span className="block text-[11px] text-on-surface-variant mt-1">Đã thông báo QLTT địa phương</span>
</td>
<td className="py-4 px-4">
<div className="flex items-center gap-2">
<button className="px-3 py-1.5 rounded-full bg-surface-container text-error hover:bg-error hover:text-white font-label-sm text-label-sm font-bold transition flex items-center gap-1" title="Khóa vĩnh viễn và đưa vào danh sách đen">
<span className="material-symbols-outlined text-sm">lock</span> Khóa Vĩnh Viễn
                    </button>
<button className="px-3 py-1.5 rounded-full bg-surface-container text-secondary hover:bg-secondary hover:text-white font-label-sm text-label-sm font-bold transition flex items-center gap-1" title="Ẩn vị trí tìm kiếm của quán">
<span className="material-symbols-outlined text-sm">visibility_off</span> Shadowban Pin
                    </button>
</div>
</td>
</tr>
{/*  Offender 2: Price Gouging / Overcharging (Amber Flag)  */}
<tr className="hover:bg-surface/50 transition">
<td className="py-4 px-6">
<div className="flex items-center gap-3">
<img className="w-12 h-12 rounded-xl object-cover" data-alt="Traditional hot pot restaurant in old quarter Hanoi with outdoor seating and steaming broth, vintage wooden stools and lanterns" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4-IQS115qqNYNnTvCnJLNbklatEIxC725df_tvROlDNcEuqZPuGyxSvJTAapZJjx8t3u1jDR_nrx2bjhGTTw1Yh8zTEVW2CCScTjZ8JztVkYrU9kuj9QOypk27-oiZjQCJQ9aJGZM2aG20ORek72EbKHOoX9Ctu1WO4q--3Hor7Q_y6IEyfGmIwWVpyESW936aZjIdk8cw1pPIcbeqLJLsOE9cuFhKJtGpp9oGTY" />
<div>
<span className="font-label-md text-label-md font-bold text-on-surface block">Lẩu Riêu Cua Phố Cổ</span>
<span className="text-xs text-on-surface-variant">18 Hàng Buồm, Hoàn Kiếm, Hà Nội</span>
</div>
</div>
</td>
<td className="py-4 px-4">
<span className="px-2.5 py-1 rounded-full bg-secondary-container/30 text-secondary font-label-sm text-label-sm font-bold inline-flex items-center gap-1">
<span className="material-symbols-outlined text-sm">price_change</span> Tăng Giá Chặt Chém Khách Du Lịch
                  </span>
<span className="block text-[11px] text-on-surface-variant mt-1">Thu thêm 150k sai niêm yết menu app</span>
</td>
<td className="py-4 px-4">
<div className="flex items-center gap-2">
<span className="font-label-md text-label-md font-bold text-secondary">CẢNH BÁO (Cấp 2)</span>
</div>
<span className="text-xs text-on-surface-variant block mt-0.5">Hóa đơn chụp gửi kèm: 4 vụ xác nhận</span>
</td>
<td className="py-4 px-4">
<span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold inline-flex items-center gap-1">
                    Ẩn Ghim Tìm Kiếm 7 Ngày
                  </span>
<span className="block text-[11px] text-on-surface-variant mt-1">Đã tước huy hiệu "Must Try"</span>
</td>
<td className="py-4 px-4">
<div className="flex items-center gap-2">
<button className="px-3 py-1.5 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm font-bold transition flex items-center gap-1">
<span className="material-symbols-outlined text-sm">stars</span> Tước Huy Hiệu VIP
                    </button>
<button className="px-3 py-1.5 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-bold transition flex items-center gap-1">
<span className="material-symbols-outlined text-sm">pause_circle</span> Khóa Tạm Thời 7 Ngày
                    </button>
</div>
</td>
</tr>
{/*  Offender 3: Review Farms / Click Fraud (Orange Flag)  */}
<tr className="hover:bg-surface/50 transition">
<td className="py-4 px-6">
<div className="flex items-center gap-3">
<img className="w-12 h-12 rounded-xl object-cover" data-alt="Modern bubble tea and dessert bakery shop interior with warm wooden counters and bright neon signage in Ho Chi Minh City" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdpxfbMmqn4yn_sO6u13UqIn9jn9M0XRChkVT_Cs--swyFnPmz2H_XVSY2nEDNx-mjm7U6acYdZG18sGDiXm7qNNBdMeI9hGxJv8C1s1JkyYvKJqbpAxRSVop75ZjjwO7PFTGDmwAZlXq03ZZiSK7Ug1eR-VmowfOnpAQPZaJD71jz1VYPC5aNZde_Bcn563PnHaxmaWXjd0YaTHBG8kojxBN-l_tgyFVPuBcUVKY" />
<div>
<span className="font-label-md text-label-md font-bold text-on-surface block">Tiệm Trà &amp; Bánh SweetHour</span>
<span className="text-xs text-on-surface-variant">210 Sư Vạn Hạnh, Quận 10, TP.HCM</span>
</div>
</div>
</td>
<td className="py-4 px-4">
<span className="px-2.5 py-1 rounded-full bg-secondary-container/20 text-secondary font-label-sm text-label-sm font-bold inline-flex items-center gap-1">
<span className="material-symbols-outlined text-sm">smart_toy</span> Bơm Review Ảo (Click Farm)
                  </span>
<span className="block text-[11px] text-on-surface-variant mt-1">280 review 5-sao từ dải IP trùng lặp</span>
</td>
<td className="py-4 px-4">
<div className="flex items-center gap-2">
<span className="font-label-md text-label-md font-bold text-secondary">CẢNH BÁO (Cấp 1)</span>
</div>
<span className="text-xs text-on-surface-variant block mt-0.5">AI Sentinel chặn tự động 274 review</span>
</td>
<td className="py-4 px-4">
<span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-bold inline-flex items-center gap-1">
                    Đang Theo Dõi (Sandbox)
                  </span>
<span className="block text-[11px] text-on-surface-variant mt-1">Hạ trọng số tìm kiếm 80%</span>
</td>
<td className="py-4 px-4">
<div className="flex items-center gap-2">
<button className="px-3 py-1.5 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm font-bold transition flex items-center gap-1">
<span className="material-symbols-outlined text-sm">delete_sweep</span> Xóa Toàn Bộ Review Rác
                    </button>
<button className="px-3 py-1.5 rounded-full bg-surface-container text-secondary hover:bg-secondary hover:text-white font-label-sm text-label-sm font-bold transition flex items-center gap-1">
<span className="material-symbols-outlined text-sm">warning</span> Gửi Công Văn Cảnh Báo
                    </button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
{/*  Pagination & Audit Meta Strip  */}
<div className="p-4 bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-on-surface-variant">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-sm text-tertiary">verified_user</span>
<span className="">Mọi thao tác chế tài đều được lưu vết vĩnh viễn trên <strong>Immutable Audit Ledger</strong></span>
</div>
<div className="flex items-center gap-4">
<span className="">Hiển thị 1 - 3 của 11 quán cảnh báo</span>
<div className="flex items-center gap-1">
<button className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface hover:bg-surface">Trước</button>
<button className="px-2.5 py-1 rounded-lg bg-primary-container text-on-primary font-bold">1</button>
<button className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface hover:bg-surface">2</button>
<button className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface hover:bg-surface">Sau</button>
</div>
</div>
</div>
</div>
</div>
{/*  Section 5: Real-time Sentinel Intelligence Feed & Quick Audit Log  */}
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
{/*  AI Sentinel Automated Triggers  */}
<div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm space-y-4 xl:col-span-2">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-xl">psychology</span>
<h3 className="font-title-md text-title-md text-on-surface">Nhật Ký Tự Động Phân Tích Của AI Sentinel (Realtime Feed)</h3>
</div>
<span className="font-label-sm text-[11px] text-tertiary font-bold flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span> Streaming
          </span>
</div>
<div className="space-y-3 font-body-sm text-body-sm">
<div className="p-3.5 rounded-2xl bg-surface flex items-start justify-between gap-4">
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary mt-0.5">location_searching</span>
<div>
<span className="font-bold text-on-surface block">Phát hiện dịch chuyển toạ độ bất thường (&gt; 150m)</span>
<span className="text-xs text-on-surface-variant">Quán 'Cơm Tấm Ba Ghiền Chi Nhánh 3' - Đã tự động chặn cập nhật chờ Super Admin xác minh ảnh GPKD mới.</span>
</div>
</div>
<span className="font-label-sm text-[11px] text-on-surface-variant shrink-0">2 phút trước</span>
</div>
<div className="p-3.5 rounded-2xl bg-surface flex items-start justify-between gap-4">
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-tertiary mt-0.5">check_circle</span>
<div>
<span className="font-bold text-on-surface block">Xác thực thành công OCR Giấy Chứng Nhận ATTP</span>
<span className="text-xs text-on-surface-variant">Bún Chả Hương Liên (Cơ sở 2) - Thời hạn hợp lệ đến 12/2026, mã QR trùng khớp Cổng ATTP Hà Nội.</span>
</div>
</div>
<span className="font-label-sm text-[11px] text-on-surface-variant shrink-0">14 phút trước</span>
</div>
<div className="p-3.5 rounded-2xl bg-surface flex items-start justify-between gap-4">
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-error mt-0.5">report_problem</span>
<div>
<span className="font-bold text-on-surface block">Cảnh báo cụm review tiêu cực có dấu hiệu ngộ độc thực phẩm</span>
<span className="text-xs text-on-surface-variant">Khu vực Chợ Đêm Sơn Trà (Đà Nẵng): 8 người dùng đăng ảnh nhập viện - Hệ thống tự động gán nhãn [Xem Xét Khẩn Cấp].</span>
</div>
</div>
<span className="font-label-sm text-[11px] text-on-surface-variant shrink-0">41 phút trước</span>
</div>
</div>
</div>
{/*  Quick Resolution Panel  */}
<div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm space-y-4 flex flex-col justify-between">
<div className="space-y-3">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-xl">contact_support</span>
<h3 className="font-title-md text-title-md text-on-surface">Phiên Xử Lý Khẩn Cấp</h3>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Đường dây nóng pháp lý &amp; hỗ trợ giải trình chủ cơ sở ăn uống đang chịu chế tài.</p>
<div className="p-4 rounded-2xl bg-surface-container-low space-y-2">
<div className="flex items-center justify-between text-xs">
<span className="text-on-surface-variant">Cuộc gọi khiếu nại chờ nối máy:</span>
<span className="font-bold text-primary">02 đối tác</span>
</div>
<div className="flex items-center justify-between text-xs">
<span className="text-on-surface-variant">Biên bản giải trình gửi về:</span>
<span className="font-bold text-tertiary">05 hồ sơ mới</span>
</div>
<div className="flex items-center justify-between text-xs">
<span className="text-on-surface-variant">Tỷ lệ mở khóa sau phúc tra:</span>
<span className="font-bold text-on-surface">12.5% (Nghiêm ngặt)</span>
</div>
</div>
</div>
<button className="w-full py-3 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-bold transition flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-lg">history_edu</span>
          Xem Toàn Bộ Sổ Cái Khiếu Nại (Appeals)
        </button>
</div>
</div>
</div>
{/*  Inline Micro-Interactions Script for Super Admin Actions  */}

</div></main>
    </div>
  );
}
