import { Source, Layer, Marker } from "react-map-gl/maplibre";

/**
 * Vẽ tuyến đường + điểm bắt đầu/kết thúc lên bản đồ
 */
export default function RouteLayer({ routeData, transportMode }) {
  if (!routeData?.coords?.length) return null;

  const geojson = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: routeData.coords,
    },
  };

  // Outline layer (border effect)
  const outlineLayer = {
    id: "route-outline",
    type: "line",
    paint: {
      "line-color": "#1a1a2e",
      "line-width": 8,
      "line-opacity": 0.3,
    },
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
  };

  // Main route line
  const routeLayer = {
    id: "route-line",
    type: "line",
    paint: {
      "line-color": transportMode === "walk" ? "#10b981" : "#E84A27",
      "line-width": 5,
      "line-opacity": 0.9,
    },
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
  };

  // Dashed animation overlay
  const dashLayer = {
    id: "route-dash",
    type: "line",
    paint: {
      "line-color": "#ffffff",
      "line-width": 2,
      "line-dasharray": [0.5, 2],
      "line-opacity": 0.6,
    },
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
  };

  const { origin, destination } = routeData;

  return (
    <>
      {/* Route path */}
      <Source id="route-source" type="geojson" data={geojson}>
        <Layer {...outlineLayer} />
        <Layer {...routeLayer} />
        <Layer {...dashLayer} />
      </Source>

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

      {/* Destination marker */}
      {destination && (
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
