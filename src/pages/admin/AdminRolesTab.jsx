import { useState } from "react";

/**
 * AdminRolesTab
 * Super Admin Screen: Phân Quyền Vai Trò & RBAC Matrix
 * Auto-generated from Google Stitch design with full length fidelity.
 */
export default function AdminRolesTab({ onNavigateTab }) {
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
      <main className="relative pt-16 bg-surface min-h-screen px-space-lg py-space-lg"><div className="flex flex-col w-full gap-space-lg">
<section className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
<div className="space-y-space-xs max-w-4xl">
<div className="flex flex-wrap items-center gap-space-xs">
<span className="px-space-sm py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-1">
<span className="material-symbols-outlined text-xs">shield_person</span>
          ROLE-BASED ACCESS CONTROL (RBAC)
        </span>
<span className="px-space-sm py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
          Multi-Factor Auth Enforced
        </span>
<span className="px-space-sm py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-xs">lock_clock</span>
          Zero Trust Architecture
        </span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
        Quản Lý Phân Quyền Vai Trò &amp; Phân Cấp Nhân Sự Quản Trị
      </h1>
<p className="font-body-md text-body-md text-on-surface-variant">
        Thiết lập ma trận quyền hạn bảo mật chi tiết, quản lý danh sách cán bộ vận hành, kiểm duyệt viên vùng và cấp phát quyền theo nguyên tắc đặc quyền tối thiểu (Least Privilege).
      </p>
</div>
<div className="flex flex-wrap items-center gap-space-sm shrink-0">
<button className="px-space-md py-2.5 rounded-full bg-surface-container-high text-on-surface font-label-lg text-label-lg hover:bg-surface-variant transition-colors flex items-center gap-space-xs" type="button">
<span className="material-symbols-outlined text-lg">download</span>
<span>Xuất Ma Trận Quyền Hạn</span>
</button>
<button className="px-space-md py-2.5 rounded-full bg-surface-container-high text-on-surface font-label-lg text-label-lg hover:bg-surface-variant transition-colors flex items-center gap-space-xs" type="button">
<span className="material-symbols-outlined text-lg">tune</span>
<span>Cấu Hình Chính Sách &amp; 2FA</span>
</button>
<button className="px-space-lg py-2.5 rounded-full bg-primary-container text-on-primary-container font-label-lg text-label-lg shadow-md hover:opacity-95 transition-all flex items-center gap-space-xs" type="button">
<span className="material-symbols-outlined text-lg">person_add</span>
<span>Thêm Cán Bộ / Vai Trò</span>
</button>
</div>
</section>
<section className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-space-md">
<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden">
<div className="flex items-start justify-between">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Tổng Nhân Sự Quản Trị</span>
<div className="font-headline-lg text-headline-lg text-on-surface mt-1">42 Tài Khoản</div>
</div>
<div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-2xl">group_work</span>
</div>
</div>
<div className="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant">
<span className="font-body-sm text-body-sm">Hà Nội (20) • TP.HCM (16) • Đà Nẵng (6)</span>
<span className="font-label-sm text-label-sm text-tertiary font-bold flex items-center gap-0.5">
<span className="material-symbols-outlined text-xs">north_east</span>
          +3 tháng này
        </span>
</div>
</div>
<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div className="flex items-start justify-between">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Vai Trò Hệ Thống</span>
<div className="font-headline-lg text-headline-lg text-on-surface mt-1">5 Cấp Độ Vai Trò</div>
</div>
<div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
</div>
</div>
<div className="mt-space-md pt-space-sm flex items-center gap-1.5 flex-wrap">
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Root Super</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Lead Ops</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Content Mod</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Finance</span>
</div>
</div>
<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div className="flex items-start justify-between">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Tuân Thủ 2FA &amp; FIPS-140-3</span>
<div className="font-headline-lg text-headline-lg text-tertiary mt-1">100.0%</div>
</div>
<div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
<span className="material-symbols-outlined text-2xl">verified_user</span>
</div>
</div>
<div className="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant">
<span className="font-body-sm text-body-sm">42/42 kích hoạt Hardware Key/TOTP</span>
<span className="font-label-sm text-label-sm text-tertiary font-bold">Zero Bypass</span>
</div>
</div>
<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div className="flex items-start justify-between">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Phiên Đăng Nhập Hoạt Động</span>
<div className="font-headline-lg text-headline-lg text-on-surface mt-1">18 Phiên</div>
</div>
<div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined text-2xl">devices</span>
</div>
</div>
<div className="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant">
<span className="font-body-sm text-body-sm">Timeout 15 phút không hoạt động</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">Geo-Fenced</span>
</div>
</div>
</section>
<section className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-sm">
<div>
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary">table_chart</span>
<h2 className="font-headline-md text-headline-md text-on-surface">Ma Trận Quyền Hạn Vai Trò (RBAC Permission Matrix)</h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Phân rã phạm vi kiểm soát chi tiết giữa 5 nhóm thẩm quyền quản trị theo cấp bậc tài khoản</p>
</div>
<div className="flex items-center gap-space-sm">
<span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
<span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span> Có Quyền Đầy Đủ
        </span>
<span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
<span className="w-2.5 h-2.5 rounded-full bg-secondary-container"></span> Cần Lead Phê Duyệt
        </span>
<span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
<span className="w-2.5 h-2.5 rounded-full bg-error"></span> Khóa Cấm Quyền
        </span>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left">
<thead>
<tr className="bg-surface-container-low text-on-surface">
<th className="py-3 px-4 font-label-lg text-label-lg rounded-l-lg w-1/3">Nhóm Nghiệp Vụ &amp; Quyền Thao Tác Cụ Thể</th>
<th className="py-3 px-3 font-label-lg text-label-lg text-center">Root Super Admin</th>
<th className="py-3 px-3 font-label-lg text-label-lg text-center">Lead Ops Admin</th>
<th className="py-3 px-3 font-label-lg text-label-lg text-center">Content Moderator</th>
<th className="py-3 px-3 font-label-lg text-label-lg text-center">Finance Officer</th>
<th className="py-3 px-3 font-label-lg text-label-lg text-center rounded-r-lg">Support Agent</th>
</tr>
</thead>
<tbody className="divide-y-0 text-on-surface font-body-sm text-body-sm">
<tr className="bg-surface-container-high/40">
<td className="py-2.5 px-4 font-label-md text-label-md uppercase tracking-wider text-primary font-bold" colSpan="6">
              1. Quyền Dữ Liệu Vận Hành Quán (Merchants Ops)
            </td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3 px-4">
<div className="font-title-md text-title-md text-on-surface">Phê Duyệt Hồ Sơ KYC &amp; Giấy Phép ATTP</div>
<div className="text-on-surface-variant font-body-sm text-body-sm">Xác nhận tư cách đối tác quán ăn đăng ký mới</div>
</td>
<td className="text-center py-3"><span className="material-symbols-outlined text-tertiary">check_circle</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-tertiary">check_circle</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-secondary-container">pending</span></td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3 px-4">
<div className="font-title-md text-title-md text-on-surface">Khóa Quán Vi Phạm / Đình Chỉ Kinh Doanh</div>
<div className="text-on-surface-variant font-body-sm text-body-sm">Xử lý án phạt vi phạm vệ sinh, gian lận hóa đơn</div>
</td>
<td className="text-center py-3"><span className="material-symbols-outlined text-tertiary">check_circle</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-secondary-container">rule</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3 px-4">
<div className="font-title-md text-title-md text-on-surface">Sửa Menu Niêm Yết &amp; Can Thiệp Tọa Độ GPS</div>
<div className="text-on-surface-variant font-body-sm text-body-sm">Cập nhật tọa độ định vị quán và bảng giá chính thức</div>
</td>
<td className="text-center py-3"><span className="material-symbols-outlined text-tertiary">check_circle</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-tertiary">check_circle</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
</tr>
<tr className="bg-surface-container-high/40">
<td className="py-2.5 px-4 font-label-md text-label-md uppercase tracking-wider text-primary font-bold" colSpan="6">
              2. Quyền Tài Chính &amp; Thuế (Finance &amp; Billing)
            </td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3 px-4">
<div className="font-title-md text-title-md text-on-surface">Xuất Hóa Đơn Điện Tử VAT &amp; Bảng Kê Đối Soát</div>
<div className="text-on-surface-variant font-body-sm text-body-sm">Ký số điện tử phát hành hóa đơn đối tác nhà hàng</div>
</td>
<td className="text-center py-3"><span className="material-symbols-outlined text-tertiary">check_circle</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-tertiary">check_circle</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3 px-4">
<div className="font-title-md text-title-md text-on-surface">Cấu Hình Giá Gói VIP &amp; Bảng Tỷ Lệ Chiết Khấu Ads</div>
<div className="text-on-surface-variant font-body-sm text-body-sm">Thay đổi biểu giá vị trí quảng cáo nổi bật toàn quốc</div>
</td>
<td className="text-center py-3"><span className="material-symbols-outlined text-tertiary">check_circle</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-secondary-container">rule</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-secondary-container">rule</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
</tr>
<tr className="bg-surface-container-high/40">
<td className="py-2.5 px-4 font-label-md text-label-md uppercase tracking-wider text-primary font-bold" colSpan="6">
              3. Quyền Kiểm Duyệt Review &amp; AI Sentinel
            </td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3 px-4">
<div className="font-title-md text-title-md text-on-surface">Kích Hoạt Khiên Đóng Băng Bão Đánh Giá 1 Sao</div>
<div className="text-on-surface-variant font-body-sm text-body-sm">Tạm ngừng nhận review quán ăn nghi bị đối thủ dìm hàng</div>
</td>
<td className="text-center py-3"><span className="material-symbols-outlined text-tertiary">check_circle</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-tertiary">check_circle</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-tertiary">check_circle</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3 px-4">
<div className="font-title-md text-title-md text-on-surface">Cấp / Tước Huy Hiệu Foodie KOL &amp; Tier Thực Khách</div>
<div className="text-on-surface-variant font-body-sm text-body-sm">Đặc quyền cấp huy hiệu verified cho reviewer uy tín</div>
</td>
<td className="text-center py-3"><span className="material-symbols-outlined text-tertiary">check_circle</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-tertiary">check_circle</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-tertiary">check_circle</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
</tr>
<tr className="bg-surface-container-high/40">
<td className="py-2.5 px-4 font-label-md text-label-md uppercase tracking-wider text-primary font-bold" colSpan="6">
              4. Quyền Hạ Tầng Kỹ Thuật &amp; Cấu Hình Thuật Toán
            </td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3 px-4">
<div className="font-title-md text-title-md text-on-surface">Chuyển Mạch Node Định Tuyến &amp; Điều Phối Gateway</div>
<div className="text-on-surface-variant font-body-sm text-body-sm">Tác vụ can thiệp mạng lưới phân tải máy chủ vùng</div>
</td>
<td className="text-center py-3"><span className="material-symbols-outlined text-tertiary">check_circle</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3 px-4">
<div className="font-title-md text-title-md text-on-surface">Điều Chỉnh Trọng Số Thuật Toán AI Sommelier</div>
<div className="text-on-surface-variant font-body-sm text-body-sm">Cập nhật chỉ số đề xuất món theo khẩu vị địa phương</div>
</td>
<td className="text-center py-3"><span className="material-symbols-outlined text-tertiary">check_circle</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-secondary-container">rule</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
</tr>
<tr className="bg-surface-container-high/40">
<td className="py-2.5 px-4 font-label-md text-label-md uppercase tracking-wider text-primary font-bold" colSpan="6">
              5. Quyền Quản Trị Nhân Sự &amp; Security Audit Log
            </td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3 px-4">
<div className="font-title-md text-title-md text-on-surface">Xem Nhật Ký Giám Sát An Ninh (Audit Log WORM)</div>
<div className="text-on-surface-variant font-body-sm text-body-sm">Kiểm tra lịch sử truy cập chống chối bỏ không thể sửa đổi</div>
</td>
<td className="text-center py-3"><span className="material-symbols-outlined text-tertiary">check_circle</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-secondary-container">rule</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-secondary-container">rule</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
</tr>
<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="py-3 px-4">
<div className="font-title-md text-title-md text-on-surface">Cấp / Thu Hồi Vai Trò Quản Trị &amp; Reset Khóa 2FA</div>
<div className="text-on-surface-variant font-body-sm text-body-sm">Quyền tối cao về định danh tài khoản nhân viên</div>
</td>
<td className="text-center py-3"><span className="material-symbols-outlined text-tertiary">check_circle</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
<td className="text-center py-3"><span className="material-symbols-outlined text-error">cancel</span></td>
</tr>
</tbody>
</table>
</div>
</section>
<section className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
<div>
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary">manage_accounts</span>
<h2 className="font-headline-md text-headline-md text-on-surface">Danh Sách Cán Bộ Quản Trị Hệ Thống (Staff Directory)</h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">5 tài khoản nòng cốt phụ trách trực tiếp các phân hệ dịch vụ LOCALEATS</p>
</div>
<div className="flex items-center gap-space-sm">
<div className="relative">
<input className="h-10 pl-9 pr-4 rounded-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64" placeholder="Tìm kiếm cán bộ, email, ID..." type="text"/>
<span className="material-symbols-outlined absolute left-3 top-2.5 text-base text-on-surface-variant">search</span>
</div>
<button className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-on-surface" type="button">
<span className="material-symbols-outlined text-lg">filter_list</span>
</button>
</div>
</div>
<div className="space-y-space-sm">
<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col xl:flex-row xl:items-center justify-between gap-space-md hover:bg-surface-container transition-colors">
<div className="flex items-center gap-space-md">
<img className="w-12 h-12 rounded-full object-cover shadow-sm shrink-0" data-alt="Chân dung Root Super Admin Nguyễn Hoàng Nam, người đàn ông Việt Nam 35 tuổi phong thái chững chạc, áo sơ mi xanh thẫm, văn phòng công nghệ hiện đại ánh sáng ấm áp tự nhiên." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM7LVudpDLWUDZs8T5vJhjpoyOmvNn4koxu4WEnNhJdG0EZ14SkSOhcoS94h67nr00aabWpxstQyMa0GJNS0zG-QRhL8d7PUsyVsMTovNpSSASHhlySogAl873sxpJ0HdSSyZuhBtmOXPErRlff-RNpEy1WQpow-blX2atjj1FUfaSuuzkUcAlUZAQZUSNRv7bImFIoTRpWs-cf9mlebm7dOW3onAMKKI7qrvtfzM"/>
<div>
<div className="flex items-center gap-space-xs flex-wrap">
<span className="font-title-md text-title-md text-on-surface">Nguyễn Hoàng Nam</span>
<span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-bold">ROOT SUPER ADMIN (L0)</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Hà Nội HQ</span>
</div>
<div className="flex items-center gap-space-md mt-1 text-on-surface-variant font-body-sm text-body-sm flex-wrap">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">mail</span>nam.nguyen@localeats.vn</span>
<span className="flex items-center gap-1 text-tertiary font-bold"><span className="material-symbols-outlined text-sm">key</span>YubiKey 5C FIPS (Serial: #88204-VN)</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">router</span>IP: 14.162.180.12 (Văn phòng HQ)</span>
</div>
</div>
</div>
<div className="flex items-center gap-space-sm justify-between xl:justify-end">
<span className="px-space-sm py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            Đang Online (Phiên #4810)
          </span>
<div className="flex items-center gap-1">
<button className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors" title="Chỉnh sửa vai trò" type="button">
<span className="material-symbols-outlined text-base">edit</span>
</button>
<button className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:text-error transition-colors" title="Thu hồi phiên làm việc tức thì" type="button">
<span className="material-symbols-outlined text-base">phonelink_erase</span>
</button>
<button className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:text-secondary transition-colors" title="Đổi thiết bị xác thực 2FA" type="button">
<span className="material-symbols-outlined text-base">fingerprint</span>
</button>
</div>
</div>
</div>
<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col xl:flex-row xl:items-center justify-between gap-space-md hover:bg-surface-container transition-colors">
<div className="flex items-center gap-space-md">
<img className="w-12 h-12 rounded-full object-cover shadow-sm shrink-0" data-alt="Chân dung Phạm Mai Hương, Trưởng phòng tài chính công nghệ, nữ quản lý 32 tuổi thanh lịch đeo kính hiện đại, phong cách chuyên nghiệp sắc sảo văn phòng TP.HCM." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLptSf5eN7IgwW3B9NgCflf1YtzNqK9zE_7LoHR66JkXW_jMQcmj2BsNu8pLZLW3zHoXsNnhbJT5vdsGbnHQ8DqKOIW0j7YFZmxW5F4_wdJiCJluywwPBFGnQfpsk3cIiv7asMgmdKrhtAPabCh4ngPzJOprJAQT4D3keIVEDUZga77gjbAY5jEsQiRpfC5EifbsGOssiJd2ssSqFPgZY6AF8M-L5HYm-CroAQhgc"/>
<div>
<div className="flex items-center gap-space-xs flex-wrap">
<span className="font-title-md text-title-md text-on-surface">Phạm Mai Hương</span>
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-bold">FINANCE LEAD</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">TP.HCM Branch</span>
</div>
<div className="flex items-center gap-space-md mt-1 text-on-surface-variant font-body-sm text-body-sm flex-wrap">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">mail</span>huong.pm@localeats.vn</span>
<span className="flex items-center gap-1 text-tertiary font-bold"><span className="material-symbols-outlined text-sm">key</span>Cloud HSM + TOTP Authenticator</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">router</span>IP: 118.69.172.95 (Chi nhánh Q1)</span>
</div>
</div>
</div>
<div className="flex items-center gap-space-sm justify-between xl:justify-end">
<span className="px-space-sm py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-tertiary"></span>
            Đang Online (Phiên #4806)
          </span>
<div className="flex items-center gap-1">
<button className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors" title="Chỉnh sửa vai trò" type="button">
<span className="material-symbols-outlined text-base">edit</span>
</button>
<button className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:text-error transition-colors" title="Thu hồi phiên làm việc tức thì" type="button">
<span className="material-symbols-outlined text-base">phonelink_erase</span>
</button>
<button className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:text-secondary transition-colors" title="Đổi thiết bị xác thực 2FA" type="button">
<span className="material-symbols-outlined text-base">fingerprint</span>
</button>
</div>
</div>
</div>
<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col xl:flex-row xl:items-center justify-between gap-space-md hover:bg-surface-container transition-colors">
<div className="flex items-center gap-space-md">
<img className="w-12 h-12 rounded-full object-cover shadow-sm shrink-0" data-alt="Chân dung Lê Quốc Tuấn, Giám đốc vận hành đối tác ẩm thực, người nam 30 tuổi năng động tươi cười, trang phục smart casual ấm áp hiện đại tại Hà Nội." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCDfsLmbKnpAyOzZ_k3SUnjfsTOqJxrOPP4uc1rJgVkvK2G-EyW7sFtIvMMOKkCRUeP_FO85BmTJvzFjcRtHevnBIzeCzVYlocUe4TL2XJzV3IjxXEoejvGJPeXdw2fWemLjYf1GoR-7hMRa0jE2_6tA2dQp1h_KrSTZ-1DKMpIxkRF_LBKDy5VJhvfT9oCkDm1mVxjKzsksQrf4mAS4wUYAFS3wsoH8zdfPPb7hw"/>
<div>
<div className="flex items-center gap-space-xs flex-wrap">
<span className="font-title-md text-title-md text-on-surface">Lê Quốc Tuấn</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm font-bold">OPS &amp; MERCHANT MANAGER</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Hà Nội HQ</span>
</div>
<div className="flex items-center gap-space-md mt-1 text-on-surface-variant font-body-sm text-body-sm flex-wrap">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">mail</span>tuan.lq@localeats.vn</span>
<span className="flex items-center gap-1 text-on-surface-variant font-bold"><span className="material-symbols-outlined text-sm">key</span>TOTP Authenticator (Google 2FA)</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span>Đăng xuất 24 phút trước</span>
</div>
</div>
</div>
<div className="flex items-center gap-space-sm justify-between xl:justify-end">
<span className="px-space-sm py-1 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-outline"></span>
            Vừa Đăng Xuất (Offline)
          </span>
<div className="flex items-center gap-1">
<button className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors" title="Chỉnh sửa vai trò" type="button">
<span className="material-symbols-outlined text-base">edit</span>
</button>
<button className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:text-error transition-colors" title="Khóa tài khoản tạm thời" type="button">
<span className="material-symbols-outlined text-base">lock_clock</span>
</button>
<button className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:text-secondary transition-colors" title="Đổi thiết bị xác thực 2FA" type="button">
<span className="material-symbols-outlined text-base">fingerprint</span>
</button>
</div>
</div>
</div>
<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col xl:flex-row xl:items-center justify-between gap-space-md hover:bg-surface-container transition-colors">
<div className="flex items-center gap-space-md">
<img className="w-12 h-12 rounded-full object-cover shadow-sm shrink-0" data-alt="Chân dung Đỗ Minh Đức, Chuyên gia kỹ thuật kiểm duyệt trí tuệ nhân tạo, nam thanh niên 28 tuổi đeo tai nghe công nghệ cao tại văn phòng công viên phần mềm Đà Nẵng." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcEFi8Rqrn6k9sAIEncZKJPMZLVOsBYnoDMbwyvfJUORr63dUlW67Ofk4ioWW22jQlOF0sarQbLPr8a4_cGuV2sUikWzXF93IoinU7YLYZBxhAE4QIrYPrX94ZQEigbnP1QES4JNxwoIPrUXbXtEvwGUwZrYiCoovwwlvg4v5wApjNXLk9w4yj9JGa1NzVrAuzFSlsLrHlVAyeKk3Feid-sn01ABhxTqm3_l9ndG0"/>
<div>
<div className="flex items-center gap-space-xs flex-wrap">
<span className="font-title-md text-title-md text-on-surface">Đỗ Minh Đức</span>
<span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">AI SENTINEL CHIEF MODERATOR</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Đà Nẵng Ops Hub</span>
</div>
<div className="flex items-center gap-space-md mt-1 text-on-surface-variant font-body-sm text-body-sm flex-wrap">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">mail</span>duc.dm@localeats.vn</span>
<span className="flex items-center gap-1 text-tertiary font-bold"><span className="material-symbols-outlined text-sm">key</span>YubiKey Bio (Vân tay Hardware)</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">router</span>IP: 42.119.141.22 (Đà Nẵng VPN)</span>
</div>
</div>
</div>
<div className="flex items-center gap-space-sm justify-between xl:justify-end">
<span className="px-space-sm py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            Đang Online (Phiên #4812)
          </span>
<div className="flex items-center gap-1">
<button className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors" title="Chỉnh sửa vai trò" type="button">
<span className="material-symbols-outlined text-base">edit</span>
</button>
<button className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:text-error transition-colors" title="Thu hồi phiên làm việc tức thì" type="button">
<span className="material-symbols-outlined text-base">phonelink_erase</span>
</button>
<button className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:text-secondary transition-colors" title="Đổi thiết bị xác thực 2FA" type="button">
<span className="material-symbols-outlined text-base">fingerprint</span>
</button>
</div>
</div>
</div>
<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col xl:flex-row xl:items-center justify-between gap-space-md hover:bg-surface-container transition-colors">
<div className="flex items-center gap-space-md">
<img className="w-12 h-12 rounded-full object-cover shadow-sm shrink-0" data-alt="Chân dung Hoàng Thu Thảo, Điều phối viên cộng đồng ẩm thực, nữ chuyên viên 26 tuổi trẻ trung nhiệt huyết, không gian làm việc mở sáng sủa năng động TP.HCM." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBw4vbjMt271cEqYVS6XdnlE_4Pn-nrbNinlQrYJ95UQEL7GsasLZWDo8L7R5kM_KGBM1Eekj95i_5YSN40wOD32rtc-2MpplCF9992-5JRxpS4F8FeXExv2k_rxUSN4Yi3MFIQYoCCeklCi6f2qHvZNdPWZL3DGsZ4lYQ8qi02L6OIKd44slwbhd8PJ8_rrUrEeZOUpr97kUmDl07R3Wp1t-z5q8MLVrSMJGrjR0U"/>
<div>
<div className="flex items-center gap-space-xs flex-wrap">
<span className="font-title-md text-title-md text-on-surface">Hoàng Thu Thảo</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm font-bold">COMMUNITY &amp; REVIEW MODERATOR</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">TP.HCM Branch</span>
</div>
<div className="flex items-center gap-space-md mt-1 text-on-surface-variant font-body-sm text-body-sm flex-wrap">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">mail</span>thao.ht@localeats.vn</span>
<span className="flex items-center gap-1 text-secondary font-bold"><span className="material-symbols-outlined text-sm">key</span>SMS OTP + Hardware Token Key</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">router</span>IP: 118.69.172.95 (Chi nhánh Q1)</span>
</div>
</div>
</div>
<div className="flex items-center gap-space-sm justify-between xl:justify-end">
<span className="px-space-sm py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-tertiary"></span>
            Đang Online (Phiên #4799)
          </span>
<div className="flex items-center gap-1">
<button className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors" title="Chỉnh sửa vai trò" type="button">
<span className="material-symbols-outlined text-base">edit</span>
</button>
<button className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:text-error transition-colors" title="Thu hồi phiên làm việc tức thì" type="button">
<span className="material-symbols-outlined text-base">phonelink_erase</span>
</button>
<button className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:text-secondary transition-colors" title="Đổi thiết bị xác thực 2FA" type="button">
<span className="material-symbols-outlined text-base">fingerprint</span>
</button>
</div>
</div>
</div>
</div>
</section>
<section className="grid grid-cols-1 lg:grid-cols-2 gap-space-md">
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
<div className="space-y-space-sm">
<div className="flex items-center gap-space-xs text-primary">
<span className="material-symbols-outlined">security_update_good</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Chính Sách Thao Tác Nhạy Cảm (Step-Up Hardware Auth)</h3>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
          Yêu cầu cắm lại khóa cứng YubiKey hoặc quét vân tay vật lý FIPS Level 3 đối với các hành động rủi ro cao để triệt tiêu nguy cơ chiếm đoạt phiên (Session Hijacking).
        </p>
<div className="space-y-space-xs pt-2">
<div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-tertiary text-sm">verified</span>
<span className="font-body-sm text-body-sm text-on-surface">Thao tác tài chính xuất hóa đơn VAT &amp; chi trả &gt; 50.000.000đ</span>
</div>
<span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">Bắt Buộc Cấp 1</span>
</div>
<div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-sm">verified</span>
<span className="font-body-sm text-body-sm text-on-surface">Xóa vĩnh viễn dữ liệu quán đối tác hoặc ban tài khoản vĩnh viễn</span>
</div>
<span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm">Dual Admin Sign-off</span>
</div>
<div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-sm">verified</span>
<span className="font-body-sm text-body-sm text-on-surface">Chỉnh sửa trọng số thuật toán Sommelier trên production</span>
</div>
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm">Root Pin Required</span>
</div>
</div>
</div>
<div className="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
<span>Thời gian hiệu lực xác thực bổ sung: <strong>5 phút</strong></span>
<button className="text-primary font-label-md text-label-md hover:underline" type="button">Chỉnh sửa chính sách</button>
</div>
</div>
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
<div className="space-y-space-sm">
<div className="flex items-center gap-space-xs text-secondary">
<span className="material-symbols-outlined">lan</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Giới Hạn Địa Chỉ Mạng (IP Whitelist Office VPN)</h3>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
          Hệ thống Zero Trust chỉ chấp thuận đăng nhập tài khoản quản trị khi yêu cầu xuất phát từ các dải IP tĩnh đã định danh hoặc đường truyền WireGuard VPN nội bộ.
        </p>
<div className="space-y-space-xs pt-2">
<div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
<div>
<div className="font-label-md text-label-md text-on-surface">Trụ sở Hà Nội (Cầu Giấy Tech Hub)</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Dải IP: 14.162.180.0/27 (FPT Fiber Dedicated)</div>
</div>
<span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">Active • Primary</span>
</div>
<div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
<div>
<div className="font-label-md text-label-md text-on-surface">Chi nhánh TP.HCM (Quận 1 Ops Center)</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Dải IP: 118.69.172.0/28 (Viettel Leased Line)</div>
</div>
<span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">Active • Standby</span>
</div>
<div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
<div>
<div className="font-label-md text-label-md text-on-surface">Văn phòng Đà Nẵng (Hải Châu Regional)</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Dải IP: 42.119.141.0/28 (VNPT Business Secure)</div>
</div>
<span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">Active • WireGuard</span>
</div>
</div>
</div>
<div className="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
<span>Chế độ tự ngắt kết nối khi lệch Geolocation: <strong>BẬT</strong></span>
<button className="text-primary font-label-md text-label-md hover:underline" type="button">Thêm CIDR Subnet</button>
</div>
</div>
</section>
</div>
</main>
    </div>
  );
}
