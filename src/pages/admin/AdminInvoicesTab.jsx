import { useState } from "react";

/**
 * AdminInvoicesTab
 * Super Admin Screen: Đối Soát & Hóa Đơn VAT
 * Auto-generated from Google Stitch design with full length fidelity.
 */
export default function AdminInvoicesTab({ onNavigateTab }) {
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
{/*  PAGE HEADER & ACTION CONTROLS  */}
<section className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-md mb-space-lg">
<div className="flex flex-col gap-space-xs max-w-3xl">
<div className="flex items-center gap-space-sm">
<span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm uppercase tracking-wider">
<span className="w-2 h-2 rounded-full bg-secondary-container"></span>
          Tuân Thủ Nghị Định 123/2020/NĐ-CP &amp; TT 78/2021
        </span>
<span className="font-label-sm text-label-sm text-outline">|</span>
<span className="font-label-sm text-label-sm text-tertiary flex items-center gap-1 font-bold">
<span className="material-symbols-outlined text-sm">verified</span>
          Đồng bộ Cục Thuế 100%
        </span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
        Đối Soát Doanh Thu, Thuế &amp; Hóa Đơn Điện Tử VAT
      </h1>
<p className="font-body-md text-body-md text-on-surface-variant">
        Hệ thống quản lý đối soát dòng tiền dịch vụ quảng cáo, xuất hóa đơn VAT theo quy định Tổng Cục Thuế và đồng bộ cổng thanh toán liên ngân hàng
      </p>
</div>
{/*  Cycle Selector & Action CTAs  */}
<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm shrink-0">
{/*  Period Selector Pill Group  */}
<div className="inline-flex items-center p-1 rounded-full bg-surface-container-high shadow-sm">
<button className="px-space-md py-1.5 rounded-full bg-surface-container-lowest text-primary font-label-md text-label-md shadow-sm transition-all" type="button">
          Kỳ Tháng 10/2024 <span className="font-label-sm text-label-sm text-tertiary ml-1">(Hiện tại)</span>
</button>
<button className="px-space-sm py-1.5 rounded-full text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors" type="button">
          Tháng 09/2024 <span className="text-outline text-xs">(Đã chốt)</span>
</button>
<button className="px-space-sm py-1.5 rounded-full text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors" type="button">
          Tháng 08/2024
        </button>
</div>
{/*  Action Buttons  */}
<div className="flex items-center gap-space-xs">
<button className="inline-flex items-center gap-1.5 px-space-md py-2.5 rounded-full bg-primary-container text-on-primary-container font-label-lg text-label-lg shadow-[0_6px_16px_rgba(222,54,24,0.32)] hover:opacity-95 active:scale-[0.98] transition-all" type="button">
<span className="material-symbols-outlined text-base">bolt</span>
<span>Phát Hành Hóa Đơn Hàng Loạt</span>
</button>
<button className="inline-flex items-center gap-1 px-space-sm py-2.5 rounded-full bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors shadow-sm" type="button">
<span className="material-symbols-outlined text-lg text-secondary">file_download</span>
<span>Kê Khai Thuế</span>
</button>
<button className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high transition-colors shadow-sm" title="Cấu hình cổng E-Invoice" type="button">
<span className="material-symbols-outlined text-lg">settings_ethernet</span>
</button>
</div>
</div>
</section>
{/*  FINANCIAL RECONCILIATION SUMMARY (5 TACTILE CARDS)  */}
<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-space-md mb-space-xl">
{/*  Card 1: Tổng Doanh Số Dịch Vụ  */}
<div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-space-md shadow-[0_4px_14px_-2px_rgba(43,33,24,0.05)] flex flex-col justify-between group hover:shadow-md transition-all">
<div className="flex items-start justify-between">
<div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined">payments</span>
</div>
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm font-bold">
          +18.4% MoM
        </span>
</div>
<div className="mt-space-md">
<p className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Quyết Toán Dịch Vụ</p>
<p className="font-headline-md text-headline-md text-on-surface tracking-tight mt-0.5">286.450.000 <span className="text-label-md font-body-md text-outline">đ</span></p>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1 truncate">100% gói VIP &amp; Ads tài trợ</p>
</div>
<div className="mt-space-sm pt-space-xs border-t-0 flex items-center justify-between text-outline font-label-sm text-label-sm">
<span>Ghi nhận: 892 HĐ</span>
<span className="text-tertiary font-bold">Đối chiếu khớp</span>
</div>
</div>
{/*  Card 2: Thuế Giá Trị Gia Tăng (VAT)  */}
<div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-space-md shadow-[0_4px_14px_-2px_rgba(43,33,24,0.05)] flex flex-col justify-between group hover:shadow-md transition-all">
<div className="flex items-start justify-between">
<div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-secondary">
<span className="material-symbols-outlined">account_balance</span>
</div>
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm">
          VAT 8% / 10%
        </span>
</div>
<div className="mt-space-md">
<p className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Thuế VAT Tạm Tính</p>
<p className="font-headline-md text-headline-md text-secondary tracking-tight mt-0.5">22.916.000 <span className="text-label-md font-body-md text-outline">đ</span></p>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1 truncate">Đã trích xuất sổ khai điện tử</p>
</div>
<div className="mt-space-sm pt-space-xs flex items-center justify-between font-label-sm text-label-sm text-outline">
<span>Khấu trừ GTGT: 0 đ</span>
<span className="text-tertiary font-bold">Sẵn sàng kê khai</span>
</div>
</div>
{/*  Card 3: Số Lượng Hóa Đơn Đã Xuất  */}
<div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-space-md shadow-[0_4px_14px_-2px_rgba(43,33,24,0.05)] flex flex-col justify-between group hover:shadow-md transition-all">
<div className="flex items-start justify-between">
<div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined">receipt_long</span>
</div>
<div className="flex items-center gap-1 font-label-sm text-label-sm text-tertiary font-bold">
<span className="w-2 h-2 rounded-full bg-tertiary"></span> 92.4%
        </div>
</div>
<div className="mt-space-md">
<p className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Hóa Đơn Đã Cấp Mã</p>
<p className="font-headline-md text-headline-md text-on-surface tracking-tight mt-0.5">824 <span className="font-body-md text-outline">/ 892</span></p>
{/*  Mini Progress Bar  */}
<div className="w-full bg-surface-container h-1.5 rounded-full mt-2 overflow-hidden">
<div className="bg-tertiary h-full rounded-full" style={{ width: "92.4%" }}></div>
</div>
</div>
<div className="mt-space-sm pt-space-xs flex items-center justify-between font-label-sm text-label-sm text-outline">
<span>Còn lại: 68 HĐ</span>
<span className="text-secondary font-bold">Chờ ký số HSM</span>
</div>
</div>
{/*  Card 4: Chênh Lệch & Khiếu Nại (Disputes)  */}
<div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-space-md shadow-[0_4px_14px_-2px_rgba(43,33,24,0.05)] flex flex-col justify-between group hover:shadow-md transition-all">
<div className="flex items-start justify-between">
<div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-tertiary-container">
<span className="material-symbols-outlined">balance</span>
</div>
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm">
          0 Khiếu nại
        </span>
</div>
<div className="mt-space-md">
<p className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Chênh Lệch Đối Soát</p>
<p className="font-headline-md text-headline-md text-tertiary tracking-tight mt-0.5">0 <span className="text-label-md font-body-md text-outline">đ</span></p>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1 truncate">Trùng khớp phân phối Ads</p>
</div>
<div className="mt-space-sm pt-space-xs flex items-center justify-between font-label-sm text-label-sm text-outline">
<span>Lịch sử lỗi: 0</span>
<span className="text-tertiary font-bold">Độ chính xác 100%</span>
</div>
</div>
{/*  Card 5: Dòng Tiền Ròng Sau Thuế (Net Inflow)  */}
<div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-space-md shadow-[0_4px_14px_-2px_rgba(43,33,24,0.05)] flex flex-col justify-between group hover:shadow-md transition-all">
<div className="flex items-start justify-between">
<div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined">account_balance_wallet</span>
</div>
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm">
          Net Revenue
        </span>
</div>
<div className="mt-space-md">
<p className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Doanh Thu Ròng</p>
<p className="font-headline-md text-headline-md text-primary tracking-tight mt-0.5">263.534.000 <span className="text-label-md font-body-md text-outline">đ</span></p>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1 truncate">Đã loại trừ thuế đầu ra</p>
</div>
<div className="mt-space-sm pt-space-xs flex items-center justify-between font-label-sm text-label-sm text-outline">
<span>Ngân hàng: Techcombank</span>
<span className="text-primary font-bold">Đã thanh toán</span>
</div>
</div>
</section>
{/*  SEARCH FILTERS & TAX AUDIT CONTROLS  */}
<section className="bg-surface-container-lowest rounded-2xl p-space-md shadow-[0_4px_14px_-2px_rgba(43,33,24,0.05)] mb-space-lg flex flex-col gap-space-md">
<div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md">
{/*  Search Input Field  */}
<div className="relative flex-1">
<span className="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-primary text-xl">search</span>
<input className="w-full h-12 pl-12 pr-space-md rounded-full bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/25 transition-all" placeholder="Tìm theo Mã Số Thuế (MST), Tên công ty / hộ kinh doanh, Số hóa đơn (HD-2024-XXXX), Mã tra cứu CQT..." type="text"/>
</div>
{/*  Quick Filter Chips  */}
<div className="flex flex-wrap items-center gap-space-xs shrink-0">
{/*  Status Filters  */}
<button className="px-space-md py-2 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md shadow-sm" type="button">
          Tất cả (892)
        </button>
<button className="px-space-md py-2 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md transition-colors flex items-center gap-1.5" type="button">
<span className="w-2 h-2 rounded-full bg-tertiary"></span>
          Đã phát hành &amp; CQT cấp mã (824)
        </button>
<button className="px-space-md py-2 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md transition-colors flex items-center gap-1.5" type="button">
<span className="w-2 h-2 rounded-full bg-secondary-container"></span>
          Chờ ký HSM (68)
        </button>
<button className="px-space-md py-2 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md transition-colors flex items-center gap-1.5" type="button">
<span className="w-2 h-2 rounded-full bg-error"></span>
          Điều chỉnh / Hủy (0)
        </button>
</div>
</div>
{/*  Secondary Meta Filters  */}
<div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-sm border-t-0">
<div className="flex flex-wrap items-center gap-space-xs text-body-sm">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider mr-1">Hình thức pháp nhân:</span>
<button className="px-space-sm py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm">
          Tất cả hình thức
        </button>
<button className="px-space-sm py-1 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high font-label-sm text-label-sm">
          Doanh Nghiệp / Công Ty (412)
        </button>
<button className="px-space-sm py-1 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high font-label-sm text-label-sm">
          Hộ Kinh Doanh Cá Thể (480)
        </button>
</div>
<div className="flex items-center gap-space-sm font-label-sm text-label-sm text-on-surface-variant">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-xs text-tertiary">lock_clock</span>
          Ký số HSM tự động (15 giây/lô)
        </span>
<span className="text-outline">•</span>
<span className="text-primary font-bold cursor-pointer hover:underline">Tải Toàn Bộ XML (.zip)</span>
</div>
</div>
</section>
{/*  MAIN DATA TABLE & E-INVOICE LISTING  */}
<section className="bg-surface-container-lowest rounded-2xl shadow-[0_4px_14px_-2px_rgba(43,33,24,0.05)] overflow-hidden mb-space-xl">
<div className="px-space-md py-space-sm bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="font-title-md text-title-md text-on-surface">Danh Sách Hóa Đơn VAT Điện Tử (E-Invoices)</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm">Hiển thị 5 / 892 bản ghi</span>
</div>
<div className="flex items-center gap-space-xs">
<button className="p-1.5 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors" title="Làm mới dữ liệu">
<span className="material-symbols-outlined text-base">refresh</span>
</button>
<button className="p-1.5 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors" title="Xuất Excel đối soát">
<span className="material-symbols-outlined text-base">ios_share</span>
</button>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left">
<thead>
<tr className="bg-surface-container-low/50 text-outline font-label-sm text-label-sm uppercase tracking-wider">
<th className="py-space-sm px-space-md font-semibold">Số Hóa Đơn &amp; Ngày Ký</th>
<th className="py-space-sm px-space-md font-semibold">Đối Tác &amp; Pháp Nhân</th>
<th className="py-space-sm px-space-md font-semibold">Dịch Vụ Quyết Toán</th>
<th className="py-space-sm px-space-md font-semibold text-right">Doanh Số &amp; VAT</th>
<th className="py-space-sm px-space-md font-semibold text-center">Trạng Thái Thuế (CQT)</th>
<th className="py-space-sm px-space-md font-semibold text-right">Thao Tác Nghiệp Vụ</th>
</tr>
</thead>
<tbody className="divide-y-0 text-body-sm font-body-sm text-on-surface">
{/*  Row 1: Cty TNHH Ẩm Thực Cua Đồng  */}
<tr className="hover:bg-surface-container-low/40 transition-colors">
<td className="py-space-md px-space-md align-top">
<div className="flex items-start gap-space-xs">
<div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-primary">
<span className="material-symbols-outlined text-lg">qr_code_2</span>
</div>
<div>
<span className="font-title-md text-title-md text-primary font-bold hover:underline cursor-pointer block leading-tight">
                    HD-2024-10488
                  </span>
<span className="text-xs text-outline font-label-sm text-label-sm block mt-0.5">
                    10:45 • 15/10/2024
                  </span>
<span className="inline-block px-1.5 py-0.2 rounded bg-surface-container-high text-[10px] text-on-surface-variant font-mono">
                    Mẫu 1/001 - Ký hiệu 1C24TLL
                  </span>
</div>
</div>
</td>
<td className="py-space-md px-space-md align-top">
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface font-semibold">Cty TNHH Ẩm Thực Cua Đồng</span>
<span className="text-on-surface-variant text-body-sm">Quán: Cua Đồng Gia Truyền 1989</span>
<div className="flex items-center gap-1.5 mt-1">
<span className="px-1.5 py-0.5 rounded bg-surface-container text-xs font-mono font-bold text-on-surface">
                    MST: 0108924188
                  </span>
<span className="px-1.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed-variant text-[11px] font-bold">
                    Doanh Nghiệp
                  </span>
</div>
</div>
</td>
<td className="py-space-md px-space-md align-top">
<div className="flex flex-col">
<span className="font-body-md text-body-md font-semibold text-on-surface">Gói VIP Kim Cương 6 Tháng</span>
<span className="text-outline text-xs mt-0.5">Kỳ hạn: 15/10/2024 - 15/04/2025</span>
<div className="flex items-center gap-1 text-xs text-secondary mt-1">
<span className="material-symbols-outlined text-sm">local_fire_department</span>
<span>Top 1 Tìm Kiếm Ẩm Thực Bắc</span>
</div>
</div>
</td>
<td className="py-space-md px-space-md align-top text-right">
<div className="flex flex-col items-end">
<span className="font-title-md text-title-md font-bold text-on-surface">25.920.000 đ</span>
<div className="text-xs text-outline flex items-center gap-1 mt-0.5">
<span>Tiền hàng: 24.000.000 đ</span>
</div>
<div className="text-xs text-secondary font-semibold">
                  VAT (8%): +1.920.000 đ
                </div>
</div>
</td>
<td className="py-space-md px-space-md align-top text-center">
<div className="inline-flex flex-col items-center">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-sm">verified</span>
                  Đã Cấp Mã CQT
                </span>
<span className="text-[11px] font-mono text-outline mt-1">Mã: 24089123-VNPT</span>
<span className="text-[10px] text-tertiary mt-0.5">Email kế toán: Đã nhận</span>
</div>
</td>
<td className="py-space-md px-space-md align-top text-right">
<div className="flex items-center justify-end gap-1">
<button className="p-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-primary transition-colors" title="Xem PDF Hóa Đơn">
<span className="material-symbols-outlined text-lg">picture_as_pdf</span>
</button>
<button className="p-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors" title="Tải XML Hóa Đơn">
<span className="material-symbols-outlined text-lg">code</span>
</button>
<button className="p-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors" title="Gửi Lại Mail Chủ Quán">
<span className="material-symbols-outlined text-lg">forward_to_inbox</span>
</button>
</div>
</td>
</tr>
{/*  Row 2: Hộ Kinh Doanh Dim Tu Tac  */}
<tr className="hover:bg-surface-container-low/40 transition-colors bg-surface-container-lowest">
<td className="py-space-md px-space-md align-top">
<div className="flex items-start gap-space-xs">
<div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-primary">
<span className="material-symbols-outlined text-lg">qr_code_2</span>
</div>
<div>
<span className="font-title-md text-title-md text-primary font-bold hover:underline cursor-pointer block leading-tight">
                    HD-2024-10489
                  </span>
<span className="text-xs text-outline font-label-sm text-label-sm block mt-0.5">
                    11:12 • 15/10/2024
                  </span>
<span className="inline-block px-1.5 py-0.2 rounded bg-surface-container-high text-[10px] text-on-surface-variant font-mono">
                    Mẫu 1/001 - Ký hiệu 1C24TLL
                  </span>
</div>
</div>
</td>
<td className="py-space-md px-space-md align-top">
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface font-semibold">Hộ Kinh Doanh Dim Tu Tac</span>
<span className="text-on-surface-variant text-body-sm">Quán: Dim Tu Tac Saigon Center</span>
<div className="flex items-center gap-1.5 mt-1">
<span className="px-1.5 py-0.5 rounded bg-surface-container text-xs font-mono font-bold text-on-surface">
                    MST: 0317894211
                  </span>
<span className="px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed-variant text-[11px] font-bold">
                    Hộ Kinh Doanh
                  </span>
</div>
</div>
</td>
<td className="py-space-md px-space-md align-top">
<div className="flex flex-col">
<span className="font-body-md text-body-md font-semibold text-on-surface">Dịch Vụ Ghim Bản Đồ Q.1</span>
<span className="text-outline text-xs mt-0.5">Tọa độ: Bán kính 3.5km Trung tâm</span>
<div className="flex items-center gap-1 text-xs text-tertiary mt-1">
<span className="material-symbols-outlined text-sm">push_pin</span>
<span>Ghim định vị ẩm thực cao cấp</span>
</div>
</div>
</td>
<td className="py-space-md px-space-md align-top text-right">
<div className="flex flex-col items-end">
<span className="font-title-md text-title-md font-bold text-on-surface">19.440.000 đ</span>
<div className="text-xs text-outline flex items-center gap-1 mt-0.5">
<span>Tiền hàng: 18.000.000 đ</span>
</div>
<div className="text-xs text-secondary font-semibold">
                  VAT (8%): +1.440.000 đ
                </div>
</div>
</td>
<td className="py-space-md px-space-md align-top text-center">
<div className="inline-flex flex-col items-center">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-sm">verified</span>
                  Đã Cấp Mã CQT
                </span>
<span className="text-[11px] font-mono text-outline mt-1">Mã: 24089124-VNPT</span>
<span className="text-[10px] text-tertiary mt-0.5">Email kế toán: Đã nhận</span>
</div>
</td>
<td className="py-space-md px-space-md align-top text-right">
<div className="flex items-center justify-end gap-1">
<button className="p-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-primary transition-colors" title="Xem PDF Hóa Đơn">
<span className="material-symbols-outlined text-lg">picture_as_pdf</span>
</button>
<button className="p-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors" title="Tải XML Hóa Đơn">
<span className="material-symbols-outlined text-lg">code</span>
</button>
<button className="p-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors" title="Gửi Lại Mail Chủ Quán">
<span className="material-symbols-outlined text-lg">forward_to_inbox</span>
</button>
</div>
</td>
</tr>
{/*  Row 3: Hộ Kinh Doanh Bún Bò Huế O Mai (Đang ký số HSM)  */}
<tr className="hover:bg-surface-container-low/40 transition-colors bg-surface-container-low/20">
<td className="py-space-md px-space-md align-top">
<div className="flex items-start gap-space-xs">
<div className="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center shrink-0 text-on-secondary-fixed-variant animate-pulse">
<span className="material-symbols-outlined text-lg">lock_clock</span>
</div>
<div>
<span className="font-title-md text-title-md text-on-surface font-bold block leading-tight">
                    HD-2024-10490
                  </span>
<span className="text-xs text-outline font-label-sm text-label-sm block mt-0.5">
                    11:30 • 15/10/2024
                  </span>
<span className="inline-block px-1.5 py-0.2 rounded bg-surface-container-high text-[10px] text-on-surface-variant font-mono">
                    Khởi tạo tự động API
                  </span>
</div>
</div>
</td>
<td className="py-space-md px-space-md align-top">
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface font-semibold">Hộ Kinh Doanh Bún Bò Huế O Mai</span>
<span className="text-on-surface-variant text-body-sm">Quán: Bún Bò O Mai Đống Đa</span>
<div className="flex items-center gap-1.5 mt-1">
<span className="px-1.5 py-0.5 rounded bg-surface-container text-xs font-mono font-bold text-on-surface">
                    MST: 0109923412
                  </span>
<span className="px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed-variant text-[11px] font-bold">
                    Hộ Kinh Doanh
                  </span>
</div>
</div>
</td>
<td className="py-space-md px-space-md align-top">
<div className="flex flex-col">
<span className="font-body-md text-body-md font-semibold text-on-surface">Gói HotDrop Cao Điểm Trưa</span>
<span className="text-outline text-xs mt-0.5">Khung giờ: 11h00 - 13h30 hàng ngày</span>
<div className="flex items-center gap-1 text-xs text-primary mt-1">
<span className="material-symbols-outlined text-sm">flash_on</span>
<span>Đẩy thông báo thực khách gần quán</span>
</div>
</div>
</td>
<td className="py-space-md px-space-md align-top text-right">
<div className="flex flex-col items-end">
<span className="font-title-md text-title-md font-bold text-on-surface">8.640.000 đ</span>
<div className="text-xs text-outline flex items-center gap-1 mt-0.5">
<span>Tiền hàng: 8.000.000 đ</span>
</div>
<div className="text-xs text-secondary font-semibold">
                  VAT (8%): +640.000 đ
                </div>
</div>
</td>
<td className="py-space-md px-space-md align-top text-center">
<div className="inline-flex flex-col items-center">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold animate-pulse">
<span className="material-symbols-outlined text-sm">sync</span>
                  Đang Ký Số HSM
                </span>
<span className="text-[11px] text-outline mt-1">Hàng đợi: Vị trí #12</span>
<span className="text-[10px] text-secondary font-medium mt-0.5">Ước tính: ~30 giây</span>
</div>
</td>
<td className="py-space-md px-space-md align-top text-right">
<div className="flex items-center justify-end gap-1">
<button className="px-2.5 py-1 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm hover:opacity-90 transition-opacity">
                  Ký Ngay
                </button>
<button className="p-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors" title="Kiểm tra kết nối HSM">
<span className="material-symbols-outlined text-lg">vpn_key</span>
</button>
</div>
</td>
</tr>
{/*  Row 4: Cty CP Cà Phê Trứng Giảng  */}
<tr className="hover:bg-surface-container-low/40 transition-colors">
<td className="py-space-md px-space-md align-top">
<div className="flex items-start gap-space-xs">
<div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-primary">
<span className="material-symbols-outlined text-lg">qr_code_2</span>
</div>
<div>
<span className="font-title-md text-title-md text-primary font-bold hover:underline cursor-pointer block leading-tight">
                    HD-2024-10491
                  </span>
<span className="text-xs text-outline font-label-sm text-label-sm block mt-0.5">
                    11:45 • 15/10/2024
                  </span>
<span className="inline-block px-1.5 py-0.2 rounded bg-surface-container-high text-[10px] text-on-surface-variant font-mono">
                    Mẫu 1/001 - Ký hiệu 1C24TLL
                  </span>
</div>
</div>
</td>
<td className="py-space-md px-space-md align-top">
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface font-semibold">Cty CP Cà Phê Trứng Giảng</span>
<span className="text-on-surface-variant text-body-sm">Quán: Café Giảng Nguyễn Hữu Huân</span>
<div className="flex items-center gap-1.5 mt-1">
<span className="px-1.5 py-0.5 rounded bg-surface-container text-xs font-mono font-bold text-on-surface">
                    MST: 0107812903
                  </span>
<span className="px-1.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed-variant text-[11px] font-bold">
                    Doanh Nghiệp
                  </span>
</div>
</div>
</td>
<td className="py-space-md px-space-md align-top">
<div className="flex flex-col">
<span className="font-body-md text-body-md font-semibold text-on-surface">Gói Radar Pin Hoàn Kiếm</span>
<span className="text-outline text-xs mt-0.5">Định danh Di sản ẩm thực phố cổ</span>
<div className="flex items-center gap-1 text-xs text-secondary mt-1">
<span className="material-symbols-outlined text-sm">stars</span>
<span>Chứng nhận Top Di Sản Phố Cổ</span>
</div>
</div>
</td>
<td className="py-space-md px-space-md align-top text-right">
<div className="flex flex-col items-end">
<span className="font-title-md text-title-md font-bold text-on-surface">12.960.000 đ</span>
<div className="text-xs text-outline flex items-center gap-1 mt-0.5">
<span>Tiền hàng: 12.000.000 đ</span>
</div>
<div className="text-xs text-secondary font-semibold">
                  VAT (8%): +960.000 đ
                </div>
</div>
</td>
<td className="py-space-md px-space-md align-top text-center">
<div className="inline-flex flex-col items-center">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-sm">verified</span>
                  Đã Cấp Mã CQT
                </span>
<span className="text-[11px] font-mono text-outline mt-1">Mã: 24089125-VNPT</span>
<span className="text-[10px] text-tertiary mt-0.5">Email kế toán: Đã nhận</span>
</div>
</td>
<td className="py-space-md px-space-md align-top text-right">
<div className="flex items-center justify-end gap-1">
<button className="p-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-primary transition-colors" title="Xem PDF Hóa Đơn">
<span className="material-symbols-outlined text-lg">picture_as_pdf</span>
</button>
<button className="p-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors" title="Tải XML Hóa Đơn">
<span className="material-symbols-outlined text-lg">code</span>
</button>
<button className="p-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors" title="Gửi Lại Mail Chủ Quán">
<span className="material-symbols-outlined text-lg">forward_to_inbox</span>
</button>
</div>
</td>
</tr>
{/*  Row 5: Hộ Kinh Doanh Bếp Trưởng Hà Nội  */}
<tr className="hover:bg-surface-container-low/40 transition-colors">
<td className="py-space-md px-space-md align-top">
<div className="flex items-start gap-space-xs">
<div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-primary">
<span className="material-symbols-outlined text-lg">qr_code_2</span>
</div>
<div>
<span className="font-title-md text-title-md text-primary font-bold hover:underline cursor-pointer block leading-tight">
                    HD-2024-10492
                  </span>
<span className="text-xs text-outline font-label-sm text-label-sm block mt-0.5">
                    12:05 • 15/10/2024
                  </span>
<span className="inline-block px-1.5 py-0.2 rounded bg-surface-container-high text-[10px] text-on-surface-variant font-mono">
                    Mẫu 1/001 - Ký hiệu 1C24TLL
                  </span>
</div>
</div>
</td>
<td className="py-space-md px-space-md align-top">
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface font-semibold">Hộ Kinh Doanh Bếp Trưởng Hà Nội</span>
<span className="text-on-surface-variant text-body-sm">Quán: Bếp Trưởng Cơm Niêu</span>
<div className="flex items-center gap-1.5 mt-1">
<span className="px-1.5 py-0.5 rounded bg-surface-container text-xs font-mono font-bold text-on-surface">
                    MST: 0106721904
                  </span>
<span className="px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed-variant text-[11px] font-bold">
                    Hộ Kinh Doanh
                  </span>
</div>
</div>
</td>
<td className="py-space-md px-space-md align-top">
<div className="flex flex-col">
<span className="font-body-md text-body-md font-semibold text-on-surface">Gói VIP Kim Cương Tháng 10</span>
<span className="text-outline text-xs mt-0.5">Gói duy trì định kỳ 30 ngày</span>
<div className="flex items-center gap-1 text-xs text-tertiary mt-1">
<span className="material-symbols-outlined text-sm">bolt</span>
<span>Đã thanh toán qua Cổng Napas</span>
</div>
</div>
</td>
<td className="py-space-md px-space-md align-top text-right">
<div className="flex flex-col items-end">
<span className="font-title-md text-title-md font-bold text-on-surface">5.400.000 đ</span>
<div className="text-xs text-outline flex items-center gap-1 mt-0.5">
<span>Tiền hàng: 5.000.000 đ</span>
</div>
<div className="text-xs text-secondary font-semibold">
                  VAT (8%): +400.000 đ
                </div>
</div>
</td>
<td className="py-space-md px-space-md align-top text-center">
<div className="inline-flex flex-col items-center">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-sm">verified</span>
                  Đã Cấp Mã CQT
                </span>
<span className="text-[11px] font-mono text-outline mt-1">Mã: 24089126-VNPT</span>
<span className="text-[10px] text-tertiary mt-0.5">Email kế toán: Đã nhận</span>
</div>
</td>
<td className="py-space-md px-space-md align-top text-right">
<div className="flex items-center justify-end gap-1">
<button className="p-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-primary transition-colors" title="Xem PDF Hóa Đơn">
<span className="material-symbols-outlined text-lg">picture_as_pdf</span>
</button>
<button className="p-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors" title="Tải XML Hóa Đơn">
<span className="material-symbols-outlined text-lg">code</span>
</button>
<button className="p-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors" title="Gửi Lại Mail Chủ Quán">
<span className="material-symbols-outlined text-lg">forward_to_inbox</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
{/*  Table Pagination Footer  */}
<div className="px-space-md py-space-sm bg-surface-container-low/60 flex flex-col sm:flex-row items-center justify-between gap-space-sm">
<div className="text-body-sm text-on-surface-variant font-body-sm">
        Trang <span className="font-bold text-on-surface">1</span> trên <span className="font-bold text-on-surface">179</span> (Tổng 892 hóa đơn quyết toán)
      </div>
<div className="flex items-center gap-1">
<button className="px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md disabled:opacity-50" disabled="">
          Trước
        </button>
<button className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md font-bold flex items-center justify-center">
          1
        </button>
<button className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center justify-center">
          2
        </button>
<button className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center justify-center">
          3
        </button>
<span className="px-1 text-outline">...</span>
<button className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center justify-center">
          179
        </button>
<button className="px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md">
          Sau
        </button>
</div>
</div>
</section>
{/*  GATEWAY AUTOMATION & HSM DIGITAL SIGNATURE ARCHITECTURE  */}
<section className="grid grid-cols-1 lg:grid-cols-3 gap-space-md mb-space-lg">
{/*  Panel 1: Cổng E-Invoice Tích Hợp  */}
<div className="rounded-2xl bg-surface-container-lowest p-space-md shadow-[0_4px_14px_-2px_rgba(43,33,24,0.05)] flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-sm">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-xl">cloud_sync</span>
<span className="font-title-md text-title-md text-on-surface font-bold">Cổng E-Invoice VNPT / Viettel</span>
</div>
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm font-bold">
<span className="w-2 h-2 rounded-full bg-tertiary"></span> 120ms
          </span>
</div>
<p className="text-body-sm text-on-surface-variant font-body-sm mb-space-sm">
          Kênh truyền REST API bảo mật kết nối trực tiếp Cổng tiếp nhận Tổng Cục Thuế. Tự động đồng bộ biên lai, mã tra cứu CQT và mã QR chuẩn thông tư 78.
        </p>
<div className="space-y-space-xs bg-surface-container-low p-space-sm rounded-xl">
<div className="flex items-center justify-between text-xs">
<span className="text-outline">Đường truyền chính:</span>
<span className="font-bold text-on-surface font-mono">VNPT E-Invoice Gateway (Primary)</span>
</div>
<div className="flex items-center justify-between text-xs">
<span className="text-outline">Dự phòng nóng:</span>
<span className="font-bold text-on-surface font-mono">Viettel Sinvoice Cloud (Failover)</span>
</div>
<div className="flex items-center justify-between text-xs">
<span className="text-outline">Tỷ lệ thành công API:</span>
<span className="font-bold text-tertiary font-mono">99.98% (2.4 triệu request)</span>
</div>
</div>
</div>
<div className="mt-space-md pt-space-xs flex items-center justify-between">
<span className="text-xs text-outline font-label-sm text-label-sm">Ping kiểm tra: Vừa xong</span>
<button className="text-xs font-bold text-primary hover:underline flex items-center gap-1 font-label-sm text-label-sm">
<span className="material-symbols-outlined text-sm">troubleshoot</span>
          Kiểm Tra Kết Nối CQT
        </button>
</div>
</div>
{/*  Panel 2: Chứng Thư Số Doanh Nghiệp (HSM Cloud Key)  */}
<div className="rounded-2xl bg-surface-container-lowest p-space-md shadow-[0_4px_14px_-2px_rgba(43,33,24,0.05)] flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-sm">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-xl">key</span>
<span className="font-title-md text-title-md text-on-surface font-bold">Chữ Ký Số Doanh Nghiệp HSM</span>
</div>
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-bold">
            FIPS 140-2 Level 3
          </span>
</div>
<p className="text-body-sm text-on-surface-variant font-body-sm mb-space-sm">
          Chứng thư số công cộng cấp bởi Viettel-CA, lưu trữ trên mô-đun phần cứng bảo mật đám mây (HSM), cho phép ký đồng thời lên đến 500 hóa đơn/phút.
        </p>
<div className="space-y-space-xs bg-surface-container-low p-space-sm rounded-xl">
<div className="flex items-center justify-between text-xs">
<span className="text-outline">Đơn vị sở hữu:</span>
<span className="font-bold text-on-surface truncate max-w-[180px]">CTY CỔ PHẦN CÔNG NGHỆ LOCALEATS VIỆT NAM</span>
</div>
<div className="flex items-center justify-between text-xs">
<span className="text-outline">Thời hạn chứng thư:</span>
<span className="font-bold text-tertiary">Còn hiệu lực đến 12/2026</span>
</div>
<div className="flex items-center justify-between text-xs">
<span className="text-outline">Thuật toán băm:</span>
<span className="font-mono text-on-surface font-bold">SHA-256 with RSA 2048-bit</span>
</div>
</div>
</div>
<div className="mt-space-md pt-space-xs flex items-center justify-between">
<span className="text-xs text-outline font-label-sm text-label-sm">Lượt ký trong ngày: 824 HĐ</span>
<button className="text-xs font-bold text-primary hover:underline flex items-center gap-1 font-label-sm text-label-sm">
<span className="material-symbols-outlined text-sm">history</span>
          Nhật Ký Ký Số
        </button>
</div>
</div>
{/*  Panel 3: Quy Tắc Tự Động Hóa & Đối Soát Định Kỳ  */}
<div className="rounded-2xl bg-surface-container-lowest p-space-md shadow-[0_4px_14px_-2px_rgba(43,33,24,0.05)] flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-sm">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary text-xl">auto_mode</span>
<span className="font-title-md text-title-md text-on-surface font-bold">Quy Tắc Tự Động Hóa Kế Toán</span>
</div>
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm font-bold">
            Auto-Pilot ON
          </span>
</div>
<p className="text-body-sm text-on-surface-variant font-body-sm mb-space-sm">
          Thiết lập kích hoạt phát hành hóa đơn tự động và gửi email bản sao có mã tra cứu CQT ngay sau khi đối soát thành công.
        </p>
<div className="space-y-space-xs">
{/*  Toggle 1  */}
<div className="flex items-center justify-between p-2 rounded-xl bg-surface-container-low">
<div className="flex flex-col">
<span className="text-xs font-bold text-on-surface">Xuất HĐ tự động sau nạp tiền</span>
<span className="text-[11px] text-outline">Độ trễ an toàn: 15 phút sau giao dịch</span>
</div>
<div className="w-8 h-4 bg-tertiary rounded-full relative cursor-pointer">
<div className="w-3 h-3 bg-surface-container-lowest rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
</div>
</div>
{/*  Toggle 2  */}
<div className="flex items-center justify-between p-2 rounded-xl bg-surface-container-low">
<div className="flex flex-col">
<span className="text-xs font-bold text-on-surface">Tự động gửi PDF &amp; XML qua email</span>
<span className="text-[11px] text-outline">Đính kèm mã QR tra cứu CQT</span>
</div>
<div className="w-8 h-4 bg-tertiary rounded-full relative cursor-pointer">
<div className="w-3 h-3 bg-surface-container-lowest rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
</div>
</div>
</div>
</div>
<div className="mt-space-md pt-space-xs flex items-center justify-between">
<span className="text-xs text-outline font-label-sm text-label-sm">Đồng bộ ngân hàng: Realtime</span>
<button className="text-xs font-bold text-primary hover:underline flex items-center gap-1 font-label-sm text-label-sm">
<span className="material-symbols-outlined text-sm">tune</span>
          Cấu Hình Thuật Toán
        </button>
</div>
</div>
</section>
</div></main>
    </div>
  );
}
