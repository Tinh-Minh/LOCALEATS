import { useState } from "react";

/**
 * AdminCampaignsTab
 * Super Admin Screen: Chiến Dịch QC & Giao Dịch
 * Auto-generated from Google Stitch design with full length fidelity.
 */
export default function AdminCampaignsTab({ onNavigateTab }) {
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
{/*  Top Section: Header & Live System Controls  */}
<div className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-lg pb-space-lg">
<div className="flex flex-col max-w-3xl">
<div className="flex items-center gap-space-sm mb-space-xs">
<span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase tracking-wider">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          Ad Exchange Engine v4.2
        </span>
<span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-sm text-tertiary">sync</span>
          Đồng bộ thời gian thực (Realtime Synced)
        </span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
        Quản Lý Chiến Dịch Quảng Cáo &amp; Giao Dịch Tài Trợ
      </h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
        Theo dõi <span className="font-bold text-on-surface">892 hợp đồng quảng cáo</span> đang kích hoạt, tỷ lệ hiển thị cam kết (Impressions), tỷ lệ click chỉ đường (CTR) và luồng giao dịch thanh toán trực tiếp từ đối tác ẩm thực toàn quốc.
      </p>
</div>
{/*  Global CTA Cluster  */}
<div className="flex flex-wrap items-center gap-space-sm">
<button className="inline-flex items-center gap-space-xs px-space-md py-2.5 rounded-full bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-[0_4px_14px_-2px_rgba(43,33,24,0.05)] hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-base text-outline">tune</span>
        Bộ Lọc Trạng Thái
      </button>
<button className="inline-flex items-center gap-space-xs px-space-md py-2.5 rounded-full bg-surface-container-high text-primary font-label-md text-label-md hover:bg-error-container hover:text-on-error-container transition-colors shadow-sm" id="btnPauseOverload">
<span className="material-symbols-outlined text-base">emergency_home</span>
        Tạm Dừng Cụm Quá Tải
      </button>
<button className="inline-flex items-center gap-space-xs px-space-lg py-2.5 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md shadow-[0_6px_16px_rgba(222,54,24,0.35)] hover:opacity-95 active:scale-[0.98] transition-all">
<span className="material-symbols-outlined text-base">add_circle</span>
        Tạo Chiến Dịch Tài Trợ Đặc Biệt
      </button>
</div>
</div>
{/*  Realtime KPI Grid (4 Cards)  */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-md pb-space-xl">
{/*  Card 1: Live Impressions  */}
<div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-[0_4px_14px_-2px_rgba(43,33,24,0.05)] flex flex-col justify-between">
<div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-primary/5 blur-xl pointer-events-none"></div>
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Tổng Lượt Hiển Thị Hôm Nay</span>
<div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-base">visibility</span>
</div>
</div>
<div className="mt-space-md">
<div className="flex items-baseline gap-space-xs">
<span className="font-display-lg text-display-lg text-on-surface leading-none">1.428.500</span>
<span className="font-label-sm text-label-sm text-outline">lượt</span>
</div>
<div className="flex items-center gap-space-xs mt-space-xs font-label-sm text-label-sm text-tertiary">
<span className="material-symbols-outlined text-sm">trending_up</span>
<span className="font-bold">+14.2%</span>
<span className="text-on-surface-variant font-normal">so với hôm qua</span>
</div>
</div>
{/*  Sparkline SVG  */}
<div className="mt-space-md pt-space-xs">
<svg className="w-full h-8 text-primary overflow-visible" preserveaspectratio="none" viewBox="0 0 100 24">
<path d="M0,18 Q15,19 25,12 T50,14 T75,6 T100,2" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2"></path>
<path d="M0,18 Q15,19 25,12 T50,14 T75,6 T100,2 L100,24 L0,24 Z" fill="currentColor" fill-opacity="0.08"></path>
</svg>
</div>
</div>
{/*  Card 2: Navigation Clicks & CTR  */}
<div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-[0_4px_14px_-2px_rgba(43,33,24,0.05)] flex flex-col justify-between">
<div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-secondary-container/10 blur-xl pointer-events-none"></div>
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Tổng Nhấp Chỉ Đường (Map CTR)</span>
<div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-base">directions</span>
</div>
</div>
<div className="mt-space-md">
<div className="flex items-baseline gap-space-xs">
<span className="font-display-lg text-display-lg text-on-surface leading-none">86.420</span>
<span className="font-label-sm text-label-sm text-outline">nhấp</span>
</div>
<div className="flex items-center gap-space-xs mt-space-xs font-label-sm text-label-sm text-secondary">
<span className="material-symbols-outlined text-sm">stars</span>
<span className="font-bold">CTR TB 6.05%</span>
<span className="text-on-surface-variant font-normal">(Rất cao so với ngành)</span>
</div>
</div>
<div className="mt-space-md pt-space-xs">
<svg className="w-full h-8 text-secondary-container overflow-visible" preserveaspectratio="none" viewBox="0 0 100 24">
<path d="M0,20 Q20,18 40,11 T70,8 T100,3" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2"></path>
<path d="M0,20 Q20,18 40,11 T70,8 T100,3 L100,24 L0,24 Z" fill="currentColor" fill-opacity="0.12"></path>
</svg>
</div>
</div>
{/*  Card 3: Cost Per Walk-in (CPW)  */}
<div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-[0_4px_14px_-2px_rgba(43,33,24,0.05)] flex flex-col justify-between">
<div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-tertiary/10 blur-xl pointer-events-none"></div>
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Chi Phí Mỗi Lượt Đến Quán (CPW)</span>
<div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined text-base">pin_drop</span>
</div>
</div>
<div className="mt-space-md">
<div className="flex items-baseline gap-space-xs">
<span className="font-display-lg text-display-lg text-tertiary leading-none">4.860</span>
<span className="font-label-sm text-label-sm text-outline">đ / khách</span>
</div>
<div className="flex items-center gap-space-xs mt-space-xs font-label-sm text-label-sm text-tertiary">
<span className="material-symbols-outlined text-sm">verified</span>
<span className="font-bold">Định vị GPS vật lý</span>
<span className="text-on-surface-variant font-normal">±15m quanh quán</span>
</div>
</div>
{/*  Mini Visual Indicator  */}
<div className="mt-space-md pt-space-xs flex items-center gap-space-xs">
<div className="flex-1 h-2 rounded-full bg-surface-container overflow-hidden">
<div className="h-full rounded-full bg-tertiary" style={{ width: "74%" }}></div>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant font-bold">ROI 4.2x</span>
</div>
</div>
{/*  Card 4: 24h Revenue  */}
<div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-[0_4px_14px_-2px_rgba(43,33,24,0.05)] flex flex-col justify-between">
<div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-primary-container/10 blur-xl pointer-events-none"></div>
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Doanh Thu Giao Dịch 24h</span>
<div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-base">account_balance_wallet</span>
</div>
</div>
<div className="mt-space-md">
<div className="flex items-baseline gap-space-xs">
<span className="font-display-lg text-display-lg text-primary leading-none">38.650.000</span>
<span className="font-label-sm text-label-sm text-outline">đ</span>
</div>
<div className="flex items-center gap-space-xs mt-space-xs font-label-sm text-label-sm text-on-surface-variant">
<span className="material-symbols-outlined text-sm text-tertiary">credit_score</span>
<span className="font-bold text-on-surface">100% Quyết toán</span>
<span>qua VietQR / NAPAS</span>
</div>
</div>
<div className="mt-space-md pt-space-xs flex items-center justify-between font-label-sm text-label-sm bg-surface-container-low px-space-sm py-1 rounded-lg">
<span className="text-outline">Tổng số lượt nạp:</span>
<span className="font-bold text-on-surface">42 giao dịch</span>
</div>
</div>
</div>
{/*  Ad Density & Distribution Throttle Controller Banner  */}
<div className="rounded-xl bg-surface-container-low p-space-md mb-space-lg shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md">
<div className="flex items-start gap-space-md">
<div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shrink-0 mt-0.5">
<span className="material-symbols-outlined text-xl">radar</span>
</div>
<div>
<div className="flex items-center gap-space-xs">
<h2 className="font-title-md text-title-md text-on-surface">Bộ Điều Khiển Giãn Cách Phân Phối (Throttle &amp; Ad Density Guard)</h2>
<span className="px-space-xs py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm">Đang bảo vệ UX</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
          Quy chuẩn trải nghiệm ẩm thực: Không hiển thị quá <span className="font-bold text-primary">3 ghim tài trợ</span> trong cùng bán kính 200m trên bản đồ để giữ trải nghiệm khách quan.
        </p>
</div>
</div>
<div className="flex items-center gap-space-sm w-full lg:w-auto justify-end">
<div className="hidden sm:flex flex-col text-right">
<span className="font-label-sm text-label-sm text-outline">Tải phân bổ cụm hiện tại:</span>
<span className="font-label-md text-label-md text-tertiary font-bold">Mức an toàn (2.1 ghim / 200m)</span>
</div>
<button className="inline-flex items-center gap-space-xs px-space-md py-2 rounded-full bg-surface-container-lowest text-primary font-label-sm text-label-sm shadow-sm hover:bg-surface-container-high transition-colors" id="btnAutoBalance">
<span className="material-symbols-outlined text-base">auto_fix_high</span>
        Tự Động Cân Bằng Thuật Toán AI
      </button>
</div>
</div>
{/*  Search & Filter Controls  */}
<div className="rounded-xl bg-surface-container-lowest p-space-md shadow-[0_4px_14px_-2px_rgba(43,33,24,0.05)] mb-space-md flex flex-col gap-space-md">
{/*  Row 1: Search and Type Pills  */}
<div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md">
{/*  Search Field  */}
<div className="relative flex-1 max-w-xl">
<span className="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-primary text-lg pointer-events-none">search</span>
<input className="w-full h-11 pl-11 pr-space-md rounded-full bg-surface text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm" id="campaignSearchInput" placeholder="Tìm chiến dịch, tên quán ăn, mã hợp đồng (AD-XXXX), ID đối tác..." type="text"/>
</div>
{/*  Type Pills Filter  */}
<div className="flex items-center gap-space-xs overflow-x-auto pb-1 lg:pb-0 scrollbar-none" id="typeFilterContainer">
<button className="filter-type-btn active shrink-0 px-space-md py-1.5 rounded-full font-label-sm text-label-sm transition-all bg-primary-container text-on-primary-container shadow-sm font-bold" data-type="all">
          Tất cả gói
        </button>
<button className="filter-type-btn shrink-0 px-space-md py-1.5 rounded-full font-label-sm text-label-sm transition-all bg-surface text-on-surface hover:bg-surface-container-high" data-type="Gói Ghim VIP Độc Quyền">
          Ghim VIP Độc Quyền
        </button>
<button className="filter-type-btn shrink-0 px-space-md py-1.5 rounded-full font-label-sm text-label-sm transition-all bg-surface text-on-surface hover:bg-surface-container-high" data-type="HotDrop Flash Pulse">
          HotDrop Flash Giờ Cao Điểm
        </button>
<button className="filter-type-btn shrink-0 px-space-md py-1.5 rounded-full font-label-sm text-label-sm transition-all bg-surface text-on-surface hover:bg-surface-container-high" data-type="Banner Trang Chủ">
          Banner Tìm Kiếm Đứng Đầu
        </button>
<button className="filter-type-btn shrink-0 px-space-md py-1.5 rounded-full font-label-sm text-label-sm transition-all bg-surface text-on-surface hover:bg-surface-container-high" data-type="Badge Khuyến Mãi">
          Badge Nổi Bật
        </button>
</div>
</div>
{/*  Row 2: Status Pills Filter  */}
<div className="flex flex-wrap items-center gap-space-xs pt-space-xs">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider mr-space-xs">Lọc Trạng Thái:</span>
<button className="filter-status-btn active px-space-sm py-1 rounded-full font-label-sm text-label-sm bg-surface-container-high text-on-surface font-bold" data-status="all">
        Toàn bộ (892)
      </button>
<button className="filter-status-btn px-space-sm py-1 rounded-full font-label-sm text-label-sm bg-surface text-on-surface-variant hover:bg-surface-container-high flex items-center gap-1" data-status="Đang Chạy">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
        Đang Chạy (Active)
      </button>
<button className="filter-status-btn px-space-sm py-1 rounded-full font-label-sm text-label-sm bg-surface text-on-surface-variant hover:bg-surface-container-high flex items-center gap-1" data-status="Sắp Hết Ngân Sách">
<span className="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
        Sắp Hết Ngân Sách
      </button>
<button className="filter-status-btn px-space-sm py-1 rounded-full font-label-sm text-label-sm bg-surface text-on-surface-variant hover:bg-surface-container-high flex items-center gap-1" data-status="Tạm Dừng">
<span className="w-1.5 h-1.5 rounded-full bg-error"></span>
        Tạm Dừng (Quá Tải)
      </button>
<button className="filter-status-btn px-space-sm py-1 rounded-full font-label-sm text-label-sm bg-surface text-on-surface-variant hover:bg-surface-container-high flex items-center gap-1" data-status="Chờ Duyệt">
<span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
        Chờ Duyệt Banner
      </button>
</div>
</div>
{/*  Main Grid: Active Campaigns Table (Left 8 cols) & Realtime Transaction Stream (Right 4 cols)  */}
<div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter-md">
{/*  Left Column: Ad Campaigns Table (XL: 8 cols)  */}
<div className="xl:col-span-8 flex flex-col gap-space-md">
<div className="rounded-xl bg-surface-container-lowest p-space-md shadow-[0_4px_14px_-2px_rgba(43,33,24,0.05)] overflow-hidden">
{/*  Table Header Meta  */}
<div className="flex items-center justify-between pb-space-md">
<div className="flex items-center gap-space-sm">
<span className="font-title-md text-title-md text-on-surface">Danh Sách Hợp Đồng Quảng Cáo Kích Hoạt</span>
<span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant">5/892 hiển thị</span>
</div>
<div className="flex items-center gap-space-xs font-label-sm text-label-sm text-outline">
<span className="material-symbols-outlined text-sm">schedule</span>
            Làm mới mỗi 15 giây
          </div>
</div>
{/*  Responsive Table Container  */}
<div className="overflow-x-auto">
<table className="w-full text-left font-body-sm text-body-sm" id="campaignsTable">
<thead>
<tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
<th className="py-space-sm px-space-md rounded-l-lg">Chiến Dịch &amp; Quán Ăn</th>
<th className="py-space-sm px-space-sm">Gói &amp; Phạm Vi</th>
<th className="py-space-sm px-space-sm">Thời Hạn &amp; Ngân Sách</th>
<th className="py-space-sm px-space-sm">Phân Phối Cam Kết</th>
<th className="py-space-sm px-space-sm">Hiệu Suất Chỉ Đường</th>
<th className="py-space-sm px-space-md rounded-r-lg text-right">Trạng Thái &amp; Thao Tác</th>
</tr>
</thead>
<tbody className="divide-y-0" id="campaignsTableBody">
{/*  Row 1: Bếp Trưởng Hà Nội  */}
<tr className="campaign-row transition-colors hover:bg-surface-container-low/60" data-name="Bếp Trưởng Hà Nội AD-2024-88" data-status="Đang Chạy" data-type="Gói Ghim VIP Độc Quyền">
<td className="py-space-md px-space-md">
<div className="flex items-center gap-space-sm">
<img className="w-11 h-11 rounded-lg object-cover shadow-sm shrink-0" data-alt="Exquisite Vietnamese pho and duck noodle dish served at Bep Truong Ha Noi in Hoan Kiem, steam rising with fresh herbs, warm ambient dining lighting, warm terracotta tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwDgyL_H5lvcfPVCEH1Xz3PgF2iP4fIvv5Mj_nYC6n4cGttvq046x6cqMimpbiLCfzt9vBNF_Hr4qO-5WlkeGiW5DEO2HjSKoWlWUVyx7D8XaJM6sbzOeRfTGb8xbPfTIwCO-y3kKk0ljhUQ7RC7A8ZC07NVJqMoEfIjr8kk776u8LLN66VuEcAebosbE4AXw5M-6vSMidl3n2FGJhlkumZikjxykCTHHKn99ziX4"/>
<div className="min-w-0">
<div className="flex items-center gap-1.5">
<span className="font-label-lg text-label-lg text-on-surface truncate">Bếp Trưởng Hà Nội</span>
<span className="material-symbols-outlined text-sm text-primary" title="Xác thực ẩm thực">verified</span>
</div>
<p className="font-label-sm text-label-sm text-outline truncate">HĐ #AD-2024-88 • Hoàn Kiếm, HN</p>
</div>
</div>
</td>
<td className="py-space-md px-space-sm">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-primary font-bold">Gói Ghim VIP Kim Cương</span>
<span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-0.5">
<span className="material-symbols-outlined text-xs text-outline">radar</span>
                      Bán kính Phố Cổ 3km
                    </span>
</div>
</td>
<td className="py-space-md px-space-sm">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-bold">25.000.000 đ</span>
<span className="font-label-sm text-label-sm text-outline">01/10 - 31/10/2024</span>
</div>
</td>
<td className="py-space-md px-space-sm">
<div className="flex flex-col min-w-[130px]">
<div className="flex justify-between items-center font-label-sm text-label-sm mb-1">
<span className="font-bold text-on-surface">124.5K / 150K</span>
<span className="text-tertiary font-bold">83%</span>
</div>
<div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
<div className="h-full rounded-full bg-tertiary transition-all" style={{ width: "83%" }}></div>
</div>
</div>
</td>
<td className="py-space-md px-space-sm">
<div className="flex flex-col">
<div className="flex items-center gap-1 font-label-md text-label-md text-secondary font-bold">
<span className="material-symbols-outlined text-xs">navigation</span>
                      CTR 7.2%
                    </div>
<span className="font-label-sm text-label-sm text-on-surface-variant">8.960 lượt mở bản đồ</span>
</div>
</td>
<td className="py-space-md px-space-md text-right">
<div className="flex flex-col items-end gap-1.5">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                      Đang Chạy
                    </span>
<div className="flex items-center gap-1">
<button className="px-2 py-1 rounded bg-surface text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm transition-colors">
                        Gia Hạn
                      </button>
<button className="w-7 h-7 rounded flex items-center justify-center bg-surface hover:bg-surface-container-high text-on-surface-variant transition-colors" title="Báo cáo chi tiết">
<span className="material-symbols-outlined text-base">analytics</span>
</button>
</div>
</div>
</td>
</tr>
{/*  Row 2: Dim Tu Tac Saigon  */}
<tr className="campaign-row transition-colors hover:bg-surface-container-low/60" data-name="Dim Tu Tac Saigon AD-2024-102" data-status="Sắp Hết Ngân Sách" data-type="Gói Ghim VIP Độc Quyền">
<td className="py-space-md px-space-md">
<div className="flex items-center gap-space-sm">
<img className="w-11 h-11 rounded-lg object-cover shadow-sm shrink-0" data-alt="Gourmet Cantonese dim sum baskets filled with hot steaming dumplings at Dim Tu Tac Saigon, warm amber interior restaurant backdrop with chopsticks." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZhPNcOEp61vbaphz_1YcVqnmOW0a7dYq88JVpz1hkXko_RGKI1ExBMmb6CZIxwiOxWbrZUFoeiLj0jEMh8i4O9ITTISXXEMGCRLap1OJsu0gtNz5O_EcKJxH3gRB8J4bbHy8eu2_SM0FAPtMUT-TmPVr2iixW1A13nWypXlkpn_01crTTHZBAyhSfbyCUUMbHmj7Q_NpJOpOLxmBRkRU_eucNmge6mvYxv6MHsj0"/>
<div className="min-w-0">
<div className="flex items-center gap-1.5">
<span className="font-label-lg text-label-lg text-on-surface truncate">Dim Tu Tac Saigon</span>
</div>
<p className="font-label-sm text-label-sm text-outline truncate">HĐ #AD-2024-102 • Q.1, TP.HCM</p>
</div>
</div>
</td>
<td className="py-space-md px-space-sm">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-secondary font-bold">Ghim Độc Quyền Quận 1</span>
<span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-0.5">
<span className="material-symbols-outlined text-xs text-outline">location_on</span>
                      Tâm điểm Q.1 &amp; Q.3
                    </span>
</div>
</td>
<td className="py-space-md px-space-sm">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-bold">18.000.000 đ</span>
<span className="font-label-sm text-label-sm text-outline">10/10 - 25/10/2024</span>
</div>
</td>
<td className="py-space-md px-space-sm">
<div className="flex flex-col min-w-[130px]">
<div className="flex justify-between items-center font-label-sm text-label-sm mb-1">
<span className="font-bold text-on-surface">88.2K / 90K</span>
<span className="text-secondary-container font-bold">98%</span>
</div>
<div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
<div className="h-full rounded-full bg-secondary-container transition-all" style={{ width: "98%" }}></div>
</div>
</div>
</td>
<td className="py-space-md px-space-sm">
<div className="flex flex-col">
<div className="flex items-center gap-1 font-label-md text-label-md text-primary font-bold">
<span className="material-symbols-outlined text-xs">local_fire_department</span>
                      CTR 8.4%
                    </div>
<span className="font-label-sm text-label-sm text-on-surface-variant">7.410 lượt mở bản đồ</span>
</div>
</td>
<td className="py-space-md px-space-md text-right">
<div className="flex flex-col items-end gap-1.5">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
<span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse"></span>
                      Sắp Hết Ngân Sách
                    </span>
<div className="flex items-center gap-1">
<button className="px-2 py-1 rounded bg-primary-container text-on-primary-container font-label-sm text-label-sm transition-colors font-bold shadow-sm">
                        Nạp Thêm
                      </button>
<button className="w-7 h-7 rounded flex items-center justify-center bg-surface hover:bg-surface-container-high text-on-surface-variant transition-colors" title="Báo cáo">
<span className="material-symbols-outlined text-base">analytics</span>
</button>
</div>
</div>
</td>
</tr>
{/*  Row 3: Mì Quảng Bà Mua  */}
<tr className="campaign-row transition-colors hover:bg-surface-container-low/60" data-name="Mì Quảng Bà Mua AD-2024-34" data-status="Đang Chạy" data-type="HotDrop Flash Pulse">
<td className="py-space-md px-space-md">
<div className="flex items-center gap-space-sm">
<img className="w-11 h-11 rounded-lg object-cover shadow-sm shrink-0" data-alt="Traditional Central Vietnamese Mi Quang noodles bowl with turmeric noodles, shrimp, quail eggs and fresh herbs on a wooden artisanal table, warm sunlit dining ambiance." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOFbAXAsfOzSAY_AQduwGdwCcg9fVlNW5IYolXcnTnYedSjZYBivOWqzkW3RCPMYziCywgzuZgTTmfWf0oTSZjFQic9mPQHDzymwMjesK2gWipNhgFhNaMWyF92sczXaOP8VRaniGNB9Sf3DjGjJYfOJNK8fPO-WlSSXpjwjoEHDa5dCaU-Voesg1C3KiM3ZdXGNUFgCdAIlHR7Sv2DWFpIozhaDNxPbPdN9K1ysY"/>
<div className="min-w-0">
<div className="flex items-center gap-1.5">
<span className="font-label-lg text-label-lg text-on-surface truncate">Mì Quảng Bà Mua</span>
</div>
<p className="font-label-sm text-label-sm text-outline truncate">HĐ #AD-2024-34 • Hải Châu, Đà Nẵng</p>
</div>
</div>
</td>
<td className="py-space-md px-space-sm">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-tertiary font-bold">HotDrop Flash Pulse</span>
<span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-0.5">
<span className="material-symbols-outlined text-xs text-outline">near_me</span>
                      Cụm Cầu Rồng Đà Nẵng
                    </span>
</div>
</td>
<td className="py-space-md px-space-sm">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-bold">10.000.000 đ</span>
<span className="font-label-sm text-label-sm text-outline">15/10 - 20/10/2024</span>
</div>
</td>
<td className="py-space-md px-space-sm">
<div className="flex flex-col min-w-[130px]">
<div className="flex justify-between items-center font-label-sm text-label-sm mb-1">
<span className="font-bold text-on-surface">42.1K / 50K</span>
<span className="text-tertiary font-bold">84%</span>
</div>
<div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
<div className="h-full rounded-full bg-tertiary transition-all" style={{ width: "84%" }}></div>
</div>
</div>
</td>
<td className="py-space-md px-space-sm">
<div className="flex flex-col">
<div className="flex items-center gap-1 font-label-md text-label-md text-secondary font-bold">
<span className="material-symbols-outlined text-xs">navigation</span>
                      CTR 5.9%
                    </div>
<span className="font-label-sm text-label-sm text-on-surface-variant">2.480 lượt mở bản đồ</span>
</div>
</td>
<td className="py-space-md px-space-md text-right">
<div className="flex flex-col items-end gap-1.5">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                      Đang Chạy
                    </span>
<div className="flex items-center gap-1">
<button className="px-2 py-1 rounded bg-surface text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm transition-colors">
                        Gia Hạn
                      </button>
<button className="w-7 h-7 rounded flex items-center justify-center bg-surface hover:bg-surface-container-high text-on-surface-variant transition-colors" title="Báo cáo">
<span className="material-symbols-outlined text-base">analytics</span>
</button>
</div>
</div>
</td>
</tr>
{/*  Row 4: Tiệm Trà SweetHour  */}
<tr className="campaign-row transition-colors hover:bg-surface-container-low/60" data-name="Tiệm Trà SweetHour AD-2024-56" data-status="Tạm Dừng" data-type="Badge Khuyến Mãi">
<td className="py-space-md px-space-md">
<div className="flex items-center gap-space-sm">
<img className="w-11 h-11 rounded-lg object-cover shadow-sm shrink-0" data-alt="Artisanal iced peach oolong tea with fresh fruit slices in a modern aesthetic cafe glassware, warm dessert bakery lighting, honey amber hues." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5ATAeAqt7XL-ePKMtVlent7WUrqcdeflNH7SN6cKOyHvdhVfISYA9z2YGg9LBjJ1KLPDpW5yk9jovCOYo186935cw7RtUFnhdbttjNh02o9PHe-UmxAdxevLJTSWxj4o2uFPMFp1WEEMDC37eRWDE9l5-uCG0LrZ1k58l7Zdt3q-kiL4YoTdH_NuYVy_U0PDQ1YiQWXZnIWSE2G7I9yuxkB-LwCD3umPWCVVoTlo"/>
<div className="min-w-0">
<div className="flex items-center gap-1.5">
<span className="font-label-lg text-label-lg text-on-surface truncate">Tiệm Trà SweetHour</span>
</div>
<p className="font-label-sm text-label-sm text-outline truncate">HĐ #AD-2024-56 • Tân Phú, TP.HCM</p>
</div>
</div>
</td>
<td className="py-space-md px-space-sm">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface-variant font-bold">Badge Khuyến Mãi</span>
<span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-0.5">
<span className="material-symbols-outlined text-xs text-outline">pin_drop</span>
                      Bán kính Tân Phú 2km
                    </span>
</div>
</td>
<td className="py-space-md px-space-sm">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-bold">6.000.000 đ</span>
<span className="font-label-sm text-label-sm text-outline">05/10 - 20/10/2024</span>
</div>
</td>
<td className="py-space-md px-space-sm">
<div className="flex flex-col min-w-[130px]">
<div className="flex justify-between items-center font-label-sm text-label-sm mb-1">
<span className="font-bold text-on-surface">29.8K / 30K</span>
<span className="text-error font-bold">99%</span>
</div>
<div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
<div className="h-full rounded-full bg-error transition-all" style={{ width: "99%" }}></div>
</div>
</div>
</td>
<td className="py-space-md px-space-sm">
<div className="flex flex-col">
<div className="flex items-center gap-1 font-label-md text-label-md text-on-surface-variant font-bold">
<span className="material-symbols-outlined text-xs">navigation</span>
                      CTR 4.1%
                    </div>
<span className="font-label-sm text-label-sm text-on-surface-variant">1.220 lượt mở bản đồ</span>
</div>
</td>
<td className="py-space-md px-space-md text-right">
<div className="flex flex-col items-end gap-1.5">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-xs">pause_circle</span>
                      Tạm Dừng (Quá Tải)
                    </span>
<div className="flex items-center gap-1">
<button className="px-2 py-1 rounded bg-surface text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm transition-colors">
                        Mở Lại
                      </button>
<button className="w-7 h-7 rounded flex items-center justify-center bg-surface hover:bg-surface-container-high text-on-surface-variant transition-colors" title="Báo cáo">
<span className="material-symbols-outlined text-base">analytics</span>
</button>
</div>
</div>
</td>
</tr>
{/*  Row 5: Lẩu Cua Đồng 68  */}
<tr className="campaign-row transition-colors hover:bg-surface-container-low/60" data-name="Lẩu Cua Đồng 68 AD-2024-91" data-status="Đang Chạy" data-type="Banner Trang Chủ">
<td className="py-space-md px-space-md">
<div className="flex items-center gap-space-sm">
<img className="w-11 h-11 rounded-lg object-cover shadow-sm shrink-0" data-alt="Hot clay pot Vietnamese crab paste hotpot with fresh golden crab roe, beef slices, and fresh greens bubbling on burner, warm festive family restaurant setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPvyEXY9yTuLYSgXloIUH1PhiQIpYiHyc3lJ4DE11hswoFkB_a5LdW934zjlTuuC2kXM7FbLIKwMHGYa6e85r2RMHExosqWnv5WEaZeGQZgAz5N82j-w32I9zrhyCRm7ozQ0s8cGCphJheyDt1RRrcgwV_Co9pGi5IGxaqhdcIKKMu3Ekd1xZhYhMzbTHYlxbYOnZPDMtEYPEj_DJYh4EqaUPR-lW3I4xoJy1UOUY"/>
<div className="min-w-0">
<div className="flex items-center gap-1.5">
<span className="font-label-lg text-label-lg text-on-surface truncate">Lẩu Cua Đồng 68</span>
<span className="material-symbols-outlined text-sm text-secondary-container" title="Top Trend">local_fire_department</span>
</div>
<p className="font-label-sm text-label-sm text-outline truncate">HĐ #AD-2024-91 • Cầu Giấy, HN</p>
</div>
</div>
</td>
<td className="py-space-md px-space-sm">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-primary font-bold">Banner Trang Chủ</span>
<span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-0.5">
<span className="material-symbols-outlined text-xs text-outline">search_check</span>
                      Toàn TP. Hà Nội
                    </span>
</div>
</td>
<td className="py-space-md px-space-sm">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-bold">35.000.000 đ</span>
<span className="font-label-sm text-label-sm text-outline">01/10 - 31/10/2024</span>
</div>
</td>
<td className="py-space-md px-space-sm">
<div className="flex flex-col min-w-[130px]">
<div className="flex justify-between items-center font-label-sm text-label-sm mb-1">
<span className="font-bold text-on-surface">186.4K / 200K</span>
<span className="text-tertiary font-bold">93%</span>
</div>
<div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
<div className="h-full rounded-full bg-tertiary transition-all" style={{ width: "93%" }}></div>
</div>
</div>
</td>
<td className="py-space-md px-space-sm">
<div className="flex flex-col">
<div className="flex items-center gap-1 font-label-md text-label-md text-primary font-bold">
<span className="material-symbols-outlined text-xs">local_fire_department</span>
                      CTR 9.1%
                    </div>
<span className="font-label-sm text-label-sm text-on-surface-variant">16.960 lượt mở bản đồ</span>
</div>
</td>
<td className="py-space-md px-space-md text-right">
<div className="flex flex-col items-end gap-1.5">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                      Đang Chạy
                    </span>
<div className="flex items-center gap-1">
<button className="px-2 py-1 rounded bg-surface text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm transition-colors">
                        Gia Hạn
                      </button>
<button className="w-7 h-7 rounded flex items-center justify-center bg-surface hover:bg-surface-container-high text-on-surface-variant transition-colors" title="Báo cáo">
<span className="material-symbols-outlined text-base">analytics</span>
</button>
</div>
</div>
</td>
</tr>
</tbody>
</table>
</div>
{/*  Table Bottom Pagination & Summary  */}
<div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm pt-space-md mt-space-sm">
<span className="font-body-sm text-body-sm text-on-surface-variant">
            Hiển thị <span className="font-bold text-on-surface">1 - 5</span> trên tổng số <span className="font-bold text-on-surface">892</span> chiến dịch kích hoạt
          </span>
<div className="flex items-center gap-space-xs">
<button className="px-space-sm py-1 rounded-lg bg-surface text-on-surface-variant hover:bg-surface-container-high transition-colors text-label-sm font-label-sm">
              Trước
            </button>
<button className="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container font-label-sm text-label-sm font-bold shadow-sm">
              1
            </button>
<button className="w-8 h-8 rounded-lg bg-surface text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm">
              2
            </button>
<button className="w-8 h-8 rounded-lg bg-surface text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm">
              3
            </button>
<span className="text-outline px-1">...</span>
<button className="w-8 h-8 rounded-lg bg-surface text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm">
              179
            </button>
<button className="px-space-sm py-1 rounded-lg bg-surface text-on-surface hover:bg-surface-container-high transition-colors text-label-sm font-label-sm">
              Sau
            </button>
</div>
</div>
</div>
</div>
{/*  Right Column: Realtime Transaction Stream & Partner Balance Flow (XL: 4 cols)  */}
<div className="xl:col-span-4 flex flex-col gap-space-md">
{/*  Realtime Transaction Stream Card  */}
<div className="rounded-xl bg-surface-container-lowest p-space-md shadow-[0_4px_14px_-2px_rgba(43,33,24,0.05)] flex flex-col h-full">
<div className="flex items-center justify-between pb-space-sm">
<div className="flex items-center gap-space-xs">
<span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse"></span>
<h3 className="font-title-md text-title-md text-on-surface">Dòng Tiền Nạp Đối Tác (Live Stream)</h3>
</div>
<span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant">NAPAS 24/7</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant pb-space-md">
          Theo dõi các giao dịch nạp ngân sách quảng cáo và gia hạn hợp đồng từ các chủ nhà hàng.
        </p>
{/*  Transaction Items Feed  */}
<div className="flex flex-col gap-space-sm flex-1">
{/*  Tx 1: Lẩu Cua Đồng 68  */}
<div className="p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col gap-1">
<div className="flex items-center justify-between">
<span className="font-label-lg text-label-lg text-on-surface font-bold">Lẩu Cua Đồng 68</span>
<span className="font-label-lg text-label-lg text-tertiary font-extrabold">+10.000.000 đ</span>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
<span>Nạp ngân sách Flash Ads</span>
<span className="text-outline">14:28:10</span>
</div>
<div className="flex items-center justify-between pt-1 font-label-sm text-label-sm">
<span className="inline-flex items-center gap-1 text-on-surface">
<span className="material-symbols-outlined text-xs text-primary">qr_code_2</span>
                VietQR Techcombank
              </span>
<span className="inline-flex items-center gap-1 text-tertiary font-bold">
<span className="material-symbols-outlined text-xs">check_circle</span>
                VQR-99214
              </span>
</div>
</div>
{/*  Tx 2: Bún Bò Huế O Mai  */}
<div className="p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col gap-1">
<div className="flex items-center justify-between">
<span className="font-label-lg text-label-lg text-on-surface font-bold">Bún Bò Huế O Mai</span>
<span className="font-label-lg text-label-lg text-tertiary font-extrabold">+15.000.000 đ</span>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
<span>Gia hạn VIP Kim Cương Quý 4</span>
<span className="text-outline">14:15:42</span>
</div>
<div className="flex items-center justify-between pt-1 font-label-sm text-label-sm">
<span className="inline-flex items-center gap-1 text-on-surface">
<span className="material-symbols-outlined text-xs text-secondary">credit_card</span>
                Visa / Mastercard
              </span>
<span className="inline-flex items-center gap-1 text-tertiary font-bold">
<span className="material-symbols-outlined text-xs">check_circle</span>
                STR-48102
              </span>
</div>
</div>
{/*  Tx 3: Cơm Tấm Ba Ghiền  */}
<div className="p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col gap-1">
<div className="flex items-center justify-between">
<span className="font-label-lg text-label-lg text-on-surface font-bold">Cơm Tấm Ba Ghiền</span>
<span className="font-label-lg text-label-lg text-tertiary font-extrabold">+5.000.000 đ</span>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
<span>Nạp ví quảng cáo LOCALEATS</span>
<span className="text-outline">13:50:09</span>
</div>
<div className="flex items-center justify-between pt-1 font-label-sm text-label-sm">
<span className="inline-flex items-center gap-1 text-on-surface">
<span className="material-symbols-outlined text-xs text-primary">qr_code_2</span>
                VietQR MBBank
              </span>
<span className="inline-flex items-center gap-1 text-tertiary font-bold">
<span className="material-symbols-outlined text-xs">check_circle</span>
                VQR-99180
              </span>
</div>
</div>
{/*  Tx 4: Hải Sản Biển Đêm (Pending/Hold)  */}
<div className="p-space-sm rounded-xl bg-error-container/30 hover:bg-error-container/50 transition-colors flex flex-col gap-1">
<div className="flex items-center justify-between">
<span className="font-label-lg text-label-lg text-on-surface font-bold">Hải Sản Biển Đêm</span>
<span className="font-label-lg text-label-lg text-error font-extrabold">+8.500.000 đ</span>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
<span>Phí tài trợ HotDrop (Khiếu nại)</span>
<span className="text-outline">12:44:18</span>
</div>
<div className="flex items-center justify-between pt-1 font-label-sm text-label-sm">
<span className="inline-flex items-center gap-1 text-error">
<span className="material-symbols-outlined text-xs">hourglass_empty</span>
                Tạm giữ xác minh GPS
              </span>
<span className="font-label-sm text-label-sm text-on-surface-variant font-mono">HOLD-1904</span>
</div>
</div>
{/*  Tx 5: Bánh Mì Phượng Hội An  */}
<div className="p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col gap-1">
<div className="flex items-center justify-between">
<span className="font-label-lg text-label-lg text-on-surface font-bold">Bánh Mì Phượng Hội An</span>
<span className="font-label-lg text-label-lg text-tertiary font-extrabold">+6.500.000 đ</span>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
<span>Gói Bản Đồ Khách Du Lịch</span>
<span className="text-outline">11:32:05</span>
</div>
<div className="flex items-center justify-between pt-1 font-label-sm text-label-sm">
<span className="inline-flex items-center gap-1 text-on-surface">
<span className="material-symbols-outlined text-xs text-primary">qr_code_2</span>
                VietQR Vietcombank
              </span>
<span className="inline-flex items-center gap-1 text-tertiary font-bold">
<span className="material-symbols-outlined text-xs">check_circle</span>
                VQR-99042
              </span>
</div>
</div>
</div>
{/*  Export & Billing Reconciliation Action  */}
<div className="mt-space-md pt-space-sm">
<button className="w-full py-2.5 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md flex items-center justify-center gap-space-xs">
<span className="material-symbols-outlined text-base">receipt_long</span>
            Xuất Đối Soát &amp; Bảng Kê VAT Tự Động
          </button>
</div>
</div>
</div>
</div>
{/*  Interactive Script for Filtering and Micro-interactions  */}

</div></main>
    </div>
  );
}
