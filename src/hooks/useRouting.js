import { useState, useCallback, useRef, useEffect } from "react";
import { localeatsApi } from "../utils/api";

const OSRM_BASE = "https://router.project-osrm.org/route/v1";

const PROFILE_MAP = {
  bike: "driving",
  car: "driving",
  walk: "foot",
};

const LOC_STATUS = {
  PENDING: "pending",
  GPS_OK: "gps_ok",
  FALLBACK: "fallback",
  DENIED: "denied",
  UNAVAILABLE: "unavailable",
};

const MANEUVER_MAP = {
  turn: {
    left: "Rẽ trái",
    right: "Rẽ phải",
    "sharp left": "Rẽ gấp trái",
    "sharp right": "Rẽ gấp phải",
    "slight left": "Rẽ nhẹ trái",
    "slight right": "Rẽ nhẹ phải",
    uturn: "Quay đầu",
  },
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
  const { type, modifier } = step.maneuver || {};
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

function calculateModeMetrics(rawDistanceMeters, mode) {
  let adjustedDistance = rawDistanceMeters;
  let durationSeconds = 0;

  if (mode === "walk") {
    adjustedDistance = rawDistanceMeters * 0.95;
    durationSeconds = Math.round(adjustedDistance / 1.33);
  } else if (mode === "car") {
    adjustedDistance = rawDistanceMeters * 1.12;
    durationSeconds = Math.round(adjustedDistance / 5.0);
  } else {
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

function decodePolyline(encoded) {
  if (!encoded) return [];
  const coords = [];
  let index = 0,
    lat = 0,
    lng = 0;

  while (index < encoded.length) {
    let b,
      shift = 0,
      result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    lat += result & 1 ? ~(result >> 1) : result >> 1;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    lng += result & 1 ? ~(result >> 1) : result >> 1;

    coords.push([lng / 1e5, lat / 1e5]);
  }
  return coords;
}

function haversineMeters(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(a)));
}

export default function useRouting() {
  const [routeData, setRouteData] = useState(null);
  const [isRouting, setIsRouting] = useState(false);
  const [routeError, setRouteError] = useState(null);
  const [transportMode, setTransportMode] = useState("bike");
  const [userLocation, setUserLocation] = useState(() => {
    try {
      const saved = localStorage.getItem("localeats_cached_gps");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.lat && parsed?.lng) return parsed;
      }
    } catch {}
    return null;
  });
  const [locationStatus, setLocationStatus] = useState(LOC_STATUS.PENDING);

  // Trang thai phien GPS (started -> moving -> near_store -> arrived sau 10 phut dung yen)
  const [navSession, setNavSession] = useState(null);

  const realGpsRef = useRef(null);
  const gpsPending = useRef(null);
  const watchIdRef = useRef(null);
  const dwellTimerRef = useRef(null);
  const navSessionRef = useRef(null);

  useEffect(() => {
    navSessionRef.current = navSession;
  }, [navSession]);

  const FALLBACK = { lat: 10.7769, lng: 106.7009 };

  const stopTrackingGps = useCallback(() => {
    if (watchIdRef.current !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    if (dwellTimerRef.current) {
      clearInterval(dwellTimerRef.current);
      dwellTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopTrackingGps();
  }, [stopTrackingGps]);

  const getUserLocation = useCallback(() => {
    if (realGpsRef.current && Date.now() - realGpsRef.current.timestamp < 60000) {
      setUserLocation(realGpsRef.current.loc);
      setLocationStatus(LOC_STATUS.GPS_OK);
      return Promise.resolve(realGpsRef.current.loc);
    }

    if (gpsPending.current) return gpsPending.current;

    if (!navigator.geolocation) {
      setLocationStatus(LOC_STATUS.UNAVAILABLE);
      const loc = realGpsRef.current?.loc || FALLBACK;
      setUserLocation(loc);
      return Promise.resolve(loc);
    }

    setLocationStatus(LOC_STATUS.PENDING);
    gpsPending.current = new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
          };
          realGpsRef.current = { loc, timestamp: Date.now() };
          try {
            localStorage.setItem("localeats_cached_gps", JSON.stringify(loc));
          } catch {}
          setUserLocation(loc);
          setLocationStatus(LOC_STATUS.GPS_OK);
          gpsPending.current = null;
          resolve(loc);
        },
        (err) => {
          let status = LOC_STATUS.FALLBACK;
          if (err.code === 1) status = LOC_STATUS.DENIED;
          else if (err.code === 2) status = LOC_STATUS.UNAVAILABLE;
          setLocationStatus(status);
          const loc = realGpsRef.current?.loc || FALLBACK;
          setUserLocation(loc);
          gpsPending.current = null;
          resolve(loc);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 45000,
        }
      );
    });

    return gpsPending.current;
  }, []);

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  // Gui ping GPS len backend hoac cap nhat state machine cuc bo neu offline
  const pushGpsPing = useCallback(async (lat, lng, accuracy = 12, speed = 0, simulatedElapsedSeconds = null) => {
    const cur = navSessionRef.current;
    if (!cur) return null;

    setUserLocation({ lat, lng, accuracy });

    if (cur.sessionId && !String(cur.sessionId).startsWith("local-")) {
      try {
        const res = await localeatsApi.sendNavigationPing(cur.sessionId, {
          latitude: lat,
          longitude: lng,
          accuracy,
          speed,
          isMock: false,
          simulatedElapsedSeconds,
        });
        setNavSession((prev) => ({
          ...(prev || {}),
          ...res,
          lastLat: lat,
          lastLng: lng,
        }));
        return res;
      } catch (e) {
        console.warn("[GPS Ping] Fallback local state machine:", e.message);
      }
    }

    // Fallback state machine phia client neu backend chua ket noi hoac place id khong phai UUID
    const distOrigin = Math.round(haversineMeters(cur.originLat, cur.originLng, lat, lng));
    const distStore = Math.round(haversineMeters(lat, lng, cur.destLat, cur.destLng));
    const dwellReq = cur.dwellRequiredSeconds || 600;
    let status = cur.status || "started";
    let dwellStartMs = cur.dwellStartMs || null;
    let dwellSec = cur.dwellSeconds || 0;

    if (distStore <= 100) {
      status = "near_store";
      if (!dwellStartMs) dwellStartMs = Date.now();
      dwellSec = Math.floor((Date.now() - dwellStartMs) / 1000) + (simulatedElapsedSeconds || 0);
      if (dwellSec >= dwellReq) {
        status = "arrived";
        dwellSec = dwellReq;
      }
    } else {
      dwellStartMs = null;
      dwellSec = 0;
      if (distOrigin >= 50 || status === "near_store") {
        status = "moving";
      }
    }

    const statusLabel =
      status === "started"
        ? "Đã lấy GPS điểm xuất phát"
        : status === "moving"
        ? "Đang di chuyển tới quán"
        : status === "near_store"
        ? "Đã tới gần quán (đang đếm 10 phút dừng GPS)"
        : "Đã đến quán ăn (Xác nhận GPS >= 10 phút)";

    const next = {
      ...cur,
      status,
      statusLabel,
      distanceFromOriginMeters: distOrigin,
      distanceToStoreMeters: distStore,
      dwellStartMs,
      dwellSeconds: dwellSec,
      dwellRequiredSeconds: dwellReq,
      dwellRemainingSeconds: Math.max(0, dwellReq - dwellSec),
      arrived: status === "arrived",
      lastLat: lat,
      lastLng: lng,
    };
    setNavSession(next);
    return next;
  }, []);

  // Bat dau lang nghe thay doi GPS lien tuc (watchPosition) + bo dem 1s khi dang o gan quan
  const beginLiveGpsWatch = useCallback(
    (initialSession) => {
      stopTrackingGps();
      setNavSession(initialSession);
      navSessionRef.current = initialSession;

      if (navigator.geolocation) {
        watchIdRef.current = navigator.geolocation.watchPosition(
          (pos) => {
            pushGpsPing(
              pos.coords.latitude,
              pos.coords.longitude,
              pos.coords.accuracy || 12,
              pos.coords.speed || 0
            );
          },
          () => {},
          {
            enableHighAccuracy: true,
            maximumAge: 5000,
            timeout: 15000,
          }
        );
      }

      // Bo dem cap nhat moi 5 giay khi nguoi dung dang dung yen tai quan (near_store)
      dwellTimerRef.current = setInterval(() => {
        const s = navSessionRef.current;
        if (!s || s.status === "arrived" || s.status === "cancelled") return;
        if (s.status === "near_store" && s.lastLat && s.lastLng) {
          pushGpsPing(s.lastLat, s.lastLng, 10, 0, null);
        }
      }, 5000);
    },
    [pushGpsPing, stopTrackingGps]
  );

  // Ham mo phong di chuyen GPS & dung yen 10 phut de kiem thu ngay tren trinh duyet
  const simulateGpsAction = useCallback(
    async (actionType) => {
      const s = navSessionRef.current;
      if (!s) return;
      if (actionType === "moving") {
        // Dich chuyen doc theo tuyen duong thuc te (~45% lo trinh) hoac trung diem (> 50m -> status = 'moving')
        let midLat = s.originLat + (s.destLat - s.originLat) * 0.45;
        let midLng = s.originLng + (s.destLng - s.originLng) * 0.45;
        if (routeData?.coords && routeData.coords.length > 2) {
          const idx = Math.min(routeData.coords.length - 2, Math.max(1, Math.floor(routeData.coords.length * 0.45)));
          const pt = routeData.coords[idx]; // [lng, lat]
          if (Array.isArray(pt) && pt.length >= 2) {
            midLng = pt[0];
            midLat = pt[1];
          }
        }
        await pushGpsPing(midLat, midLng, 10, 6.5, null);
      } else if (actionType === "near_store") {
        // Di chuyen vao sat quan (~18m, <= 100m geofence -> status = 'near_store', bat dau dem 10 phut)
        const nearLat = s.destLat + 0.00012;
        const nearLng = s.destLng + 0.00012;
        await pushGpsPing(nearLat, nearLng, 8, 0.2, null);
      } else if (actionType === "arrived_10min") {
        // Xac nhan da dung yen tai quan >= 600 giay (10 phut) -> status = 'arrived' + ghi store_visit
        const nearLat = s.destLat + 0.00008;
        const nearLng = s.destLng + 0.00008;
        await pushGpsPing(nearLat, nearLng, 8, 0.0, 605);
      }
    },
    [pushGpsPing, routeData]
  );

  const fetchDirectOsrmRoute = useCallback(async (origin, destination, mode) => {
    const profile = PROFILE_MAP[mode] || "driving";
    const osmDeProfile = mode === "walk" ? "routed-foot" : mode === "car" ? "routed-car" : "routed-bike";
    const urls = [
      `${OSRM_BASE}/${profile}/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=polyline&steps=true`,
      `https://routing.openstreetmap.de/${osmDeProfile}/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=polyline&steps=true`,
    ];
    for (const url of urls) {
      try {
        const res = await fetch(url);
        if (!res.ok) continue;
        const data = await res.json();
        if (data.code === "Ok" && data.routes?.length) {
          const route = data.routes[0];
          const coords = decodePolyline(route.geometry);
          if (coords.length > 2) {
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
            return { coords, steps, summary };
          }
        }
      } catch {}
    }
    return null;
  }, []);

  const startRoute = useCallback(
    async (destination, mode = transportMode) => {
      setIsRouting(true);
      setRouteError(null);
      setRouteData(null);
      setTransportMode(mode);

      try {
        const origin = await getUserLocation();
        const storeIdCandidate = destination?.storeId || destination?.id;
        const isUuid =
          typeof storeIdCandidate === "string" &&
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(storeIdCandidate);

        // 1. Thu bat dau phien GPS & tinh duong qua Backend tren VPS DB
        if (isUuid) {
          try {
            const sessionRes = await localeatsApi.startNavigationSession({
              storeId: storeIdCandidate,
              mode,
              originLat: origin.lat,
              originLng: origin.lng,
              accuracy: origin.accuracy || 15,
            });
            const backendRoute = sessionRes.route;
            let coords = decodePolyline(backendRoute.polyline);
            let steps = (backendRoute.steps || []).map((st, i) => ({
              id: i,
              instruction: st.instruction,
              distance: st.distanceText || formatDistance(st.distanceMeters || 0),
              duration: st.durationText || "1 phút",
              name: st.name || "",
              rawDistance: st.distanceMeters || 0,
              rawDuration: st.durationSeconds || 60,
              location: [st.lng || destination.lng, st.lat || destination.lat],
              type: st.type || (i === 0 ? "depart" : i === backendRoute.steps.length - 1 ? "arrive" : "continue"),
            }));
            let summary = {
              totalDistance: backendRoute.distanceText,
              totalDuration: backendRoute.durationText,
              rawDistance: backendRoute.distanceMeters,
              rawDuration: backendRoute.durationSeconds,
            };

            // Neu backend fallback sang duong thang 2 diem (internal_astar), goi OSRM de lay geometry bam sat duong pho thuc te
            if (coords.length <= 2 || backendRoute.provider === "internal_astar") {
              const osrmRoad = await fetchDirectOsrmRoute(origin, destination, mode);
              if (osrmRoad) {
                coords = osrmRoad.coords;
                steps = osrmRoad.steps;
                summary = osrmRoad.summary;
              }
            }

            const newRouteData = {
              coords,
              steps,
              summary,
              origin,
              destination,
              locationStatus,
              transportMode: mode,
            };
            setRouteData(newRouteData);
            setIsRouting(false);

            beginLiveGpsWatch({
              sessionId: sessionRes.sessionId,
              storeId: sessionRes.storeId,
              storeName: sessionRes.storeName,
              status: sessionRes.status,
              statusLabel: sessionRes.statusLabel,
              distanceFromOriginMeters: 0,
              distanceToStoreMeters: sessionRes.distanceToStoreMeters,
              dwellSeconds: sessionRes.dwellSeconds || 0,
              dwellRequiredSeconds: sessionRes.dwellRequiredSeconds || 600,
              dwellRemainingSeconds: sessionRes.dwellRemainingSeconds || 600,
              originLat: origin.lat,
              originLng: origin.lng,
              destLat: destination.lat,
              destLng: destination.lng,
              lastLat: origin.lat,
              lastLng: origin.lng,
            });
            return newRouteData;
          } catch (apiErr) {
            console.warn("[Routing] Backend session unavailable, using direct OSRM + local GPS tracker:", apiErr.message);
          }
        }

        // 2. Fallback: goi OSRM truc tiep + van kich hoat bo theo doi GPS 10 phut
        const profile = PROFILE_MAP[mode] || "driving";
        const url = `${OSRM_BASE}/${profile}/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=polyline&steps=true`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Lỗi kết nối dịch vụ chỉ đường (HTTP ${res.status})`);
        const data = await res.json();
        if (data.code !== "Ok" || !data.routes?.length) {
          throw new Error("Không tìm thấy tuyến đường phù hợp");
        }

        const route = data.routes[0];
        const coords = decodePolyline(route.geometry);
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
        setRouteData(newRouteData);
        setIsRouting(false);

        const initDist = Math.round(haversineMeters(origin.lat, origin.lng, destination.lat, destination.lng));
        beginLiveGpsWatch({
          sessionId: `local-${Date.now()}`,
          storeId: storeIdCandidate || "local",
          status: initDist <= 100 ? "near_store" : "started",
          statusLabel:
            initDist <= 100
              ? "Đã tới gần quán (đang đếm 10 phút dừng GPS)"
              : "Đã lấy GPS điểm xuất phát",
          distanceFromOriginMeters: 0,
          distanceToStoreMeters: initDist,
          dwellSeconds: 0,
          dwellRequiredSeconds: 600,
          dwellRemainingSeconds: 600,
          originLat: origin.lat,
          originLng: origin.lng,
          destLat: destination.lat,
          destLng: destination.lng,
          lastLat: origin.lat,
          lastLng: origin.lng,
        });

        return newRouteData;
      } catch (err) {
        setRouteError(err.message);
        setIsRouting(false);
        return null;
      }
    },
    [getUserLocation, transportMode, locationStatus, beginLiveGpsWatch, fetchDirectOsrmRoute]
  );

  const clearRoute = useCallback(() => {
    stopTrackingGps();
    if (navSessionRef.current?.sessionId && !String(navSessionRef.current.sessionId).startsWith("local-")) {
      localeatsApi.cancelNavigationSession(navSessionRef.current.sessionId).catch(() => {});
    }
    setNavSession(null);
    setRouteData(null);
    setRouteError(null);
    setLocationStatus(LOC_STATUS.PENDING);
    if (realGpsRef.current?.loc) {
      setUserLocation(realGpsRef.current.loc);
      setLocationStatus(LOC_STATUS.GPS_OK);
    } else {
      getUserLocation();
    }
  }, [getUserLocation, stopTrackingGps]);

  const switchMode = useCallback(
    async (mode) => {
      if (routeData?.destination) {
        await startRoute(routeData.destination, mode);
      } else {
        setTransportMode(mode);
      }
    },
    [routeData, startRoute]
  );

  const retryWithGps = useCallback(async () => {
    realGpsRef.current = null;
    setLocationStatus(LOC_STATUS.PENDING);
    if (routeData?.destination) {
      return await startRoute(routeData.destination, transportMode);
    }
    return await getUserLocation();
  }, [routeData, startRoute, transportMode, getUserLocation]);

  const routeFromOrigin = useCallback(
    async (manualOrigin, destination, mode = transportMode, originName = null) => {
      setIsRouting(true);
      setRouteError(null);
      setRouteData(null);
      setTransportMode(mode);
      setUserLocation(manualOrigin);
      setLocationStatus("manual");

      try {
        const profile = PROFILE_MAP[mode] || "driving";
        const url = `${OSRM_BASE}/${profile}/${manualOrigin.lng},${manualOrigin.lat};${destination.lng},${destination.lat}?overview=full&geometries=polyline&steps=true`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Lỗi kết nối dịch vụ chỉ đường (HTTP ${res.status})`);
        const data = await res.json();
        if (data.code !== "Ok" || !data.routes?.length) {
          throw new Error("Không tìm thấy tuyến đường phù hợp");
        }

        const route = data.routes[0];
        const coords = decodePolyline(route.geometry);
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

        const newRouteData = {
          coords,
          steps,
          summary,
          origin: manualOrigin,
          destination,
          locationStatus: "manual",
          originName,
          transportMode: mode,
        };
        setRouteData(newRouteData);
        setIsRouting(false);
        return newRouteData;
      } catch (err) {
        setRouteError(err.message);
        setIsRouting(false);
        return null;
      }
    },
    [transportMode]
  );

  return {
    routeData,
    isRouting,
    routeError,
    transportMode,
    userLocation,
    locationStatus,
    navSession,
    startRoute,
    clearRoute,
    switchMode,
    setTransportMode,
    retryWithGps,
    routeFromOrigin,
    simulateGpsAction,
  };
}

