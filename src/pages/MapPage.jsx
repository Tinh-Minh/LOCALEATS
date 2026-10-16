import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { places, filterChips } from "../data/places";
import MapView from "../components/MapView";
import PlacePopup from "../components/PlacePopup";
import DirectionsPanel from "../components/DirectionsPanel";
import useRouting from "../hooks/useRouting";

export default function MapPage() {
  const location = useLocation();
  const [selectedId, setSelectedId] = useState(1);
  const [activeFilter, setActiveFilter] = useState("hot");
  const [showLegend, setShowLegend] = useState(false);
  const [controlsExpanded, setControlsExpanded] = useState(false);

  const {
    routeData,
    isRouting,
    routeError,
    transportMode,
    locationStatus,
    startRoute,
    clearRoute,
    switchMode,
    retryWithGps,
    routeFromOrigin,
  } = useRouting();

  // When navigated from another page with a specific place
  useEffect(() => {
    if (location.state?.selectedPlaceId) {
      setSelectedId(location.state.selectedPlaceId);
    }
  }, [location.state]);

  const place = places.find((p) => p.id === selectedId);

  // Handle start route from PlacePopup
  const handleStartRoute = async (destination, mode) => {
    await startRoute(destination, mode);
  };

  // Handle close directions
  const handleCloseDirections = () => {
    clearRoute();
  };

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
        <MapView
          places={places}
          selectedId={selectedId}
          onSelect={setSelectedId}
          routeData={routeData}
          transportMode={transportMode}
        />
      </div>

      {/* Left panel: Place popup OR Directions panel */}
      <div className="absolute left-3 top-16 z-30 w-[340px] flex flex-col gap-2">
        {/* Show PlacePopup when no route is active */}
        {place && !routeData && (
          <div className="animate-slideInLeft">
            <PlacePopup
              place={place}
              onClose={() => setSelectedId(null)}
              onStartRoute={handleStartRoute}
              isRouting={isRouting}
            />
          </div>
        )}

        {/* Show DirectionsPanel when routing */}
        {(routeData || isRouting || routeError) && (
          <DirectionsPanel
            routeData={routeData}
            isRouting={isRouting}
            routeError={routeError}
            transportMode={transportMode}
            locationStatus={locationStatus}
            onSwitchMode={switchMode}
            onRetryGps={retryWithGps}
            onRouteFromOrigin={routeFromOrigin}
            onStartRoute={handleStartRoute}
            destination={place ? { lat: place.lat, lng: place.lng } : null}
            onClose={handleCloseDirections}
            placeName={place?.name}
          />
        )}
      </div>

      {/* Map Controls & Legend Container (Bottom Right Stack) */}
      <div className="absolute right-4 bottom-6 z-20 flex flex-col items-end gap-2.5">
        {/* 1. Legend Card Popup */}
        {showLegend && (
          <div className="bg-white/95 backdrop-blur-md border border-gray-200/90 rounded-2xl shadow-2xl p-3.5 text-[11px] w-64 animate-slideInUp mb-1">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
              <p className="font-bold text-gray-800 text-[12px] flex items-center gap-1.5 leading-none tracking-tight">
                <span className="material-symbols-outlined text-[#E84A27] text-base">info</span>
                Ý nghĩa biểu tượng bản đồ
              </p>
              <button
                onClick={() => setShowLegend(false)}
                className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
                title="Đóng"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-start gap-2">
                <div className="w-3.5 h-3.5 bg-[#E84A27] rounded-full shrink-0 opacity-80 animate-pulse mt-0.5"></div>
                <span className="text-gray-700 leading-relaxed text-[11px]">
                  <strong className="text-gray-900">Kích thước giọt nước</strong>: Tỉ lệ thuận với Điểm sao & Lượng đánh giá lớn.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#E84A27] shrink-0 text-sm">🔥</span>
                <span className="text-gray-700 leading-relaxed text-[11px]">
                  <strong className="text-gray-900">Hào quang ánh lửa 🔥</strong>: Quán đang bùng nổ xu hướng trong 7–14 ngày.
                </span>
              </div>
              {/* Route legend */}
              <div className="flex items-start gap-2">
                <div className="w-3.5 h-1 bg-[#E84A27] rounded-full shrink-0 mt-1.5"></div>
                <span className="text-gray-700 leading-relaxed text-[11px]">
                  <strong className="text-gray-900">Đường cam</strong>: Tuyến đường xe máy/ô tô.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-3.5 h-1 bg-emerald-500 rounded-full shrink-0 mt-1.5"></div>
                <span className="text-gray-700 leading-relaxed text-[11px]">
                  <strong className="text-gray-900">Đường xanh</strong>: Tuyến đường đi bộ.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 2. Map Action Buttons Stack */}
        {controlsExpanded && (
          <div className="flex flex-col gap-2 animate-slideInUp mb-1">
            {[
              { icon: "local_fire_department", color: "text-[#E84A27]", title: "Quán bùng nổ" },
              { icon: "my_location", color: "text-blue-600", title: "Vị trí của tôi" },
              { icon: "add", color: "text-gray-700", title: "Phóng to" },
              { icon: "remove", color: "text-gray-700", title: "Thu nhỏ" },
              { icon: "rotate_right", color: "text-gray-700", title: "Xoay bản đồ" },
            ].map((btn, i) => (
              <button
                key={i}
                title={btn.title}
                className="w-10 h-10 bg-white/95 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center hover:bg-orange-50 hover:shadow-xl hover:scale-110 transition-all border border-gray-200/80 btn-press group relative ml-auto"
              >
                <span className={`material-symbols-outlined text-[19px] ${btn.color}`}>{btn.icon}</span>
                {/* Tooltip on hover */}
                <span className="absolute right-12 bg-gray-900/90 text-white text-[10px] font-medium px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                  {btn.title}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* 3. Action Buttons Row (Chú giải + Công cụ chính) */}
        <div className="flex items-center gap-2">
          {/* Legend Button */}
          <button
            onClick={() => setShowLegend(!showLegend)}
            title="Xem chú giải biểu tượng bản đồ"
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[11px] font-bold shadow-lg transition-all btn-press border ${
              showLegend
                ? "bg-gray-900 text-white border-gray-700"
                : "bg-white/95 backdrop-blur-md border-gray-200/90 text-gray-800 hover:bg-orange-50 hover:border-[#E84A27]/40 hover:text-[#E84A27]"
            }`}
          >
            <span className="material-symbols-outlined text-[#E84A27] text-[16px]">info</span>
            Chú giải
          </button>

          {/* Main Controls FAB Button */}
          <button
            onClick={() => setControlsExpanded(!controlsExpanded)}
            title={controlsExpanded ? "Thu gọn công cụ" : "Mở công cụ bản đồ"}
            className={`w-11 h-11 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 btn-press border-2 ${
              controlsExpanded
                ? "bg-gray-900 border-gray-700 text-white rotate-90 scale-105"
                : "bg-gradient-to-br from-[#E84A27] to-[#FF9F1C] border-white text-white hover:scale-110 glow-primary"
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">
              {controlsExpanded ? "close" : "tune"}
            </span>
          </button>
        </div>
      </div>

      {/* Live location badge (Bottom Left) */}
      <div className="absolute bottom-4 left-3 z-20 bg-[#E84A27] text-white rounded-full px-3 py-1.5 text-[11px] font-bold flex items-center gap-1.5 shadow-lg glow-primary animate-slideInUp">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
        {routeData ? (
          <>📍 Đang chỉ đường • {routeData.summary.totalDistance} • {routeData.summary.totalDuration}</>
        ) : (
          <>🚗 14 phút • 4.2 km (Thông thoáng)</>
        )}
      </div>
    </div>
  );
}
