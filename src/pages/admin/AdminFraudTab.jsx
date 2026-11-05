import { useState } from "react";

/**
 * AdminFraudTab
 * Super Admin Screen: Báo Cáo Gian Lận & An Toàn Cộng Đồng
 * Auto-generated from Google Stitch design with full length fidelity.
 */
export default function AdminFraudTab({ onNavigateTab }) {
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

<div className="px-3 sm:px-6 lg:px-8 py-6 flex flex-col gap-8 max-w-[1600px] mx-auto w-full">
<div className="relative overflow-hidden rounded-3xl bg-surface-container-low p-8 shadow-sm">
<div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
<div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
<div className="flex flex-col gap-2 max-w-3xl">
<div className="flex items-center gap-2.5">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm uppercase tracking-wider shadow-xs">
<span className="material-symbols-outlined text-sm">gavel</span>
              Trust &amp; Safety Division
            </span>
<span className="px-2.5 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
              Tỷ lệ tuân thủ pháp lý: 99.82%
            </span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-extrabold">
            Trung Tâm Xử Lý Báo Cáo Gian Lận &amp; An Toàn Cộng Đồng
          </h1>
<p className="font-body-md text-body-md text-on-surface-variant">
            Tiếp nhận và xử lý khiếu nại hai chiều giữa Thực khách và Chủ quán: tăng giá đột biến, review tống tiền, bão vote ảo, sai lệch vệ sinh an toàn thực phẩm.
          </p>
</div>
<div className="flex flex-wrap items-center gap-3">
<button className="px-4 py-2.5 rounded-full bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container shadow-xs flex items-center gap-2 transition-all">
<span className="material-symbols-outlined text-primary text-lg">download</span>
            Xuất biên bản đối soát pháp lý
          </button>
<button className="px-4 py-2.5 rounded-full bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container shadow-xs flex items-center gap-2 transition-all">
<span className="material-symbols-outlined text-secondary text-lg">tune</span>
            Cấu hình ngưỡng xử phạt tự động
          </button>
<button className="px-5 py-2.5 rounded-full bg-primary-container text-on-primary font-label-md text-label-md shadow-sm hover:scale-[0.99] flex items-center gap-2 transition-all">
<span className="material-symbols-outlined text-lg">forum</span>
            Mở phiên hòa giải trực tuyến
          </button>
</div>
</div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
<div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant">Khiếu nại tiếp nhận tuần này</span>
<span className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-xl">inbox</span>
</span>
</div>
<div className="mt-4 flex items-baseline gap-3">
<span className="font-display-lg text-display-lg text-on-surface font-extrabold leading-none">342</span>
<span className="font-label-md text-label-md text-tertiary font-bold flex items-center">
<span className="material-symbols-outlined text-sm">task_alt</span> 93.0%
          </span>
</div>
<div className="mt-2 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
<span>Đã xử lý dứt điểm: <strong className="text-on-surface font-semibold">318 vụ</strong></span>
<span className="text-primary font-semibold">24 đang mở</span>
</div>
</div>
<div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant">Thời gian phản hồi SLA</span>
<span className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined text-xl">timelapse</span>
</span>
</div>
<div className="mt-4 flex items-baseline gap-3">
<span className="font-display-lg text-display-lg text-on-surface font-extrabold leading-none">1.6h</span>
<span className="font-label-md text-label-md text-tertiary font-bold flex items-center">
<span className="material-symbols-outlined text-sm">trending_down</span> -46%
          </span>
</div>
<div className="mt-2 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
<span>Mục tiêu cam kết SLA: &lt; 3.0h</span>
<span className="text-tertiary font-semibold">Đạt chuẩn 99.4%</span>
</div>
</div>
<div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant">Quán bị xử phạt chặt chém</span>
<span className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined text-xl">store_mall_directory</span>
</span>
</div>
<div className="mt-4 flex items-baseline gap-3">
<span className="font-display-lg text-display-lg text-on-surface font-extrabold leading-none">18</span>
<span className="font-label-md text-label-md text-primary font-bold">Vi phạm giá</span>
</div>
<div className="mt-2 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
<span>Tạm đình chỉ hoặc tước VIP</span>
<span className="text-primary font-semibold">Tái thẩm định 14d</span>
</div>
</div>
<div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant">Thực khách bị khóa vĩnh viễn</span>
<span className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-error">
<span className="material-symbols-outlined text-xl">no_accounts</span>
</span>
</div>
<div className="mt-4 flex items-baseline gap-3">
<span className="font-display-lg text-display-lg text-on-surface font-extrabold leading-none">24</span>
<span className="font-label-md text-label-md text-error font-bold">Blacklist</span>
</div>
<div className="mt-2 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
<span>Khóa CCCD / IMEI thiết bị</span>
<span className="text-error font-semibold">Tống tiền 100%</span>
</div>
</div>
</div>
<div className="flex flex-col gap-4">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-xl">bubble_chart</span>
<h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Ma Trận Phân Loại Sự Vụ Gian Lận</h2>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant">Phân tích bằng AI Real-Time Fraud Engine</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
<div className="p-5 rounded-2xl bg-surface-container-low flex flex-col justify-between gap-4">
<div className="flex items-center justify-between">
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
<span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
              Khẩn Cấp Đỏ
            </span>
<span className="font-title-md text-title-md text-on-surface font-extrabold">12 vụ</span>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Chặt Chém &amp; Sai Giá</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Tính thêm phí phụ thu không niêm yết, ép giá du khách dịp lễ tết.</p>
</div>
<div className="flex items-center justify-between pt-3 text-on-surface-variant font-label-sm text-label-sm">
<span>Mức phạt: 2M - 20M VNĐ</span>
<span className="text-primary font-bold">Ưu tiên #1</span>
</div>
</div>
<div className="p-5 rounded-2xl bg-surface-container-low flex flex-col justify-between gap-4">
<div className="flex items-center justify-between">
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-container font-label-sm text-label-sm font-bold">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
              Mức Độ Cam
            </span>
<span className="font-title-md text-title-md text-on-surface font-extrabold">8 vụ</span>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Bão 1 Sao Bẩn Lân Cận</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Cụm IP cùng bán kính 500m liên tục dội đánh giá 1 sao triệt hạ uy tín quán kề cận.</p>
</div>
<div className="flex items-center justify-between pt-3 text-on-surface-variant font-label-sm text-label-sm">
<span>Lọc AI: Tạm ẩn bài viết</span>
<span className="text-secondary font-bold">Xác minh IP</span>
</div>
</div>
<div className="p-5 rounded-2xl bg-surface-container-low flex flex-col justify-between gap-4">
<div className="flex items-center justify-between">
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-bold">
<span className="w-2 h-2 rounded-full bg-secondary-container"></span>
              Mức Độ Vàng
            </span>
<span className="font-title-md text-title-md text-on-surface font-extrabold">15 vụ</span>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Seeding Review Ảo</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Bot farm tài khoản cấp 1 bình luận khen ảo nâng hạng sao TOP quán ăn ngon tuần.</p>
</div>
<div className="flex items-center justify-between pt-3 text-on-surface-variant font-label-sm text-label-sm">
<span>Hạ rank tự động</span>
<span className="text-on-surface font-bold">Quét tài khoản rác</span>
</div>
</div>
<div className="p-5 rounded-2xl bg-surface-container-low flex flex-col justify-between gap-4">
<div className="flex items-center justify-between">
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-bold">
<span className="w-2 h-2 rounded-full bg-tertiary"></span>
              Thông Tin Sai Lệch
            </span>
<span className="font-title-md text-title-md text-on-surface font-extrabold">22 vụ</span>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Sai Tọa Độ &amp; Đã Giải Thể</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Quán chuyển điểm hoặc phá sản nhưng vẫn giữ pin nhận đặt bàn gây thất vọng.</p>
</div>
<div className="flex items-center justify-between pt-3 text-on-surface-variant font-label-sm text-label-sm">
<span>Cập nhật GPS Live</span>
<span className="text-tertiary font-bold">Check Ambassador</span>
</div>
</div>
</div>
</div>
<div className="flex flex-col gap-4">
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Danh Sách Hồ Sơ Khiếu Nại Chi Tiết (Active Dossiers)</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Bằng chứng đối soát OCR hóa đơn, bản ghi Zalo/SMS và tọa độ GPS của người khiếu nại</p>
</div>
<div className="flex items-center gap-2">
<div className="flex bg-surface-container rounded-full p-1 text-xs">
<button className="px-3 py-1.5 rounded-full bg-surface-container-lowest font-label-sm text-label-sm font-bold text-on-surface shadow-xs">Tất cả (57)</button>
<button className="px-3 py-1.5 rounded-full font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface">Chờ xử phạt (12)</button>
<button className="px-3 py-1.5 rounded-full font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface">Đang đối chất (28)</button>
<button className="px-3 py-1.5 rounded-full font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface">Đã lưu trữ (17)</button>
</div>
</div>
</div>
<div className="flex flex-col gap-4">
<div className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm hover:shadow-md transition-all flex flex-col xl:flex-row gap-6">
<div className="w-full xl:w-72 shrink-0 flex flex-col gap-2">
<div className="relative h-44 rounded-xl overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover" data-alt="Clear high-resolution macro photograph of a dining paper receipt showing inflated prices and marked extra fees beside a hotpot broth table with warm golden ambient light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDo-zr_hvZDAJtbCYsOk3R6DwtASBaWTSHyPrye2AJfBr7vZzOKmOGCBUp8-pZ70shmeIODdtvoeKKfADokk-Wqc8a_SDT4cae_8Lg8ZWkKGNtHorCRZ_RIjdZ1T4VZ88ljJ5qrf25DzDa-ZBJGKUYRSPJriqiP56qiYsir7jDQfK3LaXcpZ7WPdVzPpIGqOUcEMmkYYx6miRul9TYA-7VQ4aL-KdmtzaQikd-LsKc"/>
<span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-bold">
                #FR-2024-8891
              </span>
<span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-surface/90 backdrop-blur-md text-on-surface font-label-sm text-[11px] font-semibold">
                Đối chiếu OCR 100% khớp
              </span>
</div>
<div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
<span>Thời gian: Hôm nay, 14:22</span>
<span className="text-primary font-bold">Cầu Giấy, Hà Nội</span>
</div>
</div>
<div className="flex-1 flex flex-col justify-between gap-3">
<div className="flex flex-col gap-1.5">
<div className="flex flex-wrap items-center justify-between gap-2">
<div className="flex items-center gap-2">
<h3 className="font-title-md text-title-md text-on-surface font-extrabold">Lẩu Bò 99 Cầu Giấy</h3>
<span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                    Gian lận giá niêm yết
                  </span>
</div>
<span className="px-3 py-1 rounded-full bg-error text-on-error font-label-sm text-label-sm font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-sm">verified_user</span> Đã xác thực vi phạm
                </span>
</div>
<p className="font-body-md text-body-md text-on-surface">
<strong>Nội dung:</strong> Thực khách phản ánh <em>"Menu niêm yết trên app 250.000đ nhưng thanh toán tại quầy bị tính 380.000đ và phụ thu 50.000đ dọn bàn không báo trước"</em>.
              </p>
<div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-on-surface-variant font-body-sm text-body-sm">
<div>
<strong>Bằng chứng:</strong> Ảnh hóa đơn giấy (380k + 50k phụ thu) đối chiếu tự động với database menu đã duyệt trên CMS. Sai lệch 180.000đ.
                </div>
<span className="text-primary font-bold shrink-0">Chênh lệch +52%</span>
</div>
</div>
<div className="flex flex-wrap items-center justify-between gap-4 pt-2">
<div className="flex items-center gap-2 text-on-surface font-label-sm text-label-sm">
<span className="material-symbols-outlined text-primary text-base">warning</span>
<span>Đề xuất: <strong>Trừ 5.000.000 VNĐ ký quỹ</strong> &amp; <strong>Tạm khóa hiển thị 7 ngày</strong></span>
</div>
<div className="flex items-center gap-2">
<button className="px-4 py-2 rounded-full bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-all">
                  Yêu cầu giải trình (24h)
                </button>
<button className="px-4 py-2 rounded-full bg-primary-container text-on-primary font-label-md text-label-md hover:scale-[0.99] shadow-xs flex items-center gap-1.5 transition-all">
<span className="material-symbols-outlined text-base">gavel</span>
                  Thi hành chế tài ngay
                </button>
</div>
</div>
</div>
</div>
<div className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm hover:shadow-md transition-all flex flex-col xl:flex-row gap-6">
<div className="w-full xl:w-72 shrink-0 flex flex-col gap-2">
<div className="relative h-44 rounded-xl overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover" data-alt="Screenshot proof of modern chat app showing blackmail messages demanding free premium restaurant table, illuminated by cool smartphone screen light against warm wooden tabletop" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcp-fV-D4F3mJPgM2DEmJFprrP1dhxcHeK-Q_8XtrL3wwnLmXblz27zdy_297U55cZvK49sRbAwBWv2kPyBGA1L8J6XajDjFyc4Y1ZrPsBTB4lhzkfcoOr35IIm8dji5bWQlXAVOA41tQMibsILtMs5D5AoWgX8BPA5EfQ-zm_n1-k0hht3U1rZbE2kASY7iELBc0Glv4LgWBLvJujELYOhYQN9dXhB3oxDK75u3s"/>
<span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary font-label-sm text-label-sm font-bold">
                #FR-2024-8892
              </span>
<span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-surface/90 backdrop-blur-md text-on-surface font-label-sm text-[11px] font-semibold">
                Đối chiếu User ID &amp; Device Hash
              </span>
</div>
<div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
<span>Thời gian: Hôm qua, 21:05</span>
<span className="text-tertiary font-bold">Quận 1, TP. HCM</span>
</div>
</div>
<div className="flex-1 flex flex-col justify-between gap-3">
<div className="flex flex-col gap-1.5">
<div className="flex flex-wrap items-center justify-between gap-2">
<div className="flex items-center gap-2">
<h3 className="font-title-md text-title-md text-on-surface font-extrabold">Nhà Hàng Dim Tu Tac</h3>
<span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-container font-label-sm text-label-sm font-bold">
                    Khách tống tiền chủ quán
                  </span>
</div>
<span className="px-3 py-1 rounded-full bg-tertiary text-on-tertiary font-label-sm text-label-sm font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-sm">shield</span> Đã bảo vệ quán thành công
                </span>
</div>
<p className="font-body-md text-body-md text-on-surface">
<strong>Nội dung:</strong> Chủ quán gửi khiếu nại kèm đoạn chat Zalo từ tài khoản <code>@HoangNamPro</code> đe dọa: <em>"Nếu không free bill bàn 6 người tối nay sẽ gọi hội nhóm dội 50 đánh giá 1 sao và bôi nhọ ATTP"</em>.
              </p>
<div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-on-surface-variant font-body-sm text-body-sm">
<div>
<strong>Biện pháp xử lý:</strong> Đã kích hoạt khiên chống bão vote 48h cho Dim Tu Tac. Khóa vĩnh viễn user, thêm số điện thoại &amp; CCCD vào Blacklist toàn hệ thống.
                </div>
<span className="text-tertiary font-bold shrink-0">Bảo vệ 100%</span>
</div>
</div>
<div className="flex flex-wrap items-center justify-between gap-4 pt-2">
<div className="flex items-center gap-2 text-on-surface font-label-sm text-label-sm">
<span className="material-symbols-outlined text-tertiary text-base">check_circle</span>
<span>Tài khoản vi phạm đã bị vô hiệu hóa &amp; đóng băng IP thiết bị</span>
</div>
<div className="flex items-center gap-2">
<button className="px-4 py-2 rounded-full bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-all">
                  Xem nhật ký chat
                </button>
<button className="px-4 py-2 rounded-full bg-tertiary text-on-tertiary font-label-md text-label-md hover:scale-[0.99] flex items-center gap-1.5 transition-all">
<span className="material-symbols-outlined text-base">lock</span>
                  Lưu hồ sơ tư pháp
                </button>
</div>
</div>
</div>
</div>
<div className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm hover:shadow-md transition-all flex flex-col xl:flex-row gap-6">
<div className="w-full xl:w-72 shrink-0 flex flex-col gap-2">
<div className="relative h-44 rounded-xl overflow-hidden bg-cover bg-center shadow-inner" data-location="Ho Chi Minh City, Vietnam" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80')" }}>
<span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-bold">
                #FR-2024-8893
              </span>
<span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-surface/90 backdrop-blur-md text-on-surface font-label-sm text-[11px] font-semibold">
                Thực địa GPS Foodie
              </span>
</div>
<div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
<span>Thời gian: 2 ngày trước</span>
<span className="text-secondary font-bold">Bình Thạnh, TP. HCM</span>
</div>
</div>
<div className="flex-1 flex flex-col justify-between gap-3">
<div className="flex flex-col gap-1.5">
<div className="flex flex-wrap items-center justify-between gap-2">
<div className="flex items-center gap-2">
<h3 className="font-title-md text-title-md text-on-surface font-extrabold">Cơm Tấm Đêm Sài Gòn</h3>
<span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm font-bold">
                    Giả mạo chuỗi thương hiệu
                  </span>
</div>
<span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-container font-label-sm text-label-sm font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-sm">directions_walk</span> Khảo sát thực địa
                </span>
</div>
<p className="font-body-md text-body-md text-on-surface">
<strong>Nội dung:</strong> Quán đăng ký lấy tên và hình ảnh nhận diện gần giống thương hiệu Cơm Tấm Ba Ghiền để đánh lừa khách nước ngoài tìm kiếm theo gợi ý AI Sommelier.
              </p>
<div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-on-surface-variant font-body-sm text-body-sm">
<div>
<strong>Bằng chứng:</strong> Báo cáo từ Foodie Ambassador địa phương gửi kèm ảnh mặt tiền thực tế không có giấy chứng nhận nhượng quyền.
                </div>
<span className="text-secondary font-bold shrink-0">Chờ xác minh thực địa</span>
</div>
</div>
<div className="flex flex-wrap items-center justify-between gap-4 pt-2">
<div className="flex items-center gap-2 text-on-surface font-label-sm text-label-sm">
<span className="material-symbols-outlined text-secondary text-base">pin_drop</span>
<span>Điều phối viên khu vực đã nhận task kiểm tra trực tiếp</span>
</div>
<div className="flex items-center gap-2">
<button className="px-4 py-2 rounded-full bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-all">
                  Yêu cầu nộp giấy ĐKKD
                </button>
<button className="px-4 py-2 rounded-full bg-surface-container-highest text-on-surface font-label-md text-label-md hover:bg-surface-container transition-all flex items-center gap-1.5">
<span className="material-symbols-outlined text-base">visibility_off</span>
                  Gỡ nhãn Đề Xuất
                </button>
</div>
</div>
</div>
</div>
<div className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm hover:shadow-md transition-all flex flex-col xl:flex-row gap-6">
<div className="w-full xl:w-72 shrink-0 flex flex-col gap-2">
<div className="relative h-44 rounded-xl overflow-hidden bg-surface-container flex items-center justify-center p-4">
<div className="w-full flex flex-col items-center justify-center gap-2">
<span className="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary">
<span className="material-symbols-outlined text-2xl">smart_toy</span>
</span>
<span className="font-label-md text-label-md text-on-surface font-bold">AI Sentinel Shield</span>
<span className="px-2 py-0.5 rounded bg-tertiary text-on-tertiary font-label-sm text-[11px] font-bold">Bồi hoàn tự động</span>
</div>
<span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-bold">
                #FR-2024-8894
              </span>
</div>
<div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
<span>Thời gian: 3 ngày trước</span>
<span className="text-tertiary font-bold">Hải Châu, Đà Nẵng</span>
</div>
</div>
<div className="flex-1 flex flex-col justify-between gap-3">
<div className="flex flex-col gap-1.5">
<div className="flex flex-wrap items-center justify-between gap-2">
<div className="flex items-center gap-2">
<h3 className="font-title-md text-title-md text-on-surface font-extrabold">Chiến Dịch QC Bún Chả Hà Nội Phố</h3>
<span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm font-bold">
                    Click tặc đối thủ (Ad Fraud)
                  </span>
</div>
<span className="px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary font-label-sm text-label-sm font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-sm">payments</span> Đã bồi hoàn 1.250.000đ
                </span>
</div>
<p className="font-body-md text-body-md text-on-surface">
<strong>Nội dung:</strong> Phát hiện 840 lượt click quảng cáo bất thường từ một dải proxy tĩnh bán kính 1km trong vòng 15 phút nhằm đốt cạn ngân sách chạy Ads ngày Chủ Nhật của quán.
              </p>
<div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-on-surface-variant font-body-sm text-body-sm">
<div>
<strong>Kết quả:</strong> Hệ thống AI Sentinel tự động lọc bỏ các click vô hiệu, bảo vệ CTR thực tế và hoàn trả toàn bộ ngân sách vào ví LocalEats Ads của đối tác.
                </div>
<span className="text-tertiary font-bold shrink-0">Không thiệt hại</span>
</div>
</div>
<div className="flex flex-wrap items-center justify-between gap-4 pt-2">
<div className="flex items-center gap-2 text-on-surface font-label-sm text-label-sm">
<span className="material-symbols-outlined text-tertiary text-base">verified</span>
<span>Đối tác đã gửi thư cảm ơn thông qua cổng tiếp nhận Merchant Support</span>
</div>
<div className="flex items-center gap-2">
<button className="px-4 py-2 rounded-full bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-all">
                  Xem phân tích Botnet
                </button>
<button className="px-4 py-2 rounded-full bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container transition-all flex items-center gap-1.5 shadow-xs">
<span className="material-symbols-outlined text-base">print</span>
                  Xuất log đối soát
                </button>
</div>
</div>
</div>
</div>
</div>
</div>
<div className="rounded-3xl bg-surface-container-low p-8 shadow-sm flex flex-col gap-6">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-2xl">admin_panel_settings</span>
<h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Bộ Công Cụ Chế Tài Của Super Admin (Root Enforcement Toolkit)</h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Các tác vụ cấp cao can thiệp trực tiếp vào tài khoản ngân hàng ký quỹ, tư cách pháp nhân và hệ thống voucher bồi hoàn
          </p>
</div>
<span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-sm">security</span> Root Privileges Active
        </span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
<div className="p-6 rounded-2xl bg-surface-container-lowest flex flex-col justify-between gap-4 shadow-xs">
<div className="flex flex-col gap-2">
<div className="w-12 h-12 rounded-2xl bg-error-container flex items-center justify-center text-error">
<span className="material-symbols-outlined text-2xl">account_balance</span>
</div>
<h3 className="font-title-md text-title-md text-on-surface font-extrabold">Đóng Băng Ký Quỹ Đối Tác</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
              Tạm khóa ví tiền mặt và số dư rút tiền của chủ quán bị cáo buộc lừa đảo có tổ chức hoặc tái phạm chặt chém quá 3 lần.
            </p>
</div>
<button className="w-full py-2.5 rounded-full bg-error text-on-error font-label-md text-label-md font-bold hover:scale-[0.99] flex items-center justify-center gap-2 transition-all">
<span className="material-symbols-outlined text-base">lock</span>
            Khóa Ngay Ký Quỹ
          </button>
</div>
<div className="p-6 rounded-2xl bg-surface-container-lowest flex flex-col justify-between gap-4 shadow-xs">
<div className="flex flex-col gap-2">
<div className="w-12 h-12 rounded-2xl bg-secondary-fixed flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-2xl">policy</span>
</div>
<h3 className="font-title-md text-title-md text-on-surface font-extrabold">Chuyển Hồ Sơ Quản Lý Thị Trường</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
              Tổng hợp biên bản điện tử, hình ảnh hiện trường và nhật ký giao dịch xuất gửi trực tiếp cơ quan ATTP &amp; Quản lý thị trường địa phương.
            </p>
</div>
<button className="w-full py-2.5 rounded-full bg-secondary-container text-on-secondary font-label-md text-label-md font-bold hover:scale-[0.99] flex items-center justify-center gap-2 transition-all">
<span className="material-symbols-outlined text-base">send_and_archive</span>
            Chuyển Giao Cơ Quan
          </button>
</div>
<div className="p-6 rounded-2xl bg-surface-container-lowest flex flex-col justify-between gap-4 shadow-xs">
<div className="flex flex-col gap-2">
<div className="w-12 h-12 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined text-2xl">loyalty</span>
</div>
<h3 className="font-title-md text-title-md text-on-surface font-extrabold">Bồi Thường &amp; Xin Lỗi Khách</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
              Tự động gửi thông báo xin lỗi chính thức từ nền tảng kèm Voucher bữa ăn ẩm thực 200k - 500k trích xuất từ quỹ bảo vệ thực khách.
            </p>
</div>
<button className="w-full py-2.5 rounded-full bg-tertiary text-on-tertiary font-label-md text-label-md font-bold hover:scale-[0.99] flex items-center justify-center gap-2 transition-all">
<span className="material-symbols-outlined text-base">redeem</span>
            Phát Voucher Bồi Thường
          </button>
</div>
</div>
</div>
</div>
</div></main>
    </div>
  );
}
