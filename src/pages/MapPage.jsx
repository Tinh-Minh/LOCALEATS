import { useState } from "react";
import { places, filterChips } from "../data/places";
import MapView from "../components/MapView";
import PlacePopup from "../components/PlacePopup";

export default function MapPage() {
  const [selectedId, setSelectedId] = useState(1);
  const [activeFilter, setActiveFilter] = useState("hot");
  const place = places.find((p) => p.id === selectedId);

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">
      {/* Filter chips row */}
      <div className="absolute top-3 left-3 right-3 z-20 flex gap-2 overflow-x-auto no-scrollbar">
        {filterChips.map((chip) => (
          <button
            key={chip.id}
            onClick={() => setActiveFilter(chip.id)}
            className={`flex items-center gap-1.5 h-9 px-4 rounded-full text-[12px] font-bold whitespace-nowrap transition-all shadow-sm ${
              activeFilter === chip.id
                ? "bg-[#E84A27] text-white shadow-md shadow-[#E84A27]/30"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {chip.label}
          </button>
        ))}
        {/* Clock filter */}
        <button className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-50 ml-auto shrink-0">
          <span className="material-symbols-outlined text-gray-500 text-[18px]">schedule</span>
        </button>
      </div>

      {/* Map takes full height */}
      <div className="flex-1 relative">
        <MapView places={places} selectedId={selectedId} onSelect={setSelectedId} />
      </div>

      {/* Place popup overlay */}
      {place && (
        <div className="absolute left-3 top-16 z-30 w-[340px]">
          <PlacePopup place={place} onClose={() => setSelectedId(null)} />
        </div>
      )}

      {/* Map controls (right side) */}
      <div className="absolute right-3 bottom-24 z-20 flex flex-col gap-2">
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
            className="w-9 h-9 bg-white rounded-xl shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-100"
          >
            <span className={`material-symbols-outlined text-[18px] ${btn.color}`}>{btn.icon}</span>
          </button>
        ))}
      </div>

      {/* Map legend */}
      <div className="absolute right-14 bottom-14 z-20 bg-white rounded-xl shadow-lg p-3 text-[11px] w-52">
        <p className="font-bold text-gray-800 mb-2">Ý nghĩa biểu tượng bản đồ</p>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#E84A27] rounded-full opacity-80"></div>
            <span className="text-gray-600">Kích thước giọt nước: Tiểu thuận với Điểm sao & Lượng đánh giá lớn.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#E84A27]">🔥</span>
            <span className="text-gray-600">Hào quang ánh lửa 🔥: Quán đang bùng nổ xu hướng trong 7–14 ngày.</span>
          </div>
        </div>
      </div>

      {/* Live location badge */}
      <div className="absolute bottom-3 left-3 z-20 bg-[#E84A27] text-white rounded-full px-3 py-1.5 text-[11px] font-bold flex items-center gap-1.5 shadow-lg">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
        🚗 14 phút • 4.2 km (Thông thoáng)
      </div>
    </div>
  );
}
