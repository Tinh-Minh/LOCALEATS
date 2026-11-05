import { useState, useEffect, useRef, useImperativeHandle, forwardRef, useMemo } from "react";
import { Map, Marker, NavigationControl } from "react-map-gl/maplibre";
import * as maplibregl from "maplibre-gl";
import { setWorkerUrl } from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import "maplibre-gl/dist/maplibre-gl.css";
import FoodPin from "./FoodPin";
import RouteLayer from "./RouteLayer";
import { getGoogleMapStyle } from "../utils/mapStyles";

setWorkerUrl(workerUrl);

// Bản đồ 3D Vector OpenFreeMap Liberty hiển thị chi tiết các khối nhà 3D và góc nghiêng đô thị
const MAP_STYLE_3D = "https://tiles.openfreemap.org/styles/liberty";

const MapView = forwardRef(function MapView(
  { places, selectedId, onSelect, onMapClick, routeData, transportMode, userLocation, itineraryStops = [] },
  ref
) {
  const mapRef = useRef(null);
  const [currentZoom, setCurrentZoom] = useState(15.5);

  // Chế độ bản đồ: 'google' (Google Maps 2D) | 'satellite' (Vệ tinh Google) | '3d' (Bản đồ 3D)
  const [mapMode, setMapMode] = useState(() => {
    try {
      return localStorage.getItem("localeats_map_mode") || "google";
    } catch {
      return "google";
    }
  });

  // Lớp báo kẹt xe thời gian thực (Live Traffic)
  const [showTraffic, setShowTraffic] = useState(() => {
    try {
      return localStorage.getItem("localeats_traffic_mode") === "true";
    } catch {
      return false;
    }
  });

  const handleToggleTraffic = () => {
    setShowTraffic((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("localeats_traffic_mode", String(next));
      } catch {}
      return next;
    });
  };

  const handleToggleMapMode = (newMode) => {
    setMapMode(newMode);
    try {
      localStorage.setItem("localeats_map_mode", newMode);
    } catch {}

    if (mapRef.current) {
      if (newMode === "3d") {
        mapRef.current.easeTo({
          pitch: 55,
          bearing: 20,
          duration: 800,
        });
      } else {
        // Chế độ Google Maps 2D & Vệ tinh: Phẳng 2D nhìn thẳng từ trên xuống
        mapRef.current.easeTo({
          pitch: 0,
          bearing: 0,
          duration: 800,
        });
      }
    }
  };

  // Lọc sạch toàn bộ icon quán xá, địa điểm của Google Maps (giữ nguyên 100% tên đường & đường phố)
  const [hideGooglePoi, setHideGooglePoi] = useState(() => {
    try {
      const saved = localStorage.getItem("localeats_hide_google_poi");
      return saved !== null ? saved === "true" : true; // Mặc định BẬT ẩn để bản đồ sạch đẹp
    } catch {
      return true;
    }
  });

  const handleTogglePoi = () => {
    setHideGooglePoi((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("localeats_hide_google_poi", String(next));
      } catch {}
      return next;
    });
  };

  const currentMapStyle = useMemo(() => {
    if (mapMode === "3d") {
      return MAP_STYLE_3D;
    }
    return getGoogleMapStyle(mapMode, showTraffic, hideGooglePoi);
  }, [mapMode, showTraffic, hideGooglePoi]);

  // Expose các phương thức điều khiển bản đồ ra ngoài cho component cha (MapPage)
  useImperativeHandle(ref, () => ({
    zoomIn: () => {
      if (mapRef.current) {
        mapRef.current.zoomIn({ duration: 300 });
      }
    },
    zoomOut: () => {
      if (mapRef.current) {
        mapRef.current.zoomOut({ duration: 300 });
      }
    },
    rotate: () => {
      if (mapRef.current) {
        const currentBearing = mapRef.current.getBearing();
        mapRef.current.rotateTo((currentBearing + 45) % 360, { duration: 500 });
      }
    },
    flyToLocation: (lng, lat, zoom = 16) => {
      if (mapRef.current) {
        mapRef.current.flyTo({ center: [lng, lat], zoom, duration: 1200 });
      }
    },
    easeToLocation: (lng, lat, zoom = 16) => {
      if (mapRef.current) {
        mapRef.current.easeTo({ center: [lng, lat], zoom, duration: 600 });
      }
    },
    resetNorth: () => {
      if (mapRef.current) {
        mapRef.current.resetNorth({ duration: 500 });
      }
    },
    resetView: () => {
      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [106.7005, 10.7745],
          zoom: 15.5,
          pitch: mapMode === "3d" ? 55 : 0,
          bearing: mapMode === "3d" ? 20 : 0,
          duration: 1000,
        });
      }
    },
    resetToInitialView: () => {
      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [106.7005, 10.7745],
          zoom: 15.5,
          pitch: mapMode === "3d" ? 55 : 0,
          bearing: mapMode === "3d" ? 20 : 0,
          duration: 1000,
        });
      }
    },
    fitBounds: (bounds, options) => {
      if (mapRef.current) {
        mapRef.current.fitBounds(bounds, options);
      }
    },
  }));

  // TỰ ĐỘNG THU PHÓNG (FITBOUNDS) ĐỂ THẤY TRỌN VẸN CẢ VỊ TRÍ CỦA TÔI ĐẾN ĐÍCH ĐẾN KHI NHẤN CHỈ ĐƯỜNG
  useEffect(() => {
    if (!mapRef.current) return;

    const points = [];

    // 1. Toàn bộ tọa độ trên đường đi (routeData.coords)
    if (routeData?.coords && routeData.coords.length > 0) {
      routeData.coords.forEach(([lng, lat]) => points.push([lng, lat]));
    }

    // 2. Điểm xuất phát (Vị trí của tôi)
    if (routeData?.origin?.lng && routeData?.origin?.lat) {
      points.push([routeData.origin.lng, routeData.origin.lat]);
    } else if (userLocation?.lng && userLocation?.lat && (routeData || itineraryStops?.length > 1)) {
      points.push([userLocation.lng, userLocation.lat]);
    }

    // 3. Điểm đến
    if (routeData?.destination?.lng && routeData?.destination?.lat) {
      points.push([routeData.destination.lng, routeData.destination.lat]);
    }

    // 4. Các điểm dừng trong tour (nếu có)
    if (itineraryStops && itineraryStops.length > 0) {
      itineraryStops.forEach((s) => {
        if (s.lng && s.lat) points.push([s.lng, s.lat]);
      });
    }

    if (points.length < 2) return;

    try {
      let minLng = Infinity, maxLng = -Infinity, minLat = Infinity, maxLat = -Infinity;

      points.forEach(([lng, lat]) => {
        if (lng < minLng) minLng = lng;
        if (lng > maxLng) maxLng = lng;
        if (lat < minLat) minLat = lat;
        if (lat > maxLat) maxLat = lat;
      });

      const bounds = [[minLng, minLat], [maxLng, maxLat]];

      // Cân chỉnh padding thông minh theo màn hình Desktop (panel bên trái) và Mobile (panel bên dưới)
      const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
      const padding = isMobile
        ? { top: 90, bottom: 280, left: 50, right: 50 }
        : { top: 100, bottom: 100, left: 400, right: 100 };

      mapRef.current.fitBounds(bounds, {
        padding,
        duration: 1200,
        maxZoom: 16.0,
      });
    } catch (err) {
      console.warn("[MapView] fitBounds error:", err);
    }
  }, [routeData, userLocation, itineraryStops]);

  // Bay đến quán được chọn
  useEffect(() => {
    if (!selectedId || !mapRef.current || routeData) return;
    const place = places.find((p) => p.id === selectedId);
    if (place) {
      mapRef.current.flyTo({
        center: [place.lng, place.lat],
        zoom: 16,
        pitch: mapMode === "3d" ? 55 : 0,
        duration: 800,
      });
    }
  }, [selectedId, places, routeData, mapMode]);

  return (
    <div className="absolute inset-0">
      {/* CỤM THANH CÔNG CỤ BẢN ĐỒ GOOGLE MAPS & GIAO THÔNG (TOP RIGHT) */}
      <div className="absolute top-13 sm:top-14 right-2 sm:right-4 z-20 flex flex-col items-end gap-1.5 select-none pointer-events-auto">
        {/* Hàng 1: Chuyển đổi 3 chế độ: Google Maps 2D ⇄ Vệ tinh Hybrid ⇄ 3D */}
        <div className="flex items-center bg-white/95 backdrop-blur-md p-1 rounded-2xl shadow-xl border border-gray-200/90 text-[10.5px] sm:text-[11px] font-black">
          <button
            type="button"
            onClick={() => handleToggleMapMode("google")}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
              mapMode === "google"
                ? "bg-[#1a73e8] text-white shadow-md shadow-blue-500/25 scale-102"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            }`}
            title="Bản đồ Google Maps dạng 2D phẳng truyền thống"
          >
            <span className="material-symbols-outlined text-[15px] sm:text-[16px]">map</span>
            <span>Bản đồ (2D)</span>
          </button>

          <button
            type="button"
            onClick={() => handleToggleMapMode("satellite")}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
              mapMode === "satellite"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/25 scale-102"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            }`}
            title="Ảnh chụp Vệ tinh Google Maps Hybrid (xem nóc nhà, sân vườn, bãi đỗ xe)"
          >
            <span className="material-symbols-outlined text-[15px] sm:text-[16px]">satellite_alt</span>
            <span>Vệ tinh</span>
          </button>

          <button
            type="button"
            onClick={() => handleToggleMapMode("3d")}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
              mapMode === "3d"
                ? "bg-gradient-to-r from-[#E84A27] to-[#FF9F1C] text-white shadow-md shadow-orange-500/25 scale-102"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            }`}
            title="Bản đồ 3D góc nghiêng không gian đô thị"
          >
            <span className="material-symbols-outlined text-[15px] sm:text-[16px]">view_in_ar</span>
            <span>3D</span>
          </button>
        </div>

        {/* Hàng 2: Bộ lọc ẩn icon rác của Google & Lớp Giao thông thời gian thực */}
        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          {/* Nút Ẩn/Hiện icon rác Google */}
          <button
            type="button"
            onClick={handleTogglePoi}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-lg border border-gray-200/90 text-[10px] sm:text-[11px] font-black transition-all cursor-pointer backdrop-blur-md ${
              hideGooglePoi
                ? "bg-amber-500 text-white shadow-amber-500/25"
                : "bg-white/95 text-gray-700 hover:bg-gray-100"
            }`}
            title="Ẩn/Hiện toàn bộ các icon quán xá và địa điểm của Google Maps (giữ nguyên tên đường)"
          >
            <span className="material-symbols-outlined text-[14px]">
              {hideGooglePoi ? "visibility_off" : "visibility"}
            </span>
            <span>{hideGooglePoi ? "Đã ẩn icon Google" : "Hiện icon Google"}</span>
          </button>

          {/* Lớp Live Traffic */}
          <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-lg border border-gray-200/90 text-[10px] sm:text-[11px] font-black">
            <button
              type="button"
              onClick={handleToggleTraffic}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full transition-all cursor-pointer ${
              showTraffic
                ? "bg-rose-500 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
            title="Bật/Tắt dữ liệu giao thông kẹt xe thời gian thực của Google"
          >
            <span className="relative flex h-2 w-2">
              {showTraffic && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              )}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${showTraffic ? "bg-white" : "bg-emerald-500"}`} />
            </span>
            <span>Giao thông Live</span>
            <span className="text-[9px] px-1 py-0.2 rounded bg-black/15 font-bold uppercase">
              {showTraffic ? "BẬT" : "TẮT"}
            </span>
          </button>

          {showTraffic && (
            <div className="hidden xs:flex items-center gap-1.5 pl-1.5 border-l border-gray-200 text-[9px] text-gray-500 font-bold">
              <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Thoáng</span>
              <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Đông</span>
              <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-full bg-rose-600" /> Kẹt</span>
            </div>
          )}
          </div>
        </div>
      </div>

      <Map
        ref={mapRef}
        mapLib={maplibregl}
        mapStyle={currentMapStyle}
        attributionControl={false}
        onClick={(e) => {
          // Chỉ gọi onMapClick nếu không click trúng marker
          if (onMapClick) onMapClick(e);
        }}
        onMove={(e) => {
          if (e?.viewState?.zoom !== undefined) {
            setCurrentZoom(e.viewState.zoom);
          }
        }}
        initialViewState={{
          longitude: 106.7005,
          latitude: 10.7745,
          zoom: 15.5,
          pitch: mapMode === "3d" ? 55 : 0,
          bearing: mapMode === "3d" ? 20 : 0,
        }}
        maxPitch={mapMode === "3d" ? 70 : 0}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Route layer (rendered below pins) */}
        <RouteLayer
          routeData={routeData}
          transportMode={transportMode}
          itineraryStops={itineraryStops}
        />

        {/* User GPS location marker when no route is active */}
        {!routeData && userLocation && (
          <Marker longitude={userLocation.lng} latitude={userLocation.lat} anchor="center">
            <div className="relative flex items-center justify-center w-10 h-10">
              <span className="absolute w-8 h-8 rounded-full bg-blue-500/25 animate-ping" />
              <span className="absolute w-6 h-6 rounded-full bg-blue-500/40 animate-pulse" />
              <div className="relative z-10 w-4 h-4 rounded-full bg-white border-3 border-blue-600 shadow-md flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              </div>
            </div>
          </Marker>
        )}

        {/* Food pins: Khi xem lộ trình, chỉ hiển thị các quán liên quan để tránh rối mắt */}
        {places
          .filter((p) => {
            if (itineraryStops && itineraryStops.length > 0) {
              return itineraryStops.some((s) => s.id === p.id);
            }
            if (routeData) {
              return p.id === selectedId;
            }
            return true;
          })
          .map((p) => {
            const itinIndex = itineraryStops?.findIndex((s) => s.id === p.id);
            const itineraryOrder = itinIndex >= 0 ? itinIndex + 1 : null;
            return (
              <Marker key={p.id} longitude={p.lng} latitude={p.lat} anchor="bottom">
                <FoodPin
                  place={p}
                  active={p.id === selectedId}
                  itineraryOrder={itineraryOrder}
                  zoomLevel={currentZoom}
                  onClick={() => onSelect(p.id)}
                />
              </Marker>
            );
          })}

        {/* Destination marker: ĐÍCH ĐẾN CUỐI CÙNG mà người dùng đã chọn trên bản đồ */}
        {itineraryStops
          ?.filter((s) => s.isDestination)
          .map((destStop) => (
            <Marker key={destStop.id || "dest-marker"} longitude={destStop.lng} latitude={destStop.lat} anchor="bottom">
              <div
                onClick={() => onSelect && onSelect(destStop.id)}
                className="flex flex-col items-center group cursor-pointer animate-slideInUp z-30 select-none hover:scale-110 active:scale-95 transition-transform"
                title={`Đích đến: ${destStop.name}`}
              >
                {/* Tooltip badge với tên điểm đến rõ ràng */}
                <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white px-3 py-1 rounded-full text-[11px] font-black shadow-xl border-2 border-white flex items-center gap-1.5 whitespace-nowrap mb-1">
                  <span className="text-[13px]">🏁</span>
                  <span className="tracking-wide">ĐÍCH ĐẾN: {destStop.name}</span>
                </div>
                {/* Icon ghim đích đến với viền phát sáng */}
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 text-white flex items-center justify-center font-black shadow-2xl border-3 border-white ring-4 ring-red-400/40">
                  <span className="material-symbols-outlined text-[24px]">flag</span>
                </div>
                <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[10px] border-t-red-600 -mt-0.5" />
              </div>
            </Marker>
          ))}
      </Map>
    </div>
  );
});

export default MapView;
