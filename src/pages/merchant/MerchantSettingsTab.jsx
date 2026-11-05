import { useState } from "react";

const CULINARY_ICONS = [
  { id: "ramen_dining", label: "Phở & Bún bò", symbol: "ramen_dining", isEmoji: false },
  { id: "bakery_dining", label: "Bánh mì giòn", symbol: "bakery_dining", isEmoji: false },
  { id: "set_meal", label: "Hải sản & Ốc tươi", symbol: "set_meal", isEmoji: false },
  { id: "coffee", label: "Cà phê & Trà", symbol: "coffee", isEmoji: false },
  { id: "emoji_food_beverage", label: "Trà sữa & Tráng miệng", symbol: "emoji_food_beverage", isEmoji: false },
  { id: "outdoor_grill", label: "Nướng BBQ & Xiên que", symbol: "outdoor_grill", isEmoji: false },
  { id: "rice_bowl", label: "Cơm tấm & Cơm sườn", symbol: "rice_bowl", isEmoji: false },
  { id: "soup_kitchen", label: "Lẩu & Nước súp", symbol: "soup_kitchen", isEmoji: false },
  { id: "local_dining", label: "Gỏi cuốn & Món cuốn", symbol: "local_dining", isEmoji: false },
  { id: "local_pizza", label: "Pizza lò nướng", symbol: "local_pizza", isEmoji: false },
  { id: "lunch_dining", label: "Burger & Thức ăn nhanh", symbol: "lunch_dining", isEmoji: false },
  { id: "sports_bar", label: "Bia tươi & Quán nhậu", symbol: "sports_bar", isEmoji: false },
  { id: "icecream", label: "Kem & Chè lạnh", symbol: "icecream", isEmoji: false },
  { id: "fastfood", label: "Ăn vặt đường phố", symbol: "fastfood", isEmoji: false },
  { id: "local_fire_department", label: "Siêu Hot Bùng Nổ", symbol: "local_fire_department", isEmoji: false },
  { id: "workspace_premium", label: "VIP Hoàng Gia", symbol: "workspace_premium", isEmoji: false },
  // Icon ẩm thực dạng Emoji trực quan
  { id: "emoji_pho", label: "Tô Phở Nóng", symbol: "🍜", isEmoji: true },
  { id: "emoji_banhmi", label: "Ổ Bánh Mì", symbol: "🥖", isEmoji: true },
  { id: "emoji_trasua", label: "Trà Sữa Trân Châu", symbol: "🧋", isEmoji: true },
  { id: "emoji_bbq", label: "Thịt Nướng Xèo Xèo", symbol: "🥩", isEmoji: true },
  { id: "emoji_shrimp", label: "Tôm Cua Ốc", symbol: "🦐", isEmoji: true },
  { id: "emoji_beer", label: "Bia Rượu Mồi", symbol: "🍺", isEmoji: true },
  { id: "emoji_icecream", label: "Chè Kem Ngọt", symbol: "🍧", isEmoji: true },
  { id: "emoji_coffee", label: "Cà Phê Phin", symbol: "☕", isEmoji: true },
];

