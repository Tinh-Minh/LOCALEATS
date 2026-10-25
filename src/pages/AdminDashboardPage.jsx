import { useState, useMemo } from "react";
import { places as initialPlaces } from "../data/places";

export default function AdminDashboardPage() {
  const [places, setPlaces] = useState(initialPlaces);
  const [activeTab, setActiveTab] = useState("overview"); // overview, places, reports, system
  const [filterDistrict, setFilterDistrict] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPlaceToEdit, setSelectedPlaceToEdit] = useState(null);

  // New Place Form State
  const [newPlace, setNewPlace] = useState({
    name: "",
    category: "Phở",
    specialty: "",
    address: "",
    district: "Quận 1",
    price: "45.000đ - 80.000đ",
    rating: 4.8,
    lat: 10.775,
    lng: 106.700,
    hot: false,
    openNow: true,
    closeAt: "22:00",
  });

  // Analytics Stats
  const stats = useMemo(() => {
    const total = places.length;
    const hotCount = places.filter((p) => p.hot).length;
    const openCount = places.filter((p) => p.openNow).length;
    const avgRating = (
      places.reduce((acc, p) => acc + (Number(p.rating) || 4.0), 0) / (total || 1)
    ).toFixed(1);
    const totalVisits = places.reduce((acc, p) => acc + (p.reviews || 0) * 12, 0);

    return { total, hotCount, openCount, avgRating, totalVisits };
  }, [places]);

  // Filtered places table
  const filteredPlaces = useMemo(() => {
    return places.filter((p) => {
      const matchDistrict = filterDistrict === "all" || p.district === filterDistrict;
      const matchQuery =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.address.toLowerCase().includes(searchQuery.toLowerCase());
      return matchDistrict && matchQuery;
    });
  }, [places, filterDistrict, searchQuery]);

  // Toggle Hot status
  const handleToggleHot = (id) => {
    setPlaces((prev) =>
      prev.map((p) => (p.id === id ? { ...p, hot: !p.hot } : p))
    );
  };

  // Toggle Open status
  const handleToggleOpen = (id) => {
    setPlaces((prev) =>
      prev.map((p) => (p.id === id ? { ...p, openNow: !p.openNow } : p))
    );
  };

  // Delete place
  const handleDeletePlace = (id, name) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa quán "${name}" khỏi hệ thống LOCALEATS?`)) {
      setPlaces((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Handle Add New Place Submit
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newPlace.name.trim()) return;

    const newId = Math.max(...places.map((p) => p.id), 0) + 1;
    const created = {
      ...newPlace,
      id: newId,
      reviews: 1,
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80",
      votes: 120,
      trend: "+10%",
      trendRank: places.length + 1,
      distanceKm: 1.5,
      bikeMin: 8,
      carMin: 14,
      walkMin: 20,
    };

    setPlaces([created, ...places]);
    setIsAddModalOpen(false);
    setNewPlace({
      name: "",
      category: "Phở",
      specialty: "",
      address: "",
      district: "Quận 1",
      price: "45.000đ - 80.000đ",
      rating: 4.8,
      lat: 10.775,
      lng: 106.700,
      hot: false,
      openNow: true,
      closeAt: "22:00",
    });
  };

  // Distinct districts
  const districts = ["all", ...new Set(places.map((p) => p.district || "Quận 1"))];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F8F9FA] overflow-y-auto styled-scrollbar">
      {/* Top Banner / Breadcrumb */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-[#1F2937] text-white px-4 sm:px-8 py-5 border-b border-gray-700 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-red-600/30 text-red-400 border border-red-500/40 text-[10px] font-black tracking-widest uppercase">
                Admin Center
              </span>
              <span className="text-gray-400 text-xs">• Toàn quyền hệ thống</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black mt-1 tracking-tight flex items-center gap-2">
              <span className="material-symbols-outlined text-[#E84A27]">admin_panel_settings</span>
              Hệ Thống Quản Trị Trung Tâm LOCALEATS
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-0.5">
              Kiểm duyệt quán ăn, theo dõi lưu lượng truy cập thực tế và quản lý nội dung bản đồ toàn thành phố.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#E84A27] hover:bg-[#d43d1c] text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-lg shadow-[#E84A27]/30 transition-all hover:scale-105 active:scale-95"
            >
              <span className="material-symbols-outlined text-base">add_business</span>
              Thêm Quán Ăn Mới
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-gray-800/80 px-3 py-2 rounded-xl border border-gray-700 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-gray-300">Máy chủ ổn định</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto no-scrollbar pt-2 border-t border-gray-800">
          {[
            { id: "overview", label: "Tổng quan & Thống kê", icon: "dashboard" },
            { id: "places", label: `Quản lý Quán ăn (${places.length})`, icon: "restaurant" },
            { id: "reports", label: "Báo cáo vi phạm & Đánh giá", icon: "flag" },
            { id: "system", label: "Cấu hình Bản đồ & GPS", icon: "settings" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined text-base">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-8 max-w-7xl w-full mx-auto flex-1 flex flex-col gap-6">
        {/* KPI Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm flex flex-col">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold">Tổng địa điểm</span>
              <span className="p-1.5 rounded-lg bg-orange-50 text-[#E84A27] material-symbols-outlined text-base">
                storefront
              </span>
            </div>
            <div className="text-2xl font-black text-gray-900">{stats.total}</div>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-0.5">
              <span className="material-symbols-outlined text-xs">trending_up</span> +3 quán tuần này
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm flex flex-col">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold">Quán Đang HOT</span>
              <span className="p-1.5 rounded-lg bg-red-50 text-red-600 material-symbols-outlined text-base">
                local_fire_department
              </span>
            </div>
            <div className="text-2xl font-black text-gray-900">{stats.hotCount}</div>
            <span className="text-[11px] text-red-500 font-semibold mt-1">Đang gắn ngọn lửa rực sáng</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm flex flex-col">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold">Đang mở cửa</span>
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 material-symbols-outlined text-base">
                schedule
              </span>
            </div>
            <div className="text-2xl font-black text-emerald-600">{stats.openCount}</div>
            <span className="text-[11px] text-gray-500 mt-1">Sẵn sàng phục vụ khách</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm flex flex-col">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold">Điểm TB Hệ thống</span>
              <span className="p-1.5 rounded-lg bg-amber-50 text-amber-500 material-symbols-outlined text-base">
                star
              </span>
            </div>
            <div className="text-2xl font-black text-gray-900">{stats.avgRating} ★</div>
            <span className="text-[11px] text-amber-600 font-semibold mt-1">Chất lượng cao</span>
          </div>

          <div className="col-span-2 lg:col-span-1 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm flex flex-col">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold">Lượt tìm & dẫn đường</span>
              <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600 material-symbols-outlined text-base">
                navigation
              </span>
            </div>
            <div className="text-2xl font-black text-blue-600">{stats.totalVisits.toLocaleString()}</div>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1">+18.4% so với tháng trước</span>
          </div>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Realtime Alert & Feed */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                    Nhật ký điều phối & Tương tác người dùng trực tiếp
                  </h3>
                </div>
                <span className="text-[11px] text-gray-400 font-medium">Cập nhật 5 giây trước</span>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-200/60 flex items-start gap-3">
                  <span className="p-2 rounded-lg bg-[#E84A27] text-white material-symbols-outlined text-sm">
                    local_fire_department
                  </span>
                  <div className="flex-1 text-xs">
                    <p className="font-bold text-gray-900">
                      Cụm ẩm thực Quận 1 & Quận 4 đang đạt mức lưu lượng dẫn đường kỷ lục
                    </p>
                    <p className="text-gray-600 mt-0.5">
                      Ốc Oanh và Bánh Mì Huỳnh Hoa ghi nhận hơn 1.200 lượt tìm đường trong 2 giờ qua.
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">Vừa xong</span>
                </div>

                <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/60 flex items-start gap-3">
                  <span className="p-2 rounded-lg bg-blue-600 text-white material-symbols-outlined text-sm">
                    rate_review
                  </span>
                  <div className="flex-1 text-xs">
                    <p className="font-bold text-gray-900">18 đánh giá mới đã được gửi lên hệ thống kiểm duyệt</p>
                    <p className="text-gray-600 mt-0.5">
                      Hình ảnh món ăn và hóa đơn xác thực vị trí GPS đạt tỷ lệ hợp lệ 94%.
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">4 phút trước</span>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/60 flex items-start gap-3">
                  <span className="p-2 rounded-lg bg-emerald-600 text-white material-symbols-outlined text-sm">
                    verified
                  </span>
                  <div className="flex-1 text-xs">
                    <p className="font-bold text-gray-900">Chủ quán "Phở Thìn Lò Đúc" đã kích hoạt gói tài trợ VIP</p>
                    <p className="text-gray-600 mt-0.5">
                      Gia hạn hiển thị ưu đãi tặng nước ngọt đến hết ngày 30/11/2026.
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">15 phút trước</span>
                </div>
              </div>

              {/* Quick Admin Actions */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTab("places")}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-all"
                >
                  Xem danh sách {places.length} quán →
                </button>
                <button
                  onClick={() => alert("Đã gửi thông báo cập nhật bản đồ tới toàn bộ người dùng đang online.")}
                  className="px-3 py-1.5 rounded-lg bg-orange-100 hover:bg-orange-200 text-[#E84A27] text-xs font-bold transition-all"
                >
                  Phát thông báo hệ thống (Broadcast)
                </button>
              </div>
            </div>

            {/* Quick System Monitor */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm flex flex-col gap-4">
              <h3 className="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2">
                <span className="material-symbols-outlined text-[#E84A27]">dns</span>
                Tình trạng Hạ tầng Bản đồ
              </h3>

              <div className="space-y-3.5 text-xs">
                <div>
                  <div className="flex justify-between text-gray-600 mb-1">
                    <span>Tile Server (OpenFreeMap)</span>
                    <span className="text-emerald-600 font-bold">100% Hoạt động</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full w-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-gray-600 mb-1">
                    <span>OSRM Routing Engine</span>
                    <span className="text-emerald-600 font-bold">99.8% Tốc độ cao</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full w-[99.8%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-gray-600 mb-1">
                    <span>Độ trễ GPS Định vị Browser</span>
                    <span className="text-gray-900 font-bold">~42ms</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-[92%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-gray-600 mb-1">
                    <span>Bộ nhớ đệm MapLibre Worker</span>
                    <span className="text-gray-900 font-bold">508 KB (Tối ưu)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full w-[25%]"></div>
                  </div>
                </div>
              </div>

              <div className="mt-auto p-3 rounded-xl bg-gray-50 border border-gray-200 text-[11px] text-gray-600">
                💡 <span className="font-bold">Mẹo Admin:</span> Để tối ưu trải nghiệm người dùng, các quán có đánh giá từ 4.8★ trở lên sẽ tự động được ưu tiên kích hoạt ngọn lửa lửa bùng cháy trên bản đồ.
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Manage Places */}
        {activeTab === "places" && (
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden flex flex-col">
            {/* Search & Filter Toolbar */}
            <div className="p-4 border-b border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50/50">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-sm">
                    search
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm tên quán, món ăn..."
                    className="w-full pl-9 pr-3 py-1.5 bg-white border border-gray-300 rounded-xl text-xs font-medium focus:outline-none focus:border-[#E84A27]"
                  />
                </div>

                <select
                  value={filterDistrict}
                  onChange={(e) => setFilterDistrict(e.target.value)}
                  className="bg-white border border-gray-300 rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-[#E84A27]"
                >
                  {districts.map((d) => (
                    <option key={d} value={d}>
                      {d === "all" ? "Tất cả quận/huyện" : d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 w-full sm:w-auto justify-end">
                <span>Hiển thị: <strong className="text-gray-900">{filteredPlaces.length}</strong> quán</span>
              </div>
            </div>

            {/* Places Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100/70 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Quán ăn</th>
                    <th className="py-3 px-3">Danh mục</th>
                    <th className="py-3 px-3">Khu vực</th>
                    <th className="py-3 px-3 text-center">Đánh giá</th>
                    <th className="py-3 px-3 text-center">Ngọn lửa HOT</th>
                    <th className="py-3 px-3 text-center">Trạng thái</th>
                    <th className="py-3 px-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPlaces.map((p) => (
                    <tr key={p.id} className="hover:bg-orange-50/40 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-10 h-10 rounded-xl object-cover shrink-0 border border-gray-200"
                          />
                          <div>
                            <div className="font-bold text-gray-900 text-xs sm:text-sm">{p.name}</div>
                            <div className="text-[11px] text-gray-500 truncate max-w-[200px] sm:max-w-xs">
                              {p.specialty}
                            </div>
                            <div className="text-[10px] text-gray-400">{p.price}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span className="px-2.5 py-1 rounded-full bg-orange-100 text-[#E84A27] font-bold text-[10px]">
                          {p.category}
                        </span>
                      </td>

                      <td className="py-3 px-3 font-medium text-gray-700">
                        {p.district || "Quận 1"}
                      </td>

                      <td className="py-3 px-3 text-center">
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-amber-50 text-amber-600 font-black border border-amber-200/80">
                          {p.rating} ★
                        </span>
                      </td>

                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => handleToggleHot(p.id)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-black transition-all flex items-center gap-1 mx-auto ${
                            p.hot
                              ? "bg-red-500 text-white shadow-sm shadow-red-500/30"
                              : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                          }`}
                        >
                          <span className="material-symbols-outlined text-[13px]">local_fire_department</span>
                          {p.hot ? "BÙNG NỔ" : "Bình thường"}
                        </button>
                      </td>

                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => handleToggleOpen(p.id)}
                          className={`px-2 py-1 rounded-full text-[10px] font-bold transition-all ${
                            p.openNow
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {p.openNow ? "Đang mở cửa" : "Đã đóng cửa"}
                        </button>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleDeletePlace(p.id, p.name)}
                            title="Xóa quán"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <span className="material-symbols-outlined text-base">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Reports */}
        {activeTab === "reports" && (
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm flex flex-col gap-4">
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-500">flag</span>
              Hàng đợi Báo cáo vi phạm & Khiếu nại từ thực khách
            </h3>
            <p className="text-xs text-gray-500">
              Kiểm tra các phản ánh về giá cả không đúng menu, quán đã đổi vị trí hoặc chất lượng phục vụ.
            </p>

            <div className="divide-y divide-gray-100 mt-2">
              <div className="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 font-bold text-[10px]">
                      Báo sai giờ đóng cửa
                    </span>
                    <strong className="text-gray-900 text-xs">Quán Bún Bò Huế Cô Ri</strong>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Người dùng @nguyen_minh phản ánh quán đóng cửa lúc 20:30 thay vì 21:00 như niêm yết.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => alert("Đã cập nhật giờ hoạt động chính xác!")}
                    className="px-3 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-lg hover:bg-emerald-700"
                  >
                    Duyệt & Đổi giờ
                  </button>
                  <button className="px-3 py-1.5 bg-gray-100 text-gray-600 font-medium text-xs rounded-lg hover:bg-gray-200">
                    Bỏ qua
                  </button>
                </div>
              </div>

              <div className="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-700 font-bold text-[10px]">
                      Đề xuất cập nhật Menu
                    </span>
                    <strong className="text-gray-900 text-xs">Ốc Oanh - Vĩnh Khánh</strong>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Chủ quán tải lên thực đơn mới: Thêm món Càng ghẹ rang muối tuyết.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => alert("Đã duyệt món mới vào hồ sơ quán!")}
                    className="px-3 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-lg hover:bg-emerald-700"
                  >
                    Phê duyệt món
                  </button>
                  <button className="px-3 py-1.5 bg-gray-100 text-gray-600 font-medium text-xs rounded-lg hover:bg-gray-200">
                    Xem ảnh menu
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: System Config */}
        {activeTab === "system" && (
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm flex flex-col gap-4">
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
              <span className="material-symbols-outlined text-[#E84A27]">tune</span>
              Cấu hình Bản đồ & Hệ thống GPS LOCALEATS
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                <h4 className="font-bold text-xs text-gray-900 mb-1">Độ nhạy ngọn lửa HOT trên Map</h4>
                <p className="text-[11px] text-gray-500 mb-3">
                  Tự động kích hoạt hiệu ứng lửa bùng cháy khi đạt ngưỡng đánh giá hoặc tương tác cao.
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#E84A27]">≥ 4.8★</span>
                  <input type="range" min="4.0" max="5.0" step="0.1" defaultValue="4.8" className="flex-1 accent-[#E84A27]" />
                  <span className="text-xs text-gray-600">5.0★</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                <h4 className="font-bold text-xs text-gray-900 mb-1">Thời gian lưu bộ nhớ GPS (Cache TTL)</h4>
                <p className="text-[11px] text-gray-500 mb-3">
                  Thời gian ghi nhớ toạ độ GPS của thiết bị để tránh gửi request định vị lặp lại liên tục.
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-blue-600">60 Giây</span>
                  <input type="range" min="15" max="180" step="15" defaultValue="60" className="flex-1 accent-blue-600" />
                  <span className="text-xs text-gray-600">180s</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Thêm Quán Ăn Mới */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200 animate-scaleUp">
            <div className="p-5 bg-gradient-to-r from-gray-900 to-gray-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#E84A27]">add_location_alt</span>
                <h3 className="font-bold text-base">Thêm Quán Ăn Vào Hệ Thống Bản Đồ</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-700 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Tên quán ăn (*)</label>
                <input
                  type="text"
                  required
                  value={newPlace.name}
                  onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })}
                  placeholder="Ví dụ: Bún Thịt Nướng Bà Ba"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#E84A27]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Danh mục món</label>
                  <select
                    value={newPlace.category}
                    onChange={(e) => setNewPlace({ ...newPlace, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#E84A27]"
                  >
                    <option value="Phở">Phở</option>
                    <option value="Bánh Mì">Bánh Mì</option>
                    <option value="Hải Sản">Hải Sản / Ốc</option>
                    <option value="Cơm Tấm">Cơm Tấm</option>
                    <option value="Bún Bò">Bún Bò</option>
                    <option value="Bún Đậu">Bún Đậu</option>
                    <option value="Lẩu">Lẩu</option>
                    <option value="Nướng">Nướng / BBQ</option>
                    <option value="Trà Sữa">Trà Sữa / Đồ Uống</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Quận / Huyện</label>
                  <select
                    value={newPlace.district}
                    onChange={(e) => setNewPlace({ ...newPlace, district: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#E84A27]"
                  >
                    <option value="Quận 1">Quận 1</option>
                    <option value="Quận 3">Quận 3</option>
                    <option value="Quận 4">Quận 4</option>
                    <option value="Quận 5">Quận 5</option>
                    <option value="Quận 7">Quận 7</option>
                    <option value="Bình Thạnh">Bình Thạnh</option>
                    <option value="Thủ Đức">TP. Thủ Đức</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Địa chỉ chi tiết</label>
                <input
                  type="text"
                  required
                  value={newPlace.address}
                  onChange={(e) => setNewPlace({ ...newPlace, address: e.target.value })}
                  placeholder="Ví dụ: 124 Nguyễn Đình Chiểu, P. Đa Kao"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#E84A27]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Món ăn đặc sản / Nổi bật</label>
                <input
                  type="text"
                  value={newPlace.specialty}
                  onChange={(e) => setNewPlace({ ...newPlace, specialty: e.target.value })}
                  placeholder="Ví dụ: Bún thịt nướng chả giò giòn rụm"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#E84A27]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Mức giá</label>
                  <input
                    type="text"
                    value={newPlace.price}
                    onChange={(e) => setNewPlace({ ...newPlace, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#E84A27]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Đánh giá ban đầu</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={newPlace.rating}
                    onChange={(e) => setNewPlace({ ...newPlace, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#E84A27]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700">
                  <input
                    type="checkbox"
                    checked={newPlace.hot}
                    onChange={(e) => setNewPlace({ ...newPlace, hot: e.target.checked })}
                    className="accent-[#E84A27] w-4 h-4"
                  />
                  Gắn ngọn lửa HOT bùng nổ ngay lập tức
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 font-bold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#E84A27] text-white font-bold hover:bg-[#d43d1c] shadow-lg shadow-[#E84A27]/25"
                >
                  Xác nhận Thêm Quán
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
