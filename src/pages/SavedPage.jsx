import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SavedPage() {
  const navigate = useNavigate();
  const [savedTrips, setSavedTrips] = useState([]);

  useEffect(() => {
    try {
      const trips = JSON.parse(localStorage.getItem("localeats_saved_trips") || "[]");
      setSavedTrips(trips);
    } catch {
      setSavedTrips([]);
    }
  }, []);

  const handleDeleteTrip = (tripId) => {
    const updated = savedTrips.filter((t) => t.id !== tripId);
    setSavedTrips(updated);
    localStorage.setItem("localeats_saved_trips", JSON.stringify(updated));
  };

  const handleOpenTrip = (trip) => {
    // Chuyển tới bản đồ khởi hành chuyến đi đã lưu
    if (!trip.stops || !trip.stops.length) return;
    const stopsData = trip.stops.map((place, idx) => ({
      id: place.id,
      name: place.name,
      address: place.address,
      lat: place.lat,
      lng: place.lng,
      category: place.category,
      order: idx + 1,
      stopLetter: String.fromCharCode(66 + idx),
    }));

    navigate("/", {
      state: {
        itineraryStops: stopsData,
        selectedPlaceId: stopsData[0].id,
        vehicle: trip.vehicle || "car",
        startPointName: trip.startPoint,
        destinationPointName: trip.destinationPoint,
        isFoodTourTrip: true,
      },
    });
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar p-6 bg-[#FDFBF7] page-enter max-w-5xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-orange-100 text-[#E84A27] text-[11px] font-black px-3 py-1 rounded-full mb-1">
            <span className="material-symbols-outlined text-[15px]">bookmark</span>
            BỘ SƯU TẬP & KẾ HOẠCH ĐÃ LƯU
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Kế Hoạch Chuyến Đi Của Bạn
          </h1>
          <p className="text-[12px] text-gray-500 mt-0.5">
            Các lộ trình Food Tour bạn đã thiết lập và lưu lại để dùng cho những chuyến đi tiếp theo
          </p>
        </div>

        <button
          onClick={() => navigate("/trip")}
          className="flex items-center gap-1.5 px-4 h-10 rounded-full bg-[#E84A27] text-white text-[12px] font-bold shadow-md hover:bg-[#c93d1f] transition-all"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          Tạo kế hoạch mới
        </button>
      </div>

      {savedTrips.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm p-8">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-3 animate-bounceIn">
            <span className="material-symbols-outlined text-[40px] text-[#E84A27]">bookmark_border</span>
          </div>
          <h2 className="text-[18px] font-extrabold text-gray-900 mb-1">Chưa có chuyến đi nào được lưu</h2>
          <p className="text-[12px] text-gray-500 max-w-sm mb-5 leading-relaxed">
            Bạn có thể vào mục <strong>Kế hoạch chuyến đi</strong>, chọn các quán yêu thích và nhấn <strong>Lưu chuyến đi</strong> để lưu trữ tại đây.
          </p>
          <button
            onClick={() => navigate("/trip")}
            className="flex items-center gap-2 bg-[#E84A27] text-white px-5 py-2.5 rounded-full font-bold text-[12px] shadow-lg shadow-[#E84A27]/25 hover:bg-[#c93d1f] transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">alt_route</span>
            Lập kế hoạch ngay
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-orange-100 text-[#E84A27]">
                    {trip.vehicle === "bike" ? "🏍️ Xe máy" : "🚗 Ô tô"} • {trip.stops?.length || 0} điểm dừng
                  </span>
                  <span className="text-[11px] text-gray-400">{trip.savedAt}</span>
                </div>

                <h3 className="font-extrabold text-[15px] text-gray-900 mb-1 line-clamp-1 group-hover:text-[#E84A27] transition-colors">
                  {trip.title}
                </h3>
                <p className="text-[11px] text-gray-500 mb-3">
                  Cự ly dự tính: <strong className="text-gray-800">{trip.totalKm} km</strong>
                </p>

                {/* Danh sách trạm */}
                <div className="space-y-1.5 bg-gray-50/80 p-2.5 rounded-xl border border-gray-100 mb-3">
                  {trip.stops?.map((stop, sIdx) => (
                    <div key={stop.id || sIdx} className="flex items-center gap-2 text-[11px]">
                      <span className="w-4 h-4 rounded-full bg-cyan-100 text-cyan-800 text-[9px] font-bold flex items-center justify-center shrink-0">
                        {sIdx + 1}
                      </span>
                      <span className="font-semibold text-gray-800 truncate flex-1">{stop.name}</span>
                      <span className="text-[10px] text-gray-400">{stop.category}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <button
                  onClick={() => handleOpenTrip(trip)}
                  className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-xl bg-[#E84A27] hover:bg-[#c93d1f] text-white text-[11px] font-bold transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-[15px]">navigation</span>
                  Khởi hành lộ trình này
                </button>
                <button
                  onClick={() => handleDeleteTrip(trip.id)}
                  title="Xóa kế hoạch này"
                  className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
