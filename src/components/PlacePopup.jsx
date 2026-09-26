export default function PlacePopup({ place, onClose }) {
  if (!place) return null;

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full animate-fadeIn">
      {/* Hero image */}
      <div className="relative h-44 overflow-hidden">
        <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-[#E84A27] text-white text-[10px] font-extrabold px-2 py-1 rounded-full flex items-center gap-1">
            🔥 Xu hướng #{place.trendRank} Ẩm thực
          </span>
          <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
            {place.trend}
          </span>
        </div>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors"
        >
          <span className="material-symbols-outlined text-[16px] text-gray-700">close</span>
        </button>
        {/* Name overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <h2 className="text-white font-bold text-[15px] leading-tight">{place.name}</h2>
          <p className="text-white/80 text-[11px]">{place.address}</p>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-2">
        {/* Rating & status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-yellow-500 text-[14px]">⭐</span>
            <span className="font-bold text-[13px]">{place.rating}</span>
            <span className="text-gray-500 text-[12px]">({place.reviews?.toLocaleString()} đánh giá)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-[12px] font-semibold text-green-600">Mở cửa</span>
            <span className="text-gray-400 text-[12px]">• Đóng {place.closeAt}</span>
          </div>
        </div>

        {/* Specialty & price */}
        <div className="flex items-center gap-2 text-[12px]">
          <span className="material-symbols-outlined text-[14px] text-gray-400">restaurant_menu</span>
          <span className="text-gray-600">{place.specialty}</span>
          <span className="text-gray-300">|</span>
          <span className="material-symbols-outlined text-[14px] text-gray-400">payments</span>
          <span className="text-gray-700 font-medium">{place.price}</span>
        </div>

        {/* Wait time */}
        <div className="flex items-center gap-1.5 text-[12px]">
          <span className="material-symbols-outlined text-[14px] text-[#E84A27]">timer</span>
          <span className="text-[#E84A27] font-semibold">Thời gian chờ: ~{place.waitTime}</span>
        </div>

        {/* Route options */}
        <div className="bg-gray-50 rounded-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wide">Lộ trình nhanh nhất</span>
            <span className="text-[11px] text-[#E84A27] font-semibold">Tránh kẹt xe</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: "🏍️", mode: "Xe máy", time: `${place.bikeMin} phút`, dist: `${place.distanceKm} km`, active: true },
              { icon: "🚗", mode: "Ô tô", time: `${place.carMin} phút`, dist: `${(place.distanceKm * 1.14).toFixed(1)} km`, active: false },
              { icon: "🚶", mode: "Đi bộ", time: `${place.walkMin} phút`, dist: `${(place.distanceKm * 0.83).toFixed(1)} km`, active: false },
            ].map((m) => (
              <div
                key={m.mode}
                className={`flex flex-col items-center py-2 px-1 rounded-xl cursor-pointer transition-all ${
                  m.active ? "bg-[#E84A27] text-white shadow-md" : "bg-white border border-gray-200 hover:border-[#E84A27]"
                }`}
              >
                <span className="text-[16px]">{m.icon}</span>
                <span className={`text-[12px] font-bold mt-0.5 ${m.active ? "text-white" : "text-gray-800"}`}>{m.time}</span>
                <span className={`text-[10px] ${m.active ? "text-white/80" : "text-gray-500"}`}>{m.dist}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-gray-500 mt-2">
            ↪ Rẽ phải vào {place.address?.split(",")[1] || "đường chính"} • Đi thẳng 900m qua Pasteur
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex gap-2">
          <button className="flex-1 h-11 rounded-full bg-[#E84A27] text-white text-[13px] font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#E84A27]/30 hover:bg-[#c93d1f] transition-all hover:scale-[1.02] active:scale-95">
            <span className="material-symbols-outlined text-[16px]">directions</span>
            Bắt đầu chỉ đường ({place.bikeMin}p)
          </button>
          <button className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <span className="material-symbols-outlined text-[18px] text-gray-600">bookmark</span>
          </button>
          <button className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <span className="material-symbols-outlined text-[18px] text-gray-600">call</span>
          </button>
          <button className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <span className="material-symbols-outlined text-[18px] text-gray-600">share</span>
          </button>
        </div>

        {/* Hot trending nearby */}
        <div className="mt-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-bold text-gray-800 flex items-center gap-1">
              🔥 HOT TRENDING QUANH ĐÂY
            </span>
            <button className="text-[11px] text-[#E84A27] font-semibold">Xem thêm (18)</button>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {[
              { name: "Bánh Mì Huỳnh Hoa", votes: "6.1k vote", dist: "1.1km", img: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=200&q=80", rating: 4.8 },
              { name: "Ốc Oanh Vĩnh Khánh", votes: "1.9k vote", dist: "2.4km", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=80", rating: 4.7 },
              { name: "Phở La", votes: "2.4k vote", dist: "2.4km", img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=200&q=80", rating: 4.6 },
            ].map((n) => (
              <div key={n.name} className="flex-shrink-0 w-28 cursor-pointer group">
                <div className="relative h-20 rounded-xl overflow-hidden">
                  <img src={n.img} alt={n.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute top-1 right-1 bg-black/60 text-white text-[9px] font-bold px-1 rounded">
                    ⭐{n.rating}
                  </div>
                </div>
                <p className="text-[11px] font-semibold text-gray-800 mt-1 line-clamp-1">{n.name}</p>
                <p className="text-[10px] text-[#E84A27]">🔥 {n.votes}</p>
                <p className="text-[10px] text-gray-400">{n.dist}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
