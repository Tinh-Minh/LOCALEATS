import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { places, trendingFoods } from "../data/places";

const timeTabs = [
  { id: "today", label: "24h Qua (Live)", icon: "bolt" },
  { id: "week", label: "Tuần Này", icon: "date_range" },
  { id: "month", label: "Tháng Này", icon: "calendar_today" },
];

export default function HotListPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("week");
  const [districtFilter, setDistrictFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);

  // Danh sách các quận có trong dữ liệu
  const districts = ["all", ...new Set(places.map((p) => p.district || "Quận 1"))];

  // Sắp xếp quán ăn theo độ hot (votes + rating)
  const sortedPlaces = [...places]
    .sort((a, b) => b.votes - a.votes)
    .filter((p) => districtFilter === "all" || (p.district || "Quận 1") === districtFilter);

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar bg-[#FDFBF7] page-enter pb-16">
      {/* Tín hiệu Live Real-time */}
      <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-red-500/10 border-b border-orange-200/80 px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E84A27] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E84A27]"></span>
          </span>
          <span className="text-[11px] font-black text-[#E84A27] tracking-wider uppercase">Live Real-time</span>
          <span className="text-[11px] text-gray-700 hidden sm:inline">
            Hơn 3.420 lượt tìm đường & check-in GPS được ghi nhận trong 1 giờ qua
          </span>
        </div>
        <span className="text-[10px] font-semibold text-gray-500 bg-white/80 px-2 py-0.5 rounded-full border border-gray-200">
          Tự động đồng bộ mỗi 60s
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {/* Tiêu đề & Bộ lọc thời gian */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8 animate-fadeIn">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-red-100 text-[#E84A27] text-[10px] sm:text-[11px] font-extrabold px-3 py-1 rounded-full mb-2">
              <span className="material-symbols-outlined text-[14px] sm:text-[15px]">local_fire_department</span>
              BẢNG XẾP HẠNG ẨM THỰC THỊNH HÀNH
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Quán Ăn & Món Ngon <span className="gradient-text-premium">Đang Gây Bão</span>
            </h1>
            <p className="text-[12px] sm:text-[13px] text-gray-600 mt-1 max-w-2xl leading-relaxed">
              Xếp hạng khách quan dựa trên mật độ chỉ đường GPS thực tế, đánh giá cộng đồng và tần suất nhắc đến trên mạng xã hội tại TP.HCM.
            </p>
          </div>

          {/* Time range selector */}
          <div className="flex items-center bg-white border border-gray-200 p-1 rounded-full shadow-sm">
            {timeTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-[#E84A27] text-white shadow-md shadow-[#E84A27]/25"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Món ăn bắt trend nổi bật (Cards Carousel trực quan) */}
        <div className="mb-10 animate-slideInUp">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#E84A27] text-[22px]">trending_up</span>
              <h2 className="text-[18px] font-extrabold text-gray-900">Món Ăn Bắt Trend Mạng Xã Hội</h2>
            </div>
            <span className="text-[11px] text-gray-500 font-medium">Xu hướng ẩm thực tuần này</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingFoods.map((food, idx) => (
              <div
                key={food.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="relative h-40 overflow-hidden bg-gray-100">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#E84A27] text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md">
                    TOP #{idx + 1}
                  </div>
                  <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[12px]">north_east</span>
                    {food.trend}
                  </div>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-[14px] text-gray-900 group-hover:text-[#E84A27] transition-colors mb-1 line-clamp-1">
                      {food.name}
                    </h3>
                    <p className="text-[11px] text-gray-500 leading-snug line-clamp-2 mb-3">
                      {food.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                    <span className="text-gray-500 font-medium">
                      📍 {food.nearbyCount} quán lân cận
                    </span>
                    <button
                      onClick={() => navigate('/', { state: { selectedPlaceId: food.id } })}
                      className="font-bold text-[#E84A27] hover:underline flex items-center gap-0.5"
                    >
                      Xem quán <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bảng Xếp Hạng Trực Quan Top Quán Ăn Dẫn Đầu */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden mb-8 animate-slideInUp">
          {/* Header Bảng */}
          <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-[17px] font-extrabold text-gray-900 flex items-center gap-2">
                <span>🏆</span> Bảng Xếp Hạng Quán Ăn Dẫn Đầu Lượt Đến
              </h2>
              <p className="text-[11px] text-gray-500 mt-0.5">Dữ liệu được xác thực bởi tần suất di chuyển GPS thực tế</p>
            </div>

            {/* Bộ lọc Quận */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[11px] font-bold text-gray-500 whitespace-nowrap mr-1">Khu vực:</span>
              {districts.map((d) => (
                <button
                  key={d}
                  onClick={() => setDistrictFilter(d)}
                  className={`text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                    districtFilter === d
                      ? "bg-[#E84A27] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {d === "all" ? "Tất cả quận" : d}
                </button>
              ))}
            </div>
          </div>

          {/* Danh sách các quán (Visual Cards Row) */}
          <div className="divide-y divide-gray-100">
            {sortedPlaces.slice(0, visibleCount).map((place, index) => {
              const rank = index + 1;
              const isTop3 = rank <= 3;

              return (
                <div
                  key={place.id}
                  className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-orange-50/40 transition-colors group"
                >
                  {/* Trái: Hạng + Hình ảnh + Thông tin quán */}
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    {/* Rank Badge */}
                    <div
                      className={`w-9 h-9 shrink-0 rounded-2xl flex items-center justify-center font-black text-[15px] shadow-sm ${
                        rank === 1
                          ? "bg-gradient-to-br from-amber-400 to-yellow-500 text-white ring-2 ring-amber-300"
                          : rank === 2
                          ? "bg-gradient-to-br from-slate-300 to-slate-400 text-white"
                          : rank === 3
                          ? "bg-gradient-to-br from-orange-400 to-amber-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {rank}
                    </div>

                    {/* Image */}
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 shadow-sm border border-gray-100 group-hover:scale-105 transition-transform"
                    />

                    {/* Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-extrabold text-[15px] text-gray-900 group-hover:text-[#E84A27] transition-colors truncate">
                          {place.name}
                        </h3>
                        {isTop3 && (
                          <span className="bg-red-50 text-[#E84A27] text-[9px] font-black px-2 py-0.5 rounded-full border border-red-200">
                            {rank === 1 ? "QUÁN ĐẦU BẢNG" : rank === 2 ? "HẠNG 2" : "HẠNG 3"}
                          </span>
                        )}
                        <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                          {place.category}
                        </span>
                      </div>

                      <p className="text-[12px] text-gray-600 truncate mt-0.5">
                        {place.specialty}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-1">
                        <span className="flex items-center gap-0.5 text-gray-500">
                          <span className="material-symbols-outlined text-[13px] text-[#E84A27]">location_on</span>
                          {place.address}
                        </span>
                        <span>•</span>
                        <span className="text-gray-500">Khoảng cách: <strong>{place.distanceKm} km</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Giữa & Phải: Tăng trưởng & Thao tác */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-100">
                    {/* Tăng trưởng */}
                    <div className="text-left sm:text-right">
                      <div className="flex items-center sm:justify-end gap-1 text-emerald-600 font-black text-[13px]">
                        <span className="material-symbols-outlined text-[15px]">trending_up</span>
                        {place.trend}
                      </div>
                      <div className="text-[10px] text-gray-400 mt-0.5">
                        {place.votes?.toLocaleString()} lượt điều hướng
                      </div>
                    </div>

                    {/* Điểm đánh giá */}
                    <div className="text-center sm:text-right">
                      <div className="flex items-center sm:justify-end gap-1 font-extrabold text-gray-900 text-[14px]">
                        <span className="text-amber-500">★</span> {place.rating}
                      </div>
                      <div className="text-[10px] text-gray-400 mt-0.5">
                        {place.reviews?.toLocaleString()} reviews
                      </div>
                    </div>

                    {/* Nút chỉ đường */}
                    <button
                      onClick={() => navigate('/', { state: { selectedPlaceId: place.id } })}
                      className="flex items-center gap-1.5 h-9 px-4 rounded-full bg-[#E84A27] text-white text-[11px] font-bold hover:bg-[#c93d1f] shadow-md shadow-[#E84A27]/20 transition-all hover:scale-105 active:scale-95"
                    >
                      <span className="material-symbols-outlined text-[15px]">near_me</span>
                      Chỉ đường
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer bảng */}
          <div className="px-6 py-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[12px] text-gray-500 font-medium">
              Đang hiển thị {Math.min(visibleCount, sortedPlaces.length)} / {sortedPlaces.length} quán hot
            </span>

            {visibleCount < sortedPlaces.length ? (
              <button
                onClick={() => setVisibleCount((prev) => Math.min(prev + 5, sortedPlaces.length))}
                className="text-[12px] font-bold text-[#E84A27] hover:underline flex items-center gap-1"
              >
                Xem thêm quán tiếp theo
                <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </button>
            ) : (
              <span className="text-[12px] font-bold text-emerald-600 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                Đã tải toàn bộ bảng xếp hạng
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
