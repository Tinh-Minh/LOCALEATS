import { useState } from "react";
import { PRESET_LOCATIONS } from "../hooks/useRouting";

const TRANSPORT_MODES = [
  { id: "bike", icon: "🏍️", label: "Xe máy" },
  { id: "car", icon: "🚗", label: "Ô tô" },
  { id: "walk", icon: "🚶", label: "Đi bộ" },
];

const STEP_ICONS = {
  depart: "trip_origin",
  arrive: "flag",
  turn: "turn_right",
  "new name": "straight",
  merge: "merge",
  fork: "fork_right",
  roundabout: "roundabout_right",
  rotary: "roundabout_right",
  continue: "straight",
};

const GPS_WARNINGS = {
  denied: {
    icon: "location_disabled",
    color: "bg-red-50 border-red-200 text-red-700",
    iconColor: "text-red-500",
    title: "Không có quyền truy cập vị trí",
  },
  unavailable: {
    icon: "gps_off",
    color: "bg-amber-50 border-amber-200 text-amber-700",
    iconColor: "text-amber-500",
    title: "GPS không khả dụng",
  },
  fallback: {
    icon: "gps_not_fixed",
    color: "bg-amber-50 border-amber-200 text-amber-700",
    iconColor: "text-amber-500",
    title: "GPS quá chậm",
  },
};

