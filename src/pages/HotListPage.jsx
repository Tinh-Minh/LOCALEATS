import { useState } from "react";
import { places, trendingFoods } from "../data/places";

const tabOptions = [
  { id: "today", label: "Hôm nay (Live)" },
  { id: "week", label: "Tuần này" },
  { id: "month", label: "Tháng này" },
];

export default function HotListPage() {
  const [activeTab, setActiveTab] = useState("week");
  const [viewMode, setViewMode] = useState("district");

  const hotPlaces = [...places].sort((a, b) => b.votes - a.votes);

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar bg-[#FDFBF7]">
      {/* Live banner */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-orange-200 px-6 py-2 flex items-center gap-2">
        <span className="flex items-center gap-1 text-[#E84A27] font-bold text-[11px]">
          <span className="w-2 h-2 bg-[#E84A27] rounded-full animate-pulse"></span>
          LIVE REAL-TIME
        </span>
        <span className="text-[11px] text-gray-700 flex-1">
          Hệ thống vừa ghi nhận 2.840+ lượt định vị chỉ đường trong 15 phút qua tại khu vực Quận 4 & Quận 1…
        </span>
        <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap">🔄 Cập nhật mỗi 60 giây</span>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* Page header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-orange-100 text-[#E84A27] text-[10px] font-extrabold px-2 py-0.5 rounded-full">🏆 BẢNG XẾP HẠNG ẨM THỰC SÔI ĐỘNG NHẤT 24H</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
              Quán Ăn & Món Ngon
            </h1>
            <h2 className="text-3xl font-extrabold text-[#E84A27] leading-tight">
              Đang Gây Bão Cộng Đồng LOCALEATS
            </h2>
            <p className="text-[13px] text-gray-600 mt-2 max-w-2xl">
              Tổng hợp dữ liệu thực tế dựa trên lưu lượng tìm kiếm, tần suất chỉ đường trực tiếp tới quán và lượt check-in ẩm thực bùng nổ của cư dân bản địa.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-gray-100 rounded-full p-1">
              {tabOptions.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`px-4 py-1.5 rounded-full text-[12px] font-bold transition-all ${
                    activeTab === t.id ? "bg-[#E84A27] text-white shadow-md" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setViewMode(viewMode === "district" ? "all" : "district")}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 bg-white text-[12px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">filter_list</span>
              Theo Quận
            </button>
          </div>
        </div>

        {/* Top 10 leaderboard */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
            <h3 className="font-bold text-[13px] text-gray-800 flex items-center gap-2">
              🥇 Top 1 đến Top 10 Quán Ăn Dẫn Đầu Trào Lưu
            </h3>
            <span className="text-[11px] text-gray-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">gps_fixed</span>
              Dữ liệu GPS & Chỉ đường 1-chạm thời gian thực
            </span>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-[60px_1fr_160px_140px_100px] gap-4 px-5 py-2 bg-gray-50 text-[11px] font-bold text-gray-500 uppercase tracking-wide">
            <span>Hạng</span>
            <span>Quán & Món đặc trưng</span>
            <span>Tăng trưởng GPS</span>
            <span>Đánh giá thực tế</span>
            <span>Điều hướng</span>
          </div>

          {hotPlaces.slice(0, 10).map((p, i) => (
            <div
              key={p.id}
              className="grid grid-cols-[60px_1fr_160px_140px_100px] gap-4 px-5 py-3.5 border-t border-gray-50 hover:bg-orange-50/50 transition-colors items-center group"
            >
              {/* Rank */}
              <div className="flex items-center justify-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-[15px] ${
                    i === 0
                      ? "bg-yellow-400 text-white shadow-md"
                      : i === 1
                      ? "bg-gray-300 text-white"
                      : i === 2
                      ? "bg-amber-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  #{i + 1}
                </div>
              </div>

              {/* Restaurant info */}
              <div className="flex items-center gap-3">
                <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[13px] text-gray-900">{p.name}</span>
                    {i < 3 && (
                      <span className="bg-[#E84A27] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                        {i === 0 ? "QUÁN QUÁN" : i === 1 ? "HẠNG BẠC" : "HẠNG ĐỒNG"}
                      </span>
                    )}
                    <span className="bg-gray-100 text-gray-600 text-[9px] font-medium px-1.5 py-0.5 rounded-full">{p.district || "Quận 1"}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">{p.specialty}</p>
                  <p className="text-[11px] text-gray-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">place</span>
                    {p.address} • Cách bạn {p.distanceKm} km
                  </p>
                </div>
              </div>

              {/* GPS Growth */}
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-green-500 text-[13px]">📈</span>
                  <span className="text-[#E84A27] font-extrabold text-[13px]">{p.trend}</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5">{p.votes?.toLocaleString()} lượt tìm kiếm</p>
              </div>

              {/* Rating */}
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">⭐</span>
                  <span className="font-bold text-[13px]">{p.rating}</span>
                  <span className="text-[11px] text-gray-500">({(p.reviews / 1000).toFixed(1)}k)</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  {p.openNow ? "🟢 Mở đến " + p.closeAt : "🔴 Đóng cửa"}
                </p>
              </div>

              {/* Navigation */}
              <button className="flex items-center gap-1.5 bg-[#E84A27] text-white px-3 py-2 rounded-full text-[11px] font-bold hover:bg-[#c93d1f] transition-all hover:scale-105 shadow-md shadow-[#E84A27]/25 opacity-0 group-hover:opacity-100">
                <span className="material-symbols-outlined text-[14px]">directions</span>
                Chỉ đường
              </button>
            </div>
          ))}

          <div className="px-5 py-3 flex items-center justify-between border-t border-gray-100">
            <button className="text-[12px] text-[#E84A27] font-bold flex items-center gap-1 hover:underline">
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
              Cuộn để xem tiếp từ Top 5 đến Top 10
            </button>
            <span className="text-[11px] text-gray-500">10/10 quán cập nhật Live GPS</span>
          </div>
        </div>

        {/* Trending foods section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-[18px] text-gray-900 flex items-center gap-2">
              🍽️ Món Ăn Bắt Trend Đang Càn Quét MXH
            </h3>
            <span className="text-[11px] text-gray-500 flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
              ✨ Dữ liệu ẩm thực TikTok & Threads tuần này
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingFoods.map((food) => (
              <div key={food.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group cursor-pointer">
                <div className="relative h-36 overflow-hidden">
                  <img src={food.image} alt={food.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 bg-[#E84A27] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full">
                    #{food.rank} {food.tag.toUpperCase()}
                  </div>
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    {food.trend}
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-bold text-[13px] text-gray-900 mb-1">{food.name}</h4>
                  <p className="text-[11px] text-gray-500 mb-2 line-clamp-2">{food.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-600">🍽️ {food.nearbyCount} quán bán quanh bạn</span>
                    <span className="text-[11px] text-gray-400">{food.weekOrders}</span>
                  </div>
                  <button className="mt-2 w-full flex items-center justify-center gap-1.5 h-8 rounded-full border border-[#E84A27] text-[#E84A27] text-[11px] font-bold hover:bg-[#E84A27] hover:text-white transition-all">
                    <span className="material-symbols-outlined text-[14px]">directions</span>
                    Tìm quán gần nhất
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Heat map section */}
        <div className="grid grid-cols-2 gap-6">
          {/* District heatmap */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-[14px] text-gray-900">🗺️ Bản Đồ Nhiệt Check-In Theo Quận</h4>
              <span className="text-[10px] text-[#E84A27] font-bold bg-red-50 px-2 py-0.5 rounded-full">Live GPS</span>
            </div>
            <p className="text-[11px] text-gray-500 mb-3">Mật độ khách ăn uống thực tế tại các tuyến phố ẩm thực lớn ngay thời điểm hiện tại:</p>
            {[
              { district: "Q4", name: "Phố Ẩm Thực Vĩnh Khánh", desc: "Hơn 85 quán hải sản & nướng vỉa hè mở cửa", level: 96, levelLabel: "CỰC ĐÔNG", levelColor: "bg-red-500" },
              { district: "PN", name: "Khu Ẩm Thực Phan Xích Long", desc: "Thiên đường lẩu, đồ nướng, trà sữa", level: 82, levelLabel: "NHỘN NHỊP", levelColor: "bg-orange-400" },
              { district: "Q10", name: "Phố Ẩm Thực Đêm Hồ Thị Kỷ", desc: "Ẩm thực Campuchia, đồ nướng xiên que", level: 78, levelLabel: "TẤP NẬP", levelColor: "bg-yellow-400" },
            ].map((d) => (
              <div key={d.district} className="flex items-center gap-3 py-2.5 border-t border-gray-50">
                <div className="w-8 h-8 rounded-full bg-orange-100 text-[#E84A27] text-[11px] font-extrabold flex items-center justify-center shrink-0">
                  {d.district}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[12px] text-gray-800">{d.name}</span>
                    <span className={`text-[9px] font-bold text-white px-1.5 py-0.5 rounded-full ${d.levelColor}`}>
                      {d.levelLabel} {d.level}%
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 truncate">{d.desc}</p>
                </div>
              </div>
            ))}
            <button className="mt-3 text-[12px] text-[#E84A27] font-semibold flex items-center gap-1 hover:underline">
              Bạn muốn tìm quán ở quận khác? Xem bản đồ nhiệt tổng thể →
            </button>
          </div>

          {/* Tips card */}
          <div className="bg-gradient-to-br from-[#E84A27] to-[#FF9F1C] rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-[18px]">gps_fixed</span>
              <h4 className="font-bold text-[14px]">🎯 Bí Kíp Săn Quán Hot Cùng LOCALEATS</h4>
            </div>
            <p className="text-[12px] text-white/80 mb-4">
              Đi ăn quán nổi tiếng không lo chờ đợi và có trải nghiệm ẩm thực tốt nhất tại đây.
            </p>
            {[
              { icon: "schedule", tip: "Giờ vàng tránh xếp hàng: Nên đến sớm trước 18:00 hoặc sau 20:30 tại các quán Top 1-3 để đã có bàn ngồi thoải mái và đồ ăn tươi nhất." },
              { icon: "two_wheeler", tip: "Ưu tiên di chuyển xe máy: Đa số quán ăn truyền thống danh tiếng tọa lạc trong các ngõ hẻm ẩm thực đặc trưng của Sài Gòn." },
              { icon: "location_on", tip: "Định vị chính xác cửa vào: LOCALEATS dẫn đường tới chính xác cổng vào xe hoặc hẻm, hạn chế xe đi lạc và quán nhái thương hiệu nổi tiếng cùng phố." },
            ].map((t) => (
              <div key={t.icon} className="flex items-start gap-2 mb-2">
                <span className="material-symbols-outlined text-[16px] text-white/80 mt-0.5">{t.icon}</span>
                <p className="text-[11px] text-white/90 leading-relaxed">{t.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
