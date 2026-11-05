import { useState } from "react";

/**
 * AdminReviewSentinelTab
 * Super Admin Screen: Kiểm Duyệt Review AI Sentinel & Chống Seeding
 * Auto-generated from Google Stitch design with full length fidelity.
 */
export default function AdminReviewSentinelTab({ onNavigateTab }) {
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
{/*  Subtle Glowing Amber Ambient Behind Header  */}
<div className="relative px-8 pt-8 pb-10 flex flex-col gap-8 overflow-hidden">
<div className="absolute -top-32 right-12 w-96 h-96 rounded-full bg-gradient-to-br from-primary/10 via-secondary-container/10 to-transparent blur-3xl pointer-events-none"></div>
{/*  Editorial Header Section  */}
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
<div className="flex flex-col max-w-3xl">
<div className="flex items-center gap-2.5 mb-2">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm font-bold tracking-wider uppercase">
<span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            AI Sentinel Shield v4.3 Live
          </span>
<span className="text-on-surface-variant font-label-sm text-label-sm">• Tự Động Phân Tích 24/7</span>
</div>
<h1 className="font-display-lg text-display-lg font-extrabold text-on-surface tracking-tight leading-tight">
          Trung Tâm Kiểm Duyệt Đánh Giá &amp; AI Sentinel Shield
        </h1>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-2xl leading-relaxed">
          Hệ thống AI giám sát nội dung theo thời gian thực (Realtime NLP &amp; Computer Vision), phát hiện bão 1-sao có tổ chức, spam bot và bảo vệ uy tín danh tiếng nhà hàng trên toàn quốc.
        </p>
</div>
{/*  Action Cluster  */}
<div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
<button className="px-5 py-3 rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg font-bold flex items-center gap-2 shadow-lg shadow-primary/25 hover:opacity-95 active:scale-95 transition-all" id="btnShieldModal">
<span className="material-symbols-outlined text-xl">shield_locked</span>
          Kích Hoạt Shield Mode Khẩn Cấp
        </button>
<button className="px-5 py-3 rounded-full bg-surface-container-highest text-on-surface font-label-lg text-label-lg font-semibold flex items-center gap-2 hover:bg-surface-container-high transition-all">
<span className="material-symbols-outlined text-lg text-secondary">spellcheck</span>
          Bộ Từ Khóa Cấm &amp; Blacklist
        </button>
<button className="w-12 h-12 rounded-full bg-surface-container-lowest shadow-sm flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-all" title="Huấn Luyện Lại Model AI (v4.3)">
<span className="material-symbols-outlined text-xl">model_training</span>
</button>
</div>
</div>
{/*  4 High Impact KPI Cards  */}
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
{/*  KPI 1  */}
<div className="relative bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col justify-between overflow-hidden">
<div className="flex items-start justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Lọc Tự Động Thành Công</span>
<div className="flex items-baseline gap-2 mt-2">
<span className="font-display-lg text-display-lg text-tertiary font-extrabold tracking-tight">99.42%</span>
<span className="font-label-sm text-label-sm text-tertiary font-bold bg-tertiary-fixed/40 px-2 py-0.5 rounded-full">+0.18%</span>
</div>
</div>
<div className="w-12 h-12 rounded-2xl bg-tertiary/10 text-tertiary flex items-center justify-center">
<span className="material-symbols-outlined text-2xl font-bold">verified_user</span>
</div>
</div>
<div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
<span>38.450 review đã quét hôm nay</span>
<span className="font-bold text-on-surface">100% On-air</span>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full mt-2 overflow-hidden">
<div className="bg-tertiary h-full rounded-full" style={{ width: "99.42%" }}></div>
</div>
</div>
{/*  KPI 2  */}
<div className="relative bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col justify-between overflow-hidden">
<div className="flex items-start justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Review Bị AI Chặn Đứng</span>
<div className="flex items-baseline gap-2 mt-2">
<span className="font-display-lg text-display-lg text-primary font-extrabold tracking-tight">1.284</span>
<span className="font-label-sm text-label-sm text-primary font-bold bg-primary-fixed/40 px-2 py-0.5 rounded-full">Tiêu Cực / Bot</span>
</div>
</div>
<div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
<span className="material-symbols-outlined text-2xl font-bold">block</span>
</div>
</div>
<div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
<span>Chặn trước khi hiển thị công khai</span>
<span className="font-bold text-primary font-label-sm text-label-sm">Zero Exposure</span>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full mt-2 overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{ width: "14.8%" }}></div>
</div>
</div>
{/*  KPI 3  */}
<div className="relative bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col justify-between overflow-hidden">
<div className="flex items-start justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Vô Hiệu Bão 1-Sao Đồng Loạt</span>
<div className="flex items-baseline gap-2 mt-2">
<span className="font-display-lg text-display-lg text-secondary font-extrabold tracking-tight">14</span>
<span className="font-body-md text-body-md text-on-surface-variant font-semibold">Đợt / Tháng</span>
</div>
</div>
<div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-secondary flex items-center justify-center">
<span className="material-symbols-outlined text-2xl font-bold">cyclone</span>
</div>
</div>
<div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
<span>Bảo vệ an toàn trực tiếp</span>
<span className="font-bold text-secondary font-label-sm text-label-sm">12 Quán Ăn</span>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full mt-2 overflow-hidden">
<div className="bg-secondary h-full rounded-full" style={{ width: "78%" }}></div>
</div>
</div>
{/*  KPI 4  */}
<div className="relative bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col justify-between overflow-hidden">
<div className="flex items-start justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Tốc Độ Xử Lý / Review</span>
<div className="flex items-baseline gap-2 mt-2">
<span className="font-display-lg text-display-lg text-on-surface font-extrabold tracking-tight">42</span>
<span className="font-title-md text-title-md text-on-surface-variant font-bold">ms</span>
</div>
</div>
<div className="w-12 h-12 rounded-2xl bg-surface-container text-on-surface flex items-center justify-center">
<span className="material-symbols-outlined text-2xl font-bold">bolt</span>
</div>
</div>
<div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
<span>NLP Transformer &amp; Vision OCR</span>
<span className="font-bold text-tertiary">Realtime P99</span>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full mt-2 overflow-hidden">
<div className="bg-tertiary h-full rounded-full" style={{ width: "92%" }}></div>
</div>
</div>
</div>
{/*  Emergency Shield Console & Realtime AI Status  */}
<div className="bg-gradient-to-r from-surface-container-lowest via-surface-container to-surface-container-lowest p-6 rounded-3xl shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
<div className="flex items-center gap-5">
<div className="w-16 h-16 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center shadow-lg shadow-primary/30 shrink-0">
<span className="material-symbols-outlined text-3xl font-bold">security</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-3">
<h2 className="font-headline-md text-headline-md font-bold text-on-surface">Lá Chắn AI Shield Mode</h2>
<span className="px-2.5 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-bold tracking-wider">CẤP ĐỘ CAO (HIGH)</span>
<span className="px-2.5 py-0.5 rounded-full bg-tertiary/20 text-tertiary font-label-sm text-label-sm font-semibold flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
              GPS Geofence + Vision Match On
            </span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Tự động đóng băng nhận review nếu quán phát hiện bùng nổ đột biến &gt;20 đánh giá tiêu cực/giờ mà không kèm toạ độ GPS xác thực tại bàn ăn.
          </p>
