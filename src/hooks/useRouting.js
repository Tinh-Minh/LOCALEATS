import { useState, useCallback, useRef } from "react";

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
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins} phút`;
  const hrs = Math.floor(mins / 60);
  const remainMins = mins % 60;
  return `${hrs}h ${remainMins}p`;
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

  // Cache for real GPS position (avoid asking repeatedly)
  const gpsCache = useRef(null);

  // Default fallback location (HCM City center - near Bến Thành)
  const FALLBACK = { lat: 10.7769, lng: 106.7009 };

  // Get user's current location - prioritizes real GPS
  const getUserLocation = useCallback(() => {
    return new Promise((resolve) => {
      // If we already got a real GPS position recently (<30s), reuse it
      if (gpsCache.current && (Date.now() - gpsCache.current.timestamp) < 30000) {
        console.log("[Routing] Using cached GPS position:", gpsCache.current.loc);
        setUserLocation(gpsCache.current.loc);
        setLocationStatus(LOC_STATUS.GPS_OK);
        resolve(gpsCache.current.loc);
        return;
      }

      if (!navigator.geolocation) {
        console.warn("[Routing] Geolocation API not available in this browser");
        setLocationStatus(LOC_STATUS.UNAVAILABLE);
        setUserLocation(FALLBACK);
        resolve(FALLBACK);
        return;
      }

      setLocationStatus(LOC_STATUS.PENDING);
      console.log("[Routing] Requesting GPS position from browser...");

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          console.log("[Routing] ✅ Got real GPS location:", loc, "accuracy:", pos.coords.accuracy, "m");
          gpsCache.current = { loc, timestamp: Date.now() };
          setUserLocation(loc);
          setLocationStatus(LOC_STATUS.GPS_OK);
          resolve(loc);
        },
        (err) => {
          console.warn("[Routing] ❌ GPS error:", err.code, err.message);
          
          let status;
          if (err.code === 1) {
            // PERMISSION_DENIED
            status = LOC_STATUS.DENIED;
            console.warn("[Routing] User denied GPS permission → using fallback (Bến Thành, HCM)");
          } else if (err.code === 2) {
            // POSITION_UNAVAILABLE
            status = LOC_STATUS.UNAVAILABLE;
            console.warn("[Routing] GPS position unavailable → using fallback");
          } else {
            // TIMEOUT or unknown
            status = LOC_STATUS.FALLBACK;
            console.warn("[Routing] GPS timeout → using fallback");
          }

          setLocationStatus(status);
          setUserLocation(FALLBACK);
          resolve(FALLBACK);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,     // 15 seconds - give GPS more time
          maximumAge: 30000,  // 30 seconds cache - fresher position
        }
      );
    });
  }, []);

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
      
      const steps = route.legs[0].steps.map((step, i) => ({
        id: i,
        instruction: getInstruction(step),
        distance: formatDistance(step.distance),
        duration: formatDuration(step.duration),
        name: step.name || "",
        rawDistance: step.distance,
        rawDuration: step.duration,
        location: step.maneuver.location,
        type: step.maneuver.type,
      }));

      const summary = {
        totalDistance: formatDistance(route.distance),
        totalDuration: formatDuration(route.duration),
        rawDistance: route.distance,
        rawDuration: route.duration,
      };

      const newRouteData = { coords, steps, summary, origin, destination, locationStatus };
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

  // Clear route
  const clearRoute = useCallback(() => {
    console.log("[Routing] Clearing route");
    setRouteData(null);
    setRouteError(null);
    setLocationStatus(LOC_STATUS.PENDING);
  }, []);

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
    gpsCache.current = null;
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
      
      const steps = route.legs[0].steps.map((step, i) => ({
        id: i,
        instruction: getInstruction(step),
        distance: formatDistance(step.distance),
        duration: formatDuration(step.duration),
        name: step.name || "",
        rawDistance: step.distance,
        rawDuration: step.duration,
        location: step.maneuver.location,
        type: step.maneuver.type,
      }));

      const summary = {
        totalDistance: formatDistance(route.distance),
        totalDuration: formatDuration(route.duration),
        rawDistance: route.distance,
        rawDuration: route.duration,
      };

      const newRouteData = { coords, steps, summary, origin: manualOrigin, destination, locationStatus: "manual", originName };
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
