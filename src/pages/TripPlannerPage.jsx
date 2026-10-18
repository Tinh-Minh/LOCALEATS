import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { places } from "../data/places";

// Các mẫu hành trình Food Tour mẫu được yêu thích
const sampleItineraries = [
  {
    id: "tour-vungtau",
    title: "Food Tour Xuyên Tỉnh: Sài Gòn ➔ Vũng Tàu",
    badge: "PHỔ BIẾN NHẤT",
    badgeColor: "bg-orange-500",
    distance: "105 km",
    duration: "2h 45p",
    vehicle: "car",
    description: "Cung đường biển lý tưởng: Xuất phát nạp năng lượng ở Sài Gòn, dừng chân ăn sáng Bánh mì Huỳnh Hoa, ghé tráng miệng và kết thúc bằng bữa hải sản tươi sống tại Vũng Tàu.",
    stops: [
      { id: 1, name: "Khởi hành: Trung tâm Sài Gòn", role: "start", address: "Quận 1, TP.HCM", stayTime: "08:00" },
      { id: 2, placeId: 2, name: "Bánh Mì Huỳnh Hoa", role: "eat", address: "26 Lê Thị Riêng, Q.1", note: "Mua mang đi ăn trên xe", stayTime: "15 phút" },
      { id: 3, placeId: 10, name: "Chè Cung Đình Huế", role: "dessert", address: "110 Lý Tự Trọng, Q.1", note: "Giải nhiệt mát lành", stayTime: "20 phút" },
      { id: 4, placeId: 3, name: "Ốc & Hải Sản Tươi Biển", role: "destination", address: "Đường Trần Phú, Vũng Tàu", note: "Bữa chính tối ngắm hoàng hôn", stayTime: "1h 30p" },
    ],
  },
  {
    id: "tour-night",
    title: "Càn Quét Ẩm Thực Đêm Sài Gòn: Q.1 ➔ Q.4 ➔ Q.5",
    badge: "VIRAL BÙNG NỔ",
    badgeColor: "bg-red-500",
    distance: "14.2 km",
    duration: "3h 30p",
    vehicle: "bike",
    description: "Tour xe máy vi vu phố đêm: Ăn tối phở nóng hổi, nhậu ốc vỉa hè Vĩnh Khánh náo nhiệt, ghé tráng miệng chè cổ truyền Chợ Lớn.",
    stops: [
      { id: 1, name: "Khởi hành: Nhà Thờ Đức Bà", role: "start", address: "Bến Nghé, Q.1", stayTime: "18:00" },
      { id: 2, placeId: 1, name: "Phở Thìn Lò Đúc", role: "eat", address: "138 Lê Duẩn, Q.1", note: "Phở bò sốt vang nóng hổi", stayTime: "45 phút" },
      { id: 3, placeId: 3, name: "Ốc Oanh", role: "eat", address: "534 Vĩnh Khánh, Q.4", note: "Ốc hương nướng muối ớt & chém gió", stayTime: "1h 15p" },
      { id: 4, placeId: 9, name: "Hủ Tiếu Nam Vang Liến Húa", role: "eat", address: "68 Trần Hưng Đạo, Q.5", note: "Ăn khuya nước lèo ngọt thanh", stayTime: "30 phút" },
    ],
  },
  {
    id: "tour-comfort",
    title: "Hành Trình Thanh Vị & Cơm Nhà Cổ Truyền",
    badge: "GIA ĐÌNH & BẠN BÈ",
    badgeColor: "bg-emerald-600",
    distance: "8.6 km",
    duration: "2h 00p",
    vehicle: "car",
    description: "Lựa chọn hoàn hảo cho ngày cuối tuần: Thưởng thức cơm tấm sườn than hoa, gỏi cuốn thanh mát và trà sữa trân châu.",
    stops: [
      { id: 1, name: "Khởi hành: Bitexco Tower", role: "start", address: "Quận 1, TP.HCM", stayTime: "11:30" },
      { id: 2, placeId: 5, name: "Cơm Tấm Thuận Kiều", role: "eat", address: "432 Thuận Kiều, Q.11", note: "Cơm tấm sườn bì chả nướng", stayTime: "45 phút" },
      { id: 3, placeId: 8, name: "Gỏi Cuốn Bà Tư", role: "eat", address: "45 Hai Bà Trưng, Q.1", note: "Gỏi cuốn tôm thịt thanh đạm", stayTime: "25 phút" },
    ],
  },
];

