import { useState, useCallback, useRef, useEffect } from "react";

const OSRM_BASE = "https://router.project-osrm.org/route/v1";

// Map transport mode to OSRM profile
const PROFILE_MAP = {
  bike: "driving", // OSRM free doesn't have "motorcycle", driving is closest
  car: "driving",
  walk: "foot",
};

// Location status constants
const LOC_STATUS = {
  PENDING: "pending",
  GPS_OK: "gps_ok",
  FALLBACK: "fallback",
  DENIED: "denied",
  UNAVAILABLE: "unavailable",
};

// Vietnamese turn-by-turn instruction mapping
const MANEUVER_MAP = {
  turn: { left: "Rẽ trái", right: "Rẽ phải", "sharp left": "Rẽ gấp trái", "sharp right": "Rẽ gấp phải", "slight left": "Rẽ nhẹ trái", "slight right": "Rẽ nhẹ phải", uturn: "Quay đầu" },
  "new name": "Tiếp tục đi thẳng",
  depart: "Bắt đầu xuất phát",
  arrive: "Đã đến nơi! 🎉",
  merge: "Nhập vào đường chính",
  "on ramp": "Lên đường cao tốc",
  "off ramp": "Rời đường cao tốc",
  fork: { left: "Rẽ trái tại ngã ba", right: "Rẽ phải tại ngã ba" },
  "end of road": { left: "Cuối đường, rẽ trái", right: "Cuối đường, rẽ phải" },
  continue: "Đi thẳng",
  roundabout: "Đi vào vòng xoay",
  rotary: "Đi vào vòng xoay",
  "roundabout turn": { left: "Rẽ trái tại vòng xoay", right: "Rẽ phải tại vòng xoay" },
  notification: "Lưu ý",
};

function getInstruction(step) {
  const { type, modifier } = step.maneuver;
  const entry = MANEUVER_MAP[type];
  if (!entry) return `Tiếp tục trên ${step.name || "đường hiện tại"}`;
  if (typeof entry === "string") return entry;
  return entry[modifier] || `Tiếp tục trên ${step.name || "đường hiện tại"}`;
}

function formatDistance(meters) {
  if (meters >= 1000) return `${(meters / 1000).toFixed(1)} km`;
  return `${Math.round(meters)} m`;
}

function formatDuration(seconds) {
  const mins = Math.max(1, Math.round(seconds / 60));
  if (mins < 60) return `${mins} phút`;
  const hrs = Math.floor(mins / 60);
  const remainMins = mins % 60;
  return remainMins > 0 ? `${hrs}h ${remainMins}p` : `${hrs} giờ`;
}

// Vận tốc thực tế tại đô thị Việt Nam (TP.HCM / Hà Nội):
// - Xe máy (bike): ~25 km/h (luồn lách hẻm tốt, nhanh nhất trong phố đông)
// - Ô tô (car): ~18 km/h (dễ kẹt xe, đường một chiều, quay đầu xa hơn)
// - Đi bộ (walk): ~4.5 - 5 km/h (chậm hơn xe máy khoảng 5 lần)
function calculateModeMetrics(rawDistanceMeters, mode) {
  let adjustedDistance = rawDistanceMeters;
  let durationSeconds = 0;

  if (mode === "walk") {
    // Đi bộ: vận tốc trung bình 4.8 km/h = 1.33 m/s, có thể đi tắt qua đường nhỏ
    adjustedDistance = rawDistanceMeters * 0.95;
    durationSeconds = Math.round(adjustedDistance / 1.33);
  } else if (mode === "car") {
    // Ô tô: quãng đường dài hơn do đường 1 chiều, cấm rẽ (~1.12x), vận tốc 18 km/h = 5 m/s
    adjustedDistance = rawDistanceMeters * 1.12;
    durationSeconds = Math.round(adjustedDistance / 5.0);
  } else {
    // Xe máy (bike): vận tốc 25 km/h = 6.94 m/s, luồn lách linh hoạt
    adjustedDistance = rawDistanceMeters;
    durationSeconds = Math.round(adjustedDistance / 6.94);
  }

  return {
    distanceText: formatDistance(adjustedDistance),
    durationText: formatDuration(durationSeconds),
    rawDistance: adjustedDistance,
    rawDuration: durationSeconds,
  };
}

