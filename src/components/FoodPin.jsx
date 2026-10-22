export default function FoodPin({ place, active, onClick, itineraryOrder }) {
  const rating = Number(place.rating) || 4.0;

  // Kích thước pin responsive: trên mobile thu nhỏ gọn gàng, tránh che khuất mặt đường
  const isTopRated = rating >= 4.8;
  const isHighRated = rating >= 4.5;
  const isInItinerary = itineraryOrder !== undefined && itineraryOrder !== null;

  const sizeClasses = isTopRated
    ? "w-8 h-8 sm:w-14 sm:h-14"
    : isHighRated
    ? "w-7 h-7 sm:w-12 sm:h-12"
    : "w-6 h-6 sm:w-11 sm:h-11";

  const iconSizeClasses = isTopRated
    ? "text-[14px] sm:text-xl"
    : isHighRated
    ? "text-[12px] sm:text-lg"
    : "text-[11px] sm:text-base";

  const ratingTextClasses = isTopRated
    ? "text-[7px] sm:text-[10px] font-black"
    : "text-[6.5px] sm:text-[9px] font-extrabold";

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick(e);
      }}
      className={`relative flex flex-col items-center transition-all duration-300 hover:scale-110 ${
        active ? "scale-110 sm:scale-125 z-30" : isInItinerary ? "scale-105 sm:scale-110 z-25" : isTopRated ? "z-20" : "z-10"
      }`}
    >
      {/* Huy hiệu thứ tự trạm dừng (Chặng 1, 2, 3...) đặt gọn gàng ở đỉnh trên cùng của Pin */}
      {isInItinerary && (
        <span
          className={`absolute -top-2.5 sm:-top-3.5 z-30 flex items-center gap-0.5 sm:gap-1 px-1 sm:px-2 py-0.2 sm:py-0.5 rounded-full text-[8px] sm:text-[10px] font-black text-white shadow-md border border-white animate-bounce ${
            itineraryOrder === 1
              ? "bg-[#E84A27] ring-1 sm:ring-2 ring-orange-400"
              : "bg-[#06b6d4] ring-1 sm:ring-2 ring-cyan-400"
          }`}
        >
          <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-white/25 flex items-center justify-center text-[7px] sm:text-[9px]">
            {itineraryOrder}
          </span>
          <span className="hidden xs:inline">Trạm {itineraryOrder}</span>
        </span>
      )}

      {/* Hào quang ngọn lửa rực hực cháy (Fire Aura Glow) */}
      {isInItinerary ? (
        <span
          className={`absolute -inset-1.5 sm:-inset-2 rounded-full opacity-70 blur-[2px] animate-pulse ${
            itineraryOrder === 1
              ? "bg-gradient-to-t from-red-600 via-orange-500 to-amber-300"
              : "bg-gradient-to-t from-cyan-600 via-sky-400 to-teal-200"
          }`}
        />
      ) : isTopRated || place.hot ? (
        <>
          {/* Vòng xung lực lửa tỏa ra ngoài */}
          <span className="absolute -inset-2 rounded-full border border-orange-500/70 animate-flame-ring pointer-events-none" />
          {/* Lớp nền hào quang lửa bập bùng hực hực */}
          <span className="absolute -inset-2 sm:-inset-3 rounded-full bg-gradient-to-t from-red-600 via-[#E84A27] to-amber-300 opacity-80 blur-[3px] animate-flame pointer-events-none" />
          {/* Tia lửa nhỏ li ti phía trên đỉnh pin */}
          <span className="absolute -top-3 text-[11px] sm:text-[13px] animate-bounce pointer-events-none leading-none select-none">
            🔥
          </span>
        </>
      ) : isHighRated ? (
        <span className="absolute -inset-1.5 sm:-inset-2 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-300 opacity-60 blur-[2px] animate-flame pointer-events-none" />
      ) : null}

      {/* Thân tròn của Pin */}
      <span
        className={`relative ${sizeClasses} rounded-full bg-white border-[1.5px] sm:border-[3px] shadow-sm sm:shadow-md flex flex-col items-center justify-center transition-all duration-300 ${
          active
            ? "border-[#E84A27] shadow-lg ring-2 sm:ring-4 ring-orange-400/40"
            : isInItinerary
            ? itineraryOrder === 1
              ? "border-[#E84A27] shadow-orange-500/40 shadow-md"
              : "border-[#06b6d4] shadow-cyan-500/40 shadow-md"
            : "border-[#E84A27] hover:shadow-md"
        }`}
      >
        <span
          className={`material-symbols-outlined leading-none ${
            isInItinerary && itineraryOrder !== 1 ? "text-[#0891b2]" : "text-[#E84A27]"
          } ${iconSizeClasses}`}
        >
          restaurant
        </span>
        <span className={`${ratingTextClasses} text-gray-800 -mt-0.5 flex items-center gap-0.5 leading-none`}>
          {place.rating} <span className="text-amber-500 text-[7px] sm:text-[10px] leading-none">★</span>
        </span>
      </span>

      {/* Tên quán ăn - Ẩn chữ trên mobile khi không active để tránh che mặt đường, chỉ hiện khi active hoặc trên màn hình máy tính */}
      <span
        className={`relative mt-0.5 px-1.5 sm:px-2 py-0.2 sm:py-0.5 rounded-full text-[8.5px] sm:text-[10px] font-bold shadow-sm whitespace-nowrap transition-all duration-300 border max-w-[85px] sm:max-w-[120px] truncate ${
          active
            ? "bg-[#E84A27] text-white border-[#E84A27] shadow-md scale-105 inline-block"
            : isInItinerary
            ? "bg-white text-[#E84A27] border-orange-200 hidden sm:inline-block"
            : "bg-white/95 text-gray-800 border-gray-100 backdrop-blur-sm hidden sm:inline-block"
        }`}
      >
        {place.name}
      </span>
    </button>
  );
}
