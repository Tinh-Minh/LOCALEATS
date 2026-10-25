import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { places } from "../data/places";

export default function MerchantDashboardPage() {
  const navigate = useNavigate();
  // Chọn quán mặc định cho chủ quán quản lý (ví dụ: Bánh Mì Huỳnh Hoa hoặc Phở Thìn Lò Đúc)
  const [selectedPlaceId, setSelectedPlaceId] = useState(2); // Bánh Mì Huỳnh Hoa
  const [activeTab, setActiveTab] = useState("overview"); // overview, menu, orders, promo, reviews

  const currentPlace = useMemo(() => {
    return places.find((p) => p.id === selectedPlaceId) || places[0];
  }, [selectedPlaceId]);

  // Quán đang mở cửa hay đóng cửa
  const [isOpen, setIsOpen] = useState(currentPlace.openNow);
  const [prepTime, setPrepTime] = useState("15-20 phút");

  // Danh sách thực đơn mẫu của quán
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Bánh Mì Thịt Nguội Pate Trứng Đặc Biệt",
      price: "65.000đ",
      salesCount: 428,
      status: "Còn món",
      isBestseller: true,
      image: "https://images.unsplash.com/photo-1559054663-e8d23213f55c?w=400&q=80",
    },
    {
      id: 2,
      name: "Bánh Mì Chả Lụa & Giò Thủ Truyền Thống",
      price: "55.000đ",
      salesCount: 215,
      status: "Còn món",
      isBestseller: false,
      image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&q=80",
    },
    {
      id: 3,
      name: "Bánh Mì Xíu Mại Trứng Muối Nước Sốt Đậm Đà",
      price: "60.000đ",
      salesCount: 184,
      status: "Tạm hết món",
      isBestseller: false,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
    },
    {
      id: 4,
      name: "Trà Tắc Mật Ong Khổng Lồ",
      price: "25.000đ",
      salesCount: 310,
      status: "Còn món",
      isBestseller: true,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    },
  ]);

  // Voucher ưu đãi dành cho khách tới từ app LOCALEATS
  const [promos, setPromos] = useState([
    {
      id: 1,
      code: "HUYNHHOA-LOCALEATS-10K",
      desc: "Giảm 10.000đ cho hóa đơn từ 100.000đ khi xuất trình chỉ đường app LOCALEATS",
      usedCount: 142,
      status: "Đang chạy",
    },
    {
      id: 2,
      code: "TANG-TRATAC",
      desc: "Tặng 1 ly trà tắc mật ong cho bàn từ 2 ổ bánh mì đặc biệt",
      usedCount: 88,
      status: "Đang chạy",
    },
  ]);

  // Toggle trạng thái món ăn
  const handleToggleItemStatus = (id) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Còn món" ? "Tạm hết món" : "Còn món",
            }
          : item
      )
    );
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FAF6F0] overflow-y-auto styled-scrollbar">
      {/* Merchant Top Header */}
      <div className="bg-white border-b border-[#F2EAE1] px-4 sm:px-8 py-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={currentPlace.image}
                alt={currentPlace.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-[#E84A27]/30 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 p-1 bg-[#E84A27] text-white rounded-full text-[10px] material-symbols-outlined shadow-sm">
                storefront
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wide">
                  Chủ Quán Đối Tác
                </span>
                <span className="text-gray-400 text-xs">• ID: #{currentPlace.id}</span>
              </div>
              <h1 className="text-lg sm:text-2xl font-black text-gray-900 tracking-tight mt-0.5 flex items-center gap-2">
                {currentPlace.name}
                <span className="text-amber-500 text-sm font-bold flex items-center">
                  ★ {currentPlace.rating}
                </span>
              </h1>
              <p className="text-xs text-gray-500 truncate max-w-sm sm:max-w-md">
                📍 {currentPlace.address} • {currentPlace.district}
              </p>
            </div>
          </div>

          {/* Quick Controls */}
          <div className="flex items-center gap-2.5 sm:self-center">
            {/* Chuyển nhanh giữa các quán mẫu */}
            <select
              value={selectedPlaceId}
              onChange={(e) => setSelectedPlaceId(Number(e.target.value))}
              className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:border-[#E84A27]"
            >
              {places.slice(0, 6).map((p) => (
                <option key={p.id} value={p.id}>
                  Quán: {p.name}
                </option>
              ))}
            </select>

            {/* Bật/Tắt đón khách */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-sm ${
                isOpen
                  ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/20"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              {isOpen ? "ĐANG MỞ CỬA" : "TẠM NGHỈ"}
            </button>

            {/* Đăng xuất & Về trang chủ */}
            <button
              onClick={() => {
                sessionStorage.removeItem("localeats_merchant_auth");
                navigate("/portal");
              }}
              className="bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold flex items-center gap-1 transition-all"
              title="Đăng xuất kênh đối tác"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
            <Link
              to="/"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold flex items-center gap-1 transition-all"
              title="Trở về bản đồ người dùng"
            >
              <span className="material-symbols-outlined text-base">map</span>
              <span className="hidden sm:inline">Về App</span>
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-5 overflow-x-auto no-scrollbar border-t border-gray-100 pt-3">
          {[
            { id: "overview", label: "Hiệu quả kinh doanh", icon: "monitoring" },
            { id: "menu", label: "Quản lý Menu & Giá món", icon: "menu_book" },
            { id: "orders", label: "Lượt khách ghé & Dẫn đường", icon: "near_me" },
            { id: "promo", label: "Mã giảm giá & Quà tặng", icon: "loyalty" },
            { id: "reviews", label: "Phản hồi & Đánh giá", icon: "forum" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#E84A27] text-white shadow-md shadow-[#E84A27]/25"
                  : "text-gray-600 hover:bg-orange-50 hover:text-[#E84A27]"
              }`}
            >
              <span className="material-symbols-outlined text-base">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-8 max-w-6xl w-full mx-auto flex-1 flex flex-col gap-6">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm">
            <span className="text-[11px] font-bold text-gray-500">Lượt xem trên bản đồ</span>
            <div className="text-2xl font-black text-gray-900 mt-1">4.280</div>
            <span className="text-[10px] text-emerald-600 font-bold mt-1 inline-block">
              +32% hôm nay
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm">
            <span className="text-[11px] font-bold text-gray-500">Khách bấm "Chỉ đường"</span>
            <div className="text-2xl font-black text-[#E84A27] mt-1">682</div>
            <span className="text-[10px] text-emerald-600 font-bold mt-1 inline-block">
              ~65% đến quán thực tế
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm">
            <span className="text-[11px] font-bold text-gray-500">Đánh giá trung bình</span>
            <div className="text-2xl font-black text-amber-500 mt-1">{currentPlace.rating} ★</div>
            <span className="text-[10px] text-gray-500 mt-1 inline-block">
              {currentPlace.reviews.toLocaleString()} lượt review
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm">
            <span className="text-[11px] font-bold text-gray-500">Thời gian chuẩn bị</span>
            <div className="text-2xl font-black text-blue-600 mt-1">{prepTime}</div>
            <span className="text-[10px] text-gray-500 mt-1 inline-block">Khách không phải chờ lâu</span>
          </div>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-black text-gray-900 text-sm sm:text-base flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#E84A27]">trending_up</span>
                  Lưu lượng khách tìm đến quán trong 24 Giờ qua
                </h3>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Giờ cao điểm: 11:30 - 13:00 & 18:00 - 20:30
                </span>
              </div>

              {/* Mock Activity Chart / Bars */}
              <div className="h-44 flex items-end justify-between gap-1 sm:gap-2 pt-6 px-2">
                {[
                  { time: "07h", val: 25 },
                  { time: "09h", val: 40 },
                  { time: "11h", val: 95 },
                  { time: "12h", val: 100 },
                  { time: "13h", val: 80 },
                  { time: "15h", val: 35 },
                  { time: "17h", val: 65 },
                  { time: "19h", val: 90 },
                  { time: "20h", val: 75 },
                  { time: "21h", val: 45 },
                  { time: "22h", val: 20 },
                ].map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div
                      style={{ height: `${item.val}%` }}
                      className={`w-full max-w-[28px] rounded-t-lg transition-all duration-500 ${
                        item.val >= 85
                          ? "bg-gradient-to-t from-[#E84A27] to-red-500 shadow-md shadow-[#E84A27]/25"
                          : "bg-orange-200 hover:bg-[#E84A27]/70"
                      }`}
                      title={`${item.time}: ${item.val} lượt khách`}
                    />
                    <span className="text-[10px] text-gray-400 font-medium">{item.time}</span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-orange-50/70 border border-orange-200/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#E84A27]">workspace_premium</span>
                  <span className="font-bold text-gray-900">
                    Gợi ý từ AI LOCALEATS: Quán của bạn đang đứng Top #{currentPlace.trendRank} món ngon khu vực!
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab("promo")}
                  className="px-3 py-1 bg-[#E84A27] text-white font-bold rounded-lg hover:bg-[#d43d1c]"
                >
                  Tạo ưu đãi ngay
                </button>
              </div>
            </div>

            {/* Quick Settings for Owner */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm flex flex-col gap-4">
              <h3 className="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2">
                <span className="material-symbols-outlined text-[#E84A27]">settings</span>
                Cài đặt vận hành quán
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Giờ đóng cửa dự kiến hôm nay</label>
                  <input
                    type="time"
                    defaultValue="22:30"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">Thời gian chờ dự kiến</label>
                  <select
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-800"
                  >
                    <option value="5-10 phút">5-10 phút (Nhanh)</option>
                    <option value="15-20 phút">15-20 phút (Bình thường)</option>
                    <option value="25-35 phút">25-35 phút (Đông khách)</option>
                  </select>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-gray-700 font-bold">Hiển thị thông báo HOT trên Map</span>
                  <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 font-black text-[10px]">
                    ĐANG BẬT
                  </span>
                </div>
              </div>

              <div className="mt-auto pt-3 border-t border-gray-100">
                <button
                  onClick={() => alert("Đã lưu các thiết lập vận hành của quán thành công!")}
                  className="w-full py-2.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 text-xs shadow-md transition-all"
                >
                  Lưu thay đổi vận hành
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Menu Management */}
        {activeTab === "menu" && (
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
              <div>
                <h3 className="font-black text-gray-900 text-base">Thực đơn & Tình trạng món ăn</h3>
                <p className="text-xs text-gray-500">
                  Cập nhật giá và bật/tắt món còn hoặc hết ngay tức thì để khách xem trên bản đồ nắm rõ.
                </p>
              </div>
              <button
                onClick={() => alert("Chức năng thêm món mới sẽ mở biểu mẫu cập nhật.")}
                className="px-4 py-2 bg-[#E84A27] text-white text-xs font-bold rounded-xl flex items-center gap-1 self-start sm:self-auto hover:bg-[#d43d1c]"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                Thêm món mới vào Menu
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl border border-gray-200 flex items-center gap-3.5 hover:shadow-sm transition-all"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover border border-gray-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-gray-900 text-xs sm:text-sm truncate">{item.name}</h4>
                      {item.isBestseller && (
                        <span className="px-1.5 py-0.2 rounded bg-red-100 text-red-600 font-black text-[9px] shrink-0">
                          BESTSELLER
                        </span>
                      )}
                    </div>
                    <div className="font-black text-[#E84A27] text-xs mt-0.5">{item.price}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">Đã bán {item.salesCount} phần tuần này</div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <button
                      onClick={() => handleToggleItemStatus(item.id)}
                      className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${
                        item.status === "Còn món"
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      }`}
                    >
                      {item.status}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Orders & Visitor Traffic */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5 flex flex-col gap-4">
            <h3 className="font-black text-gray-900 text-base flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600">near_me</span>
              Nhật ký thực khách dẫn đường tới quán qua LOCALEATS
            </h3>

            <div className="divide-y divide-gray-100 text-xs">
              {[
                { time: "18:42", origin: "Cách 1.4 km (Quận 1)", mode: "Xe máy", status: "Đang trên đường đến", eta: "5 phút nữa" },
                { time: "18:30", origin: "Cách 2.8 km (Bình Thạnh)", mode: "Xe máy", status: "Đã đến quán", eta: "Thành công" },
                { time: "18:15", origin: "Cách 850 m (Phường Bến Thành)", mode: "Đi bộ", status: "Đã đến quán", eta: "Thành công" },
                { time: "17:50", origin: "Cách 4.2 km (Quận 7)", mode: "Ô tô", status: "Đã đến quán", eta: "Thành công" },
              ].map((row, i) => (
                <div key={i} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-xl bg-orange-50 text-[#E84A27] font-black text-xs">
                      {row.time}
                    </span>
                    <div>
                      <div className="font-bold text-gray-900">{row.origin}</div>
                      <div className="text-[11px] text-gray-500">Di chuyển bằng: {row.mode}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      row.eta === "Thành công" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700 animate-pulse"
                    }`}>
                      {row.status}
                    </span>
                    <div className="text-[10px] text-gray-400 mt-0.5">{row.eta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Promo & Vouchers */}
        {activeTab === "promo" && (
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-black text-gray-900 text-base">Ưu đãi & Voucher kích cầu</h3>
                <p className="text-xs text-gray-500">
                  Tạo mã giảm giá hiển thị trực tiếp trong Popup bản đồ khi khách xem quán của bạn.
                </p>
              </div>
              <button
                onClick={() => alert("Tính năng tạo Voucher mới đã được kích hoạt!")}
                className="px-3.5 py-1.5 bg-[#E84A27] text-white text-xs font-bold rounded-xl"
              >
                + Tạo Voucher mới
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {promos.map((promo) => (
                <div key={promo.id} className="p-4 rounded-2xl border border-dashed border-orange-300 bg-orange-50/40 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xs text-[#E84A27] tracking-wider bg-white px-2.5 py-1 rounded-lg border border-orange-200 shadow-sm">
                      {promo.code}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {promo.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 font-medium">{promo.desc}</p>
                  <div className="text-[10px] text-gray-500 mt-auto pt-2 border-t border-orange-200/60">
                    Đã có <strong className="text-gray-900">{promo.usedCount}</strong> khách áp dụng mã này
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Reviews */}
        {activeTab === "reviews" && (
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5 flex flex-col gap-4">
            <h3 className="font-black text-gray-900 text-base">Đánh giá từ thực khách ghé quán</h3>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/70 text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <strong className="text-gray-900">Hoàng Nam (Food Reviewer)</strong>
                    <span className="text-amber-500 font-bold">★★★★★ (5.0)</span>
                  </div>
                  <span className="text-gray-400 text-[10px]">Hôm qua 19:20</span>
                </div>
                <p className="text-gray-700">
                  "Bánh mì ở đây pate cực kỳ béo ngậy, dùng app chỉ đường rất chính xác không bị lạc vào hẻm cụt. Sẽ quay lại thường xuyên!"
                </p>
                <div className="mt-2.5 flex items-center gap-2">
                  <button className="px-3 py-1 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-100 text-[11px]">
                    Trả lời phản hồi
                  </button>
                  <button className="px-3 py-1 text-emerald-600 font-bold text-[11px]">
                    ❤️ Cảm ơn khách
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
