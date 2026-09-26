import { useState } from "react";
import MapView from "./components/MapView";
import { places } from "./data/places";

export default function App() {
  const [selectedId, setSelectedId] = useState(1);
  const place = places.find((p) => p.id === selectedId);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <MapView places={places} selectedId={selectedId} onSelect={setSelectedId} />

      <div className="absolute top-4 left-4 z-30 flex gap-2">
        {["Đang cực HOT 🔥", "Đánh giá 4.5+ ★", "Gần tôi", "Ăn đêm"].map((t, i) => (
          <button key={t}
            className={`h-9 px-4 rounded-full text-label-md shadow ${i === 0 ? "bg-primary text-white" : "bg-white"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="absolute left-4 top-16 z-30 w-96 bg-white rounded-lg shadow-xl p-4 flex flex-col gap-2">
        <h2 className="text-headline-md">{place.name}</h2>
        <p className="text-body-sm text-on-surface-variant">{place.address}</p>
        <p className="text-label-lg">⭐ {place.rating} ({place.reviews.toLocaleString()} đánh giá)</p>
        <p className="text-body-md">{place.price}</p>
        <button className="h-11 rounded-full bg-primary text-white text-label-md">Bắt đầu chỉ đường</button>
      </div>
    </div>
  );
}