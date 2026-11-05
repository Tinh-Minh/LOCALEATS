// Google Maps Cartography Styles with Clean POI Filtering
// GIỮ 100% TÊN ĐƯỜNG & HẺM (s.t:3), SÔNG NGÒI, CÔNG VIÊN
// ẨN TRIỆT ĐỂ TOÀN BỘ ICON QUÁN XÁ / ĐỊA ĐIỂM RÁC CỦA GOOGLE MAPS (s.t:2) VÀ ICON TRẠM XE BUÝT (s.t:4|s.e:l.i)
export function getGoogleMapStyle(mode = "google", showTraffic = false, hidePoi = true) {
  let lyrs = "m";
  if (mode === "satellite") {
    lyrs = showTraffic ? "y,traffic" : "y";
  } else {
    lyrs = showTraffic ? "m,traffic" : "m";
  }

  // apistyle syntax:
  // s.t:2 = POI (Points of Interest: nhà hàng, quán ăn, khách sạn, cửa hàng, ATM...)
  // s.t:4|s.e:l.i = Transit station labels icons (icon trạm xe buýt, metro)
  // s.t:3 = Road (được giữ nguyên vẹn 100% kèm tên đường rõ nét)
  const poiParam = hidePoi ? "&apistyle=s.t:2%7Cp.v:off,s.t:4%7Cs.e:l.i%7Cp.v:off" : "";

  return {
    version: 8,
    sources: {
      "google-tiles": {
        type: "raster",
        tiles: [
          `https://mt0.google.com/vt/lyrs=${lyrs}${poiParam}&hl=vi&x={x}&y={y}&z={z}`,
          `https://mt1.google.com/vt/lyrs=${lyrs}${poiParam}&hl=vi&x={x}&y={y}&z={z}`,
          `https://mt2.google.com/vt/lyrs=${lyrs}${poiParam}&hl=vi&x={x}&y={y}&z={z}`,
          `https://mt3.google.com/vt/lyrs=${lyrs}${poiParam}&hl=vi&x={x}&y={y}&z={z}`,
        ],
        tileSize: 256,
        attribution: "© Google Maps",
      },
    },
    layers: [
      {
        id: "google-tiles-layer",
        type: "raster",
        source: "google-tiles",
        minzoom: 0,
        maxzoom: 22,
      },
    ],
  };
}
