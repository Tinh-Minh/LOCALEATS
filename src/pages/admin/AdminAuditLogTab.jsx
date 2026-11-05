import { useState } from "react";

/**
 * AdminAuditLogTab
 * Super Admin Screen: Audit Log & Nhật Ký An Ninh
 * Auto-generated from Google Stitch design with full length fidelity.
 */
export default function AdminAuditLogTab({ onNavigateTab }) {
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
      <main className="relative pt-16 bg-surface min-h-screen px-space-lg py-space-lg"><div className="flex flex-col w-full space-y-space-lg">
{/*  PAGE HEADER & ROOT CONTROL STRIP  */}
<div className="relative bg-surface-container-lowest rounded-xl p-space-lg shadow-sm overflow-hidden">
<div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
<div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-space-lg">
<div className="space-y-space-xs max-w-4xl">
<div className="flex flex-wrap items-center gap-space-xs">
<span className="inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm tracking-wide">
<span className="material-symbols-outlined text-xs">shield_lock</span>
            SECURITY LEVEL: ROOT AUDIT
          </span>
<span className="inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
            SIEM &amp; SOC 2 COMPLIANT
          </span>
<span className="inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
<span className="material-symbols-outlined text-xs">history_edu</span>
            Immutable Hash Ledger (WORM)
          </span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          Nhật Ký Thao Tác &amp; Giám Sát An Ninh Hệ Thống (Audit Log)
        </h1>
<p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
          Ghi nhận bất biến (Write-Once-Read-Many) mọi tác vụ can thiệp của Quản trị viên, Chủ quán và API đối tác. Giám sát toàn vẹn chuỗi khối và phát hiện hành vi xâm nhập trái phép bằng AI Sentinel Security.
        </p>
</div>
{/*  Action Cluster  */}
<div className="flex flex-wrap items-center gap-space-sm shrink-0">
<button className="inline-flex items-center gap-space-xs px-space-md py-2.5 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-variant font-label-lg text-label-lg transition-all shadow-sm" type="button">
<span className="material-symbols-outlined text-lg">description</span>
          Xuất Báo Cáo Tuân Thủ Pháp Lý
        </button>
<button className="inline-flex items-center gap-space-xs px-space-md py-2.5 rounded-full bg-surface-container-low text-secondary hover:bg-secondary-fixed font-label-lg text-label-lg transition-all shadow-sm" type="button">
<span className="material-symbols-outlined text-lg">tune</span>
          Cấu Hình Ngưỡng SOC
        </button>
<button className="inline-flex items-center gap-space-xs px-space-md py-2.5 rounded-full bg-primary-container text-on-primary-container hover:bg-primary font-label-lg text-label-lg transition-all shadow-[0_6px_16px_rgba(222,54,24,0.35)] active:scale-95" onclick="confirmEmergencyLock()" type="button">
<span className="material-symbols-outlined text-lg">lock_person</span>
          Khóa Khẩn Cấp Toàn Bộ Phiên
        </button>
</div>
</div>
</div>
{/*  KPI METRICS GRID  */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">
{/*  Card 1  */}
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Sự Kiện Hôm Nay</span>
<div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
<span className="material-symbols-outlined text-sm">event_repeat</span>
</div>
</div>
<div className="mt-space-md flex items-baseline gap-2">
<span className="font-headline-lg text-headline-lg text-on-surface">184.250</span>
<span className="font-label-sm text-label-sm text-tertiary font-bold">+12.4%</span>
</div>
<p className="mt-1 font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-xs text-tertiary">enhanced_encryption</span>
        100% mã hóa SHA-256 kèm chữ ký HSM
      </p>
<div className="w-full bg-surface-container h-1 rounded-full mt-space-md overflow-hidden">
<div className="bg-tertiary h-1 rounded-full w-full"></div>
</div>
</div>
{/*  Card 2  */}
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Thao Tác Quyền Root</span>
<div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed-variant">
<span className="material-symbols-outlined text-sm">admin_panel_settings</span>
</div>
</div>
<div className="mt-space-md flex items-baseline gap-2">
<span className="font-headline-lg text-headline-lg text-primary">28</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">thao tác/24h</span>
</div>
<p className="mt-1 font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-xs text-secondary">token</span>
        YubiKey 5C FIPS cấp quyền 100%
      </p>
<div className="w-full bg-surface-container h-1 rounded-full mt-space-md overflow-hidden">
<div className="bg-primary h-1 rounded-full w-[28%]"></div>
</div>
</div>
{/*  Card 3  */}
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Cảnh Báo Đột Nhập</span>
<div className="w-8 h-8 rounded-full bg-secondary-fixed-dim/40 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-sm">security_update_warning</span>
</div>
</div>
<div className="mt-space-md flex items-baseline gap-2">
<span className="font-headline-lg text-headline-lg text-on-surface">0 Mức Đỏ</span>
<span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-bold">2 Mức Vàng</span>
</div>
<p className="mt-1 font-body-sm text-body-sm text-on-surface-variant truncate">
        Sai OTP 5 lần từ Tor Exit Node
      </p>
<div className="w-full bg-surface-container h-1 rounded-full mt-space-md overflow-hidden">
<div className="bg-secondary h-1 rounded-full w-[8%]"></div>
</div>
</div>
{/*  Card 4  */}
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Toàn Vẹn Chuỗi Bản Ghi</span>
<div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
<span className="material-symbols-outlined text-sm">verified</span>
</div>
</div>
<div className="mt-space-md flex items-baseline gap-2">
<span className="font-headline-lg text-headline-lg text-tertiary">100%</span>
<span className="font-label-sm text-label-sm text-tertiary font-bold">Hợp Lệ</span>
</div>
<p className="mt-1 font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-xs text-tertiary">check_circle</span>
        Merkle Root không bị phân nhánh
      </p>
<div className="w-full bg-surface-container h-1 rounded-full mt-space-md overflow-hidden">
<div className="bg-tertiary h-1 rounded-full w-full"></div>
</div>
</div>
</div>
{/*  SEARCH & FILTER CONSOLE  */}
<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-md">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-sm items-center">
{/*  Search input  */}
<div className="lg:col-span-6 relative">
<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary-container text-xl pointer-events-none">manage_search</span>
<input className="w-full h-12 pl-12 pr-4 rounded-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-lowest shadow-sm font-body-md text-body-md transition-all" placeholder="Tìm theo Tên Admin, IP, Hash EVENT_ID, Mã Quán (MC-VN-...)..." type="text"/>
</div>
{/*  Severity Filter  */}
<div className="lg:col-span-3">
<div className="relative">
<select className="w-full h-12 px-4 appearance-none rounded-full bg-surface-container-low text-on-surface font-label-lg text-label-lg focus:outline-none focus:bg-surface-container-lowest shadow-sm cursor-pointer">
<option>Tất Cả Mức Độ Nguy Cơ</option>
<option>Mức Đỏ - Critical (Khẩn cấp)</option>
<option>Mức Vàng - Warning (Cảnh báo)</option>
<option>Mức Xanh - Info (Bình thường)</option>
</select>
<span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-sm">expand_more</span>
</div>
</div>
{/*  Action Group Filter  */}
<div className="lg:col-span-3">
<div className="relative">
<select className="w-full h-12 px-4 appearance-none rounded-full bg-surface-container-low text-on-surface font-label-lg text-label-lg focus:outline-none focus:bg-surface-container-lowest shadow-sm cursor-pointer">
<option>Tất Cả Nhóm Hành Động</option>
<option>Khóa / Đình Chỉ Quán Ăn</option>
<option>Thay Đổi Giá Menu / Niêm Yết</option>
<option>Xuất Lô Hóa Đơn VAT / Tài Chính</option>
<option>Phê Duyệt KYC / Vệ Sinh ATTP</option>
<option>Can Thiệp Điểm Review / KOL Tier</option>
<option>Phân Quyền Vai Trò &amp; Key Vault</option>
</select>
<span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-sm">expand_more</span>
</div>
</div>
</div>
{/*  Quick pills  */}
<div className="flex flex-wrap items-center gap-space-xs pt-1">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mr-1">Bộ lọc nhanh:</span>
<button className="px-space-sm py-1 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm shadow-sm flex items-center gap-1" type="button">
<span className="material-symbols-outlined text-xs">flash_on</span>
        Root Thao Tác (1h qua)
      </button>
<button className="px-space-sm py-1 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm transition-all flex items-center gap-1" type="button">
<span className="material-symbols-outlined text-xs">gavel</span>
        Án Phạt &amp; Khóa Quán
      </button>
<button className="px-space-sm py-1 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm transition-all flex items-center gap-1" type="button">
<span className="material-symbols-outlined text-xs">receipt</span>
        Đẩy CQT Thuế (VAT)
      </button>
<button className="px-space-sm py-1 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm transition-all flex items-center gap-1" type="button">
<span className="material-symbols-outlined text-xs">smart_toy</span>
        Sentinel AI Block
      </button>
<button className="px-space-sm py-1 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm transition-all flex items-center gap-1" type="button">
<span className="material-symbols-outlined text-xs">vpn_lock</span>
        IP Nước Ngoài
      </button>
</div>
</div>
{/*  MAIN TWO-COLUMN WORKSPACE: MASTER AUDIT TRAIL + SIEM PANEL  */}
<div className="grid grid-cols-1 2xl:grid-cols-12 gap-space-lg items-start">
{/*  MASTER AUDIT TRAIL (Left 8.5 Cols)  */}
<div className="2xl:col-span-9 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
<div className="p-space-lg bg-surface-container-lowest flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<div className="w-3 h-3 rounded-full bg-tertiary animate-pulse"></div>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Luồng Nhật Ký Gốc (WORM Ledger Live)</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Đồng bộ liên tục mỗi 300ms với cụm phân tán Raft Consensus</p>
</div>
</div>
<div className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant">
<span>Khóa ghi chuỗi:</span>
<span className="font-bold text-on-surface font-mono">BLOCK #9,482,109</span>
</div>
</div>
{/*  TABLE CONTAINER  */}
<div className="overflow-x-auto w-full">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
<th className="py-3 px-space-md">Thời Gian</th>
<th className="py-3 px-space-md">Tác Nhân &amp; Vai Trò</th>
<th className="py-3 px-space-md">Thao Tác Thực Hiện</th>
<th className="py-3 px-space-md">Đối Tượng Chịu Tác Động</th>
<th className="py-3 px-space-md">IP &amp; Môi Trường</th>
<th className="py-3 px-space-md">Chữ Ký Số / Khóa</th>
<th className="py-3 px-space-md text-right">Chi Tiết</th>
</tr>
</thead>
<tbody className="divide-y-0 font-body-sm text-body-sm">
{/*  Row 1: Root Super Admin Action  */}
<tr className="hover:bg-surface-container-low/70 transition-colors">
<td className="py-space-md px-space-md align-top whitespace-nowrap">
<div className="font-mono font-bold text-on-surface">14:32:15</div>
<div className="font-label-sm text-label-sm text-on-surface-variant">24/10/2024</div>
</td>
<td className="py-space-md px-space-md align-top">
<div className="flex items-center gap-2">
<div className="w-7 h-7 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs">
                    NH
                  </div>
<div>
<div className="font-title-md text-title-md text-on-surface flex items-center gap-1">
                      Nguyễn Hoàng Nam
                      <span className="material-symbols-outlined text-xs text-primary">verified_user</span>
</div>
<div className="font-label-sm text-label-sm text-primary font-bold">Root Super Admin</div>
</div>
</div>
</td>
<td className="py-space-md px-space-md align-top">
<div className="font-label-lg text-label-lg text-on-surface font-bold">Khóa tạm thời 7 ngày gian lận giá</div>
<div className="text-on-surface-variant mt-0.5 line-clamp-1">Kích hoạt lệnh cấm hiển thị vị trí trên bản đồ radar</div>
</td>
<td className="py-space-md px-space-md align-top">
<div className="font-title-md text-title-md text-on-surface">Lẩu Cua Đồng 68</div>
<span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-surface-container font-mono text-label-sm text-on-surface-variant">MC-HN-0068</span>
</td>
<td className="py-space-md px-space-md align-top whitespace-nowrap">
<div className="font-mono text-on-surface font-semibold">118.69.12.8</div>
<div className="text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
<span>Hà Nội, VN</span>
<span>•</span>
<span>Chrome MacOS</span>
</div>
</td>
<td className="py-space-md px-space-md align-top whitespace-nowrap">
<span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-xs">token</span>
                  YubiKey 5C OK
                </span>
<div className="font-mono text-xs text-on-surface-variant mt-1">#0x8f2d...b12a</div>
</td>
<td className="py-space-md px-space-md align-top text-right whitespace-nowrap">
<button className="px-space-sm py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-all shadow-sm" onclick="togglePayload('payload-1')" type="button">
                  JSON Payload
                </button>
</td>
</tr>
{/*  Row 1 Expandable Payload  */}
<tr className="hidden bg-surface-container-low" id="payload-1">
<td className="p-space-md" colSpan="7">
<div className="bg-inverse-surface text-inverse-on-surface rounded-xl p-space-md font-mono text-xs overflow-x-auto space-y-1">
<div className="text-tertiary-fixed font-bold">// SEC_AUDIT_FRAME #20241024-8841-A</div>
<div>&#123;</div>
<div className="pl-4">"event_id": "EVT_ROOT_REST_LOCK_7D_0091",</div>
<div className="pl-4">"actor_id": "ADM_ROOT_001", "actor_auth_method": "FIPS_YUBIKEY_HARDWARE_PIN",</div>
<div className="pl-4">"action": "MERCHANT_SUSPEND_LISTING",</div>
<div className="pl-4">"target_entity": &#123;"type": "MERCHANT", "id": "MC-HN-0068", "name": "Lẩu Cua Đồng 68"&#125;,</div>
<div className="pl-4">"reason": "VIOLATION_PRICING_GOUGING_REPORT_ID_8819",</div>
<div className="pl-4">"hashing_ledger": &#123;"algo": "SHA256", "merkle_root": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"&#125;,</div>
<div className="pl-4">"signature_valid": true, "timestamp_utc": "2024-10-24T07:32:15.819Z"</div>
<div>&#125;</div>
</div>
</td>
</tr>
{/*  Row 2: AI Sentinel Engine  */}
<tr className="bg-surface-container-lowest hover:bg-surface-container-low/70 transition-colors">
<td className="py-space-md px-space-md align-top whitespace-nowrap">
<div className="font-mono font-bold text-on-surface">14:15:02</div>
<div className="font-label-sm text-label-sm text-on-surface-variant">24/10/2024</div>
</td>
<td className="py-space-md px-space-md align-top">
<div className="flex items-center gap-2">
<div className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs">
<span className="material-symbols-outlined text-sm">smart_toy</span>
</div>
<div>
<div className="font-title-md text-title-md text-on-surface flex items-center gap-1">
                      AI Sentinel Engine
                      <span className="material-symbols-outlined text-xs text-secondary">verified</span>
</div>
<div className="font-label-sm text-label-sm text-secondary font-bold">Hệ Thống Tự Động</div>
</div>
</div>
</td>
<td className="py-space-md px-space-md align-top">
<div className="font-label-lg text-label-lg text-on-surface font-bold">Đóng băng 12 review nghi botnet</div>
<div className="text-on-surface-variant mt-0.5 line-clamp-1">Phát hiện tấn công dồn dập 1 sao cùng fingerprint GPU</div>
</td>
<td className="py-space-md px-space-md align-top">
<div className="font-title-md text-title-md text-on-surface">Nhà Hàng Dim Tu Tac</div>
<span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-surface-container font-mono text-label-sm text-on-surface-variant">MC-SG-0088</span>
</td>
<td className="py-space-md px-space-md align-top whitespace-nowrap">
<div className="font-mono text-on-surface font-semibold">Node Engine Cluster</div>
<div className="text-on-surface-variant font-label-sm text-label-sm">ap-southeast-1b</div>
</td>
<td className="py-space-md px-space-md align-top whitespace-nowrap">
<span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-xs">vpn_key</span>
                  System Signed
                </span>
<div className="font-mono text-xs text-on-surface-variant mt-1">#0x11a4...99fd</div>
</td>
<td className="py-space-md px-space-md align-top text-right whitespace-nowrap">
<button className="px-space-sm py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-all shadow-sm" onclick="togglePayload('payload-2')" type="button">
                  JSON Payload
                </button>
</td>
</tr>
<tr className="hidden bg-surface-container-low" id="payload-2">
<td className="p-space-md" colSpan="7">
<div className="bg-inverse-surface text-inverse-on-surface rounded-xl p-space-md font-mono text-xs overflow-x-auto space-y-1">
<div className="text-tertiary-fixed font-bold">// SEC_AUDIT_FRAME #20241024-8840-AI</div>
<div>&#123; "event": "ANOMALY_BOTNET_REVIEW_FROZEN", "merchant_id": "MC-SG-0088", "count": 12, "confidence": 0.994 &#125;</div>
</div>
</td>
</tr>
{/*  Row 3: Chief Accountant VAT Batch Export  */}
<tr className="bg-surface-container-lowest hover:bg-surface-container-low/70 transition-colors">
<td className="py-space-md px-space-md align-top whitespace-nowrap">
<div className="font-mono font-bold text-on-surface">13:48:40</div>
<div className="font-label-sm text-label-sm text-on-surface-variant">24/10/2024</div>
</td>
<td className="py-space-md px-space-md align-top">
<div className="flex items-center gap-2">
<div className="w-7 h-7 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold text-xs">
                    TH
                  </div>
<div>
<div className="font-title-md text-title-md text-on-surface">Trần Văn Hùng</div>
<div className="font-label-sm text-label-sm text-on-surface-variant font-bold">Kế Toán Trưởng</div>
</div>
</div>
</td>
<td className="py-space-md px-space-md align-top">
<div className="font-label-lg text-label-lg text-on-surface font-bold">Xuất lô 140 hóa đơn điện tử VAT</div>
<div className="text-on-surface-variant mt-0.5 line-clamp-1">Ký số truyền trực tiếp Cổng Thuế điện tử Tổng Cục Thuế</div>
</td>
<td className="py-space-md px-space-md align-top">
<div className="font-title-md text-title-md text-on-surface">Danh sách đợt 3/Tháng 10</div>
<span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-surface-container font-mono text-label-sm text-on-surface-variant">140 Quán F&amp;B</span>
</td>
<td className="py-space-md px-space-md align-top whitespace-nowrap">
<div className="font-mono text-on-surface font-semibold">14.161.22.4</div>
<div className="text-on-surface-variant font-label-sm text-label-sm">TP.HCM, VN</div>
</td>
<td className="py-space-md px-space-md align-top whitespace-nowrap">
<span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-xs">badge</span>
                  HSM Signed
                </span>
<div className="font-mono text-xs text-on-surface-variant mt-1">#0x7c3e...4411</div>
</td>
<td className="py-space-md px-space-md align-top text-right whitespace-nowrap">
<button className="px-space-sm py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-all shadow-sm" onclick="togglePayload('payload-3')" type="button">
                  JSON Payload
                </button>
</td>
</tr>
<tr className="hidden bg-surface-container-low" id="payload-3">
<td className="p-space-md" colSpan="7">
<div className="bg-inverse-surface text-inverse-on-surface rounded-xl p-space-md font-mono text-xs overflow-x-auto space-y-1">
<div className="text-tertiary-fixed font-bold">// SEC_AUDIT_FRAME #20241024-8839-VAT</div>
<div>&#123; "action": "TAX_INVOICE_TRANSMIT_CQT", "batch_size": 140, "hsm_serial": "VN-CA-HSM-88210" &#125;</div>
</div>
</td>
</tr>
{/*  Row 4: Regional Moderator KYC Approve  */}
<tr className="bg-surface-container-lowest hover:bg-surface-container-low/70 transition-colors">
<td className="py-space-md px-space-md align-top whitespace-nowrap">
<div className="font-mono font-bold text-on-surface">12:20:11</div>
<div className="font-label-sm text-label-sm text-on-surface-variant">24/10/2024</div>
</td>
<td className="py-space-md px-space-md align-top">
<div className="flex items-center gap-2">
<div className="w-7 h-7 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-xs">
                    PT
                  </div>
<div>
<div className="font-title-md text-title-md text-on-surface">Lê Phương Thảo</div>
<div className="font-label-sm text-label-sm text-on-surface-variant font-bold">Moderator Vùng 2</div>
</div>
</div>
</td>
<td className="py-space-md px-space-md align-top">
<div className="font-label-lg text-label-lg text-on-surface font-bold">Phê duyệt KYC &amp; Chứng nhận ATTP</div>
<div className="text-on-surface-variant mt-0.5 line-clamp-1">Xác minh giấy phép kinh doanh và điều kiện bảo quản thực phẩm</div>
</td>
<td className="py-space-md px-space-md align-top">
<div className="font-title-md text-title-md text-on-surface">Bún Bò O Mai</div>
<span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-surface-container font-mono text-label-sm text-on-surface-variant">MC-HN-0412</span>
</td>
<td className="py-space-md px-space-md align-top whitespace-nowrap">
<div className="font-mono text-on-surface font-semibold">171.244.18.9</div>
<div className="text-on-surface-variant font-label-sm text-label-sm">Đà Nẵng, VN</div>
</td>
<td className="py-space-md px-space-md align-top whitespace-nowrap">
<span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-xs">password</span>
                  2FA OTP OK
                </span>
<div className="font-mono text-xs text-on-surface-variant mt-1">#0x22c1...fe90</div>
</td>
<td className="py-space-md px-space-md align-top text-right whitespace-nowrap">
<button className="px-space-sm py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-all shadow-sm" onclick="togglePayload('payload-4')" type="button">
                  JSON Payload
                </button>
</td>
</tr>
<tr className="hidden bg-surface-container-low" id="payload-4">
<td className="p-space-md" colSpan="7">
<div className="bg-inverse-surface text-inverse-on-surface rounded-xl p-space-md font-mono text-xs overflow-x-auto space-y-1">
<div className="text-tertiary-fixed font-bold">// SEC_AUDIT_FRAME #20241024-8838-KYC</div>
<div>&#123; "action": "MERCHANT_KYC_VERIFIED", "target": "MC-HN-0412", "attp_cert": "ATTP-HN-2024-8812" &#125;</div>
</div>
</td>
</tr>
{/*  Row 5: Suspicious Tor Exit Node Blocked  */}
<tr className="bg-primary-fixed/20 hover:bg-primary-fixed/30 transition-colors">
<td className="py-space-md px-space-md align-top whitespace-nowrap">
<div className="font-mono font-bold text-primary">11:05:32</div>
<div className="font-label-sm text-label-sm text-on-surface-variant">24/10/2024</div>
</td>
<td className="py-space-md px-space-md align-top">
<div className="flex items-center gap-2">
<div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
<span className="material-symbols-outlined text-sm">dangerous</span>
</div>
<div>
<div className="font-title-md text-title-md text-primary font-bold">Unknown IP (Attack)</div>
<div className="font-label-sm text-label-sm text-primary">Tor Exit Node</div>
</div>
</div>
</td>
<td className="py-space-md px-space-md align-top">
<div className="font-label-lg text-label-lg text-primary font-bold">Thử brute-force mật mã Admin Portal</div>
<div className="text-primary mt-0.5 line-clamp-1 font-medium">Bị Cloudflare WAF &amp; SOC chặn sau 4 lần thử</div>
</td>
<td className="py-space-md px-space-md align-top">
<div className="font-title-md text-title-md text-on-surface">Endpoint /auth/v1/token</div>
<span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-primary-fixed text-primary font-mono text-label-sm font-bold">IP_BAN_PERMANENT</span>
</td>
<td className="py-space-md px-space-md align-top whitespace-nowrap">
<div className="font-mono text-primary font-bold">185.220.101.4</div>
<div className="text-on-surface-variant font-label-sm text-label-sm">Germany (Tor Relay)</div>
</td>
<td className="py-space-md px-space-md align-top whitespace-nowrap">
<span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-xs">block</span>
                  Blocked
                </span>
<div className="font-mono text-xs text-primary mt-1">#WAF_RULE_991</div>
</td>
<td className="py-space-md px-space-md align-top text-right whitespace-nowrap">
<button className="px-space-sm py-1.5 rounded-full bg-primary-fixed hover:bg-primary-container hover:text-on-primary text-on-primary-fixed-variant font-label-sm text-label-sm transition-all shadow-sm" onclick="togglePayload('payload-5')" type="button">
                  Threat Detail
                </button>
</td>
</tr>
<tr className="hidden bg-surface-container-low" id="payload-5">
<td className="p-space-md" colSpan="7">
<div className="bg-inverse-surface text-inverse-on-surface rounded-xl p-space-md font-mono text-xs overflow-x-auto space-y-1">
<div className="text-primary-fixed font-bold">// SOC_INCIDENT_REPORT #CRIT-20241024-001</div>
<div>&#123; "threat_type": "CREDENTIAL_STUFFING", "source_ip": "185.220.101.4", "asn": "AS208323", "reputation_score": -99, "action_taken": "DROP_CONNECTION_AND_FIREWALL_BLOCKLIST" &#125;</div>
</div>
</td>
</tr>
</tbody>
</table>
</div>
{/*  TABLE FOOTER & PAGINATION  */}
<div className="p-space-md bg-surface-container-lowest flex flex-col sm:flex-row items-center justify-between gap-space-sm">
<div className="font-body-sm text-body-sm text-on-surface-variant">
          Hiển thị <span className="font-bold text-on-surface">5</span> trên tổng số <span className="font-bold text-on-surface">184.250</span> bản ghi hôm nay
        </div>
<div className="flex items-center gap-space-xs">
<button className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors" type="button">
<span className="material-symbols-outlined text-sm">chevron_left</span>
</button>
<button className="w-8 h-8 rounded-full bg-primary-container text-on-primary font-bold text-xs" type="button">1</button>
<button className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-colors" type="button">2</button>
<button className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-colors" type="button">3</button>
<span className="px-1 text-on-surface-variant text-xs">...</span>
<button className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-colors" type="button">368</button>
<button className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors" type="button">
<span className="material-symbols-outlined text-sm">chevron_right</span>
</button>
</div>
</div>
</div>
{/*  RIGHT PANEL: IMMUTABILITY LEDGER & SIEM INTEGRATION (Right 3.5 Cols)  */}
<div className="2xl:col-span-3 space-y-space-lg">
{/*  Merkle Ledger Card  */}
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-tertiary text-xl">account_tree</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Merkle Tree Ledger</h3>
</div>
<span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">WORM Active</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
          Cơ chế ghi bất biến: không thể sửa đổi hoặc xóa các bản ghi lịch sử đã được kết khối.
        </p>
{/*  Visual Merkle Node Mini Diagram (SVG)  */}
<div className="p-space-md bg-surface-container-low rounded-xl">
<svg className="w-full h-28 text-on-surface" fill="none" viewBox="0 0 280 110" xmlns="http://www.w3.org/2000/svg">
{/*  Root node  */}
<rect fill="#2C694E" height="24" rx="6" width="100" x="90" y="5"></rect>
<text fill="#FFFFFF" font-family="Plus Jakarta Sans" font-size="9" font-weight="700" text-anchor="middle" x="140" y="21">ROOT HASH #9482</text>
{/*  Branch lines  */}
<path d="M120 29 L70 55 M160 29 L210 55" stroke="#906F69" strokeDasharray="2 2" strokeWidth="1.5"></path>
{/*  Level 1 nodes  */}
<rect fill="#FEEADC" height="20" rx="4" width="90" x="25" y="55"></rect>
<text fill="#231A11" font-family="Plus Jakarta Sans" font-size="8" font-weight="600" text-anchor="middle" x="70" y="69">Hash L1 (EVT_01..50)</text>
<rect fill="#FEEADC" height="20" rx="4" width="90" x="165" y="55"></rect>
<text fill="#231A11" font-family="Plus Jakarta Sans" font-size="8" font-weight="600" text-anchor="middle" x="210" y="69">Hash R1 (EVT_51..100)</text>
{/*  Level 2 branches  */}
<path d="M50 75 L35 90 M90 75 L105 90 M190 75 L175 90 M230 75 L245 90" stroke="#906F69" strokeWidth="1"></path>
{/*  Leaf dots  */}
<circle cx="35" cy="95" fill="#DE3618" r="4"></circle>
<circle cx="105" cy="95" fill="#2C694E" r="4"></circle>
<circle cx="175" cy="95" fill="#FD9013" r="4"></circle>
<circle cx="245" cy="95" fill="#2C694E" r="4"></circle>
</svg>
<div className="mt-2 text-center font-mono text-xs text-on-surface-variant truncate">
            Current Merkle Root: 0x9b1a8f9c2d770aef
          </div>
</div>
<div className="space-y-space-xs text-body-sm font-body-sm">
<div className="flex justify-between py-1 border-b border-surface-container">
<span className="text-on-surface-variant">Lần kiểm toán cuối:</span>
<span className="font-bold text-on-surface">3 phút trước</span>
</div>
<div className="flex justify-between py-1 border-b border-surface-container">
<span className="text-on-surface-variant">Chứng chỉ Hardware:</span>
<span className="font-bold text-tertiary">Yubico HSM 2 (FIPS)</span>
</div>
<div className="flex justify-between py-1">
<span className="text-on-surface-variant">Thời gian lưu trữ cam kết:</span>
<span className="font-bold text-on-surface">10 Năm (Pháp lý F&amp;B)</span>
</div>
</div>
</div>
{/*  SIEM & SOC Pipeline Status Card  */}
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-xl">hub</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Cổng Phân Phối SIEM</h3>
</div>
<span className="flex items-center gap-1 font-label-sm text-label-sm text-tertiary font-bold">
<span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
            Syncing
          </span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
          Dòng sự kiện được stream thời gian thực đến các trung tâm giám sát an ninh (SOC) độc lập.
        </p>
{/*  Pipeline list  */}
<div className="space-y-space-sm">
{/*  Item 1: Cloudflare Logpush  */}
<div className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-primary-container">cloud_sync</span>
<div>
<div className="font-title-md text-title-md text-on-surface">Cloudflare SIEM Logpush</div>
<div className="font-label-sm text-label-sm text-on-surface-variant">Latency: 120ms • 0 Lỗi đẩy</div>
</div>
</div>
<span className="material-symbols-outlined text-tertiary">check_circle</span>
</div>
{/*  Item 2: Elastic Security Cluster  */}
<div className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-secondary">database</span>
<div>
<div className="font-title-md text-title-md text-on-surface">Elastic SIEM Cluster</div>
<div className="font-label-sm text-label-sm text-on-surface-variant">Indexing: 2.4k docs/sec</div>
</div>
</div>
<span className="material-symbols-outlined text-tertiary">check_circle</span>
</div>
{/*  Item 3: AWS Security Hub (WORM S3)  */}
<div className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-tertiary">folder_zip</span>
<div>
<div className="font-title-md text-title-md text-on-surface">S3 Glacier Lock (WORM)</div>
<div className="font-label-sm text-label-sm text-on-surface-variant">Snapshot đóng gói 00:00 UTC</div>
</div>
</div>
<span className="material-symbols-outlined text-tertiary">check_circle</span>
</div>
</div>
<button className="w-full py-2.5 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high font-label-lg text-label-lg transition-all text-center" type="button">
          Kiểm Tra Kết Nối Endpoint SOC
        </button>
</div>
{/*  Quick SOC Contact Pill  */}
<div className="bg-surface-container-high rounded-xl p-space-md flex items-center gap-space-sm">
<span className="material-symbols-outlined text-primary-container text-2xl">support_agent</span>
<div>
<div className="font-title-md text-title-md text-on-surface">Kênh Khẩn SOC Lead 24/7</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Nội bộ hotline: <span className="font-bold text-primary font-mono">#SEC-911</span></div>
</div>
</div>
</div>
</div>
</div>
</main>
    </div>
  );
}
