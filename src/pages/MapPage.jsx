import { useState } from "react";
import { places, filterChips } from "../data/places";
import MapView from "../components/MapView";
import PlacePopup from "../components/PlacePopup";

export default function MapPage() {
  const [selectedId, setSelectedId] = useState(1);
  const [activeFilter, setActiveFilter] = useState("hot");
  const place = places.find((p) => p.id === selectedId);

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative page-enter">
      {/* Filter chips row */}
      <div className="absolute top-3 left-3 right-3 z-20 flex gap-2 overflow-x-auto no-scrollbar stagger-children">
        {filterChips.map((chip) => (
          <button
            key={chip.id}
            onClick={() => setActiveFilter(chip.id)}
            className={`flex items-center gap-1.5 h-9 px-4 rounded-full text-[12px] font-bold whitespace-nowrap transition-all shadow-md btn-press ${
              activeFilter === chip.id
                ? "bg-[#E84A27] text-white shadow-md shadow-[#E84A27]/30 glow-primary"
                : "bg-white text-gray-700 hover:bg-orange-50 border border-gray-200/80 hover:border-[#E84A27]/40 hover:shadow-lg"
            }`}
          >
            {chip.label}
          </button>
        ))}
        {/* Clock filter */}
        <button className="w-9 h-9 rounded-full bg-white border border-gray-200/80 flex items-center justify-center shadow-md hover:bg-orange-50 hover:shadow-lg hover:scale-110 ml-auto shrink-0 transition-all">
          <span className="material-symbols-outlined text-gray-500 text-[18px]">schedule</span>
        </button>
      </div>

      {/* Map takes full height */}
      <div className="flex-1 relative">
        <MapView places={places} selectedId={selectedId} onSelect={setSelectedId} />
      </div>

      {/* Place popup overlay */}
      {place && (
        <div className="absolute left-3 top-16 z-30 w-[340px] animate-slideInLeft">
          <PlacePopup place={place} onClose={() => setSelectedId(null)} />
        </div>
      )}

      {/* Map controls (right side) */}
      <div className="absolute right-3 bottom-24 z-20 flex flex-col gap-2 stagger-children">
        {[
          { icon: "local_fire_department", color: "text-[#E84A27]" },
          { icon: "my_location", color: "text-gray-600" },
          { icon: "add", color: "text-gray-600" },
          { icon: "remove", color: "text-gray-600" },
          { icon: "rotate_right", color: "text-gray-600" },
          { icon: "gps_fixed", color: "text-gray-600" },
        ].map((btn, i) => (
          <button
            key={i}
            className="w-9 h-9 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-orange-50 hover:shadow-xl hover:scale-110 transition-all border border-gray-200/80 btn-press"
          >
            <span className={`material-symbols-outlined text-[18px] ${btn.color}`}>{btn.icon}</span>
          </button>
        ))}
      </div>

      {/* Map legend */}
      <div className="absolute right-14 bottom-14 z-20 bg-white border border-gray-200/90 rounded-xl shadow-2xl p-3.5 text-[11px] w-64 animate-fadeIn">
        <p className="font-bold text-gray-800 text-[12px] mb-2 border-b border-gray-100 pb-1.5 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#E84A27] text-base">info</span>
          Ý nghĩa biểu tượng bản đồ
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-2">
            <div className="w-3.5 h-3.5 bg-[#E84A27] rounded-full shrink-0 opacity-80 animate-pulse mt-0.5"></div>
            <span className="text-gray-700 leading-snug">
              <strong className="text-gray-900">Kích thước giọt nước</strong>: Tỉ lệ thuận với Điểm sao & Lượng đánh giá lớn.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#E84A27] shrink-0 text-sm">🔥</span>
            <span className="text-gray-700 leading-snug">
              <strong className="text-gray-900">Hào quang ánh lửa 🔥</strong>: Quán đang bùng nổ xu hướng trong 7–14 ngày.
            </span>
          </div>
        </div>
      </div>

      {/* Live location badge */}
      <div className="absolute bottom-3 left-3 z-20 bg-[#E84A27] text-white rounded-full px-3 py-1.5 text-[11px] font-bold flex items-center gap-1.5 shadow-lg glow-primary animate-slideInUp">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
        🚗 14 phút • 4.2 km (Thông thoáng)
      </div>
    </div>
  );
}