</div>
</div>
{/*  Quick Toggle Bar  */}
<div className="flex items-center gap-4 shrink-0 bg-surface-container-lowest px-5 py-3 rounded-2xl shadow-xs">
<div className="flex flex-col text-right">
<span className="font-label-md text-label-md text-on-surface font-bold">Chế Độ Báo Động Bão Review</span>
<span className="font-label-sm text-label-sm text-tertiary font-semibold">Tự động kích hoạt (Automated Sandbox)</span>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" id="shieldToggle" type="checkbox"/>
<div className="w-14 h-8 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary-container"></div>
</label>
</div>
</div>
{/*  Main Workspace: Queue & Intelligence Insights Grid  */}
<div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
{/*  Left Column: AI Moderation Queue (8 Cols)  */}
<div className="xl:col-span-8 flex flex-col gap-6">
<div className="flex items-center justify-between">
<div className="flex items-center gap-3">
<span className="w-3 h-3 rounded-full bg-primary-container"></span>
<h3 className="font-headline-md text-headline-md font-extrabold text-on-surface tracking-tight">Hàng Đợi Gắn Cờ Cần Phê Duyệt (4 Đang Chờ)</h3>
</div>
<div className="flex items-center gap-2">
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Lọc theo:</span>
<button className="px-3 py-1.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-bold shadow-xs">Tất Cả</button>
<button className="px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold transition-all">GPS Giả</button>
<button className="px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold transition-all">Ảnh Google</button>
<button className="px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold transition-all">Tấn Công Cụm</button>
</div>
</div>
{/*  Review Card 1: GPS Spoofing & Extortion  */}
<div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col gap-5 transition-all hover:shadow-md">
<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
<div className="flex items-center gap-3.5">
<div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-headline-sm font-bold shrink-0">
                HT
              </div>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md font-bold text-on-surface">HungTran88</span>
<span className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-[11px] text-on-surface-variant font-semibold">Tài khoản mới (3 ngày)</span>
<span className="flex items-center text-primary font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-base">star</span> 1.0
                  </span>
</div>
<div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm mt-0.5">
<span>Mục tiêu đánh giá:</span>
<span className="text-on-surface font-bold">Lẩu Cua Đồng 68 (Chi nhánh Cầu Giấy, HN)</span>
<span>• 18 phút trước</span>
</div>
</div>
</div>
{/*  AI Verdict Badge  */}
<div className="flex flex-col sm:items-end">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-base">flag</span>
                Độ Tin Cậy AI: 98.9% Vi Phạm
              </span>
