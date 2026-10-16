import { useEffect, useRef, useCallback } from "react";
import { Map, Marker, NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import FoodPin from "./FoodPin";
import RouteLayer from "./RouteLayer";

const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

export default function MapView({ places, selectedId, onSelect, routeData, transportMode }) {
  const mapRef = useRef(null);

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
        mapStyle={MAP_STYLE}
        attributionControl={false}
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
        <RouteLayer routeData={routeData} transportMode={transportMode} />

        {/* Food pins */}
        {places.map((p) => (
          <Marker key={p.id} longitude={p.lng} latitude={p.lat} anchor="bottom">
            <FoodPin
              place={p}
              active={p.id === selectedId}
              onClick={() => onSelect(p.id)}
            />
          </Marker>
        ))}
      </Map>
    </div>
  );
}