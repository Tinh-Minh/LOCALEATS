import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { places, filterChips } from "../data/places";
import MapView from "../components/MapView";
import PlacePopup from "../components/PlacePopup";
import DirectionsPanel from "../components/DirectionsPanel";
import useRouting from "../hooks/useRouting";

export default function MapPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("hot");
  const [showLegend, setShowLegend] = useState(false);
  const [controlsExpanded, setControlsExpanded] = useState(false);

  const {
    routeData,
    isRouting,
    routeError,
    transportMode,
    userLocation,
    locationStatus,
    startRoute,
    clearRoute,
    switchMode,
    retryWithGps,
    routeFromOrigin,
  } = useRouting();

  const [itineraryStops, setItineraryStops] = useState([]);

  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [mapSearchQuery, setMapSearchQuery] = useState("");

  // When navigated from another page (TripPlannerPage or HotListPage / AIPage or Search)
  useEffect(() => {
    if (location.state?.itineraryStops && location.state.itineraryStops.length > 0) {
      const stops = location.state.itineraryStops;
      setItineraryStops(stops);
      const firstStop = stops[0];
      setSelectedId(firstStop.id);
      // Tự động kích hoạt chỉ đường tới chặng đầu tiên
      startRoute({ lat: firstStop.lat, lng: firstStop.lng }, location.state.vehicle || "car");
    } else if (location.state?.selectedPlaceId) {
      setSelectedId(location.state.selectedPlaceId);
      const p = places.find((x) => x.id === location.state.selectedPlaceId);
      if (p && mapRef.current) {
        mapRef.current.flyToLocation(p.lng, p.lat, 16.5);
      }
    }

    if (location.state?.searchQuery) {
      setMapSearchQuery(location.state.searchQuery);
    }
    if (location.state?.triggerDirections) {
      const firstPlace = places[0];
      if (firstPlace) {
        setSelectedId(firstPlace.id);
        startRoute({ lat: firstPlace.lat, lng: firstPlace.lng }, "bike");
      }
    }
  }, [location.state]);

  // Lọc quán ăn theo chip danh mục + bộ lọc giờ mở cửa + từ khóa tìm kiếm
  const filteredPlaces = places.filter((p) => {
    // 1. Lọc theo từ khóa tìm kiếm nếu có
    if (mapSearchQuery.trim()) {
      const q = mapSearchQuery.toLowerCase();
      const matchSearch =
        p.name.toLowerCase().includes(q) ||
        p.specialty.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q);
      if (!matchSearch) return false;
    }

    // 2. Lọc theo nút đồng hồ (Đang mở cửa)
    if (openNowOnly && !p.openNow) return false;

    // 3. Lọc theo chip danh mục
    if (activeFilter === "hot") return true;
    if (activeFilter === "pho") return p.category.includes("Phở") || p.category.includes("Bún");
    if (activeFilter === "banhmi") return p.category.includes("Bánh Mì");
    if (activeFilter === "seafood") return p.category.includes("Hải Sản") || p.category.includes("Ốc");
    if (activeFilter === "rice") return p.category.includes("Cơm");
    if (activeFilter === "dessert") return p.category.includes("Tráng Miệng") || p.category.includes("Chè") || p.category.includes("Trà Sữa");
    if (activeFilter === "open247") return p.closeAt === "24/24" || p.closeAt >= "23:00";
    return true;
  });

  const place = places.find((p) => p.id === selectedId);

  // Handle start route from PlacePopup
  const handleStartRoute = async (destination, mode) => {
    await startRoute(destination, mode);
  };

  // Handle selecting a pin — if routing is active, auto-reroute to new place
  const handleSelectPlace = (id) => {
    setSelectedId(id);
    // If already routing, auto-reroute to newly selected place
    if (routeData || isRouting) {
      const newPlace = places.find((p) => p.id === id);
      if (newPlace) {
        startRoute({ lat: newPlace.lat, lng: newPlace.lng }, transportMode);
      }
    }
  };

  // Handle close directions
  const handleCloseDirections = () => {
    clearRoute();
    setItineraryStops([]);
    setSelectedId(null);
  };

  // Hủy bỏ lộ trình nhiều điểm dừng -> Xóa đường mờ và quay về trang Kế hoạch chuyến đi (/trip)
  const handleCancelItinerary = () => {
    clearRoute();
    setItineraryStops([]);
    setSelectedId(null);
    navigate("/trip");
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
        <button
          onClick={() => setOpenNowOnly(!openNowOnly)}
          title={openNowOnly ? "Đang lọc: Chỉ quán mở cửa (bấm để xem tất cả)" : "Lọc quán đang mở cửa ngay bây giờ"}
          className={`h-9 px-3 rounded-full border flex items-center gap-1.5 shadow-md transition-all ml-auto shrink-0 ${
            openNowOnly
              ? "bg-emerald-600 text-white border-emerald-500 shadow-emerald-500/30"
              : "bg-white border-gray-200/80 text-gray-600 hover:bg-orange-50 hover:text-[#E84A27]"
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">
            {openNowOnly ? "lock_open" : "schedule"}
          </span>
          <span className="text-[11px] font-bold hidden sm:inline">
            {openNowOnly ? "Đang mở cửa" : "Giờ mở"}
          </span>
        </button>
      </div>

      {/* Thông báo kết quả tìm kiếm/lọc nếu có */}
      {(mapSearchQuery || openNowOnly) && (
        <div className="absolute top-14 left-3 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-md border border-gray-200/90 rounded-full px-3 py-1 shadow-lg text-[11px] animate-fadeIn">
          <span className="material-symbols-outlined text-[#E84A27] text-sm">filter_alt</span>
          <span className="text-gray-700">
            {mapSearchQuery ? `Từ khóa: "${mapSearchQuery}" • ` : ""}
            {openNowOnly ? "Đang mở cửa • " : ""}
            Tìm thấy <strong>{filteredPlaces.length}</strong> quán
          </span>
          <button
            onClick={() => {
              setMapSearchQuery("");
              setOpenNowOnly(false);
            }}
            className="w-4 h-4 rounded-full bg-gray-200 hover:bg-red-500 hover:text-white flex items-center justify-center text-gray-500 transition-colors ml-1"
            title="Xóa bộ lọc"
          >
            <span className="material-symbols-outlined text-[11px]">close</span>
          </button>
        </div>
      )}

      {/* Map takes full height */}
      <div className="flex-1 relative">
        <MapView
          ref={mapRef}
          places={filteredPlaces}
          selectedId={selectedId}
          onSelect={handleSelectPlace}
          onMapClick={() => {
            // Nhấn ra vùng trống bản đồ thì đóng popup quán
            setSelectedId(null);
          }}
          routeData={routeData}
          transportMode={transportMode}
          userLocation={userLocation}
          itineraryStops={itineraryStops}
        />
      </div>

      {/* Left panel: Place popup OR Directions panel */}
      <div className="absolute left-3 top-16 z-30 w-[340px] flex flex-col gap-2">
        {/* Show PlacePopup when no route is active */}
        {place && !routeData && !isRouting && !routeError && (
          <div className="animate-slideInLeft">
            <PlacePopup
              place={place}
              userLocation={userLocation}
              onClose={() => setSelectedId(null)}
              onStartRoute={handleStartRoute}
              isRouting={isRouting}
            />
          </div>
        )}

        {/* Show DirectionsPanel when routing */}
        {(routeData || isRouting || routeError) && (
          <div key={`route-${selectedId}`} className="animate-slideInLeft">
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
              onClose={itineraryStops && itineraryStops.length > 1 ? handleCancelItinerary : handleCloseDirections}
              onCancelItinerary={handleCancelItinerary}
              isItineraryTour={Boolean(itineraryStops && itineraryStops.length > 1)}
              placeName={place?.name}
            />
          </div>
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
              {
                icon: "local_fire_department",
                color: "text-[#E84A27]",
                title: "Quán bùng nổ",
                onClick: () => {
                  const hotPlace = places.find((p) => p.hot);
                  if (hotPlace) {
                    setSelectedId(hotPlace.id);
                    mapRef.current?.flyToLocation(hotPlace.lng, hotPlace.lat, 16.5);
                  }
                },
              },
              {
                icon: "my_location",
                color: "text-blue-600",
                title: "Vị trí của tôi",
                onClick: async () => {
                  let loc = userLocation;
                  if (!loc) {
                    loc = await retryWithGps();
                  }
                  if (loc) {
                    mapRef.current?.flyToLocation(loc.lng, loc.lat, 16.5);
                  }
                },
              },
              {
                icon: "add",
                color: "text-gray-700",
                title: "Phóng to",
                onClick: () => mapRef.current?.zoomIn(),
              },
              {
                icon: "remove",
                color: "text-gray-700",
                title: "Thu nhỏ",
                onClick: () => mapRef.current?.zoomOut(),
              },
              {
                icon: "rotate_right",
                color: "text-gray-700",
                title: "Xoay bản đồ",
                onClick: () => mapRef.current?.rotate(),
              },
            ].map((btn, i) => (
              <button
                key={i}
                onClick={btn.onClick}
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

      {/* Live route badge (Bottom Left) — only show when routing */}
      {routeData && (
        <div className="absolute bottom-4 left-3 z-20 flex flex-col gap-1.5 animate-slideInUp">
          {/* Multi-stop Tour progress badge if itinerary active */}
          {itineraryStops && itineraryStops.length > 1 && (
            <div className="bg-gray-900/95 backdrop-blur-md text-white border border-cyan-500/50 rounded-2xl p-3 shadow-2xl max-w-sm flex items-center justify-between gap-3 animate-slideInUp">
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-black text-xs shrink-0 border border-cyan-500/30">
                  1/{itineraryStops.length}
                </div>
                <div className="min-w-0 flex-1 text-[11px]">
                  <div className="text-cyan-400 font-bold uppercase text-[9px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    Kế hoạch Food Tour ({itineraryStops.length} trạm dừng)
                  </div>
                  <div className="font-extrabold text-white truncate">
                    Đang tới: {itineraryStops[0]?.name}
                  </div>
                  <div className="text-gray-400 text-[10px] truncate">
                    Tiếp theo: {itineraryStops.slice(1).map((s) => s.name).join(" ➔ ")}
                  </div>
                </div>
              </div>

              {/* Nút Xóa lộ trình / Hủy chuyến đi -> Quay lại Kế hoạch */}
              <button
                onClick={handleCancelItinerary}
                title="Hủy & Xóa lộ trình này để quay về trang Lập kế hoạch"
                className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white border border-red-500/30 text-[11px] font-bold transition-all shadow-md group"
              >
                <span className="material-symbols-outlined text-[15px] group-hover:rotate-90 transition-transform">close</span>
                <span>Hủy tour</span>
              </button>
            </div>
          )}

          <div className="bg-[#E84A27] text-white rounded-full px-3 py-1.5 text-[11px] font-bold flex items-center gap-1.5 shadow-lg glow-primary w-fit">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            📍 Đang chỉ đường • {routeData.summary.totalDistance} • {routeData.summary.totalDuration}
          </div>
        </div>
      )}
    </div>
  );
}