// Nominatim geocoding helper
async function searchNominatim(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ", Việt Nam")}&limit=5&addressdetails=1&viewbox=106.5,10.6,107.0,11.0&bounded=0`;
  const res = await fetch(url, { headers: { "Accept-Language": "vi" } });
  return res.json();
}

export default function DirectionsPanel({
  routeData,
  isRouting,
  routeError,
  transportMode,
  locationStatus,
  onSwitchMode,
  onRetryGps,
  onRouteFromOrigin,
  onStartRoute,
  destination,
  onClose,
  placeName,
}) {
  const [expandedStep, setExpandedStep] = useState(null);
  const [showOriginPicker, setShowOriginPicker] = useState(false);
  const [showDestPicker, setShowDestPicker] = useState(false);
  const [originResults, setOriginResults] = useState([]);
  const [destResults, setDestResults] = useState([]);
  const [isSearchingOrigin, setIsSearchingOrigin] = useState(false);
  const [isSearchingDest, setIsSearchingDest] = useState(false);
  const [customDestName, setCustomDestName] = useState(null);

  const gpsWarning = locationStatus && GPS_WARNINGS[locationStatus] ? GPS_WARNINGS[locationStatus] : null;
  const isUsingFallback = !!gpsWarning;
  const isManualOrigin = locationStatus === "manual";

  if (!routeData && !isRouting && !routeError) return null;

  // === ORIGIN search ===
  const handleSearchOrigin = async (query) => {
    setIsSearchingOrigin(true);
    setOriginResults([]);
    try {
      const data = await searchNominatim(query);
      setOriginResults(data);
    } catch (err) {
      console.error("[Search] Origin error:", err);
    } finally {
      setIsSearchingOrigin(false);
    }
  };

  const handlePickOriginResult = (result) => {
    setShowOriginPicker(false);
    setOriginResults([]);
    const dest = destination || routeData?.destination;
    if (onRouteFromOrigin && dest) {
      onRouteFromOrigin(
        { lat: parseFloat(result.lat), lng: parseFloat(result.lon) },
        dest,
        transportMode,
        result.display_name
      );
    }
  };

  const handlePickOriginPreset = (preset) => {
    setShowOriginPicker(false);
    setOriginResults([]);
    const dest = destination || routeData?.destination;
    if (onRouteFromOrigin && dest) {
      onRouteFromOrigin({ lat: preset.lat, lng: preset.lng }, dest, transportMode, preset.name);
    }
  };

  // === DESTINATION search ===
  const handleSearchDest = async (query) => {
    setIsSearchingDest(true);
    setDestResults([]);
    try {
      const data = await searchNominatim(query);
      setDestResults(data);
    } catch (err) {
      console.error("[Search] Dest error:", err);
    } finally {
      setIsSearchingDest(false);
    }
  };

  const handlePickDestResult = (result) => {
    setShowDestPicker(false);
    setDestResults([]);
    const newDest = { lat: parseFloat(result.lat), lng: parseFloat(result.lon) };
    setCustomDestName(result.display_name);
    // Re-route with current origin and new destination
    if (routeData?.origin && onRouteFromOrigin) {
      onRouteFromOrigin(routeData.origin, newDest, transportMode, routeData.originName);
    } else if (onStartRoute) {
      onStartRoute(newDest, transportMode);
    }
  };

  // Active destination name
  const destName = customDestName || placeName;

  return (
    <div className="bg-white/95 backdrop-blur-xl border border-gray-200/90 rounded-2xl shadow-2xl overflow-hidden animate-slideInLeft w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#E84A27] to-[#FF6B35] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-white text-xl">directions</span>
          <div>
            <h3 className="text-white font-bold text-sm leading-tight">Chỉ đường</h3>
            {destName && (
              <p className="text-white/80 text-[11px] leading-tight mt-0.5 max-w-[200px] truncate">
                → {destName}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all hover:rotate-90"
        >
          <span className="material-symbols-outlined text-white text-base">close</span>
        </button>
      </div>

      {/* Loading state */}
      {isRouting && (
        <div className="p-6 flex flex-col items-center gap-3">
          <div className="relative w-12 h-12">
            <span className="absolute inset-0 rounded-full border-4 border-gray-200" />
            <span className="absolute inset-0 rounded-full border-4 border-t-[#E84A27] animate-spin" />
          </div>
          <p className="text-sm text-gray-600 font-medium">Đang tìm tuyến đường...</p>
        </div>
      )}

      {/* Error state */}
      {routeError && (
        <div className="p-4 flex items-start gap-2">
          <span className="material-symbols-outlined text-red-500 text-lg mt-0.5">error</span>
          <div>
            <p className="text-sm font-semibold text-red-600">Lỗi</p>
            <p className="text-xs text-gray-600 mt-0.5">{routeError}</p>
          </div>
        </div>
      )}

      {/* Route data */}
      {routeData && !isRouting && (
        <>
          {/* Transport mode switcher */}
          <div className="px-3 pt-3 pb-2">
            <div className="flex gap-1.5 bg-gray-100/80 rounded-xl p-1">
              {TRANSPORT_MODES.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => onSwitchMode(mode.id)}
                  className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-[11px] font-bold transition-all ${
                    transportMode === mode.id
                      ? "bg-[#E84A27] text-white shadow-md shadow-[#E84A27]/30"
                      : "text-gray-600 hover:bg-white hover:shadow-sm"
                  }`}
                >
                  <span className="text-sm">{mode.icon}</span>
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          {/* ====== ORIGIN (Điểm xuất phát) ====== */}
          <div className="mx-3 mb-1.5">
            <div className={`rounded-xl p-2.5 border transition-all ${
              isUsingFallback ? gpsWarning.color
                : isManualOrigin ? "bg-blue-50 border-blue-200 text-blue-700"
                : "bg-green-50 border-green-200 text-green-700"
            }`}>
              <div className="flex items-center gap-2">
                <span className={`material-symbols-outlined text-[15px] shrink-0 ${
                  isUsingFallback ? gpsWarning.iconColor : isManualOrigin ? "text-blue-500" : "text-green-500"
                }`}>
                  {isUsingFallback ? gpsWarning.icon : isManualOrigin ? "edit_location_alt" : "my_location"}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] opacity-60 font-medium leading-none">Điểm xuất phát</p>
                  <p className="text-[11px] font-bold leading-tight mt-0.5 truncate">
                    {isManualOrigin && routeData?.originName
                      ? routeData.originName
                      : isUsingFallback
                      ? "📍 Vị trí mặc định (Bến Thành)"
                      : "📍 Vị trí GPS của bạn"}
                  </p>
                </div>
                <button
                  onClick={() => { setShowOriginPicker(!showOriginPicker); setShowDestPicker(false); }}
                  className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-lg border transition-all hover:shadow-sm active:scale-95 shrink-0 ${
                    showOriginPicker ? "bg-gray-800 text-white border-gray-700" : "bg-white/90 hover:bg-white border-current/20"
                  }`}
                >
                  <span className="material-symbols-outlined text-[13px]">
                    {showOriginPicker ? "close" : "swap_vert"}
                  </span>
                  {showOriginPicker ? "Đóng" : "Đổi"}
                </button>
              </div>
            </div>

            {/* Origin picker panel */}
            {showOriginPicker && (
              <div className="mt-1.5 bg-white border border-gray-200 rounded-xl p-3 shadow-lg animate-slideInUp">
                <SearchInput
                  placeholder="Nhập địa chỉ xuất phát..."
                  onSearch={handleSearchOrigin}
                  isSearching={isSearchingOrigin}
                />
                <SearchResultsList results={originResults} onPick={handlePickOriginResult} disabled={isRouting} />
                {isSearchingOrigin && <SearchingIndicator />}

                {/* Use GPS button */}
                <button
                  onClick={() => { setShowOriginPicker(false); setOriginResults([]); if (onRetryGps) onRetryGps(); }}
                  disabled={isRouting}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-[11px] font-semibold mb-2 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[15px]">my_location</span>
                  Dùng vị trí GPS hiện tại
                </button>

                <PresetLocationsList presets={PRESET_LOCATIONS} onPick={handlePickOriginPreset} disabled={isRouting} />
              </div>
            )}
          </div>

          {/* Connector line between origin → dest */}
          <div className="flex justify-center">
            <div className="w-0.5 h-3 bg-gray-300 rounded-full" />
          </div>

          {/* ====== DESTINATION (Điểm đến) ====== */}
          <div className="mx-3 mb-2 mt-1">
            <div className="rounded-xl p-2.5 border bg-orange-50 border-orange-200 text-orange-700 transition-all">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[15px] text-[#E84A27] shrink-0">place</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] opacity-60 font-medium leading-none">Điểm đến</p>
                  <p className="text-[11px] font-bold leading-tight mt-0.5 truncate">
                    🏪 {destName || "Chưa chọn điểm đến"}
                  </p>
                </div>
                <button
                  onClick={() => { setShowDestPicker(!showDestPicker); setShowOriginPicker(false); }}
                  className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-lg border transition-all hover:shadow-sm active:scale-95 shrink-0 ${
                    showDestPicker ? "bg-gray-800 text-white border-gray-700" : "bg-white/90 hover:bg-white border-orange-300/40"
                  }`}
                >
                  <span className="material-symbols-outlined text-[13px]">
                    {showDestPicker ? "close" : "swap_vert"}
                  </span>
                  {showDestPicker ? "Đóng" : "Đổi"}
                </button>
              </div>
            </div>

            {/* Destination picker panel */}
            {showDestPicker && (
              <div className="mt-1.5 bg-white border border-gray-200 rounded-xl p-3 shadow-lg animate-slideInUp">
                <SearchInput
                  placeholder="Nhập địa chỉ điểm đến..."
                  onSearch={handleSearchDest}
                  isSearching={isSearchingDest}
                />
                <SearchResultsList results={destResults} onPick={handlePickDestResult} disabled={isRouting} />
                {isSearchingDest && <SearchingIndicator />}
              </div>
            )}
          </div>

          {/* Summary card */}
          <div className="mx-3 mb-2 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-3 border border-orange-100/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <span className="text-xl font-extrabold text-[#E84A27]">
                    {routeData.summary.totalDuration}
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium">thời gian</span>
                </div>
                <div className="w-px h-8 bg-orange-200" />
                <div className="flex flex-col items-center">
                  <span className="text-xl font-extrabold text-gray-800">
                    {routeData.summary.totalDistance}
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium">khoảng cách</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Tuyến nhanh nhất
                </span>
              </div>
            </div>
          </div>

          {/* Steps list */}
          <div className="max-h-[220px] overflow-y-auto styled-scrollbar px-3 pb-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              Hướng dẫn chi tiết ({routeData.steps.length} bước)
            </p>
            <div className="space-y-0.5">
              {routeData.steps.map((step, i) => {
                const isFirst = i === 0;
                const isLast = i === routeData.steps.length - 1;
                const isExpanded = expandedStep === i;
                return (
                  <button
                    key={step.id}
                    onClick={() => setExpandedStep(isExpanded ? null : i)}
                    className={`w-full text-left flex items-start gap-2.5 py-2 px-2 rounded-xl transition-all ${
                      isExpanded ? "bg-orange-50 border border-orange-100" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex flex-col items-center mt-0.5">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        isFirst ? "bg-blue-600 text-white" : isLast ? "bg-[#E84A27] text-white" : "bg-gray-200 text-gray-600"
                      }`}>
                        <span className="material-symbols-outlined text-[14px]">
                          {isFirst ? "trip_origin" : isLast ? "flag" : STEP_ICONS[step.type] || "straight"}
                        </span>
                      </div>
                      {!isLast && <div className="w-0.5 h-4 bg-gray-200 mt-0.5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-[12px] font-semibold leading-tight ${isFirst || isLast ? "text-gray-900" : "text-gray-700"}`}>
                        {step.instruction}
                      </p>
                      {step.name && <p className="text-[11px] text-gray-500 mt-0.5 truncate">{step.name}</p>}
                      {isExpanded && (
                        <div className="flex items-center gap-2 mt-1.5 text-[10px]">
                          <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-medium">📏 {step.distance}</span>
                          <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-medium">⏱ {step.duration}</span>
                        </div>
                      )}
                    </div>
                    {!isExpanded && step.rawDistance > 0 && (
                      <span className="text-[10px] text-gray-400 font-medium shrink-0 mt-0.5">{step.distance}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer: Open in Google Maps */}
          <div className="px-3 pb-3">
            <a
              href={`https://www.google.com/maps/dir/?api=1&origin=${routeData.origin.lat},${routeData.origin.lng}&destination=${routeData.destination.lat},${routeData.destination.lng}&travelmode=${transportMode === "walk" ? "walking" : "driving"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border border-gray-200 text-[12px] font-semibold text-gray-600 hover:bg-gray-50 hover:border-[#E84A27] hover:text-[#E84A27] transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              Mở trong Google Maps
            </a>
          </div>
        </>
      )}
    </div>
  );
}

// ===== Shared sub-components =====

function SearchInput({ placeholder, onSearch, isSearching }) {
  return (
    <div className="relative mb-2.5">
      <span className="material-symbols-outlined text-[16px] text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2">
        search
      </span>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-8 pr-14 py-2 text-[12px] bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#E84A27] focus:ring-1 focus:ring-[#E84A27]/30 transition-all placeholder:text-gray-400"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value.trim()) {
            onSearch(e.target.value.trim());
          }
        }}
      />
      <button
        onClick={(e) => {
          const input = e.target.closest(".relative")?.querySelector("input");
          if (input?.value.trim()) onSearch(input.value.trim());
        }}
        disabled={isSearching}
        className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2 py-1 text-[10px] font-bold bg-[#E84A27] text-white rounded-md hover:bg-[#c93d1f] transition-colors disabled:opacity-50"
      >
        Tìm
      </button>
    </div>
  );
}

function SearchResultsList({ results, onPick, disabled }) {
  if (!results?.length) return null;
  return (
    <div className="mb-2.5 border border-orange-200 rounded-lg overflow-hidden">
      <p className="text-[9px] font-bold uppercase tracking-wider text-orange-500 px-2.5 pt-2 pb-1">
        Kết quả tìm kiếm
      </p>
      <div className="max-h-[120px] overflow-y-auto styled-scrollbar">
        {results.map((result, i) => (
          <button
            key={i}
            onClick={() => onPick(result)}
            disabled={disabled}
            className="w-full text-left flex items-start gap-2 px-2.5 py-2 hover:bg-orange-50 transition-all text-[11px] border-t border-gray-100 first:border-t-0 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[14px] text-[#E84A27] mt-0.5 shrink-0">location_on</span>
            <span className="leading-tight text-gray-700">{result.display_name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function SearchingIndicator() {
  return (
    <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-2.5 px-1">
      <span className="material-symbols-outlined text-[14px] animate-spin">progress_activity</span>
      Đang tìm kiếm địa chỉ...
    </div>
  );
}

function PresetLocationsList({ presets, onPick, disabled }) {
  return (
    <>
      <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 px-1">
        Khu vực phổ biến
      </p>
      <div className="max-h-[130px] overflow-y-auto styled-scrollbar space-y-0.5">
        {presets.map((loc) => (
          <button
            key={loc.id}
            onClick={() => onPick(loc)}
            disabled={disabled}
            className="w-full text-left flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-all text-[11px] font-medium text-gray-700 active:scale-[0.98] disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[14px] text-gray-400">location_on</span>
            {loc.name}
          </button>
        ))}
      </div>
    </>
  );
}
