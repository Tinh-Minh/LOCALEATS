import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Tính khoảng cách theo công thức Haversine giữa 2 tọa độ (km)
function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Bán kính Trái Đất (km)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function PlacePopup({ place, userLocation, onClose, onStartRoute, isRouting }) {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState("bike");
  if (!place) return null;

  // Tính khoảng cách đường thực tế (tính hệ số vòng vèo đường phố ~ 1.3x)
  let directDistanceKm = place.distanceKm || 1.2;
  if (userLocation?.lat && userLocation?.lng && place.lat && place.lng) {
    const rawDist = calculateHaversineDistance(
      userLocation.lat,
      userLocation.lng,
      place.lat,
      place.lng
    );
    // Nhân hệ số đường phố quanh co 1.35x
    directDistanceKm = Math.max(0.3, Number((rawDist * 1.35).toFixed(1)));
  }

  // Vận tốc thực tế đô thị:
  // - Xe máy (bike): ~24 km/h -> ~2.5 phút/km
  // - Ô tô (car): ~18 km/h -> ~3.3 phút/km (quãng đường dài hơn 1.15x do đường 1 chiều)
  // - Đi bộ (walk): ~4.8 km/h -> ~12.5 phút/km
  const bikeDistKm = directDistanceKm;
  const bikeMins = Math.max(1, Math.round(bikeDistKm * 2.5));

  const carDistKm = Number((directDistanceKm * 1.15).toFixed(1));
  const carMins = Math.max(2, Math.round(carDistKm * 3.3));

  const walkDistKm = Number((directDistanceKm * 0.95).toFixed(1));
  const walkMins = Math.max(1, Math.round(walkDistKm * 12.5));

  const modes = [
    {
      id: "bike",
      icon: "🏍️",
      label: "Xe máy",
      time: `${bikeMins} phút`,
      dist: `${bikeDistKm} km`,
    },
    {
      id: "car",
      icon: "🚗",
      label: "Ô tô",
      time: `${carMins} phút`,
      dist: `${carDistKm} km`,
    },
    {
      id: "walk",
      icon: "🚶",
      label: "Đi bộ",
      time: walkMins >= 60 ? `${Math.floor(walkMins / 60)}h ${walkMins % 60}p` : `${walkMins} phút`,
      dist: `${walkDistKm} km`,
    },
  ];

  const handleStartRoute = () => {
    if (onStartRoute) {
      onStartRoute({ lat: place.lat, lng: place.lng }, selectedMode);
    }
  };

  return (
    <div className="bg-white border border-gray-200/90 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden w-full max-h-[82vh] sm:max-h-[85vh] flex flex-col animate-fadeIn">
      {/* Mobile drag handle bar */}
      <div className="sm:hidden flex justify-center pt-2 pb-1 bg-white cursor-pointer" onClick={onClose}>
        <div className="w-10 h-1 bg-gray-300 rounded-full" />
      </div>

      {/* Hero image */}
      <div className="relative h-36 sm:h-44 shrink-0 overflow-hidden">
        <img src={place.image} alt={place.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-[#E84A27] text-white text-[10px] font-extrabold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-[#E84A27]/30 badge-wiggle">
            🔥 Xu hướng #{place.trendRank} Ẩm thực
          </span>
          <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">
            {place.trend}
          </span>
        </div>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all hover:rotate-90"
        >
          <span className="material-symbols-outlined text-[16px] text-gray-700">close</span>
        </button>
        {/* Name overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3">
          <h2 className="text-white font-bold text-[15px] leading-tight drop-shadow-lg">{place.name}</h2>
          <p className="text-white/80 text-[11px]">{place.address}</p>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-2 overflow-y-auto styled-scrollbar flex-1">
        {/* Rating & status */}
        <div className="flex items-center justify-between animate-slideInUp" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-1.5">
            <span className="text-yellow-500 text-[14px]">⭐</span>
            <span className="font-bold text-[13px]">{place.rating}</span>
            <span className="text-gray-500 text-[12px]">({place.reviews?.toLocaleString()} đánh giá)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-green-500 rounded-full live-dot"></span>
            <span className="text-[12px] font-semibold text-green-600">Mở cửa</span>
            <span className="text-gray-400 text-[12px]">• Đóng {place.closeAt}</span>
          </div>
        </div>

        {/* Specialty & price */}
        <div className="flex items-center gap-2 text-[12px] animate-slideInUp" style={{ animationDelay: '0.15s' }}>
          <span className="material-symbols-outlined text-[14px] text-gray-400">restaurant_menu</span>
          <span className="text-gray-600">{place.specialty}</span>
          <span className="text-gray-300">|</span>
          <span className="material-symbols-outlined text-[14px] text-gray-400">payments</span>
          <span className="text-gray-700 font-medium">{place.price}</span>
        </div>

        {/* Wait time */}
        <div className="flex items-center gap-1.5 text-[12px] animate-slideInUp" style={{ animationDelay: '0.2s' }}>
          <span className="material-symbols-outlined text-[14px] text-[#E84A27] animate-pulse">timer</span>
          <span className="text-[#E84A27] font-semibold">Thời gian chờ: ~{place.waitTime}</span>
        </div>

        {/* Route options — now interactive */}
        <div className="bg-gray-50/80 rounded-xl p-2.5 sm:p-3 animate-slideInUp" style={{ animationDelay: '0.25s' }}>
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-[10px] sm:text-[11px] font-bold text-gray-700 uppercase tracking-wide">Lộ trình nhanh nhất</span>
            <span className="text-[10px] sm:text-[11px] text-[#E84A27] font-semibold">Tránh kẹt xe</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {modes.map((m) => (
              <div
                key={m.id}
                onClick={() => setSelectedMode(m.id)}
                className={`flex flex-col items-center py-1.5 sm:py-2 px-1 rounded-xl cursor-pointer transition-all ${
                  selectedMode === m.id ? "bg-[#E84A27] text-white shadow-md shadow-[#E84A27]/30" : "bg-white border border-gray-200"
                }`}
              >
                <span className="text-[14px] sm:text-[16px]">{m.icon}</span>
                <span className={`text-[11px] sm:text-[12px] font-bold mt-0.5 ${selectedMode === m.id ? "text-white" : "text-gray-800"}`}>{m.time}</span>
                <span className={`text-[9px] sm:text-[10px] ${selectedMode === m.id ? "text-white/80" : "text-gray-500"}`}>{m.dist}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex gap-2 animate-slideInUp mt-0.5" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={handleStartRoute}
            disabled={isRouting}
            className={`flex-1 h-10 sm:h-11 rounded-full text-white text-[12px] font-bold flex items-center justify-center gap-1.5 shadow-md sm:shadow-lg shadow-[#E84A27]/30 transition-all active:scale-95 whitespace-nowrap leading-none px-3 ${
              isRouting
                ? "bg-gray-400 cursor-wait shadow-none"
                : "bg-[#E84A27] hover:bg-[#c93d1f]"
            }`}
          >
            {isRouting ? (
              <>
                <span className="material-symbols-outlined text-[15px] leading-none animate-spin">progress_activity</span>
                <span className="leading-none">Đang tìm đường...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[15px] leading-none">directions</span>
                <span className="leading-none">Bắt đầu chỉ đường</span>
              </>
            )}
          </button>
          <button className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gray-200 flex items-center justify-center hover:bg-orange-50 transition-all shrink-0">
            <span className="material-symbols-outlined text-[18px] text-gray-600">bookmark</span>
          </button>
          <button className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gray-200 flex items-center justify-center hover:bg-green-50 transition-all shrink-0">
            <span className="material-symbols-outlined text-[18px] text-gray-600">call</span>
          </button>
          <button className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-50 transition-all shrink-0">
            <span className="material-symbols-outlined text-[18px] text-gray-600">share</span>
          </button>
        </div>

        {/* Hot trending nearby */}
        <div className="mt-1 animate-slideInUp" style={{ animationDelay: '0.35s' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-bold text-gray-800 flex items-center gap-1">
              🔥 HOT TRENDING QUANH ĐÂY
            </span>
            <button className="text-[11px] text-[#E84A27] font-semibold hover:underline">Xem thêm (18)</button>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {[
              { name: "Bánh Mì Huỳnh Hoa", votes: "6.1k vote", dist: "1.1km", img: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=200&q=80", rating: 4.8 },
              { name: "Ốc Oanh Vĩnh Khánh", votes: "1.9k vote", dist: "2.4km", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=80", rating: 4.7 },
              { name: "Phở La", votes: "2.4k vote", dist: "2.4km", img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=200&q=80", rating: 4.6 },
            ].map((n) => (
              <div key={n.name} className="flex-shrink-0 w-28 cursor-pointer group">
                <div className="relative h-20 rounded-xl overflow-hidden card-shine">
                  <img src={n.img} alt={n.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute top-1 right-1 bg-black/60 text-white text-[9px] font-bold px-1 rounded backdrop-blur-sm">
                    ⭐{n.rating}
                  </div>
                </div>
                <p className="text-[11px] font-semibold text-gray-800 mt-1 line-clamp-1 group-hover:text-[#E84A27] transition-colors">{n.name}</p>
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