export default function TripPlannerPage() {
  const navigate = useNavigate();

  // Điểm xuất phát & Điểm kết thúc của hành trình tùy chỉnh (người dùng tự do nhập)
  const [startPoint, setStartPoint] = useState("");
  const [destinationPoint, setDestinationPoint] = useState("");
  const [vehicle, setVehicle] = useState("car"); // 'bike', 'car'

  // Danh sách các trạm dừng chân ẩm thực do người dùng tự chọn (không fix cứng)
  const [selectedStops, setSelectedStops] = useState([]);

  const [searchPlaceQuery, setSearchPlaceQuery] = useState("");
  const [showAddStopModal, setShowAddStopModal] = useState(false);

  // Thêm trạm dừng
  const handleAddStop = (place) => {
    if (!selectedStops.some((p) => p.id === place.id)) {
      setSelectedStops([...selectedStops, place]);
    }
    setShowAddStopModal(false);
  };

  // Xóa trạm dừng
  const handleRemoveStop = (placeId) => {
    setSelectedStops(selectedStops.filter((p) => p.id !== placeId));
  };

  // Di chuyển thứ tự trạm dừng (Lên / Xuống)
  const handleMoveStop = (index, direction) => {
    const newStops = [...selectedStops];
    const targetIndex = index + direction;
    if (targetIndex >= 0 && targetIndex < newStops.length) {
      const temp = newStops[index];
      newStops[index] = newStops[targetIndex];
      newStops[targetIndex] = temp;
      setSelectedStops(newStops);
    }
  };

  // Tính tổng quãng đường ước tính dựa trên các trạm người dùng chọn (km)
  const totalKm = selectedStops.length
    ? selectedStops.reduce((sum, p) => sum + (p.distanceKm || 2), 0).toFixed(1)
    : "0.0";

  // Áp dụng tour mẫu
  const handleApplySample = (tour) => {
    setStartPoint(tour.stops[0].name);
    setDestinationPoint(tour.stops[tour.stops.length - 1].name);
    setVehicle(tour.vehicle);

    const tourPlaces = tour.stops
      .filter((s) => s.placeId)
      .map((s) => places.find((p) => p.id === s.placeId))
      .filter(Boolean);

    setSelectedStops(tourPlaces);
  };

  // Bắt đầu chuyến đi -> Điều hướng sang MapPage với toàn bộ chuỗi trạm dừng và vẽ lộ trình
  const handleStartTrip = () => {
    if (!selectedStops.length) {
      alert("Vui lòng chọn ít nhất 1 hoặc nhiều quán ăn dừng chân vào kế hoạch trước khi bắt đầu!");
      return;
    }

    // Chuẩn bị danh sách trạm dừng theo thứ tự người dùng đã thêm/sắp xếp
    const stopsData = selectedStops.map((place, idx) => ({
      id: place.id,
      name: place.name,
      address: place.address,
      lat: place.lat,
      lng: place.lng,
      category: place.category,
      order: idx + 1,
      stopLetter: String.fromCharCode(66 + idx),
    }));

    navigate("/", {
      state: {
        itineraryStops: stopsData,
        selectedPlaceId: stopsData[0].id,
        vehicle,
        startPointName: startPoint,
        destinationPointName: destinationPoint,
        isFoodTourTrip: true,
      },
    });
  };

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Lưu kế hoạch chuyến đi vào bộ sưu tập cá nhân
  const handleSaveTrip = () => {
    if (!selectedStops.length) {
      alert("Vui lòng chọn ít nhất 1 quán ăn trước khi lưu chuyến đi!");
      return;
    }

    const tripData = {
      id: "trip-" + Date.now(),
      title: `${startPoint || "Điểm xuất phát"} ➔ ${destinationPoint || "Điểm đến"}`,
      startPoint,
      destinationPoint,
      vehicle,
      stops: selectedStops,
      totalKm,
      savedAt: new Date().toLocaleDateString("vi-VN"),
    };

    try {
      const existingTrips = JSON.parse(localStorage.getItem("localeats_saved_trips") || "[]");
      existingTrips.unshift(tripData);
      localStorage.setItem("localeats_saved_trips", JSON.stringify(existingTrips));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const filteredPlacesToAdd = places.filter(
    (p) =>
      !selectedStops.some((s) => s.id === p.id) &&
      (p.name.toLowerCase().includes(searchPlaceQuery.toLowerCase()) ||
        p.address.toLowerCase().includes(searchPlaceQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchPlaceQuery.toLowerCase()))
  );

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar bg-[#FDFBF7] page-enter pb-16">
      {/* Top Banner Tiêu Chuẩn Hành Trình */}
      <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-red-500/10 border-b border-orange-200/80 px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 bg-[#E84A27] text-white text-[11px] font-black px-2.5 py-0.5 rounded-full">
            <span className="material-symbols-outlined text-[14px]">alt_route</span>
            SMART FOOD TOUR PLANNER
          </span>
          <span className="text-[12px] text-gray-700 hidden sm:inline">
            Lập kế hoạch chuyến đi nhiều điểm dừng • Ghé quán ngon trên suốt hành trình di chuyển
          </span>
        </div>
        <span className="text-[11px] font-bold text-[#E84A27] bg-white px-2.5 py-0.5 rounded-full border border-orange-100 shadow-sm">
          Tối ưu lộ trình 1-chạm
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 animate-fadeIn">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-100 text-[#E84A27] text-[11px] font-black px-3 py-1 rounded-full mb-2">
              <span className="material-symbols-outlined text-[15px]">route</span>
              THIẾT LẬP HÀNH TRÌNH ĐA ĐIỂM DỪNG
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Kế Hoạch Chuyến Đi & <span className="gradient-text-premium">Food Tour Ẩm Thực</span>
            </h1>
            <p className="text-[13px] text-gray-600 mt-1 max-w-2xl leading-relaxed">
              Bạn sắp có chuyến đi xa (TP.HCM ➔ Vũng Tàu, Đà Lạt, Phan Thiết) hoặc muốn càn quét ẩm thực phố đêm? Hãy chọn trước các quán ăn muốn dừng chân dọc đường, hệ thống sẽ kết nối thành một lộ trình hoàn hảo mà không cần phải tìm lại từng quán!
            </p>
          </div>

          {/* Nút Lưu Chuyến Đi Vào Bộ Sưu Tập */}
          <button
            onClick={handleSaveTrip}
            className={`flex items-center justify-center gap-2 px-5 h-11 rounded-full text-[13px] font-bold transition-all shadow-md active:scale-95 shrink-0 ${
              savedSuccess
                ? "bg-emerald-600 text-white shadow-emerald-600/30 ring-2 ring-emerald-400"
                : "bg-white hover:bg-orange-50 text-gray-800 hover:text-[#E84A27] border border-gray-200/90 shadow-gray-200/50 hover:shadow-lg"
            }`}
          >
            <span className="material-symbols-outlined text-[19px] text-[#E84A27]">
              {savedSuccess ? "check_circle" : "bookmark_add"}
            </span>
            {savedSuccess ? "Đã lưu vào bộ sưu tập!" : "Lưu chuyến đi"}
          </button>
        </div>

        {/* Khung Lập Hành Trình Tương Tác */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Cột 1 & 2: Bảng lộ trình Timeline các điểm dừng chân */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-200/90 shadow-sm p-5 sm:p-6 animate-slideInUp">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-orange-100 text-[#E84A27] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">flag</span>
                </span>
                <div>
                  <h3 className="font-extrabold text-[16px] text-gray-900">Chuỗi Điểm Dừng Trên Lộ Trình</h3>
                  <p className="text-[11px] text-gray-500">Tự động sắp xếp theo thứ tự thuận tiện nhất trên bản đồ</p>
                </div>
              </div>

              {/* Lựa chọn phương tiện */}
              <div className="flex bg-gray-100 p-1 rounded-full gap-1">
                <button
                  onClick={() => setVehicle("bike")}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                    vehicle === "bike" ? "bg-[#E84A27] text-white shadow-sm" : "text-gray-600"
                  }`}
                >
                  🏍️ Xe máy
                </button>
                <button
                  onClick={() => setVehicle("car")}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                    vehicle === "car" ? "bg-[#E84A27] text-white shadow-sm" : "text-gray-600"
                  }`}
                >
                  🚗 Ô tô
                </button>
              </div>
            </div>

            {/* TIMELINE LIST */}
            <div className="space-y-4 relative">
              {/* Đường kẻ dọc kết nối các trạm dừng */}
              <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-dashed bg-gradient-to-b from-emerald-500 via-[#E84A27] to-blue-500 z-0" />

              {/* 1. Điểm Khởi Hành */}
              <div className="relative z-10 flex items-start gap-3 bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-3.5">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[12px] shrink-0 shadow-md">
                  A
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">Điểm khởi hành</div>
                  <input
                    type="text"
                    value={startPoint}
                    onChange={(e) => setStartPoint(e.target.value)}
                    placeholder="Nhập địa chỉ xuất phát hoặc để trống lấy GPS hiện tại..."
                    className="w-full font-extrabold text-[14px] text-gray-900 bg-transparent outline-none mt-0.5 border-b border-emerald-200/60 focus:border-emerald-600 pb-0.5 placeholder:text-gray-400 placeholder:font-normal"
                  />
                </div>
              </div>

              {/* Thông báo nếu chưa thêm trạm dừng nào */}
              {selectedStops.length === 0 && (
                <div className="relative z-10 p-5 rounded-2xl border border-dashed border-gray-200 bg-gray-50/60 text-center">
                  <span className="material-symbols-outlined text-3xl text-orange-400 mb-1">add_location_alt</span>
                  <div className="font-bold text-gray-700 text-[13px]">Chưa có quán ăn dừng chân nào</div>
                  <p className="text-gray-500 text-[11px] mt-0.5">
                    Bấm vào nút bên dưới để chọn các quán ăn ngon bạn muốn ghé dọc đường đi!
                  </p>
                </div>
              )}

              {/* 2. Danh sách các Quán Ăn Dừng Chân */}
              {selectedStops.map((place, index) => {
                const stopLetter = String.fromCharCode(66 + index); // B, C, D...
                return (
                  <div
                    key={place.id}
                    className="relative z-10 flex items-center justify-between gap-3 bg-white border border-gray-200/90 rounded-2xl p-3.5 shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {/* Huy hiệu trạm dừng */}
                      <div className="w-8 h-8 rounded-full bg-[#E84A27] text-white flex items-center justify-center font-extrabold text-[12px] shrink-0 shadow-md">
                        {stopLetter}
                      </div>

                      {/* Ảnh quán */}
                      <img
                        src={place.image}
                        alt={place.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-gray-100"
                      />

                      {/* Chi tiết quán */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-[14px] text-gray-900 group-hover:text-[#E84A27] transition-colors truncate">
                            {place.name}
                          </h4>
                          <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.2 rounded-md">
                            {place.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 truncate mt-0.5">
                          📍 {place.address} • Món nổi bật: <strong className="text-gray-700">{place.specialty}</strong>
                        </p>
                      </div>
                    </div>

                    {/* Điều khiển thứ tự & Xóa trạm */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleMoveStop(index, -1)}
                        disabled={index === 0}
                        title="Di chuyển lên trước"
                        className="w-7 h-7 rounded-lg hover:bg-gray-100 text-gray-500 disabled:opacity-20 flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                      </button>
                      <button
                        onClick={() => handleMoveStop(index, 1)}
                        disabled={index === selectedStops.length - 1}
                        title="Di chuyển xuống sau"
                        className="w-7 h-7 rounded-lg hover:bg-gray-100 text-gray-500 disabled:opacity-20 flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                      </button>
                      <button
                        onClick={() => handleRemoveStop(place.id)}
                        title="Xóa điểm dừng này"
                        className="w-7 h-7 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-colors ml-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Nút Thêm Quán Dừng Chân */}
              <div className="relative z-10 pl-11">
                <button
                  onClick={() => setShowAddStopModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-orange-300 hover:border-[#E84A27] bg-orange-50/50 hover:bg-orange-50 text-[#E84A27] font-extrabold text-[12px] transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  Thêm Quán Ăn Dừng Chân Vào Cung Đường
                </button>
              </div>

              {/* 3. Điểm Đến Cuối Cùng */}
              <div className="relative z-10 flex items-start gap-3 bg-blue-50/70 border border-blue-200/90 rounded-2xl p-3.5">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[12px] shrink-0 shadow-md">
                  {String.fromCharCode(66 + selectedStops.length)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wide">Điểm đến cuối cùng</div>
                  <input
                    type="text"
                    value={destinationPoint}
                    onChange={(e) => setDestinationPoint(e.target.value)}
                    placeholder="Nhập địa chỉ hoặc tỉnh thành điểm đến (ví dụ: Vũng Tàu, Đà Lạt...)"
                    className="w-full font-extrabold text-[14px] text-gray-900 bg-transparent outline-none mt-0.5 border-b border-blue-200/60 focus:border-blue-600 pb-0.5 placeholder:text-gray-400 placeholder:font-normal"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Cột 3: Tóm Tắt & Dự Toán Chuyến Đi */}
          <div className="flex flex-col gap-5">
            {/* Thẻ Thống Kê Hành Trình */}
            <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-5 animate-slideInUp">
              <h3 className="font-extrabold text-[15px] text-gray-900 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#E84A27]">analytics</span>
                Tổng Quan Chuyến Đi
              </h3>

              <div className="space-y-3.5 pb-4 border-b border-gray-100">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-gray-500">Ước tính cự ly:</span>
                  <span className="font-extrabold text-gray-900">{totalKm} km</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-gray-500">Tổng điểm dừng ăn uống:</span>
                  <span className="font-extrabold text-[#E84A27]">{selectedStops.length} quán</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-gray-500">Phương tiện di chuyển:</span>
                  <span className="font-extrabold text-gray-900">{vehicle === "car" ? "Ô tô (Xe hơi)" : "Xe máy"}</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-gray-500">Thời gian dừng ăn dự kiến:</span>
                  <span className="font-extrabold text-emerald-600">~{selectedStops.length * 35} phút</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleStartTrip}
                  className="w-full flex items-center justify-center gap-2 h-11 rounded-full bg-[#E84A27] text-white font-bold text-[12px] shadow-lg shadow-[#E84A27]/25 hover:bg-[#c93d1f] transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">near_me</span>
                  Khởi Hành Ngay Trên Bản Đồ
                </button>
                <p className="text-[10px] text-gray-400 text-center mt-2">
                  Bản đồ sẽ tự động dẫn đường từ điểm A tới quán B, sau đó tiếp tục tới C và điểm cuối.
                </p>
              </div>
            </div>

            {/* Thẻ Mẹo Cho Chuyến Đi */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border border-amber-200/80 p-4.5 text-[11px] text-gray-700 leading-relaxed shadow-sm">
              <div className="flex items-center gap-1.5 font-bold text-amber-800 mb-1">
                <span className="material-symbols-outlined text-[16px] text-amber-600">tips_and_updates</span>
                Mẹo tối ưu Food Tour:
              </div>
              Nên chọn các quán nằm gần trục đường lộ lớn (Quốc lộ 51, Đại lộ Mai Chí Thọ) để tiết kiệm thời gian quay đầu xe. Bạn có thể bấm nút mũi tên để đổi thứ tự ghé quán thuận chiều nhất!
            </div>
          </div>
        </div>

        {/* Các Lộ Trình Food Tour Mẫu Được Yêu Thích Nhất */}
        <div className="animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-[18px] font-extrabold text-gray-900 flex items-center gap-2">
                <span>🌟</span> Lộ Trình Food Tour Mẫu Được Đề Xuất
              </h2>
              <p className="text-[12px] text-gray-500">Nhấn để áp dụng ngay bộ lộ trình có sẵn không cần thiết lập lại</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {sampleItineraries.map((tour) => (
              <div
                key={tour.id}
                className="bg-white rounded-3xl border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className={`text-[9px] font-black text-white px-2.5 py-0.5 rounded-full ${tour.badgeColor}`}>
                      {tour.badge}
                    </span>
                    <span className="text-[11px] font-bold text-gray-500">
                      {tour.distance} • ~{tour.duration}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-[15px] text-gray-900 group-hover:text-[#E84A27] transition-colors leading-snug mb-2">
                    {tour.title}
                  </h3>

                  <p className="text-[11px] text-gray-600 line-clamp-3 leading-relaxed mb-4">
                    {tour.description}
                  </p>

                  {/* Danh sách các chặng dừng */}
                  <div className="space-y-2 mb-4 bg-gray-50/80 p-3 rounded-2xl border border-gray-100">
                    {tour.stops.map((stop, sIndex) => (
                      <div key={stop.id} className="flex items-center gap-2 text-[11px]">
                        <span className="w-5 h-5 rounded-full bg-white border border-gray-300 text-gray-700 font-extrabold text-[9px] flex items-center justify-center shrink-0">
                          {sIndex + 1}
                        </span>
                        <span className="font-bold text-gray-800 truncate flex-1">{stop.name}</span>
                        <span className="text-[10px] text-gray-400 shrink-0">{stop.stayTime}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleApplySample(tour)}
                  className="w-full flex items-center justify-center gap-1.5 h-9 rounded-full bg-gray-900 hover:bg-[#E84A27] text-white text-[11px] font-bold transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-[14px]">tune</span>
                  Áp dụng & Tùy chỉnh lộ trình này
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Chọn Quán Ăn Thêm Vào Lộ Trình */}
      {showAddStopModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 animate-scaleIn">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-orange-100 text-[#E84A27] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">restaurant</span>
                </span>
                <h3 className="font-extrabold text-[16px] text-gray-900">Chọn Quán Dừng Chân</h3>
              </div>
              <button
                onClick={() => setShowAddStopModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Tìm kiếm quán */}
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-3.5 h-10 gap-2 mb-4 focus-within:border-[#E84A27]">
              <span className="material-symbols-outlined text-gray-400 text-[18px]">search</span>
              <input
                type="text"
                value={searchPlaceQuery}
                onChange={(e) => setSearchPlaceQuery(e.target.value)}
                placeholder="Tìm quán ăn theo tên hoặc món ăn..."
                className="bg-transparent flex-1 text-[12px] outline-none placeholder-gray-400"
              />
            </div>

            {/* Danh sách quán có thể thêm */}
            <div className="max-h-80 overflow-y-auto space-y-2.5 styled-scrollbar pr-1">
              {filteredPlacesToAdd.map((place) => (
                <div
                  key={place.id}
                  onClick={() => handleAddStop(place)}
                  className="flex items-center justify-between p-3 rounded-2xl border border-gray-100 hover:border-[#E84A27] hover:bg-orange-50/50 cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-11 h-11 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-extrabold text-[13px] text-gray-900 group-hover:text-[#E84A27] transition-colors truncate">
                        {place.name}
                      </div>
                      <div className="text-[11px] text-gray-500 truncate">
                        {place.specialty} • ⭐ {place.rating}
                      </div>
                      <div className="text-[10px] text-gray-400 truncate">📍 {place.address}</div>
                    </div>
                  </div>

                  <span className="material-symbols-outlined text-[#E84A27] text-[20px] ml-2 shrink-0">
                    add_circle
                  </span>
                </div>
              ))}

              {filteredPlacesToAdd.length === 0 && (
                <div className="text-center py-8 text-gray-400 text-[12px]">
                  Không tìm thấy quán nào phù hợp
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