// Decode OSRM polyline (Google's encoded polyline format)
function decodePolyline(encoded) {
  const coords = [];
  let index = 0, lat = 0, lng = 0;

  while (index < encoded.length) {
    let b, shift = 0, result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    lat += (result & 1) ? ~(result >> 1) : (result >> 1);

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    lng += (result & 1) ? ~(result >> 1) : (result >> 1);

    coords.push([lng / 1e5, lat / 1e5]);
  }
  return coords;
}

export default function useRouting() {
  const [routeData, setRouteData] = useState(null);
  const [isRouting, setIsRouting] = useState(false);
  const [routeError, setRouteError] = useState(null);
  const [transportMode, setTransportMode] = useState("bike");
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState(LOC_STATUS.PENDING);

  // Real GPS position tracking (vị trí GPS thực tế được trình duyệt cấp)
  const realGpsRef = useRef(null);
  const gpsPending = useRef(null);

  // Default fallback location (HCM City center - near Bến Thành)
  const FALLBACK = { lat: 10.7769, lng: 106.7009 };

  // Get user's current location - shares a single GPS promise to avoid duplicate requests
  const getUserLocation = useCallback(() => {
    // If we already got a real GPS position recently (<60s), reuse it
    if (realGpsRef.current && (Date.now() - realGpsRef.current.timestamp) < 60000) {
      console.log("[Routing] Using cached GPS position:", realGpsRef.current.loc);
      setUserLocation(realGpsRef.current.loc);
      setLocationStatus(LOC_STATUS.GPS_OK);
      return Promise.resolve(realGpsRef.current.loc);
    }

    // If a GPS request is already in progress, reuse the same promise
    if (gpsPending.current) {
      console.log("[Routing] Reusing existing GPS request...");
      return gpsPending.current;
    }

    if (!navigator.geolocation) {
      console.warn("[Routing] Geolocation API not available");
      setLocationStatus(LOC_STATUS.UNAVAILABLE);
      const loc = realGpsRef.current?.loc || FALLBACK;
      setUserLocation(loc);
      return Promise.resolve(loc);
    }

    setLocationStatus(LOC_STATUS.PENDING);
    console.log("[Routing] Requesting GPS position from browser...");

    gpsPending.current = new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          console.log("[Routing] ✅ Got real GPS:", loc, "accuracy:", pos.coords.accuracy, "m");
          realGpsRef.current = { loc, timestamp: Date.now() };
          setUserLocation(loc);
          setLocationStatus(LOC_STATUS.GPS_OK);
          gpsPending.current = null;
          resolve(loc);
        },
        (err) => {
          console.warn("[Routing] ❌ GPS error:", err.code, err.message);
          let status;
          if (err.code === 1) {
            status = LOC_STATUS.DENIED;
          } else if (err.code === 2) {
            status = LOC_STATUS.UNAVAILABLE;
          } else {
            status = LOC_STATUS.FALLBACK;
          }
          setLocationStatus(status);
          const loc = realGpsRef.current?.loc || FALLBACK;
          setUserLocation(loc);
          gpsPending.current = null;
          resolve(loc);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,     // 20 seconds - more time for first GPS fix
          maximumAge: 60000,  // 60 seconds cache
        }
      );
    });

    return gpsPending.current;
  }, []);

  // Pre-fetch GPS location on mount — so position is ready when user clicks "Chỉ đường"
  useEffect(() => {
    console.log("[Routing] Pre-fetching GPS location on mount...");
    getUserLocation();
  }, [getUserLocation]);

  // Fetch route from OSRM
  const startRoute = useCallback(async (destination, mode = transportMode) => {
    console.log("[Routing] startRoute called:", { destination, mode });
    setIsRouting(true);
    setRouteError(null);
    setRouteData(null); // Clear previous route
    setTransportMode(mode);

    try {
      const origin = await getUserLocation();
      console.log("[Routing] Origin:", origin, "→ Destination:", destination);

      const profile = PROFILE_MAP[mode] || "driving";
      const url = `${OSRM_BASE}/${profile}/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=polyline&steps=true`;

      console.log("[Routing] Fetching OSRM:", url);
      const res = await fetch(url);
      console.log("[Routing] OSRM response status:", res.status);

      if (!res.ok) throw new Error(`Lỗi kết nối dịch vụ chỉ đường (HTTP ${res.status})`);
      
      const data = await res.json();
      console.log("[Routing] OSRM data:", data);

      if (data.code !== "Ok" || !data.routes?.length) {
        throw new Error("Không tìm thấy tuyến đường phù hợp");
      }

      const route = data.routes[0];
      const coords = decodePolyline(route.geometry);
      console.log("[Routing] Decoded", coords.length, "coordinate points");

      const overallMetrics = calculateModeMetrics(route.distance, mode);
      const ratio = overallMetrics.rawDuration / Math.max(1, route.duration);
      
      const steps = route.legs[0].steps.map((step, i) => {
        const stepDuration = Math.round(step.duration * ratio);
        return {
          id: i,
          instruction: getInstruction(step),
          distance: formatDistance(step.distance),
          duration: formatDuration(stepDuration),
          name: step.name || "",
          rawDistance: step.distance,
          rawDuration: stepDuration,
          location: step.maneuver.location,
          type: step.maneuver.type,
        };
      });

      const summary = {
        totalDistance: overallMetrics.distanceText,
        totalDuration: overallMetrics.durationText,
        rawDistance: overallMetrics.rawDistance,
        rawDuration: overallMetrics.rawDuration,
      };

      const newRouteData = { coords, steps, summary, origin, destination, locationStatus, transportMode: mode };
      console.log("[Routing] ✅ Route ready:", summary, "| Location from:", locationStatus);
      setRouteData(newRouteData);
      setIsRouting(false);
      return newRouteData;
    } catch (err) {
      console.error("[Routing] ❌ Error:", err);
      setRouteError(err.message);
      setIsRouting(false);
      return null;
    }
  }, [getUserLocation, transportMode, locationStatus]);

  // Clear route & khôi phục lại GPS thật của người dùng nếu trước đó chọn điểm bắt đầu thủ công
  const clearRoute = useCallback(() => {
    console.log("[Routing] Clearing route");
    setRouteData(null);
    setRouteError(null);
    setLocationStatus(LOC_STATUS.PENDING);
    if (realGpsRef.current?.loc) {
      setUserLocation(realGpsRef.current.loc);
      setLocationStatus(LOC_STATUS.GPS_OK);
    } else {
      getUserLocation();
    }
  }, [getUserLocation]);

  // Switch transport mode & re-route
  const switchMode = useCallback(async (mode) => {
    if (routeData?.destination) {
      await startRoute(routeData.destination, mode);
    } else {
      setTransportMode(mode);
    }
  }, [routeData, startRoute]);

  // Retry GPS and re-route (user clicked "Thử lại GPS")
  const retryWithGps = useCallback(async () => {
    console.log("[Routing] Retrying GPS location...");
    // Clear cached position to force a fresh GPS request
    realGpsRef.current = null;
    setLocationStatus(LOC_STATUS.PENDING);

    if (routeData?.destination) {
      // Re-route with fresh GPS attempt
      await startRoute(routeData.destination, transportMode);
    } else {
      // Just try to get GPS position without routing
      await getUserLocation();
    }
  }, [routeData, startRoute, transportMode, getUserLocation]);

  // Route from a manually selected origin (user picks their starting point)
  const routeFromOrigin = useCallback(async (manualOrigin, destination, mode = transportMode, originName = null) => {
    console.log("[Routing] Manual origin:", manualOrigin, "→ Destination:", destination);
    setIsRouting(true);
    setRouteError(null);
    setRouteData(null);
    setTransportMode(mode);
    setUserLocation(manualOrigin);
    setLocationStatus("manual");

    try {
      const profile = PROFILE_MAP[mode] || "driving";
      const url = `${OSRM_BASE}/${profile}/${manualOrigin.lng},${manualOrigin.lat};${destination.lng},${destination.lat}?overview=full&geometries=polyline&steps=true`;

      console.log("[Routing] Fetching OSRM (manual origin):", url);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Lỗi kết nối dịch vụ chỉ đường (HTTP ${res.status})`);
      
      const data = await res.json();
      if (data.code !== "Ok" || !data.routes?.length) {
        throw new Error("Không tìm thấy tuyến đường phù hợp");
      }

      const route = data.routes[0];
      const coords = decodePolyline(route.geometry);
      
      const overallMetrics = calculateModeMetrics(route.distance, transportMode);
      const ratio = overallMetrics.rawDuration / Math.max(1, route.duration);

      const steps = route.legs[0].steps.map((step, i) => {
        const stepDuration = Math.round(step.duration * ratio);
        return {
          id: i,
          instruction: getInstruction(step),
          distance: formatDistance(step.distance),
          duration: formatDuration(stepDuration),
          name: step.name || "",
          rawDistance: step.distance,
          rawDuration: stepDuration,
          location: step.maneuver.location,
          type: step.maneuver.type,
        };
      });

      const summary = {
        totalDistance: overallMetrics.distanceText,
        totalDuration: overallMetrics.durationText,
        rawDistance: overallMetrics.rawDistance,
        rawDuration: overallMetrics.rawDuration,
      };

      const newRouteData = { coords, steps, summary, origin: manualOrigin, destination, locationStatus: "manual", originName, transportMode };
      console.log("[Routing] ✅ Route ready (manual origin):", summary);
      setRouteData(newRouteData);
      setIsRouting(false);
      return newRouteData;
    } catch (err) {
      console.error("[Routing] ❌ Error:", err);
      setRouteError(err.message);
      setIsRouting(false);
      return null;
    }
  }, [transportMode]);

  return {
    routeData,
    isRouting,
    routeError,
    transportMode,
    userLocation,
    locationStatus,
    startRoute,
    clearRoute,
    switchMode,
    setTransportMode,
    retryWithGps,
    routeFromOrigin,
  };
}

// Popular locations in HCM City for manual selection
export const PRESET_LOCATIONS = [
  { id: "benThanh", name: "Chợ Bến Thành", lat: 10.7725, lng: 106.6980 },
  { id: "q1Center", name: "Trung tâm Q.1 (Nguyễn Huệ)", lat: 10.7738, lng: 106.7030 },
  { id: "q3", name: "Quận 3 (Võ Văn Tần)", lat: 10.7796, lng: 106.6894 },
  { id: "q5", name: "Quận 5 (Chợ Lớn)", lat: 10.7540, lng: 106.6633 },
  { id: "q7", name: "Quận 7 (Phú Mỹ Hưng)", lat: 10.7295, lng: 106.7218 },
  { id: "binhThanh", name: "Bình Thạnh (Hàng Xanh)", lat: 10.8012, lng: 106.7103 },
  { id: "goVap", name: "Gò Vấp (Ngã 5)", lat: 10.8389, lng: 106.6519 },
  { id: "thuDuc", name: "TP. Thủ Đức (Suối Tiên)", lat: 10.8701, lng: 106.7612 },
  { id: "tanBinh", name: "Tân Bình (Sân bay TSN)", lat: 10.8188, lng: 106.6590 },
  { id: "phuNhuan", name: "Phú Nhuận (Phan Đình Phùng)", lat: 10.7984, lng: 106.6819 },
];
