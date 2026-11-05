// Google Maps Cartography Styles
export function getGoogleMapStyle(mode = "google", showTraffic = false) {
  let lyrs = "m";
  if (mode === "satellite") {
    lyrs = showTraffic ? "y,traffic" : "y";
  } else {
    lyrs = showTraffic ? "m,traffic" : "m";
  }

  return {
    version: 8,
    sources: {
      "google-tiles": {
        type: "raster",
        tiles: [
          `https://mt0.google.com/vt/lyrs=${lyrs}&hl=vi&x={x}&y={y}&z={z}`,
          `https://mt1.google.com/vt/lyrs=${lyrs}&hl=vi&x={x}&y={y}&z={z}`,
          `https://mt2.google.com/vt/lyrs=${lyrs}&hl=vi&x={x}&y={y}&z={z}`,
          `https://mt3.google.com/vt/lyrs=${lyrs}&hl=vi&x={x}&y={y}&z={z}`,
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
