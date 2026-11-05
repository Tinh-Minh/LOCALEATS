import { useState } from "react";

/**
 * AdminAiSommelierTab
 * Super Admin Screen: Mô Hình AI Sommelier & Trọng Số Khẩu Vị
 * Auto-generated from Google Stitch design with full length fidelity.
 */
export default function AdminAiSommelierTab({ onNavigateTab }) {
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
      <main className="relative pt-16 bg-surface min-h-screen px-space-lg py-space-lg"><div className="flex flex-col w-full space-y-space-xl">
{/*  Top Banner & Context Header  */}
<div className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-lg shadow-sm">
<div className="absolute -right-16 -top-24 w-96 h-96 rounded-full bg-gradient-to-br from-primary/10 via-secondary-container/10 to-transparent blur-3xl pointer-events-none"></div>
<div className="relative z-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-space-lg">
<div className="flex flex-col space-y-space-xs max-w-3xl">
<div className="flex flex-wrap items-center gap-space-xs">
<span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm shadow-sm">
<span className="material-symbols-outlined text-sm animate-pulse">memory</span>
            AI CORE ENGINE v4.8
          </span>
<span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm">
<span className="material-symbols-outlined text-sm text-secondary">database</span>
            Model: LLaMA-Foodie-MoE &amp; VectorDB Qdrant
          </span>
<span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">
<span className="material-symbols-outlined text-sm">verified</span>
            Accuracy: 96.8%
          </span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1">
          Trung Tâm Quản Trị Mô Hình AI Sommelier &amp; Khẩu Vị Cá Nhân Hóa
        </h1>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Tinh chỉnh mô hình trí tuệ nhân tạo gợi ý ẩm thực theo ngữ cảnh thời tiết, tâm trạng, định vị GPS và khẩu vị thực khách trên nền tảng LOCALEATS theo thời gian thực.
        </p>
</div>
<div className="flex flex-wrap items-center gap-space-sm shrink-0">
<button className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-full bg-surface-container-lowest text-on-surface font-label-lg text-label-lg shadow-sm hover:bg-surface-container-high transition-transform active:scale-95" type="button">
<span className="material-symbols-outlined text-lg text-secondary">sync</span>
          Huấn Luyện Lại (Trigger Retrain)
        </button>
<button className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-lg text-label-lg shadow-sm hover:bg-secondary-fixed-dim transition-transform active:scale-95" type="button">
<span className="material-symbols-outlined text-lg">science</span>
          Thử Nghiệm Prompt (Playground)
        </button>
<button className="inline-flex items-center gap-2 px-space-lg py-2.5 rounded-full bg-primary-container text-on-primary-container font-label-lg text-label-lg shadow-md hover:opacity-95 transition-transform active:scale-95" type="button">
<span className="material-symbols-outlined text-lg">rocket_launch</span>
          Triển Khai Model v4.8.2 Live
        </button>
</div>
</div>
</div>
{/*  KPI Metrics Grid  */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
{/*  Card 1  */}
<div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col justify-between space-y-space-md group hover:shadow-md transition-shadow">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Độ Chính Xác Khẩu Vị</span>
<div className="w-9 h-9 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-xl">insights</span>
</div>
</div>
<div>
<div className="flex items-baseline gap-2">
<span className="font-display-lg text-display-lg text-tertiary font-bold tracking-tight">96.8%</span>
<span className="inline-flex items-center text-xs font-bold text-tertiary font-label-sm">
<span className="material-symbols-outlined text-sm">trending_up</span>+2.4%
          </span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
          Taste Matching Acc sau khi nạp 500k review tiếng Việt bản địa.
        </p>
</div>
<div className="w-full bg-surface-container-high rounded-full h-1.5 overflow-hidden">
<div className="bg-tertiary h-1.5 rounded-full" style={{ width: "96.8%" }}></div>
</div>
</div>
{/*  Card 2  */}
<div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col justify-between space-y-space-md group hover:shadow-md transition-shadow">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Tỷ Lệ Chấp Nhận Gợi Ý</span>
<div className="w-9 h-9 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-xl">ads_click</span>
</div>
</div>
<div>
<div className="flex items-baseline gap-2">
<span className="font-display-lg text-display-lg text-secondary font-bold tracking-tight">38.4%</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">CTR Click-to-Go</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
          Thực khách chốt đơn quán đề xuất trong vòng 15 phút mở app.
        </p>
</div>
<div className="w-full bg-surface-container-high rounded-full h-1.5 overflow-hidden">
<div className="bg-secondary h-1.5 rounded-full" style={{ width: "38.4%" }}></div>
</div>
</div>
{/*  Card 3  */}
<div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col justify-between space-y-space-md group hover:shadow-md transition-shadow">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Độ Trễ Suy Luận</span>
<div className="w-9 h-9 rounded-full bg-surface-container-high text-primary flex items-center justify-center">
<span className="material-symbols-outlined text-xl">speed</span>
</div>
</div>
<div>
<div className="flex items-baseline gap-2">
<span className="font-display-lg text-display-lg text-on-surface font-bold tracking-tight">142<span className="font-headline-sm text-headline-sm text-on-surface-variant ml-1 font-normal">ms</span></span>
<span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">P99 &lt; 190ms</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
          Cụm 8x NVIDIA A100 Tensor Core với FlashAttention-2 tối ưu.
        </p>
</div>
<div className="w-full bg-surface-container-high rounded-full h-1.5 overflow-hidden">
<div className="bg-primary h-1.5 rounded-full" style={{ width: "72%" }}></div>
</div>
</div>
{/*  Card 4  */}
<div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col justify-between space-y-space-md group hover:shadow-md transition-shadow">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Token Hôm Nay</span>
<div className="w-9 h-9 rounded-full bg-primary-fixed text-on-primary-fixed-variant flex items-center justify-center">
<span className="material-symbols-outlined text-xl">token</span>
</div>
</div>
<div>
<div className="flex items-baseline gap-2">
<span className="font-display-lg text-display-lg text-primary font-bold tracking-tight">14.2M</span>
<span className="font-label-sm text-label-sm text-tertiary font-bold">-18% chi phí</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
          Tối ưu chi phí thông qua mô hình chưng cất Distilled SLM.
        </p>
</div>
<div className="w-full bg-surface-container-high rounded-full h-1.5 overflow-hidden">
<div className="bg-primary-container h-1.5 rounded-full" style={{ width: "58%" }}></div>
</div>
</div>
</div>
{/*  Main Grid: Fine-tuning Sliders & Embeddings Explorer  */}
<div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg">
{/*  Algorithm Fine-Tuning Panel (7 cols)  */}
<div className="xl:col-span-7 flex flex-col space-y-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-xs">
<div>
<span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">Trọng Số Thuật Toán</span>
<h2 className="font-headline-md text-headline-md text-on-surface">Cấu Hình Trọng Số Đề Xuất (Weights Fine-Tuning)</h2>
</div>
<div className="flex items-center gap-space-sm bg-surface-container-low px-space-sm py-1 rounded-full">
<span className="font-label-sm text-label-sm text-on-surface-variant font-bold">A/B Testing 50/50:</span>
<button aria-label="Toggle AB Testing" className="w-10 h-6 bg-tertiary rounded-full relative p-0.5 transition-colors focus:outline-none" id="ab-toggle" type="button">
<div className="w-5 h-5 bg-surface-container-lowest rounded-full shadow-sm transform translate-x-4 transition-transform" id="ab-thumb"></div>
</button>
</div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
        Tổng tỷ trọng hiện tại: <strong className="text-primary font-bold" id="total-weight-indicator">100%</strong>. Khi điều chỉnh, hệ thống sẽ tự động cân bằng theo mô hình đa tác vụ Bayesian Optimization.
      </p>
<div className="space-y-space-md pt-2">
{/*  Slider 1  */}
<div className="p-space-sm rounded-xl bg-surface-container-low space-y-space-xs">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-xl">near_me</span>
<div>
<span className="font-label-lg text-label-lg text-on-surface">Vị Trí Địa Lý &amp; Bán Kính GPS</span>
<p className="font-body-sm text-body-sm text-on-surface-variant">Ưu tiên cơ sở ẩm thực trong bán kính 3km có lộ trình nhanh nhất</p>
</div>
</div>
<span className="font-title-md text-title-md text-primary font-bold"><span id="val-gps">35</span>%</span>
</div>
<input className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary" max="100" min="0" oninput="document.getElementById('val-gps').innerText = this.value" type="range" value="35"/>
</div>
{/*  Slider 2  */}
<div className="p-space-sm rounded-xl bg-surface-container-low space-y-space-xs">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-xl">restaurant</span>
<div>
<span className="font-label-lg text-label-lg text-on-surface">Khẩu Vị Cá Nhân &amp; Lịch Sử Thưởng Thức</span>
<p className="font-body-sm text-body-sm text-on-surface-variant">Thói quen ăn cay, món nước, đồ cuốn, đồ nướng, tần suất ăn món tương tự</p>
</div>
</div>
<span className="font-title-md text-title-md text-secondary font-bold"><span id="val-taste">25</span>%</span>
</div>
<input className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-secondary" max="100" min="0" oninput="document.getElementById('val-taste').innerText = this.value" type="range" value="25"/>
</div>
{/*  Slider 3  */}
<div className="p-space-sm rounded-xl bg-surface-container-low space-y-space-xs">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary text-xl">cloud</span>
<div>
<span className="font-label-lg text-label-lg text-on-surface">Ngữ Cảnh Thời Gian &amp; Thời Tiết Thực Tế</span>
<p className="font-body-sm text-body-sm text-on-surface-variant">Mưa đề xuất lẩu/đồ cay nóng, nắng trưa đề xuất nước ép/cơm văn phòng lạnh</p>
</div>
</div>
<span className="font-title-md text-title-md text-tertiary font-bold"><span id="val-weather">20</span>%</span>
</div>
<input className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-tertiary" max="100" min="0" oninput="document.getElementById('val-weather').innerText = this.value" type="range" value="20"/>
</div>
{/*  Slider 4  */}
<div className="p-space-sm rounded-xl bg-surface-container-low space-y-space-xs">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-on-surface-variant text-xl">verified_user</span>
<div>
<span className="font-label-lg text-label-lg text-on-surface">Độ Uy Tín &amp; Đánh Giá Thực Khách (Trust Score)</span>
<p className="font-body-sm text-body-sm text-on-surface-variant">Chỉ đề xuất quán có minh bạch review thật &gt; 80/100 điểm vệ sinh an toàn</p>
</div>
</div>
<span className="font-title-md text-title-md text-on-surface font-bold"><span id="val-trust">15</span>%</span>
</div>
<input className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-surface-variant" max="100" min="0" oninput="document.getElementById('val-trust').innerText = this.value" type="range" value="15"/>
</div>
{/*  Slider 5  */}
<div className="p-space-sm rounded-xl bg-surface-container-low space-y-space-xs">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary-container text-xl">military_tech</span>
<div>
<span className="font-label-lg text-label-lg text-on-surface">Gói Tài Trợ Hợp Tác VIP (Merchant Ads)</span>
<p className="font-body-sm text-body-sm text-on-surface-variant">Gợi ý tài trợ tự nhiên kèm nhãn Sponsored nhẹ, không làm loãng trải nghiệm</p>
</div>
</div>
<span className="font-title-md text-title-md text-secondary-container font-bold"><span id="val-ads">5</span>%</span>
</div>
<input className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-secondary-container" max="100" min="0" oninput="document.getElementById('val-ads').innerText = this.value" type="range" value="5"/>
</div>
</div>
<div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-sm">
<div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
<span className="material-symbols-outlined text-tertiary text-base">check_circle</span>
<span>Thay đổi được đồng bộ tức thời qua gRPC sang 6 Node Edge Gateway</span>
</div>
<div className="flex items-center gap-space-sm">
<button className="px-space-md py-2 rounded-full bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors" type="button">
            Khôi Phục Mặc Định
          </button>
<button className="px-space-lg py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md shadow-md hover:opacity-90 transition-transform active:scale-95" type="button">
            Lưu &amp; Đồng Bộ Sang Production
          </button>
</div>
</div>
</div>
{/*  Taste Embeddings Matrix & Regional Vectors (5 cols)  */}
<div className="xl:col-span-5 flex flex-col space-y-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
<div className="flex items-center justify-between">
<div>
<span className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-wider">Vector Space Qdrant</span>
<h2 className="font-headline-md text-headline-md text-on-surface">Ma Trận Vector Khẩu Vị Ẩm Thực</h2>
</div>
<span className="px-space-xs py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">128 Dim</span>
</div>
{/*  Conceptual Taste Cluster Radar / Vector Visualizer  */}
<div className="relative bg-surface-container-low rounded-xl p-space-md flex flex-col items-center justify-center overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-secondary/5 to-tertiary/5"></div>
<svg className="w-full h-56 relative z-10" fill="none" viewBox="0 0 360 220">
{/*  Concentric circles  */}
<circle className="text-surface-container-high" cx="180" cy="110" r="90" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1.5"></circle>
<circle className="text-surface-container-high" cx="180" cy="110" r="60" stroke="currentColor" strokeWidth="1.5"></circle>
<circle className="text-surface-container-high" cx="180" cy="110" r="30" stroke="currentColor" strokeWidth="1"></circle>
{/*  Axis cross lines  */}
<line className="text-outline-variant" stroke="currentColor" strokeWidth="1" x1="180" x2="180" y1="15" y2="205"></line>
<line className="text-outline-variant" stroke="currentColor" strokeWidth="1" x1="85" x2="275" y1="110" y2="110"></line>
{/*  Filled polygon representing taste space  */}
<polygon className="text-primary/20" fill="currentColor" points="180,35 245,85 220,175 125,160 115,75"></polygon>
<polygon className="text-primary" points="180,35 245,85 220,175 125,160 115,75" stroke="currentColor" strokeWidth="2"></polygon>
{/*  Regional Nodes  */}
{/*  Bac: Dam da Ha Noi  */}
<circle className="text-primary" cx="180" cy="35" fill="currentColor" r="5"></circle>
<text className="font-label-sm text-[10px] fill-on-surface font-bold" text-anchor="middle" x="180" y="25">Đậm Đà Hà Nội (Phở, Chả Cá)</text>
{/*  Nam: Thanh Ngot Sai Gon  */}
<circle className="text-secondary" cx="245" cy="85" fill="currentColor" r="5"></circle>
<text className="font-label-sm text-[10px] fill-on-surface font-bold" text-anchor="start" x="255" y="85">Thanh Ngọt Sài Gòn</text>
{/*  Mien Trung: Cay nong  */}
<circle className="text-primary-container" cx="220" cy="175" fill="currentColor" r="5"></circle>
<text className="font-label-sm text-[10px] fill-on-surface font-bold" text-anchor="middle" x="225" y="195">Cay Nồng Miền Trung (Huế/Đà Nẵng)</text>
{/*  Gen Z: Giai Khat & Streetfood  */}
<circle className="text-tertiary" cx="125" cy="160" fill="currentColor" r="5"></circle>
<text className="font-label-sm text-[10px] fill-on-surface font-bold" text-anchor="middle" x="85" y="175">Ăn Vặt &amp; Trà Sữa Gen Z</text>
<circle className="text-secondary-container" cx="115" cy="75" fill="currentColor" r="5"></circle>
<text className="font-label-sm text-[10px] fill-on-surface font-bold" text-anchor="middle" x="85" y="65">Healthy &amp; Eat Clean</text>
</svg>
<div className="relative z-10 w-full flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm px-2 pt-2">
<span>Không gian vector Euclidean: L2 Metric</span>
<span className="text-tertiary font-bold">Cosine Similarity: 0.941</span>
</div>
</div>
{/*  Realtime Emotional Keyword Trends  */}
<div className="space-y-space-xs pt-1">
<span className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant tracking-wider">Từ Khóa Tâm Trạng Thịnh Hành Hôm Nay</span>
<div className="grid grid-cols-2 gap-space-xs pt-1">
<div className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-lg">local_fire_department</span>
<span className="font-label-md text-label-md text-on-surface">"Lẩu ấm trời lạnh"</span>
</div>
<span className="font-label-sm text-label-sm text-primary font-bold">+240%</span>
</div>
<div className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-lg">coffee</span>
<span className="font-label-md text-label-md text-on-surface">"Cà phê view chill"</span>
</div>
<span className="font-label-sm text-label-sm text-secondary font-bold">+85%</span>
</div>
<div className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary text-lg">spa</span>
<span className="font-label-md text-label-md text-on-surface">"Bữa trưa chay thanh tịnh"</span>
</div>
<span className="font-label-sm text-label-sm text-tertiary font-bold">+42%</span>
</div>
<div className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary-container text-lg">celebration</span>
<span className="font-label-md text-label-md text-on-surface">"Ăn nhậu vỉa hè tụ tập"</span>
</div>
<span className="font-label-sm text-label-sm text-secondary-container font-bold">+68%</span>
</div>
</div>
</div>
</div>
</div>
{/*  Regional Taste Matrix Cards (Visual Proof)  */}
<div className="flex flex-col space-y-space-md">
<div className="flex items-center justify-between">
<div>
<span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">Cụm Khẩu Vị Tiêu Biểu</span>
<h2 className="font-headline-md text-headline-md text-on-surface">Phân Hóa Đặc Trưng Ẩm Thực 3 Miền Trong AI Sommelier</h2>
</div>
<button className="text-primary font-label-md text-label-md hover:underline flex items-center gap-1" type="button">
        Xem tất cả 48 Vector Clusters
        <span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
{/*  Card Miền Bắc  */}
<div className="rounded-xl overflow-hidden bg-surface-container-lowest shadow-sm flex flex-col group hover:shadow-md transition-shadow">
<div className="h-36 relative overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Traditional Hanoi Pho bo soup bowl with rich aromatic clear beef broth, fresh scallions, herbs, and tender beef slices in rustic morning sunlit restaurant setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtxlwc3oAV3UDMI-sEn5NmEQP2azfGwRnrpEK0Ff_mi6D2a2CLkAjerYJCNw2rGPueZnoTuAUoHha8expwnkujLtbeHA6_xVBqszP3L2bNIZynNFVk3_2sWcdrQ1d7NVM-id5HA9aklLSE817PZAR9HkxT4w_SiZuyW1Brn9GicGhSvpIn0rwqPXSKLiB-n4-goZmHQqid3xffB6wLvLVMiOSaA_sbRp-t1xnwhds"/>
<span className="absolute top-2 left-2 px-space-xs py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-sm text-label-sm font-bold">
            Cluster Bắc Bộ
          </span>
</div>
<div className="p-space-md flex-1 flex flex-col justify-between space-y-space-xs">
<div>
<h3 className="font-title-md text-title-md text-on-surface">Đậm Đà Hà Nội &amp; Sông Hồng</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
              Phở bò tái lăn, chả cá Lã Vọng, bún ốc nguội, bánh cuốn thanh trì. Nước dùng thanh trong, đậm mùi gừng nướng, hoa hồi.
            </p>
</div>
<div className="pt-2 flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant">Trọng số vị mặn &amp; thanh: <strong className="text-on-surface">88%</strong></span>
<span className="w-2 h-2 rounded-full bg-tertiary"></span>
</div>
</div>
</div>
{/*  Card Miền Trung  */}
<div className="rounded-xl overflow-hidden bg-surface-container-lowest shadow-sm flex flex-col group hover:shadow-md transition-shadow">
<div className="h-36 relative overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Vibrant bowl of authentic Bun Bo Hue spicy noodle soup with red chili oil broth, beef shank, lemongrass, fresh herbs and lime wedge in warm golden lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6Vm-X0Hh7BrbXtTgL_mr2zvMhbvcZgGF7JUnbZ7yp1AC6aWXI14vjJPRR2AXpRxZdAqtBH3O45zegr6cb2MGVMFtKw2SkZJ-GEJwEKrrTTiZs2efGiShqerCsm0o-kHBlfjK0zpc1ztFxtQNLNMu0zsRpGH6pYXQbqm4TtXImmD_x9HA4Lh4-pYCuC5Wgk-gad4xMdKLY7oMrCNwVQsm6Ad7o8K35DCR_lya08os"/>
<span className="absolute top-2 left-2 px-space-xs py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-sm text-label-sm font-bold">
            Cluster Cố Đô
          </span>
</div>
<div className="p-space-md flex-1 flex flex-col justify-between space-y-space-xs">
<div>
<h3 className="font-title-md text-title-md text-on-surface">Cay Nồng Miền Trung &amp; Xứ Huế</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
              Bún bò Huế cay đậm sả ớt, mì Quảng tôm thịt, bánh bèo chén, nem lụi nướng than hoa. Hương vị bùng nổ, nồng nàn ruốc Huế.
            </p>
</div>
<div className="pt-2 flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant">Trọng số ớt &amp; sả mắm: <strong className="text-on-surface">94%</strong></span>
<span className="w-2 h-2 rounded-full bg-primary"></span>
</div>
</div>
</div>
{/*  Card Miền Nam  */}
<div className="rounded-xl overflow-hidden bg-surface-container-lowest shadow-sm flex flex-col group hover:shadow-md transition-shadow">
<div className="h-36 relative overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Plated Saigon broken rice Com Tam with grilled pork chop coated in golden sweet honey glaze, steamed egg meatloaf, pickled carrots and scallion oil." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXoGQ1n4zD3bh1rVPT7JnK4x2HJns1z5IX2iS4JDk4t38xiXkTvqMnAbUe4nz-AURCrmBAbxOpmKmkhqfL6KrtpvM6YMp4Z-lobfsQfx4G0cEHfdX8WjaL7zDWErUTMlUZrFoIUdM72eH78s8RwK66YiLmCjm2ShKCygzFdNyVsd5AyIB5oLEvMpT1RUfWaEoDc_A5nfW8I7TFkLyLGcPIl8Xv_WpiPjggEJfhdCs"/>
<span className="absolute top-2 left-2 px-space-xs py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-secondary font-label-sm text-label-sm font-bold">
            Cluster Phương Nam
          </span>
</div>
<div className="p-space-md flex-1 flex flex-col justify-between space-y-space-xs">
<div>
<h3 className="font-title-md text-title-md text-on-surface">Thanh Ngọt Sài Gòn &amp; Miền Tây</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
              Cơm tấm sườn bì chả mỡ hành, hủ tiếu Nam Vang lòng heo, bánh canh ghẹ nước cốt dừa. Hậu vị ngọt béo tự nhiên từ nước dừa tươi.
            </p>
</div>
<div className="pt-2 flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant">Trọng số ngọt dịu &amp; béo: <strong className="text-on-surface">91%</strong></span>
<span className="w-2 h-2 rounded-full bg-secondary"></span>
</div>
</div>
</div>
{/*  Card Gen Z Streetfood  */}
<div className="rounded-xl overflow-hidden bg-surface-container-lowest shadow-sm flex flex-col group hover:shadow-md transition-shadow">
<div className="h-36 relative overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Artisanal iced fruit tea with mango, passion fruit slices, and fresh mint on a sunlit modern cafe wooden table with warm aesthetic tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNBJnG4EMdYnac4GzBBK4uBk4e3GE5Xdd8M8mypXht-EEx9xmuno5CIi_koCTKIQ6dX1tBLDDeqfQ6RemFymj-iKgfaZ5ILE1KCoEoJBAqXaEPwPNjsPFodhhFRYTR7eNj_F8GhHhVzfyaoDbDY8zsAP4f1ZDxx77ck9s0RG9rLfmPvQYsYnIApD4HSkZ6bhk2LYz2lJQKSY1SXxJpFnOvkH1bxsJSNGPQs1ZZhFU"/>
<span className="absolute top-2 left-2 px-space-xs py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-tertiary font-label-sm text-label-sm font-bold">
            Cluster Xu Hướng
          </span>
</div>
<div className="p-space-md flex-1 flex flex-col justify-between space-y-space-xs">
<div>
<h3 className="font-title-md text-title-md text-on-surface">Giải Khát &amp; Ăn Vặt Gen Z</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
              Trà trái cây thanh nhiệt, bánh tráng nướng Đà Lạt, trà sữa lài đậm vị, cà phê muối béo mặn. Thích hợp đi nhóm trẻ và check-in.
            </p>
</div>
<div className="pt-2 flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant">Trọng số check-in &amp; mát lạnh: <strong className="text-on-surface">86%</strong></span>
<span className="w-2 h-2 rounded-full bg-tertiary"></span>
</div>
</div>
</div>
</div>
</div>
{/*  Hallucination Guardrails & Safety Logs Section  */}
<div className="flex flex-col space-y-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-full bg-error-container text-on-error-container flex items-center justify-center">
<span className="material-symbols-outlined text-xl">gavel</span>
</div>
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">Giám Sát Lỗi Suy Luận &amp; Halucination Guardrails</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Nhật ký can thiệp chặn lỗi logic, an toàn thực phẩm và sai lệch tôn giáo/chế độ ăn của thực khách</p>
</div>
</div>
<div className="flex items-center gap-space-sm">
<button className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-full bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors" type="button">
<span className="material-symbols-outlined text-base">terminal</span>
          Chỉnh Sửa System Prompt
        </button>
<button className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-full bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors" type="button">
<span className="material-symbols-outlined text-base">download</span>
          Xuất Nhật Ký Guardrails (.jsonl)
        </button>
</div>
</div>
{/*  Table of Intercepted Hallucinations  */}
<div className="overflow-x-auto rounded-xl bg-surface-container-low">
<table className="w-full text-left font-body-sm text-body-sm">
<thead className="bg-surface-container-high text-on-surface font-label-md text-label-md">
<tr>
<th className="py-3 px-space-md">Thời Gian</th>
<th className="py-3 px-space-md">Thực Khách / Session</th>
<th className="py-3 px-space-md">Gợi Ý Bị Chặn (LLaMA Hallucination)</th>
<th className="py-3 px-space-md">Quy Tắc Guardrail Vi Phạm</th>
<th className="py-3 px-space-md">Hành Động Khắc Phục</th>
<th className="py-3 px-space-md text-right">Chi Tiết</th>
</tr>
</thead>
<tbody className="divide-y-0 text-on-surface">
{/*  Row 1  */}
<tr className="hover:bg-surface-container-highest/60 transition-colors">
<td className="py-3 px-space-md font-mono text-xs text-on-surface-variant">02:14:08 AM</td>
<td className="py-3 px-space-md font-bold">#USR-89412 <span className="text-xs font-normal text-on-surface-variant">(Đống Đa, HN)</span></td>
<td className="py-3 px-space-md text-error font-medium">Gợi ý: "Phở Bát Đàn - 49 Bát Đàn"</td>
<td className="py-3 px-space-md">
<span className="inline-flex items-center gap-1 px-space-xs py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm">
<span className="material-symbols-outlined text-xs">schedule</span>
                Quán Đã Đóng Cửa (Chỉ mở sáng/chiều)
              </span>
</td>
<td className="py-3 px-space-md text-tertiary font-medium">Thay thế: Gợi ý "Phở Gánh Hàng Chiếu (Mở đêm 3h sáng)"</td>
<td className="py-3 px-space-md text-right">
<button className="p-1 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-primary">
<span className="material-symbols-outlined text-base">visibility</span>
</button>
</td>
</tr>
{/*  Row 2  */}
<tr className="hover:bg-surface-container-highest/60 transition-colors">
<td className="py-3 px-space-md font-mono text-xs text-on-surface-variant">01:52:33 AM</td>
<td className="py-3 px-space-md font-bold">#USR-33904 <span className="text-xs font-normal text-on-surface-variant">(Quận 1, HCM)</span></td>
<td className="py-3 px-space-md text-error font-medium">Gợi ý: "Bò Tơ Củ Chi Nướng Muối Ớt"</td>
<td className="py-3 px-space-md">
<span className="inline-flex items-center gap-1 px-space-xs py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm">
<span className="material-symbols-outlined text-xs">no_food</span>
                Vi Phạm Tag Ăn Chay Thuần (Strict Vegan)
              </span>
</td>
<td className="py-3 px-space-md text-tertiary font-medium">Thay thế: Gợi ý "Nhà Hàng Chay Bếp Hoa Nấm Hầu Thủ"</td>
<td className="py-3 px-space-md text-right">
<button className="p-1 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-primary">
<span className="material-symbols-outlined text-base">visibility</span>
</button>
</td>
</tr>
{/*  Row 3  */}
<tr className="hover:bg-surface-container-highest/60 transition-colors">
<td className="py-3 px-space-md font-mono text-xs text-on-surface-variant">01:10:19 AM</td>
<td className="py-3 px-space-md font-bold">#USR-61208 <span className="text-xs font-normal text-on-surface-variant">(Cầu Giấy, HN)</span></td>
<td className="py-3 px-space-md text-error font-medium">Gợi ý: "Quán Lòng Bò Nướng A.T"</td>
<td className="py-3 px-space-md">
<span className="inline-flex items-center gap-1 px-space-xs py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
<span className="material-symbols-outlined text-xs">health_and_safety</span>
                Cảnh Báo ATTP Chưa Giải Trình
              </span>
</td>
<td className="py-3 px-space-md text-tertiary font-medium">Tự động loại bỏ khỏi Top 10 Đề Xuất Hệ Thống</td>
<td className="py-3 px-space-md text-right">
<button className="p-1 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-primary">
<span className="material-symbols-outlined text-base">visibility</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
{/*  Live Conversation Sample & Prompt Inspector  */}
<div className="p-space-md rounded-xl bg-surface-container-low space-y-space-sm">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface font-bold flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-base">forum</span>
          Mẫu Hội Thoại Suy Luận Thực Tế Của AI Sommelier (Session #9942)
        </span>
<span className="font-label-sm text-label-sm text-on-surface-variant font-mono">Temperature: 0.35 | Top-P: 0.85</span>
</div>
<div className="p-space-sm rounded-lg bg-surface-container-lowest font-mono text-xs leading-relaxed space-y-2 text-on-surface">
<p><strong className="text-secondary">[Thực khách]:</strong> "Trời Hà Nội đang mưa rét 14 độ, mình đi 2 người muốn tìm món gì ấm bụng, cay nhẹ, không muốn đi quá 2km từ Tràng Thi."</p>
<p><strong className="text-primary">[AI Sommelier]:</strong> "Dạ chào bạn! Với tiết trời mưa lạnh 14°C ở khu phố cổ, mình gợi ý hai bạn ghé <strong>Bún Thang &amp; Phở Gà Trộn Phố Cũ (cách Tràng Thi 750m)</strong> hoặc thưởng thức nồi <strong>Lẩu Bò Nhúng Dấm 555 ngõ Bảo Khánh (cách 400m)</strong>. Nước lẩu dấm gạo thanh nồng ấm ức, thịt bò mềm và rau ngò gai ấm bụng rất phù hợp thời tiết này ạ!"</p>
</div>
</div>
</div>
</div>
</main>
    </div>
  );
}