export default function MerchantSettingsTab({ currentPlace }) {
  const [activeSubTab, setActiveSubTab] = useState("staff"); // staff, devices, reception, notifications, security, sync
  const [toast, setToast] = useState(null);

  const placeId = currentPlace?.id || 1;
  const placeName = currentPlace?.name || "Phở Thìn Lò Đúc";

  // Biểu tượng ghim bản đồ do chủ quán tự lựa chọn
  const [selectedIcon, setSelectedIcon] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("localeats_merchant_custom_icons") || "{}");
      if (saved[placeId]) return saved[placeId];
      if (saved["current"]) return saved["current"];
    } catch {}
    return currentPlace?.customIcon || currentPlace?.icon || "ramen_dining";
  });
  const [customEmojiInput, setCustomEmojiInput] = useState("");

  const handleSelectIcon = (iconSymbol) => {
    setSelectedIcon(iconSymbol);
    try {
      const saved = JSON.parse(localStorage.getItem("localeats_merchant_custom_icons") || "{}");
      saved[placeId] = iconSymbol;
      saved["current"] = iconSymbol;
      localStorage.setItem("localeats_merchant_custom_icons", JSON.stringify(saved));
      window.dispatchEvent(new Event("localeats_icon_updated"));
      showToast(`Đã cập nhật biểu tượng bản đồ thành "${iconSymbol}" cho quán!`, "success");
    } catch (err) {
      showToast("Có lỗi xảy ra khi lưu biểu tượng!", "error");
    }
  };

  const handleApplyCustomEmoji = (e) => {
    e.preventDefault();
    if (!customEmojiInput.trim()) {
      showToast("Vui lòng nhập ít nhất 1 biểu tượng cảm xúc (Emoji)!", "error");
      return;
    }
    handleSelectIcon(customEmojiInput.trim());
    setCustomEmojiInput("");
  };

  // Reception toggles
  const [autoBusyMode, setAutoBusyMode] = useState(true);
  const [preBooking, setPreBooking] = useState(true);
  const [radarPromo, setRadarPromo] = useState(false);

  // Notification toggles
  const [chimeType, setChimeType] = useState("Chuông Đón Khách 1 (Âm vang nhẹ)");
  const [reviewAlert, setReviewAlert] = useState(true);
  const [lowStockAlert, setLowStockAlert] = useState(true);

  // Staff state & modal
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [staffList, setStaffList] = useState([
    {
      id: 1,
      name: "Nguyễn Văn Tuấn",
      role: "Bếp Trưởng",
      roleClass: "bg-[#FD9013]/20 text-[#8F4E00]",
      desc: "Toàn quyền Menu, Tạm ngưng món, Cảnh báo nguyên liệu, Xem KDS Bếp",
      shift: "Ca sáng (06:00 - 14:30)",
      shiftActive: true,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmH5QtnBco9TiCghOymlSl6oAhAkerv9icXU8QgaZ1HBN406xeCwQZpxLIggKLOd4qmGolzu-Oggn95iP2NBA2ByqZpQwn_GmLv7OkwGVtrucETiEiA3KWX2pgByeyQXoxm8mt4ky9zGEaG4W2D36hPbDvzU08U-pVQegKcPKqDQTI8RMo_ORRgMj89NjX17ESrVKgh88QhY-vDT12HDDoTrNCjUSZQ6WmaCRPQM4",
    },
    {
      id: 2,
      name: "Lê Thị Mai",
      role: "Thu Ngân & Quầy",
      roleClass: "bg-[#B1F0CE] text-[#002114]",
      desc: "Tạo hóa đơn, Quét mã ưu đãi, Xem lượng khách tới quán, In tạm tính",
      shift: "Ca chiều (14:00 - 22:30)",
      shiftActive: true,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXh1WdBWAUHtJshdu2DJE6KiPyBDB08rEtiAklIk4dlpEGLyc8iu5n_trbOrKS7AfCNHyomBiZhc3LHJ_hHjl5GYLPfFOW3Rb8WnXffCvWgjfE76IroteW_eRJWSa-36qcuC748UPxljqhM_dvYnUF3Kuvc_JZ0PHF0zsGavl4oUhE1RuvaSxobMOkVi4NgY1BbS5IovjKXg3q8xP81QguPxGTgnn18osXl_Rf3HI",
    },
    {
      id: 3,
      name: "Trần Quốc Bảo",
      role: "Quản Lý Ca",
      roleClass: "bg-[#FFDAD3] text-[#8E1400]",
      desc: "Xem báo cáo doanh thu ngày, Điều phối bàn trực tiếp, Quản lý đặt trước",
      shift: "Ca tối (17:00 - 23:30)",
      shiftActive: false,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2-k1AUZgcGY84tgBsP1CVYghOstXkO7XMAE6yDclzv3FJuQ6uAZmcfoTVHbbtMo3oqBSOKEv54bWy3c8Q9QQJeG8-nvydUzLnUc3CWycFbO7NUuuM6P4Es7rBYaWYS8qw2uDbrs8fwJu8-fobfgdp59FiHV_Z8JwUs5kGcCoeoxdEEf37eIeWom6e3yjGljllZQ1BgNnPXGneUEQpWh10eLjTr8u-Rf5EFgLAFOQ",
    },
  ]);

  const [newStaff, setNewStaff] = useState({ name: "", phone: "", role: "Bếp" });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleTestPrint = (device) => {
    showToast(`Đã gửi lệnh in thử tới Máy in ${device} qua cổng giao tiếp!`, "success");
  };

  const handleTestAllPrinters = () => {
    showToast("2/2 máy in (Epson TM-T82III, Xprinter XP-420B) phản hồi bình thường (8ms)", "success");
  };

  const handleTestChime = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(659.25, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch (e) {
      // ignore
    }
    showToast(`Đang phát thử mẫu âm "${chimeType}"`, "info");
  };

  const handleAddStaff = (e) => {
    e.preventDefault();
    if (!newStaff.name.trim()) {
      showToast("Vui lòng nhập họ tên nhân viên!", "error");
      return;
    }
    const roleColors = {
      "Bếp": "bg-[#FD9013]/20 text-[#8F4E00]",
      "Thu ngân": "bg-[#B1F0CE] text-[#002114]",
      "Phục vụ": "bg-[#FEEADC] text-[#231A11]",
      "Quản lý": "bg-[#FFDAD3] text-[#8E1400]",
    };
    setStaffList((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newStaff.name.trim(),
        role: newStaff.role,
        roleClass: roleColors[newStaff.role] || "bg-[#FEEADC] text-[#231A11]",
        desc: "Đã phân quyền thao tác trực tiếp trên hệ thống POS nhà hàng",
        shift: "Ca linh hoạt",
        shiftActive: true,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
      },
    ]);
    setIsStaffModalOpen(false);
    setNewStaff({ name: "", phone: "", role: "Bếp" });
    showToast(`Đã thêm nhân viên ${newStaff.name} vào danh sách ca kíp!`, "success");
  };

  return (
    <div className="flex flex-col w-full gap-8 pb-16 relative">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl shadow-2xl font-bold text-xs transition-all animate-bounce bg-[#2C694E] text-white">
          <span className="material-symbols-outlined text-lg">
            {toast.type === "success" ? "check_circle" : toast.type === "info" ? "info" : "warning"}
          </span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Banner Header */}
      <div className="relative overflow-hidden bg-[#FFF1E8] rounded-3xl px-8 py-10 shadow-sm border border-[#F2DFD1]">
        <div className="absolute -right-20 -top-24 w-96 h-96 rounded-full bg-[#FD9013]/10 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-20 w-80 h-80 rounded-full bg-[#DE3618]/5 blur-2xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8E5D6] text-[#DE3618] text-xs font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DE3618] animate-ping" />
                Hệ Thống Trực Tuyến
              </span>
              <span className="text-[#5C403A] text-xs tracking-wider uppercase font-semibold">
                Phiên bản POS v4.12.0
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl text-[#231A11] font-extrabold tracking-tight">
              Cài Đặt Vận Hành & Phân Quyền
            </h1>
            <p className="text-sm text-[#5C403A] max-w-2xl leading-relaxed">
              Tùy chỉnh thông số vận hành bếp, phân quyền ca kíp nhân sự, thiết bị in ấn nhiệt và cấu hình tiếp đón thực khách theo thời gian thực tại chi nhánh Hoàn Kiếm.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Bạn có chắc muốn khôi phục toàn bộ cài đặt về trạng thái xuất xưởng mặc định?")) {
                  showToast("Đã khôi phục cài đặt mặc định thành công!", "info");
                }
              }}
              className="px-5 py-2.5 rounded-full bg-[#FEEADC] hover:bg-[#F8E5D6] text-[#231A11] text-xs font-bold transition-all flex items-center gap-2 shadow-sm border border-[#F2DFD1]"
            >
              <span className="material-symbols-outlined text-lg">restart_alt</span>
              Khôi phục mặc định
            </button>
            <button
              type="button"
              onClick={() => showToast("Đã lưu thành công tất cả cài đặt vận hành và thiết bị!", "success")}
              className="px-6 py-2.5 rounded-full bg-[#DE3618] hover:bg-[#B91D00] text-white text-xs font-bold transition-all shadow-[0_6px_16px_rgba(222,54,24,0.35)] active:scale-[0.98] flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">check_circle</span>
              Lưu thay đổi thiết lập
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { key: "staff", label: "Phân quyền & Nhân sự", icon: "badge" },
          { key: "devices", label: "Máy in & Ngoại vi", icon: "print" },
          { key: "reception", label: "Bản đồ & Đón khách", icon: "map" },
          { key: "notifications", label: "Chuông báo & Âm thanh", icon: "notifications_active" },
          { key: "security", label: "Tài khoản & Bảo mật", icon: "shield" },
          { key: "sync", label: "Kênh đồng bộ", icon: "hub" },
        ].map((tab) => {
          const isActive = activeSubTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveSubTab(tab.key)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all shadow-sm ${
                isActive
                  ? "bg-[#DE3618] text-white shadow-[#DE3618]/25"
                  : "bg-[#FEEADC] hover:bg-[#F8E5D6] text-[#5C403A] hover:text-[#231A11] border border-[#F2DFD1]"
              }`}
            >
              <span className="material-symbols-outlined text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Grid: Sub-panel left + Summary sidebar right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Panel */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* TAB 1: PHÂN QUYỀN & NHÂN SỰ */}
          {activeSubTab === "staff" && (
            <section className="flex flex-col gap-6 bg-white p-7 rounded-3xl shadow-sm border border-[#F2DFD1]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col">
                  <h2 className="text-lg font-bold text-[#231A11]">Phân Quyền Nhân Viên & Ca Làm Việc</h2>
                  <p className="text-xs text-[#5C403A]">Quản lý quyền truy cập chức năng quầy Bếp, Thu ngân và Điều phối thực khách</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsStaffModalOpen(true)}
                  className="px-4 py-2 rounded-full bg-[#FEEADC] hover:bg-[#F8E5D6] text-[#DE3618] text-xs font-bold flex items-center gap-1.5 transition-all self-start sm:self-auto border border-[#F2DFD1]"
                >
                  <span className="material-symbols-outlined text-base">person_add</span>
                  Thêm nhân viên mới
                </button>
              </div>

              {/* Quick staff metric badges */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-[#FFF1E8] p-4 rounded-2xl flex items-center gap-3 border border-[#F2DFD1]">
                  <div className="w-10 h-10 rounded-xl bg-[#B1F0CE] text-[#002114] flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">person_check</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-black text-[#231A11] leading-tight">6/8</span>
                    <span className="text-xs text-[#5C403A]">Đang trong ca trực</span>
                  </div>
                </div>

                <div className="bg-[#FFF1E8] p-4 rounded-2xl flex items-center gap-3 border border-[#F2DFD1]">
                  <div className="w-10 h-10 rounded-xl bg-[#FFDCC2] text-[#2E1500] flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">soup_kitchen</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-black text-[#231A11] leading-tight">2</span>
                    <span className="text-xs text-[#5C403A]">Bếp trưởng phụ trách</span>
                  </div>
                </div>

                <div className="bg-[#FFF1E8] p-4 rounded-2xl flex items-center gap-3 border border-[#F2DFD1]">
                  <div className="w-10 h-10 rounded-xl bg-[#FFDAD3] text-[#8E1400] flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">point_of_sale</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-black text-[#231A11] leading-tight">3</span>
                    <span className="text-xs text-[#5C403A]">Thu ngân & Lễ tân</span>
                  </div>
                </div>
              </div>

              {/* Staff Cards List */}
              <div className="flex flex-col gap-3">
                {staffList.map((staff) => (
                  <div
                    key={staff.id}
                    className="p-4 rounded-2xl bg-[#FFF1E8] flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:bg-[#FEEADC] border border-[#F2DFD1]"
                  >
                    <div className="flex items-center gap-3.5">
                      <img
                        className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-white"
                        src={staff.avatar}
                        alt={staff.name}
                      />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#231A11]">{staff.name}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${staff.roleClass}`}>
                            {staff.role}
                          </span>
                        </div>
                        <span className="text-xs text-[#5C403A] mt-0.5">{staff.desc}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${staff.shiftActive ? "text-[#2C694E]" : "text-[#5C403A]"}`}>
                        <span className={`w-2 h-2 rounded-full ${staff.shiftActive ? "bg-[#2C694E]" : "bg-gray-400"}`} />
                        {staff.shift}
                      </span>
                      <button
                        type="button"
                        onClick={() => showToast(`Đang mở giao diện phân quyền cho ${staff.name}`, "info")}
                        className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#5C403A] hover:text-[#DE3618] transition-all shadow-sm border border-[#F2DFD1]"
                        title="Chỉnh sửa ca kíp & phân quyền"
                      >
                        <span className="material-symbols-outlined text-base">edit</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* TAB 2: MÁY IN & NGOẠI VI */}
          {activeSubTab === "devices" && (
            <section className="flex flex-col gap-6 bg-white p-7 rounded-3xl shadow-sm border border-[#F2DFD1]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col">
                  <h2 className="text-lg font-bold text-[#231A11]">Thiết Bị Ngoại Vi & Cụm Máy In Nhiệt</h2>
                  <p className="text-xs text-[#5C403A]">Đồng bộ truyền lệnh in phiếu chế biến Bếp và Hóa đơn quầy thu ngân</p>
                </div>
                <button
                  type="button"
                  onClick={handleTestAllPrinters}
                  className="px-4 py-2 rounded-full bg-[#FEEADC] hover:bg-[#F8E5D6] text-[#8F4E00] text-xs font-bold flex items-center gap-1.5 transition-all self-start sm:self-auto border border-[#F2DFD1]"
                >
                  <span className="material-symbols-outlined text-base">fact_check</span>
                  Kiểm tra tất cả thiết bị
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Kitchen Printer KDS */}
                <div className="p-5 rounded-2xl bg-[#FFF1E8] flex flex-col justify-between gap-4 border border-[#F2DFD1]">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#2C694E]/10 text-[#2C694E] flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl">soup_kitchen</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-[#231A11]">Máy In Phiếu Bếp (KDS)</span>
                        <span className="text-xs text-[#5C403A]">Epson TM-T82III (LAN / Wifi 5G)</span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#B1F0CE] text-[#002114] text-xs font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2C694E]" />
                      Sẵn sàng
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 bg-white p-3 rounded-xl text-xs text-[#5C403A] border border-[#F2DFD1]">
                    <div className="flex justify-between">
                      <span>Địa chỉ IP mạng nội bộ:</span>
                      <span className="font-mono font-bold text-[#231A11]">192.168.1.188:9100</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tự động tách phiếu theo line:</span>
                      <span className="text-[#2C694E] font-bold">Bật (Món Nướng / Món Lẩu)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-[#5C403A]">Độ trễ phản hồi: 8ms</span>
                    <button
                      type="button"
                      onClick={() => handleTestPrint("Bếp")}
                      className="px-4 py-1.5 rounded-full bg-[#DE3618] text-white text-xs font-bold hover:bg-[#B91D00] transition-all flex items-center gap-1 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-sm">print</span>
                      In thử phiếu order
                    </button>
                  </div>
                </div>

                {/* Cashier Printer */}
                <div className="p-5 rounded-2xl bg-[#FFF1E8] flex flex-col justify-between gap-4 border border-[#F2DFD1]">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#FD9013]/10 text-[#8F4E00] flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl">point_of_sale</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-[#231A11]">Máy In Quầy Thu Ngân</span>
                        <span className="text-xs text-[#5C403A]">Xprinter XP-420B (USB 3.0 / Két)</span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#B1F0CE] text-[#002114] text-xs font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2C694E]" />
                      Sẵn sàng
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 bg-white p-3 rounded-xl text-xs text-[#5C403A] border border-[#F2DFD1]">
                    <div className="flex justify-between">
                      <span>Cổng kết nối vật lý:</span>
                      <span className="font-mono font-bold text-[#231A11]">COM3 / Direct USB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mở két tiền tự động:</span>
                      <span className="text-[#8F4E00] font-bold">Có (Khi in bill thanh toán)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-[#5C403A]">Khổ giấy tiêu chuẩn: 80mm</span>
                    <button
                      type="button"
                      onClick={() => handleTestPrint("Thu ngân")}
                      className="px-4 py-1.5 rounded-full bg-[#F8E5D6] hover:bg-[#FEEADC] text-[#231A11] text-xs font-bold transition-all flex items-center gap-1 border border-[#F2DFD1]"
                    >
                      <span className="material-symbols-outlined text-sm">receipt</span>
                      In thử hóa đơn
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* TAB 3: BẢN ĐỒ & ĐÓN KHÁCH */}
          {activeSubTab === "reception" && (
            <section className="flex flex-col gap-6 bg-white p-7 rounded-3xl shadow-sm border border-[#F2DFD1]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col">
                  <h2 className="text-lg font-bold text-[#231A11]">Cấu Hình Bản Đồ & Đón Tiếp Thực Khách</h2>
                  <p className="text-xs text-[#5C403A]">Cân bằng sức chứa thực tế với người dùng đang tìm quán trên bản đồ thời gian thực</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#B1F0CE] text-[#002114] text-xs font-bold self-start sm:self-auto">
                  Thuật toán SmartHost ON
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {/* Option 1: Auto Busy */}
                <div className="p-4 rounded-2xl bg-[#FFF1E8] flex items-center justify-between gap-4 border border-[#F2DFD1]">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#DE3618]/10 text-[#DE3618] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-xl">hourglass_top</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-[#231A11]">Tự động kích hoạt chế độ "Đông Khách" trên bản đồ</span>
                      <p className="text-xs text-[#5C403A] mt-0.5">
                        Khi công suất phòng ăn vượt 90% bàn thực tế, bản đồ sẽ hiển thị nhãn "Quán đang đông, thời gian lên món +15 phút" để tránh quá tải cho Bếp.
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={autoBusyMode}
                      onChange={(e) => setAutoBusyMode(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#DE3618]" />
                  </label>
                </div>

                {/* Option 2: Pre-booking 20 mins */}
                <div className="p-4 rounded-2xl bg-[#FFF1E8] flex items-center justify-between gap-4 border border-[#F2DFD1]">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FD9013]/10 text-[#8F4E00] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-xl">near_me</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-[#231A11]">Cho phép gửi yêu cầu giữ chỗ trước 20 phút</span>
                      <p className="text-xs text-[#5C403A] mt-0.5">
                        Thực khách đang di chuyển trong bán kính 3km có thể giữ bàn chờ nhanh. Bàn sẽ tự hủy nếu khách không check-in sau 20 phút.
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={preBooking}
                      onChange={(e) => setPreBooking(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#DE3618]" />
                  </label>
                </div>

                {/* Option 3: 1.5km radar */}
                <div className="p-4 rounded-2xl bg-[#FFF1E8] flex items-center justify-between gap-4 border border-[#F2DFD1]">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#2C694E]/10 text-[#2C694E] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-xl">share_location</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-[#231A11]">Radar dò tìm khách vãng lai bán kính 1.5km</span>
                      <p className="text-xs text-[#5C403A] mt-0.5">
                        Tự động đẩy voucher giờ vàng vào mục 'Quán gợi ý quanh đây' của ứng dụng khách hàng trong khung giờ 11:30 - 13:00.
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={radarPromo}
                      onChange={(e) => setRadarPromo(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#DE3618]" />
                  </label>
                </div>

                {/* Option 4: BIỂU TƯỢNG GHIM BẢN ĐỒ CHỦ QUÁN TỰ CHỌN (CUSTOM MAP PIN ICON) */}
                <div className="p-5 rounded-3xl bg-gradient-to-br from-[#FFF8F5] via-[#FFF1E8] to-[#FFEFE6] border-2 border-[#DE3618]/25 shadow-sm flex flex-col gap-5 mt-2">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#F2DFD1]">
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-[#DE3618] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#DE3618]/30">
                        <span className="material-symbols-outlined text-2xl">pin_drop</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-base text-[#231A11]">Biểu Tượng Đại Diện Trên Ghim Bản Đồ</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#DE3618] text-white text-[11px] font-black uppercase tracking-wider">
                            Icon Tự Chọn
                          </span>
                        </div>
                        <p className="text-xs text-[#5C403A] mt-1 max-w-xl">
                          Chủ quán tự do chọn biểu tượng đại diện xuất hiện trực tiếp trong giọt nước ghim bản đồ thời gian thực.
                          Biểu tượng này được phóng to nổi bật giúp thực khách dễ dàng nhận ra món ăn đặc trưng của quán từ xa.
                        </p>
                      </div>
                    </div>

                    {/* LIVE PREVIEW GHIM BẢN ĐỒ */}
                    <div className="flex items-center gap-4 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-orange-200/80 shadow-sm shrink-0 self-start lg:self-auto">
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">Xem trước ghim</span>
                        <span className="text-xs font-black text-[#231A11] max-w-[120px] truncate">{placeName}</span>
                      </div>
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF5436] to-[#E84A27] opacity-60 blur-sm animate-pulse" />
                        <svg className="w-full h-full filter drop-shadow-sm" viewBox="0 0 100 100">
                          <defs>
                            <linearGradient id="gradPreview" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#FF5436" />
                              <stop offset="100%" stopColor="#C23616" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M 50,98 C 50,98 88,64 88,44 C 88,23 71,6 50,6 C 29,6 12,23 12,44 C 12,64 50,98 50,98 Z"
                            fill="url(#gradPreview)"
                            stroke="#FFFFFF"
                            strokeWidth="3"
                          />
                          <circle cx="50" cy="44" fill="#FFFFFF" r="28" />
                        </svg>
                        <div className="absolute top-1 inset-x-0 flex flex-col items-center justify-center pointer-events-none">
                          {/\p{Extended_Pictographic}/u.test(selectedIcon) ? (
                            <span className="text-2xl leading-none select-none">{selectedIcon}</span>
                          ) : (
                            <span
                              className="material-symbols-outlined text-[#E84A27] text-2xl leading-none"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              {selectedIcon}
                            </span>
                          )}
                          <span className="text-[8px] font-black text-gray-800 -mt-0.5">4.9★</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* BỘ CHỌN ICON ẨM THỰC */}
                  <div className="flex flex-col gap-2.5">
                    <span className="text-xs font-extrabold text-[#231A11] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-[#DE3618]">category</span>
                      Chọn nhanh từ thư viện ẩm thực đặc trưng:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                      {CULINARY_ICONS.map((item) => {
                        const isSelected = selectedIcon === item.symbol;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelectIcon(item.symbol)}
                            className={`flex items-center gap-2.5 p-2.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? "bg-white text-[#DE3618] border-[#DE3618] ring-2 ring-[#DE3618]/30 shadow-md scale-102 font-bold"
                                : "bg-white/70 hover:bg-white text-[#231A11] border-[#F2DFD1] hover:border-orange-300 hover:shadow-sm"
                            }`}
                          >
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform ${
                                isSelected ? "bg-[#DE3618] text-white scale-110 shadow-sm" : "bg-[#FFF1E8] text-[#DE3618]"
                              }`}
                            >
                              {item.isEmoji ? (
                                <span className="text-xl select-none leading-none">{item.symbol}</span>
                              ) : (
                                <span
                                  className="material-symbols-outlined text-xl"
                                  style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                  {item.symbol}
                                </span>
                              )}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-bold truncate leading-tight">{item.label}</span>
                              <span className="text-[10px] text-gray-400 truncate">
                                {isSelected ? "✓ Đang chọn" : "Bấm để gán"}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* NHẬP EMOJI TỰ CHỌN */}
                  <form onSubmit={handleApplyCustomEmoji} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3 border-t border-[#F2DFD1]/80">
                    <div className="flex items-center gap-2 flex-1 bg-white px-3.5 py-2.5 rounded-2xl border border-[#F2DFD1] focus-within:border-[#DE3618] focus-within:ring-2 focus-within:ring-orange-200 transition-all">
                      <span className="material-symbols-outlined text-gray-400 text-lg">add_reaction</span>
                      <input
                        type="text"
                        value={customEmojiInput}
                        onChange={(e) => setCustomEmojiInput(e.target.value)}
                        placeholder="Hoặc nhập Emoji bất kỳ (VD: 🍲, 🫔, 🌶️, 🍣, 🥟, 🍢, 🥤...)"
                        className="w-full text-xs bg-transparent focus:outline-none text-[#231A11] font-medium"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-2xl bg-[#DE3618] hover:bg-[#c02f14] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#DE3618]/25 transition-all shrink-0 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">check</span>
                      Áp Dụng Icon Này
                    </button>
                  </form>
                </div>
              </div>
            </section>
          )}

          {/* TAB 4: CHUÔNG BÁO & ÂM THANH */}
          {activeSubTab === "notifications" && (
            <section className="flex flex-col gap-6 bg-white p-7 rounded-3xl shadow-sm border border-[#F2DFD1]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col">
                  <h2 className="text-lg font-bold text-[#231A11]">Chuông Báo Động & Âm Thanh Thông Báo</h2>
                  <p className="text-xs text-[#5C403A]">Tùy biến cảnh báo âm thanh tại quầy thu ngân và khu vực tiếp đón khách</p>
                </div>
                <button
                  type="button"
                  onClick={handleTestChime}
                  className="px-4 py-1.5 rounded-full bg-[#FEEADC] hover:bg-[#F8E5D6] text-[#231A11] text-xs font-bold flex items-center gap-1.5 transition-all self-start sm:self-auto border border-[#F2DFD1]"
                >
                  <span className="material-symbols-outlined text-base">volume_up</span>
                  Thử chuông
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {/* Setting 1: Chime style */}
                <div className="p-4 rounded-2xl bg-[#FFF1E8] flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#F2DFD1]">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#8F4E00] text-2xl">directions_walk</span>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-[#231A11]">Khách nhấn "Chỉ đường tới quán"</span>
                      <span className="text-xs text-[#5C403A]">Phát âm thanh chuông leng keng báo hiệu có khách đang đi tới quán</span>
                    </div>
                  </div>
                  <select
                    value={chimeType}
                    onChange={(e) => setChimeType(e.target.value)}
                    className="px-3.5 py-2 rounded-xl bg-white text-[#231A11] text-xs font-semibold focus:outline-none border border-[#F2DFD1] shadow-sm"
                  >
                    <option value="Chuông Đón Khách 1 (Âm vang nhẹ)">Chuông Đón Khách 1 (Âm vang nhẹ)</option>
                    <option value="Chuông Bếp Ting-Ting">Chuông Bếp Ting-Ting</option>
                    <option value="Giọng nói AI tiếng Việt">Giọng nói AI tiếng Việt</option>
                  </select>
                </div>

                {/* Setting 2: Low Rating Review Alert */}
                <div className="p-4 rounded-2xl bg-[#FFF1E8] flex items-center justify-between gap-4 border border-[#F2DFD1]">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#DE3618] text-2xl">rate_review</span>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-[#231A11]">Đánh giá mới từ thực khách</span>
                      <span className="text-xs text-[#5C403A]">Cảnh báo tức thời qua app quản lý khi có review &lt; 3 sao để phản hồi kịp lúc</span>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={reviewAlert}
                      onChange={(e) => setReviewAlert(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#DE3618]" />
                  </label>
                </div>

                {/* Setting 3: Low stock */}
                <div className="p-4 rounded-2xl bg-[#FFF1E8] flex items-center justify-between gap-4 border border-[#F2DFD1]">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#BA1A1A] text-2xl">production_quantity_limits</span>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-[#231A11]">Cảnh báo món ăn sắp hết phần phục vụ</span>
                      <span className="text-xs text-[#5C403A]">Chuông báo khi định lượng món đặc trưng chạm ngưỡng dưới 5 suất</span>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={lowStockAlert}
                      onChange={(e) => setLowStockAlert(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#DE3618]" />
                  </label>
                </div>
              </div>
            </section>
          )}

          {/* TAB 5: TÀI KHOẢN & BẢO MẬT */}
          {activeSubTab === "security" && (
            <section className="flex flex-col gap-6 bg-white p-7 rounded-3xl shadow-sm border border-[#F2DFD1]">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h2 className="text-lg font-bold text-[#231A11]">Tài Khoản Quản Trị & Bảo Mật 2 Lớp (2FA)</h2>
                  <p className="text-xs text-[#5C403A]">Bảo vệ nguồn tiền doanh thu và thông tin kinh doanh nhà hàng</p>
                </div>
                <span className="inline-flex items-center gap-1 text-[#2C694E] text-xs font-bold">
                  <span className="material-symbols-outlined text-lg">verified_user</span>
                  Bảo mật cao
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 2FA Card */}
                <div className="p-5 rounded-2xl bg-[#FFF1E8] flex flex-col justify-between gap-4 border border-[#F2DFD1]">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-[#231A11]">
                      <span className="material-symbols-outlined text-[#8F4E00]">phonelink_lock</span>
                      <span className="font-bold text-sm">Xác thực 2 bước (Zalo / SMS)</span>
                    </div>
                    <p className="text-xs text-[#5C403A]">
                      Yêu cầu mã OTP khi đăng nhập trên thiết bị lạ hoặc khi rút doanh thu về tài khoản ngân hàng liên kết.
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-[#2C694E] font-bold">Đang liên kết: +84 •••• 5678</span>
                    <button
                      type="button"
                      onClick={() => showToast("Đã gửi mã kiểm tra bảo mật OTP qua Zalo OA!", "info")}
                      className="px-3.5 py-1.5 rounded-full bg-[#F8E5D6] hover:bg-[#FEEADC] text-[#231A11] text-xs font-bold transition-all border border-[#F2DFD1]"
                    >
                      Cập nhật SĐT
                    </button>
                  </div>
                </div>

                {/* Password Card */}
                <div className="p-5 rounded-2xl bg-[#FFF1E8] flex flex-col justify-between gap-4 border border-[#F2DFD1]">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-[#231A11]">
                      <span className="material-symbols-outlined text-[#DE3618]">key</span>
                      <span className="font-bold text-sm">Mật khẩu tài khoản chủ quán</span>
                    </div>
                    <p className="text-xs text-[#5C403A]">
                      Lần đổi mật khẩu gần nhất cách đây 42 ngày. Khuyến nghị cập nhật mật khẩu định kỳ 90 ngày.
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-[#5C403A]">Độ mạnh: Rất an toàn</span>
                    <button
                      type="button"
                      onClick={() => showToast("Đã gửi mã xác minh thay đổi mật khẩu về số điện thoại chủ quán!", "info")}
                      className="px-3.5 py-1.5 rounded-full bg-[#DE3618] text-white text-xs font-bold hover:bg-[#B91D00] transition-all shadow-sm"
                    >
                      Đổi mật khẩu
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* TAB 6: KÊNH ĐỒNG BỘ */}
          {activeSubTab === "sync" && (
            <section className="flex flex-col gap-6 bg-white p-7 rounded-3xl shadow-sm border border-[#F2DFD1]">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h2 className="text-lg font-bold text-[#231A11]">Tích Hợp Đồng Bộ Nền Tảng Đa Kênh</h2>
                  <p className="text-xs text-[#5C403A]">Tự động cập nhật menu, giá bán và trạng thái 'Còn bàn' chỉ với 1 chạm</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#FFDCC2] text-[#2E1500] text-xs font-bold">
                  Tự động sync mỗi 15 phút
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {/* Google My Business */}
                <div className="p-4 rounded-2xl bg-[#FFF1E8] flex items-center justify-between border border-[#F2DFD1]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-[#DE3618]">
                      <span className="material-symbols-outlined text-2xl">pin_drop</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-[#231A11]">Google My Business Profile</span>
                      <span className="text-xs text-[#5C403A]">Đồng bộ giờ mở cửa, menu nổi bật & trạng thái đông khách</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#B1F0CE] text-[#002114] text-xs font-bold">
                    <span className="material-symbols-outlined text-sm">check</span>
                    Đã kết nối
                  </span>
                </div>

                {/* Facebook Fanpage */}
                <div className="p-4 rounded-2xl bg-[#FFF1E8] flex items-center justify-between border border-[#F2DFD1]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-[#8F4E00]">
                      <span className="material-symbols-outlined text-2xl">campaign</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-[#231A11]">Fanpage Facebook (Bếp Trưởng Hà Nội)</span>
                      <span className="text-xs text-[#5C403A]">Tự động trả lời tin nhắn Messenger khi khách hỏi menu hoặc đặt chỗ</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#B1F0CE] text-[#002114] text-xs font-bold">
                    <span className="material-symbols-outlined text-sm">check</span>
                    Đã kết nối
                  </span>
                </div>

                {/* Zalo OA */}
                <div className="p-4 rounded-2xl bg-[#FFF1E8] flex items-center justify-between border border-[#F2DFD1]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-[#2C694E]">
                      <span className="material-symbols-outlined text-2xl">chat</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-[#231A11]">Zalo Official Account (Zalo OA Doanh Nghiệp)</span>
                      <span className="text-xs text-[#5C403A]">Gửi tin ZNS xác nhận đặt bàn và tích điểm thưởng thân thiết</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast("Đang kết nối Zalo OA Sandbox...", "info")}
                    className="px-4 py-1.5 rounded-full bg-[#DE3618] text-white text-xs font-bold hover:bg-[#B91D00] transition-all shadow-sm"
                  >
                    Kết nối ngay
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Right Sidebar: Restaurant Operational Status */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm flex flex-col gap-5 border border-[#F2DFD1]">
            <div className="flex items-center justify-between">
              <span className="font-bold text-base text-[#231A11]">Trạng Thái Toàn Quán</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#2C694E] animate-pulse" />
            </div>

            {/* Circular progress ring */}
            <div className="flex items-center gap-4 bg-[#FFF1E8] p-4 rounded-2xl border border-[#F2DFD1]">
              <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#F2DFD1]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />
                  <path
                    className="text-[#FD9013]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="78, 100"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
                <span className="absolute text-xs font-black text-[#231A11]">78%</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-[#231A11]">Công Suất Bàn Hiện Tại</span>
                <span className="text-xs text-[#5C403A]">28 / 36 bàn đang có khách</span>
                <span className="text-[11px] text-[#8F4E00] font-semibold mt-0.5">Chưa kích hoạt cảnh báo &gt;90%</span>
              </div>
            </div>

            {/* System Status Table */}
            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between items-center py-2 bg-[#FFF1E8] px-3.5 rounded-xl border border-[#F2DFD1]/50">
                <span className="text-[#5C403A]">Máy in phiếu Bếp:</span>
                <span className="font-bold text-[#2C694E] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2C694E]" /> Đang trực tuyến
                </span>
              </div>
              <div className="flex justify-between items-center py-2 bg-[#FFF1E8] px-3.5 rounded-xl border border-[#F2DFD1]/50">
                <span className="text-[#5C403A]">Máy in Quầy Thu Ngân:</span>
                <span className="font-bold text-[#2C694E] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2C694E]" /> Đang trực tuyến
                </span>
              </div>
              <div className="flex justify-between items-center py-2 bg-[#FFF1E8] px-3.5 rounded-xl border border-[#F2DFD1]/50">
                <span className="text-[#5C403A]">Đồng bộ Google Maps:</span>
                <span className="font-bold text-[#8F4E00] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8F4E00]" /> 3 phút trước
                </span>
              </div>
              <div className="flex justify-between items-center py-2 bg-[#FFF1E8] px-3.5 rounded-xl border border-[#F2DFD1]/50">
                <span className="text-[#5C403A]">Tài khoản quản trị viên:</span>
                <span className="font-bold text-[#231A11]">01 Chủ quán, 01 Giám sát</span>
              </div>
            </div>

            {/* Save Buttons */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => showToast("Đã lưu thành công tất cả cài đặt vận hành và thiết bị!", "success")}
                className="w-full py-3 rounded-2xl bg-[#DE3618] hover:bg-[#B91D00] text-white text-xs font-bold transition-all shadow-[0_6px_16px_rgba(222,54,24,0.35)] flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">save</span>
                Lưu Thay Đổi Thiết Lập
              </button>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Khôi phục cấu hình gốc mặc định của nhà hàng?")) {
                    showToast("Đã khôi phục cài đặt mặc định!", "info");
                  }
                }}
                className="w-full py-2.5 rounded-2xl bg-[#FEEADC] hover:bg-[#F8E5D6] text-[#5C403A] text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-[#F2DFD1]"
              >
                <span className="material-symbols-outlined text-base">history</span>
                Khôi phục cấu hình gốc
              </button>
            </div>
          </div>

          {/* Smart Host Tips Box */}
          <div className="bg-gradient-to-br from-[#F8E5D6] via-[#FEEADC] to-[#FFF1E8] p-6 rounded-3xl flex flex-col gap-3.5 border border-[#F2DFD1] relative overflow-hidden">
            <div className="flex items-center gap-2 text-[#DE3618]">
              <span className="material-symbols-outlined text-xl">tips_and_updates</span>
              <span className="text-xs font-bold uppercase tracking-wider">Mẹo Tối Ưu Vận Hành</span>
            </div>
            <p className="text-xs text-[#231A11] leading-relaxed">
              Kích hoạt tính năng <strong className="text-[#DE3618] font-bold">Tự động đông khách khi đạt 90%</strong> giúp giảm 45% tỷ lệ phàn nàn về thời gian đợi món trong các khung giờ cao điểm tối cuối tuần.
            </p>
            <div className="pt-1 flex items-center justify-between text-xs text-[#5C403A]">
              <span>LOCALEATS Smart Hospitality AI</span>
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Thêm nhân viên mới */}
      {isStaffModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl flex flex-col gap-5 border border-[#F2DFD1] animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-[#231A11]">Thêm Nhân Viên Vào Ca</h3>
                <p className="text-xs text-[#5C403A]">Cấp quyền thao tác trên hệ thống POS nhà hàng</p>
              </div>
              <button
                type="button"
                onClick={() => setIsStaffModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#FFF1E8] flex items-center justify-center text-[#5C403A] hover:text-[#231A11] transition-colors"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <form onSubmit={handleAddStaff} className="flex flex-col gap-3.5 text-xs">
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[#231A11]">Họ và tên nhân viên</label>
                <input
                  type="text"
                  required
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  placeholder="Ví dụ: Đỗ Hoàng Long"
                  className="px-3.5 py-2.5 rounded-xl bg-[#FFF1E8] text-[#231A11] focus:outline-none focus:ring-2 focus:ring-[#DE3618]/20 border border-[#F2DFD1]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[#231A11]">Số điện thoại đăng nhập Zalo/OTP</label>
                <input
                  type="text"
                  value={newStaff.phone}
                  onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                  placeholder="0988 123 456"
                  className="px-3.5 py-2.5 rounded-xl bg-[#FFF1E8] text-[#231A11] focus:outline-none focus:ring-2 focus:ring-[#DE3618]/20 border border-[#F2DFD1]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[#231A11]">Vai trò & Quyền hạn</label>
                <select
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl bg-[#FFF1E8] text-[#231A11] focus:outline-none border border-[#F2DFD1]"
                >
                  <option value="Bếp">Bếp phó / Phụ trách quầy chế biến (Chỉ xem đơn Bếp)</option>
                  <option value="Thu ngân">Thu ngân & Thu tiền (Tạo hóa đơn, nhận thanh toán)</option>
                  <option value="Phục vụ">Phục vụ bàn (Gọi món, kiểm tra bàn trống)</option>
                  <option value="Quản lý">Quản lý ca (Xem báo cáo ngày, sửa món)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsStaffModalOpen(false)}
                  className="px-4 py-2 rounded-full bg-[#FFF1E8] text-[#5C403A] font-bold hover:bg-[#FEEADC] transition-all"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#DE3618] text-white font-bold hover:bg-[#B91D00] transition-all shadow-sm"
                >
                  Xác nhận cấp quyền
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