export const PRESET_LOCATIONS = [
  { id: "benThanh", name: "Chợ Bến Thành", lat: 10.7725, lng: 106.698 },
  { id: "q1Center", name: "Trung tâm Q.1 (Nguyễn Huệ)", lat: 10.7738, lng: 106.703 },
  { id: "q3", name: "Quận 3 (Võ Văn Tần)", lat: 10.7796, lng: 106.6894 },
  { id: "q5", name: "Quận 5 (Chợ Lớn)", lat: 10.754, lng: 106.6633 },
  { id: "q7", name: "Quận 7 (Phú Mỹ Hưng)", lat: 10.7295, lng: 106.7218 },
  { id: "binhThanh", name: "Bình Thạnh (Hàng Xanh)", lat: 10.8012, lng: 106.7103 },
  { id: "goVap", name: "Gò Vấp (Ngã 5)", lat: 10.8389, lng: 106.6519 },
  { id: "thuDuc", name: "TP. Thủ Đức (Suối Tiên)", lat: 10.8701, lng: 106.7612 },
  { id: "tanBinh", name: "Tân Bình (Sân bay TSN)", lat: 10.8188, lng: 106.659 },
  { id: "phuNhuan", name: "Phú Nhuận (Phan Đình Phùng)", lat: 10.7984, lng: 106.6819 },
];
