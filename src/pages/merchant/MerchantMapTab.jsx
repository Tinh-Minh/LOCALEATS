import { useState } from "react";

export default function MerchantMapTab({ currentPlace }) {
  const [toastMessage, setToastMessage] = useState(null);
  const [beaconActive, setBeaconActive] = useState(false);

  const showToast = (msg, type = "success") => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const [inboundDiners, setInboundDiners] = useState([
    {
      id: "8492",
      initials: "TL",
      tier: "Khách quen VIP Vàng",
      vehicle: "Đi bộ",
      vehicleIcon: "directions_walk",
      vehicleColor: "bg-[#FFDAD3] text-[#DE3618]",
      location: "Ngã 3 Hàng Bạc - Tạ Hiện",
      distance: "Còn ~180m",
      eta: "Dự kiến tới: 2 phút",
      party: "4 người lớn",
      table: "Đã giữ Bàn 12 (Tầng 2)",
      tableClass: "bg-[#B1F0CE] text-[#002114]",
      actionLabel: "Bật đèn bàn đón",
    },
    {
      id: "2910",
      initials: "VN",
      tier: "Lần đầu tới quán",
      vehicle: "Xe máy",
      vehicleIcon: "two_wheeler",
      vehicleColor: "bg-[#FFDCC2] text-[#8F4E00]",
      location: "Cầu Chương Dương xuống Trần Nhật Duật",
      distance: "Còn ~1.2 km",
      eta: "Dự kiến tới: 5 phút",
      party: "2 người",
      table: "Chưa xếp bàn",
      tableClass: "bg-[#FFF1E8] text-[#5C403A]",
      actionLabel: "Giữ bàn chờ khách",
    },
    {
      id: "5501",
      initials: "MK",
      tier: "Khách du lịch quốc tế",
      vehicle: "Taxi Grab",
      vehicleIcon: "local_taxi",
      vehicleColor: "bg-[#B1F0CE] text-[#2C694E]",
      location: "Khách sạn Daewoo (Kim Mã)",
      distance: "Còn ~4.3 km",
      eta: "Dự kiến tới: 14 phút",
      party: "6 người lớn + 1 trẻ em",
      table: "Đã giữ Phòng VIP Bông Sen",
      tableClass: "bg-[#B1F0CE] text-[#002114]",
      actionLabel: "Sẵn sàng đón xe",
    },
    {
      id: "6124",
      initials: "HA",
      tier: "Khách dùng bữa tối",
      vehicle: "Đi bộ",
      vehicleIcon: "directions_walk",
      vehicleColor: "bg-[#FFDAD3] text-[#DE3618]",
      location: "Nhà Thờ Lớn Hà Nội",
      distance: "Còn ~650m",
      eta: "Dự kiến tới: 8 phút",
      party: "3 người",
      table: "Đã giữ Bàn 04 (Tầng 1)",
      tableClass: "bg-[#B1F0CE] text-[#002114]",
      actionLabel: "Gửi chỉ đường chi tiết",
    },
  ]);

  const copyDirections = () => {
    const text = `Chỉ đường đến ${currentPlace?.name || "Bếp Trưởng Hà Nội"}: Số 38B Phố Mã Mây, Hoàn Kiếm, Hà Nội (cách ngã tư Tạ Hiện 150m). Có bảo vệ dắt xe miễn phí. Hotline đón tiếp: 0982.38.38.38`;
    navigator.clipboard?.writeText(text);
    showToast("Đã sao chép hướng dẫn di chuyển vào Clipboard!");
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl font-bold text-xs bg-[#2C694E] text-white animate-bounce">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span>{toastMessage.msg}</span>
        </div>
      )}

      {/* Top Identity & GPS Header Strip */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#F2DFD1] relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#DE3618]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col gap-2 z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B1F0CE] text-[#002114] text-xs font-bold uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#2C694E] animate-ping" />
              Ghim GPS Chuẩn Xác 100%
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FEEADC] text-[#5C403A] text-xs font-semibold">
              <span className="material-symbols-outlined text-sm text-[#2C694E]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              Đã đồng bộ Google Maps &amp; LOCALEATS
            </span>
          </div>

          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#231A11] tracking-tight">
            Bản đồ &amp; Lộ trình đón khách
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#5C403A]">
            <span className="inline-flex items-center gap-1.5 font-bold text-sm text-[#231A11]">
              <span className="material-symbols-outlined text-[#DE3618] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                location_on
              </span>
              {currentPlace?.address || "38B Phố Mã Mây, P. Hàng Buồm, Hoàn Kiếm, Hà Nội"}
            </span>
            <span className="text-[#F2DFD1] font-bold">|</span>
            <span className="font-mono text-xs text-[#DE3618] font-bold bg-[#FFF1E8] px-2.5 py-0.5 rounded-lg border border-[#F2DFD1]">
              21.0368° N, 105.8524° E
            </span>
          </div>
        </div>

        {/* Quick Action Controls */}
        <div className="flex flex-wrap items-center gap-3 z-10 shrink-0">
          <button
            type="button"
            onClick={() => showToast("Đang làm mới tọa độ vi sai GPS vi sai độ trễ 0.2m...")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FFF8F5] text-[#231A11] hover:bg-[#F8E5D6] text-xs font-bold shadow-sm border border-[#F2DFD1] transition-all"
          >
            <span className="material-symbols-outlined text-base">my_location</span>
            Hiệu chỉnh tọa độ
          </button>
          <button
            type="button"
            onClick={() => {
              setBeaconActive(!beaconActive);
              showToast(
                !beaconActive
                  ? "Đã kích hoạt Chế độ Siêu tiếp cận (Super Beacon)! Đang phát sóng 3.5km."
                  : "Đã tắt chế độ Super Beacon."
              );
            }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold shadow-md transition-all ${
              beaconActive
                ? "bg-[#2C694E] text-white shadow-[#2C694E]/25 animate-pulse"
                : "bg-[#DE3618] hover:bg-[#B91D00] text-white shadow-[#DE3618]/25"
            }`}
          >
            <span className="material-symbols-outlined text-base">sensors</span>
            {beaconActive ? "Beacon Đang Phát Sóng" : "Phát Beacon Đón Khách"}
          </button>
        </div>
      </div>

      {/* Coverage Radar & Catchment Radii (3 Metas) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* 1km Catchment */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#F2DFD1] flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-[#5C403A] uppercase tracking-wider">
                Bán kính Đi bộ 1km
              </span>
              <span className="text-lg font-bold text-[#231A11]">Hồ Gươm &amp; Phố Cổ</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#FFDAD3] flex items-center justify-center text-[#DE3618] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">directions_walk</span>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#5C403A]">Lưu lượng thực khách:</span>
              <span className="font-bold text-[#DE3618]">~1.450 khách/giờ</span>
            </div>
            <div className="w-full bg-[#F8E5D6] h-2 rounded-full overflow-hidden">
              <div className="bg-[#DE3618] h-full rounded-full transition-all duration-700" style={{ width: "82%" }} />
            </div>
            <p className="text-[11px] text-[#5C403A] pt-1">
              Du khách quốc tế &amp; khách dạo bộ phố đi bộ cuối tuần.
            </p>
          </div>
        </div>

        {/* 3km Catchment */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#F2DFD1] flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-[#5C403A] uppercase tracking-wider">
                Bán kính Xe máy 3km
              </span>
              <span className="text-lg font-bold text-[#231A11]">Đống Đa - Ba Đình - HBT</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#FFDCC2] flex items-center justify-center text-[#8F4E00] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">two_wheeler</span>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#5C403A]">Thời gian tiếp cận:</span>
              <span className="font-bold text-[#8F4E00]">6 - 12 phút</span>
            </div>
            <div className="w-full bg-[#F8E5D6] h-2 rounded-full overflow-hidden">
              <div className="bg-[#FD9013] h-full rounded-full transition-all duration-700" style={{ width: "68%" }} />
            </div>
            <p className="text-[11px] text-[#5C403A] pt-1">
              Giới trẻ, văn phòng sành ăn &amp; hội nhóm sinh viên.
            </p>
          </div>
        </div>

        {/* 5km Catchment */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#F2DFD1] flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-[#5C403A] uppercase tracking-wider">
                Bán kính Ô tô 5km
              </span>
              <span className="text-lg font-bold text-[#231A11]">Cầu Giấy &amp; Tây Hồ</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#B1F0CE] flex items-center justify-center text-[#2C694E] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">directions_car</span>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#5C403A]">Tỷ lệ đặt bàn trước:</span>
              <span className="font-bold text-[#2C694E]">91%</span>
            </div>
            <div className="w-full bg-[#F8E5D6] h-2 rounded-full overflow-hidden">
              <div className="bg-[#2C694E] h-full rounded-full transition-all duration-700" style={{ width: "91%" }} />
            </div>
            <p className="text-[11px] text-[#5C403A] pt-1">
              Gia đình, tiệc công ty &amp; thực khách dùng xe riêng đón tiếp đối tác.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Map & Directions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive Visual Map Card (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl shadow-sm border border-[#F2DFD1] overflow-hidden flex flex-col">
          <div className="p-6 bg-[#FFF1E8]/70 flex items-center justify-between border-b border-[#F2DFD1]">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#DE3618] animate-ping" />
              <span className="text-sm font-bold text-[#231A11]">
                Bản đồ Định vị Trực quan Phố Mã Mây
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-[#FEEADC] px-2.5 py-1 rounded-full text-[#5C403A] font-semibold">
                Tầng 1 &amp; 2 - Mặt tiền 8m
              </span>
              <button
                type="button"
                onClick={() => showToast("Phóng to bản đồ toàn màn hình")}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#231A11] hover:bg-[#FEEADC] transition-colors border border-[#F2DFD1]"
              >
                <span className="material-symbols-outlined text-sm">fullscreen</span>
              </button>
            </div>
          </div>

          {/* Simulated Map Canvas */}
          <div className="relative w-full h-[460px] bg-[#F8EFE6] overflow-hidden flex items-center justify-center">
            {/* Background Map Graphic SVG */}
            <svg className="absolute inset-0 w-full h-full object-cover opacity-90" fill="none" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
              <rect fill="#F8EFE6" height="600" width="800" />
              {/* Road Network */}
              <path d="M-50 180 C200 170, 400 240, 850 210" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="32" />
              <path d="M-50 180 C200 170, 400 240, 850 210" stroke="#F1DFC8" strokeLinecap="round" strokeWidth="20" />
              <path d="M380 -50 L420 650" stroke="#FFFFFF" strokeWidth="40" />
              <path d="M380 -50 L420 650" stroke="#F1DFC8" strokeWidth="26" />
              <path d="M120 0 L220 600" stroke="#FFFFFF" strokeWidth="22" />
              <path d="M120 0 L220 600" stroke="#F1DFC8" strokeWidth="14" />
              <path d="M100 480 C320 420, 560 520, 850 430" stroke="#FFFFFF" strokeWidth="28" />
              <path d="M100 480 C320 420, 560 520, 850 430" stroke="#F1DFC8" strokeWidth="18" />
              {/* Small Alleyways */}
              <path d="M320 220 L260 380" stroke="#FFFFFF" strokeWidth="10" />
              <path d="M420 340 L620 300" stroke="#FFFFFF" strokeWidth="12" />
              {/* Green Spaces */}
              <rect fill="#DDE8DC" height="110" rx="16" width="180" x="520" y="80" />
              <text fill="#2C694E" fontSize="11" fontWeight="700" x="540" y="140">Đền Mã Mây</text>
              <rect fill="#E8E2D7" height="150" rx="16" width="140" x="80" y="260" />
              <text fill="#8F4E00" fontSize="10" fontWeight="600" x="96" y="340">Ngã tư Tạ Hiện</text>
              {/* Heat radius */}
              <circle cx="410" cy="270" fill="#DE3618" fillOpacity="0.08" r="140" />
              <circle cx="410" cy="270" fill="#DE3618" fillOpacity="0.14" r="70" />
            </svg>

            {/* Walking Route Dashed Curve */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full" fill="none" viewBox="0 0 800 600">
                <path d="M190 320 Q 300 310, 410 270" stroke="#DE3618" strokeDasharray="8 8" strokeLinecap="round" strokeWidth="4" />
                <circle cx="190" cy="320" fill="#DE3618" r="6" />
              </svg>
            </div>

            {/* LOCALEATS Iconic Flame Beacon Pin */}
            <div className="absolute top-[220px] left-[380px] flex flex-col items-center cursor-pointer transform -translate-x-1/2 -translate-y-full hover:scale-105 transition-transform group">
              <div className="bg-[#DE3618] text-white px-3.5 py-1.5 rounded-full shadow-xl flex items-center gap-1.5 whitespace-nowrap mb-1">
                <span className="material-symbols-outlined text-base animate-bounce" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_fire_department
                </span>
                <span className="text-xs font-extrabold">{currentPlace?.name || "Bếp Trưởng Hà Nội"}</span>
                <span className="bg-white text-[#DE3618] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  4.9 ★
                </span>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#DE3618]/25 animate-ping absolute" />
                <div className="w-10 h-10 rounded-full bg-[#DE3618] flex items-center justify-center shadow-lg text-white">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    restaurant
                  </span>
                </div>
              </div>
              <div className="w-2.5 h-2.5 bg-[#DE3618] rotate-45 -mt-1.5" />
            </div>

            {/* Landmark Marker 1: Tạ Hiện */}
            <div className="absolute top-[310px] left-[180px] -translate-x-1/2 -translate-y-1/2 bg-white px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1 border border-[#F2DFD1]">
              <span className="material-symbols-outlined text-xs text-[#8F4E00]">explore</span>
              <span className="text-xs font-semibold text-[#231A11]">Tạ Hiện (150m)</span>
            </div>

            {/* Parking Marker */}
            <div className="absolute top-[180px] left-[520px] bg-[#B1F0CE] text-[#002114] px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1 border border-[#2C694E]/20">
              <span className="material-symbols-outlined text-xs font-bold">local_parking</span>
              <span className="text-xs font-bold">Bãi đỗ số 54 Mã Mây</span>
            </div>

            {/* Bottom floating map status card */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-md border border-[#F2DFD1] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#2C694E]">traffic</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#231A11]">Tình trạng phố Mã Mây: Thông thoáng</span>
                  <span className="text-[11px] text-[#5C403A]">
                    Không cấm đường ô tô giờ trưa, phố đi bộ kích hoạt từ 19:00 Thứ Sáu
                  </span>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#B1F0CE] text-[#002114] font-bold">
                Lưu thông tốt
              </span>
            </div>
          </div>

          {/* Footnote details */}
          <div className="p-4 bg-[#FFF1E8]/70 flex flex-wrap items-center justify-between gap-2 text-xs text-[#5C403A] border-t border-[#F2DFD1]">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#DE3618]">satellite_alt</span>
              Dữ liệu vệ tinh cập nhật 12 phút trước
            </span>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#DE3618] hover:underline font-bold flex items-center gap-0.5"
            >
              Mở xem trực tiếp trên Google Maps
              <span className="material-symbols-outlined text-xs">open_in_new</span>
            </a>
          </div>
        </div>

        {/* Detailed Navigation Directions for Diners (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#F2DFD1] flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#231A11]">Hướng dẫn lộ trình đón khách</h2>
              <span className="text-[11px] text-[#DE3618] bg-[#FFDAD3] px-2.5 py-1 rounded-full font-bold">
                Tự động gửi kèm SMS/Zalo
              </span>
            </div>

            {/* Direction 1: Walking */}
            <div className="p-4 rounded-2xl bg-[#FFF8F5] border border-[#F2DFD1] flex gap-4 transition-all hover:bg-[#FFF1E8]">
              <div className="w-10 h-10 rounded-full bg-[#FFDAD3] text-[#DE3618] flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-xl">directions_walk</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#231A11]">Dành cho khách Đi bộ</span>
                  <span className="text-[11px] text-[#5C403A] font-semibold">150m • 2 phút</span>
                </div>
                <p className="text-xs text-[#5C403A] leading-relaxed">
                  Từ ngã tư sầm uất <strong className="text-[#231A11]">Tạ Hiện - Lương Ngọc Quyến</strong>, rẽ sang phố Mã Mây đi thẳng 150m. Quán nằm phía tay phải với biển hiệu gỗ nâu ấm và đèn lồng đỏ đặc trưng.
                </p>
              </div>
            </div>

            {/* Direction 2: Motorbike */}
            <div className="p-4 rounded-2xl bg-[#FFF8F5] border border-[#F2DFD1] flex gap-4 transition-all hover:bg-[#FFF1E8]">
              <div className="w-10 h-10 rounded-full bg-[#FFDCC2] text-[#8F4E00] flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-xl">two_wheeler</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#231A11]">Dành cho Xe máy</span>
                  <span className="text-[11px] text-[#002114] font-bold bg-[#B1F0CE] px-2 py-0.5 rounded">
                    Gửi xe Free
                  </span>
                </div>
                <p className="text-xs text-[#5C403A] leading-relaxed">
                  Di chuyển vào phố Mã Mây từ hướng <strong className="text-[#231A11]">Hàng Bạc</strong>. Thực khách dừng xe trực tiếp trước số 38B, nhân viên bảo vệ hỗ trợ dắt xe và phát vé thẻ từ miễn phí.
                </p>
              </div>
            </div>

            {/* Direction 3: Car / Taxi */}
            <div className="p-4 rounded-2xl bg-[#FFF8F5] border border-[#F2DFD1] flex gap-4 transition-all hover:bg-[#FFF1E8]">
              <div className="w-10 h-10 rounded-full bg-[#B1F0CE] text-[#2C694E] flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-xl">directions_car</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#231A11]">Dành cho Ô tô &amp; Xe điện</span>
                  <span className="text-[11px] text-[#5C403A] font-semibold">2 bãi đỗ lớn</span>
                </div>
                <p className="text-xs text-[#5C403A] leading-relaxed">
                  Đỗ xe tại <strong className="text-[#231A11]">Bãi đối diện số 54 Mã Mây</strong> (cách 60m) hoặc <strong className="text-[#231A11]">Hầm Vườn hoa Hàng Trống</strong> (cách 300m - Quán có xe điện golf trung chuyển miễn phí đón khách).
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[#F2DFD1]">
              <span className="text-xs text-[#5C403A]">Sao chép tin nhắn chỉ đường chuẩn:</span>
              <button
                type="button"
                onClick={copyDirections}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF1E8] hover:bg-[#FEEADC] text-[#231A11] text-xs font-bold border border-[#F2DFD1] transition-colors"
              >
                <span className="material-symbols-outlined text-sm">content_copy</span>
                Copy nội dung
              </button>
            </div>
          </div>

          {/* Banner for Valet / Parking Assist */}
          <div className="bg-[#FFF1E8] p-5 rounded-3xl border border-[#F2DFD1] flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#DE3618] text-white flex items-center justify-center shrink-0 shadow-md">
              <span className="material-symbols-outlined text-2xl">support_agent</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-[#231A11]">Đội ngũ Điều phối Bãi xe &amp; Đón tiếp</span>
              <p className="text-xs text-[#5C403A]">
                Hotline hỗ trợ dẫn đường trực tiếp:{" "}
                <strong className="text-[#DE3618] font-bold">0982.38.38.38</strong> (Trực 10:00 - 23:30)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Navigation Tracker: Real-Time Diners Inbound */}
      <div className="flex flex-col gap-4 bg-white p-6 lg:p-8 rounded-3xl shadow-sm border border-[#F2DFD1]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFDAD3] flex items-center justify-center text-[#DE3618]">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                near_me
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-[#231A11]">Live Navigation Tracker</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#DE3618] text-white text-xs font-bold">
                  {inboundDiners.length} khách đang tới
                </span>
              </div>
              <p className="text-xs text-[#5C403A]">
                Thực khách vừa bấm nút 'Chỉ đường tới quán' trên app LOCALEATS hoặc quét mã QR
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#2C694E] flex items-center gap-1 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#2C694E] animate-pulse" />
              Tự động làm mới mỗi 15 giây
            </span>
          </div>
        </div>

        {/* Live Tracking Table */}
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs min-w-[840px]">
            <thead>
              <tr className="text-[#5C403A] font-bold bg-[#FFF1E8] rounded-xl">
                <th className="py-3 px-4 rounded-l-xl">Thực khách</th>
                <th className="py-3 px-4">Phương tiện</th>
                <th className="py-3 px-4">Vị trí hiện tại</th>
                <th className="py-3 px-4">Khoảng cách &amp; ETA</th>
                <th className="py-3 px-4">Quy mô nhóm</th>
                <th className="py-3 px-4">Trạng thái bàn</th>
                <th className="py-3 px-4 text-right rounded-r-xl">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2DFD1]">
              {inboundDiners.map((d) => (
                <tr key={d.id} className="hover:bg-[#FFF8F5] transition-colors group">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FEEADC] flex items-center justify-center font-bold text-[#DE3618]">
                        {d.initials}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-xs text-[#231A11]">Thực khách #{d.id}</span>
                        <span className="text-[11px] text-[#5C403A]">{d.tier}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${d.vehicleColor}`}>
                      <span className="material-symbols-outlined text-sm">{d.vehicleIcon}</span>
                      {d.vehicle}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-[#231A11] font-medium">{d.location}</td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#DE3618] text-xs">{d.distance}</span>
                      <span className="text-[11px] text-[#5C403A]">{d.eta}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-[#231A11]">{d.party}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${d.tableClass}`}>
                      <span className="material-symbols-outlined text-xs">event_seat</span>
                      {d.table}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => showToast(`Đã thực hiện: "${d.actionLabel}" cho khách #${d.id}`)}
                      className="px-4 py-2 rounded-full bg-[#FFF1E8] hover:bg-[#DE3618] hover:text-white text-[#231A11] text-xs font-bold transition-all border border-[#F2DFD1]"
                    >
                      {d.actionLabel}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