<span className="font-label-sm text-[11px] text-on-surface-variant mt-1">Đề xuất: HỦY BỎ &amp; CẢNH CÁO</span>
</div>
</div>
{/*  Review Content Snippet  */}
<div className="bg-surface-container-low p-4 rounded-2xl text-on-surface font-body-md text-body-md italic leading-relaxed">
            “Quán làm ăn như lừa đảo, cua bốc mùi tanh tưởi ăn xong nhập viện, chủ quán không hoàn 500k và bồi thường viện phí thì tôi sẽ cho cả hội nhóm phốt sập tiệm trên Facebook.”
          </div>
{/*  Diagnostic Proof Box  */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-surface-container/60 p-4 rounded-2xl text-on-surface">
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">wrong_location</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm font-bold text-on-surface">GPS Sai Lệch Nghiêm Trọng</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Toạ độ IP gửi đánh giá tại Vĩnh Phúc (cách quán 45.2 km). Không có check-in WiFi hay NFC bàn.</span>
</div>
</div>
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">gavel</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm font-bold text-on-surface">NLP Blackmail Detection</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Phát hiện cấu trúc câu đe doạ “không hoàn tiền... phốt sập tiệm” trùng 96% mẫu tống tiền thương mại.</span>
</div>
</div>
</div>
{/*  Action Buttons  */}
<div className="flex items-center justify-between pt-2">
<div className="flex items-center gap-2">
<button className="px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md font-semibold flex items-center gap-1.5 transition-all">
<span className="material-symbols-outlined text-base">person_search</span>
                Xem Lịch Sử User (3 Vi Phạm)
              </button>
</div>
<div className="flex items-center gap-2.5">
<button className="px-4 py-2 rounded-xl bg-surface-container text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-semibold transition-all">
                Bỏ Qua &amp; Giữ Nguyên
              </button>
<button className="px-5 py-2 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md font-bold flex items-center gap-1.5 shadow-sm shadow-primary/20 hover:opacity-95 transition-all">
<span className="material-symbols-outlined text-base">gavel</span>
                Phê Duyệt Chặn &amp; Gửi Cảnh Cáo
              </button>
</div>
</div>
</div>
{/*  Review Card 2: KOL Reverse Image Search Match  */}
<div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col gap-5 transition-all hover:shadow-md">
<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
<div className="flex items-center gap-3.5">
<div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-secondary flex items-center justify-center font-headline-sm font-bold shrink-0">
                LK
              </div>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md font-bold text-on-surface">LinhKOL_Hanoi</span>
<span className="px-2 py-0.5 rounded-md bg-secondary/15 text-secondary font-label-sm text-[11px] font-bold">Tier 2 Food Reviewer</span>
<span className="flex items-center text-secondary font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 5.0
                  </span>
</div>
<div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm mt-0.5">
<span>Mục tiêu đánh giá:</span>
<span className="text-on-surface font-bold">Bún Bò O Mai (Nguyễn Khang)</span>
<span>• 42 phút trước</span>
</div>
</div>
</div>
{/*  AI Verdict Badge  */}
<div className="flex flex-col sm:items-end">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-secondary font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-base">image_not_supported</span>
                AI Vision Match: Trùng 100% Google
              </span>
<span className="font-label-sm text-[11px] text-on-surface-variant mt-1">Đề xuất: TỪ CHỐI ẢNH, GIỮ VĂN BẢN</span>
</div>
</div>
{/*  Review Text  */}
<div className="bg-surface-container-low p-4 rounded-2xl text-on-surface font-body-md text-body-md leading-relaxed">
            “Hôm nay ghé quán ăn thử bún bò đặc biệt, nước dùng thanh ngọt thơm mùi sả, thịt bò mềm tan trong miệng. Điểm 10 chất lượng cho bạn nào thích bún bò chuẩn vị Huế tại Hà Nội nhé!”
          </div>
{/*  Visual Evidence: Attached Photos Flagged  */}
<div className="flex flex-col gap-2">
<span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Ảnh Đính Kèm Bị Gắn Cờ Bởi Perceptual Hash (pHash):</span>
<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
<div className="relative group rounded-xl overflow-hidden aspect-video bg-surface-container">
<img className="w-full h-full object-cover" data-alt="A bowl of Vietnamese spicy beef noodle soup bun bo hue photographed under warm sunlight, crisp garnishes, lime wedges, aesthetic food blog style" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkLIAwKEUq9p_dFxewbgrUolwjDkgAYDdYRAKgqdiEI4Y-sX2VQDwOD5uWHmtGaGykgVFZbC0LJ5TVIO9En6Zum2KbrcgKEKriatVC8_v-MG86tiSxMiOOqe9OgPyyYJDu90RUl0t64TgcVGPppzduLxxsxsjIfL0p8ib7Bug1vm6Yg35-1ENkC5wQn-zgINnQkDtSJEjVO6UXk10ajat-9OTqXLr0bH4sNq5G2Rw"/>
<div className="absolute inset-0 bg-primary/80 opacity-90 flex flex-col items-center justify-center text-on-primary p-2 text-center">
<span className="material-symbols-outlined text-lg">content_copy</span>
<span className="font-label-sm text-[10px] font-bold mt-1">Ảnh Tạp Chí (2022)</span>
</div>
</div>
<div className="relative group rounded-xl overflow-hidden aspect-video bg-surface-container">
<img className="w-full h-full object-cover" data-alt="Steaming bowl of pho and beef stew on rustic wooden tray with chopsticks in a cozy warm atmospheric noodle bar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgC6uTu4LYdQ3GWqBMdJ89BIOvdUG17OOwJAKGNi09SBmNNG3Qzbb1rJyQFaDMiAmWzhU0hE67IpvO_AstBdT0PrQjZOCY04vKjfmkKq4MfTKBNX3GsklC4MvgmacQDYvnUUahllkzdQadu4HFYg_UXzl8MeTTj1mYNM2yLmlc6XCmmR4PFSmw0xUqN2fstfB_YdPVzS3zvtPIIM5Od9hcH2bds4tETtEI_EwghuQ"/>
<div className="absolute inset-0 bg-primary/80 opacity-90 flex flex-col items-center justify-center text-on-primary p-2 text-center">
<span className="material-symbols-outlined text-lg">travel_explore</span>
<span className="font-label-sm text-[10px] font-bold mt-1">Match Pinterest 99%</span>
</div>
</div>
<div className="relative group rounded-xl overflow-hidden aspect-video bg-surface-container">
<img className="w-full h-full object-cover" data-alt="Close up tender braised beef shank slices arranged with fresh mint herbs and sliced chili on white ceramic plate" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXbAqj_fose8jpjU1gyX1G8Bwj-pzkmg1-9H-AEufZC6U1TVQ6Kqz2rNv_gvafF0bwtBiVAPJ8nprDWVD94TTdoRKKfUduoYp9BKOAOfj2T1y1Jfnpch9d063psj6uJUj05mdYy0g8gy4vgp3orQ7g-Isgp8lQHCFtF2bgQC_mzpCModGtRnz4QFvD5d-tdWJ67TktcmJ7r0cTrhQhwC7Io6Ezp7fsIU1bIENoICk"/>
<div className="absolute inset-0 bg-primary/80 opacity-90 flex flex-col items-center justify-center text-on-primary p-2 text-center">
<span className="material-symbols-outlined text-lg">content_copy</span>
<span className="font-label-sm text-[10px] font-bold mt-1">Stock Photo Khác</span>
</div>
</div>
<div className="relative group rounded-xl overflow-hidden aspect-video bg-surface-container flex flex-col items-center justify-center p-3 text-center border border-dashed border-outline-variant/60">
<span className="material-symbols-outlined text-secondary text-2xl">verified</span>
<span className="font-label-sm text-[11px] font-bold text-on-surface mt-1">GPS: Check-in OK</span>
<span className="font-body-sm text-[10px] text-on-surface-variant">User có mặt tại quán</span>
</div>
</div>
</div>
{/*  Actions  */}
<div className="flex items-center justify-between pt-2">
<span className="font-label-sm text-label-sm text-secondary font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-base">info</span>
              Hành động này không trừ điểm KOL nhưng sẽ vô hiệu hoá điểm thưởng ảnh.
            </span>
<div className="flex items-center gap-2.5">
<button className="px-5 py-2 rounded-xl bg-secondary-container text-on-secondary-container font-label-md text-label-md font-bold flex items-center gap-1.5 shadow-sm hover:opacity-95 transition-all">
<span className="material-symbols-outlined text-base">hide_image</span>
                Từ Chối 3 Ảnh &amp; Đăng Văn Bản
              </button>
</div>
</div>
</div>
{/*  Review Card 3: Bot Farm Mass Coordinated Raid  */}
<div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col gap-5 border-l-4 border-l-primary transition-all hover:shadow-md">
<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
<div className="flex items-center gap-3.5">
<div className="w-12 h-12 rounded-2xl bg-error/15 text-error flex items-center justify-center font-headline-sm font-bold shrink-0">
<span className="material-symbols-outlined text-2xl">smart_toy</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md font-bold text-error">Phát Hiện Cụm 12 BotFarm Tấn Công Đồng Loạt</span>
<span className="px-2.5 py-0.5 rounded-full bg-error text-on-error font-label-sm text-[10px] font-bold tracking-wider">SANDBOXED</span>
</div>
<div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm mt-0.5">
<span>Mục tiêu công kích:</span>
<span className="text-on-surface font-bold">Bếp Trưởng Hà Nội (Quận 1, TP.HCM)</span>
<span>• Trong vòng 5 phút vừa qua</span>
</div>
</div>
</div>
<div className="flex flex-col sm:items-end">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-error/10 text-error font-label-sm text-label-sm font-bold">
                12 Đánh Giá 1-Sao Đồng Thời
              </span>
<span className="font-label-sm text-[11px] text-error font-semibold mt-1">Cùng Dải Subnet / Device ID Fingerprint</span>
</div>
</div>
<div className="bg-surface-container-low p-4 rounded-2xl flex flex-col gap-3">
<div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
<span className="font-bold text-on-surface">Đặc tính kỹ thuật bot farm nhận diện bởi AI Sentinel:</span>
<span className="text-error font-bold">12/12 Tài khoản tạo cùng giờ (03:14 AM)</span>
</div>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
<div className="bg-surface-container-lowest p-3 rounded-xl flex flex-col">
<span className="font-label-sm text-[11px] text-on-surface-variant">Dải IP chung</span>
<span className="font-label-md text-label-md font-mono font-bold text-on-surface">118.69.12.* (Proxy VNPT)</span>
</div>
<div className="bg-surface-container-lowest p-3 rounded-xl flex flex-col">
<span className="font-label-sm text-[11px] text-on-surface-variant">Vân tay thiết bị</span>
<span className="font-label-md text-label-md font-mono font-bold text-on-surface">Canvas Hash: 0x8a92f...</span>
</div>
<div className="bg-surface-container-lowest p-3 rounded-xl flex flex-col">
<span className="font-label-sm text-[11px] text-on-surface-variant">Thời gian gửi</span>
<span className="font-label-md text-label-md font-mono font-bold text-on-surface">Cách đều 24s/review</span>
</div>
</div>
</div>
<div className="flex items-center justify-between pt-1">
<span className="font-body-sm text-body-sm text-on-surface-variant">
              Tất cả 12 đánh giá đã được AI tự động gom vào Sandbox cách ly. Nhà hàng không bị sụt điểm xếp hạng.
            </span>
<div className="flex items-center gap-2">
<button className="px-5 py-2 rounded-xl bg-error text-on-error font-label-md text-label-md font-bold flex items-center gap-1.5 shadow-sm hover:opacity-90 transition-all">
<span className="material-symbols-outlined text-base">delete_forever</span>
                Xóa Vĩnh Viễn &amp; Khóa Dải IP 30 Ngày
              </button>
</div>
</div>
</div>
{/*  Review Card 4: Legitimate Customer Grievance (Approved by AI)  */}
<div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col gap-5 border-l-4 border-l-tertiary transition-all hover:shadow-md">
<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
<div className="flex items-center gap-3.5">
<div className="w-12 h-12 rounded-2xl bg-tertiary/15 text-tertiary flex items-center justify-center font-headline-sm font-bold shrink-0">
                MF
              </div>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md font-bold text-on-surface">MinhFoodie</span>
<span className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-[11px] text-on-surface font-semibold">Khách Hàng Thân Thiết (45 Review)</span>
<span className="flex items-center text-secondary font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 3.0
                  </span>
</div>
<div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm mt-0.5">
<span>Mục tiêu đánh giá:</span>
<span className="text-on-surface font-bold">Dim Tu Tac (Saigon Centre)</span>
<span>• 1 giờ trước</span>
</div>
</div>
</div>
<div className="flex flex-col sm:items-end">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-base">check_circle</span>
                HỢP LỆ (Không Vi Phạm)
              </span>
<span className="font-label-sm text-[11px] text-tertiary font-semibold mt-1">Đề xuất: DUYỆT CÔNG KHAI</span>
</div>
</div>
<div className="bg-surface-container-low p-4 rounded-2xl text-on-surface font-body-md text-body-md leading-relaxed">
            “Đồ ăn dimsum ở đây hương vị vẫn chuẩn ngon như mọi lần, há cảo tôm giòn ngọt. Tuy nhiên nhân viên bảo vệ giữ xe tầng hầm nói chuyện cộc cằn, thu tiền vé xe không đưa biên lai. Trừ 2 sao vì trải nghiệm dịch vụ chưa tương xứng với phân khúc.”
          </div>
<div className="flex items-center gap-3 text-on-surface-variant font-label-sm text-label-sm">
<span className="flex items-center gap-1 text-tertiary font-semibold">
<span className="material-symbols-outlined text-base">location_on</span>
              GPS tại nhà hàng: 10.7735° N, 106.7012° E (Cách 8 mét)
            </span>
<span>•</span>
<span className="text-on-surface-variant">Không vi phạm từ ngữ kích động hay tống tiền. Đóng góp phản hồi mang tính xây dựng.</span>
</div>
<div className="flex items-center justify-between pt-1">
<span className="font-label-sm text-label-sm text-on-surface-variant">
              Tự động hiển thị sau: <strong className="text-on-surface">4 phút nếu không có can thiệp</strong>
</span>
<div className="flex items-center gap-2">
<button className="px-5 py-2 rounded-xl bg-tertiary text-on-tertiary font-label-md text-label-md font-bold flex items-center gap-1.5 shadow-sm hover:opacity-95 transition-all">
<span className="material-symbols-outlined text-base">publish</span>
                Cho Phép Hiển Thị Ngay
              </button>
</div>
</div>
</div>
</div>
{/*  Right Column: AI Analytics, Hourly Block Trends & Blacklist Rule Engine (4 Cols)  */}
<div className="xl:col-span-4 flex flex-col gap-6">
{/*  Realtime Threat Radar & Hourly Chart Card  */}
<div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm flex flex-col gap-5">
<div className="flex items-center justify-between">
<div className="flex flex-col">
<h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">Xu Hướng Bị Chặn 24 Giờ</h4>
<span className="font-label-sm text-label-sm text-on-surface-variant">Phân bổ lượng spam theo thời gian thực</span>
</div>
<span className="material-symbols-outlined text-primary text-2xl">insights</span>
</div>
{/*  Inline SVG Sparkline / Bar Visualization  */}
<div className="w-full bg-surface-container-low p-4 rounded-2xl flex flex-col gap-3">
<div className="h-36 w-full flex items-end justify-between gap-1.5 pt-4">
{/*  12 Bars for 24h intervals (each bar represents 2h)  */}
<div className="flex-1 flex flex-col items-center gap-1 group">
<div className="w-full bg-surface-dim hover:bg-primary rounded-t-sm transition-all h-8"></div>
<span className="font-label-sm text-[9px] text-on-surface-variant">02h</span>
</div>
<div className="flex-1 flex flex-col items-center gap-1 group">
<div className="w-full bg-surface-dim hover:bg-primary rounded-t-sm transition-all h-6"></div>
<span className="font-label-sm text-[9px] text-on-surface-variant">04h</span>
</div>
<div className="flex-1 flex flex-col items-center gap-1 group">
<div className="w-full bg-surface-dim hover:bg-primary rounded-t-sm transition-all h-5"></div>
<span className="font-label-sm text-[9px] text-on-surface-variant">06h</span>
</div>
<div className="flex-1 flex flex-col items-center gap-1 group">
<div className="w-full bg-surface-dim hover:bg-primary rounded-t-sm transition-all h-10"></div>
<span className="font-label-sm text-[9px] text-on-surface-variant">08h</span>
</div>
<div className="flex-1 flex flex-col items-center gap-1 group">
<div className="w-full bg-secondary hover:bg-primary rounded-t-sm transition-all h-20"></div>
<span className="font-label-sm text-[9px] text-on-surface-variant">10h</span>
</div>
{/*  Lunch Peak  */}
<div className="flex-1 flex flex-col items-center gap-1 group">
<div className="w-full bg-primary-container rounded-t-sm transition-all h-28 relative">
<span className="absolute -top-6 left-1/2 -translate-x-1/2 font-label-sm text-[10px] font-bold text-primary">284</span>
</div>
<span className="font-label-sm text-[9px] text-primary font-bold">12h</span>
</div>
<div className="flex-1 flex flex-col items-center gap-1 group">
<div className="w-full bg-surface-dim hover:bg-primary rounded-t-sm transition-all h-14"></div>
<span className="font-label-sm text-[9px] text-on-surface-variant">14h</span>
</div>
<div className="flex-1 flex flex-col items-center gap-1 group">
<div className="w-full bg-surface-dim hover:bg-primary rounded-t-sm transition-all h-12"></div>
<span className="font-label-sm text-[9px] text-on-surface-variant">16h</span>
</div>
<div className="flex-1 flex flex-col items-center gap-1 group">
<div className="w-full bg-secondary hover:bg-primary rounded-t-sm transition-all h-22"></div>
<span className="font-label-sm text-[9px] text-on-surface-variant">18h</span>
</div>
{/*  Dinner Peak  */}
<div className="flex-1 flex flex-col items-center gap-1 group">
<div className="w-full bg-primary-container rounded-t-sm transition-all h-32 relative">
<span className="absolute -top-6 left-1/2 -translate-x-1/2 font-label-sm text-[10px] font-bold text-primary">342</span>
</div>
<span className="font-label-sm text-[9px] text-primary font-bold">20h</span>
</div>
<div className="flex-1 flex flex-col items-center gap-1 group">
<div className="w-full bg-secondary hover:bg-primary rounded-t-sm transition-all h-16"></div>
<span className="font-label-sm text-[9px] text-on-surface-variant">22h</span>
</div>
<div className="flex-1 flex flex-col items-center gap-1 group">
<div className="w-full bg-surface-dim hover:bg-primary rounded-t-sm transition-all h-9"></div>
<span className="font-label-sm text-[9px] text-on-surface-variant">24h</span>
</div>
</div>
<div className="flex items-center justify-between text-on-surface-variant font-label-sm text-[11px] pt-1 border-t border-outline-variant/30">
<span>Đỉnh điểm: 12:30 &amp; 20:15 (Giờ cao điểm dùng bữa)</span>
<span className="font-bold text-primary">Cao hơn 18% hôm qua</span>
</div>
</div>
</div>
{/*  Breakdown of Violations Donut & Progress  */}
<div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm flex flex-col gap-5">
<div className="flex items-center justify-between">
<h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">Tỷ Lệ Các Loại Vi Phạm</h4>
<span className="px-2.5 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant font-bold">Tháng Này</span>
</div>
{/*  Category Progress Bars  */}
<div className="flex flex-col gap-4">
{/*  1. Spam Link QC  */}
<div className="flex flex-col gap-1.5">
<div className="flex justify-between font-label-md text-label-md">
<span className="font-semibold text-on-surface flex items-center gap-1.5">
<span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                  Spam Link Quảng Cáo / Seeding
                </span>
<span className="font-bold text-primary">42% (539 vụ)</span>
</div>
<div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
<div className="bg-primary-container h-full rounded-full" style={{ width: "42%" }}></div>
</div>
</div>
{/*  2. Fake GPS Coordinates  */}
<div className="flex flex-col gap-1.5">
<div className="flex justify-between font-label-md text-label-md">
<span className="font-semibold text-on-surface flex items-center gap-1.5">
<span className="w-2.5 h-2.5 rounded-full bg-secondary-container"></span>
                  Toạ Độ GPS Giả Mạo (&gt;20km)
                </span>
<span className="font-bold text-secondary">28% (359 vụ)</span>
</div>
<div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
<div className="bg-secondary-container h-full rounded-full" style={{ width: "28%" }}></div>
</div>
</div>
{/*  3. Blackmail & Defamation  */}
<div className="flex flex-col gap-1.5">
<div className="flex justify-between font-label-md text-label-md">
<span className="font-semibold text-on-surface flex items-center gap-1.5">
<span className="w-2.5 h-2.5 rounded-full bg-error"></span>
                  Từ Ngữ Bôi Nhọ / Đe Dọa Tống Tiền
                </span>
<span className="font-bold text-error">18% (231 vụ)</span>
</div>
<div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
<div className="bg-error h-full rounded-full" style={{ width: "18%" }}></div>
</div>
</div>
{/*  4. Fake Stock Photo  */}
<div className="flex flex-col gap-1.5">
<div className="flex justify-between font-label-md text-label-md">
<span className="font-semibold text-on-surface flex items-center gap-1.5">
<span className="w-2.5 h-2.5 rounded-full bg-outline"></span>
                  Ảnh Ăn Cắp / Google / AI Sinh Ra
                </span>
<span className="font-bold text-outline">12% (155 vụ)</span>
</div>
<div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
<div className="bg-outline h-full rounded-full" style={{ width: "12%" }}></div>
</div>
</div>
</div>
</div>
{/*  AI Model Specs & Pipeline Node Status  */}
<div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm flex flex-col gap-4">
<div className="flex items-center justify-between">
<h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">Cấu Trúc Mô Hình AI v4.3</h4>
<span className="material-symbols-outlined text-tertiary text-xl">hub</span>
</div>
<div className="flex flex-col gap-3 font-body-sm text-body-sm">
<div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-lg">language</span>
<span className="font-semibold text-on-surface">PhoBERT-Large (Vietnamese NLP)</span>
</div>
<span className="font-label-sm text-[11px] font-bold text-tertiary bg-tertiary-fixed/50 px-2 py-0.5 rounded-full">v4.3.1 Active</span>
</div>
<div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-lg">visibility</span>
<span className="font-semibold text-on-surface">CLIP + YOLOv8 Food Guard</span>
</div>
<span className="font-label-sm text-[11px] font-bold text-tertiary bg-tertiary-fixed/50 px-2 py-0.5 rounded-full">99.8% Vision SLA</span>
</div>
<div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-on-surface text-lg">fingerprint</span>
<span className="font-semibold text-on-surface">Graph Neural Network (Fraud Botnet)</span>
</div>
<span className="font-label-sm text-[11px] font-bold text-on-surface bg-surface-container px-2 py-0.5 rounded-full">Sub-50ms</span>
</div>
</div>
<div className="pt-2 flex items-center justify-between">
<button className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-bold flex items-center justify-center gap-2 transition-all">
<span className="material-symbols-outlined text-base">refresh</span>
              Kiểm Tra Độ Trễ Mô Hình (Health Check)
            </button>
</div>
</div>
</div>
</div>
{/*  Live Intervention Audit Log (Full Width Table)  */}
<div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col gap-5 mt-2">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div className="flex flex-col">
<h3 className="font-headline-md text-headline-md font-bold text-on-surface">Nhật Ký Tự Động &amp; Can Thiệp Của Admin (Audit Stream)</h3>
<span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Lưu trữ bất biến trong 90 ngày phục vụ đối soát pháp lý và khiếu nại nhà hàng</span>
</div>
<div className="flex items-center gap-2.5">
<button className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-1.5 transition-all">
<span className="material-symbols-outlined text-base">file_download</span>
            Xuất Báo Cáo CSV (Hôm Nay)
          </button>
<button className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-1.5 transition-all">
<span className="material-symbols-outlined text-base">filter_list</span>
            Bộ Lọc Nâng Cao
          </button>
</div>
</div>
{/*  Log Entries Table  */}
<div className="overflow-x-auto">
<table className="w-full text-left font-body-sm text-body-sm">
<thead>
<tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
<th className="py-3.5 px-4 rounded-l-xl">Thời Gian</th>
<th className="py-3.5 px-4">Đối Tượng Bị Gắn Cờ</th>
<th className="py-3.5 px-4">Nhà Hàng Đích</th>
<th className="py-3.5 px-4">Lý Do Hệ Thống Ghi Nhận</th>
<th className="py-3.5 px-4">Hành Động Đã Thực Thi</th>
<th className="py-3.5 px-4 text-right rounded-r-xl">Tác Nhân</th>
</tr>
</thead>
<tbody className="divide-y-0">
{/*  Row 1  */}
<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-3.5 px-4 font-mono font-medium text-on-surface">14:28:19</td>
<td className="py-3.5 px-4">
<div className="flex items-center gap-2">
<span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">AN</span>
<span className="font-bold text-on-surface">AnNhien93</span>
</div>
</td>
<td className="py-3.5 px-4 font-semibold text-on-surface">Cơm Niêu Singapore Pasteur</td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center gap-1 text-primary font-medium">
<span className="material-symbols-outlined text-sm">link_off</span> Chèn link Telegram kéo cờ bạc
                </span>
</td>
<td className="py-3.5 px-4">
<span className="px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-[11px] font-bold">XÓA &amp; BAN 30 NGÀY</span>
</td>
<td className="py-3.5 px-4 text-right font-label-sm text-[11px] font-bold text-on-surface-variant">
                AI Sentinel (Auto)
              </td>
</tr>
{/*  Row 2  */}
<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-3.5 px-4 font-mono font-medium text-on-surface">14:15:02</td>
<td className="py-3.5 px-4">
<div className="flex items-center gap-2">
<span className="w-7 h-7 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center font-bold text-xs">TL</span>
<span className="font-bold text-on-surface">ThuyLinh_Review</span>
</div>
</td>
<td className="py-3.5 px-4 font-semibold text-on-surface">Pizza 4P's Bến Thành</td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center gap-1 text-secondary font-medium">
<span className="material-symbols-outlined text-sm">crop_original</span> Trùng ảnh Instagram cá nhân khác
                </span>
</td>
<td className="py-3.5 px-4">
<span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-secondary font-label-sm text-[11px] font-bold">GỠ ẢNH, GIỮ TEXT</span>
</td>
<td className="py-3.5 px-4 text-right font-label-sm text-[11px] font-bold text-on-surface">
                Admin: Hoàng Nam
              </td>
</tr>
{/*  Row 3  */}
<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-3.5 px-4 font-mono font-medium text-on-surface">13:58:44</td>
<td className="py-3.5 px-4">
<div className="flex items-center gap-2">
<span className="w-7 h-7 rounded-full bg-error/15 text-error flex items-center justify-center font-bold text-xs">BF</span>
<span className="font-bold text-error">Bot Cluster #09 (8 Accounts)</span>
</div>
</td>
<td className="py-3.5 px-4 font-semibold text-on-surface">Phở Thìn Lò Đúc (TP.HCM)</td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center gap-1 text-error font-medium">
<span className="material-symbols-outlined text-sm">cyclone</span> Đột biến 1 sao từ IP nước ngoài (VPN)
                </span>
</td>
<td className="py-3.5 px-4">
<span className="px-2.5 py-1 rounded-full bg-error text-on-error font-label-sm text-[11px] font-bold">CÁCH LY SANDBOX</span>
</td>
<td className="py-3.5 px-4 text-right font-label-sm text-[11px] font-bold text-on-surface-variant">
                AI Sentinel (Auto)
              </td>
</tr>
{/*  Row 4  */}
<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-3.5 px-4 font-mono font-medium text-on-surface">13:40:11</td>
<td className="py-3.5 px-4">
<div className="flex items-center gap-2">
<span className="w-7 h-7 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold text-xs">QN</span>
<span className="font-bold text-on-surface">QuangNhat_Chef</span>
</div>
</td>
<td className="py-3.5 px-4 font-semibold text-on-surface">Quán Ốc Đào Nguyễn Trãi</td>
<td className="py-3.5 px-4">
<span className="inline-flex items-center gap-1 text-tertiary font-medium">
<span className="material-symbols-outlined text-sm">check_circle</span> Khiếu nại thực khách thật (GPS OK)
                </span>
</td>
<td className="py-3.5 px-4">
<span className="px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-[11px] font-bold">DUYỆT HIỂN THỊ</span>
</td>
<td className="py-3.5 px-4 text-right font-label-sm text-[11px] font-bold text-on-surface">
                Admin: Hoàng Nam
              </td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
{/*  Interactive JavaScript Micro-interactions  */}

</div></main>
    </div>
  );
}
