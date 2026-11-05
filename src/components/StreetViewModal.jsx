import { useEffect } from "react";

export default function StreetViewModal({ place, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !place) return null;

  const lat = place.lat || 10.7745;
  const lng = place.lng || 106.7005;

  // URL mở Street View toàn màn hình trên Google Maps
  const googleStreetViewUrl = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}`;
  // URL mở chỉ đường Google Maps
  const googleDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  // URL embed Street View dạng iframe
  const embedStreetViewUrl = `https://maps.google.com/maps?q=${lat},${lng}&layer=c&cbll=${lat},${lng}&cbp=12,0,0,0,0&output=svembed`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 animate-scaleUp max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shrink-0 border-b border-gray-700">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/40 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl">streetview</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base truncate">{place.name}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 uppercase tracking-wider hidden sm:inline-block">
                  Phố 360° Live
                </span>
              </div>
              <span className="text-xs text-gray-300 truncate">{place.address}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:rotate-90 shrink-0 ml-3"
            title="Đóng (Esc)"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Viewport 360° Panorama Iframe */}
        <div className="relative w-full h-[360px] sm:h-[460px] bg-gray-950 overflow-hidden flex items-center justify-center">
          <iframe
            title={`Street View - ${place.name}`}
            src={embedStreetViewUrl}
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Quick guide pill overlay */}
          <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-[11px] font-medium flex items-center gap-1.5 pointer-events-none shadow-lg border border-white/20">
            <span className="material-symbols-outlined text-sm text-orange-400 animate-spin">sync</span>
            <span>Kéo chuột hoặc vuốt để xoay 360° mặt tiền quán & chỗ gửi xe</span>
          </div>

          {/* External Button overlay */}
          <a
            href={googleStreetViewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 bg-white/95 hover:bg-white text-gray-900 font-bold text-xs px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 border border-gray-200"
          >
            <span className="material-symbols-outlined text-base text-blue-600">open_in_new</span>
            <span>Mở Google Street View App</span>
          </a>
        </div>

        {/* Footer info & Actions */}
        <div className="p-4 sm:p-5 bg-gray-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <img
              src={place.image}
              alt={place.name}
              className="w-12 h-12 rounded-2xl object-cover shrink-0 shadow-sm border border-gray-200"
            />
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-medium">{place.specialty}</span>
              <span className="text-xs font-bold text-gray-800">
                ⭐ {place.rating} ({place.reviews?.toLocaleString()} đánh giá) • Giờ mở: {place.closeAt ? `Đến ${place.closeAt}` : "Mở cả ngày"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={googleDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-base">directions</span>
              <span>Dẫn đường Google Maps</span>
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-gray-100 text-gray-700 text-xs font-bold border border-gray-300 transition-all"
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

