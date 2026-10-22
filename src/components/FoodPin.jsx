import fireImage from "/fire-icon.png";

export default function FoodPin({ place, active, onClick, itineraryOrder }) {
  const rating = Number(place.rating) || 4.0;

  const isTopRated = rating >= 4.8;
  const isHighRated = rating >= 4.5;
  const isInItinerary = itineraryOrder !== undefined && itineraryOrder !== null;
  const hasFireFlame = isTopRated || place.hot;

  const sizeClasses = isTopRated
    ? "w-8 h-8 sm:w-11 sm:h-11"
    : isHighRated
    ? "w-7 h-7 sm:w-10 sm:h-10"
    : "w-6 h-6 sm:w-9 sm:h-9";

  const iconSizeClasses = isTopRated
    ? "text-[14px] sm:text-[18px]"
    : isHighRated
    ? "text-[12px] sm:text-[16px]"
    : "text-[11px] sm:text-[14px]";

  const ratingTextClasses = isTopRated
    ? "text-[7.5px] sm:text-[9.5px] font-black"
    : "text-[7px] sm:text-[9px] font-extrabold";

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick(e);
      }}
      className={`relative flex flex-col items-center transition-all duration-300 hover:scale-110 ${
        active ? "scale-110 sm:scale-120 z-30" : isInItinerary ? "scale-105 z-25" : isTopRated ? "z-20" : "z-10"
      }`}
    >
      {/* Huy hiệu thứ tự trạm dừng (Chặng 1, 2, 3...) */}
      {isInItinerary && (
        <span
          className={`absolute -top-3 sm:-top-3.5 z-30 flex items-center gap-0.5 sm:gap-1 px-1 sm:px-2 py-0.2 sm:py-0.5 rounded-full text-[8px] sm:text-[10px] font-black text-white shadow-md border border-white animate-bounce ${
            itineraryOrder === 1
              ? "bg-[#E84A27] ring-1 ring-orange-300"
              : "bg-[#06b6d4] ring-1 ring-cyan-300"
          }`}
        >
          <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-white/25 flex items-center justify-center text-[7px] sm:text-[9px]">
            {itineraryOrder}
          </span>
          <span className="hidden xs:inline">Trạm {itineraryOrder}</span>
        </span>
      )}

      {/* Cấu trúc ngọn lửa bùng cháy chuẩn theo ảnh mẫu bao bọc lấy icon quán */}
      <div className="relative flex items-center justify-center">
        {hasFireFlame && (
          <div className="absolute -inset-3.5 sm:-inset-5 flex items-center justify-center pointer-events-none animate-flame-soft">
            <img
              src={fireImage}
              alt="fire"
              className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(232,74,39,0.3)] opacity-90 select-none"
            />
          </div>
        )}

        {/* Icon quán nằm lọt lòng gọn gàng bên trong ngọn lửa */}
        <span
          className={`relative z-10 ${sizeClasses} rounded-full bg-white flex flex-col items-center justify-center transition-all duration-300 shadow-md ${
            active
              ? "border-2 border-[#E84A27] ring-2 ring-orange-300/60 shadow-lg"
              : isInItinerary
              ? itineraryOrder === 1
                ? "border-2 border-[#E84A27] shadow-orange-500/25"
                : "border-2 border-[#06b6d4] shadow-cyan-500/25"
              : "border-[1.5px] border-orange-200/90 hover:border-[#E84A27]"
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
            {place.rating} <span className="text-amber-500 text-[7px] sm:text-[9.5px] leading-none">★</span>
          </span>
        </span>
      </div>

      {/* Tên quán ăn */}
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
