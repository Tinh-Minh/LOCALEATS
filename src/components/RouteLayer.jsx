import { useState, useEffect } from "react";
import { Source, Layer, Marker } from "react-map-gl/maplibre";

// Decode OSRM polyline
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

export default function RouteLayer({ routeData, transportMode, itineraryStops = [] }) {
  const [roadGhostCoords, setRoadGhostCoords] = useState(null);

  // Fetch đường đi thực tế trên mạng lưới giao thông (uốn lượn theo đường phố) nối từ Trạm 1 -> Trạm 2 -> Trạm 3...
  useEffect(() => {
    if (!itineraryStops || itineraryStops.length < 2) {
      setRoadGhostCoords(null);
      return;
    }

    const stopsQuery = itineraryStops.map((s) => `${s.lng},${s.lat}`).join(";");
    const profile = transportMode === "walk" ? "foot" : "driving";
    const url = `https://router.project-osrm.org/route/v1/${profile}/${stopsQuery}?overview=full&geometries=polyline`;

    let isMounted = true;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.code === "Ok" && data.routes?.length > 0) {
          const decoded = decodePolyline(data.routes[0].geometry);
          setRoadGhostCoords(decoded);
        } else {
          // Fallback nếu OSRM lỗi tạm thời
          setRoadGhostCoords(itineraryStops.map((s) => [s.lng, s.lat]));
        }
      })
      .catch(() => {
        if (isMounted) {
          setRoadGhostCoords(itineraryStops.map((s) => [s.lng, s.lat]));
        }
      });

    return () => {
      isMounted = false;
    };
  }, [itineraryStops, transportMode]);

  if (!routeData?.coords?.length && (!itineraryStops || itineraryStops.length < 2)) return null;

  // 1. Tuyến đường chính (Active route tới quán đầu tiên)
  const geojson = routeData?.coords?.length
    ? {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: routeData.coords,
        },
      }
    : null;

  // 2. Tuyến đường mờ tiếp nối (Ghost / Future Legs) bám sát các con đường giao thông thực tế
  const activeGhostCoords = roadGhostCoords || (itineraryStops && itineraryStops.length >= 2 ? itineraryStops.map((s) => [s.lng, s.lat]) : []);

  const ghostGeojson =
    activeGhostCoords.length >= 2
      ? {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: activeGhostCoords,
          },
        }
      : null;

  // Outline layer (border effect) cho tuyến chính
  const outlineLayer = {
    id: "route-outline",
    type: "line",
    paint: {
      "line-color": "#1a1a2e",
      "line-width": 8,
      "line-opacity": 0.35,
    },
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
  };

  // Main route line (Màu cam rực rỡ hoặc xanh lá khi đi bộ)
  const routeLayer = {
    id: "route-line",
    type: "line",
    paint: {
      "line-color": transportMode === "walk" ? "#10b981" : "#E84A27",
      "line-width": 6,
      "line-opacity": 0.95,
    },
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
  };

  // Dashed animation overlay trên tuyến chính
  const dashLayer = {
    id: "route-dash",
    type: "line",
    paint: {
      "line-color": "#ffffff",
      "line-width": 2,
      "line-dasharray": [0.5, 2],
      "line-opacity": 0.7,
    },
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
  };

  // Ghost Route Layer: Tuyến đường mờ màu xanh ngọc Cyan uốn mềm mại theo phố (liền nét, mờ dịu mắt)
  const ghostOutlineLayer = {
    id: "ghost-route-outline",
    type: "line",
    paint: {
      "line-color": "#0891b2",
      "line-width": 7,
      "line-opacity": 0.25,
    },
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
  };

  const ghostLayer = {
    id: "ghost-route-line",
    type: "line",
    paint: {
      "line-color": "#06b6d4", // Cyan xanh ngọc hiện đại
      "line-width": 4.5,
      "line-opacity": 0.65, // Mờ nhẹ, tương phản hoàn hảo với tuyến cam chính
    },
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
  };

  const { origin, destination } = routeData || {};

  return (
    <>
      {/* 1. Ghost Route Line (Đường nối mờ xanh Cyan giữa các trạm dừng tiếp theo) */}
      {ghostGeojson && (
        <Source id="ghost-route-source" type="geojson" data={ghostGeojson}>
          <Layer {...ghostOutlineLayer} />
          <Layer {...ghostLayer} />
        </Source>
      )}

      {/* 2. Tuyến đường chính (Active Route tới trạm hiện tại) */}
      {geojson && (
        <Source id="route-source" type="geojson" data={geojson}>
          <Layer {...outlineLayer} />
          <Layer {...routeLayer} />
          <Layer {...dashLayer} />
        </Source>
      )}

      {/* 3. Đánh dấu trạm dừng chân ẩm thực được tích hợp trực tiếp, sạch sẽ trên FoodPin */}

      {/* Origin marker (user location) — BIG blue pulsing dot */}
      {origin && (
        <Marker longitude={origin.lng} latitude={origin.lat} anchor="center">
          <div style={{ width: 60, height: 60, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Outer ping ring */}
            <span
              style={{
                position: "absolute",
                width: 48,
                height: 48,
                borderRadius: "50%",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
              }}
            />
            {/* Middle pulse ring */}
            <span
              style={{
                position: "absolute",
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: "rgba(59, 130, 246, 0.35)",
                animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            />
            {/* Center solid dot */}
            <div
              style={{
                position: "relative",
                zIndex: 10,
                width: 18,
                height: 18,
                borderRadius: "50%",
                backgroundColor: "#fff",
                border: "4px solid #2563eb",
                boxShadow: "0 0 12px rgba(37, 99, 235, 0.5), 0 2px 8px rgba(0,0,0,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#2563eb" }} />
            </div>
            {/* "Vị trí của tôi" label */}
            <div
              style={{
                position: "absolute",
                bottom: -20,
                left: "50%",
                transform: "translateX(-50%)",
                whiteSpace: "nowrap",
                backgroundColor: "#2563eb",
                color: "#fff",
                fontSize: 10,
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: 999,
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              }}
            >
              📍 Vị trí của tôi
            </div>
          </div>
        </Marker>
      )}

  {/* Destination marker (chỉ hiển thị khi không có danh sách itineraryStops nhiều chặng để tránh đè) */}
  {destination && (!itineraryStops || itineraryStops.length <= 1) && (
        <Marker longitude={destination.lng} latitude={destination.lat} anchor="bottom">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #E84A27, #FF6B35)",
                boxShadow: "0 4px 14px rgba(232, 74, 39, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "3px solid #fff",
                fontSize: 20,
              }}
            >
              🏪
            </div>
            {/* Pin arrow */}
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "7px solid transparent",
                borderRight: "7px solid transparent",
                borderTop: "10px solid #E84A27",
                marginTop: -2,
              }}
            />
          </div>
        </Marker>
      )}
    </>
  );
}
