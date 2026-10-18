import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { Map, Marker, NavigationControl } from "react-map-gl/maplibre";
import * as maplibregl from "maplibre-gl";
import { setWorkerUrl } from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import "maplibre-gl/dist/maplibre-gl.css";
import FoodPin from "./FoodPin";
import RouteLayer from "./RouteLayer";

setWorkerUrl(workerUrl);

// Bản đồ Vector OpenFreeMap Liberty hiển thị chi tiết các tòa nhà, đường phố và địa danh
const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

const MapView = forwardRef(function MapView(
  { places, selectedId, onSelect, onMapClick, routeData, transportMode, userLocation, itineraryStops = [] },
  ref
) {
  const mapRef = useRef(null);

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
    resetNorth: () => {
      if (mapRef.current) {
        mapRef.current.resetNorth({ duration: 500 });
      }
    },
  }));

  // Bấm pin thì bản đồ bay tới quán đó
  useEffect(() => {
    const p = places.find((x) => x.id === selectedId);
    if (p && mapRef.current) {
      mapRef.current.flyTo({ center: [p.lng, p.lat], duration: 1200 });
    }
  }, [selectedId, places]);

  // Khi có route, fit bản đồ để hiển thị toàn bộ tuyến đường
  useEffect(() => {
    if (routeData?.coords?.length > 1 && mapRef.current) {
      const coords = routeData.coords;
      let minLng = Infinity, maxLng = -Infinity, minLat = Infinity, maxLat = -Infinity;
      
      for (const [lng, lat] of coords) {
        if (lng < minLng) minLng = lng;
        if (lng > maxLng) maxLng = lng;
        if (lat < minLat) minLat = lat;
        if (lat > maxLat) maxLat = lat;
      }

      mapRef.current.fitBounds(
        [[minLng, minLat], [maxLng, maxLat]],
        { padding: { top: 100, bottom: 80, left: 380, right: 60 }, duration: 1500 }
      );
    }
  }, [routeData]);

  return (
    <div className="absolute inset-0">
      <Map
        ref={mapRef}
        mapLib={maplibregl}
        mapStyle={MAP_STYLE}
        attributionControl={false}
        onClick={(e) => {
          // Chỉ gọi onMapClick nếu không click trúng marker
          if (onMapClick) onMapClick(e);
        }}
        initialViewState={{
          longitude: 106.7005,
          latitude: 10.7745,
          zoom: 15.5,
          pitch: 55,
          bearing: 20,
        }}
        maxPitch={70}
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

        {/* Food pins */}
        {places.map((p) => {
          const itinIndex = itineraryStops?.findIndex((s) => s.id === p.id);
          const itineraryOrder = itinIndex >= 0 ? itinIndex + 1 : null;
          return (
            <Marker key={p.id} longitude={p.lng} latitude={p.lat} anchor="bottom">
              <FoodPin
                place={p}
                active={p.id === selectedId}
                itineraryOrder={itineraryOrder}
                onClick={() => onSelect(p.id)}
              />
            </Marker>
          );
        })}
      </Map>
    </div>
  );
});

export default MapView;