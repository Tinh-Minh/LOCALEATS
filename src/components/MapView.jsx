import { useEffect, useRef } from "react";
import { Map, Marker, NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import FoodPin from "./FoodPin";

const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

export default function MapView({ places, selectedId, onSelect }) {
  const mapRef = useRef(null);

  // Bấm pin thì bản đồ bay tới quán đó
  useEffect(() => {
    const p = places.find((x) => x.id === selectedId);
    if (p && mapRef.current) {
      mapRef.current.flyTo({ center: [p.lng, p.lat], duration: 1200 });
    }
  }, [selectedId, places]);

  return (
    <div className="absolute inset-0">
      <Map
        ref={mapRef}
        mapStyle={MAP_STYLE}
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
        <NavigationControl position="bottom-right" visualizePitch />

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